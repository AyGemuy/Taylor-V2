const handler = async (m, {
  conn
}) => {
  if (conn.koboy = conn.koboy || {}, conn.koboy[m.chat]) return m.reply("Kamu sedang bermain game Koboy!");
  let playerPosition, criminalPosition;
  do {
    playerPosition = Math.floor(6 * Math.random()), criminalPosition = Math.floor(6 * Math.random());
  } while (playerPosition === criminalPosition);
  let gameState = `🤠 Koboy Mengejar Penjahat 🥷\n\nWilayah saya:\n${"・".repeat(playerPosition)}🤠${"・".repeat(5 - playerPosition)}\nWilayah penjahat:\n${"・".repeat(criminalPosition)}🥷${"・".repeat(5 - criminalPosition)}\nKetik *'kanan'* untuk bergerak ke kanan.\nKetik *'kiri'* untuk bergerak ke kiri.`,
    {
      key
    } = await conn.reply(m.chat, gameState, m);
  conn.koboy[m.chat] = {
    playerPosition: playerPosition,
    criminalPosition: criminalPosition,
    key: key,
    oldkey: key,
    earnedExp: 1e4,
    earnedMoney: 1e6,
    sender: m.sender,
    moveCount: 0,
    maxMoves: 5,
    roomId: m.chat,
    timeout: setTimeout(() => {
      conn.koboy && conn.koboy[m.chat] && conn.koboy[m.chat].roomId === m.chat && (conn.sendMessage(m.chat, {
        delete: key
      }), delete conn.koboy[m.chat]);
    }, 12e4)
  };
};
handler.before = async (m, {
    conn
  }) => {
    conn.koboy = conn.koboy || {};
    let user = db.data.users[m.sender];
    if (!conn.koboy[m.chat] || conn.koboy[m.chat].roomId !== m.chat || !["kiri", "kanan"].includes(m.text.toLowerCase())) return;
    let gameData = conn.koboy[m.chat],
      {
        playerPosition,
        criminalPosition,
        key,
        oldkey,
        moveCount,
        maxMoves,
        timeout,
        earnedExp,
        earnedMoney,
        sender
      } = gameData;
    if (m.quoted || m.quoted?.id === key) {
      if ("kiri" === m.text.toLowerCase()) {
        if (!(playerPosition > 0)) return m.reply("Anda sudah berada di batas kiri!");
        playerPosition--, moveCount++;
      } else if ("kanan" === m.text.toLowerCase()) {
        if (!(playerPosition < 5)) return m.reply("Anda sudah berada di batas kanan!");
        playerPosition++, moveCount++;
      }
      if (playerPosition === criminalPosition) {
        conn.sendMessage(m.chat, {
          delete: oldkey
        });
        let earnedMoneys = randomMoney(earnedMoney, 1),
          earnedExps = randomMoney(earnedExp, 1);
        return user.money = (user.money || 0) + earnedMoneys, user.exp = (user.exp || 0) + earnedExps,
          delete conn.koboy[m.chat], await conn.reply(m.chat, `🎉 Selamat! @${sender.split("@")[0]} berhasil mengejar penjahat! 🎉\n\n💰 Mendapatkan uang senilai *${formatRupiah(earnedMoneys)}*\n🔼 Dapatkan *${earnedExps}* EXP\n`, m, {
            mentions: [sender]
          });
      }
      if (moveCount === maxMoves) return conn.sendMessage(m.chat, {
        delete: oldkey
      }), delete conn.koboy[m.chat], await conn.reply(m.chat, `😔 Kamu kalah! @${sender.split("@")[0]} sudah mencapai batas maksimum gerakan.`, m, {
        mentions: [sender]
      });
      let gameState = `🤠 Koboy Mengejar Penjahat 🥷\n\nWilayah saya:\n${"・".repeat(playerPosition)}🤠${"・".repeat(5 - playerPosition)}\nWilayah penjahat:\n${"・".repeat(criminalPosition)}🥷${"・".repeat(5 - criminalPosition)}\nKetik *'kanan'* untuk bergerak ke kanan.\nKetik *'kiri'* untuk bergerak ke kiri.`,
        msg = await conn.relayMessage(m.chat, {
          protocolMessage: {
            key: key,
            type: 14,
            editedMessage: {
              conversation: gameState
            }
          }
        }, {}),
        additionalData = {
          ...gameData,
          playerPosition: playerPosition,
          moveCount: moveCount,
          key: {
            id: msg
          }
        };
      conn.koboy[m.chat] = Object.assign({}, conn.koboy[m.chat], additionalData);
    }
  }, handler.help = ["koboy"], handler.tags = ["rpg"], handler.command = /^(koboy)$/i,
  handler.disabled = !1;
export default handler;

function randomMoney(max, min) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function formatRupiah(number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0
  }).format(number);
}