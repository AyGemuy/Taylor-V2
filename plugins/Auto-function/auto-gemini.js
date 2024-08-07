import {
  fetch
} from "undici";
import {
  Gemini
} from "../../lib/ai/gemini.js";
export async function before(m) {
  try {
    if (m.isBaileys && m.fromMe) return true;
    if (!m.isGroup || !m.msg || !m.message || m.key.remoteJid !== m.chat || db.data.users[m.sender].banned || db.data.chats[m.chat].isBanned) return false;
    const gemini = new Gemini("__Secure-1PSID", "g.a000kAizwbBdNbMHiOjpi3wG6gRWpkyc_b7CpDipldhMCt_UJIpDxrcWnqL7c6jCY-ooclL3NwACgYKAXgSARMSFQHGX2MiZAtXZ3cvSt7VxKSgDFmGzxoVAUF8yKqiRmRoIsjmTMIJrvT-Pm6l0076");
    const {
      users,
      chats
    } = db.data;
    const {
      text,
      quoted
    } = m;
    if (["protocolMessage", "pollUpdateMessage", "reactionMessage", "stickerMessage"].includes(m.mtype)) return;
    if (!quoted || !quoted.isBaileys || !chats[m.chat].gemini) return true;
    const msg = encodeURIComponent(text);
    const candidates = await GoogleBard(msg);
    if (candidates) {
      m.reply(candidates);
    } else {
      const {
        result
      } = await AemtGemini(msg);
      if (result) {
        m.reply(result);
      }
    }
  } catch (error) {
    console.error(error);
  }
}
async function AemtGemini(query) {
  const bardRes = await fetch(`https://aemt.me/gemini?text=${query}`, {
    method: "GET",
    headers: {
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.114 Safari/537.36",
      "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
    }
  });
  return await bardRes.json();
}
async function GoogleBard(query) {
  try {
    return (await gemini.question(query)).content;
  } catch (error) {
    console.error("An error occurred:", error.message);
    throw error;
  }
}