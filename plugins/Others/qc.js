import {
  sticker
} from "../../lib/sticker.js";
import axios from "axios";
import uploadFile from "../../lib/uploadFile.js";
import _ from "lodash";
const handler = async (m, {
  conn,
  text
}) => {
  try {
    const q = m.quoted || m;
    const match = q?.mimetype?.match(/^(image|video|webp)\//);
    const mediaUrl = match ? await uploadFile(await q?.download()) : logo;
    const senderId = parseInt(m.sender.split("@")[0]);
    const senderName = m.name || await conn.getName(m.sender);
    const senderPhotoUrl = await conn.profilePictureUrl(m.sender, "image").catch(() => logo);
    const replyMessage = q !== m ? {
      entities: [],
      avatar: true,
      id: parseInt(q.sender.split("@")[0]),
      name: q.name || await conn.getName(q.sender),
      photo: {
        url: await conn.profilePictureUrl(q.sender, "image").catch(() => logo)
      },
      text: q.text || q.caption || q.description || q.message?.documentMessage?.caption || ""
    } : null;
    const messageText = text || q?.text || q?.caption || q?.description || q?.message?.documentMessage?.caption || m.text || m.caption || m.message?.documentMessage?.caption || "";
    const json = {
      type: "quote",
      format: "png",
      backgroundColor: "#e7ffdd",
      width: 512,
      height: 768,
      scale: 2,
      messages: [_.omitBy({
        entities: [],
        avatar: true,
        from: {
          id: senderId,
          name: senderName,
          photo: {
            url: senderPhotoUrl
          }
        },
        text: messageText,
        replyMessage: replyMessage || undefined,
        media: match ? {
          url: `https://wsrv.nl/?url=${encodeURIComponent(mediaUrl)}&output=png`
        } : undefined
      }, _.isUndefined)]
    };
    const buffer = await Quotly(json);
    if (!buffer) return m.reply("Error generating quote image.");
    const stickerBuffer = await sticker(buffer, false, senderName, m.sender.split("@")[0]);
    if (!stickerBuffer) return m.reply("Error creating sticker.");
    m.reply(stickerBuffer);
  } catch (error) {
    console.error("Handler Error:", error);
    m.reply("An error occurred while processing your request.");
  }
};
handler.help = ["qc"];
handler.tags = ["sticker"];
handler.command = /^(qc)$/i;
export default handler;
async function Quotly(data) {
  const headers = {
    "content-type": "application/json"
  };
  const urls = ["https://quotly.netorare.codes/generate", "https://btzqc.betabotz.eu.org/generate", "https://qc.botcahx.eu.org/generate"];
  try {
    for (let i = 0; i < urls.length; i++) {
      const response = await fetch(urls[i], {
        method: "POST",
        headers: headers,
        body: JSON.stringify(data)
      });
      if (!response.ok) {
        console.log(`Quotly Error: versi ${i + 1} gagal`);
        continue;
      }
      const result = await response.json();
      if (result?.result?.image) {
        return Buffer.from(result.result.image, "base64");
      }
    }
    const fallbackResponse = await fetch("https://widipe.com/quotely", {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      },
      params: new URLSearchParams({
        avatar: data.messages[0]?.from.photo.url,
        name: data.messages[0]?.from.name,
        text: data.messages[0]?.text
      })
    });
    const arrayBuffer = await fallbackResponse.arrayBuffer();
    return Buffer.from(arrayBuffer);
  } catch (error) {
    console.error("Quotly Error:", error);
    return null;
  }
}