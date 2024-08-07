import {
  spawn
} from "child_process";
import fs from "fs";
import path, {
  join
} from "path";
const handler = async (m, {
  conn,
  text
}) => {
  let q = m.quoted ? m.quoted : m,
    mime = (q.msg || q).mimetype || "";
  if (!/image/.test(mime)) throw "balas gambarnya!";
  try {
    q = m.quoted?.download();
  } catch (e) {
    q = m.download();
  }
  m.reply("_Sedang membuat..._\n*Mohon tunggu sekitar 1 menit*"), running(await q).then(async vid => await conn.sendFile(m.chat, vid, "run.mp4", author, m));
};
handler.help = ["run <media>"], handler.tags = ["sptools"], handler.command = /^run$/i;
export default handler;
let tmp = path.join("./tmp/");

function running(img, duration = 10, fps = 60) {
  return new Promise((resolve, reject) => {
    let layers = [`color=s=512x512:d=${duration}:r=${fps}[bg]`, "[0:v]scale=-2:512[img]", `[bg][img]overlay=x='(w+h)*((n/${fps})*-1/${duration})+h'`],
      n = +new Date() + "run.jpg",
      i = path.join(tmp, n);
    fs.writeFileSync(i, img), console.log(img);
    let o = path.join(tmp, n + ".mp4"),
      args = ["-y", "-i", i, "-t", duration.toString(), "-filter_complex", layers.join(";"), "-pix_fmt", "yuv420p", "-crf", "18", o];
    console.log("ffmpeg", ...args), spawn("ffmpeg", args, {
      stdio: "inherit"
    }).on("error", reject).on("close", () => {
      try {
        fs.unlinkSync(i), resolve(fs.readFileSync(o)), fs.unlinkSync(o);
      } catch (e) {
        reject(e);
      }
    });
  });
}