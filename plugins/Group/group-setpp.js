import {
  webp2png
} from "../../lib/webp2mp4.js";
import {
  URL_REGEX
} from "@whiskeysockets/baileys";
const handler = async (m, {
  conn,
  args
}) => {
  try {
    let q = m.quoted ? m.quoted : m,
      mime = (q.msg || q).mimetype || q.mediaType || "",
      updateMsg = "Success update profile picture";
    if (/image/.test(mime)) {
      let url = await webp2png(await q?.download());
      await conn.updateProfilePicture(m.chat, {
        url: url
      });
    } else {
      if (!args[0] || !args[0]?.match(URL_REGEX)) throw new Error("Where's the media?");
      await conn.updateProfilePicture(m.chat, {
        url: args[0]
      });
    }
    m.reply(updateMsg);
  } catch (error) {
    console.error(error), await conn.reply(m.chat, "Terjadi kesalahan saat menjalankan perintah", m);
  }
};
handler.help = ["setppgrup"], handler.tags = ["group"], handler.alias = ["setppgc", "setppgrup", "setppgroup"],
  handler.command = /^setpp(gc|grup|group)$/i, handler.group = handler.admin = handler.botAdmin = !0;
export default handler;