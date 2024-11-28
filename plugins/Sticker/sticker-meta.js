import { default as Image } from "node-webpmux";
const handler = async (m, { conn, text }) => {
  if (!m.quoted || !/sticker/.test(m.quoted?.mtype)) {
    return m.reply("Please reply with a sticker!");
  }
  let stiker = false;
  try {
    let [packname, ...author] = text.split("|");
    author = (author || []).join("|");
    let mime = m.quoted?.mimetype || "";
    if (!/webp/.test(mime)) {
      return m.reply("Please reply with a valid sticker!");
    }
    let img = await m.quoted?.download();
    if (!img) {
      return m.reply("Failed to download the sticker!");
    }
    stiker = await addExif(img, packname || "", author || "");
  } catch (e) {
    console.error(e);
    if (Buffer.isBuffer(e)) {
      stiker = e;
    } else {
      return m.reply("An error occurred while processing the sticker!");
    }
  } finally {
    try {
      if (stiker) {
        await conn.sendMessage(
          m.chat,
          {
            sticker: stiker,
          },
          {
            quoted: m,
          },
        );
      } else {
        return m.reply("Sticker conversion failed!");
      }
    } catch (err) {
      console.error("Failed to send message:", err);
      return m.reply("Failed to send the sticker!");
    }
  }
};
handler.command = /^(smeta)$/i;
export default handler;
async function addExif(
  buffer,
  packname,
  author,
  categories = [""],
  extra = {},
) {
  const img = new Image();
  const json = {
    "sticker-pack-id": "parel-kntll",
    "sticker-pack-name": packname,
    "sticker-pack-publisher": author,
    emojis: categories,
    "is-avatar-sticker": 1,
    ...extra,
  };
  let exifAttr = Buffer.from([
    73, 73, 42, 0, 8, 0, 0, 0, 1, 0, 65, 87, 7, 0, 0, 0, 0, 0, 22, 0, 0, 0,
  ]);
  let jsonBuffer = Buffer.from(JSON.stringify(json), "utf8");
  let exif = Buffer.concat([exifAttr, jsonBuffer]);
  exif.writeUIntLE(jsonBuffer.length, 14, 4);
  try {
    await img.load(buffer);
    img.exif = exif;
    return await img.save(null);
  } catch (err) {
    console.error("Error adding EXIF data:", err);
    return null;
  }
}
