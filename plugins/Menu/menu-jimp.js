import uploadFile from "../../lib/uploadFile.js";
import uploadImage from "../../lib/uploadImage.js";
import {
  webp2png
} from "../../lib/webp2mp4.js";
import {
  Sticker,
  StickerTypes
} from "wa-sticker-formatter";
import fetch from "node-fetch";
import Jimp from "jimp";
import TinyColor from "tinycolor2";
const handler = async (m, {
  conn,
  args,
  text
}) => {
  if (!m.quoted) throw "Reply media gambar";
  let link, hoih, a_ = m.quoted ? m.quoted : m,
    mime = (a_.msg || a_).mimetype || "";
  if (!mime) throw "No media found";
  let b_ = (a_.msg || a_).mimetype || "",
    c_ = await a_.download(),
    e_ = new Sticker(c_, {
      pack: packname,
      author: author,
      type: StickerTypes.FULL
    });
  try {
    /webp/g.test(b_) ? link = await webp2png(c_) : m.mentionedJid?.[0] ? link = await conn.profilePictureUrl(m.mentionedJid[0], "image") : /image|video|viewOnce/g.test(b_) && (link = await (b_.includes("video") ? uploadFile : uploadImage)(c_)), "string" != typeof link ? link = await uploadImage(c_) : /gif/g.test(b_) && (link = e_);
  } catch (e) {
    m.react(eror);
  }
  if (!args[0]) throw "List Efek\n\n• autocrop\n• background\n• blur\n• brightness\n• color\n• contrast\n• crop\n• dither565\n• fade\n• flip\n• gaussian\n• greyscale\n• hasAlpha\n• invert\n• mask\n• mirror\n• normalize\n• opacity\n• opaque\n• posterize\n• sepia";
  if (!b_) throw "No media found";
  switch (args[0]) {
    case "blur":
      hoih = await blur(link, args[1]);
      break;
    case "color":
      hoih = await color(link, args[1]);
      break;
    case "flip":
      hoih = await flip(link);
      break;
    case "flip2":
      hoih = await flip2(link);
      break;
    case "gaussian":
      hoih = await gaussian(link, args[1]);
      break;
    case "invert":
      hoih = await invert(link, args[1]);
      break;
    case "mask":
      hoih = await mask(link, args[1]);
      break;
    case "normalize":
      hoih = await normalize(link);
      break;
    case "autocrop":
      hoih = await autocrop(link, args[1]);
      break;
    case "background":
      hoih = await background(link, args[1]);
      break;
    case "brightness":
      hoih = await brightness(link, args[1]);
      break;
    case "contrast":
      hoih = await contrast(link, args[1]);
      break;
    case "crop":
      hoih = await crop(link, args[1]);
      break;
    case "dither565":
      hoih = await dither565(link);
      break;
    case "fade":
      hoih = await fade(link, args[1]);
      break;
    case "greyscale":
      hoih = await greyscale(link);
      break;
    case "hasAlpha":
      hoih = await hasAlpha(link, args[1]);
      break;
    case "mirror":
      hoih = await mirror(link);
      break;
    case "mirror2":
      hoih = await mirror2(link);
      break;
    case "opacity":
      hoih = await opacity(link, args[1]);
      break;
    case "opaque":
      hoih = await opaque(link);
      break;
    case "posterize":
      hoih = await posterize(link, args[1]);
      break;
    case "sepia":
      hoih = await sepia(link);
      break;
    default:
      throw `Efek "${args[0]}" tidak dikenali`;
  }
  args[0] && await conn.sendFile(m.chat, hoih, "thumbnail.jpg", "\n*RESULT*\n", m);
};
handler.help = ["jimp"], handler.tags = ["tools"], handler.command = /^(jimp)$/i;
export default handler;

function arbitraryColorToInt(val) {
  if ("number" == typeof(val = val || 0)) return Number(val);
  var color = new TinyColor(val);
  return parseInt(color.toHex8(), 16);
}
async function flip(img) {
  let imagea = await Jimp.read(img);
  return await imagea.flip(!1, !0).getBufferAsync(Jimp.MIME_JPEG);
}
async function flip2(img) {
  let imagea2 = await Jimp.read(img);
  return await imagea2.flip(!0, !1).getBufferAsync(Jimp.MIME_JPEG);
}
async function blur(img, num) {
  let imageb = await Jimp.read(img);
  return await imageb.blur(Number(num)).getBufferAsync(Jimp.MIME_JPEG);
}
async function color(img, num) {
  let imagec = await Jimp.read(img);
  return await imagec.color([{
    apply: String(num),
    params: [100]
  }]).getBufferAsync(Jimp.MIME_JPEG);
}
async function mask(imga, imgb) {
  let imaged = await Jimp.read(imga),
    imgbc = await Jimp.read(imgb);
  return await imaged.mask(imgbc).getBufferAsync(Jimp.MIME_JPEG);
}
async function gaussian(img, num) {
  let imagee = await Jimp.read(img);
  return await imagee.gaussian(Number(num)).getBufferAsync(Jimp.MIME_JPEG);
}
async function invert(img) {
  let imagef = await Jimp.read(img);
  return await imagef.invert().getBufferAsync(Jimp.MIME_JPEG);
}
async function normalize(img) {
  let imageg = await Jimp.read(img);
  return await imageg.normalize().getBufferAsync(Jimp.MIME_JPEG);
}
async function autocrop(img, op) {
  let imageh = await Jimp.read(img);
  return await imageh.autocrop(op).getBufferAsync(Jimp.MIME_JPEG);
}
async function background(img, hx) {
  let imagei = await Jimp.read(img);
  return await imagei.background(arbitraryColorToInt(hx)).getBufferAsync(Jimp.MIME_JPEG);
}
async function brightness(img, hx) {
  let imagej = await Jimp.read(img);
  return await imagej.brightness(Number(hx)).getBufferAsync(Jimp.MIME_JPEG);
}
async function contrast(img, hx) {
  let imagek = await Jimp.read(img);
  return await imagek.contrast(Number(hx)).getBufferAsync(Jimp.MIME_JPEG);
}
async function crop(img, hx) {
  let imagel = await Jimp.read(img);
  return await imagel.crop(Number(hx), Number(hx), Number(hx), Number(hx)).getBufferAsync(Jimp.MIME_JPEG);
}
async function dither565(img) {
  let imagem = await Jimp.read(img);
  return await imagem.dither565().getBufferAsync(Jimp.MIME_JPEG);
}
async function fade(img, hx) {
  let imagen = await Jimp.read(img);
  return await imagen.fade(Number(hx)).getBufferAsync(Jimp.MIME_JPEG);
}
async function greyscale(img) {
  let imageo = await Jimp.read(img);
  return await imageo.greyscale().getBufferAsync(Jimp.MIME_JPEG);
}
async function hasAlpha(img) {
  let imagep = await Jimp.read(img);
  return await imagep.hasAlpha().getBufferAsync(Jimp.MIME_JPEG);
}
async function mirror(img) {
  let imageq = await Jimp.read(img);
  return await imageq.mirror(!0, !1).getBufferAsync(Jimp.MIME_JPEG);
}
async function mirror2(img) {
  let imageq2 = await Jimp.read(img);
  return await imageq2.mirror(!1, !0).getBufferAsync(Jimp.MIME_JPEG);
}
async function opacity(img, hx) {
  let imager = await Jimp.read(img);
  return await imager.opacity(Number(hx)).getBufferAsync(Jimp.MIME_JPEG);
}
async function opaque(img) {
  let images = await Jimp.read(img);
  return await images.opaque().getBufferAsync(Jimp.MIME_JPEG);
}
async function posterize(img, hx) {
  let imaget = await Jimp.read(img);
  return await imaget.posterize(Number(hx)).getBufferAsync(Jimp.MIME_JPEG);
}
async function sepia(img) {
  let imageu = await Jimp.read(img);
  return await imageu.sepia().getBufferAsync(Jimp.MIME_JPEG);
}