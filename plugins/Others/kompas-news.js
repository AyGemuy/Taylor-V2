import fetch from "node-fetch";
import dhn from "dhn-api";
const handler = async (m, {
  conn
}) => {
  try {
    const response = await dhn.KompasNews(),
      news = (await response.json()).getRandom(),
      {
        berita,
        berita_url,
        berita_thumb,
        berita_jenis,
        berita_diupload
      } = news,
      message = `📺 *Kompas News*\n\n📢 *Berita:* ${berita}\n📁 *Type News:* ${berita_jenis}\n⌚ *Uploaded:* ${berita_diupload}\n🛰 *Source Url:* ${berita_url}`;
    await conn.sendFile(m.chat, berita_thumb, "", message, m);
  } catch (error) {
    throw console.error(error), "Gagal mengambil berita, coba lagi nanti.";
  }
};
handler.help = ["kompasnews"], handler.tags = ["berita"], handler.command = /^kompas(news)?$/i,
  handler.limit = !0;
export default handler;