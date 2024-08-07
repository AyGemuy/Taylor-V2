import moment from "moment-timezone";
import gplay from "google-play-scraper";
const handler = async (m, {
  conn,
  text,
  usedPrefix,
  command
}) => {
  let [url, appId] = text.match(/([a-zA-Z]+(\.[a-zA-Z]+)+)/g) || [];
  if ("play.google.com" !== url) throw `Ex: ${usedPrefix + command} https://play.google.com/store/apps/details?id=com.whatsapp`;
  let res = await gplay.app({
      appId: appId
    }),
    {
      title,
      summary,
      installs,
      scoreText,
      priceText,
      size,
      androidVersionText,
      developer,
      icon,
      screenshots,
      released,
      updated,
      version
    } = res,
    str = `📚 *Title:* ${title || "Tidak diketahui"}\n  ${summary || "Tidak diketahui"}\n💾 *Installs:* ${installs || "Tidak diketahui"}\n⭐️ *Score:* ${scoreText || "Tidak diketahui"}\n💲 *Price:* ${priceText || "Tidak diketahui"}\n📏 *Size:* ${size || "Tidak diketahui"}\n📱 *Android Ver:* ${androidVersionText || "Tidak diketahui"}\n👩‍💻 *Dev:* ${developer || "Tidak diketahui"}\n📅 *Released:* ${released || "Tidak diketahui"}\n🔄 *Updated:* ${moment(updated).locale("en").format("MMM D, Y") || "Tidak diketahui"}\n🆕 *Version:* ${version || "Tidak diketahui"}`,
    opt = {
      contextInfo: {
        externalAdReply: {
          title: title,
          body: summary,
          thumbnail: (await conn.getFile(icon)).data,
          sourceUrl: res.url
        }
      }
    };
  conn.sendMessage(m.chat, {
    image: {
      url: screenshots.getRandom()
    },
    caption: str,
    ...opt
  }, {
    quoted: m
  });
};
handler.command = /^(apk(info|detail))$/i;
export default handler;