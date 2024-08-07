import fetch from "node-fetch";
const handler = async (m, {
  command,
  usedPrefix,
  conn,
  text,
  args
}) => {
  let [tema, urutan] = text.split(/[^\w\s]/g);
  if (!tema) return m.reply("Input query!\n*Example:*\n.tenor [tema]|[angka]");
  if (!urutan) return m.reply("Input angka!\n*Example:*\n.tenor [tema]|[angka]");
  if (isNaN(urutan)) return m.reply("Input angka saja!\n*Example:*\n.tenor [tema]|[angka]");
  m.react(wait);
  try {
    let json = await getTemplateImageUrl(tema, urutan),
      data = json.one,
      all = json.all;
    if (urutan > all.length) return m.reply("Input query!\n*Example:*\n.tenor [tema]|[angka]\n\n*Pilih angka yg ada*\n" + all.map((item, index) => `*${index + 1}.* ${item.content_description}`).join("\n"));
    if (isValidURL(data.media[0]?.mp4.url)) {
      let caption = `🔍 *[ HASIL ]*\n\n🆔 *ID:* ${data.id}\n🌐 *URL:* ${data.url}\n📋 *Description:* ${data.content_description}\n📌 *Item:* ${data.itemurl}`;
      await conn.sendMessage(m.chat, {
        video: {
          url: data.media[0]?.mp4.url
        },
        caption: caption,
        gifPlayback: !0,
        gifAttribution: 2
      }, {
        quoted: m
      });
    }
  } catch (e) {
    m.react(eror);
  }
};
handler.help = ["tenor *[tema]|[angka]*"], handler.tags = ["sticker"], handler.command = /^(tenor)$/i;
export default handler;

function isValidURL(message) {
  return /https?:\/\/[^\s/$.?#].[^\s]*/.test(message);
}
async function getTemplateImageUrl(input, number) {
  try {
    const data = await (await fetch(`https://g.tenor.com/v1/search?q=${input}&key=LIVDSRZULELA`)).json();
    return {
      one: data.results[number - 1],
      all: data.results
    };
  } catch (error) {
    return console.error("Error fetching data:", error), "Error fetching data.";
  }
}