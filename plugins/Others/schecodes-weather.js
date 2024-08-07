import fetch from "node-fetch";
const handler = async (m, {
  conn,
  usedPrefix,
  args
}) => {
  let query = "⚙️ *Input text*\nContoh. *" + usedPrefix + "schecodes hello world*\n\n*<command> <text>*",
    text = args.length >= 1 ? args.join(" ") : m.quoted && m.quoted?.text ? m.quoted?.text : null;
  if (!text) throw query;
  try {
    const waitMsg = "⏳ *Memuat data cuaca...*";
    m.reply(waitMsg);
    const xmg = await fetchWeather(text),
      location = `${xmg.city}, ${xmg.country}`,
      temperature = `${xmg.temperature.current}°C`,
      description = xmg.condition.description,
      iconUrl = xmg.condition.icon_url,
      message = `\n🌦️ *Cuaca saat ini*\n📍 *Lokasi:* ${location}\n🌡️ *Suhu:* ${temperature}\n🌈 *Kondisi:* ${description}`;
    await conn.sendFile(m.chat, iconUrl, "weather.png", message, m);
  } catch (e) {
    throw console.error(e), "❌ *Gagal memuat data.*";
  }
};
handler.help = ["schecodes"], handler.tags = ["misc"], handler.command = /^(schecodes)$/i;
export default handler;
async function fetchWeather(term) {
  const response = await fetch(`https://api.shecodes.io/weather/v1/current?query=${encodeURIComponent(term)}&key=96f59ob69a32facbb34b2tdb5d2e7405`);
  return await response.json();
}