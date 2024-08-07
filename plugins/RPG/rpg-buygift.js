const handler = async (m, {
  conn,
  args,
  usedPrefix
}) => {
  const user = db.data.users[m.sender];
  if (1 !== args.length || isNaN(args[0])) return await conn.reply(m.chat, `❓ Masukkan total jumlah gift yang ingin kamu beli.\nContoh: *${usedPrefix}buygift 2*`, m);
  const total = parseInt(args[0]);
  if (total < 1 || total > 10) return await conn.reply(m.chat, "❌ Maaf, kamu hanya bisa membeli 1 hingga 10 gift sekaligus.", m);
  const totalPrice = 1e3 * total;
  if (user.money < totalPrice) return await conn.reply(m.chat, `❌ Maaf, uangmu tidak cukup untuk membeli ${total} gift.\nTotal biaya: ${totalPrice} Uang\nUang kamu saat ini: ${user.money} Uang`, m);
  let giftCodes = [];
  for (let i = 0; i < total; i++) {
    const giftCode = generateGiftCode();
    giftCodes.push(giftCode);
  }
  conn.freegift || (conn.freegift = {}), conn.freegift[m.sender] = {
    ...conn.freegift[m.sender] || {},
    code: conn.freegift[m.sender].code ? conn.freegift[m.sender].code.concat(giftCodes) : giftCodes
  }, user.money -= totalPrice, await conn.reply(m.chat, `🎁 Kamu telah membeli ${total} gift dengan total ${totalPrice} Uang.\n\nKode Gift mu dengan urutan angka:\n${giftCodes.map((code, index) => `${index + 1}. ${code}`).join("\n")}`, m);
};
handler.help = ["buygift <total>"], handler.tags = ["rpg"], handler.command = /^buygift$/i;
export default handler;

function generateGiftCode() {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let code = "";
  for (let i = 0; i < 5; i++) {
    const randomIndex = Math.floor(36 * Math.random());
    code += characters.charAt(randomIndex);
  }
  return code;
}