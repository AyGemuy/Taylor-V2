import fetch from "node-fetch";
class Lazypy {
  constructor() {
    this.baseUrl = "https://lazypy.ro/tts/request_tts.php";
    this.voicesUrl = "https://lazypy.ro/tts/assets/js/voices.json";
    this.headers = {
      "Content-Type": "application/x-www-form-urlencoded",
      "User-Agent":
        "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Mobile Safari/537.36",
      Referer:
        "https://lazypy.ro/tts/conversation.php?voices=TikTok__es_male_m3,,,",
    };
  }
  async create({
    service = "TikTok",
    voice = "es_male_m3",
    text = "Hy",
    voice_name = "Julio",
    playlist_index = 0,
  }) {
    const body = new URLSearchParams({
      service: service,
      voice: voice,
      text: text,
      voice_name: voice_name,
      playlist_index: playlist_index,
    });
    try {
      const response = await fetch(this.baseUrl, {
        method: "POST",
        headers: this.headers,
        body: body,
      });
      return await response.json();
    } catch (error) {
      console.error("Error in create:", error);
      return null;
    }
  }
  async voice() {
    try {
      const response = await fetch(this.voicesUrl);
      const { StreamElements } = await response.json();
      if (StreamElements?.voices) {
        return StreamElements.voices.map(
          ({ vid, name, flag, lang, accent, gender }) => ({
            id: vid,
            name: name,
            flag: flag,
            language: lang,
            accent: accent,
            gender: gender,
          }),
        );
      } else {
        throw new Error("Voices not found");
      }
    } catch (error) {
      console.error("Error in voice:", error);
      return null;
    }
  }
}
const handler = async (m, { command, usedPrefix, conn, text }) => {
  const lazypy = new Lazypy();
  const input_data = await lazypy.voice();
  let [urutan, tema] = text.split("|");
  if (!tema)
    return m.reply(
      "Input query!\n*Example:*\n" + usedPrefix + command + " [nomor]|[query]",
    );
  m.react(wait);
  try {
    const data = input_data;
    if (!urutan) {
      return m.reply(
        "Input query!\n*Example:*\n" +
          usedPrefix +
          command +
          " [nomor]|[query]\n\n*Pilih angka yg ada*\n" +
          data.map((item, index) => `*${index + 1}.* ${item.name}`).join("\n"),
      );
    }
    if (isNaN(urutan) || urutan > data.length) {
      return m.reply(
        "Input query!\n*Example:*\n" +
          usedPrefix +
          command +
          " [nomor]|[query]\n\n*Pilih angka yg ada*\n" +
          data.map((item, index) => `*${index + 1}.* ${item.name}`).join("\n"),
      );
    }
    const voiceId = data[urutan - 1].id;
    const res = await lazypy.create({
      service: "TikTok",
      voice: voiceId,
      text: tema,
    });
    if (res?.success) {
      await conn.sendFile(m.chat, res.audio_url, "audio.mp3", "", m, true, {
        mimetype: "audio/mp4",
        ptt: true,
        waveform: [100, 0, 100, 0, 100, 0, 100],
        contextInfo: {
          mentionedJid: [m.sender],
        },
      });
    } else {
      console.log("Tidak ada respons dari Lazypy atau terjadi kesalahan.");
    }
  } catch (e) {
    console.error(e);
    m.react(eror);
  }
};
handler.help = ["lazypy *[nomor]|[query]*"];
handler.tags = ["ai"];
handler.command = /^(lazypy)$/i;
export default handler;
