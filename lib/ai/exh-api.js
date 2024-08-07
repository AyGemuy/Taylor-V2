import fetch from "node-fetch";
import crypto from "crypto";
class ExhApiClient {
  constructor(apiKey = "eyJhbGciOiJIUzUxMiJ9.eyJ1c2VybmFtZSI6ImJvdGlmeS13ZWItdjMifQ.O-w89I5aX2OE_i4k6jdHZJEDWECSUfOb1lr9UdVH4oTPMkFGUNm9BNzoQjcXOu8NEiIXq64-481hnenHdUrXfg") {
    this.DEFAULT_API_KEY = apiKey, this.BASE_URL = "https://api.exh.ai", this.defaultHeaders = {
      Accept: "application/json",
      Authorization: "Bearer " + this.DEFAULT_API_KEY,
      "Content-Type": "application/json"
    };
  }
  generateRandomUserId() {
    return crypto.randomBytes(16).toString("hex");
  }
  async makeFetchRequest(url, requestOptions) {
    try {
      const response = await fetch(url, requestOptions);
      if (!response.ok) {
        const errorMessage = `Error: ${response.statusText}`;
        throw console.error(errorMessage), new Error(errorMessage);
      }
      return await response.json();
    } catch (error) {
      throw console.error("Error:", error.message), error;
    }
  }
  async getResponse(name, message, system, facts) {
    const userId = this.generateRandomUserId(),
      url = `${this.BASE_URL}/chatbot/v2/get_response`,
      requestOptions = {
        method: "POST",
        headers: this.defaultHeaders,
        body: JSON.stringify({
          context: [{
            turn: "bot",
            message: system || "Hi, how are you?"
          }, {
            turn: "user",
            message: message
          }],
          user_id: userId,
          persona_facts: facts || ["I like to play chess.", "I like to play soccer."],
          bot_name: name
        })
      };
    return await this.makeFetchRequest(url, requestOptions);
  }
  async getSmartReplies(message, system) {
    const url = `${this.BASE_URL}/chatbot/v2/get_smart_replies`,
      userId = this.generateRandomUserId(),
      requestOptions = {
        method: "POST",
        headers: this.defaultHeaders,
        body: JSON.stringify({
          context: [{
            turn: "bot",
            message: system || "Hi, how are you?"
          }, {
            turn: "user",
            message: message
          }],
          user_id: userId,
          candidates_num: 2
        })
      };
    return await this.makeFetchRequest(url, requestOptions);
  }
  async txt2avatar(prompt) {
    const data = {
        prompt: prompt
      },
      url = `${this.BASE_URL}/image_generation/v1/txt2avatar`,
      requestOptions = {
        method: "POST",
        headers: this.defaultHeaders,
        body: JSON.stringify(data)
      },
      cleanBase64 = (await this.makeFetchRequest(url, requestOptions)).img1.replace(/^data:image\/\w+;base64,/, "");
    return Buffer.from(cleanBase64, "base64");
  }
}
export {
  ExhApiClient
};