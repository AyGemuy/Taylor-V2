const limit = 80;
export async function before(m) {
  if (m.isBaileys || !m.text) return false;
  const matches = m.text
      .trim()
      .match(/^https?:\/\/(www\.)?youtube\.com\/watch\?v=[a-zA-Z0-9_-]{11}$/),
    chat = db.data.chats[m.chat];
  if (matches && matches[0] && chat.autodlYoutube) {
    m.react(wait);
    try {
      const quality = "360p",
        videoUrl = matches[0];
      return conn.ctaButton
        .setBody("Terdeteksi link YouTube. Apakah Anda ingin mengunduhnya?")
        .addReply("🎵 Mp3", `${usedPrefix}ytmp3 ${videoUrl}`)
        .addReply("🎥 Mp4", `${usedPrefix}ytmp4 ${videoUrl}`)
        .run(m.chat, conn, m);
    } catch (e) {
      console.error(e);
    }
  }
}
export const disabled = false;
