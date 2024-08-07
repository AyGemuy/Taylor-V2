import {
  family100
} from "@bochilteam/scraper";
const winScore = 4999;
async function handler(m) {
  let imgr = flaaa.getRandom();
  this.familygame = this.familygame ? this.familygame : {};
  let id = "family100_" + m.chat;
  if (id in this.familygame) return await conn.reply(m.chat, "Masih ada kuis yang belum terjawab di chat ini", this.familygame[id].msg), !1;
  const json = await family100();
  let caption = `\n*Soal:* ${json.soal}\nTerdapat *${json.jawaban.length}* jawaban${json.jawaban.find(v => v.includes(" ")) ? "\n(beberapa jawaban terdapat spasi)\n" : ""}\n+4999 XP tiap jawaban benar\n    `.trim();
  this.familygame[id] = {
    id: id,
    msg: await this.sendFile(m.chat, imgr + "Family100", "", caption, m),
    ...json,
    terjawab: Array.from(json.jawaban, () => !1),
    winScore: 4999
  };
}
handler.help = ["family100"], handler.tags = ["game"], handler.command = /^family100$/i;
export default handler;