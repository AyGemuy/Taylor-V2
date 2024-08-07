import {
  FineShare
} from "../../lib/ai/fineshare.js";
const createFine = new FineShare(),
  handler = async (m, {
    conn,
    usedPrefix,
    command,
    args
  }) => {
    try {
      await m.react("🔎");
      let q = m.quoted ? m.quoted : m,
        detail = !m.quoted && args[0] && await createFine.voiceDetail(args[0]),
        mime = (m.quoted ? m.quoted : m.msg).mimetype || "",
        output = !m.quoted && args[0] && Object.entries(detail.data).map(([key, value]) => `  ○ *${key.toUpperCase()}:* ${value}`).join("\n"),
        media = mime.includes("audio") && args[0] && await q?.download(),
        audio = media && await createFine.voiceChanger(args[0] || "jokowi", media);
      output && m.reply(output), audio && await conn.sendFile(m.chat, audio, "audio.mp3", "", m, null, {
        mimetype: "audio/mp4"
      });
    } catch (error) {
      console.error(error), m.reply("An error occurred while processing your request.");
    }
  };
handler.help = ["fine"].map(v => v + " <reply>"), handler.tags = ["audio"],
  handler.command = ["fine", "fineshare"];
export default handler;