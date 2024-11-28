import { oploverz } from "../../lib/download/oploverz.js";
const handler = async (m, { conn, args, usedPrefix, command }) => {
  try {
    if (!args[0]) throw "Input *URL*";
    const {
      title,
      date,
      iframeSrc,
      downloadLinks: formattedLinks,
    } = await oploverz.download(args[0]);
    let str = `•••••••••••••••••••••••••••••••••••••\n\n`;
    str += `• Title: ${title}\n`;
    str += `• Date: ${date}\n`;
    str += `• Iframe: ${iframeSrc}\n`;
    Object.entries(formattedLinks).forEach(([server, qualities]) => {
      str += `•••••••••••••••••••••••••••••••••••••\n\n*•• Server: ${server}*\n`;
      Object.entries(qualities).forEach(([quality, link]) => {
        str += `• Quality: ${quality}\n`;
        str += `• Link: ${link}\n\n`;
      });
    });
    m.reply(str);
  } catch (error) {
    m.reply(`Error: ${error}`);
  }
};
handler.help = ["oploverz"].map((v) => v + " <url>");
handler.tags = ["downloader"];
handler.command = /^(oploverz|plvrz)$/i;
handler.limit = true;
export default handler;
