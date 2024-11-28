import { Tazkia } from "../../lib/tools/hadits.js";
const handler = async (m, { conn, text, usedPrefix, command }) => {
  try {
    const tazkia = new Tazkia();
    if (!text) return m.reply("Harap masukkan query pencarian.");
    const [query, index] = text.split("|").map((str) => str.trim());
    m.react(wait);
    const result = await tazkia.search(query);
    if (typeof result === "string") return m.reply(result);
    const selectedIndex = parseInt(index);
    if (
      isNaN(selectedIndex) ||
      selectedIndex < 1 ||
      selectedIndex > result.length
    ) {
      const buttons = conn.ctaButton
        .setBody("🌐 *Hasil Pencarian:*")
        .setFooter("⚡ Pilih hadits berikut:")
        .addSelection("Klik di sini")
        .makeSections("Hasil Pencarian", "searchList");
      result.forEach((h, idx) => {
        buttons.makeRow(
          "",
          `📜 ${h.title}`,
          `Lihat Hadits ${idx + 1}`,
          `${usedPrefix + command} ${query}|${idx + 1}`,
        );
      });
      return buttons.run(m.chat, conn, m);
    }
    const selectedHadith = result[selectedIndex - 1];
    const message = `📜 *${selectedHadith.title}*\n\n📝 *Teks Arab:*\n${selectedHadith.arabic}\n\n📖 *Terjemahan Indonesia:*\n${selectedHadith.indonesia}`;
    m.react(sukses);
    return m.reply(message);
  } catch (e) {
    m.react(eror);
    console.error(e);
  }
};
handler.help = ["tazkia <query>"];
handler.tags = ["islami"];
handler.command = /^(tazkia|hadits)$/i;
export default handler;
