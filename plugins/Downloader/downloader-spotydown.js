import fetch from "node-fetch";
class SpotifyDownloader {
  constructor() {
    this.api = "https://spotydown.media/api";
    this.headers = {
      Authority: "spotydown.media",
      Accept: "*/*",
      "Content-Type": "application/json",
      Origin: "https://spotydown.media",
      Referer: "https://spotydown.media/",
      "User-Agent": "Postify/1.0.0",
      "X-Forwarded-For": new Array(4)
        .fill()
        .map(() => Math.floor(Math.random() * 256))
        .join("."),
    };
  }
  async makeRequest(endpoint, data) {
    console.log(`Request to ${endpoint} with data:`, data);
    try {
      const response = await fetch(`${this.api}/${endpoint}`, {
        method: "POST",
        headers: this.headers,
        body: JSON.stringify(data),
      });
      const result = await response.json();
      console.log(`Response from ${endpoint}:`, result);
      return result;
    } catch (error) {
      console.error("Error occurred:", error.message);
      throw error;
    }
  }
  async fetchMetadata(link) {
    console.log(`Fetching metadata for link: ${link}`);
    return await this.makeRequest("get-metadata", {
      url: link,
    });
  }
  async fetchTrackDownload(link) {
    console.log(`Downloading track for link: ${link}`);
    return await this.makeRequest("download-track", {
      url: link,
    });
  }
  async fetchFile(fileUrl) {
    console.log(`Fetching file from URL: ${fileUrl}`);
    try {
      const response = await fetch(fileUrl, {
        headers: this.headers,
      });
      console.log("File response received");
      return await response.arrayBuffer();
    } catch (error) {
      console.error("Error occurred while fetching file:", error.message);
      throw error;
    }
  }
}
const handler = async (m, { conn, args }) => {
  let text = args.length
    ? args.join(" ")
    : m.quoted?.text || m.quoted?.caption || m.quoted?.description || null;
  if (!text) return m.reply("Masukan query!");
  const downloader = new SpotifyDownloader();
  m.react(wait);
  try {
    const isSpotifyLink = text.includes("spotify.com/track/");
    const link = isSpotifyLink ? text : null;
    if (link) {
      console.log(`Processing Spotify link: ${link}`);
      const metadataResponse = await downloader.fetchMetadata(link);
      const metadata = metadataResponse.apiResponse?.data?.[0];
      if (!metadata || !metadata.success)
        throw new Error("Failed to retrieve metadata");
      const {
        name: title,
        artist,
        album_name: album,
        cover_url: image,
        releaseDate,
      } = metadata;
      const downloadResponse = await downloader.fetchTrackDownload(link);
      const fileUrl = downloadResponse.file_url;
      const msg = `
🎶 *Title:* ${title}
🎤 *Artist:* ${artist}
🎆 *Album:* ${album}
⏱️ *Release Date:* ${releaseDate}
📥 *Download:* ${fileUrl}
            `;
      await conn.sendMessage(m.chat, {
        image: {
          url: image,
        },
        caption: msg,
      });
      if (fileUrl) {
        const stream = await downloader.fetchFile(fileUrl);
        await conn.sendMessage(
          m.chat,
          {
            audio: Buffer.from(stream),
            mimetype: "audio/mp4",
            fileName: `${title}.mp3`,
          },
          {
            quoted: m,
          },
        );
        m.react(sukses);
      }
    }
  } catch (e) {
    console.error("Handler error:", e);
    m.react(eror);
  }
};
handler.help = ["spotydown <url>"];
handler.tags = ["internet"];
handler.command = /^(spotydown)$/i;
export default handler;
