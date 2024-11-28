import { IlovePDF } from "../../lib/tools/ilovepdf.js";
const pdfTools = [
  "compress",
  "extract",
  "htmlpdf",
  "imagepdf",
  "merge",
  "officepdf",
  "pagenumber",
  "pdfa",
  "pdfjpg",
  "pdfocr",
  "protect",
  "repair",
  "rotate",
  "split",
  "unlock",
  "validatepdfa",
  "watermark",
];
const imageTools = [
  "compressimage",
  "cropimage",
  "convertimage",
  "removebackgroundimage",
  "repairimage",
  "resizeimage",
];
const parsePayload = (payloadStr) => {
  const payload = {};
  const keyValuePairs = payloadStr.split("|");
  keyValuePairs.forEach((pair) => {
    const [key, value] = pair.split("=");
    if (key && value) {
      payload[key.trim()] = value.trim();
    }
  });
  return payload;
};
const handler = async (m, { command, usedPrefix, conn, args }) => {
  const ilovepdf = new IlovePDF();
  m.react(wait);
  if (!args.length) {
    m.reply(
      `❌ Input tidak ditemukan!\n\n📋 Contoh penggunaan yang benar:\n• ${usedPrefix}${command} 1 (untuk memproses media yang dibalas dengan opsi pertama)\n• ${usedPrefix}${command} 1|key=data|key2=value (untuk menambahkan payload tambahan dalam format key=value)`,
    );
    return;
  }
  const [toolIndexStr, ...extraArgs] = args.join(" ").split("|");
  const toolIndex = parseInt(toolIndexStr, 10) - 1;
  const extraPayloadStr = extraArgs.join("|");
  const extraPayload = parsePayload(extraPayloadStr);
  let tool;
  if (toolIndex >= 0 && toolIndex < pdfTools.length) {
    tool = pdfTools[toolIndex];
  } else if (
    toolIndex >= pdfTools.length &&
    toolIndex < pdfTools.length + imageTools.length
  ) {
    tool = imageTools[toolIndex - pdfTools.length];
  } else {
    m.reply(
      `❌ Indeks tidak valid!\n\n📋 Pilih nomor antara 1 hingga ${pdfTools.length + imageTools.length}:\n${pdfTools.map((type, i) => `${i + 1}. PDF: ${type}`).join("\n")}\n${imageTools.map((type, i) => `${i + pdfTools.length + 1}. Image: ${type}`).join("\n")}`,
    );
    return;
  }
  const q = m.quoted || m;
  const mime = (q.msg || q).mimetype || "";
  if (!mime) {
    m.reply(
      `❌ Media tidak ditemukan!\n\n📋 Balas sebuah gambar dengan mengetik:\n${usedPrefix}${command} 1`,
    );
    return;
  }
  const media = await q.download();
  if (!media) {
    m.reply(
      "❌ Gagal mengunduh media! Silakan coba lagi atau gunakan media lain.",
    );
    return;
  }
  try {
    const result = await ilovepdf.process(media, tool, extraPayload);
    if (result?.fileBuffer) {
      await conn.sendFile(
        m.chat,
        result.fileBuffer,
        "",
        `File berhasil dihasilkan dengan tool *${tool.toUpperCase()}*${extraPayloadStr ? `\n📋 Payload tambahan: ${extraPayloadStr}` : ""}.`,
        m,
      );
      m.react(sukses);
    } else {
      m.reply("❌ Gagal memproses media! Tidak ada hasil yang dihasilkan.");
    }
  } catch (error) {
    console.error(`Error in IlovePDF handler: ${error.message}`);
    m.react(eror);
  }
};
handler.help = ["ilovepdf *[Balas gambar]*"];
handler.tags = ["tool"];
handler.command = /^(ilovepdf)$/i;
export default handler;
