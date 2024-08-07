import similarity from "similarity";
const threshold = .72;
export async function before(m) {
  let id = m.chat;
  if (!m.quoted || !m.quoted?.fromMe || !m.quoted?.isBaileys || !m.text || !/Ketik.*hsi/i.test(m.quoted?.text) || /.*hsi/i.test(m.text)) return !0;
  if (this.siapakahaku = this.siapakahaku ? this.siapakahaku : {}, !(id in this.siapakahaku)) return await this.reply(m.chat, "Soal itu telah berakhir", m);
  if (m.quoted?.id === this.siapakahaku[id][0]?.id) {
    if (/^((me)?nyerah|surr?ender)$/i.test(m.text)) return clearTimeout(this.siapakahaku[id][3]),
      delete this.siapakahaku[id], await this.reply(m.chat, "*Yah Menyerah :( !*", m);
    let json = JSON.parse(JSON.stringify(this.siapakahaku[id][1]));
    m.text.toLowerCase() === json.jawaban.toLowerCase().trim() ? (db.data.users[m.sender].exp += this.siapakahaku[id][2], await this.reply(m.chat, `✅ *Benar!*\n+${this.siapakahaku[id][2]} XP`, m), clearTimeout(this.siapakahaku[id][3]), delete this.siapakahaku[id]) : similarity(m.text.toLowerCase(), json.jawaban.toLowerCase().trim()) >= .72 ? m.reply("❗ *Dikit Lagi!*") : await this.reply(m.chat, "❌ *Salah!*", m);
  }
  return !0;
}
export const exp = 0;
const buttonsiapakahaku = [
  ["siapakahaku", "/siapakahaku"]
];