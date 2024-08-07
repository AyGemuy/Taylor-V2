import similarity from "similarity";
const threshold = .72;
export async function before(m) {
  let id = m.chat;
  if (!m.quoted || !m.quoted?.fromMe || !m.quoted?.isBaileys || !m.text || !/Ketik.*hhero/i.test(m.quoted?.text) || /.*hhero/i.test(m.text)) return !0;
  if (this.tebakheroml = this.tebakheroml ? this.tebakheroml : {}, !(id in this.tebakheroml)) return await this.reply(m.chat, "Soal itu telah berakhir", m);
  if (m.quoted?.id === this.tebakheroml[id][0]?.id) {
    if (/^((me)?nyerah|surr?ender)$/i.test(m.text)) return clearTimeout(this.tebakheroml[id][3]),
      delete this.tebakheroml[id], await this.reply(m.chat, "*Yah Menyerah :( !*", m);
    let json = JSON.parse(JSON.stringify(this.tebakheroml[id][1]));
    m.text.toLowerCase() === json.title.toLowerCase().trim() ? (db.data.users[m.sender].exp += this.tebakheroml[id][2], await this.reply(m.chat, `✅ *Benar!*\n+${this.tebakheroml[id][2]} XP`, m), clearTimeout(this.tebakheroml[id][3]), delete this.tebakheroml[id]) : similarity(m.text.toLowerCase(), json.title.toLowerCase().trim()) >= .72 ? m.reply("❗ *Dikit Lagi!*") : await this.reply(m.chat, "❌ *Salah!*", m);
  }
  return !0;
}
export const exp = 0;
const buttontebakheroml = [
  ["tebakheroml", "/tebakheroml"]
];