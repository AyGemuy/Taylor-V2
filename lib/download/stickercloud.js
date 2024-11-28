import fetch from "node-fetch";
class StickerCloud {
  constructor() {
    this.api = "https://api.stickers.cloud/v1/packs";
    this.headers = {
      Authority: "api.stickers.cloud",
      Accept: "application/json, text/plain, */*",
      Origin: "https://stickers.cloud",
      "User-Agent": "Postify/1.0.0",
    };
  }
  async fetchData(endpoint, params = {}) {
    const url = new URL(`${this.api}${endpoint}`);
    url.search = new URLSearchParams(params).toString();
    try {
      const response = await fetch(url, {
        headers: this.headers,
      });
      const data = await response.json();
      if (
        !data.success ||
        (Array.isArray(data.result) && data.result.length === 0)
      ) {
        return {
          success: false,
          result: {
            message: "Sticker nya gak ada. Coba pake keyword lain dahh.",
          },
        };
      }
      return data;
    } catch (error) {
      const message =
        error instanceof TypeError
          ? "Page nya gak ada woy, coba kurangi lagi input nya."
          : "Error euy.";
      return {
        success: false,
        result: {
          message: message,
        },
      };
    }
  }
  async search(query, page = 1) {
    return await this.fetchData("/search", {
      query: query,
      page: page,
    });
  }
  async pack(slug) {
    return await this.fetchData(`/slug/${slug}`);
  }
}
export { StickerCloud };
