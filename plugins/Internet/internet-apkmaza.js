import * as cheerio from "cheerio";
import fetch from "node-fetch";
const handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) return m.reply("Masukkan query");
  m.react(wait);
  switch (command) {
    case "apkmaza":
      try {
        const results = await searchApkmaza(text);
        if (!results.length)
          return m.reply(`Query "${text}" tidak ditemukan :/`);
        const buttons = conn.ctaButton
          .setBody("Pilih aplikasi di bawah ini.")
          .setFooter("Detail lebih lanjut dapat ditemukan di APKMaza.")
          .addSelection("Klik di sini")
          .makeSections("APKMaza", "Pilih aplikasi");
        results.forEach((item, index) => {
          buttons.makeRow(
            `🔍 *[ RESULT ${index + 1} ]*`,
            `📰 *Title:* ${item.title}`,
            `📝 *Description:* ${item.description}`,
            `${usedPrefix}apkmazaapp ${item.link}`,
          );
        });
        buttons.run(m.chat, conn, m);
      } catch (e) {
        console.error("Error:", e);
        m.react(eror);
      }
      break;
    case "apkmazaapp":
      try {
        const appInfo = await getApkmaza(text);
        if (!appInfo.length)
          return m.reply(`Link "${text}" tidak ditemukan :/`);
        const caption =
          `📦 *Detail Aplikasi* 📦\n\n` +
          appInfo
            .map(
              (section) =>
                `📂 *${section.title}*\n` +
                `🔗 *Download Link:* ${section.downloadLink}\n` +
                `📏 *File Size:* ${section.fileSize}`,
            )
            .join("\n\n") +
          `\n\n🖼️ *Image:* ${appInfo[0]?.imageSrc || "N/A"}`;
        await conn.sendFile(m.chat, appInfo[0]?.imageSrc || "", "", caption, m);
        await conn.sendFile(
          m.chat,
          appInfo[0]?.downloadLink || "",
          appInfo[0]?.title || "Aplikasi",
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
handler.help = ["apkmaza"];
handler.tags = ["internet"];
handler.command = /^(apkmaza|apkmazaapp)$/i;
export default handler;
async function searchApkmaza(query) {
  try {
    const response = await fetch(
        `https://apkmaza.co/?s=${encodeURIComponent(query)}`,
      ),
      html = await response.text(),
      $ = cheerio.load(html),
      objArray = [];
    $(".hentry").each((index, element) => {
      const entry = $(element),
        link = entry.find("a"),
        image = entry.find("img"),
        title = entry.find("h3"),
        version = entry.find(
          ".small.text-truncate.text-muted.d-flex.align-items-center svg + span",
        ),
        category = entry.find(
          ".small.text-truncate.text-muted.d-flex.align-items-center .text-truncate",
        ),
        description = entry.find(
          ".small.text-muted.d-flex.align-items-center + .small.text-muted.d-flex.align-items-center span",
        ),
        obj = {
          link: link.attr("href"),
          imageSrc: image.attr("src"),
          title: title.text(),
          version: version.text(),
          category: category.text(),
          description: description.text().trim(),
        };
      objArray.push(obj);
    });
    return objArray;
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
}
async function getApkmaza(url) {
  try {
    const response = await fetch(
        url.endsWith("/download") ? url : url + "/download",
      ),
      html = await response.text(),
      $ = cheerio.load(html),
      sections = [];
    $(".accordion-downloads .toggle").each((index, element) => {
      const section = {
        title: $(element).text().trim(),
        link: $(element).attr("href"),
        downloadLink: $(element).next(".collapse").find("a").attr("href"),
        fileSize: $(element).next(".collapse").find("a .whites").text().trim(),
      };
      sections.push(section);
    });
    return sections;
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
}
