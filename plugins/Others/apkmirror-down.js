import fetch from "node-fetch";
import cheerio from "cheerio";
const handler = async (m, {
  conn,
  args,
  text
}) => {
  if (!/\-download\//.test(text)) return m.reply("input link apkmirror\nakhiran *download* ?");
  try {
    let res = await DownApk(text),
      res2 = await DownApk(res[0]?.url),
      names = text.split("/")[5].split("-").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
    m.react(wait), await conn.sendFile(m.chat, res2[0]?.url, names, null, m, !0, {
      quoted: m,
      mimetype: "application/vnd.android.package-archive"
    });
  } catch (e) {
    m.react(eror);
  }
};
handler.help = ["apkmdown <query>"], handler.tags = ["nsfw"], handler.command = /^(apkmdown)$/i;
export default handler;
async function DownApk(query) {
  return await fetch(query).then(res => res.text()).then(html => {
    const $ = cheerio.load(html),
      links = [];
    return $('a[href*="key="]').each((i, link) => {
      const title = $(link).text().replace(/\n/g, ""),
        url = $(link).attr("href");
      links.push({
        title: title,
        url: "https://www.apkmirror.com" + url
      });
    }), links;
  });
}