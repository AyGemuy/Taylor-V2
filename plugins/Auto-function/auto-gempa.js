import fetch from "node-fetch";
export async function before(m) {
  const chat = db.data.chats[m.chat];
  if (m.isBaileys || !m.text || !chat.autoGempa) return !1;
  try {
    const link = "https://data.bmkg.go.id/DataMKG/TEWS/";
    if (this.autoGempa = this.autoGempa || {}, 0 === Object.keys(this.autoGempa).length) {
      const response = await fetch(link + "autogempa.json"),
        {
          gempa
        } = (await response.json()).Infogempa;
      this.autoGempa.data = gempa, this.autoGempa.state = !0;
    }
    setInterval(async () => {
      try {
        const response = await fetch(link + "autogempa.json"),
          {
            gempa: newEarthquakeData
          } = (await response.json()).Infogempa;
        if (JSON.stringify(newEarthquakeData) !== JSON.stringify(this.autoGempa.data) && (this.autoGempa.state = !1, !this.autoGempa.state)) {
          this.autoGempa.data = newEarthquakeData;
          const formattedDate = new Date(newEarthquakeData.Tanggal).toLocaleDateString("en-US", {
              day: "numeric",
              month: "short",
              year: "numeric"
            }),
            txt = `*Broadcast Gempa Terkini 🌐*\n\n📅 *Tanggal:* ${formattedDate}\n⌚ *Waktu:* ${new Date(newEarthquakeData.DateTime).toLocaleTimeString("en-US", {
hour12: !1
})} WIB\n📍 *Koordinat:* ${newEarthquakeData.Coordinates}\n⛰️ *Magnitudo:* ${newEarthquakeData.Magnitude}\n🕳️ *Kedalaman:* ${newEarthquakeData.Kedalaman} km\n🚩 *Lokasi:* ${newEarthquakeData.Wilayah}\n🌊 *Potensi:* ${newEarthquakeData.Potensi}\n💡 *Effect:* ${newEarthquakeData.Dirasakan}`,
            msg = {
              contextInfo: {
                externalAdReply: {
                  title: "🌍 Info Gempa Terkini 🌋",
                  body: newEarthquakeData.Potensi,
                  renderLargerThumbnail: !0,
                  mediaUrl: "",
                  mediaType: 1,
                  thumbnail: await this.resize(link + newEarthquakeData.Shakemap, 300, 150),
                  sourceUrl: ""
                }
              }
            };
          await this.reply(m.chat, txt.replaceAll("%p", "```"), null, msg), this.autoGempa.state = !0;
        }
      } catch (error) {
        console.error(error);
      }
    }, 9e5);
  } catch (error) {
    console.error(error);
  }
}