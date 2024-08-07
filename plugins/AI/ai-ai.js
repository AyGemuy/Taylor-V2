import {
  AI
} from "../../lib/ai/aichat.js";
import _ from "lodash";
const aiClient = new AI();
const commands = [{
  regex: /^(cgtai)$/i,
  method: "CgtAi",
  help: "cgtai",
  isJson: false
}, {
  regex: /^(goodyai)$/i,
  method: "GoodyAI",
  help: "goodyai",
  isJson: false
}, {
  regex: /^(leptonai)$/i,
  method: "leptonAi",
  help: "leptonai",
  isJson: false
}, {
  regex: /^(letmegpt)$/i,
  method: "LetmeGpt",
  help: "letmegpt",
  isJson: false
}, {
  regex: /^(thinkany)$/i,
  method: "thinkany",
  help: "thinkany",
  isJson: false
}, {
  regex: /^(useadrenaline)$/i,
  method: "useadrenaline",
  help: "useadrenaline",
  isJson: false
}, {
  regex: /^(degreeguru)$/i,
  method: "degreeguru",
  help: "degreeguru",
  isJson: false
}, {
  regex: /^(ragbot)$/i,
  method: "ragbot",
  help: "ragbot",
  isJson: false
}, {
  regex: /^(stoicai)$/i,
  method: "stoicai",
  help: "stoicai",
  isJson: false
}, {
  regex: /^(stoicgpt)$/i,
  method: "stoicgpt",
  help: "stoicgpt",
  isJson: false
}, {
  regex: /^(omniplex)$/i,
  method: "omniplexAi",
  help: "omniplex",
  isJson: true
}];
const handler = async (m, {
  args,
  command,
  usedPrefix
}) => {
  const matchedCommand = _.find(commands, cmd => cmd.regex.test(command));
  if (!matchedCommand) {
    return m.reply(`Command tidak dikenali. Gunakan salah satu dari: ${_.map(commands, "help").join(", ")}.`);
  }
  const text = args.length >= 1 ? args.join(" ") : _.get(m, "quoted.text") || _.get(m, "quoted.caption") || _.get(m, "quoted.description") || null;
  if (!text) {
    return m.reply(`Masukkan teks atau reply pesan dengan teks yang ingin diolah.\nContoh penggunaan:\n*${usedPrefix}${matchedCommand.help} Hai, apa kabar?*`);
  }
  m.react(wait);
  try {
    const chatGPTResponse = await aiClient[matchedCommand.method](encodeURIComponent(text));
    return m.reply(matchedCommand.isJson ? chatGPTResponse.data : chatGPTResponse);
  } catch (error) {
    console.error("Error:", error);
    m.react(eror);
  }
};
handler.tags = ["ai"];
handler.command = /^(cgtai|goodyai|leptonai|letmegpt|thinkany|useadrenaline|degreeguru|ragbot|stoicgpt|stoicai|omniplex)$/i;
handler.help = ["cgtai", "goodyai", "leptonai", "letmegpt", "thinkany", "useadrenaline", "degreeguru", "ragbot", "stoicgpt", "stoicai", "omniplex"];
export default handler;