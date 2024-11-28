const limit = 80;
export async function before(m) {
  if (m.isBaileys || !m.text) return false;
  const matches = m.text
      .trim()
      .match(
        /(https?:\/\/(?:www\.)?instagram\.[a-z\.]{2,6}\/[\w\-\.]+(\/[^\s]*)?)/g,
      ),
    chat = db.data.chats[m.chat];
  if (matches && matches[0] && chat.autodlInstagram) {
    m.react(wait);
    try {
      const mediaUrl = matches[0];
      return conn.ctaButton
        .setBody("Tautan Instagram terdeteksi. Apakah Anda ingin mengunduhnya?")
        .addReply("🎥 Mp4", `${usedPrefix}instagram ${mediaUrl}`)
        .addReply("📸 Story", `${usedPrefix}igstory ${mediaUrl}`)
        .run(m.chat, conn, m);
    } catch (e) {
      console.error(e);
    }
  }
}
export const disabled = false;
