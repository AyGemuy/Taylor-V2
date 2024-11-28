import { fetch } from "undici";
import { FormData, Blob } from "formdata-node";
import { fileTypeFromBuffer } from "file-type";
import uploadImage from "../../lib/uploadImage.js";
import Bardie from "../../lib/ai/bardie.js";
import { Gemini } from "../../lib/ai/gemini.js";
const bard = new Bardie();
const gemini = new Gemini(
  "__Secure-1PSID",
  "g.a000kAizwbBdNbMHiOjpi3wG6gRWpkyc_b7CpDipldhMCt_UJIpDxrcWnqL7c6jCY-ooclL3NwACgYKAXgSARMSFQHGX2MiZAtXZ3cvSt7VxKSgDFmGzxoVAUF8yKqiRmRoIsjmTMIJrvT-Pm6l0076",
);
const handler = async (m, { conn, args, usedPrefix, command }) => {
  let text, mime, media, link, res;
  const q = m.quoted || m;
  if (args.length >= 1) {
    text = args.join(" ");
  } else if (q && (q.text || q.caption || q.description)) {
    text = q.text || q.caption || q.description;
  } else {
    return m.reply(
      `Use *${usedPrefix}${command} (text)* or *${usedPrefix}${command}img (text/media)*`,
    );
  }
  mime = (q.msg || q).mimetype || "";
  m.react(wait);
  try {
    if (mime && command === "bardimg") {
      media = await q.download();
      link = await uploadImage(media);
      for (const func of [RizzBardImg, GeminiMilay]) {
        try {
          res = await func(text, link);
          if (res) break;
        } catch (e) {
          console.error(e.message);
        }
      }
    } else if (command === "bard") {
      for (const func of [RizzBard, widipeBard, GeminiMilay, GoogleBard]) {
        try {
          res = await func(text);
          if (res) break;
        } catch (e) {
          console.error(e.message);
        }
      }
    }
    if (res) m.reply(res.content || res.result || res);
    else m.react(eror);
  } catch (e) {
    console.error(e.message);
    m.react(eror);
  }
};
handler.help = ["bard", "bardimg"];
handler.tags = ["ai"];
handler.command = /^(bard|bardimg)$/i;
export default handler;
async function RizzBard(query) {
  return await bard.question({
    ask: query,
  });
}
async function RizzBardImg(query, url) {
  return await bard.questionWithImage({
    ask: query,
    image: url,
  });
}
async function GoogleBard(query) {
  try {
    return (await gemini.question(query)).content;
  } catch (error) {
    console.error(`Error in GoogleBard: ${error.message}`);
    return null;
  }
}
async function widipeBard(query) {
  try {
    const response = await fetch(
      `https://widipe.com/bard?text=${encodeURIComponent(query)}`,
    );
    const data = await response.json();
    return data.result;
  } catch (error) {
    console.error(`Error in widipeBard: ${error.message}`);
    return null;
  }
}
async function GeminiMilay(prompt, image = null) {
  try {
    const blob = image
      ? Buffer.isBuffer(image)
        ? new Blob([image], {
            type: (await fileTypeFromBuffer(image)).mime,
          })
        : await fetch(image).then(async (res) => {
            const buffer = await res.arrayBuffer();
            return new Blob([buffer], {
              type: (await fileTypeFromBuffer(buffer)).mime,
            });
          })
      : null;
    const form = new FormData();
    form.append("prompt", prompt);
    if (blob) form.append("image", blob, "image.jpg");
    const response = image
      ? await fetch("https://api-milay-gemini.vercel.app/api/process", {
          method: "POST",
          body: form,
        }).then((res) => res.json())
      : await fetch(
          `https://api-milay-gemini.vercel.app/api/query?prompt=${encodeURIComponent(prompt)}`,
        ).then((res) => res.json());
    return response?.response || null;
  } catch (error) {
    console.error("Terjadi kesalahan saat memproses permintaan:", error);
    return null;
  }
}
