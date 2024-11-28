import { Doods } from "../../lib/download/doods.js";
import * as cheerio from "cheerio";
import fetch from "node-fetch";
const handler = async (m, { conn, command, args, usedPrefix }) => {
  try {
    const text = args.length ? args.join(" ") : m.quoted?.text || null;
    if (!text)
      return m.reply(
        `Masukkan teks atau balas pesan.\nContoh: *${usedPrefix}${command}* Hai!`,
      );
    const urlPattern = /https?:\/\/[^\s]+/;
    const match = text.match(urlPattern);
    const url = match ? match[0] : null;
    if (!url) return m.reply("URL TikTok tidak ditemukan dalam teks.");
    m.react(wait);
    if (url.includes("/f/")) {
      try {
        const videoUrls = await multiVideo(url);
        for (const videoUrl of videoUrls) {
          try {
            const results = await Doods(videoUrl);
            if (!results) {
              return m.reply("Tidak ada media ditemukan.");
            }
            const media = results;
            await conn.sendMessage(
              m.chat,
              {
                video: {
                  url: media.finalLink,
                },
                mimetype: "video/mp4",
                caption: `🎥 ${media.title}\nDurasi: *${media.duration}*\nUkuran: *${media.size}*\nTanggal Upload: *${media.uploadDate}*`,
              },
              {
                quoted: m,
              },
            );
          } catch (e) {
            console.error(e);
            m.reply("Error: " + e.message);
          }
        }
      } catch (e) {
        console.error(e);
        m.reply("Error: " + e.message);
      }
    } else {
      try {
        const results = await Doods(url);
        if (!results) {
          return m.reply("Tidak ada media ditemukan.");
        }
        const media = results;
        await conn.sendMessage(
          m.chat,
          {
            video: {
              url: media.finalLink,
            },
            mimetype: "video/mp4",
            caption: `🎥 ${media.title}\nDurasi: *${media.duration}*\nUkuran: *${media.size}*\nTanggal Upload: *${media.uploadDate}*`,
          },
          {
            quoted: m,
          },
        );
      } catch (e) {
        console.error(e);
        m.reply("Error: " + e.message);
      }
    }
    m.react(sukses);
  } catch (e) {
    console.error(e);
    m.react(eror);
  }
};
async function multiVideo(url) {
  try {
    const proxyLink =
      "https://rv.lil-hacker.workers.dev/proxy?mirror=dood&url=";
    const idm = url.match(/\/[f]\/([a-zA-Z0-9]+)/);
    const html = await (
      await fetch(proxyLink + "https://d0000d.com/f/" + idm[1])
    ).text();
    const $ = cheerio.load(html);
    return [
      ...new Set(
        $("a[href]")
          .get()
          .map((el) => el.attribs.href)
          .filter((href) => href.startsWith("https")),
      ),
    ];
  } catch (e) {
    console.error(e);
    throw e;
  }
}
handler.help = ["doods"].map((v) => v + " <query>");
handler.tags = ["downloader"];
handler.command = /^(doods)$/i;
export default handler;
