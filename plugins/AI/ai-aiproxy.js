import fetch from "node-fetch";
import fs from "fs";
import crypto from "crypto";
async function chatAI(query, profile, model) {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization:
        "Bearer sk-bpGbwgFrNi9GKcNd9DBAd6QwGtuecv30SU2gAreQzVO8XUrF",
    },
    body: JSON.stringify({
      model: model || "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: profile,
        },
        {
          role: "user",
          content: query,
        },
      ],
    }),
    redirect: "follow",
  };
  try {
    const response = await fetch(
      "https://api.aiproxy.io/v1/chat/completions",
      options,
    );
    const data = await response.json();
    return data.choices[0]?.message.content;
  } catch (error) {
    console.error("Error:", error);
  }
}
const handler = async (m, { conn, args, usedPrefix, command }) => {
  db.data.dbai.aiproxy = db.data.dbai.aiproxy || {};
  const data = fs.readFileSync("./json/ai/system-message.json");
  const characterCategories = JSON.parse(data);
  const categoryNames = Object.keys(characterCategories);
  if (command === "aiproxyset") {
    const categoryIndex = parseInt(args[0]) - 1;
    const characterIndex = parseInt(args[1]) - 1;
    const selectedCategory = categoryNames[categoryIndex];
    if (!selectedCategory || !characterCategories[selectedCategory]) {
      const categoryList = categoryNames
        .map((v, i) => `*${i + 1}.* ${v}`)
        .join("\n");
      return m.reply(
        `Nomor kategori tidak valid. Pilih nomor antara 1 dan ${categoryNames.length}.\nKategori yang tersedia:\n${categoryList}`,
      );
    }
    const characterNames = Object.keys(characterCategories[selectedCategory]);
    const selectedCharacter = characterNames[characterIndex];
    if (selectedCharacter) {
      db.data.dbai.aiproxy[m.sender] = {
        name: selectedCharacter,
        profile: characterCategories[selectedCategory][selectedCharacter],
        lastMessageId: null,
      };
      return m.reply(
        `Karakter diatur menjadi: *${db.data.dbai.aiproxy[m.sender].name}*`,
      );
    } else {
      const characterList = characterNames
        .map((v, i) => `*${i + 1}.* ${v}`)
        .join("\n");
      return m.reply(
        `Nomor karakter tidak valid. Pilih nomor antara 1 dan ${characterNames.length}.\nContoh penggunaan:\n*${usedPrefix}${command} 1 2*\nKarakter yang tersedia:\n${characterList}`,
      );
    }
  }
  if (
    !db.data.dbai.aiproxy[m.sender]?.name ||
    !db.data.dbai.aiproxy[m.sender]?.profile
  ) {
    return m.reply(
      `Atur karakter sebelum menggunakan.\nGunakan command *${usedPrefix}aiproxyset* untuk mengatur karakter.\nKarakter yang tersedia:\n${categoryNames.map((v, i) => `*${i + 1}.* ${v}`).join("\n")}`,
    );
  }
  if (command === "aiproxy") {
    const text =
      args.length >= 1
        ? args.slice(0).join(" ")
        : m.quoted?.text || m.quoted?.caption || m.quoted?.description || null;
    if (!text) {
      return m.reply(
        `Masukkan teks atau reply pesan dengan teks yang ingin diolah.\nContoh penggunaan:\n*${usedPrefix}${command} Hai, apa kabar?*`,
      );
    }
    m.react(wait);
    try {
      const output = await chatAI(text, db.data.dbai.aiproxy[m.sender].profile);
      if (output) {
        const response = await conn.reply(
          m.chat,
          `*${db.data.dbai.aiproxy[m.sender].name}*\n\n${output}`,
          m,
        );
        db.data.dbai.aiproxy[m.sender].lastMessageId = response.key.id;
      } else {
        m.reply("Tidak ada output yang dihasilkan.");
      }
    } catch (error) {
      console.error("Error during chatAI:", error);
      m.reply("Terjadi kesalahan selama pemrosesan.");
    }
  }
};
handler.before = async (m, { conn }) => {
  if (
    !db.data.dbai.aiproxy ||
    m.isBaileys ||
    !(m.sender in db.data.dbai.aiproxy)
  )
    return;
  const { name, profile, lastMessageId } = db.data.dbai.aiproxy[m.sender];
  if (lastMessageId && m.quoted?.id === lastMessageId && m.text.trim()) {
    m.react(wait);
    try {
      const output = await chatAI(m.text.trim(), profile);
      if (output) {
        const response = await conn.reply(m.chat, `*${name}*\n\n${output}`, m);
        db.data.dbai.aiproxy[m.sender].lastMessageId = response.key.id;
      }
      m.react(sukses);
    } catch (error) {
      console.error("Handler before error:", error);
      m.react(eror);
    }
  }
};
handler.help = ["aiproxy", "aiproxyset"];
handler.tags = ["ai"];
handler.command = /^(aiproxy|aiproxyset)$/i;
handler.limit = true;
export default handler;
