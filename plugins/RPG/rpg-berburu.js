const handler = async (m, {
  conn
}) => {
  let lastHuntTime = db.data.users[m.sender].lastberburu || 0;
  if (new Date() - lastHuntTime < 864e5) {
    let remainingTime = clockString(864e5 - (new Date() - lastHuntTime));
    return void m.reply(`⏳ Mohon tunggu sebentar sebelum dapat berburu lagi.\n\n*Waktu Tersisa:*${remainingTime}`);
  }
  let habitats = {
      "Hutan 🌿": ["🐃 Banteng", "🐅 Harimau", "🐐 Kambing", "🐒 Monyet", "🐗 Babihutan", "🐖 Babi"],
      "Sabana 🦁": ["🐘 Gajah", "🐐 Kambing", "🐄 Sapi", "🐖 Babi"],
      "Taman Panda 🐼": ["🐼 Panda"],
      "Danau 🐊": ["🐊 Buaya", "🐄 Sapi", "🐖 Babi"],
      "Lembah 🐂": ["🐂 Kerbau", "🐄 Sapi", "🐖 Babi"],
      "Kebun 🐔": ["🐔 Ayam"]
    },
    results = {},
    senderName = conn.getName(m.sender);
  m.reply(`🏞️ *${senderName} Sedang Berburu 🌿*\n\n`), setTimeout(async () => {
    let habitatNames = Object.keys(habitats),
      habitatResults = await Promise.all(habitatNames.map(async habitat => {
        let res = `*${habitat}*\n`;
        for (let animal of habitats[habitat]) {
          let count = Math.floor(100 * Math.random()) + 1;
          res += `${animal}: ${count} ekor\n`;
          let animalName = animal.split(" ")[1].toLowerCase();
          results[animalName] || (results[animalName] = 0), results[animalName] += count;
        }
        return res + "\n";
      })),
      res = `*🏞️ HASIL BERBURU ${senderName} 🏞️*\n\n`;
    res += habitatResults.join("") + `*${author}* 🏕️`;
    let user = db.data.users[m.sender];
    for (let animal in results) user[animal] = (user[animal] || 0) + results[animal];
    await conn.reply(m.chat, res, null), user.lastberburu = new Date().getTime();
  }, 5e3);
};
handler.help = ["berburu"], handler.tags = ["rpg"], handler.command = /^(berburu)$/i,
  handler.group = !0;
export default handler;

function clockString(ms) {
  return ["\n" + (isNaN(ms) ? "--" : Math.floor(ms / 864e5)), " *Hari ☀️*\n ", isNaN(ms) ? "--" : Math.floor(ms / 36e5) % 24, " *Jam 🕐*\n ", isNaN(ms) ? "--" : Math.floor(ms / 6e4) % 60, " *Menit ⏰*\n ", isNaN(ms) ? "--" : Math.floor(ms / 1e3) % 60, " *Detik ⏱️* "].map(v => v.toString().padStart(2, 0)).join("");
}