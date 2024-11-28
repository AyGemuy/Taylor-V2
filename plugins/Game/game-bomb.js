const handler = async (m, { conn }) => {
  db.data.game.bomb = db.data.game.bomb || {};
  let id = m.chat;
  if (id in db.data.game.bomb)
    return await conn.reply(
      m.chat,
      "*^ sesi ini belum selesai!*",
      db.data.game.bomb[id][0],
    );
  const bom = ["💥", "✅", "✅", "✅", "✅", "✅", "✅", "✅", "✅"].sort(
      () => Math.random() - 0.5,
    ),
    number = ["1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣", "6️⃣", "7️⃣", "8️⃣", "9️⃣"],
    array = bom.map((v, i) => ({
      emot: v,
      number: number[i],
      position: i + 1,
      state: !1,
      player: m.sender,
    }));
  let teks =
    "乂  *B O M B*\n\nKirim angka *1* - *9* untuk membuka *9* kotak nomor di bawah ini :\n\n";
  for (let i = 0; i < array.length; i += 3)
    teks +=
      array
        .slice(i, i + 3)
        .map((v) => (v.state ? v.emot : v.number))
        .join("") + "\n";
  teks +=
    "\nTimeout : [ *3 menit* ]\nApabila mendapat kotak yang berisi bom maka point akan di kurangi.";
  let v,
    msg = await conn.reply(m.chat, teks, m),
    { key } = msg;
  db.data.game.bomb[id] = [
    msg,
    array,
    setTimeout(async () => {
      (v = array.find((v) => "💥" === v.emot)),
        db.data.game.bomb[id] &&
          (await conn.reply(
            m.chat,
            `*Waktu habis!*, Bom berada di kotak nomor ${v.number}.`,
            db.data.game.bomb[id][0]?.key,
          )),
        delete db.data.game.bomb[id];
    }, 18e4),
    key,
  ];
};
(handler.help = ["bomb"]),
  (handler.tags = ["game"]),
  (handler.command = /^(bomb)$/i);
export default handler;
