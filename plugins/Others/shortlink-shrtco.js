import fetch from "node-fetch";
const handler = async (m, {
  conn,
  args,
  text,
  usedPrefix,
  command
}) => {
  if (!text) throw "Input link";
  m.react(wait);
  try {
    const response = await fetch("https://api.shrtco.de/v2/shorten?url=" + text);
    if (!response.ok) throw `This is an HTTP Error: The Status is ${response.status}`;
    let Data = await response.json();
    m.reply(`*Original:*\n${Data.result.original_link}\n\n*ShortLink:*\n${Data.result.full_short_link}`);
  } catch (e) {
    m.react(eror);
  }
};
handler.help = ["shrtco"], handler.tags = ["tools"], handler.command = ["shrtco"];
export default handler;