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
  let res = await nightcafe(text),
    listSections = [];
  return Object.values(res).map((v, index) => {
    listSections.push([index + " " + cmenub + " " + v.judul, [
      ["Get Image", usedPrefix + "get " + v.thumb, "\n⌚ *By:* " + author + "\n *Link:* " + v.thumb]
    ]]);
  }), conn.sendList(m.chat, htki + " 📺 nightcafe Search 🔎 " + htka, `⚡ Silakan pilih nightcafe Search di tombol di bawah...\n*Teks yang anda kirim:* ${text}\n\nKetik ulang *${usedPrefix + command}* teks anda untuk mengubah teks lagi`, author, "☂️ nightcafe Search Disini ☂️", listSections, m);
};
handler.help = ["nightcafe"], handler.tags = ["internet"], handler.command = /^nightcafe$/i;
export default handler;
async function nightcafe(query) {
  return new Promise(resolve => {
    axios.get("https://creator.nightcafe.studio/explore?q=" + query).then(({
      data
    }) => {
      const $ = cheerio.load(data),
        thumb = [],
        judul = [],
        result = [];
      $("img").each(function(a, b) {
        $(b).attr("src").startsWith("https://images.nightcafe.studio/") && thumb.push($(b).attr("src"));
      }), $("img").each(function(a, b) {
        judul.push($(b).attr("alt"));
      });
      for (let i = 0; i < thumb.length; i++) result.push({
        thumb: thumb[i],
        judul: judul[i]
      });
      resolve(result);
    });
  });
}