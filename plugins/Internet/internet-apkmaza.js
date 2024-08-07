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
  if (!lister.includes(feature)) return m.reply("*Example:*\n.apkmaza search|vpn\n\n*Pilih type yg ada*\n" + lister.map((v, index) => "  ○ " + v).join("\n"));
  if (lister.includes(feature)) {
    if ("search" === feature) {
      if (!inputs) return m.reply("Input query link\nExample: .apkmaza search|vpn");
      m.react(wait);
      try {
        let teks = (await searchApkmaza(inputs)).map((item, index) => `🔍 *[ RESULT ${index + 1} ]*\n📰 *Title:* ${item.title}\n🔗 *Link:* ${item.link}\n🖼️ *Image:* ${item.imageSrc}\n🔢 *Version:* ${item.version}\n🗂️ *Category:* ${item.category}\n📝 *Description:* ${item.description}`).filter(v => v).join("\n\n________________________\n\n");
        m.reply(teks);
      } catch (e) {
        m.react(eror);
      }
    }
    if ("app" === feature) {
      if (!inputs) return m.reply("Input query link\nExample: .apkmaza app|link");
      try {
        let resl = (await getApkmaza(inputs))[0],
          cap = `*Title:* ${resl.title}\n*Size:* ${resl.fileSize}\n\n${wait}`;
        await conn.sendFile(m.chat, logo, "", cap, m), await conn.sendFile(m.chat, resl.downloadLink, resl.title, null, m, !0, {
          quoted: m,
          mimetype: "application/vnd.android.package-archive"
        });
      } catch (e) {
        m.react(eror);
      }
    }
  }
};
handler.help = ["apkmaza"], handler.tags = ["internet"], handler.command = /^(apkmaza)$/i;
export default handler;
async function searchApkmaza(query) {
  const response = await fetch(`https://apkmaza.co/?s=${query}`),
    html = await response.text(),
    $ = cheerio.load(html),
    objArray = [];
  return $(".hentry").each((index, element) => {
    const entry = $(element),
      link = entry.find("a"),
      image = entry.find("img"),
      title = entry.find("h3"),
      version = entry.find(".small.text-truncate.text-muted.d-flex.align-items-center svg + span"),
      category = entry.find(".small.text-truncate.text-muted.d-flex.align-items-center .text-truncate"),
      description = entry.find(".small.text-muted.d-flex.align-items-center + .small.text-muted.d-flex.align-items-center span"),
      obj = {
        link: link.attr("href"),
        imageSrc: image.attr("src"),
        title: title.text(),
        version: version.text(),
        category: category.text(),
        description: description.text().trim()
      };
    objArray.push(obj);
  }), objArray;
}
async function getApkmaza(url) {
  try {
    const response = await fetch(url.endsWith("/download") ? url : url + "/download"),
      html = await response.text(),
      $ = cheerio.load(html),
      sections = [];
    return $(".accordion-downloads .toggle").each((index, element) => {
      const section = {
        title: $(element).text().trim(),
        link: $(element).attr("href"),
        downloadLink: $(element).next(".collapse").find("a").attr("href"),
        fileSize: $(element).next(".collapse").find("a .whites").text().trim()
      };
      sections.push(section);
    }), sections;
  } catch (error) {
    console.log("Terjadi kesalahan:", error);
  }
}