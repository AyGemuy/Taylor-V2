import fs from "fs/promises";
import AdmZip from "adm-zip";
import jsbeautify from "js-beautify";
const {
  js_beautify,
  css_beautify,
  html_beautify
} = jsbeautify, handler = async (m, {
  args,
  command
}) => {
  try {
    const q = m.quoted ? m.quoted : m,
      mime = (q.msg || q).mimetype || "",
      media = await q?.download();
    if (!mime || "application/zip" !== mime) throw "Invalid or no media found";
    const buffer = Buffer.from(media);
    if (buffer.length / 1048576 > 3) throw "Input file size exceeds 3 MB limit";
    const zip = new AdmZip(buffer),
      beautifyPromises = [],
      start = new Date(),
      beautifiedFiles = [],
      errorFiles = [];
    for (const zipEntry of zip.getEntries()) zipEntry.entryName.endsWith(".js") && beautifyPromises.push((async zipEntry => {
      const jsCode = zipEntry.getData().toString("utf8");
      try {
        let result;
        "beautyjszip" === command && (result = js_beautify(jsCode)), "beautycsszip" === command && (result = css_beautify(jsCode)), "beautyhtmlzip" === command && (result = html_beautify(jsCode)), zip.updateFile(zipEntry.entryName, Buffer.from(result, "utf8")),
          beautifiedFiles.push(zipEntry.entryName);
      } catch (error) {
        console.error(`Failed to beautify ${zipEntry.entryName}: ${error.message}`), errorFiles.push(zipEntry.entryName);
      }
    })(zipEntry));
    await Promise.all(beautifyPromises);
    const outputZipPath = Buffer.from(zip.toBuffer()).toString("base64"),
      end = new Date();
    let message = `*Process completed in ${(end - start) / 1e3} seconds.*\n`;
    beautifiedFiles.length > 0 && (message += `*Beautified files: ${beautifiedFiles.length}*\n`),
      errorFiles.length > 0 && (message += `*Files encountered errors: ${errorFiles.length}*\n`);
    const fileName = await q.fileName || "BeautifiedZip.zip";
    await conn.sendFile(m.chat, Buffer.from(outputZipPath, "base64"), fileName, fileName, m),
      m.reply(message);
  } catch (err) {
    throw console.error(`Error occurred: ${err.message}`), `Error beautifying file: ${err.message}`;
  }
};
handler.command = /^(beautyjszip|beautycsszip|beautyhtmlzip)$/i;
export default handler;