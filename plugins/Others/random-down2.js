import fetch from "node-fetch";
const handler = async (m, {
  conn,
  usedPrefix,
  text,
  args,
  command
}) => {
  if (!text) throw `Contoh penggunaan ${usedPrefix}${command} query`;
  await conn.sendFile(m.chat, `https://api.lolhuman.xyz/api/random2/${text}?apikey=${Object.entries(APIKeys).find(([ key ]) => key.includes("lolhuman"))?.[1]}`, "", `Random *${command}*`, m);
};
handler.command = /^(dlrandom2)$/i;
export default handler;