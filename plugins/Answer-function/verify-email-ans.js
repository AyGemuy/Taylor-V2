import similarity from "similarity";
const threshold = .72;
export async function before(m) {
  let id = m.chat;
  if (!m.quoted || !m.quoted?.fromMe || !m.quoted?.isBaileys || !m.text || !/Ketik.*hotp/i.test(m.quoted?.text) || /.*hotp/i.test(m.text)) return !0;
  if (this.regmail = this.regmail ? this.regmail : {}, !(id in this.regmail)) return await this.reply(m.chat, "*❗ Kode verifikasi Anda telah kedaluwarsa.*", m);
  if (m.quoted?.id === this.regmail[id][0]?.id) {
    if (/^(cancel|batal)$/i.test(m.text)) return clearTimeout(this.regmail[id][3]),
      delete this.regmail[id], await this.reply(m.chat, "*❌ Nomor Anda tidak berhasil diverifikasi.*", m);
    let json = JSON.parse(JSON.stringify(this.regmail[id][1]));
    m.text.toLowerCase() === json.jawaban.toLowerCase().trim() ? (db.data.users[m.sender].exp += this.regmail[id][2], await this.reply(m.chat, `*✅ Nomor Anda telah berhasil diverifikasi.*\n+${this.regmail[id][2]} XP`, m), clearTimeout(this.regmail[id][3]), delete this.regmail[id]) : similarity(m.text.toLowerCase(), json.jawaban.toLowerCase().trim()) >= .72 ? m.reply("*❗ Dikit Lagi!*") : await this.reply(m.chat, "*❌ Kode verifikasi Anda salah.*", m);
  }
  return !0;
}
export const exp = 0;
const buttonregmail = [
  ["regmail", "/regmail"]
];