import fetch from "node-fetch";
class Transcript {
  constructor() {
    this.notegptBaseUrl =
      "https://notegpt.io/api/v2/video-transcript?platform=youtube&video_id=";
    this.notegptHeaders = {
      "User-Agent":
        "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Mobile Safari/537.36",
      Referer: "https://notegpt.io/youtube-transcript-generator",
    };
    this.tactiqUrl = "https://tactiq-apps-prod.tactiq.io/transcript";
    this.tactiqHeaders = {
      "Content-Type": "application/json",
    };
  }
  async notegpt(videoId) {
    try {
      const url = `${this.notegptBaseUrl}${videoId}`;
      const response = await fetch(url, {
        headers: this.notegptHeaders,
        compress: true,
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching NoteGPT transcript:", error);
    }
  }
  async tactiq(videoId) {
    try {
      const response = await fetch(this.tactiqUrl, {
        method: "POST",
        headers: this.tactiqHeaders,
        body: JSON.stringify({
          videoUrl: `https://www.youtube.com/watch?v=${videoId}`,
          langCode: "en",
        }),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching Tactiq transcript:", error);
    }
  }
}
export { Transcript };
