import {
  Svgai,
  Zmoai,
  Arthub,
  Limewire
} from "../../lib/tools/ai-gen.js";
const handler = async (m, {
  conn,
  args,
  usedPrefix,
  command
}) => {
  const text = args.length >= 1 ? args.join(" ") : m.quoted && (m.quoted?.text || m.quoted?.caption || m.quoted?.description) || null;
  if (!text) return m.reply(`Masukkan teks atau balas pesan dengan teks yang ingin diolah.\nContoh penggunaan:\n*${usedPrefix}${command} Hai, apa kabar?*`);
  try {
    let output;
    switch (command) {
      case "svgai":
        output = await Svgai(text), m.reply(output.png ? output.png : "Output kosong.");
        break;
      case "zmoai":
        output = await Zmoai(text), m.reply(output.images[0]?.original ? output.images[0]?.original : "Output kosong.");
        break;
      case "arthub":
        output = await Arthub(text), m.reply(output.generations[0]?.img ? output.generations[0]?.img : "Output kosong.");
        break;
      case "limewire":
        output = await Limewire(text), m.reply(output.data[0]?.asset_url ? output.data[0]?.asset_url : "Output kosong.");
        break;
      default:
        m.reply("Perintah tidak dikenal.");
    }
  } catch (e) {
    m.reply("Terjadi kesalahan.");
  }
};
handler.help = ["svgai", "zmoai", "arthub", "limewire"], handler.tags = ["tools"],
  handler.command = /^(svgai|zmoai|arthub|limewire)$/i;
export default handler;