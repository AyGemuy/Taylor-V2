import * as cheerio from "cheerio";
import fetch from "node-fetch";
const handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) return m.reply("Masukkan query");
  m.react(wait);
  switch (command) {
    case "apk4all":
      try {
        let results = await searchApk4all(text);
        if (!results.length)
          return m.reply(`Query "${text}" tidak ditemukan :/`);
        const buttons = conn.ctaButton
          .setBody("Pilih aplikasi di bawah ini.")
          .setFooter("Keterangan lebih lanjut dapat ditemukan di APK4ALL.")
          .addSelection("Klik di sini")
          .makeSections("APK4ALL", "Pilih aplikasi");
        results.forEach((item, index) => {
          buttons.makeRow(
            `🔍 *[ RESULT ${index + 1} ]*`,
            `📰 *Title:* ${item.title}`,
            `⭐ *Rating:* ${item.rating}`,
            `${usedPrefix}apk4allapp ${item.titleUrl}`,
          );
        });
        buttons.run(m.chat, conn, m);
      } catch (e) {
        console.error("Error:", e);
        m.react(eror);
      }
      break;
    case "apk4allapp":
      try {
        let res = await getApk4all(text);
        if (!res) return m.reply(`Link "${text}" tidak ditemukan :/`);
        const {
          info: {
            title,
            link,
            ogImageUrl,
            developer,
            currentVersion,
            latestUpdate,
            contentRating,
            getItOn,
            requirements,
            appID,
          },
          download: { title: dlTitle, linkFull, linkMod, size, qr, guide },
        } = res;
        const caption =
          `📦 *Info Aplikasi* 📦\n\n` +
          `📌 *Nama:* ${title || "Tidak tersedia"}\n` +
          `🔗 *Link:* ${link || "Tidak tersedia"}\n` +
          `📅 *Versi Saat Ini:* ${currentVersion || "Tidak tersedia"}\n` +
          `🔧 *Developer:* ${developer || "Tidak tersedia"}\n` +
          `📆 *Terbaru:* ${latestUpdate || "Tidak tersedia"}\n` +
          `⭐ *Rating Konten:* ${contentRating || "Tidak tersedia"}\n` +
          `🌐 *Dapatkan di:* ${getItOn || "Tidak tersedia"}\n` +
          `📜 *Kebutuhan:* ${requirements || "Tidak tersedia"}\n` +
          `📛 *ID Aplikasi:* ${appID || "Tidak tersedia"}`;
        await conn.sendFile(m.chat, ogImageUrl || "", "", caption, m);
        await conn.sendFile(
          m.chat,
          linkFull || "",
          dlTitle || "Unduhan",
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
handler.help = ["apk4all"];
handler.tags = ["internet"];
handler.command = /^(apk4all)$/i;
export default handler;
async function searchApk4all(query) {
  const url = `https://apk4all.io/search/${query}`;
  try {
    const response = await fetch(url),
      data = await response.text(),
      $ = cheerio.load(data),
      articles = [];
    $("article").each((index, element) => {
      const $article = $(element),
        title = $article.find(".entry-title a").text().trim(),
        titleUrl = $article.find(".entry-title a").attr("href"),
        imageUrl = $article.find(".apk-dl .icon img").attr("src"),
        rating = $article.find(".details-rating .average.rating").text().trim(),
        views = $article
          .find(".details-rating .details-delimiter")
          .eq(1)
          .text()
          .replace(/\n|\|\s|\t/g, "")
          .trim(),
        average = $article.find(".details-rating .stars").attr("title").trim(),
        updateDate = $article
          .find(".details-rating .update-date")
          .next()
          .text()
          .trim();
      articles.push({
        title: title,
        titleUrl: titleUrl,
        imageUrl: imageUrl,
        rating: rating,
        average: average,
        views: views,
        updateDate: updateDate,
      });
    });
    return articles;
  } catch (error) {
    throw new Error("Error fetching data: " + error.message);
  }
}
async function getApk4all(url) {
  try {
    const response = await fetch(url),
      html = await response.text(),
      $ = cheerio.load(html),
      info = {
        title: $(".dllinks .da").attr("title"),
        link: $(".dllinks .da").attr("href"),
        ogImageUrl: $('meta[property="og:image"]').attr("content"),
        developer: $('td:contains("Developer:")').next().text().trim(),
        currentVersion: $('td:contains("Current Version:")')
          .next()
          .text()
          .trim(),
        latestUpdate: $('td:contains("Latest Update:")')
          .next()
          .find("time")
          .text()
          .trim(),
        contentRating: $('td:contains("Content Rating:")').next().text().trim(),
        getItOn: $('td:contains("Get it on:")').next().find("a").attr("href"),
        requirements: $('td:contains("Requirements:")')
          .next()
          .find("a")
          .text()
          .trim(),
        appID: $('td:contains("App ID:")').next().text().trim(),
      },
      response2 = await fetch(info.link),
      html2 = await response2.text(),
      $two = cheerio.load(html2);
    return {
      info: info,
      download: {
        title: $two(".box h1.title").text().trim(),
        linkFull: $two(".box p.field a.button.is-danger").attr("href"),
        linkMod: $two(
          ".box div.buttons div.field p.control a.button.is-primary",
        ).attr("href"),
        size: $two(
          ".box div.field.has-addons p.control.is-expanded a.button.is-primary",
        )
          .text()
          .trim(),
        qr: $two(
          ".box div.field.has-addons p.control a.zb.button.is-primary img.qr",
        ).attr("src"),
        guide: $two(
          ".box div.block.content.notification.is-info.is-light.container",
        )
          .text()
          .trim(),
      },
    };
  } catch (error) {
    throw new Error("Error fetching additional information: " + error.message);
  }
}
