import fetch from "node-fetch";
import {
  sstickersearch
} from "../../lib/scraper/scrape.js";
const handler = async (m, {
  command,
  usedPrefix,
  conn,
  text,
  args
}) => {
  let [tema, urutan] = text.split(/[^\w\s]/g);
  if (!tema) return m.reply("Input query!\n*Example:*\n.stickerpack [tema]|[angka]");
  if (!urutan) return m.reply("Input angka!\n*Example:*\n.stickerpack [tema]|[angka]");
  if (isNaN(urutan)) return m.reply("Input angka saja!\n*Example:*\n.stickerpack [tema]|[angka]");
  urutan = parseInt(urutan);
  m.react(wait);
  try {
    let json = await getTemplateImageUrl(tema, urutan),
      data = json.one,
      all = json.all;
    if (urutan > all.length) return m.reply(`Input query!\n*Example:*\n.stickerpack [tema]|[angka]\n\n*Pilih angka yg ada*\n${all.map((item, index) => `*${index + 1}.* ${item.content_description}`).join("\n")}`);
    if (isValidURL(data.url)) {
      let caption = `🔍 *[ HASIL ]*\n\n🆔 *Title:* ${data.title}\n🌐 *Author:* ${data.author}\n📋 *Description:* ${data.content_description}\n📌 *Item:* ${data.itemurl}`;
      await conn.sendMessage(m.chat, {
        video: {
          url: data.url
        },
        caption: caption,
        gifPlayback: true,
        gifAttribution: 2
      }, {
        quoted: m
      });
    }
  } catch (e) {
    console.error("Error in handler:", e);
    m.react(eror);
  }
};
handler.help = ["stickerpack *[tema]|[angka]*"];
handler.tags = ["sticker"];
handler.command = /^(stickerpack)$/i;
export default handler;

function isValidURL(message) {
  return /https?:\/\/[^\s/$.?#].[^\s]*/.test(message);
}
async function getTemplateImageUrl(input, number) {
  try {
    const data = await sstickersearch(input);
    return {
      one: {
        title: data.title,
        author: data.author,
        url: data.sticker[number - 1],
        content_description: data.title,
        itemurl: data.author_link
      },
      all: data.sticker.map((sticker, index) => ({
        content_description: data.title,
        url: sticker
      }))
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    throw new Error("Error fetching data.");
  }
}