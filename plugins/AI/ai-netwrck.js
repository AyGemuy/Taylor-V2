import fetch from "node-fetch";
const AVAILABLE_MODELS = [
  "neversleep/llama-3-lumimaid-8b",
  "anthropic/claude-3.5-sonnet:beta",
  "openai/gpt-4o-mini",
  "gryphe/mythomax-l2-13b",
  "neversleep/llama-3-lumimaid-80b",
];
const NETWRCK_CHAT_API = "https://netwrck.com/api/chatpred_or";
const NETWRCK_IMAGE_API = "https://aiproxy-416803.uc.r.appspot.com/fal";
async function ChatNetwrck(prompt, model) {
  if (!AVAILABLE_MODELS.includes(model)) {
    throw new Error("Model tidak tersedia");
  }
  try {
    const response = await fetch(NETWRCK_CHAT_API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "User-Agent":
          "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Mobile Safari/537.36",
        Referer: "https://netwrck.com/",
      },
      body: JSON.stringify({
        query: prompt,
        model: model,
        context:
          "Saya adalah asisten virtual Anda yang siap membantu. Saya dapat memberikan informasi, menjawab pertanyaan, dan membantu dalam berbagai tugas sehari-hari. Silakan beri tahu saya apa yang dapat saya bantu hari ini.",
      }),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const result = await response.json();
    return result || "Tidak ada output yang dihasilkan";
  } catch (error) {
    console.error("Error during chat request:", error);
    throw error;
  }
}
async function generateNetwrckImage(prompt) {
  try {
    const response = await fetch(NETWRCK_IMAGE_API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "User-Agent":
          "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Mobile Safari/537.36",
        Referer: "https://netwrck.com/",
      },
      body: JSON.stringify({
        prompt: prompt,
        model_name: "fal-ai/flux/schnell",
        image_size: "square_hd",
        num_inference_steps: 4,
        guidance_scale: 3.5,
        num_images: 3,
        enable_safety_checker: false,
      }),
    });
    const result = await response.json();
    return result.result?.images || [];
  } catch (error) {
    console.error("Error during image generation:", error);
    throw error;
  }
}
const handler = async (m, { conn, args, usedPrefix, command }) => {
  db.data.dbai.netwrck = db.data.dbai.netwrck || {};
  db.data.dbai.netwrck[m.sender] = db.data.dbai.netwrck[m.sender] || {
    model: "openai/gpt-4o-mini",
  };
  if (command === "netwrckmodel") {
    const modelIndex = parseInt(args[0]) - 1;
    const selectedModel = AVAILABLE_MODELS[modelIndex];
    if (!selectedModel) {
      const modelList = AVAILABLE_MODELS.map((v, i) => `*${i + 1}.* ${v}`).join(
        "\n",
      );
      return m.reply(
        `📋 *Daftar Model Tersedia:*\n\n${modelList}\n\n*Pilih nomor model antara 1 dan ${AVAILABLE_MODELS.length}.*`,
      );
    }
    db.data.dbai.netwrck[m.sender].model = selectedModel;
    return m.reply(`✅ *Model telah diatur menjadi:* \n*${selectedModel}*`);
  }
  if (command === "netwrck") {
    const text = args.length >= 1 ? args.join(" ") : m.quoted?.text || null;
    if (!text) {
      return m.reply(
        `🔍 *Masukkan Teks atau Reply Pesan dengan Teks yang Ingin Diolah:*\n\nContoh penggunaan:\n*${usedPrefix}${command} Apa kabar?*`,
      );
    }
    m.react(wait);
    try {
      const model = db.data.dbai.netwrck[m.sender].model;
      const output = await ChatNetwrck(text, model);
      if (output) {
        const response = await conn.reply(
          m.chat,
          `💬 *Hasil Chat:* \n${output}`,
          m,
        );
        db.data.dbai.netwrck[m.sender].lastMessageId = response.key.id;
      } else {
        m.reply("❗ *Tidak ada output yang dihasilkan.*");
      }
    } catch (error) {
      console.error("Error during netwrck chat:", error);
      m.reply("❌ *Terjadi kesalahan selama pemrosesan.*");
    }
  }
  if (command === "netwrckimg") {
    const prompt = args.length >= 1 ? args.join(" ") : m.quoted?.text || null;
    if (!prompt) {
      return m.reply(
        `🖼️ *Masukkan Prompt untuk Gambar yang Ingin Dihasilkan:*\n\nContoh penggunaan:\n*${usedPrefix}${command} fantasy medieval market scene*`,
      );
    }
    m.react(wait);
    try {
      const images = await generateNetwrckImage(prompt);
      if (images.length > 0) {
        for (const img of images) {
          const caption = `🖼️ *Gambar dihasilkan:*\n\n*Prompt:* ${prompt}\n*URL:* ${img.url}\n*Lebar:* ${img.width}px\n*Tinggi:* ${img.height}px\n*Tipe Konten:* ${img.content_type}`;
          await conn.sendFile(m.chat, img.url, "netwrckimg.jpg", caption, m);
        }
      } else {
        m.reply("❗ *Gagal menghasilkan gambar.*");
      }
    } catch (error) {
      console.error("Error during netwrck image generation:", error);
      m.react(error);
    }
  }
};
handler.before = async (m, { conn }) => {
  db.data.dbai.netwrck = db.data.dbai.netwrck || {};
  db.data.dbai.netwrck[m.sender] = db.data.dbai.netwrck[m.sender] || {
    model: "openai/gpt-4o-mini",
  };
  if (!db.data.dbai.netwrck[m.sender]?.model || m.isBaileys) return;
  const { lastMessageId, model } = db.data.dbai.netwrck[m.sender];
  if (lastMessageId && m.quoted?.id === lastMessageId && m.text.trim()) {
    m.react(wait);
    try {
      const output = await ChatNetwrck(m.text.trim(), model);
      if (output) {
        const response = await conn.reply(
          m.chat,
          `💬 *Hasil Chat:* \n${output}`,
          m,
        );
        db.data.dbai.netwrck[m.sender].lastMessageId = response.key.id;
      }
      m.react(sukses);
    } catch (error) {
      console.error("Handler before error:", error);
      m.react(error);
    }
  }
};
handler.help = ["netwrck", "netwrckmodel", "netwrckimg"];
handler.tags = ["ai"];
handler.command = /^(netwrck|netwrckmodel|netwrckimg)$/i;
handler.limit = true;
export default handler;
