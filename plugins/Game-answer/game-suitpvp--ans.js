export async function before(m) {
  this.suit = this.suit ? this.suit : {}, db.data.users[m.sender].suit < 0 && (db.data.users[m.sender].suit = 0);
  let room = Object.values(this.suit).find(room => room.id && room.status && [room.p, room.p2].includes(m.sender));
  if (room) {
    let win = "",
      tie = !1;
    if (m.sender === room.p2 && /^(acc(ept)?|terima|gas|oke?|tolak|gamau|nanti|ga(k.)?bisa)/i.test(m.text) && m.isGroup && "wait" === room.status) {
      if (/^(tolak|gamau|nanti|ga(k.)?bisa)/i.test(m.text)) return await this.reply(m.chat, `@${room.p2.split("@")[0]} menolak suit, suit dibatalkan`, m),
        delete this.suit[room.id], !0;
      room.status = "play", room.asal = m.chat, clearTimeout(room.waktu), m.reply(`Suit telah dikirimkan ke chat\n@${room.p.split("@")[0]} dan \n@${room.p2.split("@")[0]}\n\nSilahkan pilih suit di chat masing"\nklik wa.me/${this.user.jid.split("@")[0]}`, m.chat, {
          contextInfo: {
            mentionedJid: [room.p, room.p2]
          }
        }), room.pilih || await this.reply(room.p, `Silahkan pilih\nMenang +${room.poin}XP\nKalah -${room.poin_lose}XP\n\nBatu🗿 ( Batu )\nKertas📄 ( Kertas )\nGunting✂️ ( Gunting )`, m),
        room.pilih2 || await this.reply(room.p2, `Silahkan pilih\nMenang +${room.poin}XP\nKalah -${room.poin_lose}XP\n\nBatu🗿 ( Batu )\nKertas📄 ( Kertas )\nGunting✂️ ( Gunting )`, m),
        room.waktu_milih = setTimeout(async () => (room.pilih || room.pilih2 ? room.pilih && room.pilih2 || (win = room.pilih ? room.p : room.p2, await this.reply(m.chat, `@${(room.pilih ? room.p2 : room.p).split("@")[0]} tidak memilih suit, game berakhir`, m), db.data.users[win === room.p ? room.p : room.p2].exp += room.poin, db.data.users[win === room.p ? room.p2 : room.p].exp -= room.poin_lose) : await this.reply(m.chat, "Kedua pemain tidak niat main,\nSuit dibatalkan"), delete this.suit[room.id], !0), room.timeout);
    }
    let jwb = m.sender === room.p,
      jwb2 = m.sender === room.p2,
      g = /gunting/i,
      b = /batu/i,
      k = /kertas/i,
      reg = /^(gunting|batu|kertas)/i;
    jwb && reg.test(m.text) && !room.pilih && !m.isGroup && (room.pilih = reg.exec(m.text.toLowerCase())[0], room.text = m.text, m.reply(`Kamu telah memilih ${m.text} ${room.pilih2 ? "" : "\n\nMenunggu lawan memilih"}`), room.pilih2 || await this.reply(room.p2, "_Lawan sudah memilih_\nSekarang giliran kamu", 0)),
      jwb2 && reg.test(m.text) && !room.pilih2 && !m.isGroup && (room.pilih2 = reg.exec(m.text.toLowerCase())[0], room.text2 = m.text, m.reply(`Kamu telah memilih ${m.text} ${room.pilih ? "" : "\n\nMenunggu lawan memilih"}`), room.pilih || await this.reply(room.p, "_Lawan sudah memilih_\nSekarang giliran kamu", 0));
    let stage = room.pilih,
      stage2 = room.pilih2;
    room.pilih && room.pilih2 && (clearTimeout(room.waktu_milih), b.test(stage) && g.test(stage2) ? win = room.p : b.test(stage) && k.test(stage2) ? win = room.p2 : g.test(stage) && k.test(stage2) ? win = room.p : g.test(stage) && b.test(stage2) ? win = room.p2 : k.test(stage) && b.test(stage2) ? win = room.p : k.test(stage) && g.test(stage2) ? win = room.p2 : stage === stage2 && (tie = !0), await this.reply(room.asal, `\n_*Hasil Suit*_${tie ? "\nSERI" : ""}\n\n@${room.p.split("@")[0]} (${room.text}) ${tie ? "" : room.p === win ? ` Menang \n+${room.poin}XP` : ` Kalah \n-${room.poin_lose}XP`}\n@${room.p2.split("@")[0]} (${room.text2}) ${tie ? "" : room.p2 === win ? ` Menang \n+${room.poin}XP` : ` Kalah \n-${room.poin_lose}XP`}\n`.trim(), m, {
      contextInfo: {
        mentionedJid: [room.p, room.p2]
      }
    }), tie || (db.data.users[win === room.p ? room.p : room.p2].exp += room.poin, db.data.users[win === room.p ? room.p2 : room.p].exp += room.poin_lose), delete this.suit[room.id]);
  }
  return !0;
}
export const disabled = !1;

function random(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}