import {
  youtubedl,
  youtubedlv2
} from "@bochilteam/scraper";
const limit = 80;
export async function before(m) {
  if (m.isBaileys || !m.text) return !1;
  const matches = m.text.trim().match(/^https?:\/\/(www\.)?youtube\.com\/watch\?v=[a-zA-Z0-9_-]{11}$/),
    chat = db.data.chats[m.chat];
  if (matches && matches[0] && !0 === chat.autodlYoutube) {
    m.react(wait);
    try {
      const q = "360p",
        v = matches[0],
        yt = await youtubedl(v).catch(async () => await youtubedlv2(v)),
        dl_url = await yt.video[q].download(),
        title = await yt.title,
        size = await yt.video[q].fileSizeH;
      if (size.split("MB")[0] >= 80) return m.reply(` ≡  *Youtube Downloader*\n\n▢ *⚖️Size* : ${size}\n▢ *🎞️quality* : ${q}\n\n▢ _The file exceeds the download limit_ *+80 MB*`);
      const captvid = `\n ≡  *Youtube Downloader*\n  \n▢ *📌Títle* : ${title}\n▢ *📟 Ext* : mp4\n▢ *🎞️Quality* : ${q}\n▢ *⚖️Size* : ${size}\n`.trim(),
        doc = {
          video: {
            url: dl_url
          },
          mimetype: "video/mp4",
          caption: captvid,
          contextInfo: {
            externalAdReply: {
              showAdAttribution: !0,
              mediaType: 2,
              mediaUrl: v,
              title: title,
              body: "Downloading audio succes",
              sourceUrl: v,
              thumbnail: await (await this.getFile(yt.thumbnail)).data
            }
          }
        };
      await this.sendMessage(m.chat, doc, {
        quoted: m
      });
    } catch (e) {}
  }
}
export const disabled = !1;