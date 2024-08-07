import fetch from "node-fetch";
import uploadFile from "../../lib/uploadFile.js";
import uploadImage from "../../lib/uploadImage.js";
import {
  sticker
} from "../../lib/sticker.js";
import fs from "fs";
import jimp from "jimp";
import {
  youtubedl,
  youtubedlv2
} from "@bochilteam/scraper";
const handler = async (m, {
  conn,
  groupMetadata,
  usedPrefix,
  text,
  args,
  command,
  isPrems,
  isOwner
}) => {
  flaaa.getRandom();
  let urut = text.split("|");
  urut[1], urut[2], urut[3];
  if ("getaud" === command) {
    let q = "128kbps",
      v = args[0];
    const yt = await youtubedl(v).catch(async () => await youtubedlv2(v)),
      dl_url = await yt.audio[q].download(),
      ttl = await yt.title,
      size = await yt.audio[q].fileSizeH;
    m.reply(`${htki} YOUTUBE ${htka}*\n\n*${htjava} Title:* ${ttl}\n*${htjava} Type:* mp3\n*${htjava} Filesize:* ${size}\n\n*L O A D I N G. . .*`),
      await conn.sendFile(m.chat, dl_url, ttl + ".mp3", wm, m, null, {
        asDocument: !1
      });
  }
  if ("getvid" === command) {
    let q = (args[1] || "360") + "p",
      v = args[0],
      _thumb = {};
    try {
      _thumb = {
        jpegThumbnail: thumb2
      };
    } catch (e) {}
    const yt = await youtubedl(v).catch(async () => await youtubedlv2(v)),
      dl_url = await yt.video[q].download(),
      ttl = await yt.title,
      size = await yt.video[q].fileSizeH;
    m.reply(`${htki} YOUTUBE ${htka}*\n\n*${htjava} Title:* ${ttl}\n*${htjava} Type:* mp4\n*${htjava} Filesize:* ${size}\n\n*L O A D I N G. . .*`),
      await conn.sendMessage(m.chat, {
        [/^(?:-|--)doc$/i.test(args[1]) ? "document" : "video"]: {
          url: dl_url
        },
        fileName: `${wm}.mp4`,
        mimetype: "video/mp4",
        ..._thumb
      }, {
        quoted: m
      });
  }
};
handler.command = handler.help = ["getvid", "getaud"], handler.tags = ["random"];
export default handler;