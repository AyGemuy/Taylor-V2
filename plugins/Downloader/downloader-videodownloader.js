import cheerio from "cheerio";
import {
  fetch
} from "undici";
const handler = async (m, {
  conn,
  args,
  usedPrefix,
  command
}) => {
  const msg = `Input link atau reply link yang ingin di download!\n\n*Contoh:*\n${usedPrefix + command} link`;
  let text;
  if (args.length >= 1) text = args.join(" ");
  else {
    if (!m.quoted || !m.quoted?.text) throw msg;
    text = m.quoted?.text;
  }
  m.react(wait);
  const query = text.trim();
  try {
    const result = await videodownloader(query);
    await conn.reply(m.chat, JSON.stringify(result), m);
  } catch (error) {
    await conn.reply(m.chat, error, m);
  }
};
handler.help = ["videodownloader *[link/query]*"], handler.tags = ["downloader"],
  handler.command = /^(videodownloader)$/i;
export default handler;
async function videodownloader(input) {
  const url = "https://videodownloader.so/download?v=" + input;
  try {
    const response = await fetch(url),
      $ = cheerio.load(await response.text()),
      info = $(".info .title").text().trim(),
      durationRaw = $(".duration").text().replace("Duration:", "").trim().split(":").map(Number),
      durationFormatted = durationRaw[2] + 60 * durationRaw[1] + 3600 * durationRaw[0] + " detik";
    return {
      info: info,
      duration: durationFormatted,
      videoInfo: $("#video-downloads .downloadsTable tbody tr").map((_, element) => {
        const qualityRaw = $(element).find("td:nth-child(1)").text().trim().split("x").map(part => part.trim())[0]?.replace(/^\d+$/, x => x + "p"),
          format = $(element).find("td:nth-child(2)").text().trim().toLowerCase(),
          sizeRaw = $(element).find("td.size").text().trim().toLowerCase();
        return {
          quality: qualityRaw,
          format: format,
          size: ("-" === sizeRaw ? "-" : parseFloat(sizeRaw)) + " MB",
          downloadLink: $(element).find("td a.downloadBtn").attr("href")
        };
      }).get()
    };
  } catch (error) {
    throw console.error("Error fetching data:", error.message), error;
  }
}