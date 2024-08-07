export async function before(m, {
  match
}) {
  if (!m.chat?.endsWith("@s.whatsapp.net")) return !0;
  const database = db.data.database.menfes;
  const room = Object.values(database).find(room => [room.a, room.b].includes(room.b) && "CHATTING" === room.state);
  if (room) {
    if (/^.*(menfesleave|menfesstart)/.test(m.text)) return;
    const other = [room.a, room.b].find(user => user !== m.sender);
    await m.copyNForward(other, !0);
  }
  return !0;
}