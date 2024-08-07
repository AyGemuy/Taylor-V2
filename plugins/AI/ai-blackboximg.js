import {
  Blackbox
} from "../../lib/ai/blackbox.js";
const blackbox = new Blackbox(),
  handler = async (m, {
    command,
    usedPrefix,
    conn,
    args
  }) => {
    const q = m.quoted ? m.quoted : m;
    const mime = (q.msg || q).mimetype || "";
    if (!mime) return m.reply("Tidak ada media yang ditemukan");
    const media = await q?.download();
    if (!(args.length >= 1 ? args.slice(0).join(" ") : m.quoted && m.quoted?.text || m.quoted?.caption || m.quoted?.description || null)) return m.reply(`Masukkan teks atau reply pesan dengan teks yang ingin diolah.\nContoh penggunaan:\n*${usedPrefix}${command} Hai, apa kabar?*`);
    m.react(wait);
    try {
      const data = await blackbox.image(media, input);
      data && m.reply(data);
    } catch (e) {
      console.error("Error:", e), m.react(eror);
    }
  };
handler.help = ["blackboximg"], handler.tags = ["ai"], handler.command = /^(blackboximg)$/i;
export default handler;