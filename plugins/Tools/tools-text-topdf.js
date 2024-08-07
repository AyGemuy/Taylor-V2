import PDFDocument from "pdfkit";
import {
  Writable
} from "stream";
const handler = async (m, {
  conn,
  args,
  usedPrefix,
  command
}) => {
  let text, query = `input text\nEx. *.${command}* hello world\n<command> <text>`;
  if (args.length >= 1) text = args.slice(0).join(" ");
  else {
    if (!m.quoted || !m.quoted?.text) throw query;
    text = m.quoted?.text;
  }
  m.react(wait);
  try {
    let pdf = await textToPDFBuffer(text).then(buffer => buffer);
    await conn.sendMessage(m.chat, {
      document: pdf,
      mimetype: "application/pdf",
      fileName: `For ${m.name}.pdf`
    }, {
      quoted: m
    });
  } catch (e) {
    m.react(eror);
  }
};
handler.help = ["texttopdf"], handler.tags = ["tools"], handler.command = /^(texttopdf)$/i;
export default handler;
async function textToPDFBuffer(text) {
  return new Promise((resolve, reject) => {
    const buffers = [],
      streamBuffer = new Writable({
        write(chunk, encoding, next) {
          buffers.push(chunk), next();
        }
      }),
      doc = new PDFDocument();
    doc.pipe(streamBuffer), doc.text(text), doc.end(), streamBuffer.on("finish", () => {
      const pdfBuffer = Buffer.concat(buffers);
      resolve(pdfBuffer);
    }), streamBuffer.on("error", reject);
  });
}