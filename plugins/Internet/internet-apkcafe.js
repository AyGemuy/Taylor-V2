import * as cheerio from "cheerio";
import fetch from "node-fetch";
const handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) return m.reply("Masukkan query");
  m.react(wait);
  switch (command) {
    case "apkcafe":
      try {
        const results = await searchApp(text);
        if (!results.length)
          return m.reply(`Query "${text}" tidak ditemukan :/`);
        const buttons = conn.ctaButton
          .setBody("Pilih aplikasi di bawah ini.")
          .setFooter("Keterangan lebih lanjut dapat ditemukan di APKCAFE.")
          .addSelection("Klik di sini")
          .makeSections("APKCAFE", "Pilih aplikasi");
        results.forEach((item, index) => {
          buttons.makeRow(
            `🔍 *[ RESULT ${index + 1} ]*`,
            `📰 *Name:* ${item.name}`,
            `🖼️ *Image:* ${item.imgUrl}`,
            `${usedPrefix}apkcafeapp ${item.href}`,
          );
        });
        buttons.run(m.chat, conn, m);
      } catch (e) {
        console.error("Error:", e);
        m.react(eror);
      }
      break;
    case "apkcafeapp":
      try {
        const appInfo = await getInfo(text);
        if (!appInfo || !appInfo.version.length)
          return m.reply(`Link "${text}" tidak ditemukan :/`);
        const caption = appInfo.version
          .map(
            (info) =>
              `📦 *Detail Aplikasi* 📦\n\n` +
              `📝 *Title:* ${info.title}\n` +
              `🖼️ *Image:* ${info.image}\n` +
              `🔗 *URL:* ${info.url}\n` +
              `⬇️ *Download Link:* ${info.downloadLink}\n` +
              `📏 *File Size:* ${info.fileSize}\n` +
              `📱 *Device Info:* ${info.deviceInfo}\n` +
              `📱 *Android Version:* ${info.androidVersion}\n` +
              `🔗 *Download:* ${info.download.downloadText}\n` +
              `⬇️ *Direct Link:* ${info.download.directLink}\n`,
          )
          .join("\n\n");
        await conn.sendFile(m.chat, info.image || "", "", caption, m);
        await conn.sendFile(
          m.chat,
          info.download.directLink || "",
          info.title || "Aplikasi",
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
handler.help = ["apkcafe"];
handler.tags = ["internet"];
handler.command = /^(apkcafe|apkcafeapp)$/i;
export default handler;
async function searchApp(query) {
  const url = `https://apk.cafe/ajax/apk-search.php?s=${encodeURIComponent(query)}`;
  try {
    const response = await fetch(url),
      html = await response.text(),
      $ = cheerio.load(html),
      results = [];
    $(".sugg_row").each((index, element) => {
      const $element = $(element);
      const app = {
        href: $element.find(".sugg_img").attr("href"),
        imgUrl: $element.find(".sugg_img img").attr("src"),
        name: $element.find(".sugg_text").text(),
        rightHref: $element.find(".sugg_right").attr("href"),
      };
      results.push(app);
    });
    return results;
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
}
async function getInfo(url) {
  try {
    const response = await fetch(url),
      html = await response.text(),
      $ = cheerio.load(html),
      appDetails = [];
    const promises = $("li.dwn_up")
      .map(async (index, element) => {
        const downloadLink = $(element).find("a.dwn1").attr("href");
        if (downloadLink.includes("https://apk.cafe/download?file_id")) {
          const fileSize = $(element).find("a.dwn1 span").text().trim(),
            deviceInfo = $(element)
              .find("div.additional_file_info b")
              .text()
              .trim(),
            androidVersion = $(element)
              .find("div.additional_file_info .f_ifo:last-child")
              .text()
              .trim(),
            download = await getDetails(downloadLink),
            app = {
              title: $('meta[property="og:title"]').attr("content"),
              image: $('meta[property="og:image"]').attr("content"),
              url: $('meta[property="og:url"]').attr("content"),
              downloadLink: downloadLink,
              fileSize: fileSize,
              deviceInfo: deviceInfo,
              androidVersion: androidVersion,
              download: download,
            };
          appDetails.push(app);
        }
      })
      .get();
    await Promise.all(promises);
    return {
      version: appDetails,
    };
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}
async function getDetails(url) {
  try {
    const response = await fetch(url),
      html = await response.text(),
      $ = cheerio.load(html),
      appDetails = {};
    appDetails.downloadText = $(".text_up2 .text_up").text().trim();
    appDetails.directLink = $(".text_up2 .download_text a.dwnDirect").attr(
      "href",
    );
    const apkTechnicalInfo = {};
    $(".dwn_params_wrap .dwn_params li").each((index, element) => {
      const key = $(element).find("b").text().trim().replace(":", ""),
        value = $(element).text().replace(key, "").trim();
      apkTechnicalInfo[key] = value;
    });
    appDetails.apkTechnicalInfo = apkTechnicalInfo;
    return appDetails;
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}
