const handler = async (m, {
  conn,
  usedPrefix,
  args,
  command
}) => {
  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  async function cekAFK(x) {
    let turn = x,
      time = conn.war2[m.chat].time;
    await sleep(9e4);
    let turnNow = conn.war2[m.chat].turn,
      timeNow = conn.war2[m.chat].time;
    if (turn === turnNow && time === timeNow) {
      if (conn.war[m.chat][turn].hp -= 2500, await conn.reply(m.chat, `*@${conn.war[m.chat][turn].user.split("@")[0]} sedang AFK (Denda -2500 HP)*\n\n.war player = statistik pemain\n.attack @tag = serang lawan`, null, {
          contextInfo: {
            mentionedJid: [conn.war[m.chat][turn].user]
          }
        }), await sleep(3e3), conn.war[m.chat][turn].hp <= 0) {
        await conn.reply(m.chat, `*@${conn.war[m.chat][turn].user.split("@")[0]} sudah mati karena HP (Health Point) habis.*`, null, {
          contextInfo: {
            mentionedJid: [conn.war[m.chat][turn].user]
          }
        });
        let playerTotal = 0,
          playerKalah = 0;
        if (turn < 5) {
          for (let i = 0; i < 5; i++) "" != conn.war[m.chat][i].user && (playerTotal += 1, conn.war[m.chat][i].hp <= 0 && (playerKalah += 1));
          if (playerTotal > 0 && playerTotal === playerKalah) {
            var teamA = [],
              teamB = [],
              teamAB = [];
            for (let j = 0; j < 5; j++) "" != conn.war[m.chat][j].user && (db.data.users[conn.war[m.chat][j].user].money -= Number(conn.war2[m.chat].money), teamA.push(conn.war[m.chat][j].user), teamAB.push(conn.war[m.chat][j].user));
            for (let j = 5; j < 10; j++) "" != conn.war[m.chat][j].user && (db.data.users[conn.war[m.chat][j].user].money += Number(conn.war2[m.chat].money), teamB.push(conn.war[m.chat][j].user), teamAB.push(conn.war[m.chat][j].user));
            await conn.reply(m.chat, "*TEAM B MENANG KARENA TEAM A GOBLOK SEMUA*\n\n*TEAM A :*\n" + teamA.map((v, i) => `${conn.war[m.chat][i].hp > 0 ? "❤️ " : "☠️ "}@${v.split("@")[0]} (- Rp. ${Number(conn.war2[m.chat].money).toLocaleString()})`).join`\n` + "\n\n*TEAM B :*\n" + teamB.map((v, i) => `${conn.war[m.chat][i + 5].hp > 0 ? "❤️ " : "☠️ "}@${v.split("@")[0]} (+ Rp. ${Number(conn.war2[m.chat].money).toLocaleString()})`).join`\n`, m, {
              contextInfo: {
                mentionedJid: teamAB
              }
            }), delete conn.war[m.chat], delete conn.war2[m.chat];
          }
        } else {
          for (let i = 5; i < 10; i++) "" != conn.war[m.chat][i].user && (playerTotal += 1, conn.war[m.chat][i].hp <= 0 && (playerKalah += 1));
          if (m.reply(playerTotal + "T-K" + playerKalah), playerTotal === playerKalah) {
            teamA = [], teamB = [], teamAB = [];
            for (let j = 0; j < 5; j++) "" != conn.war[m.chat][j].user && (db.data.users[conn.war[m.chat][j].user].money += Number(conn.war2[m.chat].money), teamA.push(conn.war[m.chat][j].user), teamAB.push(conn.war[m.chat][j].user));
            for (let j = 5; j < 10; j++) "" != conn.war[m.chat][j].user && (db.data.users[conn.war[m.chat][j].user].money -= Number(conn.war2[m.chat].money), teamB.push(conn.war[m.chat][j].user), teamAB.push(conn.war[m.chat][j].user));
            await conn.reply(m.chat, "*TEAM A MENANG KARENA TEAM B GOBLOK SEMUA*\n\n*TEAM A :*\n" + teamA.map((v, i) => `${conn.war[m.chat][i].hp > 0 ? "❤️ " : "☠️ "}@${v.split("@")[0]} (+ Rp. ${Number(conn.war2[m.chat].money).toLocaleString()})`).join`\n` + "\n\n*TEAM B :*\n" + teamB.map((v, i) => `${conn.war[m.chat][i + 5].hp > 0 ? "❤️ " : "☠️ "}@${v.split("@")[0]} (- Rp. ${Number(conn.war2[m.chat].money).toLocaleString()})`).join`\n`, m, {
              contextInfo: {
                mentionedJid: teamAB
              }
            }), delete conn.war[m.chat], delete conn.war2[m.chat];
          }
        }
      }
      let pergantian = !1;
      if (turn < 5)
        for (let i = 5; i < 10; i++) conn.war[m.chat][i].hp > 0 && "" != conn.war[m.chat][i].user && !1 === conn.war[m.chat][i].turn && (conn.war2[m.chat].turn = i, conn.war2[m.chat].time = 1, pergantian = !0);
      else
        for (let i = 0; i < 5; i++) conn.war[m.chat][i].hp > 0 && "" != conn.war[m.chat][i].user && !1 === conn.war[m.chat][i].turn && (conn.war2[m.chat].turn = i, conn.war2[m.chat].time = 1, pergantian = !0);
      if (!1 === pergantian)
        for (let l = 9; l >= 0; l--) "" != conn.war[m.chat][l].user && conn.war[m.chat][l].hp > 0 && (conn.war2[m.chat].turn = l, conn.war2[m.chat].time = 1), conn.war[m.chat][l].turn;
      await sleep(3e3), await conn.reply(m.chat, `*Giliran @${conn.war[m.chat][conn.war2[m.chat].turn].user.split("@")[0]} untuk menyerang (Waktu 90 detik)*\n\n.war player = statistik pemain\n.attack @tag = serang lawan`, null, {
        contextInfo: {
          mentionedJid: [conn.war[m.chat][conn.war2[m.chat].turn].user]
        }
      }), cekAFK(conn.war2[m.chat].turn);
    }
  }
  if (conn.war = conn.war ? conn.war : {}, conn.war2 = conn.war2 ? conn.war2 : {}, !(m.chat in conn.war)) return m.reply("*Tidak ada game di grup ini.*");
  if (!conn.war2[m.chat].war) return m.reply('*War belom dimulai, ketik ".war start" untuk memulai pertarungan.*');
  for (let i = 0; i < 10; i++) m.sender === conn.war[m.chat][i].user && i != conn.war2[m.chat].turn && (await conn.reply(m.chat, `*Sekarang adalah giliran @${conn.war[m.chat][conn.war2[m.chat].turn].user.split("@")[0]} untuk menyerang.*`, m, {
    contextInfo: {
      mentionedJid: [conn.war[m.chat][conn.war2[m.chat].turn].user]
    }
  }), cekAFK(conn.war2[m.chat].turn));
  if (!args[0]) return m.reply("*Tag musuh yang akan diserang*\n*Ketik .war player*");
  args[0] = args[0]?.split("@")[1], args[0] += "@s.whatsapp.net";
  let success = !1;
  if (conn.war2[m.chat].turn < 5) {
    for (let i = 5; i < 10; i++)
      if (conn.war[m.chat][i].user === args[0] && conn.war[m.chat][i].hp > 0) {
        let attacker = m.sender,
          target = args[0],
          opportunity = [];
        for (let i = 0; i < db.data.users[attacker].level; i++) opportunity.push(attacker);
        for (let i = 0; i < db.data.users[target].level; i++) opportunity.push(target);
        let pointAttacker = 0,
          pointTarget = 0;
        for (let i = 0; i < 10; i++) opportunity[getRandom(0, opportunity.length)] === attacker ? pointAttacker += 1 : pointTarget += 1;
        for (let i = 0; i < 10; i++) conn.war[m.chat][i].user === target && (conn.war[m.chat][i].hp -= 500 * pointAttacker, conn.war[m.chat][conn.war2[m.chat].turn].turn = !0, await conn.reply(m.chat, `*@${attacker.split("@")[0]} menyerang @${target.split("@")[0]} sampai nyawanya berkurang ${500 * pointAttacker} (Sisa HP: ${conn.war[m.chat][i].hp})*\n\n*@${attacker.split("@")[0]} [${10 * pointAttacker}%] - [${10 * pointTarget}%] @${target.split("@")[0]}*\n*Level sangat mempengaruhi keberhasilan.*`, m, {
          contextInfo: {
            mentionedJid: [attacker, target]
          }
        }), await sleep(2e3), conn.war[m.chat][i].hp <= 0 && await conn.reply(m.chat, `*@${target.split("@")[0]} sudah mati dalam pertarungan.*`, m, {
          contextInfo: {
            mentionedJid: [target]
          }
        }), success = !0);
      }
    if (!1 === success) return m.reply('*Masukkan list pemain game yang benar bos.*\n\n*Cek ".war player"*');
    for (let i = 0; i < 10; i++) m.sender === conn.war[m.chat][i].user && (conn.war[m.chat][i].turn = !0);
  } else {
    for (let i = 0; i < 5; i++)
      if (conn.war[m.chat][i].user === args[0] && conn.war[m.chat][i].hp > 0) {
        let attacker = m.sender,
          target = args[0],
          opportunity = [];
        for (let i = 0; i < db.data.users[attacker].level; i++) opportunity.push(attacker);
        for (let i = 0; i < db.data.users[target].level; i++) opportunity.push(target);
        let pointAttacker = 0,
          pointTarget = 0;
        for (i = 0; i < 10; i++) opportunity[getRandom(0, opportunity.length)] === attacker ? pointAttacker += 1 : pointTarget += 1;
        for (let i = 0; i < 10; i++) conn.war[m.chat][i].user === target && (conn.war[m.chat][i].hp -= 500 * pointAttacker, await conn.reply(m.chat, conn.war[m.chat][conn.war2[m.chat].turn].turn, m), conn.war[m.chat][conn.war2[m.chat].turn].turn = !0, await conn.reply(m.chat, conn.war[m.chat][conn.war2[m.chat].turn].turn, m), await conn.reply(m.chat, `*@${attacker.split("@")[0]} menyerang @${target.split("@")[0]} sampai nyawanya berkurang ${500 * pointAttacker} (Sisa HP: ${conn.war[m.chat][i].hp})*\n\n*@${attacker.split("@")[0]} [${10 * pointAttacker}%] - [${10 * pointTarget}%] @${target.split("@")[0]}*\n*Level sangat mempengaruhi keberhasilan.*`, m, {
          contextInfo: {
            mentionedJid: [attacker, target]
          }
        }), await sleep(2e3), conn.war[m.chat][i].hp <= 0 && await conn.reply(m.chat, `*@${target.split("@")[0]} sudah mati dalam pertarungan.*`, m, {
          contextInfo: {
            mentionedJid: [target]
          }
        }), success = !0);
      }
    if (!1 === success) return m.reply('*Masukkan list pemain game yang benar bos.*\n\n*Cek ".war player"*');
    for (let i = 0; i < 10; i++) m.sender === conn.war[m.chat][i].user && (conn.war[m.chat][i].turn = !0);
  }
  if (conn.war2[m.chat].turn < 5) {
    let userAktif = 0,
      userMati = 0;
    for (let i = 5; i < 10; i++) "" != conn.war[m.chat][i].user && (userAktif += 1, conn.war[m.chat][i].hp <= 0 && (userMati += 1));
    if (userAktif === userMati) {
      var teamA = [],
        teamB = [],
        teamAB = [];
      for (let j = 0; j < 5; j++) "" != conn.war[m.chat][j].user && (db.data.users[conn.war[m.chat][j].user].money += Number(conn.war2[m.chat].money), teamA.push(conn.war[m.chat][j].user), teamAB.push(conn.war[m.chat][j].user));
      for (let j = 5; j < 10; j++) "" != conn.war[m.chat][j].user && (db.data.users[conn.war[m.chat][j].user].money -= Number(conn.war2[m.chat].money), teamB.push(conn.war[m.chat][j].user), teamAB.push(conn.war[m.chat][j].user));
      await conn.reply(m.chat, "*TEAM A MENANG KARENA TEAM B GOBLOK SEMUA*\n\n*TEAM A :*\n" + teamA.map((v, i) => `${conn.war[m.chat][i].hp > 0 ? "❤️ " : "☠️ "}@${v.split("@")[0]} (+ Rp. ${Number(conn.war2[m.chat].money).toLocaleString()})`).join`\n` + "\n\n*TEAM B :*\n" + teamB.map((v, i) => `${conn.war[m.chat][i + 5].hp > 0 ? "❤️ " : "☠️ "}@${v.split("@")[0]} (- Rp. ${Number(conn.war2[m.chat].money).toLocaleString()})`).join`\n`, m, {
        contextInfo: {
          mentionedJid: teamAB
        }
      }), delete conn.war[m.chat], delete conn.war2[m.chat];
    }
    let turn1 = conn.war2[m.chat].turn,
      turn2 = conn.war2[m.chat].turn;
    for (let k = 5; k < 10; k++) conn.war[m.chat][k].hp > 0 && "" != conn.war[m.chat][k].user && !1 === conn.war[m.chat][k].turn && (conn.war2[m.chat].turn = k, conn.war2[m.chat].time = 1, turn2 = conn.war2[m.chat].turn);
    if (turn1 === turn2) {
      for (i = 0; i < 10; i++) conn.war[m.chat][i].turn = !1;
      for (i = 0; i < 5; i++) conn.war[m.chat][i].hp > 0 && "" != conn.war[m.chat][i].user && !1 === conn.war[m.chat][i].turn && (conn.war2[m.chat].turn = i, conn.war2[m.chat].time = 1);
    }
    await sleep(2e3), await conn.reply(m.chat, `*Giliran @${conn.war[m.chat][conn.war2[m.chat].turn].user.split("@")[0]} untuk menyerang (Waktu 90 detik)*\n\n.war player = statistik pemain\n.attack @tag = serang lawan`, m, {
      contextInfo: {
        mentionedJid: [conn.war[m.chat][conn.war2[m.chat].turn].user]
      }
    }), cekAFK(conn.war2[m.chat].turn);
  } else {
    let userAktif = 0,
      userMati = 0;
    for (let i = 0; i < 5; i++) "" != conn.war[m.chat][i].user && (userAktif += 1, conn.war[m.chat][i].hp <= 0 && (userMati += 1));
    if (userAktif === userMati) {
      teamA = [], teamB = [], teamAB = [];
      for (let j = 0; j < 5; j++) "" != conn.war[m.chat][j].user && (db.data.users[conn.war[m.chat][j].user].money -= Number(conn.war2[m.chat].money), teamA.push(conn.war[m.chat][j].user), teamAB.push(conn.war[m.chat][j].user));
      for (let j = 5; j < 10; j++) "" != conn.war[m.chat][j].user && (db.data.users[conn.war[m.chat][j].user].money += Number(conn.war2[m.chat].money), teamB.push(conn.war[m.chat][j].user), teamAB.push(conn.war[m.chat][j].user));
      await conn.reply(m.chat, "*TEAM B MENANG KARENA TEAM A GOBLOK SEMUA*\n\n*TEAM A :*\n" + teamA.map((v, i) => `${conn.war[m.chat][i].hp > 0 ? "❤️ " : "☠️ "}@${v.split("@")[0]} (- Rp. ${Number(conn.war2[m.chat].money).toLocaleString()})`).join`\n` + "\n\n*TEAM B :*\n" + teamB.map((v, i) => `${conn.war[m.chat][i + 5].hp > 0 ? "❤️ " : "☠️ "}@${v.split("@")[0]} (+ Rp. ${Number(conn.war2[m.chat].money).toLocaleString()})`).join`\n`, m, {
        contextInfo: {
          mentionedJid: teamAB
        }
      }), delete conn.war[m.chat], delete conn.war2[m.chat];
    }
    let turn1 = conn.war2[m.chat].turn,
      turn2 = conn.war2[m.chat].turn;
    for (let k = 0; k < 5; k++) conn.war[m.chat][k].hp > 0 && "" != conn.war[m.chat][k].user && !1 === conn.war[m.chat][k].turn && (conn.war2[m.chat].turn = k, conn.war2[m.chat].time = 1, turn2 = conn.war2[m.chat].turn);
    if (turn1 === turn2) {
      for (let i = 0; i < 10; i++) conn.war[m.chat][i].turn = !1;
      for (let i = 0; i < 5; i++) conn.war[m.chat][i].hp > 0 && "" != conn.war[m.chat][i].user && !1 === conn.war[m.chat][i].turn && (conn.war2[m.chat].turn = i, conn.war2[m.chat].time = 1);
    }
    await sleep(2e3), await conn.reply(m.chat, `*Giliran @${conn.war[m.chat][conn.war2[m.chat].turn].user.split("@")[0]} untuk menyerang (Waktu 90 detik)*\n\n.war player = statistik pemain\n.attack @tag = serang lawan`, m, {
      contextInfo: {
        mentionedJid: [conn.war[m.chat][conn.war2[m.chat].turn].user]
      }
    }), cekAFK(conn.war2[m.chat].turn);
  }
  let totalUser = 0,
    totalTurn = 0;
  for (let i = 0; i < 10; i++) "" != conn.war[m.chat][i].user && (totalUser += 1), !0 === conn.war[m.chat][i].turn && (totalTurn += 1);
  if (totalTurn === totalUser)
    for (i = 0; i < 10; i++) conn.war[m.chat][i].turn = !1;
};
handler.help = ["attack", "atk"], handler.tags = ["game"], handler.command = /^(attack|atk)$/i,
  handler.group = !0;
export default handler;

function getRandom(min, max) {
  return min = Math.ceil(min), max = Math.floor(max), Math.floor(Math.random() * (max - min + 1)) + min;
}