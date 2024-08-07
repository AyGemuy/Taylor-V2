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
  if (!lister.includes(feature)) return m.reply("*Example:*\n.4shared search|vpn\n\n*Pilih type yg ada*\n" + lister.map((v, index) => "  ○ " + v).join("\n"));
  if (lister.includes(feature)) {
    if ("search" === feature) {
      if (!inputs) return m.reply("Input query link\nExample: .4shared search|vpn");
      m.react(wait);
      try {
        let url = "https://www.4shared.com/web/q/?query=" + inputs,
          teks = (await scrapeWebsite(url)).map((item, index) => `🔍 *[ RESULT ${index + 1} ]*\n\n📚 *Title:* ${item.title || "Tidak diketahui"}\n🌐 *Link:* ${item.link || "Tidak diketahui"}\n`).filter(v => v).join("\n\n________________________\n\n");
        m.reply(teks);
      } catch (e) {
        m.react(eror);
      }
    }
    if ("app" === feature) {
      if (!inputs) return m.reply("Input query link\nExample: .4shared app|link");
      m.react(wait);
      try {
        let item = await getApp(inputs),
          cap = `🔍 *[ RESULT ]*\n\n📚 *title:* ${item.title || "Tidak diketahui"}\n🆕 *version:* ${item.info.version || "Tidak diketahui"}\n🗂️ *category:* ${item.info.category || "Tidak diketahui"}\n🔄 *lastUpdated:* ${item.info.lastUpdated || "Tidak diketahui"}\n💾 *installs:* ${item.info.installs || "Tidak diketahui"}\n👩‍💻 *developer:* ${item.info.developer || "Tidak diketahui"}\n📱 *requires:* ${item.info.requires || "Tidak diketahui"}\n⭐️ *rating:* ${item.info.rating || "Tidak diketahui"}\n🌐 *googlePlay:* ${item.info.googlePlay || "Tidak diketahui"}\n📥 *apkLink:* ${item.info.apkLink || "Tidak diketahui"}\n`;
        await conn.sendFile(m.chat, item.info.ogImageUrl || logo, "", cap, m), await conn.sendFile(m.chat, item.link || logo, item.title || "Tidak diketahui", null, m, !0, {
          quoted: m,
          mimetype: "application/vnd.android.package-archive"
        });
      } catch (e) {
        m.react(eror);
      }
    }
  }
};
handler.help = ["4shared"], handler.tags = ["internet"], handler.command = /^(4shared)$/i;
export default handler;
async function scrapeWebsite(url) {
  try {
    const response = await fetch(url),
      html = await response.text(),
      $ = cheerio.load(html);
    return $(".col-xs-12.jsSearchItemColumn.jsVisibleItemColumn").map((index, element) => {
      const $element = $(element);
      return {
        author: $element.find(".author a").text(),
        title: $element.find(".namePlus a").text(),
        link: $element.find(".namePlus a").attr("href"),
        date: $element.find(".date").text(),
        time: $element.find(".time").text(),
        size: $element.find('.meta-info span:contains("Size")').text().replace("Size", "").trim(),
        bitrate: $element.find('.meta-info span:contains("Bitrate")').text().replace("Bitrate", "").trim(),
        tags: $element.find(".meta-tags div").map((index, tagElement) => $(tagElement).text()).get()
      };
    }).get();
  } catch (error) {
    throw console.error("Error:", error), error;
  }
}