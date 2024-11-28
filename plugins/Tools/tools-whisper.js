import { FormData, Blob } from "formdata-node";
import fetch from "node-fetch";
const handler = async (m, { command, usedPrefix, conn, text, args }) => {
  const q = m.quoted ? m.quoted : m;
  const mime = (q.msg || q).mimetype || "";
  if (!mime)
    return m.reply(
      "⚠️ Tidak ada media ditemukan. Silakan reply pada file audio.",
    );
  if (!/^audio\//.test(mime))
    return m.reply(
      "⚠️ Jenis audio tidak didukung. Silakan reply pada file audio.",
    );
  m.react(wait);
  try {
    const { output, provider } = await Whisper(m);
    const responseMessage = output
      ? `✨ Transkripsi berhasil dari *${provider}*:\n\n"${output}"`
      : "⚠️ Gagal melakukan transkripsi.";
    m.reply(responseMessage);
  } catch (e) {
    m.react(eror);
    console.log(e);
  }
};
handler.help = ["whisper *[Reply audio]*"];
handler.tags = ["tools"];
handler.command = /^(whisper)$/i;
export default handler;
async function Whisper(instance) {
  try {
    const audioUrl = await instance?.quoted?.upload();
    if (!audioUrl) return;
    const gizData = {
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
    const gizResponse = await fetch(
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
        body: JSON.stringify(gizData),
      },
    );
    const gizJson = await gizResponse.json();
    const transcription = gizJson.output.segments[0]?.text;
    if (transcription) {
      return {
        output: transcription,
        provider: "Giz.AI",
      };
    }
  } catch (error) {
    console.error("Giz.AI error: ", error);
    try {
      const audioBuffer = await instance?.quoted?.download();
      if (!audioBuffer) return;
      const openAiFormData = new FormData();
      openAiFormData.append(
        "file",
        new Blob([audioBuffer], {
          type: "audio/mpeg",
        }),
        "audio.mp3",
      );
      openAiFormData.append("model", "whisper-1");
      openAiFormData.append(
        "timestamp_granularities",
        JSON.stringify(["word"]),
      );
      openAiFormData.append("response_format", "verbose_json");
      const openAiRes = await fetch(
        "https://api.openai.com/v1/audio/transcriptions",
        {
          method: "POST",
          body: openAiFormData,
          headers: {
            Authorization: atob(
              "QmVhcmVyIHNrLVk0VUpIT096NUFpbjZSdGl4NHFHVDNCbGJrRkpqTU13bHVyYXdUek1LdGdxajE0cg==",
            ),
          },
        },
      );
      const openAiTranscription = (await openAiRes.json())?.text;
      if (openAiTranscription) {
        return {
          output: openAiTranscription,
          provider: "OpenAI",
        };
      }
    } catch (error) {
      console.error("OpenAI error: ", error);
      try {
        const audioBuffer = await instance?.quoted?.download();
        if (!audioBuffer) return;
        const lalalandFormData = new FormData();
        const blob = new Blob([audioBuffer], {
          type: `audio/mp3`,
        });
        lalalandFormData.append("file", blob, `voice.mp3`);
        const whisperResp = await fetch(
          "https://lalaland.chat/api/magic/whisper",
          {
            method: "POST",
            body: lalalandFormData,
          },
        );
        if (!whisperResp.ok)
          throw new Error(`HTTP error! status: ${whisperResp.status}`);
        const whisperText = await whisperResp.json();
        const transcription = whisperText;
        if (transcription) {
          return {
            output: transcription,
            provider: "Lalaland",
          };
        }
      } catch (error) {
        console.error("Lalaland error: ", error);
      }
    }
  }
}
