import fetch from "node-fetch";
import cheerio from "cheerio";
const handler = async (m, {
  command,
  usedPrefix,
  conn,
  text,
  args
}) => {
  let lister = ["search"],
    [feature, inputs, inputs_, inputs__, inputs___] = text.split("|");
  if (!lister.includes(feature)) throw "*Example:*\n.suratmp3 search|naruto\n\n*Pilih type yg ada*\n" + lister.map((v, index) => "  ○ " + v).join("\n");
  if (lister.includes(feature) && "search" === feature) {
    if (!inputs) throw "Input query reciters number";
    try {
      let teks = (await searchSuratmp3(inputs)).map((anime, index) => `*[ ${index + 1} ]*\n*Title:* ${anime.title}\n*Sound:* ${anime.sound}\n*Download Url:* ${anime.downloadUrl}\n*Listen Url:* ${anime.listenUrl}\n*SubCount:* ${anime.subCount}\n   `.trim()).filter(v => v).join("\n\n________________________\n\n");
      await conn.sendFile(m.chat, logo, "", teks, m);
    } catch (e) {
      m.react(eror);
    }
  }
};
handler.help = ["suratmp3 type query"], handler.tags = ["internet"], handler.command = /^(suratmp3)$/i;
export default handler;
async function searchSuratmp3(query) {
  const url = "https://suratmp3.com/quran/reciters/" + query + "/hq";
  try {
    const response = await fetch(url),
      html = await response.text(),
      $ = cheerio.load(html),
      results = [];
    return $(".playlist.no-top.list li").each((index, element) => {
      const surah = {
        title: $(element).find(".title-container a").text().trim() || "tidak diketahui",
        sound: $(element).find(".icon-play").attr("sound-data") || "tidak diketahui",
        downloadUrl: $(element).find(".spf-link").attr("href") || "tidak diketahui",
        listenUrl: $(element).find(".title-container a").attr("href") || "tidak diketahui",
        subCount: $(element).find(".sub").text().trim() || "tidak diketahui"
      };
      results.push(surah);
    }), results;
  } catch (error) {
    console.log(error);
  }
}