import cheerio from "cheerio";
import PDFDocument from "pdfkit";
import fetch from "node-fetch";
const handler = async (m, {
  conn,
  args,
  usedPrefix,
  text,
  command
}) => {
  let lister = ["search", "detail", "pdf"],
    [feature, inputs, inputs_, inputs__, inputs___] = text.split("|");
  if (!lister.includes(feature)) return m.reply("*Example:*\n.shinigami search|vpn\n\n*Pilih type yg ada*\n" + lister.map((v, index) => "  ○ " + v).join("\n"));
  if (lister.includes(feature)) {
    if ("search" === feature) {
      if (!inputs) return m.reply("Input query link\nExample: .shinigami search|vpn");
      m.react(wait);
      try {
        let teks = (await searchShikigami(inputs)).map((item, index) => `*[ RESULT ${index + 1} ]*\n*nama:* ${item.nama}\n*link:* ${item.link}\n*image:* ${item.image}\n*alternative:* ${item.alternative}\n*authors:* ${item.authors}\n*artists:* ${item.artists}\n*genres:* ${item.genres}\n*status:* ${item.status}\n*releaseYear:* ${item.releaseYear}\n*latestChapter:* ${item.latestChapter}\n*rating:* ${item.rating}\n`).filter(v => v).join("\n\n________________________\n\n");
        m.reply(teks);
      } catch (e) {
        m.react(eror);
      }
    }
    if ("detail" === feature) {
      if (!inputs) return m.reply("Input query link\nExample: .shinigami info|link");
      try {
        let resl = await getDetails(inputs),
          chap = resl.chapters.map((item, index) => `*[ Chapter ]*\n*nama:* ${item.chapterTitle}\n*link:* ${item.chapterLink}\n*date:* ${item.releaseDate}`).filter(v => v).join("\n\n________________________\n\n"),
          cap = `*rating:* ${resl.info.rating}\n*rank:* ${resl.info.rank}\n*alternative:* ${resl.info.alternative}\n*authors:* ${resl.info.authors}\n*artists:* ${resl.info.artists}\n*genres:* ${resl.info.genres}\n*type:* ${resl.info.type}\n*tags:* ${resl.info.tags}\n*releaseYear:* ${resl.info.releaseYear}\n*status:* ${resl.info.status}\n*description:* ${resl.info.description}\n\n`;
        await conn.sendFile(m.chat, resl.image, "", cap + chap, m);
      } catch (e) {
        m.react(eror);
      }
    }
    if ("pdf" === feature) {
      if (!inputs) return m.reply("Input query link\nExample: .shinigami info|link");
      m.react(wait);
      try {
        let buff = await getPDF(inputs);
        await conn.sendFile(m.chat, buff, "Nih kak!", "", m, !1, {
          asDocument: !0
        });
      } catch (e) {
        m.react(eror);
      }
    }
  }
};
handler.help = ["shinigami"], handler.tags = ["internet"], handler.command = /^(shinigami)$/i;
export default handler;
async function searchShikigami(query) {
  try {
    const url = "https://toonchill.com/?s=" + query + "&post_type=wp-manga&op=&author=&artist=&release=&adult=",
      response = await fetch(url),
      html = await response.text(),
      $ = cheerio.load(html);
    return $(".c-tabs-item__content").map((index, element) => {
      const $element = $(element);
      return {
        nama: $element.find(".post-title h3 a").text().trim(),
        link: $element.find(".post-title h3 a").attr("href"),
        image: $element.find(".tab-thumb img").attr("data-src"),
        alternative: $element.find(".mg_alternative").text().trim(),
        authors: $element.find(".mg_author a").map((index, authorElement) => $(authorElement).text().trim()).get(),
        artists: $element.find(".mg_artists a").map((index, artistElement) => $(artistElement).text().trim()).get(),
        genres: $element.find(".mg_genres a").map((index, genreElement) => $(genreElement).text().trim()).get(),
        status: $element.find(".mg_status").text().trim(),
        releaseYear: $element.find(".release-year a").text().trim(),
        latestChapter: $element.find(".meta-item.latest-chap .chapter a").text().trim(),
        rating: $element.find(".post-total-rating .score").text().trim()
      };
    }).get();
  } catch (error) {
    throw new Error("Terjadi kesalahan saat mengambil detail manga");
  }
}
async function getDetails(url) {
  try {
    const response = await fetch(url),
      html = await response.text(),
      $ = cheerio.load(html),
      manga = {};
    return manga.title = $(".post-title h1").text().trim(), manga.image = $(".summary_image img").attr("data-src"),
      manga.info = {
        rating: $(".post-total-rating .score").text().trim(),
        alternative: $('.post-content_item:contains("Alternative") .summary-content').text().trim(),
        authors: $('.post-content_item:contains("Author(s)") .summary-content a').map((index, authorElement) => $(authorElement).text().trim()).get(),
        artists: $('.post-content_item:contains("Artist(s)") .summary-content a').map((index, artistElement) => $(artistElement).text().trim()).get(),
        genres: $('.post-content_item:contains("Genre(s)") .summary-content a').map((index, genreElement) => $(genreElement).text().trim()).get(),
        type: $('.post-content_item:contains("Type") .summary-content').text().trim(),
        tags: $('.post-content_item:contains("Tag(s)") .summary-content .tags-content').text().trim(),
        releaseYear: $('.post-content_item:contains("Release") .summary-content a').text().trim(),
        status: $('.post-content_item:contains("Status") .summary-content').text().trim(),
        description: $(".description-summary").text().trim()
      }, manga.chapters = [], $(".listing-chapters_wrap .main li").each((index, element) => {
        const chapter = {
          chapterTitle: $(element).find(".wp-manga-chapter a").text().trim(),
          chapterLink: $(element).find(".wp-manga-chapter a").attr("href"),
          releaseDate: $(element).find(".chapter-release-date i").text().trim()
        };
        manga.chapters.push(chapter);
      }), manga.detail = {
        title: manga.title,
        image: manga.image,
        info: manga.info,
        chapters: manga.chapters
      }, manga;
  } catch (error) {
    throw new Error("Terjadi kesalahan saat mengambil detail manga");
  }
}
async function getPDF(url) {
  const response = await fetch(url),
    html = await response.text(),
    $ = cheerio.load(html),
    imageUrls = [];
  $(".reading-content .page-break img").each((index, element) => {
    const imageUrl = $(element).attr("data-src").trim();
    imageUrls.push(imageUrl);
  });
  const doc = new PDFDocument();
  for (let i = 0; i < imageUrls.length; i++) {
    const imageUrl = imageUrls[i],
      response = await fetch(imageUrl),
      arrayBuffer = await response.arrayBuffer(),
      imageBuffer = Buffer.from(arrayBuffer);
    doc.image(imageBuffer), i < imageUrls.length - 1 && doc.addPage();
  }
  return doc.end(), new Promise((resolve, reject) => {
    const buffers = [];
    doc.on("data", chunk => buffers.push(chunk)), doc.on("end", () => {
      const pdfBuffer = Buffer.concat(buffers);
      resolve(pdfBuffer);
    }), doc.on("error", error => reject(error));
  });
}