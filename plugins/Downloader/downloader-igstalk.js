import fetch from "node-fetch";
import axios from "axios";
import cheerio from "cheerio";
const handler = async (m, {
  conn,
  args,
  usedPrefix,
  command
}) => {
  if (!args[0]) throw `Example use ${usedPrefix}${command} username`;
  let res = await igstalk(args[0]),
    username = res.username,
    fullname = res.fullname,
    post = res.post,
    followe = res.followers,
    followi = res.following,
    bio = res.bio,
    data = (res.profile, `\n💌 ᴜsᴇʀɴᴀᴍᴇ » 「 ${username} 」\n📧 ғᴜʟʟɴᴀᴍᴇ » 「 ${fullname} 」\n🎏 ${followe}  ғᴏʟʟᴏᴡᴇʀs\n🎀 ${followi}  ғᴏʟʟᴏᴡɪɴɢ\n📝 ᴘᴏsᴛ ${post} \n📑 Bɪᴏ: ${bio}\n`.trim());
  await conn.reply(m.chat, data, m);
};
handler.help = ["igstalk"].map(v => v + " <username>"), handler.tags = ["misc"],
  handler.command = /^(igstalk)$/i;
export default handler;
async function igstalk(Username) {
  return new Promise((resolve, reject) => {
    axios.get("https://dumpor.com/v/" + Username, {
      headers: {
        cookie: "_inst_key=SFMyNTY.g3QAAAABbQAAAAtfY3NyZl90b2tlbm0AAAAYWGhnNS1uWVNLUU81V1lzQ01MTVY2R0h1.fI2xB2dYYxmWqn7kyCKIn1baWw3b-f7QvGDfDK2WXr8",
        "user-agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36"
      }
    }).then(res => {
      const $ = cheerio.load(res.data),
        result = {
          profile: $("#user-page > div.user > div.row > div > div.user__img").attr("style").replace(/(background-image: url\(\'|\'\);)/gi, ""),
          fullname: $("#user-page > div.user > div > div.col-md-4.col-8.my-3 > div > a > h1").text(),
          username: $("#user-page > div.user > div > div.col-md-4.col-8.my-3 > div > h4").text(),
          post: $("#user-page > div.user > div > div.col-md-4.col-8.my-3 > ul > li:nth-child(1)").text().replace(" Posts", ""),
          followers: $("#user-page > div.user > div > div.col-md-4.col-8.my-3 > ul > li:nth-child(2)").text().replace(" Followers", ""),
          following: $("#user-page > div.user > div > div.col-md-4.col-8.my-3 > ul > li:nth-child(3)").text().replace(" Following", ""),
          bio: $("#user-page > div.user > div > div.col-md-5.my-3 > div").text()
        };
      resolve(result);
    });
  });
}