import fetch from "node-fetch";
const handler = async (m, {
  conn,
  text,
  usedPrefix,
  command
}) => {
  if (!text) throw "Nama Nabinya?";
  let url = await fetch(`https://raw.githubusercontent.com/ZeroChanBot/Api-Freee/a9da6483809a1fbf164cdf1dfbfc6a17f2814577/data/kisahNabi/${text}.json`),
    kisah = await url.json().catch(_ => "Error");
  if ("Error" === kisah) throw "*Not Found*\n*Coba Jangan Gunakan Huruf Kapital";
  let hasil = `_*Nama Nabi :*_ ${kisah.name} \n_*Tanggal Lahir :*_ ${kisah.thn_kelahiran}\n_*Tempat Lahir :*_ ${kisah.tmp}\n_*Usia :*_ ${kisah.usia}\n\n* — [ K I S A H ] — *\n\n${kisah.description}`;
  await conn.reply(m.chat, hasil, m);
};
handler.help = ["kisahnabi"], handler.tags = ["islami"], handler.command = /^kisahnabi$/i,
  handler.register = !1, handler.limit = !0;
export default handler;