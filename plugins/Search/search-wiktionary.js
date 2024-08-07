import {
  wiktionaryEn,
  wiktionaryId
} from "../../lib/wiktionary-api.js";
const handler = async (m, {
  text,
  command
}) => {
  if (!text) return m.reply("Input query");
  if ("wiktionaryen" === command) {
    const result = await wiktionaryEn(text);
    let message = `*Word:* ${result.word}\n*Language:* ${result.language}\n\n`;
    result.definitions.forEach((definition, index) => {
      message += `*Speech:* ${definition.speech}\n`, definition.lines.forEach((line, lineIndex) => {
        message += `  *Define:* ${line.define}\n`;
      }), message += "\n";
    }), m.reply(message);
  }
  if ("wiktionaryid" === command) {
    const searchResults = (await wiktionaryId(text)).query.search;
    let message = "";
    searchResults.forEach(result => {
      message += `*Word:* ${result.title}\n`;
      result.snippet.split("\n").forEach(line => {
        const cleanedLine = line.replace(/<[^>]*>/g, "");
        "" !== cleanedLine.trim() && (message += `  *Snippet:* ${cleanedLine}\n`);
      }), message += "\n";
    }), m.reply(message);
  }
};
handler.help = ["wiktionaryen", "wiktionaryid"], handler.tags = ["internet"],
  handler.command = /^(wiktionaryen|wiktionaryid)$/i;
export default handler;