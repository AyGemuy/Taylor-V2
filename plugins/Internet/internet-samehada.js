import * as cheerio from "cheerio";
import fetch from "node-fetch";
import { FormData } from "formdata-node";
const handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) return m.reply("Masukkan query");
  m.react(wait);
  const samehadaku = new Samehadaku();
  try {
    switch (command) {
      case "samehada":
        try {
          const results = await samehadaku.search(text);
          if (!results.length)
            return m.reply(`Query "${text}" tidak ditemukan :/`);
          const buttons = conn.ctaButton
            .setBody("Pilih hasil pencarian di bawah ini.")
            .setFooter("Detail lebih lanjut dapat ditemukan di Samehadaku.")
            .addSelection("Klik di sini")
            .makeSections("Samehadaku", "Pilih hasil");
          results.forEach((item, index) => {
            buttons.makeRow(
              `🔍 *[ RESULT ${index + 1} ]*`,
              `📰 *Title:* ${item.title}`,
              `📜 *Description:* ${item.description}`,
              `${usedPrefix}samehadaeps ${item.link}`,
            );
          });
          buttons.run(m.chat, conn, m);
        } catch (searchError) {
          console.error("Error in searchSamehada:", searchError);
          m.react(eror);
        }
        break;
      case "samehadaeps":
        try {
          const detail = await samehadaku.detail(text);
          if (!detail) return m.reply("Anime tidak ditemukan.");
          const message = `
            *Title:* ${detail.title}
            *Rating:* ${detail.rating}
            *Genres:* ${detail.genre.join(", ")}
            *Published:* ${detail.published.toDateString()}
            *Description:* ${detail.description}
          `;
          const buttons = conn.ctaButton
            .setBody("Daftar episode tersedia di bawah ini.")
            .setFooter("Pilih episode untuk melihat detail atau mengunduh.")
            .addSelection("Klik di sini")
            .makeSections("Samehadaku", "Pilih episode");
          detail.episode.forEach((episode, index) => {
            buttons.makeRow(
              `🎥 *[ EPISODE ${index + 1} ]*`,
              `📅 *Title:* ${episode.title}`,
              `🗓 *Released:* ${episode.date}`,
              `${usedPrefix}samehadadl ${episode.link}`,
            );
          });
          buttons.run(m.chat, conn, m);
        } catch (detailError) {
          console.error("Error in fetchSamehadaDetail:", detailError);
          m.react(eror);
        }
        break;
      case "samehadadl":
        try {
          const episodeLink = text;
          if (!episodeLink)
            return m.reply("Masukkan link episode yang ingin diunduh.");
          const downloadData = await samehadaku.download(episodeLink);
          if (!downloadData || !downloadData.downloads.length)
            return m.reply("Gagal mendapatkan link unduhan.");
          m.reply(
            `Unduhan episode dapat diakses di: ${downloadData.downloads.map((d) => d.link).join(", ")}`,
          );
          m.react(sukses);
        } catch (detailError) {
          console.error("Error in fetchSamehadaDetail:", detailError);
          m.react(eror);
        }
        break;
      default:
        m.reply("Perintah tidak dikenali.");
        break;
    }
  } catch (e) {
    console.error("General Error:", e);
    m.react(eror);
  }
};
handler.help = ["samehada"];
handler.tags = ["anime"];
handler.command = /^(samehada|samehadaeps|samehadadl)$/i;
export default handler;
class Samehadaku {
  constructor() {
    this.BASE_URL = "https://samehadaku.email";
  }
  async search(query) {
    try {
      const res = await fetch(
        `${this.BASE_URL}/?${new URLSearchParams({
          s: query,
        })}`,
      );
      if (!res.ok) throw new Error("Fail Fetching");
      const html = await res.text();
      const $ = cheerio.load(html);
      if ($("main#main").find(".notfound").length)
        throw new Error("Query Not Found");
      const data = [];
      $("main#main")
        .find("article.animpost")
        .each((i, el) => {
          data.push({
            title: $(el).find("img").attr("title")?.trim(),
            id: $(el).attr("id")?.split("-")[1] || "",
            thumbnail: $(el).find("img").attr("src") || "",
            description: $(el).find("div.ttls").text().trim(),
            genre: $(el)
              .find("div.genres > .mta > a")
              .map((i, el) => $(el).text().trim())
              .get(),
            type: $(el)
              .find("div.type")
              .map((i, el) => $(el).text().trim())
              .get(),
            star: $(el).find("div.score").text().trim(),
            views: $(el).find("div.metadata > span").eq(2).text().trim(),
            link: $(el).find("a").attr("href") || "",
          });
        });
      return data;
    } catch (e) {
      throw e;
    }
  }
  async latest() {
    try {
      const url = `${this.BASE_URL}/anime-terbaru/`;
      const res = await fetch(url, {
        headers: {
          "user-agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36",
        },
      });
      if (!res.ok) throw new Error("Website Down");
      const html = await res.text();
      const $ = cheerio.load(html);
      const ul = $("div.post-show > ul").children("li");
      const data = {
        total: 0,
        anime: [],
      };
      ul.each((i, el) => {
        data.anime.push({
          title: $(el)
            .find("h2.entry-title")
            .text()
            .trim()
            .split(" Episode")[0],
          thumbnail: $(el).find("div.thumb > a > img").attr("src") || "",
          postedBy: $(el)
            .find('span[itemprop="author"] > author')
            .text()
            .trim(),
          episode: $(el).find("span").eq(0).find("author").text().trim(),
          release: $(el)
            .find('span[itemprop="author"]')
            .next()
            .contents()
            .eq(3)
            .text()
            .split(": ")[1]
            .trim(),
          link: $(el).find("a").attr("href") || "",
        });
      });
      data.total = data.anime.length;
      return data;
    } catch (e) {
      throw e;
    }
  }
  async release() {
    try {
      const data = {
        sunday: [],
        monday: [],
        tuesday: [],
        wednesday: [],
        thursday: [],
        friday: [],
        saturday: [],
      };
      for (let day of Object.keys(data)) {
        const res = await fetch(
          `${this.BASE_URL}/wp-json/custom/v1/all-schedule?${new URLSearchParams(
            {
              perpage: "20",
              day: day,
              type: "schtml",
            },
          )}`,
        );
        data[day] = await res.json();
      }
      return data;
    } catch (e) {
      throw e;
    }
  }
  async detail(url) {
    try {
      if (!url.match(/samehadaku\.\w+\/anime/gi))
        throw new Error("Invalid URL");
      const res = await fetch(url);
      if (!res.ok) throw new Error("Fail Fetching");
      const html = await res.text();
      const $ = cheerio.load(html);
      const data = {
        title: $('.infoanime > h1[itemprop="name"]')
          .text()
          .trim()
          .replace("Nonton Anime ", ""),
        thumbnail: $(".infoanime > .thumb > img").attr("src") || "",
        published: new Date(
          $(".anim-senct").find("time").attr("datetime") || "",
        ),
        trailer: $(".trailer-anime").find("iframe").attr("src") || "",
        rating:
          $(".infoanime").find('span[itemprop="ratingValue"]').text().trim() +
          "/" +
          $(".infoanime")
            .find('i.hidden[itemprop="ratingCount"]')
            .attr("content"),
        description: $(".infox > .desc").text().trim(),
        genre: $(".infox > .genre-info > a")
          .map((i, e) => $(e).text().trim())
          .get(),
        detail: $("h3.anim-detail")
          .next()
          .find("span")
          .map((i, el) => ({
            name: $(el).find("b").text().trim(),
            data: `${$(el).text().trim()}`
              .replace($(el).find("b").text().trim() + " ", "")
              .trim(),
          }))
          .get(),
        batch: $(".listbatch").find("a").attr("href") || null,
        episode: $(".lstepsiode > ul > li")
          .map((i, el) => ({
            title: $(el).find(".lchx > a").text().trim(),
            date: $(el).find(".date").text().trim(),
            link: $(el).find(".eps > a").attr("href") || "",
          }))
          .get(),
      };
      return data;
    } catch (e) {
      throw e;
    }
  }
  async download(url) {
    try {
      if (!/samehadaku\.\w+\/[\w-]+episode/gi.test(url))
        throw new Error("Invalid URL!");
      const res = await fetch(url, {
        headers: {
          "user-agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36",
        },
      });
      if (!res.ok) throw new Error("Error Fetching");
      const html = await res.text();
      const $ = cheerio.load(html);
      const data = {
        title: $('h1[itemprop="name"]').text().trim(),
        link: url,
        downloads: [],
      };
      data.downloads = await Promise.all(
        $("div#server > ul > li")
          .map(async (i, el) => {
            const downloadData = {
              name: $(el).find("span").text().trim(),
              post: $(el).find("div").attr("data-post") || "",
              nume: $(el).find("div").attr("data-nume") || "",
              type: $(el).find("div").attr("data-type") || "",
              link: "",
            };
            const formData = new FormData();
            formData.append("action", "player_ajax");
            formData.append("post", downloadData.post);
            formData.append("nume", downloadData.nume);
            formData.append("type", downloadData.type);
            const iframeHtml = await fetch(
              "https://samehadaku.email/wp-admin/admin-ajax.php",
              {
                method: "POST",
                headers: {
                  "user-agent":
                    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36",
                  origin: "https://samehadaku.email",
                },
                body: formData,
              },
            ).then((res) => res.text());
            downloadData.link =
              cheerio.load(iframeHtml)("iframe").attr("src") || "";
            return downloadData;
          })
          .get(),
      );
      return data;
    } catch (e) {
      throw e;
    }
  }
}
