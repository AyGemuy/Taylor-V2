import fetch from "node-fetch";
import fs from "fs";
const handler = async (m, {
  conn,
  args,
  usedPrefix,
  command
}) => {
  conn.aiproxy = conn.aiproxy || {};
  const data = fs.readFileSync("./json/ai/system-message.json"),
    characterCategories = JSON.parse(data),
    categoryNames = Object.keys(characterCategories);
  if ("aiproxyset" === command) {
    const categoryIndex = parseInt(args[0]) - 1,
      characterIndex = parseInt(args[1]) - 1,
      selectedCategory = categoryNames[categoryIndex];
    if (!selectedCategory || !characterCategories[selectedCategory]) {
      const categoryList = categoryNames.map((v, i) => `*${i + 1}.* ${v}`).join("\n");
      return m.reply(`Nomor kategori tidak valid. Pilih nomor antara 1 dan ${categoryNames.length}.\nKategori yang tersedia:\n${categoryList}`);
    }
    const characterNames = Object.keys(characterCategories[selectedCategory]),
      selectedCharacter = characterNames[characterIndex];
    if (selectedCharacter) return conn.aiproxy = {
      name: selectedCharacter,
      profile: characterCategories[selectedCategory][selectedCharacter]
    }, m.reply(`Karakter diatur menjadi: *${conn.aiproxy.name}*`);
    {
      const characterList = characterNames.map((v, i) => `*${i + 1}.* ${v}`).join("\n");
      return m.reply(`Nomor karakter tidak valid. Pilih nomor antara 1 dan ${characterNames.length}.\nContoh penggunaan:\n*${usedPrefix}${command} 1 2*\nKarakter yang tersedia:\n${characterList}`);
    }
  }
  if (!conn.aiproxy.name && !conn.aiproxy.profile) return m.reply(`Atur karakter sebelum menggunakan.\nGunakan command *${usedPrefix}aiproxyset* untuk mengatur karakter.\nKarakter yang tersedia:\n${categoryNames.map((v, i) => `*${i + 1}.* ${v}`).join("\n")}`);
  if ("aiproxy" === command) {
    const text = args.length >= 1 ? args.slice(0).join(" ") : m.quoted && m.quoted?.text || m.quoted?.caption || m.quoted?.description || null;
    if (!text) return m.reply(`Masukkan teks atau reply pesan dengan teks yang ingin diolah.\nContoh penggunaan:\n*${usedPrefix}${command} Hai, apa kabar?*`);
    m.react(wait);
    try {
      const output = await chatAI(text, conn.aiproxy.profile);
      output ? m.reply(`*${conn.aiproxy.name}*\n\n${output}`) : m.reply("Tidak ada output yang dihasilkan.");
    } catch (error) {
      console.error("Error during chatAI:", error), m.reply("Terjadi kesalahan selama pemrosesan.");
    }
  }
};
handler.help = ["aiproxy", "aiproxyset"], handler.tags = ["ai"], handler.command = /^(aiproxy|aiproxyset)$/i,
  handler.limit = !0;
export default handler;
async function chatAI(query, profile, model) {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer sk-bpGbwgFrNi9GKcNd9DBAd6QwGtuecv30SU2gAreQzVO8XUrF"
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
    }),
    redirect: "follow"
  };
  try {
    const response = await fetch("https://api.aiproxy.io/v1/chat/completions", options),
      data = await response.json();
    return data.choices[0]?.message.content;
  } catch (error) {
    console.error("Error:", error);
  }
}