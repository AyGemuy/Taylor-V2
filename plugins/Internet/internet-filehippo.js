import * as cheerio from "cheerio";
import fetch from "node-fetch";
const handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) return m.reply("Masukkan query");
  m.react(wait);
  try {
    switch (command) {
      case "filehippo":
        const results = await searchHippo(text);
        if (!results.length)
          return m.reply(`Query "${text}" tidak ditemukan :/`);
        const buttons = conn.ctaButton
          .setBody("Pilih aplikasi di bawah ini.")
          .setFooter("Detail lebih lanjut dapat ditemukan di FileHippo.")
          .addSelection("Klik di sini")
          .makeSections("FileHippo", "Pilih aplikasi");
        results.forEach((item, index) => {
          buttons.makeRow(
            `🔍 *[ RESULT ${index + 1} ]*`,
            `📰 *Title:* ${item.title}`,
            `🛠️ *Developer:* ${item.developer}`,
            `${usedPrefix}filehippoapp ${item.link}`,
          );
        });
        buttons.run(m.chat, conn, m);
        break;
      case "filehippoapp":
        const appInfo = await getHippo(text);
        if (!appInfo.length)
          return m.reply(`Link "${text}" tidak ditemukan :/`);
        const info = appInfo[0];
        const caption =
          `📦 *Detail Aplikasi* 📦\n\n` +
          `🖼️ *Icon:* ${info.icon_url}\n` +
          `📜 *Name:* ${info.name}\n` +
          `✒️ *Information:* ${info.information}\n` +
          `🔗 *Download Link:* ${info.download_url}\n\n` +
          `🗂️ *Information:*\n` +
          `📝 *Version:* ${info.version}\n` +
          `📂 *Page URL:* ${info.html_url}\n` +
          `🛠️ *Mimetype:* ${info.mimetype}`;
        await conn.sendFile(m.chat, info.icon_url || "", "", caption, m);
        await conn.sendFile(
          m.chat,
          info.download_url || "",
          info.name || "Aplikasi",
          null,
          m,
          false,
          {
            quoted: m,
            mimetype:
              info.mimetype || "application/vnd.android.package-archive",
          },
        );
        m.react(sukses);
        break;
      default:
        m.reply("Perintah tidak dikenali.");
        break;
    }
  } catch (e) {
    console.error("Error:", e);
    m.react(eror);
  }
};
handler.help = ["filehippo"];
handler.tags = ["internet"];
handler.command = /^(filehippo|filehippoapp)$/i;
export default handler;
async function searchHippo(app_name) {
  const url = "https://filehippo.com/search/?q=" + app_name;
  try {
    const response = await fetch(url);
    const html = await response.text();
    const $ = cheerio.load(html);
    return (
      await Promise.all(
        $(".list-programs__item")
          .map(async (index, element) => {
            const title = $(".card-program__title", element).text().trim(),
              link = $(".card-program", element).attr("href"),
              image = $(".media__image img", element).attr("src"),
              developer = $(".card-program__developer", element).text().trim(),
              license = $(".card-program__license", element).text().trim(),
              summary = $(".card-program__summary", element).text().trim();
            if (title && link && image && developer && license && summary)
              return {
                title: title,
                link: link,
                image: image,
                developer: developer,
                license: license,
                summary: summary,
              };
          })
          .get(),
      )
    ).filter(Boolean);
  } catch (error) {
    console.error("Error in searchHippo:", error);
    throw new Error("Gagal mencari aplikasi");
  }
}
async function getHippo(app_name) {
  const headers = {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.140 Safari/537.36 Edge/18.17763",
    },
    urls = {
      information: app_name.endsWith("/") ? app_name : app_name + "/",
      download:
        (app_name.endsWith("/") ? app_name : app_name + "/") + "post_download/",
    };
  try {
    const [html, downloadHtml] = await Promise.all(
      Object.values(urls).map((url) =>
        fetch(url, {
          headers: headers,
        }).then((response) => response.text()),
      ),
    );
    const $ = cheerio.load(html);
    const name = $(
        "body > div.page > div:nth-child(2) > div > div > div > section.program-header-content > div.program-header-content__main > div > div.media__body > h1",
      ).text(),
      information = $(
        "body > div.page > div:nth-child(2) > div > div > div > section.mb-l > article > p:nth-child(3)",
      ).text(),
      version = $(
        "body > div.page > div:nth-child(2) > div > div > div > section.program-header-content > div.program-header-content__main > div > div.media__body > p.program-header__version",
      ).text(),
      icon_url = $(
        "body > div.page > div:nth-child(2) > div > div > div > section.program-header-content > div.program-header-content__main > div > div.media__image > img",
      ).attr("src"),
      download_url = cheerio
        .load(downloadHtml)("script[data-qa-download-url]")
        .attr("data-qa-download-url"),
      mimetype = await getMimeTypeFromUrl(download_url);
    return [
      {
        name: name,
        version: version,
        information: information,
        html_url: urls.information,
        download_url: download_url,
        icon_url: icon_url,
        app_name: app_name,
        mimetype: mimetype,
      },
    ];
  } catch (error) {
    console.error("Error in getHippo:", error);
    throw new Error("Gagal mendapatkan informasi aplikasi");
  }
}
async function getMimeTypeFromUrl(url) {
  try {
    const response = await fetch(url);
    if (response.ok) {
      return response.headers.get("content-type");
    }
    throw new Error("Failed to fetch URL");
  } catch (error) {
    console.error("Error in getMimeTypeFromUrl:", error);
    return "unknown";
  }
}
