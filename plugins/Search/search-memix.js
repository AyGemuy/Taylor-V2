import fetch from "node-fetch";
const handler = async (m, {
  command,
  usedPrefix,
  conn,
  text
}) => {
  let [theme, number, message] = text.split(/[^\w\s]/g);
  if (!theme || !number || isNaN(number) || !message) {
    return m.reply(`Input yang benar dibutuhkan!\n*Contoh:*\n${usedPrefix}${command} [tema]|[angka]|[teks]`);
  }
  m.react(wait);
  try {
    let data = await getTemplateImageUrl(theme, Number(number), message);
    if (data.url.startsWith("https://cdn.memix.com")) {
      await conn.sendMessage(m.chat, {
        sticker: {
          url: data.url
        },
        thumbnail: await (await conn.getFile(data.url)).data,
        contextInfo: {
          externalAdReply: {
            showAdAttribution: true,
            mediaType: 1,
            mediaUrl: null,
            title: data.name.split("-").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" "),
            body: m.sender,
            sourceUrl: null,
            thumbnail: await (await conn.getFile(data.url)).data
          }
        }
      }, {
        quoted: m
      });
    } else {
      m.reply(`Input yang benar dibutuhkan!\n*Contoh:*\n${usedPrefix}${command} [tema]|[angka]|[teks]\n\n*Pilih angka yang ada:*\n${data}`);
    }
  } catch (error) {
    m.react(eror);
  }
};
handler.help = ["memix *[tema]|[angka]|[teks]*"];
handler.tags = ["internet"];
handler.command = /^(memix)$/i;
export default handler;
async function getTemplateImageUrl(input, number, text) {
  try {
    const response = await fetch(`https://api.memix.com/v1/templates/search?q=${encodeURIComponent(input)}`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    if (number > data.templates.length) {
      return data.templates.map((item, index) => `*${index + 1}.* ${item.id}`).join("\n");
    } else {
      const selectedId = data.templates[number - 1].id;
      return {
        url: `https://cdn.memix.com/memix-${selectedId}.webp?text=${encodeURIComponent(text)}`,
        name: selectedId
      };
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    return "Error fetching data.";
  }
}