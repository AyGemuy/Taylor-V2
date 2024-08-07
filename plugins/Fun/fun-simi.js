import fetch from "node-fetch";
import {
  AI
} from "../../lib/ai/aichat.js";
import {
  tools
} from "../../lib/scraper/all/tools.js";
const ai = new AI();
const handler = async (m, {
  conn,
  usedPrefix,
  command,
  args
}) => {
  const text = args.length >= 1 ? args.join(" ") : m.quoted?.text || m.quoted?.caption || m.quoted?.description || null;
  if (!text) return m.reply(`Masukkan teks atau balas pesan dengan teks yang ingin diolah.\nContoh penggunaan:\n*${usedPrefix}${command} Hai, apa kabar?*`);
  try {
    const result = await tools.SimSimi(text);
    if (result) {
      m.reply(result, null, m.mentionedJid ? {
        mentions: conn.parseMention(m.text)
      } : {});
      return !0;
    }
  } catch (error) {
    try {
      const result = await ai.Simsimi(text);
      if (result) {
        m.reply(result, null, m.mentionedJid ? {
          mentions: conn.parseMention(m.text)
        } : {});
        return !0;
      }
    } catch (error) {
      console.error("Error using AI library:", error);
    }
  }
  const urls = [`https://api.simsimi.net/v2/?text=${encodeURIComponent(text)}&lc=id`, `http://api.brainshop.ai/get?bid=153868&key=rcKonOgrUFmn5usX&uid=1&msg=${encodeURIComponent(text)}`];
  for (const url of urls) {
    try {
      const api = await fetch(url);
      const res = await api.json();
      if (res.success || res.cnt) {
        m.reply(res.success || res.cnt, null, m.mentionedJid ? {
          mentions: conn.parseMention(m.text)
        } : {});
        return !0;
      }
    } catch (error) {
      continue;
    }
  }
};
handler.command = ["simi"], handler.tags = ["fun"], handler.help = ["simi <pesan>"];
export default handler;