import fetch from "node-fetch";
import AdmZip from "adm-zip";
const searchFontic = async (query) => {
  try {
    const url = "https://fontic.xyz/search";
    const body = JSON.stringify({
      query: query,
      offset: 0,
    });
    const headers = {
      "Content-Type": "application/json",
      Accept: "*/*",
      "X-Requested-With": "XMLHttpRequest",
      "User-Agent":
        "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Mobile Safari/537.36",
      Referer:
        "https://fontic.xyz/?ref=taaft&utm_source=taaft&utm_medium=referral",
    };
    const response = await fetch(url, {
      method: "POST",
      headers: headers,
      body: body,
      compress: true,
    });
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    const result = await response.json();
    return result.results.map((item) => ({
      ...item,
      fontUrl: `https://fontic.xyz/static/${item.font.toLowerCase().replace(/\s+/g, "")}.ttf`,
    }));
  } catch (error) {
    throw new Error(`Error fetching fontic: ${error.message}`);
  }
};
const handler = async (m, { conn, args, usedPrefix, command }) => {
  const inputText = args.length
    ? args.join(" ")
    : m.quoted?.text || m.quoted?.caption || m.quoted?.description || null;
  if (!inputText)
    return m.reply(
      `Masukkan teks atau reply pesan dengan teks yang ingin diolah.\nContoh penggunaan:\n*${usedPrefix}${command} Hai, apa kabar?*`,
    );
  m.react(wait);
  try {
    const query = inputText.replace("--all", "").trim();
    let fonts;
    try {
      fonts = await searchFontic(query);
    } catch (error) {
      return m.reply(`Gagal mengambil font: ${error.message}`);
    }
    const zip = new AdmZip();
    const allFonts = inputText.match("--all");
    let totalFonts = allFonts ? fonts.length : 1;
    try {
      for (const [index, font] of (allFonts ? fonts : [fonts[0]]).entries()) {
        try {
          const res = await fetch(font.fontUrl);
          const buffer = await res.arrayBuffer();
          zip.addFile(`${font.font}.ttf`, Buffer.from(buffer));
        } catch (error) {
          console.error(`Gagal mengunduh font ${font.font}: ${error.message}`);
          continue;
        }
      }
    } catch (error) {
      return m.reply(`Gagal memproses font: ${error.message}`);
    }
    const zipBuffer = zip.toBuffer();
    const total = `${allFonts ? fonts.length : 1} of ${fonts.length}`;
    const usageMessage =
      fonts.length > 1 && !allFonts
        ? `\nGunakan ${usedPrefix + command} [query] *--all* untuk zip semua font.`
        : "";
    try {
      await conn.sendMessage(
        m.chat,
        {
          document: zipBuffer,
          fileName: `Fontic.zip`,
          caption: `*\`Total font ${total}\`*${usageMessage}`,
          mimetype: "application/zip",
        },
        {
          quoted: m,
        },
      );
    } catch (error) {
      throw new Error(`Gagal mengirim file: ${error.message}`);
    }
    m.react(sukses);
  } catch (error) {
    console.error("Handler error:", error);
    m.react(eror);
  }
};
handler.help = ["fontic"];
handler.tags = ["tools"];
handler.command = /^(fontic)$/i;
export default handler;
