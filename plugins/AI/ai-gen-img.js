import {
  Svgai,
  Arthub,
  Limewire
} from "../../lib/tools/ai-gen.js";
import {
  ExhApiClient
} from "../../lib/ai/exh-api.js";
import fetch from "node-fetch";
const exh = new ExhApiClient();
const handler = async (m, {
  conn,
  args,
  usedPrefix,
  command
}) => {
  const text = args.length ? args.join(" ") : m.quoted?.text || m.quoted?.caption || m.quoted?.description || null;
  if (!text) {
    return m.reply(`Masukkan teks atau reply pesan dengan teks yang ingin diolah.\nContoh penggunaan:\n*${usedPrefix}${command} Hai, apa kabar?*`);
  }
  m.react(wait);
  try {
    const versionCommand = command.match(/^txt2img(\d+)$/)?.[1];
    let data;
    switch (command) {
      case "svgai":
        data = await Svgai(text);
        break;
      case "arthub":
        data = await Arthub(text);
        break;
      case "limewire":
        data = await Limewire(text);
        break;
      case "txt2img3":
        await conn.sendFile(m.chat, `https://api.fumifumi.xyz/api/text2img?query=${encodeURIComponent(text)}`, "", `Image for ${text}`, m, false, {
          mentions: [m.sender]
        });
        return;
      case "txt2img4":
        await conn.sendFile(m.chat, `https://s5nkoou91a.execute-api.us-east-1.amazonaws.com/Prod/image?prompt=${encodeURIComponent(text)}`, "", `Image for ${text}`, m, false, {
          mentions: [m.sender]
        });
        return;
      case "txt2img5":
        const stabilityImages = await stabilityai(text);
        await conn.sendMessage(m.chat, {
          image: {
            url: stabilityImages[0]?.url
          },
          caption: `Image for ${text}`
        }, {
          quoted: m
        });
        return;
      case versionCommand:
        await conn.sendFile(m.chat, `https://widipe.com/v${versionCommand}/text2img?text=${encodeURIComponent(text)}`, "", `Image for ${text}`, m, false, {
          mentions: [m.sender]
        });
        return;
      case "txt2avatar":
        const avatarImage = await exh.txt2avatar(text);
        await conn.sendMessage(m.chat, {
          image: avatarImage,
          caption: `Image for ${text}`
        }, {
          quoted: m
        });
        return;
      default:
        return;
    }
    if (data) {
      const imageUrl = {
        svgai: data.data[0]?.generated_png_s3_url || data.data[0]?.png_s3_url,
        arthub: data.generations[0]?.img,
        limewire: data.data[0]?.asset_url
      } [command];
      if (imageUrl) {
        await conn.sendFile(m.chat, imageUrl, "", `Image for ${text}`, m, false, {
          mentions: [m.sender]
        });
      }
    }
  } catch (e) {
    console.error(e);
    m.react(eror);
  }
};
handler.help = ["svgai", "arthub", "limewire", "txt2img3", "txt2img4", "txt2img5", "txt2avatar"];
handler.tags = ["ai"];
handler.command = /^(svgai|arthub|limewire|txt2img[3-5]|txt2img[6-9]|txt2img1[0-2]|txt2avatar)$/i;
export default handler;
async function stabilityai(prompt) {
  const enhancements = " realistic, smoothening, epic cinematic lighting, dark villanous looking background.";
  prompt = prompt.replace("{enhanced}", enhancements);
  const BASE_URL = "https://stabilityai-stable-diffusion-3-medium.hf.space/";
  const session_hash = Math.random().toString(36).substring(2).slice(1);
  try {
    const joinResp = await fetch(`${BASE_URL}queue/join?__theme=light`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        data: [prompt, "", 0, true, 1024, 1024, 5, 28],
        event_data: null,
        fn_index: 1,
        session_hash: session_hash,
        trigger_id: 4
      })
    });
    const joinData = await joinResp.json();
    if (joinData.event_id) {
      const dataResp = await fetch(`${BASE_URL}queue/data?session_hash=${session_hash}`);
      const dataText = await dataResp.text();
      const splited = dataText.split("\n");
      const processData = line => {
        const match = line.match(/^data: (.+)$/);
        return match ? JSON.parse(match[1]) : null;
      };
      const processStartsData = splited.map(processData).find(d => d && (d.event_id || d.success)) || null;
      return processStartsData?.output?.data || null;
    }
  } catch (e) {
    console.log("error:" + e.message);
    return e.message;
  }
}