import fetch from "node-fetch";
class PaintByText {
  constructor() {
    this.url = "https://paintbytext.chat/api/predictions";
    this.headers = {
      "Content-Type": "application/json",
      "User-Agent":
        "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Mobile Safari/537.36",
      Referer:
        "https://paintbytext.chat/?ref=taaft&utm_source=taaft&utm_medium=referral",
    };
  }
  async create(imageBuffer, prompt = "4k", mimeType = "image/jpeg") {
    try {
      const imageDataUri = `data:${mimeType};base64,${imageBuffer.toString("base64")}`;
      const response = await fetch(this.url, {
        method: "POST",
        headers: this.headers,
        body: JSON.stringify({
          prompt: prompt,
          image: imageDataUri,
        }),
      });
      if (!response.ok)
        throw new Error(`Prediction request failed: ${response.status}`);
      const { id: predictionId } = await response.json();
      const maxPollingTime = Date.now() + 6e4;
      while (Date.now() < maxPollingTime) {
        const pollResponse = await fetch(`${this.url}/${predictionId}`, {
          method: "GET",
          headers: this.headers,
        });
        if (!pollResponse.ok)
          throw new Error(`Polling error: ${pollResponse.status}`);
        const pollResult = await pollResponse.json();
        if (pollResult.status === "succeeded") return pollResult;
        await new Promise((resolve) => setTimeout(resolve, 2e3));
      }
      throw new Error("Polling timed out after 1 minute");
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  }
}
const handler = async (m, { conn, args, usedPrefix, command }) => {
  const q = m.quoted || m;
  const mime = (q.msg || q).mimetype || "";
  if (!mime) return m.reply("Tidak ada media yang ditemukan");
  const media = await q.download();
  const text =
    args.length >= 1
      ? args.join(" ")
      : q?.text || q?.caption || q?.description || null;
  if (!text)
    return m.reply(
      `Masukkan teks atau reply pesan dengan teks yang ingin diolah.\nContoh penggunaan:\n*${usedPrefix}${command} Hai, apa kabar?*`,
    );
  m.react(wait);
  try {
    const paintByText = new PaintByText();
    const aiArt = await paintByText.create(media, text);
    if (aiArt.output) {
      for (const output of aiArt.output) {
        const tag = `@${m.sender.split("@")[0]}`;
        await conn.sendMessage(
          m.chat,
          {
            image: {
              url: output,
            },
            caption: `*Prompt:*\n- ${text}\n\n*Request:* ${tag}`,
            mentions: [m.sender],
          },
          {
            quoted: m,
          },
        );
        m.react(sukses);
      }
    } else {
      console.log("Tidak ada respons dari OpenAI atau terjadi kesalahan.");
    }
  } catch (error) {
    console.error("Terjadi kesalahan:", error);
    m.react(eror);
  }
};
handler.help = ["paintbytext"];
handler.tags = ["fun"];
handler.command = /^(paintbytext)$/i;
export default handler;
