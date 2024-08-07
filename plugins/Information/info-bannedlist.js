import fetch from "node-fetch";
import _ from "lodash";
const handler = async (m, {
  conn,
  usedPrefix
}) => {
  try {
    let chats = _.chain(db.data.chats).entries().filter(([jid, chat]) => chat.isBanned && jid.endsWith("@g.us")).value();
    let users = _.chain(db.data.users).entries().filter(([jid, user]) => user.banned && jid.endsWith("@s.whatsapp.net")).value();
    const getChatNames = Promise.all(chats.map(async ([jid], i) => {
      let name = await conn.getName(jid);
      return `\n│ ${i + 1}). ${name || "Unknown"}\n`.trim();
    }));
    const getUserNames = Promise.all(users.map(async ([jid], i) => {
      let name = await conn.getName(jid);
      return `\n│ ${i + 1}). ${name || "Unknown"}\n`.trim();
    }));
    const [chatNames, userNames] = await Promise.all([getChatNames, getUserNames]);
    const message = `
${cmenut} *Daftar Chat Terbanned*
│ Total : ${chats.length} Chat${chats.length > 0 ? "\n" + chatNames.join("\n") : ""}
${cmenuf}

${cmenut} *Daftar User Terbanned*
│ Total : ${users.length} User${users.length > 0 ? "\n" + userNames.join("\n") : ""}
${cmenuf}
`.trim();
    const thumbnailBuffer = await fetch("https://telegra.ph/file/1836eec6c22d949829474.jpg").then(res => res.arrayBuffer());
    await conn.reply(m.chat, message, m, {
      contextInfo: {
        externalAdReply: {
          title: botdate,
          body: bottime,
          mediaType: 2,
          sourceUrl: sig,
          mediaUrl: sig,
          thumbnail: Buffer.from(thumbnailBuffer)
        }
      }
    });
  } catch (error) {
    console.error(error);
    await conn.reply(m.chat, "Terjadi kesalahan dalam memuat daftar terbanned.", m);
  }
};
handler.help = ["bannedlist"];
handler.tags = ["info"];
handler.command = /^listban(ned)?|ban(ned)?list|daftarban(ned)?$/i;
export default handler;