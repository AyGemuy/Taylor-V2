import fetch from "node-fetch";
let timeout = 12e4,
  poin = (Math.random() * 5001 + 5e3) | 0;
const handler = async (m, { conn, command, usedPrefix }) => {
  let imgr = flaaa.getRandom();
  db.data.game.tebaksurah = db.data.game.tebaksurah
    ? db.data.game.tebaksurah
    : {};
  let id = m.chat;
  if (id in db.data.game.tebaksurah)
    return (
      await conn.reply(
        m.chat,
        "Masih ada soal belum terjawab di chat ini",
        db.data.game.tebaksurah[id][0],
      ),
      !1
    );
  let res = await fetch(
    "https://api.alquran.cloud/v1/ayah/" + (6236).getRandom() + "/ar.alafasy",
  );
  if (200 !== res.status) return await res.text();
  let result = await res.json(),
    json = result.data;
  if ("200" === result.code) {
    let caption = `*\`🕹️ GAME - ${command.toUpperCase()}\`*

*Soal:*
- Number in surah ${json.numberInSurah}
- Edition name ${json.edition.name}
*Clue:*
- ${"```" + json.surah.englishName.replace(/[AIUEOaiueo]/gi, "_") + "```"}

*Hadiah:* ${poin} XP  
*Waktu:* ${(timeout / 1e3).toFixed(2)} detik

Balas pesan ini untuk menjawab!`,
      captu = `\n*${json.surah.englishName}*\n\n*INFORMATION*\nSurah Number: ${json.surah.number}\nSurah Name: ${json.surah.name} ${json.surah.englishName}\nEng Name: ${json.surah.englishNameTranslation}\nNumber Of Ayahs: ${json.surah.numberOfAyahs}\nType: ${json.surah.revelationType}\n`;
    (db.data.game.tebaksurah[id] = [
      await conn.reply(m.chat, caption, m, {
        contextInfo: {
          mentionedJid: [m.sender],
        },
      }),
      json,
      poin,
      setTimeout(async () => {
        db.data.game.tebaksurah[id] &&
          (await conn.reply(
            m.chat,
            `*\`❌ TIMEOUT - ${command.toUpperCase()}\`*
Jawabannya adalah ${captu}`,
            db.data.game.tebaksurah[id][0],
          )),
          delete db.data.game.tebaksurah[id];
      }, timeout),
    ]),
      await conn.sendFile(m.chat, json.audio, "coba-lagi.mp3", "", m);
  } else
    "404" === result.code &&
      m.reply(`*Ulangi! Command ${usedPrefix + command} Karena ${json.data}*`);
};
(handler.help = ["tebaksurah"]),
  (handler.tags = ["game"]),
  (handler.command = /^tebaksurah/i);
export default handler;
const buttons = [
  ["Hint", "/hsur"],
  ["Nyerah", "menyerah"],
];
