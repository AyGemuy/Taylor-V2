const handler = async (m, { conn, usedPrefix, command }) => {
  try {
    const who =
      m.mentionedJid && m.mentionedJid[0]
        ? m.mentionedJid[0]
        : m.fromMe
          ? conn.user.jid
          : m.sender;
    const name = conn.getName(who);
    const chat = db.data.chats[m.chat];
    const msgs = db.data.msgs;
    const msg = Object.entries(msgs).map(([nama, isi]) => ({
      nama: nama,
      ...isi,
    }));
    if (!chat.getmsg) {
      await conn.reply(
        m.chat,
        "Kamu harus mengaktifkan getmsg dengan mengetik\n.on getmsg",
        m,
      );
      return;
    }
    if (msg.length > 0) {
      const listSections = msg.map((v, index) => [
        `${htki} ${++index} ${htka}`,
        [
          [
            `Pesan: ${v.nama}`,
            `${usedPrefix}getmsg ${v.nama}`,
            `\n\n${htjava}\n${dmenub} *ID:* ${v.key.id}\n${dmenub} *Type:* ${Object.keys(v.message)}\n${dmenub} *Jid:* ${v.key.remoteJid.replace(/@.+/, "")}\n${dmenuf}`,
          ],
        ],
      ]);
      return conn.sendList(
        m.chat,
        `${htki} 📺 LIST MESSAGE 🔎 ${htka}`,
        `⚡ Hai ${name}, berikut daftar menu yang ada di list msg...\nAkses langsung dengan mengetik namanya`,
        author,
        `☂️ ${command} Klik Disini ☂️`,
        listSections,
        m,
      );
    }
    throw `\nBelum ada Menu yang ada di list msg.\nKetik *${usedPrefix + command} <teks>* untuk menambahkan daftar menu.\n`;
  } catch (error) {
    await conn.reply(m.chat, error, m);
  }
};
handler.help = [
  "all",
  "doc",
  "vn",
  "msg",
  "store",
  "video",
  "gif",
  "audio",
  "img",
  "sticker",
].map((v) => "list" + v);
handler.tags = ["database"];
handler.command =
  /^(list)(all|vn|doc|msg|store|video|audio|img|stic?ker|gif)$/i;
export default handler;
