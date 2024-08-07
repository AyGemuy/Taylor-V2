const delay = time => new Promise(res => setTimeout(res, time));
export async function before(m) {
  if (m.isBaileys || !db.data.chats[m.chat].antiCall) return;
  const edtr = `🧙‍♂️ @${m.sender.split("@")[0]} 🧙‍♂️`,
    messageType = {
      40: "📞 Kamu telat menerima panggilan suara dan panggilan tersebut telah terlewatkan.",
      41: "📹 Kamu telat menerima panggilan video dan panggilan tersebut telah terlewatkan.",
      45: "📞 Kamu telat menerima panggilan suara grup dan panggilan tersebut telah terlewatkan.",
      46: "📹 Kamu telat menerima panggilan video grup dan panggilan tersebut telah terlewatkan."
    } [m.messageStubType];
  if (messageType) {
    const cap = "Kamu Di banned + block + warn + kick oleh bot karena telah melanggar aturan bot\n\n*📮Dilarang menelepon Bot!*";
    await this.sendMessage(m.chat, {
        text: `${edtr}\n${messageType}`,
        mentions: [m.sender]
      }, {
        quoted: fakes
      }), await this.reply(m.chat, cap, m), await delay(1e3), db.data.users[m.sender].banned = !0,
      db.data.users[m.sender].warning = 1, await this.updateBlockStatus(m.sender, "block"),
      m.isGroup && await this.groupParticipantsUpdate(m.chat, [m.sender], "remove");
  } else console.log({
    messageStubType: m.messageStubType,
    messageStubParameters: m.messageStubParameters,
    type: m.messageStubType
  });
}
export const disabled = !1;