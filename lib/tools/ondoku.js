import { FormData } from "formdata-node";
import { fileTypeFromBuffer } from "file-type";
import fetch from "node-fetch";
import * as cheerio from "cheerio";
import crypto from "crypto";
class Ondoku {
  constructor() {
    this.url = "https://ondoku3.com/id/text_to_speech/";
    this.mainUrl = "https://ondoku3.com/id/";
    this.defaultHeaders = {
      "User-Agent": "Postify/1.0.0",
      Accept: "*/*",
      "Accept-Language": "id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7",
      "Cache-Control": "no-cache",
      Pragma: "no-cache",
      "Upgrade-Insecure-Requests": "1",
      Origin: "https://ondoku3.com",
      Referer: "https://ondoku3.com/id/",
      "Sec-Ch-Ua": '"Not-A.Brand";v="99", "Chromium";v="58"',
      "Sec-Ch-Ua-Mobile": "?0",
      "Sec-Ch-Ua-Platform": '"Windows"',
      "Sec-Fetch-Dest": "empty",
      "Sec-Fetch-Mode": "cors",
      "Sec-Fetch-Site": "same-origin",
      "X-Requested-With": "XMLHttpRequest",
    };
  }
  randomIP() {
    return Array.from(
      {
        length: 4,
      },
      () => crypto.randomInt(0, 256),
    ).join(".");
  }
  async fetchToken() {
    try {
      const response = await fetch(this.mainUrl, {
        headers: this.defaultHeaders,
      });
      const text = await response.text();
      const $ = cheerio.load(text);
      const tokenElement = $('input[name="csrfmiddlewaretoken"]');
      if (!tokenElement.length) throw new Error("❎ Gak nemu token nya 😂");
      return tokenElement.val();
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  async scrape(data, voiceId, speed, pitch) {
    const csrfToken = await this.fetchToken();
    const headers = {
      ...this.defaultHeaders,
      Cookie: `settings={"voice":"${voiceId}","speed":${speed},"pitch":${pitch},"language":"id-ID"}; csrftoken=${csrfToken}`,
      "x-csrftoken": csrfToken,
      "X-Forwarded-For": this.randomIP(),
    };
    try {
      const response = await fetch(this.url, {
        method: "POST",
        headers: headers,
        body: data,
      });
      if (!response.ok) throw new Error(await response.text());
      return response.json();
    } catch (error) {
      console.error("Error in scrape method:", error);
      throw error;
    }
  }
  async textToSpeech(
    text,
    voiceId = "id-ID-Wavenet-B",
    speed = "1",
    pitch = "0",
  ) {
    const data = new FormData();
    data.append("text", text);
    data.append("voice", voiceId);
    data.append("speed", speed);
    data.append("pitch", pitch);
    return await this.scrape(data, voiceId, speed, pitch);
  }
  async imageToSpeech(
    base64Image,
    voiceId = "id-ID-Wavenet-B",
    speed = "1",
    pitch = "0",
  ) {
    try {
      const buffer = Buffer.from(base64Image, "base64");
      const { ext = "jpeg", mime = "image/jpeg" } =
        (await fileTypeFromBuffer(buffer)) || {};
      const base64Data = buffer.toString("base64");
      const dataUrl = `data:${mime};base64,${base64Data}`;
      const data = new FormData();
      data.append("image_0", dataUrl);
      data.append("text", "");
      data.append("voice", voiceId);
      data.append("speed", speed);
      data.append("pitch", pitch);
      return await this.scrape(data, voiceId, speed, pitch);
    } catch (error) {
      console.error("Error in imageToSpeech method:", error);
      throw error;
    }
  }
}
export { Ondoku };
