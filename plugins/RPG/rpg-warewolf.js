const roles = ["warewolf", "manusia"],
  handler = async (m, {
    conn,
    command,
    usedPrefix,
    text
  }) => {
    conn.warewolf = conn.warewolf || {};
    const input = text.trim().split(" "),
      inputcmd = input[0]?.toLowerCase(),
      targetNumber = input[1] || "",
      groupId = m.chat;
    conn.warewolf[groupId] = conn.warewolf[groupId] || {
      players: [],
      started: !1
    };
    const {
      players,
      started
    } = conn.warewolf[groupId];
    if ("start" === inputcmd) {
      if (started) return m.reply("😅 Permainan sudah dimulai.");
      if (players.length < 2) return m.reply("😅 Jumlah pemain belum mencukupi. Minimal 2 pemain diperlukan untuk memulai permainan.");
      if (players.length > 3) return m.reply("😅 Jumlah pemain melebihi batas maksimal (8 pemain).");
      conn.warewolf[groupId].started = !0, m.reply("Permainan sudah dimulai. Selamat bermain!");
    } else if ("join" === inputcmd) {
      if (started) return m.reply("😅 Permainan sudah dimulai, tidak bisa bergabung lagi.");
      if (players.length >= 3) return m.reply(`😅 Jumlah pemain sudah mencapai batas maksimal (3 pemain). Permainan bisa dimulai dengan mengetik *${usedPrefix}warewolf start*`);
      const playerName = m.name;
      if (players.some(player => player.name === playerName)) return m.reply("😅 Kamu sudah bergabung dalam permainan.");
      const money = db.data.users[m.sender].money || 0;
      if (players.push({
          name: playerName,
          money: money,
          sender: m.sender
        }), 3 === players.length) {
        getRandomPlayer(players).role = "warewolf";
      }
      m.reply(`✅ Pemain Manusia ${playerName} telah bergabung dalam permainan.`);
    } else if ("cek" === inputcmd) {
      if (!started) return m.reply("😅 Permainan belum dimulai.");
      if (0 === players.length) return m.reply("😅 Belum ada pemain yang bergabung dalam permainan.");
      findWarewolf(players);
      m.reply(`🐺 Siapakah Warewolf dalam permainan ini?\n\nPilih salah satu angka:\n${players.map((player, index) => `${index + 1}. ${player.name}`).join("\n")}`);
    } else if ("tebak" === inputcmd) {
      if (!started) return m.reply("😅 Permainan belum dimulai.");
      if (players.length < 2) return m.reply("😅 Jumlah pemain belum mencukupi. Minimal 2 pemain diperlukan untuk memulai permainan.");
      const playerIndex = +targetNumber - 1;
      if (playerIndex < 0 || playerIndex >= players.length) return m.reply("😅 Pilih player yang ada saja.");
      const warewolf = findWarewolf(players);
      playerIndex === players.findIndex(player => "warewolf" === player.role) ? (m.reply(`🎉 Selamat! ${warewolf.name} adalah Warewolf! Permainan berakhir.`), delete conn.warewolf[groupId]) : m.reply("😔 Tebakanmu salah! Coba lagi.");
    } else m.reply(`❌ Perintah tidak dikenali. Gunakan salah satu perintah berikut:\n${usedPrefix}warewolf join\n${usedPrefix}warewolf start\n${usedPrefix}warewolf cek\n${usedPrefix}warewolf tebak`);
  };
handler.help = ["warewolf"], handler.tags = ["rpg"], handler.command = ["warewolf"];
export default handler;

function shuffleRoles(players) {
  const shuffledPlayers = players.map((player, index) => ({
    name: player,
    role: roles[1],
    money: 0,
    sender: ""
  }));
  return shuffledPlayers[Math.floor(Math.random() * players.length)].role = roles[0],
    shuffledPlayers;
}

function findWarewolf(players) {
  return players.find(player => "warewolf" === player.role);
}

function getRandomPlayer(players) {
  return players[Math.floor(Math.random() * players.length)];
}