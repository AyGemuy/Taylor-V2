import fetch from "node-fetch";
import cheerio from "cheerio";
import PDFDocument from "pdfkit";
const handler = async (m, {
  conn,
  isOwner,
  usedPrefix,
  command,
  args
}) => {
  const text = args.length >= 1 ? args.slice(0).join(" ") : m.quoted && m.quoted?.text || m.quoted?.caption || m.quoted?.description || null;
  if (!text) return m.reply(`Masukkan teks atau reply pesan dengan teks yang ingin diolah.\nContoh penggunaan:\n*${usedPrefix}${command} Hai, apa kabar?*`);
  m.react(wait);
  try {
    let data = await rokuSearch(text),
      buff = await createPDFBuffer(data[0]?.allImageUrls);
    await conn.sendFile(m.chat, buff, "", data[0]?.title, m);
  } catch (e) {
    m.react(eror);
  }
};
handler.help = ["rokuhentai"], handler.tags = ["search"], handler.command = /^(rokuhentai)$/i;
export default handler;
async function rokuSearch(q) {
  try {
    const response = await fetch("https://rokuhentai.com/_search?q=" + q);
    return (await response.json())["manga-cards"].map(html => {
      const $ = cheerio.load(html),
        title = $(".mdc-typography--body1.site-manga-card__title--primary").text().trim().replace(/[\n\s]+/g, " "),
        captionElement = $('.mdc-typography--caption:contains("images")'),
        numImagesMatch = captionElement.text().trim().match(/(\d+)\s*images/),
        numImages = parseInt(numImagesMatch ?? 0, 10),
        timestampText = captionElement.contents().filter((i, el) => 3 === el.nodeType).text().trim().replace(/\s+/g, " "),
        mangaLink = $("a").attr("href") || "",
        allImageUrls = new Array(numImages).fill().map((_, i) => `${mangaLink.replace("https://rokuhentai.com/", "https://rokuhentai.com/_images/pages/")}${0 === i ? "0" : i}.jpg`);
      return {
        title: title,
        numImages: numImages,
        timestamp: timestampText.split("images")[1] ?? "",
        mangaLink: mangaLink,
        allImageUrls: allImageUrls,
        detailsLink: $('a:contains("Details")').attr("href") || ""
      };
    });
  } catch (error) {
    return console.error("Error:", error.message), null;
  }
}
async function createPDFBuffer(imageUrls) {
  return new Promise(async (resolve, reject) => {
    try {
      const pdfDoc = new PDFDocument(),
        buffers = [];
      for (const imageUrl of imageUrls) try {
        const response = await fetch(imageUrl),
          imageBuffer = await response.arrayBuffer();
        pdfDoc.addPage().image(imageBuffer, {
          width: 600
        });
      } catch (error) {
        console.error(`Error fetching image at ${imageUrl}:`, error.message);
      }
      pdfDoc.end(), pdfDoc.on("data", buffer => buffers.push(buffer)), pdfDoc.on("end", () => resolve(Buffer.concat(buffers)));
    } catch (error) {
      reject(error);
    }
  });
}