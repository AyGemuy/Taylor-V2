import { Svgai, Arthub, Limewire } from "../../lib/tools/ai-gen.js";
import { ExhApiClient } from "../../lib/ai/exh-api.js";
import fetch from "node-fetch";
const exh = new ExhApiClient();
const handler = async (m, { conn, args, usedPrefix, command }) => {
  const text = args.length
    ? args.join(" ")
    : m.quoted?.text || m.quoted?.caption || m.quoted?.description || null;
  if (!text) {
    return m.reply(
      `Masukkan teks atau reply pesan dengan teks yang ingin diolah.\nContoh penggunaan:\n*${usedPrefix}${command} Hai, apa kabar?*`,
    );
  }
  m.react(wait);
  try {
    const versionCommand = command.match(/^genimg(\d+)$/)?.[1];
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
      case "genimg7":
        await conn.sendFile(
          m.chat,
          `https://api.fumifumi.xyz/api/text2img?query=${encodeURIComponent(text)}`,
          "",
          `Image for ${text}`,
          m,
          false,
          {
            mentions: [m.sender],
          },
        );
        return;
      case "genimg8":
        await conn.sendFile(
          m.chat,
          `https://s5nkoou91a.execute-api.us-east-1.amazonaws.com/Prod/image?prompt=${encodeURIComponent(text)}`,
          "",
          `Image for ${text}`,
          m,
          false,
          {
            mentions: [m.sender],
          },
        );
        return;
      case "genimg9":
        const stabilityImages = await stabilityai(text);
        await conn.sendMessage(
          m.chat,
          {
            image: {
              url: stabilityImages,
            },
            caption: `Image for ${text}`,
          },
          {
            quoted: m,
          },
        );
        return;
      case `genimg${versionCommand}`:
        await conn.sendFile(
          m.chat,
          `https://api-xovvip.vercel.app/text2img?text=${encodeURIComponent(text)}`,
          "",
          `Image for ${text}`,
          m,
          false,
          {
            mentions: [m.sender],
          },
        );
        return;
      case "txt2avatar":
        await conn.sendMessage(
          m.chat,
          {
            image: await exh.txt2avatar(text),
            caption: `Image for ${text}`,
          },
          {
            quoted: m,
          },
        );
        return;
      case "halfillust":
        await conn.sendMessage(
          m.chat,
          {
            image: await half(text),
            caption: `Image for ${text}`,
          },
          {
            quoted: m,
          },
        );
        return;
      default:
        return;
    }
    if (data) {
      const imageUrl = {
        svgai: data.data[0]?.generated_png_s3_url || data.data[0]?.png_s3_url,
        arthub: data.generations[0]?.img,
        limewire: data.data[0]?.asset_url,
      }[command];
      if (imageUrl) {
        await conn.sendFile(
          m.chat,
          imageUrl,
          "",
          `Image for ${text}`,
          m,
          false,
          {
            mentions: [m.sender],
          },
        );
      }
    }
  } catch (e) {
    console.error(e);
    m.react(eror);
  }
};
handler.help = ["svgai", "arthub", "limewire", "txt2avatar", "genimg 1 - 9"];
handler.tags = ["ai"];
handler.command =
  /^(svgai|arthub|limewire|genimg[1-9]|txt2avatar|halfillust)$/i;
export default handler;
async function stabilityai(prompt) {
  const enhancements =
    " realistic, smoothening, epic cinematic lighting, dark villanous looking background.";
  prompt = prompt.replace("{enhanced}", enhancements);
  const BASE_URL = "https://stabilityai-stable-diffusion-3-medium.hf.space/";
  const session_hash = Math.random().toString(36).substring(2);
  try {
    const { event_id } = await (
      await fetch(`${BASE_URL}queue/join?__theme=light`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: [prompt, "", 0, true, 1024, 1024, 5, 28],
          event_data: null,
          fn_index: 1,
          session_hash: session_hash,
          trigger_id: 4,
        }),
      })
    ).json();
    if (event_id) {
      const inputString = await (
        await fetch(`${BASE_URL}queue/data?session_hash=${session_hash}`)
      ).text();
      const urls = inputString
        .split("\n")
        .filter((line) => line.startsWith("data:"))
        .map((line) => JSON.parse(line.slice(5).trim()))
        .slice(-2)
        .map((entry) => entry?.output?.data?.[0]?.url);
      return urls[0];
    }
    return null;
  } catch (e) {
    console.error("error:", e.message);
    return e.message;
  }
}
async function half(prompt) {
  const url =
    "https://api-inference.huggingface.co/models/davisbro/half_illustration";
  const headers = {
    "User-Agent":
      "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Mobile Safari/537.36",
    Referer: `https://huggingface.co/davisbro/half_illustration?text=${encodeURIComponent(prompt)}`,
    "Content-Type": "application/json",
  };
  const body = JSON.stringify({
    inputs: prompt,
  });
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: headers,
      body: body,
      compress: true,
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    return buffer;
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}
