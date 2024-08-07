import similarity from "similarity";
import fetch from "node-fetch";
const threshold = .72;
export async function before(m) {
  let id = m.chat;
  if (!m.quoted || !m.quoted?.fromMe || !m.quoted?.isBaileys || !m.text || !/Ketik.*htri/i.test(m.quoted?.text) || /.*htri/i.test(m.text)) return !0;
  if (this.trivias = this.trivias ? this.trivias : {}, !(id in this.trivias)) return await this.reply(m.chat, "Soal itu telah berakhir", m);
  if (m.quoted?.id === this.trivias[id][0]?.id) {
    if (/^((me)?nyerah|surr?ender)$/i.test(m.text)) return clearTimeout(this.trivias[id][3]),
      delete this.trivias[id], await this.reply(m.chat, "*Yah Menyerah :( !*", m);
    let json = JSON.parse(JSON.stringify(this.trivias[id][1])),
      jawaban = await Tr(json.correctAnswer);
    m.text.toLowerCase() === jawaban.toLowerCase().trim() ? (db.data.users[m.sender].exp += this.trivias[id][2], await this.reply(m.chat, `✅ *Benar!*\n+${this.trivias[id][2]} XP`, m), clearTimeout(this.trivias[id][3]), delete this.trivias[id]) : similarity(m.text.toLowerCase(), jawaban.toLowerCase().trim()) >= .72 ? m.reply("❗ *Dikit Lagi!*") : await this.reply(m.chat, "❌ *Salah!*", m);
  }
  return !0;
}
export const exp = 0;
const buttontrivias = [
  ["trivias", "/trivias"]
];
async function Tr(teks) {
  let reis = await fetch("https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=id&dt=t&q=" + teks);
  return (await reis.json())[0][0][0];
}