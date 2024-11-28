import * as cheerio from "cheerio";
import fetch from "node-fetch";
const handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) return m.reply("Masukkan query");
  m.react(wait);
  switch (command) {
    case "appvn":
      try {
        const results = await searchAppVn(text);
        if (!results.length)
          return m.reply(`Query "${text}" tidak ditemukan :/`);
        const buttons = conn.ctaButton
          .setBody("Pilih aplikasi di bawah ini.")
          .setFooter("Detail lebih lanjut dapat ditemukan di AppVN.")
          .addSelection("Klik di sini")
          .makeSections("AppVN", "Pilih aplikasi");
        results.forEach((item, index) => {
          buttons.makeRow(
            `🔍 *[ RESULT ${index + 1} ]*`,
            `📰 *Title:* ${item.title}`,
            `📦 *Version:* ${item.version}`,
            `${usedPrefix}appvnapp ${item.url}`,
          );
        });
        buttons.run(m.chat, conn, m);
      } catch (e) {
        console.error("Error:", e);
        m.react(eror);
      }
      break;
    case "appvnapp":
      try {
        const appInfo = await getAppVn(text);
        if (!appInfo) return m.reply(`Link "${text}" tidak ditemukan :/`);
        const caption =
          `📦 *Detail Aplikasi* 📦\n\n` +
          `🔗 *Download Link:* ${appInfo.downloadLink}\n` +
          `📝 *Description:* ${appInfo.descriptionTitle}\n` +
          `📝 *Short Description:* ${appInfo.descriptionShort}\n` +
          `📜 *Full Description:* ${appInfo.descriptionFull}\n` +
          `🖼️ *Screenshots:* ${appInfo.screenshots.join("\n")}\n` +
          `🖼️ *OG Image:* ${appInfo.ogImage}`;
        await conn.sendFile(m.chat, appInfo.ogImage || "", "", caption, m);
        await conn.sendFile(
          m.chat,
          appInfo.downloadLink || "",
          appInfo.descriptionShort || "Aplikasi",
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
handler.help = ["appvn"];
handler.tags = ["internet"];
handler.command = /^(appvn|appvnapp)$/i;
export default handler;
async function searchAppVn(query) {
  try {
    const link = "https://appvn.com",
      response = await fetch(
        link + "/android/search?keyword=" + encodeURIComponent(query),
      ),
      body = await response.text(),
      $ = cheerio.load(body),
      resultArray = [];
    $("div.section-content li.item").each((index, element) => {
      const item = {
        title: $(element).find("div.info > a").text().trim(),
        url: link + $(element).find("div.info > a").attr("href"),
        image: $(element).find("img.lazy").attr("data-src"),
        version: $(element)
          .find("div.vol-chap.ver.text-left > p:first-child")
          .text()
          .trim(),
        date: $(element)
          .find("div.vol-chap.ver.text-left > p.new-chap")
          .text()
          .trim(),
        author: $(element).find("div.new-chap.author > a").text().trim(),
        detailLink:
          link + $(element).find("div.btn.btn-download > a").attr("href"),
      };
      resultArray.push(item);
    });
    return resultArray;
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
}
async function infoAppVn(url) {
  try {
    const response = await fetch(url),
      html = await response.text(),
      $ = cheerio.load(html),
      infoTab = $("#info");
    return {
      version: infoTab
        .find("p:nth-child(1)")
        .text()
        .trim()
        .replace("Version: ", ""),
      req: infoTab.find("p:nth-child(2)").text().trim().replace("Req: ", ""),
      latestUpdate: infoTab
        .find("p:nth-child(3)")
        .text()
        .trim()
        .replace("Latest update: ", ""),
      downloadLink: "https://appvn.com" + $(".btn-download a").attr("href"),
      descriptionTitle: $("#des h2").text().trim(),
      descriptionShort: $("#des span._without_desc").text().trim(),
      descriptionFull: $("#des span._full_desc div").text().trim(),
      screenshots: $("#screenshots img")
        .map((_, element) => $(element).attr("src"))
        .get(),
      ogTitle: $('meta[property="og:title"]').attr("content"),
      ogImage: $('meta[property="og:image"]').attr("content"),
    };
  } catch (error) {
    console.error("Error:", error);
  }
}
async function getAppVn(url) {
  try {
    const data = await infoAppVn(url),
      response = await fetch(data.downloadLink),
      html = await response.text(),
      $ = cheerio.load(html),
      onclickValue = $("#info").find(".btn-download a").attr("onclick"),
      downloadArgs = onclickValue
        .match(
          /dowload\('([^']*)', '([^']*)', '([^']*)', '([^']*)'\);return false;/,
        )
        .slice(1),
      get_app = await downloadApk(
        downloadArgs[0],
        downloadArgs[1],
        downloadArgs[2],
        downloadArgs[3],
      );
    return {
      versionId: downloadArgs[0],
      sopcastId: downloadArgs[1],
      packageName: downloadArgs[2],
      versionCode: downloadArgs[3],
      about: data,
      download: get_app,
    };
  } catch (error) {
    console.error("Error:", error);
  }
}
async function downloadApk(
  latestVersion,
  sopcastId,
  package_name,
  version_code = 0,
) {
  try {
    const response = await fetch("https://appvn.com/link-download-direct", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        latest: latestVersion,
        sopcast_id: sopcastId,
        package_name: package_name,
        version_code: version_code,
      }),
    });
    return await response.json();
  } catch (error) {
    console.error("Error:", error);
  }
}
