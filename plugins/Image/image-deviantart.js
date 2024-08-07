import cheerio from "cheerio";
import fetch from "node-fetch";
import axios from "axios";
import {
  Parser
} from "xml2js";
import util from "util";
const xmlToJson = async xml => {
  const parseXml = util.promisify(new Parser({
    explicitArray: !1,
    mergeAttrs: !0
  }).parseString);
  return await parseXml(xml);
}, handler = async (m, {
  conn,
  args,
  usedPrefix,
  text,
  command
}) => {
  let lister = ["search", "info"],
    [feature, inputs, inputs_, inputs__, inputs___] = text.split("|");
  if (!lister.includes(feature)) return m.reply("*Example:*\n.deviantart search|vpn\n\n*Pilih type yg ada*\n" + lister.map((v, index) => "  ○ " + v).join("\n"));
  if (lister.includes(feature)) {
    if ("search" === feature) {
      if (!inputs) return m.reply("Input query link\nExample: .deviantart search|vpn");
      m.react(wait);
      try {
        let teks = (await searchDeviantart(inputs)).map((item, index) => `🔍 *[ RESULT ${index + 1} ]*\n\n📚 *Title:* ${item.title}\n🔗 *Link:* ${item.link}\n🆔 *Guid:* ${extractIdFromUrl(item.guid)}\n📅 *PubDate:* ${item.pubDate}\n🎥 *MediaTitle:* ${item.mediaTitle}\n📰 *MediaCategory:* ${item.mediaCategory}\n📷 *MediaCredit:* ${generateOutput(item.mediaCredit)}\n📝 *MediaDescription:* ${removeHtmlTags(item.mediaDescription)}\n`).filter(v => v).join("\n\n________________________\n\n");
        m.reply(teks);
      } catch (e) {
        m.react(eror);
      }
    }
    if ("info" === feature) {
      if (!inputs) return m.reply("Input query link\nExample: .deviantart app|link");
      m.react(wait);
      try {
        if (!inputs.startsWith("https://www.deviantart.com/") && !inputs.startsWith("https://backend.deviantart.com/")) return m.reply("Link salah");
        let item = await infoDeviantart(inputs),
          cap = `🔍 *[ RESULT ]*\n\n📷 *Version:* ${item.version}\n🔖 *Type:* ${item.type}\n📚 *Title:* ${item.title}\n📰 *Category:* ${item.category}\n👤 *Author Name:* ${item.author_name}\n🔗 *Author URL:* ${item.author_url}\n📡 *Provider Name:* ${item.provider_name}\n🔗 *Provider URL:* ${item.provider_url}\n🛡️ *Safety:* ${item.safety}\n📅 *Pubdate:* ${item.pubdate}\n🔖 *Tags:* ${item.tags}\n`;
        await conn.sendFile(m.chat, item.url || logo, "", cap, m);
      } catch (e) {
        m.react(eror);
      }
    }
  }
};
handler.help = ["deviantart"], handler.tags = ["internet"], handler.command = /^(deviantart)$/i;
export default handler;

function generateOutput(text) {
  return `Credit: ${text.substr(0, text.indexOf("https"))}\nLink: ${text.substr(text.indexOf("https"))}`;
}

function extractIdFromUrl(url) {
  const match = url.match(/-(\d+)\b/);
  let id = "";
  return match && match.length > 1 && (id = match[1]), id;
}

function removeHtmlTags(text) {
  return text.replace(/(<([^>]+)>)/gi, "");
}
async function searchDeviantart(input) {
  const urlToFetch = `https://backend.deviantart.com/rss.xml?q=${input}&type=deviation`;
  try {
    const xmlData = (await axios.get(urlToFetch)).data,
      jsonData = await xmlToJson(xmlData);
    return jsonData?.rss?.channel?.item;
  } catch (error) {
    throw console.error(error), error;
  }
}
async function infoDeviantart(url) {
  const modifiedURL = url.includes("https://backend.deviantart.com/oembed?url=") ? url : `https://backend.deviantart.com/oembed?url=${url}&format=json`;
  try {
    const response = await fetch(modifiedURL);
    return await response.json();
  } catch (error) {
    throw console.error(error), error;
  }
}