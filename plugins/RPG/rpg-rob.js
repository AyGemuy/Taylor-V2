import { clockString } from "../../lib/other-function.js";
const handler = async (m, { conn }) => {
  let user = db.data.users[m.sender],
    timers = clockString(108e5 - (new Date() - user.lastrob));
  if (user.stamina < 20)
    return m.reply(
      "Stamina anda tidak cukup untuk bekerja\nharap isi stamina anda dengan #eat",
    );
  if (user.lastrob > 108e5)
    throw m.reply(
      `Kamu masih kelelahan untuk bekerja\nHarap tunggu ${timers} lagi untuk rob`,
    );
  let ran1 = 1e3 * `${Math.floor(10 * Math.random())}`,
    ran2 = 10 * `${Math.floor(10 * Math.random())}`.trim(),
    hsl = `\n*—[ Hasil rob ]—*\n\n ➕ 💹 Uang = [ ${`${ran1}`} ]\n ➕ ✨ Exp = [ ${`${ran2}`} ] \t\t \n ➕ 📦 Rob Selesai = +1\n\nDan stamina anda berkurang -20\n`;
  (user.money += ran1),
    (user.exp += ran2),
    (user.stamina -= 20),
    setTimeout(() => {
      m.reply(`${hsl}`);
    }, 27e3),
    setTimeout(() => {
      m.reply(
        "\n         🚕\n         \n         \n         \n🏘️\n\n➕ 💹Berhasil kabur....\n",
      );
    }, 25e3),
    setTimeout(() => {
      m.reply("\n🏘️\n\n➕ Merampok....\n");
    }, 2e4),
    setTimeout(() => {
      m.reply("\n🏘️     🚶\n\n➕ Memulai aksi....\n");
    }, 15e3),
    setTimeout(() => {
      m.reply("\n🏘️          🚕\n\n✔️ Mengincar target....\n");
    }, 1e4),
    setTimeout(() => {
      m.reply("🔍Mencari Rumah.....");
    }, 0),
    (user.lastrob = 1 * new Date());
};
(handler.help = ["rob"]),
  (handler.tags = ["rpg"]),
  (handler.command = /^(rob|robery)$/i),
  (handler.group = !0);
export default handler;
