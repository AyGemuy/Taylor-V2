import cheerio from "cheerio";
import fetch from "node-fetch";
import {
  apkdl,
  apkcombo,
  aptoide
} from "../../lib/scraper/scraper-apk.js";
const handler = async (m, {
  conn,
  args,
  usedPrefix,
  text,
  command
}) => {
  let lister = ["search", "app"],
    [feature, inputs, inputs_, inputs__, inputs___] = text.split("|");
  if (!lister.includes(feature)) return m.reply("*Example:*\n.apkdl search|vpn\n\n*Pilih type yg ada*\n" + lister.map((v, index) => "  ○ " + v).join("\n"));
  if (lister.includes(feature)) {
    if ("search" === feature) {
      if (!inputs) return m.reply("Input query link\nExample: .apkdl search|vpn");
      m.react(wait);
      try {
        let teks = (await apkdl.search(inputs)).map((item, index) => `🔍 *[ RESULT ${index + 1} ]*\n📰 *Title:* ${item.name}\n🔗 *Url:* ${item.link}`).filter(v => v).join("\n\n________________________\n\n");
        m.reply(teks);
      } catch (e) {
        m.react(eror);
      }
    }
    if ("app" === feature) {
      if (!inputs) return m.reply("Input query link\nExample: .apkdl app|link");
      try {
        let resl = await apkdl.download(inputs),
          cap = "*Name:* " + resl.appname + "\n*Link:* " + resl.link + "\n\n" + wait;
        await conn.sendFile(m.chat, resl.img, "", cap, m), await conn.sendFile(m.chat, resl.link, resl.appname, null, m, !0, {
          quoted: m,
          mimetype: "application/vnd.android.package-archive"
        });
      } catch (e) {
        m.react(eror);
      }
    }
  }
};
handler.help = ["apkdl"], handler.tags = ["internet"], handler.command = /^(apkdl)$/i;
export default handler;