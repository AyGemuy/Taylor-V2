import axios from "axios";
const WIDTH = 339;
const HEIGHT = 500;
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
    const imageUrl = await getFlickrImageURLByKeyword(text);
    await conn.ctaButton.setBody(`*Result Flickr:*\n${text.toUpperCase()}`).setFooter('Klik "Next" untuk mencari gambar lainnya').setImage(imageUrl).addReply("Next", usedPrefix + command + " " + text).run(m.chat, conn, m);
    m.react(sukses);
  } catch (e) {
    m.react(eror);
    console.error(e);
  }
};
handler.help = ["loremflickr"];
handler.tags = ["search"];
handler.command = /^(loremflickr)$/i;
export default handler;
async function getFlickrImageURLByKeyword(keyword) {
  const url = `https://loremflickr.com/json/g/${WIDTH}/${HEIGHT}/${encodeURIComponent(keyword)}/all`;
  try {
    const response = await axios.get(url);
    return response.data.file;
  } catch (error) {
    console.error("Error fetching image:", error.message);
    throw error;
  }
}