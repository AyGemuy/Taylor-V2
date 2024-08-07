import fetch from "node-fetch";
const handler = async (m, {
  conn,
  args,
  usedPrefix,
  text,
  command
}) => {
  if (!text) return m.reply("Input query link\nExample: .downloade link");
  m.react(wait);
  try {
    let teks = (await downloade(text)).medias.map((item, index) => `🔍 *HASIL ${index + 1}*\n\n📢 *Kualitas:* ${item.quality}\n🌐 *Ekstensi:* ${item.extension}\n🖼️ *Ukuran Terformat:* ${item.formattedSize}\n🔖 *URL:* ${item.url}\n`).filter(v => v).join("\n\n________________________\n\n");
    m.reply(teks);
  } catch (e) {
    m.react(eror);
  }
};
handler.help = ["downloade"], handler.tags = ["tools"], handler.command = /^(downloade)$/i;
export default handler;
async function downloade(url) {
  try {
    const response = await fetch("https://downloade.co/wp-json/aio-dl/video-data", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        url: url
      })
    });
    return await response.json();
  } catch (error) {
    throw console.error("Terjadi kesalahan:", error), error;
  }
}