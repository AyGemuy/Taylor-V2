import {
  videoConvert
} from "../../lib/converter.js";
const handler = async (m, {
  conn,
  usedPrefix,
  args,
  command
}) => {
  conn.hdvid = conn.hdvid ? conn.hdvid : {};
  let error, q = m.quoted ? m.quoted : m,
    mime = q.mtype || "";
  if (!mime) throw "Fotonya Mana...?";
  if (!/videoMessage/g.test(mime)) throw `Mime ${mime} tidak support`;
  conn.hdvid[m.sender] = !0, m.react(wait);
  try {
    const secondOpt = ["-vf", "hqdn3d=1.5:1.5:6:6,nlmeans=p=7:s=7,vaguedenoiser=threshold=2.0:method=soft:nsteps=5,deband,atadenoise,unsharp=3:3:0.6,eq=brightness=0.05:contrast=1.2:saturation=1.1", "-vcodec", "libx264", "-profile:v", "main", "-level", "4.1", "-preset", "veryslow", "-crf", "18", "-x264-params", "ref=4", "-acodec", "copy", "-movflags", "+faststart"],
      videoBuffer = await q?.download(),
      buff = await videoConvert(videoBuffer, secondOpt);
    return m.reply(buff);
  } catch (er) {
    error = !0;
  } finally {
    error && m.reply("Proses Gagal :("), delete conn.hdvid[m.sender];
  }
};
handler.help = ["hdvid"], handler.tags = ["tools"], handler.command = ["hdvid"];
export default handler;