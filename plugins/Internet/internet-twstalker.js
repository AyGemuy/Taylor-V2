import cheerio from "cheerio";
import fetch from "node-fetch";
const handler = async (m, {
  conn,
  args,
  usedPrefix,
  text,
  command
}) => {
  let lister = ["search", "video"],
    [feature, inputs, inputs_, inputs__, inputs___] = text.split("|");
  if (!lister.includes(feature)) return m.reply("*Example:*\n.twstalker search|vpn\n\n*Pilih type yg ada*\n" + lister.map((v, index) => "  ○ " + v).join("\n"));
  if (lister.includes(feature)) {
    if ("search" === feature) {
      if (!inputs) return m.reply("Input query link\nExample: .twstalker search|jokowi");
      m.react(wait);
      try {
        let teks = (await searchTwstalker(inputs)).map((item, index) => `🔍 *[ RESULT ${index + 1} ]*\n\n📢 *Title:* ${item.title || "Tidak diketahui"}\n🌐 *Link:* ${item.link || "Tidak diketahui"}\n🖼️ *Image:* ${item.image || "Tidak diketahui"}\n🔖 *Tag:* ${item.tag || "Tidak diketahui"}\n`).filter(v => v).join("\n\n________________________\n\n");
        m.reply(teks);
      } catch (e) {
        m.react(eror);
      }
    }
    if ("video" === feature) {
      if (!inputs) return m.reply("Input query link\nExample: .twstalker video|link");
      m.react(wait);
      try {
        let item = await getVideo(inputs),
          videoSources = item.video;
        if (0 === videoSources.length) return m.reply("Tidak ada Video");
        if (inputs_ > videoSources.length) return m.reply(`Pilih angka yg ada dari *1* sampai *${videoSources.length}* saja!`);
        let directLink = videoSources[(inputs_ || 1) - 1],
          cap = `🔍 *[ RESULT ]*\n\n📌 *Author:* ${item.author || "Tidak diketahui"}\n📄 *Description:* ${item.description || "Tidak diketahui"}\n`;
        await conn.sendFile(m.chat, directLink || giflogo, item.title || "Tidak diketahui", cap, m);
      } catch (e) {
        m.react(eror);
      }
    }
  }
};
handler.help = ["twstalker"], handler.tags = ["internet"], handler.command = /^(twstalker)$/i;
export default handler;
async function searchTwstalker(query) {
  const url = `https://twstalker.com/search/?q=${query}`;
  try {
    const response = await fetch(url),
      html = await response.text(),
      $ = cheerio.load(html);
    return $(".Search-results .main-section .all-search-events .user-request-list").map((index, element) => {
      const $element = $(element);
      return {
        title: $element.find(".user-title1").text().trim(),
        tag: $element.find(".user-noti-txt span").text().trim(),
        link: $element.find(".user-request-dt a").attr("href"),
        image: $element.find(".user-request-dt img").attr("src")
      };
    }).get();
  } catch (error) {
    return console.error("Error:", error), [];
  }
}
async function getVideo(url) {
  const response = await fetch(url),
    html = await response.text(),
    $ = cheerio.load(html);
  return {
    author: $('meta[name="author"]').attr("content"),
    description: $('meta[name="description"]').attr("content"),
    video: $("video source").map((index, tag) => $(tag).attr("src")).get()
  };
}