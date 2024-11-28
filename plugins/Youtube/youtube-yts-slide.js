import ytSearch from "yt-search";
const handler = async (m, { conn, usedPrefix: _p, args, command }) => {
  try {
    const text =
      args.join(" ") ||
      m.quoted?.text ||
      m.quoted?.caption ||
      m.quoted?.description ||
      "";
    if (!text) {
      return m.reply(
        `Masukkan teks atau reply pesan dengan teks yang ingin diolah.\nContoh penggunaan:\n*${_p}${command} Hai, apa kabar?*`,
      );
    }
    const {
      all: [bestItem, ...moreItems],
    } = await ytSearch(text);
    const videoItems = moreItems
      .filter((item) => item.type === "video")
      .slice(0, 4);
    const messages = [
      [
        `📹 *Title:* ${bestItem.title}\n` +
          `👁 *Views:* ${bestItem.views}\n` +
          `⏳ *Duration:* ${bestItem.timestamp}\n` +
          `📅 *Uploaded:* ${bestItem.ago}\n` +
          `📝 *Channel:* ${bestItem.author.name || "Unknown"}\n` +
          `🔗 *URL:* ${bestItem.url}\n` +
          `\n*Description:*\n${bestItem.description || "No description available"}`,
        "Info",
        bestItem.thumbnail,
        [
          [`Play Video`, `${_p}ytv ${bestItem.url}`, "cta_url"],
          [`Listen Audio`, `${_p}yta ${bestItem.url}`, "cta_url"],
        ],
      ],
      ...videoItems.map((item) => [
        `🎥 *Title:* ${item.title}\n` +
          `👁 *Views:* ${item.views}\n` +
          `⏳ *Duration:* ${item.timestamp}\n` +
          `📅 *Uploaded:* ${item.ago}\n` +
          `📝 *Channel:* ${item.author.name || "Unknown"}\n` +
          `\n*Description:*\n${item.description || "No description available"}`,
        "Info",
        item.thumbnail,
        [
          [`Play Video`, `${_p}ytv ${item.url}`, "cta_url"],
          [`Listen Audio`, `${_p}yta ${item.url}`, "cta_url"],
        ],
      ]),
    ];
    await conn.sendCarousel(m.chat, messages, m);
  } catch (error) {
    console.error(error);
    await conn.reply(m.chat, `An error occurred: ${error.message}`, m);
  }
};
handler.help = ["ytslide"].map((v) => `yts${v} <search>`);
handler.tags = ["tools"];
handler.command = /^(ytslide)$/i;
handler.exp = 15;
handler.register = true;
handler.limit = 3;
export default handler;
