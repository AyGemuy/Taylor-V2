import yts from "yt-search";
import similarity from "similarity";
const handler = async (m, { conn, usedPrefix: _p, args, command }) => {
  try {
    const text =
      args.length >= 1
        ? args.join(" ")
        : m.quoted?.text || m.quoted?.caption || m.quoted?.description || null;
    if (!text) {
      return m.reply(
        `Masukkan teks atau reply pesan dengan teks yang ingin diolah.\nContoh penggunaan:\n*${_p}${command} Hai, apa kabar?*`,
      );
    }
    const { videos: allVideos } = await yts(text);
    const videoItems = allVideos.filter(
      (video) => similarity(video.title, text) >= 0.2,
    );
    const bestItem = videoItems[0];
    if (!bestItem) {
      return m.reply("Tidak ada hasil yang ditemukan.");
    }
    const formattedData = {
      title:
        "                *[ Youtube Search ]*\n                 BEST MATCH\n\n",
      rows: [
        {
          title: "Best",
          highlight_label: "Best match",
          rows: [
            {
              header: bestItem.title,
              id: `${_p}play ${bestItem.url}`,
              title: bestItem.description,
              description: "",
            },
          ],
        },
        {
          title: "More",
          rows: videoItems.map((item, index) => ({
            header: `${index + 1}). ${item.title}`,
            id: `${_p}play ${item.url}`,
            title: item.description,
            description: "",
          })),
        },
      ],
    };
    const emojiMap = {
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
      author: "👤",
    };
    const caption = Object.entries(bestItem)
      .map(([key, value]) => {
        const formattedKey = key.charAt(0).toUpperCase() + key.slice(1);
        let valueToDisplay = value;
        if (key === "views") {
          valueToDisplay = new Intl.NumberFormat("en", {
            notation: "compact",
          }).format(value);
        } else if (key === "author") {
          valueToDisplay = `Name: ${value.name || "Unknown"}\nURL: ${value.url || "Unknown"}`;
        }
        return ` ${emojiMap[key] || "🔹"} *${formattedKey}:* ${valueToDisplay}`;
      })
      .join("\n");
    await conn.sendButtonCta(
      m.chat,
      [
        [
          formattedData.title + caption,
          wm,
          bestItem.image || bestItem.thumbnail || logo,
          [],
          null,
          [],
          [[`${emojis} Click Here`, formattedData.rows]],
        ],
      ],
      m,
    );
  } catch (error) {
    console.error(error);
    await conn.reply(m.chat, `Terjadi kesalahan: ${error.message}`, m);
  }
};
handler.help = ["yts", "ytsearch"].map((v) => `yts ${v} <search>`);
handler.tags = ["tools"];
handler.command = /^(youtubesearch|ytsearch|yts)$/i;
handler.exp = 15;
handler.register = true;
handler.limit = 3;
export default handler;
