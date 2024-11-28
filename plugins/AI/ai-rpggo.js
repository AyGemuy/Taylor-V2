import fetch from "node-fetch";
async function RPGGO(content, character_id) {
  try {
    const url = "https://backend-pro-qavdnvfe5a-uc.a.run.app/open/game/chatsse";
    const headers = {
      "Application-ID": "rpggo-peking_duck",
      "Content-Type": "application/json",
      Authorization:
        "Bearer 15E1DB225B0D2433EC7291C4222C688DEAED4E8CD0A56C93BBF19E57FB416BD5",
      payload:
        "eyJ1c2VyX2lkIjoibXhwVmMwX19SU2pGM3BoWlNRY2N2Iiwic291cmNlIjoid2ViLWdhbWUiLCJpcCI6IiIsImFnZW50IjoiIn0=",
      accept: "text/event-stream",
      "User-Agent":
        "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Mobile Safari/537.36",
      Referer:
        "https://rpggo.ai/game/0e2f0f34-1717-4751-b0e8-549645cac6a4#/game?gameId=0e2f0f34-1717-4751-b0e8-549645cac6a4",
    };
    const body = JSON.stringify({
      game_id: "0e2f0f34-1717-4751-b0e8-549645cac6a4",
      character_id: character_id || "ac6fe4ed-00ea-4e7b-a916-4e9d8b53cc4d",
      message: content,
      user_id: "mxpVc0__RSjF3phZSQccv",
      back_push: false,
      session_id: "nK74vW2sznnZEWDmmF5qE",
      message_id: "ZCh9wDBu-5JpYtgiCYSvO",
    });
    const response = await fetch(url, {
      method: "POST",
      headers: headers,
      body: body,
    });
    const output = await response.text();
    return output
      .split("\n\n")
      .filter(Boolean)
      .map((msg) => msg.split("\n"))
      .flat()
      .filter((part) => part.startsWith("data:"))
      .map((part) => {
        try {
          return JSON.parse(part.slice(5).trim());
        } catch (e) {
          return null;
        }
      })
      .filter(
        (parsed) =>
          parsed &&
          parsed.data &&
          parsed.data.result &&
          parsed.data.result.text,
      )
      .map((parsed) => parsed.data.result.text)
      .join("")
      .trim();
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}
const handler = async (m, { conn, args, usedPrefix, command }) => {
  if (!db.data.dbai.rpggo) db.data.dbai.rpggo = {};
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
    const answer = await RPGGO(inputText);
    const {
      key: { id: keyId },
    } = await conn.reply(m.chat, `${answer}`, m);
    db.data.dbai.rpggo[m.sender] = {
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
  if (!db.data.dbai.rpggo || m.isBaileys || !(m.sender in db.data.dbai.rpggo))
    return;
  const {
    key: { id: keyId },
  } = db.data.dbai.rpggo[m.sender];
  if (m.quoted?.id === keyId && m.text.trim()) {
    m.react(wait);
    try {
      const answer = await RPGGO(m.text.trim());
      const {
        key: { id: newKeyId },
      } = await conn.reply(m.chat, `${answer}`, m);
      db.data.dbai.rpggo[m.sender].key.id = newKeyId;
      m.react(sukses);
    } catch (error) {
      console.error("Handler before error:", error);
      m.react(eror);
    }
  }
};
handler.help = ["rpggo"];
handler.tags = ["ai"];
handler.command = /^(rpggo)$/i;
export default handler;
