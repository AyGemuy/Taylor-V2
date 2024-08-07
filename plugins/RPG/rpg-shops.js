const potion = 2e4,
  Spotion = 100,
  Bdiamond = 1e5,
  Sdiamond = 1e3,
  Bcommon = 1e5,
  Scommon = 1e3,
  Suncommon = 100,
  Buncommon = 1e5,
  Bmythic = 1e5,
  Smythic = 1e3,
  Blegendary = 2e5,
  Slegendary = 5e3,
  Bsampah = 120,
  Ssampah = 5,
  Bkayu = 1e3,
  Skayu = 400,
  Bbotol = 300,
  Sbotol = 50,
  Bkaleng = 400,
  Skaleng = 100,
  Bkardus = 400,
  Skardus = 50,
  Bpisang = 5500,
  Spisang = 100,
  Bmangga = 4600,
  Smangga = 150,
  Bjeruk = 6e3,
  Sjeruk = 300,
  Banggur = 5500,
  Sanggur = 150,
  Bapel = 5500,
  Sapel = 400,
  Bbibitpisang = 550,
  Sbibitpisang = 50,
  Bbibitmangga = 550,
  Sbibitmangga = 50,
  Bbibitjeruk = 550,
  Sbibitjeruk = 50,
  Bbibitanggur = 550,
  Sbibitanggur = 50,
  Bbibitapel = 550,
  Sbibitapel = 50,
  Bgardenboxs = 65e3,
  Sgardenboc = 35e4,
  Bberlian = 15e4,
  Sberlian = 1e4,
  Bemasbatang = 25e4,
  Semasbatang = 1e4,
  Bemasbiasa = 15e4,
  Semasbiasa = 15e3,
  Bphonix = 1e9,
  Sphonix = 1e6,
  Bgriffin = 1e8,
  Sgriffin = 1e5,
  Bkyubi = 1e8,
  Skyubi = 1e5,
  Bnaga = 1e8,
  Snaga = 1e5,
  Bcentaur = 1e8,
  Scentaur = 1e5,
  Bkuda = 5e7,
  Skuda = 1e5,
  Brubah = 1e8,
  Srubah = 1e5,
  Bkucing = 5e6,
  Skucing = 5e4,
  Bserigala = 5e7,
  Sserigala = 5e5,
  Bmakananpet = 5e4,
  Smakananpet = 500,
  Bmakananphonix = 8e4,
  Smakananphonix = 5e3,
  Bmakanangriffin = 8e4,
  Smakanangriffin = 5e3,
  Bmakanannaga = 15e4,
  Smakanannaga = 1e4,
  Bmakanankyubi = 15e4,
  Smakanankyubi = 1e4,
  Bmakanancentaur = 15e4,
  Smakanancentaur = 1e4,
  Bhealtmonster = 2e4,
  Bpet = 15e4,
  Spet = 1e3,
  Blimit = 25e3,
  Slimit = 2e4,
  Bexp = 550,
  Baqua = 5e3,
  Saqua = 1e3,
  Biron = 2e4,
  Siron = 5e3,
  Bstring = 5e4,
  Sstring = 5e3,
  Bsword = 15e4,
  Ssword = 15e3,
  Bumpan = 1500,
  Sumpan = 100,
  Bpancingan = 5e6,
  Spancingan = 5e5,
  Bbatu = 500,
  Sbatu = 100,
  Bketake = 15,
  Btiketcoin = 500,
  Bkoinexpg = 5e5,
  Beleksirb = 500,
  handler = async (m, {
    conn,
    command,
    args,
    usedPrefix,
    owner
  }) => {
    const _armor = db.data.users[m.sender].armor,
      armor = 0 === _armor ? 2e4 : 1 === _armor ? 49999 : 2 === _armor ? 99999 : 3 === _armor ? 149999 : 4 === _armor ? 299999 : "";
    let type = (args[0] || "").toLowerCase(),
      _type = (args[1] || "").toLowerCase(),
      jualbeli = (args[0] || "").toLowerCase();
    m.sender;
    const Kchat = `\nPenggunaan ${usedPrefix}shop <Buy|sell> <item> <jumlah>\nContoh penggunaan: *${usedPrefix}shop buy potion 1*\n\n============================\n*Kebutuhan   |  Harga Beli*\nLimit:     25000\nTiketM:     20000\nCupon:     500\nKoinExpg:     500000\n\n*Kebutuhan   |  Harga Jual*\nLimit:     20000\n============================\n*Bibit Buah   |  Harga Beli*\nBibitPisang:       550\nBibitAnggur:       550\nBibitMangga:       550\nBibitJeruk:       550\nBibitApel:       550\nGardenboxs:     65000\n============================\n*Barang   |  Harga Beli*\nPotion:       20000\nDiamond:     100000\nCommon:     100000\nUncommon:  100000\nMythic:     100000\nLegendary: 200000\nSampah:     120\nArmor:       ${armor}\nString:       50000\nIron:       20000\nSword:       150000\nBatu:       500\nBotol:       300\nKaleng:       400\nKardus:       400\nKayu:       1000\nBerlian:       150000\nEmas:       150000\n\n*Barang   | Harga Jual*\nPotion:       100\nDiamond:     1000\nCommon:     1000\nUncommon:  100\nMythic:     1000\nLegendary: 5000\nSampah:     5\nString:       5000\nIron:       5000\nSword:       15000\nBatu:       100\nBotol:       50\nKaleng:       100\nKardus:       50\nKayu:       400\nBerlian:       10000\nEmas:       15000\n============================\n*List Makanan:*\n\n*Makanan | Harga Beli*\nPisang:       5500\nAnggur:       5500\nMangga:       4600\nJeruk:       6000\nApel:       5500\nMakananPet:       50000\nMakananNaga:       150000\nMakananKyubi:       150000\nMakananGriffin:       80000\nMakananPhonix:       80000\nMakananCentaur:       150000\n\n*Makanan | Harga Jual*\nPisang:       100\nAnggur:       150\nMangga:       150\nJeruk:       300\nApel:       400\nMakananPet:       500\nMakananNaga       10000\nMakananKyubi:       10000\nMakananGriffin:       5000\nMakananPhonix:       5000\nMakananCentaur:       10000\n============================\n*Minuman | Harga Beli*\nAqua:       5000\n\n*Minuman | Harga Jual*\nAqua:       1000\n============================\n*Fishing | Harga Beli*\nPancingan:       5000000\nUmpan:       1500\n`.trim();
    try {
      if (/shop|toko/i.test(command)) {
        const count = args[2] && args[2].length > 0 ? Math.min(999999999999999, Math.max(parseInt(args[2]), 1)) : !args[2] || args.length < 4 ? 1 : Math.min(1, count);
        db.data.users[m.sender].sampah;
        switch (jualbeli) {
          case "buy":
            switch (_type) {
              case "potion":
                db.data.users[m.sender].money >= 2e4 * count ? (db.data.users[m.sender].money -= 2e4 * count, db.data.users[m.sender].potion += 1 * count, await conn.reply(m.chat, `Succes membeli ${count} Potion dengan harga ${2e4 * count} money\n\nGunakan potion dengan ketik: *${usedPrefix}use potion <jumlah>*`, m)) : await conn.reply(m.chat, `Uang anda tidak cukup untuk membeli ${count} Potion dengan harga ${2e4 * count} money`);
                break;
              case "diamond":
                db.data.users[m.sender].money >= 1e5 * count ? (db.data.users[m.sender].diamond += 1 * count, db.data.users[m.sender].money -= 1e5 * count, await conn.reply(m.chat, `Succes membeli ${count} Diamond dengan harga ${1e5 * count} money`, m)) : await conn.reply(m.chat, "Money anda tidak cukup", m);
                break;
              case "common":
                db.data.users[m.sender].money >= 1e5 * count ? (db.data.users[m.sender].common += 1 * count, db.data.users[m.sender].money -= 1e5 * count, await conn.reply(m.chat, `Succes membeli ${count} Common crate dengan harga ${1e5 * count} money`, m)) : await conn.reply(m.chat, `Uang anda tidak cukup untuk membeli ${count} Common crate dengan harga ${1e5 * count} money\n\nBuka crate dengan ketik: *${usedPrefix}open common*`, m);
                break;
              case "uncommon":
                db.data.users[m.sender].money >= 1e5 * count ? (db.data.users[m.sender].uncommon += 1 * count, db.data.users[m.sender].money -= 1e5 * count, await conn.reply(m.chat, `Succes membeli ${count} Uncommon crate dengan harga ${1e5 * count} money`, m)) : await conn.reply(m.chat, `Uang anda tidak cukup untuk membeli ${count} Uncommon crate dengan harga ${1e5 * count} money\n\nBuka crate dengan ketik: *${usedPrefix}open uncommon*`, m);
                break;
              case "mythic":
                db.data.users[m.sender].money >= 1e5 * count ? (db.data.users[m.sender].mythic += 1 * count, db.data.users[m.sender].money -= 1e5 * count, await conn.reply(m.chat, `Succes membeli ${count} Mythic crate dengan harga ${1e5 * count} money`, m)) : await conn.reply(m.chat, `Uang anda tidak cukup untuk membeli ${count} Mythic crate dengan harga ${1e5 * count} money\n\nBuka crate dengan ketik: *${usedPrefix}open mythic*`, m);
                break;
              case "legendary":
                db.data.users[m.sender].money >= 2e5 * count ? (db.data.users[m.sender].legendary += 1 * count, db.data.users[m.sender].money -= 2e5 * count, await conn.reply(m.chat, `Succes membeli ${count} Legendary crate dengan harga ${2e5 * count} money`, m)) : await conn.reply(m.chat, `Uang anda tidak cukup untuk membeli ${count} Legendary crate dengan harga ${2e5 * count} money\n\nBuka crate dengan ketik: *${usedPrefix}open legendary*`, m);
                break;
              case "sampah":
                db.data.users[m.sender].money >= 120 * count ? (db.data.users[m.sender].sampah += 1 * count, db.data.users[m.sender].money -= 120 * count, await conn.reply(m.chat, `Succes membeli ${count} Sampah dengan harga ${120 * count} money`, m)) : await conn.reply(m.chat, `Uang anda tidak cukup untuk membeli ${count} Sampah dengan harga ${120 * count} money`.trim(), m);
                break;
              case "kaleng":
                db.data.users[m.sender].money >= 400 * count ? (db.data.users[m.sender].kaleng += 1 * count, db.data.users[m.sender].money -= 400 * count, await conn.reply(m.chat, `Succes membeli ${count} Kaleng dengan harga ${400 * count} money`, m)) : await conn.reply(m.chat, `Uang anda tidak cukup untuk membeli ${count} Kaleng dengan harga ${400 * count} money`.trim(), m);
                break;
              case "kardus":
                db.data.users[m.sender].money >= 400 * count ? (db.data.users[m.sender].kardus += 1 * count, db.data.users[m.sender].money -= 400 * count, await conn.reply(m.chat, `Succes membeli ${count} Kardus dengan harga ${400 * count} money`, m)) : await conn.reply(m.chat, `Uang anda tidak cukup untuk membeli ${count} Kardus dengan harga ${400 * count} money`.trim(), m);
                break;
              case "botol":
                db.data.users[m.sender].money >= 300 * count ? (db.data.users[m.sender].botol += 1 * count, db.data.users[m.sender].money -= 300 * count, await conn.reply(m.chat, `Succes membeli ${count} Botol dengan harga ${300 * count} money`, m)) : await conn.reply(m.chat, `Uang anda tidak cukup untuk membeli ${count} botol dengan harga ${300 * count} money`.trim(), m);
                break;
              case "kayu":
                db.data.users[m.sender].money >= 1e3 * count ? (db.data.users[m.sender].kayu += 1 * count, db.data.users[m.sender].money -= 1e3 * count, await conn.reply(m.chat, `Succes membeli ${count} Kayu dengan harga ${1e3 * count} money`, m)) : await conn.reply(m.chat, `Uang anda tidak cukup untuk membeli ${count} kayu dengan harga ${1e3 * count} money`.trim(), m);
                break;
              case "pisang":
                db.data.users[m.sender].money >= 5500 * count ? (db.data.users[m.sender].pisang += 1 * count, db.data.users[m.sender].money -= 5500 * count, await conn.reply(m.chat, `Succes membeli ${count} Pisang dengan harga ${5500 * count} money`, m)) : await conn.reply(m.chat, `Uang anda tidak cukup untuk membeli ${count} pisang dengan harga ${5500 * count} money`.trim(), m);
                break;
              case "anggur":
                db.data.users[m.sender].money >= 5500 * count ? (db.data.users[m.sender].anggur += 1 * count, db.data.users[m.sender].money -= 5500 * count, await conn.reply(m.chat, `Succes membeli ${count} Anggur dengan harga ${5500 * count} money`, m)) : await conn.reply(m.chat, `Uang anda tidak cukup untuk membeli ${count} anggur dengan harga ${5500 * count} money`.trim(), m);
                break;
              case "mangga":
                db.data.users[m.sender].money >= 4600 * count ? (db.data.users[m.sender].mangga += 1 * count, db.data.users[m.sender].money -= 4600 * count, await conn.reply(m.chat, `Succes membeli ${count} Mangga dengan harga ${4600 * count} money`, m)) : await conn.reply(m.chat, `Uang anda tidak cukup untuk membeli ${count} mangga dengan harga ${4600 * count} money`.trim(), m);
                break;
              case "jeruk":
                db.data.users[m.sender].money >= 6e3 * count ? (db.data.users[m.sender].jeruk += 1 * count, db.data.users[m.sender].money -= 6e3 * count, await conn.reply(m.chat, `Succes membeli ${count} Jeruk dengan harga ${6e3 * count} money`, m)) : await conn.reply(m.chat, `Uang anda tidak cukup untuk membeli ${count} jeruk dengan harga ${6e3 * count} money`.trim(), m);
                break;
              case "apel":
                db.data.users[m.sender].money >= 5500 * count ? (db.data.users[m.sender].apel += 1 * count, db.data.users[m.sender].money -= 5500 * count, await conn.reply(m.chat, `Succes membeli ${count} Apel dengan harga ${5500 * count} money`, m)) : await conn.reply(m.chat, `Uang anda tidak cukup untuk membeli ${count} apel dengan harga ${5500 * count} money`.trim(), m);
                break;
              case "bibitpisang":
                db.data.users[m.sender].money >= 550 * count ? (db.data.users[m.sender].bibitpisang += 1 * count, db.data.users[m.sender].money -= 550 * count, await conn.reply(m.chat, `Succes membeli ${count} Bibit Pisang dengan harga ${550 * count} money`, m)) : await conn.reply(m.chat, `Uang anda tidak cukup untuk membeli ${count} bibit pisang dengan harga ${550 * count} money`.trim(), m);
                break;
              case "bibitanggur":
                db.data.users[m.sender].money >= 550 * count ? (db.data.users[m.sender].bibitanggur += 1 * count, db.data.users[m.sender].money -= 550 * count, await conn.reply(m.chat, `Succes membeli ${count} Bibit Anggur dengan harga ${550 * count} money`, m)) : await conn.reply(m.chat, `Uang anda tidak cukup untuk membeli ${count} bibit anggur dengan harga ${550 * count} money`.trim(), m);
                break;
              case "bibitmangga":
                db.data.users[m.sender].money >= 550 * count ? (db.data.users[m.sender].bibitmangga += 1 * count, db.data.users[m.sender].money -= 550 * count, await conn.reply(m.chat, `Succes membeli ${count} Bibit Mangga dengan harga ${550 * count} money`, m)) : await conn.reply(m.chat, `Uang anda tidak cukup untuk membeli ${count} bibit mangga dengan harga ${550 * count} money`.trim(), m);
                break;
              case "bibitjeruk":
                db.data.users[m.sender].money >= 550 * count ? (db.data.users[m.sender].bibitjeruk += 1 * count, db.data.users[m.sender].money -= 550 * count, await conn.reply(m.chat, `Succes membeli ${count} Bibit Jeruk dengan harga ${550 * count} money`, m)) : await conn.reply(m.chat, `Uang anda tidak cukup untuk membeli ${count} bibit jeruk dengan harga ${550 * count} money`.trim(), m);
                break;
              case "bibitapel":
                db.data.users[m.sender].money >= 550 * count ? (db.data.users[m.sender].bibitapel += 1 * count, db.data.users[m.sender].money -= 550 * count, await conn.reply(m.chat, `Succes membeli ${count} Bibit Apel dengan harga ${550 * count} money`, m)) : await conn.reply(m.chat, `Uang anda tidak cukup untuk membeli ${count} bibit apel dengan harga ${550 * count} money`.trim(), m);
                break;
              case "gardenboxs":
                db.data.users[m.sender].money >= 65e3 * count ? (db.data.users[m.sender].gardenboxs += 1 * count, db.data.users[m.sender].money -= 65e3 * count, await conn.reply(m.chat, `Succes membeli ${count} Gardenboxs dengan harga ${65e3 * count} money`, m)) : await conn.reply(m.chat, `Uang anda tidak cukup untuk membeli ${count} gardenboxs dengan harga ${65e3 * count} money`.trim(), m);
                break;
              case "berlian":
                db.data.users[m.sender].money >= 15e4 * count ? (db.data.users[m.sender].berlian += 1 * count, db.data.users[m.sender].money -= 15e4 * count, await conn.reply(m.chat, `Succes membeli ${count} Berlian dengan harga ${15e4 * count} money`, m)) : await conn.reply(m.chat, `Uang anda tidak cukup untuk membeli ${count} berlian dengan harga ${15e4 * count} money`.trim(), m);
                break;
              case "emas":
                db.data.users[m.sender].money >= 15e4 * count ? (db.data.users[m.sender].emas += 1 * count, db.data.users[m.sender].money -= 15e4 * count, await conn.reply(m.chat, `Succes membeli ${count} Emas dengan harga ${15e4 * count} money`, m)) : await conn.reply(m.chat, `Uang anda tidak cukup untuk membeli ${count} emas dengan harga ${15e4 * count} money`.trim(), m);
                break;
              case "pet":
                db.data.users[m.sender].money >= Bpet * count ? (db.data.users[m.sender].pet += 1 * count, db.data.users[m.sender].money -= Bpet * count, await conn.reply(m.chat, `Succes membeli ${count} Pet Random dengan harga ${Bpet * count} money`, m)) : await conn.reply(m.chat, `Uang anda tidak cukup untuk membeli ${count} pet random dengan harga ${Bpet * count} money`.trim(), m);
                break;
              case "limit":
                db.data.users[m.sender].money >= 25e3 * count ? (db.data.users[m.sender].limit += 1 * count, db.data.users[m.sender].money -= 25e3 * count, await conn.reply(m.chat, `Succes membeli ${count} Limit dengan harga ${25e3 * count} money`, m)) : await conn.reply(m.chat, `Uang anda tidak cukup untuk membeli ${count} limit dengan harga ${25e3 * count} money`.trim(), m);
                break;
              case "cupon":
                db.data.users[m.sender].tiketcoin >= 500 * count ? (db.data.users[m.sender].cupon += 1 * count, db.data.users[m.sender].tiketcoin -= 500 * count, await conn.reply(m.chat, `Succes membeli ${count} cupon dengan harga ${500 * count} Tiketcoin`, m)) : await conn.reply(m.chat, `Tiketcoin anda tidak cukup untuk membeli ${count} cupon dengan harga ${500 * count} Tiketcoin\n\nCara mendapatkan tiketcoin, anda harus memainkan semua fitur game..`.trim(), m);
                break;
              case "makananpet":
                db.data.users[m.sender].money >= 5e4 * count ? (db.data.users[m.sender].makananpet += 1 * count, db.data.users[m.sender].money -= 5e4 * count, await conn.reply(m.chat, `Succes membeli ${count} Makanan Pet dengan harga ${5e4 * count} money`, m)) : await conn.reply(m.chat, `Uang anda tidak cukup untuk membeli ${count} makanan pet dengan harga ${5e4 * count} money`.trim(), m);
                break;
              case "makanannaga":
                db.data.users[m.sender].money >= 15e4 * count ? (db.data.users[m.sender].makanannaga += 1 * count, db.data.users[m.sender].money -= 15e4 * count, await conn.reply(m.chat, `Succes membeli ${count} Makanan Naga dengan harga ${15e4 * count} money`, m)) : await conn.reply(m.chat, `Uang anda tidak cukup untuk membeli ${count} makanan naga dengan harga ${15e4 * count} money`.trim(), m);
                break;
              case "makananphonix":
                db.data.users[m.sender].money >= 8e4 * count ? (db.data.users[m.sender].makananphonix += 1 * count, db.data.users[m.sender].money -= 8e4 * count, await conn.reply(m.chat, `Succes membeli ${count} Makanan Phonix dengan harga ${8e4 * count} money`, m)) : await conn.reply(m.chat, `Uang anda tidak cukup untuk membeli ${count} makanan phonix dengan harga ${8e4 * count} money`.trim(), m);
                break;
              case "makanankyubi":
                db.data.users[m.sender].money >= 15e4 * count ? (db.data.users[m.sender].makanankyubi += 1 * count, db.data.users[m.sender].money -= 15e4 * count, await conn.reply(m.chat, `Succes membeli ${count} Makanan Kyubi dengan harga ${15e4 * count} money`, m)) : await conn.reply(m.chat, `Uang anda tidak cukup untuk membeli ${count} makanan kyubi dengan harga ${15e4 * count} money`.trim(), m);
                break;
              case "makanangriffin":
                db.data.users[m.sender].money >= 8e4 * count ? (db.data.users[m.sender].makanangriffin += 1 * count, db.data.users[m.sender].money -= 8e4 * count, await conn.reply(m.chat, `Succes membeli ${count} Makanan Griffin dengan harga ${8e4 * count} money`, m)) : await conn.reply(m.chat, `Uang anda tidak cukup untuk membeli ${count} makanan griffin dengan harga ${8e4 * count} money`.trim(), m);
                break;
              case "makanancentaur":
                db.data.users[m.sender].money >= 15e4 * count ? (db.data.users[m.sender].makanancentaur += 1 * count, db.data.users[m.sender].money -= 15e4 * count, await conn.reply(m.chat, `Succes membeli ${count} Makanan Centaur dengan harga ${15e4 * count} money`, m)) : await conn.reply(m.chat, `Uang anda tidak cukup untuk membeli ${count} makanan centaur dengan harga ${15e4 * count} money`.trim(), m);
                break;
              case "tiketm":
                db.data.users[m.sender].money >= 2e4 * count ? (db.data.users[m.sender].healtmonster += 1 * count, db.data.users[m.sender].money -= 2e4 * count, await conn.reply(m.chat, `Succes membeli ${count} TiketM dengan harga ${2e4 * count} money`, m)) : await conn.reply(m.chat, `Uang anda tidak cukup untuk membeli ${count} tiketm dengan harga ${2e4 * count} money`.trim(), m);
                break;
              case "aqua":
                db.data.users[m.sender].money >= 5e3 * count ? (db.data.users[m.sender].aqua += 1 * count, db.data.users[m.sender].money -= 5e3 * count, await conn.reply(m.chat, `Succes membeli ${count} Aqua dengan harga ${5e3 * count} money`, m)) : await conn.reply(m.chat, `Uang anda tidak cukup untuk membeli ${count} aqua dengan harga ${5e3 * count} money`.trim(), m);
                break;
              case "iron":
                db.data.users[m.sender].money >= 2e4 * count ? (db.data.users[m.sender].iron += 1 * count, db.data.users[m.sender].money -= 2e4 * count, await conn.reply(m.chat, `Succes membeli ${count} Iron dengan harga ${2e4 * count} money`, m)) : await conn.reply(m.chat, `Uang anda tidak cukup untuk membeli ${count} iron dengan harga ${2e4 * count} money`.trim(), m);
                break;
              case "string":
                db.data.users[m.sender].money >= 5e4 * count ? (db.data.users[m.sender].string += 1 * count, db.data.users[m.sender].money -= 5e4 * count, await conn.reply(m.chat, `Succes membeli ${count} String dengan harga ${5e4 * count} money`, m)) : await conn.reply(m.chat, `Uang anda tidak cukup untuk membeli ${count} string dengan harga ${5e4 * count} money`.trim(), m);
                break;
              case "sword":
                db.data.users[m.sender].money >= 15e4 * count ? (db.data.users[m.sender].sword += 1 * count, db.data.users[m.sender].money -= 15e4 * count, await conn.reply(m.chat, `Succes membeli ${count} Sword dengan harga ${15e4 * count} money`, m)) : await conn.reply(m.chat, `Uang anda tidak cukup untuk membeli ${count} sword dengan harga ${15e4 * count} money`.trim(), m);
                break;
              case "batu":
                db.data.users[m.sender].money >= 500 * count ? (db.data.users[m.sender].batu += 1 * count, db.data.users[m.sender].money -= 500 * count, await conn.reply(m.chat, `Succes membeli ${count} Batu dengan harga ${500 * count} money`, m)) : await conn.reply(m.chat, `Uang anda tidak cukup untuk membeli ${count} batu dengan harga ${500 * count} money`.trim(), m);
                break;
              case "umpan":
                db.data.users[m.sender].money >= 1500 * count ? (db.data.users[m.sender].umpan += 1 * count, db.data.users[m.sender].money -= 1500 * count, await conn.reply(m.chat, `Succes membeli ${count} Umpan dengan harga ${1500 * count} money`, m)) : await conn.reply(m.chat, `Uang anda tidak cukup untuk membeli ${count} umpan dengan harga ${1500 * count} money`.trim(), m);
                break;
              case "pancingan":
                db.data.users[m.sender].money >= 5e6 * count ? (db.data.users[m.sender].pancingan += 1 * count, db.data.users[m.sender].money -= 5e6 * count, await conn.reply(m.chat, `Succes membeli ${count} Pancingan dengan harga ${5e6 * count} money`, m)) : await conn.reply(m.chat, `Uang anda tidak cukup untuk membeli ${count} pancingan dengan harga ${5e6 * count} money`.trim(), m);
                break;
              case "armor":
                if (5 === db.data.users[m.sender].armor) return await conn.reply(m.chat, "Armormu sudah *Level Max*", m);
                db.data.users[m.sender].money > armor ? (db.data.users[m.sender].armor += 1, db.data.users[m.sender].money -= 1 * armor, await conn.reply(m.chat, `Succes membeli armor seharga ${armor} money`, m)) : await conn.reply(m.chat, `uang mu tidak cukup untuk membeli armor seharga ${armor} money`, m);
                break;
              default:
                return await conn.reply(m.chat, Kchat, m);
            }
            break;
          case "sell":
            switch (_type) {
              case "potion":
                db.data.users[m.sender].potion >= 1 * count ? (db.data.users[m.sender].money += 100 * count, db.data.users[m.sender].potion -= 1 * count, await conn.reply(m.chat, `Succes menjual ${count} Potion dengan harga ${100 * count} money`.trim(), m)) : await conn.reply(m.chat, "Potion kamu tidak cukup".trim(), m);
                break;
              case "common":
                db.data.users[m.sender].common >= 1 * count ? (db.data.users[m.sender].money += 1e3 * count, db.data.users[m.sender].common -= 1 * count, await conn.reply(m.chat, `Succes menjual ${count} Common Crate dengan harga ${1e3 * count} money`.trim(), m)) : await conn.reply(m.chat, "Common Crate kamu tidak cukup".trim(), m);
                break;
              case "uncommon":
                db.data.users[m.sender].uncommon >= 1 * count ? (db.data.users[m.sender].money += 100 * count, db.data.users[m.sender].uncommon -= 1 * count, await conn.reply(m.chat, `Succes menjual ${count} Uncommon Crate dengan harga ${100 * count} money`.trim(), m)) : await conn.reply(m.chat, "Uncommon Crate kamu tidak cukup".trim(), m);
                break;
              case "mythic":
                db.data.users[m.sender].mythic >= 1 * count ? (db.data.users[m.sender].money += 1e3 * count, db.data.users[m.sender].mythic -= 1 * count, await conn.reply(m.chat, `Succes menjual ${count} Mythic Crate dengan harga ${1e3 * count} money`.trim(), m)) : await conn.reply(m.chat, "Mythic Crate kamu tidak cukup".trim(), m);
                break;
              case "legendary":
                db.data.users[m.sender].legendary >= 1 * count ? (db.data.users[m.sender].money += 5e3 * count, db.data.users[m.sender].legendary -= 1 * count, await conn.reply(m.chat, `Succes menjual ${count} Legendary Crate dengan harga ${5e3 * count} money`.trim(), m)) : await conn.reply(m.chat, "Legendary Crate kamu tidak cukup".trim(), m);
                break;
              case "sampah":
                db.data.users[m.sender].sampah >= 1 * count ? (db.data.users[m.sender].sampah -= 1 * count, db.data.users[m.sender].money += 5 * count, await conn.reply(m.chat, `Succes menjual ${count} sampah, dan anda mendapatkan ${5 * count} money`, m)) : await conn.reply(m.chat, "Sampah anda tidak cukup", m);
                break;
              case "kaleng":
                db.data.users[m.sender].kaleng >= 1 * count ? (db.data.users[m.sender].kaleng -= 1 * count, db.data.users[m.sender].money += 100 * count, await conn.reply(m.chat, `Succes menjual ${count} kaleng, dan anda mendapatkan ${100 * count} money`, m)) : await conn.reply(m.chat, "Kaleng anda tidak cukup", m);
                break;
              case "kardus":
                db.data.users[m.sender].kardus >= 1 * count ? (db.data.users[m.sender].kardus -= 1 * count, db.data.users[m.sender].money += 50 * count, await conn.reply(m.chat, `Succes menjual ${count} kardus, dan anda mendapatkan ${50 * count} money`, m)) : await conn.reply(m.chat, "Kardus anda tidak cukup", m);
                break;
              case "botol":
                db.data.users[m.sender].botol >= 1 * count ? (db.data.users[m.sender].botol -= 1 * count, db.data.users[m.sender].money += 50 * count, await conn.reply(m.chat, `Succes menjual ${count} botol, dan anda mendapatkan ${50 * count} money`, m)) : await conn.reply(m.chat, "Botol anda tidak cukup", m);
                break;
              case "kayu":
                db.data.users[m.sender].kayu >= 1 * count ? (db.data.users[m.sender].kayu -= 1 * count, db.data.users[m.sender].money += 400 * count, await conn.reply(m.chat, `Succes menjual ${count} kayu, dan anda mendapatkan ${400 * count} money`, m)) : await conn.reply(m.chat, "Kayu anda tidak cukup", m);
                break;
              case "pisang":
                db.data.users[m.sender].pisang >= 1 * count ? (db.data.users[m.sender].pisang -= 1 * count, db.data.users[m.sender].money += 100 * count, await conn.reply(m.chat, `Succes menjual ${count} pisang, dan anda mendapatkan ${100 * count} money`, m)) : await conn.reply(m.chat, "Pisang anda tidak cukup", m);
                break;
              case "anggur":
                db.data.users[m.sender].anggur >= 1 * count ? (db.data.users[m.sender].anggur -= 1 * count, db.data.users[m.sender].money += 150 * count, await conn.reply(m.chat, `Succes menjual ${count} anggur, dan anda mendapatkan ${150 * count} money`, m)) : await conn.reply(m.chat, "Anggur anda tidak cukup", m);
                break;
              case "mangga":
                db.data.users[m.sender].mangga >= 1 * count ? (db.data.users[m.sender].mangga -= 1 * count, db.data.users[m.sender].money += 150 * count, await conn.reply(m.chat, `Succes menjual ${count} mangga, dan anda mendapatkan ${150 * count} money`, m)) : await conn.reply(m.chat, "Mangga anda tidak cukup", m);
                break;
              case "jeruk":
                db.data.users[m.sender].jeruk >= 1 * count ? (db.data.users[m.sender].jeruk -= 1 * count, db.data.users[m.sender].money += 300 * count, await conn.reply(m.chat, `Succes menjual ${count} jeruk, dan anda mendapatkan ${300 * count} money`, m)) : await conn.reply(m.chat, "Jeruk anda tidak cukup", m);
                break;
              case "apel":
                db.data.users[m.sender].apel >= 1 * count ? (db.data.users[m.sender].apel -= 1 * count, db.data.users[m.sender].money += 400 * count, await conn.reply(m.chat, `Succes menjual ${count} apel, dan anda mendapatkan ${400 * count} money`, m)) : await conn.reply(m.chat, "Apel anda tidak cukup", m);
                break;
              case "berlian":
                db.data.users[m.sender].berlian >= 1 * count ? (db.data.users[m.sender].berlian -= 1 * count, db.data.users[m.sender].money += 1e4 * count, await conn.reply(m.chat, `Succes menjual ${count} berlian, dan anda mendapatkan ${1e4 * count} money`, m)) : await conn.reply(m.chat, "Berlian anda tidak cukup", m);
                break;
              case "emas":
                db.data.users[m.sender].emas >= 1 * count ? (db.data.users[m.sender].emas -= 1 * count, db.data.users[m.sender].money += 15e3 * count, await conn.reply(m.chat, `Succes menjual ${count} emas , dan anda mendapatkan ${15e3 * count} money`, m)) : await conn.reply(m.chat, "Emas anda tidak cukup", m);
                break;
              case "pet":
                db.data.users[m.sender].pet >= 1 * count ? (db.data.users[m.sender].pet -= 1 * count, db.data.users[m.sender].money += 1e3 * count, await conn.reply(m.chat, `Succes menjual ${count} pet random, dan anda mendapatkan ${1e3 * count} money`, m)) : await conn.reply(m.chat, "Pet Random anda tidak cukup", m);
                break;
              case "makananpet":
                db.data.users[m.sender].makananpet >= 1 * count ? (db.data.users[m.sender].makananpet -= 1 * count, db.data.users[m.sender].money += 500 * count, await conn.reply(m.chat, `Succes menjual ${count} makanan pet, dan anda mendapatkan ${500 * count} money`, m)) : await conn.reply(m.chat, "Makanan pet anda tidak cukup", m);
                break;
              case "makananphonix":
                db.data.users[m.sender].makananphonix >= 1 * count ? (db.data.users[m.sender].makananphonix -= 1 * count, db.data.users[m.sender].money += 5e3 * count, await conn.reply(m.chat, `Succes menjual ${count} makanan phonix, dan anda mendapatkan ${5e3 * count} money`, m)) : await conn.reply(m.chat, "Makanan phonix anda tidak cukup", m);
                break;
              case "makanannaga":
                db.data.users[m.sender].makanannaga >= 1 * count ? (db.data.users[m.sender].makanannaga -= 1 * count, db.data.users[m.sender].money += 1e4 * count, await conn.reply(m.chat, `Succes menjual ${count} makanan naga, dan anda mendapatkan ${1e4 * count} money`, m)) : await conn.reply(m.chat, "Makanan naga anda tidak cukup", m);
                break;
              case "makanankyubi":
                db.data.users[m.sender].makanankyuni >= 1 * count ? (db.data.users[m.sender].makanankyubi -= 1 * count, db.data.users[m.sender].money += 1e4 * count, await conn.reply(m.chat, `Succes menjual ${count} makanan kyubi, dan anda mendapatkan ${1e4 * count} money`, m)) : await conn.reply(m.chat, "Makanan kyubi anda tidak cukup", m);
                break;
              case "makanangriffin":
                db.data.users[m.sender].makanangriffin >= 1 * count ? (db.data.users[m.sender].makanangriffin -= 1 * count, db.data.users[m.sender].money += 5e3 * count, await conn.reply(m.chat, `Succes menjual ${count} makanan griffin, dan anda mendapatkan ${5e3 * count} money`, m)) : await conn.reply(m.chat, "Makanan griffin anda tidak cukup", m);
                break;
              case "makanancentaur":
                db.data.users[m.sender].makanancentaur >= 1 * count ? (db.data.users[m.sender].makanancentaur -= 1 * count, db.data.users[m.sender].money += 1e4 * count, await conn.reply(m.chat, `Succes menjual ${count} makanan centaur, dan anda mendapatkan ${1e4 * count} money`, m)) : await conn.reply(m.chat, "Makanan centaur anda tidak cukup", m);
                break;
              case "aqua":
                db.data.users[m.sender].aqua >= 1 * count ? (db.data.users[m.sender].aqua -= 1 * count, db.data.users[m.sender].money += 1e3 * count, await conn.reply(m.chat, `Succes menjual ${count} aqua, dan anda mendapatkan ${1e3 * count} money`, m)) : await conn.reply(m.chat, "Aqua anda tidak cukup", m);
                break;
              case "pancingan":
                db.data.users[m.sender].pancingan >= 1 * count ? (db.data.users[m.sender].pancingan -= 1 * count, db.data.users[m.sender].money += 5e5 * count, await conn.reply(m.chat, `Succes menjual ${count} pancingan, dan anda mendapatkan ${5e5 * count} money`, m)) : await conn.reply(m.chat, "Pancingan anda tidak cukup", m);
                break;
              case "iron":
                db.data.users[m.sender].iron >= 1 * count ? (db.data.users[m.sender].iron -= 1 * count, db.data.users[m.sender].money += 5e3 * count, await conn.reply(m.chat, `Succes menjual ${count} pancingan, dan anda mendapatkan ${5e3 * count} money`, m)) : await conn.reply(m.chat, "Iron anda tidak cukup", m);
                break;
              case "string":
                db.data.users[m.sender].string >= 1 * count ? (db.data.users[m.sender].string -= 1 * count, db.data.users[m.sender].money += 5e3 * count, await conn.reply(m.chat, `Succes menjual ${count} string, dan anda mendapatkan ${5e3 * count} money`, m)) : await conn.reply(m.chat, "String anda tidak cukup", m);
                break;
              case "sword":
                db.data.users[m.sender].sword >= 1 * count ? (db.data.users[m.sender].sword -= 1 * count, db.data.users[m.sender].money += 15e3 * count, await conn.reply(m.chat, `Succes menjual ${count} sword, dan anda mendapatkan ${15e3 * count} money`, m)) : await conn.reply(m.chat, "Sword anda tidak cukup", m);
                break;
              case "batu":
                db.data.users[m.sender].batu >= 1 * count ? (db.data.users[m.sender].batu -= 1 * count, db.data.users[m.sender].money += 100 * count, await conn.reply(m.chat, `Succes menjual ${count} batu, dan anda mendapatkan ${100 * count} money`, m)) : await conn.reply(m.chat, "Batu anda tidak cukup", m);
                break;
              case "limit":
                db.data.users[m.sender].limit >= 1 * count ? (db.data.users[m.sender].limit -= 1 * count, db.data.users[m.sender].money += 2e4 * count, await conn.reply(m.chat, `Succes menjual ${count} limit, dan anda mendapatkan ${2e4 * count} money`, m)) : await conn.reply(m.chat, "Limit anda tidak cukup", m);
                break;
              case "diamond":
                db.data.users[m.sender].diamond >= 1 * count ? (db.data.users[m.sender].diamond -= 1 * count, db.data.users[m.sender].money += 1e3 * count, await conn.reply(m.chat, `Succes menjual ${count} Diamond, dan anda mendapatkan ${1e3 * count} money`, m)) : await conn.reply(m.chat, "Diamond anda tidak cukup", m);
                break;
              default:
                return await conn.reply(m.chat, Kchat, m);
            }
            break;
          default:
            return await conn.reply(m.chat, Kchat, m);
        }
      } else if (/beli|buy/i.test(command)) {
        const count = args[1] && args[1].length > 0 ? Math.min(999999999999999, Math.max(parseInt(args[1]), 1)) : !args[1] || args.length < 3 ? 1 : Math.min(1, count);
        switch (type) {
          case "potion":
            db.data.users[m.sender].money >= 2e4 * count ? (db.data.users[m.sender].money -= 2e4 * count, db.data.users[m.sender].potion += 1 * count, await conn.reply(m.chat, `Succes membeli ${count} Potion dengan harga ${2e4 * count} money\n\nGunakan potion dengan ketik: *${usedPrefix}use potion <jumlah>*`, m)) : await conn.reply(m.chat, `Uang anda tidak cukup untuk membeli ${count} Potion dengan harga ${2e4 * count} money`, m);
            break;
          case "diamond":
            db.data.users[m.sender].money >= 1e5 * count ? (db.data.users[m.sender].diamond += 1 * count, db.data.users[m.sender].money -= 1e5 * count, await conn.reply(m.chat, `Succes membeli ${count} Diamond dengan harga ${1e5 * count} money`, m)) : await conn.reply(m.chat, "Money anda tidak cukup", m);
            break;
          case "common":
            db.data.users[m.sender].money >= 1e5 * count ? (db.data.users[m.sender].common += 1 * count, db.data.users[m.sender].money -= 1e5 * count, await conn.reply(m.chat, `Succes membeli ${count} Common crate dengan harga ${1e5 * count} money`, m)) : await conn.reply(m.chat, `Uang anda tidak cukup untuk membeli ${count} Common crate dengan harga ${1e5 * count} money\n\nBuka crate dengan ketik: *${usedPrefix}open common*`, m);
            break;
          case "uncommon":
            db.data.users[m.sender].money >= 1e5 * count ? (db.data.users[m.sender].uncommon += 1 * count, db.data.users[m.sender].money -= 1e5 * count, await conn.reply(m.chat, `Succes membeli ${count} Uncommon crate dengan harga ${1e5 * count} money`, m)) : await conn.reply(m.chat, `Uang anda tidak cukup untuk membeli ${count} Uncommon crate dengan harga ${1e5 * count} money\n\nBuka crate dengan ketik: *${usedPrefix}open uncommon*`, m);
            break;
          case "mythic":
            db.data.users[m.sender].money >= 1e5 * count ? (db.data.users[m.sender].mythic += 1 * count, db.data.users[m.sender].money -= 1e5 * count, await conn.reply(m.chat, `Succes membeli ${count} Mythic crate dengan harga ${1e5 * count} money`, m)) : await conn.reply(m.chat, `Uang anda tidak cukup untuk membeli ${count} Mythic crate dengan harga ${1e5 * count} money\n\nBuka crate dengan ketik: *${usedPrefix}open mythic*`, m);
            break;
          case "legendary":
            db.data.users[m.sender].money >= 2e5 * count ? (db.data.users[m.sender].legendary += 1 * count, db.data.users[m.sender].money -= 2e5 * count, await conn.reply(m.chat, `Succes membeli ${count} Legendary crate dengan harga ${2e5 * count} money`, m)) : await conn.reply(m.chat, `Uang anda tidak cukup untuk membeli ${count} Legendary crate dengan harga ${2e5 * count} money\n\nBuka crate dengan ketik: *${usedPrefix}open legendary*`, m);
            break;
          case "sampah":
            db.data.users[m.sender].money >= 120 * count ? (db.data.users[m.sender].sampah += 1 * count, db.data.users[m.sender].money -= 120 * count, await conn.reply(m.chat, `Succes membeli ${count} Sampah dengan harga ${120 * count} money`, m)) : await conn.reply(m.chat, `Uang anda tidak cukup untuk membeli ${count} Sampah dengan harga ${120 * count} money`.trim(), m);
            break;
          case "kaleng":
            db.data.users[m.sender].money >= 400 * count ? (db.data.users[m.sender].kaleng += 1 * count, db.data.users[m.sender].money -= 400 * count, await conn.reply(m.chat, `Succes membeli ${count} Kaleng dengan harga ${400 * count} money`, m)) : await conn.reply(m.chat, `Uang anda tidak cukup untuk membeli ${count} Kaleng dengan harga ${400 * count} money`.trim(), m);
            break;
          case "kardus":
            db.data.users[m.sender].money >= 400 * count ? (db.data.users[m.sender].kardus += 1 * count, db.data.users[m.sender].money -= 400 * count, await conn.reply(m.chat, `Succes membeli ${count} Kardus dengan harga ${400 * count} money`, m)) : await conn.reply(m.chat, `Uang anda tidak cukup untuk membeli ${count} Kardus dengan harga ${400 * count} money`.trim(), m);
            break;
          case "botol":
            db.data.users[m.sender].money >= 300 * count ? (db.data.users[m.sender].botol += 1 * count, db.data.users[m.sender].money -= 300 * count, await conn.reply(m.chat, `Succes membeli ${count} Botol dengan harga ${300 * count} money`, m)) : await conn.reply(m.chat, `Uang anda tidak cukup untuk membeli ${count} botol dengan harga ${300 * count} money`.trim(), m);
            break;
          case "kayu":
            db.data.users[m.sender].money >= 1e3 * count ? (db.data.users[m.sender].kayu += 1 * count, db.data.users[m.sender].money -= 1e3 * count, await conn.reply(m.chat, `Succes membeli ${count} Kayu dengan harga ${1e3 * count} money`, m)) : await conn.reply(m.chat, `Uang anda tidak cukup untuk membeli ${count} kayu dengan harga ${1e3 * count} money`.trim(), m);
            break;
          case "pisang":
            db.data.users[m.sender].money >= 5500 * count ? (db.data.users[m.sender].pisang += 1 * count, db.data.users[m.sender].money -= 5500 * count, await conn.reply(m.chat, `Succes membeli ${count} Pisang dengan harga ${5500 * count} money`, m)) : await conn.reply(m.chat, `Uang anda tidak cukup untuk membeli ${count} pisang dengan harga ${5500 * count} money`.trim(), m);
            break;
          case "anggur":
            db.data.users[m.sender].money >= 5500 * count ? (db.data.users[m.sender].anggur += 1 * count, db.data.users[m.sender].money -= 5500 * count, await conn.reply(m.chat, `Succes membeli ${count} Anggur dengan harga ${5500 * count} money`, m)) : await conn.reply(m.chat, `Uang anda tidak cukup untuk membeli ${count} anggur dengan harga ${5500 * count} money`.trim(), m);
            break;
          case "mangga":
            db.data.users[m.sender].money >= 4600 * count ? (db.data.users[m.sender].mangga += 1 * count, db.data.users[m.sender].money -= 4600 * count, await conn.reply(m.chat, `Succes membeli ${count} Mangga dengan harga ${4600 * count} money`, m)) : await conn.reply(m.chat, `Uang anda tidak cukup untuk membeli ${count} mangga dengan harga ${4600 * count} money`.trim(), m);
            break;
          case "jeruk":
            db.data.users[m.sender].money >= 6e3 * count ? (db.data.users[m.sender].jeruk += 1 * count, db.data.users[m.sender].money -= 6e3 * count, await conn.reply(m.chat, `Succes membeli ${count} Jeruk dengan harga ${6e3 * count} money`, m)) : await conn.reply(m.chat, `Uang anda tidak cukup untuk membeli ${count} jeruk dengan harga ${6e3 * count} money`.trim(), m);
            break;
          case "apel":
            db.data.users[m.sender].money >= 5500 * count ? (db.data.users[m.sender].apel += 1 * count, db.data.users[m.sender].money -= 5500 * count, await conn.reply(m.chat, `Succes membeli ${count} Apel dengan harga ${5500 * count} money`, m)) : await conn.reply(m.chat, `Uang anda tidak cukup untuk membeli ${count} apel dengan harga ${5500 * count} money`.trim(), m);
            break;
          case "bibitpisang":
            db.data.users[m.sender].money >= 550 * count ? (db.data.users[m.sender].bibitpisang += 1 * count, db.data.users[m.sender].money -= 550 * count, await conn.reply(m.chat, `Succes membeli ${count} Bibit Pisang dengan harga ${550 * count} money`, m)) : await conn.reply(m.chat, `Uang anda tidak cukup untuk membeli ${count} bibit pisang dengan harga ${550 * count} money`.trim(), m);
            break;
          case "bibitanggur":
            db.data.users[m.sender].money >= 550 * count ? (db.data.users[m.sender].bibitanggur += 1 * count, db.data.users[m.sender].money -= 550 * count, await conn.reply(m.chat, `Succes membeli ${count} Bibit Anggur dengan harga ${550 * count} money`, m)) : await conn.reply(m.chat, `Uang anda tidak cukup untuk membeli ${count} bibit anggur dengan harga ${550 * count} money`.trim(), m);
            break;
          case "bibitmangga":
            db.data.users[m.sender].money >= 550 * count ? (db.data.users[m.sender].bibitmangga += 1 * count, db.data.users[m.sender].money -= 550 * count, await conn.reply(m.chat, `Succes membeli ${count} Bibit Mangga dengan harga ${550 * count} money`, m)) : await conn.reply(m.chat, `Uang anda tidak cukup untuk membeli ${count} bibit mangga dengan harga ${550 * count} money`.trim(), m);
            break;
          case "bibitjeruk":
            db.data.users[m.sender].money >= 550 * count ? (db.data.users[m.sender].bibitjeruk += 1 * count, db.data.users[m.sender].money -= 550 * count, await conn.reply(m.chat, `Succes membeli ${count} Bibit Jeruk dengan harga ${550 * count} money`, m)) : await conn.reply(m.chat, `Uang anda tidak cukup untuk membeli ${count} bibit jeruk dengan harga ${550 * count} money`.trim(), m);
            break;
          case "bibitapel":
            db.data.users[m.sender].money >= 550 * count ? (db.data.users[m.sender].bibitapel += 1 * count, db.data.users[m.sender].money -= 550 * count, await conn.reply(m.chat, `Succes membeli ${count} Bibit Apel dengan harga ${550 * count} money`, m)) : await conn.reply(m.chat, `Uang anda tidak cukup untuk membeli ${count} bibit apel dengan harga ${550 * count} money`.trim(), m);
            break;
          case "gardenboxs":
            db.data.users[m.sender].money >= 65e3 * count ? (db.data.users[m.sender].gardenboxs += 1 * count, db.data.users[m.sender].money -= 65e3 * count, await conn.reply(m.chat, `Succes membeli ${count} Gardenboxs dengan harga ${65e3 * count} money`, m)) : await conn.reply(m.chat, `Uang anda tidak cukup untuk membeli ${count} gardenboxs dengan harga ${65e3 * count} money`.trim(), m);
            break;
          case "berlian":
            db.data.users[m.sender].money >= 15e4 * count ? (db.data.users[m.sender].berlian += 1 * count, db.data.users[m.sender].money -= 15e4 * count, await conn.reply(m.chat, `Succes membeli ${count} Apel dengan harga ${15e4 * count} money`, m)) : await conn.reply(m.chat, `Uang anda tidak cukup untuk membeli ${count} berlian dengan harga ${15e4 * count} money`.trim(), m);
            break;
          case "emas":
            db.data.users[m.sender].money >= 15e4 * count ? (db.data.users[m.sender].emas += 1 * count, db.data.users[m.sender].money -= 15e4 * count, await conn.reply(m.chat, `Succes membeli ${count} Emas dengan harga ${15e4 * count} money`, m)) : await conn.reply(m.chat, `Uang anda tidak cukup untuk membeli ${count} emas dengan harga ${15e4 * count} money`.trim(), m);
            break;
          case "pet":
            db.data.users[m.sender].money >= Bpet * count ? (db.data.users[m.sender].pet += 1 * count, db.data.users[m.sender].money -= Bpet * count, await conn.reply(m.chat, `Succes membeli ${count} Pet Random dengan harga ${Bpet * count} money`, m)) : await conn.reply(m.chat, `Uang anda tidak cukup untuk membeli ${count} pet random dengan harga ${Bpet * count} money`.trim(), m);
            break;
          case "limit":
            db.data.users[m.sender].money >= 25e3 * count ? (db.data.users[m.sender].limit += 1 * count, db.data.users[m.sender].money -= 25e3 * count, await conn.reply(m.chat, `Succes membeli ${count} Limit dengan harga ${25e3 * count} money`, m)) : await conn.reply(m.chat, `Uang anda tidak cukup untuk membeli ${count} limit dengan harga ${25e3 * count} money`.trim(), m);
            break;
          case "cupon":
            db.data.users[m.sender].tiketcoin >= 500 * count ? (db.data.users[m.sender].cupon += 1 * count, db.data.users[m.sender].tiketcoin -= 500 * count, await conn.reply(m.chat, `Succes membeli ${count} cupon dengan harga ${500 * count} Tiketcoin`, m)) : await conn.reply(m.chat, `Tiketcoin anda tidak cukup untuk membeli ${count} cupon dengan harga ${500 * count} Tiketcoin\n\nCara mendapatkan tiketcoin, anda harus memainkan semua fitur game..`.trim(), m);
            break;
          case "makananpet":
            db.data.users[m.sender].money >= 5e4 * count ? (db.data.users[m.sender].makananpet += 1 * count, db.data.users[m.sender].money -= 5e4 * count, await conn.reply(m.chat, `Succes membeli ${count} Makanan Pet dengan harga ${5e4 * count} money`, m)) : await conn.reply(m.chat, `Uang anda tidak cukup untuk membeli ${count} makanan pet dengan harga ${5e4 * count} money`.trim(), m);
            break;
          case "makanannaga":
            db.data.users[m.sender].money >= 15e4 * count ? (db.data.users[m.sender].makanannaga += 1 * count, db.data.users[m.sender].money -= 15e4 * count, await conn.reply(m.chat, `Succes membeli ${count} Makanan Naga dengan harga ${15e4 * count} money`, m)) : await conn.reply(m.chat, `Uang anda tidak cukup untuk membeli ${count} makanan pet dengan harga ${15e4 * count} money`.trim(), m);
            break;
          case "makananphonix":
            db.data.users[m.sender].money >= 8e4 * count ? (db.data.users[m.sender].makananphonix += 1 * count, db.data.users[m.sender].money -= 8e4 * count, await conn.reply(m.chat, `Succes membeli ${count} Makanan Phonix dengan harga ${8e4 * count} money`, m)) : await conn.reply(m.chat, `Uang anda tidak cukup untuk membeli ${count} makanan pet dengan harga ${8e4 * count} money`.trim(), m);
            break;
          case "makanankyubi":
            db.data.users[m.sender].money >= 15e4 * count ? (db.data.users[m.sender].makanankyubi += 1 * count, db.data.users[m.sender].money -= 15e4 * count, await conn.reply(m.chat, `Succes membeli ${count} Makanan Kyubi dengan harga ${15e4 * count} money`, m)) : await conn.reply(m.chat, `Uang anda tidak cukup untuk membeli ${count} makanan kyubi dengan harga ${15e4 * count} money`.trim(), m);
            break;
          case "makanangriffin":
            db.data.users[m.sender].money >= 8e4 * count ? (db.data.users[m.sender].makanangriffin += 1 * count, db.data.users[m.sender].money -= 8e4 * count, await conn.reply(m.chat, `Succes membeli ${count} Makanan Griffin dengan harga ${8e4 * count} money`, m)) : await conn.reply(m.chat, `Uang anda tidak cukup untuk membeli ${count} makanan griffin dengan harga ${8e4 * count} money`.trim(), m);
            break;
          case "makanancentaur":
            db.data.users[m.sender].money >= 15e4 * count ? (db.data.users[m.sender].makanancentaur += 1 * count, db.data.users[m.sender].money -= 15e4 * count, await conn.reply(m.chat, `Succes membeli ${count} Makanan Centaur dengan harga ${15e4 * count} money`, m)) : await conn.reply(m.chat, `Uang anda tidak cukup untuk membeli ${count} makanan centaur dengan harga ${15e4 * count} money`.trim(), m);
            break;
          case "tiketm":
            db.data.users[m.sender].money >= 2e4 * count ? (db.data.users[m.sender].healtmonster += 1 * count, db.data.users[m.sender].money -= 2e4 * count, await conn.reply(m.chat, `Succes membeli ${count} TiketM dengan harga ${2e4 * count} money`, m)) : await conn.reply(m.chat, `Uang anda tidak cukup untuk membeli ${count} tiketm dengan harga ${2e4 * count} money`.trim(), m);
            break;
          case "aqua":
            db.data.users[m.sender].money >= 5e3 * count ? (db.data.users[m.sender].aqua += 1 * count, db.data.users[m.sender].money -= 5e3 * count, await conn.reply(m.chat, `Succes membeli ${count} Aqua dengan harga ${5e3 * count} money`, m)) : await conn.reply(m.chat, `Uang anda tidak cukup untuk membeli ${count} aqua dengan harga ${5e3 * count} money`.trim(), m);
            break;
          case "iron":
            db.data.users[m.sender].money >= 2e4 * count ? (db.data.users[m.sender].iron += 1 * count, db.data.users[m.sender].money -= 2e4 * count, await conn.reply(m.chat, `Succes membeli ${count} Iron dengan harga ${2e4 * count} money`, m)) : await conn.reply(m.chat, `Uang anda tidak cukup untuk membeli ${count} iron dengan harga ${2e4 * count} money`.trim(), m);
            break;
          case "string":
            db.data.users[m.sender].money >= 5e4 * count ? (db.data.users[m.sender].string += 1 * count, db.data.users[m.sender].money -= 5e4 * count, await conn.reply(m.chat, `Succes membeli ${count} String dengan harga ${5e4 * count} money`, m)) : await conn.reply(m.chat, `Uang anda tidak cukup untuk membeli ${count} string dengan harga ${5e4 * count} money`.trim(), m);
            break;
          case "sword":
            db.data.users[m.sender].money >= 15e4 * count ? (db.data.users[m.sender].sword += 1 * count, db.data.users[m.sender].money -= 15e4 * count, await conn.reply(m.chat, `Succes membeli ${count} Sword dengan harga ${15e4 * count} money`, m)) : await conn.reply(m.chat, `Uang anda tidak cukup untuk membeli ${count} sword dengan harga ${15e4 * count} money`.trim(), m);
            break;
          case "batu":
            db.data.users[m.sender].money >= 500 * count ? (db.data.users[m.sender].batu += 1 * count, db.data.users[m.sender].money -= 500 * count, await conn.reply(m.chat, `Succes membeli ${count} Batu dengan harga ${500 * count} money`, m)) : await conn.reply(m.chat, `Uang anda tidak cukup untuk membeli ${count} batu dengan harga ${500 * count} money`.trim(), m);
            break;
          case "umpan":
            db.data.users[m.sender].money >= 1500 * count ? (db.data.users[m.sender].umpan += 1 * count, db.data.users[m.sender].money -= 1500 * count, await conn.reply(m.chat, `Succes membeli ${count} Umpan dengan harga ${1500 * count} money`, m)) : await conn.reply(m.chat, `Uang anda tidak cukup untuk membeli ${count} umpan dengan harga ${1500 * count} money`.trim(), m);
            break;
          case "pancingan":
            db.data.users[m.sender].money >= 5e6 * count ? (db.data.users[m.sender].pancingan += 1 * count, db.data.users[m.sender].money -= 5e6 * count, await conn.reply(m.chat, `Succes membeli ${count} Pancingan dengan harga ${5e6 * count} money`, m)) : await conn.reply(m.chat, `Uang anda tidak cukup untuk membeli ${count} pancingan dengan harga ${5e6 * count} money`.trim(), m);
            break;
          case "armor":
            if (5 === db.data.users[m.sender].armor) return await conn.reply(m.chat, "Armormu sudah *Level Max*", m);
            db.data.users[m.sender].money > 1 * armor ? (db.data.users[m.sender].armor += 1, db.data.users[m.sender].money -= 1 * armor, await conn.reply(m.chat, `Succes membeli armor seharga ${armor} money`, m)) : await conn.reply(m.chat, `uang mu tidak cukup untuk membeli armor seharga ${armor} money`, m);
            break;
          default:
            return await conn.reply(m.chat, Kchat, m);
        }
      } else if (/sell|jual|/i.test(command)) {
        const count = args[1] && args[1].length > 0 ? Math.min(999999999999999, Math.max(parseInt(args[1]), 1)) : !args[1] || args.length < 3 ? 1 : Math.min(1, count);
        switch (type) {
          case "potion":
            db.data.users[m.sender].potion >= 1 * count ? (db.data.users[m.sender].money += 100 * count, db.data.users[m.sender].potion -= 1 * count, await conn.reply(m.chat, `Succes menjual ${count} Potion dengan harga ${100 * count} money`.trim(), m)) : await conn.reply(m.chat, "Potion kamu tidak cukup".trim(), m);
            break;
          case "common":
            db.data.users[m.sender].common >= 1 * count ? (db.data.users[m.sender].money += 1e3 * count, db.data.users[m.sender].common -= 1 * count, await conn.reply(m.chat, `Succes menjual ${count} Common Crate dengan harga ${1e3 * count} money`.trim(), m)) : await conn.reply(m.chat, "Common Crate kamu tidak cukup".trim(), m);
            break;
          case "uncommon":
            db.data.users[m.sender].uncommon >= 1 * count ? (db.data.users[m.sender].money += 100 * count, db.data.users[m.sender].uncommon -= 1 * count, await conn.reply(m.chat, `Succes menjual ${count} Uncommon Crate dengan harga ${100 * count} money`.trim(), m)) : await conn.reply(m.chat, "Uncommon Crate kamu tidak cukup".trim(), m);
            break;
          case "mythic":
            db.data.users[m.sender].mythic >= 1 * count ? (db.data.users[m.sender].money += 1e3 * count, db.data.users[m.sender].mythic -= 1 * count, await conn.reply(m.chat, `Succes menjual ${count} Mythic Crate dengan harga ${1e3 * count} money`.trim(), m)) : await conn.reply(m.chat, "Mythic Crate kamu tidak cukup".trim(), m);
            break;
          case "legendary":
            db.data.users[m.sender].legendary >= 1 * count ? (db.data.users[m.sender].money += 5e3 * count, db.data.users[m.sender].legendary -= 1 * count, await conn.reply(m.chat, `Succes menjual ${count} Legendary Crate dengan harga ${5e3 * count} money`.trim(), m)) : await conn.reply(m.chat, "Legendary Crate kamu tidak cukup".trim(), m);
            break;
          case "sampah":
            db.data.users[m.sender].sampah >= 1 * count ? (db.data.users[m.sender].sampah -= 1 * count, db.data.users[m.sender].money += 5 * count, await conn.reply(m.chat, `Succes menjual ${count} sampah, dan anda mendapatkan ${5 * count} money`.trim(), m)) : await conn.reply(m.chat, "Sampah anda tidak cukup".trim(), m);
            break;
          case "kaleng":
            db.data.users[m.sender].kaleng >= 1 * count ? (db.data.users[m.sender].kaleng -= 1 * count, db.data.users[m.sender].money += 100 * count, await conn.reply(m.chat, `Succes menjual ${count} kaleng, dan anda mendapatkan ${100 * count} money`, m)) : await conn.reply(m.chat, "Kaleng anda tidak cukup", m);
            break;
          case "kardus":
            db.data.users[m.sender].kardus >= 1 * count ? (db.data.users[m.sender].kardus -= 1 * count, db.data.users[m.sender].money += 50 * count, await conn.reply(m.chat, `Succes menjual ${count} kardus, dan anda mendapatkan ${50 * count} money`, m)) : await conn.reply(m.chat, "Kardus anda tidak cukup", m);
            break;
          case "botol":
            db.data.users[m.sender].botol >= 1 * count ? (db.data.users[m.sender].botol -= 1 * count, db.data.users[m.sender].money += 50 * count, await conn.reply(m.chat, `Succes menjual ${count} botol, dan anda mendapatkan ${50 * count} money`, m)) : await conn.reply(m.chat, "Botol anda tidak cukup", m);
            break;
          case "kayu":
            db.data.users[m.sender].kayu >= 1 * count ? (db.data.users[m.sender].kayu -= 1 * count, db.data.users[m.sender].money += 400 * count, await conn.reply(m.chat, `Succes menjual ${count} kayu, dan anda mendapatkan ${400 * count} money`, m)) : await conn.reply(m.chat, "Kayu anda tidak cukup", m);
            break;
          case "pisang":
            db.data.users[m.sender].pisang >= 1 * count ? (db.data.users[m.sender].pisang -= 1 * count, db.data.users[m.sender].money += 100 * count, await conn.reply(m.chat, `Succes menjual ${count} pisang, dan anda mendapatkan ${100 * count} money`, m)) : await conn.reply(m.chat, "Pisang anda tidak cukup", m);
            break;
          case "anggur":
            db.data.users[m.sender].anggur >= 1 * count ? (db.data.users[m.sender].anggur -= 1 * count, db.data.users[m.sender].money += 150 * count, await conn.reply(m.chat, `Succes menjual ${count} anggur, dan anda mendapatkan ${150 * count} money`, m)) : await conn.reply(m.chat, "Anggur anda tidak cukup", m);
            break;
          case "mangga":
            db.data.users[m.sender].mangga >= 1 * count ? (db.data.users[m.sender].mangga -= 1 * count, db.data.users[m.sender].money += 150 * count, await conn.reply(m.chat, `Succes menjual ${count} mangga, dan anda mendapatkan ${150 * count} money`, m)) : await conn.reply(m.chat, "Mangga anda tidak cukup", m);
            break;
          case "jeruk":
            db.data.users[m.sender].jeruk >= 1 * count ? (db.data.users[m.sender].jeruk -= 1 * count, db.data.users[m.sender].money += 300 * count, await conn.reply(m.chat, `Succes menjual ${count} jeruk, dan anda mendapatkan ${300 * count} money`, m)) : await conn.reply(m.chat, "Jeruk anda tidak cukup", m);
            break;
          case "apel":
            db.data.users[m.sender].apel >= 1 * count ? (db.data.users[m.sender].apel -= 1 * count, db.data.users[m.sender].money += 400 * count, await conn.reply(m.chat, `Succes menjual ${count} apel, dan anda mendapatkan ${400 * count} money`, m)) : await conn.reply(m.chat, "Apel anda tidak cukup", m);
            break;
          case "berlian":
            db.data.users[m.sender].berlian >= 1 * count ? (db.data.users[m.sender].berlian -= 1 * count, db.data.users[m.sender].money += 1e4 * count, await conn.reply(m.chat, `Succes menjual ${count} berlian, dan anda mendapatkan ${1e4 * count} money`, m)) : await conn.reply(m.chat, "Berlian anda tidak cukup", m);
            break;
          case "emas":
            db.data.users[m.sender].emas >= 1 * count ? (db.data.users[m.sender].emas -= 1 * count, db.data.users[m.sender].money += 15e3 * count, await conn.reply(m.chat, `Succes menjual ${count} emas, dan anda mendapatkan ${15e3 * count} money`, m)) : await conn.reply(m.chat, "Emas anda tidak cukup", m);
            break;
          case "pet":
            db.data.users[m.sender].pet >= 1 * count ? (db.data.users[m.sender].pet -= 1 * count, db.data.users[m.sender].money += 1e3 * count, await conn.reply(m.chat, `Succes menjual ${count} pet random, dan anda mendapatkan ${1e3 * count} money`, m)) : await conn.reply(m.chat, "Pet Random anda tidak cukup", m);
            break;
          case "makananpet":
            db.data.users[m.sender].makananpet >= 1 * count ? (db.data.users[m.sender].makananpet -= 1 * count, db.data.users[m.sender].money += 500 * count, await conn.reply(m.chat, `Succes menjual ${count} makanan pet, dan anda mendapatkan ${500 * count} money`, m)) : await conn.reply(m.chat, "Makanan pet anda tidak cukup", m);
            break;
          case "makanannaga":
            db.data.users[m.sender].makanannaga >= 1 * count ? (db.data.users[m.sender].makanannaga -= 1 * count, db.data.users[m.sender].money += 1e4 * count, await conn.reply(m.chat, `Succes menjual ${count} makanan naga, dan anda mendapatkan ${1e4 * count} money`, m)) : await conn.reply(m.chat, "Makanan naga anda tidak cukup", m);
            break;
          case "makananphonix":
            db.data.users[m.sender].makananphonix >= 1 * count ? (db.data.users[m.sender].makananphonix -= 1 * count, db.data.users[m.sender].money += 5e3 * count, await conn.reply(m.chat, `Succes menjual ${count} makanan phonix, dan anda mendapatkan ${5e3 * count} money`, m)) : await conn.reply(m.chat, "Makanan phonix anda tidak cukup", m);
            break;
          case "makanankyubi":
            db.data.users[m.sender].makanankyuni >= 1 * count ? (db.data.users[m.sender].makanankyubi -= 1 * count, db.data.users[m.sender].money += 1e4 * count, await conn.reply(m.chat, `Succes menjual ${count} makanan kyubi, dan anda mendapatkan ${1e4 * count} money`, m)) : await conn.reply(m.chat, "Makanan kyubi anda tidak cukup", m);
            break;
          case "makanangriffin":
            db.data.users[m.sender].makanangriffin >= 1 * count ? (db.data.users[m.sender].makanangriffin -= 1 * count, db.data.users[m.sender].money += 5e3 * count, await conn.reply(m.chat, `Succes menjual ${count} makanan griffin, dan anda mendapatkan ${5e3 * count} money`, m)) : await conn.reply(m.chat, "Makanan griffin anda tidak cukup", m);
            break;
          case "makanancentaur":
            db.data.users[m.sender].makanancentaur >= 1 * count ? (db.data.users[m.sender].makanancentaur -= 1 * count, db.data.users[m.sender].money += 1e4 * count, await conn.reply(m.chat, `Succes menjual ${count} makanan centaur, dan anda mendapatkan ${1e4 * count} money`, m)) : await conn.reply(m.chat, "Makanan centaur anda tidak cukup", m);
            break;
          case "aqua":
            db.data.users[m.sender].aqua >= 1 * count ? (db.data.users[m.sender].aqua -= 1 * count, db.data.users[m.sender].money += 1e3 * count, await conn.reply(m.chat, `Succes menjual ${count} aqua, dan anda mendapatkan ${1e3 * count} money`, m)) : await conn.reply(m.chat, "Aqua anda tidak cukup", m);
            break;
          case "pancingan":
            db.data.users[m.sender].pancingan >= 1 * count ? (db.data.users[m.sender].pancingan -= 1 * count, db.data.users[m.sender].money += 5e5 * count, await conn.reply(m.chat, `Succes menjual ${count} pancingan, dan anda mendapatkan ${5e5 * count} money`, m)) : await conn.reply(m.chat, "Pancingan anda tidak cukup", m);
            break;
          case "iron":
            db.data.users[m.sender].iron >= 1 * count ? (db.data.users[m.sender].iron -= 1 * count, db.data.users[m.sender].money += 5e3 * count, await conn.reply(m.chat, `Succes menjual ${count} pancingan, dan anda mendapatkan ${5e3 * count} money`, m)) : await conn.reply(m.chat, "Iron anda tidak cukup", m);
            break;
          case "string":
            db.data.users[m.sender].string >= 1 * count ? (db.data.users[m.sender].string -= 1 * count, db.data.users[m.sender].money += 5e3 * count, await conn.reply(m.chat, `Succes menjual ${count} string, dan anda mendapatkan ${5e3 * count} money`, m)) : await conn.reply(m.chat, "String anda tidak cukup", m);
            break;
          case "sword":
            db.data.users[m.sender].sword >= 1 * count ? (db.data.users[m.sender].sword -= 1 * count, db.data.users[m.sender].money += 15e3 * count, await conn.reply(m.chat, `Succes menjual ${count} sword, dan anda mendapatkan ${15e3 * count} money`, m)) : await conn.reply(m.chat, "Sword anda tidak cukup", m);
            break;
          case "batu":
            db.data.users[m.sender].batu >= 1 * count ? (db.data.users[m.sender].batu -= 1 * count, db.data.users[m.sender].money += 100 * count, await conn.reply(m.chat, `Succes menjual ${count} batu, dan anda mendapatkan ${100 * count} money`, m)) : await conn.reply(m.chat, "Batu anda tidak cukup", m);
            break;
          case "limit":
            db.data.users[m.sender].limit >= 1 * count ? (db.data.users[m.sender].limit -= 1 * count, db.data.users[m.sender].money += 2e4 * count, await conn.reply(m.chat, `Succes menjual ${count} limit, dan anda mendapatkan ${2e4 * count} money`, m)) : await conn.reply(m.chat, "Limit anda tidak cukup", m);
            break;
          case "diamond":
            db.data.users[m.sender].diamond >= 1 * count ? (db.data.users[m.sender].diamond -= 1 * count, db.data.users[m.sender].money += 1e3 * count, await conn.reply(m.chat, `Succes menjual ${count} Diamond, dan anda mendapatkan ${1e3 * count} money`, m)) : await conn.reply(m.chat, "Diamond anda tidak cukup", m);
            break;
          default:
            return await conn.reply(m.chat, Kchat, m);
        }
      }
    } catch (e) {
      await conn.reply(m.chat, Kchat, m), console.log(e);
    }
  };
handler.help = ["shop <sell|buy> <args>"], handler.tags = ["rpg"], handler.command = /^(shop)$/i,
  handler.limit = !0, handler.group = !0;
export default handler;