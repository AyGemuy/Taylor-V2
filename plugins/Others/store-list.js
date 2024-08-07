const handler = async (m, {
  conn,
  usedPrefix,
  command
}) => {
  const who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender,
    name = conn.getName(who),
    chat = db.data.chats[m.chat],
    msgs = db.data.msgs,
    msg = Object.entries(msgs).map(([nama, isi]) => ({
      nama: nama,
      ...isi
    }));
  if (!1 === chat.getmsg) return m.reply(`Kamu harus mengaktifkan getmsg dengan mengetik  *${usedPrefix}getmsg <teks>*`);
  else {
    if (!msg[0]) return m.reply(`Belum ada Menu yang ada di list store.\nKetik *${usedPrefix}addstore <teks>* untuk menambahkan daftar menu.`);
    {
      const pesanList = [`⚡ Hai ${name}, berikut daftar Menu yang ada di List store...`, "Akses langsung dengan mengetik namanya"];
      for (let i = 0; i < msg.length; i++) pesanList.push(`${htki} ${i + 1} ${htka}`),
        pesanList.push(`Pesan: ${msg[i].nama}\n${usedPrefix}getmsg ${msg[i].nama}\n\n${htjava}`),
        pesanList.push(`${dmenub} *ID:* ${msg[i].key.id}`), pesanList.push(`${dmenub} *Type:* ${Object.keys(msg[i].message)}`),
        pesanList.push(`${dmenub} *Jid:* ${msg[i].key.remoteJid.replace(/@.+/, "")}\n${dmenuf}`);
      m.reply(pesanList.join("\n")), m.reply(`☂️ ${command} Klik Disini ☂️`);
    }
  }
};
handler.help = ["store"].map(v => `list${v}`), handler.tags = ["database"],
  handler.command = ["liststore"];
export default handler;