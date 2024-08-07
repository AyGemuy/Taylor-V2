import cheerio from "cheerio";
import axios from "axios";
const handler = async (m, {
  conn,
  args,
  usedPrefix,
  text,
  command
}) => {
  let lister = ["search", "gif", "vid"],
    [feature, inputs, inputs_, inputs__, inputs___] = text.split("|");
  if (!lister.includes(feature)) return m.reply("*Example:*\n.pornhub search|vpn\n\n*Pilih type yg ada*\n" + lister.map((v, index) => "  ○ " + v).join("\n"));
  if (lister.includes(feature)) {
    if ("search" === feature) {
      if (!inputs) return m.reply("Input query");
      try {
        let teks = (await searchVideo(inputs)).map((item, index) => `*[ RESULT ${index + 1} ]*\n*Link:* ${item.link}\n*Title:* ${item.title}\n*Uploader:* ${item.uploader}\n*Views:* ${item.views}\n*Duration:* ${item.duration}\n`).filter(v => v).join("\n\n________________________\n\n");
        m.reply(teks);
      } catch (e) {
        m.react(eror);
      }
    }
    if ("gif" === feature) {
      if (!inputs) return m.reply("Input query");
      try {
        let teks = (await searchGif(inputs)).map((item, index) => `*[ RESULT ${index + 1} ]*\n*Title:* ${item.title}\n*Url:* ${item.url}\n*Webm:* ${item.webm}\n`).filter(v => v).join("\n\n________________________\n\n");
        m.reply(teks);
      } catch (e) {
        m.react(eror);
      }
    }
    if ("vid" === feature) {
      if (!inputs) return m.reply("Input query");
      try {
        let teks = (await getVideo(inputs)).mediaDefinitions.map((item, index) => `*[ RESULT ${index + 1} ]*\n*format:* ${item.format}\n*quality:* ${item.quality}\n*videoUrl:* ${item.videoUrl}\n`).filter(v => v).join("\n\n________________________\n\n");
        m.reply(teks);
      } catch (e) {
        m.react(eror);
      }
    }
  }
};
handler.help = ["pornhub"], handler.tags = ["internet"], handler.command = /^(pornhub)$/i;
export default handler;
async function searchVideo(query) {
  const url = `https://www.pornhub.com/video/search?search=${query}`;
  try {
    const response = await axios.get(url),
      $ = cheerio.load(response.data);
    return $("li[data-video-segment]").map((i, el) => {
      const $el = $(el);
      return {
        link: "https://www.pornhub.com" + $el.find(".title a").attr("href").trim(),
        title: $el.find(".title a").text().trim(),
        uploader: $el.find(".videoUploaderBlock a").text().trim(),
        views: $el.find(".views").text().trim(),
        duration: $el.find(".duration").text().trim()
      };
    }).get();
  } catch (error) {
    return console.error("Error:", error.message), [];
  }
}
async function getVideo(url) {
  try {
    const html = (await axios.get(url)).data,
      metaPayload = ((startPattern, endPattern) => {
        const startIndex = html.search(startPattern);
        return html.substring(startIndex, html.indexOf(endPattern, startIndex));
      })(/var flashvars_\d{1,} = /, ";\n");
    return JSON.parse(metaPayload.substring(metaPayload.indexOf("{")));
  } catch (error) {
    return console.error("Error fetching or parsing data:", error), null;
  }
}
async function searchGif(query) {
  const url = `http://www.pornhub.com/gifs/search?search=${query}`,
    response = await fetch(url),
    html = await response.text(),
    $ = cheerio.load(html);
  return $("ul.gifs.gifLink li").map((i, gif) => {
    const data = $(gif).find("a");
    return {
      title: data.find("span").text(),
      url: "http://dl.phncdn.com#id#.gif".replace("#id#", data.attr("href")),
      webm: data.find("video").attr("data-webm")
    };
  }).get();
}