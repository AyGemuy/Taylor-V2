import * as cheerio from "cheerio";
import fetch from "node-fetch";
const handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) return m.reply("Masukkan query");
  m.react(wait);
  switch (command) {
    case "modcombo":
      try {
        const results = await searchModcombo(text);
        if (!results.length)
          return m.reply(`Query "${text}" tidak ditemukan :/`);
        const buttons = conn.ctaButton
          .setBody("Pilih aplikasi di bawah ini.")
          .setFooter("Detail lebih lanjut dapat ditemukan di ModCombo.")
          .addSelection("Klik di sini")
          .makeSections("ModCombo", "Pilih aplikasi");
        results.forEach((item, index) => {
          buttons.makeRow(
            `🔍 *[ RESULT ${index + 1} ]*`,
            `📰 *Title:* ${item.title}`,
            `🔗 *URL:* ${item.href}`,
            `${usedPrefix}modcomboapp ${item.href}`,
          );
        });
        buttons.run(m.chat, conn, m);
      } catch (e) {
        console.error("Error:", e);
        m.react(eror);
      }
      break;
    case "modcomboapp":
      try {
        const appInfo = await getAppInfo(text);
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
handler.help = ["modcombo"];
handler.tags = ["internet"];
handler.command = /^(modcombo|modcomboapp)$/i;
export default handler;
async function searchModcombo(query) {
  try {
    const url = `https://modcombo.com/?s=${encodeURIComponent(query)}`;
    const response = await fetch(url),
      html = await response.text(),
      $ = cheerio.load(html);
    return $(".blogs.w3 li")
      .map((index, element) => ({
        title: $(element).find("a .title").text(),
        href: $(element).find("a").attr("href"),
        image: $(element).find("img").attr("data-src"),
        alt: $(element).find("img").attr("alt"),
        datetime: $(element).find("time").attr("datetime"),
      }))
      .get();
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
}
async function getAppInfo(url) {
  try {
    const response = await fetch(url),
      html = await response.text(),
      $ = cheerio.load(html),
      ogImageUrl = $('meta[property="og:image"]').attr("content"),
      pid = $("#ApkOriginal").attr("data-id"),
      appid = $("#ApkOriginal").attr("data-name"),
      googlePlayLink = `https://play.google.com/store/apps/details?id=${appid}`,
      downloadLink = $(".entry-download a.btn-download").attr("href"),
      downloadInfo = await fetchAPKInfo(pid, appid),
      info = {};
    $(".apk-info-table tbody tr").each((index, element) => {
      const key = $(element).find("th").text().trim(),
        value = $(element).find("td").text().trim();
      info[key] = value;
    });
    const title = $(".page-title").text().trim(),
      rating = $(".box-stars span.score").text().trim(),
      ratingPercentage = $(".box-stars span.over").attr("style"),
      additionalInfo = `${$(".sbhTitle h2 span").text().trim()}\n${$("#content-desc").text().trim()}`;
    return {
      pid: pid,
      appid: appid,
      title: title,
      rating: rating,
      ratingPercentage: ratingPercentage,
      googlePlayLink: googlePlayLink,
      originalUrl: url,
      downloadLink: downloadLink,
      info: info,
      additionalInfo: additionalInfo,
      downloadInfo: downloadInfo,
      ogImageUrl: ogImageUrl,
    };
  } catch (error) {
    console.error("Error:", error);
    throw new Error(`Terjadi kesalahan: ${error}`);
  }
}
async function fetchAPKInfo(pid, appid) {
  try {
    const response = await fetch("https://modcombo.com/getapk", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        pid: pid,
        appid: appid,
      }),
    });
    return await response.json();
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}
