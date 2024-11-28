import * as cheerio from "cheerio";
import fetch from "node-fetch";
const handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) return m.reply("Masukkan query");
  m.react(wait);
  switch (command) {
    case "apkdone":
      try {
        const results = await searchApkdone(text);
        if (!results.length)
          return m.reply(`Query "${text}" tidak ditemukan :/`);
        const buttons = conn.ctaButton
          .setBody("Pilih aplikasi di bawah ini.")
          .setFooter("Keterangan lebih lanjut dapat ditemukan di APKDONE.")
          .addSelection("Klik di sini")
          .makeSections("APKDONE", "Pilih aplikasi");
        results.forEach((item, index) => {
          buttons.makeRow(
            `🔍 *[ RESULT ${index + 1} ]*`,
            `📰 *Name:* ${item.appName}`,
            `📦 *Version:* ${item.version}`,
            `${usedPrefix}apkdoneapp ${item.href}`,
          );
        });
        buttons.run(m.chat, conn, m);
      } catch (e) {
        console.error("Error:", e);
        m.react(eror);
      }
      break;
    case "apkdoneapp":
      try {
        const appInfo = await getApkdone(text);
        if (!appInfo || !appInfo.links.length)
          return m.reply(`Link "${text}" tidak ditemukan :/`);
        const caption =
          `📦 *Detail Aplikasi* 📦\n\n` +
          `🖼️ *OG Image:* ${appInfo.ogImageUrl}\n` +
          `⬇️ *Download Links:*\n${appInfo.links.join("\n")}`;
        await conn.sendFile(m.chat, appInfo.ogImageUrl || "", "", caption, m);
        await conn.sendFile(
          m.chat,
          appInfo.links[0] || "",
          appInfo.links[0] || "Aplikasi",
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
handler.help = ["apkdone"];
handler.tags = ["internet"];
handler.command = /^(apkdone|apkdoneapp)$/i;
export default handler;
async function searchApkdone(q) {
  const url = `https://apkdone.com/?s=${encodeURIComponent(q)}&post_type=post`;
  try {
    const response = await fetch(url),
      html = await response.text(),
      $ = cheerio.load(html),
      result = [];
    $("a.column.app").each((index, element) => {
      const item = {
        href: $(element).attr("href"),
        title: $(element).attr("title"),
        imageSrc: $(element).find("img").attr("src"),
        appName: $(element).find("b").text(),
        version: $(element).find(".tag.vs").text(),
        downloads: $(element).find(".tag").eq(1).text().trim(),
        category: $(element).find("span").last().text(),
      };
      result.push(item);
    });
    return result;
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
}
async function getApkdone(url) {
  const response = await fetch(
      url.endsWith("/download") ? url : url + "/download",
    ),
    html = await response.text(),
    $ = cheerio.load(html),
    imageLink = $("article.column.app.is-large img").attr("src");
  const links = $('script[type="text/javascript"]')
    .map((index, element) => $(element).html())
    .get()
    .filter((scriptText) => scriptText.includes("hole.apkdone.download"))
    .map((scriptText) =>
      scriptText.match(/https?:\/\/hole\.apkdone\.download\/[^\s]+/g),
    )
    .filter((matches) => matches !== null)
    .flat()
    .map((link) => link.replace(/"$/, ""));
  return {
    links: links,
    ogImageUrl: imageLink,
  };
}
