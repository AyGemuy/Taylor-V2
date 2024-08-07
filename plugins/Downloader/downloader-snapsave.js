import axios from "axios";
import cheerio from "cheerio";
import FormData from "form-data";
const handler = async (m, {
  conn,
  args,
  usedPrefix,
  command
}) => {
  const msg = `Input link atau reply link yang ingin di download!\n\n*Contoh:*\n${usedPrefix + command} link`;
  let text;
  if (args.length >= 1) text = args.slice(0).join(" ");
  else {
    if (!m.quoted || !m.quoted?.text) throw msg;
    text = m.quoted?.text;
  }
  m.react(wait);
  try {
    const data = await getImageLinks(text);
    if (0 === data.length) return m.reply("Tidak ada hasil");
    for (let i = 0; i < data.length; i++) await conn.sendFile(m.chat, data[i], "", `Dari *(${i + 1}/${data.length})*`, m, !1, {
      mentions: [m.sender]
    });
  } catch (error) {
    m.react(eror);
  }
};
handler.help = ["snapsave *[link]*"], handler.tags = ["downloader"], handler.command = /^(snapsave)$/i;
export default handler;
const decryptSnapSave = data => {
  const [h, u, n, t, e, r] = data.split("decodeURIComponent(escape(r))}(")[1].split("))")[0]?.split(",").map(v => v.replace(/"/g, "").trim()), g = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ+/", decode = (d, e, f) => {
    const h = g.slice(0, e),
      i = g.slice(0, f);
    let j = d.split("").reverse().reduce((a, b, c) => -1 !== h.indexOf(b) ? a += h.indexOf(b) * Math.pow(e, c) : a, 0),
      k = "";
    for (; j > 0;) k = i[j % f] + k, j = (j - j % f) / f;
    return k || "0";
  };
  let result = "";
  for (let i = 0, len = h.length; i < len; i++) {
    let s = "";
    for (; h[i] !== n[e];) s += h[i], i++;
    for (let j = 0; j < n.length; j++) s = s.replace(new RegExp(n[j], "g"), j.toString());
    result += String.fromCharCode(decode(s, e, 10) - t);
  }
  return decodeURIComponent(encodeURIComponent(result));
};

function extractHtmlTags(inputString) {
  return inputString.replace(/\\/g, "").match(/<[^>]+>/g) || [];
}
const getImageLinks = async url => {
  const formData = new FormData();
  formData.append("url", url);
  const headers = {
    authority: "snapsave.app",
    accept: "*/*",
    "accept-language": "en-GB,en-US;q=0.9,en;q=0.8",
    cookie: "_ga=GA1.1.637160271.1699078564; _pubcid=f27c8d65-3a69-47f3-92db-18e53600e763;... (cookie)",
    origin: "https://snapsave.app",
    referer: "https://snapsave.app/",
    "sec-ch-ua": '"Google Chrome";v="113", "Chromium";v="113", "Not-A.Brand";v="24"',
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": '"macOS"',
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-origin",
    "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36"
  };
  try {
    const html = (await axios.post("https://snapsave.app/action.php?lang=en", formData, {
        headers: headers
      })).data,
      outs = extractHtmlTags(decryptSnapSave(html));
    return outs.join(",").split("<img").map(e => e.split('src="')[1]).filter(src => src && 0 === src.indexOf("http")).map(src => src.split('"')[0]);
  } catch (error) {
    return {
      developer: "Wudysof",
      status: !1,
      msg: error.message
    };
  }
};