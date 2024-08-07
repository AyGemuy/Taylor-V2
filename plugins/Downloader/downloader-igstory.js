import cheerio from "cheerio";
import fetch from "node-fetch";
import axios from "axios";
const handler = async (m, {
  conn,
  args,
  usedPrefix,
  command
}) => {
  if (!args[0]) throw `uhm.. username nya mana?\n\ncontoh:\n\n${usedPrefix + command} rasel.ganz`;
  if (args[0]?.startsWith("http") || args[0]?.startsWith("@")) throw `username salah\n\ncontoh: *${usedPrefix}${command} the.sad.boy01*`;
  try {
    const res = await fetch(`https://hardianto.xyz/api/download/igstory?username=${args[0]}&apikey=hardianto`);
    var anuku = (await res.json()).medias;
    for (let {
        url,
        preview
      }
      of anuku) conn.sendMedia(m.chat, url, null, {
      mentions: [m.sender],
      jpegThumbnail: await (await fetch(preview)).arrayBuffer(),
      caption: `🚀 *Link:* ${await (await axios.get(`https://tinyurl.com/api-create.php?url=${url}`)).data}`
    });
  } catch {
    try {
      const res2 = await igstory(args[0]);
      for (const {
          downloadUrl,
          url,
          preview,
          type,
          fileType
        }
        of res2) conn.sendMedia(m.chat, url, null, {
        mentions: [m.sender],
        jpegThumbnail: await (await fetch(preview)).arrayBuffer(),
        caption: `🚀 *Link:* ${await (await axios.get(`https://tinyurl.com/api-create.php?url=${url}`)).data}`
      });
    } catch {
      throw "No media found!";
    }
  }
};
handler.help = ["instagramstory"].map(v => v + " <username>"), handler.tags = ["downloader"],
  handler.command = /^((igs|instagrams)(tory)?(dl)?(downloa?d(er)?)?)$/i, handler.limit = !0;
export default handler;
async function igstory(username) {
  return new Promise(async (resolve, reject) => {
    axios.request({
      url: "https://www.instagramsave.com/instagram-story-downloader.php",
      method: "GET",
      headers: {
        "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
        cookie: "PHPSESSID=ugpgvu6fgc4592jh7ht9d18v49; _ga=GA1.2.1126798330.1625045680; _gid=GA1.2.1475525047.1625045680; __gads=ID=92b58ed9ed58d147-221917af11ca0021:T=1625045679:RT=1625045679:S=ALNI_MYnQToDW3kOUClBGEzULNjeyAqOtg"
      }
    }).then(({
      data
    }) => {
      const token = cheerio.load(data)("#token").attr("value");
      let config = {
        headers: {
          "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
          "sec-ch-ua": '" Not;A Brand";v="99", "Google Chrome";v="91", "Chromium";v="91"',
          cookie: "PHPSESSID=ugpgvu6fgc4592jh7ht9d18v49; _ga=GA1.2.1126798330.1625045680; _gid=GA1.2.1475525047.1625045680; __gads=ID=92b58ed9ed58d147-221917af11ca0021:T=1625045679:RT=1625045679:S=ALNI_MYnQToDW3kOUClBGEzULNjeyAqOtg",
          "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
        },
        data: {
          url: "https://www.instagram.com/" + username,
          action: "story",
          token: token
        }
      };
      axios.post("https://www.instagramsave.com/system/action.php", qs.stringify(config.data), {
        headers: config.headers
      }).then(({
        data
      }) => {
        resolve(data.medias);
      });
    }).catch(reject);
  });
}