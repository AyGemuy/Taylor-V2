import axios from "axios";
const handler = async (m, {
  command,
  usedPrefix,
  conn,
  text,
  args
}) => {
  const input_data = await listVoice();
  let [urutan, tema] = text.split("|");
  if (!tema) return m.reply("Input query!\n*Example:*\n" + usedPrefix + command + " [nomor]|[query]");
  m.react(wait);
  try {
    let data = input_data;
    if (!urutan) return m.reply("Input query!\n*Example:*\n" + usedPrefix + command + " [nomor]|[query]\n\n*Pilih angka yg ada*\n" + data.map((item, index) => `*${index + 1}.* ${item.name}`).join("\n"));
    if (isNaN(urutan)) return m.reply("Input query!\n*Example:*\n" + usedPrefix + command + " [nomor]|[query]\n\n*Pilih angka yg ada*\n" + data.map((item, index) => `*${index + 1}.* ${item.name}`).join("\n"));
    if (urutan > data.length) return m.reply("Input query!\n*Example:*\n" + usedPrefix + command + " [nomor]|[query]\n\n*Pilih angka yg ada*\n" + data.map((item, index) => `*${index + 1}.* ${item.name}`).join("\n"));
    let out = data[urutan - 1].id;
    const res = await fetchTTS(tema, out);
    res ? await conn.sendFile(m.chat, res.url, "audio.mp3", "", m, !0, {
      mimetype: "audio/mp4",
      ptt: !0,
      waveform: [100, 0, 100, 0, 100, 0, 100],
      contextInfo: adReplyS.contextInfo
    }) : console.log("Tidak ada respons dari OpenAI atau terjadi kesalahan.");
  } catch (e) {
    m.react(eror);
  }
};
handler.help = ["playht *[nomor]|[query]*"], handler.tags = ["ai"], handler.command = /^(playht)$/i;
export default handler;
async function fetchTTS(text, voice) {
  const data = {
      text: text,
      voice: voice
    },
    config = {
      headers: {
        AUTHORIZATION: "Bearer 7ede35d38e9445abb7e8da1a1c279c17",
        "X-USER-ID": "0Ftau1WTqcdWyezEukIRh7cWOJs2",
        accept: "text/event-stream",
        "content-type": "application/json"
      }
    };
  try {
    const response = await axios.post("https://play.ht/api/v2/tts", data, config);
    return findCompletedEventData(response.data);
  } catch (error) {
    console.error(error);
  }
}
const findCompletedEventData = data => {
  const events = data.split("event: ");
  for (let event of events)
    if (event.includes("complete")) {
      return JSON.parse(event.split("data: ")[1]);
    }
  return null;
};
async function listVoice() {
  const options = {
    method: "GET",
    url: "https://api.play.ht/api/v2/voices",
    headers: {
      accept: "application/json",
      AUTHORIZATION: "Bearer 7ede35d38e9445abb7e8da1a1c279c17",
      "X-USER-ID": "0Ftau1WTqcdWyezEukIRh7cWOJs2"
    }
  };
  try {
    return (await axios.request(options)).data;
  } catch (error) {
    throw error;
  }
}