import moment from "moment-timezone";
import { pickRandom } from "../../lib/other-function.js";
const handler = async (m, { conn, command, text }) => {
  db.data.dbbot.temareply = db.data.dbbot.temareply || {
    contextInfo: {},
  };
  let themes = {
      1: "Normal",
      2: "AdReply Small",
      3: "AdReply Large",
      4: "Newsletter",
      5: "Newsletter with AdReply Small",
      6: "Newsletter with AdReply Large",
    },
    themeDetails = {
      Normal: {
        contextInfo: {},
      },
      "AdReply Small": {
        contextInfo: {},
      },
      "AdReply Large": {
        contextInfo: {},
      },
      Newsletter: {
        contextInfo: {
          groupMentions: [],
          isForwarded: !0,
          forwardedNewsletterMessageInfo: {
            newsletterJid: "120363204654888455@newsletter",
            newsletterName: author,
            serverMessageId: -1,
          },
          businessMessageForwardInfo: {
            businessOwnerJid: businessOwnerJid(),
          },
          forwardingScore: 256,
        },
      },
      "Newsletter with AdReply Small": {
        contextInfo: {
          groupMentions: [],
          isForwarded: !0,
          forwardedNewsletterMessageInfo: {
            newsletterJid: "120363204654888455@newsletter",
            newsletterName: author,
            serverMessageId: -1,
          },
          businessMessageForwardInfo: {
            businessOwnerJid: businessOwnerJid(),
          },
          forwardingScore: 256,
        },
      },
      "Newsletter with AdReply Large": {
        contextInfo: {
          groupMentions: [],
          isForwarded: !0,
          forwardedNewsletterMessageInfo: {
            newsletterJid: "120363204654888455@newsletter",
            newsletterName: author,
            serverMessageId: -1,
          },
          businessMessageForwardInfo: {
            businessOwnerJid: businessOwnerJid(),
          },
          forwardingScore: 256,
        },
      },
    };
  if (text) {
    let themeIndex = parseInt(text);
    if (isNaN(themeIndex) || !themes[themeIndex])
      return void (await conn.reply(
        m.chat,
        "Input tidak valid. Silakan pilih tema dari daftar berikut:\n" +
          Object.entries(themes)
            .map(([id, theme]) => `*${id}.* ${theme}`)
            .join("\n"),
        m,
      ));
    const themeKey = themes[themeIndex],
      themeDetail = themeDetails[themeKey];
    if (themeIndex) {
      delete db.data.dbbot.temareply;
    }
    (db.data.dbbot.temareply = themeDetail),
      await conn.reply(
        m.chat,
        "Tema berhasil diatur\n" + themeIndex + ". " + themeKey,
        m,
      );
  } else
    await conn.reply(
      m.chat,
      "Input tidak valid. Silakan pilih tema dari daftar berikut:\n" +
        Object.entries(themes)
          .map(([id, theme]) => `*${id}.* ${theme}`)
          .join("\n"),
      m,
    );
};
(handler.help = ["temareply"]),
  (handler.tags = ["owner"]),
  (handler.command = /^(temareply)$/i),
  (handler.owner = !0);
export default handler;

function businessOwnerJid() {
  return (
    pickRandom([
      nomorown,
      "0",
      "628561122343",
      "6288906250517",
      "6282195322106",
      "6281119568305",
      "6281282722861",
      "6282112790446",
    ]) + "@s.whatsapp.net"
  );
}
