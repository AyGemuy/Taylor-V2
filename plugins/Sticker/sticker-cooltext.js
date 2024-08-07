import fetch from "node-fetch";
import cheerio from "cheerio";
const handler = async (m, {
  conn,
  text,
  usedPrefix
}) => {
  const parts = text.split("|"),
    query = parts[0] ? parts[0]?.trim() : null,
    style = parts[1] ? parts[1].trim() : null,
    input = parts[2] ? parts[2].trim() : null;
  if (!query || !style) return m.reply("Gunakan format: " + usedPrefix + "cooltext [teks] | [style/id] | [indeks/URL]");
  if (!input) {
    const urlRegex = /^https:\/\/cooltext\.com\/Logo-/;
    if (style.match(urlRegex)) {
      const url = style,
        logoID = await extractLogoIDFromLink(url);
      try {
        const imageUrl = await getImageUrl(logoID, query),
          caption = `- *Image for:* ${query}\n- *LogoID:* ${logoID}\n- *Oleh:* @${m.sender.split("@")[0]}`,
          message = imageUrl.isAnimated ? {
            video: {
              url: imageUrl.renderLocation
            },
            caption: caption,
            mentions: [m.sender],
            gifPlayback: !0,
            gifAttribution: 2
          } : {
            image: {
              url: imageUrl.renderLocation
            },
            caption: caption,
            mentions: [m.sender]
          };
        return conn.sendMessage(m.chat, message, {
          quoted: m
        });
      } catch (error) {
        return m.reply(`Error: ${error.message}`);
      }
    } else {
      if (!Number(style)) {
        const searchResults = await searchCoolText(style);
        if (0 === searchResults.length) return m.reply("Tidak ada hasil yang ditemukan untuk pencarian ini.");
        const replyMessage = searchResults.map((result, i) => `*${i + 1}.* ${result.title}`).join("\n");
        return m.reply(replyMessage);
      }
      try {
        const imageUrl = await getImageUrl(parseInt(style), query),
          caption = `- *Image for:* ${query}\n- *LogoID:* ${style}\n- *Oleh:* @${m.sender.split("@")[0]}`,
          message = imageUrl.isAnimated ? {
            video: {
              url: imageUrl.renderLocation
            },
            caption: caption,
            mentions: [m.sender],
            gifPlayback: !0,
            gifAttribution: 2
          } : {
            image: {
              url: imageUrl.renderLocation
            },
            caption: caption,
            mentions: [m.sender]
          };
        return conn.sendMessage(m.chat, message, {
          quoted: m
        });
      } catch (error) {
        return m.reply(`Error: ${error.message}`);
      }
    }
  }
  if (Number(input)) {
    const searchResults = await searchCoolText(style),
      index = parseInt(input);
    if (index >= 1 && index <= searchResults.length) {
      const selectedResult = searchResults[index - 1],
        logoID = await extractLogoIDFromLink(selectedResult.link);
      try {
        const imageUrl = await getImageUrl(logoID, query),
          caption = `- *Image for:* ${query}\n- *LogoID:* ${logoID}\n- *Oleh:* @${m.sender.split("@")[0]}`,
          message = imageUrl.isAnimated ? {
            video: {
              url: imageUrl.renderLocation
            },
            caption: caption,
            mentions: [m.sender],
            gifPlayback: !0,
            gifAttribution: 2
          } : {
            image: {
              url: imageUrl.renderLocation
            },
            caption: caption,
            mentions: [m.sender]
          };
        return conn.sendMessage(m.chat, message, {
          quoted: m
        });
      } catch (error) {
        return m.reply(`Error: ${error.message}`);
      }
    }
    return m.reply("Invalid index. Gunakan format: " + usedPrefix + "cooltext [teks] | [style/id] | [indeks]");
  }
  return m.reply("Input tidak valid. Gunakan format: " + usedPrefix + "cooltext [teks] | [style/id] | [indeks/URL]");
};
handler.help = ["cooltext"], handler.tags = ["misc"], handler.command = /^(cooltext)$/i;
export default handler;
async function getImageUrl(textStyleId, text) {
  try {
    const headers = {
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
      },
      body = [`LogoID=${textStyleId}`, `Text=${encodeURIComponent(text)}`, "FontSize=70", "FileFormat=6", "Integer5=0", "Integer7=0", "Integer8=0", "Integer6=0", "Integer9=0", "Integer13=on", "Integer12=on"].join("&"),
      response = await fetch("https://cooltext.com/PostChange", {
        method: "POST",
        headers: headers,
        body: body
      });
    return await response.json() || null;
  } catch (e) {
    throw console.error(e), new Error("Something went wrong getting Word Art");
  }
}
async function extractLogoIDFromLink(link) {
  try {
    const response = await fetch(link);
    if (!response.ok) throw new Error("Failed to fetch data");
    const html = await response.text();
    return cheerio.load(html)("#LogoID").attr("value");
  } catch (error) {
    throw console.error(error), new Error("Failed to extract LogoID from the link");
  }
}
async function searchCoolText(query) {
  try {
    const response = await fetch(`https://cooltext.com/Search?Query=${query}`);
    if (!response.ok) throw new Error("Failed to fetch data");
    const html = await response.text(),
      $ = cheerio.load(html),
      resultArray = $(".SearchLink").map(function() {
        const link = "https://cooltext.com/" + $(this).attr("href");
        return {
          title: $(this).find(".SearchResult b").text(),
          link: link
        };
      }).get();
    return resultArray.filter(result => result.link.startsWith("https://cooltext.com/Logo-"));
  } catch (error) {
    throw console.error(error), new Error("Failed to perform the search");
  }
}