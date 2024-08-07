import fetch from "node-fetch";
import sharp from "sharp";
const ACCUWEATHER_API_KEY = "d7e795ae6a0d44aaa8abb1a0a7ac19e4";
const LOCATION_URL = "https://api.accuweather.com/locations/v1/cities/search.json";
const FORECAST_URL = "https://api.accuweather.com/forecasts/v1/daily/10day";
const fahrenheitToCelsius = fahrenheit => ((fahrenheit - 32) * 5 / 9).toFixed(1);
const getLocationData = async query => {
  try {
    const response = await fetch(`${LOCATION_URL}?q=${query}&apikey=${ACCUWEATHER_API_KEY}&language=id-id`);
    if (!response.ok) throw new Error("Gagal mendapatkan data lokasi");
    const [location] = await response.json();
    if (!location) throw new Error("Lokasi tidak ditemukan");
    return location;
  } catch (error) {
    throw new Error(`Error saat mengambil data lokasi: ${error.message}`);
  }
};
const getForecastData = async locationKey => {
  try {
    const response = await fetch(`${FORECAST_URL}/${locationKey}?apikey=${ACCUWEATHER_API_KEY}&details=true&language=id-id`);
    if (!response.ok) throw new Error("Gagal mendapatkan data perkiraan cuaca");
    return await response.json();
  } catch (error) {
    throw new Error(`Error saat mengambil data perkiraan cuaca: ${error.message}`);
  }
};
const convertSvgToPng = async svgUrl => {
  try {
    const response = await fetch(svgUrl);
    if (!response.ok) throw new Error("Gagal mendapatkan data SVG");
    const svgBuffer = await response.buffer();
    const pngBuffer = await sharp(svgBuffer).png().toBuffer();
    return pngBuffer;
  } catch (error) {
    throw new Error(`Error saat mengubah SVG ke PNG: ${error.message}`);
  }
};
const weather = async text => {
  try {
    const locationData = await getLocationData(text);
    const {
      Key,
      LocalizedName,
      Country
    } = locationData;
    if (!Key) throw new Error("Key lokasi tidak ditemukan");
    const forecastData = await getForecastData(Key);
    const today = forecastData.DailyForecasts?.[0] ?? {};
    const iconUrl = `http://vortex.accuweather.com/adc2010/images/slate/icons/${today.Day?.Icon}.svg`;
    const localtime = new Date().toLocaleString("id-ID");
    const forecastList = forecastData.DailyForecasts?.slice(0, 5).map(day => {
      const date = new Date(day.Date).toLocaleDateString("id-ID");
      const maxTempCelsius = fahrenheitToCelsius(day.Temperature?.Maximum?.Value ?? 0);
      const minTempCelsius = fahrenheitToCelsius(day.Temperature?.Minimum?.Value ?? 0);
      return `${date}: ${maxTempCelsius}°C, ${day.Day?.IconPhrase ?? "Tidak tersedia"}`;
    }).join("\n") ?? "Tidak tersedia";
    const airQuality = forecastData.DailyForecasts?.[0]?.AirAndPollen ? forecastData.DailyForecasts[0].AirAndPollen.map(pollen => `${pollen.Name}: ${pollen.Category}`).join(", ") : "Tidak tersedia";
    const realFeelMaxCelsius = fahrenheitToCelsius(today.RealFeelTemperature?.Maximum?.Value ?? 0);
    const realFeelMinCelsius = fahrenheitToCelsius(today.RealFeelTemperature?.Minimum?.Value ?? 0);
    const iconPngBuffer = await convertSvgToPng(iconUrl);
    return {
      caption: `
🌦️ *Cuaca hari ini:* ${today.Day?.IconPhrase ?? "Tidak tersedia"}
📌 *Nama:* ${LocalizedName ?? "Tidak tersedia"}
🌍 *Negara:* ${Country?.LocalizedName ?? "Tidak tersedia"}
🌐 *Waktu Lokal:* ${localtime}
🌡️ *Suhu Maks:* ${fahrenheitToCelsius(today.Temperature?.Maximum?.Value ?? 0)} °C
🌡️ *Suhu Minim:* ${fahrenheitToCelsius(today.Temperature?.Minimum?.Value ?? 0)} °C
🌡️ *Suhu RealFeel Maks:* ${realFeelMaxCelsius} °C
🌡️ *Suhu RealFeel Minim:* ${realFeelMinCelsius} °C
💧 *Kelembaban:* ${today.Day?.RelativeHumidity?.Average ?? "Tidak tersedia"}%
🌬️ *Kecepatan Angin:* ${today.Day?.Wind?.Speed?.Value ?? "Tidak tersedia"} mi/jam
🌪️ *Kecepatan Angin Maksimal:* ${today.Day?.WindGust?.Speed?.Value ?? "Tidak tersedia"} mi/jam
🌫️ *Kebakaran Hutan:* ${today.Day?.Evapotranspiration?.Value ?? "Tidak tersedia"} in
🌞 *Irradiasi Matahari:* ${today.Day?.SolarIrradiance?.Value ?? "Tidak tersedia"} W/m²
🌫️ *Kelembapan Relatif:* ${today.Day?.RelativeHumidity?.Average ?? "Tidak tersedia"}%
💧 *Temperatur Wet Bulb:* ${today.Day?.WetBulbTemperature?.Average?.Value ?? "Tidak tersedia"} °F
🌙 *Temperatur Wet Bulb Globe:* ${today.Day?.WetBulbGlobeTemperature?.Average?.Value ?? "Tidak tersedia"} °F
🔍 *Kualitas Udara:* ${airQuality}
📅 *Perkiraan Cuaca (5 hari):*
${forecastList}
📈 *Peringatan:* ${forecastData.Headline?.Text ?? "Tidak ada peringatan"}
`.trim(),
      iconBuffer: iconPngBuffer
    };
  } catch (error) {
    throw new Error(`Error saat memproses data cuaca: ${error.message}`);
  }
};
const handler = async (m, {
  conn,
  text
}) => {
  const who = m.mentionedJid?.[0] ?? (m.fromMe ? conn.user.jid : m.sender);
  try {
    if (!text) return m.reply("Masukkan Nama Lokasi");
    m.react("⏳");
    let {
      caption,
      iconBuffer
    } = await weather(text);
    await conn.sendFile(m.chat, iconBuffer, "weather-icon.png", caption, m, null, {
      contextInfo: {
        mentionedJid: [who],
        externalAdReply: {
          title: "Perkiraan Cuaca",
          body: "Info Cuaca",
          thumbnail: iconBuffer
        }
      }
    });
  } catch (e) {
    m.react("❌");
    console.error(e);
  }
};
handler.help = ["accuweather <kota>"];
handler.tags = ["info"];
handler.command = /^(accuweather)$/i;
handler.limit = true;
export default handler;