import { clockString } from "../../lib/other-function.js";
const handler = async (m, { conn, usedPrefix }) => {
  let user = db.data.users[m.sender],
    timers = clockString(108e5 - (new Date() - user.lastgrab)),
    name = conn.getName(m.sender);
  if (user.stamina < 20)
    return m.reply(
      `Stamina anda tidak cukup\nharap isi stamina anda dengan *${usedPrefix}eat8`,
    );
  if (user.lastgrab > 108e5)
    throw m.reply(`Kamu masih kelelahan\nHarap tunggu ${timers} lagi`);
  let hmsil1 = `${10 * `${Math.floor(5 * Math.random())}`}`,
    hmsil2 = `${10 * `${Math.floor(10 * Math.random())}`}`,
    hmsil3 = `${10 * `${Math.floor(7 * Math.random())}`}`,
    hmsil4 = `${10 * `${Math.floor(4 * Math.random())}`}`,
    hmsil5 = `${10 * `${Math.floor(200 * Math.random())}`}`,
    hmsil6 = `${10 * `${Math.floor(200 * Math.random())}`}`,
    hmsil7 = `${10 * `${Math.floor(20 * Math.random())}`}`,
    hmsil8 = `${10 * `${Math.floor(100 * Math.random())}`}`,
    hmsil9 = `${10 * `${Math.floor(100 * Math.random())}`.trim()}`,
    jln = `\n⬛⬛⬛⬛⬛⬛⬛⬛🚶⬛\n⬛⬜⬜⬜⬛⬜⬜⬜⬛⬛\n⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛\n🏘️🏘️🏘️🏘️🌳🌳🏘️ 🌳🌳🌳\n\n✔️ ${name} Wait....\n`,
    jln2 = `\n⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛\n⬛⬜⬜⬜⬛⬜⬜⬜⬛🚶\n⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛\n🏘️🏘️🏘️🏘️🌳🌳🏘️ 🌳🌳🌳\n\n➕ ${name} Menemukan Area....\n`,
    jln3 = `\n⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛\n⬛⬜⬜⬛⬛⬜⬜⬜⬛⬛\n⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛\n🏘️🏘️🏘️🏘️🌳🌳🏘️ 🌳🌳🚶\n\n➕ ${name} Mulai Megrab....\n`,
    jln4 = `\n⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛\n⬛⬜⬜⬛⬛⬜⬜⬜⬛⬛\n⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛\n🏘️🏘️🏘️🏘️🌳🌳🏘️ 🚶\n\n➕ ${name}\n💹 Menerima gaji....\n`,
    hsl = `\n*《 Hasil grab ${name} 》*\n\n *💎 = [ ${hmsil1} ] Diamond*\n *⛓️ = [ ${hmsil2} ] Iron*\n *🪙 = [ ${hmsil3} ] Gold*\n *💚 = [ ${hmsil4} ] Emerald*\n *🪨 = [ ${hmsil5} ] Rock*\n *🌕 = [ ${hmsil6} ] Clay*\n *🕳️ = [ ${hmsil7} ] Coal*\n *🌑 = [ ${hmsil8} ] Sand*\n *✉️ = [ ${hmsil9} ] Exp*\n \n Stamina anda berkurang -20\n`;
  (user.diamond += hmsil1),
    (user.iron += hmsil2),
    (user.gold += hmsil3),
    (user.emerald += hmsil4),
    (user.rock += hmsil5),
    (user.clay += hmsil6),
    (user.coal += hmsil7),
    (user.sand += hmsil8),
    (user.exp += hmsil9),
    (user.stamina -= 20),
    await conn.loadingMsg(
      m.chat,
      `🔍 ${name} Mencari Area Grab.....`,
      hsl,
      [jln, jln2, jln3, jln4],
      2e3,
      m,
    ),
    (user.lastgrab = 1 * new Date());
};
(handler.help = ["grab"]),
  (handler.tags = ["rpg"]),
  (handler.command = /^(taksi|taxy|grab|megrab)$/i);
export default handler;
