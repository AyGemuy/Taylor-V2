import fetch from "node-fetch";
import {
  szippydl
} from "../../lib/scraper/scrape.js";
const handler = async (m, {
  conn,
  args,
  usedPrefix,
  command
}) => {
  if (!args[0]) throw `Use example ${usedPrefix}${command} https://www.tiktok.com/@omagadsus/video/7025456384175017243`;
  let res = await szippydl(args[0]),
    done = `*title:* ${res.title}\n*extension:* ${res.extension}\n*filesize:* ${res.filesize}\n*upload:* ${res.upload}\n*link:* ${res.link}`;
  if (res.link) return await conn.sendFile(m.chat, res.link, "", done, m);
  m.react(eror);
};
handler.help = ["zippyshare"].map(v => v + " <url>"), handler.tags = ["downloader"],
  handler.command = /^(zippy(share)?(ser)?(sher)?(sare)?)$/i;
export default handler;