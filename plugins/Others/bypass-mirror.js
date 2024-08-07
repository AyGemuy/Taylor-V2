import fetch from "node-fetch";
import {
  bypassMirrored
} from "../../lib/tools/bypass-mirror.js";
const handler = async (m, {
  text,
  usedPrefix
}) => {
  if (!text) throw "*Example:*\n" + usedPrefix + "bypassmirror url";
  try {
    const list = (await bypassMirrored(text)).map(item => `*📺 Bypass Mirror 🔎*\n        \n*Host:* ${item.host}\n*Url:* ${item.url}\n*Status:* ${item.status}`).join("\n\n");
    m.reply(list);
  } catch (e) {
    throw e;
  }
};
handler.help = ["bypassmirror"], handler.tags = ["internet"], handler.command = ["bypassmirror"];
export default handler;