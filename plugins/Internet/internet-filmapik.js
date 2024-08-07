import {
  filmApikS,
  filmApikDl
} from "../../lib/scraper/scraper-toolv2.js";
const handler = async (m, {
  conn,
  args,
  usedPrefix,
  text,
  command
}) => {
  let lister = ["search", "down"],
    [feature, inputs] = text.split("|");
  if (!lister.includes(feature)) return m.reply("*Example:*\n" + usedPrefix + command + " search|vpn\n\n*Pilih type yg ada*\n" + lister.map((v, index) => "  ○ " + v).join("\n"));
  if (lister.includes(feature)) {
    if ("search" === feature) {
      if (!inputs) return m.reply("Input query link\nExample: " + usedPrefix + command + " search|vpn");
      m.react(wait);
      try {
        let teks = (await filmApikS(inputs)).data.map((item, index) => `🔍 *[ RESULT ${index + 1} ]*\n\n📢 *Title:* ${item.title}\n🔗 *Url:* ${item.url}\n🔖 *Rating:* ${item.rating}\n🌐 *Synopsis:* ${item.synopsis}\n`).filter(v => v).join("\n\n________________________\n\n");
        m.reply(teks);
      } catch (e) {
        m.react(eror);
      }
    }
    if ("down" === feature) {
      if (!inputs) return m.reply("Input query link\nExample: " + usedPrefix + command + " down|link");
      m.react(wait);
      try {
        const result = (await filmApikDl(inputs)).Url;
        let replyMessage = "*RESULT*\n";
        for (const key in result) replyMessage += `- *${key}*: ${result[key]}\n`;
        m.reply(replyMessage);
      } catch (e) {
        m.react(eror);
      }
    }
  }
};
handler.help = ["filmapik"], handler.tags = ["internet"], handler.command = /^(filmapik)$/i;
export default handler;