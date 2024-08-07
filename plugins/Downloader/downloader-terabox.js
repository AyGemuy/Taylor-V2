import got from "got";
import {
  format
} from "util";
const handler = async (m, {
  conn,
  args
}) => {
  if (!args[0]) return await conn.reply(m.chat, "URL tidak boleh kosong", m);
  const match = args[0]?.match(/\/([A-Za-z0-9_-]+)$/);
  if (!match) return await conn.reply(m.chat, "Format URL tidak didukung", m);
  const shortUrl = match[1];
  try {
    const res = await fetchInfo(shortUrl, args[2]),
      selectedFileIndex = parseInt(args[1]) - 1,
      selectedFile = res[selectedFileIndex];
    if (!args[1] || selectedFileIndex < 0 || selectedFileIndex >= res.length) return await conn.reply(m.chat, "⚠️ Masukkan nomor yang valid. Contoh: .terabox url 1 (1 sampai " + res.length + ")", m);
    const fileInfo = await fetchDownload({
        shareid: selectedFile.shareid,
        uk: selectedFile.uk,
        sign: selectedFile.sign,
        timestamp: selectedFile.timestamp,
        fs_id: selectedFile.fs_id
      }),
      sizeLimit = 104857600,
      formattedSize = formatSize(fileInfo.size);
    if (fileInfo.size > sizeLimit) return await conn.reply(m.chat, "⚠️ Ukuran file melebihi batas 100MB. Ukuran file: " + formattedSize, m);
    if (fileInfo.ok) {
      const caption = `🔍 *[ HASIL ]*\n📌 *Judul:* ${selectedFile.name}\n📦 *Ukuran:* ${formattedSize}`;
      return await conn.sendFile(m.chat, fileInfo.downloadLink, selectedFile.name, caption, m, !0, {
        quoted: m,
        mimetype: fileInfo.mime
      });
    }
    return await conn.reply(m.chat, "Terjadi kesalahan saat mengunduh file", m);
  } catch (error) {
    return await conn.reply(m.chat, "Terjadi kesalahan", m);
  }
};
handler.help = ["terabox"], handler.command = /^(terabox)$/i;
export default handler;
async function getMimeTypeAndSizeFromURL(url) {
  try {
    const response = await got.head(url),
      contentType = response.headers["content-type"];
    return {
      mimeType: contentType,
      size: response.headers["content-length"]
    };
  } catch (error) {
    return console.error("Error getting content type and size:", error), null;
  }
}
async function fetchDownload({
  shareid,
  uk,
  sign,
  timestamp,
  fs_id
}) {
  try {
    const response = await got.post("https://terabox-dl.qtcloud.workers.dev/api/get-download", {
      json: {
        shareid: shareid,
        uk: uk,
        sign: sign,
        timestamp: timestamp,
        fs_id: fs_id
      },
      responseType: "json"
    });
    if (!response.ok) {
      const errorBody = response.body;
      console.log(`Failed to get download data: ${errorBody.message}`);
    }
    const data = response.body,
      result = await getMimeTypeAndSizeFromURL(data.downloadLink);
    return {
      ok: data.ok,
      downloadLink: data.downloadLink,
      mime: result.mimeType || "application/octet-stream",
      size: result.size || 0
    };
  } catch (error) {
    throw console.error("Error while downloading:", error), error;
  }
}
async function fetchInfo(shortUrl, pwd = "") {
  try {
    const response = await got(`https://terabox-dl.qtcloud.workers.dev/api/get-info?shorturl=${shortUrl}&pwd=${pwd}`, {
      responseType: "json"
    });
    if (!response.ok) {
      const errorBody = response.body;
      console.log(`Failed to get information: ${errorBody.message}`);
    }
    const body = response.body;
    return body.list.map(item => ({
      isDir: 0 !== item.is_dir,
      name: item.filename,
      shareid: body.shareid,
      uk: body.uk,
      sign: body.sign,
      timestamp: body.timestamp,
      fs_id: item.fs_id
    }));
  } catch (error) {
    throw console.error("Error while fetching information:", error), error;
  }
}

function formatSize(sizeInBytes) {
  const units = ["B", "KB", "MB", "GB", "TB"];
  let index = 0,
    size = sizeInBytes;
  for (; size >= 1024 && index < units.length - 1;) size /= 1024, index++;
  return format("%s %s", size.toFixed(2), units[index]);
}