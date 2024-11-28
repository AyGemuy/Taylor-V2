import * as cheerio from "cheerio";
import fetch from "node-fetch";
const handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) return m.reply("Masukkan query");
  m.react(wait);
  try {
    switch (command) {
      case "uptodown":
        try {
          const results = await searchApp(text);
          if (!results.length)
            return m.reply(`Query "${text}" tidak ditemukan :/`);
          const buttons = conn.ctaButton
            .setBody("Pilih aplikasi di bawah ini.")
            .setFooter("Detail lebih lanjut dapat ditemukan di Uptodown.")
            .addSelection("Klik di sini")
            .makeSections("Uptodown", "Pilih aplikasi");
          results.forEach((item, index) => {
            buttons.makeRow(
              `🔍 *[ RESULT ${index + 1} ]*`,
              `📖 *Title:* ${item.title}`,
              `📝 *Description:* ${item.description}`,
              `${usedPrefix}uptodownapp ${item.link}`,
            );
          });
          buttons.run(m.chat, conn, m);
        } catch (searchError) {
          console.error("Error in searchApp:", searchError);
          m.reply("Terjadi kesalahan saat mencari aplikasi.");
          m.react(eror);
        }
        break;
      case "uptodownapp":
        try {
          const appInfo = await getApp(text);
          if (!appInfo) return m.reply(`URL "${text}" tidak ditemukan :/`);
          const caption =
            `📦 *Detail Aplikasi* 📦\n\n` +
            `📖 *Title:* ${appInfo.title}\n` +
            `🔗 *Download URL:* ${appInfo.url}\n` +
            `📏 *Size:* ${appInfo.size}\n` +
            `🖼️ *Screenshot:* ${appInfo.screenshotSrc}\n` +
            `📝 *Description:* ${appInfo.description}\n` +
            `✍️ *Reviewer:* ${appInfo.reviewer}\n` +
            `🌐 *Translated By:* ${appInfo.translatedBy}\n` +
            `🔧 *Requirements:* ${appInfo.requirements.join(", ")}\n` +
            `❓ *FAQs:* ${appInfo.faqs.map((faq) => `Q: ${faq.question}\nA: ${faq.answer}`).join("\n")}\n` +
            `🛠️ *Technical Information:* ${appInfo.technicalInformation.map((info) => `${info.key}: ${info.value}`).join(", ")}\n`;
          await conn.sendFile(
            m.chat,
            appInfo.screenshotSrc || "",
            "",
            caption,
            m,
          );
          await conn.sendFile(
            m.chat,
            appInfo.url || "",
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
        } catch (appError) {
          console.error("Error in getApp:", appError);
          m.reply("Terjadi kesalahan saat mendapatkan detail aplikasi.");
          m.react(eror);
        }
        break;
      default:
        m.reply("Perintah tidak dikenali.");
        break;
    }
  } catch (error) {
    console.error("General Error:", error);
    m.react(eror);
  }
};
handler.help = ["uptodown"];
handler.tags = ["internet"];
handler.command = /^(uptodown|uptodownapp)$/i;
export default handler;
async function searchApp(query) {
  const data = new URLSearchParams();
  data.append("q", query);
  try {
    const response = await fetch("https://id.uptodown.com/android/search", {
      method: "POST",
      body: data,
    });
    const html = await response.text();
    const $ = cheerio.load(html);
    const resultArray = [];
    $(".item").each((index, element) => {
      const nameElement = $(element).find(".name a"),
        imageElement = $(element).find(".app_card_img"),
        item = {
          title: nameElement.text().trim(),
          link: nameElement.attr("href"),
          description: $(element).find(".description").text().trim(),
          image: imageElement.attr("src"),
        };
      resultArray.push(item);
    });
    return resultArray;
  } catch (error) {
    console.error("Error in searchApp:", error);
    return [];
  }
}
async function getInfo(url) {
  try {
    const response = await fetch(url);
    const html = await response.text();
    const $ = cheerio.load(html);
    return {
      screenshotSrc: $('img[itemprop="screenshot"]').attr("src"),
      description: $(".text-description").text().trim(),
      reviewer: $(".by span").eq(0).text().trim(),
      translatedBy: $(".by span").eq(1).text().trim(),
      requirements: $('h2:contains("Persyaratan") + ul li')
        .map((index, element) => $(element).text().trim())
        .get(),
      faqs: $(".question-content")
        .map((index, element) => ({
          question: $(element).find("h3.title").text().trim(),
          answer: $(element).find("p").text().trim(),
        }))
        .get(),
      technicalInformation: $("section#technical-information table tr")
        .map((index, element) => ({
          key: $(element).find("th").text().trim(),
          value: $(element).find("td").last().text().trim(),
        }))
        .get(),
      category: $("section.info table tr").eq(0).find("td a").text().trim(),
      language: $("section.info table tr")
        .eq(1)
        .find("td")
        .first()
        .text()
        .trim(),
      publisher: $("section.info table tr").eq(2).find("td a").text().trim(),
      downloads: $("section.info table tr")
        .eq(3)
        .find("td")
        .last()
        .text()
        .trim(),
      date: $("section.info table tr").eq(4).find("td").last().text().trim(),
      contentRating: $("section.info table tr")
        .eq(5)
        .find("td")
        .last()
        .text()
        .trim(),
    };
  } catch (error) {
    console.error("Error in getInfo:", error);
    return null;
  }
}
async function getApp(url) {
  const links = url.endsWith("/download") ? url : `${url}/download`;
  try {
    const response = await fetch(links);
    const html = await response.text();
    const $ = cheerio.load(html);
    const button = $(".button-group .button.download");
    const info = await getInfo(url.replace(/\/download$/, ""));
    return {
      url: button.attr("data-url"),
      title: button.attr("title"),
      size: button.find(".size").text().trim(),
      isFree:
        button.find("p:last-of-type").text().trim().toLowerCase() === "gratis",
      screenshotSrc: info.screenshotSrc,
      description: info.description,
      reviewer: info.reviewer,
      translatedBy: info.translatedBy,
      requirements: info.requirements,
      faqs: info.faqs,
      technicalInformation: info.technicalInformation,
    };
  } catch (error) {
    console.error("Error in getApp:", error);
    return null;
  }
}
