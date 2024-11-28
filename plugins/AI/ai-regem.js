import fetch from "node-fetch";
import * as cheerio from "cheerio";
class Regem {
  constructor() {
    this.baseUrl = "https://lusion.regem.in";
    this.aiServerUrl = "https://ai-server.regem.in/api";
  }
  async flux(prompt) {
    try {
      const url = `${this.baseUrl}/access/flux.php?prompt=${prompt}`;
      const headers = {
        Accept: "*/*",
        "User-Agent":
          "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Mobile Safari/537.36",
        Referer: `${this.baseUrl}/?ref=taaft&utm_source=taaft&utm_medium=referral`,
      };
      const response = await fetch(url, {
        headers: headers,
      });
      const html = await response.text();
      const $ = cheerio.load(html);
      const fullImageLink = $("a.btn-navy.btn-sm.mt-2").attr("href");
      return fullImageLink ? `${fullImageLink}` : null;
    } catch (error) {
      console.error(`Error in flux: ${error}`);
      return null;
    }
  }
  async writer(input) {
    try {
      const url = `${this.aiServerUrl}/index.php`;
      const headers = {
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        Accept: "*/*",
        "User-Agent":
          "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Mobile Safari/537.36",
        Referer: "https://regem.in/ai-writer/",
      };
      const formData = new URLSearchParams();
      formData.append("input", input);
      const response = await fetch(url, {
        method: "POST",
        headers: headers,
        body: formData.toString(),
      });
      return await response.text();
    } catch (error) {
      console.error(`Error in writer: ${error}`);
      return null;
    }
  }
  async rephrase(input) {
    try {
      const url = `${this.aiServerUrl}/rephrase.php`;
      const headers = {
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        Accept: "*/*",
        "User-Agent":
          "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Mobile Safari/537.36",
        Referer: "https://regem.in/ai-rephrase-tool/",
      };
      const formData = new URLSearchParams();
      formData.append("input", input);
      const response = await fetch(url, {
        method: "POST",
        headers: headers,
        body: formData.toString(),
      });
      return await response.text();
    } catch (error) {
      console.error(`Error in rephrase: ${error}`);
      return null;
    }
  }
}
const handler = async (m, { conn, args, usedPrefix, command }) => {
  if (!db.data.dbai.regem) db.data.dbai.regem = {};
  const inputText = args.length
    ? args.join(" ")
    : m.quoted?.text || m.quoted?.caption || m.quoted?.description || null;
  if (!inputText) {
    return m.reply(
      `Masukkan teks atau reply pesan dengan teks yang ingin diolah.\nContoh penggunaan:\n*${usedPrefix}${command} Hai, apa kabar?*`,
    );
  }
  m.react(wait);
  try {
    const regem = new Regem();
    let answer;
    switch (command) {
      case "regemflux":
        answer = await regem.flux(inputText);
        break;
      case "regemwriter":
        answer = await regem.writer(inputText);
        break;
      case "regemrephrase":
        answer = await regem.rephrase(inputText);
        break;
      default:
        throw new Error(`Unknown command: ${command}`);
    }
    const {
      key: { id: keyId },
    } =
      command === "regemflux"
        ? await conn.sendMessage(
            m.chat,
            {
              image: {
                url: answer || thumb,
              },
              caption: `✨ *\`AI Image Generated\`* ✨\n\n📝 *Prompt:* ${inputText}`,
              mentions: [m.sender],
            },
            {
              quoted: m,
            },
          )
        : await conn.reply(m.chat, `${answer}`, m);
    db.data.dbai.regem[m.sender] = {
      key: {
        id: keyId,
      },
      cmd: command,
    };
    m.react(sukses);
  } catch (error) {
    console.error("Handler error:", error);
    m.react(eror);
  }
};
handler.before = async (m, { conn }) => {
  if (!db.data.dbai.regem || m.isBaileys || !(m.sender in db.data.dbai.regem))
    return;
  const {
    key: { id: keyId },
    cmd,
  } = db.data.dbai.regem[m.sender];
  if (m.quoted?.id === keyId && cmd && m.text.trim()) {
    m.react(wait);
    try {
      const regem = new Regem();
      let answer;
      switch (cmd) {
        case "regemflux":
          answer = await regem.flux(m.text.trim());
          break;
        case "regemwriter":
          answer = await regem.writer(m.text.trim());
          break;
        case "regemrephrase":
          answer = await regem.rephrase(m.text.trim());
          break;
        default:
          throw new Error(`Unknown command: ${m.text.trim()}`);
      }
      const {
        key: { id: newKeyId },
      } =
        cmd === "regemflux"
          ? await conn.sendMessage(
              m.chat,
              {
                image: {
                  url: answer || thumb,
                },
                caption: `✨ *\`AI Image Generated\`* ✨\n\n📝 *Prompt:* ${m.text.trim()}`,
                mentions: [m.sender],
              },
              {
                quoted: m,
              },
            )
          : await conn.reply(m.chat, `${answer}`, m);
      db.data.dbai.regem[m.sender].key.id = newKeyId;
      m.react(sukses);
    } catch (error) {
      console.error("Handler before error:", error);
      m.react(eror);
    }
  }
};
handler.help = ["regemflux", "regemwriter", "regemrephrase"];
handler.tags = ["ai"];
handler.command = /^(regemflux|regemwriter|regemrephrase)$/i;
export default handler;
