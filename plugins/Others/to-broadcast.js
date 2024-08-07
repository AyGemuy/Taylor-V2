import {
  randomBytes
} from "crypto";
const handler = async (m, {
  conn,
  text,
  args,
  usedPrefix,
  command
}) => {
  let chats;
  conn.getName(m.sender), flaaa.getRandom();
  if (!["pc", "gc", "all"].includes(text)) return m.reply("PC,  GC atau ALL\n*Ex.* .tobc *gc*");
  if ("pc" === text.toLowerCase() && (chats = Object.keys(conn.chats).filter(v => v.endsWith("s.whatsapp.net"))), "gc" === text.toLowerCase() && (chats = Object.keys(conn.chats).filter(v => v.endsWith("g.us"))), "all" === text.toLowerCase() && (chats = Object.keys(conn.chats).filter(v => v)), !m.quoted) return m.reply("Reply pesan");
  let medias = m.getQuotedObj();
  await conn.reply(m.chat, `_Mengirim pesan broadcast ke ${chats.length} chat_`, m);
  try {
    for (let id of chats) await delay(1500), await conn.copyNForward(id, medias, !0);
  } catch {
    m.react(eror);
  }
  m.reply("Selesai Broadcast All Chat :)");
};
handler.help = ["tobroadcast", "tobc"].map(v => v + " <teks>"), handler.tags = ["owner"],
  handler.command = /^(tobroadcast|tobc)$/i, handler.owner = !0;
export default handler;
const more = String.fromCharCode(8206),
  readMore = more.repeat(4001),
  delay = time => new Promise(res => setTimeout(res, time)),
  randomID = length => randomBytes(Math.ceil(.5 * length)).toString("hex").slice(0, length);