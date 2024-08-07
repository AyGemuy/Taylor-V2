const timeout = 18e5,
  handler = async (m, {
    conn,
    usedPrefix,
    text
  }) => {
    let apelu = db.data.users[m.sender].bibitapel,
      angguru = db.data.users[m.sender].bibitanggur,
      manggau = db.data.users[m.sender].bibitmangga,
      pisangu = db.data.users[m.sender].bibitpisang,
      jeruku = db.data.users[m.sender].bibitjeruk,
      time = db.data.users[m.sender].lastberkebon + 18e5;
    if (0 === apelu || 0 === angguru || 0 === manggau || 0 === pisangu || 0 === jeruku) return m.reply(`*Pastikan kamu memiliki semua bibit*\n*Seperti Bibit Apel, Bibit Mangga, Bibit Jeruk, Bibit Pisang, Bibit Anggur*\n\nKetik :\n${usedPrefix}shop buy bibitmangga 500\n\n*List*\nbibitmangga\nbibitanggur\nbibitpisang\nbibitjeruk\nbibitapel`);
    if (new Date() - db.data.users[m.sender].lastberkebon < 18e5) throw `Anda sudah menanam\nMohon tunggu hasil panenmu\nTunggu selama ${msToTime(time - new Date())} lagi`;
    if (db.data.users[m.sender].bibitmangga > 499)
      if (db.data.users[m.sender].bibitapel > 499)
        if (db.data.users[m.sender].bibitpisang > 499)
          if (db.data.users[m.sender].bibitjeruk > 499)
            if (db.data.users[m.sender].bibitanggur > 499) {
              let pisangpoin = `${Math.floor(500 * Math.random())}`.trim(),
                anggurpoin = `${Math.floor(500 * Math.random())}`.trim(),
                manggapoin = `${Math.floor(500 * Math.random())}`.trim(),
                jerukpoin = `${Math.floor(500 * Math.random())}`.trim(),
                apelpoin = `${Math.floor(500 * Math.random())}`.trim();
              db.data.users[m.sender].pisang += 1 * pisangpoin, db.data.users[m.sender].anggur += 1 * anggurpoin,
                db.data.users[m.sender].mangga += 1 * manggapoin, db.data.users[m.sender].jeruk += 1 * jerukpoin,
                db.data.users[m.sender].apel += 1 * apelpoin, db.data.users[m.sender].tiketcoin += 1,
                db.data.users[m.sender].bibitpisang -= 500, db.data.users[m.sender].bibitanggur -= 500,
                db.data.users[m.sender].bibitmangga -= 500, db.data.users[m.sender].bibitjeruk -= 500,
                db.data.users[m.sender].bibitapel -= 500, db.data.users[m.sender].lastberkebon = 1 * new Date();
              let hsl = `Selamat ${conn.getName(m.sender)}, Kamu mendapatkan : \n+${pisangpoin} Pisang\n+${manggapoin} Mangga\n+${anggurpoin} Anggur\n+${jerukpoin} Jeruk\n+${apelpoin} Apel\n+1 Tiketcoin`;
              await conn.reply(m.chat, hsl, null), setTimeout(async () => {
                await conn.reply(m.chat, "Waktunya berkebon lagi kak 😅", m);
              }, 18e5);
            } else m.reply("Pastikan bibit anggur kamu *500* untuk bisa berkebon");
    else m.reply("Pastikan bibit jeruk kamu *500* untuk bisa berkebon");
    else m.reply("Pastikan bibit pisang kamu *500* untuk bisa berkebon");
    else m.reply("Pastikan bibit apel kamu *500* untuk bisa berkebon");
    else m.reply("Pastikan bibit mangga kamu *500* untuk bisa berkebon");
  };
handler.help = ["berkebon"], handler.tags = ["rpg"], handler.command = /^(berkebon)/i,
  handler.group = !0, handler.limit = !0;
export default handler;

function msToTime(duration) {
  parseInt(duration % 1e3 / 100);
  var seconds = Math.floor(duration / 1e3 % 60),
    minutes = Math.floor(duration / 6e4 % 60),
    hours = Math.floor(duration / 36e5 % 24);
  return (hours = hours < 10 ? "0" + hours : hours) + " jam " + (minutes = minutes < 10 ? "0" + minutes : minutes) + " menit " + (seconds = seconds < 10 ? "0" + seconds : seconds) + " detik";
}