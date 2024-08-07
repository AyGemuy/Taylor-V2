import fetch from "node-fetch";
const handler = async (m, {
  conn,
  usedPrefix
}) => await conn.reply(m.chat, `“${(await katailham()).getRandom().result}”`, m);
handler.help = ["katailham"], handler.tags = ["quotes"], handler.command = /^(katailham)$/i;
export default handler;
async function katailham() {
  try {
    const url = "https://raw.githubusercontent.com/orderku/db/main/dbbot/random/katailham.json";
    let res = await fetch(url);
    let data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
}