import {
  areJidsSameUser
} from "@whiskeysockets/baileys";
const handler = async (m, {
  conn,
  text,
  participants,
  groupMetadata
}) => {
  if (isNaN(text)) var number = text.split("@")[1];
  else if (!isNaN(text)) number = text;
  if (!text && !m.quoted) return await conn.reply(m.chat, "Masukan nomor, tag atau balas pesan target.", m);
  if (isNaN(number)) return await conn.reply(m.chat, "Nomor yang anda masukan salah!", m);
  if (number.length > 15) return await conn.reply(m.chat, "Format salah!", m);
  try {
    if (text) var user = number + "@s.whatsapp.net";
    else if (m.quoted?.sender) user = m.quoted?.sender;
    else if (m.mentionedJid) user = number + "@s.whatsapp.net";
  } catch (e) {} finally {
    if (!(m.isGroup ? participants.find(v => areJidsSameUser(v.jid === user)) : {})) return await conn.reply(m.chat, "Target atau Nomor tidak ditemukan, mungkin sudah keluar atau bukan anggota grup ini.", m);
    if (user === m.sender) return await conn.reply(m.chat, "Tidak bisa berpacaran dengan diri sendiri!", m);
    if (user === conn.user.jid) return await conn.reply(m.chat, "*Tidak bisa berpacaran dengan saya t_t", m);
    db.data.users[user].pasangan != m.sender ? await conn.reply(m.chat, `Maaf @${user.split("@")[0]} tidak sedang menembak anda`, m, {
      contextInfo: {
        mentionedJid: [user]
      }
    }) : (db.data.users[user].pasangan = "", await conn.reply(m.chat, `Anda baru saja menolak @${user.split("@")[0]} untuk menjadi pasangan anda!`, m, {
      contextInfo: {
        mentionedJid: [user]
      }
    }));
  }
};
handler.help = ["tolak *@tag*"], handler.tags = ["jadian"], handler.command = /^(tolak)$/i,
  handler.mods = !1, handler.premium = !1, handler.group = !0, handler.limit = !1,
  handler.fail = null;
export default handler;