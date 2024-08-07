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
  if (!lister.includes(feature)) return m.reply("*Example:*\n.apkpures search|vpn\n\n*Pilih type yg ada*\n" + lister.map((v, index) => "  ○ " + v).join("\n"));
  if (lister.includes(feature)) {
    if ("search" === feature) {
      if (!inputs) return m.reply("Input query link\nExample: .apkpures search|vpn");
      m.react(wait);
      try {
        let teks = (await searchapkpures(inputs)).map((item, index) => `🔍 *[ RESULT ${index + 1} ]*\n\n🔗 *link:* ${item.link}\n🔗 *linkdl:* https://d.apkpure.com/b/APK/${item.link.split("/")[5]}?version=latest\n🖼️ *image:* ${item.image}\n📰 *name:* ${item.name}\n👩‍💻 *developer:* ${item.developer}\n🏷️ *tags:* ${item.tags}\n⬇️ *downloadLink:* ${item.downloadLink}\n📦 *fileSize:* ${item.fileSize}\n🔢 *version:* ${item.version}\n🔢 *versionCode:* ${item.versionCode}`).filter(v => v).join("\n\n________________________\n\n");
        m.reply(teks);
      } catch (e) {
        m.react(eror);
      }
    }
    if ("app" === feature) {
      if (!inputs.startsWith("https://m.apkpure.com")) return m.reply("Input query link\nExample: .apkpures app|link");
      try {
        let resl = await getApkpure(inputs),
          cap = "*Name:* " + resl.title + "\n*Link:* " + resl.link + "\n\n" + wait;
        await conn.sendFile(m.chat, logo, "", cap, m), await conn.sendFile(m.chat, resl.link, resl.title, null, m, !0, {
          quoted: m,
          mimetype: "application/vnd.android.package-archive"
        });
      } catch (e) {
        m.react(eror);
      }
    }
  }
};
handler.help = ["apkpures"], handler.tags = ["internet"], handler.command = /^(apkpures)$/i;
export default handler;
async function searchapkpures(q) {
  const end = "https://m.apkpure.com",
    url = end + "/cn/search?q=" + q + "&t=app",
    response = await fetch(url),
    html = await response.text(),
    $ = cheerio.load(html),
    searchData = [];
  return $("ul.search-res li").each((index, element) => {
    const $element = $(element),
      obj = {
        link: end + $element.find("a.dd").attr("href"),
        image: $element.find("img").attr("src"),
        name: $element.find(".p1").text().trim(),
        developer: $element.find(".p2").text().trim(),
        tags: $element.find(".tags .tag").map((i, el) => $(el).text().trim()).get(),
        downloadLink: end + $element.find(".right_button a.is-download").attr("href"),
        fileSize: $element.find(".right_button a.is-download").data("dt-filesize"),
        version: $element.find(".right_button a.is-download").data("dt-version"),
        versionCode: $element.find(".right_button a.is-download").data("dt-versioncode")
      };
    searchData.push(obj);
  }), searchData;
}
async function getApkpure(url) {
  try {
    const response = await fetch(url),
      html = await response.text(),
      $ = cheerio.load(html),
      linkTag = $('link[rel="canonical"]').attr("href"),
      titleTag = $('meta[property="og:title"]').attr("content"),
      downloadURL = `https://d.apkpure.com/b/APK/${linkTag.split("/")[5]}?version=latest`;
    return {
      link: downloadURL,
      title: titleTag
    };
  } catch (error) {
    console.log("Error:", error);
  }
}