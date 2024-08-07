import {
  dekuai
} from "../../lib/ai/ai-dekuai.js";
import {
  v4 as uuid
} from "uuid";
const characters = {
  cyberchrono: {
    path: "api/cyberchrono",
    params: ["q"]
  },
  gpt4: {
    path: "gpt4",
    params: ["prompt", "uid"]
  },
  "gpt-4o": {
    path: "api/gpt-4o",
    params: ["q", "uid"]
  },
  "gpt-3_5-turbo": {
    path: "new/gpt-3_5-turbo",
    params: ["prompt"]
  },
  gpt3: {
    path: "gpt3",
    params: ["prompt", "uid"]
  },
  palm2: {
    path: "api/palm2",
    params: ["q"]
  },
  blackbox: {
    path: "blackbox",
    params: ["prompt"]
  },
  blackboxai: {
    path: "api/blackboxai",
    params: ["q", "uid"]
  },
  "mixtral-8b": {
    path: "api/mixtral-8b",
    params: ["q"]
  },
  catgpt: {
    path: "api/catgpt",
    params: ["prompt"]
  },
  "nous-hermes-2": {
    path: "api/nous-hermes-2",
    params: ["q"]
  },
  "gemma-7b": {
    path: "api/gemma-7b",
    params: ["q"]
  },
  "llama-3-70b": {
    path: "api/llama-3-70b",
    params: ["q"]
  },
  codestral: {
    path: "api/codestral",
    params: ["q"]
  },
  codegpt: {
    path: "api/codegpt",
    params: ["type", "lang"]
  },
  "claude-3": {
    path: "api/claude-3",
    params: ["q"]
  },
  ask: {
    path: "api/ask",
    params: ["q"]
  },
  gemini: {
    path: "new/gemini",
    params: ["prompt"]
  },
  "gemini-1.5-pro": {
    path: "api/gemini-1.5-pro",
    params: ["q"]
  },
  deepseek: {
    path: "api/deepseek",
    params: ["q"]
  },
  liner: {
    path: "api/liner",
    params: ["q"]
  },
  nemotron: {
    path: "api/nemotron",
    params: ["q"]
  },
  wizardlm: {
    path: "api/wizardlm",
    params: ["q"]
  },
  "deepseek-coder": {
    path: "ai/deepseek-coder",
    params: ["q"]
  },
  "discolm-german": {
    path: "ai/discolm-german",
    params: ["q"]
  },
  "llama-3-8b": {
    path: "ai/llama-3-8b",
    params: ["q"]
  },
  "neural-chat-7b": {
    path: "ai/neural-chat-7b",
    params: ["q"]
  },
  "openchat-3.5": {
    path: "ai/openchat-3.5",
    params: ["q"]
  },
  "openhermes-2.5": {
    path: "ai/openhermes-2.5",
    params: ["q"]
  },
  "phi-2": {
    path: "ai/phi-2",
    params: ["q"]
  },
  "qwen1.5-14b": {
    path: "ai/qwen1.5-14b",
    params: ["q"]
  },
  "starling-lm-7b": {
    path: "ai/starling-lm-7b",
    params: ["q"]
  },
  tinyllama: {
    path: "ai/tinyllama",
    params: ["q"]
  },
  "zephyr-7b": {
    path: "ai/zephyr-7b",
    params: ["q"]
  },
  "hermes-2-pro": {
    path: "ai/hermes-2-pro",
    params: ["q"]
  },
  copilot: {
    path: "api/copilot",
    params: ["prompt", "uid"]
  }
};
const handler = async (m, {
  conn,
  args,
  usedPrefix,
  command
}) => {
  const characterKey = command.replace(/^ai/, "").toLowerCase();
  const character = characters[characterKey];
  if (!character) {
    const availableCharacters = Object.keys(characters).map(char => `*${usedPrefix}ai${char}*`).join("\n");
    return m.reply(`AI '${characterKey}' tidak ditemukan.\n\nDaftar AI yang tersedia:\n${availableCharacters}\n\nContoh penggunaan:\n*${usedPrefix}${command} Hai, apa kabar?*`);
  }
  const text = args.length >= 1 ? args.join(" ") : m.quoted && (m.quoted.text || m.quoted.caption || m.quoted.description) || null;
  if (!text) {
    return m.reply(`Masukkan teks atau balas pesan dengan teks yang ingin diolah.\nContoh penggunaan:\n*${usedPrefix}${command} Hai, apa kabar?*`);
  }
  try {
    const params = character.params.reduce((acc, param) => {
      if (param === "q" || param === "prompt") acc[param] = text;
      else if (param === "uid") acc[param] = uuid();
      else if (param === "type") acc[param] = "default";
      else if (param === "lang") acc[param] = "en";
      return acc;
    }, {});
    const output = await dekuai.api(character.path, params);
    m.reply(output?.result);
  } catch (e) {
    console.error(e);
    m.reply("Terjadi kesalahan dalam pengolahan.");
  }
};
handler.help = ["aicyberchrono", "aigpt4", "aigpt-4o", "aigpt-3_5-turbo", "aigpt3", "aipalm2", "aiblackbox", "aiblackboxai", "aimixtral-8b", "aicatgpt", "ainous-hermes-2", "aigemma-7b", "aillama-3-70b", "aicodestral", "aicodegpt", "aiclaude-3", "aiask", "aigemini", "aigemini-1.5-pro", "aideepseek", "ailiner", "ainemotron", "aiwizardlm", "aideepseek-coder", "aidiscolm-german", "aillama-3-8b", "aineural-chat-7b", "aiopenchat-3.5", "aiopenhermes-2.5", "aiphi-2", "aiqwen1.5-14b", "aistarling-lm-7b", "aitinyllama", "aizephyr-7b", "aihermes-2-pro", "aicopilot"];
handler.tags = ["ai"];
handler.command = /^(ai(cyberchrono|gpt4|gpt-4o|gpt-3_5-turbo|gpt3|palm2|blackbox|blackboxai|mixtral-8b|catgpt|nous-hermes-2|gemma-7b|llama-3-70b|codestral|codegpt|claude-3|ask|gemini|gemini-1\.5-pro|deepseek|liner|nemotron|wizardlm|deepseek-coder|discolm-german|llama-3-8b|neural-chat-7b|openchat-3.5|openhermes-2.5|phi-2|qwen1.5-14b|starling-lm-7b|tinyllama|zephyr-7b|hermes-2-pro|copilot))$/i;
export default handler;