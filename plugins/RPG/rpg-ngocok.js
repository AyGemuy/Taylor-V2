import { clockString } from "../../lib/other-function.js";
const handler = async (m, { conn, usedPrefix, groupMetadata }) => {
  const user = db.data.users[m.sender],
    timers = clockString(108e5 - (Date.now() - user.lastngocok)),
    pengocok = conn.getName(m.sender),
    a = groupMetadata.participants.map((v) => v.id).getRandom();
  if (user.stamina < 20)
    return m.reply(
      `Stamina anda tidak cukup\nharap isi stamina anda dengan *${usedPrefix}eat8`,
    );
  if (user.lastngocok > 108e5)
    throw m.reply(`Kamu masih kelelahan\nHarap tunggu ${timers} lagi`);
  const [rndm1, rndm2, rndm3, rndm4, rndm5, rndm6, rndm7, rndm8, rndm9] = Array(
      9,
    )
      .fill()
      .map(() => Math.floor(10 * Math.random())),
    [ran1, ran2, ran3, ran4, ran5, ran6, ran7, ran8, ran9] = [
      rndm1,
      rndm2,
      rndm3,
      rndm4,
      rndm5,
      rndm6,
      rndm7,
      rndm8,
      rndm9,
    ].map((v) => 10 * v),
    [hmsil1, hmsil2, hmsil3, hmsil4, hmsil5, hmsil6, hmsil7, hmsil8, hmsil9] = [
      ran1,
      ran2,
      ran3,
      ran4,
      ran5,
      ran6,
      ran7,
      ran8,
      ran9,
    ],
    jln = `⬛⬛⬛⬛⬛⬛⬛⬛🚶⬛\n⬛⬜⬜⬜⬛⬜⬜⬜⬛⬛\n⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛\n🏘️🏘️🏘️🏘️🌳🌳🏘️ 🌳🌳🌳\n✔️ ${pengocok} Mencari Target....`,
    jln2 = `⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛\n⬛⬜⬜⬜⬛⬜⬜⬜⬛🚶\n⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛\n🏘️🏘️🏘️🏘️🌳🌳🏘️ 🌳🌳🌳\n➕ ${pengocok} Menemukan Target....`,
    jln3 = `⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛\n⬛⬜⬜⬛⬛⬜⬜⬜⬛⬛\n⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛\n🏘️🏘️🏘️🏘️🌳🌳🏘️ 🌳🌳🚶\n➕ ${pengocok} Mulai Mengocok Bersama Target....`,
    jln4 = `⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛\n⬛⬜⬜⬛⬛⬜⬜⬜⬛⬛\n⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛\n🏘️🏘️🏘️🏘️🌳🌳🏘️ 🚶\n➕ ${pengocok}\n💹 Menerima Gaji Ngocok....`,
    hsl = `\n*《 Hasil Ngocok ${pengocok} 》*\n *💎 = [ ${hmsil1} ] Diamond*\n *⛓️ = [ ${hmsil2} ] Iron*\n *🪙 = [ ${hmsil3} ] Gold*\n *💚 = [ ${hmsil4} ] Emerald*\n *🪨 = [ ${hmsil5} ] Rock*\n *🌕 = [ ${hmsil6} ] Clay*\n *🕳️ = [ ${hmsil7} ] Coal*\n *🌑 = [ ${hmsil8} ] Sand*\n *✉️ = [ ${hmsil9} ] Exp*\n \n Stamina anda berkurang -20\n *Korban Ngocok:* @${a.split("@")[0]}\n`;
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
      `🔍 ${pengocok} Mencari Area ngocok.....`,
      hsl,
      [jln, jln2, jln3, jln4],
      2e3,
      m,
    ),
    (user.lastngocok = Date.now());
};
(handler.help = ["ngocok"]),
  (handler.tags = ["rpg"]),
  (handler.command = /^(ngocok|mengocok)$/i),
  (handler.group = !0);
export default handler;
