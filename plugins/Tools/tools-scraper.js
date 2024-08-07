import fetch from "node-fetch";
import {
  NeoxrApi
} from "../../lib/tools/neoxr-api.js";
import * as scrapFunctions from "../../lib/scraper/scrape.js";
const handler = async (m, {
  text
}) => {
  const featureList = Object.keys(scrapFunctions),
    [feature, ...inputs] = text.split(/[^\w\s]/g);
  if (!featureList.includes(feature)) return m.reply(`*Example:*\n.fs youtube.search.hello\n\n*Pilih type yg ada*\n${featureList.map(v => "  ○ " + v).join("\n")}`);
  if (featureList.includes(feature)) {
    if (!inputs.length) return m.reply("Input Query!");
    try {
      m.react(wait);
      const result = await scrapFunctions[feature](inputs.join(" "));
      return await clean(JSON.stringify(result, null, 4));
    } catch (e) {
      m.react(eror);
    }
  }
};
handler.help = ["scrap type query"], handler.tags = ["internet"], handler.command = /^(scrap)$/i;
export default handler;

function clean(string) {
  return string.replace(/{|}|"/g, "");
}