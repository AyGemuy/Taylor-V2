import fetch from "node-fetch";
import cheerio from "cheerio";
const handler = async (m, {
  command,
  usedPrefix,
  conn,
  text,
  args
}) => {
  let lister = ["search", "link"],
    [feature, inputs, inputs_, inputs__, inputs___] = text.split("|");
  if (!lister.includes(feature)) throw "*Example:*\n.stardima search|naruto\n\n*Pilih type yg ada*\n" + lister.map((v, index) => "  ○ " + v).join("\n");
  if (lister.includes(feature)) {
    if ("search" === feature) {
      if (!inputs) throw "Input query anime";
      try {
        let outs = await searchStardima(inputs),
          teks = outs.map((anime, index) => `*[ ${index + 1} ]*\n*Title:* ${anime.title}\n*Link:* ${anime.link}\n*Image:* ${anime.thumbnail}\n   `.trim()).filter(v => v).join("\n\n________________________\n\n");
        await conn.sendFile(m.chat, outs[0]?.thumbnail, "", teks, m);
      } catch (e) {
        m.react(eror);
      }
    }
    if ("link" === feature) {
      if (!inputs) throw "Input query anime";
      try {
        let outs = await getLinks(inputs);
        const message = (await Promise.all(outs.map(async (anime, index) => {
          const convertedLink = await getRedirectLinks(anime.link),
            match = convertedLink.match(/^(https?:\/\/)?([^\/]+)(\/.*)$/);
          return `*[ ${index + 1} ]*\n*Title:* ${anime.text} via ${match[2]}\n*Link:* ${convertedLink}\n`.trim();
        }))).filter(v => v).join("\n\n________________________\n\n");
        await conn.reply(m.chat, message, m);
      } catch (e) {
        m.react(eror);
      }
    }
  }
};
handler.help = ["stardima type query"], handler.tags = ["internet"], handler.command = /^(stardima)$/i;
export default handler;
async function searchStardima(query) {
  const url = `https://www.stardima.co/watch/?s=${encodeURIComponent(query)}`;
  try {
    const response = await fetch(url),
      html = await response.text(),
      $ = cheerio.load(html),
      results = [];
    return $(".result-item").each((index, element) => {
      const thumbnail = $(element).find(".thumbnail img").attr("src"),
        title = $(element).find(".title a").text().trim(),
        encodedLink = $(element).find(".title a").attr("href"),
        result = {
          thumbnail: thumbnail,
          title: title,
          link: decodeURIComponent(encodedLink)
        };
      results.push(result);
    }), results;
  } catch (error) {
    return console.log("Error:", error), [];
  }
}
async function getLinks(url) {
  try {
    const response = await fetch(url),
      html = await response.text(),
      $ = cheerio.load(html),
      links = [];
    return $("a[href*=https://www.stardima.co/watch/links/]").each((index, element) => {
      const link = $(element).attr("href"),
        text = $(element).text();
      links.push({
        link: link,
        text: text
      });
    }), links;
  } catch (error) {
    return console.error("Error:", error), [];
  }
}
async function getRedirectLinks(url) {
  try {
    const response = await fetch(url),
      html = await response.text(),
      redirectInput = cheerio.load(html)('input[type="hidden"][name="redirect"]');
    return redirectInput.val();
  } catch (error) {
    return console.error("Error:", error), null;
  }
}