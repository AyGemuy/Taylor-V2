import axios from "axios";
import cheerio from "cheerio";
class InDown {
  async downloadMedia(instagramLink) {
    try {
      const {
        data: html,
        headers
      } = await axios.get("https://indown.io/id", {
        withCredentials: !0
      }), cookies = headers["set-cookie"].join("; "), $ = cheerio.load(html), formAction = $("form#downloadForm").attr("action"), inputValues = Object.fromEntries($("form#downloadForm input[name]").get().map(element => [$(element).attr("name"), $(element).val() || ""]));
      inputValues.link = instagramLink;
      const {
        data: responseData
      } = await axios.post(formAction, new URLSearchParams(inputValues), {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Cookie: cookies
        },
        withCredentials: !0
      }), $$ = cheerio.load(responseData), mediaSet = new Set();
      return $$("div.container.mt-4#result div.row.justify-content-center div.col-md-4").map((_, el) => {
        const mediaLink = $$(el),
          type = mediaLink.find("a.image-link").length > 0 ? "image" : "video",
          href = decodeURIComponent(mediaLink.find("image" === type ? "div.mt-2.mb-2.text-center a" : "div video source").attr("href")) ?? "",
          alternative = mediaLink.find("image" === type ? "a.image-link" : "div.mt-3.text-center div.btn-group-vertical a").attr("href") ?? "";
        mediaSet.add({
          type: type,
          href: href,
          alternative: alternative
        });
      }), [...mediaSet];
    } catch (error) {
      throw console.error("Error:", error), error;
    }
  }
}
export {
  InDown
};