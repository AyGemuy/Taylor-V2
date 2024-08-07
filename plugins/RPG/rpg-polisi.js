const STATES = {
  IDLE: 0,
  SEARCHING: 1,
  FIGHTING: 2
};

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
const handler = async (m, {
  conn,
  usedPrefix,
  command,
  args
}) => {
  const sender = m.sender,
    user = db.data.users[sender];
  conn.players = conn.players || {};
  const player = conn.players[sender] || {
    Uang: 0,
    Pencuri_Tertangkap: 0,
    Waktu_Tertangkap: 0,
    Kaca_Pembesar: 0,
    Level: 1,
    State: STATES.IDLE
  };
  if ("polisi" === command) {
    if (0 === args.length) return void await conn.reply(m.chat, "*👮‍♂️ Cara Bermain Game Polisi dan Pencuri 👮‍♂️*\n\n🔍 Gunakan perintah *polisi cari* untuk mencari pencuri secara acak.\n🚓 Anda akan menemukan jejak pencuri dan harus melakukan tindakan tertentu untuk menangkapnya.\n💰 Anda akan mendapatkan imbalan jika berhasil menangkap pencuri.\n🚨 Pilih tindakan dari: kejar, tembak, lempar, atau tangkap.\n🔍 Gunakan perintah *polisi <tindakan>* untuk melawan dan menangkap pencuri.\n🔎 Anda dapat membeli kaca pembesar *polisi item kaca-pembesar* untuk meningkatkan peluang menangkap pencuri.\n🏆 Cek peringkat Anda dengan perintah *polisi leaderboard*.\nℹ️ Gunakan perintah *polisi status* untuk melihat status Anda saat ini.", m);
    const subCommand = args[0];
    if ("cari" === subCommand) {
      if (player.State !== STATES.IDLE) return await conn.reply(m.chat, "*🔍 Sedang dalam pencarian...*", m);
      if (Date.now() - player.Waktu_Tertangkap < 3e4) return await conn.reply(m.chat, "*⏱️ Anda harus menunggu sebentar sebelum dapat mencari kembali.*", m);
      player.State = STATES.SEARCHING, player.Waktu_Tertangkap = Date.now();
      const level = player.Level,
        thiefAction = {
          1: "kejar",
          2: "tembak",
          3: "lempar",
          4: "tangkap"
        } [level];
      await conn.reply(m.chat, `*🔍 Anda menemukan jejak pencuri level ${level}!* Untuk menangkap pencuri, lakukan tindakan: *${thiefAction.toUpperCase()}*.`, m),
        player.ThiefAction = thiefAction;
    } else if ("status" === subCommand) await conn.reply(m.chat, `*👮‍♂️ Status Polisi 👮‍♂️*\n\n🔍 Sedang Mencari Pencuri: ${player.State === STATES.SEARCHING ? "Ya" : "Tidak"}\n🚓 Pencuri Tertangkap: ${player.Pencuri_Tertangkap}\n💰 Uang: Rp${player.Uang.toLocaleString()}\n🏆 Level Pencuri: ${player.Level}`, m);
    else if ("item" === subCommand)
      if (1 === args.length) await conn.reply(m.chat, `*🛒 Item Shop 🛒*\n\nKaca Pembesar - 200 coins\nGunakan *${usedPrefix}polisi item kaca-pembesar* untuk membeli kaca pembesar.`, m);
      else {
        if ("kaca-pembesar" === args[1].toLowerCase()) {
          if (player.Kaca_Pembesar) return await conn.reply(m.chat, "*🛒 Anda sudah memiliki kaca pembesar.*", m);
          if (player.Uang < 200) return await conn.reply(m.chat, "*🛒 Uang Anda tidak cukup untuk membeli kaca pembesar.*", m);
          player.Kaca_Pembesar = 1, player.Uang -= 200, await conn.reply(m.chat, "*🛒 Anda berhasil membeli kaca pembesar.* Gunakan 'polisi cari' untuk meningkatkan peluang menangkap pencuri.", m);
        } else await conn.reply(m.chat, "*🛒 Item yang dimaksud tidak ditemukan.*", m);
      }
    else if ("leaderboard" === subCommand) {
      const leaderboard = Object.entries(conn.players).map(([playerId, playerData]) => ({
        id: playerId,
        Pencuri_Tertangkap: playerData.Pencuri_Tertangkap
      })).sort((a, b) => b.Pencuri_Tertangkap - a.Pencuri_Tertangkap).slice(0, 5);
      let leaderboardMsg = "*🏆 Leaderboard 🏆*\n\n";
      for (let i = 0; i < leaderboard.length; i++) leaderboardMsg += `${i + 1}. @${leaderboard[i].id.split("@")[0]} - ${leaderboard[i].Pencuri_Tertangkap} Pencuri Tertangkap\n`;
      await conn.reply(m.chat, leaderboardMsg, m);
    } else if ("stop" === subCommand) {
      user.money += player.Uang * player.Pencuri_Tertangkap;
      let skorMsg = `*🏆 Skor Akhir Anda 🏆*\n\n🚓 Pencuri Tertangkap: ${player.Pencuri_Tertangkap}\n💰 Total Uang: Rp${player.Uang.toLocaleString()}\n🏆 Level Pencuri: ${player.Level}`;
      await conn.reply(m.chat, `*👮‍♂️ Sesi permainan Polisi dan Pencuri telah dihentikan.*\n\n${skorMsg}`, m),
        player.State = STATES.IDLE, player.ThiefAction = void 0;
    } else {
      if (player.State !== STATES.SEARCHING) return await conn.reply(m.chat, "*🔍 Anda harus mencari pencuri terlebih dahulu dengan perintah 'polisi cari'.*", m);
      const polisiAction = subCommand.toLowerCase(),
        level = player.Level,
        thiefActions = {
          1: ["kejar", "tembak", "lempar"],
          2: ["tembak", "tangkap"],
          3: ["tangkap"]
        };
      if (!thiefActions[level].includes(polisiAction)) return await conn.reply(m.chat, `*🚓 Pilihan tindakan Anda (${polisiAction.toUpperCase()}) tidak sesuai dengan hasil yang dicari.*`, m);
      if (thiefActions[level].includes(player.ThiefAction)) {
        let reward = 0;
        switch (polisiAction) {
          case "kejar":
            reward = 1e3 * level;
            break;
          case "tembak":
            reward = 2e3 * level;
            break;
          case "lempar":
            reward = 3e3 * level;
            break;
          case "tangkap":
            reward = 5e3 * level;
        }
        player.Pencuri_Tertangkap++, player.Uang += reward, user.money += reward, player.Uang < 5e3 && (player.Uang = 5e3),
          await conn.reply(m.chat, `*🚓 Anda berhasil melawan dan menangkap pencuri level ${level}!* Anda mendapatkan imbalan Rp${reward.toLocaleString()}. Total Uang Anda: Rp${player.Uang.toLocaleString()}.`, m);
      } else await conn.reply(m.chat, "*🚓 Tindakan Anda tidak tepat dan pencuri berhasil lepas!*", m);
      player.State = STATES.IDLE, player.ThiefAction = void 0;
    }
    conn.players[sender] = player;
  } else "info" === command && await conn.reply(m.chat, "*ℹ️ Gunakan perintah 'polisi' untuk memulai game Polisi dan Pencuri.*", m);
};
handler.help = ["polisi", "polisi cari", "polisi status", "polisi item <item>", "polisi leaderboard", "polisi stop"],
  handler.tags = ["game"], handler.command = ["polisi"];
export default handler;