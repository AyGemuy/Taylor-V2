import uploadFile from "../../lib/uploadFile.js";
import uploadImage from "../../lib/uploadImage.js";
import fetch from "node-fetch";
const handler = async (m, {
  conn,
  usedPrefix,
  args,
  text,
  command
}) => {
  let q = m.quoted ? m.quoted : m,
    mime = (q.msg || q).mimetype || "";
  if (!mime) throw "No media found";
  let media = await q?.download(),
    isTele = /image\/(png|jpe?g|gif)|video\/mp4/.test(mime),
    link = await (isTele ? uploadImage : uploadFile)(media);
  if (link && text) {
    m.react(wait);
    let hasil = await Replicate(link, text, "3a4886dd3230e523600d3b555f651dc82aba3a4e");
    await conn.sendFile(m.chat, hasil.generated, "result", "ID:\n" + hasil.id, m);
  } else m.react(eror);
};
handler.help = ["replicate"], handler.tags = ["internet", "tools"], handler.command = /^replicate$/i;
export default handler;
async function Replicate(imageUrl, prompt, ApiKey) {
  try {
    let startResponse = await fetch("https://api.replicate.com/v1/predictions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Token " + ApiKey
        },
        body: JSON.stringify({
          version: "854e8727697a057c525cdb45ab037f64ecca770a1769cc52287c2e56472a247b",
          input: {
            image: imageUrl,
            prompt: prompt
          }
        })
      }),
      jsonStartResponse = await startResponse.json(),
      endpointUrl = jsonStartResponse.urls.get;
    const originalImage = jsonStartResponse.input.image,
      roomId = jsonStartResponse.id;
    let generatedImage;
    for (; !generatedImage;) {
      let finalResponse = await fetch(endpointUrl, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Token " + ApiKey
          }
        }),
        jsonFinalResponse = await finalResponse.json();
      if ("succeeded" === jsonFinalResponse.status) generatedImage = jsonFinalResponse.output[1];
      else {
        if ("failed" === jsonFinalResponse.status) break;
        await new Promise(resolve => setTimeout(resolve, 1e3));
      }
    }
    if (generatedImage) return {
      original: originalImage,
      generated: generatedImage,
      id: roomId
    };
    console.log("Failed to restore image");
  } catch (error) {
    console.log("Failed to restore image");
  }
}