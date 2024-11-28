import axios from "axios";
import * as cheerio from "cheerio";
const getVideoData = async (url) => {
  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);
    const videoSrc = $("video").attr("src");
    const formattedVideoSrc =
      videoSrc && !videoSrc.startsWith("http") ? `https:${videoSrc}` : videoSrc;
    return {
      title: $('meta[property="og:title"]').attr("content"),
      description: $('meta[property="og:description"]').attr("content"),
      image: $('meta[property="og:image"]').attr("content"),
      video: formattedVideoSrc,
    };
  } catch (error) {
    return {
      error: error.message,
    };
  }
};
const handler = async (m, { conn, command, args, usedPrefix }) => {
  try {
    if (!args[0])
      return await conn.reply(
        m.chat,
        `Use example: ${usedPrefix}${command} <URL>`,
        m,
      );
    m.react(wait);
    const videoData = await getVideoData(args[0]);
    if (videoData.error) {
      return await conn.reply(
        m.chat,
        `Error fetching video data: ${videoData.error}`,
        m,
      );
    }
    const responseText = `
*Title:* ${videoData.title}
*Description:* ${videoData.description}
*Image:* ${videoData.image}
*Video:* ${videoData.video}
    `.trim();
    await conn.sendFile(m.chat, videoData.video, "", responseText, m);
    m.react(sukses);
  } catch (e) {
    console.log(e);
    m.react(eror);
  }
};
handler.help = ["cocofun"].map((v) => v + " <url>");
handler.tags = ["downloader"];
handler.command =
  /^c(oco(fun(d(own(load(er)?)?|l))?|d(own(load(er)?)?|l))|cfun(d(own(load(er)?)?|l))?)$/i;
export default handler;
