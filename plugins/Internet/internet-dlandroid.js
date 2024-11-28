import * as cheerio from "cheerio";
import fetch from "node-fetch";
const handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) return m.reply("Masukkan query");
  m.react(wait);
  switch (command) {
    case "dlandroid":
      try {
        const results = await searchDlandroid(text);
        if (!results.length)
          return m.reply(`Query "${text}" tidak ditemukan :/`);
        const buttons = conn.ctaButton
          .setBody("Pilih aplikasi di bawah ini.")
          .setFooter("Detail lebih lanjut dapat ditemukan di DLAndroid.")
          .addSelection("Klik di sini")
          .makeSections("DLAndroid", "Pilih aplikasi");
        results.forEach((item, index) => {
          buttons.makeRow(
            `🔍 *[ RESULT ${index + 1} ]*`,
            `📰 *Title:* ${item.title}`,
            `📝 *Description:* ${item.description}`,
            `${usedPrefix}dlandroidapp ${item.downloadLink}`,
          );
        });
        buttons.run(m.chat, conn, m);
      } catch (e) {
        console.error("Error:", e);
        m.react(eror);
      }
      break;
    case "dlandroidapp":
      try {
        const appInfo = await getDlandroid(text);
        if (!appInfo) return m.reply(`Link "${text}" tidak ditemukan :/`);
        const caption =
          `📦 *Detail Aplikasi* 📦\n\n` +
          `⭐ *Rating:* ${appInfo.rating}\n` +
          `📜 *Title:* ${appInfo.title}\n` +
          `🖼️ *Image:* ${appInfo.ogImageUrl}\n` +
          `🔗 *Download Link:* ${appInfo.downloadLink}\n` +
          `🤖 *Requires Android:* ${appInfo.requiresAndroid}\n` +
          `📦 *File Size:* ${appInfo.fileSize}\n` +
          `🛠️ *Help:* ${appInfo.help.map((h) => `🔗 ${h.buttonText}: ${h.link}`).join("\n")}`;
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
handler.help = ["dlandroid"];
handler.tags = ["internet"];
handler.command = /^(dlandroid|dlandroidapp)$/i;
export default handler;
async function searchDlandroid(query) {
  const url = `https://dlandroid.com/?s=${encodeURIComponent(query)}`;
  try {
    const proxyUrl = Object.entries(APIs).find(([key]) =>
      key.includes("proxy"),
    )?.[1];
    const response = await fetch(proxyUrl + url),
      html = await response.text(),
      $ = cheerio.load(html);
    return $("div.post")
      .map((index, element) => {
        const postElement = $(element);
        return {
          title: postElement.find("a.onvan > h2").eq(0).text().trim(),
          description: postElement.find("div.matn-post > p").text(),
          date: postElement.find("span.info").eq(0).text().trim(),
          categories: postElement
            .find("span.info")
            .eq(1)
            .find("a")
            .map((index, el) => $(el).text())
            .get(),
          downloadLink: postElement.find("a.more").attr("href"),
        };
      })
      .get();
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
}
async function getDlandroid(url) {
  const proxyUrl = Object.entries(APIs).find(([key]) =>
    key.includes("proxy"),
  )?.[1];
  try {
    const response = await fetch(
        proxyUrl + (url.endsWith("/download") ? url : url + "/download"),
      ),
      html = await response.text(),
      $ = cheerio.load(html);
    return {
      rating: $("span.rateshow").text(),
      title: $("a.img-n").attr("title"),
      ogImageUrl: $('meta[property="og:image"]').attr("content"),
      downloadLink: $("div.bilorda a#dllink").attr("href"),
      requiresAndroid: $("ul.infodl li:nth-child(1)")
        .text()
        .trim()
        .split(":")[1]
        .trim(),
      fileSize: $("ul.infodl li:nth-child(2)")
        .text()
        .trim()
        .split(":")[1]
        .trim(),
      help: $("div.help a")
        .map((index, element) => ({
          buttonText: $(element).find("button").text(),
          link: $(element).attr("href"),
        }))
        .get(),
    };
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}
