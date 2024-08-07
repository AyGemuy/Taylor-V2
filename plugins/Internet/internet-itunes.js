import axios from "axios";
import fetch from "node-fetch";
import cheerio from "cheerio";
const handler = async (m, {
  conn,
  args,
  usedPrefix,
  text,
  command
}) => {
  if (!text) throw "Masukkan teks, Ex. Radiogead";
  let su = await fetch("https://itunes.apple.com/search?term=" + text),
    sul = await su.json(),
    listSections = [];
  return Object.values(sul.results).map((v, index) => {
    let des = `\n\n\n*wrapperType:* ${v.wrapperType}\n*artistId:* ${v.artistId}\n*collectionId:* ${v.collectionId}\n*artistName:* ${v.artistName}\n*collectionName:* ${v.collectionName}\n*collectionCensoredName:* ${v.collectionCensoredName}\n*artistViewUrl:* ${v.artistViewUrl}\n*collectionViewUrl:* ${v.collectionViewUrl}\n*artworkUrl60:* ${v.artworkUrl60}\n*artworkUrl100:* ${v.artworkUrl100}\n*collectionPrice:* ${v.collectionPrice}\n*collectionExplicitness:* ${v.collectionExplicitness}\n*trackCount:* ${v.trackCount}\n*copyright:* ${v.copyright}\n*country:* ${v.country}\n*currency:* ${v.currency}\n*releaseDate:* ${v.releaseDate}\n*primaryGenreName:* ${v.primaryGenreName}\n*previewUrl:* ${v.previewUrl}\n*description:* ${v.description}\n`;
    listSections.push([index + " " + cmenub + " " + v.artistName, [
      ["Get Image", usedPrefix + "get " + v.artworkUrl100, des],
      ["Get Audio", usedPrefix + "get " + v.previewUrl, des]
    ]]);
  }), conn.sendList(m.chat, htki + " 📺 itunes Search 🔎 " + htka, `⚡ Silakan pilih itunes Search di tombol di bawah...\n*Teks yang anda kirim:* ${text}\n\nKetik ulang *${usedPrefix + command}* teks anda untuk mengubah teks lagi`, author, "☂️ itunes Search Disini ☂️", listSections, m);
};
handler.help = ["itunes"], handler.tags = ["music", "audio"], handler.command = ["itunes"];
export default handler;