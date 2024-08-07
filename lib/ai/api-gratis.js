import fetch from "node-fetch";
import chalk from "chalk";
class ApiGratis {
  constructor(baseURL = "https://api.apigratis.site") {
    this.baseURL = baseURL || "https://api.apigratis.site";
  }
  async getStatus() {
    try {
      const response = await fetch(`${this.baseURL}/cai/status`, {
          method: "GET",
          headers: {
            accept: "application/json"
          }
        }),
        data = await response.json();
      return response.ok ? data : Promise.reject(new Error("Failed to fetch status"));
    } catch (error) {
      throw console.error(chalk.red("Error fetching status:", error.message)), error;
    }
  }
  async searchCharacters(query) {
    try {
      const response = await fetch(`${this.baseURL}/cai/search_characters?query=${query}`, {
          method: "GET",
          headers: {
            accept: "application/json"
          }
        }),
        data = await response.json();
      return response.ok ? data : Promise.reject(new Error("Failed to search characters"));
    } catch (error) {
      throw console.error(chalk.red("Error searching characters:", error.message)), error;
    }
  }
  async getCharacterInfo(externalId) {
    try {
      const response = await fetch(`${this.baseURL}/cai/character_info?external_id=${externalId}`, {
          method: "GET",
          headers: {
            accept: "application/json"
          }
        }),
        data = await response.json();
      return response.ok ? data : Promise.reject(new Error("Failed to fetch character info"));
    } catch (error) {
      throw console.error(chalk.red("Error fetching character info:", error.message)),
        error;
    }
  }
  async sendMessage(externalId, message) {
    try {
      const response = await fetch(`${this.baseURL}/cai/send_message`, {
          method: "POST",
          headers: {
            accept: "application/json",
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            external_id: externalId,
            message: message
          })
        }),
        data = await response.json();
      return response.ok ? data : Promise.reject(new Error("Failed to send message"));
    } catch (error) {
      throw console.error(chalk.red("Error sending message:", error.message)), error;
    }
  }
}
export {
  ApiGratis
};