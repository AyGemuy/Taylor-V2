import cheerio from "cheerio";
import fetch from "node-fetch";
const handler = async (m, {
  conn,
  args,
  usedPrefix,
  text,
  command
}) => {
  if (m.react(wait), !text) return m.reply("input number");
  if ("1" === text) try {
    let resl = await animeVideo(),
      cap = `📝 *Title:* ${resl.title}`;
    await conn.sendFile(m.chat, resl.source, "", cap, m);
  } catch (e) {
    m.react(eror);
  }
  if ("2" === text) try {
    let resl = await animeVideo2(),
      cap = `📝 *Title:* ${resl.title}`;
    await conn.sendFile(m.chat, resl.source, "", cap, m);
  } catch (e) {
    m.react(eror);
  }
};
handler.help = ["animevideo"], handler.tags = ["internet"], handler.command = /^(animevideo)$/i;
export default handler;
async function animeVideo() {
  const response = await fetch("https://shortstatusvideos.com/anime-video-status-download/"),
    html = await response.text(),
    $ = cheerio.load(html),
    videos = [];
  $("a.mks_button.mks_button_small.squared").each((index, element) => {
    const href = $(element).attr("href"),
      title = $(element).closest("p").prevAll("p").find("strong").text();
    videos.push({
      title: title,
      source: href
    });
  });
  const randomIndex = Math.floor(Math.random() * videos.length);
  return videos[randomIndex];
}
async function animeVideo2() {
  const response = await fetch("https://mobstatus.com/anime-whatsapp-status-video/"),
    html = await response.text(),
    $ = cheerio.load(html),
    videos = [],
    title = $("strong").text();
  $("a.mb-button.mb-style-glass.mb-size-tiny.mb-corners-pill.mb-text-style-heavy").each((index, element) => {
    const href = $(element).attr("href");
    videos.push({
      title: title,
      source: href
    });
  });
  const randomIndex = Math.floor(Math.random() * videos.length);
  return videos[randomIndex];
}