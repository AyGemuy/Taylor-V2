import cheerio from "cheerio";
import fetch from "node-fetch";
import axios from "axios";
const handler = async (m, {
  conn,
  args,
  usedPrefix,
  text,
  command
}) => {
  let lister = ["search", "ori", "mod"],
    [feature, inputs, inputs_, inputs__, inputs___] = text.split("|");
  if (!lister.includes(feature)) return m.reply("*Example:*\n.modcombo search|vpn\n\n*Pilih type yg ada*\n" + lister.map((v, index) => "  ○ " + v).join("\n"));
  if (lister.includes(feature)) {
    if ("search" === feature) {
      if (!inputs) return m.reply("Input query link\nExample: .modcombo search|vpn");
      m.react(wait);
      try {
        let teks = (await Search(inputs)).map((item, index) => `🔍 *[ RESULT ${index + 1} ]*\n\n📝 *Title:* ${item.title} ( ${item.alt} )\n🔗 *Url:* ${item.href}\n🖼️ *Thumb:* ${item.image}\n⌚ *Time:* ${item.datetime}\n`).filter(v => v).join("\n\n________________________\n\n");
        m.reply(teks);
      } catch (e) {
        m.react(eror);
      }
    }
    if ("ori" === feature) {
      if (!inputs) return m.reply("Input query link\nExample: .modcombo ori|link");
      try {
        let data = await getInformation(inputs);
        const infoData = data.info,
          formattedInfo = `\nℹ️ *Game Info:*\n📖 *Name:* ${infoData.Name}\n🔄 *Updated:* ${infoData.Updated}\n📱 *Compatible with:* ${infoData["Compatible with"]}\n🔍 *Last version:* ${infoData["Last version"]}\n📏 *Size:* ${infoData.Size}\n🎮 *Category:* ${infoData.Category}\n👨‍💻 *Developer:* ${infoData.Developer}\n💰 *Price:* ${infoData.Price}\n🔗 *Google Play Link:* ${infoData["Google Play Link"]}\n🛡️ *MOD:* ${infoData.MOD}\n`;
        await conn.sendFile(m.chat, data.ogImageUrl, "", formattedInfo, m), await conn.sendFile(m.chat, data.downloadInfo.data.link, data.title, null, m, !0, {
          quoted: m,
          mimetype: "application/vnd.android.package-archive"
        });
      } catch (e) {
        m.react(eror);
      }
    }
    if ("mod" === feature) {
      if (!inputs) return m.reply("Input query link\nExample: .modcombo mod|link");
      try {
        let resl = await getLinks(inputs),
          res = await getResult(resl.downloadLink),
          urls = "https://dlnew.gamestoremobi.com/" + (res.endsWith("APK") ? res.slice(0, -4) : res) + "-ModCombo.Com.apk",
          cap = "*Name:* " + resl.downloadText + "\n*Link:* " + resl.downloadLink + "\n\n" + wait;
        await conn.sendFile(m.chat, resl.ogImageUrl, "", cap, m), await conn.sendFile(m.chat, urls, resl.downloadText, null, m, !0, {
          quoted: m,
          mimetype: "application/vnd.android.package-archive"
        });
      } catch (e) {
        m.react(eror);
      }
    }
  }
};
handler.help = ["modcombo"], handler.tags = ["internet"], handler.command = /^(modcombo)$/i;
export default handler;
async function Search(input) {
  const url = "https://modcombo.com/?s=" + input,
    response = await fetch(url),
    html = await response.text(),
    $ = cheerio.load(html);
  return $(".blogs.w3 li").map((index, element) => ({
    title: $(element).find("a .title").text(),
    href: $(element).find("a").attr("href"),
    image: $(element).find("img").attr("data-src"),
    alt: $(element).find("img").attr("alt"),
    datetime: $(element).find("time").attr("datetime")
  })).get();
}
async function getInformation(url) {
  try {
    const {
      data
    } = await axios.get(url), $ = cheerio.load(data), ogImageUrl = $('meta[property="og:image"]').attr("content"), [pid, appid] = [$("#ApkOriginal").attr("data-id"), $("#ApkOriginal").attr("data-name")], googlePlayLink = `https://play.google.com/store/apps/details?id=${appid}`, downloadLink = $(".entry-download a.btn-download").attr("href"), downloadInfo = await getAPK(pid, appid), info = {};
    $(".apk-info-table tbody tr").each((index, element) => {
      const key = $(element).find("th").text().trim(),
        value = $(element).find("td").text().trim();
      info[key] = value;
    });
    const title = $(".page-title").text().trim(),
      rating = $(".box-stars span.score").text().trim(),
      ratingPercentage = $(".box-stars span.over").attr("style"),
      additionalInfo = `${$(".sbhTitle h2 span").text().trim()}\n${$("#content-desc").text().trim()}`;
    return {
      pid: pid,
      appid: appid,
      title: title,
      rating: rating,
      ratingPercentage: ratingPercentage,
      googlePlayLink: googlePlayLink,
      originalUrl: url,
      downloadLink: downloadLink,
      info: info,
      additionalInfo: additionalInfo,
      downloadInfo: downloadInfo,
      ogImageUrl: ogImageUrl
    };
  } catch (error) {
    throw new Error(`Terjadi kesalahan: ${error}`);
  }
}
async function getAPK(pid, appid) {
  try {
    const response = await axios.post("https://modcombo.com/getapk", JSON.stringify({
      pid: pid,
      appid: appid
    }), {
      headers: {
        "Content-Type": "application/json"
      }
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
}
const fetchHTML = async url => {
  const response = await fetch(url);
  return await response.text();
}, getLinks = async url => {
  const html = await fetchHTML(url),
    $ = cheerio.load(html),
    ogImageUrl = $('meta[property="og:image"]').attr("content"),
    contentDownload = $("#content-download");
  return {
    downloadLink: contentDownload.find("a").attr("href"),
    downloadText: contentDownload.find("span").text(),
    ogImageUrl: ogImageUrl
  };
}, getResult = async input => {
  const html = await fetchHTML(input),
    $ = cheerio.load(html);
  return $(".bc-title").map((index, element) => {
    const words = $(element).text().trim().split(" "),
      version = words[words.length - 2];
    return `${words.slice(0, words.length - 2).join("-")}-${version}`;
  }).get()[0];
};