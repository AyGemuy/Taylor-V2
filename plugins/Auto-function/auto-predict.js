import uploadImage from "../../lib/uploadImage.js";
import fetch from "node-fetch";
export async function before(m, {
  isAdmin,
  isBotAdmin
}) {
  if (m.isBaileys && m.fromMe) return true;
  if (!m.isGroup || !db.data.chats[m.chat]?.nsfw) return false;
  const q = m.quoted || m;
  const mime = q.msg?.mimetype || "";
  if (!mime) return false;
  if (!/image\/(png|jpe?g)/.test(mime)) return false;
  const media = await q?.download();
  const link = await uploadImage(media);
  if (link) {
    const detect = await cekGambar(link);
    if (detect?.nsfw) return void await this.reply(m.chat, detect.msg, m);
  }
}
async function cekGambar(img) {
  try {
    const response = await fetch(`https://api.sightengine.com/1.0/check.json?url=${img}&models=nudity,wad,gore&api_user=671718818&api_secret=zs9QqkjFYZWq5N3nozXT`);
    const data = await response.json();
    const estetikPesan = "*Peringatan Keamanan:*\nDitemukan pesan dengan konten NSFW di saluran yang diizinkan.\nLangkah pencegahan akan diambil terhadap pengguna.";
    return {
      nsfw: data?.nudity?.safe < .8,
      msg: estetikPesan
    };
  } catch (error) {
    console.error("Kesalahan dalam pemeriksaan gambar:", error);
    return {
      nsfw: false,
      msg: ""
    };
  }
}