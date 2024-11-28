import axios from "axios";
import * as cheerio from "cheerio";
import { exec } from "child_process";
import fs from "fs";
import path from "path";
const tempDir = path.resolve("./tmp");
if (!fs.existsSync(tempDir)) {
  fs.mkdirSync(tempDir, {
    recursive: true,
  });
}
async function downloadVideo(url, filePath) {
  try {
    const response = await axios.get(url, {
      responseType: "stream",
    });
    const writeStream = fs.createWriteStream(filePath);
    response.data.pipe(writeStream);
    return new Promise((resolve, reject) => {
      writeStream.on("finish", resolve);
      writeStream.on("error", reject);
    });
  } catch (err) {
    console.error(`Failed to download video from ${url}:`, err);
    throw err;
  }
}
async function combineVideosToBuffer(videoData) {
  const tempFiles = [];
  const tempListFilePath = path.join(tempDir, "file_list.txt");
  const outputFilePath = path.join(tempDir, "output.mp4");
  try {
    for (const { url } of videoData) {
      const tempFilePath = path.join(
        tempDir,
        `${Date.now()}_${path.basename(url)}`,
      );
      await downloadVideo(url, tempFilePath);
      tempFiles.push(tempFilePath);
    }
    const fileListContent = tempFiles
      .map((file) => `file '${file}'`)
      .join("\n");
    fs.writeFileSync(tempListFilePath, fileListContent, {
      encoding: "utf8",
    });
    const ffmpegCommand = `ffmpeg -f concat -safe 0 -i "${tempListFilePath}" -vf "setpts=0.5*PTS" -c:v libx264 -crf 23 -preset fast "${outputFilePath}"`;
    await runCommand(ffmpegCommand);
    const combinedBuffer = fs.readFileSync(outputFilePath);
    cleanUp();
    return combinedBuffer;
  } catch (err) {
    console.error("Failed to combine videos:", err);
    throw err;
  }

  function runCommand(command) {
    return new Promise((resolve, reject) => {
      exec(command, (error, stdout, stderr) => {
        if (error) {
          console.error(`Error executing command: ${stderr}`);
          reject(error);
        } else {
          console.log(`Command output: ${stdout}`);
          resolve();
        }
      });
    });
  }

  function cleanUp() {
    try {
      fs.unlinkSync(tempListFilePath);
      fs.unlinkSync(outputFilePath);
      tempFiles.forEach((file) => fs.unlinkSync(file));
    } catch (cleanupErr) {
      console.error("Error during cleanup:", cleanupErr);
    }
  }
}
async function getDataSibi(inputValue) {
  const isSingleWord = inputValue.split(" ").length === 1;
  const url = isSingleWord
    ? "https://pmpk.kemdikbud.go.id/sibi/pencarian/pencariankata"
    : "https://pmpk.kemdikbud.go.id/sibi/pencarian/pencarianadvance";
  try {
    const response = await axios.post(
      url,
      new URLSearchParams({
        key: inputValue,
      }).toString(),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      },
    );
    const $ = cheerio.load(response.data);
    return $("div.card-body .col-sm-4")
      .map((_, el) => ({
        text: $(el).find(".topText").text().trim() || "No text available",
        url: $(el).find("video source").attr("src") || "No URL available",
      }))
      .get()
      .filter(
        ({ text, url }) =>
          text !== "No text available" && url !== "No URL available",
      );
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
}
const handler = async (m, { conn, args, usedPrefix, command }) => {
  const text =
    args.length >= 1
      ? args.join(" ")
      : m.quoted?.text || m.quoted?.caption || m.quoted?.description || null;
  if (!text)
    return m.reply(
      `Masukkan teks atau reply pesan dengan teks yang ingin diolah.\nContoh penggunaan:\n*${usedPrefix}${command} Hai, apa kabar?*`,
    );
  m.react(wait);
  try {
    const resultSibi = await getDataSibi(text);
    if (!resultSibi) return m.reply(`Tidak ada isyarat yang ditemukan`);
    const output = resultSibi.map((item) => item.text).join("\n");
    const combinedBuffer = await combineVideosToBuffer(resultSibi);
    if (!combinedBuffer) return m.reply(`Tidak ada video yang ditemukan`);
    await conn.sendMessage(
      m.chat,
      {
        video: combinedBuffer,
        caption: output,
        mentions: [m.sender],
      },
      {
        quoted: m,
      },
    );
  } catch (e) {
    console.log(e);
    m.react(eror);
  }
};
handler.help = ["isyarat"];
handler.tags = ["tools"];
handler.command = /^(sibi|isyarat)$/i;
export default handler;
