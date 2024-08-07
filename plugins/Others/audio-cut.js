import {
  promises
} from "fs";
import {
  join
} from "path";
import {
  exec
} from "child_process";
const handler = async (m, {
  conn,
  args,
  usedPrefix,
  command
}) => {
  let q = m.quoted ? m.quoted : m,
    mime = (q.msg || q).mimetype || "";
  if (!/audio/.test(mime)) throw `Balas vn/audio yang ingin diubah dengan caption *${usedPrefix + command}*`;
  let audio = await q?.download();
  if (!audio) throw "Can't download audio!";
  if (!args[0] || !args[1]) throw `example: ${usedPrefix + command} 00:00:30 00:00:30`;
  let media = "./tmp/" + (1 * new Date() + ".mp3"),
    filename = media + ".mp3";
  await promises.writeFile(media, audio), exec(`ffmpeg -ss ${args[0]} -i ${media} -t ${args[1]} -c copy ${filename}`, async err => {
    if (await promises.unlink(media), err) return Promise.reject("_*Error!*_");
    let buff = await promises.readFile(filename);
    m.react(wait), await conn.sendFile(m.chat, buff, filename, null, m, !0, {
      quoted: m,
      mimetype: "audio/mp4"
    }), await promises.unlink(filename);
  });
};
handler.help = ["cut"].map(v => v + " <text>"), handler.tags = ["audio"], handler.command = /^(potong(audio|mp3)|cut(audio|mp3))$/i;
export default handler;