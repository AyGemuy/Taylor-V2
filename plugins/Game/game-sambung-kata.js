import {
  readFileSync
} from "fs";
const handler = async (m, {
  conn,
  command,
  text
}) => {
  try {
    let imgr = flaaa.getRandom();
    let database = db.data.database.sambungkata;
    database.kata = JSON.parse(readFileSync("./json/game/kata.json"));
    const kbbi = database.kata || JSON.parse(readFileSync("./json/game/kata.json"));
    if (/help/.test(text)) {
      return m.reply(`
┌「 *Sambung Kata* 」
├ Sambung Kata adalah
│ permainan yang dimana setiap
│ pemainnya diharuskan membuat
│ kata dari akhir kata yang
│ berasal dari kata sebelumnya.
└────
┌「 *Peraturan* 」
├ Jawaban kata tidak mengandung
│ spasi dan imbuhan (me-, -an, dll).
├ .skata
│ untuk memulai
├ ketik *nyerah*
│ untuk menyerah
├ berhasil menjawab
│ mendapatkan 100 XP
└────`.trim());
    }
    database.skata = database.skata || {};
    let id = m.chat;
    if (!text) return m.reply("Input kata awal");
    if (id in database.skata) return await conn.reply(m.chat, "^ Soal ini belum terjawab!", database.skata[id][0]);
    let huruf = "abcdefghijklmnpqrstuw" [Math.floor(Math.random() * 20)];
    let res = kbbi.filter(v => v.startsWith(huruf));
    let kata = res[Math.floor(Math.random() * res.length)];
    database.skata[id] = [await conn.sendFile(m.chat, `${imgr}${command}`, "", `*Mulai dari kata:* ${kata.toUpperCase()}\n\n*Awalan:* ${kata.slice(-1).toUpperCase()}... ?\n\n*Balas pesan ini untuk menjawab!*`, m), kata.toLowerCase(), []];
  } catch (err) {
    console.error(err);
    m.reply("Terjadi kesalahan, coba lagi nanti.");
  }
};
handler.help = ["sambungkata [help]"];
handler.tags = ["game"];
handler.command = /^s(ambung)?kata$/i;
handler.limit = true;
export default handler;