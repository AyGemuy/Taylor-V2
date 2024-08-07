import moment from "moment-timezone";
const zodiacSigns = [{
  name: "Capricorn",
  symbol: "♑",
  start: [12, 22],
  end: [1, 19]
}, {
  name: "Aquarius",
  symbol: "♒",
  start: [1, 20],
  end: [2, 18]
}, {
  name: "Pisces",
  symbol: "♓",
  start: [2, 19],
  end: [3, 20]
}, {
  name: "Aries",
  symbol: "♈",
  start: [3, 21],
  end: [4, 19]
}, {
  name: "Taurus",
  symbol: "♉",
  start: [4, 20],
  end: [5, 20]
}, {
  name: "Gemini",
  symbol: "♊",
  start: [5, 21],
  end: [6, 20]
}, {
  name: "Cancer",
  symbol: "♋",
  start: [6, 21],
  end: [7, 22]
}, {
  name: "Leo",
  symbol: "♌",
  start: [7, 23],
  end: [8, 22]
}, {
  name: "Virgo",
  symbol: "♍",
  start: [8, 23],
  end: [9, 22]
}, {
  name: "Libra",
  symbol: "♎",
  start: [9, 23],
  end: [10, 22]
}, {
  name: "Scorpio",
  symbol: "♏",
  start: [10, 23],
  end: [11, 21]
}, {
  name: "Sagittarius",
  symbol: "♐",
  start: [11, 22],
  end: [12, 21]
}, {
  name: "Capricorn",
  symbol: "♑",
  start: [12, 22],
  end: [1, 19]
}];
const handler = async (m, {
  text
}) => {
  try {
    if (!text) throw `Contoh penggunaan: .zodiak 2002 02 25`;
    const [year, month, day] = text.split(" ").map(Number);
    if (isNaN(year) || isNaN(month) || isNaN(day) || month < 1 || month > 12 || day < 1 || day > 31) {
      throw `Tanggal tidak valid: ${text}`;
    }
    const date = moment.tz([year, month - 1, day], "Asia/Jakarta");
    if (!date.isValid()) throw `Tanggal tidak valid: ${text}`;
    const now = moment.tz("Asia/Jakarta");
    const birthFormatted = date.isValid() ? date.format("DD MMMM YYYY") : "Tidak diketahui";
    const age = date.isValid() ? now.diff(date, "years") : "Tidak diketahui";
    const nextBirthday = date.year(now.year());
    if (nextBirthday.isBefore(now, "day")) nextBirthday.add(1, "year");
    const nextBirthdayFormatted = nextBirthday.isValid() ? nextBirthday.format("DD MMMM YYYY") : "Tidak diketahui";
    const daysUntilNextBirthday = nextBirthday.isValid() ? nextBirthday.diff(now, "days") : "Tidak diketahui";
    const monthsUntilNextBirthday = daysUntilNextBirthday !== "Tidak diketahui" ? Math.floor(daysUntilNextBirthday / 30) : "Tidak diketahui";
    const daysRemaining = daysUntilNextBirthday !== "Tidak diketahui" ? daysUntilNextBirthday % 30 : "Tidak diketahui";
    const zodiac = zodiacSigns.find(sign => month === sign.start[0] && day >= sign.start[1] || month === sign.end[0] && day <= sign.end[1] || month > sign.start[0] && month < sign.end[0] || sign.start[0] > sign.end[0] && (month === sign.start[0] && day >= sign.start[1] || month === sign.end[0] && day <= sign.end[1])) || {
      name: "Tidak diketahui",
      symbol: ""
    };
    const zodiacName = zodiac.name || "Tidak diketahui";
    const zodiacSymbol = zodiac.symbol || "";
    const isBirthdayToday = date.isSame(now, "day");
    const cekusia = isBirthdayToday ? `🎉 *Selamat ulang tahun yang ke-${age}* 🎂` : `*${age}* tahun`;
    const teks = `
*乂  Z O D I A C*

- 🎟️ *Nama :* _${m.name || m.sender.split("@")[0] || "Tidak diketahui"}_
- 📅 *Tanggal Lahir :* _${birthFormatted}_
- 🎂 *Ultah Mendatang :* _${nextBirthdayFormatted}_
- 📆 *Ultah :* _${monthsUntilNextBirthday !== "Tidak diketahui" ? `${monthsUntilNextBirthday} bulan ${daysRemaining} hari lagi` : "Tidak diketahui"}_
- 🗓️ *Umur :* _${cekusia}_
- 🔮 *Zodiak :* _${zodiacName} ${zodiacSymbol}_
`.trim();
    m.reply(teks);
  } catch (e) {
    m.reply(`⚠️ *Terjadi kesalahan:* ${e.message || e}`);
  }
};
handler.help = ["zodiak *tahun bulan tanggal*"];
handler.tags = ["tools"];
handler.command = /^zodia[kc]$/i;
export default handler;