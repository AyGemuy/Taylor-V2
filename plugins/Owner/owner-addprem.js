import { clockString } from "../../lib/other-function.js";
const handler = async (m, { conn, text, usedPrefix, command }) => {
  try {
    let who = m.isGroup
      ? m.mentionedJid[0]
        ? m.mentionedJid[0]
        : m.quoted && m.quoted.sender
      : null;
    let txt = text.replace(usedPrefix + command, "");
    if (!who && !txt) {
      return m.reply("⚠️ *Error:* Mohon tag atau sebutkan seseorang.");
    }
    if (!who) {
      let parts = txt.split(" ");
      if (parts.length < 2) {
        return m.reply("⚠️ *Error:* Mohon sebutkan jumlah hari.");
      }
      who = parts[0].replace(/[^0-9+]/g, "");
      if (!who.startsWith("+")) {
        who = "+" + who;
      }
      if (!who.endsWith("@s.whatsapp.net")) {
        who += "@s.whatsapp.net";
      }
      txt = parts[1];
    } else {
      txt = txt.replace("@" + who.split("@")[0], "");
    }
    let jumlahHari = parseInt(txt);
    if (isNaN(jumlahHari)) {
      return m.reply(
        `⚠️ *Error:* Hanya angka yang diterima.\n\nContoh:\n${usedPrefix + command} @${m.sender.split("@")[0]} 7`,
      );
    }
    let user = db.data.users[who] || {
      premiumTime: 0,
      premium: false,
    };
    let now = Date.now();
    if (now < user.premiumTime) {
      user.premiumTime += now + jumlahHari * 864e5;
    } else {
      user.premiumTime += now + jumlahHari * 864e5;
    }
    user.premium = true;
    let memprems = Object.keys(db.data.users).filter(
      (key) => db.data.users[key].premium,
    );
    prems = [
      ...new Set([
        ...prems.map((v) => v.split("@")[0]),
        ...memprems.map((v) => v.split("@")[0]),
      ]),
    ];
    let idUser = who.split("@")[0];
    m.reply(
      `✔️ *Berhasil*\n\n📛 *Nama:* ${user.name || "Tidak terdaftar"}\n📆 *Hari:* ${jumlahHari} hari\n📉 *Hitung Mundur:* ${clockString(user.premiumTime - now)}`,
    );
    db.data.users[idUser] = user;
  } catch (error) {
    m.reply(`❌ *Terjadi kesalahan:* ${error}`);
  }
};
handler.help = ["addprem [@user] <days>"];
handler.tags = ["owner"];
handler.command = /^(add|tambah|\+)p(rem)?$/i;
handler.rowner = true;
export default handler;
