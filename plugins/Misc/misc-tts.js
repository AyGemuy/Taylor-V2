import gtts from "node-gtts";
import {
  readFileSync,
  unlinkSync
} from "fs";
import {
  join,
  dirname
} from "path";
import {
  fileURLToPath
} from "url";
const handler = async (m, {
  conn,
  args,
  usedPrefix,
  command
}) => {
  const lang = args[0] || "id";
  const text = args.slice(1).join(" ") || (m.quoted?.text || null);
  if (!text) {
    m.reply(`Masukkan input. Contoh penggunaan: ${usedPrefix}${command} en Halo dunia`);
    return;
  }
  try {
    m.react(wait);
    let res;
    try {
      res = await tts(text, lang);
    } catch (e) {
      res = await tts(text, "id");
    }
    if (res) {
      await conn.sendFile(m.chat, res, "audio.mp3", "", m, !0, {
        mimetype: "audio/mp4",
        ptt: !0,
        waveform: [100, 0, 100, 0, 100, 0, 100],
        contextInfo: adReplyS.contextInfo
      });
      m.react(sukses);
    }
  } catch (e) {
    m.react(eror);
    console.error("An error occurred:", e);
  }
};
handler.help = ["tts <lang> <teks>"];
handler.tags = ["tools"];
handler.command = /^(gtts|tts)$/i;
export default handler;

function tts(text, lang = "id") {
  return new Promise((resolve, reject) => {
    try {
      const tts = gtts(lang);
      const filePath = join(__dirname(fileURLToPath(import.meta.url)), "../../tmp", `${Date.now()}.wav`);
      tts.save(filePath, text, () => {
        resolve(readFileSync(filePath));
        unlinkSync(filePath);
      });
    } catch (e) {
      reject(e);
    }
  });
}