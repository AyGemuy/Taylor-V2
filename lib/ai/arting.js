import fetch from "node-fetch";
import { randomBytes } from "crypto";
class Arting {
  constructor(baseURL) {
    this.baseURL = baseURL || "https://arting.ai/api/cg/text-to-voice";
    this.headers = {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
      "User-Agent":
        "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Mobile Safari/537.36",
      Referer: "https://arting.ai/app/#/ai-voice-generator",
      Cookie: this.generateCookie(),
    };
  }
  uuid() {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
      (c ^ (randomBytes(1)[0] & (15 >> (c / 4)))).toString(16),
    );
  }
  generateCookie() {
    const locale = "NUXT_LOCALE=en";
    const nlgId = `nlg_id=${this.uuid()}`;
    return `${locale}; ${nlgId};`;
  }
  async voicemodel(query = "Jokowi", page = 1, pageSize = 20) {
    const payload = {
      page: page,
      pageSize: pageSize,
      keyword: query,
      tag: "",
    };
    delete this.headers.Accept;
    delete this.headers.Referer;
    delete this.headers.Cookie;
    try {
      const response = await fetch(`${this.baseURL}/voicemodel`, {
        method: "POST",
        headers: this.headers,
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      console.log("Voice Model", data);
      return data?.data?.list || [];
    } catch (error) {
      console.error("voicemodel error:", error);
    }
  }
  async create(
    text = "Hello!",
    init_audio = 23180,
    language = "english",
    emotion = "neutral",
    speed = 1,
  ) {
    const payload = {
      prompt: text,
      init_audio: init_audio,
      language: language,
      emotion: emotion,
      speed: speed,
    };
    try {
      const response = await fetch(`${this.baseURL}/create`, {
        method: "POST",
        headers: this.headers,
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      console.log("Create", data);
      return (await this.get(data?.data?.request_id)) || null;
    } catch (error) {
      console.error("create error:", error);
    }
  }
  async get(request_id) {
    const payload = {
      request_id: request_id,
    };
    const maxPollingTime = 6e4;
    const pollingInterval = 2e3;
    const endTime = Date.now() + maxPollingTime;
    delete this.headers.Accept;
    delete this.headers.Referer;
    try {
      let data;
      while (Date.now() < endTime) {
        const response = await fetch(`${this.baseURL}/get`, {
          method: "POST",
          headers: this.headers,
          body: JSON.stringify(payload),
        });
        data = await response.json();
        console.log("Get", data);
        if (data?.data) return data?.data;
        await new Promise((resolve) => setTimeout(resolve, pollingInterval));
      }
      return null;
    } catch (error) {
      console.error("get error:", error);
    }
  }
  async download(id) {
    const downloadURL = `https://pub-3626123a908346a7a8be8d9295f44e26.r2.dev/generations/${id}.wav`;
    delete this.headers.Accept;
    delete this.headers.Referer;
    try {
      const response = await fetch(downloadURL, {
        headers: this.headers,
      });
      const arrayBuffer = await response.arrayBuffer();
      return Buffer.from(arrayBuffer);
    } catch (error) {
      console.error("download error:", error);
    }
  }
}
export { Arting };
