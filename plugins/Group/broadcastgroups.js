import {
  randomBytes
} from "crypto";
const handler = async (m, {
  conn,
  text
}) => {
  let groups = Object.entries(conn.chats).filter(([jid, chat]) => jid.endsWith("@g.us") && chat.isChats && !chat.metadata?.read_only && !chat.metadata?.announce).map(v => v[0]),
    cc = text ? m : m.quoted ? await m.getQuotedObj() : m,
    teks = text || cc.text;
  await conn.reply(m.chat, `_Mengirim pesan broadcast ke ${groups.length} grup_`, m);
  for (let id of groups) await conn.copyNForward(id, conn.cMod(m.chat, cc, /bc|broadcast/i.test(teks) ? teks : teks + "\n" + readMore + "「 Broadcast 」\n" + randomID(8)), !0).catch(_ => _);
  m.reply("Selesai Broadcast All Group :)");
};
handler.help = ["broadcastgroup", "bcgc"].map(v => v + " <teks>"), handler.tags = ["owner"],
  handler.command = /^(broadcast|bc)(group|grup|gc)$/i, handler.owner = !0;
export default handler;
const more = String.fromCharCode(8206),
  readMore = more.repeat(4001),
  randomID = length => randomBytes(Math.ceil(.5 * length)).toString("hex").slice(0, length);