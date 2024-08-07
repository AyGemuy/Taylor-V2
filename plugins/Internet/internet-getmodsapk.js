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
  if (!lister.includes(feature)) return m.reply("*Example:*\n.modsapk search|vpn\n\n*Pilih type yg ada*\n" + lister.map((v, index) => "  ○ " + v).join("\n"));
  if (lister.includes(feature)) {
    if ("search" === feature) {
      if (!inputs) return m.reply("Input query link\nExample: .modsapk search|vpn");
      m.react(wait);
      try {
        let teks = (await searchGetmodsapk(inputs)).map((item, index) => `🔍 *[ RESULT ${index + 1} ]*\n\n📰 *Title:* ${item.title}\n🔗 *Url:* ${item.url}\n🖼️ *Image:* ${item.image}\n🏷️ *Label:* ${item.label}\n🗂️ *Category:* ${item.category}\n🔢 *Version:* ${item.version}\n📏 *Size:* ${item.size}`).filter(v => v).join("\n\n________________________\n\n");
        m.reply(teks);
      } catch (e) {
        m.react(eror);
      }
    }
    if ("app" === feature) {
      if (!inputs) return m.reply("Input query link\nExample: .modsapk app|link");
      try {
        let res = await getLinks(inputs),
          lis = await getLinkList(res.link),
          resl = await getDown(lis[0]?.link),
          cap = `*Title:* ${resl.ogTitle}\n*Size:* ${resl.size}\n\n${wait}`;
        await conn.sendFile(m.chat, logo, "", cap, m), await conn.sendFile(m.chat, resl.link, resl.ogTitle, null, m, !0, {
          quoted: m,
          mimetype: "application/vnd.android.package-archive"
        });
      } catch (e) {
        m.react(eror);
      }
    }
  }
};
handler.help = ["modsapk"], handler.tags = ["internet"], handler.command = /^(modsapk)$/i;
export default handler;
async function searchGetmodsapk(query) {
  const searchUrl = `https://getmodsapk.com/search/${query}`;
  try {
    const response = await fetch(searchUrl),
      html = await response.text(),
      $ = cheerio.load(html),
      data = [];
    return $(".post-item").each((index, element) => {
      const post = {};
      post.title = $(element).find(".post-content h3 a").text().trim().replace(/\s+/g, " "),
        post.url = $(element).find(".post-content h3 a").attr("href"), post.image = encodeURI($(element).find(".post-content img").attr("src").trim().replace(/\s+/g, " ")),
        post.label = $(element).find(".post-content .label").text().trim().replace(/\s+/g, " "),
        post.category = $(element).find(".post-content p").text().trim().replace(/\s+/g, " "),
        post.version = $(element).find("li:nth-child(2) .text-gray-500").text().trim().replace(/\s+/g, " "),
        post.size = $(element).find("li:nth-child(3) .text-gray-500").text().trim().replace(/\s+/g, " "),
        data.push(post);
    }), data;
  } catch (error) {
    return console.log("Terjadi kesalahan:", error), null;
  }
}
async function getLinks(url) {
  try {
    const response = await fetch(url),
      html = await response.text(),
      downloadElement = cheerio.load(html)("#download a"),
      downloadLink = downloadElement.attr("href"),
      downloadText = downloadElement.text().trim(),
      downloadSizeMatch = downloadText.match(/\((\d+)\sMB\)/);
    return {
      link: downloadLink,
      text: downloadText,
      size: downloadSizeMatch ? downloadSizeMatch[1] : ""
    };
  } catch (error) {
    return console.log("Terjadi kesalahan:", error), null;
  }
}
async function getLinkList(url) {
  try {
    const response = await fetch(url),
      html = await response.text(),
      $ = cheerio.load(html),
      downloadItems = [];
    return $("li.mb-2").each((index, element) => {
      const spanElement = $(element).find("span.closed"),
        downloadLinkElement = $(element).find("div a"),
        downloadSizeMatch = downloadLinkElement.text().match(/APK (\d+.\d+) MB/);
      downloadItems.push({
        title: spanElement.text().trim(),
        link: downloadLinkElement.attr("href"),
        size: downloadSizeMatch ? downloadSizeMatch[1] : ""
      });
    }), downloadItems;
  } catch (error) {
    return console.log("Terjadi kesalahan:", error), null;
  }
}
async function getDown(url) {
  try {
    const response = await fetch(url),
      html = await response.text(),
      $ = cheerio.load(html),
      ogImageElement = $('meta[property="og:image"]'),
      ogTitleElement = $('meta[property="og:title"]'),
      downloadLinkElement = $("div[download-process-box]").next("a[download-button]"),
      downloadSizeMatch = downloadLinkElement.text().match(/APK (\d+.\d+) MB/);
    return {
      ogImage: ogImageElement.attr("content"),
      ogTitle: ogTitleElement.attr("content"),
      link: encodeURI(downloadLinkElement.attr("href")),
      size: downloadSizeMatch ? downloadSizeMatch[1] : ""
    };
  } catch (error) {
    return console.log("Terjadi kesalahan:", error), null;
  }
}