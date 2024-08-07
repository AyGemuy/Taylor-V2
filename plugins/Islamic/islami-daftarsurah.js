import fetch from "node-fetch";
const handler = async (m, {
  usedPrefix,
  command
}) => {
  m.react(wait);
  try {
    let response = await fetch("https://al-quran-8d642.firebaseio.com/data.json"),
      teks = (await response.json()).map((item, index) => `🔍 *[ RESULT ${index + 1} ]*\n\n📢 *Arti:* ${item.arti}\n🌐 *Asma:* ${item.asma}\n🎧 *Audio:* ${item.audio}\n📖 *Ayat:* ${item.ayat}\n📝 *Keterangan:* ${item.keterangan.replace(/<[^>]+>/g, "")}\n📛 *Nama:* ${item.nama}\n🔢 *Nomor:* ${item.nomor}\n📖 *Rukuk:* ${item.rukuk}\n🔠 *Type:* ${item.type}\n🔢 *Urut:* ${item.urut}\n`).filter(v => v).join("\n\n________________________\n\n");
    m.reply(teks);
  } catch (e) {
    try {
      let f = await fetch("https://api.alquran.cloud/v1/surah"),
        teks = (await f.json()).data.map((item, index) => `🔍 *[ RESULT ${index + 1} ]*\n\n🌐 *English:* ${item.englishName}\n📢 *Arti:* ${item.englishNameTranslation}\n📛 *Nama:* ${item.name}\n🔢 *Nomor:* ${item.numberOfAyahs}\n🔠 *Type:* ${item.type}\n`).filter(v => v).join("\n\n________________________\n\n");
      m.reply(teks);
    } catch (e) {
      m.react(eror);
    }
  }
};
handler.help = ["daftarsurah"], handler.tags = ["islam"], handler.command = /^((list|daftar)sura(t|h))$/i;
export default handler;