const handler = async (m, {
  conn,
  text
}) => {
  db.data.users[m.sender];
  const hargaPremium = {
      1: 1e4,
      2: 2e4,
      3: 5e4,
      4: 1e5
    },
    input = text.trim();
  if (!/^[1-4]$/.test(input)) return await conn.reply(m.chat, `Silakan pilih angka sesuai daftar berikut:\n\n${Object.entries(hargaPremium).map(([ key, harga ]) => `*${key}*. Untuk *${key} hari* total *Rp.${harga.toLocaleString()}*`).join("\n")}`, m);
  const harga = hargaPremium[input];
  if (!harga) return await conn.reply(m.chat, "🚫 *Pilihan harga tidak valid.* 🚫", m);
  let {
    key
  } = await conn.reply(m.chat, `\n🌟 *Keanggotaan Premium* 🌟\n\nTingkatkan keanggotaan premium dan nikmati manfaat eksklusif!\n\n💰 *Harga:* *Rp.${harga.toLocaleString()}*\n\nBalas dengan *Y* untuk meningkatkan keanggotaan premium atau *N* untuk membatalkan.\n  `, m);
  conn.buyprem[m.chat] = {
    list: input,
    hargaPremium: hargaPremium,
    key: key,
    timeout: setTimeout(() => {
      conn.sendMessage(m.chat, {
        delete: key
      }), delete conn.buyprem[m.chat];
    }, 6e4)
  };
};
handler.before = async (m, {
  conn
}) => {
  if (conn.buyprem = conn.buyprem || {}, m.isBaileys || !(m.chat in conn.buyprem)) return;
  let user = db.data.users[m.sender];
  const input = m.text.trim().toUpperCase();
  if (!/^[YN]$/i.test(input)) return;
  const {
    list,
    key,
    hargaPremium,
    timeout
  } = conn.buyprem[m.chat], harga = hargaPremium[list];
  if (m.quoted && m.quoted?.id === key.id && m.text)
    if ("Y" === input) {
      if (user.money < harga) return await conn.reply(m.chat, "🚫 *Anda membutuhkan setidaknya 10000 uang untuk menjadi pengguna premium.* 🚫", m);
      user.money -= harga;
      var jumlahHari = 864e5 * list,
        now = 1 * new Date();
      user.premiumTime = user.premiumTime || now, user.premiumTime += jumlahHari, user.premium || (user.premium = !0);
      let message = user.premium ? `🌟 *Selamat! Jumlah hari premium bertambah.* 🌟\n⏳ *Countdown:* ${getCountdownText(now, user.premiumTime)}` : `🎉 *Selamat! Anda sekarang pengguna premium.* 🎉\n⏳ *Countdown:* ${getCountdownText(now, user.premiumTime)}`;
      await conn.reply(m.chat, message, m), conn.sendMessage(m.chat, {
        delete: key
      }), clearTimeout(timeout), delete conn.buyprem[m.chat];
    } else "N" === input && (await conn.reply(m.chat, "✅ *Anda telah membatalkan peningkatan premium.* ✅", m), conn.sendMessage(m.chat, {
      delete: key
    }), clearTimeout(timeout), delete conn.buyprem[m.chat]);
}, handler.help = ["buyprem"], handler.tags = ["owner"], handler.command = /^buyprem$/i;
export default handler;

function getCountdownText(now, premiumTime) {
  let remainingTime = premiumTime - now,
    days = Math.floor(remainingTime / 864e5),
    hours = Math.floor(remainingTime % 864e5 / 36e5),
    minutes = Math.floor(remainingTime % 36e5 / 6e4),
    seconds = Math.floor(remainingTime % 6e4 / 1e3),
    countdownText = "";
  return days > 0 && (countdownText += `${days} hari `), hours > 0 && (countdownText += `${hours} jam `),
    minutes > 0 && (countdownText += `${minutes} menit `), seconds > 0 && (countdownText += `${seconds} detik`),
    countdownText.trim();
}