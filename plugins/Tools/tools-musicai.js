import fetch from "node-fetch";
const handler = async (m, {
  text,
  command,
  usedPrefix,
  conn
}) => {
  let q = m.quoted ? m.quoted : m,
    mime = q.mediaType || "";
  if (!/image|video|audio|sticker|document/.test(mime)) throw "Reply media vn";
  {
    let media = await q?.download(),
      aduiotext = (await recognizeAudio(media)).match('"text": "(.*)",')[1].trim();
    m.reply(aduiotext);
  }
};
handler.help = ["witai"], handler.tags = ["tools"], handler.command = /^(witai)$/i;
export default handler;
async function recognizeAudio(input) {
  return await fetch("https://api.wit.ai/speech?v=20211210", {
    method: "POST",
    headers: {
      Authorization: "Bearer SPVMC7DYW5SJWTSNWQJIL33I6LICH5LK",
      "Content-Type": "audio/mpeg3"
    },
    body: input
  }).then(res => res.text());
}