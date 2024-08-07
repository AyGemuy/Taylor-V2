import fetch from "node-fetch";
export async function before(m) {
  const chat = db.data.chats[m.chat];
  if (m.isBaileys || !m.text || !chat.autochatGpt) return !1;
  let text = m.text;
  try {
    if (chat.autochatGpt) {
      const result = await gptGo(text);
      result && await this.sendMessage(m.chat, {
        text: result
      }, {
        quoted: m
      });
    }
  } catch {
    await this.reply(m.chat, "Error occurred.", m);
  }
}
export const disabled = !1;
async function gptGo(query) {
  const encodeQuery = encodeURIComponent(query),
    tokenResponse = await fetch(`https://gptgo.ai/action_get_token.php?q=${encodeQuery}&hlgpt=id`, {
      method: "GET",
      headers: {
        Referer: "https://gptgo.ai/?hl=id",
        origin: "https://gptgo.ai/"
      }
    }),
    {
      token
    } = await tokenResponse.json(),
    response = await fetch(`https://gptgo.ai/action_ai_gpt.php?token=${token}`, {
      method: "GET",
      headers: {
        Referer: "https://gptgo.ai/?hl=id",
        origin: "https://gptgo.ai/",
        accept: "text/event-stream"
      }
    }),
    chunks = (await response.text()).split("data:");
  let result = "";
  for (let i = 1; i < chunks.length; i++) {
    const chunk = chunks[i].trim(),
      doneIndex = chunk.indexOf("[DONE]");
    if (-1 !== doneIndex) {
      result += chunk.slice(0, doneIndex);
      break;
    }
    const contentIndex = chunk.indexOf('"content":"');
    if (-1 !== contentIndex) {
      const startIndex = contentIndex + 11,
        endIndex = chunk.indexOf('"', startIndex);
      if (-1 !== endIndex) {
        result += chunk.slice(startIndex, endIndex);
      }
    }
  }
  return result.replace(/\\n/g, "\n");
}