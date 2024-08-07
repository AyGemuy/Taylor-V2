import similarity from "similarity";
const threshold = .72;
export async function before(m) {
  let id = m.chat;
  if (!m.quoted || !m.quoted?.fromMe || !m.quoted?.isBaileys || !m.text || !/Ketik.*hteb/i.test(m.quoted?.text) || /.*hteb/i.test(m.text)) return !0;
  if (this.tebaktebakan = this.tebaktebakan ? this.tebaktebakan : {}, !(id in this.tebaktebakan)) return await this.reply(m.chat, "Soal itu telah berakhir", m);
  if (m.quoted?.id === this.tebaktebakan[id][0]?.id) {
    if (/^((me)?nyerah|surr?ender)$/i.test(m.text)) return clearTimeout(this.tebaktebakan[id][3]),
      delete this.tebaktebakan[id], await this.reply(m.chat, "*Yah Menyerah :( !*", m);
    let json = JSON.parse(JSON.stringify(this.tebaktebakan[id][1]));
    m.text.toLowerCase() === json.jawaban.toLowerCase().trim() ? (db.data.users[m.sender].exp += this.tebaktebakan[id][2], await this.reply(m.chat, `✅ *Benar!*\n+${this.tebaktebakan[id][2]} XP`, m), clearTimeout(this.tebaktebakan[id][3]), delete this.tebaktebakan[id]) : similarity(m.text.toLowerCase(), json.jawaban.toLowerCase().trim()) >= .72 ? m.reply("❗ *Dikit Lagi!*") : await this.reply(m.chat, "❌ *Salah!*", m);
  }
  return !0;
}
export const exp = 0;
const buttontebaktebakan = [
  ["tebaktebakan", "/tebaktebakan"]
];