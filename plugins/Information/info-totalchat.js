import _ from "lodash";
const handler = async (m, {
  conn
}) => {
  const messages = conn.chats[m.chat].messages;
  const participantCounts = _.chain(messages).values().groupBy("key.participant").mapValues("length").value();
  const sortedData = _.chain(Object.entries(participantCounts)).sortBy(([, total]) => -total).value();
  const totalM = _.sumBy(sortedData, ([, total]) => total);
  const totalPeople = sortedData.length;
  const pesan = _.chain(sortedData).map(([jid, total], index) => `*${index + 1}.* ${jid.replace(/(\d+)@.+/, "@$1")}: *${total}* pesan`).join("\n").value();
  m.reply(`📊 *Total Pesan Terakhir*: *${totalM}* pesan dari *${totalPeople}* orang\n\n${pesan}`, null, {
    contextInfo: {
      mentionedJid: sortedData.map(([jid]) => jid)
    }
  });
};
handler.help = ["totalpesan"];
handler.tags = ["group"];
handler.command = /^(totalpesan)$/i;
handler.group = true;
export default handler;