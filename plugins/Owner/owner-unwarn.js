const handler = async (m, {
  conn,
  args
}) => {
  if (!args || !args[0]) throw "❔Siapa yang mau di Unwarn om?";
  let mention = m.mentionedJid[0] || conn.parseMention(args[0]) || args[0]?.replace(/[@.+-]/g, "").replace(" ", "") + "@s.whatsapp.net" || "";
  if (!mention) throw "⚠️Tag salah satu lah";
  if (!(mention in db.data.users)) throw "User tidak terdaftar dalam DATABASE!!";
  let user = db.data.users[mention];
  if (user.isBanned) throw "📛User telah terbanned!!";
  if (1 * user.warn < 1) throw "⛔ User tidak mempunyai warn";
  let count = (args[1] || args.length > 0 ? isNaN(parseInt(args[1])) ? 1 : parseInt(args[1]) : 1) || 1;
  if (1 * user.warn < 1 * count) throw `User hanya memiliki *${1 * user.warn}* WARN!!`;
  user.warn -= 1 * count, m.reply("✔️Berhasil Unwarn user!!"), await conn.reply(mention, "*Kamu telah di Unwarn OWNER Atau MODERATOR, sekarang kamu memiliki *" + 1 * db.data.users[mention].warn + "* WARN", null);
};
handler.help = ["unwarn @mention"], handler.tags = ["owner"], handler.command = /^unwarn(user)?$/i,
  handler.mods = !0;
export default handler;