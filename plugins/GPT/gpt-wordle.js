import fetch from "node-fetch";
import crypto from "crypto";
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
    let res = await gptWordle(text);
    m.reply(res.message.content);
  } catch (e) {
    m.react(eror);
  }
};
handler.help = ["wordle"], handler.tags = ["gpt"], handler.command = /^(wordle)$/i;
export default handler;
const generateRandomIP = () => {
    const octet = () => Math.floor(256 * Math.random());
    return `${octet()}.${octet()}.${octet()}.${octet()}`;
  },
  generateRandomUserAgent = () => {
    const androidVersions = ["4.0.3", "4.1.1", "4.2.2", "4.3", "4.4", "5.0.2", "5.1", "6.0", "7.0", "8.0", "9.0", "10.0", "11.0"],
      deviceModels = ["M2004J19C", "S2020X3", "Xiaomi4S", "RedmiNote9", "SamsungS21", "GooglePixel5"],
      buildVersions = ["RP1A.200720.011", "RP1A.210505.003", "RP1A.210812.016", "QKQ1.200114.002", "RQ2A.210505.003"],
      selectedModel = deviceModels[Math.floor(Math.random() * deviceModels.length)],
      selectedBuild = buildVersions[Math.floor(Math.random() * buildVersions.length)],
      chromeVersion = `Chrome/${Math.floor(80 * Math.random()) + 1}.${Math.floor(999 * Math.random()) + 1}.${Math.floor(9999 * Math.random()) + 1}`;
    return `Mozilla/5.0 (Linux; Android ${androidVersions[Math.floor(Math.random() * androidVersions.length)]}; ${selectedModel} Build/${selectedBuild}) AppleWebKit/537.36 (KHTML, like Gecko) ${chromeVersion} Mobile Safari/537.36 WhatsApp/1.${Math.floor(9 * Math.random()) + 1}.${Math.floor(9 * Math.random()) + 1}`;
  },
  gptWordle = async prompt => {
    try {
      const data = {
          user: crypto.randomBytes(8).toString("hex"),
          messages: [{
            role: "user",
            content: prompt
          }, {
            role: "assistant",
            content: "Kamu adalah asisten AI yang siap membantu segala hal!"
          }],
          subscriber: {
            originalAppUserId: `$RCAnonymousID:${crypto.randomBytes(16).toString("hex")}`,
            requestDate: new Date().toISOString(),
            firstSeen: new Date().toISOString()
          }
        },
        response = await fetch("https://wewordle.org/gptapi/v1/web/turbo", {
          method: "POST",
          headers: {
            accept: "*/*",
            pragma: "no-cache",
            "Content-Type": "application/json",
            Connection: "keep-alive",
            "user-agent": generateRandomUserAgent(),
            "x-forwarded-for": generateRandomIP()
          },
          body: JSON.stringify(data)
        });
      return await response.json();
    } catch (error) {
      throw console.error("Error fetching data:", error), error;
    }
  };