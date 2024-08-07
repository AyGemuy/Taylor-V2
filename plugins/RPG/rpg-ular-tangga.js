import Jimp from "jimp";
import axios from "axios";
class GameSession {
  constructor(id, sMsg) {
    this.id = id, this.players = [], this.game = new SnakeAndLadderGame(sMsg);
  }
}
class SnakeAndLadderGame {
  constructor(sMsg) {
    this.sendMsg = sMsg, this.players = [], this.boardSize = 100, this.snakesAndLadders = [{
        start: 29,
        end: 7
      }, {
        start: 24,
        end: 12
      }, {
        start: 15,
        end: 37
      }, {
        start: 23,
        end: 41
      }, {
        start: 72,
        end: 36
      }, {
        start: 49,
        end: 86
      }, {
        start: 90,
        end: 56
      }, {
        start: 75,
        end: 64
      }, {
        start: 74,
        end: 95
      }, {
        start: 91,
        end: 72
      }, {
        start: 97,
        end: 78
      }], this.currentPositions = {}, this.currentPlayerIndex = 0, this.bgImageUrl = "https://i.pinimg.com/originals/2f/68/a7/2f68a7e1eee18556b055418f7305b3c0.jpg",
      this.playerImageUrls = {
        red: "https://cdn.icon-icons.com/icons2/2620/PNG/512/among_us_player_red_icon_156942.png",
        green: "https://cdn.icon-icons.com/icons2/2620/PNG/512/among_us_player_green_icon_156937.png"
      }, this.bgImage = null, this.playerImages = {
        red: null,
        green: null
      }, this.cellWidth = 40, this.cellHeight = 40, this.keyId = null, this.started = !1;
  }
  initializeGame() {
    this.players.forEach(player => this.currentPositions[player] = 1), this.currentPlayerIndex = 0,
      this.started = !0;
  }
  rollDice = num => Array.from({
    length: num
  }, () => Math.floor(6 * Math.random()) + 1)[Math.floor(Math.random() * num)];
  fetchImage = async url => {
    try {
      const response = await axios.get(url, {
        responseType: "arraybuffer"
      });
      return await Jimp.read(Buffer.from(response.data, "binary"));
    } catch (error) {
      throw console.error(`Error fetching image from ${url}:`, error), error;
    }
  };
  getBoardBuffer = async () => {
    const board = new Jimp(420, 420);
    this.bgImage.resize(420, 420), board.composite(this.bgImage, 0, 0);
    for (const player of this.players) {
      const {
        x,
        y
      } = this.calculatePlayerPosition(player);
      board.composite(await this.getPlayerImage(player), x, y);
    }
    return board.getBufferAsync(Jimp.MIME_PNG);
  };
  calculatePlayerPosition = player => {
    const playerPosition = this.currentPositions[player],
      row = 9 - Math.floor((playerPosition - 1) / 10);
    return {
      x: (playerPosition - 1) % 10 * this.cellWidth + 10,
      y: row * this.cellHeight + 10
    };
  };
  getPlayerImage = async player => {
    const color = this.getPlayerColor(player);
    if (!this.playerImages[color]) try {
      const image = await this.fetchImage(this.playerImageUrls[color]);
      this.playerImages[color] = image;
    } catch (error) {
      throw console.error(`Error fetching image for ${color} player:`, error), error;
    }
    return this.playerImages[color].clone().resize(this.cellWidth, this.cellHeight);
  };
  getPlayerColor = player => player === this.players[0] ? "red" : "green";
  startGame = async (m, player1Name, player2Name) => {
    m.reply(`🐍🎲 *Selamat datang di Permainan Ular Tangga!* 🎲🐍 \n\n${this.formatPlayerName(player1Name)} *vs* ${this.formatPlayerName(player2Name)}`, null, {
      mentions: [player1Name, player2Name]
    }), this.players = [player1Name, player2Name], await this.initializeGame(), this.bgImage || (this.bgImage = await this.fetchImage(this.bgImageUrl));
    const {
      key
    } = m.reply(await this.getBoardBuffer());
    this.keyId = key;
  };
  formatPlayerName = player => {
    const color = this.getPlayerColor(player);
    return `@${player.split("@")[0]} ( ${color.charAt(0).toUpperCase() + color.slice(1)} )`;
  };
  playTurn = async (m, player) => {
    if (!this.players.length) return m.reply('🛑 *Tidak ada permainan aktif.*\nGunakan "!snake start" untuk memulai permainan baru.');
    if (player !== this.players[this.currentPlayerIndex]) return m.reply(`🕒 *Bukan giliranmu.* \n\nSekarang giliran ${this.formatPlayerName(this.players[this.currentPlayerIndex])}`, null, {
      mentions: [this.players[this.currentPlayerIndex]]
    });
    const diceRoll = this.rollDice(6);
    if (m.reply(`🎲 ${this.formatPlayerName(player)} *melempar dadu.*\n\n  - Dadu: *${diceRoll}*\n  - Dari kotak: *${this.currentPositions[player]}*\n  - Ke kotak: *${this.currentPositions[player] + diceRoll}*`, null, {
        mentions: this.players
      }), 0 === this.players.length) return;
    let newPosition = this.currentPositions[player] + diceRoll;
    for (const otherPlayer of this.players)
      if (otherPlayer !== player && this.currentPositions[otherPlayer] === newPosition) {
        const message = `😱 *Oh tidak!* ${this.formatPlayerName(player)} *menginjak posisi* ${this.formatPlayerName(otherPlayer)}\n*Kembali ke awal cell.*`;
        m.reply(message, null, {
          mentions: [player, otherPlayer]
        }), newPosition = 1;
      }
    if (newPosition <= this.boardSize) {
      const checkSnakeOrLadder = this.snakesAndLadders.find(s => s.start === this.currentPositions[player]);
      if (checkSnakeOrLadder) {
        const action = checkSnakeOrLadder.end < checkSnakeOrLadder.start ? "Mundur" : "Maju";
        m.reply(`🐍 ${this.formatPlayerName(player)} menemukan *${"Mundur" === action ? "ular" : "tangga"}!*\n*${action}* ke kotak *${checkSnakeOrLadder.end}*`, null, {
          mentions: this.players
        }), this.currentPositions[player] = checkSnakeOrLadder.end;
      } else this.currentPositions[player] = newPosition;
      if (this.currentPositions[player] === this.boardSize) return m.reply(`🎉 ${this.formatPlayerName(player)} menang!\n*Selamat!*`, null, {
        mentions: [player]
      }), void await this.resetSession();
      6 !== diceRoll ? this.currentPlayerIndex = 1 - this.currentPlayerIndex : m.reply("🎲 *Anda mendapat 6*\nJadi giliran Anda masih berlanjut.", null, {
        mentions: this.players
      });
    } else m.reply("🔄 Melebihi batas kotak, posisi direset dan giliran beralih ke pemain berikutnya.", null, {
      mentions: this.players
    }), this.currentPositions[player] = 1, this.currentPlayerIndex = 1 - this.currentPlayerIndex;
    const boardBuffer = await this.getBoardBuffer(),
      sendMsg = this.sendMsg;
    await sendMsg.sendMessage(m.chat, {
      delete: this.keyId
    });
    const {
      key
    } = m.reply(boardBuffer);
    this.keyId = key;
  };
  addPlayer = player => this.players.length < 2 && !this.players.includes(player) && "" !== player && (this.players.push(player), !0);
  resetSession = () => {
    this.players = [], this.currentPositions = {}, this.currentPlayerIndex = 0, this.started = !1;
  };
  isGameStarted = () => this.started;
}
const handler = async (m, {
  args,
  usedPrefix,
  command
}) => {
  conn.ulartangga = conn.ulartangga || {};
  const sessions = conn.ulartangga;
  const sessionId = m.chat;
  const session = sessions[sessionId] || (sessions[sessionId] = new GameSession(sessionId, conn));
  const game = session.game;
  const state = session.state || false;
  try {
    switch (args[0]) {
      case "join":
        if (state) {
          await conn.sendButton(m.chat, "🛑 Permainan sudah dimulai. Tidak dapat bergabung.", "⚡ Pilih aksi:", null, [
            ["Help", `${usedPrefix + command} help`]
          ], m);
          return;
        }
        const playerName = m.sender;
        const joinMessage = game.addPlayer(playerName) ? `👋 ${game.formatPlayerName(playerName)} bergabung ke dalam permainan.` : "*Anda sudah bergabung atau permainan sudah penuh.* Tidak dapat bergabung.";
        await conn.sendButton(m.chat, joinMessage, "⚡ Pilih aksi:", null, [
          ["Join Game", `${usedPrefix + command} join`],
          ["Start Game", `${usedPrefix + command} start`],
          ["Help", `${usedPrefix + command} help`]
        ], m);
        break;
      case "start":
        if (state) {
          await conn.sendButton(m.chat, "🛑 Permainan sudah dimulai. Tidak dapat memulai ulang.", "⚡ Pilih aksi:", null, [
            ["Roll Dadu", `${usedPrefix + command} roll`],
            ["Reset Sesi", `${usedPrefix + command} reset`],
            ["Help", `${usedPrefix + command} help`]
          ], m);
          return;
        }
        if (game.players.length >= 2) {
          await game.startGame(m, game.players[0], game.players[1]);
          sessions[sessionId].state = true;
          await conn.sendButton(m.chat, "🟢 Permainan dimulai! Lempar dadu untuk bergerak.", "⚡ Pilih aksi:", null, [
            ["Roll Dadu", `${usedPrefix + command} roll`],
            ["Reset Sesi", `${usedPrefix + command} reset`],
            ["Help", `${usedPrefix + command} help`]
          ], m);
        } else {
          await conn.sendButton(m.chat, "👥 Tidak cukup pemain untuk memulai permainan. Diperlukan minimal 2 pemain.", "⚡ Pilih aksi:", null, [
            ["Join Game", `${usedPrefix + command} join`],
            ["Start Game", `${usedPrefix + command} start`],
            ["Help", `${usedPrefix + command} help`]
          ], m);
        }
        break;
      case "roll":
        if (!state) {
          await conn.sendButton(m.chat, `🛑 Permainan belum dimulai. Ketik *${usedPrefix + command} start* untuk memulai.`, "⚡ Pilih aksi:", null, [
            ["Join Game", `${usedPrefix + command} join`],
            ["Start Game", `${usedPrefix + command} start`],
            ["Help", `${usedPrefix + command} help`]
          ], m);
          return;
        }
        if (game.isGameStarted()) {
          const currentPlayer = game.players[game.currentPlayerIndex];
          if (m.sender !== currentPlayer) {
            await conn.sendButton(m.chat, `🕒 Bukan giliranmu. Sekarang giliran ${game.formatPlayerName(currentPlayer)}`, "⚡ Pilih aksi:", null, [
              ["Roll Dadu", `${usedPrefix + command} roll`],
              ["Reset Sesi", `${usedPrefix + command} reset`],
              ["Help", `${usedPrefix + command} help`]
            ], m);
          } else {
            await game.playTurn(m, currentPlayer);
          }
        } else {
          await conn.sendButton(m.chat, `🛑 Permainan belum dimulai. Ketik *${usedPrefix + command} start* untuk memulai.`, "⚡ Pilih aksi:", null, [
            ["Join Game", `${usedPrefix + command} join`],
            ["Start Game", `${usedPrefix + command} start`],
            ["Help", `${usedPrefix + command} help`]
          ], m);
        }
        break;
      case "reset":
      case "stop":
      case "end":
        sessions[sessionId].state = false;
        session.game.resetSession();
        delete sessions[sessionId];
        await conn.sendButton(m.chat, "🔄 Sesi permainan direset. Kamu dapat memulai permainan baru kapan saja.", "⚡ Pilih aksi:", null, [
          ["Join Game", `${usedPrefix + command} join`],
          ["Start Game", `${usedPrefix + command} start`],
          ["Help", `${usedPrefix + command} help`]
        ], m);
        break;
      case "help":
        await conn.sendButton(m.chat, `🎲🐍 Permainan Ular Tangga 🐍🎲\n\n*Commands:*\n- *${usedPrefix + command} join :* Bergabung ke dalam permainan.\n- *${usedPrefix + command} start :* Memulai permainan.\n- *${usedPrefix + command} roll :* Melempar dadu untuk bergerak.\n- *${usedPrefix + command} reset :* Mereset sesi permainan.`, "⚡ Pilih aksi:", null, [
          ["Join Game", `${usedPrefix + command} join`],
          ["Start Game", `${usedPrefix + command} start`],
          ["Roll Dadu", `${usedPrefix + command} roll`],
          ["Reset Sesi", `${usedPrefix + command} reset`]
        ], m);
        break;
      default:
        await conn.sendButton(m.chat, `❓ Perintah tidak valid. Gunakan *${usedPrefix + command} help* untuk melihat daftar perintah.`, "⚡ Pilih aksi:", null, [
          ["Help", `${usedPrefix + command} help`]
        ], m);
    }
  } catch (error) {
    console.error("Error in ular tangga handler:", error);
    await conn.sendButton(m.chat, "Terjadi kesalahan dalam permainan Ular Tangga. Silakan coba lagi nanti.", "⚡ Pilih aksi:", null, [
      ["Help", `${usedPrefix + command} help`]
    ], m);
  }
};
handler.help = ["ulartangga"];
handler.tags = ["rpg"];
handler.command = /^(ular(tangga)?|ladders|snak(e)?)$/i;
export default handler;