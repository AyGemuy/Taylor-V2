import axios from "axios";
import PDFDocument from "pdfkit";
import {
  PassThrough
} from "stream";
import cheerio from "cheerio";
const handler = async (m, {
  conn,
  args,
  usedPrefix,
  text,
  command
}) => {
  let lister = ["search", "chapter", "pdf"],
    [feature, inputs] = text.split("|");
  if (!lister.includes(feature)) return m.reply("*Example:*\n.3asq search|vpn\n\n*Pilih type yg ada*\n" + lister.map((v, index) => "  ○ " + v).join("\n"));
  if (lister.includes(feature)) {
    if ("search" === feature) {
      if (!inputs) return m.reply("Input query link\nExample: .3asq search|vpn");
      m.react(wait);
      try {
        let teks = (await search3asq(inputs)).map((item, index) => `- *Name:* ${item.name}\n- *Link:* ${item.link}`).filter(v => v).join("\n\n________________________\n\n");
        m.reply(teks);
      } catch (e) {
        m.react(eror);
      }
    }
    if ("chapter" === feature) {
      if (!inputs) return m.reply("Input query link\nExample: .3asq search|group");
      m.react(wait);
      try {
        let teks = (await getAllChapters(inputs)).map((item, index) => `- *Title:* ${item.title}\n- *Link:* ${item.link}`).filter(v => v).join("\n\n________________________\n\n");
        m.reply(teks);
      } catch (e) {
        m.react(eror);
      }
    }
    if ("pdf" === feature) {
      if (!inputs) return m.reply("Input query link\nExample: .3asq search|group");
      m.react(wait);
      try {
        let data = await getChapterPdf(inputs);
        const [, mangaTitle, chapterNumber] = inputs.match(/manga\/([^/]+)\/(\d+)\/$/), pdfTitle = `${mangaTitle.replace(/-/g, " ").replace(/\b\w/g, char => char.toUpperCase())} : ${chapterNumber}`;
        await conn.sendFile(m.chat, data, pdfTitle, "DONE", m, null, {
          mimetype: dpdf,
          contextInfo: {
            mentionedJid: [m.sender]
          }
        });
      } catch (e) {
        m.react(eror);
      }
    }
  }
};
handler.help = ["3asq"], handler.tags = ["internet"], handler.command = /^(3asq)$/i;
export default handler;
async function search3asq(q) {
  try {
    const {
      data
    } = await axios.get(`https://3asq.org/?s=${q}&post_type=wp-manga`), $ = cheerio.load(data);
    return $(".tab-summary").map((index, element) => ({
      name: $(element).find(".post-title h3 a").text().trim(),
      link: $(element).find(".post-title h3 a").attr("href"),
      alternativeNames: $(element).find(".mg_alternative .summary-content").text().trim(),
      genres: $(element).find(".mg_genres .summary-content a").map((i, el) => $(el).text()).get().join(", ")
    })).get();
  } catch (error) {
    throw console.error("Error fetching data:", error), error;
  }
}
async function getAllChapters(url) {
  try {
    const {
      data
    } = await axios.get(url), $ = cheerio.load(data);
    return $(".wp-manga-chapter").map((index, element) => ({
      title: $(element).text().trim(),
      link: $(element).find("a").attr("href"),
      releaseDate: $(element).find(".chapter-release-date i").text().trim(),
      views: $(element).find(".view").text().trim()
    })).get();
  } catch (error) {
    throw console.error("Error fetching data:", error), error;
  }
}
async function getChapterPdf(url) {
  try {
    const {
      data
    } = await axios.get(url), $ = cheerio.load(data), buffers = [], pdfDoc = new PDFDocument(), pdfStream = new PassThrough();
    pdfDoc.pipe(pdfStream);
    const imageLinks = $(".wp-manga-chapter-img").map((index, element) => $(element).attr("src").trim()).get();
    if (0 === imageLinks.length) return console.log("No images found."), null;
    for (const [index, imageLink] of imageLinks.entries()) try {
      const imageResponse = await axios.get(imageLink, {
        responseType: "arraybuffer"
      });
      await pdfDoc.addPage().image(Buffer.from(imageResponse.data), {
        fit: [pdfDoc.page.width, pdfDoc.page.height]
      });
    } catch (error) {
      console.error(`Error processing image ${index + 1}:`, error);
    }
    return pdfDoc.end(), pdfStream.on("data", chunk => buffers.push(chunk)), new Promise(resolve => pdfStream.on("end", () => resolve(Buffer.concat(buffers))));
  } catch (error) {
    throw console.error("Error fetching data:", error), error;
  }
}