import uploadFile from "../../lib/uploadFile.js";
import fetch from "node-fetch";
const API_URL = "https://cococlip.ai/api/v1";
const HEADERS = {
  "User-Agent":
    "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Mobile Safari/537.36",
  Referer: "https://cococlip.ai/features/image-to-prompt",
};
const TIMEOUT = 12e4;
const POLL_INTERVAL = 2e3;
const handler = async (m, { command, usedPrefix, conn }) => {
  const q = m.quoted || m;
  const mime = (q.msg || q).mimetype || "";
  const imageRegex = /image\/(png|jpeg|jpg)/i;
  if (!imageRegex.test(mime))
    return m.reply("Hanya format PNG, JPG, atau JPEG yang diterima.");
  m.react(wait);
  try {
    const media = await q.download();
    const link = await uploadFile(media, 5);
    const prompt = await getImagePrompt(link);
    return m.reply(
      prompt || "Tidak ada respons dari OpenAI atau terjadi kesalahan.",
    );
    m.react(sukses);
  } catch (error) {
    console.error("Error in handler:", error);
    m.react(error);
  }
};
handler.help = ["cococlip (Balas foto)"];
handler.tags = ["tools"];
handler.command = /^(cococlip)$/i;
handler.limit = true;
export default handler;
async function getImagePrompt(imageUrl) {
  try {
    const response1 = await fetch(
      `${API_URL}/imagetoprompt/imageclip?image=${encodeURIComponent(imageUrl)}`,
      {
        method: "GET",
        headers: HEADERS,
      },
    );
    const { id: promptId } = await response1.json();
    if (!promptId) throw new Error("Failed to retrieve promptId");
    const startTime = Date.now();
    while (Date.now() - startTime < TIMEOUT) {
      const response2 = await fetch(
        `${API_URL}/checkqueue?promptId=${promptId}`,
        {
          method: "GET",
          headers: HEADERS,
        },
      );
      const { nums } = await response2.json();
      if (nums === 0) {
        const response3 = await fetch(
          `${API_URL}/imagetoprompt/imageclippoll?promptId=${promptId}`,
          {
            method: "GET",
            headers: HEADERS,
          },
        );
        const { prompt } = await response3.json();
        if (prompt) return prompt;
      }
      await new Promise((resolve) => setTimeout(resolve, POLL_INTERVAL));
    }
    throw new Error("Polling timed out for final result");
  } catch (error) {
    console.error("Error in getImagePrompt:", error);
    throw error;
  }
}
