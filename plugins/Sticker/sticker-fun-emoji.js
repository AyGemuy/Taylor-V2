import wibusoft from "wibusoft";
const handler = async (m, {
  conn,
  args,
  text,
  usedPrefix,
  command
}) => {
  let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender,
    name = conn.getName(who);
  var sty = ["Adventurer", "Adventurer-Neutral", "Avataaars", "Avataaars-Neutral", "Big-Ears", "Big-Ears-Neutral", "Big-Smile", "Bottts", "Bottts-Neutral", "Croodles", "Croodles-Neutral", "Fun-Emoji", "Icons", "Identicon", "Initials", "Lorelei", "Lorelei-Neutral", "Micah", "Miniavs", "Notionists", "Notionists-Neutral", "Open-Peeps", "Personas", "Pixel-Art", "Pixel-Art-Neutral", "Shapes", "Thumbs"].map(v => v.toLowerCase()),
    sep = text.split(/[^\w\s]/g),
    sa = sep[0];
  if (sa > 26) throw "lebih";
  var du = sep[1];
  if (!sa || !du) throw "input .dicebear 9|felix";
  m.react(wait);
  var fakec = "https://api.dicebear.com/6.x/" + sty[sa] + "/png?seed=" + encodeURIComponent(du),
    out = await wibusoft.tools.makeSticker(fakec, {
      author: packname,
      pack: name,
      keepScale: !0,
      circle: !0
    });
  try {
    m.reply(out);
  } catch (e) {
    m.react(eror);
  }
};
handler.help = ["dicebear"], handler.tags = ["sticker"], handler.command = /^(dicebear)$/i;
export default handler;