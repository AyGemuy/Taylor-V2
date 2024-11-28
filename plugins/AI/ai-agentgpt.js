import fetch from "node-fetch";
async function AgentGpt(
  question,
  history = [
    {
      type: "ai",
      data: {
        content: "Model AI",
        additional_kwargs: {},
      },
    },
  ],
) {
  const url = "https://mylangchain.vercel.app/api/agentchat";
  const headers = {
    "Content-Type": "application/json",
    "User-Agent":
      "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Mobile Safari/537.36",
    Referer: "https://mylangchain.vercel.app/?page=1",
  };
  const data = {
    bot: "",
    question: question,
    history: history,
    toolsSelect: [
      "Google Search",
      "WebPilot",
      "URL Reader",
      "Creature Generator",
      "Pinecone Store",
      "Medium plugin",
      "Filtir",
      "AI Agents",
      "Xpapers",
      "getit.ai plugins finder",
      "Eightify Insights",
      "Ukr-School-Books",
      "Welt NewsVerse",
      "Stories",
      "My Writing Companion",
      "Video Summary",
      "Check Website Down",
      "Paxi AI",
    ],
  };
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(data),
    });
    const result = await response.text();
    const { action_input: output } = JSON.parse(
      "{" + result.split("\n").slice(2, 5).join(""),
    );
    return output;
  } catch (error) {
    console.error(error);
  }
}
const handler = async (m, { conn, args, usedPrefix, command }) => {
  if (!db.data.dbai.agentgpt) db.data.dbai.agentgpt = {};
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
    const answer = await AgentGpt(inputText);
    const {
      key: { id: keyId },
    } = await conn.reply(m.chat, `${answer}`, m);
    db.data.dbai.agentgpt[m.sender] = {
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
  if (
    !db.data.dbai.agentgpt ||
    m.isBaileys ||
    !(m.sender in db.data.dbai.agentgpt)
  )
    return;
  const {
    key: { id: keyId },
  } = db.data.dbai.agentgpt[m.sender];
  if (m.quoted?.id === keyId && m.text.trim()) {
    m.react(wait);
    try {
      const answer = await AgentGpt(m.text.trim());
      const {
        key: { id: newKeyId },
      } = await conn.reply(m.chat, `${answer}`, m);
      db.data.dbai.agentgpt[m.sender].key.id = newKeyId;
      m.react(sukses);
    } catch (error) {
      console.error("Handler before error:", error);
      m.react(eror);
    }
  }
};
handler.help = ["agentgpt"];
handler.tags = ["ai"];
handler.command = /^(agentgpt)$/i;
export default handler;
