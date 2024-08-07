import cheerio from "cheerio";
import fetch from "node-fetch";
import {
  parseStringPromise
} from "xml2js";
const handler = async (m, {
  conn,
  args,
  usedPrefix,
  text,
  command
}) => {
  if (!text) throw "input text";
  try {
    if ("mlsounden" === command) {
      m.react(wait);
      let res = await MLSound("en", text),
        rdm = res[Math.floor(Math.random() * res.length)];
      await conn.sendMessage(m.chat, {
        audio: {
          url: rdm
        },
        seconds: fsizedoc,
        ptt: !0,
        mimetype: "audio/mpeg",
        fileName: rdm.split("/")[4] + ".mp3",
        waveform: [100, 0, 100, 0, 100, 0, 100]
      }, {
        quoted: m
      });
    }
    if ("mlsoundid" === command) {
      m.react(wait);
      let res = await MLSound("id", text),
        rdm = res[Math.floor(Math.random() * res.length)];
      await conn.sendMessage(m.chat, {
        audio: {
          url: rdm
        },
        seconds: fsizedoc,
        ptt: !0,
        mimetype: "audio/mpeg",
        fileName: rdm.split("/")[7] + ".mp3",
        waveform: [100, 0, 100, 0, 100, 0, 100]
      }, {
        quoted: m
      });
    }
  } catch (e) {
    m.react(eror);
  }
};
handler.help = ["mlsounden", "mlsoundid"], handler.tags = ["internet"], handler.command = /^mlsound(en|id)$/i;
export default handler;
async function MLSound(tema, query) {
  try {
    const url = tema === "id" ? `https://mobile-legends.fandom.com/wiki/${query}/Audio/id` : tema === "en" ? `https://mobilelegendsbuild.com/sitemap.xml` : null;
    if (!url) throw new Error("Tema tidak valid");
    let res = await fetch(url);
    let data = await res.text();
    if (tema === "en") {
      const result = await parseStringPromise(data);
      const targetUrl = result.urlset.url.filter(url => url.loc[0].includes("sound/" + query)).map(url => url.loc[0])[0];
      if (!targetUrl) return [];
      res = await fetch(targetUrl);
      data = await res.text();
    }
    const $ = cheerio.load(data);
    return $("audio").map((i, el) => $(el).attr("src")).get();
  } catch (error) {
    console.error(error);
    return [];
  }
}