import {
  Deobfuscator
} from "deobfuscator";
const handler = async (m, {
  args,
  command,
  usedPrefix
}) => {
  const usage = `*Example:*\n${usedPrefix}${command} (Input text or reply text to enc code)\n${usedPrefix}${command} doc (Reply to a document)`;
  let text;
  if (args.length >= 1) text = args.join(" ");
  else {
    if (!m.quoted || !m.quoted?.text) return m.reply(usage);
    text = m.quoted?.text;
  }
  try {
    if ("doc" === text && m.quoted && "documentMessage" === m.quoted?.mtype) {
      let docBuffer;
      m.quoted?.mimetype && (docBuffer = await m.quoted?.download());
      const message = await Decrypt(docBuffer.toString("utf-8"));
      m.reply(message);
    } else {
      const message = await Decrypt(text);
      m.reply(message);
    }
  } catch (error) {
    const errorMessage = `Terjadi kesalahan: ${error.message}`;
    m.reply(errorMessage);
  }
};
handler.command = /^(deobfus(cate)?|dec)$/i;
export default handler;
async function Decrypt(query) {
  return new Deobfuscator().deobfuscateSource(query);
}