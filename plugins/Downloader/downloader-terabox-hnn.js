import fetch from "node-fetch";
class TeraboxHnn {
  async getInfo(inputUrl) {
    try {
      const url = `https://terabox.hnn.workers.dev/api/get-info?shorturl=${inputUrl.split("/").pop()}&pwd=`;
      const headers = {
        "User-Agent":
          "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Mobile Safari/537.36",
        Referer: "https://terabox.hnn.workers.dev/",
      };
      const response = await fetch(url, {
        headers: headers,
      });
      if (!response.ok) {
        throw new Error(
          `Gagal mengambil informasi file: ${response.status} ${response.statusText}`,
        );
      }
      return await response.json();
    } catch (error) {
      console.error("Gagal mengambil informasi file:", error);
      throw error;
    }
  }
  async getDownloadLink(fsId, shareid, uk, sign, timestamp) {
    try {
      const url = "https://terabox.hnn.workers.dev/api/get-download";
      const headers = {
        "Content-Type": "application/json",
        "User-Agent":
          "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Mobile Safari/537.36",
        Referer: "https://terabox.hnn.workers.dev/",
      };
      const data = {
        shareid: shareid,
        uk: uk,
        sign: sign,
        timestamp: timestamp,
        fs_id: fsId,
      };
      const response = await fetch(url, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error(
          `Gagal mengambil link download: ${response.status} ${response.statusText}`,
        );
      }
      return await response.json();
    } catch (error) {
      console.error("Gagal mengambil link download:", error);
      throw error;
    }
  }
  async download(inputUrl, index) {
    try {
      const { list, shareid, uk, sign, timestamp } =
        await this.getInfo(inputUrl);
      if (!list || !list[index]) {
        throw new Error(`File tidak ditemukan pada indeks ${index}`);
      }
      const fsId = list[index].fs_id;
      const { downloadLink } = await this.getDownloadLink(
        fsId,
        shareid,
        uk,
        sign,
        timestamp,
      );
      return downloadLink;
    } catch (error) {
      console.error("Gagal mengunduh file:", error);
      throw error;
    }
  }
}
const handler = async (m, { conn, command, args, usedPrefix }) => {
  try {
    const text = args.length ? args.join(" ") : m.quoted?.text || null;
    if (!text)
      return m.reply(
        `Masukkan teks atau balas pesan.\nContoh: *${usedPrefix}${command}* Hai!`,
      );
    const isAll = text.endsWith("--all");
    const urlPattern = /https?:\/\/[^\s]+/;
    const match = text.match(urlPattern);
    const url = match ? match[0] : null;
    console.log(url);
    if (!url) return m.reply("URL Terabox tidak ditemukan dalam teks.");
    m.react(wait);
    const teraboxhnn = new TeraboxHnn();
    const { list, shareid, uk, sign, timestamp } =
      await teraboxhnn.getInfo(url);
    if (isAll) {
      for (const [index, media] of list.entries()) {
        const downloadLink = await teraboxhnn.getDownloadLink(
          media.fs_id,
          shareid,
          uk,
          sign,
          timestamp,
        );
        console.log(downloadLink);
        await conn.sendMessage(
          m.chat,
          {
            video: {
              url: downloadLink,
            },
            mimetype: "video/mp4",
            caption: `🎥 Video *${index + 1}*\nKualitas: *${media.quality}*`,
          },
          {
            quoted: m,
          },
        );
      }
    } else {
      const downloadLink = await teraboxhnn.download(url, 0);
      console.log(downloadLink);
      await conn.sendMessage(
        m.chat,
        {
          video: {
            url: downloadLink,
          },
          mimetype: "video/mp4",
          caption: `🎥 Video\nKualitas: *${list[0].quality}*`,
        },
        {
          quoted: m,
        },
      );
    }
    m.react(sukses);
  } catch (e) {
    console.error(e);
    m.react(eror);
  }
};
handler.help = ["teraboxhnn"].map((v) => v + " <query>");
handler.tags = ["downloader"];
handler.command = /^(teraboxhnn)$/i;
export default handler;
