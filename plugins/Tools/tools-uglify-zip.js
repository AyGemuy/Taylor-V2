import fs from "fs/promises";
import AdmZip from "adm-zip";
import uglify from "uglify-js";
const handler = async (m, {
  args,
  command
}) => {
  try {
    const q = m.quoted ? m.quoted : m,
      mime = (q.msg || q).mimetype || "";
    if (!mime || "application/zip" !== mime) throw "Invalid or no media found";
    const media = await q?.download(),
      buffer = Buffer.from(media);
    if (buffer.length / 1048576 > 3) throw "Input file size exceeds 3 MB limit";
    const zip = new AdmZip(buffer),
      obfuscatePromises = [],
      start = new Date(),
      obfuscatedFiles = [],
      errorFiles = [];
    for (const zipEntry of zip.getEntries()) zipEntry.entryName.endsWith(".js") && obfuscatePromises.push((async zipEntry => {
      const jsCode = zipEntry.getData().toString("utf8");
      try {
        const result = uglify.minify(jsCode, {
          mangle: {
            toplevel: !0
          },
          compress: {
            toplevel: !0
          }
        });
        result.error ? (console.error(`Failed to obfuscate ${zipEntry.entryName}: ${result.error}`), errorFiles.push(zipEntry.entryName)) : (zip.updateFile(zipEntry.entryName, Buffer.from(result.code, "utf8")), obfuscatedFiles.push(zipEntry.entryName));
      } catch (error) {
        console.error(`Failed to obfuscate ${zipEntry.entryName}: ${error.message}`), errorFiles.push(zipEntry.entryName);
      }
    })(zipEntry));
    await Promise.all(obfuscatePromises);
    const outputZipPath = Buffer.from(zip.toBuffer()).toString("base64"),
      end = new Date();
    let message = `*Process completed in ${(end - start) / 1e3} seconds.*\n`;
    obfuscatedFiles.length > 0 && (message += `*Uglified files: ${obfuscatedFiles.length}*\n`),
      errorFiles.length > 0 && (message += `*Files encountered errors: ${errorFiles.length}*\n`);
    const fileName = await q.fileName || "UglifiedZip.zip";
    await conn.sendFile(m.chat, Buffer.from(outputZipPath, "base64"), fileName, fileName, m),
      m.reply(message);
  } catch (err) {
    throw console.error(`Error occurred: ${err.message}`), `Error uglified file: ${err.message}`;
  }
};
handler.command = /^(uglifyzip)$/i;
export default handler;