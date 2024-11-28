import fetch from "node-fetch";
import { pickRandom } from "../../lib/other-function.js";
class SunoAi {
  constructor() {
    this.apiKey = pickRandom([
      "VCwrNNJ1msu3dOQmGr46AM3WLxoecqLl",
      "bw0f/AFAdYQ3QVX3ZkM9ZrnncYH/iCRl",
    ]);
    this.endpoint = "https://api.sunoaiapi.com/api/v1/";
    this.headers = {
      "api-key": this.apiKey,
      "Content-Type": "application/json",
    };
  }
  async createMusicTask({ title = "", tags = [], prompt = "", model }) {
    try {
      const data = {
        title: title,
        tags: Array.isArray(tags) ? tags.join(",") : tags,
        prompt: prompt,
        mv: model,
      };
      const response = await fetch(this.endpoint + "/gateway/generate/music", {
        method: "POST",
        headers: this.headers,
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return await response.json();
    } catch (error) {
      return {
        error: `HTTP ${error.message}`,
      };
    }
  }
  async queryResult(ids) {
    try {
      const response = await fetch(
        `${this.endpoint}/gateway/query?ids=${ids}`,
        {
          method: "GET",
          headers: this.headers,
        },
      );
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return await response.json();
    } catch (error) {
      return {
        error: `HTTP ${error.message}`,
      };
    }
  }
  async generateMusic({
    title = "",
    tags = [],
    prompt = "",
    model = "chirp-v3-5",
  }) {
    try {
      const tasks = await this.createMusicTask({
        title: title,
        tags: tags,
        prompt: prompt,
        model: model,
      });
      const ids = tasks?.data?.map((task) => task.song_id);
      let allResolved = false;
      const timeout = Date.now() + 12e4;
      while (!allResolved && Date.now() < timeout) {
        const results = await this.queryResult(ids[0]);
        if (results.length) {
          allResolved = results[0]?.status === "complete" ? true : false;
        }
        if (allResolved) return results;
        await new Promise((resolve) => setTimeout(resolve, 2e3));
      }
      return {
        error: "Poling timeout. Coba lagi nanti.",
      };
    } catch (error) {
      return {
        error: `HTTP ${error.message}`,
      };
    }
  }
}
const handler = async (m, { conn, args, usedPrefix, command }) => {
  if (!db.data.dbai.SunoAi) db.data.dbai.SunoAi = {};
  let inputText = args.length
    ? args.join(" ")
    : m.quoted?.text || m.quoted?.caption || m.quoted?.description || null;
  if (!inputText) {
    return m.reply(
      `Masukkan teks atau reply pesan dengan teks yang ingin diolah.\nContoh penggunaan:\n*${usedPrefix}${command} Hai, apa kabar?*`,
    );
  }
  const styleMatch = inputText.match(/--style=([^]+)$/);
  const style = styleMatch?.[1]?.trim() ? styleMatch[1].trim() : null;
  const inputTextClean = styleMatch?.[1]?.trim()
    ? inputText.replace(/--style=[^]+$/, "")?.trim()
    : inputText.trim();
  m.react(wait);
  try {
    const sunoAi = new SunoAi();
    const answer = await sunoAi.generateMusic({
      title: `${inputTextClean?.split(" ")[0]} by ${m.name}`,
      tags: style,
      prompt: inputTextClean,
      model: "chirp-v3-5",
    });
    const result = answer[0];
    const infoReply = {
      contextInfo: {
        mentionedJid: [m.sender],
      },
    };
    await conn.reply(
      m.chat,
      `*\`SunoAi\`*\n🔗 *Model:* ${result.model_name}\n🎵 *Judul:* ${result.title}\n📅 *Dibuat:* ${result.created_at}\n🎶 *Durasi:* ${result.meta_data.duration} detik\n🎧 *Tags:* ${result.meta_data.tags}`,
      m,
      infoReply,
    );
    const {
      key: { id: keyId },
    } = await conn.sendMessage(
      m.chat,
      {
        audio: {
          url: result.audio_url,
        },
        mimetype: "audio/mp4",
      },
      {
        quoted: m,
      },
    );
    db.data.dbai.SunoAi[m.sender] = {
      key: {
        id: keyId,
      },
    };
    m.react(sukses);
  } catch (error) {
    console.error("Handler error:", error);
    m.react(eror);
  }
};
handler.before = async (m, { conn }) => {
  if (!db.data.dbai.SunoAi || m.isBaileys || !(m.sender in db.data.dbai.SunoAi))
    return;
  const {
    key: { id: keyId },
  } = db.data.dbai.SunoAi[m.sender];
  if (m.quoted?.id === keyId && m.text.trim()) {
    const styleMatch = m.text.trim().match(/--style=([^]+)$/);
    const style = styleMatch?.[1]?.trim() ? styleMatch[1].trim() : null;
    const inputTextClean = styleMatch?.[1]?.trim()
      ? m.text
          .trim()
          .replace(/--style=[^]+$/, "")
          ?.trim()
      : m.text.trim();
    m.react(wait);
    try {
      const sunoAi = new SunoAi();
      const answer = await sunoAi.generateMusic({
        title: `${inputTextClean?.split(" ")[0]} by ${m.name}`,
        tags: style,
        prompt: inputTextClean,
        model: "chirp-v3-5",
      });
      const result = answer[0];
      const infoReply = {
        contextInfo: {
          mentionedJid: [m.sender],
        },
      };
      await conn.reply(
        m.chat,
        `*\`SunoAi\`*\n🔗 *Model:* ${result.model_name}\n🎵 *Judul:* ${result.title}\n📅 *Dibuat:* ${result.created_at}\n🎶 *Durasi:* ${result.meta_data.duration} detik\n🎧 *Tags:* ${result.meta_data.tags}`,
        m,
        infoReply,
      );
      const {
        key: { id: newKeyId },
      } = await conn.sendMessage(
        m.chat,
        {
          audio: {
            url: result.audio_url,
          },
          mimetype: "audio/mp4",
        },
        {
          quoted: m,
        },
      );
      db.data.dbai.SunoAi[m.sender].key.id = newKeyId;
      m.react(sukses);
    } catch (error) {
      console.error("Handler before error:", error);
      m.react(eror);
    }
  }
};
handler.help = ["sunoai"];
handler.tags = ["ai"];
handler.command = /^(sunoai)$/i;
export default handler;
