import {
  format
} from "util";
import {
  default as Image
} from "node-webpmux";
const handler = async m => {
  if (!m.quoted) {
    return m.reply("Tag stikernya!");
  }
  if (/sticker/.test(m.quoted?.mtype)) {
    try {
      const img = new Image();
      await img.load(await m.quoted?.download());
      const exifData = JSON.parse(img.exif.slice(22).toString());
      m.reply(format(exifData));
    } catch (error) {
      m.reply("⚠️ Terjadi kesalahan saat memproses stiker.");
      console.error(error);
    }
  } else {
    m.reply("Pesan yang ditandai bukan stiker.");
  }
};
handler.help = ["getexif"];
handler.tags = ["sticker"];
handler.command = ["getexif"];
export default handler;