import cheerio from "cheerio";
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
    let result = await pizzagpt(text);
    m.reply(result);
  } catch (e) {
    m.react(eror);
  }
};
handler.help = ["pizzagpt"], handler.tags = ["internet", "ai", "gpt"], handler.command = /^(pizzagpt)$/i;
export default handler;
async function pizzagpt(query) {
  const json_data = {
      messages: [{
        role: "system",
        content: "You are a helpful assistant."
      }, {
        role: "user",
        content: query
      }],
      model: "gpt-3.5-turbo",
      temperature: .9,
      presence_penalty: 0,
      top_p: 1,
      frequency_penalty: 0,
      stream: !0
    },
    data = JSON.stringify(json_data),
    response = await fetch("https://ai.fakeopen.com/v1/chat/completions", {
      method: "POST",
      headers: {
        authority: "ai.fakeopen.com",
        accept: "*/*",
        "accept-language": "en,fr-FR;q=0.9,fr;q=0.8,es-ES;q=0.7,es;q=0.6,en-US;q=0.5,am;q=0.4,de;q=0.3",
        authorization: "Bearer pk-this-is-a-real-free-pool-token-for-everyone",
        "content-type": "application/json",
        origin: "https://chat.geekgpt.org",
        referer: "https://chat.geekgpt.org/",
        "sec-ch-ua": '"Chromium";v="118", "Google Chrome";v="118", "Not=A?Brand";v="99"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"macOS"',
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "cross-site",
        "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.0.0 Safari/537.36"
      },
      body: data
    });
  return (await response.text()).split("\n").filter(line => "" !== line.trim()).map(line => line.replace("data: ", "")).slice(0, -2).map(item => JSON.parse(item)).map(v => v.choices[0]?.delta.content).join("");
}