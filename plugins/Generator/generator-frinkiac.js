const Frinkiac = await (await import("../../lib/tools/frinkiac.js")).default;
const frinkiac = new Frinkiac();
const handler = async (m, {
  conn,
  text,
  args,
  usedPrefix,
  command
}) => {
  if (!text) throw "Input text required";
  const [query, caption] = text.split("|");
  if (!query || !caption) throw "Input query and caption required\n*Example:*\n" + usedPrefix + command + " memes|says";
  try {
    const result = await frinkiac.searchMaker(query, caption);
    const frink = Object.entries(result).map(([key, value]) => `  ○ *${key.toUpperCase()}:* ${value}`).join("\n");
    await conn.sendFile(m.chat, result.url, "frink.jpg", frink, m);
  } catch (e) {
    m.reply("Error occurred");
  }
};
handler.help = ["frink"].map(v => v + " (query)");
handler.tags = ["maker"];
handler.command = /^(frink)$/i;
handler.limit = true;
export default handler;