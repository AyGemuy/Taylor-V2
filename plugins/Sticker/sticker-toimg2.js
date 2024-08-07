import {
  spawn
} from "child_process";
import {
  format
} from "util";
const handler = async (m, {
  conn,
  usedPrefix,
  command
}) => {
  if (!support.convert && !support.magick && !support.gm) return handler.disabled = !0;
  const notStickerMessage = `Reply sticker with command *${usedPrefix + command}*`;
  if (!m.quoted) throw notStickerMessage;
  let q = m.quoted;
  if (!/sticker/.test(q.mediaType)) throw notStickerMessage;
  {
    let sticker = await q?.download();
    if (!sticker) throw sticker;
    let bufs = [];
    const [_spawnprocess, ..._spawnargs] = [...support.gm ? ["gm"] : support.magick ? ["magick"] : [], "convert", "webp:-", "png:-"];
    let im = spawn(_spawnprocess, _spawnargs);
    im.on("error", e => m.reply(format(e))), im.stdout.on("data", chunk => bufs.push(chunk)),
      im.stdin.write(sticker), im.stdin.end(), im.on("exit", async () => {
        await conn.sendFile(m.chat, Buffer.concat(bufs), "image.png", author, m, null, adReply);
      });
  }
};
handler.help = ["toimg2 (reply)"], handler.tags = ["sticker"], handler.command = /^t(oim(age|g)2|im(age|g)2)$/i;
export default handler;