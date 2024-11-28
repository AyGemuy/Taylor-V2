import fetch from "node-fetch";
import * as cheerio from "cheerio";
import similarity from "similarity";
const handler = async (m, { text, usedPrefix, command }) => {
  if (!text)
    throw `Use example ${usedPrefix}${command} semarang\nAnd ${usedPrefix}${command} semarang|15 (for date)`;
  var ayat = text.split("|");
  if (ayat[0] && ayat[1])
    try {
      let resu = await jadwalsholat(ayat[0]);
      m.react(wait),
        m.reply(
          `\n${htki} Jadwal Sholat ${htka}\n\n${Object.entries(
            resu.list[--ayat[1]],
          )
            .map(([name, data]) => `Sholat *${name}* : ${data}`)
            .join("\n")
            .trim()}\n`.trim(),
        );
    } catch (e) {
      m.react(eror);
    }
  else
    try {
      let res = await jadwalsholat(text);
      m.react(wait),
        m.reply(
          `\n${htki} Jadwal Sholat ${htka}\n\n${Object.entries(res.today)
            .map(([name, data]) => `Sholat *${name}* : ${data}`)
            .join("\n")
            .trim()}\n`.trim(),
        );
    } catch (e) {
      m.react(eror);
    }
};
(handler.help = ["salat <daerah>"]),
  (handler.tags = ["quran"]),
  (handler.command = /^(jadwal)?s(a|o|ha|ho)lat$/i);
export default handler;
let listJadwalSholat = [];
async function jadwalsholat(kota) {
  const cities = listJadwalSholat.map((item) => item.kota);
  const prediction = cities.map((city) => ({
    city: city,
    score: similarity(kota, city),
  }));
  const precisionPrediction = prediction
    .filter((pred) => pred.score >= 0.85)
    .sort((a, b) => b.score - a.score)[0];
  if (!precisionPrediction) {
    throw new Error(
      `Did you mean ${prediction.map((item) => item.city).join(", ")}?\n\nList of cities: ${cities.map((city) => `- ${city}`).join("\n")}`,
    );
  }
  const jadwal = listJadwalSholat.find(
    (item) => item.kota === precisionPrediction.city,
  );
  const response = await fetch(
    `https://jadwalsholat.org/jadwal-sholat/monthly.php?id=${jadwal.value}`,
  );
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  const data = await response.text();
  const $ = cheerio.load(data);
  const date = $("tr.table_title > td > h2.h2_edit").text().trim();
  const location = $("tr.table_block_content > td[colspan=7]")
    .html()
    .split("</b>")[1]
    .trim();
  const direction = $("tr.table_block_content > td[colspan=5]")
    .eq(0)
    .text()
    .split("ke")[0]
    .trim();
  const distance = $("tr.table_block_content > td[colspan=5]")
    .eq(1)
    .text()
    .split("ke")[0]
    .trim();
  const schedules = $("tbody > tr[align=center]")
    .filter(".table_highlight, .table_light, .table_dark")
    .map(function () {
      const el = $(this).find("td");
      const date = el.eq(0).text().trim();
      const imsyak = el.eq(1).text().trim();
      const shubuh = el.eq(2).text().trim();
      const terbit = el.eq(3).text().trim();
      const dhuha = el.eq(4).text().trim();
      const dzuhur = el.eq(5).text().trim();
      const ashr = el.eq(6).text().trim();
      const maghrib = el.eq(7).text().trim();
      const isya = el.eq(8).text().trim();
      return {
        date: date,
        imsyak: imsyak,
        shubuh: shubuh,
        terbit: terbit,
        dhuha: dhuha,
        dzuhur: dzuhur,
        ashr: ashr,
        maghrib: maghrib,
        isya: isya,
      };
    })
    .toArray();
  const result = {
    date: date,
    location: location,
    direction: direction,
    distance: distance,
    schedules: schedules,
  };
  return result;
}
