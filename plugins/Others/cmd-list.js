const handler = async (m, {
  conn
}) => {
  let cmdList = Object.entries(db.data.sticker).map(([key, value], index) => `*${index + 1}.* ${value.locked ? "🔒 " : "🔓"}${key} : ${value.text}`).join("\n"),
    str = cmdList ? `📜 *DAFTAR CMD* 📜\n${cmdList}` : "Tidak ada CMD tersedia";
  await conn.reply(m.chat, str, m, {
    mentions: Object.values(db.data.sticker).map(x => x.mentionedJid).reduce((a, b) => [...a, ...b], [])
  });
};
handler.help = ["listcmd"], handler.tags = ["database"], handler.command = ["listcmd"];
export default handler;