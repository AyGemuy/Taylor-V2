import {
  unlinkSync,
  readFileSync
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
  __dirname,
  usedPrefix,
  command
}) => {
  try {
    let set, q = m.quoted ? m.quoted : m,
      mime = (m.quoted ? m.quoted : m.msg).mimetype || "";
    if (/bass/.test(command) && (set = "-af equalizer=f=94:width_type=o:width=2:g=30"), /blown/.test(command) && (set = "-af acrusher=.1:1:64:0:log"), /deep/.test(command) && (set = "-af atempo=4/4,asetrate=44500*2/3"), /earrape/.test(command) && (set = "-af volume=12"), /fast/.test(command) && (set = '-filter:a "atempo=1.63,asetrate=44100"'), /fat/.test(command) && (set = '-filter:a "atempo=1.6,asetrate=22100"'), /nightcore/.test(command) && (set = "-filter:a atempo=1.06,asetrate=44100*1.25"), /reverse/.test(command) && (set = '-filter_complex "areverse"'), /robot/.test(command) && (set = "-filter_complex \"afftfilt=real='hypot(re,im)*sin(0)':imag='hypot(re,im)*cos(0)':win_size=512:overlap=0.75\""), /slow/.test(command) && (set = '-filter:a "atempo=0.7,asetrate=44100"'), /smooth/.test(command) && (set = "-filter:v \"minterpolate='mi_mode=mci:mc_mode=aobmc:vsbmc=1:fps=120'\""), /tupai|squirrel|chipmunk/.test(command) && (set = '-filter:a "atempo=0.5,asetrate=65100"'), !/audio/.test(mime)) throw `*[INFO] respond to the audio or voice note which will be modified, use the command ${usedPrefix + command}*`;
    {
      let ran = getRandom(".mp3"),
        filename = join(__dirname, "../tmp/" + ran),
        media = await q?.download(!0);
      exec(`ffmpeg -i ${media} ${set} ${filename}`, async (err, stderr, stdout) => {
        if (await unlinkSync(media), err) throw "_*Error!*_";
        let buff = await readFileSync(filename);
        await conn.sendFile(m.chat, buff, ran, null, m, !0, {
          type: "audioMessage",
          ptt: !0
        });
      });
    }
  } catch (e) {
    throw e;
  }
};
handler.help = ["bass", "blown", "deep", "earrape", "fast", "fat", "nightcore", "reverse", "robot", "slow", "smooth", "tupai"].map(v => v + " [vn]"),
  handler.tags = ["audio"], handler.command = /^(bass|blown|deep|earrape|fas?t|nightcore|reverse|robot|slow|smooth|tupai|squirrel|chipmunk)$/i;
export default handler;
handler.limit = !0;
const getRandom = ext => `${Math.floor(1e4 * Math.random())}${ext}`;