import fetch from "node-fetch";
const SaveWeb2zip = async (link, options = {}) => {
  const apiUrl = "https://copier.saveweb2zip.com";
  let attempts = 0;
  let md5;
  try {
    const copyResponse = await fetch(`${apiUrl}/api/copySite`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "User-Agent":
          "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Mobile Safari/537.36",
        Referer: "https://saveweb2zip.com/en",
      },
      body: JSON.stringify({
        url: link,
        renameAssets: options.renameAssets || false,
        saveStructure: options.saveStructure || false,
        alternativeAlgorithm: options.alternativeAlgorithm || false,
        mobileVersion: options.mobileVersion || false,
      }),
    });
    ({ md5 } = await copyResponse.json());
    if (!md5) throw new Error("Failed to retrieve MD5 hash");
    while (attempts < 10) {
      const statusResponse = await fetch(`${apiUrl}/api/getStatus/${md5}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "User-Agent":
            "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Mobile Safari/537.36",
          Referer: "https://saveweb2zip.com/en",
        },
      });
      const statusResult = await statusResponse.json();
      if (statusResult.isFinished) {
        const downloadResponse = await fetch(
          `${apiUrl}/api/downloadArchive/${md5}`,
          {
            method: "GET",
            headers: {
              "User-Agent":
                "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Mobile Safari/537.36",
              Referer: "https://saveweb2zip.com/en",
            },
          },
        );
        const buffer = await downloadResponse.arrayBuffer();
        const fileName = `${md5}.zip`;
        return {
          fileName: fileName,
          buffer: buffer,
          link: `${apiUrl}/api/downloadArchive/${md5}`,
        };
      }
      await new Promise((resolve) => setTimeout(resolve, 6e4));
      attempts++;
    }
    throw new Error("Timeout: Max attempts reached without completion");
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
};
const handler = async (m, { conn, args, usedPrefix, command }) => {
  try {
    const text = args.length ? args.join(" ") : m.quoted?.text || null;
    if (!text)
      return m.reply(
        `Masukkan teks atau balas pesan.\nContoh: *${usedPrefix}${command}* Hai!`,
      );
    const urlPattern = /https?:\/\/[^\s]+/;
    const match = text.match(urlPattern);
    const url = match ? match[0] : null;
    if (!url) return m.reply("URL tidak ditemukan dalam teks.");
    m.react(wait);
    const result = await SaveWeb2zip(url);
    const caption = `Downloaded file: ${result.fileName}\n${result.link}`;
    await conn.sendMessage(
      m.chat,
      {
        document: Buffer.from(result.buffer),
        mimetype: "application/zip",
        fileName: result.fileName,
        caption: caption,
      },
      {
        quoted: m,
      },
    );
    m.react(sukses);
  } catch (error) {
    console.log(`Error: ${error}`);
    m.react(eror);
  }
};
handler.help = ["saveweb2zip <url>"];
handler.command = /^(saveweb2zip)$/i;
handler.limit = 3;
export default handler;
