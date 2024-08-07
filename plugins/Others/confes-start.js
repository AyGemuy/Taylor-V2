const handler = async (m, {
  conn,
  text,
  usedPrefix,
  command
}) => {
  const database = db.data.database.confess;
  if (database, !text) throw `*Cara penggunaan :*\n\n${usedPrefix + command} nomor|nama pengirim|pesan\n\n*Note:* nama pengirim boleh nama samaran atau anonymous.\n\n*Contoh:* ${usedPrefix + command} ${m.sender.split("@")[0]}|Nama|Halo.\n\n${author}`;
  const [jid, name, pesan] = text.split("|");
  if (!jid || !name || !pesan) throw `*Cara penggunaan :*\n\n${usedPrefix + command} nomor|nama pengirim|pesan\n\n*Note:* nama pengirim boleh nama samaran atau anonymous.\n\n*Contoh:* ${usedPrefix + command} ${m.sender.split("@")[0]}|Bapakmu|Halo.\n\n${author}`;
  jid = jid.replace(/[^0-9]/g, "") + "@s.whatsapp.net";
  const data = (await conn.onWhatsApp(jid))[0] || {};
  if (!data.exists) throw "Nomer tidak terdaftar di whatsapp.";
  if (jid === m.sender) throw "tidak bisa mengirim pesan confess ke diri sendiri.";
  if (Object.values(database).find(mf => !0 === mf.status)) return !0;
  try {
    const id = +new Date(),
      txt = `Hai @${data.jid.split("@")[0]}, kamu menerima pesan confess nih.\n\nDari: *${name}*\nPesan: \n${pesan}\n\nMau balas pesan ini kak? bisa kak. kakak tinggal ketik pesan kakak nanti saya sampaikan ke *${name}*.`.trim();
    await conn.reply(data.jid, txt, null).then(() => (m.reply("Berhasil mengirim pesan confess."), database[id] = {
      id: id,
      dari: m.sender,
      nama: name,
      penerima: data.jid,
      pesan: pesan,
      status: !1
    }, !0));
  } catch (e) {
    console.log(e), m.react(eror);
  }
};
handler.tags = ["menbalas"], handler.help = ["confes"].map(v => v + " <nomor|nama|pesan>"),
  handler.command = /^(confes)$/i, handler.private = !0;
export default handler;