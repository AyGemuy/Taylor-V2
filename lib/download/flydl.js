import axios from "axios";
class DownloadError extends Error {
  constructor(msg) {
    super(msg);
    this.name = "DownloadError";
  }
}
class FlyApi {
  constructor(details, downloads) {
    this.endpoints = {
      info: details,
      download: downloads,
    };
  }
  headers(custom = {}) {
    return {
      "Content-Type": "application/json",
      "User-Agent": "Postify/1.0.0",
      Referer: "https://ytiz.xyz/",
      ...custom,
    };
  }
  handleError(error, context) {
    const errors = error?.response?.data
      ? JSON.stringify(error.response.data)
      : error?.message || "Unknown Error";
    throw new DownloadError(`Error in ${context}: ${errors}`);
  }
}
class FlyDl extends FlyApi {
  constructor() {
    super("https://m8.fly.dev/api/info", "https://m8.fly.dev/api/download");
  }
  async request(endpoint, payload) {
    try {
      const { data } = await axios.post(this.endpoints[endpoint], payload, {
        headers: this.headers(),
      });
      return data;
    } catch (error) {
      this.handleError(error, endpoint);
    }
  }
  async fetchDetails(videoUrl, format) {
    return await this.request("info", {
      url: videoUrl,
      format: format,
      startTime: 0,
      endTime: 0,
    });
  }
  async download(videoUrl, quality, filename, randomID, format) {
    return await this.request("download", {
      url: videoUrl,
      quality: quality,
      metadata: true,
      filename: filename,
      randID: randomID,
      trim: false,
      startTime: 0,
      endTime: 0,
      format: format,
    });
  }
  validParams(format, quality) {
    const formats = ["m4a", "mp3", "flac"];
    const qualities = ["32", "64", "128", "192", "256", "320"];
    formats.includes(format)
      ? null
      : (() => {
          throw new Error(
            `Salah! Pilih salah satu opsi ini: ${formats.join(", ")}`,
          );
        })();
    qualities.includes(quality)
      ? null
      : (() => {
          throw new Error(
            `Salah! Pilih salah satu opsi ini: ${qualities.join(", ")}`,
          );
        })();
  }
  async scrape(videoUrl, format = "mp3", quality = "128") {
    try {
      this.validParams(format, quality);
      const videoInfo = await this.fetchDetails(videoUrl, format);
      const audioData = await this.download(
        videoUrl,
        quality,
        videoInfo?.filename,
        videoInfo?.randID,
        format,
      );
      const responseBlob = await axios.post(
        "https://m8.fly.dev/api/file_send",
        {
          filepath: audioData?.filepath,
          randID: audioData?.randID,
        },
        {
          responseType: "arraybuffer",
        },
      );
      return {
        media: Buffer.from(responseBlob?.data || []),
        info: videoInfo,
      };
    } catch (error) {
      console.error(error.message || "Terjadi kesalahan.");
    }
  }
}
export const download = async (videoUrl, format = "mp3", quality = "128") => {
  try {
    const downloader = new FlyDl();
    const result = await downloader.scrape(videoUrl, format, quality);
    return result;
  } catch (error) {
    console.error(error?.message || "Terjadi kesalahan saat mengunduh audio.");
  }
};
