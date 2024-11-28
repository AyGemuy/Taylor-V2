import fetch from "node-fetch";
const isYouTubeUrl =
  /^(?:(?:https?:)?\/\/)?(?:(?:(?:www|m(?:usic)?)\.)?youtu(?:\.be|be\.com)\/(?:shorts\/|live\/|v\/|e(?:mbed)?\/|watch(?:\/|\?(?:\S+=\S+&)*v=)|oembed\?url=https?%3A\/\/(?:www|m(?:usic)?)\.youtube\.com\/watch\?(?:\S+=\S+&)*v%3D|attribution_link\?(?:\S+=\S+&)*u=(?:\/|%2F)watch(?:\?|%3F)v(?:=|%3D))?|www\.youtube-nocookie\.com\/embed\/)(([\w-]{11}))[\?&#]?\S*$/;
const getId = (url) => {
  const match = url.match(isYouTubeUrl);
  return match ? match[2] : null;
};
async function freemake(ytUrl) {
  try {
    const response = await fetch(
      `https://downloader.freemake.com/api/videoinfo/${getId(ytUrl)}`,
    );
    return await response.json();
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}
const handler = async (m, { conn, command, args, usedPrefix }) => {
  try {
    const text = args.length
      ? args.join(" ")
      : m.quoted?.text || m.quoted?.caption || m.quoted?.description || null;
    if (!text)
      return m.reply(
        `Masukkan URL video YouTube.\nContoh penggunaan:\n*${usedPrefix}${command}* https://youtube.com/watch?v=YQHsXMglC9A`,
      );
    m.react(wait);
    const [ytUrl, qualityLabel] = text?.split(" ");
    if (!isYouTubeUrl.test(ytUrl))
      return m.reply(
        `URL YouTube tidak valid.\nContoh penggunaan:\n*${usedPrefix}${command}* https://youtube.com/watch?v=YQHsXMglC9A`,
      );
    const results = await freemake(ytUrl);
    if (!results) return m.reply("Failed to fetch video info");
    const qualities = results.qualities;
    let selectedQualityUrl;
    if (qualityLabel) {
      const quality = qualities.find(
        (q) => q.qualityInfo.qualityLabel === qualityLabel,
      );
      if (quality) {
        selectedQualityUrl = quality.url;
      } else {
        return m.reply(
          `Quality label tidak valid. Available quality labels: ${qualities.map((q) => q.qualityInfo.qualityLabel).join(", ")}`,
        );
      }
    } else {
      selectedQualityUrl = qualities[0].url;
    }
    const isMP3 = selectedQualityUrl.includes("audio");
    await conn.sendMessage(
      m.chat,
      {
        [isMP3 ? "audio" : "video"]: {
          url: selectedQualityUrl,
        },
        mimetype: isMP3 ? "audio/mpeg" : "video/mp4",
        caption: results.metaInfo.title ? results.metaInfo.title : "",
      },
      {
        quoted: m,
      },
    );
  } catch (e) {
    console.error(e);
    m.react(error);
  }
};
handler.help = ["freemake"].map((v) => `${v} <url>`);
handler.tags = ["downloader"];
handler.command = /^(freemake)$/i;
handler.exp = 0;
handler.register = false;
handler.limit = true;
export default handler;
