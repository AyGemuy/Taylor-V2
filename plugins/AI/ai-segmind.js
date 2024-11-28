import fetch from "node-fetch";
import axios from "axios";
const api_key = "SG_8bc7975ff91a8b13";
const postRequest = async (url, data, responseType = "arraybuffer") => {
  const response = await axios.post(url, data, {
    headers: {
      "x-api-key": api_key,
    },
    responseType: responseType,
  });
  return Buffer.from(response.data);
};
const generateFace = async (source_image, face_image) => {
  const res = await fetch("https://api.segmind.com/v1/faceswap-v2", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": api_key,
    },
    body: JSON.stringify({
      source_img: source_image,
      target_img: face_image,
      input_faces_index: 0,
      source_faces_index: 0,
      face_restore: "codeformer-v0.1.0.pth",
      base64: true,
    }),
  });
  if (!res.ok) throw new Error(`Error: ${res.status}`);
  const { image } = await res.json();
  return Buffer.from(image, "base64");
};
const generateFaceVid = async (source_image, face_image) => {
  const res = await fetch("https://api.segmind.com/v1/faceswap-v2", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": api_key,
    },
    body: JSON.stringify({
      source_img: face_image,
      video_input: source_image,
      face_restore: true,
      input_faces_index: 0,
      source_faces_index: 0,
      face_restore_visibility: 1,
      codeformer_weight: 0.95,
      detect_gender_input: "no",
      detect_gender_source: "no",
      frame_load_cap: 0,
      base_64: true,
    }),
  });
  if (!res.ok) throw new Error(`Error: ${res.status}`);
  const { image } = await res.json();
  return Buffer.from(image, "base64");
};
const generateImage = async (endpoint, prompt, extraData = {}) => {
  const url = `https://api.segmind.com/v1/${endpoint}`;
  const data = {
    prompt: prompt,
    seed: Math.floor(Math.random() * 1e9),
    ...extraData,
  };
  return await postRequest(url, data);
};
const upscaleImage = async (image) => {
  const url = "https://api.segmind.com/v1/clarity-upscaler";
  const reqBody = {
    seed: 1337,
    image: image,
    prompt:
      "masterpiece, best quality, highres, <lora:more_details:0.5> <lora:SDXLrender_v2.0:1>",
    dynamic: 6,
    handfix: "disabled",
    sharpen: 0,
    sd_model: "juggernaut_reborn.safetensors [338b85bc4f]",
    scheduler: "DPM++ 3M SDE Karras",
    creativity: 0.35,
    downscaling: false,
    resemblance: 0.6,
    scale_factor: 1,
    tiling_width: 112,
    output_format: "png",
    tiling_height: 144,
    negative_prompt:
      "(worst quality, low quality, normal quality:2) JuggernautNegative-neg",
    num_inference_steps: 18,
    downscaling_resolution: 768,
  };
  return await postRequest(url, reqBody);
};
const processSamV2Video = async (input_video, prompt) => {
  const url = "https://api.segmind.com/v1/sam-v2-video";
  const data = {
    input_video: input_video,
    prompt: prompt,
    overlay_mask: true,
  };
  return await postRequest(url, data);
};
const handler = async (m, { conn, args, usedPrefix, command }) => {
  try {
    const q = m.quoted || m;
    const mime = (q.msg || q).mimetype || "";
    const inputUrl = args.join(" ") || q.text || q.caption;
    if (!inputUrl) {
      return m.reply(
        `Masukkan prompt.\nContoh:\n*${usedPrefix}${command} [prompt]*`,
      );
    }
    m.react(wait);
    let resultBuffer;
    const captionText = `✨ *${command.toUpperCase()}*\n- *Request oleh:* @${m.sender.split("@")[0]}`;
    switch (command) {
      case "segmindswap":
        if (!mime)
          return m.reply(
            `Masukkan gambar dan URL.\nContoh:\n*${usedPrefix}${command} [url gambar]*`,
          );
        const source_image = await q.upload();
        resultBuffer = await generateFace(source_image, inputUrl);
        await conn.sendMessage(
          m.chat,
          {
            image: resultBuffer,
            caption: captionText,
            mentions: [m.sender],
          },
          {
            quoted: m,
          },
        );
        break;
      case "segmindswapvid":
        if (!mime)
          return m.reply(
            `Masukkan gambar dan URL.\nContoh:\n*${usedPrefix}${command} [url gambar]*`,
          );
        const source_vid = await q.upload();
        resultBuffer = await generateFaceVid(source_vid, inputUrl);
        await conn.sendMessage(
          m.chat,
          {
            image: resultBuffer,
            caption: captionText,
            mentions: [m.sender],
          },
          {
            quoted: m,
          },
        );
        break;
      case "segmindflux":
        resultBuffer = await generateImage("fast-flux-schnell", inputUrl, {
          steps: 4,
          aspect_ratio: "1:1",
          base64: false,
        });
        await conn.sendMessage(
          m.chat,
          {
            image: resultBuffer,
            caption: captionText,
            mentions: [m.sender],
          },
          {
            quoted: m,
          },
        );
        break;
      case "segmindcog":
        resultBuffer = await generateImage("cog-video-5b-t2v", inputUrl, {
          input_frames: 49,
          steps: 45,
          guidance_scale: 6,
          frame_rate: 8,
        });
        await conn.sendMessage(
          m.chat,
          {
            video: resultBuffer,
            caption: captionText,
            mentions: [m.sender],
          },
          {
            quoted: m,
          },
        );
        break;
      case "segmindrealism":
        resultBuffer = await generateImage("flux-realism-lora", inputUrl, {
          steps: 20,
          scheduler: "simple",
          sampler_name: "euler",
          aspect_ratio: "2:3",
          upscale_value: 2,
          lora_strength: 0.8,
        });
        await conn.sendMessage(
          m.chat,
          {
            image: resultBuffer,
            caption: captionText,
            mentions: [m.sender],
          },
          {
            quoted: m,
          },
        );
        break;
      case "segmindimg2img":
        if (!mime)
          return m.reply(
            `Masukkan gambar dan prompt.\nContoh:\n*${usedPrefix}${command} [URL gambar] [prompt]*`,
          );
        const base64Image = await q.upload();
        resultBuffer = await generateImage("flux-img2img", inputUrl, {
          image: base64Image,
          steps: 20,
          denoise: 0.75,
          scheduler: "simple",
          sampler_name: "euler",
          base64: false,
        });
        await conn.sendMessage(
          m.chat,
          {
            image: resultBuffer,
            caption: captionText,
            mentions: [m.sender],
          },
          {
            quoted: m,
          },
        );
        break;
      case "segmindfluxdev":
        resultBuffer = await generateImage("flux-dev", inputUrl, {
          guidance: 3.5,
          steps: 25,
          prompt_strength: 0.8,
          output_format: "webp",
          output_quality: 80,
        });
        await conn.sendMessage(
          m.chat,
          {
            image: resultBuffer,
            caption: captionText,
            mentions: [m.sender],
          },
          {
            quoted: m,
          },
        );
        break;
      case "segmindfluxschnell":
        resultBuffer = await generateImage("flux-schnell", inputUrl, {
          steps: 4,
          sampler_name: "euler",
          scheduler: "normal",
          samples: 1,
          width: 1024,
          height: 1024,
          denoise: 1,
        });
        await conn.sendMessage(
          m.chat,
          {
            image: resultBuffer,
            caption: captionText,
            mentions: [m.sender],
          },
          {
            quoted: m,
          },
        );
        break;
      case "segmindfluxpro":
        resultBuffer = await generateImage("flux-pro", inputUrl, {
          guidance: 3,
          steps: 25,
          interval: 2,
          safety_tolerance: 2,
          output_format: "webp",
          output_quality: 80,
        });
        await conn.sendMessage(
          m.chat,
          {
            image: resultBuffer,
            caption: captionText,
            mentions: [m.sender],
          },
          {
            quoted: m,
          },
        );
        break;
      case "segmindillusion":
        if (!mime)
          return m.reply(
            `Masukkan gambar dan URL.\nContoh:\n*${usedPrefix}${command} [prompt]*`,
          );
        const sourceImage = await q.upload();
        resultBuffer = await generateImage("illusion-diffusion-hq", inputUrl, {
          seed: -1,
          image: sourceImage,
          width: 768,
          height: 768,
          prompt: `(masterpiece:1.4), (best quality), (detailed), ${inputUrl}`,
          guidance_scale: 7.5,
          negative_prompt: "ugly, disfigured, low quality, blurry, nsfw",
          qrcode_background: "gray",
          num_inference_steps: 40,
          controlnet_conditioning_scale: 1,
        });
        await conn.sendMessage(
          m.chat,
          {
            image: resultBuffer,
            caption: captionText,
            mentions: [m.sender],
          },
          {
            quoted: m,
          },
        );
        break;
      case "segmindclarity":
        if (!mime)
          return m.reply(
            `Masukkan gambar dan URL.\nContoh:\n*${usedPrefix}${command} [prompt]*`,
          );
        const nonhdImage = await q.upload();
        resultBuffer = await upscaleImage(nonhdImage);
        await conn.sendMessage(
          m.chat,
          {
            image: resultBuffer,
            caption: captionText,
            mentions: [m.sender],
          },
          {
            quoted: m,
          },
        );
        break;
      case "segmindvideo":
        if (!mime)
          return m.reply(
            `Masukkan gambar dan URL.\nContoh:\n*${usedPrefix}${command} [prompt]*`,
          );
        const samVideo = await q.upload();
        resultBuffer = await processSamV2Video(samVideo, inputUrl);
        await conn.sendMessage(
          m.chat,
          {
            video: resultBuffer,
            caption: captionText,
            mentions: [m.sender],
          },
          {
            quoted: m,
          },
        );
        break;
      default:
        m.reply("Command tidak dikenal.");
        break;
    }
    m.react(sukses);
  } catch (error) {
    console.error(error);
    m.react(eror);
  }
};
handler.help = [
  "segmindswap",
  "segmindswapvid",
  "segmindflux",
  "segmindcog",
  "segmindrealism",
  "segmindimg2img",
  "segmindfluxdev",
  "segmindfluxschnell",
  "segmindfluxpro",
  "segmindillusion",
  "segmindclarity",
  "segmindvideo",
];
handler.command =
  /^(segmindswap|segmindswapvid|segmindflux|segmindcog|segmindrealism|segmindimg2img|segmindfluxdev|segmindfluxschnell|segmindfluxpro|segmindillusion|segmindclarity|segmindvideo)$/i;
export default handler;
