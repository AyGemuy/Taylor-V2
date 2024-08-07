import hmfull from "hmfull";
const handler = async (m, {
  command,
  usedPrefix,
  conn,
  text
}) => {
  try {
    const ends = ["sfw", "nsfw"];
    const [types, modes, kodes] = text.split(/[^\w\s]/g);
    if (!types || !hmfull[types]) {
      return conn.sendButton(m.chat, "🌐 *Pilih tipe API terlebih dahulu:*", "⚡ Pilih opsi berikut:", null, Object.keys(hmfull).map(t => [`🔹 ${t}`, `${usedPrefix + command} ${t}`]), m);
    }
    if (!modes || !ends.includes(modes)) {
      return conn.sendButton(m.chat, "🖼️ *Pilih tipe gambar terlebih dahulu:*", "⚡ Pilih opsi berikut:", null, ends.map(e => [`🔹 ${e.toUpperCase()}`, `${usedPrefix + command} ${types}|${e}`]), m);
    }
    const validTypes = Object.keys(hmfull[types][modes]);
    if (!kodes) {
      const buttons = conn.ctaButton.setBody(`🖼️ *Pilih jenis ${modes.toUpperCase()} di bawah ini:*`).setFooter(`Pilih tipe gambar ${modes.toUpperCase()}.`).addSelection("Klik di sini").makeSections("Hmfull", "pilihan");
      validTypes.forEach(type => {
        buttons.makeRow("", `🔹 ${type}`, `Dapatkan ${type}`, `${usedPrefix + command} ${types}|${modes}|${type}`);
      });
      return buttons.run(m.chat, conn, m);
    }
    if (!validTypes.includes(kodes)) {
      return m.reply(`*Contoh:* \n.hmfull ${types}|${modes}|${validTypes[0]}\n\n*Pilih tipe yang tersedia:*\n${validTypes.map(v => `  🔹 ${v}`).join("\n")}`);
    }
    m.react(wait);
    const outs = await hmfull[types][modes][kodes]();
    if (!outs.url) {
      m.react(eror);
      return m.reply("Gambar tidak ditemukan.");
    }
    await conn.sendMessage(m.chat, {
      image: {
        url: outs.url
      },
      caption: `✨ *${kodes.toUpperCase()} (${modes.toUpperCase()})*`
    }, {
      quoted: m
    });
    m.react(sukses);
  } catch (error) {
    console.error(error);
    m.react(eror);
    return m.reply("❌ *Terjadi kesalahan. Silakan coba lagi.*");
  }
};
handler.help = ["hmfull type query"];
handler.tags = ["internet"];
handler.command = /^(hmfull)$/i;
export default handler;