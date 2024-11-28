import { FineShare } from "../../lib/ai/fineshare.js";
const createFine = new FineShare();
const handler = async (m, { conn, args }) => {
  try {
    m.react(wait);
    let q = m.quoted ? m.quoted : m;
    let detail =
      !m.quoted && args[0] && (await createFine.voiceDetail(args[0]));
    let mtype = (m.quoted ? m.quoted : m.msg).mtype || "";
    let output =
      !m.quoted &&
      args[0] &&
      Object.entries(detail.data)
        .map(([key, value]) => `  ○ *${key.toUpperCase()}:* ${value}`)
        .join("\n");
    let media = mtype === "audioMessage" && args[0] && (await q?.download());
    let audio =
      media && (await createFine.voiceChanger(args[0] || "jokowi", media));
    if (output) m.reply(output);
    if (audio) {
      await conn.sendFile(m.chat, audio, "audio.mp3", "", m, null, {
        mimetype: "audio/mp4",
      });
      m.react(sukses);
    }
  } catch (error) {
    console.error(error);
    m.reply("An error occurred while processing your request.");
  }
};
handler.help = ["fine"].map((v) => v + " <reply>");
handler.tags = ["audio"];
handler.command = ["fine", "fineshare"];
export default handler;
