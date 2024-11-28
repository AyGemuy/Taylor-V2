import { ApiGratis } from "../../lib/ai/api-gratis.js";
const apiClient = new ApiGratis("https://api.apigratis.site");
import chalk from "chalk";
const handler = async (m, { conn, command, usedPrefix, args }) => {
  db.data.dbai.externalIds = db.data.dbai.externalIds || {};
  const text =
    args.join(" ") ||
    m.quoted?.text ||
    m.quoted?.caption ||
    m.quoted?.description ||
    null;
  if (!text) {
    return m.reply(`
Input query. Example: ${usedPrefix}cai hello
Usage:
${usedPrefix}caiinfo <external_id> - Get character info by external ID.
${usedPrefix}caisearch <query> - Search character by query.
${usedPrefix}caistats - Get status.
${usedPrefix}cai <message> - Send message using saved external ID.
${usedPrefix}caiset <external_id> - Set external ID for .cai command.`);
  }
  try {
    let message = "",
      buttons;
    switch (command) {
      case "caiinfo":
        const characterInfo = (await apiClient.getCharacterInfo(text)).result
          .character;
        message = characterInfo
          ? formatCharacterInfo(characterInfo)
          : "Character info not found.";
        break;
      case "caistats":
        const status = (await apiClient.getStatus()).result;
        message =
          status.status === "ok" ? formatStatus(status) : "Status not found.";
        break;
      case "cai":
        const externalId = db.data.dbai.externalIds[m.sender]?.externalId;
        if (externalId) {
          const response = await apiClient.sendMessage(externalId, text);
          message = response.result.replies[0]?.text || "No reply from AI.";
        } else {
          message =
            "No external ID set. Use .caiset or .caisearch command to set external ID. ❗";
        }
        break;
      case "caisearch":
        const searchResults = (await apiClient.searchCharacters(text)).result
          .characters;
        if (searchResults.length) {
          message =
            "Pilih nomor untuk set external ID atau lakukan tindakan lainnya.";
          buttons = conn.ctaButton
            .setBody("Pilih Karakter di bawah ini.")
            .setFooter(
              "Keterangan lebih lanjut dapat ditemukan di Character Ai.",
            )
            .addSelection("Klik di sini", `${usedPrefix}caisearch ${text}`)
            .makeSections("Character Ai", "Pilih Karakter");
          searchResults.forEach((result, index) => {
            buttons.makeRow(
              ``,
              `${result.participant__name}`,
              `${result.greeting}`,
              `${usedPrefix}caiset ${result.external_id}`,
            );
          });
        } else {
          message = "Search results not found.";
        }
        break;
      case "caiset":
        if (text) {
          db.data.dbai.externalIds[m.sender] = {
            externalId: text.trim(),
          };
          message = "External ID set successfully! ✅";
        } else {
          message = `Please provide an external ID to set. Example: ${usedPrefix}caiset your_external_id`;
        }
        break;
      default:
        message = "Invalid command. ❌";
    }
    if (buttons) {
      return buttons.run(m.chat, conn, m);
    }
    if (command === "cai") {
      const {
        key: { id: keyId },
      } = await conn.reply(m.chat, message, m);
      db.data.dbai.externalIds[m.sender] = {
        externalId: db.data.dbai.externalIds[m.sender]?.externalId,
        keyId: keyId,
      };
      m.react(sukses);
    } else {
      m.reply(message);
    }
  } catch (error) {
    console.error(chalk.red("Error:", error.message));
    m.reply(`Error: ${error.message} ❌`);
  }
};
handler.before = async (m, { conn }) => {
  if (
    !db.data.dbai.externalIds ||
    m.isBaileys ||
    !(m.sender in db.data.dbai.externalIds)
  )
    return;
  const { keyId, externalId } = db.data.dbai.externalIds[m.sender];
  if (m.quoted?.id === keyId && externalId && m.text.trim()) {
    m.react(wait);
    try {
      const response = await apiClient.sendMessage(externalId, m.text.trim());
      const message = response.result.replies[0]?.text || "No reply from AI.";
      const {
        key: { id: newKeyId },
      } = await conn.reply(m.chat, message, m);
      db.data.dbai.externalIds[m.sender].keyId = newKeyId;
      m.react(sukses);
    } catch (error) {
      console.error("Handler before error:", error);
      m.react(eror);
    }
  }
};
handler.help = ["cai", "caiinfo", "caistats", "caiset", "caisearch"];
handler.tags = ["ai"];
handler.command = /^(cai|caiinfo|caistats|caiset|caisearch)$/i;
export default handler;

function formatCharacterInfo(character) {
  const {
    title,
    name,
    visibility,
    greeting,
    avatar_file_name,
    participant__num_interactions,
    user__username,
    priority,
    search_score,
  } = character;
  return `*Title:* ${title}\n*Name:* ${name}\n*Visibility:* ${visibility}\n*Greeting:* ${greeting}\n*Avatar:* ${avatar_file_name}\n*Participant Interactions:* ${participant__num_interactions}\n*User Username:* ${user__username}\n*Priority:* ${priority}\n*Search Score:* ${search_score}`;
}

function formatStatus(status) {
  const { version, cai_status } = status;
  return `*Status:* OK\n*Version:* ${version}\n*Authenticated:* ${cai_status.is_authenticated ? "Yes" : "No"}\n*Browser Launched:* ${cai_status.browser_launched ? "Yes" : "No"}`;
}

function formatSearchResults(characters) {
  return characters
    .slice(0, 10)
    .map(
      (char, index) =>
        `*\`Hasil ${index + 1}\`*\n\n- *Nama:* ${char.title}\n- *Name:* ${char.participant__name}\n- *ExternalID:* ${char.external_id}\n- *Greeting:* ${char.greeting}\n- *Visibility:* ${char.visibility}\n- *Participant Interactions:* ${char.participant__num_interactions}\n- *User Username:* ${char.user__username}\n- *Priority:* ${char.priority}\n- *Search Score:* ${char.search_score}`,
    )
    .join("\n________________________\n");
}
