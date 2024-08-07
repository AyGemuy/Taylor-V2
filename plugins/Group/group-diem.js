import {
  isNumber,
  somematch
} from "../../lib/other-function.js";
const cooldown = 6e4;
let handler = async (m, {
  conn,
  participants,
  usedPrefix,
  command,
  args,
  isOwner,
  isPrems,
  isAdmin
}) => {
  if (!m.quoted && !args[1] || m.quoted && !args[0]) throw `Format : ${usedPrefix + command} <timer> <@tag/quote>\n1 = 1 menit\n5 = 5 menit ... dst.\n\nContoh : *${usedPrefix + command} 10 @Alan*`;
  let total = Math.floor(isNumber(args[0]) ? Math.min(parseInt(args[0]), 200) : 1);
  let who = args[1] ? args[1].replace(/[^0-9]/g, "") + "@s.whatsapp.net" : m.quoted ? m.quoted.sender : m.mentionedJid?.[0];
  if (!who) throw "Tag salah satu lah";
  let admins = participants.filter(p => p.admin === "admin").map(p => p.id);
  let isPremium = isOwner || isAdmin || isPrems;
  if (isPremium) {
    if (admins.includes(who) && !isOwner) throw `Gaboleh gitu sesama admin :v`;
    if (total > (isPrems ? 200 : 400)) throw `[!] Maksimal ${command} : ${isPrems ? 200 : 400} menit.`;
    let users = db.data.users[who];
    if (!users || users.isBanned) throw `User tidak ada dalam database atau sudah dibanned.`;
    users.banned = true;
    await conn.reply(who, `User @${who.split("@")[0]} di *mute* selama ${total} menit.`, fakes, {
      mentions: [who]
    });
    setTimeout(() => {
      users.banned = false;
    }, cooldown);
  } else {
    m.reply(`*「ADMIN GROUP ONLY」*`);
  }
};
handler.menugroup = ["diem <timer> @tag"];
handler.tagsgroup = ["group"];
handler.command = /^(di(e|a)m|silent)$/i;
export default handler;