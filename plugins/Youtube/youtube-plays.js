import fetch from "node-fetch";
import ytdl from "ytdl-core";
import yts from "yt-search";
const handler = async (m, {
  conn,
  command,
  args,
  usedPrefix
}) => {
  const text = args.length >= 1 ? args.slice(0).join(" ") : m.quoted && m.quoted?.text || m.quoted?.caption || m.quoted?.description || null;
  if (!text) return m.reply(`Masukkan teks atau reply pesan dengan teks yang ingin diolah.\nContoh penggunaan:\n*${usedPrefix}${command} Hai, apa kabar?*`);
  conn.youtubePlay = conn.youtubePlay ? conn.youtubePlay : {}, m.react(wait);
  const result = await searchAndDownloadMusic(text),
    fullText = `${`\n*Title:* ${result.title}\n*Description:* ${result.description}\n*Duration:* ${result.duration}\n*Author:* ${result.author}\n*Video URL:* ${result.videoUrl}\n  `}\n\n${result.allLinks.map((link, index) => {
const sectionNumber = index + 1, {
quality,
type,
size
} = link;
return ` * $ {
      sectionNumber
    }.*$ {
      type
    }* $ {
      quality
    }*-$ {
      size
    }
  `;
}).join("\n")}`, {
    key
  } = await conn.reply(m.chat, fullText, m);
  conn.youtubePlay[m.sender] = {
    result: result,
    key: key,
    timeout: setTimeout(() => {
      conn.sendMessage(m.chat, {
        delete: key
      }), delete conn.youtubePlay[m.sender];
    }, 6e4)
  };
};
handler.before = async (m, {
    conn
  }) => {
    if (conn.youtubePlay = conn.youtubePlay ? conn.youtubePlay : {}, m.isBaileys || !(m.sender in conn.youtubePlay)) return;
    const {
      result,
      key,
      timeout
    } = conn.youtubePlay[m.sender];
    if (!m.quoted || m.quoted?.id !== key.id || !m.text) return;
    const choice = m.text.trim(),
      inputNumber = Number(choice);
    if (inputNumber >= 1 && inputNumber <= result.allLinks.length) {
      const selectedUrl = result.allLinks[inputNumber - 1].url,
        buffer = await fetchVideoBuffer(decodeURI(selectedUrl));
      m.reply(buffer), m.reply(`Anda memilih pilihan nomor *${inputNumber}*\n*Stream:* ${await shortUrl(selectedUrl)}`),
        conn.sendMessage(m.chat, {
          delete: key
        }), clearTimeout(timeout), delete conn.youtubePlay[m.sender];
    } else m.reply("Nomor urutan tidak valid. Silakan pilih nomor yang sesuai dengan daftar di atas.\nAntara 1 sampai " + result.allLinks.length);
  }, handler.help = ["plays"], handler.tags = ["downloader"], handler.command = /^(plays)$/i,
  handler.limit = !0;
export default handler;

function formatBytes(bytes, decimals = 2) {
  if (0 === bytes) return "0 B";
  const dm = decimals < 0 ? 0 : decimals,
    i = Math.floor(Math.log(bytes) / Math.log(1024));
  return parseFloat((bytes / Math.pow(1024, i)).toFixed(dm)) + " " + ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"][i];
}
async function searchAndDownloadMusic(query) {
  try {
    const {
      videos
    } = await yts(query);
    if (!videos.length) return "Maaf, tidak ditemukan hasil video untuk pencarian ini.";
    const video = videos[0],
      videoInfo = await ytdl.getInfo(video.url),
      allLinks = videoInfo.formats.map(format => ({
        type: format.hasVideo && format.hasAudio ? "Video & Audio" : format.hasVideo ? "Video" : "Audio",
        quality: format.qualityLabel || format.audioQuality || "N/A",
        url: format.url,
        size: format.contentLength ? formatBytes(format.contentLength) : "N/A"
      }));
    return {
      title: video.title,
      description: video.description,
      duration: video.duration,
      author: video.author.name,
      allLinks: allLinks,
      videoUrl: video.url,
      thumbnail: video.thumbnail
    };
  } catch (error) {
    return "Terjadi kesalahan: " + error.message;
  }
}
async function shortUrl(url) {
  let res = await fetch(`https://tinyurl.com/api-create.php?url=${url}`);
  return await res.text();
}
async function fetchVideoBuffer() {
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Access-Control-Allow-Origin": "*"
      }
    });
    return await response.arrayBuffer();
  } catch (error) {
    return null;
  }
}