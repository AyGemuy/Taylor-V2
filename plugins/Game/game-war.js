const handler = async (m, {
  conn,
  usedPrefix,
  args,
  command
}) => {
  if (conn.war = conn.war ? conn.war : {}, conn.war2 = conn.war2 ? conn.war2 : {}, !args[0] || "help" === args[0]) return m.reply(`*❏  W A R - Z O N E*\n\n[1] War Zone adalah game perang dengan sistem _turn attack_ atau menyerang secara bergiliran\n[2] Permainan dapat dimulai dengan 1v1 sampai dengan 5v5\n[3] Modal perang adalah harta rampasan perang jika tim kamu menang\n[4] Setiap pemain akan mendapatkan 5000 HP (Health Point)\n[5] Keberhasilan menyerang tergantung level kamu dengan level musuh yang akan diserang\n[6] Kesempatan menyerang adalah 40 detik, lebih dari itu dianggap AFK (pengurangan 2500 HP)\n[7] Sebuah tim akan menang jika tim lawan kalah semua (HP <= 0) dan mendapatkan harta rampasan perang\n\n*❏  C O M M A N D S*\n*${usedPrefix + command} join A/B* = join game\n*${usedPrefix + command} left* = left game\n*${usedPrefix + command} money 10xx* = uang taruhan\n*${usedPrefix + command} player* = player game\n*${usedPrefix + command} start* = start game`);
  if ("money" === args[0]) return m.chat in conn.war ? m.sender === conn.war[m.chat][0]?.user ? "undefined" == args[1] || isNaN(args[1]) ? m.reply("*Masukkan modal taruhan perang berupa angka (Tidak boleh menggunakan titik)*\n\n.war money 100000") : (args[1] = parseInt(args[1]), args[1] < 1e3 ? m.reply("*Minimal Rp. 1.000*") : (conn.war2[m.chat].money = args[1], m.reply("*Berhasil menetapkan modal perang sebesar Rp. " + Number(args[1]).toLocaleString() + "*"))) : await conn.reply(m.chat, `*Hanya @${conn.war[m.chat][0]?.user.split("@")[0]} sebagai pembuat room yang bisa mengganti modal awal perang*`, m, {
    contextInfo: {
      mentionedJid: [conn.war[m.chat][0]?.user]
    }
  }) : m.reply("*Silahkan buat room terlebih dahulu (Ketik .war join)*");
  if ("join" === args[0]) {
    if (db.data.users[m.sender].money < 1e3) return m.reply("*Uang kamu minimal Rp. 1000 untuk bermain game ini.*");
    if (!(m.chat in conn.war)) {
      conn.war2[m.chat] = {
        war: !1,
        turn: 0,
        time: 0,
        money: 0
      }, conn.war[m.chat] = [];
      db.data.users[m.sender].exp;
      conn.war[m.chat][0] = {
        user: m.sender,
        hp: 5e3,
        lvl: db.data.users[m.sender].level,
        turn: !1
      };
      for (let i = 1; i < 10; i++) conn.war[m.chat][i] = {
        user: "",
        hp: 0,
        lvl: 0,
        turn: !1
      };
      return m.reply("*Berhasil masuk ke dalam game sebagai Team A*\n\n*.war join a/b* = join game\n*.war start* = mulai game");
    }
    if (conn.war2[m.chat].war) return m.reply("*Permainan sudah dimulai, tidak bisa join.*");
    for (let i = 0; i < conn.war[m.chat].length; i++)
      if (m.sender === conn.war[m.chat][i].user) {
        let total = 0;
        for (let i = 0; i < 10; i++) "" === conn.war[m.chat][i].user && (total += 1);
        return m.reply("*Anda sudah masuk ke dalam game*\n\n*.war join a/b* = join game\n*.war start* = mulai game");
      }
    if (!args[1]) return m.reply("*Pilih salah satu tim A atau B*\n\n.war join A\n.war join B");
    if ("a" === args[1].toLowerCase()) return 0 === conn.war2[m.chat].money ? await conn.reply(m.chat, `*Tolong @${conn.war[m.chat][0]?.user.split("@")[0]} tetapkan modal awal perang (minimal Rp. 1.000.000)*\n\n.war money 1000000`, m, {
      contextInfo: {
        mentionedJid: [conn.war[m.chat][0]?.user]
      }
    }) : m.reply("a");
    if ("b" !== args[1].toLowerCase()) return m.reply("*Pilih salah satu tim A atau B*\n\n.war join A\n.war join B");
    if (0 === conn.war2[m.chat].money) return await conn.reply(m.chat, `*Tolong @${conn.war[m.chat][0]?.user.split("@")[0]} tetapkan modal awal perang (minimal Rp. 1000000)*\n\n.war money 1000000`, m, {
      contextInfo: {
        mentionedJid: [conn.war[m.chat][0]?.user]
      }
    });
    if (db.data.users[m.sender].money < conn.war2[m.chat].money) return m.reply(`*Uang kamu minimal Rp. ${conn.war2[m.chat].money.toLocaleString()} untuk bermain game ini.*`);
    for (let i = 5; i < 10; i++)
      if ("" === conn.war[m.chat][i].user) {
        db.data.users[m.sender].exp;
        conn.war[m.chat][i] = {
          user: m.sender,
          hp: 5e3,
          lvl: db.data.users[m.sender].level,
          turn: !1
        };
        let total = 0;
        for (let i = 0; i < 10; i++) "" === conn.war[m.chat][i].user && (total += 1);
        return m.reply("*Berhasil masuk ke dalam game sebagai Team B*\n\n*.war join a/b* = join game\n*.war start* = mulai game");
      }
    for (let i = 0; i < conn.war[m.chat].length; i++) {
      let total = 0;
      "" != conn.war[m.chat][i].user && (total += 1), 10 === total && (conn.war2[m.chat].war = !0);
    }
  }
  if ("left" === args[0]) {
    if (!conn.war2[m.chat].war) {
      for (let i = 0; i < 10; i++)
        if (m.sender === conn.war[m.chat][i].user) return m.reply("*Berhasil keluar dari game*");
      return m.reply("*Kamu tidak sedang berada di dalam game*");
    }
    m.reply("*Perang sudah dimulai, anda tidak bisa keluar*");
  }
  if ("player" === args[0]) {
    if (!(m.chat in conn.war)) return m.reply("*Tidak ada pemain yang join room War Zone*");
    var teamA = [],
      teamB = [],
      teamAB = [];
    for (let i = 0; i < conn.war[m.chat].length; i++) i < 5 ? "" != conn.war[m.chat][i].user && teamA.push(conn.war[m.chat][i].user) : "" != conn.war[m.chat][i].user && teamB.push(conn.war[m.chat][i].user),
      teamAB.push(conn.war[m.chat][i].user);
    await conn.reply(m.chat, (conn.war2[m.chat].war ? "*Giliran : @" + conn.war[m.chat][conn.war2[m.chat].turn].user.split("@")[0] + "*\n*Taruhan : Rp. " + Number(conn.war2[m.chat].money).toLocaleString() + "*\n\n" : "*Taruhan : Rp. " + Number(conn.war2[m.chat].money).toLocaleString() + "*\n\n") + "*TEAM A :*\n" + teamA.map((v, i) => `${conn.war[m.chat][i].hp > 0 ? "❤️ " : "☠️ "}@${v.split("@")[0]} (Lv.${conn.war[m.chat][i].lvl} HP: ${conn.war[m.chat][i].hp})`).join`\n` + "\n\n*TEAM B :*\n" + teamB.map((v, i) => `${conn.war[m.chat][i + 5].hp > 0 ? "❤️ " : "☠️ "}@${v.split("@")[0]} (Lv.${conn.war[m.chat][i + 5].lvl} HP: ${conn.war[m.chat][i + 5].hp})`).join`\n`, m, {
      contextInfo: {
        mentionedJid: teamAB
      }
    });
  }
  if ("start" !== args[0]) throw "Join Dulu";
  if (conn.war2[m.chat].war) return m.reply("*Perang sudah dimulai, tidak bisa join.*");
  teamA = 0, teamB = 0;
  for (let i = 0; i < 10; i++) i < 5 ? "" != conn.war[m.chat][i].user && (teamA += 1) : "" != conn.war[m.chat][i].user && (teamB += 1);
  if (teamA === teamB && teamA > 0) {
    conn.war2[m.chat].war = !0;
    for (let i = 0; i < 5; i++)
      if ("" != conn.war[m.chat][i].user) {
        let user = conn.war[m.chat][i].user;
        return await conn.reply(m.chat, `*Permainan berhasil dimulai*\n*Silahkan @${user.split("@")[0]} untuk menyerang musuh*\n\n.war player = statistik pemain\n.attack @tag = serang lawan`, m, {
          contextInfo: {
            mentionedJid: [user]
          }
        });
      }
  } else teamA > teamB ? m.reply(`*Team B kurang ${teamA - teamB} orang lagi agar permainan adil.*`) : m.reply(`*Team A kurang ${teamB - teamA} orang lagi agar permainan adil.*`);
};
handler.help = ["war"], handler.tags = ["game"], handler.command = /^(war)$/i,
  handler.group = !0;
export default handler;