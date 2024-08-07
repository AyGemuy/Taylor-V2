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
  let rki = await fetch("https://api.waifu.pics/sfw/slap");
  if (!rki.ok) return await rki.text();
  let jkis = await rki.json(),
    {
      url
    } = jkis,
    stiker = await sticker(null, url, `(${name2}) slapped`, `${name}`);
  await conn.sendFile(m.chat, stiker, null, {
    asSticker: !0
  }, m), m.reply("👊🏻");
};
handler.help = ["slap @tag"], handler.tags = ["anime"], handler.command = /^(slap|bofetada)$/i,
  handler.diamond = !0, handler.group = !0;
export default handler;