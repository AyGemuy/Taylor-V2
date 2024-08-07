import fetch from "node-fetch";
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
    const openAIResponse = await fetchAnimeData(media);
    if (openAIResponse) {
      const result = openAIResponse,
        tag = `@${m.sender.split("@")[0]}`;
      await conn.sendMessage(m.chat, {
        image: {
          url: result
        },
        caption: `Nih effect *photo-to-anime* nya\nRequest by: ${tag}`,
        mentions: [m.sender]
      }, {
        quoted: m
      });
    } else console.log("Tidak ada respons dari OpenAI atau terjadi kesalahan.");
  } catch (e) {
    m.react(eror);
  }
};
handler.help = ["jadianime"].map(v => v + " (Balas foto)"), handler.tags = ["tools"],
  handler.command = /^(jadianime)$/i, handler.limit = !0;
export default handler;
async function fetchAnimeData(imageBuffer) {
  const base64String = imageBuffer.toString("base64"),
    body = new URLSearchParams();
  body.set("image", base64String);
  const response = await fetch("https://api.taoanhdep.com/public/anime.php", {
    headers: {
      "content-type": "application/x-www-form-urlencoded"
    },
    body: body.toString(),
    method: "POST"
  });
  return (await response.json()).img;
}