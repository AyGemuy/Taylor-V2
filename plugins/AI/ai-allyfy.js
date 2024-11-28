import fetch from "node-fetch";
async function AllyfyChat(content) {
  try {
    const url = "https://chatbot.allyfy.chat/api/v1/message/stream/super/chat";
    const headers = {
      Accept: "text/event-stream",
      "Accept-Language": "en-US,en;q=0.9",
      "Content-Type": "application/json;charset=utf-8",
      DNT: "1",
      Origin: "https://www.allyfy.chat",
      Priority: "u=1, i",
      Referer: "https://www.allyfy.chat/",
      Referrer: "https://www.allyfy.chat",
      "Sec-CH-UA": '"Not/A)Brand";v="8", "Chromium";v="126"',
      "Sec-CH-UA-Mobile": "?0",
      "Sec-CH-UA-Platform": '"Linux"',
      "Sec-Fetch-Dest": "empty",
      "Sec-Fetch-Mode": "cors",
      "Sec-Fetch-Site": "same-site",
      "User-Agent":
        "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36",
    };
    const body = JSON.stringify({
      messages: [
        {
          content: content,
          role: "user",
        },
      ],
      content: content,
      baseInfo: {
        clientId: "q08kdrde1115003lyedfoir6af0yy531",
        pid: "38281",
        channelId: "100000",
        locale: "en-US",
        localZone: 180,
        packageName: "com.cch.allyfy.webh",
      },
    });
    const response = await fetch(url, {
      method: "POST",
      headers: headers,
      body: body,
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.text();
    const result = data
      .trim()
      .split("\n")
      .map((line) => {
        const json = line.slice(5);
        try {
          return JSON.parse(json).content;
        } catch {
          return null;
        }
      })
      .filter(Boolean)
      .join("");
    return result;
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}
const handler = async (m, { conn, args, usedPrefix, command }) => {
  if (!db.data.dbai.allyfy) db.data.dbai.allyfy = {};
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
    const answer = await AllyfyChat(inputText);
    const {
      key: { id: keyId },
    } = await conn.reply(m.chat, `${answer}`, m);
    db.data.dbai.allyfy[m.sender] = {
      key: {
        id: keyId,
      },
    };
    m.react(sukses);
  } catch (error) {
    console.error("Handler error:", error);
    m.react(eror);
  }
};
handler.before = async (m, { conn }) => {
  if (!db.data.dbai.allyfy || m.isBaileys || !(m.sender in db.data.dbai.allyfy))
    return;
  const {
    key: { id: keyId },
  } = db.data.dbai.allyfy[m.sender];
  if (m.quoted?.id === keyId && m.text.trim()) {
    m.react(wait);
    try {
      const answer = await AllyfyChat(m.text.trim());
      const {
        key: { id: newKeyId },
      } = await conn.reply(m.chat, `${answer}`, m);
      db.data.dbai.allyfy[m.sender].key.id = newKeyId;
      m.react(sukses);
    } catch (error) {
      console.error("Handler before error:", error);
      m.react(eror);
    }
  }
};
handler.help = ["allyfy"];
handler.tags = ["ai"];
handler.command = /^(allyfy)$/i;
export default handler;
