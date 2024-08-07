import {
  dare,
  truth,
  bucin
} from "@bochilteam/scraper";
const handler = async function(m, {
  conn,
  text,
  command,
  usedPrefix
}) {
  "dare" === command && await conn.reply(m.chat, await dare(), m), "truth" === command && await conn.reply(m.chat, await truth(), m), "bucin" === command && await conn.reply(m.chat, await bucin(), m);
};
handler.command = handler.help = ["dare", "truth", "bucin"], handler.tags = ["quotes", "fun"];
export default handler;