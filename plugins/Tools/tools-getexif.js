import { default as Image } from "node-webpmux";
import { extractMetadata } from "wa-sticker-formatter";
const handler = async (m, { conn }) => {
  if (!m.quoted || !/sticker/.test(m.quoted?.mtype)) {
    return m.reply("Please reply with a sticker!");
  }
  let img = await m.quoted?.download();
  if (!img) {
    return m.reply("Can't extract metadata from the sticker!");
  }
  let metaData;
  try {
    let exif = (await new Image().load(img)).exif.toString("utf-8");
    metaData = JSON.parse(
      exif.slice(exif.indexOf("{"), exif.lastIndexOf("}") + 1),
    );
  } catch {
    try {
      metaData = await extractMetadata(img);
    } catch {
      return m.reply("Failed to extract metadata!");
    }
  }
  m.reply(JSON.stringify(metaData, null, 2));
};
handler.help = handler.alias = ["getexif"];
handler.tags = ["tools"];
handler.command = /^(getexif)$/i;
export default handler;
