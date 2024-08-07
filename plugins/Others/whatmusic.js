import fs from "fs";
import cheerio from "cheerio";
import fetch from "node-fetch";
import FormData from "form-data";
const handler = async m => {
  try {
    const q = m.quoted ? m.quoted : m,
      mime = q.mediaType || "";
    if (/image|video|audio|sticker|document/.test(mime)) {
      const media = await q?.download(!0),
        data = await uploadFile(media),
        res = await fetch(`https://api.audd.io/?url=${data.url}&return=apple_music&api_token=945881d8079d620d74e93a218c42f8c6`),
        x = (await res.json()).result;
      return m.reply(`*Lagu Ditemukan!*\n\n*Judul* : ${x.title}\n*Artist* : ${x.artist}\n*Label* : ${x.label}\n*Album* : ${x.album}\n*Release* : ${x.release_date}\n*Link* : ${x.song_link}`);
    }
    throw new Error("No media found");
  } catch (error) {
    throw new Error(error.message);
  }
};
handler.help = ["judulnya"], handler.tags = ["random"], handler.command = /^judul(musik|lagu|nya)$/i;
export default handler;
async function uploadFile(path) {
  const form = new FormData();
  form.append("file", fs.createReadStream(path));
  const res = await (await fetch("https://api.anonfiles.com/upload", {
    method: "post",
    body: form
  })).json();
  if (await fs.promises.unlink(path), !res.status) throw new Error(res.error.message);
  const data = await fetch(res.data.file.url.full);
  cheerio.load(await data.text());
  return {
    url: res.data.file.url.full,
    url2: res.data.file.url.short
  };
}