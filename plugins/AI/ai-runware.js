import WebSocket from "ws";
import { v4 as uuidv4 } from "uuid";
import fetch from "node-fetch";
class CustomError extends Error {
  constructor(msg) {
    super(msg);
    this.name = "CustomError";
  }
}
class API {
  constructor(api, apikey) {
    this.api = api;
    this.default_apikey = apikey;
    this.connection = null;
    this.responsePromise = null;
    this.resolveResponse = null;
    this.rejectResponse = null;
  }
  connect() {
    return new Promise((resolve, reject) => {
      this.connection = new WebSocket(this.api);
      this.connection.onopen = () => {
        console.log("Koneksi WebSocket telah dibuka.");
        resolve();
      };
      this.connection.onmessage = (event) => {
        if (this.resolveResponse) {
          this.resolveResponse(event.data);
          this.resolveResponse = null;
        } else {
          console.log("Pesan diterima:", event.data);
        }
      };
      this.connection.onclose = () => {
        console.log("Koneksi WebSocket telah ditutup.");
      };
      this.connection.onerror = (error) => {
        console.error("Kesalahan WebSocket:", error);
        reject(error);
      };
    });
  }
  sendRequest(data) {
    return new Promise((resolve, reject) => {
      if (this.connection.readyState === WebSocket.OPEN) {
        this.responsePromise = {
          resolve: resolve,
          reject: reject,
        };
        this.resolveResponse = resolve;
        this.connection.send(JSON.stringify(data));
        console.log("Data terkirim:", JSON.stringify(data));
      } else {
        console.error("WebSocket tidak terbuka, tidak dapat mengirim request.");
        reject(new CustomError("WebSocket tidak terbuka"));
      }
    });
  }
}
class RunwareAI extends API {
  constructor() {
    super(
      "wss://ws-api.runware.ai/v1",
      "aHR0cHM6Ly9mYXN0Zmx1eC5haS9hc3NldHMvaW5kZXgtQktLcWM5SXUuanM",
    );
  }
  async fetchApiKey() {
    try {
      const response = await fetch(
        Buffer.from(this.default_apikey, "base64").toString("utf-8"),
      );
      if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);
      const text = await response.text();
      const apiKey =
        text.match(/VITE_API_KEY\s*:\s*['"]([^'"]+)['"]/)?.[1] || null;
      if (apiKey) {
        console.log("API Key ditemukan:", apiKey);
      } else {
        console.log("API Key tidak ditemukan.");
      }
      return apiKey;
    } catch (error) {
      console.error("Kesalahan saat mengambil API Key:", error.message);
      return null;
    }
  }
  async authenticate(apiKey) {
    try {
      const sessionUUID = uuidv4();
      const authRequest = [
        {
          taskType: "authentication",
          apiKey: apiKey,
          connectionSessionUUID: sessionUUID,
        },
      ];
      await this.sendRequest(authRequest);
      console.log("Permintaan otentikasi dikirim.");
    } catch (error) {
      console.error(
        "Kesalahan saat mengirim permintaan otentikasi:",
        error.message,
      );
    }
  }
  async input(
    prompt,
    numberResults = 1,
    height = 512,
    width = 512,
    outputFormat = "WEBP",
  ) {
    try {
      const body = [
        {
          taskType: "imageInference",
          model: "runware:100@1",
          positivePrompt: prompt,
          height: height,
          width: width,
          numberResults: numberResults,
          outputType: ["dataURI", "URL"],
          outputFormat: outputFormat,
          taskUUID: uuidv4(),
        },
      ];
      const result = await this.sendRequest(body);
      console.log("Permintaan image inference dikirim.");
      return result;
    } catch (error) {
      console.error(
        "Kesalahan saat mengirim permintaan image inference:",
        error.message,
      );
    }
  }
}
const handler = async (m, { conn, command, args, usedPrefix }) => {
  try {
    const prompt =
      args.join(" ") ||
      m.quoted?.text ||
      m.quoted?.caption ||
      m.quoted?.description;
    if (!prompt)
      return m.reply(
        `Please provide a prompt.\nUsage:\n*${usedPrefix}${command}* "Image description"`,
      );
    const runwareAI = new RunwareAI();
    await runwareAI.connect();
    const apiKey = await runwareAI.fetchApiKey();
    if (apiKey) {
      await runwareAI.authenticate(apiKey);
      const data = await runwareAI.input(prompt);
      const result = JSON.parse(data);
      for (const { imageURL } of result.data) {
        await conn.sendMessage(
          m.chat,
          {
            image: {
              url: imageURL,
            },
            caption: "Generated image from prompt.",
          },
          {
            quoted: m,
          },
        );
      }
    }
  } catch (error) {
    console.error("Error handling runware command:", error);
    m.reply("An error occurred while processing your request.");
  }
};
handler.help = ["runware <prompt>"];
handler.tags = ["ai"];
handler.command = /^runware$/i;
handler.exp = 0;
handler.register = false;
handler.limit = true;
export default handler;
