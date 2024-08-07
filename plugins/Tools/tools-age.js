import fetch from "node-fetch";
import uploadFile from "../../lib/uploadFile.js";
import uploadImage from "../../lib/uploadImage.js";
const handler = async (m, {
  conn,
  text,
  usedPrefix,
  command
}) => {
  let q = m.quoted ? m.quoted : m,
    img = ((q.msg || q).mimetype, await q?.download()),
    url = await uploadImage(img),
    js = await fetch(`https://api.lolhuman.xyz/api/agedetect?apikey=${Object.entries(APIKeys).find(([ key ]) => key.includes("lolhuman"))?.[1]}&img=${encodeURIComponent(url)}`),
    has = await js.json();
  m.reply("Hasil deteksi Usia dar gambar tersebut adalah " + has.result + " Tahun");
};
handler.help = ["agedetect (caption|reply media)"], handler.tags = ["maker"],
  handler.command = /^(agedetect|usia)$/i;
export default handler;