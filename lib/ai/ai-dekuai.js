class dekuaiApi {
  constructor(baseUrl = "https://joshweb.click") {
    this.baseUrl = baseUrl;
    this.endpoints = {
      tiktokdl: {
        path: "/tiktokdl",
        params: ["url"]
      },
      "api/instadl": {
        path: "/api/instadl",
        params: ["url"]
      },
      facebook: {
        path: "/facebook",
        params: ["url"]
      },
      "api/fbdl2": {
        path: "/api/fbdl2",
        params: ["url"]
      },
      ytdl: {
        path: "/ytdl",
        params: ["url"]
      },
      spotify: {
        path: "/spotify",
        params: ["q"]
      },
      "api/spotify2": {
        path: "/api/spotify2",
        params: ["q"]
      },
      capcut: {
        path: "/capcut",
        params: ["url"]
      },
      "api/scdl": {
        path: "/api/scdl",
        params: ["q"]
      },
      "api/playstore": {
        path: "/api/playstore",
        params: ["q"]
      },
      "search/lyrics": {
        path: "/search/lyrics",
        params: ["q"]
      },
      "search/spotify": {
        path: "/search/spotify",
        params: ["q"]
      },
      "api/findsong": {
        path: "/api/findsong",
        params: ["lyrics"]
      },
      bibles: {
        path: "/bibles",
        params: ["verse"]
      },
      "search/chords": {
        path: "/search/chords",
        params: ["q"]
      },
      "api/ringtone": {
        path: "/api/ringtone",
        params: ["q"]
      },
      "api/wikimedia": {
        path: "/api/wikimedia",
        params: ["q"]
      },
      "api/wallpaper": {
        path: "/api/wallpaper",
        params: ["q"]
      },
      "api/wallpaper2": {
        path: "/api/wallpaper2",
        params: ["q"]
      },
      "api/scsearch": {
        path: "/api/scsearch",
        params: ["q"]
      },
      "api/pinterest": {
        path: "/api/pinterest",
        params: ["q"]
      },
      "api/cyberchrono": {
        path: "/api/cyberchrono",
        params: ["q"]
      },
      gpt4: {
        path: "/gpt4",
        params: ["prompt", "uid"]
      },
      "api/gpt-4o": {
        path: "/api/gpt-4o",
        params: ["q", "uid"]
      },
      "new/gpt-3_5-turbo": {
        path: "/new/gpt-3_5-turbo",
        params: ["prompt"]
      },
      gpt3: {
        path: "/gpt3",
        params: ["prompt", "uid"]
      },
      "api/palm2": {
        path: "/api/palm2",
        params: ["q"]
      },
      blackbox: {
        path: "/blackbox",
        params: ["prompt"]
      },
      "api/blackboxai": {
        path: "/api/blackboxai",
        params: ["q", "uid"]
      },
      "api/mixtral-8b": {
        path: "/api/mixtral-8b",
        params: ["q"]
      },
      "api/catgpt": {
        path: "/api/catgpt",
        params: ["prompt"]
      },
      "api/nous-hermes-2": {
        path: "/api/nous-hermes-2",
        params: ["q"]
      },
      "api/gemma-7b": {
        path: "/api/gemma-7b",
        params: ["q"]
      },
      "api/llama-3-70b": {
        path: "/api/llama-3-70b",
        params: ["q"]
      },
      "api/codestral": {
        path: "/api/codestral",
        params: ["q"]
      },
      "api/codegpt": {
        path: "/api/codegpt",
        params: ["type", "lang"]
      },
      "api/claude-3": {
        path: "/api/claude-3",
        params: ["q"]
      },
      "api/ask": {
        path: "/api/ask",
        params: ["q"]
      },
      "new/gemini": {
        path: "/new/gemini",
        params: ["prompt"]
      },
      gemini: {
        path: "/gemini",
        params: ["prompt", "url"]
      },
      "api/gemini-1.5-pro": {
        path: "/api/gemini-1.5-pro",
        params: ["q"]
      },
      "api/deepseek": {
        path: "/api/deepseek",
        params: ["q"]
      },
      "api/liner": {
        path: "/api/liner",
        params: ["q"]
      },
      "api/nemotron": {
        path: "/api/nemotron",
        params: ["q"]
      },
      "api/wizardlm": {
        path: "/api/wizardlm",
        params: ["q"]
      },
      "ai/deepseek-coder": {
        path: "/ai/deepseek-coder",
        params: ["q"]
      },
      "ai/discolm-german": {
        path: "/ai/discolm-german",
        params: ["q"]
      },
      "ai/llama-3-8b": {
        path: "/ai/llama-3-8b",
        params: ["q"]
      },
      "ai/neural-chat-7b": {
        path: "/ai/neural-chat-7b",
        params: ["q"]
      },
      "ai/openchat-3.5": {
        path: "/ai/openchat-3.5",
        params: ["q"]
      },
      "ai/openhermes-2.5": {
        path: "/ai/openhermes-2.5",
        params: ["q"]
      },
      "ai/phi-2": {
        path: "/ai/phi-2",
        params: ["q"]
      },
      "ai/qwen1.5-14b": {
        path: "/ai/qwen1.5-14b",
        params: ["q"]
      },
      "ai/starling-lm-7b": {
        path: "/ai/starling-lm-7b",
        params: ["q"]
      },
      "ai/tinyllama": {
        path: "/ai/tinyllama",
        params: ["q"]
      },
      "ai/zephyr-7b": {
        path: "/ai/zephyr-7b",
        params: ["q"]
      },
      "ai/hermes-2-pro": {
        path: "/ai/hermes-2-pro",
        params: ["q"]
      },
      "ai/nemotron": {
        path: "/ai/nemotron",
        params: ["q"]
      },
      "ai/wizardlm": {
        path: "/ai/wizardlm",
        params: ["q"]
      },
      "api/copilot": {
        path: "/api/copilot",
        params: ["prompt", "uid"]
      },
      maker: {
        path: "/maker",
        params: ["type", "url", "q", "q2"]
      },
      "pai/deku": {
        path: "/pai/deku",
        params: ["q", "uid"]
      },
      "pai/gojo": {
        path: "/pai/gojo",
        params: ["q", "uid"]
      },
      "pai/sukuna": {
        path: "/pai/sukuna",
        params: ["q", "uid"]
      },
      "pai/rimuru": {
        path: "/pai/rimuru",
        params: ["q", "uid"]
      },
      "pai/cid": {
        path: "/pai/cid",
        params: ["q", "uid"]
      },
      "pai/luffy": {
        path: "/pai/luffy",
        params: ["q", "uid"]
      },
      "pai/rudeus": {
        path: "/pai/rudeus",
        params: ["q", "uid"]
      },
      "pai/ichigo": {
        path: "/pai/ichigo",
        params: ["q", "uid"]
      },
      "pai/naruto": {
        path: "/pai/naruto",
        params: ["q", "uid"]
      },
      "pai/boruto": {
        path: "/pai/boruto",
        params: ["q", "uid"]
      },
      "cai/create": {
        path: "/cai/create",
        params: ["name", "prompt", "uid"]
      },
      "cai/chat": {
        path: "/cai/chat",
        params: ["q", "character", "uid"]
      },
      dreamshaper: {
        path: "/dreamshaper",
        params: ["prompt"]
      },
      openjourney: {
        path: "/openjourney",
        params: ["prompt"]
      },
      aigen: {
        path: "/aigen",
        params: ["prompt"]
      },
      sdxl: {
        path: "/sdxl",
        params: ["q", "style"]
      },
      "sdxl/list": {
        path: "/sdxl/list",
        params: []
      },
      dalle: {
        path: "/dalle",
        params: ["prompt"]
      },
      dallemini: {
        path: "/dallemini",
        params: ["prompt"]
      },
      emi: {
        path: "/emi",
        params: ["prompt"]
      },
      "prn/home": {
        path: "/prn/home",
        params: []
      },
      "prn/search": {
        path: "/prn/search",
        params: ["/"]
      },
      "prn/download": {
        path: "/prn/download",
        params: ["url"]
      },
      "eprnr/home": {
        path: "/eprnr/home",
        params: []
      },
      "eprnr/category": {
        path: "/eprnr/category",
        params: []
      },
      "eprnr/search": {
        path: "/eprnr/search",
        params: ["q"]
      },
      "api/randhntai": {
        path: "/api/randhntai",
        params: []
      },
      "api/nhntais": {
        path: "/api/nhntais",
        params: ["q"]
      },
      "api/nhntaidl": {
        path: "/api/nhntaidl",
        params: ["q"]
      },
      "api/randgre": {
        path: "/api/randgre",
        params: []
      },
      "api/sgore": {
        path: "/api/sgore",
        params: ["q"]
      },
      "api/xsearch": {
        path: "/api/xsearch",
        params: ["q"]
      },
      "api/xdl": {
        path: "/api/xdl",
        params: ["q"]
      },
      "canvas/search": {
        path: "/canvas/search",
        params: ["id"]
      },
      "canvas/fbcover": {
        path: "/canvas/fbcover",
        params: ["name", "subname", "sdt", "address", "email", "uid", "color"]
      },
      "canvas/fbcoverv2": {
        path: "/canvas/fbcoverv2",
        params: ["name", "id", "subname", "color"]
      },
      "canvas/fbcoverv3": {
        path: "/canvas/fbcoverv3",
        params: ["uid", "birthday", "love", "location", "hometown", "name", "follow", "gender"]
      },
      "canvas/avatar": {
        path: "/canvas/avatar",
        params: ["id", "bgname", "signature", "color"]
      },
      "canvas/welcome": {
        path: "/canvas/welcome",
        params: ["name", "groupname", "groupicon", "member", "uid", "background"]
      },
      "others/image/upload": {
        path: "/others/image/upload",
        params: ["url"]
      },
      "ai-detect": {
        path: "/ai-detect",
        params: ["q"]
      },
      iplu: {
        path: "/iplu",
        params: ["ip"]
      },
      "api/baybay": {
        path: "/api/baybay",
        params: ["q"]
      },
      "api/font": {
        path: "/api/font",
        params: ["q"]
      },
      emoji2gif: {
        path: "/emoji2gif",
        params: ["q"]
      },
      "new/voicevox-synthesis": {
        path: "/new/voicevox-synthesis",
        params: ["id", "text"]
      },
      "new/voicevox-speaker": {
        path: "/new/voicevox-speaker",
        params: []
      },
      remini: {
        path: "/remini",
        params: ["q"]
      },
      "new/api/get-character": {
        path: "/new/api/get-character",
        params: ["query"]
      },
      "tempmail/create": {
        path: "/tempmail/create",
        params: []
      },
      "tempmail/inbox": {
        path: "/tempmail/inbox",
        params: ["email"]
      },
      getcookie: {
        path: "/getcookie",
        params: ["email", "password"]
      },
      smsb: {
        path: "/smsb",
        params: ["number", "amount", "delay"]
      },
      deku: {
        path: "/deku",
        params: ["prompt"]
      },
      bing: {
        path: "bing",
        params: ["prompt", "mode"]
      },
      gptweb: {
        path: "/gptweb",
        params: ["prompt"]
      },
      "api/ai-gf": {
        path: "/api/ai-gf",
        params: ["q"]
      },
      "api/genmicro": {
        path: "/api/genmicro",
        params: ["name"]
      },
      stalkgh: {
        path: "/stalkgh",
        params: ["username"]
      },
      cdp: {
        path: "/cdp",
        params: []
      },
      catfact: {
        path: "/catfact",
        params: []
      },
      dogfact: {
        path: "/dogfact",
        params: []
      },
      genderize: {
        path: "/genderize",
        params: ["name"]
      },
      insult: {
        path: "/insult",
        params: []
      },
      quotes: {
        path: "/quotes",
        params: []
      },
      bible: {
        path: "/bible",
        params: []
      },
      "api/ml": {
        path: "/api/ml",
        params: ["id", "serverid"]
      },
      "api/mlhero": {
        path: "/api/mlhero",
        params: ["q"]
      }
    };
  }
  async api(endpoint, params) {
    const endpointInfo = this.endpoints[endpoint];
    if (!endpointInfo) throw new Error("Endpoint not found");
    const {
      path,
      params: requiredParams
    } = endpointInfo;
    if (!params || typeof params !== "object") throw new Error("Parameters must be provided as an object");
    for (const param of requiredParams) {
      if (!(param in params)) throw new Error(`Missing required parameter: ${param}`);
    }
    const queryParams = params.hasOwnProperty("/") ? `/${params["/"]}` : "?" + new URLSearchParams(params).toString();
    const fullUrl = `${this.baseUrl}${path}${queryParams}`;
    try {
      const response = await fetch(fullUrl);
      if (!response.ok) throw new Error("Network response was not ok");
      const contentType = response.headers.get("content-type");
      if (contentType.includes("application/json")) return await response.json();
      if (contentType.includes("text")) return await response.text();
      if (contentType.includes("application/octet-stream")) return await response.arrayBuffer();
      throw new Error("Unsupported content type: " + contentType);
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  }
}
export const dekuai = new dekuaiApi();