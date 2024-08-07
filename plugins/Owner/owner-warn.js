const handler = async (m, {
  conn,
  args,
  usedPrefix
}) => {
  if (args.length > 0) {
    args[0]?.replace(/[@.+-]/g, "").replace(" ", "");
    let ban = m.mentionedJid[0] || m.quoted?.sender || conn.parseMention(args[0]) || args[0]?.replace(/[@.+-]/g, "").replace(" ", "") + "@s.whatsapp.net" || "",
      warn = db.data.users[ban].warn;
    warn < 5 ? (db.data.users[ban].warn += 1, m.reply("*berhasil Warn!*"), await conn.reply(ban, "*Kamu di warn oleh moderator, dan sekarang kamu punya " + (warn + 1) + " warn. Ingat Jika kamu mendapat warn 5 kali kamu akan otomatis ke banned*", null)) : 5 === warn && (db.data.users[ban].banned = !0, db.data.users[ban].warn = 0, m.reply("*Dia sudah kebanned, karena mendapatkan 5 warn*"), await conn.reply(ban, "*Kamu ke banned karena telah mendapatkan 5 kali warn*", null));
  } else await conn.reply(m.chat, "*Siapa yang mau di Warn?\nTag orangnya*", m);
};
handler.help = ["warn @tag"], handler.tags = ["owner", "moderator"], handler.command = /^warn$/i,
  handler.mods = !0;
export default handler;