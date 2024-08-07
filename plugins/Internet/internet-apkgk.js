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
  if (!lister.includes(feature)) return m.reply("*Example:*\n.apkgk search|vpn\n\n*Pilih type yg ada*\n" + lister.map((v, index) => "  ○ " + v).join("\n"));
  if (lister.includes(feature)) {
    if ("search" === feature) {
      if (!inputs) return m.reply("Input query link\nExample: .apkgk search|vpn");
      m.react(wait);
      try {
        let teks = (await searchApp(inputs)).map((item, index) => `🔍 *[ RESULT ${index + 1} ]*\n\n📚 *Title:* ${item.title || "Tidak diketahui"}\n🌐 *Url:* ${item.href || "Tidak diketahui"}\n🖼️ *Image:* ${item.imageSrc || "Tidak diketahui"}\n📅 *Date:* ${item.date || "Tidak diketahui"}\n`).filter(v => v).join("\n\n________________________\n\n");
        m.reply(teks);
      } catch (e) {
        m.react(eror);
      }
    }
    if ("app" === feature) {
      if (!inputs) return m.reply("Input query link\nExample: .apkgk app|link");
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
handler.help = ["apkgk"], handler.tags = ["internet"], handler.command = /^(apkgk)$/i;
export default handler;
async function searchApp(query) {
  const response = await fetch(`${Object.entries(APIs).find(([ key ]) => key.includes("proxy"))?.[1]}https://apkgk.com/search/?keyword=${query}`),
    html = await response.text(),
    $ = cheerio.load(html),
    items = [];
  return $("li").each((index, element) => {
    const item = {
      href: "https://apkgk.com" + $("a", element).attr("href"),
      title: $("a", element).attr("title"),
      imageSrc: "https:" + $("img", element).attr("data-src"),
      date: $(".info-img-dt", element).text().trim()
    };
    Object.values(item).every(value => void 0 !== value) && items.push(item);
  }), items;
}
async function infoApp(url) {
  try {
    const response = await fetch(Object.entries(APIs).find(([key]) => key.includes("proxy"))?.[1] + url),
      html = await response.text(),
      $ = cheerio.load(html);
    return {
      version: $("div.version span").text().trim(),
      category: $("div.Category span").text().trim(),
      lastUpdated: $("div.last-updated time").text().trim(),
      installs: $("div.Installs a").text().trim(),
      developer: $("div.developer span").text().trim(),
      requires: $("div.Requirements div.item").text().trim(),
      rating: $("div.Content-Rating div.item").text().trim(),
      googlePlay: $("div.Get-it-on a").attr("href"),
      apkLink: "https://apkgk.com" + $("div.detail-box-download a").attr("href"),
      ogImageUrl: $('meta[property="og:image"]').attr("content")
    };
  } catch (error) {
    console.log("Error:", error);
  }
}
async function getApp(url) {
  const proxyurl = Object.entries(APIs).find(([key]) => key.includes("proxy"))?.[1];
  try {
    const response = await fetch(proxyurl + (url.endsWith("/download") ? url : url + "/download")),
      html = await response.text(),
      $ = cheerio.load(html),
      info = await infoApp(proxyurl + url.replace(/\/download$/, ""));
    return {
      title: $("div.program-title h1").text().trim(),
      info: info,
      link: proxyurl + "https:" + $("div.c-download a").attr("href")
    };
  } catch (error) {
    console.log("Error:", error);
  }
}