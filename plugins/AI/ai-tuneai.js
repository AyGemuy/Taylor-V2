import fetch from "node-fetch";
import fs from "fs";
const url = "https://chat.tune.app/api/chat/completions";
const headers = {
  Authorization: "tune-b4042fc3-b3ae-4b05-a24e-b26dc3b2c0241708053579",
  "Content-Type": "application/json",
};
const allowedModels = [
  "tune-blob",
  "llama-3.1-8b-instruct",
  "tune-mythomax-l2-13b",
  "llama-3.1-70b-instruct",
  "Meta-Llama-3-70B-Instruct",
  "mistral-large-2",
  "llama-3.1-405b-instruct",
  "mixtral-8x7b-inst-v0-1-32k",
  "tune-wizardlm-2-8x22b",
  "openrouter-goliath-120b-4k",
  "tune-gpt-4o",
  "tune-gpt-4o-mini",
  "yi-large-function-calling",
  "hermes-3-llama-3.1-405b",
  "gpt-3.5-turbo",
];
async function TuneAi(query, profile, model = "tune-gpt-4o-mini") {
  if (!allowedModels.includes(model))
    throw new Error(`Invalid model: ${model}`);
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: headers,
      body: JSON.stringify({
        temperature: 0.5,
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
        model: model,
        stream: false,
        max_tokens: 300,
      }),
    });
    const jsonResponse = await response.json();
    return jsonResponse.choices[0]?.message?.content || "";
  } catch (error) {
    console.error("Error:", error);
    throw new Error("Failed to fetch data from TuneAi.");
  }
}
const handler = async (m, { conn, args, usedPrefix, command }) => {
  db.data.dbai.tuneai = db.data.dbai.tuneai || {};
  const data = fs.readFileSync("./json/ai/system-message.json");
  const characterCategories = JSON.parse(data);
  const categoryNames = Object.keys(characterCategories);
  if (command === "tuneaiset") {
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
      db.data.dbai.tuneai[m.sender] = {
        name: selectedCharacter,
        profile: characterCategories[selectedCategory][selectedCharacter],
        model: db.data.dbai.tuneai[m.sender]?.model || "tune-gpt-4o-mini",
        lastMessageId: null,
      };
      return m.reply(
        `Karakter diatur menjadi: *${db.data.dbai.tuneai[m.sender].name}*`,
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
  if (command === "tuneaimodel") {
    const modelIndex = parseInt(args[0]) - 1;
    const selectedModel = allowedModels[modelIndex];
    if (!selectedModel) {
      const modelList = allowedModels
        .map((v, i) => `*${i + 1}.* ${v}`)
        .join("\n");
      return m.reply(
        `Nomor model tidak valid. Pilih nomor antara 1 dan ${allowedModels.length}.\nModel yang tersedia:\n${modelList}`,
      );
    }
    if (!db.data.dbai.tuneai[m.sender]) {
      return m.reply(
        "Setel karakter terlebih dahulu dengan command *tuneaiset*.",
      );
    }
    db.data.dbai.tuneai[m.sender].model = selectedModel;
    return m.reply(`Model diatur menjadi: *${selectedModel}*`);
  }
  if (
    !db.data.dbai.tuneai[m.sender]?.name ||
    !db.data.dbai.tuneai[m.sender]?.profile
  ) {
    return m.reply(
      `Atur karakter sebelum menggunakan.\nGunakan command *${usedPrefix}tuneaiset* untuk mengatur karakter.\nKarakter yang tersedia:\n${categoryNames.map((v, i) => `*${i + 1}.* ${v}`).join("\n")}`,
    );
  }
  if (command === "tuneai") {
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
      const model = db.data.dbai.tuneai[m.sender].model || "tune-gpt-4o-mini";
      const output = await TuneAi(
        text,
        db.data.dbai.tuneai[m.sender].profile,
        model,
      );
      if (output) {
        const response = await conn.reply(m.chat, `${output}`, m);
        db.data.dbai.tuneai[m.sender].lastMessageId = response.key.id;
      } else {
        m.reply("Tidak ada output yang dihasilkan.");
      }
    } catch (error) {
      console.error("Error during TuneAi:", error);
      m.reply("Terjadi kesalahan selama pemrosesan.");
    }
  }
};
handler.before = async (m, { conn }) => {
  if (!db.data.dbai.tuneai || m.isBaileys || !(m.sender in db.data.dbai.tuneai))
    return;
  const { name, profile, lastMessageId, model } = db.data.dbai.tuneai[m.sender];
  if (lastMessageId && m.quoted?.id === lastMessageId && m.text.trim()) {
    m.react(wait);
    try {
      const output = await TuneAi(
        m.text.trim(),
        profile,
        model || "tune-gpt-4o-mini",
      );
      if (output) {
        const response = await conn.reply(m.chat, `${output}`, m);
        db.data.dbai.tuneai[m.sender].lastMessageId = response.key.id;
      }
      m.react(sukses);
    } catch (error) {
      console.error("Handler before error:", error);
      m.react(eror);
    }
  }
};
handler.help = ["tuneai", "tuneaiset", "tuneaimodel"];
handler.tags = ["ai"];
handler.command = /^(tuneai|tuneaiset|tuneaimodel)$/i;
handler.limit = true;
export default handler;
