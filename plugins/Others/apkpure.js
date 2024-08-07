import {
  sandroid1
} from "../../lib/scraper/scrape.js";
import fetch from "node-fetch";
const handler = async (m, {
  conn,
  text,
  usedPrefix,
  command
}) => {
  if (!text) return await conn.reply(m.chat, "Harap Masukan Query", m);
  m.reply("Searching...");
  let teks = (await sandroid1(text)).data.map((v, index) => v.judul + "\n⌚ dev: " + v.dev + "\n⏲️ rating: " + v.rating + "\n👁️ thumb: " + v.thumb + "\n📎 link: " + v.link).filter(v => v).join("\n\n________________________\n\n");
  m.reply(teks);
};
handler.help = ["apkpure"].map(v => v + " <query>"), handler.tags = ["tools"],
  handler.command = /^(apkpure)$/i, handler.owner = !1, handler.exp = 0, handler.limit = !0;
export default handler;