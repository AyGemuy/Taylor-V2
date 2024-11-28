import fetch from "node-fetch";
import * as cheerio from "cheerio";
const handler = async (m, { conn, command, args, usedPrefix }) => {
  const inputText = args.length
    ? args.join(" ")
    : m.quoted?.text || m.quoted?.caption || m.quoted?.description || null;
  if (!inputText)
    return m.reply(
      `Masukkan teks atau reply pesan dengan teks yang ingin diolah.\nContoh penggunaan:\n*${usedPrefix}${command} Hai, apa kabar?*`,
    );
  m.react(wait);
  try {
    const mediafireResponse = await MediaFire(inputText);
    console.log(`MediaFire response: ${JSON.stringify(mediafireResponse)}`);
    if (!mediafireResponse?.link)
      return m.reply("Link download tidak ditemukan.");
    const infoReply = {
      contextInfo: {
        mentionedJid: [m.sender],
      },
    };
    await conn.reply(m.chat, `*\`W A I T\`*`, m, infoReply);
    const captvid = [
      mediafireResponse.name ? `📺 *Judul:* ${mediafireResponse.name}` : "",
      mediafireResponse.mime ? `🔗 *MIME:* ${mediafireResponse.mime}` : "",
      mediafireResponse.filetype
        ? `📁 *Type:* ${mediafireResponse.filetype}`
        : "",
      mediafireResponse.size ? `👁️ *Size:* ${mediafireResponse.size}` : "",
      mediafireResponse.uploaded
        ? `📆 *Uploaded:* ${mediafireResponse.uploaded}`
        : "",
    ]
      .filter(Boolean)
      .join("\n");
    console.log(`File info:\n${captvid}`);
    await conn.sendFile(
      m.chat,
      mediafireResponse.link,
      mediafireResponse.name || "file",
      captvid,
      m,
      null,
      {
        mimetype: mediafireResponse.mime || "application/octet-stream",
        asDocument: true,
      },
    );
    m.react(sukses);
    console.log(`File sent successfully: ${mediafireResponse.link}`);
  } catch (e) {
    console.log(e);
    m.react(eror);
  }
};
handler.help = ["mediafire"];
handler.tags = ["downloader"];
handler.command =
  /^m(ediafire(d(own(load(er)?)?|l))?|f(d(own(load(er)?)?|l))?)$/i;
handler.limit = true;
export default handler;
async function MediaFire(url) {
  try {
    const data = await fetch(
      `https://www-mediafire-com.translate.goog/${url.replace("https://www.mediafire.com/", "")}?_x_tr_sl=en&_x_tr_tl=fr&_x_tr_hl=en&_x_tr_pto=wapp`,
      {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.5481.178 Safari/537.36",
        },
      },
    ).then((res) => res.text());
    const $ = cheerio.load(data);
    const downloadUrl = ($("#downloadButton").attr("href") || "").trim();
    const alternativeUrl = (
      $("#download_link > a.retry").attr("href") || ""
    ).trim();
    const $intro = $("div.dl-info > div.intro");
    const filename = $intro.find("div.filename").text().trim();
    const filetype = $intro.find("div.filetype > span").eq(0).text().trim();
    const ext =
      /\(\.(.*?)\)/
        .exec($intro.find("div.filetype > span").eq(1).text())?.[1]
        ?.trim() || "bin";
    const uploaded = $("div.dl-info > ul.details > li")
      .eq(1)
      .find("span")
      .text()
      .trim();
    const filesize = $("div.dl-info > ul.details > li")
      .eq(0)
      .find("span")
      .text()
      .trim();
    return {
      link: downloadUrl || alternativeUrl,
      alternativeUrl: alternativeUrl,
      name: filename,
      filetype: filetype,
      mime: ext,
      uploaded: uploaded,
      size: filesize,
    };
  } catch (error) {
    console.error(error);
  }
}
