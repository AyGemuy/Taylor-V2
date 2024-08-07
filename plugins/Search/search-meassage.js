import fetch from "node-fetch";
import _ from "lodash";
const handler = async (m, {
  command,
  usedPrefix,
  conn,
  text,
  args
}) => {
  const lister = ["gc", "pc"];
  const [feature, inputs] = text.split("|");
  if (!lister.includes(feature)) {
    throw `*Contoh:*\n${usedPrefix}${command} pc|halo\n\n*Pilih tipe yang tersedia:*\n${lister.map(v => `  ○ ${v}`).join("\n")}`;
  }
  if (feature === "gc" || feature === "pc") {
    if (!inputs) {
      throw "Masukkan pesan yang ingin dicari";
    }
    const messages = _.flatMap(_.filter(Object.entries(conn.chats), ([nama]) => feature === "gc" ? !nama.endsWith("s.whatsapp.net") : !nama.endsWith("g.us")), ([nama, isi]) => _.values(isi.messages || []));
    const filteredMessages = messages.filter(obj => obj.message.extendedTextMessage && obj.message.extendedTextMessage.text.includes(inputs) || obj.message.conversation && obj.message.conversation.includes(inputs));
    if (_.isEmpty(filteredMessages)) {
      throw "Tidak ditemukan";
    }
    const caption = (await Promise.all(filteredMessages.map(async (v, index) => {
      const keyParticipant = v.key.participant || v.key.remoteJid;
      const username = `@${keyParticipant.split("@")[0]}`;
      const messageText = v.message.extendedTextMessage ? v.message.extendedTextMessage.text : v.message.conversation;
      return `*[ ${index + 1} ]*\n${feature === "gc" ? "*Grup:*" : "*Dari:*"}\n${conn.getName(v.key.remoteJid)}\n*Dari: ${username}*\n*Pesan:*\n${messageText}`;
    }))).filter(v => v).join("\n\n————————————\n\n");
    m.reply(_.trim(caption), m.chat, {
      mentions: conn.parseMention(caption)
    });
  }
};
handler.help = ["caripesan type|query"];
handler.tags = ["search"];
handler.command = /^(caripesan|searchmessage)$/i;
export default handler;