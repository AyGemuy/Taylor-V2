const handler = async (m, {
  conn,
  args,
  usedPrefix
}) => {
  let type = (args[0] || "").toLowerCase(),
    rubah = db.data.users[m.sender].rubah,
    kuda = db.data.users[m.sender].kuda,
    serigala = db.data.users[m.sender].serigala,
    naga = db.data.users[m.sender].naga,
    kucing = db.data.users[m.sender].kucing,
    phonix = db.data.users[m.sender].phonix,
    kyubi = db.data.users[m.sender].kyubi,
    centaur = db.data.users[m.sender].centaur,
    griffin = db.data.users[m.sender].griffin,
    hero = db.data.users[m.sender].hero;
  switch (type) {
    case "rubah":
      if (0 === rubah) return m.reply("*Kamu belum memiliki Pet Rubah*");
      if (5 === rubah) return m.reply("*Pet kamu dah lvl max*");
      let waktur = clockString(6e5 - (new Date() - db.data.users[m.sender].ramuanrubahlast));
      if (new Date() - db.data.users[m.sender].ramuanrubahlast > 6e5)
        if (db.data.users[m.sender].ramuan > 0) {
          if (db.data.users[m.sender].ramuan -= 1, db.data.users[m.sender].anakrubah += 200, db.data.users[m.sender].ramuanrubahlast = 1 * new Date(), await conn.reply(m.chat, `Berhasil memberi ramuan pet ${type}`, m), setTimeout(async () => {
              await conn.reply(m.chat, "Waktunya memberi ramuan pet *Rubah*", m);
            }, 6e5), rubah > 0) {
            let naiklvl = 1e3 * rubah - 1;
            db.data.users[m.sender].anakrubah > naiklvl && (db.data.users[m.sender].rubah += 1, db.data.users[m.sender].anakrubah -= 1e3 * rubah, await conn.reply(m.chat, "*Selamat Pet Rubah kamu naik level*", m));
          }
        } else m.reply("Ramuan pet kamu tidak cukup");
      else m.reply(`Pet kamu sudah meminum ramuan, coba beberapa ${waktur} lagi`);
      break;
    case "kuda":
      if (0 === kuda) return m.reply("*Kamu belum memiliki Pet Kuda*");
      if (5 === kuda) return m.reply("*Pet kamu dah lvl max*");
      let waktuk = clockString(6e5 - (new Date() - db.data.users[m.sender].ramuankudalast));
      if (new Date() - db.data.users[m.sender].ramuankudalast > 6e5)
        if (db.data.users[m.sender].ramuan > 0) {
          if (db.data.users[m.sender].ramuan -= 1, db.data.users[m.sender].anakkuda += 200, db.data.users[m.sender].ramuankudalast = 1 * new Date(), await conn.reply(m.chat, `Berhasil memberi ramuan pet ${type}`, m), setTimeout(async () => {
              await conn.reply(m.chat, "Waktunya memberi ramuan pet *Kuda*", m);
            }, 6e5), kuda > 0) {
            let naiklvl = 1e3 * kuda - 1;
            db.data.users[m.sender].anakkuda > naiklvl && (db.data.users[m.sender].kuda += 1, db.data.users[m.sender].anakkuda -= 1e3 * kuda, await conn.reply(m.chat, "*Selamat Pet Kuda kamu naik level*", m));
          }
        } else m.reply("Ramuan pet kamu tidak cukup");
      else m.reply(`Pet kamu sudah meminum ramuan, coba beberapa ${waktuk} lagi`);
      break;
    case "serigala":
      if (0 === serigala) return m.reply("*Kamu belum memiliki Pet Serigala*");
      if (15 === serigala) return m.reply("*Pet kamu dah lvl max*");
      let waktus = clockString(6e5 - (new Date() - db.data.users[m.sender].ramuanserigalalast));
      if (new Date() - db.data.users[m.sender].ramuanserigalalast > 6e5)
        if (db.data.users[m.sender].ramuan > 0) {
          if (db.data.users[m.sender].ramuan -= 1, db.data.users[m.sender].anakserigala += 200, db.data.users[m.sender].ramuanserigalalast = 1 * new Date(), await conn.reply(m.chat, `Berhasil memberi ramuan pet ${type}`, m), setTimeout(async () => {
              await conn.reply(m.chat, "Waktunya memberi ramuan pet *Serigala*", m);
            }, 6e5), serigala > 0) {
            let naiklvl = 1e4 * serigala - 1;
            db.data.users[m.sender].anakserigala > naiklvl && (db.data.users[m.sender].serigala += 1, db.data.users[m.sender].anakserigala -= 1e4 * serigala, await conn.reply(m.chat, "*Selamat Pet Serigala kamu naik level*", m));
          }
        } else m.reply("Ramuan pet kamu tidak cukup");
      else m.reply(`Pet kamu sudah meminum ramuan, coba beberapa ${waktus} lagi`);
      break;
    case "naga":
      if (0 === naga) return m.reply("*Kamu belum memiliki Pet naga*");
      if (20 === naga) return m.reply("*Pet kamu dah lvl max*");
      let waktug = clockString(6e5 - (new Date() - db.data.users[m.sender].ramuannagalast));
      if (new Date() - db.data.users[m.sender].ramuannagalast > 6e5)
        if (db.data.users[m.sender].ramuan > 0) {
          if (db.data.users[m.sender].ramuan -= 1, db.data.users[m.sender].anaknaga += 200, db.data.users[m.sender].ramuannagalast = 1 * new Date(), await conn.reply(m.chat, `Berhasil memberi ramuan pet ${type}`, m), setTimeout(async () => {
              await conn.reply(m.chat, "Waktunya memberi ramuan pet *Naga*", m);
            }, 6e5), naga > 0) {
            let naiklvl = 1e4 * naga - 1;
            db.data.users[m.sender].anaknaga > naiklvl && (db.data.users[m.sender].naga += 1, db.data.users[m.sender].anaknaga -= 1e4 * naga, await conn.reply(m.chat, "*Selamat Pet Naga kamu naik level*", m));
          }
        } else m.reply("Ramuan pet kamu tidak cukup");
      else m.reply(`Pet kamu sudah meminum ramuan, coba beberapa ${waktug} lagi`);
      break;
    case "kyubi":
      if (0 === kyubi) return m.reply("*Kamu belum memiliki Pet kyubi*");
      if (20 === kyubi) return m.reply("*Pet kamu dah lvl max*");
      let waktuyu = clockString(6e5 - (new Date() - db.data.users[m.sender].ramuankyubilast));
      if (new Date() - db.data.users[m.sender].ramuankyubilast > 6e5)
        if (db.data.users[m.sender].ramuan > 0) {
          if (db.data.users[m.sender].ramuan -= 1, db.data.users[m.sender].anakkyubi += 200, db.data.users[m.sender].ramuankyubilast = 1 * new Date(), await conn.reply(m.chat, `Berhasil memberi ramuan pet ${type}`, m), setTimeout(async () => {
              await conn.reply(m.chat, "Waktunya memberi ramuan pet *Kyubi*", m);
            }, 6e5), kyubi > 0) {
            let naiklvl = 1e4 * kyubi - 1;
            db.data.users[m.sender].anakkyubi > naiklvl && (db.data.users[m.sender].kyubi += 1, db.data.users[m.sender].anakkyubi -= 1e4 * kyubi, await conn.reply(m.chat, "*Selamat Pet Kyubi kamu naik level*", m));
          }
        } else m.reply("Ramuan pet kamu tidak cukup");
      else m.reply(`Pet kamu sudah meminum ramuan, coba beberapa ${waktuyu} lagi`);
      break;
    case "centaur":
      if (0 === centaur) return m.reply("*Kamu belum memiliki Pet centaur*");
      if (20 === centaur) return m.reply("*Pet kamu dah lvl max*");
      let waktuur = clockString(6e5 - (new Date() - db.data.users[m.sender].ramuancentaurlast));
      if (new Date() - db.data.users[m.sender].ramuancentaurlast > 6e5)
        if (db.data.users[m.sender].ramuan > 0) {
          if (db.data.users[m.sender].ramuan -= 1, db.data.users[m.sender].anakcentaur += 200, db.data.users[m.sender].ramuancentaurlast = 1 * new Date(), await conn.reply(m.chat, `Berhasil memberi ramuan pet ${type}`, m), setTimeout(async () => {
              await conn.reply(m.chat, "Waktunya memberi ramuan pet *Centaur*", m);
            }, 6e5), centaur > 0) {
            let naiklvl = 1e4 * centaur - 1;
            db.data.users[m.sender].anakcentaur > naiklvl && (db.data.users[m.sender].centaur += 1, db.data.users[m.sender].anakcentaur -= 1e4 * centaur, await conn.reply(m.chat, "*Selamat Pet Centaur kamu naik level*", m));
          }
        } else m.reply("Ramuan pet kamu tidak cukup");
      else m.reply(`Pet kamu sudah meminum ramuan, coba beberapa ${waktuur} lagi`);
      break;
    case "phonix":
      if (0 === phonix) return m.reply("*Kamu belum memiliki Pet Phonix*");
      if (15 === phonix) return m.reply("*Pet kamu dah lvl max*");
      let waktux = clockString(6e5 - (new Date() - db.data.users[m.sender].ramuanphonixlast));
      if (new Date() - db.data.users[m.sender].ramuanphonixlast > 6e5)
        if (db.data.users[m.sender].ramuan > 0) {
          if (db.data.users[m.sender].ramuan -= 1, db.data.users[m.sender].anakphonix += 200, db.data.users[m.sender].ramuanphonixlast = 1 * new Date(), await conn.reply(m.chat, `Berhasil memberi ramuan pet ${type}`, m), setTimeout(async () => {
              await conn.reply(m.chat, "Waktunya memberi ramuan pet *Phonix*", m);
            }, 6e5), phonix > 0) {
            let naiklvl = 1e4 * phonix - 1;
            db.data.users[m.sender].anakphonix > naiklvl && (db.data.users[m.sender].phonix += 1, db.data.users[m.sender].anakphonix -= 1e4 * phonix, await conn.reply(m.chat, "*Selamat Pet Phonix kamu naik level*", m));
          }
        } else m.reply("Ramuan pet kamu tidak cukup");
      else m.reply(`Pet kamu sudah kenyang, coba beberapa ${waktux} lagi`);
      break;
    case "griffin":
      if (0 === griffin) return m.reply("*Kamu belum memiliki Pet Griffin*");
      if (15 === griffin) return m.reply("*Pet kamu dah lvl max*");
      let waktufin = clockString(6e5 - (new Date() - db.data.users[m.sender].ramuangriffinlast));
      if (new Date() - db.data.users[m.sender].ramuangriffinlast > 6e5)
        if (db.data.users[m.sender].ramuan > 0) {
          if (db.data.users[m.sender].ramuan -= 1, db.data.users[m.sender].anakgriffin += 200, db.data.users[m.sender].ramuangriffinlast = 1 * new Date(), await conn.reply(m.chat, `Berhasil memberi ramuan pet ${type}`, m), setTimeout(async () => {
              await conn.reply(m.chat, "Waktunya memberi ramuan pet *Griffin*", m);
            }, 6e5), griffin > 0) {
            let naiklvl = 1e4 * griffin - 1;
            db.data.users[m.sender].anakgriffin > naiklvl && (db.data.users[m.sender].griffin += 1, db.data.users[m.sender].anakgriffin -= 1e4 * griffin, await conn.reply(m.chat, "*Selamat Pet Greffin kamu naik level*", m));
          }
        } else m.reply("Ramuan pet kamu tidak cukup");
      else m.reply(`Pet kamu sudah meminum ramuan, coba beberapa ${waktufin} lagi`);
      break;
    case "kucing":
      if (0 === kucing) return m.reply("*Kamu belum memiliki Pet Kucing*");
      if (5 === kucing) return m.reply("*Pet kamu dah lvl max*");
      let waktu = clockString(6e5 - (new Date() - db.data.users[m.sender].ramuankucinglast));
      if (new Date() - db.data.users[m.sender].ramuankucinglast > 6e5)
        if (db.data.users[m.sender].ramuan > 0) {
          if (db.data.users[m.sender].ramuan -= 1, db.data.users[m.sender].anakkucing += 200, db.data.users[m.sender].ramuankucinglast = 1 * new Date(), await conn.reply(m.chat, `Berhasil memberi ramuan pet ${type}`, m), setTimeout(async () => {
              await conn.reply(m.chat, "Waktunya memberi ramuan pet *Kucing*", m);
            }, 6e5), kucing > 0) {
            let naiklvl = 1e3 * kucing - 1;
            db.data.users[m.sender].anakkucing > naiklvl && (db.data.users[m.sender].kucing += 1, db.data.users[m.sender].anakkucing -= 1e3 * kucing, await conn.reply(m.chat, "*Selamat Pet Kucing kamu naik level*", m));
          }
        } else m.reply("Ramuan pet kamu tidak cukup");
      else m.reply(`Pet kamu sudah meminum ramuan, coba beberapa ${waktu} lagi`);
      break;
    case "hero":
      if (0 === hero) return m.reply("*Kamu belum memiliki Hero*");
      if (100 === hero) return m.reply("*Hero kamu dah lvl max*");
      let waktuher = clockString(6e5 - (new Date() - db.data.users[m.sender].ramuanherolast));
      if (new Date() - db.data.users[m.sender].ramuanherolast > 6e5)
        if (db.data.users[m.sender].ramuan > 0) {
          if (db.data.users[m.sender].ramuan -= 1, db.data.users[m.sender].exphero += 100, db.data.users[m.sender].ramuanherolast = 1 * new Date(), await conn.reply(m.chat, `Berhasil memberi ramuan kepada ${type}`, m), setTimeout(async () => {
              await conn.reply(m.chat, "Waktunya memberi ramuan *Hero*", m);
            }, 6e5), hero > 0) {
            let naiklvl = 500 * hero - 1;
            db.data.users[m.sender].exphero > naiklvl && (db.data.users[m.sender].hero += 1, db.data.users[m.sender].exphero -= 500 * kucing, await conn.reply(m.chat, "*Selamat Hero kamu naik level*", m));
          }
        } else m.reply("Ramuan hero kamu tidak cukup");
      else m.reply(`Hero kamu sudah meminum ramuan, coba beberapa ${waktuher} lagi`);
      break;
    default:
      return await conn.reply(m.chat, `${usedPrefix}ramuan [hero | kucing | rubah | kuda | naga | centaur | phonix | serigala]\nContoh penggunaan: *${usedPrefix}ramuan kucing*`, m);
  }
};
handler.help = ["ramuan [pet type]"], handler.tags = ["rpg"], handler.command = /^(ramuan)$/i,
  handler.limit = !0, handler.group = !0;
export default handler;

function clockString(ms) {
  return ["\n" + (isNaN(ms) ? "--" : Math.floor(ms / 864e5)), " *Days ☀️*\n ", isNaN(ms) ? "--" : Math.floor(ms / 36e5) % 24, " *Hours 🕐*\n ", isNaN(ms) ? "--" : Math.floor(ms / 6e4) % 60, " *Minute ⏰*\n ", isNaN(ms) ? "--" : Math.floor(ms / 1e3) % 60, " *Second ⏱️* "].map(v => v.toString().padStart(2, 0)).join("");
}