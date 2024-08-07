const {
  proto,
  generateWAMessage,
  areJidsSameUser
} = (await import("@whiskeysockets/baileys")).default;
export async function all(m, chatUpdate) {
  try {
    if (m.isBaileys) return;
    if (!m.message) return;
    if (!m.msg?.fileSha256) return;
    if (!(Buffer.from(m.msg.fileSha256).toString("base64") in db.data?.sticker)) return;
    let hash = db.data.sticker[Buffer.from(m.msg.fileSha256).toString("base64")];
    let {
      text,
      mentionedJid
    } = hash || {};
    if (!text && !mentionedJid) return;
    const toCmd = text;
    if (!toCmd) return;
    await this.appenTextMessage(m, m.prefix ? m.command?.match?.[0]?.[0] + toCmd : toCmd, chatUpdate);
  } catch (error) {
    console.error("Error in processing message:", error);
  }
}