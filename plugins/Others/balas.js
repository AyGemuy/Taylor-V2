import fs from "fs";
import fetch from "node-fetch";
const handler = async (m, {
  conn,
  text,
  usedPrefix: _p
}) => {
  let [number, pesan] = text.split(/[^\w\s]/g);
  if (!number) return await conn.reply(m.chat, "Silakan masukkan nomor yang akan dikirim", m);
  if (!pesan) return await conn.reply(m.chat, "Silakan masukkan pesannya", m);
  if (pesan.length > 500) return await conn.reply(m.chat, "Teks terlalu panjang!", m);
  const korban = `${number}@s.whatsapp.net`,
    spam1 = `*「 SUKSES 」*\n\nDari: wa.me/${number}\nPesan: ${pesan}\n\n${wm}`;
  await conn.reply(korban, spam1, 0, {
    contextInfo: {
      mentionedJid: [m.sender],
      externalAdReply: {
        mediaUrl: sig,
        mediaType: 2,
        title: wm,
        body: "Hai, Ini Balasan Pesan Dari Owner",
        sourceUrl: snh,
        thumbnail: fs.readFileSync("./thumbnail.jpg")
      }
    }
  }).then(async () => {
    let logs = `[!] Berhasil mengirim pesan WhatsApp ke nomor ${number}`;
    await conn.reply(m.chat, logs, m);
  }).catch(async () => {
    let logs = `[!] Gagal mengirim pesan WhatsApp ke nomor ${number}`;
    await conn.reply(m.chat, logs, m);
  });
};
handler.command = /^(pesan|balas)$/i;
export default handler;