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
  if (!lister.includes(feature)) return m.reply("*Example:*\n.apkhouse search|vpn\n\n*Pilih type yg ada*\n" + lister.map((v, index) => "  ○ " + v).join("\n"));
  if (lister.includes(feature)) {
    if ("search" === feature) {
      if (!inputs) return m.reply("Input query link\nExample: .apkhouse search|vpn");
      m.react(wait);
      try {
        let teks = (await searchApkhouse(inputs)).map((item, index) => `🔍 *[ RESULT ${index + 1} ]*\n\n🔗 *Url:* ${item.href}\n🖼️ *Image:* ${item.imageSrc}\n📰 *Title:* ${item.title}\n👩‍💻 *Developer:* ${item.developer}\n🔢 *Version:* ${item.version}\n⭐️ *Rating:* ${item.rating}`).filter(v => v).join("\n\n________________________\n\n");
        m.reply(teks);
      } catch (e) {
        m.react(eror);
      }
    }
    if ("app" === feature) {
      if (!inputs) return m.reply("Input query link\nExample: .apkhouse app|link");
      try {
        let resl = await getApkhouse(inputs),
          cap = "*Name:* " + resl[0]?.text + "\n*Link:* " + resl[0]?.link + "\n\n" + wait;
        await conn.sendFile(m.chat, resl[0]?.ogImageUrl, "", cap, m), await conn.sendFile(m.chat, resl[0]?.link, resl[0]?.text, null, m, !0, {
          quoted: m,
          mimetype: "application/vnd.android.package-archive"
        });
      } catch (e) {
        m.react(eror);
      }
    }
  }
};
handler.help = ["apkhouse"], handler.tags = ["internet"], handler.command = /^(apkhouse)$/i;
export default handler;
async function searchApkhouse(q) {
  const url = "https://apk-house.com/?s=" + q,
    response = await fetch(url),
    html = await response.text(),
    $ = cheerio.load(html);
  return $(".bloque-app").map((index, element) => {
    const appElement = $(element),
      linkElement = appElement.find("a"),
      imageElement = appElement.find("img"),
      titleElement = appElement.find(".title"),
      developerElement = appElement.find(".developer"),
      versionElement = appElement.find(".version"),
      ratingElement = appElement.find(".stars");
    return {
      href: linkElement.attr("href"),
      imageSrc: imageElement.attr("data-src"),
      alt: imageElement.attr("alt"),
      title: titleElement.text().trim(),
      developer: developerElement.text().trim(),
      version: versionElement.text().trim(),
      rating: ratingElement.attr("style").replace("width:", "").replace("%", "").trim()
    };
  }).get();
}
async function getApkhouse(url) {
  const response = await fetch(url.endsWith("?download=links") ? url : url + "?download=links"),
    html = await response.text(),
    $ = cheerio.load(html);
  return $(".bx-download li").map((index, element) => {
    const linkElement = $(element).find("a");
    return {
      link: linkElement.attr("href"),
      text: linkElement.text().trim(),
      ogImageUrl: $('meta[property="og:image"]').attr("content")
    };
  }).get();
}