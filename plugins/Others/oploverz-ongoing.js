import { oploverz } from "../../lib/download/oploverz.js";
const handler = async (m, { conn, command }) => {
  try {
    let str = "•••••••••••••••••••••••••••••••••••••\n";
    let items;
    switch (command) {
      case "ongoing":
        items = await oploverz.ongoing();
        items.forEach((item) => {
          str += `• Title: ${item.title || "No Title"}\n`;
          str += `• Episode: ${item.episodes || "No Episodes"}\n`;
          str += `• Type: ${item.type || "No Type"}\n`;
          str += `• Score: ${item.rating || "N/A"}\n`;
          str += `• Status: ${item.status || "No Status"}\n`;
          str += `• Link: ${item.url || "No URL"}\n`;
          str += `• Poster: ${item.imgSrc || "No Image"}\n`;
          str += "•••••••••••••••••••••••••••••••••••••\n";
        });
        break;
      case "opcomplete":
        items = await oploverz.ongoing();
        items.forEach((item) => {
          str += `• Title: ${item.title || "No Title"}\n`;
          str += `• Episodes: ${item.episodes || "No Episodes"}\n`;
          str += `• Rating: ${item.rating || "N/A"}\n`;
          str += `• URL: ${item.url || "No URL"}\n`;
          str += `• Image: ${item.imgSrc || "No Image"}\n`;
          str += "•••••••••••••••••••••••••••••••••••••\n";
        });
        break;
      case "oprandom":
        items = await oploverz.random();
        items.forEach((item) => {
          str += `• Title: ${item.title || "No Title"}\n`;
          str += `• Episodes: ${item.episodes || "No Episodes"}\n`;
          str += `• Rating: ${item.rating || "N/A"}\n`;
          str += `• URL: ${item.url || "No URL"}\n`;
          str += `• Image: ${item.imgSrc || "No Image"}\n`;
          str += "•••••••••••••••••••••••••••••••••••••\n";
        });
        break;
      default:
        throw `Command '${command}' not recognized`;
    }
    await conn.reply(m.chat, str, m, {
      contextInfo: {
        mentionedJid: [m.sender],
      },
    });
  } catch (error) {
    m.reply(`Error: ${error.message || error}`);
  }
};
handler.help = ["ongoing", "opcomplete", "oprandom"];
handler.tags = [""];
handler.command = /^(ongoing|opcomplete|oprandom)$/i;
handler.limit = true;
export default handler;
