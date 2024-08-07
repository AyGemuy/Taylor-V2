const handler = async (m, {
  conn,
  text,
  usedPrefix,
  command,
  participants
}) => {
  switch (text || (await conn.sendPresenceUpdate("composing", m.chat), await conn.reply(m.chat, `*Format salah! Contoh :*\n\n\t*○ ${usedPrefix + command} on*\n\t*○ ${usedPrefix + command} off*`, m)), text) {
    case "on":
    case "enable":
      if (db.data.chats[m.chat].reminder) return await conn.reply(m.chat, "*reminder telah aktif pada grup ini.*", m);
      await conn.sendPresenceUpdate("composing", m.chat), db.data.chats[m.chat].reminder = !0,
        await conn.reply(m.chat, "*reminder berhasil diaktifkan.*", m);
      break;
    case "off":
    case "disable":
      if (!db.data.chats[m.chat].reminder) return await conn.reply(m.chat, "*reminder belum aktif pada grup ini.*", m);
      await conn.sendPresenceUpdate("composing", m.chat), db.data.chats[m.chat].reminder = !1,
        await conn.reply(m.chat, "*reminder berhasil dimatikan.*", m);
      break;
    default:
      await conn.sendPresenceUpdate("composing", m.chat), await conn.reply(m.chat, `*Format salah! Contoh :*\n\n\t*○ ${usedPrefix + command} on*\n\t*○ ${usedPrefix + command} off*`, m);
  }
};
handler.help = ["reminder"].map(v => v + " [on/off]"), handler.tags = ["group"],
  handler.command = /^(reminder)$/i, handler.group = !0, handler.admin = !0, handler.botAdmin = !0;
export default handler;