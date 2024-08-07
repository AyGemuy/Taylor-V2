import fetch from "node-fetch";
const handler = async (m, {
  conn,
  usedPrefix
}) => await conn.reply(m.chat, `“${(await quotesbucin()).getRandom()}”`, m);
handler.help = ["quotesbucin"], handler.tags = ["quotes"], handler.command = /^(quotesbucin)$/i;
export default handler;
async function quotesbucin() {
  try {
    const url = "https://raw.githubusercontent.com/onlybot12/galau/a3d5c0a37435a9c694c6b69e027385c1fd776df0/bucin.json";
    let res = await fetch(url);
    let data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
}