import { clockString } from "../../lib/other-function.js";
const handler = async (m) => {
  let user = db.data.users[m.sender];
  if (0 === user.warn) throw "Kamu tidak memiliki dosa !";
  let waktu = user.lastIstigfar + 262800288;
  if (new Date() - user.lastIstigfar < 262800288)
    throw `[ 💬 ]Kamu harus menunggu selama, ${clockString(waktu - new Date())}`;
  (user.warn -= 1),
    m.reply(`🔥 *Dosa* : ${user.warn} / 100`),
    (user.lastIstigfar = 1 * new Date());
};
(handler.command = /^(astagh?fir(ullah)?|maaf)$/i),
  (handler.limit = !1),
  (handler.exp = 100);
export default handler;
