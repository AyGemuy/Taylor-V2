import fetch from "node-fetch";
export async function before(m) {
  const chat = db.data.chats[m.chat];
  if (m.isBaileys || !m.text || !chat.autoGpt) return !1;
  let text = m.text;
  try {
    if (chat.autoGpt) {
      const result = await chatgpt(text);
      !0 === result.status && await this.sendMessage(m.chat, {
        text: result.result
      }, {
        quoted: m
      });
    }
  } catch {
    await this.reply(m.chat, "Error occurred.", m);
  }
}
export const disabled = !1;
async function chatgpt(input) {
  if (!input) return {
    status: !1,
    message: "No input.",
    contoh: "Halo"
  };
  const result = {
      status: !0,
      result: ""
    },
    apiEndpoints = [{
      url: "https://api-fgmods.ddns.net/api/info/openai2",
      processResponse: data => "error" !== data.result && "" !== data.result && void 0 !== data.result ? data.result : null
    }, {
      url: "https://vihangayt.me/tools/chatgpt?q=",
      processResponse: data => "error" !== data.data && "" !== data.data && void 0 !== data.data ? data.data : null
    }, {
      url: "https://vihangayt.me/tools/chatgpt2?q=",
      processResponse: data => "error" !== data.data && "" !== data.data && void 0 !== data.data ? data.data : null
    }, {
      url: "https://vihangayt.me/tools/chatgpt3?q=",
      processResponse: data => "error" !== data.data && "" !== data.data && void 0 !== data.data ? data.data : null
    }, {
      url: `https://api.lolhuman.xyz/api/openai?apikey=${Object.entries(APIKeys).find(([ key ]) => key.includes("lolhuman"))?.[1]}&text=`,
      processResponse: data => "error" !== data.result && "" !== data.result && void 0 !== data.result ? data.result : null
    }, {
      url: "https://api.ibeng.tech/api/others/chatgpt?q=",
      processResponse: data => {
        if ("error" !== data.data && "" !== data.data && void 0 !== data.data) {
          return data.data.trim();
        }
        return null;
      }
    }, {
      url: "https://api.akuari.my.id/ai/gpt?chat=",
      processResponse: data => "error" !== data.respon && "" !== data.respon && void 0 !== data.respon ? data.respon : null
    }, {
      url: "https://api.azz.biz.id/api/bard?q=",
      processResponse: data => "error" !== data.respon && "" !== data.respon && void 0 !== data.respon ? data.respon : null
    }];
  for (const endpoint of apiEndpoints) try {
    const response = await fetch(`${endpoint.url}${input}`);
    if (response.ok) {
      const responseData = await response.json();
      if (responseData) {
        const processedResult = endpoint.processResponse(responseData);
        if (processedResult) return result.result = processedResult.trim(), result;
      }
    }
  } catch (error) {}
  return result.status = !1, result.result = "Error", result;
}