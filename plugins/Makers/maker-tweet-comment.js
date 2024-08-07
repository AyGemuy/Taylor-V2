const handler = async (m, {
  conn,
  args
}) => {
  let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender,
    name = args.length >= 1 ? args.join(" ") : m.quoted && m.quoted?.text ? m.quoted?.text : m.text;
  const textInput = args.length >= 1 ? args.join(" ") : m.quoted && m.quoted?.text ? m.quoted?.text : m.text;
  m.react(wait);
  try {
    const avatar = await conn.getProfilePicture(m.sender).catch(_ => "https://telegra.ph/file/a2ae6cbfa40f6eeea0cf1.jpg");
    let replies = Math.floor(99e4 * Math.random()) + 1e4,
      retweets = Math.floor(1485e3 * Math.random()) + 15e3;
    const username = who.split("@")[0],
      theme = "dark",
      url = `https://some-random-api.com/canvas/misc/tweet?displayname=${encodeURIComponent(name)}&username=${encodeURIComponent(username)}&avatar=${encodeURIComponent(avatar)}&comment=${encodeURIComponent(textInput)}&replies=${encodeURIComponent(replies)}&retweets=${encodeURIComponent(retweets)}&theme=${encodeURIComponent(theme)}`;
    await conn.sendFile(m.chat, url, "tweet.png", "*THANKS FOR TWEETING*", m);
  } catch (e) {
    m.react(eror);
  }
};
handler.help = ["tweetc"], handler.tags = ["maker"], handler.command = ["tweetc"];
export default handler;