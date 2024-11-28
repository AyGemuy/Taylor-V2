import fetch from "node-fetch";
const link = "https://data.bmkg.go.id/DataMKG/TEWS/",
  handler = async (m, { conn, text, usedPrefix, command }) => {
    try {
      let anu = await (await fetch(link + "autogempa.json")).json();
      anu = anu.Infogempa.gempa;
      let txt = `🌐 *Wilayah:* ${anu.Wilayah}\n📅 *Tanggal:* ${anu.Tanggal}\n🕒 *Waktu:* ${anu.Jam}\n💢 *Potensi:* ${anu.Potensi}\n\n📏 *Magnitude:* ${anu.Magnitude}\n🌊 *Kedalaman:* ${anu.Kedalaman}\n📍 *Koordinat:* ${anu.Coordinates}${anu.Dirasakan.length > 3 ? `\n👤 *Dirasakan:* ${anu.Dirasakan}` : ""}`,
        msg = await conn.sendMessage(
          m.chat,
          {
            location: {
              degreesLatitude: anu.Coordinates.split(",")[0],
              degreesLongitude: anu.Coordinates.split(",")[1],
              name: anu.Coordinates,
              contextInfo: {},
            },
          },
          {
            quoted: m,
          },
        );
      await conn.reply(m.chat, txt.replaceAll("%p", "```"), msg);
    } catch (e) {
      console.log(e);
      try {
        let anu = await (await fetch(link + "gempaterkini.json")).json();
        anu = anu.Infogempa.gempa[0];
        let txt = `🌐 *Wilayah:* ${anu.Wilayah}\n📅 *Tanggal:* ${anu.Tanggal}\n🕒 *Waktu:* ${anu.Jam}\n💢 *Potensi:* ${anu.Potensi}\n\n📏 *Magnitude:* ${anu.Magnitude}\n🌊 *Kedalaman:* ${anu.Kedalaman}\n📍 *Koordinat:* ${anu.Coordinates}${anu.Dirasakan.length > 3 ? `\n👤 *Dirasakan:* ${anu.Dirasakan}` : ""}`,
          msg = await conn.sendMessage(
            m.chat,
            {
              location: {
                degreesLatitude: anu.Coordinates.split(",")[0],
                degreesLongitude: anu.Coordinates.split(",")[1],
                name: anu.Coordinates,
                contextInfo: {},
              },
            },
            {
              quoted: m,
            },
          );
        await conn.reply(m.chat, txt.replaceAll("%p", "```"), msg);
      } catch (e) {
        console.log(e), m.reply("[!] Maaf, fitur ini sedang bermasalah.");
      }
    }
  };
(handler.help = ["infogempa"]),
  (handler.tags = ["information"]),
  (handler.command = /^(infogempa)$/i),
  (handler.limit = !0);
export default handler;
