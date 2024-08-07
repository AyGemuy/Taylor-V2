import {
  dekuai
} from "../../lib/ai/ai-dekuai.js";
import {
  v4 as uuid
} from "uuid";
const characters = {
  deku: "pai/deku",
  gojo: "pai/gojo",
  sukuna: "pai/sukuna",
  rimuru: "pai/rimuru",
  cid: "pai/cid",
  luffy: "pai/luffy",
  rudeus: "pai/rudeus",
  ichigo: "pai/ichigo",
  naruto: "pai/naruto",
  boruto: "pai/boruto"
};
const handler = async (m, {
  conn,
  args,
  usedPrefix,
  command
}) => {
  const characterKey = command.replace(/^pai/, "").toLowerCase();
  const characterPath = characters[characterKey];
  if (!characterPath) {
    const availableCharacters = Object.keys(characters).map(char => `*${usedPrefix}pai${char}*`).join("\n");
    return m.reply(`Karakter '${characterKey}' tidak ditemukan.\n\nDaftar karakter yang tersedia:\n${availableCharacters}\n\nContoh penggunaan:\n*${usedPrefix}${command} Hai, apa kabar?*`);
  }
  const text = args.length >= 1 ? args.join(" ") : m.quoted && (m.quoted.text || m.quoted.caption || m.quoted.description) || null;
  if (!text) {
    return m.reply(`Masukkan teks atau balas pesan dengan teks yang ingin diolah.\nContoh penggunaan:\n*${usedPrefix}${command} Hai, apa kabar?*`);
  }
  try {
    const output = await dekuai.api(characterPath, {
      q: text,
      uid: uuid()
    });
    m.reply(output?.result);
  } catch (e) {
    console.error(e);
    m.reply("Terjadi kesalahan dalam pengolahan.");
  }
};
handler.help = ["painaruto", "paiboruto", "paideku", "paigojo", "paisukuna", "pairimuru", "paicid", "pailuffy", "pairudeus", "paiichigo"];
handler.tags = ["ai"];
handler.command = /^(pai(deku|gojo|sukuna|rimuru|cid|luffy|rudeus|ichigo|naruto|boruto))$/i;
export default handler;