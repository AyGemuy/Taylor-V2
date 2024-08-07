import fetch from "node-fetch";
import cheerio from "cheerio";
import {
  generateWAMessageFromContent
} from "@whiskeysockets/baileys";
const handler = async (m, {
  conn,
  text
}) => {
  if (!text) throw "✳️ What do you want me to search for?";
  if (validateURL(text)) {
    m.react(wait);
    let v = await getMusicmp3(text),
      output = `🎵 *Judul:* ${v.judul}\n🖼️ *Gambar:* ${v.gambar}\n📝 *Deskripsi:* ${v.deskripsi}\n🔗 *Tautan Unduh:* ${v.tautan_unduh}\n📦 *Ukuran File:* ${v.ukuran_file}\n`;
    await conn.sendFile(m.chat, v.gambar, "", output, m), await conn.sendFile(m.chat, v.tautan_unduh, v.judul, "", m, !1, {
      asDocument: !0
    });
  } else {
    m.react(wait);
    try {
      let res = await searchMusicmp3(text),
        teks = res.map((item, index) => `🔍 *[ RESULT ${index + 1} ]*\n\n📝 *Title:* ${item.title}\n🔗 *Url:* ${item.url}\n📋 *Desc:* ${item.desc}\n🖼️ *Thumb:* ${item.thumb}\n`).filter(v => v).join("\n\n________________________\n\n"),
        ytthumb = await (await conn.getFile(res[0]?.thumb)).data,
        msg = await generateWAMessageFromContent(m.chat, {
          extendedTextMessage: {
            text: teks,
            jpegThumbnail: ytthumb,
            contextInfo: {
              mentionedJid: [m.sender],
              externalAdReply: {
                body: "S E A R C H",
                containsAutoReply: !0,
                mediaType: 1,
                mediaUrl: res[0]?.url,
                renderLargerThumbnail: !0,
                showAdAttribution: !0,
                sourceId: "WudySoft",
                sourceType: "PDF",
                previewType: "PDF",
                sourceUrl: res[0]?.url,
                thumbnail: ytthumb,
                thumbnailUrl: res[0]?.thumb,
                title: htki + " Y O U T U B E " + htka
              }
            }
          }
        }, {
          quoted: m
        });
      await conn.relayMessage(m.chat, msg.message, {});
    } catch (e) {
      m.react(eror);
    }
  }
};
handler.help = ["", "search"].map(v => "musicmp3" + v + " <pencarian>"), handler.tags = ["tools"],
  handler.command = /^(musicmp3|musicmp3search)$/i;
export default handler;

function validateURL(url) {
  return /justnaija\.com\/music-mp3/.test(url);
}
async function shortUrl(url) {
  let res = await fetch(`https://tinyurl.com/api-create.php?url=${url}`);
  return await res.text();
}
async function searchMusicmp3(q) {
  const url = "https://justnaija.com/search?q=" + q + "&SearchIt=";
  try {
    const response = await fetch(url),
      html = await response.text(),
      $ = cheerio.load(html),
      articles = [];
    return $("article.result").each((index, element) => {
      const article = {
        title: $(element).find("h3.result-title a").text().trim(),
        url: $(element).find("h3.result-title a").attr("href"),
        thumb: $(element).find("div.result-img img").attr("src"),
        desc: $(element).find("p.result-desc").text().trim()
      };
      articles.push(article);
    }), articles;
  } catch (err) {
    console.error(err);
  }
}
async function getMusicmp3(url) {
  try {
    const response = await fetch(url),
      html = await response.text(),
      $ = cheerio.load(html),
      judul = $("h1").text(),
      gambar = $("img.lazy").attr("data-src"),
      artis = $(".id3-table tr").eq(0).find("a").text(),
      produser = $(".id3-table tr").eq(1).find("a").text(),
      kategori = $(".id3-table tr").eq(2).find("a").text(),
      genre = $(".id3-table tr").eq(3).find("td").eq(1).text(),
      album = $(".id3-table tr").eq(4).find("a").text(),
      tahun_rilis = $(".id3-table tr").eq(5).find("td").eq(1).text(),
      durasi = $(".id3-table tr").eq(6).find("td").eq(1).text(),
      deskripsi = $(".details p").text(),
      tautan_unduh = $(".song-download a").attr("href"),
      tautan_alternatif_unduh = $(".song-download a").attr("href"),
      ukuran_file = $(".song-download a").text().match(/\[(.*?)\]/)[1];
    return {
      judul: judul,
      gambar: gambar,
      artis: artis,
      produser: produser,
      kategori: kategori,
      genre: genre,
      album: album,
      tahun_rilis: tahun_rilis,
      durasi: durasi,
      deskripsi: deskripsi,
      tautan_unduh: tautan_unduh,
      tautan_alternatif_unduh: tautan_alternatif_unduh,
      ukuran_file: ukuran_file
    };
  } catch (error) {
    return console.log("Terjadi kesalahan:", error), null;
  }
}