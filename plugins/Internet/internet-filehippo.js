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
  if (!lister.includes(feature)) return m.reply("*Example:*\n.filehippo search|vpn\n\n*Pilih type yg ada*\n" + lister.map((v, index) => "  ○ " + v).join("\n"));
  if (lister.includes(feature)) {
    if ("search" === feature) {
      if (!inputs) return m.reply("Input query link\nExample: .filehippo search|vpn");
      m.react(wait);
      try {
        let teks = (await searchHippo(inputs)).map((item, index) => `🔍 *[ RESULT ${index + 1} ]*\n\n📌 *title:* ${item.title}\n🔗 *link:* ${item.link}\n🖼️ *image:* ${item.image}\n🎯 *programTitle:* ${item.programTitle}\n🔗 *programLink:* ${item.programLink}\n👨‍💻 *developer:* ${item.developer}\n📄 *license:* ${item.license}\n📃 *summary:* ${item.summary}`).filter(v => v).join("\n\n________________________\n\n");
        m.reply(teks);
      } catch (e) {
        m.react(eror);
      }
    }
    if ("app" === feature) {
      if (!inputs) return m.reply("Input query link\nExample: .filehippo search|vpn");
      m.react(wait);
      try {
        let res = await getHippo(inputs),
          teks = res.map((item, index) => `🔍 *[ RESULT ${index + 1} ]*\n\n📌 *title:* ${item.name}\n🖼️ *image:* ${item.icon_url}\n🔗 *url:* ${item.html_url}\n⬇️ *downloadLink:* ${item.download_url}\n📦 *app:* ${item.app_name}\n📱 *deviceInfo:* ${item.information}\n🤖 *version:* ${item.version}\n📋 *mime:* ${item.mimetype}\n`).filter(v => v).join("\n\n________________________\n\n");
        await conn.sendFile(m.chat, res[0]?.icon_url || logo, "", teks, m), await conn.sendFile(m.chat, res[0]?.download_url || logo, res[0]?.name || "Tidak diketahui", null, m, !0, {
          quoted: m,
          mimetype: res[0]?.mimetype
        });
      } catch (e) {
        m.react(eror);
      }
    }
  }
};
handler.help = ["filehippo"], handler.tags = ["internet"], handler.command = /^(filehippo)$/i;
export default handler;
async function searchHippo(app_name) {
  const url = "https://filehippo.com/search/?q=" + app_name;
  try {
    const response = await fetch(url),
      html = await response.text(),
      $ = cheerio.load(html);
    return (await Promise.all($(".list-programs__item").map(async (index, element) => {
      const title = $(".card-program__title", element).text().trim(),
        link = $(".card-program", element).attr("href"),
        image = $(".media__image img", element).attr("src"),
        programTitle = $(".card-program__title", element).text().trim(),
        programLink = $(".card-program", element).attr("href"),
        developer = $(".card-program__developer", element).text().trim(),
        license = $(".card-program__license", element).text().trim(),
        summary = $(".card-program__summary", element).text().trim();
      if (title && link && image && programTitle && programLink && developer && license && summary) return {
        title: title,
        link: link,
        image: image,
        programTitle: programTitle,
        programLink: programLink,
        developer: developer,
        license: license,
        summary: summary
      };
    }).get())).filter(Boolean);
  } catch (error) {
    throw new Error(error);
  }
}
async function getHippo(app_name) {
  const headers = {
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.140 Safari/537.36 Edge/18.17763"
    },
    urls = {
      information: app_name.endsWith("/") ? app_name : app_name + "/",
      download: (app_name.endsWith("/") ? app_name : app_name + "/") + "post_download/"
    },
    [html, downloadHtml] = await Promise.all(Object.values(urls).map(url => fetch(url, {
      headers: headers
    }).then(response => response.text()))),
    $ = cheerio.load(html),
    hippo_information_name = $("body > div.page > div:nth-child(2) > div > div > div > section.program-header-content > div.program-header-content__main > div > div.media__body > h1").text(),
    hippo_information = $("body > div.page > div:nth-child(2) > div > div > div > section.mb-l > article > p:nth-child(3)").text(),
    hippo_version = $("body > div.page > div:nth-child(2) > div > div > div > section.program-header-content > div.program-header-content__main > div > div.media__body > p.program-header__version").text(),
    hippo_icon_url = $("body > div.page > div:nth-child(2) > div > div > div > section.program-header-content > div.program-header-content__main > div > div.media__image > img").attr("src"),
    hippo_download_url = cheerio.load(downloadHtml)("script[data-qa-download-url]").attr("data-qa-download-url"),
    mimetype = await getMimeTypeFromUrl(hippo_download_url);
  return [{
    name: hippo_information_name,
    version: hippo_version,
    information: hippo_information,
    html_url: urls.information,
    download_url: hippo_download_url,
    icon_url: hippo_icon_url,
    app_name: app_name,
    mimetype: mimetype
  }];
}
async function getMimeTypeFromUrl(url) {
  try {
    const response = await fetch(url);
    if (response.ok) {
      return response.headers.get("content-type");
    }
    throw new Error("Failed to fetch URL");
  } catch (error) {
    console.error(error);
  }
}