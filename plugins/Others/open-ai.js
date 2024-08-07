import fetch from "node-fetch";
import https from "https";
import {
  Arya
} from "../../lib/ai/arya-hcr.js";
const handler = async (m, {
  conn,
  args,
  usedPrefix,
  command
}) => {
  const text = args.join(" ") || m.quoted?.text || m.quoted?.caption || m.quoted?.description || null;
  if (!text) {
    return m.reply(`Input query text!\n*Example:*\n- *${usedPrefix + command}* hello`);
  }
  try {
    const encodedText = encodeURIComponent(text);
    const result = await AryaGpt(encodedText) || await GoodyApi(encodedText) || await RnsChat(encodedText) || await Widipe(encodedText) || await RapidGpt(encodedText) || await CleanDx(encodedText);
    if (!result) return m.reply("No result");
    m.reply(result);
  } catch (error) {
    console.error("Error:", error);
    m.reply("An error occurred while processing your request.");
  }
};
handler.help = ["ai"];
handler.tags = ["ai", "gpt"];
handler.command = /^(ai)$/i;
export default handler;
const CleanDx = async query => {
  const Baseurl = "https://vipcleandx.xyz/";
  const linkaiList = [{
    content: query,
    role: "user",
    nickname: "",
    time: Date.now(),
    isMe: true
  }, {
    content: "Saya AI dari OpenAI, diciptakan untuk membantu Anda mengeksplorasi ide, bertukar informasi, dan menyelesaikan masalah. Ada yang bisa saya bantu?",
    role: "assistant",
    nickname: "AI",
    time: Date.now(),
    isMe: false
  }];
  if (linkaiList.length > 10) linkaiList.shift();
  try {
    const response = await fetch(`${Baseurl}v1/chat/gpt/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Forwarded-For": Array.from({
          length: 4
        }, () => Math.floor(256 * Math.random())).join("."),
        Referer: Baseurl,
        Accept: "application/json, text/plain, */*"
      },
      body: JSON.stringify({
        list: linkaiList,
        id: Math.floor(256 * Math.random()),
        title: query,
        prompt: "",
        temperature: .7,
        models: 0,
        continuous: true,
        is_web: true
      })
    });
    if (!response.ok) throw new Error("Network response was not ok");
    return await response.text();
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
};
const Widipe = async query => {
  try {
    const response = await fetch(`https://widipe.com/openai?text=${query}`);
    if (!response.ok) throw new Error("Network response was not ok");
    const data = await response.json();
    return data.result;
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
};
const RnsChat = async query => {
  try {
    const response = await fetch("https://api.rnilaweera.lk/api/v1/user/gpt", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer rsnai_C5Y6ZSoUt3LRAWopF6PQ2Uef"
      },
      body: JSON.stringify({
        prompt: query
      })
    });
    if (!response.ok) throw new Error("Network response was not ok");
    const data = await response.json();
    return data.message;
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
};
const RapidGpt = async query => {
  try {
    const response = await fetch("https://chatgpt-42.p.rapidapi.com/conversationgpt4", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-RapidAPI-Key": "ec4a07939fmsh4daed89d45e8bccp165f71jsn06c493b781a9",
        "X-RapidAPI-Host": "chatgpt-42.p.rapidapi.com"
      },
      body: JSON.stringify({
        messages: [{
          role: "user",
          content: query
        }],
        system_prompt: "I am GPT-4 Turbo, a large language model created by OpenAI.",
        temperature: .1,
        top_k: 5,
        top_p: .9,
        max_tokens: 256,
        web_access: false
      })
    });
    if (!response.ok) throw new Error("Network response was not ok");
    const data = await response.json();
    return data.result;
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
};
const GoodyApi = async query => {
  const url = "https://www.goody2.ai/send";
  const headers = {
    authority: "www.goody2.ai",
    accept: "*/*",
    "accept-language": "en-US,en;q=0.9",
    "content-type": "text/plain",
    origin: "https://www.goody2.ai",
    referer: "https://www.goody2.ai/chat",
    "sec-ch-ua": '"Not-A.Brand";v="99", "Chromium";v="124"',
    "sec-ch-ua-mobile": "?1",
    "sec-ch-ua-platform": '"Android"',
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-origin",
    "user-agent": "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Mobile Safari/537.36"
  };
  const data = JSON.stringify({
    message: query,
    debugParams: null
  });
  try {
    const response = await new Promise((resolve, reject) => {
      const req = https.request(url, {
        method: "POST",
        headers: headers
      }, res => {
        let body = "";
        res.on("data", chunk => {
          body += chunk;
        });
        res.on("end", () => {
          resolve({
            statusCode: res.statusCode,
            body: body
          });
        });
      });
      req.on("error", e => {
        reject(e);
      });
      req.write(data);
      req.end();
    });
    if (response.statusCode < 200 || response.statusCode >= 300) {
      throw new Error(`HTTP status code: ${response.statusCode}`);
    }
    const plainTextContent = response.body.split("\n").filter(line => line.startsWith("data: ")).map(line => JSON.parse(line.slice(6)).content).join("");
    return plainTextContent;
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
};
const AryaGpt = async query => {
  const apiClient = new Arya();
  try {
    const result = await apiClient.chatGPT(null, query, query, null);
    return result.gpt;
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
};