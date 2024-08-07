import similarity from "similarity";
const threshold = .72;
export async function before(m) {
  let id = m.chat;
  if (!m.quoted || !m.quoted?.fromMe || !m.quoted?.isBaileys || !m.text || !/Ketik.*hlag/i.test(m.quoted?.text) || /.*hlag/i.test(m.text)) return !0;
  if (this.tebaklagu = this.tebaklagu ? this.tebaklagu : {}, !(id in this.tebaklagu)) return await this.reply(m.chat, "Soal itu telah berakhir", m);
  if (m.quoted?.id === this.tebaklagu[id][0]?.id) {
    if (/^((me)?nyerah|surr?ender)$/i.test(m.text)) return clearTimeout(this.tebaklagu[id][3]),
      delete this.tebaklagu[id], await this.reply(m.chat, "*Yah Menyerah :( !*", m);
    let json = JSON.parse(JSON.stringify(this.tebaklagu[id][1]));
    m.text.toLowerCase() === json.judul.toLowerCase().trim() ? (db.data.users[m.sender].exp += this.tebaklagu[id][2], await this.reply(m.chat, `✅ *Benar!*\n+${this.tebaklagu[id][2]} XP`, m), clearTimeout(this.tebaklagu[id][3]), delete this.tebaklagu[id]) : similarity(m.text.toLowerCase(), json.judul.toLowerCase().trim()) >= .72 ? m.reply("❗ *Dikit Lagi!*") : await this.reply(m.chat, "❌ *Salah!*", m);
  }
  return !0;
}
export const exp = 0;
const buttontebaklagu = [
  ["tebaklagu", "/tebaklagu"]
];