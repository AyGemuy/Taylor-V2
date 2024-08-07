import genshindb from "genshin-db";
const handler = async (m, {
  conn,
  text,
  args,
  usedPrefix,
  command
}) => {
  if (!text) throw `Contoh: *${usedPrefix + command} shiba*\nHarap berikan nama hewan.`;
  try {
    let animal = await genshindb.animals(text);
    if (animal) {
      let response = `*Hewan Ditemukan: ${animal.name}*\n\n`;
      response += `"${animal.description}"\n\n`;
      response += `*Kategori:* ${animal.category || ""}\n`;
      response += `*Jenis Hitungan:* ${animal.counttype || ""}\n`;
      response += `_${animal.sortorder ? `Urutan Sortir: ${animal.sortorder}` : ""}_`;
      m.reply(response);
    } else {
      throw new Error("Hewan tidak ditemukan.");
    }
  } catch (error) {
    console.error(error);
    try {
      let animalCategories = await genshindb.animals(text, {
        matchCategories: true
      });
      m.reply(`*Kategori Hewan ${text} :*\n\n- ${animalCategories.join("\n- ")}`);
    } catch (error) {
      console.error(error);
      let allAnimalNames = await genshindb.animals("names", {
        matchCategories: true
      });
      m.reply(`*Tidak Ditemukan*\n\n*Hewan yang tersedia:* ${allAnimalNames.join(", ")}`);
    }
  }
};
handler.help = ["gianimal <nama>"];
handler.tags = ["genshin"];
handler.command = /^((gi|genshin)animals?)$/i;
handler.limit = true;
export default handler;