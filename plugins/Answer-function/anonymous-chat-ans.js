export async function before(m, { match }) {
  if (!m.chat?.endsWith("@s.whatsapp.net")) return !0;
  db.data.game.anonymous = db.data.game.anonymous ? db.data.game.anonymous : {};
  let room = Object.values(db.data.game.anonymous).find(
    (room) => [room.a, room.b].includes(m.sender) && "CHATTING" === room.state,
  );
  if (room) {
    if (/^.*(anonymous (next|leave|start))/.test(m.text)) return;
    let other = [room.a, room.b].find((user) => user !== m.sender);
    await this.relayMessage(other, m.message, {
      messageId: m.id,
    });
  }
  return !0;
}
