import fetch from "node-fetch";
const handler = async (m, {
  command,
  usedPrefix,
  conn,
  text,
  args
}) => {
  let [tema, urutan] = text.split(/[^\w\s]/g);
  if (!tema) return m.reply("Input query!\n*Example:*\n.giphy [tema]|[angka]");
  if (!urutan) return m.reply("Input angka!\n*Example:*\n.giphy [tema]|[angka]");
  if (isNaN(urutan)) return m.reply("Input angka saja!\n*Example:*\n.giphy [tema]|[angka]");
  m.react(wait);
  try {
    let json = await getTemplateImageUrl(tema, urutan),
      data = json.one,
      all = json.all;
    if (urutan > all.length) return m.reply("Input query!\n*Example:*\n.giphy [tema]|[angka]\n\n*Pilih angka yg ada*\n" + all.map((item, index) => `*${index + 1}.* ${item.title}`).join("\n"));
    if (isValidURL(data.images.original.mp4)) {
      let caption = `🔍 *[ HASIL ]*\n\n📌 *Tipe:* ${data.type}\n🆔 *ID:* ${data.id}\n🌐 *URL:* ${data.url}\n🔗 *Bitly URL:* ${data.bitly_url}\n👤 *Username:* ${data.username}\n📰 *Judul:* ${data.title}`;
      await conn.sendMessage(m.chat, {
        video: {
          url: data.images.original.mp4
        },
        caption: caption,
        gifPlayback: !0,
        gifAttribution: 1
      }, {
        quoted: m
      });
    }
  } catch (e) {
    m.react(eror);
  }
};
handler.help = ["giphy *[tema]|[angka]*"], handler.tags = ["sticker"], handler.command = /^(giphy)$/i;
export default handler;

function isValidURL(message) {
  return /https?:\/\/[^\s/$.?#].[^\s]*/.test(message);
}
async function getTemplateImageUrl(input, number) {
  try {
    const data = await (await fetch(`https://api.giphy.com/v1/gifs/search?q=${input}&api_key=SdX60eTdyvdo0aAyJMQ5u87Qh7mTz7bG`)).json();
    return {
      one: data.data[number - 1],
      all: data.data
    };
  } catch (error) {
    return console.error("Error fetching data:", error), "Error fetching data.";
  }
}