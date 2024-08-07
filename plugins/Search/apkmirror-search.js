import fetch from "node-fetch";
import cheerio from "cheerio";
const handler = async (m, {
  conn,
  args,
  text
}) => {
  try {
    if (!text) {
      m.reply("Masukkan query untuk mencari di ApkMirror?");
      return;
    }
    const resultList = await SearchApk(text);
    const list = resultList.map((item, index) => `*Title:* ${item.titles}\n*Url:* ${item.value}`).join("\n\n");
    const tops = `*📺 Apk Search 🔎*`;
    m.reply(`${tops}\n${list}`);
  } catch (e) {
    console.error("Error:", e);
    m.reply("Terjadi kesalahan saat mencari APK di ApkMirror.");
  }
};
handler.help = ["apkms <query>"];
handler.tags = ["internet"];
handler.command = /^(apkms)$/i;
export default handler;
async function SearchApk(query) {
  const result = [];
  try {
    const response = await fetch(`https://www.apkmirror.com/?s=${query}`);
    const data = await response.text();
    const $ = cheerio.load(data);
    $(".appRow").each((index, element) => {
      const link = $(element).find("a").attr("href");
      const titles = $(element).find("a").text();
      if (link.startsWith("/apk")) {
        result.push({
          titles: titles.split("\n")[0],
          value: `https://www.apkmirror.com${link.split("#")[0]}`
        });
      }
    });
  } catch (error) {
    console.error("Error fetching APK data:", error);
    throw new Error("Terjadi kesalahan saat mengambil data dari ApkMirror.");
  }
  return result;
}