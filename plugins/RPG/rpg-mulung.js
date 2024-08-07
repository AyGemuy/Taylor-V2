const timeout = 18e5,
  handler = async (m, {
    conn
  }) => {
    const user = db.data.users[m.sender],
      timeSinceLastMulung = new Date() - user.lastmulung;
    if (timeSinceLastMulung < 18e5) throw `Anda sudah lelah untuk mulung\nTunggu selama ${msToTime(18e5 - timeSinceLastMulung)} lagi`;
    const botolnye = Math.floor(1e3 * Math.random()),
      kalengnye = Math.floor(1e3 * Math.random()),
      kardusnye = Math.floor(1e3 * Math.random());
    user.botol += botolnye, user.kaleng += kalengnye, user.kardus += kardusnye, user.lastmulung = 1 * new Date(),
      m.reply(`Selamat kamu mendapatkan : \n+${botolnye} Botol\n+${kardusnye} Kardus\n+${kalengnye} Kaleng`),
      setTimeout(async () => {
        await conn.reply(m.chat, "Yuk waktunya mulung lagi 😅", m);
      }, 18e5);
  };
handler.help = ["mulung"], handler.tags = ["rpg"], handler.command = /^(mulung)/i,
  handler.group = !0, handler.limit = !0;
export default handler;

function msToTime(duration) {
  let hours = Math.floor(duration / 36e5 % 24),
    minutes = Math.floor(duration / 6e4 % 60),
    seconds = Math.floor(duration / 1e3 % 60);
  return hours = hours < 10 ? "0" + hours : hours, minutes = minutes < 10 ? "0" + minutes : minutes,
    seconds = seconds < 10 ? "0" + seconds : seconds, hours + " jam " + minutes + " menit " + seconds + " detik";
}