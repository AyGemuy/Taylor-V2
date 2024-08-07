let split = "|";
const handler = async (m, {
  conn,
  text,
  usedPrefix
}) => {
  let [txt, ...text2] = text.replace("emror?", "").trimStart().split(split);
  if (!txt) throw "Masukan Judul dan Deskripsi nya";
  if (!text2) throw `Contoh : ${usedPrefix}jadikatalog SLAYER?|INI BUKAN SELAYER BRUH:>`;
  let q = m.quoted ? m.quoted : m,
    mime = (q.msg || q).mimetype || "";
  if (/image|video/.test(mime)) {
    let img = await q?.download();
    if (!img) throw "Foto/Sticker tidak ditemukan";
    await conn.relayMessage(m.chat, {
      productMessage: {
        product: {
          productImage: {
            url: "https://mmg.whatsapp.net/d/f/AnSw-hoxnHkZZE5HfU3Hx8ErJYTt_onVglwSnFJE8x2c.enc",
            mimetype: "image/jpeg",
            fileSha256: "nDM/acIuR4SDh/ZKrS8ysfYlM2Z/RgAuikg9Bj1jK+s=",
            fileLength: "12295",
            height: 371,
            width: 558,
            mediaKey: "p95ebDGt25rIs76r5ymJxeuvKnhUEKQnTilft7z/JEo=",
            fileEncSha256: "NnBWPq0KgBt2VCN4zD4xg2N/gr/VgZdy8dNnEWqacRc=",
            jpegThumbnail: img
          },
          productId: "9999999",
          title: txt,
          description: text2,
          productImageCount: 1
        },
        businessOwnerJid: "0@s.whatsapp.net",
        contextInfo: {
          forwardingScore: 9999,
          isForwarded: !1
        }
      }
    }, {
      quoted: fakes
    });
  } else m.reply("FOTO NYA MANA sayang?");
};
handler.help = ["jadikatalog"], handler.tags = ["creator"], handler.command = /^(jadikatalog)$/i,
  handler.owner = !0, handler.fail = null, handler.exp = 2;
export default handler;