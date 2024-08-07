import fetch from "node-fetch";
const {
  ttp,
  raterian,
  attp
} = await import("../../lib/maker/text2picture.js");
const handler = async (m, {
  conn,
  args,
  usedPrefix,
  command
}) => {
  try {
    m.react(wait);
    let text = args.length >= 1 ? args.slice(0).join(" ") : m.quoted && m.quoted?.text || m.quoted?.caption || m.quoted?.description || null;
    if (!text) return m.reply(`Input query text!\n*Example:*\n- *${usedPrefix + command}* hello`);
    const apiEndpoint = "https://api.lolhuman.xyz/api";
    const apiKey = Object.entries(APIKeys).find(([key]) => key.includes("lolhuman"))?.[1];
    const commandMap = {
      ttp: async () => {
        const apiUrl = `${apiEndpoint}/ttp?apikey=${apiKey}&text=${encodeURIComponent(text.substring(0, 151))}`;
        const attpRes = await fetch(apiUrl);
        return attpRes.arrayBuffer();
      },
      ttp2: async () => {
        const apiUrl = `${apiEndpoint}/ttp2?apikey=${apiKey}&text=${encodeURIComponent(text.substring(0, 151))}`;
        const attpRes = await fetch(apiUrl);
        return attpRes.arrayBuffer();
      },
      ttp3: async () => {
        const apiUrl = `${apiEndpoint}/ttp3?apikey=${apiKey}&text=${encodeURIComponent(text.substring(0, 151))}`;
        const attpRes = await fetch(apiUrl);
        return attpRes.arrayBuffer();
      },
      ttp4: async () => {
        const apiUrl = `${apiEndpoint}/ttp4?apikey=${apiKey}&text=${encodeURIComponent(text.substring(0, 151))}`;
        const attpRes = await fetch(apiUrl);
        return attpRes.arrayBuffer();
      },
      ttp5: async () => {
        const apiUrl = `${apiEndpoint}/ttp5?apikey=${apiKey}&text=${encodeURIComponent(text.substring(0, 151))}`;
        const attpRes = await fetch(apiUrl);
        return attpRes.arrayBuffer();
      },
      ttp6: async () => {
        const apiUrl = `${apiEndpoint}/ttp6?apikey=${apiKey}&text=${encodeURIComponent(text.substring(0, 151))}`;
        const attpRes = await fetch(apiUrl);
        return attpRes.arrayBuffer();
      },
      ttp7: async () => {
        const response = await ttp(text);
        if (Array.isArray(response) && response.length > 0 && response[0]?.url) {
          return await fetch("https://wsrv.nl/?url=" + response[0]?.url + "&output=webp").then(res => res.arrayBuffer());
        } else {
          throw "Invalid response from ttp7";
        }
      },
      ttp8: async () => {
        const response = await raterian(text);
        return await fetch("https://wsrv.nl/?url=" + response + "&output=webp").then(res => res.arrayBuffer());
      },
      attp: async () => {
        const apiUrl = `${apiEndpoint}/attp?apikey=${apiKey}&text=${encodeURIComponent(text)}`;
        const attpRes = await fetch(apiUrl);
        return attpRes.arrayBuffer();
      },
      attp2: async () => {
        const apiUrl = `${apiEndpoint}/attp2?apikey=${apiKey}&text=${encodeURIComponent(text)}`;
        const attpRes = await fetch(apiUrl);
        return attpRes.arrayBuffer();
      },
      attp3: async () => {
        const response = await attp(text);
        if (Array.isArray(response) && response.length > 0 && response[0]?.url) {
          return await fetch("https://wsrv.nl/?url=" + response[0]?.url + "&output=webp").then(res => res.arrayBuffer());
        } else {
          throw "Invalid response from attp3";
        }
      }
    };
    const commandFunction = commandMap[command];
    if (!commandFunction) {
      throw "Invalid command";
    }
    const data = await commandFunction();
    await conn.sendFile(m.chat, data, "atet.webp", "", m);
  } catch (error) {
    console.error(error);
    m.react(eror);
  }
};
handler.help = ["ttp", "ttp2 -> ttp8", "attp", "attp2 -> attp3"];
handler.tags = ["sticker"];
handler.command = /^(ttp[2-8]?|attp[2-3]?)$/i;
handler.limit = true;
export default handler;