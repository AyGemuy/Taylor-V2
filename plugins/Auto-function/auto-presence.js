export async function before(m) {
  const chat = db.data.chats[m.chat];
  if (!m.text || !chat.autoPresence) return !1;
  const presenceStatus = Object.values(plugins).flatMap(plugin => []?.concat(plugin.command)).some(cmd => cmd instanceof RegExp ? cmd.test(m.text) : m.text.includes(cmd)) ? "composing" : "available";
  presenceStatus && await this.sendPresenceUpdate(presenceStatus, m.chat);
}
export const disabled = !1;