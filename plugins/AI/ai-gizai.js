import fetch from "node-fetch";
import fs from "fs";
const handler = async (m, { conn, args, usedPrefix, command }) => {
  db.data.dbai.gizai = db.data.dbai.gizai || {};
  const data = fs.readFileSync("./json/ai/system-message.json"),
    characterCategories = JSON.parse(data),
    categoryNames = Object.keys(characterCategories);
  if ("gizaicreate" === command) {
    const text =
      args.length >= 1
        ? args.slice(0).join(" ")
        : (m.quoted && m.quoted?.text) ||
          m.quoted?.caption ||
          m.quoted?.description ||
          null;
    if (!text)
      return m.reply(
        `Masukkan teks atau reply pesan dengan teks yang ingin diolah.\nContoh penggunaan:\n*${usedPrefix}${command} Hai, apa kabar?*`,
      );
    if (text) {
      db.data.dbai.gizai[m.chat] = {
        ...db.data.dbai.gizai[m.chat],
        name: m.name,
        profile: [...(db.data.dbai.gizai[m.chat].profile || []), text],
      };
      return m.reply(
        `Karakter diatur menjadi: *${db.data.dbai.gizai[m.chat].name}*`,
      );
    }
  }
  if ("gizaiset" === command) {
    const categoryIndex = parseInt(args[0]) - 1,
      characterIndex = parseInt(args[1]) - 1,
      selectedCategory = categoryNames[categoryIndex];
    if (!selectedCategory || !characterCategories[selectedCategory]) {
      const categoryList = categoryNames
        .map((v, i) => `*${i + 1}.* ${v}`)
        .join("\n");
      return m.reply(
        `Nomor kategori tidak valid. Pilih nomor antara 1 dan ${categoryNames.length}.\nKategori yang tersedia:\n${categoryList}`,
      );
    }
    const characterNames = Object.keys(characterCategories[selectedCategory]),
      selectedCharacter = characterNames[characterIndex];
    if (selectedCharacter) {
      db.data.dbai.gizai[m.chat] = {
        ...db.data.dbai.gizai[m.chat],
        name: selectedCharacter,
        profile: [characterCategories[selectedCategory][selectedCharacter]],
      };
      return m.reply(
        `Karakter diatur menjadi: *${db.data.dbai.gizai[m.chat].name}*`,
      );
    }
    const characterList = characterNames
      .map((v, i) => `*${i + 1}.* ${v}`)
      .join("\n");
    return m.reply(
      `Nomor karakter tidak valid. Pilih nomor antara 1 dan ${characterNames.length}.\nContoh penggunaan:\n*${usedPrefix}${command} 1 2*\nKarakter yang tersedia:\n${characterList}`,
    );
  }
  if (!db.data.dbai.gizai[m.chat].name && !db.data.dbai.gizai[m.chat].profile) {
    return m.reply(
      `Atur karakter sebelum menggunakan.\nGunakan command *${usedPrefix}gizaiset* untuk mengatur karakter.\nKarakter yang tersedia:\n${categoryNames.map((v, i) => `*${i + 1}.* ${v}`).join("\n")}`,
    );
  }
  if ("gizai" === command) {
    const text =
      args.length >= 1
        ? args.slice(0).join(" ")
        : (m.quoted && m.quoted?.text) ||
          m.quoted?.caption ||
          m.quoted?.description ||
          null;
    if (!text)
      return m.reply(
        `Masukkan teks atau reply pesan dengan teks yang ingin diolah.\nContoh penggunaan:\n*${usedPrefix}${command} Hai, apa kabar?*`,
      );
    m.react(wait);
    try {
      const summary = await chatAI(
          db.data.dbai.gizai[m.chat].profile.join(" "),
          "Perpendek kalimat yang ada dan perbaiki kata katanya agar lebih simpel dan pendek.",
        ),
        output = await chatAI(text, summary);
      output
        ? m.reply(`*${db.data.dbai.gizai[m.chat].name}*\n\n${output}`)
        : m.reply("Tidak ada output yang dihasilkan.");
    } catch (error) {
      console.error("Error during chatAI:", error);
      m.reply("Terjadi kesalahan selama pemrosesan.");
    }
  }
};
handler.help = ["gizai", "gizaiset", "gizaicreate"];
handler.tags = ["ai"];
handler.command = /^(gizai|gizaiset|gizaicreate)$/i;
export default handler;
async function chatAI(query, profile, model = "chat-gemini-flash") {
  const url = "https://app.giz.ai/api/data/users/inferenceServer.infer";
  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    "User-Agent":
      "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Mobile Safari/537.36",
    Referer:
      "https://app.giz.ai/assistant?mode=chat&prompt=Ggg&baseModel=dynamic",
  };
  const data = {
    model: model,
    input: {
      messages: [
        {
          type: "system",
          content: profile,
        },
        {
          type: "human",
          content: query,
          unsaved: true,
        },
      ],
      mode: "plan",
    },
    noStream: true,
  };
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(data),
    });
    return (await response.json())?.output;
  } catch (error) {
    console.error("Error during chatAI request:", error);
    throw error;
  }
}
