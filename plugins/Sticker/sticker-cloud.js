import { sticker } from "../../lib/sticker.js";
import { StickerCloud } from "../../lib/download/stickercloud.js";
const handler = async (m, { conn, text }) => {
  if (!text) {
    m.reply("Silakan masukkan kata kunci untuk mencari stiker.");
    console.log(`User ${m.sender} tidak memasukkan kata kunci.`);
    return;
  }
  try {
    const {
      result: { data },
    } = await new StickerCloud().search(text);
    if (!data.length) {
      m.reply("Sticker dengan kata kunci tersebut tidak ditemukan.");
      console.log(`Sticker tidak ditemukan untuk kata kunci: ${text}`);
      return;
    }
    const {
      stickers,
      title,
      author: { username },
    } = data[(Math.random() * data.length) | 0];
    const randomSticker = stickers[(Math.random() * stickers.length) | 0];
    m.react(wait);
    const stiker = await sticker(
      null,
      randomSticker.sticker_src,
      title,
      username,
    );
    if (stiker) {
      await conn.sendFile(m.chat, stiker, "sticker.webp", "", m, false, {
        asSticker: true,
      });
      m.react(sukses);
      console.log(`Berhasil mengirim stiker untuk kata kunci: ${text}`);
    } else {
      m.react(eror);
      console.log(`Gagal membuat stiker untuk kata kunci: ${text}`);
    }
  } catch (error) {
    m.react(eror);
    console.error(
      `Error saat memproses stiker untuk kata kunci: ${text}`,
      error,
    );
  }
};
handler.help = ["stickercloud"];
handler.tags = ["sticker"];
handler.command = /^(stickercloud)$/i;
handler.limit = true;
export default handler;
