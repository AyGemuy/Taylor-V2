import ytSearch from "yt-search";
const handler = async (m, {
  conn,
  usedPrefix: _p,
  args,
  command
}) => {
  try {
    const text = args.length >= 1 ? args.slice(0).join(" ") : m.quoted && m.quoted?.text || m.quoted?.caption || m.quoted?.description || null;
    if (!text) return m.reply(`Masukkan teks atau reply pesan dengan teks yang ingin diolah.\nContoh penggunaan:\n*${_p}${command} Hai, apa kabar?*`);
    const {
      all: [bestItem, ...moreItems]
    } = await ytSearch(text), videoItems = moreItems.filter(item => "video" === item.type), formattedData = {
      title: "                *[ Youtube Search ]*\n                 BEST MATCH\n\n",
      rows: [{
        title: "Best",
        highlight_label: "Best match",
        rows: [{
          header: bestItem.title,
          id: `${_p}play ${bestItem.url}`,
          title: bestItem.description,
          description: ""
        }]
      }, {
        title: "More",
        rows: videoItems.map(({
          title,
          url,
          description
        }, index) => ({
          header: `${index + 1}). ${title}`,
          id: `.play ${url}`,
          title: description,
          description: ""
        }))
      }]
    }, emojiMap = {
      type: "🎥",
      videoId: "🆔",
      url: "🔗",
      title: "📺",
      description: "📝",
      image: "🖼️",
      thumbnail: "🖼️",
      seconds: "⏱️",
      timestamp: "⏰",
      ago: "⌚",
      views: "👀",
      author: "👤"
    }, caption = Object.entries(bestItem).map(([key, value]) => {
      const formattedKey = key.charAt(0).toUpperCase() + key.slice(1),
        valueToDisplay = "views" === key ? new Intl.NumberFormat("en", {
          notation: "compact"
        }).format(value) : "author" === key ? `Name: ${value.name || "Unknown"}\nURL: ${value.url || "Unknown"}` : value || "Unknown";
      return ` ${emojiMap[key] || "🔹"} *${formattedKey}:* ${valueToDisplay}`;
    }).join("\n");
    await conn.sendButtonCta(m.chat, [
      [formattedData.title + caption, wm, bestItem.image || bestItem.thumbnail || logo, [], null, [],
        [
          [emojis + " Click Here", formattedData.rows]
        ]
      ]
    ], m);
  } catch (error) {
    console.error(error), await conn.reply(m.chat, `An error occurred: ${error}`, m);
  }
};
handler.help = ["yts", "ytsearch"].map(v => "yts" + v + " <search>"), handler.tags = ["tools"],
  handler.command = /^(youtubesearch|ytsearch|yts)$/i;
export default handler;