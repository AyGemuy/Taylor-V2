import genshindb from "genshin-db";
const handler = async (m, {
  conn,
  text,
  usedPrefix,
  command
}) => {
  if (!text) throw `Contoh: *${usedPrefix + command} mystical enhancement ore*\nHarap berikan nama craft.`;
  try {
    let result = await genshindb.crafts(text);
    if (result) {
      let response = `*Craft Ditemukan: ${result.name}*\n\n`;
      response += `_${result.description}_\n\n`;
      response += `*Type:* ${result.type || "Data tidak tersedia"}\n`;
      response += `*Rarity:* ${result.rarity || "Data tidak tersedia"}`;
      m.reply(response);
    } else {
      throw new Error("Craft tidak ditemukan.");
    }
  } catch (error) {
    console.error(error);
    let available = await genshindb.crafts("names", {
      matchCategories: true
    });
    m.reply(`*Tidak Ditemukan*\n\n*Craft yang tersedia:* ${available.join(", ")}`);
  }
};
handler.help = ["gicraft <nama craft>"];
handler.tags = ["genshin"];
handler.command = /^((gi|genshin)(crafts?))$/i;
handler.limit = true;
export default handler;