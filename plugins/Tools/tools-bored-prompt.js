import fetch from "node-fetch";
import {
  FormData
} from "formdata-node";
const handler = async (m, {
  command,
  usedPrefix,
  conn,
  text,
  args
}) => {
  try {
    let text;
    if (args.length >= 1) text = args.slice(0).join(" ");
    else {
      if (!m.quoted || !m.quoted?.text) return m.reply("Input Teks");
      text = m.quoted?.text;
    }
    m.react(wait);
    let result = await PromptMaker(text);
    if (!result) throw "Terjadi kesalahan saat mengonversi gambar ke zombie.";
    let list = result.output.map((chat, index) => `*[ ${index + 1} ]*\n*Title:* ${chat.title || ""}\n*Prompt:* ${chat.prompt || ""}`).join("\n\n");
    m.reply(`📺 Prompt List:\n\n${list}`);
  } catch (error) {
    throw console.error("Error:", error), error;
  }
};
handler.help = ["boredprompt"].map(v => v + " (Input teks)"), handler.tags = ["tools"],
  handler.command = /^(boredprompt)$/i, handler.limit = !0;
export default handler;
async function PromptMaker(prompt) {
  try {
    let form = new FormData();
    form.append("prompt", encodeURIComponent(prompt));
    const response = await fetch("https://boredhumans.com/prompts_api.php", {
      method: "POST",
      body: form
    });
    if (!response.ok) throw new Error("Request failed with status code " + response.status);
    const base64Data = await response.text();
    return JSON.parse(base64Data);
  } catch (error) {
    return null;
  }
}