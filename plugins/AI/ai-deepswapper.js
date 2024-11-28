import fetch from "node-fetch";
async function urlToBase64(imageUrl) {
  try {
    const response = await fetch(imageUrl);
    if (!response.ok) throw new Error("Failed to fetch image");
    const buffer = await response.arrayBuffer();
    return Buffer.from(buffer).toString("base64");
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}
async function swapImage(targetBase64, targetUrl) {
  const sourceBase64 = await urlToBase64(targetUrl);
  if (!targetBase64 || !sourceBase64)
    throw new Error("Failed to convert images");
  const response = await fetch("https://api.deepswapper.com/swap", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "User-Agent": "Mozilla/5.0",
      Referer: "https://www.deepswapper.com/",
    },
    body: JSON.stringify({
      target: targetBase64,
      source: sourceBase64,
      security: {
        token:
          "0.nOXyzQCcw99x8n_8_mZ9gm2nUJeoEMfmQq5eRiA6Bzg7HveVI-mKu7e7N23AGRGpSfYDOV65o9mZyD3Cg3Ajr7V7Z69WzT6aq6GmOq6nRyLWo7RuCWT5a3x-zmaaJFpE-fQXL9cjL52GzaHzIVzdjZwp832Q0onvufYlh0qHZEldoOUaRTXGkIIU7wu7TwXE6rPxE5vIjVabf_xjHuq2zwMFDebGuSM2GwicF-Tw63-jK5FZgqzdvCjYgo2tzykIaVbLBxhe2X-YoIwDgI5DA9zbQyR7jNXJAknt62pBRR4uTF3LfgqqW97M3tiK6NM7XKdoPL3ip4PYUKf-qq2DruS3r1U7IgQINHaKS160-U-o2kAVZGGx1ESYKlDxjM3Z2Ck2X-eiTd639jK0noa4heG9WvOfA572MtEVu1S3hURwvMOZXxKOyT0Ib-SDU2P_fJIFIZUd7ytpE5R4KtFfdlMBGApjhnuwXf6ZzdzpAV1NM2g3N-DHpjyI-4GmNY3vtoC5nh0oD-jZDMS4HTlN5IMPGbC0naR30u2Ke4xRKwdntPWUg7PuxX_s2SGamHkaFwKha8oEFLxjpQdRA9iJDmbzTbmmngQzf8NaCOn0psimmQr7Ax6s7Js9zdZrwBi8dT_hVzqDygS9LZq0lvpGAJBqRU2JBJKhB8MgrkpvfMvY1yUO--PHP-NNY8BYiAGlSCwe6HP-WaWpCagHLQopBSHDaW_tKrMIwqL7WdSoXD4bP2Cl53knv9db0w2igj4V.AxK22gIl4toeoYxNjRuFpg.b999891d2805c6f81aeee55fb8405ecab8ff7a042e5297f508dbfd6879d3d695",
        id: "deepswapper",
      },
    }),
  });
  if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
  const { result } = await response.json();
  return Buffer.from(result, "base64");
}
const handler = async (m, { conn, args, usedPrefix, command }) => {
  try {
    const q = m.quoted || m;
    const mime = (q.msg || q).mimetype || "";
    if (!mime) return m.reply("Tidak ada media yang ditemukan.");
    const media = await q.download();
    const source_image = media.toString("base64");
    const inputUrl = args.length
      ? args.join(" ")
      : m.quoted?.text || m.quoted?.caption || m.quoted?.description || null;
    if (!inputUrl)
      return m.reply(
        `Masukkan teks atau reply pesan dengan teks yang ingin diolah.`,
      );
    m.react(wait);
    const resultImage = await swapImage(source_image, inputUrl);
    await conn.sendMessage(
      m.chat,
      {
        image: Buffer.from(resultImage),
        caption: `✨ *${command?.toUpperCase()}*`,
      },
      {
        quoted: m,
      },
    );
    m.react(sukses);
  } catch (error) {
    console.error("Error:", error);
    m.react(eror);
  }
};
handler.help = ["deepswapper"];
handler.tags = ["ai"];
handler.command = /^(deepswapper)$/i;
export default handler;
