import fetch from "node-fetch";
const handler = async (m, {
  conn,
  args,
  text
}) => {
  if (!text) throw "*[❗INFO❗] Masukan Nama User Tiktok Yang Ingin Diambil Fotonya*";
  let res = `https://api.lolhuman.xyz/api/pptiktok/${text}?apikey=${Object.entries(APIKeys).find(([ key ]) => key.includes("lolhuman"))?.[1]}`;
  await conn.sendFile(m.chat, res, "error.jpg", `*[ ✔ ] Sukses Mengambil Foto User ${text}*`, m, !1);
};
handler.help = ["tiktokfoto"].map(v => v + " <user>"), handler.tags = ["downloader"],
  handler.command = /^(p((rofilet(iktok|t)|pt(iktok|t))|ptik)|t(ik(tokp(rofile|p)|pp)|tp(rofile|p)))$/i;
export default handler;