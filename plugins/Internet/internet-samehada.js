import got from "got";
import cheerio from "cheerio";
import fetch from "node-fetch";
const handler = async (m, {
  conn,
  args,
  usedPrefix,
  command
}) => {
  let text;
  if (args.length >= 1) text = args.slice(0).join(" ");
  else {
    if (!m.quoted || !m.quoted?.text) throw "Input Teks";
    text = m.quoted?.text;
  }
  if (m.react(wait), "samehadaurl" === command) {
    let res = await getPlayUrl(text),
      cap = `🔗 *Short* : ${await shortUrl(res[0]?.src)}\n🔗 *Full* : ${res[0]?.src}\n`;
    await conn.reply(m.chat, cap, m);
  } else try {
    let teks = (await getLinks("https://samehada.care/?s=" + text + "&post_type%5B%5D=post&post_type%5B%5D=tv")).map((v, index) => `*[ ${index + 1} ]*\n🔖 *Title* : ${v.title}\n🔗 *Link* : ${v.url}\n   `.trim()).filter(v => v).join("\n\n________________________\n\n");
    m.reply(teks);
  } catch (e) {
    m.react(eror);
  }
};
handler.help = ["samehada"], handler.tags = ["internet"], handler.command = /^samehada|samehadaurl$/i;
export default handler;
async function getLinks(url) {
  const response = await got(url),
    $ = cheerio.load(response.body),
    links = [];
  return $("a.button.gmr-watch-button").each(function() {
    const link = {
      title: $(this).attr("title"),
      url: $(this).attr("href"),
      text: $(this).text().trim()
    };
    links.push(link);
  }), links;
}
async function getPlayUrl(url) {
  const response = await got(url),
    $ = cheerio.load(response.body),
    iframes = [];
  return $("iframe").each(function() {
    const src = $(this).attr("src"),
      iframe = {
        src: src,
        frameborder: $(this).attr("frameborder")
      };
    src && !src.includes("a-ads") && iframes.push(iframe);
  }), iframes;
}
async function shortUrl(url) {
  return await (await fetch(`https://tinyurl.com/api-create.php?url=${url}`)).text();
}