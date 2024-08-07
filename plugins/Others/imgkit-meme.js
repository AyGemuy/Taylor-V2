import fetch from "node-fetch";
const handler = async (m, {
  conn,
  usedPrefix,
  text,
  args,
  command
}) => {
  let urut = text.split("|"),
    thm = urut[0],
    text1 = urut[1];
  urut[2];
  if (!text) throw `Contoh penggunaan ${usedPrefix}${command} tema|teks\n\n*List tema:*\n• kucing\n• senyum\n• monyet\n• runtime\n• run 1-5\n• bor 1-5\n`;
  let res = `https://ik.imagekit.io/aygemuy/tr:ot-${text1},ots-400,otc-ffff00,or-50/${thm}.jpg`;
  await conn.sendFile(m.chat, res, "", `Result from *${command}*`, m);
};
handler.command = /^(imagekit)$/i;
export default handler;