import fetch from "node-fetch";
const handler = async (m, {
  conn,
  text,
  command,
  usedPrefix
}) => {
  m.chat;
  if (!text) throw "Input Query";
  try {
    m.react(wait);
    let res = await fetch("https://xeno-canto.org/api/2/recordings?query=" + text),
      list = (await res.json()).recordings.map((item, index) => `*${htki} 📺 Bird Sound 🔎 ${htka}*\n*ID:* ${item.id}\n*En:* ${item.en}\n*Rec:* ${item.rec}\n*Loc:* ${item.loc}\n*Downloads:* ${item.file}\n`).join("\n");
    m.reply(list);
  } catch (e) {
    m.react(eror);
  }
};
handler.help = ["xeno"], handler.tags = ["tools"], handler.command = /^(xeno)$/i;
export default handler;