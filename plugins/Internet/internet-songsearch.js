import {
  generateWAMessageFromContent
} from "@whiskeysockets/baileys";
import cheerio from "cheerio";
import fetch from "node-fetch";
const handler = async (m, {
  conn,
  args,
  usedPrefix,
  text,
  command
}) => {
  let lister = ["songv1", "songv2", "lyricsv1", "lyricsv2"],
    [feature, inputs, inputs_, inputs__, inputs___] = text.split("|");
  if (!lister.includes(feature)) return m.reply("*Example:*\n.songsearch v1|hello\n\n*Pilih type yg ada*\n" + lister.map((v, index) => "  ○ " + v).join("\n"));
  if (lister.includes(feature)) {
    if ("songv1" === feature) {
      if (!inputs) return m.reply("Input query link\nExample: .songsearch v1|hello");
      m.react(wait);
      try {
        let res = await searchSong(inputs),
          teks = res.map((item, index) => `*[ RESULT ${index + 1} ]*\n\n🎶 Name: ${item.name}\n📅 Year: ${item.year}\n👤 Artist: ${item.artist.name}\n💿 Album: ${item.albums.map(v => v.name || "")}\n⭐ Score: ${item.score}\n🆔 ID: ${item.id}\n📜 Lyrics: ${cleanLyrics(item.fragments.join("\n"))}\n📷 Image: ${item.image.url}\n🔗 Link: https://songsear.ch${item._url}\n`).filter(v => v).join("\n\n________________________\n\n"),
          ytthumb = await (await conn.getFile(res[0]?.image.url)).data,
          msg = await generateWAMessageFromContent(m.chat, {
            extendedTextMessage: {
              text: teks,
              jpegThumbnail: ytthumb,
              contextInfo: {
                mentionedJid: [m.sender],
                externalAdReply: {
                  body: "L I R I K",
                  containsAutoReply: !0,
                  mediaType: 1,
                  mediaUrl: "https://songsear.ch" + res[0]._url,
                  renderLargerThumbnail: !0,
                  showAdAttribution: !0,
                  sourceId: "WudySoft",
                  sourceType: "PDF",
                  previewType: "PDF",
                  sourceUrl: "https://songsear.ch" + res[0]._url,
                  thumbnail: ytthumb,
                  thumbnailUrl: res[0]?.image.url,
                  title: htki + " SONG - SEARCH " + htka
                }
              }
            }
          }, {
            quoted: m
          });
        await conn.relayMessage(m.chat, msg.message, {});
      } catch (e) {
        m.react(eror);
      }
    }
    if ("lyricsv1" === feature) {
      if (!inputs) return m.reply("Input query link\nExample: .songsearch v1|hello");
      m.react(wait);
      try {
        let res = await getSong(inputs),
          teks = `*[ RESULT ]*\n\n🎶 Title: ${res.song.name}\n👤 Artist: ${res.song.artist.name}\n💿 Album: ${res.song.albums.map(v => v.name || "")}\n📜 Lyrics: ${cleanLyricsV2(res.song.text_html)}\n📷 Image: ${res.song.image.url}\n🔗 Link: https://songsear.ch${res.song._url}\n`,
          ytthumb = await (await conn.getFile(res.song.image.url)).data,
          msg = await generateWAMessageFromContent(m.chat, {
            extendedTextMessage: {
              text: teks,
              jpegThumbnail: ytthumb,
              contextInfo: {
                mentionedJid: [m.sender],
                externalAdReply: {
                  body: "L I R I K",
                  containsAutoReply: !0,
                  mediaType: 1,
                  mediaUrl: "https://songsear.ch" + res.song._url,
                  renderLargerThumbnail: !0,
                  showAdAttribution: !0,
                  sourceId: "WudySoft",
                  sourceType: "PDF",
                  previewType: "PDF",
                  sourceUrl: "https://songsear.ch" + res.song._url,
                  thumbnail: ytthumb,
                  thumbnailUrl: res.song.image.url,
                  title: htki + " SONG - SEARCH " + htka
                }
              }
            }
          }, {
            quoted: m
          });
        await conn.relayMessage(m.chat, msg.message, {});
      } catch (e) {
        m.react(eror);
      }
    }
    if ("songv2" === feature) {
      if (!inputs) return m.reply("Input query link\nExample: .songsearch v1|hello");
      m.react(wait);
      try {
        let res = await searchSongV2(inputs),
          teks = res.map((item, index) => `*[ RESULT ${index + 1} ]*\n\n🎶 Title: ${item.title}\n👤 Artist: ${item.artist}\n💿 Album: ${item.album}\n📜 Lyrics: ${item.lyrics}\n📷 Image: ${item.image}\n🔗 Link: ${item.link}\n`).filter(v => v).join("\n\n________________________\n\n"),
          ytthumb = await (await conn.getFile(res[0]?.image)).data,
          msg = await generateWAMessageFromContent(m.chat, {
            extendedTextMessage: {
              text: teks,
              jpegThumbnail: ytthumb,
              contextInfo: {
                mentionedJid: [m.sender],
                externalAdReply: {
                  body: "L I R I K",
                  containsAutoReply: !0,
                  mediaType: 1,
                  mediaUrl: res[0]?.link,
                  renderLargerThumbnail: !0,
                  showAdAttribution: !0,
                  sourceId: "WudySoft",
                  sourceType: "PDF",
                  previewType: "PDF",
                  sourceUrl: res[0]?.link,
                  thumbnail: ytthumb,
                  thumbnailUrl: res[0]?.image,
                  title: htki + " SONG - SEARCH " + htka
                }
              }
            }
          }, {
            quoted: m
          });
        await conn.relayMessage(m.chat, msg.message, {});
      } catch (e) {
        m.react(eror);
      }
    }
    if ("lyricsv2" === feature) {
      if (!inputs) return m.reply("Input query link\nExample: .songsearch v1|hello");
      m.react(wait);
      try {
        let res = await getSongV2(inputs),
          teks = `*[ RESULT ]*\n\n🎶 Title: ${res.title}\n👤 Artist: ${res.artist}\n💿 Album: ${res.album}\n📅 Year: ${res.year}\n📜 Lyrics: ${cleanLyricsV2(res.lyrics)}\n📷 Image: ${res.imageSrc}\n🔗 Link: ${res.ogURL}\n`,
          ytthumb = await (await conn.getFile(res.imageSrc)).data,
          msg = await generateWAMessageFromContent(m.chat, {
            extendedTextMessage: {
              text: teks,
              jpegThumbnail: ytthumb,
              contextInfo: {
                mentionedJid: [m.sender],
                externalAdReply: {
                  body: "L I R I K",
                  containsAutoReply: !0,
                  mediaType: 1,
                  mediaUrl: res.ogURL,
                  renderLargerThumbnail: !0,
                  showAdAttribution: !0,
                  sourceId: "WudySoft",
                  sourceType: "PDF",
                  previewType: "PDF",
                  sourceUrl: res.ogURL,
                  thumbnail: ytthumb,
                  thumbnailUrl: res.imageSrc,
                  title: htki + " SONG - SEARCH " + htka
                }
              }
            }
          }, {
            quoted: m
          });
        await conn.relayMessage(m.chat, msg.message, {});
      } catch (e) {
        m.react(eror);
      }
    }
  }
};
handler.help = ["songsearch"], handler.tags = ["internet"], handler.command = /^(songsearch)$/i;
export default handler;
async function searchSong(keyword) {
  const url = `https://songsear.ch/api/search?q=${encodeURIComponent(keyword)}`;
  try {
    const response = await fetch(url);
    return (await response.json()).results;
  } catch (error) {
    return console.error("Error:", error), null;
  }
}
async function getSong(id) {
  const url = `https://songsear.ch/api/song/${id}`;
  try {
    const response = await fetch(url);
    return await response.json();
  } catch (error) {
    return console.error("Error:", error), null;
  }
}
async function searchSongV2(keyword) {
  const url = `https://songsear.ch/q/${encodeURIComponent(keyword)}`;
  try {
    const response = await fetch(url),
      html = await response.text(),
      $ = cheerio.load(html);
    return $(".results .result").map((index, element) => {
      const $element = $(element);
      return {
        title: $element.find(".head h2 a").text().trim(),
        artist: $element.find(".head h3 b").text().trim(),
        album: $element.find(".head .albums b").text().trim(),
        lyrics: $element.find(".fragments p").text().trim(),
        image: $element.find(".head img.album").attr("src"),
        link: "https://songsear.ch" + $element.find(".head h2 a").attr("href")
      };
    }).get();
  } catch (error) {
    return console.error("Error:", error), null;
  }
}
async function getSongV2(url) {
  const response = await fetch(url),
    html = await response.text(),
    $ = cheerio.load(html);
  return {
    imageSrc: $(".result.song .text-center .song-picture").attr("src").trim(),
    album: $(".result.song .text-center img").attr("alt").trim(),
    title: $(".result.song .text-center h2").text().trim(),
    artist: $(".result.song .text-center h3").eq(0).text().trim().replace("by", ""),
    year: $(".result.song .text-center h3").eq(1).text().trim().replace("on", ""),
    lyrics: $("blockquote").html().trim(),
    ogURL: $('meta[property="og:url"]').attr("content")
  };
}

function cleanLyrics(html) {
  return html.replace(/<[^>]+>/g, "");
}

function cleanLyricsV2(html) {
  return html.replace(/<br\s*\/?>/gi, "\n").replace(/&quot;/g, '"').replace(/&#x27;/g, "'");
}