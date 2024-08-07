import fetch from "node-fetch";
import {
  webp2mp4
} from "../../lib/webp2mp4.js";
import uploadImage from "../../lib/uploadImage.js";
const handler = async (m, {
  conn,
  isOwner,
  usedPrefix,
  command,
  args
}) => {
  const q = m.quoted ? m.quoted : m,
    mime = (q.msg || q).mimetype || "";
  let url;
  if (/image\/(jpe?g|png)/.test(mime)) {
    const img = await q?.download();
    url = await uploadImage(img);
  } else {
    if (!args[0] || !isImageURL(args[0])) return m.reply(`❌ Reply an image with command ${usedPrefix + command}`);
    url = args[0];
  }
  m.react(wait);
  try {
    const result = await fetchAnimeData(url);
    if (!result || 0 === result.length) return m.reply("❌ Error: Tidak dapat melacak anime.");
    const {
      anilist: {
        id = "Tidak diketahui",
        idMal = "Tidak diketahui",
        title = {},
        synonyms,
        isAdult
      },
      filename,
      episode = "Tidak diketahui",
      from,
      to,
      similarity,
      video,
      image
    } = result[0], nativeTitle = title.native || "Tidak diketahui", romajiTitle = title.romaji || "Tidak diketahui";
    let message = `📺 *Anime ID:* ${id}\n🔗 *MyAnimeList ID:* ${idMal}\n📜 *Native Title:* ${nativeTitle}\n🎭 *Romaji:* ${romajiTitle}\n🇺🇸 *English:* ${title.english || "Tidak diketahui"}\n`;
    synonyms && synonyms.length > 0 && (message += `📚 *Synonyms:* ${synonyms.join(", ")}\n`),
      message += `🔞 *Adult:* ${isAdult ? "Yes" : "No"}\n`, message += `🔍 *Similarity:* ${similarity ? similarity.toFixed(2) : "Tidak diketahui"}%\n`,
      message += `⏰ *Time:* ${from ? formatDuration(1e3 * from) : "Tidak diketahui"} - ${to ? formatDuration(1e3 * to) : "Tidak diketahui"}\n`, "Tidak diketahui" !== episode && (message += `🎬 *Episode:* ${episode}\n`);
    let webpbuffer = await mp4ToWebp(await (await conn.getFile(video)).data, {
        pack: packname,
        author: m.name
      }),
      outbuffer = await webp2mp4(webpbuffer);
    await conn.sendFile(m.chat, outbuffer, "", message, m);
  } catch (error) {
    return console.error(error), m.reply("❌ Terjadi kesalahan saat mencari anime.");
  }
};
handler.help = ["trace *Reply image*"], handler.tags = ["tools"], handler.command = /^(trace)$/i;
export default handler;

function isImageURL(url) {
  return /\.(jpeg|jpg|png|webp)$/i.test(url);
}
async function fetchAnimeData(url) {
  const apiUrl = `https://api.trace.moe/search?anilistInfo&url=${encodeURIComponent(url)}`,
    response = await fetch(apiUrl),
    {
      result
    } = await response.json();
  return result;
}
async function mp4ToWebp(file, stickerMetadata) {
  stickerMetadata ? (stickerMetadata.pack || (stickerMetadata.pack = "‎"), stickerMetadata.author || (stickerMetadata.author = "‎"), stickerMetadata.crop || (stickerMetadata.crop = !1)) : stickerMetadata || (stickerMetadata = {
    pack: "‎",
    author: "‎",
    crop: !1
  });
  const Format = {
    file: `data:video/mp4;base64,${file.toString("base64")}`,
    processOptions: {
      crop: stickerMetadata?.crop,
      startTime: "00:00:00.0",
      endTime: "00:00:7.0",
      loop: 0
    },
    stickerMetadata: {
      ...stickerMetadata
    },
    sessionInfo: {
      WA_VERSION: "2.2106.5",
      PAGE_UA: "WhatsApp/2.2037.6 Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.83 Safari/537.36",
      WA_AUTOMATE_VERSION: "3.6.10 UPDATE AVAILABLE: 3.6.11",
      BROWSER_VERSION: "HeadlessChrome/88.0.4324.190",
      OS: "Windows Server 2016",
      START_TS: 1614310326309,
      NUM: "6247",
      LAUNCH_TIME_MS: 7934,
      PHONE_VERSION: "2.20.205.16"
    },
    config: {
      sessionId: "session",
      headless: !0,
      qrTimeout: 20,
      authTimeout: 0,
      cacheEnabled: !1,
      useChrome: !0,
      killProcessOnBrowserClose: !0,
      throwErrorOnTosBlock: !1,
      chromiumArgs: ["--no-sandbox", "--disable-setuid-sandbox", "--aggressive-cache-discard", "--disable-cache", "--disable-application-cache", "--disable-offline-load-stale-cache", "--disk-cache-size=0"],
      executablePath: "C:\\\\Program Files (x86)\\\\Google\\\\Chrome\\\\Application\\\\chrome.exe",
      skipBrokenMethodsCheck: !0,
      stickerServerEndpoint: !0
    }
  };
  let res = await fetch("https://sticker-api.openwa.dev/convertMp4BufferToWebpDataUrl", {
    method: "post",
    headers: {
      Accept: "application/json, text/plain, /",
      "Content-Type": "application/json;charset=utf-8"
    },
    body: JSON.stringify(Format)
  });
  return Buffer.from((await res.text()).split(";base64,")[1], "base64");
}

function formatDuration(ms) {
  const seconds = Math.floor(ms / 1e3 % 60),
    minutes = Math.floor(ms / 6e4 % 60);
  return `${Math.floor(ms / 36e5 % 24).toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
}