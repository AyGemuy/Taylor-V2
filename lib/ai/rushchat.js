import fetch from "node-fetch";
class RushChat {
  constructor(token) {
    this.apiUrl = "https://rushchat.ai/api/rush/chat/v1";
    this.token =
      token ||
      "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJsb2dpblR5cGUiOiJsb2dpbiIsImxvZ2luSWQiOjE4MzUzMDI5MDcxNDQ2MzQzNzAsInJuU3RyIjoiWmxYbDZhdDJhMnB6d2dLQVBCamY1T0dSb0VDR0xWY0QifQ.1HzKHmTcdkvhMtuykuJ03_VNsePnXwQ_n-JBYA-T_tY";
    this.userAgent =
      "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Mobile Safari/537.36";
  }
  getHeaders(referer) {
    return {
      "Content-Type": "application/json",
      satoken: this.token,
      Accept: "text/event-stream",
      "User-Agent": this.userAgent,
      Referer: referer,
    };
  }
  async sendRequest(
    content,
    conversationId = "1835302963874164737",
    replyMsgType,
  ) {
    const referer = `https://rushchat.ai/id/chat/${conversationId}`;
    try {
      const response = await fetch(`${this.apiUrl}/sendMsg`, {
        method: "POST",
        headers: this.getHeaders(referer),
        body: JSON.stringify({
          content: content,
          conversationId: conversationId,
          replyMsgType: replyMsgType,
        }),
      });
      if (!response.ok) throw new Error("Network response was not ok.");
      return await response.text();
    } catch (error) {
      console.error("Error sending request:", error);
      throw error;
    }
  }
  async chat(content, conversationId = "1835302963874164737") {
    try {
      const text = await this.sendRequest(content, conversationId, "text");
      console.log("Raw response text:", text);
      return text
        .split("\n\n")
        .filter(Boolean)
        .map((msg) => msg.split("\n"))
        .flat()
        .filter((part) => part.startsWith("data:"))
        .map((part) => JSON.parse(part.slice(5).trim()))
        .map((parsed) => parsed.data)
        .join("")
        .trim();
    } catch (error) {
      console.error("Error sending chat message:", error);
      throw error;
    }
  }
  async image(content, conversationId = "1835302963874164737") {
    try {
      const text = await this.sendRequest(content, conversationId, "img");
      console.log("Raw response text:", text);
      const imgMsgId = text
        .split("\n\n")
        .filter(Boolean)
        .map((msg) => msg.split("\n"))
        .flat()
        .filter((part) => part.startsWith("data:"))
        .map((part) => JSON.parse(part.slice(5).trim()))
        .find((parsed) => parsed.msgId)?.msgId;
      if (!imgMsgId) throw new Error("Image message ID not found.");
      return await this.getImageResult(imgMsgId);
    } catch (error) {
      console.error("Error sending image request:", error);
      throw error;
    }
  }
  async getImageResult(imgMsgId) {
    const timeout = 6e4;
    const startTime = Date.now();
    let result = null;
    try {
      while (Date.now() - startTime < timeout) {
        const response = await fetch(
          `${this.apiUrl}/getImgGenResult?imgMsgId=${imgMsgId}`,
          {
            headers: {
              ...this.getHeaders(`https://rushchat.ai/id/chat/${imgMsgId}`),
              Accept: "application/json, text/plain, */*",
              appId: "rushchat_web",
              utmSource: "toolify",
              userLanguage: "id",
              deviceCode: "7be3c683fb969ff87ca59c6829d3ab8d",
            },
          },
        );
        if (!response.ok) throw new Error("Network response was not ok.");
        const data = await response.json();
        console.log("Image status:", data);
        if (data.code === 200 && data.data) {
          if (data.data.finishStatus === 1) {
            result = data.data;
            break;
          }
        }
        await new Promise((resolve) => setTimeout(resolve, 2e3));
      }
      if (result === null)
        throw new Error("Timeout: Image result not available within 1 minute.");
      return result;
    } catch (error) {
      console.error("Error checking image status:", error);
      throw error;
    }
  }
}
export { RushChat };
