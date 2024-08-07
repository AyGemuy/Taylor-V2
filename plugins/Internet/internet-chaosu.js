import fetch from "node-fetch";
const handler = async (m, {
  conn,
  args,
  usedPrefix,
  command
}) => {
  let text;
  if (args.length >= 1) text = args.slice(0).join(" ");
  else {
    if (!m.quoted || !m.quoted?.text) throw "Input Teks";
    text = m.quoted?.text;
  }
  try {
    m.react(wait);
    let res = await ChatGpt(text);
    m.reply(res);
  } catch (e) {
    m.react(eror);
  }
};
handler.help = ["chaosu"], handler.tags = ["internet"], handler.command = /^chaosu$/i;
export default handler;
async function ChatGpt(input) {
  let gg = await fetch("https://chaosu.xyz/chat.php?q=" + input),
    ff = await gg.text(),
    combinedData = {},
    lines = JSON.parse(JSON.stringify(ff)).split("\n");
  for (let i = 0; i < lines.length; i++)
    if (lines[i].includes("content")) {
      let obj = JSON.parse(lines[i].slice(6));
      combinedData.content = combinedData.content + obj.content;
    }
  return combinedData.content.slice(9);
}