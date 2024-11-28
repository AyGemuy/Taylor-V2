import similarity from "similarity";
const threshold = 0.72;
export async function before(m) {
  let id = m.chat;
  try {
    if (
      !m.quoted ||
      !m.quoted?.isBaileys ||
      !m.text ||
      !/Ketik.*hotp/i.test(m.quoted?.text) ||
      /.*hotp/i.test(m.text)
    )
      return true;
    if (!db.data.dbbot.regmail) db.data.dbbot.regmail = {};
    if (!(id in db.data.dbbot.regmail))
      return await this.reply(
        m.chat,
        "*❗ Kode verifikasi Anda telah kedaluwarsa.*",
        m,
      );
    if (m.quoted?.id === db.data.dbbot.regmail[id][0]?.id) {
      if (/^(cancel|batal)$/i.test(m.text)) {
        clearTimeout(db.data.dbbot.regmail[id][3]);
        delete db.data.dbbot.regmail[id];
        return await this.reply(
          m.chat,
          "*❌ Nomor Anda tidak berhasil diverifikasi.*",
          m,
        );
      }
      let json = db.data.dbbot.regmail[id][1];
      if (m.text.toLowerCase() === json.jawaban.toLowerCase().trim()) {
        db.data.users[m.sender].exp += db.data.dbbot.regmail[id][2];
        await this.reply(
          m.chat,
          `*✅ Nomor Anda telah berhasil diverifikasi.*\n+${db.data.dbbot.regmail[id][2]} XP`,
          m,
        );
        await conn.sendMessage(m.chat, {
          delete: db.data.dbbot.regmail[id][0].key,
        });
        clearTimeout(db.data.dbbot.regmail[id][3]);
        delete db.data.dbbot.regmail[id];
      } else if (
        similarity(m.text.toLowerCase(), json.jawaban.toLowerCase().trim()) >=
        threshold
      ) {
        await m.reply("*❗ Dikit Lagi!*");
      } else {
        await this.reply(m.chat, "*❌ Kode verifikasi Anda salah.*", m);
      }
    }
  } catch (error) {
    console.error(error);
    await this.reply(m.chat, "*❗ Terjadi kesalahan, silakan coba lagi.*", m);
  }
  return true;
}
export const exp = 0;
