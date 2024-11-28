import fetch from "node-fetch";
const extractData = (input) => {
  return input
    .split("\n")
    .filter((line) => line.startsWith("data: "))
    .map((line) => {
      try {
        const json = JSON.parse(line.substring(6).trim());
        return json.choices?.text || json.finalText || "";
      } catch {
        return "";
      }
    })
    .join("")
    .trim();
};
const jeevesai = async (prompt) => {
  try {
    const response = await fetch("https://api.jeeves.ai/generate/v3/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer null",
      },
      body: JSON.stringify({
        temperature: "0.75",
        model: "gpt-3.5-turbo",
        stream: "on",
        presence_penalty: "0",
        frequency_penalty: "0",
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
      }),
    });
    return extractData(await response.text());
  } catch (error) {
    console.error("Error generating chat:", error);
    return "Error generating chat.";
  }
};
const jeevesaiv2 = async (prompt) => {
  try {
    const response = await fetch("https://api.jeeves.ai/generate/v4/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer null",
      },
      body: JSON.stringify({
        prompt: prompt,
      }),
    });
    return extractData(await response.text());
  } catch (error) {
    console.error("Error generating chat v4:", error);
    return "Error generating chat v4.";
  }
};
const handler = async (m, { conn, args, usedPrefix, command }) => {
  if (!db.data.dbai.jeevesai) db.data.dbai.jeevesai = {};
  const session = db.data.dbai.jeevesai[m.sender];
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
      case "jeevesai":
        data = await jeevesai(inputText);
        break;
      case "jeevesaiv2":
        data = await jeevesaiv2(inputText);
        break;
      default:
        return;
    }
    const answer = data?.trim();
    if (answer) {
      const {
        key: { id: keyId },
      } = await conn.reply(m.chat, answer, m);
      db.data.dbai.jeevesai[m.sender] = {
        key: {
          id: keyId,
        },
        cmd: command,
      };
      m.react(sukses);
    } else {
      m.react(eror);
      console.error("Handler " + command + " error:");
    }
  } catch (error) {
    console.error("Handler " + command + " error:", error);
    m.react(eror);
  }
};
handler.before = async (m, { conn }) => {
  if (
    !db.data.dbai.jeevesai ||
    m.isBaileys ||
    !(m.sender in db.data.dbai.jeevesai)
  )
    return;
  const {
    key: { id: keyId },
    cmd,
  } = db.data.dbai.jeevesai[m.sender];
  if (m.quoted?.id === keyId && m.text.trim()) {
    m.react(wait);
    try {
      const inputText = m.text.trim();
      let data;
      switch (cmd) {
        case "jeevesai":
          data = await jeevesai(inputText);
          break;
        case "jeevesaiv2":
          data = await jeevesaiv2(inputText);
          break;
        default:
          return;
      }
      const answer = data?.trim();
      if (answer) {
        const {
          key: { id: newKeyId },
        } = await conn.reply(m.chat, answer, m);
        db.data.dbai.jeevesai[m.sender].key.id = newKeyId;
        m.react(sukses);
      } else {
        m.react(eror);
        console.error("Handler jeeves error:");
      }
    } catch (error) {
      console.error("Handler before error:", error);
      m.react(eror);
    }
  }
};
handler.help = ["jeevesai", "jeevesaiv2"];
handler.tags = ["ai"];
handler.command = /^(jeevesai|jeevesaiv2)$/i;
export default handler;
