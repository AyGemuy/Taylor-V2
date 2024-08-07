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
  if (!lister.includes(feature)) return m.reply("*Example:*\n.apkhome search|vpn\n\n*Pilih type yg ada*\n" + lister.map((v, index) => "  ○ " + v).join("\n"));
  if (lister.includes(feature)) {
    if ("search" === feature) {
      if (!inputs) return m.reply("Input query link\nExample: .apkhome search|vpn");
      m.react(wait);
      try {
        let teks = (await searchApkhome(inputs)).map((item, index) => `🔍 *[ RESULT ${index + 1} ]*\n\n📰 *Title:* ${item.title}\n🔗 *Url:* ${item.href}\n🖼️ *Thumb:* ${item.imageSrc}\n📆 *Edition:* ${item.edition}`).filter(v => v).join("\n\n________________________\n\n");
        m.reply(teks);
      } catch (e) {
        m.react(eror);
      }
    }
    if ("app" === feature) {
      if (!inputs) return m.reply("Input query link\nExample: .apkhome app|link");
      try {
        let resl = await getApkhome(inputs),
          cap = "*Name:* " + resl.downloadLink + "\n*Link:* " + resl.downloadLinkURL + "\n\n" + wait;
        await conn.sendFile(m.chat, resl.ogImageUrl, "", cap, m), await conn.sendFile(m.chat, resl.downloadLinkURL, resl.downloadLink, null, m, !0, {
          quoted: m,
          mimetype: "application/vnd.android.package-archive"
        });
      } catch (e) {
        m.react(eror);
      }
    }
  }
};
handler.help = ["apkhome"], handler.tags = ["internet"], handler.command = /^(apkhome)$/i;
export default handler;
async function searchApkhome(query) {
  try {
    const url = "https://apkhome.io/id/?s=" + query,
      response = await fetch(url),
      html = await response.text(),
      $ = cheerio.load(html),
      elements = $("li > dl > a");
    return elements.map((index, element) => {
      const anchorElement = $(element);
      return {
        href: anchorElement.attr("href"),
        imageSrc: anchorElement.find(".l img").attr("data-cfsrc") || anchorElement.find(".l img").attr("src"),
        title: anchorElement.find(".r .p1").text().trim(),
        edition: anchorElement.find(".r p:last-of-type").text().trim()
      };
    }).get();
  } catch (error) {
    console.error(error);
  }
}
async function getApkhome(url) {
  try {
    const response = await fetch(url),
      html = await response.text(),
      $ = cheerio.load(html),
      ogImageUrl = $('meta[property="og:image"]').attr("content"),
      gtBlockElement = $("p.gt-block");
    return {
      title: gtBlockElement.find("strong").first().text().trim(),
      description: gtBlockElement.first().text().trim(),
      supportedAndroid: gtBlockElement.filter(':contains("Android yang didukung")').next("br").text().trim(),
      supportedAndroidVersions: gtBlockElement.filter(':contains("Versi Android yang didukung")').next("br").text().trim(),
      ogImageUrl: ogImageUrl,
      downloadLink: $('a[href^="https://dl2.apkhome.io"]').text().trim(),
      downloadLinkURL: $('a[href^="https://dl2.apkhome.io"]').attr("href")
    };
  } catch (error) {
    console.error(error);
  }
}