import cheerio from "cheerio";
import axios from "axios";
const handler = async (m, {
  conn,
  args,
  usedPrefix,
  text,
  command
}) => {
  const inputArray = ["kolom", "lainnya/analisis", "lainnya/diplomatic-corner", "lainnya/editorial", "lainnya/infografis", "lainnya/investigasi", "lainnya/liyan-pojok", "lainnya/oase", "lainnya/obituary", "lainnya/opini", "lainnya/religi", "lainnya/serba-serbi", "lainnya/wawancara", "lifestyle", "news", "tech"];
  let [query] = text.split(" ");
  const result = inputArray.includes(query) ? query : inputArray.filter(item => item.startsWith("lainnya/") && query === item.split("/").pop()).map(item => item)[0] || null;
  if (!result) return m.reply("*Example:*\n.dailynews lifestyle\n\n*Pilih type yg ada*\n" + inputArray.map((v, index) => "  ○ " + v.split("/").pop()).join("\n"));
  m.react(wait);
  try {
    let teks = (await fetchArticleData(result)).map((item, index) => `🔍 *[ RESULT ${index + 1} ]*\n  \n📚 Title: ${item.title}\n🔗 Link: ${item.link}\n📅 Date: ${item.date}\n💬 Comment Count: ${item.commentCount}\n📝 Excerpt: ${item.excerpt}\n`).filter(v => v).join("\n\n________________________\n\n");
    m.reply(teks);
  } catch (e) {
    m.react(eror);
  }
};
handler.help = ["dailynews"], handler.tags = ["internet"], handler.command = /^(dailynews)$/i;
export default handler;
async function fetchArticleData(query) {
  const url = "https://www.dailynewsindonesia.com/rubrik/" + query;
  try {
    const response = await axios.get(url),
      $ = cheerio.load(response.data);
    return $("div.jeg_postblock_content").map((index, element) => ({
      title: $(element).find("h3.jeg_post_title a").text(),
      link: $(element).find("h3.jeg_post_title a").attr("href"),
      date: $(element).find(".jeg_meta_date a").text(),
      commentCount: $(element).find(".jeg_meta_comment a").text(),
      excerpt: $(element).find("div.jeg_post_excerpt p").text()
    })).get().filter(article => Object.values(article).every(value => value));
  } catch (error) {
    throw error;
  }
}