import fs from "fs";
const handler = async (m, {
  conn,
  number,
  text,
  usedPrefix,
  command
}) => {
  m.sender.replace(/@.+/, ""), m.sender;
  const database = db.data.database.menfess;
  if (database, !text) throw `*Cara penggunaan :*\n\n${usedPrefix + command} nomor|nama pengirim|pesan\n\n*Note:* nama pengirim boleh nama samaran atau anonymous.\n\n*Contoh:* ${usedPrefix + command} ${m.sender.split("@")[0]}|Anonymous|Hai.`;
  const [jid, name, pesan] = text.split(/[^\w\s]/g);
  if (!jid || !name || !pesan) throw `*Cara penggunaan :*\n\n${usedPrefix + command} nomor|nama pengirim|pesan\n\n*Note:* nama pengirim boleh nama samaran atau anonymous.\n\n*Contoh:* ${usedPrefix + command} ${m.sender.split("@")[0]}|Anonymous|Hai.`;
  jid = jid.replace(/[^0-9]/g, "") + "@s.whatsapp.net";
  const data = (await conn.onWhatsApp(jid))[0] || {};
  if (!data.exists) throw "Nomer tidak terdaftar di whatsapp.";
  if (jid === m.sender) throw "tidak bisa mengirim pesan menfess ke diri sendiri.";
  if (Object.values(database).find(mf => !0 === mf.status)) return !0;
  const id = +new Date(),
    tek = `Hᴀɪ Kᴀᴋ @${data.jid.split("@")[0]}, ᴋᴀᴍᴜ ᴍᴇɴᴇʀɪᴍᴀʜ ᴘᴇsᴀɴ ᴍᴀɴғᴇss ɴɪʜ.\n➴`.trim(),
    logs = `➯ Pᴇsᴀɴ : ${pesan}`,
    ssn = `〠 Dᴀʀɪ : ${name}\n⎙ Pᴇsᴀɴ : ${pesan}`;
  flaaa.getRandom();
  await conn.reply(data.jid, tek + "\n" + ssn, m, {
    contextInfo: {
      externalAdReply: {
        showAdAttribution: !0,
        mediaUrl: sig,
        mediaType: 2,
        description: sgc,
        title: "Jᴏɪɴ Sɪɴɪ Cᴜʏ",
        body: wm,
        thumbnail: fs.readFileSync("./thumbnail.jpg"),
        sourceUrl: sgc
      }
    }
  }).then(async () => (await conn.reply(m.chat, `Bᴇʀʜᴀsɪʟ Mᴇɴɢɪʀɪᴍ Pᴇsᴀɴ Kᴇ @${jid.replace(/@.+/, "")}\n` + logs, m, {
    contextInfo: {
      externalAdReply: {
        showAdAttribution: !0,
        mediaUrl: sfb,
        mediaType: 2,
        description: sgc,
        title: "Jᴏɪɴ Sɪɴɪ Cᴜʏ",
        body: wm,
        thumbnail: fs.readFileSync("./thumbnail.jpg"),
        sourceUrl: sgc
      }
    }
  }), database[id] = {
    id: id,
    dari: m.sender,
    nama: name,
    penerima: data.jid,
    pesan: pesan,
    status: !1
  }, !0));
};
handler.tags = ["main"], handler.help = ["menfess"].map(v => v + " <nomor|nama|pesan>"),
  handler.command = /^(menfess)$/i, handler.private = !0;
export default handler;