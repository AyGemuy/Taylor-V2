import axios from "axios";
import cheerio from "cheerio";
import fetch from "node-fetch";
const handler = async (m, {
  conn,
  usedPrefix,
  text,
  args,
  command
}) => {
  try {
    let res;
    if (text.match(/https:\/\/sfile.mobi\/.*/)) {
      try {
        res = await sfileV1dl(text);
        res.version = 1;
      } catch {
        res = await sfileV2dl(text);
        res.version = 2;
      }
      if (!res || !res.status) throw "❌ *Error:* Tidak dapat mengambil link unduhan.";
      let caption = res.version === 1 && res.data?.buffer ? `*\`📂 Hasil Unduhan (Versi 1)\`*\n\n- *Nama:* ${res.data.filename || "Tidak diketahui"}\n- *Ukuran:* ${res.data.filesize || "Tidak diketahui"}\n- *Tipe Mimetype:* ${res.data.mimetype || "Tidak diketahui"}\n- *Versi:* ${res.version}` : `*\`📂 Hasil Unduhan (Versi 2)\`*\n\n- *Tanggal:* ${res.data?.date || "Tidak diketahui"}\n- *Total Unduhan:* ${res.data?.total || "Tidak diketahui"}\n- *Versi:* ${res.version}`;
      m.reply(caption);
      await conn.sendFile(m.chat, res.data?.buffer || res.data.result, res.data?.filename || "unknown", "", m);
    } else {
      if (!text) throw "📝 *Input Query / URL Sfile diperlukan!*";
      let [query, page] = text.split("|");
      let searchResults;
      try {
        searchResults = await sfileV2search(query, page);
        searchResults.version = 1;
      } catch {
        searchResults = await sfileV1search(query);
        searchResults.version = 2;
      }
      if (!searchResults.result?.length && !searchResults.data?.length) throw `🔍 *Query "${text}" tidak ditemukan.*`;
      let resultsText = (searchResults.result || searchResults.data)?.map((v, index) => searchResults.version === 1 ? `*\`Hasil ${index + 1}\`*\n\n- *Nama:* ${v.name}\n- *Ukuran:* ${v.size}\n- *Link:* ${v.link}` : `*\`Hasil ${index + 1}\`*\n\n- *Nama:* ${v.title}\n- *Ukuran:* ${v.size}\n- *ID:* ${v.id}\n- *Link:* https://sfile.mobi/${v.id}`).join("\n________________________\n");
      m.reply(`*\`🔎 Hasil Pencarian (Versi ${searchResults.version})\`*\n\n${resultsText}\n- *\`Total Hasil:\`* ${searchResults.total || searchResults.length}`);
    }
  } catch (e) {
    m.react(eror);
  }
};
handler.help = ["sfile"];
handler.tags = ["downloader"];
handler.command = /^sfile(d(own(load)?|l))?$/i;
export default handler;
async function sfileV2search(query, page = 1) {
  try {
    const data = await fetch(`https://sfile.mobi/search.php?q=${query}&page=${page}`);
    const $ = cheerio.load(await data.text());
    const result = $(".list").map((index, element) => {
      const text = $(element).text();
      const name = $(element).find("a").text();
      const link = $(element).find("a").attr("href");
      const size = text.match(/\((.*?)\)/)?.[1] || "";
      return {
        name: name,
        link: link,
        size: size
      };
    }).get().filter(item => item.name);
    return {
      total: result.length,
      result: result
    };
  } catch (error) {
    throw error;
  }
}
async function sfileV2dl(id) {
  try {
    const {
      data
    } = await axios.get(`https://sfile-api.vercel.app/download/${id}`);
    const downloadUrl = data?.data?.url;
    const filename = downloadUrl ? downloadUrl.split("/").pop().split("&")[0] : "unknown";
    return {
      status: true,
      data: {
        date: data?.data?.date,
        total: data?.data?.downloaded,
        result: downloadUrl,
        filename: filename
      }
    };
  } catch (error) {
    throw error;
  }
}
async function sfileV1dl(url) {
  const headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36 Edg/117.0.2045.47",
    Referer: url,
    Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8",
    "Accept-Language": "en-US,en;q=0.9"
  };
  try {
    const {
      data,
      headers: responseHeaders
    } = await axios.get(url, {
      headers: headers
    });
    const cookies = responseHeaders["set-cookie"]?.map(cookie => cookie.split(";")[0]).join("; ") || "";
    headers.Cookie = cookies;
    const filename = data.match(/<h1 class="intro">(.*?)<\/h1>/s)?.[1] || "unknown";
    const mimetype = data.match(/<div class="list">.*? - (.*?)<\/div>/)?.[1] || "";
    const downloadUrl = data.match(/<a class="w3-button w3-blue w3-round" id="download" href="([^"]+)"/)?.[1];
    headers.Referer = downloadUrl;
    if (!downloadUrl) return {
      status: false,
      message: "Download URL tidak ditemukan"
    };
    const {
      data: downloadPageData
    } = await axios.get(downloadUrl, {
      headers: headers
    });
    const finalDownloadUrl = downloadPageData.match(/<a class="w3-button w3-blue w3-round" id="download" href="([^"]+)"/)?.[1];
    const key = downloadPageData.match(/&k='\+(.*?)';/)?.[1].replace(`'`, "");
    const finalUrl = finalDownloadUrl + (key ? `&k=${key}` : "");
    const filesize = downloadPageData.match(/Download File \((.*?)\)/)?.[1];
    if (!finalUrl) return {
      status: false,
      message: "Download URL tidak ditemukan"
    };
    const {
      data: fileBuffer,
      headers: fileHeaders
    } = await axios.get(finalUrl, {
      responseType: "arraybuffer",
      headers: {
        ...headers,
        Referer: url
      }
    });
    const filenameFinal = fileHeaders["content-disposition"]?.match(/filename=["']?([^"';]+)["']?/)?.[1] || "unknown";
    return {
      status: true,
      data: {
        filename: filenameFinal,
        filesize: filesize,
        mimetype: mimetype || fileHeaders["content-type"],
        buffer: fileBuffer
      }
    };
  } catch (err) {
    console.error("Error:", err);
    return {
      status: false,
      message: err.message || "Kesalahan tidak diketahui"
    };
  }
}
async function sfileV1search(id) {
  try {
    const {
      data
    } = await axios.get(`https://sfile-api.vercel.app/search/${id}`);
    return data?.data;
  } catch (error) {
    throw error;
  }
}