import cheerio from "cheerio";
import fetch from "node-fetch";
const handler = async (m, {
  conn,
  args,
  usedPrefix,
  text,
  command
}) => {
  let lister = ["quotes", "category", "book", "pdf"],
    [feature, inputs, inputs_, inputs__, inputs___] = text.split("|");
  if (!lister.includes(feature)) return m.reply("*Example:*\n.foulabook search|vpn\n\n*Pilih type yg ada*\n" + lister.map((v, index) => "  ○ " + v).join("\n"));
  let regpdf = /^(?!.*-pdf$).*$/;
  if (lister.includes(feature)) {
    if ("pdf" === feature) {
      if (regpdf.test(inputs)) return m.reply("Input query link pdf in end\nExample: .foulabook pdf|link");
      try {
        let array = await getPdf(inputs),
          resl = array[Math.floor(Math.random() * array.length)],
          cap = `*Title:* ${resl.ogTitle}\n*Description:* ${resl.ogDescription}\n*Link:* ${resl.downloadLink} ( ${resl.downloadButtonText} )\n*Link:* ${resl.readLink} ( ${resl.readButtonText} )\n\n${wait}`;
        await conn.sendFile(m.chat, resl.ogImage, "", cap, m), await conn.sendFile(m.chat, resl.downloadLink, resl.ogTitle, "", m, !1, {
          asDocument: !0
        });
      } catch (e) {
        m.react(eror);
      }
    }
    if ("quotes" === feature) try {
      let array = await getQuotes(inputs),
        resl = array[Math.floor(Math.random() * array.length)],
        cap = `*Quotes:* ${resl.content}\n\n*Author:* ${resl.author.name}\n*Link:* ${resl.author.url}\n`;
      await conn.sendFile(m.chat, resl.author.photo, "", cap, m);
    } catch (e) {
      m.react(eror);
    }
    if ("category" === feature) try {
      let data = await getCategory(),
        result = "";
      data.forEach((section, index) => {
        result += `*[ ${index + 1}. ${section.title} ]*\n`, section.subSections.forEach((subSection, index) => {
          result += `${index + 1}. ${subSection.link} (${subSection.title})\n`;
        }), result += "\n\n________________________\n\n";
      }), m.reply(result);
    } catch (e) {
      m.react(eror);
    }
    if ("book" === feature) {
      if (!regpdf.test(inputs)) return m.reply("Input query link not pdf in end");
      try {
        let teks = (await getBooks(inputs)).map((item, index) => `*[ RESULT ${index + 1} ]*\n*Title:* ${item.title}\n*Link:* ${item.link}\n`).filter(v => v).join("\n\n________________________\n\n");
        m.reply(teks);
      } catch (e) {
        m.react(eror);
      }
    }
  }
};
handler.help = ["foulabook"], handler.tags = ["internet"], handler.command = /^(foulabook)$/i;
export default handler;
async function getPdf(url) {
  try {
    const response = await fetch(url),
      html = await response.text(),
      $ = cheerio.load(html),
      elements = $(".col-md-4 .col-md-12");
    return elements.map((index, element) => ({
      ogImage: $('meta[property="og:image"]').attr("content"),
      ogTitle: $('meta[property="og:title"]').attr("content"),
      ogDescription: $('meta[property="og:description"]').attr("content"),
      downloadLink: $('a[href^="https://foulabook.com/book/downloading/"]', element).attr("href"),
      downloadButtonText: $('a[href^="https://foulabook.com/book/downloading/"]', element).text().trim(),
      readLink: $('a[href^="https://foulabook.com/ar/read/"]', element).attr("href"),
      readButtonText: $('a[href^="https://foulabook.com/ar/read/"]', element).text().trim()
    })).get();
  } catch (error) {
    console.error("Error:", error.message);
  }
}
async function getQuotes(page) {
  try {
    let url = "https://foulabook.com/ar/quotes";
    "" !== page && (url += `?page=${page}`);
    const response = await fetch(url),
      body = await response.text(),
      $ = cheerio.load(body),
      results = [];
    return $("div.pi-testimonial.pi-testimonial-author-with-photo").each((index, element) => {
      const testimonial = {};
      testimonial.content = $(element).find("div.pi-testimonial-content p").text().trim(),
        testimonial.author = {
          name: $(element).find("span.pi-testimonial-author-name strong").text().trim(),
          url: $(element).find("span.pi-testimonial-author-name a").attr("href").trim(),
          photo: $(element).find("span.pi-testimonial-author-photo a img").attr("src")
        }, results.push(testimonial);
    }), results;
  } catch (error) {
    console.error(error);
  }
}
async function getCategory() {
  try {
    const url = "https://foulabook.com/ar/categories",
      response = await fetch(url),
      body = await response.text(),
      $ = cheerio.load(body),
      results = [];
    return $(".row").each((index, element) => {
      const section = {},
        heading = $(element).find(".v-heading-v2 h3 a");
      section.title = heading.text().trim(), section.link = heading.attr("href");
      const subSections = [];
      $(element).find(".col-md-3").each((subIndex, subElement) => {
        const link = $(subElement).find(".v-li-v1 a"),
          subSection = {
            title: link.find("span").text().trim(),
            link: link.attr("href")
          };
        subSections.push(subSection);
      }), subSections.length > 0 && (section.subSections = subSections, results.push(section));
    }), results;
  } catch (error) {
    console.error(error);
  }
}
async function getBooks(url) {
  try {
    const response = await fetch(url),
      body = await response.text(),
      $ = cheerio.load(body),
      results = [];
    return $("figure.animated-overlay").each((index, element) => {
      const book = {},
        img = $(element).find("img");
      book.imageSrc = img.attr("src");
      const link = $(element).find("a");
      book.link = link.attr("href");
      const title = $(element).next("h5").find("a");
      book.title = title.text(), results.push(book);
    }), results;
  } catch (error) {
    console.error(error);
  }
}