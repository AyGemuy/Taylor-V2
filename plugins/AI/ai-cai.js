import {
  ApiGratis
} from "../../lib/ai/api-gratis.js";
import chalk from "chalk";
const handler = async (m, {
  conn,
  command,
  usedPrefix,
  args
}) => {
  conn.externalIds = conn.externalIds || {};
  const text = args.join(" ") || m.quoted?.text || m.quoted?.caption || m.quoted?.description || null;
  if (!text) return m.reply(`
Input query. Example: ${usedPrefix}cai hello
Usage:
${usedPrefix}caiinfo <external_id> - Get character info by external ID.
${usedPrefix}caisearch <query> - Search character by query.
${usedPrefix}caistats - Get status.
${usedPrefix}cai <message> - Send message using saved external ID.
${usedPrefix}caiset <external_id> - Set external ID for .cai command.`);
  const apiClient = new ApiGratis("https://api.apigratis.site");
  try {
    let message = "",
      buttons;
    switch (command) {
      case "caiinfo":
        message = (await apiClient.getCharacterInfo(text)).result.character ? formatCharacterInfo((await apiClient.getCharacterInfo(text)).result.character) : "Character info not found.";
        break;
      case "caistats":
        message = (await apiClient.getStatus()).result.status === "ok" ? formatStatus((await apiClient.getStatus()).result) : "Status not found.";
        break;
      case "cai":
        message = conn.externalIds[m.chat] ? (await apiClient.sendMessage(conn.externalIds[m.chat], text)).result.replies[0]?.text || "No reply from AI." : "No external ID set. Use .caiset or .caisearch command to set external ID. ❗";
        break;
      case "caisearch":
        const searchResults = (await apiClient.searchCharacters(text)).result.characters;
        if (searchResults.length) {
          message = formatSearchResults(searchResults);
          buttons = conn.ctaButton.setBody("Pilih nomor untuk set external ID atau lakukan tindakan lainnya.").addSelection("Cari Lagi", `${usedPrefix}caisearch ${text}`).makeSections("Aksi");
          searchResults.forEach((result, index) => buttons.addSelection(`Set ID ${result.external_id}`, `${usedPrefix}caiset ${result.external_id}`));
        } else {
          message = "Search results not found.";
        }
        break;
      case "caiset":
        message = text ? (conn.externalIds[m.chat] = text.trim(), "External ID set successfully! ✅") : `Please provide an external ID to set. Example: ${usedPrefix}caiset your_external_id`;
        break;
      default:
        message = "Invalid command. ❌";
    }
    if (buttons) return buttons.run(m.chat, conn, m);
    m.reply(message);
  } catch (error) {
    console.error(chalk.red("Error:", error.message));
    m.reply(`Error: ${error.message} ❌`);
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
    search_score
  } = character;
  return `*Title:* ${title}\n*Name:* ${name}\n*Visibility:* ${visibility}\n*Greeting:* ${greeting}\n*Avatar:* ${avatar_file_name}\n*Participant Interactions:* ${participant__num_interactions}\n*User Username:* ${user__username}\n*Priority:* ${priority}\n*Search Score:* ${search_score}`;
}

function formatStatus(status) {
  const {
    version,
    cai_status
  } = status;
  return `*Status:* OK\n*Version:* ${version}\n*Authenticated:* ${cai_status.is_authenticated ? "Yes" : "No"}\n*Browser Launched:* ${cai_status.browser_launched ? "Yes" : "No"}`;
}

function formatSearchResults(characters) {
  return characters.slice(0, 10).map((char, index) => `*\`Hasil ${index + 1}\`*\n\n- *Nama:* ${char.title}\n- *Name:* ${char.participant__name}\n- *ExternalID:* ${char.external_id}\n- *Greeting:* ${char.greeting}\n- *Visibility:* ${char.visibility}\n- *Participant Interactions:* ${char.participant__num_interactions}\n- *User Username:* ${char.user__username}\n- *Priority:* ${char.priority}\n- *Search Score:* ${char.search_score}`).join("\n________________________\n");
}