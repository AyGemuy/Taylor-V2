const handler = async (m, {
  conn,
  text,
  usedPrefix,
  command,
  args
}) => {
  const [jid, name, pesan] = text.split(/[^\w\s]/g);
  const database = db.data.database.menfes;
  if (jid = jid.replace(/[^0-9]/g, "") + "@s.whatsapp.net", !((await conn.onWhatsApp(jid))[0] || {}).exists) throw "Nomer tidak terdaftar di whatsapp.";
  if (jid === m.sender) throw "tidak bisa mengirim pesan Menfes ke diri sendiri.";
  const q = m.quoted ? m.quoted : m,
    mime = (q.msg || q).mimetype || "",
    tujuan = `👋 Saya *${conn.user.name}*, Pesan Untuk Kamu\n👥 Dari : *PENGIRIM RAHASIA*\n\n${htki} 💌 Pesan ${htka}\n${htjava} ${pesan}\n`,
    cap = `${htki} PESAN RAHASIA ${htka}\nAnda Ingin Mengirimkan Pesan ke pacar/sahabat/teman/doi/\nmantan?, tapi Tidak ingin tau siapa Pengirimnya?\nKamu bisa menggunakan Bot ini\nContoh Penggunaan: ${usedPrefix + command} ${nomorown} pesan untuknya\n\nContoh: ${usedPrefix + command} ${nomorown} hai`,
    suks = `Mengirim Pesan *${mime || "Teks"}*\n👥 Dari : @${m.sender.replace(/@.+/, "")}\n👥 Untuk : @${jid.replace(/@.+/, "")}\n\n${htki} 💌 Pesan ${htka}\n${htjava} ${pesan || "Pesan Kosong"}\n`;
  switch (command = command.toLowerCase(), database, command) {
    case "menfesleave": {
      const room = Object.values(database).find(room => room.check(m.sender));
      if (!room) return await conn.reply(m.chat, "*Kamu tidak sedang berada di menfes chat*", null);
      m.reply("Sukses Hapus Menfes");
      const other = room.other(m.sender);
      if (other && await conn.reply(other, room.b + " *Meninggalkan chat*", null), delete database[room.id], "menfesleave" === command) break;
    }
    case "menfesstart": {
      if (Object.values(database).find(room => room.check(m.sender))) return await conn.reply(m.chat, "*Kamu masih berada di dalam menfes chat, menunggu Balasan*", null);
      const room = Object.values(database).find(room => "WAITING" === room.state && !room.check(m.sender));
      if (room) room.b = m.sender, room.state = "CHATTING", await conn.reply(room.a, "*Menfes Chat Tersambung!*\nDengan: " + m.sender, null),
        await conn.reply(m.sender, "*Menfes Chat Tersambung!*\nDengan: " + room.a, null);
      else {
        if (m.quoted) {
          await conn.reply(jid, tujuan + "\n" + cap, null);
          const media = q ? await m.getQuotedObj() : m;
          await conn.copyNForward(jid, media, !1).catch(_ => _);
        } else await conn.reply(jid, tujuan + "\n" + cap, null);
        await conn.reply(m.chat, suks, m, {
          mentions: conn.parseMention(suks)
        });
        const id = +new Date();
        database[id] = {
          id: id,
          a: m.sender,
          b: "",
          state: "WAITING",
          check: function(who = "") {
            return [conn.a, conn.b].includes(who);
          },
          other: function(who = "") {
            return who === conn.a ? conn.b : who === conn.b ? conn.a : "";
          }
        }, await conn.reply(m.chat, "*Menunggu Balasan...*", null);
      }
      break;
    }
  }
};
handler.help = ["menfesstart", "menfesleave"], handler.tags = ["menfes"], handler.command = ["menfesstart", "menfesleave"],
  handler.private = !0;
export default handler;