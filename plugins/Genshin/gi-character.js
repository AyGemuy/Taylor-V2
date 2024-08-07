import genshindb from "genshin-db";
const handler = async (m, {
  conn,
  text,
  args,
  usedPrefix,
  command
}) => {
  if (!text) throw `Contoh: *${usedPrefix + command} diluc*\nHarap berikan nama karakter.`;
  try {
    let result = await genshindb.characters(text);
    if (result) {
      let response = `*Karakter Ditemukan: ${result.name}*\n\n`;
      response += `_${result.description}_\n\n`;
      response += `*Rarity:* ${result.rarity || "Data tidak tersedia"}\n`;
      response += `*Vision:* ${result.vision || "Data tidak tersedia"}\n`;
      response += `*Senjata:* ${result.weapon || "Data tidak tersedia"}`;
      m.reply(response);
    } else {
      throw new Error("Karakter tidak ditemukan.");
    }
  } catch (error) {
    console.error(error);
    let available = await genshindb.characters("names", {
      matchCategories: true
    });
    m.reply(`*Tidak Ditemukan*\n\n*Karakter yang tersedia:* ${available.join(", ")}`);
  }
};
handler.help = ["gichar <nama karakter>"];
handler.tags = ["genshin"];
handler.command = /^((gi|genshin)(characters?|chars?))$/i;
handler.limit = true;
export default handler;