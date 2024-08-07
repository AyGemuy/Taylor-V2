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
  if (!lister.includes(feature)) return m.reply("*Example:*\n.apkgod search|vpn\n\n*Pilih type yg ada*\n" + lister.map((v, index) => "  ○ " + v).join("\n"));
  if (lister.includes(feature)) {
    if ("search" === feature) {
      if (!inputs) return m.reply("Input query link\nExample: .apkgod search|vpn");
      m.react(wait);
      try {
        let teks = (await searchApkgod(inputs)).map((item, index) => `🔍 *[ RESULT ${index + 1} ]*\n\n🔗 *Url:* ${item.link}\n📰 *Title:* ${item.title}\n🖼️ *Image:* ${item.image}\n🏷️ *Tags:* ${item.tags}\n🔢 *Version:* ${item.version}`).filter(v => v).join("\n\n________________________\n\n");
        m.reply(teks);
      } catch (e) {
        m.react(eror);
      }
    }
    if ("app" === feature) {
      if (!inputs) return m.reply("Input query link\nExample: .apkgod app|link");
      try {
        let resu = await getLinkDown(inputs),
          resl = await getResultLink(resu[0]?.link),
          cap = "*Name:* " + resl.title + "\n*Link:* " + resl.link + "\n\n" + wait;
        await conn.sendFile(m.chat, resl.icon, "", cap, m), await conn.sendFile(m.chat, resl.link, resl.title, null, m, !0, {
          quoted: m,
          mimetype: "application/vnd.android.package-archive"
        });
      } catch (e) {
        m.react(eror);
      }
    }
  }
};
handler.help = ["apkgod"], handler.tags = ["internet"], handler.command = /^(apkgod)$/i;
export default handler;
async function searchApkgod(q) {
  const url = "https://apkgod.co/?s=" + q,
    response = await fetch(url),
    html = await response.text(),
    $ = cheerio.load(html),
    items = [];
  return $("article.flex-item").each((index, element) => {
    const $element = $(element),
      item = {
        title: $element.find(".app-name h3").text().trim(),
        image: $element.find(".app-icon img").attr("src"),
        version: $element.find(".app-name .has-small-font-size").first().text().trim(),
        tags: $element.find(".app-tags .app-tag").map((index, tag) => $(tag).text().trim()).get(),
        link: $element.find("a.app").attr("href")
      };
    items.push(item);
  }), items;
}
async function getLinkDown(url) {
  try {
    const response = await fetch(url.endsWith("/download") ? url : url + "/download"),
      html = await response.text(),
      $ = cheerio.load(html),
      downloadList = $(".download-list.margin-top-15"),
      results = [];
    return downloadList.find("details").each((index, element) => {
      const downloadItem = $(element).find(".download-item"),
        icon = downloadItem.find(".download-item-icon img").attr("src"),
        name = downloadItem.find(".download-item-name .has-vivid-cyan-blue-color").text().trim(),
        link = $(element).find(".collapsible-body .wp-block-button__link").attr("href");
      results.push({
        icon: icon,
        name: name,
        link: link
      });
    }), results;
  } catch (error) {
    throw new Error(`Scraping failed: ${error}`);
  }
}
async function getResultLink(url) {
  try {
    const response = await fetch(url),
      html = await response.text(),
      $ = cheerio.load(html),
      entryContent = $(".entry-block.entry-content.main-entry-content"),
      appIcon = entryContent.find(".app-icon img").attr("src"),
      appName = entryContent.find(".app-name .app-box-name-heading h1").text().trim(),
      appVersion = appName.match(/\[Latest\]$/i) ? "Latest" : "",
      appRating = entryContent.find(".app-name .rating span.star.active").length,
      downloadButton = $("#download-button").attr("href");
    return {
      icon: appIcon,
      title: appName,
      version: appVersion,
      rating: appRating,
      link: downloadButton
    };
  } catch (error) {
    throw new Error(`Scraping failed: ${error}`);
  }
}