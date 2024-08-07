import {
  Blackbox
} from "../../lib/ai/blackbox.js";
const blackbox = new Blackbox(),
  handler = async (m, {
    conn,
    args,
    usedPrefix,
    command
  }) => {
    const text = args.length >= 1 ? args.slice(0).join(" ") : m.quoted && m.quoted?.text || m.quoted?.caption || m.quoted?.description || null;
    if (!text) return m.reply(`Masukkan teks atau reply pesan dengan teks yang ingin diolah.\nContoh penggunaan:\n*${usedPrefix}${command} Hai, apa kabar?*`);
    m.react(wait);
    try {
      const input = [{
          role: "user",
          content: text
        }],
        data = await blackbox.chat(input, "Realtime", !0, !1, !1, !1);
      data && m.reply(data.replace(/\$@\$v=v1\.13\$@\$(.*?)\]/g, "").trim());
    } catch (e) {
      m.react(eror);
    }
  };
handler.help = ["blackboxchat"], handler.tags = ["ai"], handler.command = /^(blackboxchat)$/i;
export default handler;