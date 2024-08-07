import similarity from "similarity";
const threshold = .72;
export async function before(m) {
  let id = m.chat;
  if (!m.quoted || !m.quoted?.fromMe || !m.quoted?.isBaileys || !m.text || !/Ketik.*hjkt/i.test(m.quoted?.text) || /.*hjkt/i.test(m.text)) return !0;
  if (this.tebakjkt48 = this.tebakjkt48 ? this.tebakjkt48 : {}, !(id in this.tebakjkt48)) return await this.reply(m.chat, "Soal itu telah berakhir", m);
  if (m.quoted?.id === this.tebakjkt48[id][0]?.id) {
    if (/^((me)?nyerah|surr?ender)$/i.test(m.text)) return clearTimeout(this.tebakjkt48[id][3]),
      delete this.tebakjkt48[id], await this.reply(m.chat, "*Yah Menyerah :( !*", m);
    let json = JSON.parse(JSON.stringify(this.tebakjkt48[id][1]));
    m.text.toLowerCase() === json.name.toLowerCase().trim() ? (db.data.users[m.sender].exp += this.tebakjkt48[id][2], await this.reply(m.chat, `✅ *Benar!*\n+${this.tebakjkt48[id][2]} XP`, m), clearTimeout(this.tebakjkt48[id][3]), delete this.tebakjkt48[id]) : similarity(m.text.toLowerCase(), json.name.toLowerCase().trim()) >= .72 ? m.reply("❗ *Dikit Lagi!*") : await this.reply(m.chat, "❌ *Salah!*", m);
  }
  return !0;
}
export const exp = 0;
const buttontebakjkt48 = [
  ["tebakjkt48", "/tebakjkt48"]
];