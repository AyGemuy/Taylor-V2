import fs from "fs";
import AdmZip from "adm-zip";
import {
  Deobfuscator
} from "deobfuscator";
const handler = async (m, {
  args,
  command
}) => {
  try {
    const q = m.quoted || m;
    if ("application/zip" !== ((q.msg || q).mimetype || "")) throw 'Invalid media type. Only "application/zip" is allowed.';
    const buffer = await q?.download(),
      fileSizeInBytes = buffer.length;
    if (fileSizeInBytes / 1048576 > 3) throw "Input file size is too large. It must be below 3 MB.";
    const zip = new AdmZip(buffer),
      obfuscatePromises = [],
      start = new Date(),
      obfuscatedFiles = [],
      errorFiles = [];
    for (const zipEntry of zip.getEntries()) zipEntry.entryName.endsWith(".js") && obfuscatePromises.push((async zipEntry => {
      const jsCode = zipEntry.getData().toString("utf8");
      try {
        const obfuscatedCode = await Decrypt(jsCode);
        zip.updateFile(zipEntry.entryName, Buffer.from(obfuscatedCode, "utf8")), obfuscatedFiles.push(zipEntry.entryName);
      } catch (error) {
        console.error(`Failed to obfuscate ${zipEntry.entryName}: ${error.message}`), errorFiles.push(zipEntry.entryName);
      }
    })(zipEntry));
    await Promise.all(obfuscatePromises);
    const outputZipPath = Buffer.from(zip.toBuffer()).toString("base64"),
      end = new Date();
    let message = `*Process completed in ${(end - start) / 1e3} seconds.*\n`;
    obfuscatedFiles.length > 0 && (message += `*Obfuscated files: ${obfuscatedFiles.length}*\n`),
      errorFiles.length > 0 && (message += `*Files encountered errors: ${errorFiles.length}*\n`);
    const fileName = await q.fileName || "ObfuscateZip.zip";
    await conn.sendFile(m.chat, Buffer.from(outputZipPath, "base64"), fileName, fileName, m),
      m.reply(message);
  } catch (err) {
    return console.error(`Error occurred: ${err.message}`), m.reply(`An error occurred while obfuscating file: ${err}`);
  }
};
handler.command = /^(deobfuszip|deobfuscatezip|deczip)$/i;
export default handler;
async function Decrypt(query) {
  return new Deobfuscator().deobfuscateSource(query);
}