import fetch from "node-fetch";
const handler = async (m, {
  conn,
  groupMetadata,
  usedPrefix,
  text,
  args,
  command
}) => {
  if ("quotable" === command) {
    let res = await fetch("https://api.quotable.io/random"),
      x = await res.json();
    await conn.sendButton(m.chat, `*Quotes:*\n  ${x.content}\n  \n  *Author:* ${x.author}\n  *Date Added:* ${x.dateAdded}\n  *Date Modif:* ${x.dateModified}\n  *Id:* ${x._id}`, wm, null, [
      ["Next", `${usedPrefix + command}`],
      ["Translate", `${usedPrefix}tr id ${x.content}`]
    ], m);
  }
  if ("inspiration" === command) {
    let res = await fetch("https://api.goprogram.ai/inspiration"),
      x = await res.json();
    await conn.sendButton(m.chat, `*Quotes:*\n  ${x.quote}\n  \n  *Author:* ${x.author}`, wm, null, [
      ["Next", `${usedPrefix + command}`],
      ["Translate", `${usedPrefix}tr id ${x.quote}`]
    ], m);
  }
  if ("artinama" === command) {
    let res = await fetch(`https://api.lolhuman.xyz/api/artinama?apikey=${Object.entries(APIKeys).find(([ key ]) => key.includes("lolhuman"))?.[1]}&nama=${text}`),
      x = await res.json();
    await conn.sendButton(m.chat, `*Artinama:*\n  ${x.result}`, wm, null, [
      ["Next", `${usedPrefix + command}`],
      ["Translate", `${usedPrefix}tr id ${x.result}`]
    ], m);
  }
};
handler.command = handler.help = ["quotable", "inspiration", "artinama"], handler.tags = ["quotes"];
export default handler;