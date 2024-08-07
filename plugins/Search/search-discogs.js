import fetch from "node-fetch";
const handler = async (m, {
  command,
  usedPrefix,
  conn,
  text,
  args
}) => {
  let ends = ["search", "videos"],
    [modes, kodes] = text.split(/[^\w\s]/g);
  if (!ends.includes(modes)) return m.reply("*Example:*\n.discogs sfw|wave\n\n*Pilih type yg ada*\n" + ends.map((v, index) => "  ○ " + v).join("\n"));
  if (ends.includes(modes)) {
    if ("search" === modes) {
      if (!kodes) return m.reply("Input query!");
      m.react(wait);
      let data = await (await fetch("https://api.discogs.com/database/search?q=" + kodes + "&token=QBRmstCkwXEvCjTclCpumbtNwvVkEzGAdELXyRyW")).json(),
        list = data.results.map((item, index) => `*${++index}.* *Title:* ${item.title}\n*ID:* ${item.id}\n*Link:* ${item.resource_url}`).join("\n\n");
      await conn.sendFile(m.chat, data.results[0]?.cover_image, "", `*${htki} 📺 Discogs Search 🔎 ${htka}*\n\n${list}`, m);
    }
    if ("videos" === modes) {
      if (!kodes) return m.reply("Input ID!");
      m.react(wait);
      let list = (await (await fetch("https://api.discogs.com/masters/" + kodes)).json()).videos.map((item, index) => `*${++index}.* *Title:* ${item.title}\n*Duration:* ${item.duration}\n*Link:* ${item.uri}\n*Description:* ${item.description}`).join("\n\n");
      await conn.reply(m.chat, `*${htki} 📺 Discogs Search 🔎 ${htka}*\n\n${list}`, m);
    }
  }
};
handler.help = ["discogs type query"], handler.tags = ["internet"], handler.command = /^(discogs)$/i;
export default handler;