import fetch from "node-fetch";
const handler = async (m, {
  conn,
  isOwner,
  usedPrefix,
  command,
  text,
  args
}) => {
  try {
    if (!Number(text)) {
      return m.reply("Harap masukkan nomor yang valid.");
    }
    m.react(wait);
    const res = await fetch("https://civitai.com/api/v1/models");
    const jso = await res.json();
    const resu = jso.items[text].modelVersions[0]?.images[0]?.meta.prompt;
    await conn.ctaButton.setBody(`🖼️ *Prompt Civitai* 🖼️\n\n${resu}`).setFooter('Klik "Next" untuk mendapatkan prompt lainnya').addReply("Next", usedPrefix + command).run(m.chat, conn, m);
  } catch (e) {
    m.react(eror);
    console.error(e);
  }
};
handler.help = ["civitai"];
handler.tags = ["misc"];
handler.command = /^(civitai)$/i;
export default handler;