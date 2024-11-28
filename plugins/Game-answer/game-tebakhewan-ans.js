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
      /🕹️ GAME - TEBAKHEWAN[\s\S]*Balas pesan ini untuk menjawab/i.test(
        m.text || "",
      ) ||
      /🕹️ GAME - TEBAKHEWAN[\s\S]*Balas pesan ini untuk menjawab/i.test(
        m.quoted?.text || "",
      )
    )
  )
    return !0;
  if (
    ((db.data.game.tebakhewan = db.data.game.tebakhewan
      ? db.data.game.tebakhewan
      : {}),
    !(id in db.data.game.tebakhewan))
  )
    return await this.reply(m.chat, "Soal tebakhewan itu telah berakhir", m);
  if (m.quoted?.id === db.data.game.tebakhewan[id][0]?.id) {
    if (/^((me)?nyerah|surr?ender)$/i.test(m.text))
      return (
        clearTimeout(db.data.game.tebakhewan[id][3]),
        delete db.data.game.tebakhewan[id],
        await this.reply(m.chat, "❌ *Yah Menyerah :( !*", m, {
          contextInfo: {
            mentionedJid: [m.sender],
          },
        })
      );
    let json = JSON.parse(JSON.stringify(db.data.game.tebakhewan[id][1]));
    m.text.toLowerCase() === json.title.toLowerCase().trim()
      ? ((db.data.users[m.sender].exp += db.data.game.tebakhewan[id][2]),
        await this.reply(
          m.chat,
          `✅ *Benar!*\n+${db.data.game.tebakhewan[id][2]} XP`,
          m,
          {
            contextInfo: {
              mentionedJid: [m.sender],
            },
          },
        ),
        clearTimeout(db.data.game.tebakhewan[id][3]),
        delete db.data.game.tebakhewan[id])
      : similarity(m.text.toLowerCase(), json.title.toLowerCase().trim()) >=
          0.72
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
