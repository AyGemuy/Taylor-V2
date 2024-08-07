import fetch from "node-fetch";
import {
  sticker
} from "../../lib/sticker.js";
const handler = async (m, {
  conn,
  text,
  usedPrefix
}) => {
  if (!text) throw `Contoh Penggunaan\n${usedPrefix}spamcall 628xxxxxxxx`;
  let nomor = text.replace(/[^0-9]/gi, "").slice(2);
  if (!nomor.startsWith("8")) throw `Contoh Penggunaan\n${usedPrefix}spamcall 628xxxxxxxx`;
  m.reply("_*Tunggu permintaan anda sedang diproses.....*_");
  let spcall = `*Nomor* : _${(await fetch(`https://id.jagreward.com/member/verify-mobile/${nomor}`).then(a => a.json())).phone_prefix}_\n\n_berhasil menlpon anda!_`;
  await conn.reply(m.chat, `${spcall}`.trim(), m);
};
handler.help = ["spamcall <nomor>"], handler.tags = ["tools"], handler.command = /^(spamcall)$/i,
  handler.limit = !0, handler.group = !0;
export default handler;