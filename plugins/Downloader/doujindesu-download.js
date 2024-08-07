import {
  doujindesu
} from "../../lib/scraper/scraper-copy.js";
import fetch from "node-fetch";
const handler = async (m, {
  text,
  command,
  usedPrefix,
  conn
}) => {
  if (!text) throw "*Example:*\n" + usedPrefix + command + " url";
  try {
    let item = (await doujindesu(text)).chapter,
      mp = `*${htki} 📺 Doujin Downloader 🔎 ${htka}*\n\n*Title:* ${item[0]?.title}\n*Url:* ${item[0]?.url}\n*Download Url:* ${item[0]?.dl_url}\n\n`;
    m.reply(mp);
  } catch (e) {
    m.react(eror);
  }
};
handler.help = ["doujindesudown"], handler.tags = ["internet"], handler.command = ["doujindesudown"];
export default handler;

function ArrClean(str) {
  return str.map((v, index) => ++index + ". " + v).join("\r\n");
}