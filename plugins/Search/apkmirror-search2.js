import fetch from "node-fetch";
import cheerio from "cheerio";
const handler = async (m, {
  conn,
  args,
  text
}) => {
  m.react(wait);
  if (!/\-release\//.test(text)) {
    return m.reply("Masukkan link ApkMirror yang berakhiran *release* ?");
  }
  try {
    const resultList = await SearchApk(text);
    const list = resultList.map((item, index) => `*Url:* ${item.url}`).join("\n\n");
    const tops = `*📺 Apk Search 🔎*`;
    m.reply(`${tops}\n${list}`);
  } catch (e) {
    console.error("Error:", e);
    m.react(eror);
  }
};
handler.help = ["apkms2 <query>"];
handler.tags = ["nsfw"];
handler.command = /^(apkms2)$/i;
export default handler;
async function SearchApk(query) {
  try {
    const response = await fetch(query);
    const html = await response.text();
    const $ = cheerio.load(html);
    const links = [];
    $('a[href$="download/"]').each((i, link) => {
      const title = $(link).text();
      const url = "https://www.apkmirror.com" + $(link).attr("href");
      links.push({
        title: title,
        url: url
      });
    });
    return links;
  } catch (error) {
    console.error("Error fetching APK links:", error);
    throw new Error("Terjadi kesalahan saat mencari link APK di ApkMirror.");
  }
}