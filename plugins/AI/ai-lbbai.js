import axios from "axios";
import fs from "fs";
const handler = async (m, {
  conn,
  args,
  usedPrefix,
  command
}) => {
  conn.lbbai = conn.lbbai || {};
  const data = fs.readFileSync("./json/ai/system-message.json"),
    characterCategories = JSON.parse(data),
    categoryNames = Object.keys(characterCategories);
  if ("lbbaicreate" === command) {
    const text = args.length >= 1 ? args.slice(0).join(" ") : m.quoted && m.quoted?.text || m.quoted?.caption || m.quoted?.description || null;
    if (!text) return m.reply(`Masukkan teks atau reply pesan dengan teks yang ingin diolah.\nContoh penggunaan:\n*${usedPrefix}${command} Hai, apa kabar?*`);
    if (text) return conn.lbbai[m.chat] = {
      ...conn.lbbai[m.chat],
      name: m.name,
      profile: [...conn.lbbai[m.chat].profile || [], text]
    }, m.reply(`Karakter diatur menjadi: *${conn.lbbai[m.chat].name}*`);
  }
  if ("lbbaiset" === command) {
    const categoryIndex = parseInt(args[0]) - 1,
      characterIndex = parseInt(args[1]) - 1,
      selectedCategory = categoryNames[categoryIndex];
    if (!selectedCategory || !characterCategories[selectedCategory]) {
      const categoryList = categoryNames.map((v, i) => `*${i + 1}.* ${v}`).join("\n");
      return m.reply(`Nomor kategori tidak valid. Pilih nomor antara 1 dan ${categoryNames.length}.\nKategori yang tersedia:\n${categoryList}`);
    }
    const characterNames = Object.keys(characterCategories[selectedCategory]),
      selectedCharacter = characterNames[characterIndex];
    if (selectedCharacter) return conn.lbbai[m.chat] = {
      ...conn.lbbai[m.chat],
      name: selectedCharacter,
      profile: [characterCategories[selectedCategory][selectedCharacter]]
    }, m.reply(`Karakter diatur menjadi: *${conn.lbbai[m.chat].name}*`);
    {
      const characterList = characterNames.map((v, i) => `*${i + 1}.* ${v}`).join("\n");
      return m.reply(`Nomor karakter tidak valid. Pilih nomor antara 1 dan ${characterNames.length}.\nContoh penggunaan:\n*${usedPrefix}${command} 1 2*\nKarakter yang tersedia:\n${characterList}`);
    }
  }
  if (!conn.lbbai[m.chat].name && !conn.lbbai[m.chat].profile) return m.reply(`Atur karakter sebelum menggunakan.\nGunakan command *${usedPrefix}lbbaiset* untuk mengatur karakter.\nKarakter yang tersedia:\n${categoryNames.map((v, i) => `*${i + 1}.* ${v}`).join("\n")}`);
  if ("lbbai" === command) {
    const text = args.length >= 1 ? args.slice(0).join(" ") : m.quoted && m.quoted?.text || m.quoted?.caption || m.quoted?.description || null;
    if (!text) return m.reply(`Masukkan teks atau reply pesan dengan teks yang ingin diolah.\nContoh penggunaan:\n*${usedPrefix}${command} Hai, apa kabar?*`);
    m.react(wait);
    try {
      const summary = await chatAI(conn.lbbai[m.chat].profile.join(" "), "Perpendek kalimat yang ada dan perbaiki kata katanya agar lebih simpel dan pendek."),
        output = await chatAI(text, summary);
      output ? m.reply(`*${conn.lbbai[m.chat].name}*\n\n${output}`) : m.reply("Tidak ada output yang dihasilkan.");
    } catch (error) {
      console.error("Error during chatAI:", error), m.reply("Terjadi kesalahan selama pemrosesan.");
    }
  }
};
handler.help = ["lbbai", "lbbaiset", "lbbaicreate"], handler.tags = ["ai"],
  handler.command = /^(lbbai|lbbaiset|lbbaicreate)$/i;
export default handler;
const API_URL = "https://openai.lbbai.cc/v1/chat/completions";
async function chatAI(query, profile) {
  const payload = {
    messages: [{
      role: "system",
      content: profile
    }, {
      role: "user",
      content: query
    }],
    model: "gpt-3.5-turbo",
    presence_penalty: 0,
    stream: !0,
    temperature: .7
  };
  try {
    const response = await axios.post(API_URL, payload);
    return response.data.split("\n\n").filter(data => data.includes('data: {"id":"chatcmpl')).map(data => {
      try {
        return JSON.parse(data.match(/{.*}/)?.[0]);
      } catch (error) {
        return console.error("Error parsing JSON:", error), null;
      }
    }).filter(Boolean).map(data => data.choices[0]?.delta.content).join("");
  } catch (error) {
    throw console.error("Error during chatAI request:", error), error;
  }
}