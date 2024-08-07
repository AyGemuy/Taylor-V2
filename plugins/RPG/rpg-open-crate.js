const handler = async (m, {
  conn,
  command,
  args,
  text,
  usedPrefix
}) => {
  let bruh = `${usedPrefix}open <crate name> < 1 | 10 | 100 | 1000 >\n\nContoh penggunaan: *${usedPrefix}open common 10*\n\nlist crate:\n*pet*\n*boxs*\n*cupon*\n*common*\n*uncommon*\n*mythic*\n*legendary*\n*gardenboxs*`,
    _lmao = args[0],
    Lmao = `Hanya support 1, 10, 100, 1000\nContoh penggunaan: *${usedPrefix}open ${args > 2 ? _lmao : pickRandom([ "common", "uncommon", "mythic", "legendary" ])} 10*`,
    type = (args[0] || "").toLowerCase(),
    jumlah = (args[1] || "").toLowerCase();
  switch (type) {
    case "common":
      switch (jumlah) {
        case "1":
        case "crate":
          let lastime = clockString(3e4 - (new Date() - db.data.users[m.sender].lastopen));
          if (new Date() - db.data.users[m.sender].lastopen > 3e4) {
            let cm = 1 * `${Math.floor(50 * Math.random())}`.trim(),
              cc = 1 * `${Math.floor(2 * Math.random())}`.trim(),
              cp = 1 * `${Math.floor(1 * Math.random())}`.trim(),
              ce = 1 * `${Math.floor(100 * Math.random())}`.trim(),
              cu = 1 * `${Math.floor(1 * Math.random())}`.trim(),
              Hcom = `\nAnda telah membuka *Common crate* dan mendapatkan:${cm > 0 ? `\nMoney: ${cm}` : ""}${ce > 0 ? `\nExp: ${ce} *exp*` : ""}${cp > 0 ? `\nPotion: ${cp} *potion*` : ""}${cc > 0 ? `\ncommon crate: ${cc} *crate*` : ""}${cu > 0 ? `\nUncommon crate: ${cu} *crate*` : ""}\n`.trim();
            db.data.users[m.sender].common >= 1 ? (db.data.users[m.sender].common -= 1, db.data.users[m.sender].money += 1 * cm, db.data.users[m.sender].exp += 1 * ce, db.data.users[m.sender].potion += 1 * cp, db.data.users[m.sender].uncommon += 1 * cu, db.data.users[m.sender].common += 1 * cc, db.data.users[m.sender].lastopen = 1 * new Date(), await conn.reply(m.chat, Hcom, m)) : await conn.reply(m.chat, "Common crate anda tidak cukup", m);
          } else await conn.reply(m.chat, `Mohon tunggu ${lastime} lagi untuk bisa membuka fitur open`, m);
          break;
        case "10":
          let lastimeq = clockString(3e4 - (new Date() - db.data.users[m.sender].lastopen));
          if (new Date() - db.data.users[m.sender].lastopen > 3e4) {
            let cm1 = 1 * `${Math.floor(500 * Math.random())}`.trim(),
              cc1 = 1 * `${Math.floor(5 * Math.random())}`.trim(),
              cp1 = 1 * `${Math.floor(3 * Math.random())}`.trim(),
              ce1 = 1 * `${Math.floor(700 * Math.random())}`.trim(),
              cu1 = 1 * `${Math.floor(3 * Math.random())}`.trim(),
              Hcom1 = `\nAnda telah membuka *Common crate* dan mendapatkan:${cm1 > 0 ? `\nMoney: ${cm1}` : ""}${ce1 > 0 ? `\nExp: ${ce1} *exp*` : ""}${cp1 > 0 ? `\nPotion: ${cp1} *potion*` : ""}${cc1 > 0 ? `\ncommon crate: ${cc1} *crate*` : ""}${cu1 > 0 ? `\nUncommon crate: ${cu1} *crate*` : ""}\n`.trim();
            db.data.users[m.sender].common >= 10 ? (db.data.users[m.sender].common -= 10, db.data.users[m.sender].money += 1 * cm1, db.data.users[m.sender].exp += 1 * ce1, db.data.users[m.sender].potion += 1 * cp1, db.data.users[m.sender].uncommon += 1 * cu1, db.data.users[m.sender].common += 1 * cc1, db.data.users[m.sender].lastopen = 1 * new Date(), await conn.reply(m.chat, Hcom1, m)) : await conn.reply(m.chat, "Common crate anda tidak cukup", m);
          } else await conn.reply(m.chat, `Mohon tunggu ${lastimeq} lagi untuk bisa membuka fitur open`, m);
          break;
        case "100":
          let lastimeqq = clockString(3e4 - (new Date() - db.data.users[m.sender].lastopen));
          if (new Date() - db.data.users[m.sender].lastopen > 3e4) {
            let cm2 = 1 * `${Math.floor(5e3 * Math.random())}`.trim(),
              cc2 = 1 * `${Math.floor(50 * Math.random())}`.trim(),
              cp2 = 1 * `${Math.floor(20 * Math.random())}`.trim(),
              ce2 = 1 * `${Math.floor(7500 * Math.random())}`.trim(),
              cu2 = 1 * `${Math.floor(30 * Math.random())}`.trim(),
              Hcom2 = `\nAnda telah membuka *Common crate* dan mendapatkan:${cm2 > 0 ? `\nMoney: ${cm2}` : ""}${ce2 > 0 ? `\nExp: ${ce2} *exp*` : ""}${cp2 > 0 ? `\nPotion: ${cp2} *potion*` : ""}${cc2 > 0 ? `\ncommon crate: ${cc2} *crate*` : ""}${cu2 > 0 ? `\nUncommon crate: ${cu2} *crate*` : ""}\n`.trim();
            db.data.users[m.sender].common >= 100 ? (db.data.users[m.sender].common -= 100, db.data.users[m.sender].money += 1 * cm2, db.data.users[m.sender].exp += 1 * ce2, db.data.users[m.sender].potion += 1 * cp2, db.data.users[m.sender].uncommon += 1 * cu2, db.data.users[m.sender].common += 1 * cc2, db.data.users[m.sender].lastopen = 1 * new Date(), await conn.reply(m.chat, Hcom2, m)) : await conn.reply(m.chat, "Common crate anda tidak cukup", m);
          } else await conn.reply(m.chat, `Mohon tunggu ${lastimeqq} lagi untuk bisa membuka fitur open`, m);
          break;
        case "1000":
          let lastimeqqq = clockString(3e4 - (new Date() - db.data.users[m.sender].lastopen));
          if (new Date() - db.data.users[m.sender].lastopen > 3e4) {
            let cm3 = 1 * `${Math.floor(5e4 * Math.random())}`.trim(),
              cc3 = 1 * `${Math.floor(350 * Math.random())}`.trim(),
              cp3 = 1 * `${Math.floor(100 * Math.random())}`.trim(),
              ce3 = 1 * `${Math.floor(8e4 * Math.random())}`.trim(),
              cu3 = 1 * `${Math.floor(200 * Math.random())}`.trim(),
              Hcom3 = `\nAnda telah membuka *Common crate* dan mendapatkan:${cm3 > 0 ? `\nMoney: ${cm3}` : ""}${ce3 > 0 ? `\nExp: ${ce3} *exp*` : ""}${cp3 > 0 ? `\nPotion: ${cp3} *potion*` : ""}${cc3 > 0 ? `\ncommon crate: ${cc3} *crate*` : ""}${cu3 > 0 ? `\nUncommon crate: ${cu3} *crate*` : ""}\n`.trim();
            db.data.users[m.sender].common >= 1e3 ? (db.data.users[m.sender].common -= 1e3, db.data.users[m.sender].money += 1 * cm3, db.data.users[m.sender].exp += 1 * ce3, db.data.users[m.sender].potion += 1 * cp3, db.data.users[m.sender].uncommon += 1 * cu3, db.data.users[m.sender].common += 1 * cc3, db.data.users[m.sender].lastopen = 1 * new Date(), await conn.reply(m.chat, Hcom3, m)) : await conn.reply(m.chat, "Common crate anda tidak cukup", m);
          } else await conn.reply(m.chat, `Mohon tunggu ${lastimeqqq} lagi untuk bisa membuka fitur open`, m);
          break;
        default:
          return await conn.reply(m.chat, Lmao, m);
      }
      break;
    case "uncommon":
      switch (jumlah) {
        case "1":
        case "crate":
          let lastimew = clockString(3e4 - (new Date() - db.data.users[m.sender].lastopen));
          if (new Date() - db.data.users[m.sender].lastopen > 3e4) {
            let ud = 1 * `${Math.floor(2 * Math.random())}`.trim(),
              ue = 1 * `${Math.floor(100 * Math.random())}`.trim(),
              um = 1 * `${Math.floor(150 * Math.random())}`.trim(),
              up = 1 * `${Math.floor(2 * Math.random())}`.trim(),
              umc = 1 * `${Math.floor(1 * Math.random())}`.trim(),
              uu = 1 * `${Math.floor(2 * Math.random())}`.trim(),
              uc = 1 * `${Math.floor(3 * Math.random())}`.trim(),
              Hun = `\nAnda telah membuka *Uncommon crate* dan mendapatkan:${um > 0 ? `\nMoney: ${um}` : ""}${ue > 0 ? `\nExp: ${ue} *exp*` : ""}${ud > 0 ? `\nDiamond: ${ud} *diamond*` : ""}${up > 0 ? `\nPotion: ${up} *potion*` : ""}${uc > 0 ? `\nCommon crate: ${uc} *crate*` : ""}${uu > 0 ? `\nUncommon crate: ${uu} *crate*` : ""}\n`.trim();
            db.data.users[m.sender].uncommon >= 1 ? (db.data.users[m.sender].uncommon -= 1, db.data.users[m.sender].money += 1 * um, db.data.users[m.sender].diamond += 1 * ud, db.data.users[m.sender].exp += 1 * ue, db.data.users[m.sender].potion += 1 * up, db.data.users[m.sender].common += 1 * uc, db.data.users[m.sender].uncommon += 1 * uu, db.data.users[m.sender].lastopen = 1 * new Date(), await conn.reply(m.chat, Hun, m), umc > 0 && (await conn.reply(m.chat, `*Selamat anda mendapatkan item Rare yaitu*\n${umc} Mythic Crate`, m), db.data.users[m.sender].mythic += 1 * umc)) : await conn.reply(m.chat, "Uncommon crate anda tidak cukup", m);
          } else await conn.reply(m.chat, `Mohon tunggu ${lastimew} lagi untuk bisa membuka fitur open`, m);
          break;
        case "10":
          let lastimewe = clockString(3e4 - (new Date() - db.data.users[m.sender].lastopen));
          if (new Date() - db.data.users[m.sender].lastopen > 3e4) {
            let ud1 = 1 * `${Math.floor(5 * Math.random())}`.trim(),
              ue1 = 1 * `${Math.floor(750 * Math.random())}`.trim(),
              um1 = 1 * `${Math.floor(400 * Math.random())}`.trim(),
              up1 = 1 * `${Math.floor(7 * Math.random())}`.trim(),
              umc1 = 1 * `${Math.floor(2 * Math.random())}`.trim(),
              uu1 = 1 * `${Math.floor(4 * Math.random())}`.trim(),
              uc1 = 1 * `${Math.floor(7 * Math.random())}`.trim(),
              Hun1 = `\nAnda telah membuka *Uncommon crate* dan mendapatkan:${um1 > 0 ? `\nMoney: ${um1}` : ""}${ue1 > 0 ? `\nExp: ${ue1} *exp*` : ""}${ud1 > 0 ? `\nDiamond: ${ud1} *diamond*` : ""}${up1 > 0 ? `\nPotion: ${up1} *potion*` : ""}${uc1 > 0 ? `\nCommon crate: ${uc1} *crate*` : ""}${uu1 > 0 ? `\nUncommon crate: ${uu1} *crate*` : ""}\n`.trim();
            db.data.users[m.sender].uncommon >= 10 ? (db.data.users[m.sender].uncommon -= 10, db.data.users[m.sender].money += 1 * um1, db.data.users[m.sender].diamond += 1 * ud1, db.data.users[m.sender].exp += 1 * ue1, db.data.users[m.sender].potion += 1 * up1, db.data.users[m.sender].common += 1 * uc1, db.data.users[m.sender].uncommon += 1 * uu1, db.data.users[m.sender].lastopen = 1 * new Date(), await conn.reply(m.chat, Hun1, m), umc1 > 0 && (await conn.reply(m.chat, `*Selamat anda mendapatkan item Rare yaitu*\n${umc1} Mythic Crate`, m), db.data.users[m.sender].mythic += 1 * umc1)) : await conn.reply(m.chat, "Uncommon crate anda tidak cukup", m);
          } else await conn.reply(m.chat, `Mohon tunggu ${lastimewe} lagi untuk bisa membuka fitur open`, m);
          break;
        case "100":
          let lastimewee = clockString(3e4 - (new Date() - db.data.users[m.sender].lastopen));
          if (new Date() - db.data.users[m.sender].lastopen > 3e4) {
            let ud2 = 1 * `${Math.floor(20 * Math.random())}`.trim(),
              ue2 = 1 * `${Math.floor(8e3 * Math.random())}`.trim(),
              um2 = 1 * `${Math.floor(5e3 * Math.random())}`.trim(),
              up2 = 1 * `${Math.floor(20 * Math.random())}`.trim(),
              umc2 = 1 * `${Math.floor(10 * Math.random())}`.trim(),
              uu2 = 1 * `${Math.floor(25 * Math.random())}`.trim(),
              uc2 = 1 * `${Math.floor(50 * Math.random())}`.trim(),
              Hun2 = `\nAnda telah membuka *Uncommon crate* dan mendapatkan:${um2 > 0 ? `\nMoney: ${um2}` : ""}${ue2 > 0 ? `\nExp: ${ue2} *exp*` : ""}${ud2 > 0 ? `\nDiamond: ${ud2} *diamond*` : ""}${up2 > 0 ? `\nPotion: ${up2} *potion*` : ""}${uc2 > 0 ? `\nCommon crate: ${uc2} *crate*` : ""}${uu2 > 0 ? `\nUncommon crate: ${uu2} *crate*` : ""}\n`.trim();
            db.data.users[m.sender].uncommon >= 100 ? (db.data.users[m.sender].uncommon -= 100, db.data.users[m.sender].money += 1 * um2, db.data.users[m.sender].diamond += 1 * ud2, db.data.users[m.sender].exp += 1 * ue2, db.data.users[m.sender].potion += 1 * up2, db.data.users[m.sender].common += 1 * uc2, db.data.users[m.sender].uncommon += 1 * uu2, db.data.users[m.sender].lastopen = 1 * new Date(), await conn.reply(m.chat, Hun2, m), umc2 > 0 && (await conn.reply(m.chat, `*Selamat anda mendapatkan item Rare yaitu*\n${umc2} Mythic Crate`, m), db.data.users[m.sender].mythic += 1 * umc2)) : await conn.reply(m.chat, "Uncommon crate anda tidak cukup", m);
          } else await conn.reply(m.chat, `Mohon tunggu ${lastimewee} lagi untuk bisa membuka fitur open`, m);
          break;
        case "1000":
          let lastimeweee = clockString(3e4 - (new Date() - db.data.users[m.sender].lastopen));
          if (new Date() - db.data.users[m.sender].lastopen > 3e4) {
            let ud3 = 1 * `${Math.floor(50 * Math.random())}`.trim(),
              ue3 = 1 * `${Math.floor(1e5 * Math.random())}`.trim(),
              um3 = 1 * `${Math.floor(5e4 * Math.random())}`.trim(),
              up3 = 1 * `${Math.floor(100 * Math.random())}`.trim(),
              umc3 = 1 * `${Math.floor(100 * Math.random())}`.trim(),
              uu3 = 1 * `${Math.floor(100 * Math.random())}`.trim(),
              uc3 = 1 * `${Math.floor(200 * Math.random())}`.trim(),
              Hun3 = `\nAnda telah membuka *Uncommon crate* dan mendapatkan:${um3 > 0 ? `\nMoney: ${um3}` : ""}${ue3 > 0 ? `\nExp: ${ue3} *exp*` : ""}${ud3 > 0 ? `\nDiamond: ${ud3} *diamond*` : ""}${up3 > 0 ? `\nPotion: ${up3} *potion*` : ""}${uc3 > 0 ? `\nCommon crate: ${uc3} *crate*` : ""}${uu3 > 0 ? `\nUncommon crate: ${uu3} *crate*` : ""}\n`.trim();
            db.data.users[m.sender].uncommon >= 1e3 ? (db.data.users[m.sender].uncommon -= 1e3, db.data.users[m.sender].money += 1 * um3, db.data.users[m.sender].diamond += 1 * ud3, db.data.users[m.sender].exp += 1 * ue3, db.data.users[m.sender].potion += 1 * up3, db.data.users[m.sender].common += 1 * uc3, db.data.users[m.sender].uncommon += 1 * uu3, db.data.users[m.sender].lastopen = 1 * new Date(), await conn.reply(m.chat, Hun3, m), umc3 > 0 && (await conn.reply(m.chat, `*Selamat anda mendapatkan item Rare yaitu*\n${umc3} Mythic Crate`, m), db.data.users[m.sender].mythic += 1 * umc3)) : await conn.reply(m.chat, "Uncommon crate anda tidak cukup", m);
          } else await conn.reply(m.chat, `Mohon tunggu ${lastimeweee} lagi untuk bisa membuka fitur open`, m);
          break;
        default:
          return await conn.reply(m.chat, Lmao, m);
      }
      break;
    case "mythic":
      switch (jumlah) {
        case "1":
        case "crate":
          let lastimep = clockString(3e4 - (new Date() - db.data.users[m.sender].lastopen));
          if (new Date() - db.data.users[m.sender].lastopen > 3e4) {
            let mm = 1 * `${Math.floor(200 * Math.random())}`.trim(),
              mmm = 1 * `${pickRandom([ "0", "0", "1", "0" ])}`.trim(),
              me = 1 * `${Math.floor(250 * Math.random())}`.trim(),
              mp = 1 * `${Math.floor(3 * Math.random())}`.trim(),
              mu = 1 * `${Math.floor(3 * Math.random())}`.trim(),
              mc = 1 * `${Math.floor(5 * Math.random())}`.trim(),
              ml = 1 * `${pickRandom([ "0", "0", "1", "0", "0" ])}`.trim(),
              md = 1 * `${Math.floor(3 * Math.random())}`.trim(),
              Mychat = `\nAnda telah membuka *Mythic crate* dan mendapatkan:${mm > 0 ? `\nMoney: ${mm}` : ""}${me > 0 ? `\nExp: ${me} *exp*` : ""}${md > 0 ? `\nDiamond: ${md} *diamond*` : ""}${mp > 0 ? `\nPotion: ${mp} *potion*` : ""}${mc > 0 ? `\nCommon crate: ${mc} *crate*` : ""}${mu > 0 ? `\nUncommon crate: ${mu} *crate*` : ""}\n`.trim();
            db.data.users[m.sender].mythic >= 1 ? (db.data.users[m.sender].mythic -= 1, db.data.users[m.sender].money += 1 * mm, db.data.users[m.sender].diamond += 1 * md, db.data.users[m.sender].exp += 1 * me, db.data.users[m.sender].potion += 1 * mp, db.data.users[m.sender].common += 1 * mc, db.data.users[m.sender].uncommon += 1 * mu, db.data.users[m.sender].lastopen = 1 * new Date(), await conn.reply(m.chat, Mychat, m), mmm > 0 && (await conn.reply(m.chat, `*Selamat anda mendapatkan item Rare yaitu*\n${mmm} Mythic Crate`, m), db.data.users[m.sender].mythic += 1 * mmm), ml > 0 && (await conn.reply(m.chat, `*Selamat anda mendapatkan item Epic yaitu*\n${ml} Legendary Crate`, m), db.data.users[m.sender].legendary += 1 * ml)) : await conn.reply(m.chat, "Mythic crate anda tidak cukup", m);
          } else await conn.reply(m.chat, `Mohon tunggu ${lastimep} lagi untuk bisa membuka fitur open`, m);
          break;
        case "10":
          let lastimepa = clockString(3e4 - (new Date() - db.data.users[m.sender].lastopen));
          if (new Date() - db.data.users[m.sender].lastopen > 3e4) {
            let mm1 = 1 * `${Math.floor(2e3 * Math.random())}`.trim(),
              mmm1 = 1 * `${Math.floor(4 * Math.random())}`.trim(),
              me1 = 1 * `${Math.floor(3e3 * Math.random())}`.trim(),
              mp1 = 1 * `${Math.floor(6 * Math.random())}`.trim(),
              mu1 = 1 * `${Math.floor(6 * Math.random())}`.trim(),
              mc1 = 1 * `${Math.floor(11 * Math.random())}`.trim(),
              ml1 = 1 * `${Math.floor(1 * Math.random())}`.trim(),
              md1 = 1 * `${Math.floor(5 * Math.random())}`.trim(),
              Mychat1 = `\nAnda telah membuka *Mythic crate* dan mendapatkan:${mm1 > 0 ? `\nMoney: ${mm1}` : ""}${me1 > 0 ? `\nExp: ${me1} *exp*` : ""}${md1 > 0 ? `\nDiamond: ${md1} *diamond*` : ""}${mp1 > 0 ? `\nPotion: ${mp1} *potion*` : ""}${mc1 > 0 ? `\nCommon crate: ${mc1} *crate*` : ""}${mu1 > 0 ? `\nUncommon crate: ${mu1} *crate*` : ""}\n`.trim();
            db.data.users[m.sender].mythic >= 10 ? (db.data.users[m.sender].mythic -= 10, db.data.users[m.sender].money += 1 * mm1, db.data.users[m.sender].diamond += 1 * md1, db.data.users[m.sender].exp += 1 * me1, db.data.users[m.sender].potion += 1 * mp1, db.data.users[m.sender].common += 1 * mc1, db.data.users[m.sender].uncommon += 1 * mu1, db.data.users[m.sender].lastopen = 1 * new Date(), await conn.reply(m.chat, Mychat1, m), mmm1 > 0 && (await conn.reply(m.chat, `*Selamat anda mendapatkan item Rare yaitu*\n${mmm1} Mythic Crate`, m), db.data.users[m.sender].mythic += 1 * mmm1), ml1 > 0 && (await conn.reply(m.chat, `*Selamat anda mendapatkan item Epic yaitu*\n${ml1} Legendary Crate`, m), db.data.users[m.sender].legendary += 1 * ml1)) : await conn.reply(m.chat, "Mythic crate anda tidak cukup", m);
          } else await conn.reply(m.chat, `Mohon tunggu ${lastimepa} lagi untuk bisa membuka fitur open`, m);
          break;
        case "100":
          let lastimepaa = clockString(3e4 - (new Date() - db.data.users[m.sender].lastopen));
          if (new Date() - db.data.users[m.sender].lastopen > 3e4) {
            let mm2 = 1 * `${Math.floor(25e3 * Math.random())}`.trim(),
              me2 = (`${Math.floor(10 * Math.random())}`.trim(), 1 * `${Math.floor(3e4 * Math.random())}`.trim()),
              mp2 = 1 * `${Math.floor(50 * Math.random())}`.trim(),
              mu2 = 1 * `${Math.floor(80 * Math.random())}`.trim(),
              mc2 = 1 * `${Math.floor(150 * Math.random())}`.trim(),
              md2 = (`${Math.floor(6 * Math.random())}`.trim(), 1 * `${Math.floor(20 * Math.random())}`.trim()),
              Mychat2 = `\nAnda telah membuka *Mythic crate* dan mendapatkan:${mm2 > 0 ? `\nMoney: ${mm2}` : ""}${me2 > 0 ? `\nExp: ${me2} *exp*` : ""}${md2 > 0 ? `\nDiamond: ${md2} *diamond*` : ""}${mp2 > 0 ? `\nPotion: ${mp2} *potion*` : ""}${mc2 > 0 ? `\nCommon crate: ${mc2} *crate*` : ""}${mu2 > 0 ? `\nUncommon crate: ${mu2} *crate*` : ""}\n`.trim();
            db.data.users[m.sender].mythic >= 100 ? (db.data.users[m.sender].mythic -= 100, db.data.users[m.sender].money += 1 * mm2, db.data.users[m.sender].diamond += 1 * md2, db.data.users[m.sender].exp += 1 * me2, db.data.users[m.sender].potion += 1 * mp2, db.data.users[m.sender].common += 1 * mc2, db.data.users[m.sender].uncommon += 1 * mu2, db.data.users[m.sender].lastopen = 1 * new Date(), await conn.reply(m.chat, Mychat2, m)) : await conn.reply(m.chat, "Mythic crate anda tidak cukup", m);
          } else await conn.reply(m.chat, `Mohon tunggu ${lastimepaa} lagi untuk bisa membuka fitur open`, m);
          break;
        case "1000":
          let lastimepaaa = clockString(3e4 - (new Date() - db.data.users[m.sender].lastopen));
          if (new Date() - db.data.users[m.sender].lastopen > 3e4) {
            let mm3 = 1 * `${Math.floor(5e5 * Math.random())}`.trim(),
              mmm3 = 1 * `${Math.floor(50 * Math.random())}`.trim(),
              me3 = 1 * `${Math.floor(75e4 * Math.random())}`.trim(),
              mp3 = 1 * `${Math.floor(70 * Math.random())}`.trim(),
              mu3 = 1 * `${Math.floor(250 * Math.random())}`.trim(),
              mc3 = 1 * `${Math.floor(750 * Math.random())}`.trim(),
              ml3 = 1 * `${Math.floor(10 * Math.random())}`.trim(),
              md3 = 1 * `${Math.floor(50 * Math.random())}`.trim(),
              Mychat3 = `\nAnda telah membuka *Mythic crate* dan mendapatkan:${mm3 > 0 ? `\nMoney: ${mm3}` : ""}${me3 > 0 ? `\nExp: ${me3} *exp*` : ""}${md3 > 0 ? `\nDiamond: ${md3} *diamond*` : ""}${mp3 > 0 ? `\nPotion: ${mp3} *potion*` : ""}${mc3 > 0 ? `\nCommon crate: ${mc3} *crate*` : ""}${mu3 > 0 ? `\nUncommon crate: ${mu3} *crate*` : ""}\n`.trim();
            db.data.users[m.sender].mythic >= 1e3 ? (db.data.users[m.sender].mythic -= 1e3, db.data.users[m.sender].money += 1 * mm3, db.data.users[m.sender].diamond += 1 * md3, db.data.users[m.sender].exp += 1 * me3, db.data.users[m.sender].potion += 1 * mp3, db.data.users[m.sender].common += 1 * mc3, db.data.users[m.sender].uncommon += 1 * mu3, db.data.users[m.sender].lastopen = 1 * new Date(), await conn.reply(m.chat, Mychat3, m), mmm3 > 0 && (await conn.reply(m.chat, `*Selamat anda mendapatkan item Rare yaitu*\n${mmm3} Mythic Crate`, m), db.data.users[m.sender].mythic += 1 * mmm3), ml3 > 0 && (await conn.reply(m.chat, `*Selamat anda mendapatkan item Epic yaitu*\n${ml3} Legendary Crate`, m), db.data.users[m.sender].legendary += 1 * ml3)) : await conn.reply(m.chat, "Mythic crate anda tidak cukup", m);
          } else await conn.reply(m.chat, `Mohon tunggu ${lastimepaaa} lagi untuk bisa membuka fitur open`, m);
          break;
        default:
          return await conn.reply(m.chat, Lmao, m);
      }
      break;
    case "boxs":
      switch (jumlah) {
        case "1":
        case "crate":
          let lastimed = clockString(3e4 - (new Date() - db.data.users[m.sender].lastopen));
          if (new Date() - db.data.users[m.sender].lastopen > 3e4) {
            let _mmz = `${Math.floor(500 * Math.random())}`.trim(),
              _bbbz = `${pickRandom([ "0", "0", "1", "0" ])}`.trim(),
              _mez = `${Math.floor(250 * Math.random())}`.trim(),
              _mpz = `${Math.floor(3 * Math.random())}`.trim(),
              _lmz = `${Math.floor(3 * Math.random())}`.trim(),
              _hmz = `${Math.floor(5 * Math.random())}`.trim(),
              mmz = 1 * _mmz,
              bbbz = 1 * _bbbz,
              mez = 1 * _mez,
              mpz = 1 * _mpz,
              mlz = 1 * `${Math.floor(1 * Math.random())}`.trim(),
              hmz = 1 * _hmz,
              lmz = 1 * _lmz,
              ebz = 1 * `${Math.floor(3 * Math.random())}`.trim(),
              Mychatz = `\nAnda telah membuka *Boxs crate* dan mendapatkan:${mmz > 0 ? `\nMoney: ${mmz}` : ""}${mez > 0 ? `\nExp: ${mez} *exp*` : ""}${ebz > 0 ? `\nEmasBiasa: ${ebz} *emasbiasa*` : ""}${mpz > 0 ? `\nPotion: ${mpz} *potion*` : ""}${hmz > 0 ? `\nTiketM: ${hmz} *tiketm*` : ""}${lmz > 0 ? `\nMakanan Pet: ${lmz} *makananpet*` : ""}\n`.trim();
            db.data.users[m.sender].boxs >= 1 ? (db.data.users[m.sender].boxs -= 1, db.data.users[m.sender].money += 1 * mmz, db.data.users[m.sender].emasbiasa += 1 * ebz, db.data.users[m.sender].exp += 1 * mez, db.data.users[m.sender].potion += 1 * mpz, db.data.users[m.sender].healtmonster += 1 * hmz, db.data.users[m.sender].makananpet += 1 * lmz, db.data.users[m.sender].lastopen = 1 * new Date(), await conn.reply(m.chat, Mychatz, m), bbbz > 0 && (await conn.reply(m.chat, `*Selamat anda mendapatkan item Rare yaitu*\n${bbbz} Boxs Crate`, m), db.data.users[m.sender].boxs += 1 * bbbz), mlz > 0 && (await conn.reply(m.chat, `*Selamat anda mendapatkan item Epic yaitu*\n${mlz} Legendary Crate`, m), db.data.users[m.sender].legendary += 1 * mlz)) : await conn.reply(m.chat, "Boxs crate anda tidak cukup", m);
          } else await conn.reply(m.chat, `Mohon tunggu ${lastimed} lagi untuk bisa membuka fitur open`, m);
          break;
        case "10":
          let lastimedo = clockString(3e4 - (new Date() - db.data.users[m.sender].lastopen));
          if (new Date() - db.data.users[m.sender].lastopen > 3e4) {
            let _mme = `${Math.floor(5e3 * Math.random())}`.trim(),
              _bbbe = `${Math.floor(4 * Math.random())}`.trim(),
              _mee = `${Math.floor(2500 * Math.random())}`.trim(),
              _mpe = `${Math.floor(6 * Math.random())}`.trim(),
              _lme = `${Math.floor(8 * Math.random())}`.trim(),
              _hme = `${Math.floor(10 * Math.random())}`.trim(),
              mme = 1 * _mme,
              bbbe = 1 * _bbbe,
              mee = 1 * _mee,
              mpe = 1 * _mpe,
              mle = 1 * `${Math.floor(3 * Math.random())}`.trim(),
              hme = 1 * _hme,
              lme = 1 * _lme,
              ebe = 1 * `${Math.floor(8 * Math.random())}`.trim(),
              Mychate = `\nAnda telah membuka *Boxs crate* dan mendapatkan:${mme > 0 ? `\nMoney: ${mme}` : ""}${mee > 0 ? `\nExp: ${mee} *exp*` : ""}${ebe > 0 ? `\nEmasBiasa: ${ebe} *emasbiasa*` : ""}${mpe > 0 ? `\nPotion: ${mpe} *potion*` : ""}${hme > 0 ? `\nTiketM: ${hme} *tiketm*` : ""}${lme > 0 ? `\nMakanan Pet: ${lme} *makananpet*` : ""}\n`.trim();
            db.data.users[m.sender].boxs >= 10 ? (db.data.users[m.sender].boxs -= 10, db.data.users[m.sender].money += 1 * mme, db.data.users[m.sender].emasbiasa += 1 * ebe, db.data.users[m.sender].exp += 1 * mee, db.data.users[m.sender].potion += 1 * mpe, db.data.users[m.sender].healtmonster += 1 * hme, db.data.users[m.sender].makananpet += 1 * lme, db.data.users[m.sender].lastopen = 1 * new Date(), await conn.reply(m.chat, Mychate, m), bbbe > 0 && (await conn.reply(m.chat, `*Selamat anda mendapatkan item Rare yaitu*\n${bbbe} Boxs Crate`, m), db.data.users[m.sender].boxs += 1 * bbbe), mle > 0 && (await conn.reply(m.chat, `*Selamat anda mendapatkan item Epic yaitu*\n${mle} Legendary Crate`, m), db.data.users[m.sender].legendary += 1 * mle)) : await conn.reply(m.chat, "Boxs crate anda tidak cukup", m);
          } else await conn.reply(m.chat, `Mohon tunggu ${lastimedo} lagi untuk bisa membuka fitur open`, m);
          break;
        case "100":
          let lastimedoo = clockString(3e4 - (new Date() - db.data.users[m.sender].lastopen));
          if (new Date() - db.data.users[m.sender].lastopen > 3e4) {
            let _mmk = `${Math.floor(5e4 * Math.random())}`.trim(),
              _bbbk = `${Math.floor(10 * Math.random())}`.trim(),
              _mek = `${Math.floor(4e4 * Math.random())}`.trim(),
              _mpk = `${Math.floor(16 * Math.random())}`.trim(),
              _lmk = `${Math.floor(12 * Math.random())}`.trim(),
              _hmk = `${Math.floor(30 * Math.random())}`.trim(),
              mmk = 1 * _mmk,
              bbbk = 1 * _bbbk,
              mek = 1 * _mek,
              mpk = 1 * _mpk,
              mlk = 1 * `${Math.floor(5 * Math.random())}`.trim(),
              hmk = 1 * _hmk,
              lmk = 1 * _lmk,
              ebk = 1 * `${Math.floor(14 * Math.random())}`.trim(),
              Mychatp = `\nAnda telah membuka *Boxs crate* dan mendapatkan:${mmk > 0 ? `\nMoney: ${mmk}` : ""}${mek > 0 ? `\nExp: ${mek} *exp*` : ""}${ebk > 0 ? `\nEmasBiasa: ${ebk} *emasbiasa*` : ""}${mpk > 0 ? `\nPotion: ${mpk} *potion*` : ""}${hmk > 0 ? `\nTiketM: ${hmk} *tiketm*` : ""}${lmk > 0 ? `\nMakanan Pet: ${lmk} *makananpet*` : ""}\n`.trim();
            db.data.users[m.sender].boxs >= 100 ? (db.data.users[m.sender].boxs -= 100, db.data.users[m.sender].money += 1 * mmk, db.data.users[m.sender].emasbiasa += 1 * ebk, db.data.users[m.sender].exp += 1 * mek, db.data.users[m.sender].potion += 1 * mpk, db.data.users[m.sender].healtmonster += 1 * hmk, db.data.users[m.sender].makananpet += 1 * lmk, db.data.users[m.sender].lastopen = 1 * new Date(), await conn.reply(m.chat, Mychatp, m), bbbk > 0 && (await conn.reply(m.chat, `*Selamat anda mendapatkan item Rare yaitu*\n${bbbk} Boxs Crate`, m), db.data.users[m.sender].boxs += 1 * bbbk), mlk > 0 && (await conn.reply(m.chat, `*Selamat anda mendapatkan item Epic yaitu*\n${mlk} Legendary Crate`, m), db.data.users[m.sender].legendary += 1 * mlk)) : await conn.reply(m.chat, "Boxs crate anda tidak cukup", m);
          } else await conn.reply(m.chat, `Mohon tunggu ${lastimedoo} lagi untuk bisa membuka fitur open`, m);
          break;
        case "1000":
          let lastimedooo = clockString(3e4 - (new Date() - db.data.users[m.sender].lastopen));
          if (new Date() - db.data.users[m.sender].lastopen > 3e4) {
            let _mmo = `${Math.floor(5e5 * Math.random())}`.trim(),
              _bbbo = `${Math.floor(50 * Math.random())}`.trim(),
              _meo = `${Math.floor(4e5 * Math.random())}`.trim(),
              _mpo = `${Math.floor(100 * Math.random())}`.trim(),
              _lmo = `${Math.floor(100 * Math.random())}`.trim(),
              _hmo = `${Math.floor(100 * Math.random())}`.trim(),
              mmo = 1 * _mmo,
              bbbo = 1 * _bbbo,
              meo = 1 * _meo,
              mpo = 1 * _mpo,
              mlo = 1 * `${Math.floor(50 * Math.random())}`.trim(),
              hmo = 1 * _hmo,
              lmo = 1 * _lmo,
              ebo = 1 * `${Math.floor(100 * Math.random())}`.trim(),
              Mychatk = `\nAnda telah membuka *Boxs crate* dan mendapatkan:${mmo > 0 ? `\nMoney: ${mmo}` : ""}${meo > 0 ? `\nExp: ${meo} *exp*` : ""}${ebo > 0 ? `\nEmasBiasa: ${ebo} *emasbiasa*` : ""}${mpo > 0 ? `\nPotion: ${mpo} *potion*` : ""}${hmo > 0 ? `\nTiketM: ${hmo} *tiketm*` : ""}${lmo > 0 ? `\nMakanan Pet: ${lmo} *makananpet*` : ""}\n`.trim();
            db.data.users[m.sender].boxs >= 1e3 ? (db.data.users[m.sender].boxs -= 1e3, db.data.users[m.sender].money += 1 * mmo, db.data.users[m.sender].emasbiasa += 1 * ebo, db.data.users[m.sender].exp += 1 * meo, db.data.users[m.sender].potion += 1 * mpo, db.data.users[m.sender].healtmonster += 1 * hmo, db.data.users[m.sender].makananpet += 1 * lmo, db.data.users[m.sender].lastopen = 1 * new Date(), await conn.reply(m.chat, Mychatk, m), bbbo > 0 && (await conn.reply(m.chat, `*Selamat anda mendapatkan item Rare yaitu*\n${bbbo} Boxs Crate`, m), db.data.users[m.sender].boxs += 1 * bbbo), mlo > 0 && (await conn.reply(m.chat, `*Selamat anda mendapatkan item Epic yaitu*\n${mlo} Legendary Crate`, m), db.data.users[m.sender].legendary += 1 * mlo)) : await conn.reply(m.chat, "Boxs crate anda tidak cukup", m);
          } else await conn.reply(m.chat, `Mohon tunggu ${lastimedooo} lagi untuk bisa membuka fitur open`, m);
          break;
        default:
          return await conn.reply(m.chat, Lmao, m);
      }
      break;
    case "gardenboxs":
      switch (jumlah) {
        case "1":
        case "crate":
          let lastimedz = clockString(3e4 - (new Date() - db.data.users[m.sender].lastopen));
          if (new Date() - db.data.users[m.sender].lastopen > 3e4) {
            let _alp = `${Math.floor(300 * Math.random())}`.trim(),
              _blp = `${Math.floor(300 * Math.random())}`.trim(),
              _clp = `${Math.floor(300 * Math.random())}`.trim(),
              alp = 1 * _alp,
              dlp = 1 * `${Math.floor(300 * Math.random())}`.trim(),
              clp = 1 * _clp,
              blp = 1 * _blp,
              elp = 1 * `${Math.floor(300 * Math.random())}`.trim(),
              Mychatzi = `\nAnda telah membuka *Gardenboxs crate* dan mendapatkan:${alp > 0 ? `\nBibitmangga: ${alp}` : ""}${dlp > 0 ? `\nBibitpisang: ${dlp}` : ""}${elp > 0 ? `\nBibitanggur: ${elp}` : ""}${clp > 0 ? `\nBibitjeruk: ${clp}` : ""}${blp > 0 ? `\nBibitapel: ${blp}` : ""}\n`.trim();
            db.data.users[m.sender].gardenboxs >= 0 ? (db.data.users[m.sender].gardenboxs -= 1, db.data.users[m.sender].bibitmangga += 1 * alp, db.data.users[m.sender].bibitpisang += 1 * dlp, db.data.users[m.sender].bibitjeruk += 1 * clp, db.data.users[m.sender].bibitapel += 1 * blp, db.data.users[m.sender].bibitanggur += 1 * elp, db.data.users[m.sender].lastopen = 1 * new Date(), await conn.reply(m.chat, Mychatzi, m)) : await conn.reply(m.chat, "gardenboxs crate anda tidak cukup", m);
          } else await conn.reply(m.chat, `Mohon tunggu ${lastimedz} lagi untuk bisa membuka fitur open`, m);
          break;
        case "10":
        case "crate":
          let lastimedzx = clockString(3e4 - (new Date() - db.data.users[m.sender].lastopen));
          if (new Date() - db.data.users[m.sender].lastopen > 3e4) {
            let _lks = `${Math.floor(3e3 * Math.random())}`.trim(),
              _lkd = `${Math.floor(3e3 * Math.random())}`.trim(),
              _lke = `${Math.floor(3e3 * Math.random())}`.trim(),
              lks = 1 * _lks,
              lkr = 1 * `${Math.floor(3e3 * Math.random())}`.trim(),
              lke = 1 * _lke,
              lkd = 1 * _lkd,
              lky = 1 * `${Math.floor(3e3 * Math.random())}`.trim(),
              Mychatze = `\nAnda telah membuka *Gardenboxs crate* dan mendapatkan:${lks > 0 ? `\nBibitmangga: ${lks}` : ""}${lkr > 0 ? `\nBibitpisang: ${lkr}` : ""}${lky > 0 ? `\nBibitanggur: ${lky}` : ""}${lke > 0 ? `\nBibitjeruk: ${lke}` : ""}${lkd > 0 ? `\nBibitapel: ${lkd}` : ""}\n`.trim();
            db.data.users[m.sender].gardenboxs >= 9 ? (db.data.users[m.sender].gardenboxs -= 10, db.data.users[m.sender].bibitmangga += 1 * lks, db.data.users[m.sender].bibitpisang += 1 * lkr, db.data.users[m.sender].bibitjeruk += 1 * lke, db.data.users[m.sender].bibitapel += 1 * lkd, db.data.users[m.sender].bibitanggur += 1 * lky, db.data.users[m.sender].lastopen = 1 * new Date(), await conn.reply(m.chat, Mychatze, m)) : await conn.reply(m.chat, "gardenboxs crate anda tidak cukup", m);
          } else await conn.reply(m.chat, `Mohon tunggu ${lastimedzx} lagi untuk bisa membuka fitur open`, m);
          break;
        case "100":
        case "crate":
          let lastimedzxy = clockString(3e4 - (new Date() - db.data.users[m.sender].lastopen));
          if (new Date() - db.data.users[m.sender].lastopen > 3e4) {
            let _lksb = `${Math.floor(3e3 * Math.random())}`.trim(),
              _lkdb = `${Math.floor(3e3 * Math.random())}`.trim(),
              _lkeb = `${Math.floor(3e3 * Math.random())}`.trim(),
              lksb = 1 * _lksb,
              lkrb = 1 * `${Math.floor(3e3 * Math.random())}`.trim(),
              lkeb = 1 * _lkeb,
              lkdb = 1 * _lkdb,
              lkyb = 1 * `${Math.floor(3e3 * Math.random())}`.trim(),
              Mychatzo = `\nAnda telah membuka *Gardenboxs crate* dan mendapatkan:${lksb > 0 ? `\nBibitmangga: ${lksb}` : ""}${lkrb > 0 ? `\nBibitpisang: ${lkrb}` : ""}${lkyb > 0 ? `\nBibitanggur: ${lkyb}` : ""}${lkeb > 0 ? `\nBibitjeruk: ${lkeb}` : ""}${lkdb > 0 ? `\nBibitapel: ${lkdb}` : ""}\n`.trim();
            db.data.users[m.sender].gardenboxs >= 99 ? (db.data.users[m.sender].gardenboxs -= 100, db.data.users[m.sender].bibitmangga += 1 * lksb, db.data.users[m.sender].bibitpisang += 1 * lkrb, db.data.users[m.sender].bibitjeruk += 1 * lkeb, db.data.users[m.sender].bibitapel += 1 * lkdb, db.data.users[m.sender].bibitanggur += 1 * lkyb, db.data.users[m.sender].lastopen = 1 * new Date(), await conn.reply(m.chat, Mychatzo, m)) : await conn.reply(m.chat, "gardenboxs crate anda tidak cukup", m);
          } else await conn.reply(m.chat, `Mohon tunggu ${lastimedzxy} lagi untuk bisa membuka fitur open`, m);
          break;
        case "1000":
        case "crate":
          clockString(3e4 - (new Date() - db.data.users[m.sender].lastopen));
          if (new Date() - db.data.users[m.sender].lastopen > 3e4) {
            let _lksk = `${Math.floor(3e3 * Math.random())}`.trim(),
              _lkdk = `${Math.floor(3e3 * Math.random())}`.trim(),
              _lkek = `${Math.floor(3e3 * Math.random())}`.trim(),
              lksk = 1 * _lksk,
              lkrk = 1 * `${Math.floor(3e3 * Math.random())}`.trim(),
              lkek = 1 * _lkek,
              lkdk = 1 * _lkdk,
              lkyk = 1 * `${Math.floor(3e3 * Math.random())}`.trim(),
              Mychatzu = `\nAnda telah membuka *Gardenboxs crate* dan mendapatkan:${lksk > 0 ? `\nBibitmangga: ${lksk}` : ""}${lkrk > 0 ? `\nBibitpisang: ${lkrk}` : ""}${lkyk > 0 ? `\nBibitanggur: ${lkyk}` : ""}${lkek > 0 ? `\nBibitjeruk: ${lkek}` : ""}${lkdk > 0 ? `\nBibitapel: ${lkdk}` : ""}\n`.trim();
            db.data.users[m.sender].gardenboxs >= 999 ? (db.data.users[m.sender].gardenboxs -= 1e3, db.data.users[m.sender].bibitmangga += 1 * lksk, db.data.users[m.sender].bibitpisang += 1 * lkrk, db.data.users[m.sender].bibitjeruk += 1 * lkek, db.data.users[m.sender].bibitapel += 1 * lkdk, db.data.users[m.sender].bibitanggur += 1 * lkyk, db.data.users[m.sender].lastopen = 1 * new Date(), await conn.reply(m.chat, Mychatzu, m)) : await conn.reply(m.chat, "gardenboxs crate anda tidak cukup", m);
          } else await conn.reply(m.chat, `Mohon tunggu ${lastimedzxyk} lagi untuk bisa membuka fitur open`, m);
          break;
        default:
          return await conn.reply(m.chat, Lmao, m);
      }
      break;
    case "cupon":
      switch (jumlah) {
        case "1":
        case "crate":
          let lastimeki = clockString(3e4 - (new Date() - db.data.users[m.sender].lastopen));
          if (new Date() - db.data.users[m.sender].lastopen > 3e4) {
            let mm = 1e5,
              me = 1e5,
              mp = 50,
              mci = 5e4,
              Mochat = `\nAnda telah membuka *Cupon crate* dan mendapatkan:${mm > 0 ? `\nMoney: ${mm} *money*` : ""}${me > 0 ? `\nExp: ${me} *exp*` : ""}${mp > 0 ? `\nLimit: ${mp} *limit*` : ""}${mci > 0 ? `\nNabung Money: ${mci} *nabung money*` : ""}\n`.trim();
            db.data.users[m.sender].cupon >= 1 ? (db.data.users[m.sender].cupon -= 1, db.data.users[m.sender].money += 1 * mm, db.data.users[m.sender].exp += 1 * me, db.data.users[m.sender].limit += 1 * mp, db.data.users[m.sender].bank += 1 * mci, db.data.users[m.sender].lastopen = 1 * new Date(), await conn.reply(m.chat, Mochat, m)) : await conn.reply(m.chat, "Cupon crate anda tidak cukup", m);
          } else await conn.reply(m.chat, `Mohon tunggu ${lastimeki} lagi untuk bisa membuka fitur open`, m);
          break;
        case "10":
          let lastimekise = clockString(3e4 - (new Date() - db.data.users[m.sender].lastopen));
          if (new Date() - db.data.users[m.sender].lastopen > 3e4) {
            let mmse = 1e6,
              mese = 1e6,
              mpse = 500,
              mcise = 5e5,
              Mochatse = `\nAnda telah membuka *Cupon crate* dan mendapatkan:${mmse > 0 ? `\nMoney: ${mmse} *money*` : ""}${mese > 0 ? `\nExp: ${mese} *exp*` : ""}${mpse > 0 ? `\nLimit: ${mpse} *limit*` : ""}${mcise > 0 ? `\nNabung Money: ${mcise} *nabung money*` : ""}\n`.trim();
            db.data.users[m.sender].cupon >= 10 ? (db.data.users[m.sender].cupon -= 10, db.data.users[m.sender].money += 1 * mmse, db.data.users[m.sender].exp += 1 * mese, db.data.users[m.sender].limit += 1 * mpse, db.data.users[m.sender].bank += 1 * mcise, db.data.users[m.sender].lastopen = 1 * new Date(), await conn.reply(m.chat, Mochatse, m)) : await conn.reply(m.chat, "Cupon crate anda tidak cukup", m);
          } else await conn.reply(m.chat, `Mohon tunggu ${lastimekise} lagi untuk bisa membuka fitur open`, m);
          break;
        default:
          return await conn.reply(m.chat, Lmao, m);
      }
      break;
    case "legendary":
      switch (jumlah) {
        case "1":
        case "crate":
          let lastimel = clockString(3e4 - (new Date() - db.data.users[m.sender].lastopen));
          if (new Date() - db.data.users[m.sender].lastopen > 3e4) {
            let lm = 1 * `${Math.floor(450 * Math.random())}`.trim(),
              le = 1 * `${Math.floor(550 * Math.random())}`.trim(),
              lp = 1 * `${Math.floor(5 * Math.random())}`.trim(),
              lu = 1 * `${Math.floor(7 * Math.random())}`.trim(),
              lc = 1 * `${Math.floor(10 * Math.random())}`.trim(),
              ll = 1 * `${pickRandom([ "0", "0", "1", "0" ])}`.trim(),
              lpp = 1 * `${pickRandom([ "0", "1", "0" ])}`.trim(),
              ld = 1 * `${Math.floor(5 * Math.random())}`.trim(),
              lmm = 1 * `${pickRandom([ "0", "1", "0", "1", "0", "0" ])}`.trim(),
              Lechat = `\nAnda telah membuka *Legendary crate* dan mendapatkan:${lm > 0 ? `\nMoney: ${lm}` : ""}${le > 0 ? `\nExp: ${le} *exp*` : ""}${ld > 0 ? `\nDiamond: ${ld} *diamond*` : ""}${lp > 0 ? `\nPotion: ${lp} *potion*` : ""}${lc > 0 ? `\nCommon crate: ${lc} *crate*` : ""}${lu > 0 ? `\nUncommon crate: ${lu} *crate*` : ""}\n`.trim();
            db.data.users[m.sender].legendary >= 1 ? (db.data.users[m.sender].legendary -= 1, db.data.users[m.sender].money += 1 * lm, db.data.users[m.sender].diamond += 1 * ld, db.data.users[m.sender].exp += 1 * le, db.data.users[m.sender].potion += 1 * lp, db.data.users[m.sender].common += 1 * lc, db.data.users[m.sender].uncommon += 1 * lu, db.data.users[m.sender].lastopen = 1 * new Date(), await conn.reply(m.chat, Lechat, m), lmm > 0 && (await conn.reply(m.chat, `*Selamat anda mendapatkan item Rare yaitu*\n${lmm} Mythic Crate`, m), db.data.users[m.sender].mythic += 1 * lmm), (ll > 0 || lpp > 0) && (await conn.reply(m.chat, `*Selamat anda mendapatkan item Epic yaitu*${ll > 0 ? `\n${ll} Legendary Crate` : ""}${lpp > 0 ? `\n${lpp} Pet Crate` : ""}`, m), db.data.users[m.sender].legendary += 1 * ll, db.data.users[m.sender].pet += 1 * lpp)) : await conn.reply(m.chat, "Legendary crate anda tidak cukup", m);
          } else await conn.reply(m.chat, `Mohon tunggu ${lastimel} lagi untuk bisa membuka fitur open`, m);
          break;
        case "10":
          let lastimele = clockString(3e4 - (new Date() - db.data.users[m.sender].lastopen));
          if (new Date() - db.data.users[m.sender].lastopen > 3e4) {
            let lm1 = 1 * `${Math.floor(1e4 * Math.random())}`.trim(),
              le1 = 1 * `${Math.floor(15e3 * Math.random())}`.trim(),
              lp1 = 1 * `${Math.floor(30 * Math.random())}`.trim(),
              lu1 = 1 * `${Math.floor(50 * Math.random())}`.trim(),
              lc1 = 1 * `${Math.floor(75 * Math.random())}`.trim(),
              ll1 = 1 * `${Math.floor(2 * Math.random())}`.trim(),
              lpp1 = 1 * `${Math.floor(6 * Math.random())}`.trim(),
              ld1 = 1 * `${Math.floor(16 * Math.random())}`.trim(),
              lmm1 = 1 * `${Math.floor(4 * Math.random())}`.trim(),
              Lechat1 = `\nAnda telah membuka *Legendary crate* dan mendapatkan:${lm1 > 0 ? `\nMoney: ${lm1}` : ""}${le1 > 0 ? `\nExp: ${le1} *exp*` : ""}${ld1 > 0 ? `\nDiamond: ${ld1} *diamond*` : ""}${lp1 > 0 ? `\nPotion: ${lp1} *potion*` : ""}${lc1 > 0 ? `\nCommon crate: ${lc1} *crate*` : ""}${lu1 > 0 ? `\nUncommon crate: ${lu1} *crate*` : ""}\n`.trim();
            db.data.users[m.sender].legendary >= 10 ? (db.data.users[m.sender].legendary -= 10, db.data.users[m.sender].money += 1 * lm1, db.data.users[m.sender].diamond += 1 * ld1, db.data.users[m.sender].exp += 1 * le1, db.data.users[m.sender].potion += 1 * lp1, db.data.users[m.sender].common += 1 * lc1, db.data.users[m.sender].uncommon += 1 * lu1, db.data.users[m.sender].lastopen = 1 * new Date(), await conn.reply(m.chat, Lechat1, m), lmm1 > 0 && (await conn.reply(m.chat, `*Selamat anda mendapatkan item Rare yaitu*\n${lmm1} Mythic Crate`, m), db.data.users[m.sender].mythic += 1 * lmm1), (ll1 > 0 || lpp1 > 0) && (await conn.reply(m.chat, `*Selamat anda mendapatkan item Epic yaitu*${ll1 > 0 ? `\n${ll1} Legendary Crate` : ""}${lpp1 > 0 ? `\n${lpp1} Pet Crate` : ""}`, m), db.data.users[m.sender].legendary += 1 * ll1, db.data.users[m.sender].pet += 1 * lpp1)) : await conn.reply(m.chat, "Legendary crate anda tidak cukup", m);
          } else await conn.reply(m.chat, `Mohon tunggu ${lastimele} lagi untuk bisa membuka fitur open`, m);
          break;
        case "100":
          let lastimelee = clockString(3e4 - (new Date() - db.data.users[m.sender].lastopen));
          if (new Date() - db.data.users[m.sender].lastopen > 3e4) {
            let lm2 = 1 * `${Math.floor(1e5 * Math.random())}`.trim(),
              le2 = 1 * `${Math.floor(2e5 * Math.random())}`.trim(),
              lp2 = 1 * `${Math.floor(100 * Math.random())}`.trim(),
              lu2 = 1 * `${Math.floor(250 * Math.random())}`.trim(),
              lc2 = 1 * `${Math.floor(750 * Math.random())}`.trim(),
              ll2 = 1 * `${Math.floor(11 * Math.random())}`.trim(),
              lpp2 = 1 * `${Math.floor(51 * Math.random())}`.trim(),
              ld2 = 1 * `${Math.floor(50 * Math.random())}`.trim(),
              lmm2 = 1 * `${Math.floor(11 * Math.random())}`.trim(),
              Lechat2 = `\nAnda telah membuka *Legendary crate* dan mendapatkan:${lm2 > 0 ? `\nMoney: ${lm2}` : ""}${le2 > 0 ? `\nExp: ${le2} *exp*` : ""}${ld2 > 0 ? `\nDiamond: ${ld2} *diamond*` : ""}${lp2 > 0 ? `\nPotion: ${lp2} *potion*` : ""}${lc2 > 0 ? `\nCommon crate: ${lc2} *crate*` : ""}${lu2 > 0 ? `\nUncommon crate: ${lu2} *crate*` : ""}\n`.trim();
            db.data.users[m.sender].legendary >= 100 ? (db.data.users[m.sender].legendary -= 100, db.data.users[m.sender].money += 1 * lm2, db.data.users[m.sender].diamond += 1 * ld2, db.data.users[m.sender].exp += 1 * le2, db.data.users[m.sender].potion += 1 * lp2, db.data.users[m.sender].common += 1 * lc2, db.data.users[m.sender].uncommon += 1 * lu2, db.data.users[m.sender].lastopen = 1 * new Date(), await conn.reply(m.chat, Lechat2, m), lmm2 > 0 && (await conn.reply(m.chat, `*Selamat anda mendapatkan item Rare yaitu*\n${lmm2} Mythic Crate`, m), db.data.users[m.sender].mythic += 1 * lmm2), (ll2 > 0 || lpp2 > 0) && (await conn.reply(m.chat, `*Selamat anda mendapatkan item Epic yaitu*${ll2 > 0 ? `\n${ll2} Legendary Crate` : ""}${lpp2 > 0 ? `\n${lpp2} Pet Crate` : ""}`, m), db.data.users[m.sender].legendary += 1 * ll2, db.data.users[m.sender].pet += 1 * lpp2)) : await conn.reply(m.chat, "Legendary crate anda tidak cukup", m);
          } else await conn.reply(m.chat, `Mohon tunggu ${lastimelee} lagi untuk bisa membuka fitur open`, m);
          break;
        case "1000":
          let lastimeleee = clockString(3e4 - (new Date() - db.data.users[m.sender].lastopen));
          if (new Date() - db.data.users[m.sender].lastopen > 3e4) {
            let lm3 = 1 * `${Math.floor(2e6 * Math.random())}`.trim(),
              le3 = 1 * `${Math.floor(5e6 * Math.random())}`.trim(),
              lp3 = 1 * `${Math.floor(500 * Math.random())}`.trim(),
              lu3 = 1 * `${Math.floor(1e3 * Math.random())}`.trim(),
              lc3 = 1 * `${Math.floor(2500 * Math.random())}`.trim(),
              ll3 = 1 * `${Math.floor(51 * Math.random())}`.trim(),
              lpp3 = 1 * `${Math.floor(222 * Math.random())}`.trim(),
              ld3 = 1 * `${Math.floor(250 * Math.random())}`.trim(),
              lmm3 = 1 * `${Math.floor(111 * Math.random())}`.trim(),
              Lechat3 = `\nAnda telah membuka *Legendary crate* dan mendapatkan:${lm3 > 0 ? `\nMoney: ${lm3}` : ""}${le3 > 0 ? `\nExp: ${le3} *exp*` : ""}${ld3 > 0 ? `\nDiamond: ${ld3} *diamond*` : ""}${lp3 > 0 ? `\nPotion: ${lp3} *potion*` : ""}${lc3 > 0 ? `\nCommon crate: ${lc3} *crate*` : ""}${lu3 > 0 ? `\nUncommon crate: ${lu3} *crate*` : ""}\n`.trim();
            db.data.users[m.sender].legendary >= 1e3 ? (db.data.users[m.sender].legendary -= 1e3, db.data.users[m.sender].money += 1 * lm3, db.data.users[m.sender].diamond += 1 * ld3, db.data.users[m.sender].exp += 1 * le3, db.data.users[m.sender].potion += 1 * lp3, db.data.users[m.sender].common += 1 * lc3, db.data.users[m.sender].uncommon += 1 * lu3, db.data.users[m.sender].lastopen = 1 * new Date(), await conn.reply(m.chat, Lechat3, m), lmm3 > 0 && (await conn.reply(m.chat, `*Selamat anda mendapatkan item Rare yaitu*\n${lmm3} Mythic Crate`, m), db.data.users[m.sender].mythic += 1 * lmm3), (ll3 > 0 || lpp3 > 0) && (await conn.reply(m.chat, `*Selamat anda mendapatkan item Epic yaitu*${ll3 > 0 ? `\n${ll3} Legendary Crate` : ""}${lpp3 > 0 ? `\n${lpp3} Pet Crate` : ""}`, m), db.data.users[m.sender].legendary += 1 * ll3, db.data.users[m.sender].pet += 1 * lpp3)) : await conn.reply(m.chat, "Legendary crate anda tidak cukup", m);
          } else await conn.reply(m.chat, `Mohon tunggu ${lastimeleee} lagi untuk bisa membuka fitur open`, m);
          break;
        default:
          return await conn.reply(m.chat, Lmao, m);
      }
      break;
    case "pet":
      let mknp = 1 * pickRandom([1, 2, 1, 5, 3, 2, 1, 2, 4, 1, 3, 5, 2, 4, 3]),
        kucing = db.data.users[m.sender].kucing,
        rubah = db.data.users[m.sender].rubah,
        kuda = db.data.users[m.sender].kuda,
        serigala = db.data.users[m.sender].serigala,
        naga = db.data.users[m.sender].naga,
        phonix = db.data.users[m.sender].phonix,
        kyubi = db.data.users[m.sender].kyubi,
        griffin = db.data.users[m.sender].griffin,
        centaur = db.data.users[m.sender].centaur,
        _pet = `${pickRandom([ "kucing", "rubah", "serigala", "naga", "centaur", "phonix", "kuda", "griffin", "kyubi" ])}`.trim(),
        randpet = `${pickRandom([ "Anda kurang beruntung", "Coba buka lagi lain kali, karena gk dapet pet", "kasian gk dapet pet", "Mungkin lagi gk hoki dan gk dapet pet", "wkwkkwkwke" ])}`.trim(),
        lastimepet = clockString(3e4 - (new Date() - db.data.users[m.sender].lastopen));
      new Date() - db.data.users[m.sender].lastopen > 3e4 ? (db.data.users[m.sender].lastopen = 1 * new Date(), db.data.users[m.sender].pet > 0 ? (db.data.users[m.sender].pet -= 1, "kucing" === _pet && kucing > 0 ? (db.data.users[m.sender].potion += 2, db.data.users[m.sender].makananpet += 1 * mknp, await conn.reply(m.chat, `Anda sudah memiliki pet ${_pet}, Hadiahmu diganti dengan 2 potion${mknp > 0 ? ` Dan ${mknp} Makanan Pet` : ""}`, m)) : "kucing" === _pet && 0 === kucing ? (db.data.users[m.sender].kucing += 1, db.data.users[m.sender].makananpet += 1 * mknp, await conn.reply(m.chat, `*Selamat Anda mendapatkan pet ${_pet} ${mknp > 0 ? ` Dan ${mknp} Makanan Pet*` : "*"}`, m)) : "rubah" === _pet && rubah > 0 ? (db.data.users[m.sender].potion += 2, db.data.users[m.sender].makananpet += 1 * mknp, await conn.reply(m.chat, `Anda sudah memiliki pet ${_pet}, Hadiahmu diganti dengan 2 potion ${mknp > 0 ? `Dan ${mknp} Makanan Pet` : ""}`, m)) : "rubah" === _pet && 0 === rubah ? (db.data.users[m.sender].rubah += 1, db.data.users[m.sender].makananpet += 1 * mknp, await conn.reply(m.chat, `*Selamat Anda mendapatkan pet ${_pet}${mknp > 0 ? ` Dan ${mknp} Makanan Pet*` : "*"}`, m)) : "naga" === _pet && naga > 0 ? (db.data.users[m.sender].potion += 2, db.data.users[m.sender].makananpet += 1 * mknp, await conn.reply(m.chat, `Anda sudah memiliki pet ${_pet}, Hadiahmu diganti dengan 2 potion ${mknp > 0 ? `Dan ${mknp} Makanan Pet` : ""}`, m)) : "naga" === _pet && 0 === naga ? (db.data.users[m.sender].naga += 1, db.data.users[m.sender].makananpet += 1 * mknp, await conn.reply(m.chat, `*Selamat Anda mendapatkan pet ${_pet}${mknp > 0 ? ` Dan ${mknp} Makanan Pet*` : "*"}`, m)) : "phonix" === _pet && phonix > 0 ? (db.data.users[m.sender].potion += 2, db.data.users[m.sender].makananpet += 1 * mknp, await conn.reply(m.chat, `Anda sudah memiliki pet ${_pet}, Hadiahmu diganti dengan 2 potion ${mknp > 0 ? `Dan ${mknp} Makanan Pet` : ""}`, m)) : "phonix" === _pet && 0 === phonix ? (db.data.users[m.sender].phonix += 1, db.data.users[m.sender].makananpet += 1 * mknp, await conn.reply(m.chat, `*Selamat Anda mendapatkan pet ${_pet}${mknp > 0 ? ` Dan ${mknp} Makanan Pet*` : "*"}`, m)) : "kyubi" === _pet && kyubi > 0 ? (db.data.users[m.sender].potion += 2, db.data.users[m.sender].makanankyubi += 1 * mknp, await conn.reply(m.chat, `Anda sudah memiliki pet ${_pet}, Hadiahmu diganti dengan 2 potion ${mknp > 0 ? `Dan ${mknp} Makanan Pet` : ""}`, m)) : "kyubi" === _pet && 0 === kyubi ? (db.data.users[m.sender].kyubi += 1, db.data.users[m.sender].makanankyubi += 1 * mknp, await conn.reply(m.chat, `*Selamat Anda mendapatkan pet ${_pet}${mknp > 0 ? ` Dan ${mknp} Makanan Pet*` : "*"}`, m)) : "centaur" === _pet && centaur > 0 ? (db.data.users[m.sender].potion += 2, db.data.users[m.sender].makanancentaur += 1 * mknp, await conn.reply(m.chat, `Anda sudah memiliki pet ${_pet}, Hadiahmu diganti dengan 2 potion ${mknp > 0 ? `Dan ${mknp} Makanan Pet` : ""}`, m)) : "centaur" === _pet && 0 === centaur ? (db.data.users[m.sender].centaur += 1, db.data.users[m.sender].makanancentaur += 1 * mknp, await conn.reply(m.chat, `*Selamat Anda mendapatkan pet ${_pet}${mknp > 0 ? ` Dan ${mknp} Makanan Pet*` : "*"}`, m)) : "griffin" === _pet && griffin > 0 ? (db.data.users[m.sender].potion += 2, db.data.users[m.sender].makanangriffin += 1 * mknp, await conn.reply(m.chat, `Anda sudah memiliki pet ${_pet}, Hadiahmu diganti dengan 2 potion ${mknp > 0 ? `Dan ${mknp} Makanan Pet` : ""}`, m)) : "griffin" === _pet && 0 === griffin ? (db.data.users[m.sender].griffin += 1, db.data.users[m.sender].makanangriffin += 1 * mknp, await conn.reply(m.chat, `*Selamat Anda mendapatkan pet ${_pet}${mknp > 0 ? ` Dan ${mknp} Makanan Pet*` : "*"}`, m)) : "serigala" === _pet && serigala > 0 ? (db.data.users[m.sender].potion += 2, db.data.users[m.sender].makananpet += 1 * mknp, await conn.reply(m.chat, `Anda sudah memiliki pet ${_pet}, Hadiahmu diganti dengan 2 potion ${mknp > 0 ? `Dan ${mknp} Makanan Pet` : ""}`, m)) : "serigala" === _pet && 0 === serigala ? (db.data.users[m.sender].serigala += 1, db.data.users[m.sender].makananpet += 1 * mknp, await conn.reply(m.chat, `*Selamat Anda mendapatkan pet ${_pet}${mknp > 0 ? ` Dan ${mknp} Makanan Pet*` : "*"}`, m)) : "kuda" === _pet && kuda > 0 ? (db.data.users[m.sender].potion += 2, db.data.users[m.sender].makananpet += 1 * mknp, await conn.reply(m.chat, `Anda sudah memiliki pet ${_pet}, Hadiahmu diganti dengan 2 potion${mknp > 0 ? ` Dan ${mknp} Makanan Pet` : ""}`, m)) : "kuda" === _pet && 0 === kuda ? (db.data.users[m.sender].kuda += 1, db.data.users[m.sender].makananpet += 1 * mknp, await conn.reply(m.chat, `*Selamat Anda mendapatkan pet ${_pet}${mknp > 0 ? ` Dan ${mknp} Makanan Pet*` : "*"}`, m)) : (db.data.users[m.sender].makananpet += 1 * mknp, await conn.reply(m.chat, randpet + "Anda hanya mendapatkan *" + mknp + "* makanan pet", m))) : await conn.reply("Pet Crate kamu tidak cukup")) : await conn.reply(m.chat, `Mohon tunggu ${lastimepet} lagi untuk bisa membuka fitur open`, m);
      break;
    default:
      return await conn.reply(m.chat, bruh, m);
  }
};
handler.help = ["opencrate"].map(v => v + " [crate] [count]"), handler.tags = ["rpg"],
  handler.command = /^(opencrate)$/i;
export default handler;

function pickRandom(list) {
  return list[Math.floor(list.length * Math.random())];
}

function clockString(ms) {
  return ["\n" + (isNaN(ms) ? "--" : Math.floor(ms / 864e5)), " *Days ☀️*\n ", isNaN(ms) ? "--" : Math.floor(ms / 36e5) % 24, " *Hours 🕐*\n ", isNaN(ms) ? "--" : Math.floor(ms / 6e4) % 60, " *Minute ⏰*\n ", isNaN(ms) ? "--" : Math.floor(ms / 1e3) % 60, " *Second ⏱️* "].map(v => v.toString().padStart(2, 0)).join("");
}