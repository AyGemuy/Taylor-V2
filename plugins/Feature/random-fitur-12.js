import fetch from "node-fetch";
import hxz from "hxz-api";
import fs from "fs";
const handler = async (m, {
  conn,
  groupMetadata,
  usedPrefix,
  text,
  args,
  isPrems,
  isOwner,
  command
}) => {
  wm,
  author,
  snh,
  fs.readFileSync("./thumbnail.jpg"),
  flaaa.getRandom();
  let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender;
  await conn.profilePictureUrl(who).catch(_ => hoppai.getRandom());
  if ("tthnowm" === command) {
    if (!text) return m.reply(`Example: ${usedPrefix + command} https://vt.tiktok.com/ZSenkFefe`);
    let p = await hxz.ttdownloader(text),
      {
        nowm,
        wm,
        audio
      } = p;
    await conn.sendFile(m.chat, nowm, null, "No Wm", m);
  }
  if ("tthwm" === command) {
    if (!text) return m.reply(`Example: ${usedPrefix + command} https://vt.tiktok.com/ZSenkFefe`);
    let p = await hxz.ttdownloader(text),
      {
        nowm,
        wm,
        audio
      } = p;
    await conn.sendFile(m.chat, wm, null, "Wm", m);
  }
  if ("tthaudio" === command) {
    if (!text) return m.reply(`Example: ${usedPrefix + command} https://vt.tiktok.com/ZSenkFefe`);
    let p = await hxz.ttdownloader(text),
      {
        nowm,
        wm,
        audio
      } = p;
    await conn.sendFile(m.chat, audio, null, "Audio", m);
  }
  if ("chara" === command) {
    let p = await hxz.chara(text);
    await conn.sendFile(m.chat, p.result, null, "Chara", m);
  }
};
handler.command = handler.help = ["tthnowm", "tthwm", "tthaudio", "chara"], handler.tags = ["downloader"];
export default handler;