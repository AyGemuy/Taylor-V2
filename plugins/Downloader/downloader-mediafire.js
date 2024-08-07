import cheerio from "cheerio";
import {
  mediafiredl
} from "@bochilteam/scraper";
import fetch from "node-fetch";
import {
  generateWAMessageFromContent
} from "@whiskeysockets/baileys";
const handler = async (m, {
  conn,
  text,
  usedPrefix,
  command
}) => {
  try {
    let lister = ["v1", "v2", "v3", "v4"],
      [inputs, feature] = text.split("|");
    const msg = `Masukkan input yang valid\n\n*Contoh:*\n${usedPrefix + command} link|v2\n\n*Pilih versi yang ada:*\n${lister.map(v => `  ○ ${v.toUpperCase()}`).join("\n")}`;
    if (feature = feature || "v4", !lister.includes(feature.toLowerCase())) return m.reply(msg);
    if (lister.includes(feature)) {
      if ("v1" === feature) {
        if (!inputs) return m.reply("Input mediafire link");
        try {
          let lol = await fetch(`https://api.lolhuman.xyz/api/mediafire?apikey=${Object.entries(APIKeys).find(([ key ]) => key.includes("lolhuman"))?.[1]}&url=${inputs}`),
            human = await lol.json();
          if (!human.result.filename) throw new Error("Error Gan");
          let caplol = `\n*💌 Name:* ${human.result.filename}\n*🗂️ Extension:* ${human.result.filetype}\n*📊 Size:* ${human.result.filesize}\n*📨 Uploaded:* ${human.result.uploaded}\n${wait}\n`,
            thumbnail = "https://i.pinimg.com/736x/a2/27/d9/a227d943642d43d8992b1bde1f323dd0.jpg",
            thumed = await (await conn.getFile(thumbnail)).data,
            msg = await generateWAMessageFromContent(m.chat, {
              extendedTextMessage: {
                text: caplol,
                jpegThumbnail: thumed,
                contextInfo: {
                  mentionedJid: [m.sender],
                  externalAdReply: {
                    body: "D O W N L O A D E R",
                    containsAutoReply: !0,
                    mediaType: 1,
                    mediaUrl: inputs,
                    renderLargerThumbnail: !0,
                    showAdAttribution: !0,
                    sourceId: "WudySoft",
                    sourceType: "PDF",
                    previewType: "PDF",
                    sourceUrl: inputs,
                    thumbnail: thumed,
                    thumbnailUrl: thumbnail,
                    title: "M E D I A F I R E"
                  }
                }
              }
            }, {
              quoted: m
            });
          if (await conn.relayMessage(m.chat, msg.message, {}), !human.result.link) throw new Error("Error Gan");
          await conn.sendFile(m.chat, human.result.link, human.result.filename, "", m, null, {
            mimetype: human.result.filetype,
            asDocument: !0
          });
        } catch (error) {
          console.error(error), m.reply("An error occurred. Please try again later.");
        }
      }
      if ("v2" === feature) {
        if (!inputs) return m.reply("Input mediafire link");
        try {
          let bocil = await mediafiredl(inputs),
            capboc = `\n*💌 Name:* ${bocil.filename}\n*📊 Size:* ${bocil.filesizeH}\n*🗂️ Extension:* ${bocil.ext}\n*📨 Uploaded:* ${bocil.aploud}\n${wait}\n`,
            thumbnail = "https://i.pinimg.com/736x/a2/27/d9/a227d943642d43d8992b1bde1f323dd0.jpg",
            thumed = await (await conn.getFile(thumbnail)).data,
            msg = await generateWAMessageFromContent(m.chat, {
              extendedTextMessage: {
                text: capboc,
                jpegThumbnail: thumed,
                contextInfo: {
                  mentionedJid: [m.sender],
                  externalAdReply: {
                    body: "D O W N L O A D E R",
                    containsAutoReply: !0,
                    mediaType: 1,
                    mediaUrl: inputs,
                    renderLargerThumbnail: !0,
                    showAdAttribution: !0,
                    sourceId: "WudySoft",
                    sourceType: "PDF",
                    previewType: "PDF",
                    sourceUrl: inputs,
                    thumbnail: thumed,
                    thumbnailUrl: thumbnail,
                    title: "M E D I A F I R E"
                  }
                }
              }
            }, {
              quoted: m
            });
          if (await conn.relayMessage(m.chat, msg.message, {}), !bocil.url) throw new Error("Error Gan");
          await conn.sendFile(m.chat, bocil.url, bocil.filename, "", m, null, {
            mimetype: bocil.ext,
            asDocument: !0
          });
        } catch (error) {
          console.error(error), m.reply("An error occurred. Please try again later.");
        }
      }
      if ("v3" === feature) {
        if (!inputs) return m.reply("Input mediafire link");
        try {
          let scrap = await mediafireDl(inputs),
            capscrap = `\n*💌 Name:* ${scrap[0]?.nama}\n*📊 Size:* ${scrap[0]?.size}\n*🗂️ Extension:* ${scrap[0]?.mime}\n${wait}\n`,
            thumbnail = "https://i.pinimg.com/736x/a2/27/d9/a227d943642d43d8992b1bde1f323dd0.jpg",
            thumed = await (await conn.getFile(thumbnail)).data,
            msg = await generateWAMessageFromContent(m.chat, {
              extendedTextMessage: {
                text: capscrap,
                jpegThumbnail: thumed,
                contextInfo: {
                  mentionedJid: [m.sender],
                  externalAdReply: {
                    body: "D O W N L O A D E R",
                    containsAutoReply: !0,
                    mediaType: 1,
                    mediaUrl: inputs,
                    renderLargerThumbnail: !0,
                    showAdAttribution: !0,
                    sourceId: "WudySoft",
                    sourceType: "PDF",
                    previewType: "PDF",
                    sourceUrl: inputs,
                    thumbnail: thumed,
                    thumbnailUrl: thumbnail,
                    title: "M E D I A F I R E"
                  }
                }
              }
            }, {
              quoted: m
            });
          if (await conn.relayMessage(m.chat, msg.message, {}), !scrap[0]?.link) throw new Error("Error Gan");
          await conn.sendFile(m.chat, scrap[0]?.link, scrap[0]?.nama, "", m, null, {
            mimetype: scrap[0]?.mime,
            asDocument: !0
          });
        } catch (error) {
          console.error(error), m.reply("An error occurred. Please try again later.");
        }
      }
      if ("v4" === feature) {
        if (!inputs) return m.reply("Input mediafire link");
        try {
          let scrap = await mediafireDl2(inputs),
            capscrap = `\n*💌 Name:* ${scrap.nama}\n*📊 Size:* ${scrap.size}\n*🗂️ Extension:* ${scrap.mime}\n${wait}\n`,
            thumbnail = "https://i.pinimg.com/736x/a2/27/d9/a227d943642d43d8992b1bde1f323dd0.jpg",
            thumed = await (await conn.getFile(thumbnail)).data,
            msg = await generateWAMessageFromContent(m.chat, {
              extendedTextMessage: {
                text: capscrap,
                jpegThumbnail: thumed,
                contextInfo: {
                  mentionedJid: [m.sender],
                  externalAdReply: {
                    body: "D O W N L O A D E R",
                    containsAutoReply: !0,
                    mediaType: 1,
                    mediaUrl: inputs,
                    renderLargerThumbnail: !0,
                    showAdAttribution: !0,
                    sourceId: "WudySoft",
                    sourceType: "PDF",
                    previewType: "PDF",
                    sourceUrl: inputs,
                    thumbnail: thumed,
                    thumbnailUrl: thumbnail,
                    title: "M E D I A F I R E"
                  }
                }
              }
            }, {
              quoted: m
            });
          if (await conn.relayMessage(m.chat, msg.message, {}), !scrap.link) throw new Error("Error Gan");
          await conn.sendFile(m.chat, scrap.link, scrap.nama, "", m, null, {
            mimetype: scrap.mime,
            asDocument: !0
          });
        } catch (error) {
          console.error(error), m.reply("An error occurred. Please try again later.");
        }
      }
    }
  } catch (err) {
    console.error(err), m.reply("An unexpected error occurred. Please try again later.");
  }
};
handler.help = ["mediafire"], handler.tags = ["downloader"], handler.command = /^m(ediafire(d(own(load(er)?)?|l))?|f(d(own(load(er)?)?|l))?)$/i,
  handler.limit = !0;
export default handler;
async function mediafireDl(url) {
  try {
    const res = await fetch(url),
      $ = cheerio.load(await res.text()),
      link = $("a#downloadButton").attr("href"),
      [nama, mime, size] = [link.split("/").pop().trim(), link.split(".").pop().trim(), $("a#downloadButton").text().replace(/Download|\(|\)|\n|\s+/g, "").trim()];
    return [{
      nama: nama,
      mime: mime,
      size: size,
      link: link
    }];
  } catch (error) {
    throw console.error(error), new Error("Error Gan");
  }
}
async function mediafireDl2(url) {
  try {
    var _a, _b;
    if (!/https?:\/\/(www\.)?mediafire\.com/.test(url)) throw new Error("Invalid URL: " + url);
    const data = await (await fetch(url)).text(),
      $ = cheerio.load(data),
      Url = ($("#downloadButton").attr("href") || "").trim(),
      url2 = ($("#download_link > a.retry").attr("href") || "").trim(),
      $intro = $("div.dl-info > div.intro"),
      filename = $intro.find("div.filename").text().trim(),
      filetype = $intro.find("div.filetype > span").eq(0).text().trim(),
      ext = (null === (_b = null === (_a = /\(\.(.*?)\)/.exec($intro.find("div.filetype > span").eq(1).text())) || void 0 === _a ? void 0 : _a[1]) || void 0 === _b ? void 0 : _b.trim()) || "bin",
      $li = $("div.dl-info > ul.details > li"),
      aploud = $li.eq(1).find("span").text().trim(),
      filesizeH = $li.eq(0).find("span").text().trim();
    return {
      link: Url,
      url2: url2,
      nama: filename,
      filetype: filetype,
      mime: ext,
      aploud: aploud,
      size: filesizeH,
      filesize: parseFloat(filesizeH) * (/GB/i.test(filesizeH) ? 1e6 : /MB/i.test(filesizeH) ? 1e3 : /KB/i.test(filesizeH) ? 1 : /B/i.test(filesizeH) ? .1 : 0)
    };
  } catch (error) {
    throw console.error(error), new Error("Error Gan");
  }
}