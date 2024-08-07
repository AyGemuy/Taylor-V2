export async function all(m, {
  chatUpdate
}) {
  this.exam = this.exam ? this.exam : {};
  let msg = chatUpdate.messages[0];
  if (this.exam[m.chat]) {
    if (!msg.message.extendedTextMessage) return;
    if (msg.message.extendedTextMessage.text !== this.exam[m.chat][3] && msg.message.extendedTextMessage.text !== this.exam[m.chat][4] && msg.message.extendedTextMessage.text !== this.exam[m.chat][5]) return;
    msg.message.extendedTextMessage.text === this.exam[m.chat][1].trim() ? (m.reply("✅ Kamu benar.. jawabannya adalah " + this.exam[m.chat][1]), clearTimeout(this.exam[m.chat][2]), delete this.exam[m.chat]) : (m.reply("Jawaban kamu salah, soal berkahir"), clearTimeout(this.exam[m.chat][2]), delete this.exam[m.chat]);
  }
}