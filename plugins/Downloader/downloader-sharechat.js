import fetch from "node-fetch";
const handler = async (m, {
  conn,
  args,
  usedPrefix,
  command
}) => {
  let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender;
  await conn.profilePictureUrl(who).catch(_ => hwaifu.getRandom()), conn.getName(who);
  if (!args[0]) throw `Use example ${usedPrefix}${command} https://sharechat.com/video/pDExqga`;
  let res = await fetch(`https://api.lolhuman.xyz/api/sharechat?apikey=${Object.entries(APIKeys).find(([ key ]) => key.includes("lolhuman"))?.[1]}&url=${args[0]}`),
    x = await res.json();
  await conn.sendFile(m.chat, x.result.link_dl, "", `*${htki} ShareChat ${htka}*\n*title:* ${x.result.title}\n    `, m);
};
handler.help = ["sharechat"].map(v => v + " <url>"), handler.tags = ["downloader"],
  handler.command = /^((sharechat)(downloder|dl)?)$/i;
export default handler;