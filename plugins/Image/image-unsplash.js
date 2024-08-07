import axios from "axios";
const handler = async (m, {
  conn,
  isOwner,
  usedPrefix,
  command,
  args
}) => {
  const text = args.length >= 1 ? args.join(" ") : m.quoted?.text || m.quoted?.caption || m.quoted?.description || null;
  if (!text) return m.reply(`Masukkan teks atau reply pesan dengan teks yang ingin diolah.\nContoh penggunaan:\n*${usedPrefix}${command} Hai, apa kabar?*`);
  try {
    m.react(wait);
    const results = await searchImages(text);
    const xmg = results[Math.floor(Math.random() * results.length)];
    await conn.ctaButton.setBody(`📸 *Hasil Pencarian Unsplash* 📸\n\n${xmg.description || "No description available"}`).setFooter('Klik "Next" untuk mencari gambar lainnya').setImage(xmg.urls.full || xmg.urls.regular || xmg.urls.thumb).addReply("Next", usedPrefix + command + " " + text).run(m.chat, conn, m);
    m.react(sukses);
  } catch (e) {
    m.react(eror);
    console.error(e);
  }
};
handler.help = ["unsplash"];
handler.tags = ["misc"];
handler.command = /^(unsplash)$/i;
export default handler;
async function searchImages(term) {
  try {
    const response = await axios.get("https://api.unsplash.com/search/photos", {
      headers: {
        Authorization: "Client-ID mxr-J3YtqewQPrikLf7npmJY7ZvKKcxg7erlUer4bJM"
      },
      params: {
        query: term
      }
    });
    return response.data.results;
  } catch (e) {
    console.error("Error fetching images from Unsplash:", e);
    return [];
  }
}