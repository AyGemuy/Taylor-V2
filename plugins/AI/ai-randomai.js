import fetch from "node-fetch";
const RandomAi = async (cmd, inputText) => {
  const params = new URLSearchParams(
    cmd === "farid"
      ? {
          q: encodeURIComponent(inputText),
        }
      : {
          message: encodeURIComponent(inputText),
        },
  );
  try {
    const res = await fetch(`https://api.agatz.xyz/api/${cmd}?${params}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return (await res.json()).data;
  } catch (error) {
    console.error("AI response fetch failed:", error);
    throw new Error("AI response fetch failed.");
  }
};
const handler = async (m, { conn, args, usedPrefix, command }) => {
  if (!db.data.dbai.randomai) db.data.dbai.randomai = {};
  const inputText =
    args.length >= 1
      ? args.slice(0).join(" ")
      : (m.quoted && m.quoted?.text) ||
        m.quoted?.caption ||
        m.quoted?.description ||
        null;
  if (!inputText) {
    return m.reply(
      `Masukkan teks atau reply pesan dengan teks yang ingin diolah.\nContoh penggunaan:\n*${usedPrefix}${command} Hai, apa kabar?*`,
    );
  }
  m.react(wait);
  try {
    const answer = await RandomAi(command.slice(0, -2), inputText);
    const {
      key: { id: keyId },
    } = await conn.reply(m.chat, answer, m);
    db.data.dbai.randomai[m.sender] = {
      key: {
        id: keyId,
      },
      cmd: command.slice(0, -2),
    };
    m.react(sukses);
  } catch (error) {
    console.error("Handler error:", error);
    m.react(eror);
  }
};
handler.before = async (m, { conn }) => {
  if (
    !db.data.dbai.randomai ||
    m.isBaileys ||
    !(m.sender in db.data.dbai.randomai)
  )
    return;
  const {
    key: { id: keyId },
    cmd,
  } = db.data.dbai.randomai[m.sender];
  if (m.quoted?.id === keyId && cmd && m.text.trim()) {
    m.react(wait);
    try {
      const answer = await RandomAi(cmd, encodeURIComponent(m.text.trim()));
      const {
        key: { id: newKeyId },
      } = await conn.reply(m.chat, answer, m);
      db.data.dbai.randomai[m.sender].key.id = newKeyId;
      m.react(sukses);
    } catch (error) {
      console.error("Handler before error:", error);
      m.react(eror);
    }
  }
};
handler.help = ["marioai", "faridai", "megptai", "ragbotai", "degreeguruai"];
handler.tags = ["ai"];
handler.command = /^(marioai|faridai|megptai|ragbotai|degreeguruai)$/i;
export default handler;
