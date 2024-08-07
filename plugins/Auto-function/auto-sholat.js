export async function before(m) {
  try {
    const database = db.data.database.autosholat;
    const who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? this.user.jid : m.sender;
    const id = m.chat;
    if (id in database) return;
    const jadwalSholat = {
      Midnight: "00:07",
      Tahajjud: "02:00",
      Lastthird: "02:07",
      Imsak: "04:38",
      Fajr: "04:48",
      Sunrise: "06:03",
      Duha: "07:30",
      Dhuhr: "12:07",
      Asr: "15:22",
      Sunset: "17:09",
      Maghrib: "18:09",
      Isha: "19:39",
      Tarawih: "20:00",
      Witir: "21:00",
      Firstthird: "22:08"
    };
    const date = new Date(new Date().toLocaleString("en-US", {
      timeZone: "Asia/Makassar"
    }));
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const timeNow = `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
    for (const [sholat, waktu] of Object.entries(jadwalSholat)) {
      if (timeNow === waktu) {
        const caption = `Hai kak @${who.split("@")[0]},\nWaktu *${sholat}* telah tiba, ambilah air wudhu dan segeralah shalat🙂.\n\n*${waktu}*\n_untuk wilayah Makassar dan sekitarnya._`;
        database[id] = true;
        await this.reply(m.chat, caption, null, {
          contextInfo: {
            mentionedJid: [who],
            externalAdReply: {
              title: "Auto Sholat",
              body: "",
              mediaType: 1,
              previewType: 0,
              renderLargerThumbnail: false,
              thumbnailUrl: "https://cdn-icons-png.flaticon.com/128/4527/4527060.png",
              sourceUrl: ""
            }
          }
        });
        setTimeout(() => {
          delete database[id];
        }, 57e3);
      }
    }
  } catch (error) {
    console.error("Error in before function:", error);
  }
}
export const disabled = !1;