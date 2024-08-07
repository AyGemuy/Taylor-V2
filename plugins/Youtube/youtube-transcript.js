import axios from "axios";
const apiInstance = axios.create({
  baseURL: "https://api.kome.ai",
  headers: {
    "Content-Type": "application/json",
    Referer: "https://api.kome.ai"
  }
});
const youtubeTranscript = async videoId => {
  try {
    const {
      data
    } = await apiInstance.post("/api/tools/youtube-transcripts", {
      video_id: videoId,
      format: true
    });
    return data.transcript || null;
  } catch (error) {
    console.error("Error with Kome API:", error);
    return null;
  }
};
const youtubeTranscriptV2 = async videoUrl => {
  try {
    const {
      data
    } = await axios.post("https://learnai-api.vercel.app/api/AI/getTranscript", {
      videoUrl: videoUrl
    }, {
      headers: {
        "Content-Type": "application/json"
      }
    });
    return data.text || "Transcript not found";
  } catch (error) {
    console.error("Error with alternative API:", error);
    return "Error fetching transcript from alternative source";
  }
};
const handler = async (m, {
  conn,
  args
}) => {
  try {
    const url = args.length ? args.join(" ") : m.quoted?.text || m.quoted?.caption || m.quoted?.description || null;
    if (!url || !url.match(/^https?:\/\/(www\.)?youtube\.com\/watch\?v=[a-zA-Z0-9_-]{11}$/)) {
      return m.reply(`Masukkan link YouTube yang valid.\nContoh penggunaan:\n*${usedPrefix}${command} https://youtube.com/watch?v=videoId*`);
    }
    const videoUrl = url.trim();
    let transcribe = await youtubeTranscript(videoUrl);
    if (!transcribe) {
      transcribe = await youtubeTranscriptV2(videoUrl);
    }
    m.reply(transcribe);
  } catch (error) {
    console.error("Error in handler:", error);
    m.reply("Error processing your request");
  }
};
handler.help = ["transkripyt"];
handler.tags = ["tools"];
handler.command = /^(transcriptsyt|transcriptsyoutube|transkripyt|transkripyoutube)$/i;
export default handler;