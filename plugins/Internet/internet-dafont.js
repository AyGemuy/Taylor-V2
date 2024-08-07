import cheerio from "cheerio";
import fetch from "node-fetch";
import mime from "mime-types";
const handler = async (m, {
  conn,
  args,
  usedPrefix,
  text,
  command
}) => {
  let lister = ["search", "down"],
    [feature, inputs, inputs_, inputs__, inputs___] = text.split("|");
  if (!lister.includes(feature)) return m.reply("*Example:*\n.dafonts search|vpn\n\n*Pilih type yg ada*\n" + lister.map((v, index) => "  ○ " + v).join("\n"));
  if (lister.includes(feature)) {
    if ("search" === feature) {
      if (!inputs) return m.reply("Input query link\nExample: .dafonts search|vpn");
      m.react(wait);
      try {
        let teks = (await searchDafont(inputs)).map((item, index) => `🔍 *[ RESULT ${index + 1} ]*\n\n📰 *Title:* ${item.title}\n🔗 *Link:* ${item.link}\n📌 *Theme:* ${item.theme}\n🏷️ *Theme link:* ${item.themeLink}\n👤 *Author Name:* ${item.author}\n🔗 *Author Link:* ${item.authorLink}\n🔢 *Total Downloads:* ${formatNumber(item.totalDownloads)}\n🖼️ *Preview Image:* ${item.previewImage}`).filter(v => v).join("\n\n________________________\n\n");
        m.reply(teks);
      } catch (e) {
        m.react(eror);
      }
    }
    if ("down" === feature) {
      if (!inputs) return m.reply("Input query link\nExample: .dafonts app|link");
      try {
        let item = await downloadDafont(inputs),
          cap = "🔍 *[ RESULT ]*\n\n📰 *Title:* " + item.title + "\n👤 *Author:* " + item.author + "\n📌 *Theme:* " + item.theme + "\n🔢 *Total Downloads:* " + formatNumber(item.totalDownloads) + "\n📁 *Filenames:*\n" + item.filename.map((e, i) => "   " + (i + 1) + ". '" + e + "'").join("\n") + "\n🖼️ *Image:* " + item.image + "\n📝 *Note:* " + item.note.replace(/(Note of the author)(.*)/, "$1\n$2") + "\n⬇️ *Download:* " + item.download,
          details = await getFileDetails(item.download);
        await conn.sendFile(m.chat, item.image, "", cap, m), await conn.sendFile(m.chat, item.download, item.title + details.fileFormat, null, m, !0, {
          quoted: m,
          mimetype: details.mimeType
        });
      } catch (e) {
        m.react(eror);
      }
    }
  }
};
handler.help = ["dafonts"], handler.tags = ["internet"], handler.command = /^(dafonts)$/i;
export default handler;
async function searchDafont(q) {
  const response = await fetch(`https://www.dafont.com/search.php?q=${q}`),
    html = await response.text(),
    results = (cheerio.load(html),
      []),
    regex = /<div class="lv1left dfbg">.*?<span class="highlight">(.*?)<\/span>.*?by <a href="(.*?)">(.*?)<\/a>.*?<\/div>.*?<div class="lv1right dfbg">.*?<a href="(.*?)">(.*?)<\/a>.*?>(.*?)<\/a>.*?<\/div>.*?<div class="lv2right">.*?<span class="light">(.*?)<\/span>.*?<\/div>.*?<div style="background-image:url\((.*?)\)" class="preview">.*?<a href="(.*?)">/g;
  let match;
  for (; null !== (match = regex.exec(html));) {
    const [, title, authorLink, author, themeLink, theme, , totalDownloads, previewImage, link] = match, result = {
      title: title.trim() || "Tidak diketahui",
      authorLink: `https://www.dafont.com/${authorLink.trim()}` || "Tidak diketahui",
      author: author.trim() || "Tidak diketahui",
      themeLink: `https://www.dafont.com/${themeLink.trim()}` || "Tidak diketahui",
      theme: theme.trim() || "Tidak diketahui",
      totalDownloads: totalDownloads.trim().replace(/[^0-9]/g, "") || "Tidak diketahui",
      previewImage: `https://www.dafont.com${previewImage.trim()}` || "Tidak diketahui",
      link: `https://www.dafont.com/${link.trim()}` || "Tidak diketahui"
    };
    results.push(result);
  }
  return results;
}
async function downloadDafont(link) {
  const response = await fetch(link),
    html = await response.text(),
    $ = cheerio.load(html),
    getValue = selector => $(selector).text().trim();
  return {
    title: getValue(".lv1left.dfbg strong"),
    author: getValue(".lv1left.dfbg a"),
    theme: getValue(".lv1right.dfbg a:last-child"),
    totalDownloads: getValue(".lv2right .light").replace(/\D/g, ""),
    filename: $(".filename").toArray().map(element => $(element).text().trim()),
    image: "https://www.dafont.com" + $(".preview").css("background-image").replace(/^url\(["']?|['"]?\)$/g, ""),
    note: $('[style^="border-left"]').text().trim(),
    download: $("a.dl").attr("href") ? "http:" + $("a.dl").attr("href") : ""
  };
}
async function getFileDetails(url) {
  const contentType = (await fetch(url)).headers.get("content-type"),
    mimeType = mime.contentType(contentType),
    extension = mime.extension(contentType);
  return {
    url: url,
    mimeType: await mimeType,
    fileFormat: "." + await extension
  };
}

function formatNumber(num) {
  const numString = Math.abs(num).toString(),
    numDigits = numString.length;
  if (numDigits <= 3) return numString;
  const suffixIndex = Math.floor((numDigits - 1) / 3);
  let formattedNum = (num / Math.pow(1e3, suffixIndex)).toFixed(1);
  return formattedNum.endsWith(".0") && (formattedNum = formattedNum.slice(0, -2)),
    formattedNum + ["", "k", "M", "B", "T"][suffixIndex];
}