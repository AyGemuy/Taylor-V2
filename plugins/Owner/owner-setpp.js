import {
  webp2png
} from "../../lib/webp2mp4.js";
import Jimp from "jimp";
import {
  URL_REGEX
} from "@whiskeysockets/baileys";
const handler = async (m, {
  conn,
  args
}) => {
  try {
    const q = m.quoted ? m.quoted : m,
      mime = (q.msg || q).mimetype || q.mediaType || "";
    if (/webp/.test(mime)) {
      const url = await webp2png(await q?.download()),
        media = await (await conn.getFile(url)).data,
        {
          img
        } = await generateProfilePicture(media);
      await updateProfilePicture(conn, img);
    } else if (/image/.test(mime)) {
      const media = await q?.download(),
        {
          img
        } = await generateProfilePicture(media);
      await updateProfilePicture(conn, img);
    } else {
      if (!(args[0] && args[0]?.match(URL_REGEX) && /https?:\/\//.test(args[0]))) throw new Error("Where's the media?");
      {
        const media = await (await conn.getFile(args[0])).data,
          {
            img
          } = await generateProfilePicture(media);
        await updateProfilePicture(conn, img);
      }
    }
    m.reply("Success update profile picture");
  } catch (error) {
    console.error(error), await conn.reply(m.chat, "Terjadi kesalahan saat menjalankan perintah", m);
  }
};
handler.alias = ["setpp", "setppbot"], handler.command = /^setpp(bot)?$/i, handler.rowner = !0;
export default handler;
async function generateProfilePicture(media) {
  const jimp = await Jimp.read(media),
    min = jimp.getWidth(),
    max = jimp.getHeight(),
    cropped = jimp.crop(0, 0, min, max);
  return {
    img: await cropped.scaleToFit(720, 720).getBufferAsync(Jimp.MIME_JPEG),
    preview: await cropped.normalize().getBufferAsync(Jimp.MIME_JPEG)
  };
}
async function updateProfilePicture(conn, img) {
  await conn.query({
    tag: "iq",
    attrs: {
      to: conn.decodeJid(conn.user.jid),
      type: "set",
      xmlns: "w:profile:picture"
    },
    content: [{
      tag: "picture",
      attrs: {
        type: "image"
      },
      content: img
    }]
  });
}