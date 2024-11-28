import * as cheerio from "cheerio";
import fetch from "node-fetch";
const handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) return m.reply("Masukkan query");
  m.react(wait);
  switch (command) {
    case "apkgk":
      try {
        const results = await searchApp(text);
        if (!results.length)
          return m.reply(`Query "${text}" tidak ditemukan :/`);
        const buttons = conn.ctaButton
          .setBody("Pilih aplikasi di bawah ini.")
          .setFooter("Detail lebih lanjut dapat ditemukan di APKGK.")
          .addSelection("Klik di sini")
          .makeSections("APKGK", "Pilih aplikasi");
        results.forEach((item, index) => {
          buttons.makeRow(
            `🔍 *[ RESULT ${index + 1} ]*`,
            `📰 *Title:* ${item.title}`,
            `📅 *Date:* ${item.date}`,
            `${usedPrefix}apkgkapp ${item.href}`,
          );
        });
        buttons.run(m.chat, conn, m);
      } catch (e) {
        console.error("Error:", e);
        m.react(eror);
      }
      break;
    case "apkgkapp":
      try {
        const appInfo = await getApp(text);
        if (!appInfo) return m.reply(`Link "${text}" tidak ditemukan :/`);
        const caption =
          `📦 *Detail Aplikasi* 📦\n\n` +
          `📰 *Title:* ${appInfo.title}\n` +
          `🔗 *App Link:* ${appInfo.link}\n` +
          `🖼️ *Image:* ${appInfo.info.ogImageUrl}\n` +
          `📄 *Description:* ${appInfo.info.description}\n` +
          `📊 *Version Info:*\n` +
          `  *Version:* ${appInfo.info.version}\n` +
          `  *Category:* ${appInfo.info.category}\n` +
          `  *Last Updated:* ${appInfo.info.lastUpdated}\n` +
          `  *Installs:* ${appInfo.info.installs}\n` +
          `  *Developer:* ${appInfo.info.developer}\n` +
          `  *Requirements:* ${appInfo.info.requires}\n` +
          `  *Rating:* ${appInfo.info.rating}\n` +
          `  *Google Play:* ${appInfo.info.googlePlay}\n` +
          `  *APK Link:* ${appInfo.info.apkLink}`;
        await conn.sendFile(
          m.chat,
          appInfo.info.ogImageUrl || "",
          "",
          caption,
          m,
        );
        await conn.sendFile(
          m.chat,
          appInfo.info.apkLink || "",
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
handler.help = ["apkgk"];
handler.tags = ["internet"];
handler.command = /^(apkgk|apkgkapp)$/i;
export default handler;
async function searchApp(query) {
  const proxyUrl = Object.entries(APIs).find(([key]) =>
    key.includes("proxy"),
  )?.[1];
  try {
    const response = await fetch(
        `${proxyUrl}https://apkgk.com/search/?keyword=${encodeURIComponent(query)}`,
      ),
      html = await response.text(),
      $ = cheerio.load(html),
      items = [];
    $("li").each((index, element) => {
      const item = {
        href: "https://apkgk.com" + $("a", element).attr("href"),
        title: $("a", element).attr("title"),
        imageSrc: "https:" + $("img", element).attr("data-src"),
        date: $(".info-img-dt", element).text().trim(),
      };
      if (Object.values(item).every((value) => value !== undefined)) {
        items.push(item);
      }
    });
    return items;
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
}
async function infoApp(url) {
  const proxyUrl = Object.entries(APIs).find(([key]) =>
    key.includes("proxy"),
  )?.[1];
  try {
    const response = await fetch(proxyUrl + url),
      html = await response.text(),
      $ = cheerio.load(html);
    return {
      version: $("div.version span").text().trim(),
      category: $("div.Category span").text().trim(),
      lastUpdated: $("div.last-updated time").text().trim(),
      installs: $("div.Installs a").text().trim(),
      developer: $("div.developer span").text().trim(),
      requires: $("div.Requirements div.item").text().trim(),
      rating: $("div.Content-Rating div.item").text().trim(),
      googlePlay: $("div.Get-it-on a").attr("href"),
      apkLink:
        "https://apkgk.com" + $("div.detail-box-download a").attr("href"),
      ogImageUrl: $('meta[property="og:image"]').attr("content"),
    };
  } catch (error) {
    console.log("Error:", error);
  }
}
async function getApp(url) {
  const proxyUrl = Object.entries(APIs).find(([key]) =>
    key.includes("proxy"),
  )?.[1];
  try {
    const response = await fetch(
        proxyUrl + (url.endsWith("/download") ? url : url + "/download"),
      ),
      html = await response.text(),
      $ = cheerio.load(html),
      info = await infoApp(proxyUrl + url.replace(/\/download$/, ""));
    return {
      title: $("div.program-title h1").text().trim(),
      info: info,
      link: proxyUrl + "https:" + $("div.c-download a").attr("href"),
    };
  } catch (error) {
    console.log("Error:", error);
  }
}
