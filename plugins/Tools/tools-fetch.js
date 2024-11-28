import fetch from "node-fetch";
import { format } from "util";
import path from "path";
let handler = async (m, { text, conn, usedPrefix, command }) => {
  if (!text) {
    return m.reply(
      `📥 *Download File dengan URL* 📥\n\n*Contoh:*\n- ${usedPrefix + command} https://s.id`,
    );
  }
  text = /^https?:\/\//.test(text) ? text : "http://" + text;
  let _url = new URL(text);
  let redirectUrl = _url.href;
  try {
    for (let redirectCount = 0; redirectCount < 999999; redirectCount++) {
      let res = await fetch(redirectUrl);
      if (res.headers.get("content-length") > 100 * 1024 * 1024 * 1024) {
        res.body.destroy();
        return m.reply(
          `🚨 *Error:* Konten terlalu besar! (${res.headers.get("content-length")})`,
        );
      }
      const contentType = res.headers.get("content-type");
      let filename =
        res.headers.get("content-disposition")?.split("filename=")[1]?.trim() ||
        path.basename(_url.pathname);
      m.react(wait);
      if (/^image\//.test(contentType)) {
        await conn.sendFile(m.chat, redirectUrl, filename, text, m);
        return m.react(sukses);
      }
      if (/^text\//.test(contentType)) {
        let txt = await res.text();
        m.reply(`${txt.slice(0, 65536)}`);
        await conn.sendFile(m.chat, Buffer.from(txt), "file.txt", null, m);
        return m.react(sukses);
      }
      if (/^application\/json/.test(contentType)) {
        let json = await res.json();
        m.reply(`${format(JSON.stringify(json, null, 2)).slice(0, 65536)}`);
        await conn.sendFile(
          m.chat,
          Buffer.from(format(JSON.stringify(json))),
          "file.json",
          null,
          m,
        );
        return m.react(sukses);
      }
      if (/^text\/html/.test(contentType)) {
        let html = await res.text();
        await conn.sendFile(m.chat, Buffer.from(html), "file.html", null, m);
        return m.react(sukses);
      }
      await conn.sendFile(m.chat, redirectUrl, filename, text, m);
      return m.react(sukses);
      if ([301, 302, 307, 308].includes(res.status)) {
        let location = res.headers.get("location");
        if (location) redirectUrl = location;
        else break;
      } else break;
    }
    m.reply(`⚠️ *Terlalu Banyak Pengalihan!* (max: 999999)`);
  } catch (error) {
    m.react(eror);
    console.error(error);
  }
};
handler.help = ["fetch", "get"].map((v) => v + " <url>");
handler.tags = ["internet"];
handler.command = /^(fetch|get)$/i;
export default handler;
