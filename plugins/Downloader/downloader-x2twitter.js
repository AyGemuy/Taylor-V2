import * as cheerio from "cheerio";
import fetch from "node-fetch";
const X2twitter = async (tweetUrl) => {
  const url = "https://x2twitter.com/api/ajaxSearch";
  const headers = {
    "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
    Accept: "*/*",
    "X-Requested-With": "XMLHttpRequest",
    "User-Agent":
      "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Mobile Safari/537.36",
    Referer: "https://x2twitter.com/id",
  };
  const body = new URLSearchParams({
    q: tweetUrl,
    lang: "id",
  });
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: headers,
      body: body.toString(),
    });
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    const data = await response.json();
    const mediaUrls = await fetchMediaUrls(data.data);
    const output = {
      media: mediaUrls[0].videoUrls.map((v) =>
        JSON.parse(atob(v.split("=")[1].split(".")[1])),
      ),
    };
    const customArray = Array.from(
      new Set(output.media.map((item) => item.url)),
    ).map((url) => output.media.find((item) => item.url === url));
    const transformedArray = customArray
      .map((item) => {
        const quality = item.filename.split("_").pop().split(".")[0];
        return {
          url: item.url,
          quality: quality,
        };
      })
      .filter((item) => item.quality);
    return transformedArray;
  } catch (error) {
    console.error("Fetch error:", error);
  }
};
const fetchMediaUrls = async (body) => {
  const $ = cheerio.load(body);
  return $(".tw-video")
    .map((i, el) => {
      const videoUrls = $(el)
        .find(".dl-action a")
        .map((j, link) => {
          const href = $(link).attr("href");
          return href && !href.startsWith("#") ? href : null;
        })
        .get()
        .filter(Boolean);
      return {
        videoUrls: videoUrls,
        thumbnailUrl:
          $(el).find(".thumbnail img").attr("src") || "No thumbnail",
        audioUrl: $(el).find(".action-convert").data("audioUrl") || "No audio",
      };
    })
    .get();
};
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
    if (!url) return m.reply("URL Twitter tidak ditemukan dalam teks.");
    m.react(wait);
    const results = await X2twitter(url);
    if (!results || results.length === 0)
      return m.reply("Tidak ada hasil ditemukan.");
    if (isAll) {
      for (const [index, result] of results.entries()) {
        const { url } = result;
        await conn.sendMessage(
          m.chat,
          {
            video: {
              url: url,
            },
            mimetype: "video/mp4",
            caption: `🎥 Video *${index + 1}*\nKualitas: *${result.quality}*`,
          },
          {
            quoted: m,
          },
        );
      }
      m.react(sukses);
    } else {
      const { url } = results[0];
      await conn.sendMessage(
        m.chat,
        {
          video: {
            url: url,
          },
          mimetype: "video/mp4",
          caption: `🎥 Video\nKualitas: *${results[0].quality}*`,
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
handler.help = ["x2twitter"].map((v) => v + " <query>");
handler.tags = ["downloader"];
handler.command = /^(x2twitter)$/i;
export default handler;
