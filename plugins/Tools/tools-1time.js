const handler = async (m, {
  conn,
  isBotAdmin
}) => {
  try {
    const mtype = m.quoted?.mtype,
      settings = {
        audioMessage: {
          viewOnce: !0
        },
        videoMessage: {
          viewOnce: !0
        },
        imageMessage: {
          viewOnce: !0
        },
        stickerMessage: {
          isAvatar: !0
        },
        documentMessage: {
          viewOnce: !0
        }
      };
    if (settings[mtype]) {
      let doc = m.quoted?.mediaMessage;
      Object.assign(doc[mtype], settings[mtype]), await conn.relayMessage(m.chat, doc, {
        quoted: m
      });
      const hapus = m.quoted?.sender ? m.message.extendedTextMessage.contextInfo.participant : m.key.participant,
        bang = m.quoted?.id ? m.message.extendedTextMessage.contextInfo.stanzaId : m.key.id;
      return isBotAdmin ? conn.sendMessage(m.chat, {
        delete: {
          remoteJid: m.chat,
          fromMe: !1,
          id: bang,
          participant: hapus
        }
      }) : conn.sendMessage(m.chat, {
        delete: m.quoted?.vM.key
      });
    }
    throw "❌ Media type tidak valid!";
  } catch {
    throw "Terjadi kesalahan";
  }
};
handler.help = ["1time *[reply media]*"], handler.tags = ["main"], handler.command = /^(1time)$/i;
export default handler;