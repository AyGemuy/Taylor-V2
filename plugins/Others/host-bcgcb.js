import fs from "fs";
const handler = async (m, {
  conn,
  args
}) => {
  let text, groups = Object.entries(conn.chats).filter(([jid, chat]) => jid.endsWith("@g.us") && chat.isChats && !chat.metadata?.read_only && !chat.metadata?.announce).map(v => v[0]),
    imgr = flaaa.getRandom();
  if (args.length >= 1) text = args.slice(0).join(" ");
  else {
    if (!m.quoted || !m.quoted?.text) throw "Input Teks";
    text = m.quoted?.text;
  }
  for (let id of groups) {
    (await conn.groupMetadata(id)).participants.map(v => v.jid);
    await conn.sendFile(m.chat, imgr + "BROADCAST", "", htki + " *BROADCAST* " + htka + "\n\n*Pesan:*\n" + text, m);
  }
};
handler.command = ["bcgcb"], handler.tags = ["host"], handler.help = ["bcgcb"];
export default handler;