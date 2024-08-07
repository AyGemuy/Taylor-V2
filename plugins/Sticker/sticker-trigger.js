import uploadFile from "../../lib/uploadFile.js";
import uploadImage from "../../lib/uploadImage.js";
import {
  webp2png
} from "../../lib/webp2mp4.js";
import {
  Sticker,
  StickerTypes
} from "wa-sticker-formatter";
import {
  sticker
} from "../../lib/sticker.js";
const handler = async (m, {
  conn,
  args,
  text,
  usedPrefix,
  command
}) => {
  let out, oimg, who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender,
    name = conn.getName(who),
    q = m.quoted ? m.quoted : m,
    mime = (q.msg || q).mimetype || q.mediaType || "";
  if (/video/g.test(mime) && (q.msg || q).seconds > 11) return m.reply("Maksimal 10 detik!");
  if (!/webp|image|video|gif|viewOnce/g.test(mime)) return m.reply(`Reply Media dengan perintah\n\n${usedPrefix + command}`);
  let img = await q?.download();
  /webp/g.test(mime) ? (oimg = `https://oni-chan.my.id/api/canvas/trigger?picturl=${await webp2png(img)}&apikey=`, out = await createSticker(oimg, !1, packname, name, 60)) : /image/g.test(mime) ? (oimg = `https://oni-chan.my.id/api/canvas/trigger?picturl=${await uploadImage(img)}&apikey=`, out = await createSticker(oimg, !1, packname, name, 60)) : /video/g.test(mime) ? (oimg = `https://oni-chan.my.id/api/canvas/trigger?picturl=${await uploadFile(img)}&apikey=`, out = await sticker(oimg, !1, packname, name)) : (/gif/g.test(mime) || /viewOnce/g.test(mime)) && (oimg = `https://oni-chan.my.id/api/canvas/trigger?picturl=${await uploadFile(img)}&apikey=`, out = await createSticker(oimg, !1, packname, name, 60)), m.react(wait), out ? m.reply(out) : m.react(eror);
};
handler.menu = ["strigger"], handler.tags = ["maker"], handler.command = /^(strigger(ed)?)$/i,
  handler.limit = !0;
export default handler;
const isUrl = text => text.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)(jpe?g|gif|png)/, "gi"));
async function createSticker(img, url, packName, authorName, quality) {
  let stickerMetadata = {
    type: StickerTypes.FULL,
    pack: packName,
    author: authorName,
    quality: quality
  };
  return new Sticker(img || url, stickerMetadata).toBuffer();
}
async function createStickerV(img, url, packName, authorName, quality) {
  let stickerMetadata = {
    type: StickerTypes.CROPPED,
    pack: packName,
    author: authorName,
    quality: quality
  };
  return new Sticker(img || url, stickerMetadata).toBuffer();
}