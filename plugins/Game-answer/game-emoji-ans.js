import similarity from "similarity";
const threshold = .72;
export async function before(m) {
  let id = m.chat;
  if (!m.quoted || !m.quoted?.fromMe || !m.quoted?.isBaileys || !m.text || !/Ketik.*hemo/i.test(m.quoted?.text) || /.*hemo/i.test(m.text)) return !0;
  if (this.tebakemoji = this.tebakemoji ? this.tebakemoji : {}, !(id in this.tebakemoji)) return await this.reply(m.chat, "Soal itu telah berakhir", m);
  if (m.quoted?.id === this.tebakemoji[id][0]?.id) {
    if (/^((me)?nyerah|surr?ender)$/i.test(m.text)) return clearTimeout(this.tebakemoji[id][3]),
      delete this.tebakemoji[id], await this.reply(m.chat, "*Yah Menyerah :( !*", m);
    let json = JSON.parse(JSON.stringify(this.tebakemoji[id][1]));
    m.text.toLowerCase() === json.unicodeName.toLowerCase().trim() ? (db.data.users[m.sender].exp += this.tebakemoji[id][2], await this.reply(m.chat, `✅ *Benar!*\n+${this.tebakemoji[id][2]} XP`, m), clearTimeout(this.tebakemoji[id][3]), delete this.tebakemoji[id]) : similarity(m.text.toLowerCase(), json.unicodeName.toLowerCase().trim()) >= .72 ? m.reply("❗ *Dikit Lagi!*") : await this.reply(m.chat, "❌ *Salah!*", m);
  }
  return !0;
}
export const exp = 0;
const buttontebakemoji = [
  ["tebakemoji", "/tebakemoji"]
];