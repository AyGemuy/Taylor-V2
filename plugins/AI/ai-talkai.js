import axios from "axios";
import crypto from "crypto";
const handler = async (m, {
  command,
  usedPrefix,
  conn,
  text,
  args
}) => {
  const input_data = ["chat", "image"];
  let [urutan, tema] = text.split("|");
  if (!tema) return m.reply("Input query!\n*Example:*\n.talkai [nomor]|[query]");
  m.reply("Menunggu hasil...");
  try {
    let data = input_data.map((item, index) => ({
      title: item.toUpperCase(),
      id: item
    }));
    if (!urutan || isNaN(urutan) || urutan > data.length) return m.reply("Input query!\n*Example:*\n.talkai [nomor]|[query]\n\n*Pilih angka yang ada*\n" + data.map((item, index) => `*${index + 1}.* ${item.title}`).join("\n"));
    let out = data[urutan - 1].id;
    const openAIResponse = await TalkAI(out, tema);
    if (openAIResponse) {
      if ("image" === out) {
        const result = openAIResponse,
          tag = `@${m.sender.split("@")[0]}`;
        await conn.sendMessage(m.chat, {
          image: {
            url: result.data[0]?.url
          },
          caption: `Nih effect *${out}* nya\nRequest by: ${tag}`,
          mentions: [m.sender]
        }, {
          quoted: m
        });
      } else if ("chat" === out) {
        const anu = openAIResponse.split("\n").filter(line => line.trim().startsWith("data: ")).map(line => line.replace(/data: |\n/g, "")).join("").replace(/\\n/g, "\n") || "";
        await conn.sendMessage(m.chat, {
          text: anu
        }, {
          quoted: m
        });
      }
    } else console.log("Tidak ada respons dari OpenAI atau terjadi kesalahan."), m.reply("Tidak ada respons dari OpenAI atau terjadi kesalahan.");
  } catch (e) {
    console.error("Terjadi kesalahan:", e), m.reply("Terjadi kesalahan dalam melakukan permintaan.");
  }
};
handler.help = ["talkai *[nomor]|[query]*"], handler.tags = ["ai"], handler.command = /^(talkai)$/i;
export default handler;

function userAgent() {
  const androidVersions = ["4.0.3", "4.1.1", "4.2.2", "4.3", "4.4", "5.0.2", "5.1", "6.0", "7.0", "8.0", "9.0", "10.0", "11.0"],
    deviceModels = ["M2004J19C", "S2020X3", "Xiaomi4S", "RedmiNote9", "SamsungS21", "GooglePixel5"],
    buildVersions = ["RP1A.200720.011", "RP1A.210505.003", "RP1A.210812.016", "QKQ1.200114.002", "RQ2A.210505.003"],
    selectedModel = deviceModels[Math.floor(Math.random() * deviceModels.length)],
    selectedBuild = buildVersions[Math.floor(Math.random() * buildVersions.length)],
    chromeVersion = `Chrome/${Math.floor(80 * Math.random()) + 1}.${Math.floor(999 * Math.random()) + 1}.${Math.floor(9999 * Math.random()) + 1}`;
  return `Mozilla/5.0 (Linux; Android ${androidVersions[Math.floor(Math.random() * androidVersions.length)]}; ${selectedModel} Build/${selectedBuild}) AppleWebKit/537.36 (KHTML, like Gecko) ${chromeVersion} Mobile Safari/537.36 WhatsApp/1.${Math.floor(9 * Math.random()) + 1}.${Math.floor(9 * Math.random()) + 1}`;
}
async function TalkAI(type, message) {
  try {
    const headers = {
        "User-Agent": userAgent(),
        Referer: "https://talkai.info/id/chat/",
        "X-Forwarded-For": crypto.randomBytes(4).join(".")
      },
      data = {
        temperature: .5,
        frequency_penalty: 0,
        type: type,
        messagesHistory: [{
          from: "chatGPT",
          content: "Saya AI dari OpenAI, diciptakan untuk membantu Anda mengeksplorasi ide, bertukar informasi, dan menyelesaikan masalah. Ada yang bisa saya bantu?"
        }, {
          from: "you",
          content: message
        }],
        message: message
      };
    return (await axios.post("https://talkai.info/id/chat/send/", data, {
      headers: headers
    })).data || (await axios.post("https://talkai.info/id/chat/send2/", data, {
      headers: headers
    })).data;
  } catch (error) {
    throw console.error("Terjadi kesalahan:", error), new Error("Error occurred in TalkAI");
  }
}