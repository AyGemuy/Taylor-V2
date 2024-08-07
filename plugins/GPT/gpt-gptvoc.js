import fetch from "node-fetch";
const handler = async (m, {
  conn,
  args,
  usedPrefix,
  command
}) => {
  const text = args.length >= 1 ? args.slice(0).join(" ") : m.quoted && m.quoted?.text || m.quoted?.caption || m.quoted?.description || null;
  if (!text) return m.reply(`Masukkan teks atau reply pesan dengan teks yang ingin diolah.\nContoh penggunaan:\n*${usedPrefix}${command} Hai, apa kabar?*`);
  m.react(wait);
  try {
    let res = await ChatGpt(text);
    m.reply(res.content);
  } catch (e) {
    m.react(eror);
  }
};
handler.help = ["gptvoc"], handler.tags = ["gpt"], handler.command = /^(gptvoc)$/i;
export default handler;
const ChatGpt = async prompt => {
  try {
    const response = await fetch("https://apps.voc.ai/api/v1/plg/prompt_stream", {
        method: "POST",
        credentials: "include",
        mode: "cors",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          prompt: prompt
        })
      }),
      dataArray = (await response.text()).split("\n\n"),
      regex = /data: (\{.*?\})/g,
      jsonMatches = [];
    let match;
    for (; null !== (match = regex.exec(dataArray[0]));) jsonMatches.push(match[1]);
    const oregex = /"data": ({.*?})/,
      endsTrueArray = jsonMatches.slice(-1),
      output = endsTrueArray[0]?.match(oregex);
    return output ? JSON.parse(output[1]) : null;
  } catch (error) {
    return console.error("Error fetching data:", error), null;
  }
};