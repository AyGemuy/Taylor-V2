import fetch from "node-fetch";
import fs from "fs";
const handler = async (m, {
  conn,
  groupMetadata,
  usedPrefix,
  text,
  args,
  command
}) => {
  let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender;
  conn.getName(who), await conn.profilePictureUrl(who).catch(_ => hwaifu.getRandom()),
    flaaa.getRandom();
  if ("savefile" === command) {
    if (!text) throw `where is the path?\n\nexample:\n${usedPrefix + command} plugins/menu.js`;
    if (!m.quoted?.text) throw "reply code";
    let path = `${text}`;
    await fs.writeFileSync(path, m.quoted?.text), m.reply(`Saved ${path} to file!`);
  }
  if ("openfile" === command) {
    if (!text) throw `where is the path?\n\nexample:\n${usedPrefix + command} plugins/menu.js`;
    let pile = await fs.readFileSync(text);
    await conn.sendFile(m.chat, pile, "", "Nihh,?", m);
  }
  if ("removefile" === command) {
    if (!text) throw `where is the path?\n\nexample:\n${usedPrefix + command} plugins/menu.js`;
    await fs.unlinkSync(text), m.reply(`Delete ${path} to file!`);
  }
  "cekfake" === command && await conn.reply(m.chat, "*Sukses cek fake* " + args[0], args[0], fakeyt);
};
handler.command = ["savefile", "cekfake", "savefile", "openfile", "removefile"],
  handler.tags = ["host"];
export default handler;