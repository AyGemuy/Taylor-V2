import fetch from "node-fetch";
const handler = async (m, { conn, text, usedPrefix, command }) => {
  let q = m.quoted ? m.quoted : m,
    img = ((q.msg || q).mimetype, await q?.upload()),
    url = img,
    js = await fetch(
      `https://api.lolhuman.xyz/api/agedetect?apikey=${Object.entries(APIKeys).find(([key]) => key.includes("lolhuman"))?.[1]}&img=${encodeURIComponent(url)}`,
    ),
    has = await js.json();
  m.reply(
    "Hasil deteksi Usia dar gambar tersebut adalah " + has.result + " Tahun",
  );
};
(handler.help = ["agedetect (caption|reply media)"]),
  (handler.tags = ["maker"]),
  (handler.command = /^(agedetect|usia)$/i);
export default handler;
