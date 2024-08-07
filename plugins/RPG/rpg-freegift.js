function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
const handler = async (m, {
  conn,
  args,
  usedPrefix
}) => {
  const user = db.data.users[m.sender],
    lastgiftTime = user.lastgift || 0,
    currentTime = new Date().getTime();
  if (conn.freegift = conn.freegift || {}, currentTime - lastgiftTime < 36e5) {
    const remainingTime = getRemainingTime(36e5 - (currentTime - lastgiftTime));
    return await conn.reply(m.chat, `⏰ Maaf, kamu harus menunggu ${remainingTime} lagi sebelum menggunakan FreeGift lagi!`, m);
  }
  const today = new Date().toLocaleDateString();
  let freegift = conn.freegift[m.sender] || (conn.freegift[m.sender] = {
    code: [],
    time: today
  });
  if (!args[0]) return await conn.reply(m.chat, `❓ Kamu belum memasukkan Kode FreeGiftmu!\n\nContoh: *${usedPrefix}freegift code*`, m);
  if (!freegift.code.filter(code => args[0] === code).length) {
    const remainingTime = getRemainingTime(36e5);
    return await conn.reply(m.chat, `Maaf, kode FreeGift tidak valid atau sudah digunakan. Silahkan coba lagi setelah ${remainingTime}!`, m);
  }
  const rewards = shuffle([{
    text: "💠 XP",
    value: Math.min(Math.floor(1e4 * Math.random()), 1e4)
  }, {
    text: "🎫 Limit",
    value: Math.min(Math.floor(5 * Math.random()) + 1, 5)
  }, {
    text: "💹 Money",
    value: Math.min(Math.floor(1e4 * Math.random()), 1e4)
  }, {
    text: "🥤 Potion",
    value: Math.min(Math.floor(5 * Math.random()) + 1, 5)
  }]);
  await conn.reply(m.chat, `*🎉 SELAMAT!*\nKamu telah mendapatkan:\n${rewards.map(r => `${r.text}: ${r.value}`).join("\n")}`, m),
    user.exp += rewards.find(r => "💠 XP" === r.text).value, user.limit += rewards.find(r => "🎫 Limit" === r.text).value,
    user.money += rewards.find(r => "💹 Money" === r.text).value, user.potion += rewards.find(r => "🥤 Potion" === r.text).value,
    freegift.code = freegift.code.filter(code => code !== args[0]), user.lastgift = currentTime,
    setTimeout(async () => await conn.reply(m.chat, "⏰ Waktunya menggunakan FreeGift lagi!\nKetik *freegift* untuk mendapatkan hadiah spesial.", m), 36e5);
};
handler.help = ["freegift <kode>"], handler.tags = ["rpg"], handler.command = /^freegift$/i;
export default handler;

function getRemainingTime(ms) {
  const hours = Math.floor(ms / 36e5),
    minutes = Math.floor(ms % 36e5 / 6e4);
  return `${hours > 0 ? `${hours} jam ` : ""}${minutes > 0 ? `${minutes} menit` : ""}`.trim();
}