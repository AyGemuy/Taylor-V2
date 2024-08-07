import similarity from "similarity";
const threshold = .72;
export async function before(m) {
  let id = m.chat;
  if (!m.quoted || !m.quoted?.fromMe || !m.quoted?.isBaileys || !m.text || !/Ketik.*hsia/i.test(m.quoted?.text) || /.*hsia/i.test(m.text)) return !0;
  if (this.tebaksiapa = this.tebaksiapa ? this.tebaksiapa : {}, !(id in this.tebaksiapa)) return await this.reply(m.chat, "Soal itu telah berakhir", m);
  if (m.quoted?.id === this.tebaksiapa[id][0]?.id) {
    if (/^((me)?nyerah|surr?ender)$/i.test(m.text)) return clearTimeout(this.tebaksiapa[id][3]),
      delete this.tebaksiapa[id], await this.reply(m.chat, "*Yah Menyerah :( !*", m);
    let json = JSON.parse(JSON.stringify(this.tebaksiapa[id][1]));
    m.text.toLowerCase() === json.jawaban.toLowerCase().trim() ? (db.data.users[m.sender].exp += this.tebaksiapa[id][2], await this.reply(m.chat, `✅ *Benar!*\n+${this.tebaksiapa[id][2]} XP`, m), clearTimeout(this.tebaksiapa[id][3]), delete this.tebaksiapa[id]) : similarity(m.text.toLowerCase(), json.jawaban.toLowerCase().trim()) >= .72 ? m.reply("❗ *Dikit Lagi!*") : await this.reply(m.chat, "❌ *Salah!*", m);
  }
  return !0;
}
export const exp = 0;
const buttontebaksiapa = [
  ["tebaksiapa", "/tebaksiapa"]
];