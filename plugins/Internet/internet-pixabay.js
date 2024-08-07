import axios from "axios";
import fetch from "node-fetch";
import cheerio from "cheerio";
const handler = async (m, {
  conn,
  args,
  usedPrefix,
  text,
  command
}) => {
  if (!text) throw "Input Text";
  let sp = text.split("|"),
    no = sp[0],
    tems = sp[1];
  if ("piximg" === command) {
    let res = await fetch("https://pixabay.com/api/?key=30089426-4575ed7bbbc8bfffe9a0b8eb4&q=" + encodeURIComponent(text)),
      sul = await res.json(),
      listSections = [];
    return Object.values(sul.hits).map((v, index) => {
      listSections.push([index + " " + cmenub + " By: " + v.user, [
        ["Lihat", usedPrefix + "pixgetimg " + index + "|" + text, author]
      ]]);
    }), conn.sendList(m.chat, htki + " 📺 Pixabay Search 🔎 " + htka, `⚡ Total ${sul.total_count} Code, Silakan pilih Pixabay Search di tombol di bawah...\n*Teks yang anda kirim:* ${text}\n\nKetik ulang *${usedPrefix + command}* teks anda untuk mengubah teks lagi`, author, "☂️ Pixabay Search Disini ☂️", listSections, m);
  }
  if ("pixvid" === command) {
    let res = await fetch("https://pixabay.com/api/videos/?key=30089426-4575ed7bbbc8bfffe9a0b8eb4&q=" + text),
      sul = await res.json(),
      listSections = [];
    return Object.values(sul.hits).map((v, index) => {
      listSections.push([index + " " + cmenub + " By: " + v.user, [
        ["Lihat", usedPrefix + "pixgetvid " + index + "|" + text, author]
      ]]);
    }), conn.sendList(m.chat, htki + " 📺 Pixabay Search 🔎 " + htka, `⚡ Total ${sul.total_count} Code, Silakan pilih Pixabay Search di tombol di bawah...\n*Teks yang anda kirim:* ${text}\n\nKetik ulang *${usedPrefix + command}* teks anda untuk mengubah teks lagi`, author, "☂️ Pixabay Search Disini ☂️", listSections, m);
  }
  if ("pixgetimg" === command) {
    let res = await fetch("https://pixabay.com/api/?key=30089426-4575ed7bbbc8bfffe9a0b8eb4&q=" + encodeURIComponent(tems)),
      sul = await res.json(),
      desimg = `*webformatHeight:* ${sul.hits[no].webformatHeight}\n*imageWidth:* ${sul.hits[no].imageWidth}\n*previewHeight:* ${sul.hits[no].previewHeight}\n*webformatURL:* ${sul.hits[no].webformatURL}\n*userImageURL:* ${sul.hits[no].userImageURL}\n*previewURL:* ${sul.hits[no].previewURL}\n*comments:* ${sul.hits[no].comments}\n*type:* ${sul.hits[no].type}\n*imageHeight:* ${sul.hits[no].imageHeight}\n*tags:* ${sul.hits[no].tags}\n*previewWidth:* ${sul.hits[no].previewWidth}\n*downloads:* ${sul.hits[no].downloads}\n*collections:* ${sul.hits[no].collections}\n*user_id:* ${sul.hits[no].user_id}\n*largeImageURL:* ${sul.hits[no].largeImageURL}\n*pageURL:* ${sul.hits[no].pageURL}\n*id:* ${sul.hits[no].id}\n*imageSize:* ${sul.hits[no].imageSize}\n*webformatWidth:* ${sul.hits[no].webformatWidth}\n*user:* ${sul.hits[no].user}\n*views:* ${sul.hits[no].views}\n*likes:* ${sul.hits[no].likes}\n`;
    await conn.sendFile(m.chat, sul.hits[no].previewURL ? sul.hits[no].webformatURL : sul.hits[no].largeImageURL, "", desimg, m);
  }
  if ("pixgetvid" === command) {
    let res = await fetch("https://pixabay.com/api/videos?key=30089426-4575ed7bbbc8bfffe9a0b8eb4&q=" + encodeURIComponent(tems)),
      sul = await res.json(),
      desvid = `\n\n\n*userImageURL:* ${sul.hits[no].userImageURL}\n*comments:* ${sul.hits[no].comments}\n*videos:* ${sul.hits[no].videos}\n\n*videos.small.size:* ${sul.hits[no].videos.small.size}\n*videos.small.width:* ${sul.hits[no].videos.small.width}\n*videos.small.url:* ${sul.hits[no].videos.small.url}\n*videos.small.height:* ${sul.hits[no].videos.small.height}\n\n*videos.large.size:* ${sul.hits[no].videos.large.size}\n*videos.large.width:* ${sul.hits[no].videos.large.width}\n*videos.large.url:* ${sul.hits[no].videos.large.url}\n*videos.large.height:* ${sul.hits[no].videos.large.height}\n\n*videos.tiny.size:* ${sul.hits[no].videos.tiny.size}\n*videos.tiny.width:* ${sul.hits[no].videos.tiny.width}\n*videos.tiny.url:* ${sul.hits[no].videos.tiny.url}\n*videos.tiny.height:* ${sul.hits[no].videos.tiny.height}\n\n*videos.medium.size:* ${sul.hits[no].videos.medium.size}\n*videos.medium.width:* ${sul.hits[no].videos.medium.width}\n*videos.medium.url:* ${sul.hits[no].videos.medium.url}\n*videos.medium.height:* ${sul.hits[no].videos.medium.height}\n*picture_id:* ${sul.hits[no].picture_id}\n*type:* ${sul.hits[no].type}\n*tags:* ${sul.hits[no].tags}\n*duration:* ${sul.hits[no].duration}\n*downloads:* ${sul.hits[no].downloads}\n*user_id:* ${sul.hits[no].user_id}\n*pageURL:* ${sul.hits[no].pageURL}\n*id:* ${sul.hits[no].id}\n*user:* ${sul.hits[no].user}\n*views:* ${sul.hits[no].views}\n*likes:* ${sul.hits[no].likes}\n`;
    await conn.sendFile(m.chat, sul.hits[no].videos.large.url ? sul.hits[no].videos.medium.url : sul.hits[no].videos.small.url, "", desvid, m);
  }
};
handler.help = ["piximg", "pixvid"], handler.tags = ["internet"], handler.command = ["piximg", "pixvid", "pixgetimg", "pixgetvid"];
export default handler;