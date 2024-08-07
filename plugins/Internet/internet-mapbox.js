import axios from "axios";
import fetch from "node-fetch";
const handler = async (m, {
  conn,
  args,
  usedPrefix,
  text,
  command
}) => {
  let Token = ["pk.eyJ1IjoiY3liZXIyMSIsImEiOiJjbDBtbm40MWoxMzNmM2JxdGNjZmtvOHRzIn0.OLPda8qpTVVm7sbqFvxbIQ", "pk.eyJ1IjoidGhvbWFzcHJ1ZGVsNjQ5NCIsImEiOiJjbDA2dWpzYjMwMWlxM2tzN2c0Y2JoMGtnIn0.5tX0c-HsGG9qWniFxXIZEg", "pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw", "pk.eyJ1IjoiYXl1c2hqb3NoaTEzODAiLCJhIjoiY2xhajN2bjV0MDhuYTNzbGZ4eXY3aWV0YyJ9.-t8ccvCJhwwHcOdi435HrQ"].getRandom(),
    ke = await fetch("https://raw.githubusercontent.com/eesur/country-codes-lat-long/master/country-codes-lat-long-alpha3.json"),
    dapet = (await ke.json()).ref_country_codes,
    listSections = [];
  if (Object.values(dapet).map((v, index) => {
      let lon = v.longitude,
        lat = v.latitude;
      listSections.push([++index + " " + cmenub + "📍Location: " + v.country, [
        ["Style: A", usedPrefix + command + " nice https://api.mapbox.com/styles/v1/mapbox/dark-v10/static/pin-l-embassy+f74e4e(" + lon + "," + lat + ")/" + lon + "," + lat + ",16/500x300?access_token=" + Token, v.alpha2],
        ["Style: B", usedPrefix + command + " nice https://api.mapbox.com/styles/v1/mapbox/light-v10/static/pin-s-l+000(" + lon + "," + lat + ")/" + lon + "," + lat + ",14/500x300?access_token=" + Token, v.alpha2],
        ["Style: C", usedPrefix + command + " nice https://api.mapbox.com/styles/v1/mapbox/light-v10/static/url-https%3A%2F%2Fdocs.mapbox.com%2Fapi%2Fimg%2Fcustom-marker.png(" + lon + "," + lat + ")/" + lon + "," + lat + ",15/500x300?access_token=" + Token, v.alpha2],
        ["Style: D", usedPrefix + command + " nice https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/" + lon + "," + lat + ",0,60/400x400?access_token=" + Token, v.alpha2],
        ["Style: E", usedPrefix + command + " nice https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/geojson(%7B%22type%22%3A%22FeatureCollection%22%2C%22features%22%3A%5B%7B%22type%22%3A%22Feature%22%2C%22properties%22%3A%7B%22marker-color%22%3A%22%23462eff%22%2C%22marker-size%22%3A%22medium%22%2C%22marker-symbol%22%3A%22bus%22%7D%2C%22geometry%22%3A%7B%22type%22%3A%22Point%22%2C%22coordinates%22%3A%5B" + lon + "," + lat + "%5D%7D%7D%2C%7B%22type%22%3A%22Feature%22%2C%22properties%22%3A%7B%22marker-color%22%3A%22%23e99401%22%2C%22marker-size%22%3A%22medium%22%2C%22marker-symbol%22%3A%22park%22%7D%2C%22geometry%22%3A%7B%22type%22%3A%22Point%22%2C%22coordinates%22%3A%5B-122.25916385650635,37.80629162635318%5D%7D%7D%2C%7B%22type%22%3A%22Feature%22%2C%22properties%22%3A%7B%22marker-color%22%3A%22%23d505ff%22%2C%22marker-size%22%3A%22medium%22%2C%22marker-symbol%22%3A%22music%22%7D%2C%22geometry%22%3A%7B%22type%22%3A%22Point%22%2C%22coordinates%22%3A%5B-122.25650310516359,37.8063933469406%5D%7D%7D%5D%7D)/-122.256654,37.804077,13/500x300?access_token=" + Token, v.alpha2],
        ["Style: F", usedPrefix + command + " nice https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/geojson(%7B%22type%22%3A%22Point%22%2C%22coordinates%22%3A%5B" + lon + "%2C" + lat + "%5D%7D)/" + lon + "," + lat + ",12/500x300?access_token=" + Token, v.alpha2],
        ["Style: G", usedPrefix + command + " nice https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/pin-s-a+9ed4bd(" + lon + "," + lat + "),pin-s-b+000(" + lon + "," + lat + "),path-5+f44-0.5(%7DrpeFxbnjVsFwdAvr@cHgFor@jEmAlFmEMwM_FuItCkOi@wc@bg@wBSgM)/auto/500x300?access_token=" + Token, v.alpha2]
      ]]);
    }), !args[0]) return conn.sendList(m.chat, htki + " 📺 MAPS Search 🔎 " + htka, `⚡ Silakan pilih MAPS Search di tombol di bawah...\n*Teks yang anda kirim:* ${text}\n\nKetik ulang *${usedPrefix + command}* teks anda untuk mengubah teks lagi`, author, "☂️ MAPS Search Disini ☂️", listSections, m);
  if ("nice" === args[0]) {
    let url = args[1];
    if (args[1]) return await conn.sendFile(m.chat, url, "", "", m);
  }
  if ("custom" === args[0]) {
    let listSections = [],
      cus = ["A"],
      lon = args[1],
      lat = args[2];
    if (Object.keys(cus).map((v, index) => {
        listSections.push([++index + " " + cmenub + "📍Location: " + cus[v],
          [
            ["Style: A", usedPrefix + command + " nice https://api.mapbox.com/styles/v1/mapbox/dark-v10/static/pin-l-embassy+f74e4e(" + lon + "," + lat + ")/" + lon + "," + lat + ",16/500x300?access_token=" + Token, v.alpha2],
            ["Style: B", usedPrefix + command + " nice https://api.mapbox.com/styles/v1/mapbox/light-v10/static/pin-s-l+000(" + lon + "," + lat + ")/" + lon + "," + lat + ",14/500x300?access_token=" + Token, v.alpha2],
            ["Style: C", usedPrefix + command + " nice https://api.mapbox.com/styles/v1/mapbox/light-v10/static/url-https%3A%2F%2Fdocs.mapbox.com%2Fapi%2Fimg%2Fcustom-marker.png(" + lon + "," + lat + ")/" + lon + "," + lat + ",15/500x300?access_token=" + Token, v.alpha2],
            ["Style: D", usedPrefix + command + " nice https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/" + lon + "," + lat + ",0,60/400x400?access_token=" + Token, v.alpha2],
            ["Style: E", usedPrefix + command + " nice https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/geojson(%7B%22type%22%3A%22FeatureCollection%22%2C%22features%22%3A%5B%7B%22type%22%3A%22Feature%22%2C%22properties%22%3A%7B%22marker-color%22%3A%22%23462eff%22%2C%22marker-size%22%3A%22medium%22%2C%22marker-symbol%22%3A%22bus%22%7D%2C%22geometry%22%3A%7B%22type%22%3A%22Point%22%2C%22coordinates%22%3A%5B" + lon + "," + lat + "%5D%7D%7D%2C%7B%22type%22%3A%22Feature%22%2C%22properties%22%3A%7B%22marker-color%22%3A%22%23e99401%22%2C%22marker-size%22%3A%22medium%22%2C%22marker-symbol%22%3A%22park%22%7D%2C%22geometry%22%3A%7B%22type%22%3A%22Point%22%2C%22coordinates%22%3A%5B-122.25916385650635,37.80629162635318%5D%7D%7D%2C%7B%22type%22%3A%22Feature%22%2C%22properties%22%3A%7B%22marker-color%22%3A%22%23d505ff%22%2C%22marker-size%22%3A%22medium%22%2C%22marker-symbol%22%3A%22music%22%7D%2C%22geometry%22%3A%7B%22type%22%3A%22Point%22%2C%22coordinates%22%3A%5B-122.25650310516359,37.8063933469406%5D%7D%7D%5D%7D)/-122.256654,37.804077,13/500x300?access_token=" + Token, v.alpha2],
            ["Style: F", usedPrefix + command + " nice https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/geojson(%7B%22type%22%3A%22Point%22%2C%22coordinates%22%3A%5B" + lon + "%2C" + lat + "%5D%7D)/" + lon + "," + lat + ",12/500x300?access_token=" + Token, v.alpha2],
            ["Style: G", usedPrefix + command + " nice https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/pin-s-a+9ed4bd(" + lon + "," + lat + "),pin-s-b+000(" + lon + "," + lat + "),path-5+f44-0.5(%7DrpeFxbnjVsFwdAvr@cHgFor@jEmAlFmEMwM_FuItCkOi@wc@bg@wBSgM)/auto/500x300?access_token=" + Token, v.alpha2]
          ]
        ]);
      }), lon || lat) return conn.sendList(m.chat, htki + " 📺 MAPS Search 🔎 " + htka, `⚡ Silakan pilih MAPS Search di tombol di bawah...\n*Teks yang anda kirim:* ${text}\n\nKetik ulang *${usedPrefix + command}* teks anda untuk mengubah teks lagi`, author, "☂️ MAPS Search Disini ☂️", listSections, m);
    if (!lon || !lat) throw "Masukkan Longitude dan Latitude\nEx. .mapbox custom 16.000 16.000";
  }
};
handler.command = ["mapbox"];
export default handler;