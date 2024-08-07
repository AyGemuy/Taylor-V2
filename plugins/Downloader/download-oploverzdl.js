import fetch from "node-fetch";
const handler = async (m, {
  conn,
  args,
  usedPrefix,
  command
}) => {
  if (!args[0]) throw "Input *URL*";
  let wtf = await fetch("https://xzn.wtf/api/oploverzdl?url=" + args[0] + "&apikey=wudysoft"),
    fak = await wtf.json(),
    str = `•••••••••••••••••••••••••••••••••••••\n\n• Status: ${fak.status}\n• Studio: ${fak.studio}\n• Released: ${fak.released}\n• Duration: ${fak.duration}\n• Season: ${fak.season}\n• Type: ${fak.type}\n• Posted_by: ${fak.posted_by}\n• Released_on: ${fak.released_on}\n• Updated_on: ${fak.updated_on}\n• Episode: ${fak.episode}\n• Prev: ${fak.prev}\n• Next: ${fak.next}\n\n`,
    a = fak.download;
  for (let i = 0; i < a.length; i++) {
    str += "•••••••••••••••••••••••••••••••••••••\n\n*•• Format: " + a[i].format + "*\n";
    let b = a[i].resolutions;
    for (let i = 0; i < b.length; i++) {
      str += "• Resolutions: " + b[i].name + "\n";
      let c = b[i].servers;
      for (let i = 0; i < c.length; i++) str += "servers: " + c[i].name + "\n", str += "url: " + c[i].link + "\n\n";
    }
  }
  conn.relayMessage(m.chat, {
    extendedTextMessage: {
      text: str,
      contextInfo: {
        externalAdReply: {
          title: fak.anime_id + "\n" + wm,
          mediaType: 1,
          previewType: 0,
          renderLargerThumbnail: !0,
          thumbnailUrl: dua,
          sourceUrl: args[0]
        }
      }
    }
  }, {});
};
handler.help = ["oploverz"].map(v => v + " <url>"), handler.tags = ["downloader"],
  handler.command = /^(oploverz|plvrz)$/i, handler.limit = !0;
export default handler;