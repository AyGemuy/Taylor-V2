import fetch from "node-fetch";
import * as cheerio from "cheerio";
import { viewSource } from "../../lib/other-function.js";
const processString = (input) => {
  return input.includes("-")
    ? input.split("-").map((part) => part.trim())[1]
    : input;
};
const formatDate = (date) => {
  if (!date) return "N/A";
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return new Date(date).toLocaleDateString(undefined, options);
};
const UrleBird = async (query, index = 0) => {
  try {
    const body = await viewSource.view(
      "https://urlebird.com/id/search/?q=" + encodeURIComponent(query),
      0,
    );
    const $ = cheerio.load(body);
    const videoLinks = $("#thumbs .thumb.wc")
      .map((i, el) => ({
        authorLink: $(el).find(".info3 .author-name a").attr("href") || "",
        videoLink: $(el).find(".info3 a").eq(1).attr("href") || "",
        videoTitle: $(el).find(".info3 span").text().trim() || "",
        uploaded:
          $(el)
            .find(".stats .flex.items-center.mb-1 span")
            .first()
            .text()
            .trim() || "",
        views:
          $(el)
            .find(".stats .flex.items-center.mb-1 span")
            .eq(1)
            .text()
            .trim() || "",
        likes:
          $(el)
            .find(".stats .flex.items-center.mb-1 span")
            .eq(2)
            .text()
            .trim() || "",
        comments:
          $(el)
            .find(".stats .flex.items-center.mb-1 span")
            .last()
            .text()
            .trim() || "",
      }))
      .get();
    if (videoLinks[index]) {
      const videoBody = await viewSource.view(videoLinks[index].videoLink, 0);
      const $ = cheerio.load(videoBody);
      const videoObjectScript = $(
        'script[type="application/ld+json"]#VideoObject',
      ).html();
      const videoObject = JSON.parse(videoObjectScript || "{}");
      const combinedData = {
        ...videoLinks[index],
        ...videoObject,
        videoLink: videoObject.url || videoLinks[index].videoLink,
        videoTitle: videoObject.name || videoLinks[index].videoTitle,
        description: videoObject.description || videoLinks[index].description,
      };
      const caption = `
*🎬 Title:* ${combinedData.videoTitle}
*📝 Description:* ${combinedData.description}
*👤 Author:* [${combinedData.authorLink}](#)
*📅 Uploaded:* ${processString(combinedData.uploaded)}
*👁️ Views:* ${combinedData.views}
*👍 Likes:* ${combinedData.likes}
*💬 Comments:* ${combinedData.comments}

*🔗 URL:* ${combinedData.videoLink}
*🖼️ Thumbnail:* ${combinedData.thumbnailURL}
*⏳ Duration:* ${combinedData.duration}
*📅 Upload Date:* ${formatDate(combinedData.uploadDate)}

*🎙️ Creator:* ${combinedData.creator?.name || "N/A"}
`;
      return {
        videoUrl: combinedData.contentUrl || combinedData.videoLink,
        caption: caption,
      };
    }
    return {};
  } catch (err) {
    console.error("Error:", err);
    return {};
  }
};
const handler = async (m, { conn, command, args, usedPrefix }) => {
  try {
    const query = args.length
      ? args.join(" ")
      : m.quoted?.text || m.quoted?.caption || m.quoted?.description || null;
    if (!query)
      return m.reply(
        `Masukkan Query video Tiktok.\nContoh penggunaan:\n*${usedPrefix}${command}* Dj`,
      );
    m.react(wait);
    const { videoUrl, caption } = await UrleBird(query);
    if (videoUrl) {
      await conn.sendMessage(
        m.chat,
        {
          video: {
            url: videoUrl,
          },
          caption: caption,
          mimetype: "video/mp4",
        },
        {
          quoted: m,
        },
      );
      m.react(sukses);
    } else {
      m.reply("Video tidak ditemukan.");
    }
  } catch (e) {
    console.error(e);
    m.react(eror);
  }
};
handler.help = ["urlebird"].map((v) => `${v} <query>`);
handler.tags = ["downloader"];
handler.command = /^(urlebird)$/i;
handler.exp = 0;
handler.register = false;
handler.limit = true;
export default handler;
