import uploadFile from "../../lib/uploadFile.js";
import uploadImage from "../../lib/uploadImage.js";
import fetch from "node-fetch";
const handler = async (m, {
  conn,
  text,
  args,
  usedPrefix,
  command
}) => {
  let q = m.quoted ? m.quoted : m,
    mime = (q.msg || q).mimetype || "";
  if (!mime) throw "No media found";
  let media = await q?.download(),
    isTele = /image\/(png|jpe?g|gif)|video\/mp4/.test(mime),
    link = await (isTele ? uploadImage : uploadFile)(media, 29);
  if (!text) throw "Input parameter required\n\n*Detail:* https://images.weserv.nl/docs/";
  try {
    const wsrv = `https://images.weserv.nl/?url=${encodeURIComponent(link.replace(/^https?:\/\//i, ""))}&${text.replace(/ /g, "&").replace(/(\w+)=(\w+)/g, "$1=$2")}`;
    try {
      const response = await fetch(wsrv);
      if (response.ok) {
        const contentType = response.headers.get("Content-Type");
        if (contentType && contentType.startsWith("image/")) {
          return conn.sendFile(m.chat, wsrv, "wsrv.jpg", "Sudah Jadi", m);
        } else {
          return m.reply("No valid header image found.");
        }
      } else {
        return m.reply("Failed to fetch the URL.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  } catch (e) {
    m.reply(eror + "\n\n*Detail:* https://images.weserv.nl/docs/");
  }
};
handler.help = ["towsrv"].map(v => v + " (Balas foto)"), handler.tags = ["tools"],
  handler.command = /^(to|jadi)?wsrv$/i, handler.limit = !0;
export default handler;