import { BingImageCreator } from "../../lib/ai/bing-image.js";
import fetch from "node-fetch";
const handler = async (m, { conn, args, usedPrefix, command }) => {
  const text =
    args.length >= 1
      ? args.join(" ")
      : m.quoted?.text || m.quoted?.caption || m.quoted?.description || null;
  if (!text)
    return m.reply(
      `Masukkan teks atau reply pesan dengan teks yang ingin diolah.\nContoh penggunaan:\n*${usedPrefix}${command} Hai, apa kabar?*`,
    );
  m.react(wait);
  try {
    const res = new BingImageCreator({
      cookie:
        "1SNnCuhjo5tbaHnBKjTgSzCW0j_M1OSnEOaAD7BjMX9qgjZl7p1KlLQx53ys5rVmuFZ4pacA3NQLHzlwZd71cBCWSPza76FQV6znG2TtkiZ00hoWKXCK0PYuLKDrabO6Kjmqs7lLUdU1RfckReddpY3ajmc5cU-QI2OIbD7IeE8ZlgcDUVQcyZiahXE7dLqj6lyfZBbmTKijtmyLKONFAbQ",
    });
    let data;
    try {
      data = await res.createImage(text);
    } catch (error) {
      console.error(`Error in BingImageCreator: ${error.message}`);
      data = null;
    }
    if (!data) {
      try {
        data = await widipeBingimg(text);
      } catch (error) {
        console.error(`Error in widipeBingimg: ${error.message}`);
        data = null;
      }
    }
    if (!data) {
      try {
        data = await AemtBingImg(text);
      } catch (error) {
        console.error(`Error in AemtBingImg: ${error.message}`);
        data = null;
      }
    }
    const filteredData = data
      ? data.filter(
          (file) =>
            file.startsWith("http") &&
            !file.endsWith(".svg") &&
            !file.endsWith(".js"),
        )
      : [];
    if (filteredData.length > 0) {
      for (let i = 0; i < filteredData.length; i++) {
        try {
          await conn.sendFile(
            m.chat,
            filteredData[i],
            "",
            `Image *(${i + 1}/${filteredData.length})*`,
            m,
            false,
            {
              mentions: [m.sender],
            },
          );
        } catch (error) {
          console.error(`Error sending file: ${error.message}`);
          m.reply(`Failed to send image *(${i + 1}/${filteredData.length})*`);
        }
      }
    } else {
      m.reply("No images found after filtering.");
    }
  } catch (error) {
    console.error(`Error in handler: ${error.message}`);
    m.reply("An error occurred while processing the request.");
  }
};
handler.help = ["bingimg *[query]*"];
handler.tags = ["ai"];
handler.command = /^(bingimg)$/i;
export default handler;
async function AemtBingImg(query) {
  try {
    const headers = {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.114 Safari/537.36",
      "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
    };
    const response = await fetch(
      `https://aemt.me/bingimg?text=${encodeURIComponent(query)}`,
      {
        method: "get",
        headers: headers,
      },
    );
    const data = await response.json();
    return [data.result];
  } catch (error) {
    console.error(`Error in AemtBingImg: ${error.message}`);
    return null;
  }
}
async function widipeBingimg(query) {
  try {
    const headers = {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.114 Safari/537.36",
      "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
    };
    const response = await fetch(
      `https://widipe.com/bingimg?text=${encodeURIComponent(query)}`,
      {
        method: "get",
        headers: headers,
      },
    );
    const data = await response.json();
    return data.result;
  } catch (error) {
    console.error(`Error in widipeBingimg: ${error.message}`);
    return null;
  }
}
