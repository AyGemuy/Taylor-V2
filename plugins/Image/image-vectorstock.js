import fetch from "node-fetch";
import {
  JSDOM
} from "jsdom";
const handler = async (m, {
  conn,
  args,
  usedPrefix,
  command
}) => {
  const text = args.length >= 1 ? args.join(" ") : m.quoted?.text || m.quoted?.caption || m.quoted?.description || null;
  if (!text) return m.reply(`Masukkan teks atau reply pesan dengan teks yang ingin diolah.\nContoh penggunaan:\n*${usedPrefix}${command} Hai, apa kabar?*`);
  try {
    m.react(wait);
    const res = await VectorStock(text);
    const rdm = res[Math.floor(Math.random() * res.length)];
    await conn.ctaButton.setBody("🖼️ *Hasil Pencarian VectorStock* 🖼️\n\nGambar vector yang ditemukan.").setFooter('Klik "Next" untuk mencari gambar lainnya').setImage(rdm).addReply("Next", usedPrefix + command + " " + text).run(m.chat, conn, m);
    m.react(sukses);
  } catch (e) {
    m.react(eror);
    console.error(e);
  }
};
handler.help = ["vectorstock"];
handler.tags = ["internet"];
handler.command = /^vectorstock$/i;
export default handler;
async function VectorStock(query) {
  try {
    const res = await fetch("https://www.vectorstock.com/royalty-free-vectors/" + query + "-vectors");
    const html = await res.text();
    const collection = new JSDOM(html).window.document.getElementsByTagName("img");
    const img = [];
    for (let i = 0; i < collection.length; i++) {
      const src = collection[i].getAttribute("src");
      if (src && src.startsWith("https://cdn.vectorstock.com")) {
        img.push(src);
      }
    }
    return img.filter(el => el !== null);
  } catch (e) {
    console.error("Error fetching vector images:", e);
    return [];
  }
}