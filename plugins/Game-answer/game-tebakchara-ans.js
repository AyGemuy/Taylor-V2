import similarity from "similarity";
const threshold = .72;
export async function before(m) {
  let id = m.chat;
  if (!m.quoted || !m.quoted?.fromMe || !m.quoted?.isBaileys || !m.text || !/Ketik.*hcha/i.test(m.quoted?.text) || /.*hcha/i.test(m.text)) return !0;
  if (this.tebakchara = this.tebakchara ? this.tebakchara : {}, !(id in this.tebakchara)) return await this.reply(m.chat, "Soal itu telah berakhir", m);
  if (m.quoted?.id === this.tebakchara[id][0]?.id) {
    if (/^((me)?nyerah|surr?ender)$/i.test(m.text)) return clearTimeout(this.tebakchara[id][3]),
      delete this.tebakchara[id], await this.reply(m.chat, "*Yah Menyerah :( !*", m);
    let json = JSON.parse(JSON.stringify(this.tebakchara[id][1]));
    m.text.toLowerCase() === json.name.toLowerCase().trim() ? (db.data.users[m.sender].exp += this.tebakchara[id][2], await this.reply(m.chat, `✅ *Benar!*\n+${this.tebakchara[id][2]} XP`, m), clearTimeout(this.tebakchara[id][3]), delete this.tebakchara[id]) : similarity(m.text.toLowerCase(), json.name.toLowerCase().trim()) >= .72 ? m.reply("❗ *Dikit Lagi!*") : await this.reply(m.chat, "❌ *Salah!*", m);
  }
  return !0;
}
export const exp = 0;
const buttontebakchara = [
  ["tebakchara", "/tebakchara"]
];