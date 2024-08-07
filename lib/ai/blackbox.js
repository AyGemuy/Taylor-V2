import fetch from "node-fetch";
import {
  FormData,
  Blob
} from "formdata-node";
import {
  fileTypeFromBuffer
} from "file-type";
import {
  randomBytes,
  randomUUID
} from "crypto";
class Blackbox {
  constructor() {
    this.userId = randomUUID(), this.chatId = randomBytes(16).toString("hex");
  }
  async chat(messages, userSystemPrompt = "You are Realtime AI. Follow the user's instructions carefully.", webSearchMode = !0, playgroundMode = !1, codeModelMode = !1, isMicMode = !1) {
    try {
      const blackboxResponse = await fetch("https://www.blackbox.ai/api/chat", {
        method: "POST",
        mode: "cors",
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
          Accept: "*/*",
          "Accept-Language": "en-US,en;q=0.5",
          "Accept-Encoding": "gzip, deflate, br",
          Referer: "https://www.blackbox.ai/",
          "Content-Type": "application/json",
          Origin: "https://www.blackbox.ai",
          DNT: "1",
          "Sec-GPC": "1",
          "Alt-Used": "www.blackbox.ai",
          Connection: "keep-alive"
        },
        body: JSON.stringify({
          messages: messages,
          id: this.chatId || "chat-free",
          previewToken: null,
          userId: this.userId,
          codeModelMode: codeModelMode,
          agentMode: {},
          trendingAgentMode: {},
          isMicMode: isMicMode,
          userSystemPrompt: userSystemPrompt,
          maxTokens: 1024,
          playgroundMode: playgroundMode,
          webSearchMode: webSearchMode,
          promptUrls: "",
          isChromeExt: !1,
          githubToken: null
        })
      });
      return await blackboxResponse.text();
    } catch (error) {
      return console.error("Error fetching data:", error), null;
    }
  }
  async image(imageBuffer, input) {
    try {
      const {
        ext,
        mime
      } = await fileTypeFromBuffer(imageBuffer) || {};
      if (!ext || !mime) return null;
      const form = new FormData(),
        blob = new Blob([imageBuffer], {
          type: mime
        });
      form.append("image", blob, "image." + ext), form.append("fileName", "image." + ext),
        form.append("userId", this.userId);
      const response = await fetch("https://www.blackbox.ai/api/upload", {
          method: "POST",
          body: form
        }),
        messages = [{
          role: "user",
          content: (await response.json()).response + "\n#\n" + input
        }];
      return await this.chat(messages, "Realtime", !0, !1, !1, !1);
    } catch (error) {
      throw console.error("Error:", error), error;
    }
  }
}
export {
  Blackbox
};