import fetch from "node-fetch";
import cheerio from "cheerio";
import {
  xnxxSearch,
  xnxxDownloader
} from "../../lib/scraper/scraped-downloader.js";
import {
  eporner
} from "../../lib/download/eporner.js";
import {
  dekuai
} from "../../lib/ai/ai-dekuai.js";
const handler = async (m, {
  conn,
  usedPrefix,
  text,
  args,
  command
}) => {
  try {
    m.react(wait);
    let results, item, buffer, teksdl;
    const handleError = msg => {
      m.reply(msg);
      m.react(eror);
    };
    const handleSuccess = () => {
      m.react(sukses);
    };
    switch (command) {
      case "xnxx":
        if (!text) {
          m.reply(`Contoh penggunaan: *${usedPrefix}${command} japan*`);
          return;
        }
        results = (await xnxxSearch(text))?.result || (await dekuai.api("api/xsearch", {
          q: text
        }))?.result?.result;
        if (!results?.length) {
          handleError("Maaf, tidak ada hasil pencarian yang ditemukan.");
          return;
        }
        const xnxxButtons = conn.ctaButton.setBody(`🔍 Hasil Pencarian: ${text}`).setFooter("Pilih video di bawah ini.").addSelection("Klik di sini").makeSections("XNXX", "Rekomendasi");
        results.forEach(item => {
          xnxxButtons.makeRow("", item.title, `🎥 ${item.title}`, `${usedPrefix}xnxxdl ${item.link}`);
        });
        xnxxButtons.run(m.chat, conn, m);
        handleSuccess();
        break;
      case "xnxxdl":
        if (!text) {
          m.reply(`Contoh penggunaan: *${usedPrefix}${command} https://www.xnxx.com/video-18ctcz24/masi_pakai_seragam_biru_mainnya_di_hotel*`);
          return;
        }
        item = await xnxxDownloader(text) || (await dekuai.api("api/xdl", {
          q: text
        }))?.result;
        if (!item) {
          handleError("Maaf, tidak ada hasil download yang ditemukan.");
          return;
        }
        teksdl = `🔍 *[ HASIL ]*\n📚 Judul: ${item.title}\n🔗 Link: ${item.URL}\n📝 Ringkasan: ${item.info}`;
        buffer = (await conn.getFile(item.files?.low)).data || (await conn.getFile(item.files?.HLS)).data || (await conn.getFile(item.files?.high)).data;
        await conn.sendMessage(m.chat, {
          video: buffer,
          caption: teksdl + " 📥"
        }, {
          quoted: m
        });
        handleSuccess();
        break;
      case "xvideos":
        if (!text) {
          m.reply(`Contoh penggunaan: *${usedPrefix}${command} japan*`);
          return;
        }
        results = (await dekuai.api("prn/search", {
          "/": text
        })).result;
        if (!results?.length) {
          handleError("Maaf, tidak ada hasil pencarian yang ditemukan.");
          return;
        }
        const xvideosButtons = conn.ctaButton.setBody(`🔍 Hasil Pencarian: ${text}`).setFooter("Pilih video di bawah ini.").addSelection("Klik di sini").makeSections("XVIDEOS", "Rekomendasi");
        results.forEach(item => {
          xvideosButtons.makeRow("", item.title, `🎥 ${item.title}`, `${usedPrefix}xvideosdl ${item.video}`);
        });
        xvideosButtons.run(m.chat, conn, m);
        handleSuccess();
        break;
      case "xvideosdl":
        if (!text) {
          m.reply(`Contoh penggunaan: *${usedPrefix}${command} https://www.xvideos.com/video-18ctcz24/masi_pakai_seragam_biru_mainnya_di_hotel*`);
          return;
        }
        item = await dekuai.api("prn/download", {
          url: text
        }).result;
        if (!item) {
          handleError("Maaf, tidak ada hasil download yang ditemukan.");
          return;
        }
        teksdl = `🔍 *[ HASIL ]*\n📚 Judul: ${item.name}\n🔗 Link: ${item.contentUrl?.Default_Quality}\n📝 Description: ${item.description}`;
        buffer = (await conn.getFile(item.contentUrl?.Default_Quality)).data || (await conn.getFile(item.contentUrl?.Low_Quality)).data || (await conn.getFile(item.contentUrl?.HD_Quality)).data;
        await conn.sendMessage(m.chat, {
          video: buffer,
          caption: teksdl + " 📥"
        }, {
          quoted: m
        });
        handleSuccess();
        break;
      case "eporner":
        if (!text) {
          m.reply(`Contoh penggunaan: *${usedPrefix}${command} japan*`);
          return;
        }
        results = await eporner.search(text);
        if (!results?.length) {
          handleError("Maaf, tidak ada hasil pencarian yang ditemukan.");
          return;
        }
        const epornerButtons = conn.ctaButton.setBody(`🔍 Hasil Pencarian: ${text}`).setFooter("Pilih video di bawah ini.").addSelection("Klik di sini").makeSections("Eporner", "Rekomendasi");
        results.forEach(item => {
          epornerButtons.makeRow("", item.title, `🎥 ${item.title}`, `${usedPrefix}epornerdl ${item.link}`);
        });
        epornerButtons.run(m.chat, conn, m);
        handleSuccess();
        break;
      case "epornerdl":
        if (!text) {
          m.reply(`Contoh penggunaan: *${usedPrefix}${command} https://www.eporner.com/video-18ctcz24/masi_pakai_seragam_biru_mainnya_di_hotel*`);
          return;
        }
        item = await eporner.download(text).download;
        if (!item?.length) {
          handleError("Maaf, tidak ada hasil download yang ditemukan.");
          return;
        }
        teksdl = `🔍 *[ HASIL ]*\n📚 Info: ${item[0]?.info}\n🔗 Link: ${item[0]?.URL}\nQuality: ${item[0]?.quality}\nSize: ${item[0]?.size}`;
        buffer = (await conn.getFile(item[0]?.url)).data;
        await conn.sendMessage(m.chat, {
          video: buffer,
          caption: teksdl + " 📥"
        }, {
          quoted: m
        });
        handleSuccess();
        break;
      case "dlxnxx":
        if (!args[0]) {
          m.reply(`Contoh penggunaan: *${usedPrefix}${command} https://www.xnxx.com/video-uy5a73b/mom_is_horny_-_brooklyn*`);
          return;
        }
        try {
          const json = await fetch(API("lolhuman", "/api/xnxx", {
            url: text
          }, "apikey"));
          const x = await json.json();
          if (!x.result) {
            handleError("Maaf, tidak ada hasil download yang ditemukan.");
            return;
          }
          const caption = `🎥 *Judul:* ${x.result.title}\n⌛ *Durasi:* ${x.result.duration}\n👀 *Dilihat:* ${x.result.view}\n⭐ *Rating:* ${x.result.rating}\n👍 *Suka:* ${x.result.like}\n👎 *Tidak Suka:* ${x.result.dislike}\n💬 *Komentar:* ${x.result.comment}\n🏷️ *Tag:* ${Array.from(x.result.tag)}\n📝 *Deskripsi:* ${x.result.description}`;
          await conn.sendFile(m.chat, x.result.link[1].link, "asupan.mp4", caption + " 📤", m);
          handleSuccess();
        } catch (e) {
          m.reply(`Terjadi kesalahan saat mengunduh: ${e.message} ❌`);
          m.react(eror);
        }
        break;
      case "youporn":
        if (!text) {
          m.reply(`Contoh penggunaan: *${usedPrefix}${command} japan*`);
          return;
        }
        results = await youpornSearch(text);
        if (!results?.length) {
          handleError("Maaf, tidak ada hasil pencarian yang ditemukan.");
          return;
        }
        const youpornButtons = conn.ctaButton.setBody(`🔍 Hasil Pencarian: ${text}`).setFooter("Pilih video di bawah ini.").addSelection("Klik di sini").makeSections("youporn", "Rekomendasi");
        results.forEach(item => {
          youpornButtons.makeRow("", item.title, `🎥 ${item.title} - ${item.duration}\n`, `${usedPrefix}youporndl ${item.videoId}`);
        });
        youpornButtons.run(m.chat, conn, m);
        handleSuccess();
        break;
      case "youporndl":
        if (!text) {
          m.reply(`Contoh penggunaan: *${usedPrefix}${command} 123456*`);
          return;
        }
        item = await youpornDl(text);
        if (!item) {
          handleError("Maaf, tidak ada hasil download yang ditemukan.");
          return;
        }
        teksdl = `🔍 *[ HASIL ]*\n📚 Format: ${item.format}\n🔗 Quality: ${item.quality}`;
        buffer = (await conn.getFile(item.videoUrl)).data || (await conn.getFile(Object.entries(APIs).find(([key]) => key.includes("proxy"))?.[1] + item.videoUrl)).data;
        await conn.sendMessage(m.chat, {
          video: buffer,
          caption: teksdl + " 📥"
        }, {
          quoted: m
        });
        handleSuccess();
        break;
      default:
        m.reply(`Perintah *${command}* tidak dikenal.`);
        m.react(eror);
        break;
    }
  } catch (error) {
    m.reply(`Terjadi kesalahan: ${error.message} ❌`);
    m.react(eror);
  }
};
handler.help = ["xnxx", "xvideos", "eporner", "dlxnxx", "youporn"].map(v => v + " <query>");
handler.command = ["xnxx", "xnxxdl", "xvideos", "xvideosdl", "eporner", "epornerdl", "dlxnxx", "youporn", "youporndl"];
handler.tags = ["nsfw"];
handler.premium = true;
export default handler;
async function youpornSearch(q) {
  try {
    const response = await fetch(`${Object.entries(APIs).find(([ key ]) => key.includes("proxy"))?.[1]}https://www.youporn.com?query=${q}`);
    const body = await response.text();
    const $ = cheerio.load(body);
    return $(".video-box.pc.js_video-box").map((_, el) => {
      const $el = $(el);
      return {
        videoId: $el.attr("data-video-id"),
        videoUrl: $el.find(".tm_video_link").attr("href"),
        imgSrc: $el.find(".thumb-image-container img").data("src"),
        poster: $el.find(".thumb-image-container img").attr("data-poster"),
        mediaBook: $el.find(".thumb-image-container img").attr("data-mediabook"),
        title: $el.find(".video-title.tm_video_title").text().trim(),
        resolution: $el.find(".video-best-resolution").text().trim(),
        duration: $el.find(".video-duration.tm_video_duration").text().trim(),
        rating: $el.find(".info-rate").text().trim(),
        views: $el.find(".info-views").text().trim()
      };
    }).get();
  } catch (error) {
    console.error("Error fetching video data:", error);
    return [];
  }
}
async function youpornDl(id) {
  try {
    const response = await fetch(`https://www.youporn.com/watch/${id}`);
    const text = await response.text();
    const jsonDataMatch = text.split("page_params.video_player_setup")[1]?.split("page_params.video.playerParams")[0]?.match(/(\{(?:[^{}"\\]|\\.)*\}|(?:\[.*?\]))/g);
    if (jsonDataMatch) {
      try {
        const jsonData = JSON.parse(jsonDataMatch[1] || jsonDataMatch[0]);
        const data = jsonData[1]?.videoUrl || jsonData[0]?.videoUrl;
        const responseD = await fetch(`${Object.entries(APIs).find(([ key ]) => key.includes("proxy"))?.[1]}${data}`);
        const outs = await responseD.json();
        return outs[3] || outs[2] || outs[1] || outs[0];
      } catch (error) {
        console.error("Failed to parse JSON:", error);
        return null;
      }
    } else {
      console.error("No JSON data found");
      return null;
    }
  } catch (error) {
    console.error("Error fetching video data:", error);
    return null;
  }
}