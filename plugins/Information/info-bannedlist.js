import fetch from "node-fetch";
import _ from "lodash";
const handler = async (m, { conn, usedPrefix }) => {
  try {
    let chats = _.chain(db.data.chats)
      .entries()
      .filter(([jid, chat]) => chat.isBanned && jid.endsWith("@g.us"))
      .value();
    let users = _.chain(db.data.users)
      .entries()
      .filter(([jid, user]) => user.banned && jid.endsWith("@s.whatsapp.net"))
      .value();
    let chatNames = [];
    for (const [i, [jid]] of chats.entries()) {
      let name = await conn.getName(jid);
      chatNames.push(
        `\n${i + 1}). Nama: *${name || "Unknown"}*\n- Nomor: _${jid}_`,
      );
    }
    let userNames = [];
    for (const [i, [jid, user]] of users.entries()) {
      let name = await conn.getName(jid);
      let reason = user.BannedReason || "Tidak ada alasan";
      userNames.push(
        `\n${i + 1}). ${name || "Unknown"}\n- ${jid.split("@")[0]}\n- *Alasan:* ${reason}`,
      );
    }
    const txt = `
*\`📛 Daftar Chat Terbanned\`*
*Total:* ${chats.length} Chat${chats.length > 0 ? "\n" + chatNames.join("\n") : "\n📜 Tidak ada chat terbanned"}

*\`🚫 Daftar User Terbanned\`*
*Total:* ${users.length} User${users.length > 0 ? "\n" + userNames.join("\n") : "\n📜 Tidak ada user terbanned"}
`.trim();
    await conn.reply(m.chat, txt, m, {
      contextInfo: {
        mentionedJid: [m.sender],
        mediaType: 1,
        previewType: 0,
        renderLargerThumbnail: true,
        thumbnailUrl:
          "https://thumbs.dreamstime.com/z/user-accepted-deleted-icons-set-78373435.jpg?w=992",
        sourceUrl: "",
      },
    });
  } catch (error) {
    console.error(error);
    await conn.reply(
      m.chat,
      "❌ *Terjadi kesalahan:* Tidak dapat memuat daftar terbanned.",
      m,
    );
  }
};
handler.help = ["bannedlist"];
handler.tags = ["info"];
handler.command = /^listban(ned)?|ban(ned)?list|daftarban(ned)?$/i;
export default handler;
