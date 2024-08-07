import jimp from "jimp";
import uploadImage from "../../lib/uploadImage.js";
import uploadFile from "../../lib/uploadFile.js";
const handler = async (m, {
  conn,
  usedPrefix,
  args
}) => {
  let towidth = args[0],
    toheight = args[1];
  if (!towidth) throw "size width?";
  if (!toheight) throw "size height?";
  let q = m.quoted ? m.quoted : m,
    mime = (q.msg || q).mimetype || "";
  if (!mime) throw "where the media?";
  let media = await q?.download(),
    isMedia = /image\/(png|jpe?g|gif)|video\/mp4/.test(mime);
  if (!isMedia) throw `Mime ${mime} tidak didukung`;
  let link = await uploadImage(media),
    source = await jimp.read(await link),
    size_before = {
      height: await source.getHeight(),
      width: await source.getWidth()
    },
    size_after = {
      height: toheight,
      width: towidth
    },
    compres = await conn.resize(link, towidth - 0, toheight - 0),
    linkcompres = await uploadImage(compres);
  await conn.sendFile(m.chat, compres, null, `*${htki} COMPRESS RESIZE ${htka}*\n\n*• BEFORE*\n> ᴡɪᴅᴛʜ : ${size_before.width}\n> ʜᴇɪɢʜᴛ : ${size_before.height}\n\n*• AFTER*\n> ᴡɪᴅᴛʜ : ${size_after.width}\n> ʜᴇɪɢʜᴛ : ${size_after.height}\n\n*• LINK*\n> ᴏʀɪɢɪɴᴀʟ : ${link}\n> ᴄᴏᴍᴘʀᴇss : ${linkcompres}`, m);
};
handler.help = ["resize <width> <height> (reply|caption)"], handler.tags = ["tools"],
  handler.command = /^(resize)$/i;
export default handler;