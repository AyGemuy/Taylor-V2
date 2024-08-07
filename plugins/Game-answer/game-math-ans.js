let handler = m => m;
handler.before = async function(m) {
  if (!/^-?[0-9]+(\.[0-9]+)?$/.test(m.text)) return !0;
  let id = m.chat;
  if (!(m.quoted && m.quoted?.fromMe && m.text && /^Berapa hasil dari/i.test(m.quoted?.text))) return !0;
  if (this.math = this.math ? this.math : {}, !(id in this.math)) return await this.reply(m.chat, "Soal itu telah berakhir", m);
  if (m.quoted?.id === this.math[id][0]?.id) {
    let math = JSON.parse(JSON.stringify(this.math[id][1]));
    m.text === math.result ? (db.data.users[m.sender].exp += math.bonus, clearTimeout(this.math[id][3]), delete this.math[id], await this.reply(m.chat, `✅ *Benar!*\n+${math.bonus} XP`, m)) : 0 == --this.math[id][2] ? (clearTimeout(this.math[id][3]), delete this.math[id], await this.reply(m.chat, `❗ *Kesempatan habis!*\nJawaban: *${math.result}*`, m)) : m.reply(`❌ *Jawaban Salah!*\nMasih ada ${this.math[id][2]} kesempatan`);
  }
  return !0;
};
export default handler;