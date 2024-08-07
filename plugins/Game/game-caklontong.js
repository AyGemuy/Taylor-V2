import {
  caklontong
} from "@bochilteam/scraper";
let timeout = 12e4,
  poin = 4999;
const handler = async (m, {
  conn,
  command,
  usedPrefix
}) => {
  let imgr = flaaa.getRandom();
  conn.caklontong = conn.caklontong ? conn.caklontong : {};
  let id = m.chat;
  if (id in conn.caklontong) return await conn.reply(m.chat, "Masih ada soal belum terjawab di chat ini", conn.caklontong[id][0]), !1;
  const json = await caklontong();
  let caption = `*${command.toUpperCase()}*\n${json.soal}\n\nTimeout *${(timeout / 1e3).toFixed(2)} detik*\nKetik ${usedPrefix}hcak untuk bantuan\nBonus: ${poin} XP\n    `.trim();
  conn.caklontong[id] = [await conn.sendFile(m.chat, imgr + command, "", caption, m), json, poin, setTimeout(async () => {
    conn.caklontong[id] && await conn.reply(m.chat, `Waktu habis!\nJawabannya adalah *${json.jawaban}*`, conn.caklontong[id][0]),
      delete conn.caklontong[id];
  }, timeout)];
};
handler.help = ["caklontong"], handler.tags = ["game"], handler.command = /^caklontong/i;
export default handler;
const buttons = [
  ["Hint", "/hcak"],
  ["Nyerah", "menyerah"]
];