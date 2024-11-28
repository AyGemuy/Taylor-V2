import fetch from "node-fetch";
async function AiXdash(content) {
  try {
    const response = await fetch("https://www.xdash.ai/api/query", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "*/*",
        "User-Agent":
          "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Mobile Safari/537.36",
        Referer: "https://www.xdash.ai/search?q=" + content,
      },
      body: JSON.stringify({
        query: content,
        search_uuid: "UeobIeXGOEB8MfdunbU9b",
        visitor_uuid: "6167835e06d725a1de2b09f24266c5e5",
        token: "U2FsdGVkX18zduZOiKyREqfQHMIddN0eIExQYnrxAJI=",
      }),
    });
    const splitAndFormat = (input) => {
      const [llm, related] = ["__LLM_RESPONSE__", "__RELATED_QUESTIONS__"].map(
        (tag) => input.indexOf(tag),
      );
      return {
        answer: JSON.parse(input.slice(0, llm).trim()),
        llm: input
          .slice(llm + 16, related)
          .replace(/\s*\[citation:\d+\]\s*/g, "")
          .trim(),
        related: JSON.parse(input.slice(related + 21).trim()),
      };
    };
    const cleanText = (text) =>
      text.replace(/&[#A-Za-z0-9]+;/g, (match) => {
        const entities = {
          "&amp;": "&",
          "&#x27;": "'",
          "&quot;": '"',
          "&lt;": "<",
          "&gt;": ">",
          "&nbsp;": " ",
          "&apos;": "'",
          "&#39;": "'",
        };
        return entities[match] || match;
      });
    const formatOutput = ({ answer, llm, related }) =>
      [
        `${llm ?? ""}`,
        answer
          ?.map((a) => `*${a.name}*\n${cleanText(a.snippet)}\n🔗 ${a.url}`)
          .join("\n\n") ?? "",
        `*Terkait:*\n${related?.map((r) => `• ${r.question}`).join("\n") ?? ""}`,
      ]
        .filter(Boolean)
        .join("\n\n");
    return formatOutput(splitAndFormat(await response.text()));
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}
const handler = async (m, { conn, args, usedPrefix, command }) => {
  if (!db.data.dbai.aixdash) db.data.dbai.aixdash = {};
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
    const answer = await AiXdash(inputText);
    const {
      key: { id: keyId },
    } = await conn.reply(m.chat, `${answer}`, m);
    db.data.dbai.aixdash[m.sender] = {
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
    !db.data.dbai.aixdash ||
    m.isBaileys ||
    !(m.sender in db.data.dbai.aixdash)
  )
    return;
  const {
    key: { id: keyId },
  } = db.data.dbai.aixdash[m.sender];
  if (m.quoted?.id === keyId && m.text.trim()) {
    m.react(wait);
    try {
      const answer = await AiXdash(m.text.trim());
      const {
        key: { id: newKeyId },
      } = await conn.reply(m.chat, `${answer}`, m);
      db.data.dbai.aixdash[m.sender].key.id = newKeyId;
      m.react(sukses);
    } catch (error) {
      console.error("Handler before error:", error);
      m.react(eror);
    }
  }
};
handler.help = ["aixdash"];
handler.tags = ["ai"];
handler.command = /^(aixdash)$/i;
export default handler;
