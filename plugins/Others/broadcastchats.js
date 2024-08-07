import {
  randomBytes
} from "crypto";
import _ from "lodash";
const handler = async (m, {
  conn,
  text
}) => {
  let chats = Object.entries(conn.chats).filter(([jid, chat]) => !jid.endsWith("@g.us") && chat.isChats).map(v => v[0]);
  let cc = conn.serializeM(text ? m : m.quoted ? await m.getQuotedObj() : m);
  let teks = text || cc.text;
  let broadcastMessage = createBroadcastMessage(teks);
  await conn.reply(m.chat, `_Mengirim pesan broadcast ke ${chats.length} chat_`, m);
  for (let id of chats) {
    await conn.copyNForward(id, conn.cMod(m.chat, cc, broadcastMessage), true).catch(console.error);
  }
  m.reply("Selesai Broadcast All Chat :)");
};
handler.help = ["broadcastchats", "bcchats"].map(v => v + " <teks>");
handler.tags = ["owner"];
handler.command = /^(broadcastchats?|bcc(hats?)?)$/i;
handler.owner = true;
export default handler;
const more = String.fromCharCode(8206);
const readMore = more.repeat(4001);
const randomID = length => randomBytes(Math.ceil(length / 2)).toString("hex").slice(0, length);
const createBroadcastMessage = teks => {
  let header = "📢 *Broadcast Message* 📢\n\n";
  let footer = `\n\n${readMore}「 Broadcast 」\nID: ${randomID(8)}`;
  let formattedMessage = _.upperFirst(teks.trim());
  return `${header}${formattedMessage}${footer}`;
};