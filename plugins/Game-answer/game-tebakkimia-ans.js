import similarity from "similarity";
const threshold = .72;
export async function before(m) {
  let id = m.chat;
  if (!m.quoted || !m.quoted?.fromMe || !m.quoted?.isBaileys || !m.text || !/Ketik.*hkim/i.test(m.quoted?.text) || /.*hkim/i.test(m.text)) return !0;
  if (this.tebakkimia = this.tebakkimia ? this.tebakkimia : {}, !(id in this.tebakkimia)) return await this.reply(m.chat, "Soal itu telah berakhir", m);
  if (m.quoted?.id === this.tebakkimia[id][0]?.id) {
    if (/^((me)?nyerah|surr?ender)$/i.test(m.text)) return clearTimeout(this.tebakkimia[id][3]),
      delete this.tebakkimia[id], await this.reply(m.chat, "*Yah Menyerah :( !*", m);
    let json = JSON.parse(JSON.stringify(this.tebakkimia[id][1]));
    m.text.toLowerCase() === json.unsur.toLowerCase().trim() ? (db.data.users[m.sender].exp += this.tebakkimia[id][2], await this.reply(m.chat, `✅ *Benar!*\n+${this.tebakkimia[id][2]} XP`, m), clearTimeout(this.tebakkimia[id][3]), delete this.tebakkimia[id]) : similarity(m.text.toLowerCase(), json.unsur.toLowerCase().trim()) >= .72 ? m.reply("❗ *Dikit Lagi!*") : await this.reply(m.chat, "❌ *Salah!*", m);
  }
  return !0;
}
export const exp = 0;
const buttontebakkimia = [
  ["tebakkimia", "/tebakkimia"]
];