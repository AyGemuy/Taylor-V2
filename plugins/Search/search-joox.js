import fetch from "node-fetch";
const handler = async (m, {
  conn,
  usedPrefix,
  text,
  command
}) => {
  if (command === "jooxp") {
    if (!text) {
      return m.reply(`Contoh:\n${usedPrefix}${command} gustixa`);
    }
    try {
      const response = await fetch(`https://api.lolhuman.xyz/api/jooxplay?apikey=${Object.entries(APIKeys).find(([ key ]) => key.includes("lolhuman"))?.[1]}&query=${encodeURIComponent(text)}`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const result = await response.json();
      const teks = `*Result:*\n*singer:* ${result.result.info.singer}\n*song:* ${result.result.info.song}\n*album:* ${result.result.info.album}\n*date:* ${result.result.info.date}\n*duration:* ${result.result.info.duration}\n*lyrics:* ${result.result.lirik}\n`;
      await conn.sendFile(m.chat, result.result.image, "", teks, m);
      if (result.result.audio.length > 0) {
        await conn.sendFile(m.chat, result.result.audio[0]?.link, "", "", m);
      } else {
        m.reply("Audio not found");
      }
    } catch (error) {
      console.error("Error:", error);
      m.reply("Terjadi kesalahan saat mencari lagu di Joox.");
    }
  }
};
handler.command = handler.help = ["jooxp"];
handler.tags = ["tools"];
export default handler;