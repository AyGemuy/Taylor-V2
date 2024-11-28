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
      /🕹️ GAME - TEBAKANIME[\s\S]*Balas pesan ini untuk menjawab/i.test(
        m.text || "",
      ) ||
      /🕹️ GAME - TEBAKANIME[\s\S]*Balas pesan ini untuk menjawab/i.test(
        m.quoted?.text || "",
      )
    )
  )
    return !0;
  if (
    ((db.data.game.tebakanjime = db.data.game.tebakanjime
      ? db.data.game.tebakanjime
      : {}),
    !(id in db.data.game.tebakanjime))
  )
    return await this.reply(m.chat, "Soal tebakanjime itu telah berakhir", m);
  if (m.quoted?.id === db.data.game.tebakanjime[id][0]?.id) {
    if (/^((me)?nyerah|surr?ender)$/i.test(m.text))
      return (
        clearTimeout(db.data.game.tebakanjime[id][3]),
        delete db.data.game.tebakanjime[id],
        await this.reply(m.chat, "❌ *Yah Menyerah :( !*", m, {
          contextInfo: {
            mentionedJid: [m.sender],
          },
        })
      );
    let json = JSON.parse(JSON.stringify(db.data.game.tebakanjime[id][1]));
    m.text.toLowerCase() === json.name.toLowerCase().trim()
      ? ((db.data.users[m.sender].exp += db.data.game.tebakanjime[id][2]),
        await this.reply(
          m.chat,
          `✅ *Benar!*\n+${db.data.game.tebakanjime[id][2]} XP`,
          m,
          {
            contextInfo: {
              mentionedJid: [m.sender],
            },
          },
        ),
        clearTimeout(db.data.game.tebakanjime[id][3]),
        delete db.data.game.tebakanjime[id])
      : similarity(m.text.toLowerCase(), json.name.toLowerCase().trim()) >= 0.72
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
