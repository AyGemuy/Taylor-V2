import {
  canLevelUp,
  xpRange
} from "../../lib/levelling.js";
import {
  levelup
} from "../../lib/canvas.js";
const handler = async (m, {
  conn,
  args,
  usedPrefix,
  text,
  command
}) => {
  let user = db.data.users[m.sender];
  if (!canLevelUp(user.level, user.exp, multiplier)) {
    let {
      min,
      xp,
      max
    } = xpRange(user.level, multiplier);
    throw `\nLevel ${user.level} 📊\n*${user.exp - min} / ${xp}*\nKurang *${max - user.exp}* lagi! ✨\n`.trim();
  }
  let beforeLevel = 1 * user.level;
  for (; canLevelUp(user.level, user.exp, multiplier);) user.level++;
  if (beforeLevel !== user.level) {
    let ppuser, teks = `Selamat ${conn.getName(m.sender)} naik 🧬level\n.             ${user.role}`,
      str = `Selamat ${conn.getName(m.sender)} naik 🧬level\n.             ${user.role}\n\n*🎉 C O N G R A T S 🎉*\n*${beforeLevel}* ➔ *${user.level}* [ *${user.role}* ]\n\n• 🧬Level Sebelumnya : ${beforeLevel}\n• 🧬Level Baru : ${user.level}\n• Pada Jam : ${new Date().toLocaleString("id-ID")}\n\n*Note:* _Semakin sering berinteraksi dengan bot Semakin Tinggi level kamu_\n`.trim(),
      {
        min,
        xp,
        max
      } = xpRange(user.level, multiplier);
    await conn.profilePictureUrl(m.sender).catch(_ => "./src/avatar_contact.png"), user.exp,
      user.role, user.level, m.sender.substring(3, 7), Object.entries(db.data.users).sort((a, b) => b[1].level - a[1].level).map(v => v[0]).indexOf(m.sender);
    try {
      ppuser = await conn.profilePictureUrl(m.sender, "image");
    } catch {
      ppuser = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMxMUXFtd5GrFkxyrU-f5zA2IH8MZ-U-cFKg&usqp=CAU";
    }
    try {
      let datac = await levelup(teks, user.level);
      await conn.sendFile(m.chat, datac, "", str, m);
    } catch (e) {
      try {
        await conn.sendFile(m.chat, fla + "levelup", "", str, m);
      } catch (e) {
        m.reply(str || eror);
      }
    }
  }
};
handler.help = ["levelup"], handler.tags = ["xp"], handler.command = /^level(|up)$/i;
export default handler;