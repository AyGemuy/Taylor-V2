const handler = async (m, {
  conn,
  args
}) => {
  try {
    let bonus = Math.floor(3e3 * Math.random());
    if (!args[0] || !/^\d$/.test(args[0])) throw "Harap masukkan pilihan angkamu (0-9)";
    let angkaKamu = args[0]?.split("").map(Number),
      angkaBot = angkaKamu.map(() => Math.floor(10 * Math.random())),
      multiplier = args.slice(1).filter((v, i, a) => a.indexOf(v) === i).length || 1;
    await conn.reply(m.chat, `\n*「 TEBAK ANGKA 」*\n\nAngka Kamu : ${angkaKamu.join(" ")}\nAngka Bot  : ${angkaBot.join(" ")}\n`.trim(), m);
    let kecocokan = angkaKamu.reduce((acc, val, i) => acc + (val === angkaBot[i]), 0),
      penalty = (angkaKamu.length - kecocokan) * multiplier,
      pesan = kecocokan === angkaKamu.length ? `Selamat, Anda menang! +${bonus * multiplier} XP!` : `Maaf, angka Anda tidak semua sama dengan angka bot. -${penalty} XP!`;
    await conn.reply(m.chat, pesan + `\n*「 HASIL PERMAINAN 」*\n\nAngka Kamu : ${angkaKamu.join(" ")}\nAngka Bot  : ${angkaBot.join(" ")}\nKecocokan  : ${kecocokan} / ${angkaKamu.length}\nBonus XP   : +${bonus * multiplier} XP\nPenalty XP : -${penalty} XP\n`.trim(), m),
      db.data.users[m.sender].exp += kecocokan === angkaKamu.length ? bonus * multiplier : -penalty;
  } catch (error) {
    console.error(error), await conn.reply(m.chat, `Terjadi kesalahan: ${error}`, m);
  }
};
handler.help = ["angka <0-9> [arg1] [arg2] ..."], handler.tags = ["game"], handler.command = /^angka/i,
  handler.tigame = !0, handler.fail = null;
export default handler;