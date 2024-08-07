import {
  search
} from "../../lib/scraper/all/search.js";
import {
  XPanas
} from "../../lib/scraper/scraper-search.js";
const handler = async (m, {
  conn,
  args,
  usedPrefix,
  text,
  command
}) => {
  let lister = ["search"],
    [feature, inputs, inputs_, inputs__, inputs___] = text.split("|");
  if (!lister.includes(feature)) return m.reply("*Example:*\n.xpanas search|vpn\n\n*Pilih type yg ada*\n" + lister.map((v, index) => "  ○ " + v).join("\n"));
  if (lister.includes(feature)) {
    if ("search" === feature) {
      if (!inputs) return m.reply("Input query");
      try {
        let teks = (await search.xPanas(inputs) || await XPanas(inputs)).map((item, index) => `*[ RESULT ${index + 1} ]*\n*Link:* ${item.nonton}\n*Title:* ${item.title}\n`).filter(v => v).join("\n\n________________________\n\n");
        m.reply(teks);
      } catch (e) {
        m.react(eror);
      }
    }
  }
};
handler.help = ["xpanas"], handler.tags = ["internet"], handler.command = /^(xpanas)$/i;
export default handler;