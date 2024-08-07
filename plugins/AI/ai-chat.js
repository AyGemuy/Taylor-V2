import {
  Aichat
} from "../../lib/ai/aichat.js";
const model = "gpt-3.5-turbo",
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
      const messages = [{
          role: "system",
          content: "Saya AI dari OpenAI, diciptakan untuk membantu Anda mengeksplorasi ide, bertukar informasi, dan menyelesaikan masalah. Ada yang bisa saya bantu?"
        }, {
          role: "user",
          content: text
        }],
        output = await Aichat.createAsync(model, messages);
      m.reply(output);
    } catch (e) {
      m.react(eror);
    }
  };
handler.help = ["aichat"], handler.tags = ["ai"], handler.command = /^(aichat)$/i;
export default handler;