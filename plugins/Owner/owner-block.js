const handler = async (m, {
  conn,
  text,
  usedPrefix
}) => {
  if (text = function(number) {
      return number.replace(/\s/g, "").replace(/([@+-])/g, "");
    }(text), isNaN(text)) var number = text.split("@")[1];
  else if (!isNaN(text)) number = text;
  if (!text && !m.quoted) return await conn.reply(m.chat, `*❏ BLOCK NUMBER*\n\n• \`\`\`Tag user:\`\`\` *${usedPrefix}block @Tag*\n• \`\`\`Type Number:\`\`\` *${usedPrefix}block 6289654360447*\n• \`\`\`Block User:\`\`\` *(Reply Your User)*`, m);
  if (isNaN(number)) return await conn.reply(m.chat, `*❏ BLOCK NUMBER*\n\n• \`\`\`Tag user:\`\`\` *${usedPrefix}block @Tag*\n• \`\`\`Type Number:\`\`\` *${usedPrefix}block 6289654360447*\n• \`\`\`Block User:\`\`\` *(Reply Your User)*`, m);
  if (number.length > 15) return await conn.reply(m.chat, `*❏ BLOCK NUMBER*\n\n• \`\`\`Tag user:\`\`\` *${usedPrefix}block @Tag*\n• \`\`\`Type Number:\`\`\` *${usedPrefix}block 6289654360447*\n• \`\`\`Block User:\`\`\` *(Reply Your User)*`, m);
  try {
    if (text) var user = number + "@s.whatsapp.net";
    else if (m.quoted?.sender) user = m.quoted?.sender;
    else if (m.mentionedJid) user = number + "@s.whatsapp.net";
  } catch (e) {} finally {
    let groupMetadata = m.isGroup ? await conn.groupMetadata(m.chat) : {},
      participants = m.isGroup ? groupMetadata.participants : [],
      number = (m.isGroup && participants.find(u => u.jid === user), user.split("@")[0]);
    await conn.updateBlockStatus(user, "block"), await conn.reply(m.chat, `Berhasil memblockir @${number}`, null, {
      contextInfo: {
        mentionedJid: [user]
      }
    });
  }
};
handler.help = ["block <@user>"], handler.tags = ["owner"], handler.command = /^block$/i,
  handler.owner = !0;
export default handler;