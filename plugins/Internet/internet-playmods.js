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
  if (!lister.includes(feature)) return m.reply("*Example:*\n.playmods search|vpn\n\n*Pilih type yg ada*\n" + lister.map((v, index) => "  ○ " + v).join("\n"));
  if (lister.includes(feature)) {
    if ("search" === feature) {
      if (!inputs) return m.reply("Input query link\nExample: .playmods search|vpn");
      m.react(wait);
      try {
        let teks = (await searchApp(inputs)).map((item, index) => `🔍 [ RESULT ${index + 1} ]\n\n🔗 *link:* ${item.link}\n📌 *title:* ${item.title}\n📋 *menu:* ${item.menu}\n📝 *detail:* ${item.detail.replace(/\n/g, " ")}\n🖼️ *image:* ${item.image}\n⬇️ *downloadText:* ${item.downloadText}\n`).filter(v => v).join("\n\n________________________\n\n");
        m.reply(teks);
      } catch (e) {
        m.react(eror);
      }
    }
    if ("app" === feature) {
      if (!inputs) return m.reply("Input query link\nExample: .playmods app|link");
      try {
        let item = await getApp(inputs),
          cap = `🔍 [ RESULT ]\n\n📌 *Title:* ${item.title}\n🖼️ *Image:* ${item.image}\n👤 *Name:* ${item.name}\n⭐ *Score:* ${item.score}\n📅 *Edisi:* ${item.edisi}\n📏 *Size:* ${item.size}\n🎨 *Create:* ${item.create}\n🔗 *Link:* ${item.link}\n📝 *Detail:* ${item.detail}\n📷 *Screenshots:* \n${generateList(item.screenshots)}\n🔍 *Describe:* \n${addNewline(item.describe)}\n`;
        await conn.sendFile(m.chat, item.screenshots[0], "", cap, m), await conn.sendFile(m.chat, item.link, item.title, null, m, !0, {
          quoted: m,
          mimetype: "application/vnd.android.package-archive"
        });
      } catch (e) {
        m.react(eror);
      }
    }
  }
};
handler.help = ["playmods"], handler.tags = ["internet"], handler.command = /^(playmods)$/i;
export default handler;
async function searchApp(q) {
  try {
    const url = "https://m.playmods.net/id/search/" + q,
      response = await fetch(url),
      html = await response.text(),
      $ = cheerio.load(html),
      dataArray = [];
    return $("a.beautify.ajax-a-1").each((index, element) => {
      const $element = $(element),
        data = {
          link: "https://m.playmods.net" + $element.attr("href"),
          title: $element.find(".common-exhibition-list-detail-name").text().trim(),
          menu: $element.find(".common-exhibition-list-detail-menu").text().trim(),
          detail: $element.find(".common-exhibition-list-detail-txt").text().trim(),
          image: $element.find(".common-exhibition-list-icon img").attr("data-src"),
          downloadText: $element.find(".common-exhibition-line-download").text().trim()
        };
      dataArray.push(data);
    }), dataArray;
  } catch (error) {
    console.log(error);
  }
}
async function getApp(url) {
  try {
    const response = await fetch(url),
      html = await response.text(),
      $ = cheerio.load(html);
    return {
      title: $("h1.name").text().trim(),
      image: $(".icon").attr("src"),
      name: $(".app-name span").text().trim(),
      score: $(".score").text().trim(),
      edisi: $(".edition").text().trim(),
      size: $(".size .operate-cstTime").text().trim(),
      create: $(".size span").text().trim(),
      link: $("a.a_download").attr("href"),
      detail: $(".game-describe-gs").text().trim(),
      screenshots: $(".swiper-slide img").map((index, element) => $(element).attr("data-src")).get(),
      describe: $(".datail-describe-pre div").text().trim()
    };
  } catch (error) {
    console.log(error);
  }
}

function generateList(array) {
  return array.map((item, index) => `${index + 1}. ${item}`).join("\n");
}

function addNewline(text) {
  return text.replace(/•/g, "\n•");
}