import fetch from "node-fetch";
const handler = async (m, {
  conn,
  usedPrefix,
  command,
  args
}) => {
  const text = args.length >= 1 ? args.slice(0).join(" ") : m.quoted && m.quoted?.text || m.quoted?.caption || m.quoted?.description || null;
  if (!text) return m.reply(`Masukkan teks atau reply pesan dengan teks yang ingin diolah.\nContoh penggunaan:\n*${usedPrefix}${command} highly detailed, intricate, 4k, 8k, sharp focus, detailed hair, detailed*`);
  m.react(wait);
  try {
    let res = await (await fetch(`https://api.neoxr.eu/api/waifudiff?q=${encodeURIComponent(text)}`)).json();
    await conn.sendFile(m.chat, res.data?.url, "waifudiff.jpg", `Prompt: ${res.data?.prompt}`, m);
  } catch (e) {
    console.error(e), m.react(eror);
  }
};
handler.help = ["waifudiff"], handler.tags = ["ai"], handler.command = /^(waifudiff)$/i,
  handler.limit = !0;
export default handler;