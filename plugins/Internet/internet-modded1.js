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
  if (!lister.includes(feature)) return m.reply("*Example:*\n.modded1 search|vpn\n\n*Pilih type yg ada*\n" + lister.map((v, index) => "  ○ " + v).join("\n"));
  if (lister.includes(feature)) {
    if ("search" === feature) {
      if (!inputs) return m.reply("Input query link\nExample: .modded1 search|vpn");
      m.react(wait);
      try {
        let teks = (await searchModded(inputs)).map((item, index) => `🔍 *[ RESULT ${index + 1} ]*\n\n📝 *Title:* ${item.title}\n🔗 *Url:* ${item.url}\n🖼️ *Thumb:* ${item.iconUrl}\n📋 *Meta:* ${item.meta}\n🏷️ *Categories:* ${item.categories}\n`).filter(v => v).join("\n\n________________________\n\n");
        m.reply(teks);
      } catch (e) {
        m.react(eror);
      }
    }
    if ("app" === feature) {
      if (!inputs) return m.reply("Input query link\nExample: .modded1 app|link");
      try {
        let resl = await getMod1(inputs),
          cap = "*Name:* " + resl.text + "\n*Link:* " + resl.url + "\n\n" + wait;
        await conn.sendFile(m.chat, resl.ogImageUrl, "", cap, m), await conn.sendFile(m.chat, resl.url, resl.text, null, m, !0, {
          quoted: m,
          mimetype: "application/vnd.android.package-archive"
        });
      } catch (e) {
        m.react(eror);
      }
    }
  }
};
handler.help = ["modded1"], handler.tags = ["internet"], handler.command = /^(modded1)$/i;
export default handler;
async function searchModded(query) {
  try {
    const response = await fetch("https://modded-1.com/?s=" + query),
      html = await response.text(),
      $ = cheerio.load(html),
      articles = [];
    return $("article").each((index, element) => {
      const article = {
        title: $(element).find(".app-name h2").text().trim(),
        url: $(element).find(".app").attr("href"),
        iconUrl: $(element).find(".app-icon img").attr("src"),
        meta: $(element).find(".app-meta").first().text().trim(),
        categories: $(element).find(".app-meta span").map((index, el) => $(el).text().trim()).get()
      };
      articles.push(article);
    }), articles;
  } catch (error) {
    return console.log("Terjadi kesalahan:", error), [];
  }
}
async function getMod1(query) {
  try {
    const response = await fetch(query.endsWith("/download/0") ? query : query + "/download/0"),
      html = await response.text(),
      $ = cheerio.load(html),
      ogImageUrl = $('meta[property="og:image"]').attr("content"),
      link = $("#download").find("a"),
      text = link.text(),
      url = link.attr("href");
    return {
      text: text,
      url: url,
      ogImageUrl: ogImageUrl
    };
  } catch (error) {
    return console.log("Terjadi kesalahan:", error), {};
  }
}