import { FormData, Blob } from "formdata-node";
import fetch from "node-fetch";
export async function all(m, chatUpdate) {
  if (m.isBaileys) return;
  if (!m.message) return;
  if (!m.message?.audioMessage) return;
  if (!db.data.chats[m.chat]?.cmdVn) return;
  try {
    const audioBuffer = await m?.download?.();
    if (!audioBuffer) return;
    const formData = new FormData();
    formData.append(
      "file",
      new Blob([audioBuffer], {
        type: "audio/mpeg",
      }),
      "audio.mp3",
    );
    formData.append("model", "whisper-1");
    formData.append("timestamp_granularities", JSON.stringify(["word"]));
    formData.append("response_format", "verbose_json");
    const res = await fetch("https://api.openai.com/v1/audio/transcriptions", {
      method: "POST",
      body: formData,
      headers: {
        Authorization: atob(
          "QmVhcmVyIHNrLVk0VUpIT096NUFpbjZSdGl4NHFHVDNCbGJrRkpqTU13bHVyYXdUek1LdGdxajE0cg==",
        ),
      },
    });
    const transcription = (await res.json())?.text;
    if (transcription)
      await this.appendTextMessage(
        m,
        m.prefix ? `${m.command?.[0]?.[0]}${transcription}` : transcription,
        chatUpdate,
      );
  } catch (error) {
    console.error(error);
    try {
      const audioUrl = await m?.upload?.();
      if (!audioUrl) return;
      const data = {
        model: "whisper-diarization",
        baseModel: "whisper-diarization",
        input: {
          settings: {
            character: "AI",
            responseMode: "text",
            voice: "tts-1:onyx",
            ttsSpeed: "1",
            imageModel: "sdxl",
          },
          file: audioUrl,
          num_speakers: "1",
          mode: "whisper-diarization",
        },
        subscribeId: "EbA1jgxfbnR-aWnoL1WpJ",
        instanceId: "2x1T7LmZLGhlMLBH45ede",
      };
      const response = await fetch(
        "https://app.giz.ai/api/data/users/inferenceServer.infer",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "User-Agent":
              "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Mobile Safari/537.36",
            Referer: "https://app.giz.ai/assistant/wiNK91UHyr2vGZdYU0pLG",
          },
          body: JSON.stringify(data),
        },
      );
      const jsonData = await response.json();
      const transcription = jsonData.output.segments[0]?.text;
      if (transcription)
        await this.appendTextMessage(
          m,
          m.prefix ? `${m.command?.[0]?.[0]}${transcription}` : transcription,
          chatUpdate,
        );
    } catch (error) {
      console.error(error);
    }
  }
}
