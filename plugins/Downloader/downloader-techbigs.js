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
  if (!lister.includes(feature)) return m.reply("*Example:*\n.techbigs search|vpn\n\n*Pilih type yg ada*\n" + lister.map((v, index) => "  ○ " + v).join("\n"));
  if (lister.includes(feature)) {
    if ("search" === feature) {
      if (!inputs) return m.reply("Input query link\nExample: .techbigs search|vpn");
      m.react(wait);
      try {
        let teks = (await searchApp(inputs)).map((item, index) => `🔍 *[ RESULT ${index + 1} ]*\n\n📢 *title:* ${item.title}\n🌐 *url:* ${item.link}\n🖼️ *image:* ${item.image}\n🔖 *date:* ${item.date}\n`).filter(v => v).join("\n\n________________________\n\n");
        m.reply(teks);
      } catch (e) {
        m.react(eror);
      }
    }
    if ("app" === feature) {
      if (!inputs) return m.reply("Input query link\nExample: .techbigs app|link");
      m.react(wait);
      try {
        let item = await getApp(inputs),
          cap = `🔍 *[ RESULT ]*\n\n📌 *title:* ${item.info.title}\n⬇️ *downloadLink:* ${item.link.data.link}\n📦 *fileSize:* ${item.link.data.size}\n📱 *info:* ${item.info.content}\n🤖 *author:* ${item.info.author}\n🔖 *date:* ${item.info.date}\n`;
        await conn.sendFile(m.chat, logo, "", cap, m), await conn.sendFile(m.chat, item.link.data.link, item.info.title || "Tidak diketahui", null, m, !0, {
          quoted: m,
          mimetype: "application/vnd.android.package-archive"
        });
      } catch (e) {
        m.react(eror);
      }
    }
  }
};
handler.help = ["techbigs"], handler.tags = ["internet"], handler.command = /^(techbigs)$/i;
export default handler;
async function searchApp(query) {
  const url = `https://techbigs.com/?s=${query}`;
  try {
    const response = await fetch(url),
      html = await response.text(),
      $ = cheerio.load(html),
      items = [];
    return $("ul.blogs.w3 > li").each((index, element) => {
      const item = {};
      item.title = $(element).find(".title").text().trim(), item.image = "https://techbigs.com" + $(element).find(".thumb").attr("data-src"),
        item.link = $(element).find(".blog").attr("href"), item.date = $(element).find("time").attr("datetime"),
        items.push(item);
    }), items;
  } catch (error) {
    return console.log(error), [];
  }
}
async function getApp(url) {
  try {
    const response = await fetch(url),
      html = await response.text(),
      $ = cheerio.load(html),
      container = $("#ApkOriginal"),
      pageDescription = $(".page-description"),
      pageAuthor = pageDescription.find(".page-author").text().trim(),
      pageTitle = pageDescription.find(".page-title").text().trim(),
      pageContent = pageDescription.find(".wrapcontent p").text().trim(),
      pageDate = pageDescription.find(".page-author time").attr("datetime"),
      obj = {
        id: container.attr("data-id"),
        name: container.attr("data-name"),
        author: pageAuthor,
        title: pageTitle,
        content: pageContent,
        date: pageDate,
        ogImage: $('meta[property="og:image"]').attr("content")
      };
    return {
      info: obj,
      link: await getApk(obj.id, obj.name)
    };
  } catch (error) {
    console.log(error);
  }
}
async function getApk(id, name) {
  const domain = "https://techbigs.com";
  if (id && name) try {
    const response = await fetch(`${domain}/getapk`, {
      method: "POST",
      body: JSON.stringify({
        pid: id,
        appid: name
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer m135ur7kdfyn4cwlasvoh6q0be92zip8tgxj"
      }
    });
    if (response.ok) return await response.json();
    console.log("Error:", response.status);
  } catch (error) {
    console.log(error);
  }
}