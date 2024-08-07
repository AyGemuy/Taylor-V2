import {
  NeoxrApi
} from "../../lib/tools/neoxr-api.js";
import fetch from "node-fetch";
const handler = async (m, {
  args,
  command,
  usedPrefix,
  conn
}) => {
  const text = args.length >= 1 ? args.slice(0).join(" ") : m.quoted && m.quoted?.text || m.quoted?.caption || m.quoted?.description || null;
  if (!text) return m.reply(`Masukkan teks atau reply pesan dengan teks yang ingin diolah.\nContoh penggunaan:\n*${usedPrefix}${command} Hai, apa kabar?*`);
  try {
    let neo = new NeoxrApi("kyaOnechan"),
      resul = (await neo.diffusion(text)).data.getRandom();
    m.react(wait), await conn.sendFile(m.chat, resul.url, text, "*[ Result V1 ]*\n" + text, m);
  } catch (e) {
    try {
      let resul = (await (await fetch("https://lexica.art/api/v1/search?q=" + text)).json()).images.getRandom();
      m.react(wait), await conn.sendFile(m.chat, resul.src, text, "*[ Result V2 ]*\n" + resul.prompt, m);
    } catch (e) {
      m.react(eror);
    }
  }
};
handler.help = ["lexica"], handler.tags = ["internet"], handler.command = ["lexica"];
export default handler;