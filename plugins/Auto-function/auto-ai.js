import axios from "axios";
import crypto from "crypto";
export async function before(m) {
  const chat = db.data.chats[m.chat];
  const database = db.data.database.talkai;
  if (database, m.isBaileys || !m.text || !chat.autoAi) return !1;
  const text = m.text;
  try {
    if (chat.autoAi) {
      if (chat.autoAi && "talkaitype" === text?.split(" ")[0]) {
        const requestedType = text?.split(" ")[1];
        return "chat" === requestedType || "image" === requestedType ? (database.type = requestedType, void await this.reply(m.chat, "Tipe berhasil di set: " + requestedType, m)) : void await this.reply(m.chat, "Tipe yang tersedia: chat, image", m);
      }
      if ("talkaitype" !== text?.split(" ")[0]) {
        const openAIResponse = await TalkAI(database.type, text);
        if (openAIResponse)
          if ("image" === database.type) {
            const result = openAIResponse;
            await this.reply(m.chat, result.data[0]?.url, m);
          } else if ("chat" === database.type) {
          const anu = openAIResponse.split("\n").filter(line => line.trim().startsWith("data: ")).map(line => line.replace(/data: |\n/g, "")).join("").replace(/\\n/g, "\n") || "";
          await this.reply(m.chat, anu, m);
        }
      }
    }
  } catch (error) {
    console.error("Terjadi kesalahan:", error), await this.reply(m.chat, "Error occurred.", m);
  }
}
export const disabled = !1;

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