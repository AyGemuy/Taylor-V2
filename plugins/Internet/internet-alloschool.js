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
  if (m.react(wait), "alloschoolget" === command) try {
    let res = await getAlloschool(text);
    await conn.sendFile(m.chat, res[0]?.url, res[0]?.title, "", m, !1, {
      asDocument: !0
    });
  } catch (e) {
    m.react(eror);
  } else try {
    let teks = (await searchAlloschool(text)).map(v => `*[ ${v.index} ]*\n🔖 *Title* : ${v.title}\n🔗 *Link* : ${v.url}\n   `.trim()).filter(v => v).join("\n\n________________________\n\n");
    m.reply(teks);
  } catch (e) {
    m.react(eror);
  }
};
handler.help = ["alloschool"], handler.tags = ["internet"], handler.command = /^alloschool|alloschoolget$/i;
export default handler;
async function searchAlloschool(query) {
  try {
    const response = await got("https://www.alloschool.com/search?q=" + query),
      $ = cheerio.load(response.body),
      elements = $("ul.list-unstyled li");
    return elements.map((i, el) => {
      const title = $("a", el).text().trim(),
        url = $("a", el).attr("href");
      if (/^https?:\/\/www\.alloschool\.com\/element\/\d+$/.test(url)) return {
        index: i + 1,
        title: title,
        url: url
      };
    }).get().filter(item => item);
  } catch (error) {
    console.log(error);
  }
}
async function getAlloschool(url) {
  try {
    const pdfRegex = /\.pdf$/i,
      response = await got(url),
      $ = cheerio.load(response.body),
      results = [];
    return $("a").each((i, link) => {
      const href = $(link).attr("href"),
        title = $(link).text();
      pdfRegex.test(href) && results.push({
        index: i + 1,
        title: title,
        url: href
      });
    }), results;
  } catch (error) {
    console.log(error);
  }
}