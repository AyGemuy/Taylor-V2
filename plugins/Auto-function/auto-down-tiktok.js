const limit = 80;
export async function before(m) {
  if (m.isBaileys || !m.text) return false;
  const matches = m.text
      .trim()
      .match(
        /(http(?:s)?:\/\/)?(?:www\.)?(?:tiktok\.com\/@[^\/]+\/video\/(\d+))|(http(?:s)?:\/\/)?vm\.tiktok\.com\/([^\s&]+)|(http(?:s)?:\/\/)?vt\.tiktok\.com\/([^\s&]+)/g,
      ),
    chat = db.data.chats[m.chat];
  if (matches && matches[0] && chat.autodlTiktok) {
    m.react(wait);
    try {
      const videoUrl = matches[0];
      return conn.ctaButton
        .setBody("Tautan TikTok terdeteksi. Apakah Anda ingin mengunduhnya?")
        .addReply("🎵 Mp3", `${usedPrefix}tiktokaudio ${videoUrl}`)
        .addReply("🎥 Mp4", `${usedPrefix}tiktok ${videoUrl}`)
        .run(m.chat, conn, m);
    } catch (e) {
      console.error(e);
    }
  }
}
export const disabled = false;
