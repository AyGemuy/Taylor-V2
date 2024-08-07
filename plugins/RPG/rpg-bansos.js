import fetch from "node-fetch";
import fs from "fs";
const handler = async (m, {
  conn,
  args,
  usedPrefix,
  DevMode
}) => {
  try {
    let u = db.data.users[m.sender];
    u.lastbansos = u.lastbansos || 0;
    let Aku = `${Math.floor(101 * Math.random())}`.trim(),
      Kamu = `${Math.floor(81 * Math.random())}`.trim(),
      A = 1 * Aku,
      K = 1 * Kamu,
      kb = "https://telegra.ph/file/afcf9a7f4e713591080b5.jpg",
      mb = "https://telegra.ph/file/d31fcc46b09ce7bf236a7.jpg",
      t = new Date() - u.lastbansos,
      timers = clockString(6048e5 - t);
    t > 3e5 ? A > K ? (await conn.sendFile(m.chat, kb, "b.jpg", "*Kamu Tertangkap!* Korupsi dana bansos 🕴️💰, Denda *3 Juta* rupiah 💵", m), u.money -= 3e6, u.lastbansos = 1 * new Date()) : A < K ? (u.money += 3e6, await conn.sendFile(m.chat, mb, "b.jpg", "*Berhasil Korupsi!* Dana bansos 🕴️💰, Dapatkan *3 Juta* rupiah 💵", m), u.lastbansos = 1 * new Date()) : (await conn.reply(m.chat, "*Maaf!* Kamu tidak berhasil melakukan korupsi bansos dan kamu tidak akan masuk penjara karena kamu *melarikan diri* 🏃", m), u.lastbansos = 1 * new Date()) : await conn.reply(m.chat, `*Sudah Melakukan Korupsi!* 💰\nHarus menunggu selama agar bisa korupsi bansos kembali\n▸ 🕓 ${timers}`, m);
  } catch (e) {
    throw "Terjadi kesalahan";
  }
};
handler.help = ["bansos"], handler.tags = ["rpg"], handler.command = /^(bansos|korupsi)$/i,
  handler.group = !0;
export default handler;

function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)];
}

function clockString(ms) {
  return ["\n*" + (isNaN(ms) ? "--" : Math.floor(ms / 864e5)) + "* _Hari_ ☀️\n ", "*" + (isNaN(ms) ? "--" : Math.floor(ms / 36e5) % 24) + "* _Jam_ 🕐\n ", "*" + (isNaN(ms) ? "--" : Math.floor(ms / 6e4) % 60) + "* _Menit_ ⏰\n ", "*" + (isNaN(ms) ? "--" : Math.floor(ms / 1e3) % 60) + "* _Detik_ ⏱️ "].map(v => v.toString().padStart(2, 0)).join("");
}