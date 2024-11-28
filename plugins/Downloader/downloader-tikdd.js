import axios from "axios";
import { JSDOM } from "jsdom";
class TikDD {
  constructor() {
    this.url = "https://www.tikdd.cc/wp-json/aio-dl/video-data/";
    this.headers = {
      accept: "*/*",
      "content-type": "application/x-www-form-urlencoded",
      origin: "https://www.tikdd.cc",
      referer: "https://www.tikdd.cc/",
      "user-agent": "Postify/1.0.0",
      cookie: "pll_language=en",
      "x-forwarded-for": Array.from(
        {
          length: 4,
        },
        () => Math.floor(Math.random() * 256),
      ).join("."),
    };
  }
  async token() {
    const { data } = await axios.get("https://www.tikdd.cc");
    const token = new JSDOM(data).window.document.getElementById("token").value;
    if (!token) throw new Error("Tokennya gak ada 😆");
    return token;
  }
  urlHash(url) {
    return btoa(url) + (url.length + 1e3) + btoa("aio-dl");
  }
  async down(videoUrl) {
    const token = await this.token();
    const hash = this.urlHash(videoUrl);
    const response = await axios.post(
      this.url,
      new URLSearchParams({
        url: videoUrl,
        token: token,
        hash: hash,
      }),
      {
        headers: this.headers,
      },
    );
    return response.data;
  }
}
const handler = async (m, { conn, command, args, usedPrefix }) => {
  try {
    const text = args.length ? args.join(" ") : m.quoted?.text || null;
    if (!text)
      return m.reply(
        `Masukkan teks atau balas pesan.\nContoh: *${usedPrefix}${command}* Hai!`,
      );
    const isAll = text.endsWith("--all");
    const urlPattern = /https?:\/\/[^\s]+/;
    const match = text.match(urlPattern);
    const url = match ? match[0] : null;
    if (!url) return m.reply("URL TikTok tidak ditemukan dalam teks.");
    m.react(wait);
    const TikDd = new TikDD();
    const results = await TikDd.down(url);
    const videoUrl = results.medias[0].url;
    if (isAll) {
      for (const [index, media] of results.medias.entries()) {
        const mediaUrl = media.url;
        await conn.sendMessage(
          m.chat,
          {
            video: {
              url: mediaUrl,
            },
            mimetype: "video/mp4",
            caption: `🎥 Video *${index + 1}*\nKualitas: *${media.quality}*`,
          },
          {
            quoted: m,
          },
        );
      }
      m.react(sukses);
    } else {
      await conn.sendMessage(
        m.chat,
        {
          video: {
            url: videoUrl,
          },
          mimetype: "video/mp4",
          caption: `🎥 Video\nKualitas: *${results.medias[0].quality}*`,
        },
        {
          quoted: m,
        },
      );
      m.react(sukses);
    }
  } catch (e) {
    console.log(e);
    m.react(eror);
  }
};
handler.help = ["tikdd"].map((v) => v + " <query>");
handler.tags = ["downloader"];
handler.command = /^(tikdd)$/i;
export default handler;
