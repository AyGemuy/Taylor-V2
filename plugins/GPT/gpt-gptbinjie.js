import fetch from "node-fetch";
const handler = async (m, {
  conn,
  args,
  usedPrefix,
  command
}) => {
  const text = args.length >= 1 ? args.slice(0).join(" ") : m.quoted && (m.quoted?.text || m.quoted?.caption || m.quoted?.description) || null;
  if (!text) return m.reply(`Masukkan teks atau balas pesan dengan teks yang ingin diolah.\nContoh penggunaan:\n*${usedPrefix}${command} Hai, apa kabar?*`);
  m.reply("Menunggu...");
  try {
    const messages = [{
        role: "system",
        content: "Saya AI dari OpenAI, diciptakan untuk membantu Anda mengeksplorasi ide, bertukar informasi, dan menyelesaikan masalah. Ada yang bisa saya bantu?"
      }, {
        role: "user",
        content: text
      }],
      output = await BinjieFun(messages[0]?.content, messages[1].content);
    m.reply(output);
  } catch (e) {
    m.reply("Terjadi kesalahan.");
  }
};
handler.help = ["gptbinjie"], handler.tags = ["ai"], handler.command = /^(gptbinjie)$/i;
export default handler;
async function BinjieFun(system, prompt) {
  try {
    const host = "api.binjie.fun",
      port = "443",
      requestOptions = {
        method: "POST",
        headers: {
          Host: host,
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36",
          Accept: "application/json, text/plain, */*",
          "Accept-Language": "id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7",
          "Content-Type": "application/json",
          Origin: "https://chat.jinshutuan.com"
        },
        body: JSON.stringify({
          prompt: prompt,
          network: !0,
          system: system,
          withoutContext: !1,
          stream: !1
        })
      },
      response = await fetch(`https://${host}:${port}/api/generateStream`, requestOptions);
    return await response.text();
  } catch (error) {
    throw new Error("Error fetching data from AI service.");
  }
}