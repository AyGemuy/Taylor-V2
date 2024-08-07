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
    const res = await WallPapers(text);
    const rdm = res[Math.floor(Math.random() * res.length)];
    await conn.ctaButton.setBody("🖼️ *Random Wallpaper* 🖼️\n\nMenikmati wallpaper acak untuk hari ini!").setFooter('Klik "Next" untuk mendapatkan wallpaper lainnya').setImage(rdm).addReply("Next", usedPrefix + command + " " + text).run(m.chat, conn, m);
    m.react(sukses);
  } catch (e) {
    m.react(eror);
    console.error(e);
  }
};
handler.help = ["wallpapers"];
handler.tags = ["internet"];
handler.command = /^wallpapers$/i;
export default handler;
async function WallPapers(query) {
  try {
    const res = await fetch("https://wallpapers.com/" + query);
    const html = await res.text();
    const collection = new JSDOM(html).window.document.querySelectorAll(".promote");
    const img = [];
    collection.forEach(item => {
      const src = item.getAttribute("src");
      if (src) img.push("https://wallpapers.com" + src);
    });
    return img.filter(el => el !== null);
  } catch (e) {
    console.error("Error fetching wallpapers:", e);
    return [];
  }
}