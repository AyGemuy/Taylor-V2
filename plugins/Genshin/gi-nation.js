import genshindb from "genshin-db";
const handler = async (m, {
  conn,
  text,
  usedPrefix,
  command
}) => {
  if (!text) throw `Contoh: *${usedPrefix + command} mondstadt*\nHarap berikan nama wilayah atau nasionalitas.`;
  try {
    let result = await genshindb.geographies(text);
    if (result) {
      let response = `*Informasi Wilayah Ditemukan: ${result.name}*\n\n`;
      response += `_${result.description || "Deskripsi tidak tersedia"}_\n\n`;
      response += `*Area:* ${result.area || "Data tidak tersedia"}\n`;
      response += `*Region:* ${result.region || "Data tidak tersedia"}`;
      m.reply(response);
    } else {
      throw new Error("Informasi wilayah tidak ditemukan.");
    }
  } catch (error) {
    console.error(error);
    let available = await genshindb.geographies("names", {
      matchCategories: true
    });
    m.reply(`*Tidak Ditemukan*\n\n*Wilayah yang tersedia:* ${available.join(", ")}`);
  }
};
handler.help = ["gination <nama wilayah>"];
handler.tags = ["genshin"];
handler.command = /^((gi|genshin)(nation|geographies?))$/i;
handler.limit = true;
export default handler;