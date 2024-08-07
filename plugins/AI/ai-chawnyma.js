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
    const result = await fetchCompletion(text);
    m.reply(result);
  } catch (error) {
    m.reply(error);
  }
};
handler.help = ["chawnyma"], handler.tags = ["internet", "ai", "gpt"], handler.command = /^(chawnyma)$/i;
export default handler;
async function fetchCompletion(inputValue) {
  try {
    const chatApiUrl = "https://api.chatanywhere.com.cn/v1/chat/completions",
      chatResponse = await fetch(chatApiUrl, {
        method: "POST",
        headers: {
          Authorization: "Bearer sk-pu4PasDkEf284PIbVr1r5jn9rlvbAJESZGpPbK7OFYYR6m9g",
          "Content-Type": "application/json;charset=UTF-8"
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [{
            role: "system",
            content: "Saya AI dari OpenAI, diciptakan untuk membantu Anda mengeksplorasi ide, bertukar informasi, dan menyelesaikan masalah. Ada yang bisa saya bantu?"
          }, {
            role: "user",
            content: inputValue
          }]
        })
      }),
      chatData = await chatResponse.json();
    return chatData.choices[0]?.message.content;
  } catch (error) {
    throw error;
  }
}