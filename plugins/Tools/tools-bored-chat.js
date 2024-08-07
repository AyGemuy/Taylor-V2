import {
  BoredHumans
} from "../../lib/ai/boredhumans.js";
const handler = async (m, {
  conn,
  args,
  usedPrefix,
  command
}) => {
  const text = args.length >= 1 ? args.slice(0).join(" ") : m.quoted && m.quoted?.text || m.quoted?.caption || m.quoted?.description || null;
  if (!text) return m.reply(`Masukkan teks atau reply pesan dengan teks yang ingin diolah.\nContoh penggunaan:\n*${usedPrefix}${command} Hai, apa kabar?*`);
  m.react(wait);
  try {
    const api = new BoredHumans();
    const result = await api.executeTool("celebrity_chat", {
      prompt: text
    });
    m.reply(result);
  } catch (e) {
    m.react(eror);
  }
};
handler.help = ["boredchat"], handler.tags = ["gpt"], handler.command = /^(boredchat)$/i;
export default handler;