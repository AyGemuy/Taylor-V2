import similarity from "similarity";
const threshold = .72;
export async function before(m) {
  let id = m.chat;
  if (!m.quoted || !m.quoted?.fromMe || !m.quoted?.isBaileys || !m.text || !/Ketik.*hben/i.test(m.quoted?.text) || /.*hben/i.test(m.text)) return !0;
  if (this.tebakbendera = this.tebakbendera ? this.tebakbendera : {}, !(id in this.tebakbendera)) return await this.reply(m.chat, "Soal itu telah berakhir", m);
  if (m.quoted?.id === this.tebakbendera[id][0]?.id) {
    if (/^((me)?nyerah|surr?ender)$/i.test(m.text)) return clearTimeout(this.tebakbendera[id][3]),
      delete this.tebakbendera[id], await this.reply(m.chat, "*Yah Menyerah :( !*", m);
    let json = JSON.parse(JSON.stringify(this.tebakbendera[id][1]));
    m.text.toLowerCase() === json.name.toLowerCase().trim() ? (db.data.users[m.sender].exp += this.tebakbendera[id][2], await this.reply(m.chat, `✅ *Benar!*\n+${this.tebakbendera[id][2]} XP`, m), clearTimeout(this.tebakbendera[id][3]), delete this.tebakbendera[id]) : similarity(m.text.toLowerCase(), json.name.toLowerCase().trim()) >= .72 ? m.reply("❗ *Dikit Lagi!*") : await this.reply(m.chat, "❌ *Salah!*", m);
  }
  return !0;
}
export const exp = 0;
const buttontebakbendera = [
  ["tebakbendera", "/tebakbendera"]
];