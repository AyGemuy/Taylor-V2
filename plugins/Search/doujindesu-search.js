import {
  doujindesusearch
} from "../../lib/scraper/scraper-copy.js";
import fetch from "node-fetch";
const handler = async (m, {
  text,
  command,
  usedPrefix,
  conn
}) => {
  if (!text) {
    throw `Contoh penggunaan:\n${usedPrefix}${command} naruto`;
  }
  try {
    const resultList = await doujindesusearch(text);
    const list = resultList.map((item, index) => `*📺 Doujin Search 🔎*\n\n` + `*Title:* ${item.title}\n` + `*Thumb:* ${item.thumb}\n` + `*Type:* ${item.type}\n` + `*Status:* ${item.status}\n` + `*Score:* ${item.score}\n\n` + `*Url:* ${item.link}\n`).join("\n");
    m.reply(list);
  } catch (e) {
    console.error("Error:", e);
    m.react(eror);
  }
};
handler.help = ["doujindesusearch"];
handler.tags = ["internet"];
handler.command = ["doujindesusearch"];
export default handler;

function ArrClean(str) {
  return str.map((v, index) => ++index + ". " + v).join("\r\n");
}