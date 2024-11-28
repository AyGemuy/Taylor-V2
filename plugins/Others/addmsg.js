const { proto } = await (await import("@whiskeysockets/baileys")).default;
const handler = async (m, { conn, text, command, usedPrefix }) => {
  try {
    if (!m.quoted)
      return m.reply(`Balas pesan dengan perintah *${usedPrefix + command}*`);
    if (!text)
      return m.reply(
        `Penggunaan: ${usedPrefix + command} <teks>\n\nContoh:\n${usedPrefix + command} tes`,
      );
    let msgs = db.data.msgs || {};
    if (text in msgs) return m.reply(`'${text}' telah terdaftar di List Msg`);
    let quotedMsg =
      (await m.getQuotedObj()) || (await m.getQuotedMessage()) || m.quoted?.vM;
    if (!quotedMsg.message)
      return m.reply(
        "Pesan yang dibalas tidak memiliki konten yang bisa disimpan.",
      );
    const M = proto.WebMessageInfo;
    msgs[text] = conn.serializeM(M.fromObject(M.toObject(quotedMsg)));
    db.data.msgs = msgs;
    m.reply(
      `Berhasil menambahkan '${text}' ke List Msg.\n\nAkses dengan mengetik namanya.`,
    );
  } catch {
    m.reply("Terjadi kesalahan dalam memproses perintah.");
  }
};
handler.help = [
  "vn",
  "msg",
  "store",
  "video",
  "audio",
  "img",
  "stiker",
  "gif",
].map((v) => "add" + v + " <teks>");
handler.tags = ["database"];
handler.command = /^add(vn|msg|store|video|audio|img|stic?ker|gif)$/i;
export default handler;
