import axios from "axios";
import fetch from "node-fetch";
import {
  googleit
} from "@bochilteam/scraper";
import GoogleIt from "google-it";
const handler = async (m, {
  command,
  usedPrefix,
  conn,
  args
}) => {
  let text;
  if (args.length >= 1) text = args.slice(0).join(" ");
  else {
    if (!m.quoted || !m.quoted?.text) throw "Input teks atau reply teks yang ingin di cari!";
    text = m.quoted?.text;
  }
  let google_img = "https://telegra.ph/file/cf62f2b8648a352548978.jpg";
  m.react(wait);
  try {
    let caption = (await GoogleIt({
      query: text
    })).map((v, index) => `${htki + " " + ++index + " " + htka}\n*${v.title || "Tidak terdeteksi"}*\n  *○ Link:* ${v.link || "Tidak terdeteksi"}\n  *○ Snippet:* ${v.snippet || "Tidak terdeteksi"}`).join("\n\n");
    await conn.sendFile(m.chat, google_img, "", caption, m);
  } catch (e) {
    try {
      let caption = (await googleIt(text)).articles.map((v, index) => `${htki + " " + ++index + " " + htka}\n*${v.title || "Tidak terdeteksi"}*\n  *○ Link:* ${v.url || "Tidak terdeteksi"}\n  *○ Snippet:* ${v.description || "Tidak terdeteksi"}`).join("\n\n");
      if (!caption.length) throw `Query "${text}" Not Found`;
      await conn.sendFile(m.chat, google_img, "", caption, m);
    } catch (e) {
      try {
        let API_KEY = "7d3eb92cb730ed676d5afbd6c902ac1f",
          caption = (await (await fetch("http://api.serpstack.com/search?access_key=" + API_KEY + "&type=web&query=" + text)).json()).organic_results.map((v, index) => `${htki + " " + ++index + " " + htka}\n*${v.title || "Tidak terdeteksi"}*\n  *○ Link:* ${v.url || "Tidak terdeteksi"}\n  *○ Snippet:* ${v.snippet || "Tidak terdeteksi"}`).join("\n\n");
        await conn.sendFile(m.chat, google_img, "", caption, m);
      } catch (e) {
        m.react(eror);
      }
    }
  }
};
handler.help = ["google", "googlef"].map(v => v + " <pencarian>"), handler.tags = ["internet"],
  handler.command = /^googlef?$/i;
export default handler;