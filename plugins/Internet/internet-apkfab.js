import cheerio from "cheerio";
import fetch from "node-fetch";
const handler = async (m, {
  conn,
  args,
  usedPrefix,
  text,
  command
}) => {
  let lister = ["search", "app"],
    [feature, inputs, inputs_, inputs__, inputs___] = text.split("|");
  if (!lister.includes(feature)) return m.reply("*Example:*\n.apkfab search|vpn\n\n*Pilih type yg ada*\n" + lister.map((v, index) => "  ○ " + v).join("\n"));
  if (lister.includes(feature)) {
    if ("search" === feature) {
      if (!inputs) return m.reply("Input query link\nExample: .apkfab search|vpn");
      m.react(wait);
      try {
        let teks = (await fetchSearchResults(inputs)).map((item, index) => `🔍 [ RESULT ${index + 1} ]\n\n📚 *title:* ${item.title}\n🔗 *link:* ${item.link}\n🖼️ *image:* ${item.image}\n⭐ *rating:* ${item.rating}\n📝 *review:* ${item.review}\n`).filter(v => v).join("\n\n________________________\n\n");
        m.reply(teks);
      } catch (e) {
        m.react(eror);
      }
    }
    if ("app" === feature) {
      if (!inputs) return m.reply("Input query link\nExample: .apkfab app|link");
      try {
        let resl = await fetchDownloadDetails(inputs),
          cap = "*Name:* " + resl.title + "\n*Link:* " + resl.link + "\n\n" + wait;
        await conn.sendFile(m.chat, logo, "", cap, m), await conn.sendFile(m.chat, resl.downloadURL, resl.title, null, m, !0, {
          quoted: m,
          mimetype: "application/vnd.android.package-archive"
        });
      } catch (e) {
        m.react(eror);
      }
    }
  }
};
handler.help = ["apkfab"], handler.tags = ["internet"], handler.command = /^(apkfab)$/i;
export default handler;
async function fetchSearchResults(q) {
  try {
    const url = "https://apkfab.com/search?q=" + q,
      response = await fetch(url),
      body = await response.text(),
      $ = cheerio.load(body);
    return $(".list-template.lists .list").map((index, element) => ({
      title: $(element).find(".title").text().trim(),
      link: $(element).find("a").attr("href"),
      image: $(element).find(".icon img").attr("data-src"),
      rating: $(element).find(".other .rating").text().trim(),
      review: $(element).find(".other .review").text().trim()
    })).get();
  } catch (error) {
    return console.error("Error fetching search results:", error), [];
  }
}
async function fetchDownloadDetails(url) {
  try {
    const response = await fetch(url.endsWith("/download") ? url : url + "/download"),
      body = await response.text(),
      $ = cheerio.load(body),
      title = $(".download_button_box a.down_btn").attr("title"),
      link = $(".download_button_box a.down_btn").attr("href"),
      downloadURL = `https://d.apkpure.com/b/APK/${link.split("/")[4]}?version=latest`;
    return {
      title: title,
      link: link,
      downloadURL: downloadURL
    };
  } catch (error) {
    console.error("Error fetching download details:", error);
  }
}