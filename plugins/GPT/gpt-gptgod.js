import fetch from "node-fetch";
import fs from "fs";
const handler = async (m, {
  conn,
  args,
  usedPrefix,
  command
}) => {
  conn.gptgod = conn.gptgod || {};
  const data = fs.readFileSync("./json/ai/system-message.json"),
    characterCategories = JSON.parse(data),
    categoryNames = Object.keys(characterCategories);
  if ("gptgodset" === command) {
    const categoryIndex = parseInt(args[0]) - 1,
      characterIndex = parseInt(args[1]) - 1,
      selectedCategory = categoryNames[categoryIndex];
    if (!selectedCategory || !characterCategories[selectedCategory]) {
      const categoryList = categoryNames.map((v, i) => `*${i + 1}.* ${v}`).join("\n");
      return m.reply(`Nomor kategori tidak valid. Pilih nomor antara 1 dan ${categoryNames.length}.\nKategori yang tersedia:\n${categoryList}`);
    }
    const characterNames = Object.keys(characterCategories[selectedCategory]),
      selectedCharacter = characterNames[characterIndex];
    if (selectedCharacter) return conn.gptgod = {
      name: selectedCharacter,
      profile: characterCategories[selectedCategory][selectedCharacter]
    }, m.reply(`Karakter diatur menjadi: *${conn.gptgod.name}*`);
    {
      const characterList = characterNames.map((v, i) => `*${i + 1}.* ${v}`).join("\n");
      return m.reply(`Nomor karakter tidak valid. Pilih nomor antara 1 dan ${characterNames.length}.\nContoh penggunaan:\n*${usedPrefix}${command} 1 2*\nKarakter yang tersedia:\n${characterList}`);
    }
  }
  if (!conn.gptgod.name && !conn.gptgod.profile) return m.reply(`Atur karakter sebelum menggunakan.\nGunakan command *${usedPrefix}gptgodset* untuk mengatur karakter.\nKarakter yang tersedia:\n${categoryNames.map((v, i) => `*${i + 1}.* ${v}`).join("\n")}`);
  if ("gptgod" === command) {
    const text = args.length >= 1 ? args.slice(0).join(" ") : m.quoted && m.quoted?.text || m.quoted?.caption || m.quoted?.description || null;
    if (!text) return m.reply(`Masukkan teks atau reply pesan dengan teks yang ingin diolah.\nContoh penggunaan:\n*${usedPrefix}${command} Hai, apa kabar?*`);
    m.react(wait);
    try {
      const output = await chatAI(text, conn.gptgod.profile);
      output ? m.reply(`*${conn.gptgod.name}*\n\n${output}`) : m.reply("Tidak ada output yang dihasilkan.");
    } catch (error) {
      console.error("Error during chatAI:", error), m.reply("Terjadi kesalahan selama pemrosesan.");
    }
  }
};
handler.help = ["gptgod", "gptgodset"], handler.tags = ["ai"], handler.command = /^(gptgod|gptgodset)$/i;
export default handler;
async function chatAI(query, profile, model) {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer sk-7IAYvtiat58wTdD155QtWob01oCRe44yGLUOPFe1BxEShnOY"
    },
    body: JSON.stringify({
      model: model || "gpt-3.5-turbo",
      messages: [{
        role: "system",
        content: profile
      }, {
        role: "user",
        content: query
      }]
    })
  };
  try {
    const response = await fetch("https://gptgod.site/api/v1/chat/completions", options),
      data = await response.json();
    return data.choices[0]?.message.content;
  } catch (error) {
    console.error("Error:", error);
  }
}