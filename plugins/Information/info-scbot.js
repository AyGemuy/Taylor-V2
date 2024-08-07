import moment from "moment-timezone";
import fetch from "node-fetch";
const handler = async (m, {
  conn,
  args
}) => {
  let res = await fetch("https://api.github.com/repos/AyGemuy/Taylor-V2"),
    json = await res.json(),
    txt = "*乂  B O T  -  S C R I P T*\n\n";
  txt += `\t◦  *Name* : ${json.name}\n`, txt += `\t◦  *Visitor* : ${json.watchers_count}\n`,
    txt += `\t◦  *Size* : ${(json.size / 1024).toFixed(2)} MB\n`, txt += `\t◦  *Updated* : ${moment(json.updated_at).format("DD/MM/YY - HH:mm:ss")}\n`,
    txt += `\t◦  *Url* : ${json.html_url}\n\n`, txt += `\t   ${json.forks_count} Forks · ${json.stargazers_count} Stars · ${json.open_issues_count} Issues\n\n`,
    txt += author, await conn.relayMessage(m.chat, {
      requestPaymentMessage: {
        currencyCodeIso4217: "INR",
        amount1000: fsizedoc,
        requestFrom: "0@s.whatsapp.net",
        noteMessage: {
          extendedTextMessage: {
            text: txt,
            contextInfo: {
              mentionedJid: [m.sender],
              externalAdReply: {
                showAdAttribution: !0
              }
            }
          }
        }
      }
    }, {});
};
handler.help = ["scbot"], handler.tags = ["info"], handler.command = /^sc(ript(bot)?|bot)?$/i;
export default handler;