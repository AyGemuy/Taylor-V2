const handler = async (m, {
  conn,
  args,
  usedPrefix,
  command
}) => {
  let type = (args[0] || "").toLowerCase(),
    user = (thumb, db.data.users[m.sender]),
    rubah = db.data.users[m.sender].fox,
    kuda = db.data.users[m.sender].horse,
    kucing = db.data.users[m.sender].cat,
    anjing = db.data.users[m.sender].dog,
    fox = db.data.users[m.sender].fox,
    horse = db.data.users[m.sender].horse,
    wolf = db.data.users[m.sender].wolf,
    dragon = db.data.users[m.sender].dragon,
    cat = db.data.users[m.sender].cat,
    phonix = db.data.users[m.sender].phonix,
    kyubi = db.data.users[m.sender].kyubi,
    centaur = db.data.users[m.sender].centaur,
    griffin = db.data.users[m.sender].griffin,
    rhinoceros = db.data.users[m.sender].rhinoceros,
    lion = db.data.users[m.sender].lion,
    baba = `Contoh penggunaan: *${usedPrefix + command} cat*\n*📮 LIST :*\n› cat\n› fox\n› horse\n› lion\n› rhinoceros\n› dragon\n› centaur\n› kyubi\n› griffin\n› phonix\n› wolf\n› Kucing\n› Anjing\n› Rubah\n› Kuda\n`;
  switch (type) {
    case "fox":
      if (0 === fox) return m.reply("*Kamu tidak punya pet fox*");
      if (5 === fox) return m.reply("*Pet kamu sudah level max *");
      let wfoxaa = clockString(6e5 - (new Date() - db.data.users[m.sender].foxlastclaim));
      if (new Date() - db.data.users[m.sender].foxlastclaim > 6e5)
        if (db.data.users[m.sender].makananpet > 0) {
          if (db.data.users[m.sender].makananpet -= 1, db.data.users[m.sender].foxexp += 20, db.data.users[m.sender].foxlastclaim = 1 * new Date(), await conn.reply(m.chat, `Feeding ${type} success`, m), setTimeout(async () => {
              await conn.reply(m.chat, "Waktunya memberi makan *fox*\nKarena sudah lapar..", m);
            }, 6e5), fox > 0) {
            let naiklvl = 1e3 * fox - 1;
            db.data.users[m.sender].foxexp > naiklvl && (db.data.users[m.sender].fox += 1, db.data.users[m.sender].foxexp -= 1e3 * fox, await conn.reply(m.chat, "*Congratulations your pet fox level up*", m));
          }
        } else m.reply("Makanan pet kamu tidak cukup");
      else m.reply(`Pet kamu sudah kenyang, Cobalah Untuk Memberi Dia Makan ${wfoxaa} lagi`);
      break;
    case "rhinoceros":
      if (0 === rhinoceros) return m.reply("*Kamu tidak punya pet rhinoceros*");
      if (5 === rhinoceros) return m.reply("*Pet Kamu Telah Level Maximum*");
      let wbadakaa = clockString(6e5 - (new Date() - db.data.users[m.sender].rhinoceroslastclaim));
      if (new Date() - db.data.users[m.sender].rhinoceroslastclaim > 6e5)
        if (db.data.users[m.sender].makananpet > 0) {
          if (db.data.users[m.sender].makananpet -= 1, db.data.users[m.sender].rhinocerosexp += 15, db.data.users[m.sender].rhinoceroslastclaim = 1 * new Date(), await conn.reply(m.chat, `Feeding ${type} success`, m), rhinoceros > 0) {
            let naiklvl = 1e3 * rhinoceros - 1;
            db.data.users[m.sender].rhinocerosexp > naiklvl && (db.data.users[m.sender].rhinoceros += 1, db.data.users[m.sender].rhinocerosexp -= 100 * rhinoceros, await conn.reply(m.chat, "*Congratulations your pet rhinoceros level up*", m));
          }
        } else m.reply("Makanan Pet Kamu Tidak Cukup");
      else m.reply(`Pet Kamu Sudah Kenyang, Cobalah Untuk Memberi Dia Makan ${wbadakaa} lagi`);
      break;
    case "lion":
      if (0 === lion) return m.reply("*Kamu tidak punya pet*");
      if (5 === lion) return m.reply("*Pet Kamu Telah Level Maximum*");
      let wlionaa = clockString(6e5 - (new Date() - db.data.users[m.sender].lionlastclaim));
      if (new Date() - db.data.users[m.sender].lionlastclaim > 6e5)
        if (db.data.users[m.sender].makananpet > 0) {
          if (db.data.users[m.sender].makananpet -= 1, db.data.users[m.sender].lionexp += 15, db.data.users[m.sender].lionlastclaim = 1 * new Date(), await conn.reply(m.chat, `Feeding ${type} success`, m), lion > 0) {
            let naiklvl = 1e3 * lion - 1;
            db.data.users[m.sender].lionexp > naiklvl && (db.data.users[m.sender].lion += 1, db.data.users[m.sender].lionexp -= 100 * lion, await conn.reply(m.chat, "*Congratulations your pet lion level up*", m));
          }
        } else m.reply("Makanan Pet Kamu Tidak Cukup");
      else m.reply(`Pet Kamu Sudah Kenyang, Cobalah Untuk Memberi Dia Makan ${wlionaa} lagi`);
      break;
    case "horse":
      if (0 === horse) return m.reply("*Kamu tidak punya pet horse*");
      if (5 === horse) return m.reply("*Pet kamu sudah level max *");
      let whorseaa = clockString(6e5 - (new Date() - db.data.users[m.sender].horselastclaim));
      if (new Date() - db.data.users[m.sender].horselastclaim > 6e5)
        if (db.data.users[m.sender].makananpet > 0) {
          if (db.data.users[m.sender].makananpet -= 1, db.data.users[m.sender].horseexp += 20, db.data.users[m.sender].horselastclaim = 1 * new Date(), await conn.reply(m.chat, `Feeding ${type} success`, m), setTimeout(async () => {
              await conn.reply(m.chat, "Waktunya memberi makan *horse*\nKarena sudah lapar..", m);
            }, 6e5), horse > 0) {
            let naiklvl = 1e3 * horse - 1;
            db.data.users[m.sender].horseexp > naiklvl && (db.data.users[m.sender].horse += 1, db.data.users[m.sender].horseexp -= 1e3 * horse, await conn.reply(m.chat, "*Congratulations your pet horse level up*", m));
          }
        } else m.reply("Makanan pet kamu tidak cukup");
      else m.reply(`Pet kamu sudah kenyang, Cobalah Untuk Memberi Dia Makan ${whorseaa} lagi`);
      break;
    case "wolf":
      if (0 === wolf) return m.reply("*Kamu tidak punya pet wolf*");
      if (5 === wolf) return m.reply("*Pet kamu sudah level max *");
      let wwolfaa = clockString(6e5 - (new Date() - db.data.users[m.sender].wolflastclaim));
      if (new Date() - db.data.users[m.sender].wolflastclaim > 6e5)
        if (db.data.users[m.sender].makananpet > 0) {
          if (db.data.users[m.sender].makananpet -= 1, db.data.users[m.sender].wolfexp += 15, db.data.users[m.sender].wolflastclaim = 1 * new Date(), await conn.reply(m.chat, `Feeding ${type} success`, m), setTimeout(async () => {
              await conn.reply(m.chat, "Waktunya memberi makan *wolf*\nKarena sudah lapar..", m);
            }, 6e5), wolf > 0) {
            let naiklvl = 1e4 * wolf - 1;
            db.data.users[m.sender].wolfexp > naiklvl && (db.data.users[m.sender].wolf += 1, db.data.users[m.sender].wolfexp -= 1e4 * wolf, await conn.reply(m.chat, "*Congratulations your pet wolf level up*", m));
          }
        } else m.reply("Makanan pet kamu tidak cukup");
      else m.reply(`Pet kamu sudah kenyang, Cobalah Untuk Memberi Dia Makan ${wwolfaa} lagi`);
      break;
    case "dragon":
      if (0 === dragon) return m.reply("*Kamu tidak punya pet dragon*");
      if (5 === dragon) return m.reply("*Pet kamu sudah level max *");
      let wdragonaa = clockString(6e5 - (new Date() - db.data.users[m.sender].dragonlastclaim));
      if (new Date() - db.data.users[m.sender].dragonlastclaim > 6e5)
        if (db.data.users[m.sender].makanandragon > 0) {
          if (db.data.users[m.sender].makanandragon -= 1, db.data.users[m.sender].dragonexp += 10, db.data.users[m.sender].dragonlastclaim = 1 * new Date(), await conn.reply(m.chat, `Feeding ${type} success`, m), setTimeout(async () => {
              await conn.reply(m.chat, "Waktunya memberi makan *dragon*\nKarena sudah lapar..", m);
            }, 6e5), dragon > 0) {
            let naiklvl = 1e4 * dragon - 1;
            db.data.users[m.sender].dragonexp > naiklvl && (db.data.users[m.sender].dragon += 1, db.data.users[m.sender].dragonexp -= 1e4 * dragon, await conn.reply(m.chat, "*Congratulations your pet dragon level up*", m));
          }
        } else m.reply("Makanan pet kamu tidak cukup");
      else m.reply(`Pet kamu sudah kenyang, Cobalah Untuk Memberi Dia Makan ${wdragonaa} lagi`);
      break;
    case "kyubi":
      if (0 === kyubi) return m.reply("*Kamu tidak punya pet kyubi*");
      if (5 === kyubi) return m.reply("*Pet kamu sudah level max *");
      let wkyubiaa = clockString(6e5 - (new Date() - db.data.users[m.sender].kyubilastclaim));
      if (new Date() - db.data.users[m.sender].kyubilastclaim > 6e5)
        if (db.data.users[m.sender].makanankyubi > 0) {
          if (db.data.users[m.sender].makanankyubi -= 1, db.data.users[m.sender].kyubiexp += 10, db.data.users[m.sender].kyubilastclaim = 1 * new Date(), await conn.reply(m.chat, `Feeding ${type} success`, m), setTimeout(async () => {
              await conn.reply(m.chat, "Waktunya memberi makan *Kyubi*\nKarena sudah lapar..", m);
            }, 6e5), kyubi > 0) {
            let naiklvl = 1e4 * kyubi - 1;
            db.data.users[m.sender].kyubiexp > naiklvl && (db.data.users[m.sender].kyubi += 1, db.data.users[m.sender].kyubiexp -= 1e4 * kyubi, await conn.reply(m.chat, "*Congratulations your pet Kyubi level up*", m));
          }
        } else m.reply("Makanan pet kamu tidak cukup");
      else m.reply(`Pet kamu sudah kenyang, Cobalah Untuk Memberi Dia Makan ${wkyubiaa} lagi`);
      break;
    case "centaur":
      if (0 === centaur) return m.reply("*Kamu tidak punya pet centaur*");
      if (5 === centaur) return m.reply("*Pet kamu sudah level max *");
      let wcentauraa = clockString(6e5 - (new Date() - db.data.users[m.sender].centaurlastclaim));
      if (new Date() - db.data.users[m.sender].centaurlastclaim > 6e5)
        if (db.data.users[m.sender].makanancentaur > 0) {
          if (db.data.users[m.sender].makanancentaur -= 1, db.data.users[m.sender].centaurexp += 10, db.data.users[m.sender].centaurlastclaim = 1 * new Date(), await conn.reply(m.chat, `Feeding ${type} success`, m), setTimeout(async () => {
              await conn.reply(m.chat, "Waktunya memberi makan *Centaur*\nKarena sudah lapar..", m);
            }, 6e5), centaur > 0) {
            let naiklvl = 1e4 * centaur - 1;
            db.data.users[m.sender].centaurexp > naiklvl && (db.data.users[m.sender].centaur += 1, db.data.users[m.sender].centaurexp -= 1e4 * centaur, await conn.reply(m.chat, "*Congratulations your pet Centaur level up*", m));
          }
        } else m.reply("Makanan pet kamu tidak cukup");
      else m.reply(`Pet kamu sudah kenyang, Cobalah Untuk Memberi Dia Makan ${wcentauraa} lagi`);
      break;
    case "phonix":
      if (0 === phonix) return m.reply("*Kamu tidak punya pet Phonix*");
      if (5 === phonix) return m.reply("*Pet kamu sudah level max *");
      let wphonixaa = clockString(6e5 - (new Date() - db.data.users[m.sender].phonixlastclaim));
      if (new Date() - db.data.users[m.sender].phonixlastclaim > 6e5)
        if (db.data.users[m.sender].makananphonix > 0) {
          if (db.data.users[m.sender].makananphonix -= 1, db.data.users[m.sender].phonixexp += 10, db.data.users[m.sender].phonixlastclaim = 1 * new Date(), await conn.reply(m.chat, `Feeding ${type} success`, m), setTimeout(async () => {
              await conn.reply(m.chat, "Waktunya memberi makan *Phonix*\nKarena sudah lapar..", m);
            }, 6e5), phonix > 0) {
            let naiklvl = 1e4 * phonix - 1;
            db.data.users[m.sender].phonixexp > naiklvl && (db.data.users[m.sender].phonix += 1, db.data.users[m.sender].phonixexp -= 1e4 * phonix, await conn.reply(m.chat, "*Congratulations your pet Phonix level up*", m));
          }
        } else m.reply("Makanan pet kamu tidak cukup");
      else m.reply(`Pet kamu sudah kenyang, Cobalah Untuk Memberi Dia Makan ${wphonixaa} lagi`);
      break;
    case "griffin":
      if (0 === griffin) return m.reply("*Kamu tidak punya pet Griffin*");
      if (5 === griffin) return m.reply("*Pet kamu sudah level max *");
      let wgriffinaa = clockString(6e5 - (new Date() - db.data.users[m.sender].griffinastclaim));
      if (new Date() - db.data.users[m.sender].griffinlastclaim > 6e5)
        if (db.data.users[m.sender].makanangriffin > 0) {
          if (db.data.users[m.sender].makanangriffin -= 1, db.data.users[m.sender].griffinexp += 10, db.data.users[m.sender].griffinlastclaim = 1 * new Date(), await conn.reply(m.chat, `Feeding ${type} success`, m), setTimeout(async () => {
              await conn.reply(m.chat, "Waktunya memberi makan *Griffin*\nKarena sudah lapar..", m);
            }, 6e5), griffin > 0) {
            let naiklvl = 1e4 * griffin - 1;
            db.data.users[m.sender].griffinexp > naiklvl && (db.data.users[m.sender].griffin += 1, db.data.users[m.sender].griffinexp -= 1e4 * griffin, await conn.reply(m.chat, "*Congratulations your pet Greffin level up*", m));
          }
        } else m.reply("Makanan pet kamu tidak cukup");
      else m.reply(`Pet kamu sudah kenyang, Cobalah Untuk Memberi Dia Makan ${wgriffinaa} lagi`);
      break;
    case "cat":
      if (0 === cat) return m.reply("*Kamu tidak punya pet cat*");
      if (5 === cat) return m.reply("*Pet kamu sudah level max *");
      let wcataa = clockString(6e5 - (new Date() - db.data.users[m.sender].catlastclaim));
      if (new Date() - db.data.users[m.sender].catlastclaim > 6e5)
        if (db.data.users[m.sender].makananpet > 0) {
          if (db.data.users[m.sender].makananpet -= 1, db.data.users[m.sender].catexp += 20, db.data.users[m.sender].catlastclaim = 1 * new Date(), await conn.reply(m.chat, `Feeding ${type} success`, m), setTimeout(async () => {
              await conn.reply(m.chat, "Waktunya memberi makan *cat*\nKarena sudah lapar..", m);
            }, 6e5), cat > 0) {
            let naiklvl = 1e3 * cat - 1;
            db.data.users[m.sender].catexp > naiklvl && (db.data.users[m.sender].cat += 1, db.data.users[m.sender].catexp -= 1e3 * cat, await conn.reply(m.chat, "*Congratulations your pet cat level up*", m));
          }
        } else m.reply("Makanan pet kamu tidak cukup");
      else m.reply(`Pet kamu sudah kenyang, Cobalah Untuk Memberi Dia Makan ${wcataa} lagi`);
      break;
    case "rubah":
      if (0 === rubah) return m.reply("*Kamu belum memiliki Pet Rubah*");
      if (10 === rubah) return m.reply("*Pet kamu dah lvl max*");
      let wrubahaa = clockString(6e5 - (new Date() - user.foxlastfeed));
      if (new Date() - user.foxlastfeed > 6e5)
        if (user.petFood > 0) {
          if (user.petFood -= 1, user.foxexp += 20, user.foxlastfeed = 1 * new Date(), await conn.reply(m.chat, `Berhasil memberi makan pet ${type} 🦊`, m), rubah > 0) {
            let naiklvl = 100 * rubah - 1;
            user.foxexp > naiklvl && (user.fox += 1, user.foxexp -= 100 * rubah, await conn.reply(m.chat, "*Selamat Pet Rubah kamu naik level ✨*", m));
          }
        } else m.reply("Makanan pet kamu tidak cukup");
      else m.reply(`Pet kamu sudah kenyang, Cobalah Untuk Memberi Dia Makan ${wrubahaa} lagi`);
      break;
    case "kucing":
      if (0 === kucing) return m.reply("*Kamu belum memiliki Pet Kucing*");
      if (10 === kucing) return m.reply("*Pet kamu dah lvl max*");
      let wkucingaa = clockString(6e5 - (new Date() - user.catlastfeed));
      if (new Date() - user.catlastfeed > 6e5)
        if (user.petFood > 0) {
          if (user.petFood -= 1, user.catngexp += 20, user.catlastfeed = 1 * new Date(), await conn.reply(m.chat, `Berhasil memberi makan pet ${type} 🐱`, m), kucing > 0) {
            let naiklvl = 100 * kucing - 1;
            user.catexp > naiklvl && (user.cat += 1, user.catngexp -= 100 * kucing, await conn.reply(m.chat, "*Selamat Pet Kucing kamu naik level ✨*", m));
          }
        } else m.reply("Makanan pet kamu tidak cukup");
      else m.reply(`Pet kamu sudah kenyang, Cobalah Untuk Memberi Dia Makan ${wkucingaa} lagi`);
      break;
    case "anjing":
      if (0 === anjing) return m.reply("*Kamu belum memiliki Pet Anjing*");
      if (10 === anjing) return m.reply("*Pet kamu dah lvl max*");
      let wanjingaa = clockString(6e5 - (new Date() - user.doglastfeed));
      if (new Date() - user.doglastfeed > 6e5)
        if (user.petFood > 0) {
          if (user.petFood -= 1, user.dogexp += 20, user.doglastfeed = 1 * new Date(), await conn.reply(m.chat, `Berhasil memberi makan pet ${type} 🐶`, m), anjing > 0) {
            let naiklvl = 100 * anjing - 1;
            user.dogexp > naiklvl && (user.dog += 1, user.dogexp -= 100 * anjing, await conn.reply(m.chat, "*Selamat Pet Anjing kamu naik level ✨*", m));
          }
        } else m.reply("Makanan pet kamu tidak cukup");
      else m.reply(`Pet kamu sudah kenyang, Cobalah Untuk Memberi Dia Makan ${wanjingaa} lagi`);
      break;
    case "kuda":
      if (0 === kuda) return m.reply("*Kamu belum memiliki Pet Kuda*");
      if (10 === kuda) return m.reply("*Pet kamu dah lvl max*");
      let wkudaaa = clockString(6e5 - (new Date() - user.horselastfeed));
      if (new Date() - user.horselastfeed > 6e5)
        if (user.petFood > 0) {
          if (user.petFood -= 1, user.horseexp += 20, user.horselastfeed = 1 * new Date(), await conn.reply(m.chat, `Berhasil memberi makan pet ${type} 🐴`, m), kuda > 0) {
            let naiklvl = 100 * kuda - 1;
            user.horseexp > naiklvl && (user.horse += 1, user.horseexp -= 100 * kuda, await conn.reply(m.chat, "*Selamat Pet Kuda kamu naik level ✨*", m));
          }
        } else m.reply("Makanan pet kamu tidak cukup");
      else m.reply(`Pet kamu sudah kenyang, Cobalah Untuk Memberi Dia Makan ${wkudaaa} lagi`);
      break;
    default:
      await conn.sendMessage(m.chat, {
        text: baba,
        footer: author,
        title: "「 *F E E D   PET* 」",
        buttonText: "F E E D",
        sections: [{
          title: "List Featured",
          rows: [{
            title: "Feed Fox",
            rowId: ".feed fox",
            description: "Memberi makan Fox"
          }, {
            title: "Feed rhinoceros",
            rowId: ".feed rhinoceros",
            description: "Memberi makan Rhinoceros"
          }, {
            title: "Feed Lion",
            rowId: ".feed lion",
            description: "Memberi makan Lion"
          }, {
            title: "Feed Horse",
            rowId: ".feed horse",
            description: "Memberi makan Horse"
          }, {
            title: "Feed Wolf",
            rowId: ".feed wolf",
            description: "Memberi makan Wolf"
          }, {
            title: "Feed Dragon",
            rowId: ".feed dragon",
            description: "Memberi makan Dragon"
          }, {
            title: "Feed Kyubi",
            rowId: ".feed kyubi",
            description: "Memberi makan Kyubi"
          }, {
            title: "Feed Centaur",
            rowId: ".feed centaur",
            description: "Memberi makan Centaur"
          }, {
            title: "Feed Griffin",
            rowId: ".feed griffin",
            description: "Memberi makan Griffin"
          }, {
            title: "Feed Phoenix",
            rowId: ".feed phoenix",
            description: "Memberi makan Phoenix"
          }, {
            title: "Feed Cat",
            rowId: ".feed cat",
            description: "Memberi makan Cat"
          }, {
            title: "Feed Rubah",
            rowId: ".feed rubah",
            description: "Memberi makan Rubah"
          }, {
            title: "Feed Kuda",
            rowId: ".feed kuda",
            description: "Memberi makan Kuda"
          }, {
            title: "Feed Kucing",
            rowId: ".feed kucing",
            description: "Memberi makan Kucing"
          }, {
            title: "Feed Anjing",
            rowId: ".feed anjing",
            description: "Memberi makan Anjing"
          }]
        }]
      });
  }
};
handler.help = ["feed [pet type]"], handler.tags = ["rpg"], handler.command = /^(feed(ing)?)$/i;
export default handler;

function clockString(ms) {
  return [isNaN(ms) ? "--" : Math.floor(ms / 864e5), " *Days ☀️*\n ", isNaN(ms) ? "--" : Math.floor(ms / 36e5) % 24, " *Hours 🕐*\n ", isNaN(ms) ? "--" : Math.floor(ms / 6e4) % 60, " *Minute ⏰*\n ", isNaN(ms) ? "--" : Math.floor(ms / 1e3) % 60, " *Second ⏱️* "].map(v => v.toString().padStart(2, 0)).join("");
}