import similarity from "similarity";
const threshold = .72;
export async function before(m) {
  let id = m.chat;
  if (!m.quoted || !m.quoted?.fromMe || !m.quoted?.isBaileys || !m.text || !/Ketik.*hsur/i.test(m.quoted?.text) || /.*hsur/i.test(m.text)) return !0;
  if (this.tebaksurah = this.tebaksurah ? this.tebaksurah : {}, !(id in this.tebaksurah)) return await this.reply(m.chat, "Soal itu telah berakhir", m);
  if (m.quoted?.id === this.tebaksurah[id][0]?.id) {
    if (/^((me)?nyerah|surr?ender)$/i.test(m.text)) return clearTimeout(this.tebaksurah[id][3]),
      delete this.tebaksurah[id], await this.reply(m.chat, "*Yah Menyerah :( !*", m);
    let json = JSON.parse(JSON.stringify(this.tebaksurah[id][1]));
    m.text.toLowerCase() === json.surah.englishName.toLowerCase().trim() ? (db.data.users[m.sender].exp += this.tebaksurah[id][2], await this.reply(m.chat, `✅ *Benar!*\n+${this.tebaksurah[id][2]} XP`, m), clearTimeout(this.tebaksurah[id][3]), delete this.tebaksurah[id]) : similarity(m.text.toLowerCase(), json.surah.englishName.toLowerCase().trim()) >= .72 ? m.reply("❗ *Dikit Lagi!*") : await this.reply(m.chat, "❌ *Salah!*", m);
  }
  return !0;
}
export const exp = 0;
const buttontebaksurah = [
  ["tebaksurah", "/tebaksurah"]
];