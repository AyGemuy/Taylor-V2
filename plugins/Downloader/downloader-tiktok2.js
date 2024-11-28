import fetch from "node-fetch";
import * as cheerio from "cheerio";
import { aiovideodl } from "../../lib/tiktokdl.js";
const handler = async (m, { conn, args, usedPrefix, command }) => {
  let who =
    m.mentionedJid && m.mentionedJid[0]
      ? m.mentionedJid[0]
      : m.fromMe
        ? conn.user.jid
        : m.sender;
  await conn.profilePictureUrl(who).catch((_) => hwaifu.getRandom()),
    conn.getName(who);
  if (!args[0])
    throw `Use example ${usedPrefix}${command} https://www.tiktok.com/@omagadsus/video/7025456384175017243`;
  try {
    const {
        author: { nickname },
        video,
        description,
      } = await tiktokdl(args[0]),
      url = video.no_watermark || video.no_watermark2 || video.no_watermark_raw;
    if (!url) throw "Can't download video!";
    let caption = `*Nickname:* ${nickname}\n*Description:* ${description}`;
    await conn.sendFile(m.chat, url, "", caption, m);
  } catch {
    const { res } = await aiovideodl(args[0]),
      urll = res.data.url;
    if (!urll) throw "Can't download video!";
    let caption = `*Nickname:* ${wm}`;
    await conn.sendFile(m.chat, urll, "", caption, m);
  }
};
(handler.help = ["tiktok2"].map((v) => v + " <url>")),
  (handler.tags = ["downloader"]),
  (handler.command = /^(tiktok2)$/i);
export default handler;
async function tiktokdl(url) {
  const response = await fetch("https://ttsave.app/download", {
    method: "POST",
    headers: {
      origin: "https://ttsave.app",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      language_id: "1",
      query: url,
    }),
  });
  if (!response.ok) {
    throw new Error(`Failed to fetch TikTok data: ${response.statusText}`);
  }
  const html = await response.text();
  const $ = cheerio.load(html);
  const $div = $("div.flex");
  const nickname = $div.find("h2").text();
  const username = $div.find("a.font-extrabold").text();
  const avatar = $div.find("a > img").attr("src");
  const description = $div.find("p").text();
  const $span = $div.find("div.flex > div.flex > span");
  const played = $span.eq(0).text();
  const commented = $span.eq(1).text();
  const saved = $span.eq(2).text();
  const shared = $span.eq(3).text();
  const song = $div.find("div.flex > span").eq(4).text();
  const $a = $("#button-download-ready > a");
  const noWatermark = $a.eq(0).attr("href");
  const withWatermark = $a.eq(1).attr("href");
  const audio = $a.eq(2).attr("href");
  const thumbnail = $a.eq(4).attr("href");
  return {
    nickname: nickname,
    username: username,
    avatar: avatar,
    description: description,
    thumbnail: thumbnail,
    played: played,
    commented: commented,
    saved: saved,
    shared: shared,
    song: song,
    video: {
      noWatermark: noWatermark,
      withWatermark: withWatermark,
    },
    audio: audio,
  };
}
