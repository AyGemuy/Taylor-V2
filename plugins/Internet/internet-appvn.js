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
  if (!lister.includes(feature)) return m.reply("*Example:*\n.appvn search|vpn\n\n*Pilih type yg ada*\n" + lister.map((v, index) => "  ○ " + v).join("\n"));
  if (lister.includes(feature)) {
    if ("search" === feature) {
      if (!inputs) return m.reply("Input query link\nExample: .appvn search|vpn");
      m.react(wait);
      try {
        let teks = (await searchAppVn(inputs)).map((item, index) => `🔍 *[ RESULT ${index + 1} ]*\n\n📢 *title:* ${item.title}\n🌐 *url:* ${item.url}\n🖼️ *image:* ${item.image}\n🔖 *version:* ${item.version}\n📅 *date:* ${item.date}\n👤 *author:* ${item.author}\n🔗 *detailLink:* ${item.detailLink}\n`).filter(v => v).join("\n\n________________________\n\n");
        m.reply(teks);
      } catch (e) {
        m.react(eror);
      }
    }
    if ("app" === feature) {
      if (!inputs) return m.reply("Input query link\nExample: .appvn app|link");
      m.react(wait);
      try {
        let item = await getAppVn(inputs),
          cap = `🔍 *[ RESULT ]*\n\n📢 *version:* ${item.about.version}\n🔒 *req:* ${item.about.req}\n📅 *latestUpdate:* ${item.about.latestUpdate}\n⬇️ *downloadLink:* ${item.about.downloadLink}\n📝 *descriptionTitle:* ${item.about.descriptionTitle}\n💬 *descriptionShort:* ${item.about.descriptionShort}\n✒️ *descriptionFull:* ${item.about.descriptionFull}\n📸 *screenshots:*\n• ${item.about.screenshots.join("\n• ")}\n`;
        await conn.sendFile(m.chat, item.about.ogImage || logo, "", cap, m), await conn.sendFile(m.chat, item.download.url || logo, item.about.ogTitle || "Tidak diketahui", null, m, !0, {
          quoted: m,
          mimetype: "application/vnd.android.package-archive"
        });
      } catch (e) {
        m.react(eror);
      }
    }
  }
};
handler.help = ["appvn"], handler.tags = ["internet"], handler.command = /^(appvn)$/i;
export default handler;
async function searchAppVn(query) {
  const link = "https://appvn.com",
    response = await fetch(link + "/android/search?keyword=" + query),
    body = await response.text(),
    $ = cheerio.load(body),
    resultArray = [];
  return $("div.section-content li.item").each((index, element) => {
    const item = {
      title: $(element).find("div.info > a").text().trim(),
      url: link + $(element).find("div.info > a").attr("href"),
      image: $(element).find("img.lazy").attr("data-src"),
      version: $(element).find("div.vol-chap.ver.text-left > p:first-child").text().trim(),
      date: $(element).find("div.vol-chap.ver.text-left > p.new-chap").text().trim(),
      author: $(element).find("div.new-chap.author > a").text().trim(),
      detailLink: link + $(element).find("div.btn.btn-download > a").attr("href")
    };
    resultArray.push(item);
  }), resultArray;
}
async function infoAppVn(url) {
  try {
    const response = await fetch(url),
      html = await response.text(),
      $ = cheerio.load(html),
      infoTab = $("#info");
    return {
      version: infoTab.find("p:nth-child(1)").text().trim().replace("Version: ", ""),
      req: infoTab.find("p:nth-child(2)").text().trim().replace("Req: ", ""),
      latestUpdate: infoTab.find("p:nth-child(3)").text().trim().replace("Latest update: ", ""),
      downloadLink: "https://appvn.com" + $(".btn-download a").attr("href"),
      descriptionTitle: $("#des h2").text().trim(),
      descriptionShort: $("#des span._without_desc").text().trim(),
      descriptionFull: $("#des span._full_desc div").text().trim(),
      screenshots: $("#screenshots img").map((_, element) => $(element).attr("src")).get(),
      ogTitle: $('meta[property="og:title"]').attr("content"),
      ogImage: $('meta[property="og:image"]').attr("content")
    };
  } catch (error) {
    console.error("Error:", error);
  }
}
async function getAppVn(url) {
  const data = await infoAppVn(url);
  try {
    const response = await fetch(data.downloadLink),
      html = await response.text(),
      $ = cheerio.load(html),
      onclickValue = $("#info").find(".btn-download a").attr("onclick"),
      downloadArgs = onclickValue.match(/dowload\('([^']*)', '([^']*)', '([^']*)', '([^']*)'\);return false;/).slice(1),
      get_app = await downloadApk(downloadArgs[0], downloadArgs[1], downloadArgs[2], downloadArgs[3]);
    return {
      versionId: downloadArgs[0],
      sopcastId: downloadArgs[1],
      packageName: downloadArgs[2],
      versionCode: downloadArgs[3],
      about: data,
      download: get_app
    };
  } catch (error) {
    console.error("Error:", error);
  }
}
async function downloadApk(latestVersion, sopcastId, package_name, version_code = 0) {
  try {
    const response = await fetch("https://appvn.com/link-download-direct", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        latest: latestVersion,
        sopcast_id: sopcastId,
        package_name: package_name,
        version_code: version_code
      })
    });
    return await response.json();
  } catch (error) {
    console.error("Error:", error);
  }
}