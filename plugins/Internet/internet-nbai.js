import cheerio from "cheerio";
import fetch from "node-fetch";
const handler = async (m, {
  conn,
  args,
  usedPrefix,
  text,
  command
}) => {
  if (!text) return m.reply("Input query\nExample: .nbai hello");
  m.react(wait);
  try {
    let filteredTexts = filterJSONInput(await ChatGpt(text)),
      result = JSON.parse(filteredTexts[1]).text;
    m.reply(result);
  } catch (e) {
    try {
      let result = await generateLinglu(text);
      m.reply(result);
    } catch (e) {
      m.react(eror);
    }
  }
};
handler.help = ["nbai"], handler.tags = ["internet"], handler.command = /^(nbai)$/i;
export default handler;
async function ChatGpt(query) {
  const body = JSON.stringify({
      prompt: query,
      options: {}
    }),
    response = await fetch("https://154.40.59.105:3006/api/chat-process", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Referer: "https://f1.nbai.live/",
        accept: "application/json, text/plain, */*"
      },
      body: body
    });
  return await response.text();
}

function filterJSONInput(input) {
  return input.match(/{(?:[^{}]|(?:\{(?:[^{}]|(?:\{(?:[^{}]|(?:\{[^{}]*\}))*\}))*\}))*}/g).filter(text => {
    try {
      return JSON.parse(text), !0;
    } catch (error) {
      return !1;
    }
  });
}
async function generateLinglu(msg) {
  const data = {
      prompt: "Gunakan bahasa indonesia!\n" + msg
    },
    response = await fetch("https://linglu.pro/api/generate", {
      headers: {
        Referer: "https://linglu.pro/zh",
        "Referrer-Policy": "strict-origin-when-cross-origin"
      },
      body: JSON.stringify(data),
      method: "POST"
    });
  return await response.text();
}