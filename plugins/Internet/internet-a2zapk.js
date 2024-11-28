import * as cheerio from "cheerio";
import fetch from "node-fetch";
const handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) return m.reply("Masukkan query");
  m.react(wait);
  switch (command) {
    case "a2zapk":
      try {
        let res = await searchA2zapk(text);
        if (!res.length) return m.reply(`Query "${text}" tidak ditemukan :/`);
        const buttons = conn.ctaButton
          .setBody("Pilih aplikasi di bawah ini.")
          .setFooter("Keterangan lebih lanjut dapat ditemukan di A2ZAPK.")
          .addSelection("Klik di sini")
          .makeSections("A2ZAPK", "Pilih aplikasi");
        res.forEach((item, index) => {
          buttons.makeRow(
            `🔍 *[ RESULT ${index + 1} ]*`,
            `📰 *Title:* ${item.title}`,
            `🔗 *Url:* ${item.url}`,
            `${usedPrefix}a2zapkapp ${item.url}`,
          );
        });
        buttons.run(m.chat, conn, m);
      } catch (e) {
        console.error("Error:", e);
        m.react(eror);
      }
      break;
    case "a2zapkapp":
      try {
        let res = await getMod1(text);
        if (!res) return m.reply(`Link "${text}" tidak ditemukan :/`);
        const { text: appName, url, ogImageUrl } = res;
        const caption =
          `📦 *Info Aplikasi* 📦\n\n` +
          `📌 *Nama:* ${appName || "Tidak tersedia"}\n` +
          `🔗 *Link:* ${url || "Tidak tersedia"}`;
        await conn.sendFile(m.chat, ogImageUrl, "", caption, m);
        await conn.sendFile(
          m.chat,
          url,
          appName || "Aplikasi",
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
handler.help = ["a2zapk"];
handler.tags = ["tools"];
handler.command = /^(a2zapk|a2zapkapp)$/i;
export default handler;
async function searchA2zapk(query) {
  const url =
    "https://a2zapk.io/Search/" +
    query +
    "/user=SmpLdVh6bGk2M3hVaFQ2TCsyYUE1dkExTU9kRDVWQTg5ZGZ2Wmp2NnZNN2xuazFJMzI0OTFnOVg0NVhRRGFveg==/";
  try {
    const response = await fetch(url),
      html = await response.text(),
      $ = cheerio.load(html),
      result = [];
    $(".AppCont").each((index, element) => {
      const item = {
        title: $(element).find("a").attr("title"),
        url: $(element).find("a").attr("href"),
        imageSrc: $(element).find("img").attr("data-original"),
        heading2: $(element).find("h2").text(),
        heading3: $(element).find("h3").text(),
        starWidth: $(element).find(".stars span").attr("style"),
        date: $(element).find(".dateyear_utc").text(),
      };
      result.push(item);
    });
    return result;
  } catch (error) {
    console.log("Error:", error);
    return [];
  }
}
async function getMod1(link) {
  return {
    text: "Example App Name",
    url: link,
    ogImageUrl: "https://example.com/image.png",
  };
}
