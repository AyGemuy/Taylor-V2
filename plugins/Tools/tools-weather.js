import fetch from "node-fetch";
const OPENWEATHERMAP_API_KEY = "060a6bcfa19809c2cd4d97a212b19273";
const GEOCODING_URL = "http://api.openweathermap.org/geo/1.0/direct";
const CURRENT_WEATHER_URL = "https://api.openweathermap.org/data/2.5/weather";
const FORECAST_URL = "https://api.openweathermap.org/data/2.5/forecast";
const latLonToTile = (lat, lon, zoom) => {
  const x = Math.floor((lon + 180) / 360 * Math.pow(2, zoom));
  const latRad = lat * Math.PI / 180;
  const y = Math.floor((1 - Math.log(Math.tan(latRad) + 1 / Math.cos(latRad)) / Math.PI) / 2 * Math.pow(2, zoom));
  return `https://tile.openstreetmap.org/${zoom}/${x}/${y}.png`;
};
const getWeatherData = async (lat, lon) => {
  try {
    const params = new URLSearchParams({
      lat: lat,
      lon: lon,
      appid: OPENWEATHERMAP_API_KEY,
      units: "metric",
      lang: "id"
    });
    const response = await fetch(`${CURRENT_WEATHER_URL}?${params}`);
    if (!response.ok) throw new Error("Gagal mendapatkan data cuaca");
    return await response.json();
  } catch (error) {
    throw new Error(`Error saat mengambil data cuaca: ${error.message}`);
  }
};
const getForecastData = async (lat, lon) => {
  try {
    const params = new URLSearchParams({
      lat: lat,
      lon: lon,
      appid: OPENWEATHERMAP_API_KEY,
      units: "metric",
      lang: "id"
    });
    const response = await fetch(`${FORECAST_URL}?${params}`);
    if (!response.ok) throw new Error("Gagal mendapatkan data perkiraan cuaca");
    return await response.json();
  } catch (error) {
    throw new Error(`Error saat mengambil data perkiraan cuaca: ${error.message}`);
  }
};
const weather = async text => {
  try {
    const geocodingParams = new URLSearchParams({
      q: text,
      limit: 1,
      appid: OPENWEATHERMAP_API_KEY
    });
    const geocodingResponse = await fetch(`${GEOCODING_URL}?${geocodingParams}`);
    if (!geocodingResponse.ok) throw new Error("Gagal mendapatkan data geocoding");
    const [location] = await geocodingResponse.json();
    const {
      lat,
      lon,
      name,
      country
    } = location ?? {};
    if (!lat || !lon) throw new Error("Lokasi tidak ditemukan");
    const weatherData = await getWeatherData(lat, lon);
    const forecastData = await getForecastData(lat, lon);
    const {
      main,
      wind,
      weather: [weatherCondition],
      dt,
      sys
    } = weatherData;
    const iconUrl = `http://openweathermap.org/img/wn/${weatherCondition?.icon ?? "01d"}.png`;
    const tileUrl = latLonToTile(lat, lon, 12);
    const localtime = new Date(dt * 1e3).toLocaleString("id-ID");
    const sunriseTime = new Date(sys?.sunrise * 1e3).toLocaleTimeString("id-ID");
    const sunsetTime = new Date(sys?.sunset * 1e3).toLocaleTimeString("id-ID");
    const forecastList = forecastData.list.slice(0, 5).map(item => {
      const date = new Date(item.dt * 1e3).toLocaleDateString("id-ID");
      return `${date}: ${item.main.temp}°C, ${item.weather[0]?.description ?? "Tidak tersedia"}`;
    }).join("\n");
    return {
      caption: `
🌦️ *Cuaca saat ini: ${weatherCondition?.description ?? "Tidak tersedia"}* 🌦️
📌 *Nama:* ${name ?? "Tidak tersedia"}
🌍 *Negara:* ${country ?? "Tidak tersedia"}
🌐 *Lintang:* ${lat ?? "Tidak tersedia"}
🌐 *Bujur:* ${lon ?? "Tidak tersedia"}
🕰️ *Waktu Lokal:* ${localtime}
🌡️ *Suhu:* ${main?.temp ?? "Tidak tersedia"} °C
🌡️ *Terasa Seperti:* ${main?.feels_like ?? "Tidak tersedia"} °C
💧 *Kelembaban:* ${main?.humidity ?? "Tidak tersedia"}%
🌬️ *Kecepatan Angin:* ${wind?.speed ?? "Tidak tersedia"} m/s
🧭 *Arah Angin:* ${wind?.deg ?? "Tidak tersedia"}°
🌡️ *Tekanan:* ${main?.pressure ?? "Tidak tersedia"} hPa
🌅 *Waktu Matahari Terbit:* ${sunriseTime ?? "Tidak tersedia"}
🌇 *Waktu Matahari Terbenam:* ${sunsetTime ?? "Tidak tersedia"}
📅 *Perkiraan Cuaca (5 hari):*
${forecastList}
`.trim(),
      iconUrl: iconUrl,
      tileUrl: tileUrl
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
    if (!text) throw "Masukkan Nama Lokasi";
    m.react(wait);
    let {
      caption,
      iconUrl,
      tileUrl
    } = await weather(text);
    await conn.sendFile(m.chat, tileUrl, "", caption, m, null, {
      contextInfo: {
        mentionedJid: [who],
        externalAdReply: {
          title: "Perkiraan Cuaca",
          body: "Info Cuaca",
          thumbnail: (await conn.getFile(iconUrl))?.data
        }
      }
    });
  } catch (e) {
    m.react(eror);
    console.error(e);
  }
};
handler.help = ["weather <kota>"];
handler.tags = ["info"];
handler.command = /^(weather)$/i;
handler.limit = true;
export default handler;