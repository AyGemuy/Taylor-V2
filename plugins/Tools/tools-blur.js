import jimp from "jimp";
const handler = async (m, {
  conn,
  text
}) => {
  try {
    let image = m.message?.imageMessage ? await m.download() : /image/.test(m.quoted?.mediaType) ? await m.quoted?.download() : m.mentionedJid?.[0] ? await conn.profilePictureUrl(m.mentionedJid[0], "image") : await conn.profilePictureUrl(m.quoted?.sender || m.sender, "image");
    if (!image) throw new Error("Couldn't fetch the required Image");
    let level = text || "5",
      img = await jimp.read(image);
    img.blur(isNaN(level) ? 5 : parseInt(level)), img.getBuffer("image/jpeg", (err, buffer) => {
      if (err) throw new Error(err?.message || "Couldn't blur the image");
      m.reply(buffer);
    });
  } catch (error) {
    m.reply(`Error: ${error.message}`);
  }
};
handler.command = /^(blur)$/i;
export default handler;