import axios from "axios";
import cheerio from "cheerio";
const handler = async (m, {
  conn,
  args
}) => {
  try {
    if (!args[0]) throw new Error("Input URL");
    if (!/danbooru\.donmai\.us\/posts\/[0-9]+$/i.test(args[0])) throw new Error("Invalid URL");
    m.react(wait);
    let data = await danbooruDl(args[0]);
    let img = data.url;
    delete data.url;
    let capt = Object.keys(data).map(x => `${x}: ${data[x]}`).join("\n");
    await conn.sendFile(m.chat, img, "", capt, m);
  } catch (err) {
    console.error(err);
    m.reply(err.message);
  }
};
handler.tags = ["downloader"];
handler.command = /^danbooru$/i;
handler.help = ["Danbooru"];
export default handler;
async function danbooruDl(url) {
  try {
    let html = (await axios.get(url)).data;
    let $ = cheerio.load(html);
    let obj = {};
    $("#post-information > ul > li").each((idx, el) => {
      let str = $(el).text().trim().replace(/\n/g, "").split(": ");
      obj[str[0]] = str[1].replace("»", "").trim().split(" .")[0];
    });
    obj.url = $("#post-information > ul > li[id='post-info-size'] > a").attr("href");
    return obj;
  } catch (err) {
    console.error(err);
    throw new Error("Failed to download from Danbooru");
  }
}