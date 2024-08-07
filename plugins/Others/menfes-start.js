import fetch from "node-fetch";
const handler = async (m, {
  conn,
  text,
  usedPrefix,
  command,
  args
}) => {
  if (!args[0]) throw "Gunakan format .menfes 6282195322106 Haloo";
  if (args[0]?.startsWith("0")) throw "Gunakan format .menfes 6282195322106 Haloo";
  let mention = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : args[0] ? args[0]?.replace(/[@ .+-]/g, "") + "@s.whatsapp.net" : "",
    txt = (args.length > 1 ? args.slice(1).join(" ") : "") || "",
    q = m.quoted ? m.quoted : m,
    mime = (q.msg || q).mimetype || "",
    tujuan = `👋 Saya *${conn.user.name}*, Pesan Untuk Kamu\n👥 Dari : *PENGIRIM RAHASIA*\n\n${htki} 💌 Pesan ${htka}\n${txt}\n`,
    cap = `${htki} PESAN RAHASIA ${htka}\nAnda Ingin Mengirimkan Pesan ke pacar/sahabat/teman/doi/\nmantan?, tapi Tidak ingin tau siapa Pengirimnya?\nKamu bisa menggunakan Bot ini\nContoh Penggunaan: ${usedPrefix + command} ${nomorown} pesan untuknya\n\nContoh: ${usedPrefix + command} ${nomorown} hai`;
  if (m.quoted) {
    await conn.reply(mention, tujuan + "\n" + cap, m);
    let media = q ? await m.getQuotedObj() : m;
    await conn.copyNForward(mention, media, !1).catch(_ => _);
  } else await conn.reply(mention, tujuan + "\n" + cap, m);
  let suks = `Mengirim Pesan *${mime || "Teks"}*\n👥 Dari : @${m.sender.replace(/@.+/, "")}\n👥 Untuk : @${mention.replace(/@.+/, "")}\n\n${htki} 💌 Pesan ${htka}\n${txt}\n`;
  await conn.reply(m.chat, suks, m, {
    mentions: conn.parseMention(suks)
  });
};
handler.help = ["menfes <pesan>"], handler.tags = ["main"], handler.command = /^(menfes|chat)$/i;
export default handler;