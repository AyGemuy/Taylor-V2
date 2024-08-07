import similarity from "similarity";
const threshold = .72;
export async function before(m) {
  let id = m.chat;
  if (!m.quoted || !m.quoted?.fromMe || !m.quoted?.isBaileys || !m.text || !/Ketik.*hkab/i.test(m.quoted?.text) || /.*hkab/i.test(m.text)) return !0;
  if (this.tebakkabupaten = this.tebakkabupaten ? this.tebakkabupaten : {}, !(id in this.tebakkabupaten)) return await this.reply(m.chat, "Soal itu telah berakhir", m);
  if (m.quoted?.id === this.tebakkabupaten[id][0]?.id) {
    if (/^((me)?nyerah|surr?ender)$/i.test(m.text)) return clearTimeout(this.tebakkabupaten[id][3]),
      delete this.tebakkabupaten[id], await this.reply(m.chat, "*Yah Menyerah :( !*", m);
    let json = JSON.parse(JSON.stringify(this.tebakkabupaten[id][1]));
    m.text.toLowerCase() === json.title.toLowerCase().trim() ? (db.data.users[m.sender].exp += this.tebakkabupaten[id][2], await this.reply(m.chat, `✅ *Benar!*\n+${this.tebakkabupaten[id][2]} XP`, m), clearTimeout(this.tebakkabupaten[id][3]), delete this.tebakkabupaten[id]) : similarity(m.text.toLowerCase(), json.title.toLowerCase().trim()) >= .72 ? m.reply("❗ *Dikit Lagi!*") : await this.reply(m.chat, "❌ *Salah!*", m);
  }
  return !0;
}
export const exp = 0;
const buttontebakkabupaten = [
  ["tebakkabupaten", "/tebakkabupaten"]
];