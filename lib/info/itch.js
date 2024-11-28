import fetch from "node-fetch";
import * as cheerio from "cheerio";
class Itch {
  async search(query) {
    try {
      const searchQuery = encodeURI(query);
      const response = await fetch(`https://itch.io/search?q=${searchQuery}`);
      const html = await response.text();
      const $ = cheerio.load(html);
      return $(".game_cell")
        .map((index, el) => ({
          title: $(el).find(".game_title a").text().trim() || "No title",
          link: $(el).find(".game_title a").attr("href") || "No link",
          author: $(el).find(".game_author a").text().trim() || "No author",
          genre: $(el).find(".game_genre").text().trim() || "No genre",
          rating:
            +$(el)
              .find(".game_rating .star_fill")
              .attr("style")
              ?.match(/width: (\d+(?:\.\d+)?)%/)[1] / 20 || 0,
          platform:
            $(el)
              .find(".game_platform .icon")
              .map((i, el) => $(el).attr("title").replace("Download for ", ""))
              .get()
              .join(", ") || "No platform",
          description:
            $(el).find(".game_text").text().trim() || "No description",
          image:
            $(el).find(".game_thumb img").attr("data-lazy_src") ||
            $(el).find(".game_thumb img").attr("src") ||
            "No image",
        }))
        .get();
    } catch (error) {
      return {
        error: "Error fetching data",
      };
    }
  }
  async detail(link) {
    try {
      const response = await fetch(link);
      const html = await response.text();
      const $ = cheerio.load(html);
      const csrfToken =
        $('meta[name="csrf_token"]').attr("value") || "No csrf token";
      const downloads = $(".upload_list_widget .upload")
        .map((i, el) => ({
          id: $(el).find(".download_btn").attr("data-upload_id") || "No id",
          title: $(el).find(".upload_name strong").text().trim() || "No title",
          link: $(el).find(".download_btn").attr("href") || "No link",
          size: $(el).find(".file_size span").text().trim() || "No size",
          platform:
            $(el)
              .find(".download_platforms .icon")
              .map((i, el) => $(el).attr("title").replace("Download for ", ""))
              .get()
              .join(", ") || "No platform",
        }))
        .get();
      const downloadResults = [];
      for (const download of downloads) {
        try {
          const response = await fetch(
            `${link}/file/${download.id}?source=view_game&as_props=1&after_download_lightbox=true`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/x-www-form-urlencoded",
              },
              body: `csrf_token=${csrfToken}`,
            },
          );
          const jsonResponse = await response.json();
          downloadResults.push({
            ...download,
            data: jsonResponse,
          });
        } catch (error) {
          console.error(
            `Error downloading file with ID ${download.id}:`,
            error,
          );
          continue;
        }
      }
      return {
        csrfToken: csrfToken,
        title: $(".game_title").text().trim() || "No title",
        author:
          $(".game_info_panel_widget .upload_name a").text().trim() ||
          "No author",
        platforms:
          $(".game_info_panel_widget .download_platforms .icon")
            .map((i, el) => $(el).attr("title").replace("Download for ", ""))
            .get()
            .join(", ") || "No platform",
        rating:
          +$(".game_info_panel_widget .aggregate_rating .star_fill")
            .attr("style")
            ?.match(/width: (\d+(?:\.\d+)?)%/)[1] / 20 || 0,
        tags:
          $(".game_info_panel_widget .tag")
            .map((i, el) => $(el).text().trim())
            .get()
            .join(", ") || "No tags",
        description:
          $(".formatted_description").text().trim() || "No description",
        downloads: downloadResults,
      };
    } catch (error) {
      return {
        error: "Error fetching data",
      };
    }
  }
}
export const itch = new Itch();
