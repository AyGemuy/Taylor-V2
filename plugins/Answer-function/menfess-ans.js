import fs from "fs";
const delay = time => new Promise(res => setTimeout(res, time));
export async function before(m) {
  if (!m.chat?.endsWith("@s.whatsapp.net")) return !0;
  const database = db.data.database.menfess;
  const mf = Object.values(database).find(v => !1 === v.status && v.penerima === m.sender);
  if (!mf) return !0;
  if (console.log({
      text: m.text,
      type: m.quoted?.mtype
    }), "BALAS PESAN" !== m.text && "" !== m.text || "buttonsMessage" !== m.quoted?.mtype) {
    flaaa.getRandom();
    const txt = `Hᴀɪ ᴋᴀᴋ @${mf.dari.split("@")[0]}, ᴋᴀᴍᴜ ᴍᴇɴᴇʀɪᴛᴇ ʙᴀʟᴀsᴀɴ ɴɪʜ. Pesan yang kamu kirim sebelumnya:\n${mf.pesan}\n\nPesan balasannya:\n${m.text}\n`.trim(),
      sblm = `Pᴇsᴀɴ Aɴᴅᴀ Sᴇʙᴇʟᴜᴍɴʏᴀ ➛ ${mf.pesan}\nPᴇsᴀɴ Bᴀʟᴀsᴀɴɴʏᴀ ➨ ${m.text}`;
    await this.reply(m.chat, txt + "\n" + sblm, null).then(async () => {
      await this.reply(m.chat, "Berhasil Mengirim balasan.", null).then(() => {
        delay(1500), delete database[mf.id];
      });
    });
  } else await this.reply(m.chat, "Silahkan kirim pesan balasan kamu.\nKetik pesan sesuatu lalu kirim, maka pesan otomatis masuk ke target balas pesan", null).then(() => {
    m.reply("Silahkan kirim pesan balasan kamu.\nKetik pesan sesuatu lalu kirim, maka pesan otomatis masuk ke target balas pesan.");
  });
  return !0;
}