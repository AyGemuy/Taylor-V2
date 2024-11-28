import { webp2png } from "../../lib/webp2mp4.js";
const handler = async (m, { conn, usedPrefix, command }) => {
  const notStickerMessage = `✳️ Reply to a sticker with :\n\n *${usedPrefix + command}*`;
  let media;
  try {
    const q = m.quoted || m;
    const mime = q.mediaType || "";
    if (!/sticker/.test(mime)) return m.reply(notStickerMessage);
    media = await q.download();
    if (!media) return m.reply("Failed to download the sticker.");
    await conn.sendMessage(
      m.chat,
      {
        image: media,
        caption: "*✅ Here you have*",
      },
      {
        quoted: m,
      },
    );
  } catch (error) {
    console.error("Error converting sticker to image:", error);
    try {
      const out = media ? await webp2png(media) : null;
      if (out) {
        await conn.sendFile(m.chat, out, "out.png", "*✅ Here you have*", m);
      } else {
        await m.reply("Failed to convert the sticker.");
      }
    } catch (e) {
      console.error("Error handling webp2png conversion:", e);
      await m.reply("An error occurred while processing the sticker.");
    }
  }
};
handler.help = ["toimg (reply)"];
handler.tags = ["sticker"];
handler.command = /^t(oim(age|g)|im(age|g))$/i;
export default handler;
