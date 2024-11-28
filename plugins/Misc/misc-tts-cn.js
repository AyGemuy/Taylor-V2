import fetch from "node-fetch";
const fetchVoiceList = async () => {
  const url = "https://www.text-to-speech.cn/getSpeekList.php";
  const headers = {
    "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
    Accept: "*/*",
    "X-Requested-With": "XMLHttpRequest",
    "User-Agent": "Mozilla/5.0",
    Referer: "https://www.text-to-speech.cn/",
  };
  const data = new URLSearchParams();
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: headers,
      body: data,
    });
    if (!response.ok)
      return {
        error: `HTTP error! Status: ${response.status}`,
      };
    return await response.json();
  } catch (error) {
    return {
      error: `Error fetching voice list: ${error.message}`,
    };
  }
};
const fetchTextToSpeech = async (input, language, voice) => {
  const url = "https://www.text-to-speech.cn/getSpeek.php";
  const headers = {
    "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
    Accept: "*/*",
    "X-Requested-With": "XMLHttpRequest",
    "User-Agent":
      "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Mobile Safari/537.36",
    Referer: "https://www.text-to-speech.cn/",
  };
  const body = new URLSearchParams({
    language: language ?? "Indonesian (Indonesia)",
    voice: voice ?? "id-ID-ArdiNeural",
    text: input,
    role: "0",
    style: "0",
    rate: "0",
    pitch: "0",
    kbitrate: "audio-16khz-128kbitrate-mono-mp3",
    silence: "",
    styledegree: "1",
    volume: "75",
    predict: "0",
    user_id: "",
    yzm: "",
    replice: "1",
  });
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: headers,
      body: body,
    });
    if (!response.ok)
      return {
        error: `HTTP error! status: ${response.status}`,
      };
    return await response.json();
  } catch (error) {
    return {
      error: `Error fetching text-to-speech: ${error.message}`,
    };
  }
};
const parseOptions = (input) => {
  const options = {};
  input.forEach((arg) => {
    const match = arg.match(/^--(\w+)(?:=(.*))?$/);
    if (match) {
      options[match[1]] = match[2] !== undefined ? match[2] : true;
    }
  });
  return options;
};
const handler = async (m, { conn, args, usedPrefix, command }) => {
  const options = parseOptions(args);
  const voiceIndex = parseInt(options.voice, 10) || 1;
  const text =
    args.filter((arg) => !arg.startsWith("--")).join(" ") ||
    m.quoted?.text ||
    null;
  if (!text) {
    return m.reply(
      `Masukkan input. Contoh penggunaan: ${usedPrefix}${command} <teks> [--option=value]`,
    );
  }
  m.react(wait);
  const voices = await fetchVoiceList();
  if (voices.error) return m.reply(voices.error);
  const languageKeys = Object.keys(voices);
  let allVoices = [];
  languageKeys.forEach(
    (language) => (allVoices = allVoices.concat(voices[language].ShortName)),
  );
  const shortName = allVoices[voiceIndex - 1];
  if (!shortName) {
    let voiceList = "Daftar suara yang tersedia:\n\n";
    allVoices.forEach((voice, i) => {
      voiceList += `${i + 1}. ${voice}\n`;
    });
    return m.reply(voiceList);
  }
  const language = languageKeys.find((lang) =>
    voices[lang].ShortName.includes(shortName),
  );
  const res = await fetchTextToSpeech(text, language, shortName);
  if (res.error) return m.reply(res.error);
  if (res.download) {
    await conn.sendFile(m.chat, res.download, "audio.mp3", "", m, !0, {
      mimetype: "audio/mp4",
      ptt: !0,
      waveform: [100, 0, 100, 0, 100, 0, 100],
      contextInfo: {
        ...adReply.contextInfo,
        mentionedJid: [m.sender],
      },
    });
    m.react(sukses);
  }
};
handler.help = ["ttscn <teks> [--option=value]"];
handler.tags = ["tools"];
handler.command = /^(ttscn)$/i;
export default handler;
