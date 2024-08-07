import fetch from "node-fetch";
const handler = async (m, {
  conn,
  text,
  usedPrefix,
  command
}) => {
  let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender,
    name = (await conn.profilePictureUrl(who).catch(_ => hwaifu.getRandom()), conn.getName(who));
  try {
    if (!text) throw `Penggunaan:\n${usedPrefix + command} <teks>\n\nContoh:\n${usedPrefix + command} spongebob`;
    let res = await fetch(API("lolhuman", "/api/stickerwa", {
        query: text
      }, "apikey")),
      ha = (await res.json()).result,
      row = Object.values(ha).map((v, index) => ({
        title: index + " " + v.title,
        description: "\nAuthor: " + v.author + "\nUrl: " + v.url + "\nUrl: " + Array.from(v.stickers),
        rowId: usedPrefix + "fetchsticker " + v.stickers.getRandom() + " wsf"
      })),
      button = {
        buttonText: `☂️ ${command} Search Disini ☂️`,
        description: `⚡ ${name} Silakan pilih ${command} Search di tombol di bawah...\n*Teks yang anda kirim:* ${text}\n\nKetik ulang *${usedPrefix + command}* teks anda untuk mengubah teks lagi`,
        footerText: wm
      };
    return await conn.sendListM(m.chat, button, row, m);
  } catch (e) {
    m.react(eror);
  }
};
handler.help = ["stickerly <teks>"], handler.tags = ["sticker"], handler.command = /^(stickerly)$/i,
  handler.limit = 3;
export default handler;