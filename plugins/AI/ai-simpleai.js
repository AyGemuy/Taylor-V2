import fetch from "node-fetch";
async function SimpleAi(prompt) {
  const url = new URL("https://simple-ai.io/api/generate_sse");
  const params = new URLSearchParams({
    user_input: prompt,
    images: "",
    files: "",
    time: Date.now().toString(),
    session: Date.now().toString(),
    mem_length: "7",
    functions: "Time,Weather,Redirection",
    role: "",
    store: "",
    node: "",
    use_stats: false,
    use_eval: false,
    use_location: false,
    location: null,
    lang: "id-ID",
    use_system_role: true,
  });
  url.search = params.toString();
  try {
    const response = await fetch(url);
    return (await response.text())
      .split("\n")
      .filter(
        (line) =>
          line.startsWith("data: ") &&
          ![
            "###STATUS###",
            "###MODEL###",
            "###STATS###",
            "###RETURN###",
            "[DONE]",
          ].some((keyword) => line.slice(5).startsWith(keyword)),
      )
      .map((line) => line.slice(5))
      .join("")
      .trim();
  } catch (error) {
    console.error("Error in SimpleAi:", error);
    throw error;
  }
}
const handler = async (m, { conn, args, usedPrefix, command }) => {
  if (!db.data.dbai.simpleai) db.data.dbai.simpleai = {};
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
    const answer = await SimpleAi(inputText);
    const {
      key: { id: keyId },
    } = await conn.reply(m.chat, `${answer}`, m);
    db.data.dbai.simpleai[m.sender] = {
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
    !db.data.dbai.simpleai ||
    m.isBaileys ||
    !(m.sender in db.data.dbai.simpleai)
  )
    return;
  const {
    key: { id: keyId },
  } = db.data.dbai.simpleai[m.sender];
  if (m.quoted?.id === keyId && m.text.trim()) {
    m.react(wait);
    try {
      const answer = await SimpleAi(m.text.trim());
      const {
        key: { id: newKeyId },
      } = await conn.reply(m.chat, `${answer}`, m);
      db.data.dbai.simpleai[m.sender].key.id = newKeyId;
      m.react(sukses);
    } catch (error) {
      console.error("Handler before error:", error);
      m.react(eror);
    }
  }
};
handler.help = ["simpleai"];
handler.tags = ["ai"];
handler.command = /^(simpleai)$/i;
export default handler;
