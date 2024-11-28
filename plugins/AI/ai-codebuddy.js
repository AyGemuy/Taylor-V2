import fetch from "node-fetch";
import crypto from "crypto";
const CodeBuddy = async (prompt) => {
  if (!prompt) return "Input prompt tidak ada";
  try {
    const response = await fetch(
      "https://finechatserver.erweima.ai/api/v1/gpts/chat",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: "",
          uniqueId: "89b7c1ed3be7b8a49374c5cc8d42f7de",
          verify:
            "0.28JhAvoDeZyRg7pvyv5YLpchKu895VkD4qq-R5bM5u1y9pQFLrCfVah3pg9T9-0xPCEjsAIEFJsQyqUcg5Qrz3BOLmTjmq1j9dewCREeH94n50jue5OuNTs1CoTVKxufXlq3kLBq22IQje2SeMwIifBNAF9dO14CTbNqrL5iExLasORvtXkYpFdRCizgiNg4ZUHq1miWLqPqs3DePAaNUd5SAkm5xXUd4o6ISvOTScBxtae35ACK3TsQUsQt_P3tEA9yc8lx4r1gZhv86IAeZ8-N68gz6Q7myKtH4CnAgF0LVPCLPOSrH5iCautHIzjKWQxlgWp1nAc6yF8ataFkdlZ00GNtL0F4VNjxR1pzBK16Oowiqx2Kg5aS4rPBBu_BeBnuG92hG_1nqD68oxdGYUtrSzV_Y8gTwVtjjzaXY4fqeoV8EXqZPBDq1Ou-YnTQI2qvs_2BlNFgFvztps1Xalz7QH3cLqm-f_0uUCzltBbGGEt0R4HAwteddfTCHA6ovR4_gwHUbVRm8RGPveyxihl6Jba_7MpURETwDqCJp1KeZHOlFR2yZl3_G0Q-wSbnYD7z1foUOzuaDqjBHPUJJDcy5ila6s_VOm-sWHGcTfGO1WBNOzHcH1W8fCR1cl9Br7LnQWI2dtubaJ-R1lGXqr1tovMlCEyr7auHOzMwzrn4yXlEv2fh_pO9moquy7H6p0hehog0MyjM0wl1Q61Rl0E7_LegJ0URHUNVzepDbT1PwK4S67iyRYNNSYAJXdQ2.8tiSJo8iKJyc6GPqD2RWYA.f263881b992e7f240b5bb73b11b12d82e573e00e99efe72b30c7a2ea1f1f2db9",
          "User-Agent":
            "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Mobile Safari/537.36",
          Referer: "https://www.yeschat.ai/gpts-9t557I9gPVJ-Code-Buddy",
        },
        body: JSON.stringify({
          prompt: prompt,
          conversationId: "691aea03d42849d8b076f4dfa32fe353",
          attachments: [],
          gptsId: 113049,
          firstQuestionFlag: true,
        }),
      },
    );
    const responseText = await response.text();
    const lines = responseText.trim().split("\n");
    const filteredLines = lines.slice(0, -1);
    const messages = filteredLines
      .map((line) => {
        try {
          return JSON.parse(line).data.message || "";
        } catch {
          return "";
        }
      })
      .filter(Boolean)
      .join("");
    return messages;
  } catch (error) {
    console.error("CodeBuddy fetch error:", error);
    return "Terjadi kesalahan saat memproses permintaan.";
  }
};
const handler = async (m, { command, usedPrefix, conn, args }) => {
  if (!db.data.dbai.codebuddy) db.data.dbai.codebuddy = {};
  const session = db.data.dbai.codebuddy[m.sender];
  const query = args.length
    ? args.join(" ")
    : m.quoted?.text || m.quoted?.caption || m.quoted?.description || null;
  if (!query) {
    return m.reply(
      `Masukkan teks atau reply pesan dengan teks yang ingin diolah.\nContoh penggunaan:\n*${usedPrefix}${command} Hai, apa kabar?*`,
    );
  }
  m.react(wait);
  try {
    const response = await CodeBuddy(query);
    if (response) {
      const {
        key: { id: keyId },
      } = await conn.reply(m.chat, `${response}`, m);
      db.data.dbai.codebuddy[m.sender] = {
        key: {
          id: keyId,
        },
      };
      m.react(sukses);
    } else {
      console.log("Tidak ada respons dari CodeBuddy atau terjadi kesalahan.");
      m.react(eror);
    }
  } catch (error) {
    console.error("Handler error:", error);
    m.react(eror);
  }
};
handler.before = async (m, { conn }) => {
  if (
    !db.data.dbai.codebuddy ||
    m.isBaileys ||
    !(m.sender in db.data.dbai.codebuddy)
  )
    return;
  const {
    key: { id: keyId },
  } = db.data.dbai.codebuddy[m.sender];
  if (m.quoted?.id === keyId && m.text.trim()) {
    m.react(wait);
    try {
      const response = await CodeBuddy(m.text.trim());
      if (response) {
        const {
          key: { id: newKeyId },
        } = await conn.reply(m.chat, `${response}`, m);
        db.data.dbai.codebuddy[m.sender].key.id = newKeyId;
        m.react(sukses);
      } else {
        console.log("Tidak ada respons dari CodeBuddy atau terjadi kesalahan.");
        m.react(eror);
      }
    } catch (error) {
      console.error("Handler before error:", error);
      m.react(eror);
    }
  }
};
handler.help = ["codebuddy *[query]*"];
handler.tags = ["ai"];
handler.command = /^(codebuddy)$/i;
export default handler;
