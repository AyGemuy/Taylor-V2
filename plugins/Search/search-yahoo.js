import fetch from "node-fetch";
const {
  generateSerpApiUrl
} = await import("../../lib/serpapi.js");
const handler = async (m, {
  command,
  usedPrefix,
  conn,
  args
}) => {
  try {
    let text;
    if (args.length >= 1) {
      text = args.slice(0).join(" ");
    } else if (m.quoted && m.quoted?.text) {
      text = m.quoted?.text;
    } else throw "Input teks atau reply teks yang ingin dicari!";
    m.react(wait);
    if (command === "yahoo") {
      const param = {
        api_key: "d52da17da557f02e45234c11db22c4e9fe19c15d68a378e0a31f11d92b2cf562",
        engine: "yahoo",
        p: text
      };
      let all = await generateSerpApiUrl(param);
      let caption = all.organic_results.map((v, index) => `${htki + " " + ++index + " " + htka}\n*${v.title || "Tidak terdeteksi"}*\n  *○ Link:* ${v.link || "Tidak terdeteksi"}\n  *○ Snippet:* ${v.snippet || "Tidak terdeteksi"}`).join("\n\n");
      await conn.reply(m.chat, caption, m);
    }
    if (command === "yahooimg") {
      const param = {
        api_key: "d52da17da557f02e45234c11db22c4e9fe19c15d68a378e0a31f11d92b2cf562",
        engine: "yahoo_images",
        p: text
      };
      let all = await generateSerpApiUrl(param);
      let caption = all.images_results[0];
      await conn.sendMessage(m.chat, {
        image: {
          url: caption.original || caption.thumbnail
        },
        caption: `- ${caption.title}\n- ${caption.snippet}\n- ${caption.source}`,
        mentions: [m.sender]
      }, {
        quoted: m
      });
    }
    if (command === "yahoovid") {
      const param = {
        api_key: "d52da17da557f02e45234c11db22c4e9fe19c15d68a378e0a31f11d92b2cf562",
        engine: "yahoo_videos",
        p: text
      };
      let all = await generateSerpApiUrl(param);
      let caption = all.videos_results[0];
      await conn.sendMessage(m.chat, {
        video: {
          url: caption.preview || caption.thumbnail
        },
        caption: `- ${caption.title}\n- ${caption.duration}\n- ${caption.source}\n- ${caption.date}`,
        mentions: [m.sender]
      }, {
        quoted: m
      });
    }
  } catch (error) {
    console.error(error);
  }
};
handler.help = ["yahoo *[img/vid query]*"];
handler.tags = ["search"];
handler.command = /^yahoo(img|vid)?$/i;
export default handler;