import axios from "axios";
import cheerio from "cheerio";
import fs from "fs";
const handler = async (m, {
  conn,
  text
}) => {
  try {
    if (!text) throw "Input username!";
    m.react(wait);
    let res = await twitterStalk(text),
      img = res?.pp_user;
    delete res.pp_user;
    let txt = Object.keys(res).map(v => `*${v.capitalize()}:* ${res[v]}`).join`\n`;
    await conn.sendFile(m.chat, img, "", txt, m, null, {
      contextInfo: {
        mimetype: "audio/mp4",
        externalAdReply: {
          showAdAttribution: !0,
          mediaUrl: sig,
          mediaType: 1,
          description: wm,
          title: wm,
          body: botdate,
          thumbnail: fs.readFileSync("./src/thumb.jpg"),
          sourceUrl: sgc
        }
      }
    });
  } catch (error) {
    console.error("Error:", error.message), m.reply(`Error: ${error.message}`);
  }
};
handler.help = ["twitterstalk"], handler.tags = ["downloader"], handler.command = /^(twitter|twt)stalk$/i,
  handler.premium = !0;
export default handler;
async function twitterStalk(user) {
  try {
    const res = await axios.get(`https://www.twuko.com/${user}/`),
      $ = cheerio.load(res.data);
    return {
      pp_user: $("div.relative.w-full.h-full.rounded-full.cursor-pointer.profile-image > img").text().trim() ?? null,
      name: $("div.p-3 > p.text-center.text-primary").text().trim(),
      username: $("div.p-3 > div > span.font-bold.text-center").text().trim(),
      followers: $("div.mb-4.text-4xl.font-bold.text-center").text().trim(),
      description: $("div.p-3.border-t.border-gray-200 > p").text().trim().replace(/\n/g, ""),
      ...Object.fromEntries($("div.flex.justify-center > div.px-4").map((idx, el) => [$(el).find("div.text-xs.font-bold.text-center.text-gray-600.uppercase").text().toLowerCase(), $(el).find("div.text-xl.font-bold.text-center").text()]))
    };
  } catch (error) {
    throw console.error("Error in twitterStalk:", error.message), error;
  }
}