import fetch from "node-fetch";
const handler = async (m, {
  conn,
  usedPrefix
}) => await conn.reply(m.chat, `“${(await sindiran()).getRandom().result}”`, m);
handler.help = ["sindiran"], handler.tags = ["quotes"], handler.command = /^(sindiran)$/i;
export default handler;
async function sindiran() {
  try {
    const url = "https://raw.githubusercontent.com/orderku/db/main/dbbot/random/sindiran.json";
    let res = await fetch(url);
    let data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
}