import cheerio from "cheerio";
import fetch from "node-fetch";
const handler = async (m, {
  conn,
  args,
  usedPrefix,
  text,
  command
}) => {
  let lister = ["search", "app"],
    [feature, inputs, inputs_, inputs__, inputs___] = text.split("|");
  if (!lister.includes(feature)) return m.reply("*Example:*\n.apps4 search|vpn\n\n*Pilih type yg ada*\n" + lister.map((v, index) => "  ○ " + v).join("\n"));
  if (lister.includes(feature)) {
    if ("search" === feature) {
      if (!inputs) return m.reply("Input query link\nExample: .apps4 search|vpn");
      m.react(wait);
      try {
        let teks = (await searchApps4(inputs)).map((item, index) => `*[ RESULT ${index + 1} ]*\n*Title:* ${item.title}\n*Url:* ${item.href}\n*Thumb:* ${item.imageSrc}\n*Developer:* ${item.developer}\n*Version:* ${item.version}\n*Rating:* ${item.rating}\n`).filter(v => v).join("\n\n________________________\n\n");
        m.reply(teks);
      } catch (e) {
        m.react(eror);
      }
    }
    if ("app" === feature) {
      if (!inputs) return m.reply("Input query link\nExample: .apps4 app|link");
      try {
        let gdl = await getDownloadLinks(inputs),
          gmd = await getMetaData(gdl[0]?.downloadLink),
          scrap = await mediafireDl(gmd.url),
          cap = `*💌 Name:* ${scrap[0]?.nama}\n*📊 Size:* ${scrap[0]?.size}\n*🗂️ Extension:* ${scrap[0]?.mime}\n\n${wait}`;
        await conn.sendFile(m.chat, gmd.image, "", cap, m), await conn.sendFile(m.chat, scrap[0]?.link, scrap[0]?.nama, "", m, null, {
          mimetype: scrap[0]?.mime,
          asDocument: !0
        });
      } catch (e) {
        m.react(eror);
      }
    }
  }
};
handler.help = ["apps4"], handler.tags = ["internet"], handler.command = /^(apps4)$/i;
export default handler;
async function searchApps4(query) {
  const url = "https://www.apps4download.com/?s=" + query;
  try {
    const response = await fetch(url),
      html = await response.text(),
      $ = cheerio.load(html),
      sections = [];
    return $(".bloque-app").each((index, element) => {
      const section = {
        href: $(element).find("a").attr("href"),
        imageSrc: $(element).find("img").attr("data-src"),
        altText: $(element).find("img").attr("alt"),
        title: $(element).find(".title").text().trim(),
        developer: $(element).find(".developer").text().trim(),
        version: $(element).find(".version").text().trim(),
        rating: $(element).find(".stars").attr("style").match(/width:(\d+)%/)[1]
      };
      sections.push(section);
    }), sections;
  } catch (error) {
    console.log("Terjadi kesalahan:", error);
  }
}
async function getDownloadLinks(url) {
  try {
    const response = await fetch(url.endsWith("/?download=links") ? url : url + "/?download=links"),
      html = await response.text(),
      $ = cheerio.load(html);
    return $("ul.show_download_links > li > a").map((index, element) => ({
      downloadLink: $(element).attr("href"),
      title: $(element).text().trim()
    })).get();
  } catch (error) {
    console.log("Terjadi kesalahan:", error);
  }
}
async function getMetaData(url) {
  try {
    const response = await fetch(url),
      html = await response.text(),
      $ = cheerio.load(html),
      metaTags = $('meta[property^="og"]'),
      metaData = {};
    return metaTags.each((index, element) => {
      const property = $(element).attr("property"),
        content = $(element).attr("content");
      metaData[property.slice(3)] = content;
    }), metaData;
  } catch (error) {
    return console.log("Terjadi kesalahan:", error), null;
  }
}
async function mediafireDl(url) {
  const res = await fetch(url),
    $ = cheerio.load(await res.text()),
    results = [],
    link = $("a#downloadButton").attr("href"),
    size = $("a#downloadButton").text().replace("Download", "").replace("(", "").replace(")", "").replace("\n", "").replace("\n", "").replace("                         ", ""),
    nama = link.split("/")[5],
    mime = nama.split(".")[1];
  return results.push({
    nama: nama,
    mime: mime,
    size: size,
    link: link
  }), results;
}