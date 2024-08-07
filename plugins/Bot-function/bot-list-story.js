const handler = async (m, {
  conn
}) => {
  const storyData = db.data.database.storyData || {};
  const story = db.data.database.story || [];
  const list = story;
  if (0 === list.length) return await conn.reply(m.chat, "Tidak ada cerita yang tersedia saat ini. Silakan tambahkan cerita dengan mengirim gambar, video, atau pesan suara.", m, {
    mentions: [m.sender]
  });
  const formattedMessages = list.map((obj, index) => {
    const {
      type,
      sender,
      caption
    } = obj, messageType = convertMessageType(type), senderUsername = sender.split("@")[0];
    let text = `*${index + 1}.* ${messageType.toUpperCase()} - @${senderUsername}`;
    return caption && (text += `\n${caption}`), text + "\n";
  }).join("\n");
  let {
    key
  } = await conn.reply(m.chat, `🔧 Daftar Story:\n\n${formattedMessages}\n\nBalas pesan ini dengan nomor cerita yang ingin ditampilkan.`, m, {
    mentions: [m.sender]
  });
  storyData[m.chat] = {
    list: list,
    key: key,
    timeout: setTimeout(() => {
      conn.sendMessage(m.chat, {
        delete: key
      }), delete storyData[m.chat];
    }, 6e4)
  };
};
handler.before = async (m, {
    conn
  }) => {
    const storyData = db.data.database.storyData || {};
    const story = db.data.database.story || {};
    if (storyData, m.isBaileys || !(m.chat in storyData)) return;
    if (!storyData[m.chat]) return;
    const {
      list,
      key
    } = storyData[m.chat];
    if (!m.quoted || m.quoted?.id !== key.id || !m.text) return;
    const index = parseInt(m.text.trim());
    if (isNaN(index) || index < 1 || index > list.length) await conn.reply(m.chat, "⚠️ Masukkan nomor video yang valid.", m);
    else {
      const selectedObj = list[index - 1];
      if ("imageMessage" === selectedObj.type || "videoMessage" === selectedObj.type) {
        const caption = selectedObj.caption ? selectedObj.caption : "";
        await conn.sendFile(m.chat, selectedObj.buffer, "", caption, selectedObj.quoted, !1, {
          mentions: [m.sender]
        });
      } else if ("audioMessage" === selectedObj.type) await conn.sendFile(m.chat, selectedObj.buffer, "", "", selectedObj.quoted);
      else if ("extendedTextMessage" === selectedObj.type) {
        const message = selectedObj.message ? selectedObj.message : "";
        await conn.reply(m.chat, message, selectedObj.quoted, {
          mentions: [m.sender]
        });
      }
      clearTimeout(storyData[m.chat].timeout), delete storyData[m.chat];
    }
  }, handler.help = ["botsw", "listsw"], handler.tags = ["search"], handler.command = /^(botsw|listsw)$/i,
  handler.limit = !0;
export default handler;

function convertMessageType(messageType) {
  return {
    videoMessage: "video",
    imageMessage: "gambar",
    audioMessage: "vn",
    extendedTextMessage: "teks"
  } [messageType] || "unknown";
}