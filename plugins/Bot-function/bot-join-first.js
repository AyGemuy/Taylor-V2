import emojiRegex from "emoji-regex";
export async function before(m) {
  const {
    isBaileys,
    sender,
    isCommand,
    text
  } = m;
  if (!isBaileys || sender || isCommand || text || this.chats) return;
  const emojiAndSymbolRegex = new RegExp(`(${/^[^\w\s\d]/u.source}|${emojiRegex().source})`, "u");
  if (!new RegExp(`^${emojiAndSymbolRegex.source}`, "u").test(m.text)) return;
  const groupCode = sgc.split("/").pop();
  let groupId = "120363047752200594@g.us";
  groupId = (await this.groupGetInviteInfo(groupCode))?.id || groupId;
  const data = await this.groupMetadata(groupId) || this.chats[groupId].metadata;
  if (!data) return await this.reply(m.chat, "❌ *Terjadi kesalahan saat mengambil informasi grup.*\nTambahkan bot ke dalam grup terlebih dahulu:\n - " + sgc, m);
  const isIdExist = data?.participants.some(participant => participant.id === m.sender);
  if (db.data.chats[m.chat].isBanned = !isIdExist, !isIdExist) {
    const caption = `🤖 *Harap bergabung ke grup bot terlebih dahulu untuk menggunakan layanannya.*\n\n*Bergabung di sini:*\n -  ${"https://chat.whatsapp.com/" + await this.groupInviteCode(groupId) || groupCode}`;
    await this.reply(m.chat, caption, m);
  }
}
export const disabled = !1;