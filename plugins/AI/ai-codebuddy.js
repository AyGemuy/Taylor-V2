import fetch from "node-fetch";
const handler = async (m, {
  command,
  usedPrefix,
  conn,
  text,
  args
}) => {
  const input_data = ["cleo", "ai", "ferdie"];
  let [urutan, tema] = text.split("|");
  if (!tema) return m.reply("Input query!\n*Example:*\n.codebuddy [nomor]|[query]");
  m.react(wait);
  try {
    let data = input_data.map((item, index) => ({
      title: item.toUpperCase(),
      id: item
    }));
    if (!urutan) return m.reply("Input query!\n*Example:*\n.codebuddy [nomor]|[query]\n\n*Pilih angka yg ada*\n" + data.map((item, index) => `*${index + 1}.* ${item.title}`).join("\n"));
    if (isNaN(urutan)) return m.reply("Input query!\n*Example:*\n.codebuddy [nomor]|[query]\n\n*Pilih angka yg ada*\n" + data.map((item, index) => `*${index + 1}.* ${item.title}`).join("\n"));
    if (urutan > data.length) return m.reply("Input query!\n*Example:*\n.codebuddy [nomor]|[query]\n\n*Pilih angka yg ada*\n" + data.map((item, index) => `*${index + 1}.* ${item.title}`).join("\n"));
    let out = data[urutan - 1].id;
    const openAIResponse = await CodeBuddy(tema, out);
    if (openAIResponse) {
      if ("cleo" === out) {
        const result = openAIResponse;
        await conn.sendMessage(m.chat, {
          text: result
        }, {
          quoted: m
        });
      } else if ("ai" === out) {
        const result = openAIResponse;
        await conn.sendMessage(m.chat, {
          text: result
        }, {
          quoted: m
        });
      } else if ("ferdie" === out) {
        const result = openAIResponse;
        await conn.sendMessage(m.chat, {
          text: result
        }, {
          quoted: m
        });
      }
    } else console.log("Tidak ada respons dari OpenAI atau terjadi kesalahan.");
  } catch (e) {
    m.react(eror);
  }
};
handler.help = ["codebuddy *[nomor]|[query]*"], handler.tags = ["ai"], handler.command = /^(codebuddy)$/i;
export default handler;
async function CodeBuddy(prompt, system) {
  const availableSystems = ["cleo", "ai", "ferdie"];
  try {
    if (!prompt) return "Input prompt tidak ada";
    if (!system || !availableSystems.includes(system)) return availableSystems;
    const response = await fetch("https://codebuddy-server.onrender.com/" + system, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        prompt: prompt,
        user: "You"
      })
    });
    return (await response.json()).msg;
  } catch (error) {
    console.log(error);
  }
}