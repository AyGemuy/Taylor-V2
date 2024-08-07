import fetch from "node-fetch";
const pagePre = 40,
  apiUrl = "https://www.seaart.ai/api/v1/artwork/list",
  fetchData = async requestData => {
    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(requestData)
      });
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
      const {
        data
      } = await response.json(), items = data.items;
      if (!items || !Array.isArray(items) || 0 === items.length) throw new Error("No items found.");
      return items[Math.floor(Math.random() * items.length)];
    } catch (error) {
      throw console.error("Error fetching data:", error), error;
    }
  }, handler = async (m, {
    conn,
    args,
    usedPrefix,
    command
  }) => {
    const text = args.length >= 1 ? args.slice(0).join(" ") : m.quoted && m.quoted?.text || m.quoted?.caption || m.quoted?.description || null;
    if (!text) return m.reply(`Masukkan teks atau reply pesan dengan teks yang ingin diolah.\nContoh penggunaan:\n*${usedPrefix}${command} Hai, apa kabar?*`);
    m.react(wait);
    const requestData = {
      page: 1,
      page_size: 40,
      order_by: "new",
      type: "community",
      keyword: text,
      tags: []
    };
    try {
      const result = await fetchData(requestData);
      await conn.sendMessage(m.chat, {
        image: {
          url: result.banner.url
        },
        caption: `Prompt: ${result.prompt}\nModel id: ${result.model_id}\nAuthor: ${result.author.name}`,
        mentions: [m.sender]
      }, {
        quoted: m
      });
    } catch (error) {
      console.error("Error in example usage:", error), m.react(eror);
    }
  };
handler.help = ["seaart"], handler.tags = ["ai"], handler.command = /^(seaart)$/i;
export default handler;