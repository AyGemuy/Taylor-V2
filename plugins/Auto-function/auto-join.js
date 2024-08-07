let isJoin = /chat.whatsapp.com\/([0-9A-Za-z]{20,24})( [0-9]{1,3})?/i;
export async function before(m, {
  usedPrefix,
  isAdmin,
  isBotAdmin,
  isOwner
}) {
  if (m.isBaileys && m.fromMe && !m.text) return !1;
  if (!m.isGroup) return;
  let chat = db.data.chats[m.chat];
  db.data.settings[this.user.jid];
  const isAutoJoin = isJoin.exec(m.text);
  chat.autoJoin && isAutoJoin && await this.reply(m.chat, "*Group link join detect!*", m);
}