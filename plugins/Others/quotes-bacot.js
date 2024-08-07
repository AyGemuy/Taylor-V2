import fetch from "node-fetch";
const handler = async (m, {
  conn,
  usedPrefix
}) => await conn.reply(m.chat, `“${(await quotesbacot()).getRandom().result}”`, m);
handler.help = ["quotesbacot"], handler.tags = ["quotes"], handler.command = /^(quotesbacot)$/i;
export default handler;
async function quotesbacot() {
  try {
    const url = "https://raw.githubusercontent.com/orderku/db/main/dbbot/random/bacot.json";
    let res = await fetch(url);
    let data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
}