import {
  translate
} from "@vitalets/google-translate-api";
import fetch from "node-fetch";
const defaultLang = "ja",
  tld = "cn",
  key = ["z-j740K-G86958S", "E96-39N92-3021i", "p_438_14M3y731P", "e1m_5-75427574p", "Y11_0_7-1_536-7", "X9F694A4Z278J5d", "v5y3b-8374f4467", "y4A5M8G566846_Y", "w3164-16562-7-8", "W6901_y9c1w8883", "y7c448852-39006"],
  handler = async (m, {
    args,
    usedPrefix,
    text,
    command
  }) => {
    let yh = key,
      apikey = yh[Math.floor(Math.random() * yh.length)],
      quot = m.quoted ? m.quoted : m;
    text || quot.text;
    if (!text) throw `Masukan text nya!\n\nExample: ${usedPrefix + command} pagi kawan-kawan`;
    try {
      let ress = await translate(text, {
          to: "ja",
          autoCorrect: !0
        }).catch(_ => null),
        audio = `https://deprecatedapis.tts.quest/v2/voicevox/audio/?text=${encodeURIComponent(ress.text)}&key=${apikey}`;
      await conn.sendFile(m.chat, audio, "audio.mp3", "", m, !0, {
        mimetype: "audio/mp4",
        ptt: !0,
        waveform: [100, 0, 100, 0, 100, 0, 100],
        contextInfo: adReplyS.contextInfo
      });
    } catch (err) {
      m.reply("Error!\n\n" + err);
    }
  };
handler.help = ["voicevox"], handler.tags = ["ai"], handler.command = ["voicevox", "michi"],
  handler.limit = !0;
export default handler;