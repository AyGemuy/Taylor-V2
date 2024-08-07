const timeout = 6048e5,
  handler = async (m, {
    conn
  }) => {
    const user = db.data.users[m.sender],
      timeSinceLastMulung = new Date() - user.lastmulung;
    if (timeSinceLastMulung < timeout) throw `📮Anda sudah merampok bank\nTunggu selama ⏲️ ${msToTime(timeout - timeSinceLastMulung)} lagi`;
    const botolnye = Math.floor(3e4 * Math.random()),
      kalengnye = Math.floor(999 * Math.random()),
      kardusnye = Math.floor(1e3 * Math.random());
    user.money += botolnye, user.exp += kalengnye, user.kardus += kardusnye, user.lastmulung = 1 * new Date(),
      m.reply(`Selamat kamu mendapatkan : \n💰+${botolnye} Money\n📦+${kardusnye} Kardus\n✨+${kalengnye} Exp`),
      setTimeout(async () => {
        await conn.reply(m.chat, "Yuk waktunya Maling lagi 👋…", m);
      }, timeout);
  };
handler.help = ["maling"], handler.tags = ["rpg"], handler.command = /^(maling)/i,
  handler.limit = !0;
export default handler;

function msToTime(duration) {
  let seconds = Math.floor(duration / 1e3 % 60),
    minutes = Math.floor(duration / 6e4 % 60),
    hours = Math.floor(duration / 36e5 % 24);
  return hours = hours < 10 ? "0" + hours : hours, minutes = minutes < 10 ? "0" + minutes : minutes,
    seconds = seconds < 10 ? "0" + seconds : seconds, hours + " jam " + minutes + " menit " + seconds + " detik";
}