import cheerio from "cheerio";
import fetch from "node-fetch";
const handler = async (m, {
  conn,
  args,
  usedPrefix,
  text,
  command
}) => {
  let lister = ["link", "mp4", "mp3", "search"],
    [feature, inputs, inputs_, inputs__, inputs___] = text.split("|");
  if (!lister.includes(feature)) return m.reply("*Example:*\n.10down search|vpn\n\n*Pilih type yg ada*\n" + lister.map((v, index) => "  ○ " + v).join("\n"));
  if (lister.includes(feature)) {
    if ("link" === feature) {
      if (!inputs) return m.reply("Input query link\nExample: .10down search|vpn");
      m.react(wait);
      try {
        let res = await YoutubePlaylist(inputs),
          vidlink = res.video.map(item => `📝 quality: ${item.quality}\n🔗 Tautan: ${item.link}\n🏷️ Size: ${item.size}`).filter(v => v).join("\n\n"),
          teks = `🔍 *[ HASIL ]*\n\n📚 Judul: ${res.title}\n⌚ Waktu: ${res.duration}\n\n`;
        const proxyurl = Object.entries(APIs).find(([key]) => key.includes("proxy"))?.[1];
        await conn.sendFile(m.chat, proxyurl + res.video[0]?.link || logo, "", teks + vidlink, m);
      } catch (e) {
        m.react(eror);
      }
    }
    if ("search" === feature) {
      if (!inputs) return m.reply("Input query link\nExample: .10down search|vpn");
      m.react(wait);
      try {
        let teks = (await getSearch(inputs)).map(res => `title: ${res.title}\nid: ${res.id}\nlink: ${res.link}\nthumbnails: ${res.thumbnails}\nduration: ${res.duration}\nchanel: ${res.chanel}\npublish: ${res.publish}\nview: ${res.view}`).filter(v => v).join("\n\n");
        await conn.sendFile(m.chat, logo, "", teks, m);
      } catch (e) {
        m.react(eror);
      }
    }
    if ("mp3" === feature) {
      if (!inputs) return m.reply("Input query link\nExample: .10down search|vpn");
      m.react(wait);
      try {
        return await getMusic(inputs);
      } catch (e) {
        m.react(eror);
      }
    }
    if ("mp4" === feature) {
      if (!inputs) return m.reply("Input query link\nExample: .10down search|vpn");
      m.react(wait);
      try {
        return await getVideo(inputs);
      } catch (e) {
        m.react(eror);
      }
    }
  }
};
handler.help = ["10down"], handler.tags = ["internet"], handler.command = /^(10down)$/i;
export default handler;
async function YoutubePlaylist(query) {
  const url = "https://10downloader.com/download?v=" + query,
    response = await fetch(url),
    html = await response.text(),
    $ = cheerio.load(html),
    video = [],
    thumbnail = [];
  $("#video-downloads .downloadsTable tbody tr").each((index, element) => {
    const [quality, format, size] = $(element).find("td").slice(0, 3).map((i, el) => $(el).text().trim()).get(), link = $(element).find("td:nth-child(4) a").attr("href");
    video.push({
      quality: quality,
      format: format,
      size: size,
      link: link,
      thumb: thumb
    });
  }), $("#thumbnail-downloads .downloadsTable tbody tr").each((index, element) => {
    const [quality, format, size] = $(element).find("td").slice(0, 3).map((i, el) => $(el).text().trim()).get(), thumb = $("tbody tr:first-child a").attr("href");
    thumbnail.push({
      quality: quality,
      format: format,
      size: size,
      thumb: thumb
    });
  });
  return {
    title: $(".title").text().trim(),
    duration: $(".duration span").text().trim(),
    thumbnail: thumbnail,
    video: video
  };
}
async function shortUrl(url) {
  let res = await fetch(`https://tinyurl.com/api-create.php?url=${url}`);
  return await res.text();
}
async function getMusic(url) {
  try {
    var check = await fetch("https://x2convert.com/ajax2/getFile.ashx?linkinfo=" + url + "&lang=id&option=100&country=ID");
    return await check.json();
  } catch (error) {
    return console.error(error), "not-valid";
  }
}
async function getVideo(q) {
  const url = "https://www.videovor.com/en/getlinks?url=" + q + "&r=0&retry=false";
  try {
    const response = await fetch(url),
      data = await response.text();
    return JSON.parse(data);
  } catch (error) {
    console.error("Error:", error);
  }
}
async function getSearch(teks) {
  try {
    teks = teks.replace(" ", "+");
    var api = await fetch("https://api.mp3download.to/v1/external/search/?query=" + teks);
    return (api = await api.json()).data.items.map(item => ({
      title: item.title,
      id: item.id,
      link: "https://youtu.be/" + item.id,
      thumbnails: item.thumbnails[Math.floor(Math.random() * item.thumbnails.length)],
      duration: item.duration,
      chanel: item.extra_data.channel_title,
      publish: item.extra_data.publishedAt,
      view: item.extra_data.viewCount
    }));
  } catch (error) {
    return console.error(error), [];
  }
}