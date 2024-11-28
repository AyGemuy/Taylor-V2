import fetch from "node-fetch";
async function OpenGpt(prompt, id = "clf3yg8730000ih08ndbdi2v4") {
  try {
    const url = "https://open-gpt.app/api/generate";
    const headers = {
      "Content-Type": "application/json",
      "User-Agent":
        "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Mobile Safari/537.36",
      Referer: `https://open-gpt.app/id/app/${id}`,
    };
    const body = JSON.stringify({
      userInput: prompt,
      id: id,
      userKey: "",
    });
    const response = await fetch(url, {
      method: "POST",
      headers: headers,
      body: body,
    });
    if (!response.ok) throw new Error(response.statusText);
    return await response.text();
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
}
const handler = async (m, { conn, args, usedPrefix, command }) => {
  db.data.dbai.opengpt = db.data.dbai.opengpt || {};
  const sender = m.sender;
  if (command === "opengptset") {
    const newId = args[0];
    if (!newId) {
      return m.reply(
        `Masukkan ID baru untuk OpenGpt.\nContoh penggunaan:\n*${usedPrefix}opengptset clf3yg8730000ih08ndbdi2v4*`,
      );
    }
    db.data.dbai.opengpt[sender] = {
      id: newId,
    };
    return m.reply(`ID OpenGpt telah diubah menjadi: ${newId}`);
  }
  const inputText = args.length
    ? args.join(" ")
    : m.quoted?.text || m.quoted?.caption || null;
  if (!inputText) {
    return m.reply(
      `Masukkan teks atau reply pesan dengan teks yang ingin diolah.\nContoh penggunaan:\n*${usedPrefix}${command} Hai, apa kabar?*`,
    );
  }
  try {
    m.react(wait);
    const opengptData = db.data.dbai.opengpt[sender] || {};
    const id = opengptData.id || "clf3yg8730000ih08ndbdi2v4";
    const answer = await OpenGpt(inputText, id);
    if (!answer) return m.reply("Gagal mendapatkan respons dari OpenGpt.");
    const response = await conn.reply(m.chat, `${answer}`, m);
    const keyId = response?.key?.id || null;
    if (keyId) {
      db.data.dbai.opengpt[sender] = {
        key: {
          id: keyId,
        },
        id: id,
      };
    }
    m.react(sukses);
  } catch (error) {
    console.error(`Handler ${command} error:`, error);
    m.react(eror);
  }
};
handler.before = async (m, { conn }) => {
  const sender = m.sender;
  const userData = db.data.dbai.opengpt?.[sender] || {};
  const keyId = userData?.key?.id || null;
  const opengptId = userData.id || "clf3yg8730000ih08ndbdi2v4";
  if (m.quoted?.id === keyId && m.text.trim()) {
    try {
      m.react(wait);
      const answer = await OpenGpt(m.text.trim(), opengptId);
      if (!answer) return;
      const response = await conn.reply(m.chat, `${answer}`, m);
      const newKeyId = response?.key?.id || null;
      if (newKeyId) {
        db.data.dbai.opengpt[sender].key.id = newKeyId;
      }
      m.react(sukses);
    } catch (error) {
      console.error("Handler before error:", error);
      m.react(eror);
    }
  }
};
handler.help = ["opengpt", "opengptset"];
handler.tags = ["ai"];
handler.command = /^(opengpt|opengptset)$/i;
export default handler;
