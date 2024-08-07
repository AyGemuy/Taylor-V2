import cheerio from "cheerio";
import fetch from "node-fetch";
import got from "got";
const handler = async (m, {
  conn,
  args,
  usedPrefix,
  text,
  command
}) => {
  let lister = ["search", "down"],
    [feature, inputs, inputs_, inputs__, inputs___] = text.split("|");
  if (!lister.includes(feature)) return m.reply("*Example:*\n.capcut search|vpn\n\n*Pilih type yg ada*\n" + lister.map((v, index) => "  ○ " + v).join("\n"));
  if (lister.includes(feature)) {
    if ("search" === feature) {
      if (!inputs) return m.reply("Input query link\nExample: .capcut search|vpn");
      m.react(wait);
      try {
        let teks = (await searchTemplates(inputs)).map((item, index) => `🔍 *[ RESULT ${index + 1} ]*\n\n📢 *title:* ${item.title}\n🌐 *url:* ${item.link}\n🖼️ *image:* ${item.detail[0]?.imageSrc}\n🔖 *name:* ${item.detail[0]?.link}\n📅 *time:* ${item.detail[0]?.time}\n📄 *template:* ${item.detail[0]?.template}\n🎥 *video:* ${item.detail[0]?.videoSrc}\n📝 *description:* ${item.detail[0]?.description}\n`).filter(v => v).join("\n\n________________________\n\n");
        m.reply(teks);
      } catch (e) {
        m.react(eror);
      }
    }
    if ("down" === feature) {
      if (!inputs) return m.reply("Input query link\nExample: .capcut app|link");
      m.react(wait);
      try {
        let item = await downloadCapcut(inputs),
          cap = `🔍 *[ RESULT ]*\n\n📢 *title:* ${item.title}\n📝 *description:* ${item.description}\n💡 *usage:* ${item.usage}\n🎥 *original video URL:* ${item.originalVideoUrl}\n`;
        await conn.sendFile(m.chat, item.originalVideoUrl || logo, "", cap || "Tidak diketahui", m);
      } catch (e) {
        m.react(eror);
      }
    }
  }
};
handler.help = ["capcut"], handler.tags = ["internet"], handler.command = /^(capcut)$/i;
export default handler;
async function downloadCapcut(Url) {
  try {
    const token = Url.match(/\d+/)[0],
      response = await fetch(`https://ssscapcut.com/api/download/${token}`, {
        method: "GET",
        headers: {
          Accept: "/",
          "User-Agent": "Mozilla/5.0 (Linux; Android 13; CPH2217 Build/TP1A.220905.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/110.0.5481.153 Mobile Safari/537.36",
          "X-Requested-With": "acr.browser.barebones",
          "Sec-Fetch-Site": "same-origin",
          "Sec-Fetch-Mode": "cors",
          "Sec-Fetch-Dest": "empty",
          Referer: "https://ssscapcut.com/",
          "Accept-Encoding": "gzip, deflate",
          "Accept-Language": "id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7",
          Cookie: "sign=2cbe441f7f5f4bdb8e99907172f65a42; device-time=1685437999515"
        }
      });
    return await response.json();
  } catch (error) {
    throw console.log(error), error;
  }
}
async function searchTemplates(s) {
  try {
    const html = (await got("https://capcut-templates.com/?s=" + s)).body,
      $ = cheerio.load(html),
      detailPromises = $("main#main div.ct-container section div.entries article").map(async (index, element) => {
        const link = $(element).find("a.ct-image-container").attr("href"),
          detail = await detailTemplates(link),
          imageSrc = $(element).find("img").attr("src"),
          title = $(element).find("h2.entry-title a").text().trim();
        return {
          id: $(element).attr("id"),
          link: link,
          detail: detail,
          imageSrc: imageSrc,
          title: title
        };
      }).get();
    return Promise.all(detailPromises);
  } catch (error) {
    throw console.log(error), error;
  }
}
async function detailTemplates(link) {
  try {
    const html = (await got(link)).body,
      $ = cheerio.load(html);
    return $("main#main div.ct-container-full article").map((index, element) => ({
      id: $(element).attr("id"),
      time: $("main#main").find("time.ct-meta-element-date").text().trim(),
      template: $(element).find(".wp-block-buttons .wp-block-button a").attr("data-template-id"),
      link: $(element).find("a.wp-block-button__link").attr("href"),
      imageSrc: $(element).find("video").attr("poster"),
      title: $(element).find("h2").text().trim(),
      videoSrc: $(element).find("video source").attr("src"),
      description: $(element).find(".entry-content p").text().trim()
    })).get();
  } catch (error) {
    throw console.log(error), error;
  }
}