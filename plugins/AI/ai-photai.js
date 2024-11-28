import fetch from "node-fetch";
const token =
  "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmQwNjg3ZGZiZDU3ODBjMGY2NTVjMjUiLCJlbWFpbCI6ImFiZG1hbGlrYWxxYWRyaTIwMDFAZ21haWwuY29tIiwicGxhdGZvcm0iOiJXRUIiLCJ1c2VyVHlwZSI6IkZSRUUiLCJwYWNrYWdlSWQiOiJQQUNLQUdFX0lEX1BIT1RfQUlfV0VCIiwiY291bnRyeUNvZGUiOiIiLCJpYXQiOjE3MjQ5MzQyNjl9.hP6fq3wEFJrZH0AK8kHohOpqHIcEv2VOCI9_UCEKfHNa82vyPBfO3sbKWwu0bxARcjcrUIFrBqXlCO9Q_3KSkNuBN-LZnJNijqsgLmZ-2NnBR_n3X8xk3U9PXgtFGdsg7rN8unmASv69B_8MPPSttu_eDYToJMDopDcsd9Hpg8flvGLR3K8xl2fY_mUJgVrvIFMfk-iPIBwYKFlPQqPXyHbiiLuXU4Fu5N5TIblfLpcdxkux8fUz-FO7FRODT9vcaqPnL1Vq78uuL746Tz1tGvAKaMkvDv8lJRwsqWw1Rbw79R-YMqhA5NW-mutevP06WY9Ql5OukhOgVcFlnN72Pw";
const getPromptFromImage = async (inputImageLink) => {
  const url = "https://prodapi.phot.ai/app/api/v5/user_activity/image-2-prompt";
  const headers = {
    Accept: "application/json, text/plain, */*",
    "Content-Type": "application/json",
    Authorization: token,
    "x-user-ip": "182.1.200.19",
    "x-user-country": "ID",
    "User-Agent": "Mozilla/5.0",
    Referer: "https://www.phot.ai/ai-art-generator/create",
  };
  const response = await fetch(url, {
    method: "POST",
    headers: headers,
    body: JSON.stringify({
      input_image_link: inputImageLink,
    }),
  });
  if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
  const data = await response.json();
  return data.data.prompt;
};
const createArtAndPollStatus = async (prompt) => {
  const createArtUrl = "https://prodapi.phot.ai/v5/create-art";
  const statusUrl =
    "https://prodapi.phot.ai/app/api/v2/user_activity/order-status";
  const headers = {
    Accept: "application/json, text/plain, */*",
    Authorization: token,
    "x-user-ip": "182.1.200.19",
    "x-user-country": "ID",
    "User-Agent": "Mozilla/5.0",
    Referer: "https://www.phot.ai/ai-art-generator/create",
    "Content-Type": "application/json",
  };
  const body = JSON.stringify({
    prompt: prompt,
    guidance_scale: 7.5,
    image_strength: "0.5",
    num_outputs: 2,
    aspect_ratio: "1:1",
  });
  const createArtResponse = await fetch(createArtUrl, {
    method: "POST",
    headers: headers,
    body: body,
  });
  if (!createArtResponse.ok)
    throw new Error(
      `Create Art HTTP error! Status: ${createArtResponse.status}`,
    );
  const { data } = await createArtResponse.json();
  const orderId = data.order_id;
  while (true) {
    const statusResponse = await fetch(`${statusUrl}?order_id=${orderId}`, {
      method: "GET",
      headers: headers,
    });
    if (!statusResponse.ok)
      throw new Error(
        `Order Status HTTP error! Status: ${statusResponse.status}`,
      );
    const statusData = await statusResponse.json();
    if (statusData.order_status === "order_complete") return statusData;
    await new Promise((resolve) => setTimeout(resolve, 5e3));
  }
};
const handler = async (m, { conn, text }) => {
  const q = m.quoted || m;
  const mime = (q.msg || q).mimetype || "";
  if (mime) {
    m.react(wait);
    try {
      const media = await q.upload();
      const link = media;
      if (!link) return m.reply("Format media tidak didukung");
      const prompt = await getPromptFromImage(link);
      m.reply(`${prompt}`);
      m.react(sukses);
    } catch (error) {
      console.error("Error:", error);
      m.react(eror);
    }
  } else if (text) {
    m.react(wait);
    try {
      const result = await createArtAndPollStatus(text);
      if (result.order_status === "order_complete") {
        const outputUrls = result.output_urls;
        for (let i = 0; i < outputUrls.length; i++) {
          await conn.sendMessage(
            m.chat,
            {
              image: {
                url: outputUrls[i].url,
              },
              caption: `Image *${i + 1}* of *${outputUrls.length}*`,
              mentions: [m.sender],
            },
            {
              quoted: m,
            },
          );
        }
      }
      m.react(sukses);
    } catch (error) {
      console.error("Error:", error);
      m.react(eror);
    }
  } else {
    m.reply("Tidak ada media atau teks yang ditemukan");
  }
};
handler.help = ["photai"];
handler.tags = ["ai"];
handler.command = /^(photai)$/i;
export default handler;
