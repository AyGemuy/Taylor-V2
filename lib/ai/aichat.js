import fetch from "node-fetch";
class Aichat {
  constructor() {
    this.url = "https://chat-gpt.org/chat", this.working = !0, this.supports_gpt_35_turbo = !0;
  }
  async createAsync(model, messages, kwargs = {}) {
    const json_data = {
        message: this.formatPrompt(messages),
        temperature: kwargs.temperature || .5,
        presence_penalty: 0,
        top_p: kwargs.top_p || 1,
        frequency_penalty: 0
      },
      response = await fetch("https://chat-gpt.org/api/text", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36"
        },
        body: JSON.stringify(json_data)
      });
    if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);
    const result = await response.json();
    if (!result.response) throw new Error(`Error Response: ${JSON.stringify(result)}`);
    return result.message;
  }
  formatPrompt(messages) {
    return JSON.stringify(messages);
  }
}
export default Aichat;
