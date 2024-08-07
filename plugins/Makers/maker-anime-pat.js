import fetch from "node-fetch";
import {
  sticker
} from "../../lib/sticker.js";
const handler = async (m, {
  conn,
  args,
  usedPrefix,
  command
}) => {
  let who;
  if (who = m.isGroup ? m.mentionedJid[0] ? m.mentionedJid[0] : !!m.quoted && m.quoted?.sender : m.chat, !who) throw `✳️ Tag or mention someone\n\n📌 Example : ${usedPrefix + command} @tag`;
  db.data.users[who];
  let name = conn.getName(who),
    name2 = m.name;
  m.react(wait);
  let rpat = await fetch("https://api.waifu.pics/sfw/pat");
  if (!rpat.ok) return await rpat.text();
  let json = await rpat.json(),
    {
      url
    } = json,
    stiker = await sticker(null, url, `(${name2}) caress to`, `${name}`);
  await conn.sendFile(m.chat, stiker, null, {
    asSticker: !0
  }, m), m.reply("☺️");
};
handler.help = ["pat @tag"], handler.tags = ["anime"], handler.command = /^(acariciar|pat)$/i,
  handler.group = !0;
export default handler;