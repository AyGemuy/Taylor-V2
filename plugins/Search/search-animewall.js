import {
  Search
} from "../../lib/tools/search-animewall.js";
const handler = async (m, {
  text,
  command
}) => {
  if (!text) throw "Masukkan kueri";
  try {
    let result, output;
    switch (command) {
      case "e621":
        result = new Search("e621"), output = await result.search(text), m.reply(JSON.stringify(output, null, 4));
        break;
      case "gelbooru":
        result = new Search("gelbooru"), output = await result.search(text), m.reply(JSON.stringify(output, null, 4));
        break;
      case "rule34":
        result = new Search("rule34"), output = await result.search(text), m.reply(JSON.stringify(output, null, 4));
        break;
      case "danbooru":
        result = new Search("danbooru"), output = await result.search(text), m.reply(JSON.stringify(output, null, 4));
        break;
      case "konachan":
        result = new Search("konachan"), output = await result.search(text), m.reply(JSON.stringify(output, null, 4));
        break;
      case "konachan18":
        result = new Search("konachan18"), output = await result.search(text), m.reply(JSON.stringify(output, null, 4));
        break;
      case "hypnohub":
        result = new Search("hypnohub"), output = await result.search(text), m.reply(JSON.stringify(output, null, 4));
        break;
      case "xbooru":
        result = new Search("xbooru"), output = await result.search(text), m.reply(JSON.stringify(output, null, 4));
        break;
      case "realbooru":
        result = new Search("realbooru"), output = await result.search(text), m.reply(JSON.stringify(output, null, 4));
        break;
      case "furrybooru":
        result = new Search("furrybooru"), output = await result.search(text), m.reply(JSON.stringify(output, null, 4));
    }
  } catch (error) {
    m.reply(error);
  }
};
handler.tags = ["search"], handler.help = ["e621", "gelbooru", "rule34", "danbooru", "konachan", "konachan18", "hypnohub", "xbooru", "realbooru", "furrybooru"],
  handler.command = /^(e621|gelbooru|rule34|danbooru|konachan|konachan18|hypnohub|xbooru|realbooru|furrybooru)$/i;
export default handler;