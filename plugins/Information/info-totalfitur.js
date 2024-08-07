import _ from "lodash";
const handler = async (m, {
  conn,
  text,
  usedPrefix,
  command
}) => {
  try {
    const counts = _.chain(Object.values(plugins)).flatMap(p => p.help ? p.tags : []).filter(tag => tag != null && tag.trim() !== "").reduce((c, tag) => (_.set(c, tag, _.get(c, tag, 0) + 1), c), {}).value();
    const tagList = _.chain(counts).toPairs().sortBy(([tag, count]) => -count).map(([tag, count]) => `⭔ ${(_.capitalize(tag.charAt(0)) + tag.slice(1)).padEnd(13)} - ${count.toString().padStart(3)}`).join("\n").value();
    const totalCommands = _.sum(Object.values(counts));
    const responseText = `\`\`\`${tagList}\n\`\`\``;
    await conn.reply(m.chat, `*[ FEATURE LIST ]*\n\n${responseText}\n\n*Total fitur: ${totalCommands} Commands*`, m, adReply);
  } catch (error) {
    console.error(error);
    await conn.reply(m.chat, "Terjadi kesalahan dalam mengeksekusi perintah.", m, adReply);
  }
};
handler.help = ["totalfitur"];
handler.tags = ["main", "info"];
handler.command = /^(feature|totalfitur)$/i;
export default handler;