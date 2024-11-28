import fetch from "node-fetch";
import * as cheerio from "cheerio";
const handler = async (m, { conn, text, usedPrefix, command }) => {
  let who =
      m.mentionedJid && m.mentionedJid[0]
        ? m.mentionedJid[0]
        : m.fromMe
          ? conn.user.jid
          : m.sender,
    arr_url =
      (await conn.profilePictureUrl(who).catch((_) => hwaifu.getRandom()),
      conn.getName(who),
      [
        "aesthetic",
        "akira",
        "akiyama",
        "ana",
        "ana",
        "anime",
        "anjing",
        "asuna",
        "ayuzawa",
        "boneka-chucky",
        "boruto",
        "cecan2",
        "cecan",
        "chiho",
        "chitoge",
        "cogan2",
        "cogan",
        "cyberspace",
        "deidara",
        "doraemon",
        "eba",
        "elaina",
        "emilia",
        "erza",
        "gaming",
        "gremory",
        "hekel",
        "hestia",
        "hinata",
        "inori",
        "islami",
        "isuzu",
        "itachi",
        "itori",
        "jeni",
        "jiso",
        "justina",
        "kaga",
        "kagura",
        "kaori",
        "kartun",
        "katakata",
        "keneki",
        "kotori",
        "kpop",
        "kucing",
        "kurumi",
        "loli",
        "madara",
        "megumin",
        "mikasa",
        "miku",
        "minato",
        "mobil",
        "montor",
        "mountain",
        "naruto",
        "nezuko",
        "nsfwloli",
        "onepiece",
        "pentol",
        "pokemon",
        "ppcouple",
        "programing",
        "pubg",
        "rize",
        "rose",
        "ryujin",
        "sagiri",
        "sakura",
        "sasuke",
        "satanic",
        "shina",
        "shinka",
        "shinomiya",
        "shizuka",
        "shota",
        "tatasurya",
        "tejina",
        "teknologi",
        "toukachan",
        "trans",
        "tsunade",
        "waifu2",
        "waifu",
        "wallhp",
        "yotsuba",
        "yuki",
        "yumeko",
        "yuri",
      ]),
    listSections = [];
  if (
    (Object.keys(arr_url).map((v, index) => {
      listSections.push([
        "Model [ " + ++index + " ]",
        [
          [
            arr_url[v].toUpperCase(),
            usedPrefix +
              "get https://web-production-7c28.up.railway.app/api/wallpaper/" +
              arr_url[v] +
              "?apikey=APIKEY",
            "➥",
          ],
        ],
      ]);
    }),
    !text)
  )
    return conn.sendList(
      m.chat,
      htki + " 📺 Models 🔎 " + htka,
      `⚡ Silakan pilih Model di tombol di bawah...\n*Teks yang anda kirim:* ${text}\n\nKetik ulang *${usedPrefix + command}* teks anda untuk mengubah teks lagi`,
      author,
      "☂️ M O D E L ☂️",
      listSections,
      m,
    );
  const res = await (/2/.test(command), wallpaper)(text),
    img = res[Math.floor(Math.random() * res.length)];
  await conn.sendFile(
    m.chat,
    await (await fetch(img)).arrayBuffer(),
    "",
    `Result from *${text}*`,
    m,
  );
};
(handler.help = ["", "2"].map((v) => "wallpaper" + v + " <query>")),
  (handler.tags = ["downloader"]),
  (handler.command = /^(wallpaper2?)$/i);
export default handler;
async function wallpaper(query) {
  const response = await fetch(
    `https://www.shutterstock.com/search/${encodeURIComponent(query)}`,
    {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
        Accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8",
      },
    },
  );
  if (!response.ok) {
    throw new Error("Network response was not ok " + response.statusText);
  }
  const data = await response.text();
  const $ = cheerio.load(data);
  const results = [
    ...new Set(
      [
        ...$.html().matchAll(
          /https?:\/\/(image|www)\.shutterstock\.com\/([^"]+)/gim,
        ),
      ]
        .map((v) => v[0])
        .filter((v) => /.*\.(jpe?g|png)$/gi.test(v)),
    ),
  ];
  return results;
}
