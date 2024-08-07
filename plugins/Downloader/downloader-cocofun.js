import fetch from "node-fetch";
const handler = async (m, {
  conn,
  command,
  args,
  usedPrefix,
  DevMode
}) => {
  let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender;
  await conn.profilePictureUrl(who).catch(_ => hwaifu.getRandom()), conn.getName(who);
  if (!args[0]) throw `Use example ${usedPrefix}${command} http://i.coco.fun/short/1513tui/`;
  if (!args[1]) return await conn.reply(m.chat, htki + " COCOFUN " + htka + `\n.cocofun ${args[0]} nowm\n✅ WITH WM .cocofun ${args[0]} withwm`, m);
  let res = await fetch(`https://api.lolhuman.xyz/api/cocofun?apikey=${Object.entries(APIKeys).find(([ key ]) => key.includes("lolhuman"))?.[1]}&url=${args[0]}`),
    x = await res.json();
  "withwm" === args[1] && await conn.sendFile(m.chat, x.result.withwm, "", `*${htki} COCOFUN ${htka}*\n*title:* ${x.result.title}\n*tag:* ${x.result.tag}\n*likes:* ${x.result.likes}\n*dislike:* ${x.result.dislike}\n*views:* ${x.result.views}\n*uploader:* ${x.result.uploader}\n*duration:* ${x.result.duration}\n*dislike:* ${x.result.dislike}`, m), "nowm" === args[1] && await conn.sendFile(m.chat, x.result.nowm, "", `*${htki} COCOFUN ${htka}*\n*title:* ${x.result.title}\n*tag:* ${x.result.tag}\n*likes:* ${x.result.likes}\n*dislike:* ${x.result.dislike}\n*views:* ${x.result.views}\n*uploader:* ${x.result.uploader}\n*duration:* ${x.result.duration}\n*dislike:* ${x.result.dislike}`, m);
};
handler.help = ["cocofun"].map(v => v + " <url>"), handler.tags = ["downloader"],
  handler.command = /^c(oco(fun(d(own(load(er)?)?|l))?|d(own(load(er)?)?|l))|cfun(d(own(load(er)?)?|l))?)$/i;
export default handler;