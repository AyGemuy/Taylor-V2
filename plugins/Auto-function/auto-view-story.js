export async function before(m, { isAdmin, isBotAdmin }) {
  if (m.key.remoteJid !== "status@broadcast") return !1;
  const database = db.data.database.story;
  const story = database || [];
  const { mtype, text, sender } = m;
  const chat = db.data.chats[m.chat];
  if (!chat.viewStory) {
    switch (mtype) {
      case "imageMessage":
      case "videoMessage":
        story.push({
          type: mtype,
          quoted: m,
          sender: m.sender,
          caption: text || "",
        });
        break;
      case "audioMessage":
        story.push({
          type: mtype,
          quoted: m,
          sender: m.sender,
        });
        break;
      case "extendedTextMessage":
        story.push({
          type: mtype,
          quoted: m,
          sender: m.sender,
          message: text || "",
        });
        break;
    }
    return;
  }
  switch (mtype) {
    case "imageMessage":
    case "videoMessage":
      try {
        await this.relayMessage(sender, m.message, {
          messageId: m.id,
        });
        story.push({
          type: mtype,
          quoted: m,
          sender: m.sender,
          caption: text || "",
          buffer: buffer,
        });
      } catch (e) {
        console.log(e);
      }
      break;
    case "audioMessage":
      try {
        await this.relayMessage(sender, m.message, {
          messageId: m.id,
        });
        story.push({
          type: mtype,
          quoted: m,
          sender: m.sender,
          buffer: buffer,
        });
      } catch (e) {
        console.log(e);
      }
      break;
    case "extendedTextMessage":
      await this.relayMessage(sender, m.message, {
        messageId: m.id,
      });
      story.push({
        type: mtype,
        quoted: m,
        sender: m.sender,
        message: text || "",
      });
      break;
  }
}
