import {
  kbbi
} from "@bochilteam/scraper";
import fetch from "node-fetch";
const handler = async (m, {
      text,
      usedPrefix,
      command
    }) => {
      let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender;
      await conn.profilePictureUrl(who).catch(_ => hwaifu.getRandom()), conn.getName(who);
      if (!text) throw `Example use ${usedPrefix}${command} halo`;
      try {
        let caption = `\n${(await kbbi(text)).map(v => `\n*📌${v.title}*\n\n${v.means.map(v => "- " + v).join("\n`")}\n`).join("\n").trim()}\n\nNote:\np = Partikel: kelas kata yang meliputi kata depan, kata sambung, kata seru, kata sandang, ucapan salam\nn = Nomina: kata benda\n`.trim();
await conn.reply(m.chat, caption, m);
} catch {
m.react(eror);
}
};

handler.help = [ "kbbi <teks>" ], handler.tags = [ "internet" ], handler.command = /^kbbi$/i;

export default handler;