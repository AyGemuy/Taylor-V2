import {
  Uploader
} from "../../lib/tools/uploader.js";
const upload = new Uploader();
import fetch from "node-fetch";
const handler = async (m, {
  text,
  usedPrefix,
  command
}) => {
  try {
    let q = m.quoted ? m.quoted : m,
      mime = (q.msg || q).mimetype || "",
      [text1, text2] = text.split("|");
    if (!mime) throw "Media not found";
    let media = await q?.download(),
      waitMessage = "Please wait...";
    m.reply(waitMessage);
    const response = await upload.uploadPomf2(media);
    if (response) {
      let linkVideo = await TextInVideo(response, text1, text2);
      const message = `*Your message was successfully sent! 🚀*\n\n*File Details:*\n*URL:* ${linkVideo}`;
      await conn.sendFile(m.chat, await fetchData(linkVideo), "", message, m);
    } else m.reply("Your message failed to send. 🙁");
  } catch (error) {
    console.error(error), m.reply("An error occurred while processing your request. 🙁");
  }
};
handler.help = ["textinvideo"].map(v => `${v} teks1|teks2`), handler.tags = ["tools"],
  handler.command = /^(textinvideo)$/i;
export default handler;
const TextInVideo = async (link, text1, text2) => {
  try {
    const response = await fetch("https://api.creatomate.com/v1/renders", {
      method: "POST",
      headers: {
        Authorization: "Bearer 960789f9b7ea4a9b9311e7b35eb3d3b515492c525dd19f54b692ba3027d3c424d6d0595595a6ba8b368d8226fda382a6",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        template_id: "872df3b2-46fa-4547-b55c-190d92cceb99",
        modifications: {
          "ecf1a01d-ff16-4b5f-a58c-a4998b02e502": link,
          "Text-1": text1,
          "Text-2": text2
        }
      })
    });
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    const data = await response.json();
    return data[0]?.url;
  } catch (error) {
    throw console.error("Error fetching data:", error), error;
  }
}, fetchData = async url => {
  try {
    const referer = new URL(url).origin,
      response = await fetch(url, {
        method: "GET",
        headers: {
          Referer: referer,
          Accept: "*/*"
        }
      });
    return await response.arrayBuffer();
  } catch (error) {
    throw new Error("Error fetching data:", error);
  }
};