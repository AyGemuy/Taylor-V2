import {
  tebakkata
} from "@bochilteam/scraper";
import _ from "lodash";
class HangmanGame {
  constructor(id) {
    this.sessionId = id;
    this.guesses = [];
    this.maxAttempts = 0;
    this.currentStage = 0;
  }
  async getRandomQuest() {
    try {
      const {
        jawaban,
        soal
      } = await tebakkata();
      return {
        clue: soal,
        quest: jawaban.toLowerCase()
      };
    } catch (error) {
      console.error("Error fetching random quest:", error);
      throw new Error("Gagal mengambil pertanyaan.");
    }
  }
  async initializeGame() {
    try {
      this.quest = await this.getRandomQuest();
      this.maxAttempts = this.quest.quest.length;
    } catch (error) {
      console.error("Error initializing game:", error);
      throw new Error("Gagal memulai permainan.");
    }
  }
  displayBoard() {
    const emojiStages = ["😐", "😕", "😟", "😧", "😢", "😨", "😵"];
    const stage = emojiStages[this.currentStage];
    return `*Tahap Saat Ini:* ${stage}\n\`\`\`==========\n|    |\n|   ${stage}\n|   ${this.currentStage >= 3 ? "/" : ""}${this.currentStage >= 4 ? "|" : ""}${this.currentStage >= 5 ? "\\" : ""} \n|   ${this.currentStage >= 1 ? "/" : ""} ${this.currentStage >= 2 ? "\\" : ""} \n|      \n|      \n==========\`\`\`\n*Petunjuk:* ${this.quest.clue}`;
  }
  displayWord() {
    return this.quest.quest.split("").map(char => this.guesses.includes(char) ? char : "__").join(" ");
  }
  makeGuess(letter) {
    if (!this.isAlphabet(letter)) return "invalid";
    letter = letter.toLowerCase();
    if (this.guesses.includes(letter)) return "repeat";
    this.guesses.push(letter);
    if (!this.quest.quest.includes(letter)) this.currentStage = Math.min(this.quest.quest.length, this.currentStage + 1);
    return this.checkGameOver() ? "over" : this.checkGameWin() ? "win" : "continue";
  }
  isAlphabet(letter) {
    return /^[a-zA-Z]$/.test(letter);
  }
  checkGameOver() {
    return this.currentStage >= this.maxAttempts;
  }
  checkGameWin() {
    return _.difference([...new Set(this.quest.quest)], this.guesses).length === 0;
  }
  getHint() {
    return `*Petunjuk:* ${this.quest.quest}`;
  }
}
const handler = async (m, {
  conn,
  usedPrefix,
  command,
  args
}) => {
  conn.hangman = conn.hangman || {};
  const [action, inputs] = args;
  try {
    switch (action) {
      case "end":
        if (conn.hangman[m.chat]?.sessionId === m.sender) {
          delete conn.hangman[m.chat];
          await conn.sendButton(m.chat, "Sesi Hangman telah diakhiri. 👋", "⚡ Pilih opsi berikut:", null, [
            ["Menu Utama", `${usedPrefix}menu`]
          ], m);
        } else {
          await conn.sendButton(m.chat, "Tidak ada sesi Hangman yang aktif atau Anda bukan pemainnya.", "⚡ Pilih opsi berikut:", null, [
            ["Mulai Sesi", `${usedPrefix + command} start`]
          ], m);
        }
        break;
      case "start":
        if (conn.hangman[m.chat]) {
          await conn.sendButton(m.chat, `Sesi Hangman sudah berjalan. Gunakan *${usedPrefix + command} end* untuk mengakhiri sesi.`, "⚡ Pilih opsi berikut:", null, [
            ["Akhiri Game", `${usedPrefix + command} end`]
          ], m);
        } else {
          conn.hangman[m.chat] = new HangmanGame(m.sender);
          const gameSession = conn.hangman[m.chat];
          await gameSession.initializeGame();
          const alphabet = "abcdefghijklmnopqrstuvwxyz".split("");
          const remainingLetters = _.difference(alphabet, gameSession.guesses);
          const listSections = remainingLetters.map(letter => [`[ ${letter.toUpperCase()} ]`, [
            ["Pilih " + letter.toUpperCase(), `${usedPrefix + command} guess ${letter}`]
          ]]);
          await conn.sendButton(m.chat, `🎉 Sesi Hangman Dimulai! 🎉\n\n*ID Sesi:* ${gameSession.sessionId}\n\n${gameSession.displayBoard()}\n\n*Tebakan Kata:* ${gameSession.displayWord()}\n\nKirim huruf untuk menebak dengan memilih tombol di bawah atau kirimkan huruf dengan format: *${usedPrefix + command} guess a*`, "⚡ Pilih opsi berikut:", null, [
            ["Akhiri Game", `${usedPrefix + command} end`]
          ], m);
          await conn.sendList(m.chat, "Pilih huruf untuk menebak:", "⚡ Pilih huruf:", "Gunakan tombol di bawah untuk menebak huruf.", "📜 Pilih Huruf 📜", listSections, m);
        }
        break;
      case "guess":
        if (conn.hangman[m.chat]) {
          if (!inputs || !/^[a-zA-Z]$/.test(inputs)) {
            await conn.sendButton(m.chat, `Masukkan huruf yang ingin ditebak setelah *guess*. Contoh: *${usedPrefix + command} guess a*`, "⚡ Pilih opsi berikut:", null, [
              ["Help", `${usedPrefix + command} help`]
            ], m);
            return;
          }
          const gameSession = conn.hangman[m.chat];
          const userGuess = inputs.toLowerCase();
          const result = gameSession.makeGuess(userGuess);
          const messages = {
            invalid: "Huruf tidak valid. Masukkan huruf A-Z.",
            repeat: "Huruf ini sudah ditebak sebelumnya. Coba huruf lain.",
            continue: `*Huruf yang Sudah Ditebak:*\n${gameSession.guesses.join(", ")}\n\n${gameSession.displayBoard()}\n\n*Tebakan Kata:* ${gameSession.displayWord()}\n\n*Sisa Kesempatan:* ${gameSession.maxAttempts - gameSession.currentStage}`,
            over: `😢 Game Over! Anda kalah. Kata yang benar adalah *${gameSession.quest.quest}*.`,
            win: `🎉 Selamat! Anda menang! 🎉`
          };
          const alphabet = "abcdefghijklmnopqrstuvwxyz".split("");
          const remainingLetters = _.difference(alphabet, gameSession.guesses);
          const listSections = remainingLetters.map(letter => [`[ ${letter.toUpperCase()} ]`, [
            ["Pilih " + letter.toUpperCase(), `${usedPrefix + command} guess ${letter}`]
          ]]);
          await conn.sendButton(m.chat, messages[result], "⚡ Pilih opsi berikut:", null, [result === "over" || result === "win" ? ["Mulai Lagi", `${usedPrefix + command} start`] : ["Akhiri Game", `${usedPrefix + command} end`]], m);
          if (result !== "over" && result !== "win") {
            await conn.sendList(m.chat, "Pilih huruf untuk menebak:", "⚡ Pilih huruf:", "Gunakan tombol di bawah untuk menebak huruf yang tersisa.", "📜 Pilih Huruf 📜", listSections, m);
          }
          if (result === "over" || result === "win") delete conn.hangman[m.chat];
        } else {
          await conn.sendButton(m.chat, "Tidak ada sesi Hangman yang aktif. Gunakan *start* untuk memulai sesi.", "⚡ Pilih opsi berikut:", null, [
            ["Mulai Sesi", `${usedPrefix + command} start`]
          ], m);
        }
        break;
      case "hint":
        if (conn.hangman[m.chat]) {
          const gameSession = conn.hangman[m.chat];
          await conn.sendButton(m.chat, gameSession.getHint(), "⚡ Pilih opsi berikut:", null, [
            ["Akhiri Game", `${usedPrefix + command} end`]
          ], m);
        } else {
          await conn.sendButton(m.chat, "Tidak ada sesi Hangman yang aktif. Gunakan *start* untuk memulai sesi.", "⚡ Pilih opsi berikut:", null, [
            ["Mulai Sesi", `${usedPrefix + command} start`]
          ], m);
        }
        break;
      case "help":
        await conn.sendButton(m.chat, `🎮 *Permainan Hangman* 🎮\n\n*Perintah:*\n- *${usedPrefix + command} start :* Memulai permainan Hangman.\n- *${usedPrefix + command} end :* Mengakhiri sesi permainan.\n- *${usedPrefix + command} guess [huruf] :* Menebak huruf dalam kata.\n- *${usedPrefix + command} hint :* Mendapatkan petunjuk tentang kata yang dicari.`, "⚡ Pilih opsi berikut:", null, [
          ["Mulai Sesi", `${usedPrefix + command} start`]
        ], m);
        break;
      default:
        await conn.sendButton(m.chat, `Perintah tidak dikenal. Gunakan ${usedPrefix + command} *help* untuk bantuan lebih lanjut.`, "⚡ Pilih opsi berikut:", null, [
          ["Help", `${usedPrefix + command} help`]
        ], m);
    }
  } catch (error) {
    console.error("Error in hangman handler:", error);
    await conn.sendButton(m.chat, "Terjadi kesalahan dalam permainan Hangman. Silakan coba lagi nanti.", "⚡ Pilih opsi berikut:", null, [
      ["Help", `${usedPrefix + command} help`]
    ], m);
  }
};
handler.menu = ["hangman"];
handler.tags = ["game"];
handler.command = /^(hangman)$/i;
export default handler;