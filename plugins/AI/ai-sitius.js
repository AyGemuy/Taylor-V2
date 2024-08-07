import fetch from "node-fetch";
const handler = async (m, {
  command,
  usedPrefix,
  conn,
  text,
  args
}) => {
  const input_data = await generateModel();
  let [urutan, tema] = text.split("|");
  if (!tema) return m.reply("Input query!\n*Example:*\n" + usedPrefix + command + " [nomor]|[query]");
  m.react(wait);
  try {
    let data = input_data.map((item, index) => ({
      title: item.replace(/[_-]/g, " ").replace(/\..*/, ""),
      id: item
    }));
    if (!urutan) return m.reply("Input query!\n*Example:*\n" + usedPrefix + command + " [nomor]|[query]\n\n*Pilih angka yg ada*\n" + data.map((item, index) => `*${index + 1}.* ${item.title}`).join("\n"));
    if (isNaN(urutan)) return m.reply("Input query!\n*Example:*\n" + usedPrefix + command + " [nomor]|[query]\n\n*Pilih angka yg ada*\n" + data.map((item, index) => `*${index + 1}.* ${item.title}`).join("\n"));
    if (urutan > data.length) return m.reply("Input query!\n*Example:*\n" + usedPrefix + command + " [nomor]|[query]\n\n*Pilih angka yg ada*\n" + data.map((item, index) => `*${index + 1}.* ${item.title}`).join("\n"));
    let out = data[urutan - 1].id;
    const openAIResponse = await generateImage(out, tema);
    if (openAIResponse) {
      const result = openAIResponse,
        tag = `@${m.sender.split("@")[0]}`;
      await conn.sendMessage(m.chat, {
        image: {
          url: result.url
        },
        caption: `Nih effect *${out}* nya\nRequest by: ${tag}`,
        mentions: [m.sender]
      }, {
        quoted: m
      });
    } else console.log("Tidak ada respons dari OpenAI atau terjadi kesalahan.");
  } catch (e) {
    m.react(eror);
  }
};
handler.help = ["sitius *[nomor]|[query]*"], handler.tags = ["ai"], handler.command = /^(sitius)$/i;
export default handler;
async function generateImage(model, prompt) {
  try {
    const response = await fetch("https://api.sitius.tech/gen/", {
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        prompt: prompt,
        negative: "",
        model: model
      })
    });
    if (response.ok) {
      return await response.json();
    }
    throw new Error("Gagal melakukan permintaan ke server");
  } catch (error) {
    throw console.error("Terjadi kesalahan:", error), error;
  }
}
async function generateModel() {
  try {
    const response = await fetch("https://api.sitius.tech/models/", {
      method: "GET",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json"
      }
    });
    if (response.ok) {
      return await response.json();
    }
    throw new Error("Gagal melakukan permintaan ke server");
  } catch (error) {
    throw console.error("Terjadi kesalahan:", error), error;
  }
}