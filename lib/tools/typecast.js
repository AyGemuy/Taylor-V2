import fetch from "node-fetch";
class Typecast {
  constructor() {
    this.tokenUrl =
      "https://securetoken.googleapis.com/v1/token?key=AIzaSyBJN3ZYdzTmjyQJ-9TdpikbsZDT9JUAYFk";
    this.ActorId = "62fb679683a541c351dc7c3a";
    this.StyleLabel = "normal-1";
    this.headers = {
      "X-Client-Version": "Chrome/JsCore/10.11.1/FirebaseCore-web",
      "Content-Type": "application/x-www-form-urlencoded",
      "User-Agent":
        "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Mobile Safari/537.36",
      Referer: "https://typecast.ai/text-to-speech",
    };
  }
  async refreshToken() {
    try {
      const response = await fetch(this.tokenUrl, {
        method: "POST",
        headers: this.headers,
        body: new URLSearchParams({
          grant_type: "refresh_token",
          refresh_token:
            "AMf-vBwlkMpj1jPO3Et_yA6g5Kxbl_U2WyVjJGmRdmlXtVJ49vTqxQeH0ZlDLlRJ_uNSJaRywUKCIcaGe7BnNH0oJDNZX6enKeFZqShPqejfuHAhqyGgOS4V2M6DE04dKBbmRgfBvWubYSE7Dgc8uVGIPhBpGlkEatvQM_9V2C6IM8lNNCyKXApHAs_N1Bk5K42VE4gJ5X2ELNOjjO64GEleBPoMykUiM6SgHgHqSf4Exgi8VjsngxwNV6_Hw_eVEw1a1T-Xb2-OHdf_K5qDmLpNtIcNNVFNvMYYKwhwbNY5lbhgNLO_V8s-puHNVqLLRrw26mmoNeK5",
        }),
      });
      const data = await response.json();
      return data.id_token;
    } catch (error) {
      console.error("Error refreshing token:", error);
    }
  }
  async create(
    text,
    actor_id = this.ActorId,
    style_label = this.StyleLabel,
    type = "high",
    max_seconds = 60,
    naturalness = 0.8,
    speed_x = 1,
    tempo = 1,
    pitch = 0,
  ) {
    const postUrl = "https://typecast.ai/api/speak/batch/post";
    const getUrl = "https://typecast.ai/api/speak/batch/get";
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${await this.refreshToken()}`,
      "User-Agent": "Mozilla/5.0",
    };
    const bodyPost = JSON.stringify([
      {
        actor_id: actor_id,
        text: text,
        scriptId: "g1zXLDP-or4MpcrQqxi8z",
        style_label: style_label,
        style_label_version: "v3",
        lang: "auto",
        force_length: "0",
        max_seconds: max_seconds,
        naturalness: naturalness,
        speed_x: speed_x,
        tempo: tempo,
        pitch: pitch,
        mode: "one-vocoder",
        retake: true,
      },
    ]);
    try {
      const postResponse = await fetch(postUrl, {
        method: "POST",
        headers: headers,
        body: bodyPost,
      });
      const {
        result: { speak_urls },
      } = await postResponse.json();
      const speakUrl = speak_urls[0];
      let status = "processing",
        getData;
      while (status !== "done") {
        await new Promise((r) => setTimeout(r, 3e3));
        const getResponse = await fetch(getUrl, {
          method: "POST",
          headers: headers,
          body: JSON.stringify([speakUrl]),
        });
        getData = await getResponse.json();
        status = getData.result[0]?.status || "processing";
      }
      const audioUrl = getData.result[0]?.audio?.[type]?.url;
      const audioResponse = await fetch(`${audioUrl}/cloudfront`, {
        headers: headers,
      });
      const audioJson = await audioResponse.json();
      const audioBufferResponse = await fetch(audioJson.result, {
        headers: headers,
      });
      return Buffer.from(await audioBufferResponse.arrayBuffer());
    } catch (error) {
      return error.message;
    }
  }
  async actor(page = 1, limit = 1) {
    try {
      const token = await this.refreshToken();
      const response = await fetch(
        `https://typecast.ai/api/actor-packages?language=en&has_keyword=1&limit=${limit}&page=${page}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            "User-Agent":
              "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Mobile Safari/537.36",
            Referer: "https://typecast.ai/voice-casting",
          },
        },
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching actor data:", error);
    }
  }
}
export { Typecast };
