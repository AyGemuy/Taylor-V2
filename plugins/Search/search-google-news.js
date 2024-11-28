import * as cheerio from "cheerio";
import axios from "axios";
const handler = async (m, { command, usedPrefix, conn, args }) => {
  const text =
    args.length >= 1
      ? args.slice(0).join(" ")
      : (m.quoted && m.quoted?.text) ||
        m.quoted?.caption ||
        m.quoted?.description ||
        null;
  if (!text)
    return m.reply(
      `Masukkan teks atau reply pesan dengan teks yang ingin diolah.\nContoh penggunaan:\n*${usedPrefix}${command} Hai, apa kabar?*`,
    );
  m.react(wait);
  try {
    const newsData = await GoogleNews(text);
    if (newsData && newsData.total > 0) {
      let caption = `🔍 *Hasil Pencarian untuk:* ${text}\n\n`;
      caption += `📊 *Total Berita:* ${newsData.total}\n\n`;
      newsData.news.forEach((newsItem, index) => {
        caption += `📰 *${newsItem.title}*\n`;
        caption += `⏰ *Waktu:* ${newsItem.time}\n`;
        caption += `✍️ *Penulis:* ${newsItem.author}\n`;
        caption += `🔗 *Sumber:* ${newsItem.source.name}\n`;
        caption += `📅 *Tanggal:* ${newsItem.date}\n`;
        caption += `📎 *Link:* ${newsItem.link}\n`;
        caption += `📷 *Gambar:* ${newsItem.img[0]}\n\n`;
      });
      await conn.reply(m.chat, caption, m, {
        contextInfo: {
          mediaType: 1,
          mediaUrl:
            newsData.news[0]?.img[0] ||
            "https://upload.wikimedia.org/wikipedia/commons/d/d1/Image_not_available.png",
          previewType: 0,
          renderLargerThumbnail: true,
          sourceUrl: `https://news.google.com/search?q=${encodeURIComponent(text)}`,
          thumbnailUrl:
            newsData.news[0]?.img[0] ||
            "https://upload.wikimedia.org/wikipedia/commons/d/d1/Image_not_available.png",
          title: `Hasil Pencarian: ${text}`,
        },
      });
      m.react(sukses);
    } else {
      await conn.reply(m.chat, "Tidak ada berita ditemukan.", m);
    }
  } catch (e) {
    console.error(e);
    m.react(eror);
  }
};
handler.help = ["googlenews *[query]*"];
handler.tags = ["search"];
handler.command = /^(googlenews)$/i;
export default handler;
async function GoogleNews(q) {
  try {
    const url = `https://news.google.com/search?q=${encodeURIComponent(q)}&hl=en-IN&gl=IN&ceid=IN%3Aen`;
    const { data } = await axios.get(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.100 Safari/537.36",
      },
    });
    const $ = cheerio.load(data);
    const list = $("c-wiz div main div c-wiz c-wiz c-wiz article");
    const news = [];
    list.each((idx, el) => {
      const title = $(el)
        .children("div")
        .children("div")
        .children("div")
        .children("a")
        .text()
        .trim();
      const time = $(el).children("div").children("time").text();
      const date = $(el).children("div").children("time").attr("datetime");
      const authorScraped = $(el)
        .children("div")
        .children("div")
        .children("span")
        .first()
        .text();
      const author = authorScraped !== "" ? authorScraped : "Anonymous";
      const i = $(el)
        .children("div")
        .children("figure")
        .children("img")
        .last()
        .attr("srcset");
      const imgs = i?.split(" ");
      const img = imgs
        ? [imgs[0], imgs[2]]
        : [
            "https://upload.wikimedia.org/wikipedia/commons/d/d1/Image_not_available.png",
            "https://upload.wikimedia.org/wikipedia/commons/d/d1/Image_not_available.png",
          ];
      const name = $(el)
        .children("div")
        .children("div")
        .children("div")
        .children("div")
        .children("div")
        .children("div")
        .children("div")
        .text();
      const sourceName = name !== "" ? name.replace("More", "") : "Anonymous";
      const scrapedSourceImage = $(el)
        .children("div")
        .children("div")
        .children("div")
        .children("div")
        .children("img")
        .attr("srcset");
      const sourceImg = scrapedSourceImage
        ? [scrapedSourceImage?.split(" ")[0], scrapedSourceImage?.split(" ")[2]]
        : [
            "https://upload.wikimedia.org/wikipedia/commons/d/d1/Image_not_available.png",
            "https://upload.wikimedia.org/wikipedia/commons/d/d1/Image_not_available.png",
          ];
      const link =
        "https://news.google.com" +
        $(el)
          .children("div")
          .children("div")
          .children("a")
          .attr("href")
          .slice(1);
      news.push({
        id: idx,
        link: link,
        time: time,
        title: title,
        img: img,
        date: date,
        author: author,
        source: {
          img: sourceImg,
          name: sourceName,
        },
      });
    });
    return {
      news: news,
      total: news.length,
    };
  } catch (e) {
    console.error(e);
    return null;
  }
}
