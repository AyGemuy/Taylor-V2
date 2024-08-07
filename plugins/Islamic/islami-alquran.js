import fetch from "node-fetch";
import cheerio from "cheerio";
const handler = async (m, {
  conn,
  args,
  usedPrefix,
  command
}) => {
  try {
    if (args.length < 2 || isNaN(args[0]) || isNaN(args[1])) {
      const surahs = Object.keys(ayatCountData).map(num => [`🔹 Surah ${num}`, `${usedPrefix + command} ${num} 1`]);
      const buttons = conn.ctaButton.setBody("🌐 *Pilih Surah dan Ayat:*").setFooter("⚡ Pilih surah dan ayat berikut:").addSelection("Klik di sini").makeSections("Pilih Surah", "surahs");
      surahs.forEach(([label, command]) => {
        buttons.makeRow("", label, `Pilih Surah ${label}`, command);
      });
      return buttons.run(m.chat, conn, m);
    }
    const [surahNumber, ayatNumber] = args.map(Number);
    const ayatCount = ayatCountData[surahNumber];
    if (ayatNumber < 1 || ayatNumber > ayatCount) {
      return m.reply(`Nomor ayat tidak valid untuk Surah *${surahNumber}*. Surah *${surahNumber}* memiliki *${ayatCount}* ayat.`);
    }
    const res = await alquran(surahNumber, ayatNumber);
    const replyMsg = `- ${res.arab}\n- ${res.latin}\n\n- ${res.terjemahan}\n\n- *Tafsir:*\n${res.tafsir}\n\n- *Keterangan:*\n- ${res.keterangan}\n\n- (${res.surah})`.trim();
    m.reply(replyMsg);
    await conn.sendMessage(m.chat, {
      audio: {
        url: res.audio
      },
      seconds: fsizedoc,
      ptt: true,
      mimetype: "audio/mpeg",
      fileName: "vn.mp3",
      waveform: [100, 0, 100, 0, 100, 0, 100]
    });
  } catch {
    m.react("❌");
  }
};
handler.help = ["alquran [nomor_surah] [nomor_ayat]"];
handler.tags = ["quran"];
handler.command = /^(al)?quran$/i;
export default handler;
const alquran = async (surah, ayat) => {
  const res = await fetch(`https://kalam.sindonews.com/ayat/${ayat}/${surah}`);
  if (!res.ok) throw "Error, mungkin tidak ditemukan?";
  const $ = cheerio.load(await res.text());
  return {
    surah: $("div.ayat-title > h1").text(),
    arab: $("div.ayat-detail > div.ayat-arab").text(),
    latin: $("div.ayat-detail > div.ayat-latin").text(),
    terjemahan: $("div.ayat-detail > div.ayat-detail-text").text(),
    tafsir: $("div.tafsir-box > div").map((_, el) => $(el).text()).get().join("\n").trim(),
    keterangan: $("div.ayat-summary").text(),
    audio: `https://github.com/iherbs/quran-json/raw/main/Audio/${String(surah).padStart(3, "0")}/${String(ayat).padStart(3, "0")}.mp3`
  };
};
const ayatCountData = {
  1: 7,
  2: 286,
  3: 200,
  4: 176,
  5: 120,
  6: 165,
  7: 206,
  8: 75,
  9: 129,
  10: 109,
  11: 123,
  12: 111,
  13: 43,
  14: 52,
  15: 99,
  16: 128,
  17: 111,
  18: 110,
  19: 98,
  20: 135,
  21: 112,
  22: 78,
  23: 118,
  24: 64,
  25: 77,
  26: 227,
  27: 93,
  28: 88,
  29: 69,
  30: 60,
  31: 34,
  32: 30,
  33: 73,
  34: 54,
  35: 45,
  36: 83,
  37: 182,
  38: 88,
  39: 75,
  40: 85,
  41: 54,
  42: 53,
  43: 89,
  44: 59,
  45: 37,
  46: 35,
  47: 38,
  48: 29,
  49: 18,
  50: 45,
  51: 60,
  52: 49,
  53: 62,
  54: 55,
  55: 78,
  56: 96,
  57: 29,
  58: 22,
  59: 24,
  60: 13,
  61: 14,
  62: 11,
  63: 11,
  64: 18,
  65: 12,
  66: 12,
  67: 30,
  68: 52,
  69: 52,
  70: 44,
  71: 28,
  72: 28,
  73: 20,
  74: 56,
  75: 40,
  76: 31,
  77: 50,
  78: 40,
  79: 46,
  80: 42,
  81: 29,
  82: 19,
  83: 36,
  84: 25,
  85: 22,
  86: 17,
  87: 19,
  88: 26,
  89: 30,
  90: 20,
  91: 15,
  92: 21,
  93: 11,
  94: 8,
  95: 8,
  96: 19,
  97: 5,
  98: 8,
  99: 8,
  100: 11,
  101: 11,
  102: 8,
  103: 3,
  104: 9,
  105: 5,
  106: 4,
  107: 7,
  108: 3,
  109: 6,
  110: 3,
  111: 5,
  112: 4,
  113: 5,
  114: 6
};