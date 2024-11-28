import fetch from "node-fetch";
import { v4 as uuidv4 } from "uuid";
import chalk from "chalk";
class FiggsAi {
  constructor() {
    this.defaultBotId = "40928189-7178-4612-bf93-da7b16b833b9";
    this.defaultChatId = "92462488-522d-4a5a-ab10-54cc0bb2c503";
    this.defaultRoomId = "c6244f06-6f06-4527-8ee6-97d8a750bff4";
    this.defaultDescription = "Amazonian Warrior";
    this.defaultName = "Wonder Woman";
    this.defaultFirstMessage =
      "*From a distance, you see a bright light and before you know it, Wonder Woman, also known as Diana, lands in your vicinity, geared up in her armor and ready for battle.*";
  }
  async create(prompt, options = {}) {
    const {
      botId = this.defaultBotId,
      roomId = this.defaultRoomId,
      chatId = this.defaultChatId,
      firstMessage = this.defaultFirstMessage,
      name = this.defaultName,
      description = this.defaultDescription,
    } = options;
    const messages = [
      {
        id: chatId,
        content: firstMessage,
        role: "assistant",
        created: new Date().toISOString(),
      },
      {
        id: chatId,
        content: prompt,
        role: "user",
        created: new Date().toISOString(),
      },
    ];
    try {
      const response = await fetch("https://api.figgs.ai/chat_completion", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "User-Agent":
            "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Mobile Safari/537.36",
          Referer: `https://www.figgs.ai/chat/${roomId}`,
        },
        body: JSON.stringify({
          messages: messages,
          firstMessage: firstMessage,
          description: description,
          name: name,
          botId: botId,
          roomId: roomId,
        }),
      });
      const text = await response.text();
      return (
        text
          .split("\n")
          .filter((line) => line.trim() !== "")
          .map((line) => {
            try {
              const json = JSON.parse(line.slice(5));
              return json.finalContent;
            } catch {
              return "";
            }
          })
          .filter((content) => content !== "")
          .join("") || "No msg"
      );
    } catch (err) {
      console.error(err);
      return null;
    }
  }
  async feed() {
    try {
      const response = await fetch(
        "https://www.figgs.ai/api/proxy/bots/feed?randomize=true",
        {
          headers: {
            "User-Agent":
              "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Mobile Safari/537.36",
            Referer: "https://www.figgs.ai/",
          },
        },
      );
      const result = await response.json();
      return result.bots || [];
    } catch (err) {
      console.error(err);
      return null;
    }
  }
}
const handler = async (m, { conn, command, usedPrefix, args }) => {
  db.data.dbai.figgsai = db.data.dbai.figgsai || {};
  const text =
    args.join(" ") ||
    m.quoted?.text ||
    m.quoted?.caption ||
    m.quoted?.description ||
    null;
  if (!text) {
    return m.reply(
      `✍️ *Input query*:\nExample: ${usedPrefix}figgsai hello\n\n*Usage:*\n${usedPrefix}figgsai <message> - Send message using saved character ID.\n${usedPrefix}figgsaiset <index> - Set character ID by index. If no index, display character list.`,
    );
  }
  const figgsAiInstance = new FiggsAi();
  const userData = db.data.dbai.figgsai[m.sender] || {};
  try {
    switch (command) {
      case "figgsai": {
        const { botId, chatId, firstMessage, name, description } = userData;
        if (botId) {
          const answer = await figgsAiInstance.create(text, {
            botId: botId,
            chatId: chatId,
            firstMessage: firstMessage,
            name: name,
            description: description,
          });
          if (answer) {
            const {
              key: { id: keyId },
            } = await conn.reply(m.chat, answer, m);
            db.data.dbai.figgsai[m.sender] = {
              ...userData,
              keyId: keyId,
            };
            m.react(sukses);
          } else {
            m.react(eror);
            console.error("Handler " + command + " error: No answer received.");
          }
        } else {
          m.reply(
            "❗ *No character ID set.*\nUse .figgsaiset command to set a character ID.",
          );
        }
        break;
      }
      case "figgsaiset": {
        const index = parseInt(text.trim(), 10);
        const feedData = await figgsAiInstance.feed();
        const existingFeed = userData.feed || feedData || [];
        if (isNaN(index)) {
          m.reply(
            `⚠️ *Please provide an index to set the character ID.*\nExample: ${usedPrefix}figgsaiset 1`,
          );
          return;
        }
        const combinedFeed = [
          ...existingFeed,
          ...feedData.filter(
            (bot) =>
              !existingFeed.some((existingBot) => existingBot.id === bot.id),
          ),
        ];
        db.data.dbai.figgsai[m.sender].feed = combinedFeed;
        if (index >= 1 && index <= combinedFeed.length) {
          const selectedBot = combinedFeed[index - 1];
          db.data.dbai.figgsai[m.sender] = {
            botId: selectedBot.id,
            chatId: uuidv4(),
            firstMessage: selectedBot.firstMessage,
            name: selectedBot.name,
            description: selectedBot.description,
            keyId: null,
            feed: combinedFeed,
          };
          m.reply(`✅ *Character ID set to ${selectedBot.name} successfully!*`);
        } else {
          const buttons = conn.ctaButton
            .setBody("🌟 *Select Character Below:*")
            .setFooter("More details can be found at figgsai.")
            .addSelection("Click Here", `${usedPrefix}figgsaiset`)
            .makeSections("figgsai", "Select Character");
          combinedFeed.forEach((bot, index) => {
            buttons.makeRow(
              ``,
              `${bot.name}`,
              `Character ID: ${bot.id}`,
              `${usedPrefix}figgsaiset ${index + 1}`,
            );
          });
          return buttons.run(m.chat, conn, m);
        }
        break;
      }
    }
  } catch (error) {
    console.error(chalk.red("Error:", error.message));
    m.react(eror);
  }
};
handler.before = async (m, { conn }) => {
  db.data.dbai.figgsai = db.data.dbai.figgsai || {};
  if (
    !db.data.dbai.figgsai ||
    m.isBaileys ||
    !(m.sender in db.data.dbai.figgsai)
  )
    return;
  const userData = db.data.dbai.figgsai[m.sender];
  const { botId, chatId, firstMessage, name, description, keyId } = userData;
  if (keyId && m.quoted?.id === keyId) {
    if (
      botId &&
      chatId &&
      firstMessage &&
      name &&
      description &&
      m.text.trim()
    ) {
      m.react(wait);
      try {
        const answer = await new FiggsAi().create(m.text.trim(), {
          botId: botId,
          chatId: chatId,
          firstMessage: firstMessage,
          name: name,
          description: description,
        });
        if (answer) {
          const {
            key: { id: newKeyId },
          } = await conn.reply(m.chat, answer, m);
          db.data.dbai.figgsai[m.sender].keyId = newKeyId;
          m.react(sukses);
        }
      } catch (error) {
        console.error("Handler before error:", error);
        m.react(eror);
      }
    }
  }
};
handler.help = ["figgsai", "figgsaiset"];
handler.tags = ["ai"];
handler.command = /^(figgsai|figgsaiset)$/i;
export default handler;
