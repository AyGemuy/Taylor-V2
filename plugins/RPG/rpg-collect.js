import { clockString } from "../../lib/other-function.js";
const handler = async (m, { conn }) => {
  let user = db.data.users[m.sender],
    lastClaim = user.lastclaim || 0,
    timers = clockString(432e5 - (new Date() - lastClaim));
  new Date() - lastClaim > 432e5
    ? (await conn.reply(
        m.chat,
        "You have claimed and received *1000* 💵money and *1* 🥤potion",
        m,
      ),
      (user.money += 1e3),
      (user.potion += 1),
      (user.lastclaim = new Date()))
    : await conn.reply(m.chat, `Please wait ${timers} again to claim again`, m);
};
(handler.help = ["collect"]),
  (handler.tags = ["rpg"]),
  (handler.command = /^(collect)$/i),
  (handler.fail = null);
export default handler;
