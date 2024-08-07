import fetch from "node-fetch";
const handler = async (m, {
  conn,
  args,
  usedPrefix,
  command
}) => {
  const text = args.length >= 1 ? args.slice(0).join(" ") : m.quoted && (m.quoted?.text || m.quoted?.caption || m.quoted?.description) || null;
  if (!text) return m.reply(`Input query text!\n*Example:*\n- *${usedPrefix + command}* hello`);
  try {
    const result = await CleanDx(text);
    m.reply(result);
  } catch (error) {
    m.reply(error);
  }
};
handler.help = ["cleandx"], handler.tags = ["internet", "ai"], handler.command = /^(cleandx)$/i;
export default handler;
async function CleanDx(your_qus) {
  try {
    const linkaiList = [],
      Baseurl = "https://vipcleandx.xyz/";
    linkaiList.push({
      content: your_qus,
      role: "user",
      nickname: "",
      time: Date.now(),
      isMe: !0
    }), linkaiList.push({
      content: "Saya AI dari OpenAI, diciptakan untuk membantu Anda mengeksplorasi ide, bertukar informasi, dan menyelesaikan masalah. Ada yang bisa saya bantu?",
      role: "assistant",
      nickname: "AI",
      time: Date.now(),
      isMe: !1
    }), linkaiList.length > 10 && linkaiList.shift();
    const response = await fetch(Baseurl + "v1/chat/gpt/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Forwarded-For": Array.from({
          length: 4
        }, () => Math.floor(256 * Math.random())).join("."),
        Referer: Baseurl,
        Accept: "application/json, text/plain, */*"
      },
      body: JSON.stringify({
        list: linkaiList,
        id: Math.floor(256 * Math.random()),
        title: your_qus,
        prompt: "",
        temperature: .5,
        models: 0,
        continuous: !0,
        is_web: !0
      })
    });
    return await response.text();
  } catch (error) {
    return console.error("Error:", error), null;
  }
}