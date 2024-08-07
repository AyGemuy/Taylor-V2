import fetch from "node-fetch";
import Hmtai from "hmtai";
const hmtai = new Hmtai();
const handler = async (m, {
  command,
  usedPrefix,
  conn,
  text
}) => {
  try {
    const [type, code] = text.split("|").map(s => s.trim());
    if (!type || !hmtai[type]) {
      return conn.sendButton(m.chat, "🌐 *Pilih tipe API terlebih dahulu:*", "⚡ Pilih opsi berikut:", null, Object.keys(hmtai).map(t => [`🔹 ${t}`, `${usedPrefix + command} ${t}`]), m);
    }
    const validCodes = Object.keys(hmtai[type]);
    if (!code) {
      const buttons = conn.ctaButton.setBody(`🖼️ *Pilih jenis ${type.toUpperCase()} di bawah ini:*`).setFooter(`Pilih tipe gambar ${type.toUpperCase()}.`).addSelection("Klik di sini").makeSections("Hmtai", "pilihan");
      validCodes.forEach(c => {
        buttons.makeRow("", `🔹 ${c}`, `Dapatkan ${c}`, `${usedPrefix + command} ${type}|${c}`);
      });
      return buttons.run(m.chat, conn, m);
    }
    if (!validCodes.includes(code)) {
      return m.reply(`*Contoh:* \n${usedPrefix + command} ${type}|${validCodes[0]}\n\n*Pilih tipe yang tersedia:*\n${validCodes.map(v => `  🔹 ${v}`).join("\n")}`);
    }
    m.react(wait);
    const response = await fetch(`https://nekos.best/api/v2/search?query=${type} ${code}&type=1`);
    const result = (await response.json())?.results[0];
    if (!result.url) {
      m.react(eror);
      return m.reply("Gambar tidak ditemukan.");
    }
    await conn.sendMessage(m.chat, {
      image: {
        url: result.url
      },
      caption: `✨ *${code.toUpperCase()} (${type.toUpperCase()})*\n- ${result.artist_name}`
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
handler.help = ["hmtai type query"];
handler.tags = ["internet"];
handler.command = /^(hmtai)$/i;
export default handler;