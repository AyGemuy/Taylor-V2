export async function before(m) {
  try {
    db.data.database.afk = db.data.database.afk || {};
    let user = db.data.users[m.sender];
    if (m.isBaileys || !m.isGroup) return !1;
    if (user.afk > -1) {
      const idToRemove = m.sender;
      db.data.database.afk[m.chat] = db.data.database.afk[m.chat]
        ? db.data.database.afk[m.chat].filter((user) => user.id !== idToRemove)
        : [];
      const timeAfk = new Date() - user.afk;
      const username = await this.getName(m.sender);
      const caption = `\n🚀 @${m.sender.split("@")[0]} sudah tidak AFK dan sedang mengirim pesan. 📝\n\nAlasan: ${user.afkReason ? user.afkReason : "Tanpa Alasan"}\nSelama ${timeAfk.toTimeString()} yang lalu.\nMenunggu balasan... ⏳`;
      await this.reply(m.chat, caption, m, {
        contextInfo: {
          mentionedJid: [m.sender],
        },
        mentions: this.parseMention(caption),
      });
      user.afk = -1;
      user.afkReason = "";
    }
    let jids = [
      ...new Set([
        ...(m.mentionedJid || []),
        ...(m.quoted ? [m.quoted.sender] : []),
      ]),
    ];
    for (let jid of jids) {
      let user = db.data.users[jid];
      if (!user) continue;
      let afkTime = user.afk;
      if (!afkTime || afkTime < 0) continue;
      const isAfk =
        db.data.database.afk[m.chat]?.find((user) => user.id === jid) || [];
      if (!isAfk.length) continue;
      const reason = user.afkReason || "";
      const timeAfk = new Date() - afkTime;
      const caption = `\n🚫 Jangan tag @${jid.split("@")[0]}!\n\nDia sedang AFK ${reason ? "dengan alasan " + reason : "tanpa alasan"}\nSelama ${timeAfk.toTimeString()}\nMenunggu balasan... ⏳`;
      await this.reply(m.chat, caption, m, {
        contextInfo: {
          mentionedJid: [jid],
        },
        mentions: this.parseMention(caption),
      });
    }
  } catch (error) {
    console.error("Error in before function:", error);
  }
  return true;
}
