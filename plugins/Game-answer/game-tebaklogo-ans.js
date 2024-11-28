import similarity from "similarity";
const threshold = 0.72;
export async function before(m) {
  let id = m.chat;
  if (
    !m.quoted ||
    !m.quoted?.fromMe ||
    !m.quoted?.isBaileys ||
    !m.text ||
    !(
      /🕹️ GAME - TEBAKLOGO[\s\S]*Balas pesan ini untuk menjawab/i.test(
        m.text || "",
      ) ||
      /🕹️ GAME - TEBAKLOGO[\s\S]*Balas pesan ini untuk menjawab/i.test(
        m.quoted?.text || "",
      )
    )
  )
    return !0;
  if (
    ((db.data.game.tebaklogo = db.data.game.tebaklogo
      ? db.data.game.tebaklogo
      : {}),
    !(id in db.data.game.tebaklogo))
  )
    return await this.reply(m.chat, "Soal tebaklogo itu telah berakhir", m);
  if (m.quoted?.id === db.data.game.tebaklogo[id][0]?.id) {
    if (/^((me)?nyerah|surr?ender)$/i.test(m.text))
      return (
        clearTimeout(db.data.game.tebaklogo[id][3]),
        delete db.data.game.tebaklogo[id],
        await this.reply(m.chat, "❌ *Yah Menyerah :( !*", m, {
          contextInfo: {
            mentionedJid: [m.sender],
          },
        })
      );
    let json = JSON.parse(JSON.stringify(db.data.game.tebaklogo[id][1]));
    m.text.toLowerCase() === json.hasil.data.jawaban.toLowerCase().trim()
      ? ((db.data.users[m.sender].exp += db.data.game.tebaklogo[id][2]),
        await this.reply(
          m.chat,
          `✅ *Benar!*\n+${db.data.game.tebaklogo[id][2]} XP`,
          m,
          {
            contextInfo: {
              mentionedJid: [m.sender],
            },
          },
        ),
        clearTimeout(db.data.game.tebaklogo[id][3]),
        delete db.data.game.tebaklogo[id])
      : similarity(
            m.text.toLowerCase(),
            json.hasil.data.jawaban.toLowerCase().trim(),
          ) >= 0.72
        ? await this.reply(m.chat, "❗ *Sedikit Lagi!*", m, {
            contextInfo: {
              mentionedJid: [m.sender],
            },
          })
        : await this.reply(m.chat, "❌ *Salah!*", m, {
            contextInfo: {
              mentionedJid: [m.sender],
            },
          });
  }
  return !0;
}
export const exp = 0;
