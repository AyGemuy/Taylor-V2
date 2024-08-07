import fetch from "node-fetch";
import cheerio from "cheerio";
const handler = async (m, {
  conn,
  args,
  usedPrefix,
  command
}) => {
  if (!m.quoted) return m.reply("Reply Teks/Audio untuk menggunakan gpt ini");
  try {
    if (m.quoted?.text) {
      let res = await gptChat(m.quoted?.text);
      m.reply(res.data);
    } else if (m.quoted?.mimetype.includes("audio")) {
      let audioBuff = await m.quoted?.download(),
        res = await gptAudio(audioBuff);
      m.reply(res.data);
    }
  } catch (e) {
    console.error("An error occurred:", e.message), m.reply("Error occurred. Please try again.");
  }
};
handler.help = ["chatopenai"], handler.tags = ["gpt"], handler.command = /^(chatopenai)$/i;
export default handler;
async function gptAudio(audioBuffer) {
  try {
    const info = await getInfo(),
      data = new FormData(),
      blob = new Blob([audioBuffer.toArrayBuffer()], {
        type: "audio/mpeg"
      });
    data.append("_wpnonce", info[0]["data-nonce"]), data.append("post_id", info[0]["data-post-id"]),
      data.append("action", "wpaicg_chatbox_message"), data.append("audio", blob, "wpaicg-chat-recording.wav");
    const response = await fetch("https://chatopenai.me/wp-admin/admin-ajax.php", {
      method: "POST",
      body: data
    });
    if (!response.ok) throw new Error("Network response was not ok");
    return await response.json();
  } catch (error) {
    throw console.error("An error occurred:", error.message), error;
  }
}
async function gptChat(message) {
  try {
    const info = await getInfo(),
      data = new FormData();
    data.append("_wpnonce", info[0]["data-nonce"]), data.append("post_id", info[0]["data-post-id"]),
      data.append("action", "wpaicg_chatbox_message"), data.append("message", message);
    const response = await fetch("https://chatopenai.me/wp-admin/admin-ajax.php", {
      method: "POST",
      body: data
    });
    if (!response.ok) throw new Error("Network response was not ok");
    return await response.json();
  } catch (error) {
    throw console.error("An error occurred:", error.message), error;
  }
}
async function getInfo() {
  try {
    const html = await (await fetch("https://chatopenai.me")).text(),
      $ = cheerio.load(html);
    return $(".wpaicg-chat-shortcode").map((index, element) => Object.fromEntries(Object.entries(element.attribs))).get();
  } catch (error) {
    throw new Error("Error:", error.message);
  }
}