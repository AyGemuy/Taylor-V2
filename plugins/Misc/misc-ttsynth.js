import fetch from "node-fetch";
class Ttsynth {
  constructor() {
    this.url = "https://ttsynthcom.erweima.ai/api/v1/generate/audio";
    this.headers = {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
      uniqueId: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      "User-Agent": "Mozilla/5.0 (Linux; Android 10; K)",
      Referer: "https://ttsynth.com/id?ref=taaft",
    };
  }
  async create(contentText, languageId = "id-id", voiceId = 729) {
    try {
      const res = await fetch(this.url, {
        method: "POST",
        headers: this.headers,
        body: JSON.stringify({
          contentText: contentText,
          languageId: languageId,
          voiceId: voiceId,
        }),
      });
      const result = await res.json();
      return result?.code === 200
        ? result.data?.id
        : Promise.reject(result?.msg || "Error");
    } catch (err) {
      throw new Error(`Create Error: ${err.message}`);
    }
  }
  async poll(recordId, timeout = 6e4, interval = 2e3) {
    try {
      const end = Date.now() + timeout;
      while (Date.now() < end) {
        const res = await fetch(
          `https://ttsynthcom.erweima.ai/api/v1/generate/getGenerateRecordDetail?recordId=${recordId}`,
          {
            headers: this.headers,
          },
        );
        const result = await res.json();
        if (result?.data?.state === "success") return result.data.url;
        if (result?.data?.state === "fail") throw new Error("Failed");
        await new Promise((r) => setTimeout(r, interval));
      }
      throw new Error("Timeout");
    } catch (err) {
      throw new Error(`Poll Error: ${err.message}`);
    }
  }
  async generate(contentText = "Haloo!", languageId = "id-id", voiceId = 729) {
    try {
      const id = await this.create(contentText, languageId, voiceId);
      return await this.poll(id);
    } catch (err) {
      throw new Error(`Generate Error: ${err.message}`);
    }
  }
}
const handler = async (m, { command, usedPrefix, conn, text }) => {
  const ttsynth = new Ttsynth();
  const regexLang = /--lang=([\w-]+)/i;
  const regexId = /--id=(\d+)/i;
  const langMatch = text.match(regexLang);
  const idMatch = text.match(regexId);
  const languageId = langMatch ? langMatch[1] : "id-id";
  const voiceId = idMatch ? parseInt(idMatch[1], 10) : 729;
  const query = text.replace(regexLang, "").replace(regexId, "").trim();
  if (!query)
    return m.reply(
      "Input query!\n*Example:*\n" +
        usedPrefix +
        command +
        " [query] --lang=id-id --id=769",
    );
  m.react(wait);
  try {
    const audioUrl = await ttsynth.generate(query, languageId, voiceId);
    await conn.sendFile(m.chat, audioUrl, "audio.mp3", "", m, true, {
      mimetype: "audio/mp4",
      ptt: true,
      waveform: [100, 0, 100, 0, 100, 0, 100],
      contextInfo: {
        mentionedJid: [m.sender],
      },
    });
  } catch (e) {
    console.error(e);
    m.react(eror);
  }
};
handler.help = ["ttsynth [query]"];
handler.tags = ["misc"];
handler.command = /^(ttsynth)$/i;
export default handler;
