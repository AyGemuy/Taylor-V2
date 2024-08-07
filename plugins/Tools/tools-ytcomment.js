const handler = async (m, {
  conn,
  text
}) => {
  if (!text) throw "Input your text";
  await conn.sendFile(m.chat, API("https://some-random-api.com", "/canvas/youtube-comment", {
    avatar: await conn.profilePictureUrl(m.sender, "image").catch(_ => "https://telegra.ph/file/24fa902ead26340f3df2c.png"),
    comment: text,
    username: m.name
  }), "error.png", "*THANKS FOR COMMENT*", m);
};
handler.help = ["ytcomment <comment>"], handler.tags = ["maker"], handler.command = /^(ytcomment)$/i;
export default handler;