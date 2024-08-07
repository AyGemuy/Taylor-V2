export async function before(m) {
  const who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? this.user.jid : m.sender,
    name = who.split("@")[0],
    chat = db.data.chats[m.chat],
    {
      banned
    } = db.data.users[m.sender];
  if (!m.sender || !chat) return !1;
  if (chat.autoReply && !m.isBaileys) {
    ("groupInviteMessage" === m.mtype || m.text.startsWith("https://chat") || m.text.startsWith("Buka tautan ini")) && (await this.reply(m.chat, "✨ *Undang Bot ke Grup* ✨\n💎 7 Hari / Rp 5,000\n💎 30 Hari / Rp 15,000", m, {
      mentions: [m.sender]
    }), await this.reply(m.sender + "@s.whatsapp.net", `Ada yang mau nyulik nih :v \n\nDari: @${m.sender.split("@")[0]} \n\nPesan: ${m.text}`, m, {
      mentions: [m.sender]
    }));
    let reactCaption = "";
    if ("reactionMessage" === m.mtype) {
      reactCaption = `🎭 *Terdeteksi* @${name} ${m.text ? "Mengirim" : "Menghapus"} ${m.text ? `Reaction: ${m.text}` : "Reaction"}`;
    }
    if ("editedMessage" === m.mtype) try {
      console.log(m.mtype);
      const tittle_edit = `*Edited Message* @${m.sender.split("@")[0]}`,
        message_edit = m.message.editedMessage.message.protocolMessage.editedMessage.extendedTextMessage.text,
        quoted_edit = this.loadMessage(m.chat, m.message.editedMessage.message.protocolMessage.key.id);
      return await this.sendMessage(m.chat, {
        text: `${tittle_edit}\n\n${message_edit}`,
        mentions: [m.sender]
      }, {
        quoted: quoted_edit
      });
    } catch (e) {
      console.log(e);
    }
    const messages = {
      reactionMessage: reactCaption,
      paymentMessage: `💸 *Terdeteksi* @${name} Lagi Meminta Uang`,
      productMessage: `📦 *Terdeteksi* @${name} Lagi Promosi`,
      orderMessage: `🛒 *Terdeteksi* @${name} Lagi Meng Order`,
      pollCreationMessage: `📊 *Terdeteksi* @${name} Lagi Polling`,
      contactMessage: `📞 *Terdeteksi* @${name} Lagi Promosi Kontak`
    };
    if (m.mtype in messages) {
      const caption = messages[m.mtype],
        mentions = this.parseMention(caption);
      await this.reply(m.chat, caption, m, {
        mentions: mentions
      });
    }
    const triggerWords = ["aktif", "wey", "we", "hai", "oi", "oy", "p", "bot"],
      lowerText = m.text.toLowerCase();
    if (triggerWords.some(word => lowerText === word)) {
      const apsih = ["Kenapa", "Ada apa", "Naon meng", "Iya, bot disini", "Luwak white coffee passwordnya", "Hmmm, kenapa", "Apasih", "Okey bot sudah aktif", "2, 3 tutup botol", "Bot aktif"],
        caption = `🤖 *${apsih[Math.floor(Math.random() * apsih.length)]}* kak @${name} 🗿`;
      await this.reply(m.chat, caption, m, {
        mentions: [who]
      });
    }
    ("stickerMessage" === m.mtype || m.text.includes("🗿")) && await this.sendMessage(m.chat, {
      react: {
        text: "🗿",
        key: m.key
      }
    });
  }
  return !0;
}