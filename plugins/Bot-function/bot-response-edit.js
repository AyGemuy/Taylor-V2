const {
  proto,
  generateWAMessage,
  areJidsSameUser
} = (await import("@whiskeysockets/baileys")).default;
export async function all(m, chatUpdate) {
  try {
    if (m.isBaileys || !m.message || !m.message.editedMessage) return;
    const editedMsg = m.message.editedMessage;
    if (editedMsg.imageMessage || editedMsg.videoMessage || editedMsg.documentMessage || editedMsg.editedMessage && (editedMsg.editedMessage.imageMessage || editedMsg.editedMessage.videoMessage || editedMsg.editedMessage.documentMessage)) {
      return;
    }
    let hash = {
      text: editedMsg.message?.protocolMessage?.editedMessage?.extendedTextMessage?.text || editedMsg.extendedTextMessage?.text || null,
      mentionedJid: m.sender || null
    };
    let {
      text: inputText,
      mentionedJid: userMention
    } = hash;
    if (!(inputText && userMention)) return;
    const toCmd = inputText;
    if (!toCmd) return;
    await this.appenTextMessage(m, m.prefix ? m.command?.match?.[0]?.[0] + toCmd : toCmd, chatUpdate);
  } catch (error) {
    console.error("Error in processing message:", error);
  }
}