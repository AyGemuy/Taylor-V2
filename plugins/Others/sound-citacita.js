import fetch from "node-fetch";
const handler = async (m, {
  conn,
  command
}) => {
  try {
    const res = await fetch("https://raw.githubusercontent.com/BadXyz/txt/main/citacita/citacita.json");
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    const json = await res.json();
    const audioUrl = json.getRandom();
    await conn.sendMessage(m.chat, {
      audio: {
        url: audioUrl
      },
      seconds: fsizedoc,
      ptt: true,
      mimetype: "audio/mpeg",
      fileName: "vn.mp3",
      waveform: [100, 0, 100, 0, 100, 0, 100]
    }, {
      quoted: m
    });
  } catch (error) {
    console.error("Error fetching or sending audio:", error);
    m.react(eror);
  }
};
handler.help = ["citacita"];
handler.tags = ["random"];
handler.command = /^(citacita)$/i;
export default handler;