import genshindb from "genshin-db";
const handler = async (m, {
  conn,
  text,
  usedPrefix,
  command
}) => {
  if (!text) throw `Contoh: *${usedPrefix + command} starfell valley*\nHarap berikan nama pemandangan.`;
  try {
    let result = await genshindb.viewpoints(text);
    if (result) {
      let response = `*Pemandangan Ditemukan: ${result.name}*\n\n`;
      response += `_${result.description || "Deskripsi tidak tersedia"}_\n\n`;
      response += `*Region:* ${result.region || "Data tidak tersedia"}\n`;
      response += `*Area:* ${result.area || "Data tidak tersedia"}`;
      m.reply(response);
    } else {
      throw new Error("Pemandangan tidak ditemukan.");
    }
  } catch (error) {
    console.error(error);
    let available = await genshindb.viewpoints("names", {
      matchCategories: true
    });
    m.reply(`*Tidak Ditemukan*\n\n*Pemandangan yang tersedia:* ${available.join(", ")}`);
  }
};
handler.help = ["giviewpoint <nama pemandangan>"];
handler.tags = ["genshin"];
handler.command = /^((gi|genshin)(viewpoints?))$/i;
handler.limit = true;
export default handler;