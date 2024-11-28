import TicTacToe from "../../lib/tictactoe.js";
let handler = async (m, { conn, usedPrefix, command, text }) => {
  if (!db.data.game.tictactoe) db.data.game.tictactoe = {};
  if (
    Object.values(db.data.game.tictactoe).find(
      (room) =>
        room.id.startsWith("tictactoe") &&
        [room.game.playerX, room.game.playerO].includes(m.sender),
    )
  )
    throw "You are still in the game";
  let room = Object.values(db.data.game.tictactoe).find(
    (room) => room.state === "WAITING" && (text ? room.name === text : true),
  );
  if (room) {
    m.reply("Partner found!");
    room.o = m.chat;
    room.game.playerO = m.sender;
    room.state = "PLAYING";
    let arr = room.game.render().map((v) => {
      return {
        X: "❌",
        O: "⭕",
        1: "1️⃣",
        2: "2️⃣",
        3: "3️⃣",
        4: "4️⃣",
        5: "5️⃣",
        6: "6️⃣",
        7: "7️⃣",
        8: "8️⃣",
        9: "9️⃣",
      }[v];
    });
    let str = `
Room ID: ${room.id}
${arr.slice(0, 3).join("")}
${arr.slice(3, 6).join("")}
${arr.slice(6).join("")}
Wait @${room.game.currentTurn.split("@")[0]}
Type *give up* to give up
`.trim();
    if (room.x !== room.o)
      await conn.reply(room.x, str, m, {
        mentions: conn.parseMention(str),
      });
    await conn.reply(room.o, str, m, {
      mentions: conn.parseMention(str),
    });
  } else {
    room = {
      id: "tictactoe-" + +new Date(),
      x: m.chat,
      o: "",
      game: new TicTacToe(m.sender, "o"),
      state: "WAITING",
    };
    if (text) room.name = text;
    m.reply(
      "Waiting for partners" +
        (text
          ? ` type the command below
${usedPrefix}${command} ${text}`
          : ""),
    );
    db.data.game.tictactoe[room.id] = room;
  }
};
handler.help = ["tictactoe", "ttt"].map((v) => v + " [custom room name]");
handler.tags = ["game"];
handler.command = /^(tictactoe|t{3})$/;
export default handler;
