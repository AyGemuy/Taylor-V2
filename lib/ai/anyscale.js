import fetch from "node-fetch";
class AnyscaleAPI {
  constructor() {
    this.baseUrl = "https://api.endpoints.anyscale.com/v1";
    this.apiKeys = ["esecret_iyt8cukznmr4lvr26rrc1esfrl", "esecret_qayi6qgc8tjpvdcyl6k1bxujw8", "esecret_z844drr79tdnc5brvg4pnlfjz3"];
    this.apiKey = this.getRandomApiKey();
  }
  getRandomApiKey() {
    return this.apiKeys[Math.floor(Math.random() * this.apiKeys.length)];
  }
  async fetchAPI(endpoint, method, body = null) {
    const headers = {
      Accept: "application/json",
      Authorization: `Bearer ${this.apiKey}`
    };
    if (method === "POST" && body) {
      headers["Content-Type"] = "application/json";
    }
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        method: method,
        headers: headers,
        body: body ? JSON.stringify(body) : null
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data);
      }
      return data;
    } catch (error) {
      console.error(`Error fetching ${endpoint}:`, error);
      throw error;
    }
  }
  async model() {
    return await this.fetchAPI("/models", "GET");
  }
  async chat(model, messages, inp = {}) {
    const body = {
      model: model || "mistralai/Mistral-7B-Instruct-v0.1",
      messages: messages || [{
        role: "system",
        content: "You are a helpful assistant."
      }, {
        role: "user",
        content: "Write a program to load data from S3 with Ray and train using PyTorch."
      }],
      ...inp
    };
    return await this.fetchAPI("/chat/completions", "POST", body);
  }
}
export {
  AnyscaleAPI
};