const {
  VirusTotal
} = await import("../../lib/virus-total.js");
import axios from "axios";
const handler = async (m, {
  conn,
  args,
  usedPrefix,
  text,
  command
}) => {
  let q = m.quoted ? m.quoted : m;
  let mime = (q.msg || q).mimetype || "";
  if (!mime) throw "No media found";
  let media = await q?.download();
  try {
    let data = await VirusTotal(media);
    if (data.permalink) return conn.sendMessage(m.chat, {
      image: await ssweb(data.permalink, "full", "desktop"),
      caption: "*Link:*\n" + data.permalink + "\n\n" + "*Msg:*\n" + data.verbose_msg
    }, {
      quoted: m
    });
    else m.reply(verbose_msg);
  } catch (e) {
    m.react(eror);
  }
};
handler.help = ["virustotal"];
handler.tags = ["tools"];
handler.command = /^(virustotal)$/i;
export default handler;
async function ssweb(url = "", full = false, type = "desktop") {
  type = type.toLowerCase();
  if (!["desktop", "tablet", "phone"].includes(type)) type = "desktop";
  let form = new URLSearchParams();
  form.append("url", url);
  form.append("device", type);
  if (!!full) form.append("full", "on");
  form.append("cacheLimit", 0);
  let res = await axios({
    url: "https://www.screenshotmachine.com/capture.php",
    method: "post",
    data: form
  });
  let cookies = res.headers["set-cookie"];
  let buffer = await axios({
    url: "https://www.screenshotmachine.com/" + res.data.link,
    headers: {
      cookie: cookies.join("")
    },
    responseType: "arraybuffer"
  });
  return Buffer.from(buffer.data);
}