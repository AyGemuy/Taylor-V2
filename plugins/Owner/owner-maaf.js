const handler = async m => {
  let user = db.data.users[m.sender];
  if (0 === user.warn) throw "Kamu tidak memiliki dosa !";
  let waktu = user.lastIstigfar + 262800288;
  if (new Date() - user.lastIstigfar < 262800288) throw `[ 💬 ]Kamu harus menunggu selama, ${msToTime(waktu - new Date())}`;
  user.warn -= 1, m.reply(`🔥 *Dosa* : ${user.warn} / 100`), user.lastIstigfar = 1 * new Date();
};
handler.command = /^(astagh?fir(ullah)?|maaf)$/i, handler.limit = !1, handler.exp = 100;
export default handler;

function msToTime(duration) {
  parseInt(duration % 1e3 / 100);
  var seconds = Math.floor(duration / 1e3 % 60),
    minutes = Math.floor(duration / 6e4 % 60),
    hours = Math.floor(duration / 36e5 % 24);
  return hours = hours < 10 ? "0" + hours : hours, (minutes = minutes < 10 ? "0" + minutes : minutes) + " menit " + (seconds = seconds < 10 ? "0" + seconds : seconds) + " detik";
}