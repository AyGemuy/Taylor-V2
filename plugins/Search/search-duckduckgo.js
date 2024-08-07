import fetch from "node-fetch";
const handler = async (m, {
  conn,
  isOwner,
  usedPrefix,
  command,
  args
}) => {
  let text;
  if (args.length >= 1) text = args.slice(0).join(" ");
  else {
    if (!m.quoted || !m.quoted?.text) throw "input text\nEx. .duckduckgo hello world\n<command> <tex>";
    text = m.quoted?.text;
  }
  try {
    m.react(wait);
    const captiond = (await DuckGo(text)).RelatedTopics.map((v, index) => `*${htki + " " + ++index + " " + htka}*\nResult: ${v.Text ? v.Text : "Kosong"}\nLink: ${v.FirstURL ? v.FirstURL : "Kosong"}`).join("\n\n\n");
    await conn.sendFile(m.chat, flaaa.getRandom() + "DuckGo", "result", captiond, m);
  } catch (e) {
    m.react(eror);
  }
};
handler.help = ["duckduckgo"], handler.tags = ["search"], handler.command = /^(duckduckgo)$/i;
export default handler;
async function DuckGo(term) {
  var url = "https://api.duckduckgo.com/?q=" + term + "&format=json";
  const json = await fetch(url);
  return await json.json();
}