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
  if (!lister.includes(feature)) return m.reply("*Example:*\n.a2zapk search|vpn\n\n*Pilih type yg ada*\n" + lister.map((v, index) => "  ○ " + v).join("\n"));
  if (lister.includes(feature)) {
    if ("search" === feature) {
      if (!inputs) return m.reply("Input query link\nExample: .a2zapk search|vpn");
      m.react(wait);
      try {
        let teks = (await searchModded(inputs)).map((item, index) => `🔍 *[ RESULT ${index + 1} ]*\n\n📰 *Title:* ${item.title}\n🔗 *Url:* ${item.url}\n🖼️ *Thumb:* ${item.iconUrl}\n📋 *Meta:* ${item.meta}\n📚 *Categories:* ${item.categories}`).filter(v => v).join("\n\n________________________\n\n");
        m.reply(teks);
      } catch (e) {
        m.react(eror);
      }
    }
    if ("app" === feature) {
      if (!inputs) return m.reply("Input query link\nExample: .a2zapk app|link");
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
handler.help = ["a2zapk"], handler.tags = ["internet"], handler.command = /^(a2zapk)$/i;
export default handler;
async function searchA2zapk(query) {
  const url = "https://a2zapk.io/Search/" + query + "/user=SmpLdVh6bGk2M3hVaFQ2TCsyYUE1dkExTU9kRDVWQTg5ZGZ2Wmp2NnZNN2xuazFJMzI0OTFnOVg0NVhRRGFveg==/";
  try {
    const response = await fetch(url),
      html = await response.text(),
      $ = cheerio.load(html),
      result = [];
    return $(".AppCont").each((index, element) => {
      const item = {
        title: $(element).find("a").attr("title"),
        url: $(element).find("a").attr("href"),
        imageSrc: $(element).find("img").attr("data-original"),
        heading2: $(element).find("h2").text(),
        heading3: $(element).find("h3").text(),
        starWidth: $(element).find(".stars span").attr("style"),
        date: $(element).find(".dateyear_utc").text()
      };
      result.push(item);
    }), result;
  } catch (error) {
    return console.log("Error:", error), [];
  }
}