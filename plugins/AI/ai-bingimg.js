const {
  BingImageCreator
} = await import("../../lib/ai/bing-image.js");
import fetch from "node-fetch";
const handler = async (m, {
  conn,
  args,
  usedPrefix,
  command
}) => {
  const text = args.length >= 1 ? args.join(" ") : m.quoted?.text || m.quoted?.caption || m.quoted?.description || null;
  if (!text) return m.reply(`Masukkan teks atau reply pesan dengan teks yang ingin diolah.\nContoh penggunaan:\n*${usedPrefix}${command} Hai, apa kabar?*`);
  m.react(wait);
  try {
    const res = new BingImageCreator({
      cookie: "1C-k_4JiXEAt_V-jpEJFkOYMDXVkzPuzH-xRminmulnHrfWEivRKtX9wsEWwWe_WcO8qtX4gR2RVrcvkvX5q3CnhBa3LmBrPRDAo25VzUvrwBrMp9cAuEU86uzrOKpwfpqR92PndHglCOPiv_BBm_0v72KC7jqD1VR9XDDqKNE-Eph-QrqN0hw5h88lz654xjE5XzFHtV4PsahiDnRwNkaw"
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
    const filteredData = data ? data.filter(file => !file.endsWith(".svg")) : [];
    if (filteredData.length > 0) {
      for (let i = 0; i < filteredData.length; i++) {
        try {
          await conn.sendFile(m.chat, filteredData[i], "", `Image *(${i + 1}/${filteredData.length})*`, m, false, {
            mentions: [m.sender]
          });
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
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.114 Safari/537.36",
      "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
    };
    const response = await fetch(`https://aemt.me/bingimg?text=${encodeURIComponent(query)}`, {
      method: "get",
      headers: headers
    });
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
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.114 Safari/537.36",
      "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
    };
    const response = await fetch(`https://widipe.com/bingimg?text=${encodeURIComponent(query)}`, {
      method: "get",
      headers: headers
    });
    const data = await response.json();
    return data.result;
  } catch (error) {
    console.error(`Error in widipeBingimg: ${error.message}`);
    return null;
  }
}