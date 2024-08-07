import {
  extractMetadata
} from "wa-sticker-formatter";
import {
  format
} from "util";
const handler = async (m, {
  conn
}) => {
  if (!m.quoted || !/sticker/.test(m.quoted?.mtype)) throw "Reply a sticker!";
  {
    let img = await m.quoted?.download();
    if (!img) throw "Can't extract metadata sticker!";
    let metaData = await extractMetadata(img);
    m.reply(format(metaData));
  }
};
handler.help = handler.alias = ["getexif"], handler.tags = ["tools"], handler.command = /^(getexif)$/i;
export default handler;