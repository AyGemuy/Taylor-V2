import fetch from "node-fetch";
const handler = async (m, {
  conn,
  usedPrefix,
  command,
  text
}) => {
  const dapatkan = await fetch("https://xzn.wtf/api/oploverz/ongoing?apikey=wudysoft"),
    z = await dapatkan.json();
  let str = "•••••••••••••••••••••••••••••••••••••\n";
  for (let i = 0; i < z.length; i++) str += "• Title: " + z[i].title + "\n", str += "• Episode: " + z[i].episode + "\n",
    str += "• Type: " + z[i].type + "\n", str += "• Score: " + z[i].score + "\n", str += "• Status: " + z[i].status + "\n",
    str += "• Link: " + z[i].link + "\n•••••••••••••••••••••••••••••••••••••\n";
  conn.relayMessage(m.chat, {
    extendedTextMessage: {
      text: str,
      contextInfo: {
        externalAdReply: {
          title: "𝐚𝐧𝐢𝐦𝐞 𝐮𝐩𝐝𝐚𝐭𝐞\n" + wm,
          mediaType: 1,
          previewType: 0,
          renderLargerThumbnail: !1,
          thumbnailUrl: z[0]?.poster,
          sourceUrl: z[0]?.link
        }
      }
    }
  }, {});
};
handler.help = ["ongoing"], handler.tags = [""], handler.command = /^(ongoing|ng)$/i,
  handler.limit = !0;
export default handler;