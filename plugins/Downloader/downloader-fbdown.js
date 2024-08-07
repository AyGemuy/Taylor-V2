import cheerio from "cheerio";
import fetch from "node-fetch";
const handler = async (m, {
  conn,
  args,
  usedPrefix,
  command
}) => {
  const msg = `Input link atau reply link yang ingin di download!\n\n*Contoh:*\n${usedPrefix + command} link`;
  let text;
  if (args.length >= 1) text = args.slice(0).join(" ");
  else {
    if (!m.quoted || !m.quoted?.text) throw msg;
    text = m.quoted?.text;
  }
  m.react(wait);
  try {
    const data = await fbdown(text),
      dlLink = [data.sdLink, data.hdLink];
    for (let i = 0; i < dlLink.length; i++) await conn.sendFile(m.chat, dlLink[i], "", `Video *(${i + 1}/${dlLink.length})*\n\nTitle: ${data.title}\n${data.description}\n`, m, !1, {
      mentions: [m.sender]
    });
  } catch (error) {
    m.react(eror);
  }
};
handler.help = ["fbdown *[link]*"], handler.tags = ["downloader"], handler.command = /^(fbdown)$/i;
export default handler;
async function fbdown(url) {
  try {
    const postOptions = {
        method: "POST",
        body: new URLSearchParams({
          URLz: url
        })
      },
      response = await fetch("https://fdown.net/download.php", postOptions),
      html = await response.text(),
      $ = cheerio.load(html);
    return {
      title: $(".lib-row.lib-header").text().trim(),
      description: $(".lib-row.lib-desc").text().trim(),
      sdLink: $("#sdlink").attr("href"),
      hdLink: $("#hdlink").attr("href")
    };
  } catch (error) {
    return console.error("Error:", error.message), null;
  }
}