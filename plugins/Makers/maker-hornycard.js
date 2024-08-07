const handler = async (m, {
  conn
}) => {
  let who = m.quoted ? m.quoted?.sender : m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender;
  await conn.sendFile(m.chat, API("https://some-random-api.com", "/canvas/horny", {
    avatar: await conn.profilePictureUrl(who, "image").catch(_ => "https://telegra.ph/file/24fa902ead26340f3df2c.png")
  }), "hornycard.png", "*Nih Kartunya Kak*", m);
};
handler.help = ["hornycard", "hornylicense"], handler.tags = ["maker"], handler.command = /^(horny(card|license))$/i;
export default handler;