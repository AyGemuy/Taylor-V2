import genshindb from "genshin-db";
const handler = async (m, {
  conn,
  text,
  usedPrefix,
  command
}) => {
  try {
    if (!text || isNaN(parseInt(text))) {
      throw new Error(`Masukkan nomor peringkat petualang yang valid. Contoh: *${usedPrefix + command} 5*`);
    }
    let rankNumber = parseInt(text);
    let result = await genshindb.adventureranks(rankNumber);
    if (result) {
      let response = `*Rank Petualang Ditemukan untuk Rank ${rankNumber}:*\n\n`;
      response += `*Experience:* ${result.exp || "Data tidak tersedia"}\n`;
      response += `*Reward:* ${result.reward || "Data tidak tersedia"}\n`;
      response += `*Deskripsi:* ${result.description || "Data tidak tersedia"}`;
      m.reply(response);
    } else {
      throw new Error(`Rank petualang untuk Rank ${rankNumber} tidak ditemukan.`);
    }
  } catch (error) {
    console.error(error);
    let availableRanks = await genshindb.adventureranks("names");
    m.reply(`*Tidak Ditemukan*\n\n*Rank petualang yang tersedia:* ${availableRanks.join(", ")}`);
  }
};
handler.help = ["giadventurerank <rank>"];
handler.tags = ["genshin"];
handler.command = /^((gi|genshin)(adventureranks?|ar))$/i;
handler.limit = true;
export default handler;