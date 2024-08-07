const handler = async (m, {
  conn,
  usedPrefix,
  command
}) => {
  let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender,
    name = conn.getName(who),
    chat = db.data.chats[m.chat],
    msgs = db.data.msgs,
    msg = Object.entries(msgs).map(([nama, isi]) => ({
      nama: nama,
      ...isi
    })),
    listSections = [];
  if (Object.values(msg).map((v, index) => {
      listSections.push([htki + " " + ++index + " " + htka, [
        ["Pesan: " + v.nama, usedPrefix + "getmsg " + v.nama, "\n\n" + htjava + "\n" + dmenub + " *ID:* " + v.key.id + "\n" + dmenub + " *Type:* " + Object.keys(v.message) + "\n" + dmenub + " *Jid:* " + v.key.remoteJid.replace(/@.+/, "") + "\n" + dmenuf]
      ]]);
    }), !1 === chat.getmsg) return await conn.reply(m.chat, "kamu harus mengaktifkan getmsg dengan mengetik\n.on getmsg", m);
  if (msg[0]) return conn.sendList(m.chat, htki + " 📺 LIST MESSAGE 🔎 " + htka, `⚡ Hai ${name} Berikut daftar Menu yg Ada di List msg...\nAkses langsung dengan mengetik namanya`, author, `☂️ ${command} Klik Disini ☂️`, listSections, m);
  throw `\nBelum ada Menu yg Ada di list msg.\nketik *${usedPrefix + command} <teks>* untuk menambahkan daftar menu.\n`;
};
handler.help = ["all", "doc", "vn", "msg", "video", "gif", "audio", "img", "sticker"].map(v => "list" + v),
  handler.tags = ["database"], handler.command = /^(daftar|list)(all|vn|doc|msg|video|audio|img|stic?ker|gif)$/;
export default handler;