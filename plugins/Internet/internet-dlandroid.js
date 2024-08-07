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
  if (!lister.includes(feature)) return m.reply("*Example:*\n.dlandroid search|vpn\n\n*Pilih type yg ada*\n" + lister.map((v, index) => "  ○ " + v).join("\n"));
  if (lister.includes(feature)) {
    if ("search" === feature) {
      if (!inputs) return m.reply("Input query link\nExample: .dlandroid search|vpn");
      m.react(wait);
      try {
        let teks = (await searchDlandroid(inputs)).map((item, index) => `*[ RESULT ${index + 1} ]*\n\n📚 *Title:* ${item.title}\n📝 *Description:* ${item.description}\n📅 *Date:* ${item.date}\n🔖 *Categories:* ${item.categories}\n🔗 *Link:* ${item.downloadLink}`).filter(v => v).join("\n\n________________________\n\n");
        m.reply(teks);
      } catch (e) {
        m.react(eror);
      }
    }
    if ("app" === feature) {
      if (!inputs) return m.reply("Input query link\nExample: .dlandroid app|link");
      try {
        let resl = await getDlandroid(inputs),
          cap = `🌟 *Title:* ${resl.title}\n⭐️ *Rating:* ${resl.rating}\n📱 *Requires:* ${resl.requiresAndroid}\n💾 *Size:* ${resl.fileSize}\n\n${wait}`;
        await conn.sendFile(m.chat, resl.ogImageUrl, "", cap, m), await conn.sendFile(m.chat, resl.downloadLink, resl.title, null, m, !0, {
          quoted: m,
          mimetype: "application/vnd.android.package-archive"
        });
      } catch (e) {
        m.react(eror);
      }
    }
  }
};
handler.help = ["dlandroid"], handler.tags = ["internet"], handler.command = /^(dlandroid)$/i;
export default handler;
async function searchDlandroid(query) {
  const url = `https://dlandroid.com/?s=${encodeURIComponent(query)}`;
  try {
    const response = await fetch(Object.entries(APIs).find(([key]) => key.includes("proxy"))?.[1] + url),
      html = await response.text(),
      $ = cheerio.load(html);
    return $("div.post").map((index, element) => {
      const postElement = $(element);
      return {
        title: postElement.find("a.onvan > h2").eq(0).text().trim(),
        description: postElement.find("div.matn-post > p").text(),
        date: postElement.find("span.info").eq(0).text().trim(),
        categories: postElement.find("span.info").eq(1).find("a").map((index, el) => $(el).text()).get(),
        downloadLink: postElement.find("a.more").attr("href")
      };
    }).get();
  } catch (error) {
    return console.error(error), [];
  }
}
async function getDlandroid(url) {
  const proxyurl = Object.entries(APIs).find(([key]) => key.includes("proxy"))?.[1];
  try {
    const response = await fetch(proxyurl + url.endsWith("/download") ? proxyurl + url : proxyurl + url + "/download"),
      html = await response.text(),
      $ = cheerio.load(html);
    return {
      rating: $("span.rateshow").text(),
      title: $("a.img-n").attr("title"),
      ogImageUrl: $('meta[property="og:image"]').attr("content"),
      downloadLink: $("div.bilorda a#dllink").attr("href"),
      requiresAndroid: $("ul.infodl li:nth-child(1)").text().trim().split(":")[1].trim(),
      fileSize: $("ul.infodl li:nth-child(2)").text().trim().split(":")[1].trim(),
      help: $("div.help a").map((index, element) => ({
        buttonText: $(element).find("button").text(),
        link: $(element).attr("href")
      })).get()
    };
  } catch (error) {
    return console.error(error), null;
  }
}