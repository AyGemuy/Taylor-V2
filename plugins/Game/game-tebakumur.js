import axios from "axios";
const handler = async (m, {
  conn,
  text
}) => {
  if (!text) return await conn.reply(m.chat, "Masukan Teksnya", m);
  m.reply("Searching..."), axios.get(`https://api.lolhuman.xyz/api/tebakumur?apikey=${Object.entries(APIKeys).find(([ key ]) => key.includes("lolhuman"))?.[1]}&name=${text}`).then(async res => {
    let hasil = `Namamu : ${text}\nUmurmu : ${res.data.result.age}`;
    await conn.reply(m.chat, hasil, m);
  });
};
handler.help = ["tebakumur"].map(v => v + " <nama>"), handler.tags = ["internet", "fun"],
  handler.command = /^(tebakumur)$/i, handler.owner = !1, handler.exp = 0, handler.limit = !0;
export default handler;