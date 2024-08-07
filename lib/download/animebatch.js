import axios from "axios";
import cheerio from "cheerio";
class AnimeBatch {
  baseUrl = "https://www.animebatch.id";
  header = {
    headers: {
      "User-Agent": "Mozilla/5.0 (Linux; Android 6.0.1; SM-J500G) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.131 Mobile Safari/537.36"
    }
  };
  async search(q) {
    try {
      const html = await axios.get(`${this.baseUrl}/?s=${q}`, this.header),
        $ = cheerio.load(html.data),
        data = $("div.animepost").map((i, e) => ({
          title: $(e).find("div.title").text().trim(),
          score: $(e).find("div.score").text().trim(),
          type: $(e).find("div.type").text().trim() || "–",
          url: $(e).find("a").attr("href")
        })).get();
      return 0 === data.length ? {
        creator: "Wudysoft",
        status: !1
      } : {
        creator: "Wudysoft",
        status: !0,
        data: data
      };
    } catch (e) {
      return {
        creator: "Wudysoft",
        status: !1,
        msg: e.message
      };
    }
  }
  async detail(url) {
    try {
      const html = await axios.get(url, this.header),
        $ = cheerio.load(html.data),
        genre = $($("div.spe").find("span")[9]).find("a").map((i, e) => $(e).text().trim()).get(),
        h1 = $("div.download-content").find("h1").map((i, e) => $(e).text()).get(),
        h4 = $("div.download-content").find("h4").map((i, e) => $(e).text()).get(),
        link = $("div.download-content ul").map((i, e) => {
          const url = $(e).find("li a").map((b, c) => ({
            server: $(c).text().trim(),
            url: $(c).attr("href")
          })).get();
          return {
            index: i,
            quality: $(e).text().split(" ")[0]?.trim(),
            url: url
          };
        }).get(),
        epsTitle = h1.concat(h4).filter(v => "Episode" !== v && "MP4" !== v),
        episode = episode.map((e, i) => ({
          episode: epsTitle[i],
          link: link.filter(v => v.index === i).filter(v => 0 !== v.url.length)
        }));
      if (0 === episode.length) {
        $("div.dlx").find("h4").each((i, e) => h4.push($(e).text())), $("div.dlx").find("ul").each((i, e) => {
          const url = $(e).find("li a").map((b, c) => ({
            server: $(c).text().trim(),
            url: $(c).attr("href")
          })).get();
          link.push({
            index: i,
            quality: $(e).text().split(" ")[0]?.trim(),
            url: url
          });
        });
        const epsTitle = h4;
        episode.push({
          episode: epsTitle[i],
          link: link.filter(v => v.index === i).filter(v => 0 !== v.url.length)
        });
      }
      return {
        creator: "Wudysoft",
        status: !0,
        data: {
          thumbnail: $("img.attachment-post-thumbnail").attr("src"),
          title: $("h1.entry-title").text().trim(),
          status: $($("div.spe").find("span")[3]).text().replace("Status Anime", "").trim(),
          type: $($("div.spe").find("span")[2]).text().replace("Tipe Anime", "").trim(),
          release: $($("div.spe").find("span")[6]).text().replace("Tanggal Rilis", "").trim(),
          studio: $($("div.spe").find("span")[7]).text().replace("Studio", "").trim(),
          duration: $($("div.spe").find("span")[8]).text().replace("Durasi per Episode", "").trim(),
          genre: genre.join(", ").trim(),
          score: $($("div.spe").find("span")[10]).text().replace("Skor", "").trim(),
          views: $($("div.spe").find("span")[11]).text().replace(new RegExp("Dilihat", "g"), "").trim(),
          description: $("div.downman").text().trim(),
          episode: episode
        }
      };
    } catch (e) {
      return {
        creator: "Wudysoft",
        status: !1,
        msg: e.message
      };
    }
  }
}
export default AnimeBatch;