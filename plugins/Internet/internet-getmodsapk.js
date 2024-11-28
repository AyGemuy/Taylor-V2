import * as cheerio from "cheerio";
import fetch from "node-fetch";
const handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) return m.reply("Masukkan query");
  m.react(wait);
  switch (command) {
    case "modsapk":
      try {
        const results = await searchGetmodsapk(text);
        if (!results.length)
          return m.reply(`Query "${text}" tidak ditemukan :/`);
        const buttons = conn.ctaButton
          .setBody("Pilih aplikasi di bawah ini.")
          .setFooter("Detail lebih lanjut dapat ditemukan di GetModsAPK.")
          .addSelection("Klik di sini")
          .makeSections("GetModsAPK", "Pilih aplikasi");
        results.forEach((item, index) => {
          buttons.makeRow(
            `🔍 *[ RESULT ${index + 1} ]*`,
            `📰 *Title:* ${item.title}`,
            `📝 *Version:* ${item.version}`,
            `${usedPrefix}modsapkapp ${item.url}`,
          );
        });
        buttons.run(m.chat, conn, m);
      } catch (e) {
        console.error("Error:", e);
        m.react(eror);
      }
      break;
    case "modsapkapp":
      try {
        const appInfo = await getDown(text);
        if (!appInfo) return m.reply(`Link "${text}" tidak ditemukan :/`);
        const caption =
          `📦 *Detail Aplikasi* 📦\n\n` +
          `🖼️ *Image:* ${appInfo.ogImage}\n` +
          `📜 *Title:* ${appInfo.ogTitle}\n` +
          `🔗 *Download Link:* ${appInfo.link}\n` +
          `📦 *Size:* ${appInfo.size}`;
        await conn.sendFile(m.chat, appInfo.ogImage || "", "", caption, m);
        await conn.sendFile(
          m.chat,
          appInfo.link || "",
          appInfo.ogTitle || "Aplikasi",
          null,
          m,
          false,
          {
            quoted: m,
            mimetype: "application/vnd.android.package-archive",
          },
        );
        m.react(sukses);
      } catch (e) {
        console.error("Error:", e);
        m.react(eror);
      }
      break;
    default:
      m.reply("Perintah tidak dikenali.");
      break;
  }
};
handler.help = ["modsapk"];
handler.tags = ["internet"];
handler.command = /^(modsapk|modsapkapp)$/i;
export default handler;
async function searchGetmodsapk(query) {
  const searchUrl = `https://getmodsapk.com/search/${encodeURIComponent(query)}`;
  try {
    const response = await fetch(searchUrl),
      html = await response.text(),
      $ = cheerio.load(html),
      data = [];
    $(".post-item").each((index, element) => {
      const post = {
        title: $(element)
          .find(".post-content h3 a")
          .text()
          .trim()
          .replace(/\s+/g, " "),
        url: $(element).find(".post-content h3 a").attr("href"),
        image: encodeURI(
          $(element)
            .find(".post-content img")
            .attr("src")
            .trim()
            .replace(/\s+/g, " "),
        ),
        label: $(element)
          .find(".post-content .label")
          .text()
          .trim()
          .replace(/\s+/g, " "),
        category: $(element)
          .find(".post-content p")
          .text()
          .trim()
          .replace(/\s+/g, " "),
        version: $(element)
          .find("li:nth-child(2) .text-gray-500")
          .text()
          .trim()
          .replace(/\s+/g, " "),
        size: $(element)
          .find("li:nth-child(3) .text-gray-500")
          .text()
          .trim()
          .replace(/\s+/g, " "),
      };
      data.push(post);
    });
    return data;
  } catch (error) {
    console.log("Terjadi kesalahan:", error);
    return [];
  }
}
async function getLinks(url) {
  try {
    const response = await fetch(url),
      html = await response.text(),
      $ = cheerio.load(html),
      downloadElement = $("#download a"),
      downloadLink = downloadElement.attr("href"),
      downloadText = downloadElement.text().trim(),
      downloadSizeMatch = downloadText.match(/\((\d+)\sMB\)/);
    return {
      link: downloadLink,
      text: downloadText,
      size: downloadSizeMatch ? downloadSizeMatch[1] : "",
    };
  } catch (error) {
    console.log("Terjadi kesalahan:", error);
    return null;
  }
}
async function getLinkList(url) {
  try {
    const response = await fetch(url),
      html = await response.text(),
      $ = cheerio.load(html),
      downloadItems = [];
    $("li.mb-2").each((index, element) => {
      const spanElement = $(element).find("span.closed"),
        downloadLinkElement = $(element).find("div a"),
        downloadSizeMatch = downloadLinkElement
          .text()
          .match(/APK (\d+.\d+) MB/);
      downloadItems.push({
        title: spanElement.text().trim(),
        link: downloadLinkElement.attr("href"),
        size: downloadSizeMatch ? downloadSizeMatch[1] : "",
      });
    });
    return downloadItems;
  } catch (error) {
    console.log("Terjadi kesalahan:", error);
    return null;
  }
}
async function getDown(url) {
  try {
    const response = await fetch(url),
      html = await response.text(),
      $ = cheerio.load(html),
      ogImageElement = $('meta[property="og:image"]'),
      ogTitleElement = $('meta[property="og:title"]'),
      downloadLinkElement = $("div[download-process-box]").next(
        "a[download-button]",
      ),
      downloadSizeMatch = downloadLinkElement.text().match(/APK (\d+.\d+) MB/);
    return {
      ogImage: ogImageElement.attr("content"),
      ogTitle: ogTitleElement.attr("content"),
      link: encodeURI(downloadLinkElement.attr("href")),
      size: downloadSizeMatch ? downloadSizeMatch[1] : "",
    };
  } catch (error) {
    console.log("Terjadi kesalahan:", error);
    return null;
  }
}
