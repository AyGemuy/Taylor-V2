import {
  spawn
} from "child_process";
import path from "path";
import emojiRegex from "emoji-regex";
const fontPath = path.resolve("src/font/Zahraaa.ttf");
const inputPath = path.resolve("src/kertas/buku/sidu.jpg");
const maxCharsPerLine = 85;
const maxLines = 29;
const lineSpacing = -1;
const fontSize = 21;
const divideArray = (arr, chunkSize) => Array.from({
  length: Math.ceil(arr.length / chunkSize)
}, (_, index) => arr.slice(index * chunkSize, (index + 1) * chunkSize));
const chunkString = (str, size) => {
  const regex = new RegExp(`.{1,${size}}`, "g");
  return str.match(regex);
};
const handler = async (m, {
  conn,
  text,
  command
}) => {
  const d = new Date();
  const tgl = d.toLocaleDateString("id-Id");
  const hari = d.toLocaleDateString("id-Id", {
    weekday: "long"
  });
  text = (text ? text : m.quoted?.text ? m.quoted?.text : "").trim();
  if (!text) return await conn.reply(m.chat, "Tidak ada teks.", m);
  let fontColor = "black";
  if (command === "nulismerah") fontColor = "red";
  if (command === "nulishijau") fontColor = "green";
  if (command === "nulisbiru") fontColor = "blue";
  try {
    const paragraphs = text.split("\n");
    const words = paragraphs.flatMap(paragraph => chunkString(paragraph.trim(), maxCharsPerLine) || []);
    const pages = divideArray(words, maxLines);
    for (let i = 0; i < pages.length; i++) {
      const page = pages[i];
      const pageText = page.join("\n");
      const pageNumber = `Page *${i + 1}* of *${pages.length}*`;
      const bufs = [];
      const drawtextDayArgs = [`fontfile=${fontPath}`, `text=${hari}`, `fontcolor=black`, `fontsize=${fontSize + 2}`, `x=(w-text_w-155)`, `y=108`].join(":");
      const drawtextDateArgs = [`fontfile=${fontPath}`, `text=${tgl}`, `fontcolor=black`, `fontsize=${fontSize + 2}`, `x=(w-text_w-50)`, `y=108`].join(":");
      const drawtextPageArgs = [`fontfile=${fontPath}`, `text=${i + 1}`, `fontcolor=black`, `fontsize=${fontSize + 2}`, `x=60`, `y=108`].join(":");
      const drawtextContentArgs = [`fontfile=${fontPath}`, `text=${quote([ pageText ])}`, `fontcolor=${fontColor}`, `fontsize=${fontSize}`, `x=73`, `y=145`].join(":");
      const ffmpegArgs = ["-i", inputPath, "-vf", `drawtext=${drawtextDayArgs}:line_spacing=${lineSpacing},drawtext=${drawtextDateArgs}:line_spacing=${lineSpacing},drawtext=${drawtextPageArgs}:line_spacing=${lineSpacing},drawtext=${drawtextContentArgs}:line_spacing=${lineSpacing}`, "-q:v", "2", "-f", "image2pipe", "pipe:1"];
      const ffmpegProcess = spawn("ffmpeg", ffmpegArgs);
      ffmpegProcess.stdout.on("data", chunk => bufs.push(chunk));
      await new Promise((resolve, reject) => {
        ffmpegProcess.on("error", reject).on("close", async () => {
          if (bufs.length) {
            await conn.sendFile(m.chat, Buffer.concat(bufs), `nulis_page_${i + 1}.jpg`, `${pageNumber}\n- Tulisan Bot Lebih Bagus Daripada Tulisanmu`, m);
          } else {
            await conn.reply(m.chat, "Tidak ada hasil.", m);
          }
          resolve();
        });
      });
    }
  } catch (e) {
    console.error(e);
    await conn.reply(m.chat, "Terjadi kesalahan saat memproses permintaan Anda.", m);
  }
};
handler.help = ["nulisbuku <teks>", "nulismerah <teks>", "nulishijau <teks>", "nulisbiru <teks>"];
handler.tags = ["nulis", "tools"];
handler.command = /^(nulisbuku|nulismerah|nulishijau|nulisbiru)$/i;
handler.register = true;
handler.limit = true;
export default handler;

function quote(xs) {
  const regex = emojiRegex();
  return xs.map(function(s) {
    s = s.replace(/([#!"$&'()*+,:;<=>?@[\\\]^`{|}~])/g, "\\$1");
    s = s.replace(regex, match => `\\${match}`);
    if (/["\s]/.test(s) && !/'/.test(s)) {
      return "'" + s.replace(/(['\\])/g, "\\$1") + "'";
    }
    if (/["'\s]/.test(s)) {
      return '"' + s.replace(/(["\\$`!])/g, "\\$1") + '"';
    }
    return s;
  }).join(" ");
}