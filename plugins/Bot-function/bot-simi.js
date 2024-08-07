import fetch from "node-fetch";
import {
  AI
} from "../../lib/ai/aichat.js";
import {
  tools
} from "../../lib/scraper/all/tools.js";
const ai = new AI();
export async function before(m) {
  if (m.isBaileys || !db.data.chats[m.chat].simi || !m.text) return !1;
  const text = m.text.replace(/[^\x00-\x7F]/g, "").trim();
  if (!text) return !1;
  try {
    const result = await tools.Simsimi(text) || await ai.Simsimi(text);
    if (result) {
      await this.reply(m.chat, `*Simsimi says:*\n${result}`, m);
      if ("SIMI STOP" === text.trim().toUpperCase()) {
        db.data.chats[m.chat].simi = !1;
        await this.reply(m.chat, "*Simi stop success*", m);
      }
      return !0;
    }
  } catch (error) {
    console.error("Error using AI library:", error);
  }
  const urls = [`https://api.simsimi.net/v2/?text=${encodeURIComponent(text)}&lc=id`, `http://api.brainshop.ai/get?bid=153868&key=rcKonOgrUFmn5usX&uid=1&msg=${encodeURIComponent(text)}`];
  for (const url of urls) {
    try {
      const api = await fetch(url);
      const res = await api.json();
      if (res.success || res.cnt) {
        await this.reply(m.chat, `*Simi says:*\n${res.success || res.cnt}`, m);
        if ("SIMI STOP" === text.trim().toUpperCase()) {
          db.data.chats[m.chat].simi = !1;
          await this.reply(m.chat, "*Simi stop success*", m);
        }
        return !0;
      }
    } catch (error) {
      continue;
    }
  }
  await this.reply(m.chat, "*Simi error*", m);
  return !0;
}