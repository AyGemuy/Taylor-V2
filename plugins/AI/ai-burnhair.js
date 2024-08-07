import fetch from "node-fetch";
const handler = async (m, {
  conn,
  args,
  usedPrefix,
  command
}) => {
  const text = args.length ? args.join(" ") : m.quoted?.text || m.quoted?.caption || m.quoted?.description || null;
  if (conn.burnhair = conn.burnhair || {
      model: "gpt-3.5-turbo"
    }, !text) return m.reply(`Masukkan teks atau balas pesan dengan teks yang ingin diolah.\nContoh penggunaan:\n*${usedPrefix}${command} Hai, apa kabar?*`);
  try {
    switch (command) {
      case "aiburnhair":
        const aiResponse = await AIBurnHair(conn.burnhair.model, [{
          role: "system",
          content: "Saya AI dari OpenAI, diciptakan untuk membantu Anda mengeksplorasi ide, bertukar informasi, dan menyelesaikan masalah. Ada yang bisa saya bantu?"
        }, {
          role: "user",
          content: text
        }]);
        return m.reply(aiResponse);
      case "modelburnhair":
        const index = parseInt(args[0]) - 1,
          modelData = await ModelBurnHair();
        if (index < 0 || index >= modelData.data.length) {
          const categoryList = modelData.data.map((v, i) => `*${i + 1}.* ${v.id}`).join("\n");
          return m.reply(`Nomor kategori tidak valid. Pilih nomor antara 1 dan ${modelData.data.length}.\nKategori yang tersedia:\n${categoryList}`);
        }
        return conn.burnhair.model = modelData.data[index].id, m.reply(`Sukses set model: ${modelData.data[index].id}`);
      case "ttsburnhair":
        const ttsData = await TtsBurnHair(text);
        return await conn.sendFile(m.chat, ttsData, "", "", m, !0);
      case "dalleburnhair":
        const dalleData = await DalleBurnHair(text);
        return await conn.sendFile(m.chat, dalleData.data[0]?.url, "", dalleData.data[0]?.revised_prompt, m);
    }
  } catch (e) {
    return m.reply("Terjadi kesalahan.");
  }
};
handler.help = ["aiburnhair", "modelburnhair", "ttsburnhair", "dalleburnhair"],
  handler.tags = ["ai"], handler.command = /^(aiburnhair|modelburnhair|ttsburnhair|dalleburnhair)$/i;
export default handler;
async function AIBurnHair(model, messages) {
  try {
    const response = await fetch("https://burn.hair/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: "Bearer sk-5cEKSH8D75jFJlDWC46b222b2bB440Ec98F477AfC4Bf9202",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: model,
          messages: messages,
          temperature: .7
        })
      }),
      data = await response.json();
    return data.choices[0]?.message?.content;
  } catch (e) {
    throw new Error("Error fetching data from AI service.");
  }
}
async function ModelBurnHair() {
  try {
    const response = await fetch("https://burn.hair/v1/models", {
      method: "GET",
      headers: {
        Authorization: "Bearer sk-5cEKSH8D75jFJlDWC46b222b2bB440Ec98F477AfC4Bf9202",
        "Content-Type": "application/json"
      }
    });
    return await response.json();
  } catch (e) {
    throw new Error("Error fetching data from AI service.");
  }
}
async function DalleBurnHair(prompt) {
  try {
    const response = await fetch("https://burn.hair/v1/images/generations", {
      method: "POST",
      headers: {
        Authorization: "Bearer sk-5cEKSH8D75jFJlDWC46b222b2bB440Ec98F477AfC4Bf9202",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "dall-e-3",
        prompt: prompt,
        n: 1,
        size: "1024x1024"
      })
    });
    return await response.json();
  } catch (e) {
    throw new Error("Error fetching data from AI service.");
  }
}
async function TtsBurnHair(input) {
  try {
    const response = await fetch("https://burn.hair/v1/audio/speech", {
      method: "POST",
      headers: {
        Authorization: "Bearer sk-5cEKSH8D75jFJlDWC46b222b2bB440Ec98F477AfC4Bf9202",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "tts-1",
        input: input,
        voice: "alloy"
      })
    });
    return await response.arrayBuffer();
  } catch (e) {
    throw new Error("Error fetching data from AI service.");
  }
}