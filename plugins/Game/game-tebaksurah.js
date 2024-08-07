import fetch from "node-fetch";
let timeout = 12e4,
  poin = 4999;
const handler = async (m, {
  conn,
  command,
  usedPrefix
}) => {
  let imgr = flaaa.getRandom();
  conn.tebaksurah = conn.tebaksurah ? conn.tebaksurah : {};
  let id = m.chat;
  if (id in conn.tebaksurah) return await conn.reply(m.chat, "Masih ada soal belum terjawab di chat ini", conn.tebaksurah[id][0]), !1;
  let res = await fetch("https://api.alquran.cloud/v1/ayah/" + 6236..getRandom() + "/ar.alafasy");
  if (200 !== res.status) return await res.text();
  let result = await res.json(),
    json = result.data;
  if ("200" === result.code) {
    let caption = `*${command.toUpperCase()}*\nNumber In Surah: ${json.numberInSurah}\nBy: ${json.edition.name} ${json.edition.englishName}\n\nTimeout *${(timeout / 1e3).toFixed(2)} detik*\nKetik *${usedPrefix}hsur* untuk bantuan\nBonus: ${poin} XP\n*Balas pesan ini untuk menjawab!*`.trim(),
      captu = `\n*${json.surah.englishName}*\n\n*INFORMATION*\nSurah Number: ${json.surah.number}\nSurah Name: ${json.surah.name} ${json.surah.englishName}\nEng Name: ${json.surah.englishNameTranslation}\nNumber Of Ayahs: ${json.surah.numberOfAyahs}\nType: ${json.surah.revelationType}\n`;
    conn.tebaksurah[id] = [await conn.sendFile(m.chat, imgr + command, "", caption, m), json, poin, setTimeout(async () => {
      conn.tebaksurah[id] && await conn.reply(m.chat, `Waktu habis!\nJawabannya adalah ${captu}`, conn.tebaksurah[id][0]),
        delete conn.tebaksurah[id];
    }, timeout)], await conn.sendFile(m.chat, json.audio, "coba-lagi.mp3", "", m);
  } else "404" === result.code && m.reply(`*Ulangi! Command ${usedPrefix + command} Karena ${json.data}*`);
};
handler.help = ["tebaksurah"], handler.tags = ["game"], handler.command = /^tebaksurah/i;
export default handler;
const buttons = [
  ["Hint", "/hsur"],
  ["Nyerah", "menyerah"]
];