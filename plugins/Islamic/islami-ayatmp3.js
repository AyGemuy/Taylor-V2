import {
  alquran
} from "@bochilteam/scraper";
const handler = async (m, {
  conn,
  args,
  usedPrefix,
  command
}) => {
  if (args.length < 2 || isNaN(args[0]) || isNaN(args[1])) {
    const surahs = Object.keys(ayatCountData).map(num => [`🔹 Surah ${num}`, `${usedPrefix + command} ${num} 1`]);
    const buttons = conn.ctaButton.setBody("🌐 *Pilih Surah dan Ayat:*").setFooter("⚡ Pilih surah dan ayat berikut:").addSelection("Klik di sini").makeSections("Pilih Surah", "surahs");
    surahs.forEach(([label, command]) => {
      buttons.makeRow("", label, `Pilih Surah ${label}`, command);
    });
    return buttons.run(m.chat, conn, m);
  }
  const [surahNumber, ayatNumber] = args.map(Number);
  try {
    const api = await alquran();
    const ayah = api[surahNumber - 1]?.ayahs[ayatNumber - 1];
    if (!ayah) throw "Ayat atau Surah tidak ditemukan.";
    const message = `- ${ayah.text.ar}\n- ${ayah.translation.id}\n- (Q.S ${api[surahNumber - 1].asma.id.short} : ${ayah.number.insurah})`.trim();
    m.reply(message);
    await conn.sendFile(m.chat, ayah.audio.url, "", "", m);
  } catch (e) {
    m.react("❌");
    m.reply("Terjadi kesalahan saat mengambil data.");
  }
};
handler.help = ["ayta [surah] [ayat]"];
handler.tags = ["islam"];
handler.command = /^(ayat(mp3|audio)|ayta)$/i;
export default handler;