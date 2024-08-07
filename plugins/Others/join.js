import fs from "fs";
import {
  randomBytes
} from "crypto";
let linkRegex = /chat.whatsapp.com\/([0-9A-Za-z]{20,24})( [0-9]{1,3})?/i;
const handler = async (m, {
  conn,
  text,
  usedPrefix,
  command,
  isOwner,
  args
}) => {
  let chat = db.data.chats[m.chat],
    imgr = flaaa.getRandom(),
    [_, code, expired] = text.match(linkRegex) || [];
  if (!code) throw `*Example:* ${usedPrefix + command} ${sgc}`;
  let res = await conn.groupAcceptInvite(code);
  if (!res) throw res.toString();
  let name = conn.getName(res).catch(_ => null),
    caption = `${dmenut} Sukses Join Di Grup\n    ${dmenub} ${name || res}\n    ${dmenub} *Jangan lupa baca rules ngap!*\n    ${dmenuf}\n    `;
  if (await conn.sendFile(m.chat, imgr + "join", "", caption, m), chat.bcjoin) {
    let chats = Object.entries(conn.chats).filter(([_, chat]) => chat.isChats).map(v => v[0]),
      cc = conn.serializeM(text ? m : m.quoted ? await m.getQuotedObj() : m);
    text || cc.text;
    await conn.reply(m.chat, `Membagikan Link Grup Kamu ke ${chats.length} chat`, m);
    for (let id of chats) await conn.sendFile(id, imgr + "New Group", "", "*「 New Group 」* \n\n" + text, m);
  }
};
handler.command = /^join$/i, handler.rowner = !0, handler.owner = !0, handler.premium = !0;
export default handler;