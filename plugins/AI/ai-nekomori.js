import { nekomori } from "../../lib/ai/nekomori.js";
const handler = async (m, { conn, command, usedPrefix, args }) => {
  db.data.dbai.nekomori = db.data.dbai.nekomori || {};
  const text =
    args.join(" ") ||
    m.quoted?.text ||
    m.quoted?.caption ||
    m.quoted?.description ||
    null;
  if (!text) {
    return m.reply(`
Input query. Example: ${usedPrefix}nekomori hello
Usage:
${usedPrefix}nekomorisearch <query> - Search character by query.
${usedPrefix}nekomori <message> - Send message using saved persona ID.
${usedPrefix}nekomoriset <id> - Set persona ID for .nekomori command.`);
  }
  try {
    switch (command) {
      case "nekomori":
        const assistantId = db.data.dbai.nekomori[m.chat]?.assistantId;
        if (assistantId) {
          const {
            conversation: { message: reply },
          } = await nekomori.chat(text, assistantId);
          if (reply) {
            const {
              key: { id: keyId },
            } = await conn.reply(m.chat, reply, m);
            db.data.dbai.nekomori[m.chat] = {
              assistantId: assistantId,
              keyId: keyId,
              cmd: command,
            };
            m.react(sukses);
          } else {
            m.react(eror);
            console.error("Handler " + command + " error:");
          }
        } else {
          m.reply(
            "No persona ID set. Use .nekomoriset or .nekomorisearch command to set persona ID. ❗",
          );
        }
        break;
      case "nekomorisearch":
        const searchResults = await nekomori.search(text);
        if (searchResults.length) {
          const buttons = conn.ctaButton
            .setBody("Select Character Below.")
            .setFooter("More details can be found at nekomori.")
            .addSelection("Click Here", `${usedPrefix}nekomorisearch ${text}`)
            .makeSections("nekomori", "Select Character");
          searchResults.forEach((result, index) => {
            buttons.makeRow(
              ``,
              `${result.title}`,
              `${result.description}`,
              `${usedPrefix}nekomoriset ${result.link}`,
            );
          });
          return buttons.run(m.chat, conn, m);
        } else {
          m.reply("Search results not found.");
        }
        break;
      case "nekomoriset":
        if (text) {
          db.data.dbai.nekomori[m.chat] = {
            assistantId: await nekomori.getId(text.trim()),
          };
          m.reply("Persona ID set successfully! ✅");
        } else {
          m.reply(
            `Please provide a persona ID to set. Example: ${usedPrefix}nekomoriset your_persona_id`,
          );
        }
    }
  } catch (error) {
    console.error(chalk.red("Error:", error.message));
    m.react(eror);
  }
};
handler.before = async (m, { conn }) => {
  if (
    !db.data.dbai.nekomori ||
    m.isBaileys ||
    !(m.chat in db.data.dbai.nekomori)
  )
    return;
  const { keyId, assistantId, cmd } = db.data.dbai.nekomori[m.chat];
  if (m.quoted?.id === keyId && cmd && assistantId && m.text.trim()) {
    m.react(wait);
    try {
      switch (cmd) {
        case "nekomori":
          const assistantId = db.data.dbai.nekomori[m.chat]?.assistantId;
          if (assistantId) {
            const {
              conversation: { message: reply },
            } = await nekomori.chat(m.text.trim(), assistantId);
            if (reply) {
              const {
                key: { id: newKeyId },
              } = await conn.reply(m.chat, reply, m);
              db.data.dbai.nekomori[m.chat].keyId = newKeyId;
              m.react(sukses);
            } else {
              m.react(eror);
              console.error("Handler " + cmd + " error:");
            }
          } else {
            m.reply(
              "No persona ID set. Use .nekomoriset or .nekomorisearch command to set persona ID. ❗",
            );
          }
          break;
        case "nekomorisearch":
          const searchResults = await nekomori.search(m.text.trim());
          if (searchResults.length) {
            const buttons = conn.ctaButton
              .setBody("Select Character Below.")
              .setFooter("More details can be found at nekomori.")
              .addSelection("Click Here", `${usedPrefix}nekomorisearch ${text}`)
              .makeSections("nekomori", "Select Character");
            searchResults.forEach((result, index) => {
              buttons.makeRow(
                ``,
                `${result.title}`,
                `${result.description}`,
                `${usedPrefix}nekomoriset ${result.link}`,
              );
            });
            return buttons.run(m.chat, conn, m);
          } else {
            m.reply("Search results not found.");
          }
          break;
        case "nekomoriset":
          if (text) {
            db.data.dbai.nekomori[m.chat] = {
              assistantId: await nekomori.getId(m.text.trim()),
            };
            m.reply("Persona ID set successfully! ✅");
          } else {
            m.reply(
              `Please provide a persona ID to set. Example: ${usedPrefix}nekomoriset your_persona_id`,
            );
          }
      }
    } catch (error) {
      console.error(chalk.red("Error:", error.message));
      m.react(eror);
    }
  }
};
handler.help = ["nekomori", "nekomoriset", "nekomorisearch"];
handler.tags = ["ai"];
handler.command = /^(nekomori|nekomoriset|nekomorisearch)$/i;
export default handler;
