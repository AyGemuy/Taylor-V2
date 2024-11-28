const limit = 80;
export async function before(m) {
  if (m.isBaileys || !m.text) return false;
  const matches = m.text
      .trim()
      .match(
        /(?:https?:\/\/)?(?:www\.)?(?:facebook\.com|fb\.gg|fb\.watch)\/[^\s/]+(?:\/videos\/\d+\/?)?/,
      ),
    chat = db.data.chats[m.chat];
  if (matches && matches[0] && chat.autodlFacebook) {
    m.react(wait);
    try {
      const mediaUrl = matches[0];
      return conn.ctaButton
        .setBody("Tautan Facebook terdeteksi. Apakah Anda ingin mengunduhnya?")
        .addReply("🎥 Mp4", `${usedPrefix}facebook ${mediaUrl}`)
        .run(m.chat, conn, m);
    } catch (e) {
      console.error(e);
    }
  }
}
export const disabled = false;
