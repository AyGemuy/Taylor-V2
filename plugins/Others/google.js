import axios from "axios";
import fetch from "node-fetch";
import * as cheerio from "cheerio";
import GoogleIt from "google-it";
const handler = async (m, { command, usedPrefix, conn, args }) => {
  let text;
  if (args.length >= 1) {
    text = args.slice(0).join(" ");
  } else {
    if (!m.quoted || !m.quoted?.text)
      throw "Input teks atau reply teks yang ingin di cari!";
    text = m.quoted?.text;
  }
  let google_img = "https://telegra.ph/file/cf62f2b8648a352548978.jpg";
  m.react(wait);
  try {
    let results = await GoogleIt({
      query: text,
    });
    let caption = results
      .map(
        (v, index) =>
          `*\`Hasil ${index + 1}\`*\n\n- *Judul:* ${v.title || "Tidak terdeteksi"}\n- *Link:* ${v.link || "Tidak terdeteksi"}\n- *Cuplikan:* ${v.snippet || "Tidak terdeteksi"}`,
      )
      .join("\n________________________\n");
    await conn.sendFile(
      m.chat,
      google_img,
      "",
      `*\`🔎 Hasil Pencarian\`*\n\n${caption}`,
      m,
    );
  } catch (e) {
    try {
      let results = await googleit(text);
      let caption = results.articles
        .map(
          (v, index) =>
            `*\`Hasil ${index + 1}\`*\n\n- *Judul:* ${v.title || "Tidak terdeteksi"}\n- *Link:* ${v.url || "Tidak terdeteksi"}\n- *Deskripsi:* ${v.description || "Tidak terdeteksi"}`,
        )
        .join("\n________________________\n");
      if (!caption.length) throw `Query "${text}" Not Found`;
      await conn.sendFile(
        m.chat,
        google_img,
        "",
        `*\`🔎 Hasil Pencarian\`*\n\n${caption}`,
        m,
      );
    } catch (e) {
      try {
        let API_KEY = "7d3eb92cb730ed676d5afbd6c902ac1f";
        let response = await fetch(
          "http://api.serpstack.com/search?access_key=" +
            API_KEY +
            "&type=web&query=" +
            text,
        );
        let data = await response.json();
        let caption = data.organic_results
          .map(
            (v, index) =>
              `*\`Hasil ${index + 1}\`*\n\n- *Judul:* ${v.title || "Tidak terdeteksi"}\n- *Link:* ${v.url || "Tidak terdeteksi"}\n- *Cuplikan:* ${v.snippet || "Tidak terdeteksi"}`,
          )
          .join("\n________________________\n");
        await conn.sendFile(
          m.chat,
          google_img,
          "",
          `*\`🔎 Hasil Pencarian\`*\n\n${caption}`,
          m,
        );
      } catch (e) {
        m.react(eror);
      }
    }
  }
};
handler.help = ["google", "googlef"].map((v) => v + " <pencarian>");
handler.tags = ["internet"];
handler.command = /^googlef?$/i;
export default handler;
async function googleit(query, page = 0) {
  const response = await fetch(
    "https://www.google.com/search?" +
      new URLSearchParams({
        q: query,
        start: page * 10,
      }),
    {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
        Accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8",
      },
    },
  );
  if (!response.ok) {
    throw new Error("Network response was not ok " + response.statusText);
  }
  const body = await response.text();
  const $ = cheerio.load(body);
  const title = $('div[data-attrid="title"][role="heading"]').text().trim();
  const type = $('div[data-attrid="subtitle"][role="heading"]').text().trim();
  const description = $("div.wDYxhc:not(.NFQFxe), div.wDYxhc.NFQFxe .V8fWH")
    .map((_, el) => {
      const $el = $(el);
      $el.find(".SW5pqf").remove();
      $el.find("h3").remove();
      const text = $el.text().trim();
      return text || null;
    })
    .get()
    .filter(Boolean)
    .join("\n");
  const related = $(".related-question-pair span.CSkcDe")
    .map((_, el) => $(el).text().trim())
    .get()
    .filter(Boolean);
  const articles = $("#kp-wp-tab-overview div.TzHB6b")
    .map((_, el) => {
      const $el = $(el);
      const $header = $el.find("div.q0vns");
      const header = $header.find("span.VuuXrf").first().text();
      const iconBase64 = $el.find("img.XNo5Ab").attr("src");
      const thumbnail = $el.find(".uhHOwf > img").attr("src");
      const url = $header.find("cite.qLRx3b").first().text().trim();
      const title = $el.find("h3").first().text().trim();
      const gif = $el.find("div.VYkpsb video").attr("src");
      const description =
        $el.find("div.VwiC3b").text().trim() ||
        $el.find("div.fzUZNc").text().trim();
      const footer = $el.find(".ChPIuf").text().trim();
      if (!url) return null;
      return {
        url: url,
        header: header,
        thumbnail: thumbnail,
        iconBase64: iconBase64,
        title: title,
        gif: gif,
        description: description,
        footer: footer,
      };
    })
    .get()
    .filter(Boolean);
  const result = {
    title: title,
    type: type,
    description: description,
    related: related,
    articles: articles,
  };
  return result;
}
