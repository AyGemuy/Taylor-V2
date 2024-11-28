import { clockString } from "../../lib/other-function.js";
const handler = async (m, { conn, usedPrefix }) => {
  const user = db.data.users[m.sender],
    timers = clockString(108e5 - (Date.now() - user.lastnambang)),
    penambang = conn.getName(m.sender);
  if (user.stamina < 20)
    return m.reply(
      `Stamina tidak cukup\nIsi stamina dengan *${usedPrefix}eat8*`,
    );
  if (user.lastnambang > 108e5)
    throw m.reply(`Masih kelelahan\nTunggu ${timers} lagi`);
  const rndm = (min, max) => Math.floor(Math.random() * (max - min + 1) + min),
    rndm1 = rndm(1, 5),
    rndm2 = rndm(5, 15),
    rndm3 = rndm(10, 30),
    rndm4 = rndm(20, 50),
    rndm5 = rndm(5, 25),
    rndm6 = rndm(10, 40),
    rndm7 = rndm(5, 15),
    rndm8 = rndm(2, 10),
    rndm9 = rndm(50, 100),
    hsl = `\n*《 Hasil Nambang ${penambang} 》*\n\n💎 = [ ${rndm1} ] Diamond\n⛓️ = [ ${rndm2} ] Iron\n🪙 = [ ${rndm3} ] Gold\n💚 = [ ${rndm4} ] Emerald\n🪨 = [ ${rndm5} ] Rock\n🌕 = [ ${rndm6} ] Clay\n🕳️ = [ ${rndm7} ] Coal\n🌑 = [ ${rndm8} ] Sand\n✉️ = [ ${rndm9} ] Exp\n\nStamina berkurang -20\n`;
  (user.diamond += rndm1),
    (user.iron += rndm2),
    (user.gold += rndm3),
    (user.emerald += rndm4),
    (user.rock += rndm5),
    (user.clay += rndm6),
    (user.coal += rndm7),
    (user.sand += rndm8),
    (user.exp += rndm9),
    (user.stamina -= 20),
    await conn.loadingMsg(
      m.chat,
      `🔍 ${penambang} Mencari Area Nambang.....`,
      hsl,
      [
        "⬛⬛⬛⬛⬛⬛⬛⬛🚶⬛\n⬛⬜⬜⬜⬛⬜⬜⬜⬛⬛\n⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛\n🏘️🏘️🏘️🏘️🌳🌳🏘️ 🌳🌳🌳",
        "⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛\n⬛⬜⬜⬜⬛⬜⬜⬜⬛🚶\n⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛\n🏘️🏘️🏘️🏘️🌳🌳🏘️ 🌳🌳🌳",
        "⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛\n⬛⬜⬜⬛⬛⬜⬜⬜⬛⬛\n⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛\n🏘️🏘️🏘️🏘️🌳🌳🏘️ 🌳🌳🚶",
        "⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛\n⬛⬜⬜⬛⬛⬜⬜⬜⬛⬛\n⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛\n🏘️🏘️🏘️🏘️🌳🌳🏘️ 🚶",
        `➕ ${penambang}\n💹 Menerima gaji....`,
      ],
      2e3,
      m,
    ),
    (user.lastnambang = Date.now());
};
(handler.help = ["nambang"]),
  (handler.tags = ["rpg"]),
  (handler.command = /^(nambang|menambang)$/i),
  (handler.group = !0);
export default handler;
