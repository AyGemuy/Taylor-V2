import cheerio from "cheerio";
import fetch from "node-fetch";
const handler = async (m, {
  conn,
  args,
  usedPrefix,
  text,
  command
}) => {
  let lister = ["search", "pdf"],
    [feature, inputs, inputs_, inputs__, inputs___] = text.split("|");
  if (!lister.includes(feature)) return m.reply("*Example:*\n.bookspdf search|vpn\n\n*Pilih type yg ada*\n" + lister.map((v, index) => "  ○ " + v).join("\n"));
  if (lister.includes(feature)) {
    if ("search" === feature) {
      if (!inputs) return m.reply("Input query link\nExample: .bookspdf search|vpn");
      m.react(wait);
      try {
        let teks = (await searchBook(inputs)).map((item, index) => `*[ RESULT ${index + 1} ]*\n\n*Title:* ${item.title}\n*Url:* ${item.link}\n*Image:* ${item.imageUrl}\n*Description:* ${item.description}\n`).filter(v => v).join("\n\n________________________\n\n");
        m.reply(teks);
      } catch (e) {
        m.react(eror);
      }
    }
    if ("pdf" === feature) {
      if (!inputs) return m.reply("Input query link\nExample: .bookspdf pdf|link");
      try {
        let resl = await getInfo(inputs),
          cap = `\n*title:* ${resl.download.title}\n*link:* ${resl.link}\n*downloadLink:* ${resl.download.downloadLink}\n*content:* ${resl.content}\n\n${wait}`;
        m.reply(cap), await conn.sendFile(m.chat, resl.download.downloadLink, resl.download.title, null, m, !0, {
          quoted: m,
          mimetype: "application/pdf"
        });
      } catch (e) {
        m.react(eror);
      }
    }
  }
};
handler.help = ["bookspdf"], handler.tags = ["internet"], handler.command = /^(bookspdf)$/i;
export default handler;
async function searchBook(q) {
  try {
    const response = await fetch("https://free-bookspdf.com/?s=" + q),
      html = await response.text(),
      $ = cheerio.load(html),
      result = [];
    return $("div.col-lg-3.col-md-4.col-sm-6.col-xs-12").each((index, element) => {
      const title = $(element).find("h3").text().trim(),
        imageUrl = $(element).find("img").attr("src"),
        link = $(element).find("a").attr("href"),
        description = $(element).find(".book-tit").text().trim();
      result.push({
        title: title,
        imageUrl: imageUrl,
        link: link,
        description: description
      });
    }), result;
  } catch (error) {
    console.log(error);
  }
}
async function getInfo(url) {
  const baseUrl = "https://free-bookspdf.com";
  try {
    const response = await fetch(url),
      html = await response.text(),
      $ = cheerio.load(html),
      content = $("div.ng-scope").find("p").text().trim(),
      link = $("a.btn-primary").attr("href"),
      ogImageUrl = $('meta[property="og:image"]').attr("content"),
      ogTitle = $('meta[property="og:title"]').attr("content"),
      download = await downloadLink(baseUrl + link);
    return {
      content: content,
      link: baseUrl + link,
      ogImageUrl: ogImageUrl,
      ogTitle: ogTitle,
      download: download
    };
  } catch (error) {
    console.log(error);
  }
}
async function downloadLink() {
  try {
    const url = "https://free-bookspdf.com/download/?6786",
      response = await fetch(url),
      body = await response.text(),
      $ = cheerio.load(body),
      downloadLink = $("a.btn-primary").attr("href");
    return {
      title: $("a.btn-primary").text().trim(),
      downloadLink: downloadLink
    };
  } catch (error) {
    console.error("Error fetching book details:", error);
  }
}