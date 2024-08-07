import cheerio from "cheerio";
import fetch from "node-fetch";
const handler = async (m, {
  conn,
  args,
  usedPrefix,
  command
}) => {
  const msg = `Input link atau reply link yang ingin di download!\n\n*Contoh:*\n${usedPrefix + command} link`;
  let text;
  if (args.length >= 1) text = args.join(" ");
  else {
    if (!m.quoted || !m.quoted?.text) throw msg;
    text = m.quoted?.text;
  }
  m.react(wait);
  const query = text.trim();
  try {
    if (query.startsWith("https://xfantazy.com/video/") || /^[0-9a-zA-Z]{24}$/.test(query)) {
      const videoId = query.split("/").pop(),
        videoSource = await getXfantazy(videoId);
      videoSource ? await conn.sendFile(m.chat, videoSource, "", "🎥 *Video Source* 🎥", m) : await conn.reply(m.chat, "❌ *Failed to retrieve video source* ❌", m);
    } else {
      const searchResults = await searchXfantazy(query);
      if (searchResults.length > 0) {
        const response = `🔍 Search Results for *${query}* 🔍\n\n${searchResults.map((v, i) => `*${i + 1}.* ${v.title} (${v.duration})\n${v.link}\n`).join("\n")}`;
        await conn.reply(m.chat, response, m);
      } else {
        const noResultsMessage = `❌ No search results found for *${query}* ❌`;
        await conn.reply(m.chat, noResultsMessage, m);
      }
    }
  } catch (error) {
    await conn.reply(m.chat, error, m);
  }
};
handler.help = ["xfantazy *[link/query]*"], handler.tags = ["downloader"], handler.command = /^(xfantazy)$/i;
export default handler;
async function searchXfantazy(q) {
  try {
    const response = await fetch(`https://xfantazy.com/search/${q}`),
      html = await response.text(),
      $ = cheerio.load(html);
    return $(".MuiGrid-root.MuiGrid-item").map((index, element) => {
      const videoElement = $(element),
        link = videoElement.find("a").attr("href"),
        duration = videoElement.find(".MuiTypography-body1").eq(0).text(),
        title = videoElement.find(".MuiTypography-body1").eq(1).text(),
        fullLink = (link.split("/")[2], "https://xfantazy.com" + link);
      return {
        link: fullLink,
        duration: duration,
        title: title,
        id: fullLink.split("/").pop()
      };
    }).get().filter(video => video.link && video.duration && video.title);
  } catch (error) {
    return console.error("Error fetching data:", error), [];
  }
}
async function getXfantazy(id) {
  try {
    const response = await fetch("https://thefantazy.com/graphql", {
        method: "POST",
        headers: {
          Accept: "*/*",
          "Accept-Language": "en-US,en;q=0.9",
          "Content-Type": "application/json",
          "Sec-Fetch-Dest": "empty",
          "Sec-Fetch-Mode": "cors",
          "Sec-Fetch-Site": "same-origin"
        },
        body: JSON.stringify({
          operationName: "Query",
          variables: {
            id: id
          },
          query: "query Query($id: String!) {\n    getVideoSources(id: $id) {\n      free360DailyLimitExceeded\n      sources {\n        type\n        label\n        src\n        blocked\n        durationLimit\n      }\n    }\n  }"
        })
      }),
      data = await response.text(),
      parsedData = JSON.parse(data);
    return parsedData.data.getVideoSources.sources[0]?.src;
  } catch (error) {
    return console.error("Error fetching video source:", error), null;
  }
}