import fetch from "node-fetch";
import fs from "fs";
const toM = a => "@" + a.split("@")[0],
  getRandomElement = list => list[Math.floor(Math.random() * list.length)],
  handler = async (m, {
    conn,
    groupMetadata,
    usedPrefix,
    text,
    args,
    command
  }) => {
    wm,
    author,
    snh,
    fs.readFileSync("./thumbnail.jpg"),
    flaaa.getRandom();
    try {
      switch (command) {
        case "kapankah":
          m.reply(`\n*Pertanyaan:* ${m.text}\n*Jawaban:* ${getRandomElement([ 10 ])} ${getRandomElement([ "detik", "menit", "jam", "hari", "minggu", "bulan", "tahun", "dekade", "abad" ])} lagi ...\n                `.trim(), null, m.mentionedJid ? {
            mentions: conn.parseMention(m.text)
          } : {});
          break;
        case "akankah":
        case "bisakah":
          m.reply(`\n*Pertanyaan:* ${m.text}\n*Jawaban:* ${getRandomElement([ "Ya", "Mungkin iya", "Mungkin", "Mungkin tidak", "Tidak", "Tidak mungkin" ])}\n                `.trim(), null, m.mentionedJid ? {
            mentions: conn.parseMention(m.text)
          } : {});
          break;
        case "siapakah":
          const participants = groupMetadata.participants.map(v => v.id),
            randomParticipant = getRandomElement(participants);
          m.reply(`${toM(randomParticipant)} Dia bang.🗿`, null, {
            mentions: [randomParticipant]
          });
          break;
        case "mengapa":
          m.reply(`\n*Pertanyaan:* ${m.text}\n*Jawaban:* ${getRandomElement([ "Karena anda ganteng", "Karna lo wibu :[", "karna lo didikan wahyu", "Karna gw gk tau", "Lo punya jin", "Tidak mungkin" ])}\n                `.trim(), null, m.mentionedJid ? {
            mentions: conn.parseMention(m.text)
          } : {});
          break;
        default:
          m.reply("Perintah tidak dikenali.");
      }
    } catch (error) {
      m.reply(`Terjadi kesalahan: ${error.message}`);
    }
  };
handler.command = handler.help = ["kapankah", "akankah", "siapakah", "mengapa", "bisakah"],
  handler.tags = ["kerang"];
export default handler;

function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)];
}