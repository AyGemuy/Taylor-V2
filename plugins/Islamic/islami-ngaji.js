import fetch from "node-fetch";
const handler = async (m, {
  conn,
  text,
  usedPrefix,
  command
}) => {
  try {
    const [feature, input] = text.split("|").map(str => str.trim());
    const lister = ["ayat", "surah"];
    if (!feature || !lister.includes(feature)) {
      const buttons = conn.ctaButton.setBody("🌐 *Pilih type yang ada:*").setFooter("⚡ Pilih opsi berikut:").addSelection("Klik di sini").makeSections("Pilih Type", "type");
      lister.forEach(type => {
        buttons.makeRow("", `🔹 ${type}`, `Pilih ${type}`, `${usedPrefix + command} ${type}`);
      });
      return buttons.run(m.chat, conn, m);
    }
    if (feature === "ayat") {
      if (!input || isNaN(input)) {
        const data = await fetchJson("https://api.alquran.cloud/v1/edition/format/audio");
        const buttons = conn.ctaButton.setBody("🔍 *Masukkan nomor edisi:*").setFooter("⚡ Pilih edisi berikut:").addSelection("Klik di sini").makeSections("Pilih Edisi", "editions");
        data.data.forEach((item, index) => {
          buttons.makeRow("", `🔍 *[ EDISI ${index + 1} ]*`, `Edisi ${index + 1}`, `${usedPrefix + command} ayat|${index + 1}`);
        });
        return buttons.run(m.chat, conn, m);
      }
      const ayah = parseInt(input, 10);
      if (isNaN(ayah) || ayah <= 0) {
        return m.reply("Masukkan nomor ayat yang valid.");
      }
      const data = await fetchJson("https://api.alquran.cloud/v1/edition/format/audio");
      const index = ayah - 1;
      if (index < 0 || index >= data.data.length) {
        return m.reply("Nomor ayat yang diminta melebihi jumlah ayat.");
      }
      const bagian = data.data[index];
      const res = await getAyahData(ayah, bagian.identifier);
      if (res.code !== 200) return m.reply(res.data);
      const imagers = await getImageUrl(res.data.surah.number, res.data.number);
      const cap = `🔍 *[ EDISI ${res.data.edition.englishName} ]*\n\n🌐 *Name:* ${res.data.surah.name}\n📢 *Surah Number:* ${res.data.surah.number}\n📖 *English:* ${res.data.surah.englishName}\n📝 *Text:* ${res.data.text}`;
      await conn.sendFile(m.chat, imagers || logo, "", cap, m);
      await conn.sendMessage(m.chat, {
        audio: {
          url: res.data.audio
        },
        seconds: 30,
        ptt: true,
        mimetype: "audio/mpeg",
        fileName: "vn.mp3",
        waveform: [100, 0, 100, 0, 100, 0, 100]
      }, {
        quoted: m
      });
    } else if (feature === "surah") {
      if (!input || isNaN(input)) {
        const data = await fetchJson("https://raw.githubusercontent.com/islamic-network/cdn/master/info/cdn_surah_audio.json");
        const buttons = conn.ctaButton.setBody("🔍 *Masukkan nomor surah:*").setFooter("⚡ Pilih surah berikut:").addSelection("Klik di sini").makeSections("Pilih Surah", "surahs");
        data.forEach((item, index) => {
          buttons.makeRow("", `🔍 *[ SURAH ${index + 1} ]*`, `Surah ${index + 1}`, `${usedPrefix + command} surah|${index + 1}`);
        });
        return buttons.run(m.chat, conn, m);
      }
      const surah = parseInt(input, 10);
      if (isNaN(surah) || surah <= 0) {
        return m.reply("Masukkan nomor surah yang valid.");
      }
      const data = await fetchJson("https://raw.githubusercontent.com/islamic-network/cdn/master/info/cdn_surah_audio.json");
      if (surah < 1 || surah > data.length) {
        return m.reply("Nomor surah yang diminta lebih besar dari jumlah objek yang ada.");
      }
      const bagian = data[surah - 1];
      const res = await getSurahData(surah, bagian.identifier);
      if (res.code !== 200) return m.reply(res.data);
      const imagers = await getImageUrl(surah, res.data.numberOfAyahs);
      const audios = await getAudioUrl(bagian.identifier, res.data.number);
      const cap = `🌐 *Name:* ${res.data.name}\n\n📢 *Surah:* ${res.data.number}\n📖 *English:* ${res.data.englishName}`;
      await conn.sendFile(m.chat, imagers || logo, "", cap, m);
      await conn.sendMessage(m.chat, {
        audio: {
          url: audios
        },
        seconds: 30,
        ptt: true,
        mimetype: "audio/mpeg",
        fileName: "vn.mp3",
        waveform: [100, 0, 100, 0, 100, 0, 100]
      }, {
        quoted: m
      });
    }
  } catch (e) {
    m.react("❌");
    m.reply("Terjadi kesalahan saat mengambil data.");
  }
};
handler.help = ["ngaji"];
handler.tags = ["internet"];
handler.command = /^(ngaji)$/i;
export default handler;
async function fetchJson(url) {
  try {
    const response = await fetch(url);
    return await response.json();
  } catch (error) {
    throw new Error(`Failed to fetch data from ${url}: ${error.message}`);
  }
}
async function getAyahData(ayah, edition) {
  try {
    const ayahUrl = `https://api.alquran.cloud/v1/ayah/${ayah}/${edition}`;
    return await fetchJson(ayahUrl);
  } catch (error) {
    throw new Error(`Failed to fetch Ayah data: ${error.message}`);
  }
}
async function getSurahData(surah, edition) {
  try {
    const surahUrl = `https://api.alquran.cloud/v1/surah/${surah}/${edition}`;
    return await fetchJson(surahUrl);
  } catch (error) {
    throw new Error(`Failed to fetch Surah data: ${error.message}`);
  }
}

function getImageUrl(surah, ayah) {
  return `https://cdn.islamic.network/quran/images/high-resolution/${surah}_${ayah}.png`;
}

function getAudioUrl(edition, number) {
  return `https://cdn.islamic.network/quran/audio-surah/128/${edition}/${number}.mp3`;
}