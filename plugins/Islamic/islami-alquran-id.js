import fetch from "node-fetch";
import {
  QuranID
} from "../../lib/tools/quran-api-id.js";
const quran = new QuranID(),
  handler = async (m, {
    args
  }) => {
    const commandArgs = args[0]?.toLowerCase();
    let replyMsg;
    try {
      switch (commandArgs) {
        case "all":
          const allData = await quran.All();
          replyMsg = "List Surahs:\n", allData.forEach(surah => {
            replyMsg += `Surah ${surah.surahNumber}: ${surah.name} (${surah.translation}) - ${surah.numberOfAyahs} ayahs\n`;
          });
          break;
        case "specific":
          if (args[1]) {
            const surahNumber = parseInt(args[1]),
              specificSurahData = await quran.Specific(surahNumber);
            replyMsg = `Detail Surah ${specificSurahData.name} (${specificSurahData.translation}):\n`,
              replyMsg += `Number: ${specificSurahData.number}\n`, replyMsg += `Number of Ayahs: ${specificSurahData.numberOfAyahs}\n`,
              replyMsg += `Revelation: ${specificSurahData.revelation}\n`, replyMsg += `Description: ${specificSurahData.description}\n`,
              replyMsg += `Audio: ${specificSurahData.audio}\n`, replyMsg += `Bismillah: ${specificSurahData.bismillah.arab} (${specificSurahData.bismillah.translation})\n`,
              replyMsg += `Bismillah Audio: ${specificSurahData.bismillah.audio.alafasy}\n`;
          } else replyMsg = "Masukkan nomor surah untuk perintah specific.";
          break;
        case "ayahs":
          if (args[1]) {
            const surahNumber = parseInt(args[1]),
              ayahsData = await quran.Ayahs(surahNumber);
            replyMsg = "Ayahs:\n", ayahsData.forEach(ayah => {
              replyMsg += `Ayah ${ayah.number.inSurah}: ${ayah.arab} - ${ayah.translation}\n`,
                replyMsg += `Audio: ${ayah.audio.alafasy}\n`, replyMsg += `Image: ${ayah.image.primary}\n`,
                replyMsg += `Tafsir: ${ayah.tafsir.kemenag.short}\n\n`;
            });
          } else replyMsg = "Masukkan nomor surah untuk perintah ayahs.";
          break;
        case "specificayah":
          if (args[1] && args[2]) {
            const surahNumber = parseInt(args[1]),
              ayahNumber = parseInt(args[2]),
              specificAyahData = await quran.SpecificAyah(surahNumber, ayahNumber);
            replyMsg = `Ayah ${specificAyahData.number.inSurah} of Surah ${specificAyahData.name} (${specificAyahData.translation}):\n`,
              replyMsg += `${specificAyahData.arab} - ${specificAyahData.translation}\n`, replyMsg += `Audio: ${specificAyahData.audio.alafasy}\n`,
              replyMsg += `Image: ${specificAyahData.image.primary}\n`, replyMsg += `Tafsir: ${specificAyahData.tafsir.kemenag.short}\n`;
          } else replyMsg = "Masukkan nomor surah dan nomor ayah untuk perintah specificayah.";
          break;
        case "random":
          const randomAyahData = await quran.Random();
          replyMsg = `Random Ayah (${randomAyahData.number.inSurah} of Surah ${randomAyahData.name}):\n`,
            replyMsg += `${randomAyahData.arab} - ${randomAyahData.translation}\n`, replyMsg += `Audio: ${randomAyahData.audio.alafasy}\n`,
            replyMsg += `Image: ${randomAyahData.image.primary}\n`, replyMsg += `Tafsir: ${randomAyahData.tafsir.kemenag.short}\n`;
          break;
        default:
          replyMsg = "Perintah tidak valid. Gunakan `quranid all`, `quranid specific [nomor_surah]`, `quranid ayahs [nomor_surah]`, `quranid specificayah [nomor_surah] [nomor_ayah]`, atau `quranid random`.";
      }
    } catch (error) {
      console.error("Error:", error), replyMsg = "Terjadi kesalahan saat memproses perintah. Silakan coba lagi.";
    }
    m.reply(replyMsg);
  };
handler.help = ["quranid"], handler.tags = ["quran"], handler.command = /^(quranid)$/i;
export default handler;