import {
  Chess
} from "chess.js";
export async function before(m) {
  if (db.data.users[m.sender].banned) return;
  if (!(m.quoted && m.quoted?.fromMe && m.quoted?.isBaileys && m.text)) return !0;
  if (this.chessgame = this.chessgame || {}, !this.chessgame[m.chat] || m.quoted?.id != this.chessgame[m.chat].msg.key.id) return;
  let txt = (m.msg && m.msg.selectedDisplayText ? m.msg.selectedDisplayText : m.text ? m.text : "").toLowerCase();
  if (!txt) return await this.reply(m.chat, "Masukkan input from to", m), !0;
  if (/^accept?$/i.test(txt))
    if (this.chessgame[m.chat].player1 !== m.sender) {
      this.chessgame[m.chat].player2 = m.sender, this.chessgame[m.chat].turn = this.chessgame[m.chat].player2;
      const encodedFen = encodeURIComponent(this.chessgame[m.chat].fen),
        giliran = `\nGiliran: @${m.sender.split("@")[0]}`,
        boardUrl = `https://www.chess.com/dynboard?fen=${encodedFen}&board=graffiti&piece=graffiti&size=3&coordinates=inside`,
        boardUrl2 = `https://chessboardimage.com/${encodedFen}.png`,
        boardUrl3 = `https://backscattering.de/web-boardimage/board.png?fen=${encodedFen}`;
      let soal;
      try {
        soal = await this.sendMessage(m.chat, {
          image: {
            url: boardUrl
          },
          caption: "🎮 *Chess start* 🎮" + giliran,
          mentions: [m.sender]
        }, {
          quoted: m
        });
      } catch (error) {
        try {
          soal = await this.sendMessage(m.chat, {
            image: {
              url: boardUrl2
            },
            caption: "🎮 *Chess start* 🎮" + giliran,
            mentions: [m.sender]
          }, {
            quoted: m
          });
        } catch (error) {
          try {
            soal = await this.sendMessage(m.chat, {
              image: {
                url: boardUrl3
              },
              caption: "🎮 *Chess start* 🎮" + giliran,
              mentions: [m.sender]
            }, {
              quoted: m
            });
          } catch (error) {
            return await this.reply(m.chat, "Gagal mengirim papan catur.", m), console.error(error),
              error;
          }
        }
      }
      this.chessgame[m.chat].msg = soal;
    } else await this.reply(m.chat, "Anda tidak dapat menerima permainan.", m);
  else /^cancel?$/i.test(txt) && (delete this.chessgame[m.chat], await this.reply(m.chat, "Berhasil keluar dari sesi Chess.", m));
  if (this.chessgame[m.chat] && /^\S+(\s|[\W])\S+$/.test(txt) && this.chessgame[m.chat].turn === this.chessgame[m.chat].player2) {
    const chess = new Chess(this.chessgame[m.chat].fen);
    if (chess.isCheckmate()) return delete this.chessgame[m.chat], void await this.reply(m.chat, `⚠️ *Game Checkmate.*\n🏳️ *Permainan catur dihentikan.*\n*Pemenang:* @${m.sender.split("@")[0]}`, m, {
      contextInfo: {
        mentionedJid: [m.sender]
      }
    });
    if (chess.isDraw()) return delete this.chessgame[m.chat], void await this.reply(m.chat, "⚠️ *Game Draw.*\n🏳️ *Permainan catur dihentikan.", m);
    const [from, to] = txt.split(" ");
    if (m.sender !== this.chessgame[m.chat].player2) await this.reply(m.chat, "❌ Bukan giliran Anda.", m);
    else try {
      chess.move({
        from: from,
        to: to,
        promotion: "q"
      }), this.chessgame[m.chat].fen = chess.fen(), this.chessgame[m.chat].turn = this.chessgame[m.chat].player1;
      const encodedFen = encodeURIComponent(chess.fen()),
        giliran = `\nGiliran: @${this.chessgame[m.chat].turn.split("@")[0]}`,
        flipParam = this.chessgame[m.chat].turn !== this.chessgame[m.chat].player1 ? "" : "&flip=true",
        boardUrl = (this.chessgame[m.chat].turn, this.chessgame[m.chat].player1, `https://www.chess.com/dynboard?fen=${encodedFen}&board=graffiti&piece=graffiti&size=3&coordinates=inside${flipParam}`);
      let soal;
      try {
        soal = await this.sendMessage(m.chat, {
          image: {
            url: boardUrl
          },
          caption: "🎮 *Chess start* 🎮" + giliran,
          mentions: [this.chessgame[m.chat].turn]
        }, {
          quoted: m
        });
      } catch (error) {
        try {
          soal = await this.sendMessage(m.chat, {
            image: {
              url: `https://chessboardimage.com/${encodedFen}.png`
            },
            caption: "🎮 *Chess start* 🎮" + giliran,
            mentions: [this.chessgame[m.chat].turn]
          }, {
            quoted: m
          });
        } catch (error) {
          try {
            soal = await this.sendMessage(m.chat, {
              image: {
                url: `https://backscattering.de/web-boardimage/board.png?fen=${encodedFen}`
              },
              caption: "🎮 *Chess start* 🎮" + giliran,
              mentions: [this.chessgame[m.chat].turn]
            }, {
              quoted: m
            });
          } catch (error) {
            return await this.reply(m.chat, "Gagal mengirim papan catur.", m), console.error(error),
              error;
          }
        }
      }
      this.chessgame[m.chat].msg = soal;
    } catch (e) {
      await this.reply(m.chat, "❌ *Langkah tidak valid.*", m), console.error(e);
    }
  }
  return !0;
}