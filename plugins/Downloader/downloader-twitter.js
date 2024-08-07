import fetch from "node-fetch";
import hx from "hxz-api";
const handler = async (m, {
  args,
  usedPrefix,
  command
}) => {
  if (!args[0]) return m.reply("Masukkan Link Twitter yang ingin diunduh.");
  try {
    let list = "*⚡ Twitter Search Result ⚡*\n\n";
    if (list += `1. *Metode A*\n   ${usedPrefix}${command} ${args[0]} v1\n\n`, list += `2. *Metode B*\n   ${usedPrefix}${command} ${args[0]} v2\n\n`, list += "Ketik angka metode untuk memilih Twitter Search.\nContoh: " + usedPrefix + command + " " + args[0] + " v1", "v1" === args[1]) {
      let res = await twitterDl(args[0]);
      for (let x = 0; x < res.media.length; x++) {
        let caption = 0 === x ? res.caption.replace(/https:\/\/t.co\/[a-zA-Z0-9]+/gi, "").trim() : "";
        await conn.sendFile(m.chat, res.media[x].url, "", caption, m);
      }
    } else "v2" === args[1] ? await hx.fbdown(`${args[0]}`).then(async G => {
      let ten = `${G.HD}`;
      await conn.sendFile(m.chat, ten, "", `*desc*: ${G.desc}\n━━━━━•───────────────\n       ⇆  ❚❚ ▷  ↻`, m);
    }) : m.reply(list);
  } catch (e) {
    m.reply("Error. Periksa kembali link atau metode yang Anda masukkan.");
  }
};
handler.help = ["twitter"].map(v => v + " <query>"), handler.tags = ["downloader"],
  handler.command = /^twit(t(er(dl)?)?)?$/i;
export default handler;
async function twitterDl(url) {
  const idMatch = /twitter\.com\/[^/]+\/status\/(\d+)/.exec(url),
    id = idMatch ? idMatch[1] : null;
  if (!id) throw "Invalid URL";
  const res = await fetch(`https://tweetpik.com/api/tweets/${id}`);
  if (200 !== res.status) throw res.statusText;
  const json = await res.json();
  if (json.media) {
    const media = await Promise.all(json.media.map(async i => {
      if (/video|animated_gif/.test(i.type)) {
        return {
          url: (await (await fetch(`https://tweetpik.com/api/tweets/${id}/video`)).json()).variants.pop().url,
          type: i.type
        };
      }
      return {
        url: i.url,
        type: i.type
      };
    }));
    return {
      caption: json.text,
      media: media
    };
  }
  throw "No media found";
}