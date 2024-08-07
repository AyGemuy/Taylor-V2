import fs from "fs";
import fetch from "node-fetch";
const handler = async (m, {
  usedPrefix,
  command,
  text,
  args
}) => {
  let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender;
  await conn.profilePictureUrl(who).catch(_ => hwaifu.getRandom()), conn.getName(who);
  if (!text) return await conn.reply(m.chat, "Harap Masukan Nama Film Animenya", m);
  let res = await fetch(`https://api.lolhuman.xyz/api/lk21?apikey=${Object.entries(APIKeys).find(([ key ]) => key.includes("lolhuman"))?.[1]}&query=${text}`),
    x = (await res.json()).result,
    hasil = `*${htki} ANIME-SEARCH ${htka}*\n\n*title:* ${x.title}\n*link:* ${x.link}\n*thumbnail:* ${x.thumbnail}\n*genre:* ${x.genre}\n*views:* ${x.views}\n*duration:* ${x.duration}\n*tahun:* ${x.tahun}\n*rating:* ${x.rating}\n*desc:* ${x.desc}\n*actors:* ${Array.from(x.actors)}\n*location:* ${x.location}\n*date_release:* ${x.date_release}\n*language:* ${x.language}\n*link_dl:* ${x.link_dl}`;
  await conn.sendFile(m.chat, await (await fetch(x.thumbnail)).arrayBuffer(), "", hasil, m);
};
handler.help = ["filmanime"].map(v => v + "<film>"), handler.tags = ["internet", "anime"],
  handler.command = /^(filmanime)$/i;
export default handler;
async function shortUrl(url) {
  let res = await fetch(`https://tinyurl.com/api-create.php?url=${url}`);
  return await res.text();
}