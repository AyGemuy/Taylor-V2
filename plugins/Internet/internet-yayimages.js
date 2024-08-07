import fetch from "node-fetch";
import {
  sticker
} from "../../lib/sticker.js";
const handler = async (m, {
  conn,
  text,
  usedPrefix,
  command
}) => {
  let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender,
    name = (await conn.profilePictureUrl(who).catch(_ => hwaifu.getRandom()), conn.getName(who));
  if (!text) throw `Penggunaan:\n${usedPrefix + command} <teks>\n\nContoh:\n${usedPrefix + command} car`;
  let res = await fetch(`https://api.yayimages.com/search/ea990627-3429-4819-bfe7-9ba03a0c0f71/${text}`),
    f = await res.json(),
    listSections = [];
  return Object.values(f.images).map((v, index) => {
    listSections.push([index + " " + cmenub + " " + v.title, [
      ["Get Photo", usedPrefix + "get " + v.thumb_url, `\n          ${1 + index}. *id:* ${v.id}\n*description:* ${v.description}\n*thumb_url:* ${v.thumb_url}\n*username:* ${v.username}\n*width:* ${v.width}\n*height:* ${v.height}\n*model_count:* ${v.model_count}\n*vector:* ${v.vector}\n*category:* ${v.category}\n`]
    ]]);
  }), conn.sendList(m.chat, htki + " 📺 Yayimages 🔎 " + htka, `⚡ Hai ${name} Silakan pilih Yayimages Search di tombol di bawah...\n*Teks yang anda kirim:* ${text}\n\nKetik ulang *${usedPrefix + command}* teks anda untuk mengubah teks lagi`, author, "☂️ Yayimages Disini ☂️", listSections, m);
};
handler.help = ["yay <teks>"], handler.tags = ["sticker"], handler.command = /^(yay)$/i,
  handler.limit = 3;
export default handler;