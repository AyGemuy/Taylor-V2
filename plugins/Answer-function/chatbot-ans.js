export async function before(m, {
  match
}) {
  if (!m.chat?.endsWith("@s.whatsapp.net")) return !1;
  const database = db.data.database.chatbot;
  const room = Object.values(database).find(room => [room.source, room.user].includes(m.sender) && "CHATTING" === room.state);
  if (room && /^.*(chatbot (stop|set))/.test(m.text)) return !1;
  if (room) {
    const other = [room.source, room.user].find(user => user !== m.sender);
    if (m.message.listMessage) {
      const description = m.message.listMessage.description,
        sections = m.message.listMessage.sections,
        readMore = String.fromCharCode(8206).repeat(4001);
      const sectionText = `${description}\n\n`;
      sections.forEach(section => {
        sectionText += `${readMore}\n`, section.rows.forEach(row => {
          sectionText += `${row.title}\n${row.description}\n*Send*: ${row.rowId}\n\n`;
        });
      }), await this.sendMessage(other, {
        text: sectionText
      }, {
        quoted: null
      });
    } else if (m.message.buttonsMessage) {
      const description = m.message.buttonsMessage.contentText,
        sections = m.message.buttonsMessage.buttons,
        readMore = String.fromCharCode(8206).repeat(4001);
      const sectionText = `${description}\n\n`;
      sectionText += `${readMore}\n`, sections.forEach(row => {
        sectionText += `${row.buttonText.displayText}\n*Send*: ${row.buttonId}\n\n`;
      }), await this.sendMessage(other, {
        text: sectionText
      }, {
        quoted: null
      });
    } else await this.relayMessage(other, m.message, {
      messageId: m.id
    });
  }
  return !0;
}