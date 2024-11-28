import fetch from "node-fetch";
import chalk from "chalk";
import { v4 as uuidv4 } from "uuid";
const apiUrl = "https://roastedby.ai/api/generate";
const styles = [
  "default",
  "crypto_bro",
  "new_york",
  "southern_american",
  "south_london",
  "surfer_dude",
  "valley_girl",
  "adult",
];
async function roastedby(message, style = "default") {
  if (!styles.includes(style)) {
    return `Style tidak valid. Gunakan salah satu dari: ${styles.join(", ")}`;
  }
  const headers = {
    "Content-Type": "application/json",
    "User-Agent":
      "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Mobile Safari/537.36",
    Referer: "https://roastedby.ai/?via=topaitools",
  };
  const body = JSON.stringify({
    userMessage: {
      role: "user",
      content: message,
    },
    history: [
      {
        role: "assistant",
        content: "Hello there. I'm here to roast you.",
      },
    ],
    style: style,
  });
  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: headers,
      body: body,
    });
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error(chalk.red("Error:", error.message));
    return {
      status: "error",
      message: error.message,
    };
  }
}
const handler = async (m, { conn, command, usedPrefix, args }) => {
  db.data.dbai.roastedby = db.data.dbai.roastedby || {};
  const text =
    args.join(" ") ||
    m.quoted?.text ||
    m.quoted?.caption ||
    m.quoted?.description ||
    null;
  if (!text) {
    return m.reply(`
Input query. Example: ${usedPrefix}roastedby hello
Usage:
${usedPrefix}roastedby <message> - Send message using selected style.
${usedPrefix}roastedbyset <index> - Set style by index. If no index, display style list.`);
  }
  try {
    switch (command) {
      case "roastedby":
        const style = db.data.dbai.roastedby[m.sender]?.style || "default";
        const response = await roastedby(text, style);
        if (response && response.content) {
          await conn.reply(m.chat, response.content, m);
          m.react(sukses);
        } else {
          m.react(eror);
          console.error("Handler " + command + " error:");
        }
        break;
      case "roastedbyset":
        if (text) {
          const index = parseInt(text.trim(), 10);
          if (!isNaN(index) && index >= 1 && index <= styles.length) {
            const selectedStyle = styles[index - 1];
            db.data.dbai.roastedby[m.sender] = {
              style: selectedStyle,
            };
            m.reply(`Style set to ${selectedStyle} successfully! ✅`);
          } else {
            const buttons = conn.ctaButton
              .setBody("Select Style Below.")
              .setFooter("More details can be found at RoastedBy.")
              .addSelection("Click Here", `${usedPrefix}roastedbyset`)
              .makeSections("RoastedBy", "Select Style");
            styles.forEach((style, idx) => {
              buttons.makeRow(
                "",
                style,
                `Style: ${style}`,
                `${usedPrefix}roastedbyset ${idx + 1}`,
              );
            });
            return buttons.run(m.chat, conn, m);
          }
        } else {
          m.reply(
            `Please provide an index to set the style. Example: ${usedPrefix}roastedbyset 1`,
          );
        }
        break;
    }
  } catch (error) {
    console.error(chalk.red("Error:", error.message));
    m.react(eror);
  }
};
handler.before = async (m, { conn }) => {
  if (
    !db.data.dbai.roastedby ||
    m.isBaileys ||
    !(m.sender in db.data.dbai.roastedby)
  )
    return;
  const { style } = db.data.dbai.roastedby[m.sender];
  if (
    m.quoted?.id === db.data.dbai.roastedby[m.sender]?.keyId &&
    style &&
    m.text.trim()
  ) {
    m.react(wait);
    try {
      const response = await roastedby(m.text.trim(), style);
      if (response && response.content) {
        const message = response.content;
        const {
          key: { id: newKeyId },
        } = await conn.reply(m.chat, message, m);
        db.data.dbai.roastedby[m.sender].keyId = newKeyId;
        m.react(sukses);
      } else {
        m.react(eror);
        console.error("Handler roastedby error:");
      }
    } catch (error) {
      console.error("Handler before error:", error);
      m.react(eror);
    }
  }
};
handler.help = ["roastedby", "roastedbyset"];
handler.tags = ["ai"];
handler.command = /^(roastedby|roastedbyset)$/i;
export default handler;
