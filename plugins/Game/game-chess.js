const handler = async (m, { conn, usedPrefix, command, text }) => {
  switch (((db.data.game.chessgame = db.data.game.chessgame || {}), text)) {
    case "end":
      if (!db.data.game.chessgame[m.chat])
        return await conn.ctaButton
          .setBody("Anda tidak sedang dalam sesi Chess. 🤔")
          .addReply("Create now!", `${usedPrefix}${command} start`)
          .run(m.chat, conn, m);
      delete db.data.game.chessgame[m.chat],
        m.reply("Berhasil keluar dari sesi Chess. 👋");
      break;
    case "start":
      if (db.data.game.chessgame[m.chat])
        return await conn.ctaButton
          .setBody("Anda masih berada dalam sesi Chess. 🤖")
          .addReply("Delete this!", `${usedPrefix}${command} end`)
          .run(m.chat, conn, db.data.game.chessgame[m.chat].msg);
      try {
        const fen = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";
        db.data.game.chessgame[m.chat] = {
          fen: fen,
          player1: m.sender,
          player2: null,
          msg: null,
          acc: null,
          turn: null,
        };
        let txt = `🎮 *Chess Game* 🎮\n\n@${m.sender.split("@")[0]}\n\n`;
        (txt += "- accept\n"),
          (txt += "- cancel\n"),
          (txt += "( Reply pesan ini )\n"),
          (txt += `*${usedPrefix + command} end* untuk keluar dari sesi chess. 🚪\n\n`),
          (txt += "Ketik *accept* untuk memulai permainan."),
          (txt += `\nContoh penggunaan:\n\`\`\`${usedPrefix + command} start\`\`\`\n`),
          (txt += "Jika sudah, tunggu lawan Anda untuk bergabung. ⌛");
        let soal = await conn.ctaButton
          .setBody(txt)
          .addReply("Accept!", `accept`)
          .addReply("Cancel!", `cancel`)
          .contextInfo({
            mentionedJid: conn.parseMention(txt),
          })
          .run(m.chat, conn, m);
        db.data.game.chessgame[m.chat].msg = soal;
      } catch (e) {
        console.log(e), m.reply("Terjadi kesalahan. 🚨");
      }
      break;
    case "help":
      m.reply(
        `♟️🤖 *Permainan Catur* 🤖♟️\n\n*Commands:*\n- *${usedPrefix + command} start :* Memulai permainan catur.\n- *[from] [to] ( Reply board ):* Melakukan langkah catur dari satu posisi ke posisi lain.\n- *${usedPrefix + command} end :* Menyerah dan mengakhiri permainan.`,
      );
      break;
    default:
      let helpTxt = "🎮 *Chess Game* 🎮\n\n";
      (helpTxt += `*Commands:*\n- *${usedPrefix + command} start :* Memulai permainan.\n- *${usedPrefix + command} end :* Keluar dari sesi permainan.\n\n`),
        m.reply(helpTxt);
  }
};
(handler.menu = ["chessgame"]),
  (handler.tags = ["game"]),
  (handler.command = /^(chessgame|chess|catur)$/i),
  (handler.group = !0),
  (handler.limit = !0);
export default handler;
