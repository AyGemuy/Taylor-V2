import JavaScriptObfuscator from "javascript-obfuscator";
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
      const message = await Encrypt(docBuffer.toString("utf-8"));
      m.reply(message);
    } else {
      const message = await Encrypt(text);
      m.reply(message);
    }
  } catch (error) {
    const errorMessage = `Terjadi kesalahan: ${error.message}`;
    m.reply(errorMessage);
  }
};
handler.command = /^(obfus(cate)?|enc)$/i;
export default handler;
async function Encrypt(query) {
  return JavaScriptObfuscator.obfuscate(query, {
    compact: !0,
    controlFlowFlattening: !0,
    controlFlowFlatteningThreshold: 1,
    numbersToExpressions: !0,
    simplify: !0,
    stringArrayShuffle: !0,
    splitStrings: !0,
    stringArrayThreshold: 1,
    sourceMap: !1,
    sourceMapMode: "separate"
  }).getObfuscatedCode();
}