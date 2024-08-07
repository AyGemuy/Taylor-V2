import {
  format
} from "util";
let debugMode = !1,
  winScore = 4999,
  playScore = 99;
export async function before(m) {
  let ok, isWin = !1,
    isTie = !1,
    isSurrender = !1;
  this.game = this.game ? this.game : {};
  let room = Object.values(this.game).find(room => room.id && room.game && room.state && room.id.startsWith("tictactoe") && [room.game.playerX, room.game.playerO].includes(m.sender) && "PLAYING" === room.state);
  if (room) {
    if (!/^([1-9]|(me)?nyerah|surr?ender)$/i.test(m.text)) return !0;
    if (isSurrender = !/^[1-9]$/.test(m.text), m.sender !== room.game.currentTurn && !isSurrender) return !0;
    if (debugMode && m.reply("[DEBUG]\n" + require("util").format({
        isSurrender: isSurrender,
        text: m.text
      })), !isSurrender && 1 > (ok = room.game.turn(m.sender === room.game.playerO, parseInt(m.text) - 1))) return m.reply({
      "-3": "Game telah berakhir",
      "-2": "Invalid",
      "-1": "Posisi Invalid",
      0: "Posisi Invalid"
    } [ok]), !0;
    m.sender === room.game.winner ? isWin = !0 : 511 === room.game.board && (isTie = !0);
    let arr = room.game.render().map(v => ({
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
      9: "9️⃣"
    })[v]);
    isSurrender && (room.game._currentTurn = m.sender === room.game.playerX, isWin = !0);
    let winner = isSurrender ? room.game.currentTurn : room.game.winner,
      str = `\n${arr.slice(0, 3).join("")}\n${arr.slice(3, 6).join("")}\n${arr.slice(6).join("")}\n${isWin ? `@${winner.split("@")[0]} Menang! (+${winScore} XP)` : isTie ? `Game berakhir (+${playScore} XP)` : `Giliran ${[ "❌", "⭕" ][1 * room.game._currentTurn]} (@${room.game.currentTurn.split("@")[0]})`}\n❌: @${room.game.playerX.split("@")[0]}\n⭕: @${room.game.playerO.split("@")[0]}\nKetik *nyerah* untuk nyerah\nRoom ID: ${room.id}\n`.trim(),
      users = db.data.users;
    (room.game._currentTurn ^ isSurrender ? room.x : room.o) !== m.chat && (room[room.game._currentTurn ^ isSurrender ? "x" : "o"] = m.chat);
    room.x !== room.o && await conn.reply(room.x, str, m, {
      mentions: this.parseMention(str)
    }), await conn.reply(room.o, str, m, {
      mentions: this.parseMention(str)
    }), (isTie || isWin) && (users[room.game.playerX].exp += playScore, users[room.game.playerO].exp += playScore, isWin && (users[winner].exp += winScore - playScore), debugMode && m.reply("[DEBUG]\n" + format(room)), delete this.game[room.id]);
  }
  return !0;
}