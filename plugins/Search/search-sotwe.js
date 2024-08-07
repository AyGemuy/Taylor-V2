import {
  fetch
} from "undici";
const handler = async (m, {
  conn,
  usedPrefix,
  args,
  command
}) => {
  const text = args[0] || m.quoted && m.quoted?.text || "",
    [usernya, medianya] = text.split("|");
  if (!usernya) return m.reply("Tidak ada input");
  try {
    const pluginsList = await getData(usernya);
    if (!medianya) {
      const pluginList = pluginsList.map((category, index) => `${index + 1}. *${category.text}*`).join("\n");
      return m.reply(`*List Kategori:*\n${pluginList}`);
    }
    if (!isNaN(medianya) && medianya > 0 && medianya <= pluginsList.length) {
      const mediaEntities = pluginsList[medianya - 1].mediaEntities;
      if (!mediaEntities || 0 === mediaEntities.length) return m.reply("Tidak ada media ditemukan.");
      let message = "";
      return mediaEntities.some(media => "video" !== media.type) && (message += "📷 Image\n", mediaEntities.filter(media => "video" !== media.type).forEach(media => message += `🔗 ${media.mediaURL}\n`)),
        mediaEntities.some(media => "video" === media.type) && (message += "📹 Video\n", mediaEntities.filter(media => "video" === media.type).forEach(media => message += `🔗 ${media.mediaURL}\n`)),
        m.reply(message);
    }
    return m.reply("Angka di luar rentang yang sesuai.");
  } catch (e) {
    return m.reply(e);
  }
};
handler.help = ["sotwe"].map(v => v + " *index*"), handler.tags = ["owner"],
  handler.command = /^(sotwe)$/i, handler.rowner = !0;
export default handler;
async function getData(user) {
  try {
    const check = await fetch("https://api.sotwe.com/v3/user/" + user);
    return (await check.json()).data;
  } catch (error) {
    return console.error(error), "nothing";
  }
}