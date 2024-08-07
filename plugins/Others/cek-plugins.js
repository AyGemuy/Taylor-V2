const handler = async (m, {
  args,
  usedPrefix,
  text,
  command
}) => {
  let ar1 = Object.keys(plugins).map(v => v.replace(".js", "")),
    listSections = [];
  if (Object.keys(ar1).map((v, index) => {
      listSections.push(["                [ RESULT " + ++index + " ]", [
        [ar1[v].toUpperCase(), "/plugins " + ar1[v], "To Check"]
      ]]);
    }), !text) return conn.sendList(m.chat, "*[ CHECK PLUGINS ]*", "⚡ Silakan pilih PLUGINS yang ingin di cek...", author, "☂️ SELECT ☂️", listSections, m);
  try {
    let {
      total,
      success,
      last,
      lastSuccess
    } = db.data.stats[text + ".js"];
    await conn.reply(m.chat, `\n📑 *Plugins:* ${args[0]}\n*💬 Total :* ${total}\n*✔️ Succes :* ${success}\n${readMore}\n*🕔 Last time used:* ${new Date(last)}\n*🕔 Last time it worked:* ${new Date(lastSuccess)}\n`, m);
  } catch (e) {
    m.react(eror);
  }
};
handler.help = ["plugins"].map(v => v + " <teks>"), handler.tags = ["owner"],
  handler.command = /^plugins$/i;
export default handler;
const more = String.fromCharCode(8206),
  readMore = more.repeat(4001);