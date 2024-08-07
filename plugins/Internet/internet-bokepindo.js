import cheerio from "cheerio";
import fetch from "node-fetch";
const handler = async (m, {
  conn,
  args,
  usedPrefix,
  text,
  command
}) => {
  let lister = ["search", "stream"],
    [feature, inputs, inputs_, inputs__, inputs___] = text.split("|");
  if (!lister.includes(feature)) return m.reply("*Example:*\n.bokepindo search|vpn\n\n*Pilih type yg ada*\n" + lister.map((v, index) => "  ○ " + v).join("\n"));
  if (lister.includes(feature)) {
    if ("search" === feature) {
      if (!inputs) return m.reply("Input query link\nExample: .bokepindo search|vpn");
      m.react(wait);
      try {
        let teks = (await searchBokepindo(inputs)).map((item, index) => `🔍 *[ HASIL ${index + 1} ]*\n\n🆔 Video UID: ${item.videoUid}\n📂 Post ID: ${item.postId}\n📚 Judul: ${item.title}\n🖼️ Thumbnail: ${item.thumbnailSrc}\n📽️ HD Video: ${item.hdVideo}\n👁️ Views: ${item.views}\n⌛ Durasi: ${item.duration}\n🔗 Link Video: ${item.videoLink}\n`).filter(v => v).join("\n\n________________________\n\n");
        m.reply(teks);
      } catch (e) {
        m.react(eror);
      }
    }
    if ("stream" === feature) {
      if (!inputs) return m.reply("Input query link\nExample: .bokepindo search|group");
      m.react(wait);
      try {
        let cap = `🔍 *[ RESULT ]*\n\n🔗 link: ${await streamBokepindo(inputs)}\n`;
        m.reply(cap);
      } catch (e) {
        m.react(eror);
      }
    }
  }
};
handler.help = ["bokepindo"], handler.tags = ["internet"], handler.command = /^(bokepindo)$/i;
export default handler;
async function searchBokepindo(s) {
  try {
    const response = await fetch("https://bokepindo13.pro/?s=" + s);
    if (!response.ok) throw new Error("Failed to fetch data");
    const $ = cheerio.load(await response.text());
    return $("article[data-video-uid]").map((index, element) => ({
      videoUid: $(element).attr("data-video-uid"),
      postId: $(element).attr("data-post-id"),
      title: $(element).find("a").attr("title"),
      thumbnailSrc: $(element).find("img").attr("data-src"),
      hdVideo: $(element).find(".hd-video").text(),
      views: $(element).find(".views").text(),
      duration: $(element).find(".duration").text(),
      videoLink: $(element).find("a").attr("href")
    })).get();
  } catch (error) {
    throw console.error("Error fetching data:", error), error;
  }
}
async function streamBokepindo(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Failed to fetch data");
    const $ = cheerio.load(await response.text());
    return $("#bkpdo-player-container iframe").attr("src");
  } catch (error) {
    throw console.error("Error fetching video src:", error), error;
  }
}