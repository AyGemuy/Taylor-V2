import fetch from "node-fetch";
class ImageLabs {
  constructor() {
    this.baseUrl = "https://editor.imagelabs.net";
    this.headers = {
      "Content-Type": "application/json; charset=utf-8",
      Accept: "application/json, text/javascript, */*; q=0.01",
      "X-Requested-With": "XMLHttpRequest",
    };
  }
  async prompt(promptText) {
    try {
      const response = await fetch(`${this.baseUrl}/upgrade_prompt`, {
        method: "POST",
        headers: this.headers,
        body: JSON.stringify({
          prompt: promptText,
        }),
      });
      return response.ok
        ? await response.json()
        : {
            error: response.statusText,
          };
    } catch (error) {
      return {
        error: error.message,
      };
    }
  }
  async create(data) {
    try {
      const response = await fetch(`${this.baseUrl}/txt2img`, {
        method: "POST",
        headers: this.headers,
        body: JSON.stringify(data),
      });
      return response.ok
        ? await response.json()
        : {
            error: response.statusText,
          };
    } catch (error) {
      return {
        error: error.message,
      };
    }
  }
  async check(taskId) {
    try {
      const response = await fetch(`${this.baseUrl}/progress`, {
        method: "POST",
        headers: this.headers,
        body: JSON.stringify({
          task_id: taskId,
        }),
      });
      return response.ok
        ? await response.json()
        : {
            error: response.statusText,
          };
    } catch (error) {
      return {
        error: error.message,
      };
    }
  }
  async poll(taskId) {
    const interval = 6e4;
    const timeout = 5 * interval;
    const startTime = Date.now();
    let result;
    while (Date.now() - startTime < timeout) {
      result = await this.check(taskId);
      if (result.status === "Done") return result;
      await new Promise((resolve) => setTimeout(resolve, interval));
    }
    return {
      error: "Polling timed out",
    };
  }
}
const handler = async (m, { conn, args, usedPrefix, command }) => {
  const text =
    args.length >= 1
      ? args.join(" ")
      : m.quoted?.text || m.quoted?.caption || m.quoted?.description || null;
  if (!text) {
    return m.reply(
      `Masukkan teks atau reply pesan dengan teks yang ingin diolah.\nContoh penggunaan:\n*${usedPrefix}${command} Hai, apa kabar?*`,
    );
  }
  m.react(wait);
  const imageLabs = new ImageLabs();
  const randomSeed = Math.floor(Math.random() * 1e10).toString();
  try {
    const createResponse = await imageLabs.create({
      prompt: text,
      seed: randomSeed,
      subseed: Math.floor(Math.random() * 1e10).toString(),
      attention: 0,
      width: 1024,
      height: 1344,
      tiling: false,
      negative_prompt: "",
      reference_image: "",
      reference_image_type: null,
      reference_strength: 30,
    });
    if (createResponse.error) {
      return m.reply(`Error: ${createResponse.error}`);
    }
    const pollResponse = await imageLabs.poll(createResponse.task_id);
    if (pollResponse.error) {
      return m.reply(`Error: ${pollResponse.error}`);
    }
    const { final_image_url } = pollResponse;
    await conn.sendFile(
      m.chat,
      final_image_url,
      "",
      `Image for ${text}`,
      m,
      false,
      {
        mentions: [m.sender],
      },
    );
  } catch (error) {
    console.error(error);
    m.react(eror);
  }
};
handler.help = ["imagelabs"];
handler.tags = ["ai"];
handler.command = /^(imagelabs)$/i;
export default handler;
