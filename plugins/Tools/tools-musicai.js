import fetch from "node-fetch";
const handler = async (m, { text, command, usedPrefix, conn }) => {
  try {
    const q = m.quoted || m;
    const mime = q.mediaType || "";
    if (!/image|video|audio|sticker|document/.test(mime)) {
      return m.reply("Please reply to a media file.");
    }
    const media = await q.download();
    const aduiotext = (await recognizeAudio(media))
      .match('"text": "(.*)",')[1]
      .trim();
    m.reply(aduiotext);
  } catch (error) {
    m.reply(`An error occurred: ${error.message}`);
  }
};
handler.help = ["witai"];
handler.tags = ["tools"];
handler.command = /^(witai)$/i;
export default handler;
async function recognizeAudio(input) {
  try {
    const response = await fetch("https://api.wit.ai/speech?v=20211210", {
      method: "POST",
      headers: {
        Authorization: "Bearer SPVMC7DYW5SJWTSNWQJIL33I6LICH5LK",
        "Content-Type": "audio/mpeg3",
      },
      body: input,
    });
    return await response.text();
  } catch (error) {
    throw new Error(`Failed to recognize audio: ${error.message}`);
  }
}
