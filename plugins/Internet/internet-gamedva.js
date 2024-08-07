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
  if (!lister.includes(feature)) return m.reply("*Example:*\n.gamedva search|vpn\n\n*Pilih type yg ada*\n" + lister.map((v, index) => "  ○ " + v).join("\n"));
  if (lister.includes(feature)) {
    if ("search" === feature) {
      if (!inputs) return m.reply("Input query link\nExample: .gamedva search|vpn");
      m.react(wait);
      try {
        let teks = (await searchApp(inputs)).map((item, index) => `🔍 [ RESULT ${index + 1} ]\n\n📌 *Title:* ${item.title}\n🖼️ *Image:* ${item.image}\n🔗 *Link:* ${item.link}\n📝 *Detail:* ${item.version}\n`).filter(v => v).join("\n\n________________________\n\n");
        m.reply(teks);
      } catch (e) {
        m.react(eror);
      }
    }
    if ("app" === feature) {
      if (!inputs) return m.reply("Input query link\nExample: .gamedva app|link");
      try {
        let item = await getDownloadInfo(inputs),
          cap = `🔍 [ RESULT ]\n\n📌 *Title:* ${item.detail.title} ${item.info}\n🔗 *Link:* ${item.detail.links}\n📝 *Detail:* ${item.detail.description}\n`;
        await conn.sendFile(m.chat, item.detail.image, "", cap, m), await conn.sendFile(m.chat, item.link, item.detail.title, null, m, !0, {
          quoted: m,
          mimetype: "application/vnd.android.package-archive"
        });
      } catch (e) {
        m.react(eror);
      }
    }
  }
};
handler.help = ["gamedva"], handler.tags = ["internet"], handler.command = /^(gamedva)$/i;
export default handler;
async function searchApp(query) {
  const response = await fetch("https://gamedva.com/?s=" + query + "&asl_active=1&p_asl_data=1&customset[]=post&asl_gen[]=title&polylang_lang=en&qtranslate_lang=0&filters_initial=1&filters_changed=0"),
    html = await response.text(),
    $ = cheerio.load(html),
    results = [];
  return $("article.ap-post.ap-lay-c").each((index, element) => {
    const result = {
      title: $(element).find(".entry-title").text(),
      link: $(element).find("a").attr("href"),
      image: $(element).find(".meta-image img").attr("src"),
      version: $(element).find(".entry-excerpt").text()
    };
    results.push(result);
  }), results;
}
async function getDownloadInfo(url) {
  const hasQueryString = url.includes("?"),
    hasDownloadFileParam = url.includes("?download&file=0");
  url = hasQueryString ? hasDownloadFileParam ? url : url + "&download&file=0" : url + "?download&file=0";
  const response = await fetch(url),
    html = await response.text(),
    $ = cheerio.load(html);
  let title, links, image, description, author;
  $("meta[property]").each((index, element) => {
    const property = $(element).attr("property"),
      content = $(element).attr("content");
    switch (property) {
      case "og:title":
        title = content;
        break;
      case "og:url":
        links = content;
        break;
      case "og:image":
        image = content;
        break;
      case "og:description":
        description = content;
        break;
      case "article:author":
        author = content;
    }
  });
  const metaData = {
      title: title,
      links: links,
      image: image,
      description: description,
      author: author
    },
    linkElement = $("a#download-now");
  return {
    link: linkElement.attr("href"),
    info: linkElement.find(".progress-text").text().trim(),
    detail: metaData
  };
}