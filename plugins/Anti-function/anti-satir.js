import _ from "lodash";
const satirWords = ["kenao", "Bims", "Ava", "tumlul", "Tumlul", "Gwejh", "Okgey", "Siava", "Kavan", "tenan", "Amsu", "Afah", "Mgak", "lmao", "Pedo", "banh", "hooh", "Knf"];
export async function before(m, {
  isAdmin,
  isBotAdmin,
  isOwner
}) {
  if (m.isBaileys && m.fromMe) return true;
  if (!m.isGroup) return false;
  const chat = db.data.chats[m.chat];
  if (!chat.antiSatir) return true;
  const database = db.data.database.satirWords;
  database[m.chat] = database[m.chat] || [...satirWords];
  const input = m.text || m.description;
  if (input?.trim().split(/\s+/)?.[0]?.toLowerCase() === "addsatirword" && input?.trim().split(/\s+/)?.slice(1).join(" ")) {
    const newSatirWord = input?.trim().split(/\s+/)?.slice(1).join(" ");
    database[m.chat].push(newSatirWord);
    await this.reply(m.chat, `📝 *Kata satir "${newSatirWord}" telah ditambahkan.*`, m);
    return true;
  }
  if (input?.trim().split(/\s+/)?.[0]?.toLowerCase() === "delsatirword" && input?.trim().split(/\s+/)?.slice(1).join(" ")) {
    const wordToDelete = input?.trim().split(/\s+/)?.slice(1).join(" ");
    const index = _.indexOf(database[m.chat], wordToDelete);
    if (index > -1) {
      _.pullAt(database[m.chat], index);
      await this.reply(m.chat, `📝 *Kata satir "${wordToDelete}" telah dihapus.*`, m);
    } else {
      await this.reply(m.chat, `⚠️ *Kata satir "${wordToDelete}" tidak ditemukan.*`, m);
    }
    return true;
  }
  if (input?.trim().split(/\s+/)?.[0]?.toLowerCase() === "listsatirword") {
    if (database[m.chat].length > 0) {
      const list = _.map(database[m.chat], (word, i) => `${i + 1}. ${word}`).join("\n");
      await this.reply(m.chat, `📜 *Daftar kata satir:*\n${list}`, m);
    } else {
      await this.reply(m.chat, `⚠️ *Tidak ada kata satir yang terdaftar.*`, m);
    }
    return true;
  }
  const detectedWords = _.filter(database[m.chat], word => _.includes(input, word));
  if (chat.antiSatir && detectedWords.length > 0) {
    const warningMessage = `🚨 *Kata Satir Terdeteksi!*\nKata yang terdeteksi: ${detectedWords.join(", ")}\n`;
    if (!isBotAdmin) {
      warningMessage += `\n_Bot bukan admin, tidak dapat menghapus pesan._\n`;
      await this.reply(m.chat, warningMessage, m);
      return true;
    }
    db.data.users[m.sender].warn += 1;
    if (!isOwner) db.data.users[m.sender].banned = true;
    await this.sendMessage(m.chat, {
      delete: m.key
    });
    warningMessage += `\nPeringatan: ${db.data.users[m.sender].warn}\nStatus: ${db.data.users[m.sender].banned ? "Diblokir" : "Aktif"}`;
    await this.reply(m.chat, warningMessage, m);
  }
  return true;
}