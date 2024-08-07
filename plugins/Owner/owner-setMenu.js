const handler = async (m, {
  conn,
  command,
  text
}) => {
  let type = command.replace(/^set(menu|help|\?)/, "").toLowerCase();
  "" === type ? text ? (conn.menu = text, await conn.reply(m.chat, "Menu berhasil diatur\n" + info, m)) : (conn.menu = {}, await conn.reply(m.chat, "Menu direset", m)) : (conn.menu = "object" == typeof conn.menu ? conn.menu : {}, text ? (conn.menu[type] = text, await conn.reply(m.chat, "Menu " + type + " berhasil diatur\n" + info, m)) : (delete conn.menu[type], await conn.reply(m.chat, "Menu " + type + " direset", m)));
};
handler.help = ["", "before", "header", "body", "footer", "after"].map(v => "setmenu" + v + " <teks>"),
  handler.tags = ["owner"], handler.command = /^set(menu|help|\?)(before|header|body|footer|after)?$/i,
  handler.owner = !0, handler.mods = !1, handler.premium = !1, handler.group = !1,
  handler.private = !1, handler.admin = !1, handler.botAdmin = !1, handler.fail = null;
export default handler;
let info = "\nUniversal:\n%% (%)\n%p (Prefix)\n%exp (Current Exp)\n$maxexp (Exp To Level Up)\n%totalexp (Total Exp)\n%xp4levelup (Exp yang dibutuhkan untuk levelup)\n%limit (Limit)\n%name (Nama)\n%weton (Weton Hari ini)\n%week (Hari)\n%date (Tanggal)\n%time (Jam)\n%uptime (Uptime Bot)\n%rtotalreg (Jumlah User yang daftar di database)\n%totalreg (Jumlah User yang ada di database)\n%npmname\n%npmdesc\n%version\n%github\n\nBagian Menu Header & Footer:\n%category (Kategori)\n\nBagian Menu Body:\n%cmd (Command)\n%islimit (Jika command di limit)\n".trim();