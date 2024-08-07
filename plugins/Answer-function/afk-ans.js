export async function before(m) {
  this.listAfk = this.listAfk || {};
  let user = db.data.users[m.sender];
  if (user.afk > -1) {
    const idToRemove = m.sender;
    this.listAfk[m.chat] = this.listAfk[m.chat] ? this.listAfk[m.chat].filter(user => user.id !== idToRemove) : [];
    let caption = `\n  ${await this.getName(m.sender)} @${m.sender.split("@")[0]} berhenti AFK ${user.afkReason ? " setelah " + user.afkReason : ""}\n  Selama ${(new Date() - user.afk).toTimeString()}\n  `.trim();
    await this.reply(m.chat, caption, m, {
      mentions: this.parseMention(caption)
    }), user.afk = -1, user.afkReason = "";
  }
  let jids = [...new Set([...m.mentionedJid || [], ...m.quoted ? [m.quoted?.sender] : []])];
  for (let jid of jids) {
    let user = db.data.users[jid];
    if (!user) continue;
    let afkTime = user.afk;
    if (!afkTime || afkTime < 0) continue;
    let reason = user.afkReason || "",
      caption = `\n  Jangan tag ${await this.getName(jid)} @${jid.split("@")[0]}!\n  Dia sedang AFK ${reason ? "dengan alasan " + reason : "tanpa alasan"}\n  Selama ${(new Date() - afkTime).toTimeString()}\n  `.trim();
    await this.reply(m.chat, caption, m, {
      mentions: this.parseMention(caption)
    });
  }
  return !0;
}