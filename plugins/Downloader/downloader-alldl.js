import fetch from "node-fetch";
const AllDl = async (url) => {
  try {
    const response = await fetch(
      `https://smfahim.onrender.com/alldl?url=${encodeURIComponent(url)}`,
    );
    if (!response.ok)
      return {
        error: "Gagal memuat data dari server",
      };
    return await response.json();
  } catch (error) {
    return {
      error: `Kesalahan saat mengambil data: ${error.message}`,
    };
  }
};
const handler = async (m, { conn, args, usedPrefix, command }) => {
  const text = args.length ? args.join(" ") : m.quoted?.text;
  if (!text) {
    return m.reply(
      `📥 *Unduh Media*\n\n*Silakan berikan link atau balas pesan dengan link yang ingin diunduh!*\n\n*Contoh:*\n${usedPrefix + command} https://contoh.com/link`,
    );
  }
  m.react(wait);
  const result = await AllDl(text);
  if (result.error) {
    m.reply(result.error);
    return;
  }
  if (!result.url.status) {
    return m.reply("❌ *Gagal mendownload*, pastikan link valid.");
  }
  const { title, high } = result.url.data;
  if (!high) {
    return m.reply("❌ *Tidak ada link kualitas tinggi untuk unduhan ini.*");
  }
  const provider = text.includes("youtube.com")
    ? "YOUTUBE"
    : text.includes("tiktok.com")
      ? "TIKTOK"
      : text.includes("instagram.com")
        ? "INSTAGRAM"
        : text.includes("twitter.com")
          ? "TWITTER"
          : text.includes("facebook.com")
            ? "FACEBOOK"
            : text.includes("vimeo.com")
              ? "VIMEO"
              : "MEDIA";
  const caption = `*\`${provider}\`*\n- ${title || "Tanpa Judul"}\n\n🔗 *Link Kualitas Tinggi:*\n- ${high}`;
  const dataBuffer =
    (await (await conn.getFile(high)).data) ||
    (await (
      await conn.getFile(low)
    ).data);
  await conn.sendFile(m.chat, dataBuffer, "", caption, m, false, {
    mentions: [m.sender],
  });
};
handler.help = ["alldl *[link]*"];
handler.tags = ["downloader"];
handler.command = /^(alldl)$/i;
export default handler;
