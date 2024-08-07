import fetch from "node-fetch";
const handler = async (m, {
  conn,
  usedPrefix,
  command,
  text
}) => {
  if (!text) return m.reply(`Masukkan teks yang ingin diolah. Contoh penggunaan:\n*${usedPrefix}${command} Tanjiro*\n*${usedPrefix}${command} Tanjiro|Senpai*`);
  const inputs = text.split("|").map(t => t.trim());
  let urls = [];
  switch (command) {
    case "gfx1":
    case "gfx2":
    case "gfx5":
    case "gfx6":
      if (inputs.length !== 1) return m.reply(`Format teks tidak sesuai. Gunakan satu teks. Contoh penggunaan:\n*${usedPrefix}${command} Tanjiro*`);
      urls = [`https://tanjiro-api.onrender.com/${command}?name=${encodeURIComponent(inputs[0])}&api_key=tanjiro`];
      break;
    case "gfx3":
    case "gfx4":
      if (inputs.length !== 2) return m.reply(`Format teks tidak sesuai. Gunakan dua teks yang dipisah dengan "|". Contoh penggunaan:\n*${usedPrefix}${command} Tanjiro|Senpai*`);
      urls = [`https://tanjiro-api.onrender.com/${command}?text=${encodeURIComponent(inputs[0])}&text2=${encodeURIComponent(inputs[1])}&api_key=tanjiro`];
      break;
    default:
      return m.reply(`Perintah tidak valid. Gunakan salah satu dari: gfx1, gfx2, gfx3, gfx4, gfx5, gfx6`);
  }
  try {
    m.react(wait);
    for (const url of urls) {
      await conn.sendFile(m.chat, url, "", `✨ *Hasil GFX* ✨\n\nMenampilkan hasil untuk "${text}"`, m);
    }
  } catch (e) {
    m.react(eror);
    console.error(e);
  }
};
handler.help = ["gfx1", "gfx2", "gfx3", "gfx4", "gfx5", "gfx6"];
handler.tags = ["search"];
handler.command = /^(gfx1|gfx2|gfx3|gfx4|gfx5|gfx6)$/i;
export default handler;