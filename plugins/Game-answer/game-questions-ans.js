import similarity from "similarity";
const threshold = .72;
export async function before(m) {
  let id = m.chat;
  if (!m.quoted || !m.quoted?.fromMe || !m.quoted?.isBaileys || !m.text || !/Ketik.*quest/i.test(m.quoted?.text) || /.*quest/i.test(m.text)) return !0;
  if (this.question = this.question ? this.question : {}, !(id in this.question)) return await this.reply(m.chat, "Soal itu telah berakhir", m);
  if (m.quoted?.id === this.question[id][0]?.id) {
    if (/^((me)?nyerah|surr?ender)$/i.test(m.text)) return clearTimeout(this.question[id][3]),
      delete this.question[id], await this.reply(m.chat, "*Yah Menyerah :( !*", m);
    let json = JSON.parse(JSON.stringify(this.question[id][1]));
    m.text.toLowerCase() === json.results[0]?.correct_answer.toLowerCase().trim() ? (db.data.users[m.sender].exp += this.question[id][2], await this.reply(m.chat, `✅ *Benar!*\n+${this.question[id][2]} XP`, m), clearTimeout(this.question[id][3]), delete this.question[id]) : similarity(m.text.toLowerCase(), json.results[0]?.correct_answer.toLowerCase().trim()) >= .72 ? m.reply("❗ *Dikit Lagi!*") : await this.reply(m.chat, "❌ *Salah!*", m);
  }
  return !0;
}
export const exp = 0;
const buttonquestion = [
  ["question", "/question"]
];