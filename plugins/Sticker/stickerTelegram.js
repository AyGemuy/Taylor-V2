import fetch from "node-fetch";
const fetchStickerSet = async query => {
  const response = await fetch(`${Object.entries(APIs).find(([ key ]) => key.includes("proxy"))?.[1]}https://api.telegram.org/bot891038791:AAHWB1dQd-vi0IbH2NjKYUk-hqQ8rQuzPD4/getStickerSet?name=${encodeURIComponent(query)}`);
  if (!response.ok) return [];
  const data = await response.json();
  return data.result?.stickers || [];
};
const fetchStickerFile = async file_id => {
  const response = await fetch(`${Object.entries(APIs).find(([ key ]) => key.includes("proxy"))?.[1]}https://api.telegram.org/bot891038791:AAHWB1dQd-vi0IbH2NjKYUk-hqQ8rQuzPD4/getFile?file_id=${file_id}`);
  if (!response.ok) return null;
  const data = await response.json();
  const filePath = data.result?.file_path;
  return filePath ? `${Object.entries(APIs).find(([ key ]) => key.includes("proxy"))?.[1]}https://api.telegram.org/file/bot891038791:AAHWB1dQd-vi0IbH2NjKYUk-hqQ8rQuzPD4/${filePath}` : null;
};
const sendSticker = async (m, stickerUrl, description) => {
  if (!stickerUrl) return m.reply("❗ *Terjadi kesalahan saat mengirim stiker!* \nSilakan coba lagi nanti.");
  try {
    m.reply(stickerUrl);
  } catch (err) {
    const response = await fetch(stickerUrl);
    if (!response.ok) return m.reply("❗ *Terjadi kesalahan saat mengirim stiker!* \nSilakan coba lagi nanti.");
    const imageBuffer = await response.arrayBuffer();
    m.reply(Buffer.from(imageBuffer));
  }
};
const handler = async (m, {
  text
}) => {
  const [urlOrQuery, count] = text.split(" ").map(part => part.trim());
  const query = (urlOrQuery.match(/https:\/\/t\.me\/addstickers\/([^\/]+)/) || [])[1] || urlOrQuery;
  if (!query) return m.reply("❗ *Format salah!* \nGunakan format yang benar: *stickertele [query]*, *stickertelegram [query] [angka]*, *telesticker [query] all*, atau *telegramsticker [query] random*");
  const stickers = await fetchStickerSet(query);
  if (!stickers.length) return m.reply("❗ *Stiker tidak ditemukan!* \nCoba dengan nama stiker yang berbeda.");
  const maxStickers = Math.min(15, stickers.length);
  const displayCount = count ? count.toLowerCase() : "all";
  if (displayCount === "random") {
    const randomStickerUrl = await fetchStickerFile(stickers[Math.floor(Math.random() * stickers.length)].file_id);
    await sendSticker(m, randomStickerUrl, "Stiker Telegram (Acak)");
  } else if (displayCount === "all") {
    await m.reply(`🔄 *Mengirim ${maxStickers} stiker dari ${stickers.length} yang ditemukan!*`);
    const stickerResults = await Promise.allSettled(stickers.map(sticker => fetchStickerFile(sticker.file_id)));
    const stickerUrls = stickerResults.map(result => result.status === "fulfilled" ? result.value : null);
    for (let i = 0; i < maxStickers; i++) {
      await sendSticker(m, stickerUrls[i], `Stiker Telegram (${i + 1}/${stickers.length})`);
    }
  } else {
    const stickerNumber = parseInt(displayCount) - 1;
    if (isNaN(stickerNumber) || stickerNumber < 0 || stickerNumber >= stickers.length) {
      return m.reply('❗ *Nomor stiker tidak valid!* \nBerikan nomor stiker yang valid atau gunakan "random" untuk mengirim stiker secara acak atau "all" untuk mendapatkan semua stiker.');
    }
    const stickerUrl = await fetchStickerFile(stickers[stickerNumber].file_id);
    await sendSticker(m, stickerUrl, `Stiker Telegram (${stickerNumber + 1}/${stickers.length})`);
  }
};
handler.help = ["stickertele [query]", "stickertelegram [query] [angka]", "telesticker [query] all", "telegramsticker [query] random"];
handler.tags = ["sticker"];
handler.command = /^(stickertele(gram)?|telesticker|telegramsticker)$/i;
handler.limit = 1;
export default handler;