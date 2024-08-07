const handler = async (m, {
  conn,
  text
}) => {
  let [l, r] = text.split("|");
  l || (l = ""), r || (r = ""), await conn.reply(m.chat, l + readMore + r, m);
};
handler.help = ["readmore", "spoiler"].map(v => v + " <teks>|<teks>"), handler.tags = ["tools"],
  handler.command = /^(spoiler|hidetext|readmore|selengkapnya)$/i;
export default handler;
const more = String.fromCharCode(8206),
  readMore = more.repeat(4001);