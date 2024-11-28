import axios from "axios";
import * as cheerio from "cheerio";
class AioDown {
  constructor() {
    this.url = "https://aiodown.com/wp-json/aio-dl/video-data/";
    this.headers = {
      accept: "*/*",
      "content-type": "application/x-www-form-urlencoded",
      origin: "https://aiodown.com",
      referer: "https://aiodown.com/",
      "user-agent": "Postify/1.0.0",
      "X-Forwarded-For": new Array(4)
        .fill(0)
        .map(() => Math.floor(Math.random() * 256))
        .join("."),
    };
    this.cookies = "";
  }
  async getToken() {
    try {
      const response = await axios.get("https://aiodown.com");
      const $ = cheerio.load(response.data);
      const token = $("#token").val();
      if (token) {
        return token;
      } else {
        throw new Error("Token tidak ditemukan, coba lagi!");
      }
    } catch (error) {
      console.error("Gagal mengambil token:", error.message);
      throw error;
    }
  }
  generateHash(url, additional) {
    try {
      return (
        Buffer.from(url).toString("base64") +
        (url.length + 1e3) +
        Buffer.from(additional).toString("base64")
      );
    } catch (error) {
      console.error("Gagal membuat hash:", error.message);
      throw error;
    }
  }
  async requestMediaData(videoUrl) {
    const maxRetries = 5;
    let retryCount = 0;
    while (retryCount < maxRetries) {
      try {
        const token = await this.getToken();
        const hash = this.generateHash(videoUrl, "aio-dl");
        const response = await axios.post(
          this.url,
          new URLSearchParams({
            url: videoUrl,
            token: token,
            hash: hash,
          }),
          {
            headers: {
              ...this.headers,
              cookie: this.cookies,
            },
          },
        );
        const newCookies = response.headers["set-cookie"];
        if (newCookies) {
          this.cookies = newCookies.join("; ");
        }
        return response.data;
      } catch (error) {
        if (
          error.response &&
          error.response.data &&
          error.response.data.error &&
          error.response.data.error.includes("Rate limit exceeded")
        ) {
          console.log("Batas permintaan API terlampaui, mencoba ulang...");
          retryCount++;
        } else {
          console.error(
            "Gagal mengambil data media:",
            error.response ? error.response.data : error.message,
          );
          throw error;
        }
      }
    }
    throw new Error("Terlalu banyak permintaan, coba lagi nanti.");
  }
  filterQuality(medias, desiredQuality) {
    try {
      const media = medias.find((media) => media.quality === desiredQuality);
      return media ? media.url : null;
    } catch (error) {
      console.error("Gagal memfilter kualitas media:", error.message);
      throw error;
    }
  }
  async getDownloadLinks(videoUrl, desiredQuality) {
    try {
      const data = await this.requestMediaData(videoUrl);
      console.log(data);
      const mediaUrls = new Array(
        ...data.medias.map((media) => ({
          quality: media.quality,
          url: media.url,
        })),
      );
      const downloadLink = this.filterQuality(mediaUrls, desiredQuality);
      return {
        mediaUrls: mediaUrls,
        downloadLink: downloadLink,
      };
    } catch (error) {
      console.error("Gagal mendapatkan link download:", error.message);
      throw error;
    }
  }
}
export { AioDown };
