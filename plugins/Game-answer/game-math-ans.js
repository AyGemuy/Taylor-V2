let handler = (m) => m;
handler.before = async function (m) {
  if (
    !m.quoted ||
    !m.quoted?.fromMe ||
    !m.quoted?.isBaileys ||
    !m.text ||
    !(
      /🕹️ GAME - MATH[\s\S]*Balas pesan ini untuk menjawab/i.test(
        m.text || "",
      ) ||
      /🕹️ GAME - MATH[\s\S]*Balas pesan ini untuk menjawab/i.test(
        m.quoted?.text || "",
      )
    )
  )
    return !0;
  if (!/^-?[0-9]+(\.[0-9]+)?$/.test(m.text)) return !0;
  let id = m.chat;
  if (
    ((db.data.game.math = db.data.game.math ? db.data.game.math : {}),
    !(id in db.data.game.math))
  )
    return await this.reply(m.chat, "Soal math itu telah berakhir", m);
  if (m.quoted?.id === db.data.game.math[id][0]?.id) {
    let math = JSON.parse(JSON.stringify(db.data.game.math[id][1]));
    m.text === math.result
      ? ((db.data.users[m.sender].exp += math.bonus),
        clearTimeout(db.data.game.math[id][3]),
        delete db.data.game.math[id],
        await this.reply(m.chat, `✅ *Benar!*\n+${math.bonus} XP`, m, {
          contextInfo: {
            mentionedJid: [m.sender],
          },
        }))
      : 0 == --db.data.game.math[id][2]
        ? (clearTimeout(db.data.game.math[id][3]),
          delete db.data.game.math[id],
          await this.reply(
            m.chat,
            `❗ *Kesempatan habis!*\nJawaban: *${math.result}*`,
            m,
            {
              contextInfo: {
                mentionedJid: [m.sender],
              },
            },
          ))
        : await this.reply(
            m.chat,
            `❌ *Jawaban Salah!*\nMasih ada ${db.data.game.math[id][2]} kesempatan`,
            m,
            {
              contextInfo: {
                mentionedJid: [m.sender],
              },
            },
          );
  }
  return !0;
};
export default handler;
