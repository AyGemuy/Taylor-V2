import {
  fetch
} from "undici";
import uploadImage from "../../lib/uploadImage.js";
import Bardie from "../../lib/ai/bardie.js";
import {
  dekuai
} from "../../lib/ai/ai-dekuai.js";
import {
  Gemini
} from "../../lib/ai/gemini.js";
const bard = new Bardie();
const gemini = new Gemini("__Secure-1PSID", "g.a000kAizwbBdNbMHiOjpi3wG6gRWpkyc_b7CpDipldhMCt_UJIpDxrcWnqL7c6jCY-ooclL3NwACgYKAXgSARMSFQHGX2MiZAtXZ3cvSt7VxKSgDFmGzxoVAUF8yKqiRmRoIsjmTMIJrvT-Pm6l0076");
const handler = async (m, {
  conn,
  args,
  usedPrefix,
  command
}) => {
  let text, mime, media, link, res;
  const q = m.quoted || m;
  if (args.length >= 1) {
    text = args.join(" ");
  } else if (q && (q.text || q.caption || q.description)) {
    text = q.text || q.caption || q.description;
  } else {
    return m.reply(`Use *${usedPrefix}${command} (text)* or *${usedPrefix}${command}img (text/media)*`);
  }
  mime = (q.msg || q).mimetype || "";
  m.react(wait);
  if (mime && command === "bardimg") {
    try {
      media = await q.download();
      link = await uploadImage(media);
      res = await RizzBardImg(text, link).catch(async () => await joshweb_img(text, link));
      if (res) m.reply(res.content || res);
    } catch (e) {
      console.error(e.message);
      m.react(eror);
    }
  } else if (command === "bard") {
    try {
      res = await RizzBard(text).catch(async () => await joshweb(text)).catch(async () => await GoogleBard(text)).catch(async () => await widipeBard(text));
      if (res) m.reply(res.content || res.result || res);
    } catch (e) {
      console.error(e.message);
      m.react(eror);
    }
  } else {
    return m.reply(`Use *${usedPrefix}${command} (text)* or *${usedPrefix}${command}img (text/media)*`);
  }
};
handler.help = ["bard", "bardimg"];
handler.tags = ["ai"];
handler.command = /^(bard|bardimg)$/i;
export default handler;
async function RizzBard(query) {
  return await bard.question({
    ask: query
  });
}
async function RizzBardImg(query, url) {
  return await bard.questionWithImage({
    ask: query,
    image: url
  });
}
async function joshweb(query) {
  return (await dekuai.api("new/gemini", {
    prompt: query
  }))?.result.data;
}
async function joshweb_img(query, url) {
  return (await dekuai.api("gemini", {
    prompt: query,
    url: url
  }))?.gemini;
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
    const response = await fetch(`https://widipe.com/bard?text=${encodeURIComponent(query)}`);
    const data = await response.json();
    return data.result;
  } catch (error) {
    console.error(`Error in widipeBard: ${error.message}`);
    return null;
  }
}