import fetch from "node-fetch";
import {
  URLSearchParams
} from "url";
const handler = async (m, {
  command,
  usedPrefix,
  conn,
  text,
  args
}) => {
  let q = m.quoted ? m.quoted : m;
  if (!((q.msg || q).mimetype || "")) throw "No media found";
  let media = await q?.download();
  m.react(wait);
  try {
    const Anim = await postData(media);
    if (Anim) {
      const tag = `@${m.sender.split("@")[0]}`;
      await conn.sendMessage(m.chat, {
        image: await (await conn.getFile(Anim)).data,
        caption: `Nih effect *img-to-anime* nya\nRequest by: ${tag}`,
        mentions: [m.sender]
      }, {
        quoted: m
      });
    } else console.log("Tidak ada respons dari OpenAI atau terjadi kesalahan.");
  } catch (e) {
    m.react(eror);
  }
};
handler.help = ["img2anim"].map(v => v + " (Balas foto)"), handler.tags = ["tools"],
  handler.command = /^(img2anim)$/i, handler.limit = !0;
export default handler;
async function postData(imageBuffer) {
  const base64String = imageBuffer.toString("base64"),
    params = new URLSearchParams({
      image: base64String
    }),
    response = await fetch("https://api.taoanhdep.com/public/anime.php", {
      method: "POST",
      headers: {
        "content-type": "application/x-www-form-urlencoded"
      },
      body: params.toString()
    });
  return (await response.json()).img;
}