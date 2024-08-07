import {
  Arya
} from "../../lib/ai/arya-hcr.js";
import chalk from "chalk";
const handler = async (m, {
  conn,
  command,
  usedPrefix,
  args
}) => {
  conn.hcrIds = conn.hcrIds || {};
  const text = args.length ? args.join(" ") : m.quoted?.text || m.quoted?.caption || m.quoted?.description;
  const apiClient = new Arya();
  const hcrList = ["stablediffusion15", "stablediffusion21", "stablediffusionXL", "pixartA", "pixartLcm", "dalle", "dalleMini", "prodia", "prodiaStablediffusion", "prodiaStablediffusionXL", "emi", "chatGPT", "chatComplements", "translate"];
  const apiCalls = {
    stablediffusion15: async text => await apiClient.stablediffusion15(text),
    stablediffusion21: async text => await apiClient.stablediffusion21(text),
    stablediffusionXL: async text => await apiClient.stablediffusionXL(text),
    pixartA: async text => await apiClient.pixartA(text),
    pixartLcm: async text => await apiClient.pixartLcm(text),
    dalle: async text => await apiClient.dalle(text),
    dalleMini: async text => await apiClient.dalleMini(text),
    prodia: async text => await apiClient.prodia(text),
    prodiaStablediffusion: async text => await apiClient.prodiaStablediffusion(text),
    prodiaStablediffusionXL: async text => await apiClient.prodiaStablediffusionXL(text),
    emi: async text => await apiClient.emi(text),
    chatGPT: async text => await apiClient.chatGPT(text),
    chatComplements: async text => await apiClient.chatComplements(text),
    translate: async text => await apiClient.translate(text)
  };
  if (!text && command === "hcr") {
    const buttons = conn.ctaButton.setBody("No external ID set. Please select an external ID to set.").setFooter("Pilih aplikasi di bawah ini.").addSelection("Klik di sini").makeSections("HCR Options");
    hcrList.forEach((hcr, index) => buttons.makeRow("", hcr, `Set ${hcr}`, `${usedPrefix}hcrset ${index + 1}`));
    return buttons.run(m.chat, conn, m);
  }
  if (!text) {
    return m.reply(`Input query. Example: ${usedPrefix + command} hello\nUsage:\n${usedPrefix}hcr <message> - Send message using saved external ID.\n${usedPrefix}hcrset <index> - Set external ID for .${command} command.`);
  }
  try {
    let message = "";
    if (command === "hcr") {
      const externalId = conn.hcrIds[m.chat];
      if (externalId) {
        const res = await apiCalls[externalId]?.(text);
        message = JSON.stringify(res, null, 2);
      } else {
        const buttons = conn.ctaButton.setBody("No external ID set. Please select an external ID to set.").setFooter("Pilih aplikasi di bawah ini.").addSelection("Klik di sini").makeSections("HCR Options");
        hcrList.forEach((hcr, index) => buttons.makeRow("", hcr, `Set ${hcr}`, `${usedPrefix}hcrset ${index + 1}`));
        return buttons.run(m.chat, conn, m);
      }
    } else if (command === "hcrset") {
      const index = parseInt(text.trim()) - 1;
      message = index >= 0 && index < hcrList.length ? (conn.hcrIds[m.chat] = hcrList[index], `External ID set successfully to ${hcrList[index]}! ✅`) : `Invalid index. Please select a valid index from the list:\n${hcrList.map((hcr, idx) => `${idx + 1}. ${hcr}`).join("\n")}`;
    } else {
      message = "Invalid command. ❌";
    }
    m.reply(message);
  } catch (error) {
    console.error(chalk.red("Error:", error.message));
    m.reply(`Error: ${error.message} ❌`);
  }
};
handler.help = ["hcr", "hcrset"];
handler.tags = ["ai"];
handler.command = /^(hcr|hcrset)$/i;
export default handler;