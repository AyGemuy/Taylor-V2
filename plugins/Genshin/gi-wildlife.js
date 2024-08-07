import genshindb from "genshin-db";
const handler = async (m, {
  conn,
  text,
  usedPrefix,
  command
}) => {
  if (!text) throw `Contoh: *${usedPrefix + command} snowboar*\nHarap berikan nama binatang liar.`;
  try {
    let result = await genshindb.wildlife(text);
    if (result) {
      let response = `*Binatang Liar Ditemukan: ${result.name}*\n\n` + `_${result.description || "Data tidak tersedia"}_\n\n` + `*Rarity:* ${result.rarity || "Data tidak tersedia"}\n` + `*Habitat:* ${result.habitat || "Data tidak tersedia"}`;
      m.reply(response);
    } else {
      throw new Error("Binatang liar tidak ditemukan.");
    }
  } catch (error) {
    console.error(error);
    let available = await genshindb.wildlife("names", {
      matchCategories: true
    });
    m.reply(`*Tidak Ditemukan*\n\n*Binatang liar yang tersedia:* ${available.join(", ")}`);
  }
};
handler.help = ["giwildlife <nama binatang liar>"];
handler.tags = ["genshin"];
handler.command = /^((gi|genshin)(wildlife))$/i;
handler.limit = true;
export default handler;