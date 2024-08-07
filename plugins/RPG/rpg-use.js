const handler = async (m, {
  conn,
  command,
  args,
  usedPrefix
}) => {
  let msgerror = pickRandom(["Error", "astagfirullah error", "Nice Error", "Salah format keknya :v", "error bro", "Kocak error :v", "wtf error :v", "Ciaaa error", "error cuyy", "dahlah (emot batu) error"]);
  try {
    let msgkurang = pickRandom(["potionmu tidak cukup", "ciaa gk cukup potionyya :v", "wtf gk cukup :v", "beli potion dulu, potionmu gk cukup", "Duaarr potionmu gk cukup", "eyyyy potionmu kurang", "beli dulu lah, masak mau pakai potion tapi gk ada potionnnya :v", "minta ke orang lain suruh transfer potion, biar potionmu gk kurang :v", "Beli potion dulu KK"]),
      msgpenuh = pickRandom(["Nyawamu sudah penuh", "coba deh liat inv mu, nyawamu kan dah 100 ngapai ngunain potion lagi?", "health mu dah penuh woyy", "ws kebek weh :v", "nyawamu dah penuh :v", "udh weh, udh penuh"]),
      usepotion = [40, 45, 50, 55, 60, 65][db.data.users[m.sender].kucing] || 65,
      healt = db.data.users[m.sender].healt;
    if (/use|pakai/i.test(command)) {
      let count = /[0-9]/g.test(args[1]) ? Math.max(args[1] || Math.ceil((100 - healt) / usepotion), 1) : Math.ceil((100 - healt) / usepotion),
        msgsucces = pickRandom(["success memakai", "Nice succes menggunakan", "berhasil meminum ", "primitif anda menggunakan", "anda memakai", "Anda menggunakan"]) + ` *${count}* ${rpg.emoticon("potion")}Potion`;
      "potion" === args[0] ? healt < 100 ? db.data.users[m.sender].potion >= count ? (db.data.users[m.sender].potion -= count, db.data.users[m.sender].healt += usepotion * count, await conn.reply(m.chat, msgsucces, m)) : await conn.reply(m.chat, msgkurang, m) : await conn.reply(m.chat, msgpenuh, m) : args.length > 2 && "potion" !== args[0] && await conn.reply(m.chat, "Hanya bisa menggunakan potion\nContoh penggunaan: *" + usedPrefix + "use potion 1*", m);
    } else if (/heal/i.test(command)) {
      let count = /[0-9]/g.test(args[0]) ? Math.max(args[0] || Math.ceil((100 - healt) / usepotion), 1) : Math.ceil((100 - healt) / usepotion),
        msgsucces = pickRandom(["success memakai", "Nice succes menggunakan", "berhasil meminum ", "primitif anda menggunakan", "anda memakai", "Anda menggunakan"]) + ` *${count}* ${rpg.emoticon("potion")}Potion`;
      healt < 100 ? db.data.users[m.sender].potion >= count ? (db.data.users[m.sender].potion -= count, db.data.users[m.sender].healt += usepotion * count, await conn.reply(m.chat, msgsucces, m)) : await conn.reply(m.chat, msgkurang, m) : await conn.reply(m.chat, msgpenuh, m);
    }
  } catch (e) {
    throw console.log(e), msgerror;
  }
};
handler.help = ["use <item> <jumlah>"], handler.tags = ["rpg"], handler.command = /^(use|pakai|heal)$/i;
export default handler;

function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)];
}