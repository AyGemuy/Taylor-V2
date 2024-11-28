import fetch from "node-fetch";
const extractImageData = async (response) => {
  try {
    const arrayBuffer = await response.arrayBuffer();
    return arrayBuffer;
  } catch {
    return "Error processing image.";
  }
};
const sendImageRequest = async (payload) => {
  try {
    const url = "https://venice.ai/api/inference/image";
    const headers = {
      "Content-Type": "application/json",
      "X-Venice-Version": "20240907.194627",
      "User-Agent":
        "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Mobile Safari/537.36",
      Referer: "https://venice.ai/chat/DDz1ZzxfuwvLcDPLkWOrE",
    };
    const response = await fetch(url, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(payload),
    });
    return await extractImageData(response);
  } catch (error) {
    console.error("Error:", error);
    return "Error generating image.";
  }
};
const extractChatData = async (response) => {
  try {
    const text = await response.text();
    return text
      .split("\n")
      .map((line) => {
        try {
          return JSON.parse(line).content || "";
        } catch {
          return "";
        }
      })
      .join("");
  } catch {
    return "Error processing chat response.";
  }
};
const sendChatRequest = async (payload) => {
  try {
    const url = "https://venice.ai/api/inference/chat";
    const headers = {
      "Content-Type": "application/json",
      "X-Venice-Version": "20240907.194627",
      "User-Agent":
        "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Mobile Safari/537.36",
      Referer: "https://venice.ai/chat/DDz1ZzxfuwvLcDPLkWOrE",
    };
    const response = await fetch(url, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(payload),
    });
    return await extractChatData(response);
  } catch (error) {
    console.error("Error:", error);
    return "Error generating chat.";
  }
};
const handler = async (m, { conn, args, usedPrefix, command }) => {
  if (!db.data.dbai.veniceai) db.data.dbai.veniceai = {};
  const session = db.data.dbai.veniceai[m.sender];
  const inputText = args.length
    ? args.join(" ")
    : m.quoted?.text || m.quoted?.caption || m.quoted?.description || null;
  if (!inputText) {
    return m.reply(
      `Masukkan teks atau reply pesan dengan teks yang ingin diolah.\nContoh penggunaan:\n*${usedPrefix}${command} Hai, apa kabar?*`,
    );
  }
  m.react(wait);
  try {
    let data;
    switch (command) {
      case "venicechat":
        const chatPayload = {
          requestId: "YmILofi",
          modelId: "hermes-2-theta-web",
          prompt: [
            {
              content: inputText,
              role: "user",
            },
          ],
          systemPrompt: "",
          conversationType: "text",
          temperature: 0.8,
          topP: 0.9,
        };
        data = await sendChatRequest(chatPayload);
        const answer = data?.trim();
        if (answer) {
          const {
            key: { id: keyId },
          } = await conn.reply(m.chat, answer, m);
          db.data.dbai.veniceai[m.sender] = {
            key: {
              id: keyId,
            },
            cmd: command,
          };
          m.react(sukses);
        } else {
          m.react(eror);
        }
        break;
      case "veniceimg":
        const imagePayload = {
          modelId: "fluently-xl-final-akash",
          requestId: "i27gFCH",
          prompt: inputText,
          seed: 20240908,
          negativePrompt: "",
          cfgScale: 5,
          aspectRatio: "1:1",
          width: 1024,
          height: 1024,
          customSeed: "random",
          steps: 30,
          isCustomSeed: false,
          isHighRes: false,
          safeVenice: true,
          stylePreset: "",
          hideWatermark: false,
          favoriteImageStyles: [],
          stylesTab: 0,
        };
        data = await sendImageRequest(imagePayload);
        if (data instanceof ArrayBuffer) {
          const {
            key: { id: keyId },
          } = await conn.sendFile(
            m.chat,
            Buffer.from(data),
            "",
            "Generated Image",
            m,
            false,
            {
              mentions: [m.sender],
            },
          );
          db.data.dbai.veniceai[m.sender] = {
            key: {
              id: keyId,
            },
            cmd: command,
          };
          m.react(sukses);
        } else {
          m.react(eror);
        }
        break;
      default:
        return;
    }
  } catch (error) {
    console.error("Handler error:", error);
    m.react(eror);
  }
};
handler.before = async (m, { conn }) => {
  if (
    !db.data.dbai.veniceai ||
    m.isBaileys ||
    !(m.sender in db.data.dbai.veniceai)
  )
    return;
  const {
    key: { id: keyId },
    cmd,
  } = db.data.dbai.veniceai[m.sender];
  if (m.quoted?.id === keyId && m.text.trim()) {
    m.react(wait);
    try {
      const inputText = m.text.trim();
      let data;
      switch (cmd) {
        case "venicechat":
          const chatPayload = {
            requestId: "YmILofi",
            modelId: "hermes-2-theta-web",
            prompt: [
              {
                content: inputText,
                role: "user",
              },
            ],
            systemPrompt: "",
            conversationType: "text",
            temperature: 0.8,
            topP: 0.9,
          };
          data = await sendChatRequest(chatPayload);
          const answer = data?.trim();
          if (answer) {
            const {
              key: { id: newKeyId },
            } = await conn.reply(m.chat, answer, m);
            db.data.dbai.veniceai[m.sender].key.id = newKeyId;
            m.react(sukses);
          } else {
            m.react(eror);
          }
          break;
        case "veniceimg":
          const imagePayload = {
            modelId: "fluently-xl-final-akash",
            requestId: "i27gFCH",
            prompt: inputText,
            seed: 20240908,
            negativePrompt: "",
            cfgScale: 5,
            aspectRatio: "1:1",
            width: 1024,
            height: 1024,
            customSeed: "random",
            steps: 30,
            isCustomSeed: false,
            isHighRes: false,
            safeVenice: true,
            stylePreset: "",
            hideWatermark: false,
            favoriteImageStyles: [],
            stylesTab: 0,
          };
          data = await sendImageRequest(imagePayload);
          if (data instanceof ArrayBuffer) {
            const {
              key: { id: newKeyId },
            } = await conn.sendFile(
              m.chat,
              Buffer.from(data),
              "",
              "Generated Image",
              m,
              false,
              {
                mentions: [m.sender],
              },
            );
            db.data.dbai.veniceai[m.sender].key.id = newKeyId;
            m.react(sukses);
          } else {
            m.react(eror);
          }
          break;
        default:
          return;
      }
    } catch (error) {
      console.error("Handler before error:", error);
      m.react(eror);
    }
  }
};
handler.help = ["venicechat", "veniceimg"];
handler.tags = ["ai"];
handler.command = /^(venicechat|veniceimg)$/i;
export default handler;
