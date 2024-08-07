import fetch from "node-fetch";
import cheerio from "cheerio";
const handler = async (m, {
  conn,
  args,
  usedPrefix,
  command
}) => {
  const text = args.length >= 1 ? args.join(" ") : m.quoted?.text || m.quoted?.caption || m.quoted?.description || null;
  if (!text) return m.reply(`Masukkan teks atau reply pesan dengan teks yang ingin diolah.\nContoh penggunaan:\n*${usedPrefix}${command} Hai, apa kabar?*`);
  m.react(wait);
  const services = [gpt4on, freegpt4, bardaifree, chatgptss, bartai];
  for (const service of services) {
    try {
      const res = await service(text);
      return m.reply(res);
    } catch (e) {
      continue;
    }
  }
  m.react(eror);
};
handler.help = ["chatgpt"];
handler.tags = ["internet", "ai", "gpt"];
handler.command = /^(chatgpt)$/i;
export default handler;
async function processChat(baseLink, message) {
  try {
    const html = await (await fetch(baseLink)).text();
    const info = cheerio.load(html)(".wpaicg-chat-shortcode").map((_, el) => Object.fromEntries(Object.entries(el.attribs))).get();
    const formData = new FormData();
    formData.append("_wpnonce", info[0]["data-nonce"]);
    formData.append("post_id", info[0]["data-post-id"]);
    formData.append("action", "wpaicg_chatbox_message");
    formData.append("message", message);
    const response = await fetch(baseLink + "/wp-admin/admin-ajax.php", {
      method: "POST",
      body: formData
    });
    if (!response.ok) throw new Error("Network response was not ok");
    const {
      data
    } = await response.json();
    return data || "";
  } catch (error) {
    console.error("An error occurred:", error.message);
    throw error;
  }
}
const chatgptss = async message => await processChat("https://chatgptss.org", message);
const bardaifree = async message => await processChat("https://bardaifree.com", message);
const bartai = async message => await processChat("https://bartai.org", message);
async function freegpt4(prompt) {
  try {
    const response = await fetch(`https://api.freegpt4.ddns.net/?text=${encodeURIComponent(prompt)}`);
    return await response.text();
  } catch (error) {
    throw new Error("Error fetching data from AI service.");
  }
}
async function gpt4on(prompt) {
  try {
    const response = await fetch(`https://gpt4withcustommodel.onrender.com/gpt?query=${encodeURIComponent(prompt)}&model=gpt-4-32k-0314`);
    return (await response.json())?.response;
  } catch (error) {
    throw new Error("Error fetching data from AI service.");
  }
}