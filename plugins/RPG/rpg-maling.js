import { clockString } from "../../lib/other-function.js";
const timeout = 6048e5,
  handler = async (m, { conn }) => {
    const user = db.data.users[m.sender],
      timeSinceLastMulung = new Date() - user.lastmulung;
    if (timeSinceLastMulung < timeout)
      throw `📮Anda sudah merampok bank\nTunggu selama ⏲️ ${clockString(timeout - timeSinceLastMulung)} lagi`;
    const botolnye = Math.floor(3e4 * Math.random()),
      kalengnye = Math.floor(999 * Math.random()),
      kardusnye = Math.floor(1e3 * Math.random());
    (user.money += botolnye),
      (user.exp += kalengnye),
      (user.kardus += kardusnye),
      (user.lastmulung = 1 * new Date()),
      m.reply(
        `Selamat kamu mendapatkan : \n💰+${botolnye} Money\n📦+${kardusnye} Kardus\n✨+${kalengnye} Exp`,
      ),
      setTimeout(async () => {
        await conn.reply(m.chat, "Yuk waktunya Maling lagi 👋…", m);
      }, timeout);
  };
(handler.help = ["maling"]),
  (handler.tags = ["rpg"]),
  (handler.command = /^(maling)/i),
  (handler.limit = !0);
export default handler;
