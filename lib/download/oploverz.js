import fetch from "node-fetch";
import * as cheerio from "cheerio";
import { mediafires } from "../scraper/scraped-downloader.js";
import { Download } from "./get-download.js";
class Oploverz {
  constructor(baseUrl = "https://oploverz.org") {
    this.baseUrl = baseUrl;
  }
  async search(query) {
    try {
      const url = `${this.baseUrl}/?q=${encodeURIComponent(query)}`;
      const response = await fetch(url);
      const $ = cheerio.load(await response.text());
      return $(".bg-white.shadow.xrelated.relative")
        .map((_, element) => ({
          title: $(element).find(".titlelist.tublok").text() || "",
          link: $(element).find("a").attr("href") || "",
          image: $(element).find("img").attr("src") || "",
          episodes: $(element).find(".eplist").text() || "",
          rating: $(element).find(".starlist").text().trim() || "N/A",
        }))
        .get();
    } catch (error) {
      console.error("Error:", error);
      return null;
    }
  }
  async ongoing() {
    try {
      const response = await fetch(`${this.baseUrl}/ongoing/`);
      if (!response.ok)
        throw new Error(`HTTP error! Status: ${response.status}`);
      const html = await response.text();
      const $ = cheerio.load(html);
      return $(".bg-white.shadow.xrelated.relative")
        .map((i, el) => ({
          title: $(el).find(".titlelist.tublok").text().trim() || "No Title",
          url: $(el).find("a").attr("href") || "No URL",
          imgSrc: $(el).find("img").attr("src") || "No Image",
          episodes: $(el).find(".eplist").text().trim() || "No Episodes",
          rating: $(el).find(".starlist").text().trim() || "N/A",
        }))
        .get();
    } catch (error) {
      console.error("Error fetching anime data:", error);
      return null;
    }
  }
  async complete() {
    try {
      const response = await fetch(`${this.baseUrl}/complete/`);
      if (!response.ok)
        throw new Error(`HTTP error! Status: ${response.status}`);
      const html = await response.text();
      const $ = cheerio.load(html);
      return $(".bg-white.shadow.xrelated.relative")
        .map((i, el) => ({
          title: $(el).find(".titlelist.tublok").text().trim() || "No Title",
          url: $(el).find("a").attr("href") || "No URL",
          imgSrc: $(el).find("img").attr("src") || "No Image",
          episodes: $(el).find(".eplist").text().trim() || "No Episodes",
          rating: $(el).find(".starlist").text().trim() || "N/A",
        }))
        .get();
    } catch (error) {
      console.error("Error fetching anime data:", error);
      return null;
    }
  }
  async episode(url) {
    try {
      const response = await fetch(url);
      if (!response.ok)
        throw new Error(`HTTP error! Status: ${response.status}`);
      const html = await response.text();
      const $ = cheerio.load(html);
      return {
        title: $(".sinops > b").text().replace("Sinopsis : ", "") || "",
        synopsis: $(".sinops").contents().not("b, hr").text().trim() || "",
        imageUrl: $(".cover").attr("src") || "",
        episodes: $(".othereps")
          .map((_, el) => `${this.baseUrl}${$(el).attr("href") || ""}`)
          .get(),
      };
    } catch (error) {
      console.error("Error fetching or parsing data:", error);
      return null;
    }
  }
  async random() {
    try {
      const response = await fetch(`${this.baseUrl}/random/`);
      if (!response.ok)
        throw new Error(`HTTP error! Status: ${response.status}`);
      const html = await response.text();
      const $ = cheerio.load(html);
      return {
        title: $(".sinops > b").text().replace("Sinopsis : ", "") || "",
        synopsis: $(".sinops").contents().not("b, hr").text().trim() || "",
        imageUrl: $(".cover").attr("src") || "",
        episodes: $(".othereps")
          .map((_, el) => `${this.baseUrl}${$(el).attr("href") || ""}`)
          .get(),
      };
    } catch (error) {
      console.error("Error fetching or parsing data:", error);
      return null;
    }
  }
  async download(url) {
    try {
      const html = await (await fetch(url)).text();
      const $ = cheerio.load(html);
      const title = $("h1.title-post").text().trim() || "No title";
      const date = $(".date").text().trim() || "No date";
      const iframeSrc = $("#istream").attr("src") || "No iframe";
      const downloadLinks = $("#contdl .links_table tbody tr")
        .map((_, row) => {
          const server =
            $(row)
              .find("td")
              .eq(0)
              .text()
              .replace(/<[^>]*>/g, "")
              .trim()
              .toLowerCase() || "no_server";
          const quality =
            $(row)
              .find("td")
              .eq(1)
              .text()
              .replace(/<[^>]*>/g, "")
              .trim()
              .toLowerCase()
              .split(" ")[0] || "no_quality";
          const link =
            this.baseUrl +
            ($(row).find("td").eq(2).find("a").attr("href") || "");
          return {
            server: server,
            quality: quality,
            link: link,
          };
        })
        .get();
      const formattedLinks = downloadLinks.reduce(
        (acc, { server, quality, link }) => {
          acc[server] = {
            ...acc[server],
            [quality]: link,
          };
          return acc;
        },
        {},
      );
      return {
        title: title,
        date: date,
        iframeSrc: iframeSrc,
        downloadLinks: formattedLinks,
      };
    } catch (error) {
      console.error("Error:", error);
      return null;
    }
  }
  async gen(url, option = null) {
    try {
      const regex = /var\s+gotoz\s*=\s*"([^"]*)"/;
      const response = await fetch(url);
      if (!response.ok)
        throw new Error(`HTTP error! Status: ${response.status}`);
      const html = await response.text();
      const match = html.match(regex);
      if (!match) throw new Error("Regex match failed");
      if (option === "mediafire") {
        return {
          url: (await mediafires(encodeURI(match[1])))?.link,
        };
      } else if (option === "gdrive") {
        const dlg = new Download();
        return {
          url: (await dlg.GDriveDl(encodeURI(match[1])))?.downloadUrl,
        };
      } else {
        return {
          url: encodeURI(match[1]),
        };
      }
    } catch (error) {
      console.error("Error fetching URL:", error);
      return null;
    }
  }
}
export const oploverz = new Oploverz();
