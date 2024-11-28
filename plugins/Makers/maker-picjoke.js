import * as cheerio from "cheerio";
import fetch from "node-fetch";
import { FormData, Blob } from "formdata-node";
import { fileTypeFromBuffer } from "file-type";
class PicJoke {
  constructor(url, fileContent) {
    this.url = url;
    this.fileContent = fileContent;
  }
  async fetchHtml(url) {
    try {
      const response = await fetch(url);
      if (!response.ok)
        throw new Error(`Failed to fetch ${url}: ${response.statusText}`);
      return response.text();
    } catch (error) {
      console.error(`Error fetching HTML from ${url}:`, error.message);
      return null;
    }
  }
  filterUrl(url) {
    const regex = /^https:\/\/picjoke\.org\/id\/effect\//;
    return regex.test(url) ? true : false;
  }
  getTitle(title) {
    return title.split("/").pop();
  }
  clnTitle(title) {
    return title.replace(/^\d+\s+/, "").replace(/\+/g, " ");
  }
  async init() {
    try {
      const html = await this.fetchHtml(this.url);
      const $ = cheerio.load(html);
      const formData = new FormData();
      ["anonuserId", "piclang", "clipart_id"].forEach((name) =>
        formData.append(name, $(`input[name="${name}"]`).val()),
      );
      formData.append("MAX_FILE_SIZE", "52428000");
      const { ext = "jpg", mime = "image/jpg" } =
        (await fileTypeFromBuffer(this.fileContent || Buffer.from([]))) || {};
      formData.append(
        "userfoto[]",
        new Blob([this.fileContent], {
          type: mime,
        }),
        `image.${ext}`,
      );
      const uploadHtml = await this.fetchHtml(
        "https://n12.picjoke.org/generatepic.php",
      );
      const $$ = cheerio.load(uploadHtml);
      const section = $$(".w3-center.w3-container");
      if (section.length) {
        const imgSrc = decodeURIComponent(
          section.find("img#resultpic").attr("src") || "",
        ).trim();
        const links = section
          .find("a")
          .map((_, el) => decodeURIComponent($$(el).attr("href") || "").trim())
          .get()
          .filter(
            (href) =>
              ![
                "https://picjoke.org/en/effect/",
                "//twitter.com/share",
              ].includes(href),
          );
        return {
          imgSrc: imgSrc,
          links: links,
        };
      }
      return null;
    } catch (error) {
      console.error("Error initializing PicJoke:", error.message);
      return null;
    }
  }
  async search(query, page = 1) {
    try {
      const baseUrl = `https://picjoke.org/id/search/${query}`;
      const url = page > 1 ? `${baseUrl}/page/${page}` : baseUrl;
      const html = await this.fetchHtml(url);
      const $ = cheerio.load(html);
      return $(".w3-rest.w3-center.w3-padding a")
        .map((_, el) => {
          const $el = $(el);
          const img = $el.find(".w3-card-8.w3-margin").first();
          const link = decodeURIComponent($el.attr("href") || "").trim();
          return {
            link: link ? new URL(link, baseUrl).href : null,
            imgSrc: img.attr("src")
              ? new URL(img.attr("src"), baseUrl).href
              : null,
          };
        })
        .get()
        .filter(({ link }) => link && this.filterUrl(link));
    } catch (error) {
      console.error("Error searching:", error.message);
      return [];
    }
  }
}
const handler = async (m, { conn, args }) => {
  try {
    m.react(wait);
    const [input, index, page = 1] = args.join(" ").split("|");
    if (!input) {
      await conn.reply(
        m.chat,
        "❌ Please provide a search query.\n\nUsage: *picjoke <query> [|index|page]*",
        m,
      );
      return;
    }
    const searchResults = await new PicJoke().search(input, parseInt(page, 10));
    const effectIndex = parseInt(index?.trim(), 10);
    if (
      isNaN(effectIndex) ||
      effectIndex < 1 ||
      effectIndex > searchResults.length
    ) {
      const itemsList = searchResults
        .map(
          (result, i) =>
            `*${i + 1}.* ${new PicJoke().clnTitle(new PicJoke().getTitle(result.link))}`,
        )
        .join("\n");
      await conn.reply(
        m.chat,
        `❌ Invalid index. Choose a valid index.\n\nAvailable options:\n${itemsList}\n\nUsage: *picjoke <query> [|index|page]*`,
        m,
      );
      return;
    }
    const selectedResult = searchResults[effectIndex - 1];
    const buffer = (m.quoted || m)?.download
      ? await (m.quoted || m).download()
      : null;
    const tag = `@${m.sender.split("@")[0]}`;
    const photoResult = await new PicJoke(selectedResult.link, buffer).init();
    if (photoResult?.imgSrc) {
      await conn.sendMessage(
        m.chat,
        {
          image: {
            url: photoResult.imgSrc,
          },
          caption: `Result for *${new PicJoke().clnTitle(new PicJoke().getTitle(selectedResult.link))}*\nRequested by: ${tag}`,
          mentions: [m.sender],
        },
        {
          quoted: m,
        },
      );
      m.react(sukses);
    } else {
      m.react(eror);
    }
  } catch (error) {
    console.error("Handler error:", error.message);
    m.react(eror);
  }
};
handler.help = ["picjoke <query> [|index|page]"];
handler.tags = ["maker"];
handler.command = /^(picjoke)$/i;
export default handler;
