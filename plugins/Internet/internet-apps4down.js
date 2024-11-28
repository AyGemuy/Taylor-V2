import * as cheerio from "cheerio";
import fetch from "node-fetch";
const handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) return m.reply("Masukkan query");
  m.react(wait);
  switch (command) {
    case "apps4":
      try {
        const results = await searchApps4(text);
        if (!results.length)
          return m.reply(`Query "${text}" tidak ditemukan :/`);
        const buttons = conn.ctaButton
          .setBody("Pilih aplikasi di bawah ini.")
          .setFooter("Detail lebih lanjut dapat ditemukan di Apps4Download.")
          .addSelection("Klik di sini")
          .makeSections("Apps4Download", "Pilih aplikasi");
        results.forEach((item, index) => {
          buttons.makeRow(
            `🔍 *[ RESULT ${index + 1} ]*`,
            `📰 *Title:* ${item.title}`,
            `📈 *Version:* ${item.version}`,
            `${usedPrefix}apps4app ${item.href}`,
          );
        });
        buttons.run(m.chat, conn, m);
      } catch (e) {
        console.error("Error:", e);
        m.react(eror);
      }
      break;
    case "apps4app":
      try {
        const appInfo = await getDownloadLinks(text);
        if (!appInfo) return m.reply(`URL "${text}" tidak ditemukan :/`);
        const caption =
          `📦 *Detail Aplikasi* 📦\n\n` +
          `🖼️ *Image:* ${appInfo.ogImageUrl}\n` +
          `📜 *Title:* ${appInfo.title}\n` +
          `✒️ *Rating:* ${appInfo.rating}\n` +
          `⭐ *Rating Percentage:* ${appInfo.ratingPercentage}\n` +
          `🔗 *Google Play Link:* ${appInfo.googlePlayLink}\n` +
          `🔗 *Original URL:* ${appInfo.originalUrl}\n` +
          `🔗 *Download Link:* ${appInfo.downloadLink}\n\n` +
          `🗂️ *Information:*\n` +
          `${Object.entries(appInfo.info)
            .map(([key, value]) => `📝 *${key}:* ${value}`)
            .join("\n")}\n\n` +
          `📝 *Additional Info:*\n` +
          `${appInfo.additionalInfo}\n\n` +
          `📦 *Download Info:*\n` +
          `${JSON.stringify(appInfo.downloadInfo, null, 2)}`;
        await conn.sendFile(m.chat, appInfo.ogImageUrl || "", "", caption, m);
        await conn.sendFile(
          m.chat,
          appInfo.downloadLink || "",
          appInfo.title || "Aplikasi",
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
handler.help = ["apps4"];
handler.tags = ["internet"];
handler.command = /^(apps4|apps4app)$/i;
export default handler;
async function searchApps4(query) {
  const url = `https://www.apps4download.com/?s=${encodeURIComponent(query)}`;
  try {
    const response = await fetch(url),
      html = await response.text(),
      $ = cheerio.load(html),
      sections = [];
    $(".bloque-app").each((index, element) => {
      const section = {
        href: $(element).find("a").attr("href"),
        imageSrc: $(element).find("img").attr("data-src"),
        altText: $(element).find("img").attr("alt"),
        title: $(element).find(".title").text().trim(),
        developer: $(element).find(".developer").text().trim(),
        version: $(element).find(".version").text().trim(),
        rating:
          $(element)
            .find(".stars")
            .attr("style")
            ?.match(/width:(\d+)%/)?.[1] || "N/A",
      };
      sections.push(section);
    });
    return sections;
  } catch (error) {
    console.log("Terjadi kesalahan:", error);
    return [];
  }
}
async function getDownloadLinks(url) {
  try {
    const response = await fetch(
        url.endsWith("/?download=links") ? url : `${url}/?download=links`,
      ),
      html = await response.text(),
      $ = cheerio.load(html);
    const gdl = $("ul.show_download_links > li > a")
      .map((index, element) => ({
        downloadLink: $(element).attr("href"),
        title: $(element).text().trim(),
      }))
      .get();
    if (gdl.length > 0) {
      const metaData = await getMetaData(gdl[0]?.downloadLink);
      return metaData;
    }
  } catch (error) {
    console.log("Terjadi kesalahan:", error);
    return null;
  }
}
async function getMetaData(url) {
  try {
    const response = await fetch(url),
      html = await response.text(),
      $ = cheerio.load(html),
      metaTags = $('meta[property^="og"]'),
      metaData = {};
    metaTags.each((index, element) => {
      const property = $(element).attr("property"),
        content = $(element).attr("content");
      metaData[property.slice(3)] = content;
    });
    return metaData;
  } catch (error) {
    console.log("Terjadi kesalahan:", error);
    return null;
  }
}
async function mediafireDl(url) {
  try {
    const res = await fetch(url),
      $ = cheerio.load(await res.text()),
      results = [],
      link = $("a#downloadButton").attr("href"),
      size = $("a#downloadButton")
        .text()
        .replace("Download", "")
        .replace("(", "")
        .replace(")", "")
        .replace("\n", "")
        .trim(),
      nama = link.split("/")[5],
      mime = nama.split(".")[1];
    results.push({
      nama: nama,
      mime: mime,
      size: size,
      link: link,
    });
    return results;
  } catch (error) {
    console.log("Terjadi kesalahan:", error);
    return [];
  }
}
