import similarity from "similarity";
const threshold = 0.72;
export async function before(m) {
  let id = m.chat;
  if (
    !m.quoted ||
    !m.quoted?.isBaileys ||
    !(
      /🕹️ GAME - SAMBUNGKATA[\s\S]*Balas pesan ini untuk menjawab/i.test(
        m.text || "",
      ) ||
      /🕹️ GAME - SAMBUNGKATA[\s\S]*Balas pesan ini untuk menjawab/i.test(
        m.quoted?.text || "",
      )
    )
  )
    return !0;
  if (
    ((db.data.game.sambungkata = db.data.game.sambungkata
      ? db.data.game.sambungkata
      : {}),
    !(id in db.data.game.sambungkata))
  )
    return await this.reply(m.chat, "Soal sambungkata itu telah berakhir", m);
  if (m.quoted?.id === db.data.game.sambungkata[id][0]?.id) {
    if (/^((me)?nyerah|surr?ender)$/i.test(m.text)) {
      clearTimeout(db.data.game.sambungkata[id][3]);
      delete db.data.game.sambungkata[id];
      return await this.reply(m.chat, "❌ *Yah Menyerah :( !*", m, {
        contextInfo: {
          mentionedJid: [m.sender],
        },
      });
    }
    let correctAnswer = db.data.game.sambungkata[id][1];
    let userAnswer = m.text.toLowerCase().trim();
    if (userAnswer === correctAnswer) {
      db.data.users[m.sender].exp += db.data.game.sambungkata[id][2];
      await this.reply(
        m.chat,
        `✅ *Benar!*\n+${db.data.game.sambungkata[id][2]} XP`,
        m,
        {
          contextInfo: {
            mentionedJid: [m.sender],
          },
        },
      );
      clearTimeout(db.data.game.sambungkata[id][3]);
      delete db.data.game.sambungkata[id];
    } else if (similarity(userAnswer, correctAnswer) >= threshold) {
      await this.reply(m.chat, "❗ *Sedikit Lagi!*", m, {
        contextInfo: {
          mentionedJid: [m.sender],
        },
      });
    } else {
      await this.reply(m.chat, "❌ *Salah!*", m, {
        contextInfo: {
          mentionedJid: [m.sender],
        },
      });
    }
  }
  return !0;
}
export const exp = 0;
