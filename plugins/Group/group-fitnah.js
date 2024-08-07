const handler = async (m, {
  conn,
  text,
  usedPrefix,
  command
}) => {
  if (!text) return await conn.reply(m.chat, `Contoh penggunaan:\n${usedPrefix + command} aku siapa? @6283128734012 kamu ownerku ><`, m, {
    contextInfo: {
      mentionedJid: ["6283128734012@s.whatsapp.net"]
    }
  });
  let who, cm = copy(m);
  if (who = text.includes("@0") ? "0@s.whatsapp.net" : m.isGroup ? cm.participant = m.mentionedJid[0] : m.chat, !who) return await conn.reply(m.chat, `Contoh penggunaan:\n${usedPrefix + command} aku siapa? @6283128734012 kamu ownerku ><`, m, {
    contextInfo: {
      mentionedJid: ["6283128734012@s.whatsapp.net"]
    }
  });
  cm.key.fromMe = !1, cm.message[m.mtype] = copy(m.msg);
  let sp = "@" + who.split("@")[0],
    [fake, ...real] = text.split(sp);
  conn.fakeReply(m.chat, real.join(sp).trimStart(), who, fake.trimEnd(), !!m.isGroup && m.chat, {
    contextInfo: {
      mentionedJid: conn.parseMention(real.join(sp).trim())
    }
  });
};
handler.help = ["fitnah <teks> @user <teks>"], handler.tags = ["tools"], handler.command = /^(fitnah|fakereply)$/;
export default handler;

function copy(obj) {
  return JSON.parse(JSON.stringify(obj));
}