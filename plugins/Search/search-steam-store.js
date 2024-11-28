import fetch from "node-fetch";
const SteamStore = async (query) => {
  try {
    const searchResponse = await fetch(
      `https://store.steampowered.com/api/storesearch?cc=id&l=id&term=${encodeURIComponent(query)}`,
    );
    const search = await searchResponse.json();
    if (!search.items.length) {
      return null;
    }
    const { id } = search.items[0];
    const detailsResponse = await fetch(
      `https://store.steampowered.com/api/appdetails?appids=${id}`,
    );
    const details = await detailsResponse.json();
    return details[id.toString()];
  } catch (error) {
    throw new Error(error.message);
  }
};
const handler = async (m, { conn, args, usedPrefix, command }) => {
  const inputText = args.length
    ? args.join(" ")
    : m.quoted?.text || m.quoted?.caption || m.quoted?.description || null;
  if (!inputText) {
    return m.reply(
      `Masukkan teks atau reply pesan dengan teks yang ingin diolah.\nContoh penggunaan:\n*${usedPrefix}${command} Hai, apa kabar?*`,
    );
  }
  m.react(wait);
  try {
    const details = await SteamStore(inputText);
    if (!details) {
      return m.reply(`❌ Tidak ditemukan hasil untuk *${inputText}*!`);
    }
    const data = details.data;
    const current = data.price_overview
      ? `Rp${(data.price_overview.final / 1e3).toLocaleString("id")}`
      : "Gratis";
    const original = data.price_overview
      ? `Rp${(data.price_overview.initial / 1e3).toLocaleString("id")}`
      : "Gratis";
    const price = current === original ? current : `~~${original}~~ ${current}`;
    const platforms = [];
    if (data.platforms) {
      if (data.platforms.windows) platforms.push("🖥️ Windows");
      if (data.platforms.mac) platforms.push("🍏 Mac");
      if (data.platforms.linux) platforms.push("🐧 Linux");
    }
    const response = `
      *🎮 ${data.name}*
      👉 [Lihat di Steam](http://store.steampowered.com/app/${data.steam_appid})
      *💰 Harga:* ${price}
      *⭐ Metascore:* ${data.metacritic ? data.metacritic.score : "N/A"}
      *👍 Rekomendasi:* ${data.recommendations ? data.recommendations.total : "N/A"}
      *🖥️ Platform:* ${platforms.join(", ") || "Tidak Ada"}
      *📅 Tanggal Rilis:* ${data.release_date ? data.release_date.date : "N/A"}
      *📦 Jumlah DLC:* ${data.dlc ? data.dlc.length : 0}
      *👨‍💻 Pengembang:* ${data.developers ? data.developers.join(", ") || "N/A" : "N/A"}
      *🏢 Penerbit:* ${data.publishers ? data.publishers.join(", ") || "N/A" : "N/A"}
    `;
    m.react(sukses);
    return m.reply(response);
  } catch (e) {
    m.react(eror);
    return m.reply(e.message);
  }
};
handler.help = ["steamstore"];
handler.tags = ["search"];
handler.command = /^(steamstore)$/i;
export default handler;
