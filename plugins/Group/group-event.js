import {
  randomBytes
} from "crypto";
const {
  generateWAMessageFromContent
} = await (await import("@whiskeysockets/baileys")).default;
const handler = async (m, {
  text,
  args,
  usedPrefix,
  command
}) => {
  if (!args[0]) return m.reply(`Enter a list of events, Example: ${usedPrefix + command} Ada Event Ges`);
  let [evtName, evtDesc, evtLocation, evtLink] = text.split("|");
  let msg = await generateWAMessageFromContent(m.chat, {
    messageContextInfo: {
      messageSecret: randomBytes(32)
    },
    eventMessage: {
      isCanceled: false,
      name: evtName || "Tes event",
      description: evtDesc || "Ada acara nih",
      location: {
        degreesLatitude: 0,
        degreesLongitude: 0,
        name: evtLocation || "Indonesia"
      },
      joinLink: evtLink || sgc,
      startTime: new Date() * 864e5
    }
  }, {});
  return conn.relayMessage(m.chat, msg.message, {
    messageId: msg.key.id
  });
};
handler.help = ["eventgc"].map(a => a + " *[question]*");
handler.tags = ["group"];
handler.command = ["eventgc"];
handler.group = true;
export default handler;