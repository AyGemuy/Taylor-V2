import axios from "axios";
import PDFDocument from "pdfkit";
import sharp from "sharp";
const handler = async (m, {
  conn,
  args,
  usedPrefix,
  text,
  command
}) => {
  let lister = ["search", "chapter", "pdf"],
    [feature, inputs] = text.split("|");
  if (!lister.includes(feature)) return m.reply("*Example:*\n.batoto search|vpn\n\n*Pilih type yg ada*\n" + lister.map((v, index) => "  ○ " + v).join("\n"));
  if (lister.includes(feature)) {
    if ("search" === feature) {
      if (!inputs) return m.reply("Input query link\nExample: .batoto search|vpn");
      m.react(wait);
      try {
        let teks = (await searchBatoto(inputs)).results.map((item, index) => `- *Title:* ${item.title.original}\n- *ID:* ${item.id}\n- *Genre:* ${item.genres.join(", ")}`).filter(v => v).join("\n\n________________________\n\n");
        m.reply(teks);
      } catch (e) {
        m.react(eror);
      }
    }
    if ("chapter" === feature) {
      if (!inputs) return m.reply("Input query link\nExample: .batoto search|group");
      m.react(wait);
      try {
        let teks = (await getID(inputs)).chapters.map((item, index) => `- *Name:* ${item.name}\n- *ID:* ${item.id}`).filter(v => v).join("\n\n________________________\n\n");
        m.reply(teks);
      } catch (e) {
        m.react(eror);
      }
    }
    if ("pdf" === feature) {
      if (!inputs) return m.reply("Input query link\nExample: .batoto search|group");
      m.react(wait);
      try {
        let linkArray = await getLinkArray(inputs),
          data = await addImagesToPDF(linkArray.pages);
        await conn.sendFile(m.chat, data, inputs, "DONE", m, null, {
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
handler.help = ["batoto"], handler.tags = ["internet"], handler.command = /^(batoto)$/i;
export default handler;
async function searchBatoto(q) {
  try {
    return (await axios.get("https://batotojs.tzurs11.repl.co/searchByKeyword/" + q)).data;
  } catch (error) {
    throw console.error("Failed to fetch and parse the page:", error.message), error;
  }
}
async function getID(q) {
  try {
    return (await axios.get("https://batotojs.tzurs11.repl.co/getByID/" + q)).data;
  } catch (error) {
    throw console.error("Failed to fetch and parse the page:", error.message), error;
  }
}
async function getLinkArray(q) {
  try {
    return (await axios.get("https://batotojs.tzurs11.repl.co/getChapterByID/" + q)).data;
  } catch (error) {
    throw console.error("Failed to fetch and parse the page:", error.message), error;
  }
}
async function addImagesToPDF(imageLinks) {
  return new Promise(async resolve => {
    const pdf = new PDFDocument();
    for (const link of imageLinks) {
      const imageBuffer = await downloadImage(link);
      if (imageBuffer) {
        const convertedImageBuffer = await convertWebpToPNG(imageBuffer);
        pdf.addPage().image(convertedImageBuffer);
      }
    }
    const buffers = [];
    pdf.on("data", chunk => buffers.push(chunk)), pdf.on("end", () => resolve(Buffer.concat(buffers))),
      pdf.end();
  });
}
async function downloadImage(url) {
  try {
    const response = await fetch(url);
    if (response.ok) {
      const imageBuffer = await response.arrayBuffer();
      return Buffer.from(imageBuffer);
    }
    return console.error(`Error downloading image from ${url}`), null;
  } catch (error) {
    return console.error(`Error downloading image from ${url}: ${error.message}`), null;
  }
}
async function convertWebpToPNG(webpBuffer) {
  try {
    return await sharp(webpBuffer).toFormat("png").toBuffer();
  } catch (error) {
    return console.error("Error converting webp to PNG:", error.message), null;
  }
}