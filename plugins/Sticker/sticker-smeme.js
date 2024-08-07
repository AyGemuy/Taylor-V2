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
  var out;
  let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender,
    name = conn.getName(who),
    [atas, bawah] = text.split(/[^\w\s]/g),
    q = m.quoted ? m.quoted : m,
    mime = (q.msg || q).mimetype || q.mediaType || "";
  if (/video/g.test(mime) && (q.msg || q).seconds > 11) return m.reply("Maksimal 10 detik!");
  if (!/webp|image|video|gif|viewOnce/g.test(mime)) return m.reply(`Reply Media dengan perintah\n\n${usedPrefix + command} <${atas || "teks atas"}>|<${bawah || "teks bawah"}>`);
  let img = await q?.download(),
    meme = "https://api.memegen.link/images/custom/" + encodeURIComponent(atas || "_") + "/" + encodeURIComponent(bawah || "_") + ".png?background=";
  /webp/g.test(mime) ? out = await createSticker(meme + await webp2png(img), !1, packname, name, 60) : /image/g.test(mime) ? out = await createSticker(meme + await uploadImage(img), !1, packname, name, 60) : /video/g.test(mime) ? out = await sticker(meme + await uploadFile(img), !1, packname, name) : (/gif/g.test(mime) || /viewOnce/g.test(mime)) && (out = await createSticker(meme + await uploadFile(img), !1, packname, name, 60)),
    m.react(wait), out ? m.reply(out) : m.react(eror);
};
handler.help = ["smeme (caption|reply media)", "smm <url>", "sm(caption|reply media)"],
  handler.tags = ["sticker"], handler.command = /^s(ti(ck(er)?|ker)meme|m(eme|i?m))$/i;
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