import fetch from "node-fetch";
const handler = async (m, {
  conn,
  usedPrefix
}) => await conn.reply(m.chat, `“${(await pantunpakboy()).getRandom().result}”`, m);
handler.help = ["pantunpakboy"], handler.tags = ["quotes"], handler.command = /^(pantunpakboy)$/i;
export default handler;
async function pantunpakboy() {
  try {
    const url = "https://raw.githubusercontent.com/orderku/db/main/dbbot/random/pantunpakboy.json";
    let res = await fetch(url);
    let data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
}