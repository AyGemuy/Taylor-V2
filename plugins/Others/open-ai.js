import fetch from "node-fetch";
import { Arya } from "../../lib/ai/arya-hcr.js";
const handler = async (m, { conn, args, usedPrefix, command }) => {
  if (!db.data.dbai.openai) db.data.dbai.openai = {};
  const text =
    args.length >= 1
      ? args.join(" ")
      : m.quoted?.text || m.quoted?.caption || m.quoted?.description || null;
  if (!text) {
    return m.reply(
      `Masukkan teks atau reply pesan dengan teks yang ingin diolah.\nContoh penggunaan:\n*${usedPrefix}${command} Hai, apa kabar?*`,
    );
  }
  m.react(wait);
  const providers = [
    BlackboxAI,
    gipiti4,
    Llm,
    BetaAi,
    ChatGptOrgUk,
    GoodyApi,
    RnsChat,
    Widipe,
    Andrie,
    AryaGpt,
    AryaGptV2,
    RapidGpt,
    CleanDx,
  ];
  let resultFound = false;
  for (const service of providers) {
    try {
      const { hasil, output } = await service(text);
      if (hasil && output) {
        const snippets = [...output.matchAll(/```([^`]+)```/g)].map((match) =>
          match[1].trim(),
        );
        let result;
        if (snippets.length) {
          const ctaButton = conn.ctaButton.setBody(output);
          let index = 1;
          for (const snippet of snippets) {
            ctaButton.addCopy(`Snippet ${index++}`, snippet);
          }
          result = await ctaButton.run(m.chat, conn, m);
        } else {
          result = await conn.reply(m.chat, output, m);
        }
        const {
          key: { id: keyId },
        } = result;
        db.data.dbai.openai[m.sender] = {
          key: {
            id: keyId,
          },
        };
        resultFound = true;
        break;
      }
    } catch (e) {
      console.log("Error in service call:", e);
    }
  }
  if (!resultFound) {
    m.react(eror);
  } else {
    m.react(sukses);
  }
};
handler.before = async (m, { conn }) => {
  if (!db.data.dbai.openai || m.isBaileys || !(m.sender in db.data.dbai.openai))
    return;
  const {
    key: { id: keyId },
  } = db.data.dbai.openai[m.sender];
  if (m.quoted?.id === keyId && m.text.trim()) {
    m.react(wait);
    const providers = [
      BlackboxAI,
      gipiti4,
      Llm,
      BetaAi,
      ChatGptOrgUk,
      GoodyApi,
      RnsChat,
      Widipe,
      Andrie,
      AryaGpt,
      AryaGptV2,
      RapidGpt,
      CleanDx,
    ];
    let resultFound = false;
    for (const service of providers) {
      try {
        const { hasil, output } = await service(m.text.trim());
        if (hasil && output) {
          const snippets = [...output.matchAll(/```([^`]+)```/g)].map((match) =>
            match[1].trim(),
          );
          let result;
          if (snippets.length) {
            const ctaButton = conn.ctaButton.setBody(output);
            let index = 1;
            for (const snippet of snippets) {
              ctaButton.addCopy(`Snippet ${index++}`, snippet);
            }
            result = await ctaButton.run(m.chat, conn, m);
          } else {
            result = await conn.reply(m.chat, output, m);
          }
          const {
            key: { id: keyId },
          } = result;
          db.data.dbai.openai[m.sender] = {
            key: {
              id: keyId,
            },
          };
          resultFound = true;
          break;
        }
      } catch (e) {
        console.log("Error in service call:", e);
      }
    }
    if (!resultFound) {
      m.react(eror);
    } else {
      m.react(sukses);
    }
  }
};
handler.help = ["ai"];
handler.tags = ["ai", "gpt"];
handler.command = /^(ai)$/i;
export default handler;
const baseHeaders = (url) => ({
  accept: "application/json, text/event-stream",
  "accept-language": "ru,en;q=0.9",
  "content-type": "application/json",
  priority: "u=1, i",
  "sec-ch-ua":
    '"Chromium";v="124", "YaBrowser";v="24.6", "Not-A.Brand";v="99", "Yowser";v="2.5"',
  "sec-ch-ua-mobile": "?0",
  "sec-ch-ua-platform": '"Windows"',
  plugins: "0",
  "sec-fetch-dest": "empty",
  "sec-fetch-mode": "cors",
  "sec-fetch-site": "same-origin",
  "x-requested-with": "XMLHttpRequest",
  Referer: url,
  "Referrer-Policy": "strict-origin-when-cross-origin",
});
const BlackboxAI = async (query) => {
  const url = "https://www.blackbox.ai/api/chat";
  const headers = {
    "Content-Type": "application/json",
    "User-Agent":
      "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Mobile Safari/537.36",
    Referer: "https://www.blackbox.ai/agent/AIAssistantYpqnXbm",
  };
  const body = JSON.stringify({
    messages: [
      {
        id: "Lunu9j2Z1HFdOY1XjE3Kj",
        content: query,
        role: "user",
      },
    ],
    id: "Lunu9j2Z1HFdOY1XjE3Kj",
    previewToken: null,
    userId: null,
    codeModelMode: true,
    webSearchMode: true,
    agentMode: {
      mode: true,
      id: "AIAssistantYpqnXbm",
      name: "AI Assistant",
    },
    trendingAgentMode: {},
    isMicMode: false,
    maxTokens: 1024,
    isChromeExt: false,
    githubToken: null,
    clickedAnswer2: false,
    clickedAnswer3: false,
    clickedForceWebSearch: false,
    visitFromDelta: false,
    mobileClient: false,
  });
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: headers,
      body: body,
    });
    if (!response.ok)
      return {
        hasil: false,
        output: null,
      };
    const rawText = await response.text();
    return {
      hasil: true,
      output: rawText.slice(rawText.lastIndexOf("$") + 1),
    };
  } catch (e) {
    console.log("Error in BlackboxAI:", e);
    return {
      hasil: false,
      output: null,
    };
  }
};
const ChatGptOrgUk = async (query) => {
  try {
    const response = await fetch(
      "https://chat.chatgpt.org.uk/api/openai/v1/chat/completions",
      {
        headers: baseHeaders(
          "https://chat.chatgpt.org.uk/api/openai/v1/chat/completions",
        ),
        body: JSON.stringify({
          messages: [
            {
              role: "user",
              content: query,
            },
          ],
          stream: false,
          model: "gpt-3.5-turbo",
          temperature: 0.5,
          presence_penalty: 0,
          frequency_penalty: 0,
          top_p: 1,
        }),
        method: "POST",
      },
    );
    if (!response.ok)
      return {
        hasil: false,
        output: null,
      };
    const text = await response.json();
    return {
      hasil: true,
      output: text.choices[0]?.message.content,
    };
  } catch (e) {
    console.log("Error in ChatGptOrgUk:", e);
    return {
      hasil: false,
      output: null,
    };
  }
};
const CleanDx = async (query) => {
  const Baseurl = "https://vipcleandx.xyz/";
  const linkaiList = [
    {
      content: query,
      role: "user",
      nickname: "",
      time: Date.now(),
      isMe: true,
    },
    {
      content:
        "Saya AI dari OpenAI, diciptakan untuk membantu Anda mengeksplorasi ide, bertukar informasi, dan menyelesaikan masalah. Ada yang bisa saya bantu?",
      role: "assistant",
      nickname: "AI",
      time: Date.now(),
      isMe: false,
    },
  ];
  if (linkaiList.length > 10) linkaiList.shift();
  try {
    const response = await fetch(`${Baseurl}v1/chat/gpt/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Forwarded-For": Array.from(
          {
            length: 4,
          },
          () => Math.floor(256 * Math.random()),
        ).join("."),
        Referer: Baseurl,
        Accept: "application/json, text/plain, */*",
      },
      body: JSON.stringify({
        list: linkaiList,
        id: Math.floor(256 * Math.random()),
        title: query,
        prompt: "",
        temperature: 0.7,
        models: 0,
        continuous: true,
        is_web: true,
      }),
    });
    if (!response.ok)
      return {
        hasil: false,
        output: null,
      };
    return {
      hasil: true,
      output: await response.text(),
    };
  } catch (e) {
    console.log("Error in CleanDx:", e);
    return {
      hasil: false,
      output: null,
    };
  }
};
const GoodyApi = async (query) => {
  try {
    const response = await fetch(`https://api.goodyapi.xyz/chat?text=${query}`);
    if (!response.ok)
      return {
        hasil: false,
        output: null,
      };
    const data = await response.json();
    return {
      hasil: true,
      output: data.response,
    };
  } catch (e) {
    console.log("Error in GoodyApi:", e);
    return {
      hasil: false,
      output: null,
    };
  }
};
const RnsChat = async (query) => {
  try {
    const response = await fetch("https://api.rns.chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: query,
        model: "gpt-3.5-turbo",
        temperature: 0.5,
      }),
    });
    if (!response.ok)
      return {
        hasil: false,
        output: null,
      };
    const data = await response.json();
    return {
      hasil: true,
      output: data.choices[0]?.text,
    };
  } catch (e) {
    console.log("Error in RnsChat:", e);
    return {
      hasil: false,
      output: null,
    };
  }
};
const Widipe = async (query) => {
  try {
    const response = await fetch(`https://widipe.com/openai?text=${query}`);
    if (!response.ok)
      return {
        hasil: false,
        output: null,
      };
    const data = await response.json();
    return {
      hasil: true,
      output: data.result,
    };
  } catch (e) {
    console.log("Error in Widipe:", e);
    return {
      hasil: false,
      output: null,
    };
  }
};
const Andrie = async (query) => {
  try {
    const response = await fetch(
      `https://andrie.vercel.app/api/gpt?query=${query}`,
    );
    if (!response.ok)
      return {
        hasil: false,
        output: null,
      };
    const data = await response.json();
    return {
      hasil: true,
      output: data.result,
    };
  } catch (e) {
    console.log("Error in Andrie:", e);
    return {
      hasil: false,
      output: null,
    };
  }
};
const Llm = async (query) => {
  try {
    const response = await fetch(
      `https://llm-chat.vercel.app/api?text=${query}`,
    );
    if (!response.ok)
      return {
        hasil: false,
        output: null,
      };
    const data = await response.text();
    return {
      hasil: true,
      output: data,
    };
  } catch (e) {
    console.log("Error in Llm:", e);
    return {
      hasil: false,
      output: null,
    };
  }
};
const BetaAi = async (query) => {
  try {
    const response = await fetch(
      `https://tools.betabotz.eu.org/tools/openai?q=${query}`,
    );
    if (!response.ok)
      return {
        hasil: false,
        output: null,
      };
    const data = await response.json();
    return {
      hasil: true,
      output: data.result,
    };
  } catch (e) {
    console.log("Error in Llm:", e);
    return {
      hasil: false,
      output: null,
    };
  }
};
const gipiti4 = async (content) => {
  try {
    const response = await fetch("https://gipiti.app/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messages: [
          {
            role: "user",
            content: content,
          },
        ],
        stream: false,
        model: "gpt-3.5-turbo",
        temperature: 0.5,
        presence_penalty: 0,
        frequency_penalty: 0,
        top_p: 1,
      }),
    });
    if (!response.ok)
      return {
        hasil: false,
        output: null,
      };
    const text = await response.json();
    return {
      hasil: true,
      output: text.choices[0]?.message.content,
    };
  } catch (e) {
    console.log("Error in gipiti4:", e);
    return {
      hasil: false,
      output: null,
    };
  }
};
const AryaGpt = async (query) => {
  try {
    const response = await fetch("https://api.aryagpt.xyz/gpt", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: query,
      }),
    });
    if (!response.ok)
      return {
        hasil: false,
        output: null,
      };
    const data = await response.json();
    return {
      hasil: true,
      output: data.text,
    };
  } catch (e) {
    console.log("Error in AryaGpt:", e);
    return {
      hasil: false,
      output: null,
    };
  }
};
const AryaGptV2 = async (query) => {
  try {
    const response = await fetch("https://api.aryagpt.xyz/gpt-v2", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: query,
      }),
    });
    if (!response.ok)
      return {
        hasil: false,
        output: null,
      };
    const data = await response.json();
    return {
      hasil: true,
      output: data.text,
    };
  } catch (e) {
    console.log("Error in AryaGptV2:", e);
    return {
      hasil: false,
      output: null,
    };
  }
};
const RapidGpt = async (query) => {
  try {
    const response = await fetch("https://api.rapidgpt.xyz/completion", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: query,
        model: "gpt-3.5-turbo",
      }),
    });
    if (!response.ok)
      return {
        hasil: false,
        output: null,
      };
    const data = await response.json();
    return {
      hasil: true,
      output: data.choices[0]?.text,
    };
  } catch (e) {
    console.log("Error in RapidGpt:", e);
    return {
      hasil: false,
      output: null,
    };
  }
};
