const handler = async (m, {
  conn,
  usedPrefix,
  participants
}) => {
  conn.level = db.data.users[m.sender], conn.fight = conn.fight ? conn.fight : {};
  if (void 0 !== conn.fight[m.sender] && !0 === conn.fight[m.sender]) return m.reply("*Tidak bisa melakukan pertarungan lagi karena anda sedang bertarung bro.*");
  let users = participants.map(u => u.id);
  var lawan;
  for (lawan = users[Math.floor(users.length * Math.random())]; void 0 === db.data.users[lawan] || lawan === m.sender;) lawan = users[Math.floor(users.length * Math.random())];
  let lamaPertarungan = getRandom(5, 15);
  var time;
  m.reply(`*Kamu* (level ${db.data.users[m.sender].level}) menantang *${conn.getName(lawan)}* (level ${db.data.users[lawan].level}) dan sedang dalam pertarungan sengit.\n\nTunggu ${lamaPertarungan} menit lagi dan lihat siapa yg menang.`),
    conn.fight[m.sender] = !0, await (time = 6e4 * lamaPertarungan, new Promise(res => setTimeout(res, time)));
  let alasanKalah = ["Noob", "Cupu", "Kurang hebat", "Ampas kalahan", "Gembel kalahan"],
    alasanMenang = ["Hebat", "Pro", "Master Game", "Legenda game", "Sangat Pro", "Rajin Nge-push"],
    kesempatan = [];
  for (i = 0; i < db.data.users[m.sender].level; i++) kesempatan.push(m.sender);
  for (i = 0; i < db.data.users[lawan].level; i++) kesempatan.push(lawan);
  let pointPemain = 0,
    pointLawan = 0;
  for (i = 0; i < 10; i++) unggul = getRandom(0, kesempatan.length - 1), kesempatan[unggul] === m.sender ? pointPemain += 1 : pointLawan += 1;
  if (pointPemain > pointLawan) {
    let hadiah = 1e4 * (pointPemain - pointLawan);
    db.data.users[m.sender].money += hadiah, db.data.users[m.sender].tiketcoin += 1,
      m.reply(`*${conn.getName(m.sender)}* [${10 * pointPemain}] - [${10 * pointLawan}] *${conn.getName(lawan)}*\n\n*Kamu* (level ${db.data.users[m.sender].level}) MENANG melawan *${conn.getName(lawan)}* (level ${db.data.users[lawan].level}) karena kamu ${alasanMenang[getRandom(0, alasanMenang.length - 1)]}\n\nHadiah Rp. ${hadiah.toLocaleString()}\n+1 Tiketcoin`);
  } else if (pointPemain < pointLawan) {
    let denda = 1e5 * (pointLawan - pointPemain);
    db.data.users[m.sender].money -= denda, db.data.users[m.sender].tiketcoin += 1,
      m.reply(`*${conn.getName(m.sender)}* [${10 * pointPemain}] - [${10 * pointLawan}] *${conn.getName(lawan)}*\n\n*Kamu* (level ${db.data.users[m.sender].level}) KALAH melawan *${conn.getName(lawan)}* (level ${db.data.users[lawan].level}) karena kamu ${alasanKalah[getRandom(0, alasanKalah.length - 1)]}\n\nUang kamu berkurang Rp. ${denda.toLocaleString()}\n+1 Tiketcoin`);
  } else m.reply(`*${conn.getName(m.sender)}* [${10 * pointPemain}] - [${10 * pointLawan}] *${conn.getName(lawan)}*\n\nHasil imbang kak, ga dapet apa apa 😂`);
  delete conn.fight[m.sender];
};
handler.help = ["fighting Masih Eror Kak"], handler.tags = ["game"], handler.command = /^(fight(ing)?)$/i,
  handler.owner = !0, handler.group = !0;
export default handler;

function getRandom(min, max) {
  return min = Math.ceil(min), max = Math.floor(max), Math.floor(Math.random() * (max - min + 1)) + min;
}