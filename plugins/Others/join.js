import { randomBytes } from "crypto";
const linkRegex = /chat.whatsapp.com\/([0-9A-Za-z]{20,24})( [0-9]{1,3})?/i;
const handler = async (m, { conn, text, usedPrefix, command }) => {
  try {
    const chat = db.data.chats[m.chat];
    const [_, code] = text.match(linkRegex) || [];
    if (!code) {
      return conn.reply(
        m.chat,
        `⚠️ *Format Salah!*\n\n*Contoh Penggunaan:* \n${usedPrefix + command} <link_grup>`,
        m,
      );
    }
    const res = await conn.groupAcceptInvite(code);
    if (!res) {
      return conn.reply(
        m.chat,
        `❌ *Gagal Join Grup!*\n\nPastikan link yang diberikan benar.`,
        m,
      );
    }
    const name = await conn.getName(res).catch(() => null);
    const caption = `🎉 *Berhasil Bergabung ke Grup!*\n\n📛 *Nama Grup:* ${name || res}\n📃 *Pastikan untuk membaca aturan grup!*\n\nTerima kasih telah mengundang kami! 😊`;
    await conn.reply(m.chat, caption, m);
    if (chat.bcjoin) {
      const chats = Object.entries(conn.chats)
        .filter(([_, chat]) => chat.isChats)
        .map((v) => v[0]);
      await conn.reply(
        m.chat,
        `🔗 *Link grup kamu telah dibagikan ke ${chats.length} chat!*`,
        m,
      );
      for (const id of chats) {
        await conn.reply(id, `📢 *Grup Baru* \n\n${text}`, m);
      }
    }
  } catch (error) {
    console.error(error);
    await conn.reply(m.chat, `❌ *Terjadi Kesalahan:* ${error.message}`, m);
  }
};
handler.command = /^join$/i;
handler.rowner = true;
handler.owner = true;
handler.premium = true;
export default handler;
