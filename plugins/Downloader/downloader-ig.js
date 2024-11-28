import fetch from "node-fetch";
import * as cheerio from "cheerio";
import { Download } from "../../lib/download/get-download.js";
async function libDown(postUrl) {
  try {
    const libDownload = new Download();
    const { media } = await libDownload.igdl(postUrl);
    return media
      .map((v, i) => ({
        url: v,
        title: i,
      }))
      .filter(
        (item, index, self) =>
          index === self.findIndex((t) => t.url === item.url),
      );
  } catch (error) {
    console.error(`Gagal mengunduh dari ${postUrl}:`, error);
    return null;
  }
}
async function instagramVideos(postUrl) {
  try {
    const headers = {
      "User-Agent":
        "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Mobile Safari/537.36",
      Referer: "https://instagram-videos.vercel.app/",
    };
    const url = `https://instagram-videos.vercel.app/api/video?postUrl=${postUrl}`;
    const response = await fetch(url, {
      headers: headers,
      compress: true,
    });
    if (!response.ok) {
      throw new Error(
        `Gagal mengunduh video: ${response.status} ${response.statusText}`,
      );
    }
    const { data } = await response.json();
    const result = [
      {
        title: data.filename || "Nothing",
        url: data.videoUrl || "Nothing",
      },
    ];
    return result.filter(
      (item, index, self) =>
        index === self.findIndex((t) => t.url === item.url),
    );
  } catch (error) {
    console.error(error);
    return null;
  }
}
async function Shade(postUrl) {
  try {
    const response = await fetch(
      `https://nextbot.shade.cool/api/insta?url=${encodeURIComponent(postUrl)}`,
    );
    const { data } = await response.json();
    const result = [
      {
        title: data.post_video_urk || "Nothing",
        url: data.post_video_urk || "Nothing",
      },
    ];
    return result.filter(
      (item, index, self) =>
        index === self.findIndex((t) => t.url === item.url),
    );
  } catch (error) {
    console.error(error);
    return null;
  }
}
async function inDownloader(postUrl) {
  const url = "https://indownloader.app/request";
  const headers = {
    "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
    Accept: "application/json, text/javascript, */*; q=0.01",
    "X-Requested-With": "XMLHttpRequest",
    "User-Agent":
      "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Mobile Safari/537.36",
    Referer: "https://indownloader.app/video-downloader",
  };
  const data = new URLSearchParams({
    link: postUrl,
    downloader: "video",
  });
  const response = await fetch(url, {
    method: "POST",
    headers: headers,
    body: data,
  });
  const { html } = await response.json();
  const $ = cheerio.load(html);
  return $(".download-options a")
    .map((i, el) => $(el).attr("href"))
    .get()
    .filter((link) => link.includes("ey"))
    .map((v, i) => {
      try {
        return {
          url: JSON.parse(atob(v.split("id=")[1].split("&")[0]))?.url,
          title: i,
        };
      } catch (error) {
        console.error("Error decoding base64:", error);
        return {
          url: v,
          title: i,
        };
      }
    })
    .filter(
      (item, index, self) =>
        index === self.findIndex((t) => t.url === item.url),
    );
}
const handler = async (m, { conn, args, usedPrefix, command }) => {
  const text = args.length ? args.join(" ") : m.quoted?.text;
  if (!text) {
    return m.reply(
      `📥 *Unduh Media*\n\n*Silakan berikan link atau balas pesan dengan link yang ingin diunduh!*\n\n*Contoh:*\n${usedPrefix + command} https://contoh.com/link`,
    );
  }
  try {
    m.react(wait);
    const methods = [libDown, instagramVideos, Shade, inDownloader];
    for (const method of methods) {
      try {
        const results = await method(text);
        if (results && results.length) {
          for (const [index, media] of results.entries()) {
            await conn.sendMessage(
              m.chat,
              {
                video: {
                  url: media.url,
                },
                mimetype: "video/mp4",
                caption: `🎥 Video *${index + 1}*\nTitle: ${media.title}`,
              },
              {
                quoted: m,
              },
            );
          }
        }
      } catch (error) {
        console.error(`Error in method ${method.name}:`, error);
        continue;
      }
    }
    m.react(eror);
  } catch (error) {
    console.error(error);
    m.react(eror);
  }
};
handler.help = ["instagram *[link]*"];
handler.tags = ["downloader"];
handler.command = /^i(nsta(gram(dl)?|dl)|g(dl)?)$/i;
export default handler;
