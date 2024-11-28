import axios from "axios";
class ToMP3 {
  constructor() {
    this.baseUrl = "https://tomp3.cc/api/ajax/search";
    this.convertUrl = "https://tomp3.cc/api/ajax/convert";
    this.headers = {
      "Content-Type": "application/x-www-form-urlencoded",
      "User-Agent": "Postify/1.0.0",
      Accept: "*/*",
      "Cache-Control": "no-cache",
      Origin: "https://tomp3.cc",
      Referer: "https://tomp3.cc/youtube-to-mp3/",
    };
  }
  async request(url, params) {
    return (
      await axios.post(url, new URLSearchParams(params), {
        headers: this.headers,
      })
    ).data;
  }
  async downloadFile(url) {
    return (
      await axios.get(url, {
        responseType: "arraybuffer",
      })
    ).data;
  }
  async pd(videoUrl, type, quality) {
    const result = await this.request(this.baseUrl, {
      query: videoUrl,
      vt: type,
    });
    if (result.status === "ok") {
      const { links } = result;
      console.log(
        `Kualitas ${type} yang tersedia:`,
        Object.keys(links[type]).join(", "),
      );
      const mediaQuality =
        quality in links[type] ? quality : Object.keys(links[type])[0];
      const k = links[type][mediaQuality].k;
      const convertResult = await this.request(this.convertUrl, {
        vid: result.vid,
        k: k,
      });
      if (convertResult.status === "ok") {
        const dLink = convertResult.dlink;
        const mediaBuffer = await this.downloadFile(dLink);
        return mediaBuffer;
      } else {
        console.error(convertResult);
      }
    } else {
      console.log("Error ceunah 😂");
    }
  }
  audio(videoUrl, quality) {
    return this.pd(videoUrl, "mp3", quality);
  }
  video(videoUrl, quality) {
    return this.pd(videoUrl, "mp4", quality);
  }
}
export { ToMP3 };
