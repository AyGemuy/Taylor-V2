const handler = async (m, { conn, text, groupMetadata }) => {
  await conn.sendPresenceUpdate("composing", m.chat);
  const now = new Date().toLocaleString("en-US", {
      timeZone: "Asia/Jakarta",
    }),
    milliseconds = new Date(now).getTime();
  let member = groupMetadata.participants.map((v) => v.id);
  if (text) pesan = text;
  else
    var pesan =
      "Harap aktif di grup karena akan ada pembersihan member setiap saat";
  var sum;
  sum = member.length;
  var total = 0,
    sider = [];
  for (let i = 0; i < sum; i++) {
    let users = m.isGroup
      ? groupMetadata.participants.find((u) => u.id === member[i])
      : {};
    !(
      void 0 === db.data.users[member[i]] ||
      1 * milliseconds - db.data.users[member[i]].lastseen > 6048e5
    ) ||
      users.isAdmin ||
      users.isSuperAdmin ||
      (void 0 !== db.data.users[member[i]]
        ? !0 === db.data.users[member[i]].banned &&
          (total++, sider.push(member[i]))
        : (total++, sider.push(member[i])));
  }
  if (0 === total)
    return await conn.reply(m.chat, "*Digrup ini tidak terdapat sider.*", m);
  await conn.reply(
    m.chat,
    `*${total}/${sum}* anggota grup *${conn.getName(m.chat)}* adalah sider dengan alasan :\n1. Tidak aktif selama lebih dari 7 hari\n2. Baru join tetapi tidak pernah nimbrung\n\n_“${pesan}”_\n\n*LIST SIDER :*\n${sider.map((v) => "  ○ @" + v.replace(/@.+/, void 0 === db.data.users[v] ? " Sider " : " Off " + msToDate(1 * milliseconds - db.data.users[v].lastseen))).join("\n")}`,
    m,
    {
      contextInfo: {
        mentionedJid: sider,
      },
    },
  );
};
(handler.help = ["gcsider"]),
  (handler.tags = ["group"]),
  (handler.command = /^(gcsider|sider|getsider)$/i),
  (handler.group = !0),
  (handler.admin = !0);
export default handler;
const more = String.fromCharCode(8206),
  readMore = more.repeat(4001);

function msToDate(ms) {
  let d = isNaN(ms) ? "--" : Math.floor(ms / 864e5),
    h = isNaN(ms) ? "--" : Math.floor(ms / 36e5) % 24,
    m = isNaN(ms) ? "--" : Math.floor(ms / 6e4) % 60;
  isNaN(ms) || Math.floor(ms / 1e3);
  return 0 === d && 0 === h && 0 === m
    ? "Baru Saja"
    : [d, "H ", h, "J "].map((v) => v.toString().padStart(2, 0)).join("");
}
