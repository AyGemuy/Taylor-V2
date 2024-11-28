let handler = async (m, { conn, text }) => {
  if (!db.data.game.tictactoe) db.data.game.tictactoe = {};
  try {
    if (db.data.game.tictactoe) {
      delete db.data.game.tictactoe;
      return conn.reply(m.chat, `✅ *Room berhasil dihapus*`, m);
    } else if (db.data.game.tictactoe) {
      return m.reply(
        `*Room tidak ada* 🤷‍♀\n\n*Pastikan Anda telah mengatur ruangan dengan benar*`,
      );
    }
  } catch (e) {
    console.log(e);
    m.react(eror);
  }
};
handler.help = ["delsesittt"];
handler.tags = ["game"];
handler.command = /^(delsesittt|dellsesitt|delttt|deltictactoe)$/i;
handler.limit = false;
handler.register = false;
handler.fail = null;
export default handler;
