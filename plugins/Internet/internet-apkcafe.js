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
  if (!lister.includes(feature)) return m.reply("*Example:*\n.apkcafe search|vpn\n\n*Pilih type yg ada*\n" + lister.map((v, index) => "  ○ " + v).join("\n"));
  if (lister.includes(feature)) {
    if ("search" === feature) {
      if (!inputs) return m.reply("Input query link\nExample: .apkcafe search|vpn");
      m.react(wait);
      try {
        let teks = (await searchApp(inputs)).map((item, index) => `🔍 *[ RESULT ${index + 1} ]*\n\n📢 *title:* ${item.name}\n🌐 *url:* ${item.href}\n🖼️ *image:* ${item.imgUrl}\n🔖 *name:* ${item.rightHref}\n`).filter(v => v).join("\n\n________________________\n\n");
        m.reply(teks);
      } catch (e) {
        m.react(eror);
      }
    }
    if ("app" === feature) {
      if (!inputs) return m.reply("Input query link\nExample: .apkcafe app|link");
      m.react(wait);
      try {
        let item = (await getInfo(inputs)).version[0],
          cap = `🔍 *[ RESULT ]*\n\n📌 *title:* ${item.title}\n🖼️ *image:* ${item.image}\n🔗 *url:* ${item.url}\n⬇️ *downloadLink:* ${item.downloadLink}\n📦 *fileSize:* ${item.fileSize}\n📱 *deviceInfo:* ${item.deviceInfo}\n🤖 *androidVersion:* ${item.androidVersion}\n💾 *downloadText:* ${item.download.downloadText}\n🔗 *directLink:* ${item.download.directLink}\n📋 *apkTechnicalInfo:*\n${Object.entries(item.download.apkTechnicalInfo).map(([ key, value ]) => key + value.trim()).join("\n")}\n`;
        await conn.sendFile(m.chat, item.image || logo, "", cap, m), await conn.sendFile(m.chat, item.download.directLink || logo, item.title || "Tidak diketahui", null, m, !0, {
          quoted: m,
          mimetype: "application/vnd.android.package-archive"
        });
      } catch (e) {
        m.react(eror);
      }
    }
  }
};
handler.help = ["apkcafe"], handler.tags = ["internet"], handler.command = /^(apkcafe)$/i;
export default handler;
async function searchApp(query) {
  const url = `https://apk.cafe/ajax/apk-search.php?s=${query}`,
    response = await fetch(url),
    html = await response.text(),
    $ = cheerio.load(html),
    results = [];
  return $(".sugg_row").each((index, element) => {
    const suggImg = $(element).find(".sugg_img"),
      suggText = $(element).find(".sugg_text"),
      suggRight = $(element).find(".sugg_right"),
      app = {
        href: suggImg.attr("href"),
        imgUrl: suggImg.find("img").attr("src"),
        name: suggText.text(),
        rightHref: suggRight.attr("href")
      };
    results.push(app);
  }), results;
}
async function getInfo(url) {
  const response = await fetch(url),
    html = await response.text(),
    $ = cheerio.load(html),
    appDetails = [],
    promises = $("li.dwn_up").map(async (index, element) => {
      const downloadLink = $(element).find("a.dwn1").attr("href");
      if (downloadLink.includes("https://apk.cafe/download?file_id")) {
        const fileSize = $(element).find("a.dwn1 span").text().trim(),
          deviceInfo = $(element).find("div.additional_file_info b").text().trim(),
          androidVersion = $(element).find("div.additional_file_info").find(".f_ifo:last-child").text().trim(),
          download = await getDetails(downloadLink),
          app = {
            title: $('meta[property="og:title"]').attr("content"),
            image: $('meta[property="og:image"]').attr("content"),
            url: $('meta[property="og:url"]').attr("content"),
            downloadLink: downloadLink,
            fileSize: fileSize,
            deviceInfo: deviceInfo,
            androidVersion: androidVersion,
            download: download
          };
        appDetails.push(app);
      }
    }).get();
  return await Promise.all(promises), {
    version: appDetails
  };
}
async function getDetails(url) {
  const response = await fetch(url),
    html = await response.text(),
    $ = cheerio.load(html),
    appDetails = {},
    downloadText = $(".text_up2 .text_up").text().trim(),
    directLink = $(".text_up2 .download_text a.dwnDirect").attr("href");
  appDetails.downloadText = downloadText, appDetails.directLink = directLink;
  const apkTechnicalInfo = {};
  return $(".dwn_params_wrap .dwn_params li").each((index, element) => {
    const key = $(element).find("b").text().trim().replace(":", ""),
      value = $(element).text().replace(key, "").trim();
    apkTechnicalInfo[key] = value;
  }), appDetails.apkTechnicalInfo = apkTechnicalInfo, appDetails;
}