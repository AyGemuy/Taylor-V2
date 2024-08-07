import fetch from "node-fetch";
import cheerio from "cheerio";
import _ from "lodash";
const handler = async (m, {
  conn,
  text
}) => {
  try {
    const query = _.trim(text) || _.trim(_.get(m, "quoted.text", m.text));
    if (!query) return m.reply("Please provide text to stylize.");
    const items = await stylizeText(query);
    const message = _.reduce(items, (acc, {
      name,
      value
    }, index) => {
      return acc + `${index + 1}. *\`${name}\`*\n- ${value}\n\n`;
    }, "");
    await conn.reply(m.chat, message.trim(), m);
  } catch (error) {
    m.react(eror);
  }
};
handler.help = ["style2 <text>"];
handler.tags = ["tools"];
handler.command = /^style(text)?2$/i;
handler.exp = 0;
export default handler;
const stylizeText = async query => {
  try {
    const response = await fetch(`http://qaz.wtf/u/convert.cgi?text=${encodeURIComponent(query)}`);
    const html = await response.text();
    const $ = cheerio.load(html);
    return _.chain($("table tr")).map(row => {
      const cells = $(row).find("td");
      return cells.length > 1 ? {
        name: $(cells[0]).find(".aname").text() || $(cells[0]).text(),
        value: $(cells[1]).html().trim()
      } : null;
    }).compact().value();
  } catch (error) {
    console.error("Error fetching data:", error);
    throw new Error("Failed to fetch and process data");
  }
};