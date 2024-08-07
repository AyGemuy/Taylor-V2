import cheerio from "cheerio";
import fetch from "node-fetch";
const handler = async (m, {
  conn,
  args,
  usedPrefix,
  text,
  command
}) => {
  try {
    if (!text) throw "Input username";
    text = text.replace(/@/, "");
    let res = await fetchUser(text);
    if (!res) throw "User not found";
    let img = res.profileImage;
    delete res.profileImage;
    let txt = Object.keys(res).map(v => `*${v.capitalize()}:* ${res[v] ?? ""}`).join`\n`;
    conn.sendMessage(m.chat, {
      image: {
        url: img
      },
      caption: txt
    }, {
      quoted: m
    });
  } catch (error) {
    conn.sendMessage(m.chat, error, {
      quoted: m
    });
  }
};
handler.command = /^t(tstalk|iktokstalk)$/i;
export default handler;
async function fetchUser(q) {
  const url = "https://www.tiktokstalk.com/user/" + q,
    response = await fetch(url);
  if (!response.ok) throw "Failed to fetch user data";
  const html = await response.text(),
    $ = cheerio.load(html),
    formattedNumber = numStr => {
      const num = parseInt(numStr.replace(/[^\d]/g, ""), 10);
      return isNaN(num) ? "NaN" : num.toLocaleString();
    };
  return {
    profileImage: $(".user-info figure img").attr("src"),
    username: $(".user-info .title h1").text().trim(),
    fullName: $(".user-info .title h2").text().trim(),
    bio: $(".user-info .description p").text().trim(),
    likes: formattedNumber($(".number-box .count:eq(0)").text()),
    followers: formattedNumber($(".number-box .count:eq(1)").text()),
    following: formattedNumber($(".number-box .count:eq(2)").text())
  };
}