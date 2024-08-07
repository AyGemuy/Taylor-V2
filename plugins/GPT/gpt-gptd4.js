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
    let res = await LemurChat(text);
    m.reply(res);
  } catch (e) {
    m.react(eror);
  }
};
handler.help = ["lemurchat"], handler.tags = ["gpt"], handler.command = /^(lemurchat)$/i;
export default handler;
async function LemurChat(your_qus) {
  const requestData = `{"messages":"[{\\"content\\":\\"\\",\\"id\\":\\"LEMUR_AI_SYSTEM_SETTING\\",\\"isSensitive\\":false,\\"needCheck\\":false,\\"role\\":\\"system\\"},{\\"content\\":\\"${your_qus}\\",\\"isSensitive\\":false,\\"needCheck\\":true,\\"role\\":\\"user\\"}]"}`,
    response = await fetch("http://lemurchat.anfans.cn/api/chat/conversation-trial", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "User-Agent": "Mozilla/5.0 (Linux; Android 9; Redmi 4 Prime) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Mobile Safari/537.36"
      },
      body: requestData,
      responseType: "stream"
    });
  var input = (await response.text()).replace(/id: \d+\ndata: '/, "\n").split("\n").filter(item => item.startsWith("data:")).map(item => JSON.parse(item.replace(/^data: /, ""))).map(v => v.data).join("");
  const regex = /"content":"(.*?)"/g,
    contents = [];
  let match;
  for (; null !== (match = regex.exec(input));) contents.push(match[1]);
  return contents.join("").replace(/\\n/g, "\n");
}