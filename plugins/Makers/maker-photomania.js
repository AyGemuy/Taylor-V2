import fetch from "node-fetch";
import {
  FormData,
  Blob
} from "formdata-node";
import {
  fileTypeFromBuffer
} from "file-type";
const handler = async (m, {
  conn,
  args
}) => {
  try {
    const input = args.join(" ");
    if (!input) return conn.reply(m.chat, "❌ Please provide the desired effect index.\n\nUsage: *photomania <effectIndex>*", m);
    const effectIndex = parseInt(input.trim(), 10);
    const effects = await fetchEffectsList();
    if (isNaN(effectIndex) || effectIndex < 1 || effectIndex > effects.length) {
      const itemsList = effects.map((effect, index) => `${index + 1}. ${effect.name}`).join("\n");
      return conn.reply(m.chat, `❌ Invalid effect index. Please provide a valid index.\n\nAvailable options:\n${itemsList}\n\nUsage: *photomania <effectIndex>*`, m);
    }
    const selectedEffect = effects[effectIndex - 1];
    const q = m.quoted || m;
    const buffer = await q.download();
    const {
      ext,
      mime
    } = await fileTypeFromBuffer(buffer) || {};
    if (!mime) throw new Error("No media found or unsupported media type");
    const blob = new Blob([buffer], {
      type: mime
    });
    const photoManipulationResult = await photoManipulation("image", blob, selectedEffect.api_id, ext, mime);
    const tag = `@${m.sender.split("@")[0]}`;
    if (photoManipulationResult.error) {
      throw new Error(photoManipulationResult.error);
    }
    await conn.sendMessage(m.chat, {
      image: {
        url: photoManipulationResult.result.url
      },
      caption: `Result effect *${selectedEffect.name}*\nRequested by: ${tag}`,
      mentions: [m.sender]
    }, {
      quoted: m
    });
  } catch (error) {
    await conn.reply(m.chat, "❌ Error: " + error.message, m);
  }
};
handler.help = ["photomania <effectIndex>"];
handler.tags = ["maker"];
handler.command = /^(photomania)$/i;
export default handler;
async function photoManipulation(namaFile, blob, effectId, ext, mime) {
  try {
    const fd = new FormData();
    fd.append("name", `${namaFile}.${ext}`);
    fd.append("file", blob, `${namaFile}.${ext}`);
    const uploadResponse = await fetch("https://photomania.net/upload/file", {
      method: "POST",
      body: fd
    });
    if (!uploadResponse.ok) {
      throw new Error("Failed to upload file");
    }
    const uploadData = await uploadResponse.json();
    const formData = new URLSearchParams({
      photoId: `${uploadData.id}`,
      effectId: `${effectId}`
    });
    const renderResponse = await fetch("https://photomania.net/render", {
      method: "POST",
      body: formData,
      headers: {
        accept: "application/json, text/javascript, */*; q=0.01",
        "accept-language": "en-US,en;q=0.9,id;q=0.8",
        "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
        "sec-ch-ua": '" Not A;Brand";v="99", "Chromium";v="90", "Google Chrome";v="90"'
      }
    });
    if (!renderResponse.ok) {
      throw new Error("Failed to render photo");
    }
    const renderData = await renderResponse.json();
    return {
      status: renderResponse.status,
      author: "Made by Wudysoft",
      result: {
        url: renderData.url,
        url_secure: renderData.url_secure,
        ukuran: renderData.width + " x " + renderData.height,
        expires_at: renderData.expires_at
      }
    };
  } catch (error) {
    console.error("Error:", error);
    return {
      error: error.message
    };
  }
}
async function fetchEffectsList() {
  try {
    const response = await fetch("https://raw.githubusercontent.com/imbharat420/Tasks/f1c0e5b24778891e18031acbeefecffe2ecfb4e3/knovator%20Gujarat/Knovator/src/utils/data.json");
    const data = await response.json();
    if (!data.sidebar) throw new Error("Invalid data format");
    const effects = data.sidebar.flatMap(category => category.zones || []).flatMap(zone => zone.effects || []).map(effect => ({
      id: effect.id,
      api_id: effect.api_id,
      name: effect.name
    }));
    return effects;
  } catch (error) {
    throw new Error("Failed to fetch effects list: " + error.message);
  }
}