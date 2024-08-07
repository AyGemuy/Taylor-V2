const {
  proto
} = await import("@whiskeysockets/baileys");
const handler = async (m, {
  conn,
  text,
  command,
  usedPrefix
}) => {
  try {
    let M = proto.WebMessageInfo;
    if (!m.quoted) {
      throw `Balas pesan dengan perintah *${usedPrefix + command}*`;
    }
    if (!text) {
      throw `Penggunaan: ${usedPrefix + command} <teks>\n\nContoh:\n${usedPrefix + command} tes`;
    }
    let msgs = db.data.msgs;
    if (text in msgs) {
      throw `'${text}' telah terdaftar di List Msg`;
    }
    msgs[text] = M.fromObject(await m.getQuotedObj()).toJSON();
    m.reply(`Berhasil menambahkan ${text} ke List Msg.\n\nAkses dengan mengetik namanya`.trim());
  } catch (error) {
    console.error(error);
    m.reply(`Terjadi kesalahan dalam memproses perintah.`);
  }
};
handler.help = ["vn", "msg", "video", "audio", "img", "stiker", "gif"].map(v => "add" + v + " <teks>");
handler.tags = ["database"];
handler.command = /^add(vn|msg|video|audio|img|stic?ker|gif)$/;
export default handler;