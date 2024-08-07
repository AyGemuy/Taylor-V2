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
  if (!lister.includes(feature)) return m.reply("*Example:*\n.apkdone search|vpn\n\n*Pilih type yg ada*\n" + lister.map((v, index) => "  ○ " + v).join("\n"));
  if (lister.includes(feature)) {
    if ("search" === feature) {
      if (!inputs) return m.reply("Input query link\nExample: .apkdone search|vpn");
      m.react(wait);
      try {
        let teks = (await searchApkdone(inputs)).map((item, index) => `🔍 *[ RESULT ${index + 1} ]*\n\n🔗 *Url:* ${item.href}\n📰 *Title:* ${item.title}\n🖼️ *Image:* ${item.imageSrc}\n📱 *App:* ${item.appName}\n🔢 *Version:* ${item.version}\n⬇️ *Downloads:* ${item.downloads}\n🗂️ *Category:* ${item.category}`).filter(v => v).join("\n\n________________________\n\n");
        m.reply(teks);
      } catch (e) {
        m.react(eror);
      }
    }
    if ("app" === feature) {
      if (!inputs) return m.reply("Input query link\nExample: .apkdone app|link");
      try {
        let resl = await getApkdone(inputs),
          cap = "*Name:* " + inputs.split("/")[3] + "\n*Link:* " + resl.links[0] + "\n\n" + wait;
        await conn.sendFile(m.chat, resl.ogImageUrl, "", cap, m), await conn.sendFile(m.chat, resl.links[0], inputs.split("/")[3], null, m, !0, {
          quoted: m,
          mimetype: "application/vnd.android.package-archive"
        });
      } catch (e) {
        m.react(eror);
      }
    }
  }
};
handler.help = ["apkdone"], handler.tags = ["internet"], handler.command = /^(apkdone)$/i;
export default handler;
async function searchApkdone(q) {
  const url = "https://apkdone.com/?s=" + q + "&post_type=post";
  try {
    const response = await fetch(url),
      html = await response.text(),
      $ = cheerio.load(html),
      result = [];
    return $("a.column.app").each((index, element) => {
      const item = {
        href: $(element).attr("href"),
        title: $(element).attr("title"),
        imageSrc: $(element).find("img").attr("src"),
        appName: $(element).find("b").text(),
        version: $(element).find(".tag.vs").text(),
        downloads: $(element).find(".tag").eq(1).text().trim(),
        category: $(element).find("span").last().text()
      };
      result.push(item);
    }), result;
  } catch (error) {
    return console.log("Error:", error), [];
  }
}
async function getApkdone(url) {
  const response = await fetch(url.endsWith("/download") ? url : url + "/download"),
    html = await response.text(),
    $ = cheerio.load(html),
    imageLink = $("article.column.app.is-large img").attr("src");
  return {
    links: $('script[type="text/javascript"]').map((index, element) => $(element).html()).get().filter(scriptText => scriptText.includes("hole.apkdone.download")).map(scriptText => scriptText.match(/https?:\/\/hole\.apkdone\.download\/[^\s]+/g)).filter(matches => null !== matches).flat().map(link => link.replace(/"$/, "")),
    ogImageUrl: imageLink
  };
}