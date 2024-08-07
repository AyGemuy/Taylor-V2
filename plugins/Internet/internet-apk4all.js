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
  if (!lister.includes(feature)) return m.reply("*Example:*\n.apk4all search|vpn\n\n*Pilih type yg ada*\n" + lister.map((v, index) => "  ○ " + v).join("\n"));
  if (lister.includes(feature)) {
    if ("search" === feature) {
      if (!inputs) return m.reply("Input query link\nExample: .apk4all search|vpn");
      m.react(wait);
      try {
        let teks = (await searchApk4all(inputs)).map((item, index) => `🔍 *[ RESULT ${index + 1} ]*\n\n📰 *Title:* ${item.title}\n🔗 *Url:* ${item.titleUrl}\n🖼️ *Image:* ${item.imageUrl}\n⭐️ *Rating:* ${item.rating}\n👀 *Views:* ${item.views}\n📊 *Average:* ${item.average}\n📅 *Date:* ${item.updateDate}`).filter(v => v).join("\n\n________________________\n\n");
        m.reply(teks);
      } catch (e) {
        m.react(eror);
      }
    }
    if ("app" === feature) {
      if (!inputs) return m.reply("Input query link\nExample: .apk4all app|link");
      try {
        let resl = await getApk4all(inputs),
          cap = `📌 *Title:* ${resl.info.title}\n🔖 *Version:* ${resl.info.currentVersion}\n🔄 *Update:* ${resl.info.latestUpdate}\n⭐️ *Rating:* ${resl.info.contentRating}\n📋 *Requirements:* ${resl.info.requirements}\n📏 *Size:* ${resl.download.size}\n📚 *Guide:* ${resl.download.guide}\n🔗 *Link Full:* ${encodeURI(resl.download.linkFull)}\n\n${wait}`;
        await conn.sendFile(m.chat, resl.info.ogImageUrl, "", cap, m), await conn.sendFile(m.chat, resl.download.linkMod, resl.info.title, null, m, !0, {
          quoted: m,
          mimetype: "application/vnd.android.package-archive"
        });
      } catch (e) {
        m.react(eror);
      }
    }
  }
};
handler.help = ["apk4all"], handler.tags = ["internet"], handler.command = /^(apk4all)$/i;
export default handler;
async function searchApk4all(query) {
  const url = `https://apk4all.io/search/${query}`;
  try {
    const response = await fetch(url),
      data = await response.text(),
      $ = cheerio.load(data),
      articles = [];
    return $("article").each((index, element) => {
      const $article = $(element),
        title = $article.find(".entry-title a").text().trim(),
        titleUrl = $article.find(".entry-title a").attr("href"),
        imageUrl = $article.find(".apk-dl .icon img").attr("src"),
        rating = $article.find(".details-rating .average.rating").text().trim(),
        views = $article.find(".details-rating .details-delimiter").eq(1).text().replace(/\n|\|\s|\t/g, "").trim(),
        average = $article.find(".details-rating .stars").attr("title").trim(),
        updateDate = $article.find(".details-rating .update-date").next().text().trim();
      articles.push({
        title: title,
        titleUrl: titleUrl,
        imageUrl: imageUrl,
        rating: rating,
        average: average,
        views: views,
        updateDate: updateDate
      });
    }), articles;
  } catch (error) {
    throw new Error("Error fetching data:", error);
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
        currentVersion: $('td:contains("Current Version:")').next().text().trim(),
        latestUpdate: $('td:contains("Latest Update:")').next().find("time").text().trim(),
        contentRating: $('td:contains("Content Rating:")').next().text().trim(),
        getItOn: $('td:contains("Get it on:")').next().find("a").attr("href"),
        requirements: $('td:contains("Requirements:")').next().find("a").text().trim(),
        appID: $('td:contains("App ID:")').next().text().trim()
      },
      response2 = await fetch(info.link),
      html2 = await response2.text(),
      $two = cheerio.load(html2);
    return {
      info: info,
      download: {
        title: $two(".box h1.title").text().trim(),
        linkFull: $two(".box p.field a.button.is-danger").attr("href"),
        linkMod: $two(".box div.buttons div.field p.control a.button.is-primary").attr("href"),
        size: $two(".box div.field.has-addons p.control.is-expanded a.button.is-primary").text().trim(),
        qr: $two(".box div.field.has-addons p.control a.zb.button.is-primary img.qr").attr("src"),
        guide: $two(".box div.block.content.notification.is-info.is-light.container").text().trim()
      }
    };
  } catch (error) {
    throw new Error("Error fetching additional information:", error);
  }
}