import fetch from "node-fetch";
let wibu = flaaa.getRandom();
const potion = 500,
  Sgold = 3e3,
  Bgold = 6e3,
  Bstring = 500,
  Sstring = 200,
  Bbatu = 500,
  Sbatu = 200,
  Bkayu = 500,
  Skayu = 200,
  Sarloji = 9e6,
  Biron = 800,
  Siron = 700,
  Spotion = 150,
  Bdiamond = 900,
  Sdiamond = 750,
  Bcommon = 200,
  Scommon = 20,
  Suncommon = 100,
  Buncommon = 600,
  Bmythic = 2500,
  Smythic = 900,
  Blegendary = 7500,
  Slegendary = 3e3,
  Bsampah = 10,
  Ssampah = 2,
  Bjagung = 20,
  Bjeruk = 20,
  Bapel = 20,
  Bmangga = 20,
  Banggur = 20,
  Sjagung = 100,
  Sjeruk = 100,
  Sapel = 100,
  Smangga = 100,
  Sanggur = 100,
  Baqua = 50,
  Bumpan = 150,
  Bkucing = 5,
  Banjing = 5,
  Bkuda = 7,
  Bfox = 10,
  Bserigala = 10,
  Bphonix = 20,
  Bcentaur = 35,
  Bgriffin = 35,
  Bnaga = 1e3,
  Bfood = 500,
  Bpet = 1500,
  Spet = 750,
  handler = async (m, {
    conn,
    command,
    args,
    usedPrefix,
    DevMode
  }) => {
    let thumb = await (await fetch(wibu + "Shop")).arrayBuffer();
    const _armor = db.data.users[m.sender].armor,
      armor = 0 === _armor ? 2e4 : 1 === _armor ? 49999 : 2 === _armor ? 99999 : 3 === _armor ? 149999 : 4 === _armor ? 299999 : "",
      uparmor = 0 === _armor ? "Kamu belum mempunyai Armor" : 1 === _armor ? 135 : 2 === _armor ? 175 : 3 === _armor ? 250 : 4 === _armor ? 320 : "",
      _pancing = db.data.users[m.sender].pancing,
      pancing = 0 === _pancing ? 1700 : 1 === _pancing ? 3e3 : 2 === _pancing ? 5500 : 3 === _pancing ? 10500 : "",
      uppancing = 0 === _pancing ? 0 : 1 === _pancing ? 25 : 2 === _pancing ? 55 : 3 === _pancing ? 75 : "",
      durfishingrod = 0 === _pancing ? 0 : 1 === _pancing ? 50 : 2 === _pancing ? 70 : 3 === _pancing ? 100 : "",
      refishingrod = 0 === _pancing ? 0 : 1 === _pancing ? 10 : 2 === _pancing ? 35 : 3 === _pancing ? 65 : "",
      drefishingrod = 0 === _pancing ? 0 : 1 === _pancing ? 10 : 2 === _pancing ? 25 : 3 === _pancing ? 40 : "",
      _pickaxe = db.data.users[m.sender].pickaxe,
      uppickaxe = 0 === _pickaxe ? 0 : 1 === _pickaxe ? 25 : 2 === _pickaxe ? 55 : 3 === _pickaxe ? 75 : 4 === _pickaxe ? 120 : "",
      durpickaxe = 0 === _pickaxe ? 0 : 1 === _pickaxe ? 40 : 2 === _pickaxe ? 60 : 3 === _pickaxe ? 80 : 4 === _pickaxe ? 100 : "",
      repickaxe = 0 === _pickaxe ? 0 : 1 === _pickaxe ? 10 : 2 === _pickaxe ? 35 : 3 === _pickaxe ? 65 : 4 === _pickaxe ? 100 : "",
      drepickaxe = 0 === _pickaxe ? 0 : 1 === _pickaxe ? 10 : 2 === _pickaxe ? 25 : 3 === _pickaxe ? 40 : 4 === _pickaxe ? 60 : "",
      _sword = db.data.users[m.sender].sword,
      upsword = 0 === _sword ? 0 : 1 === _sword ? 15 : 2 === _sword ? 40 : 3 === _sword ? 65 : 4 === _sword ? 100 : "",
      dursword = 0 === _sword ? 0 : 1 === _sword ? 40 : 2 === _sword ? 60 : 3 === _sword ? 80 : 4 === _sword ? 100 : "",
      resword = 0 === _sword ? 0 : 1 === _sword ? 10 : 2 === _sword ? 35 : 3 === _sword ? 65 : 4 === _sword ? 100 : "",
      dresword = 0 === _sword ? 0 : 1 === _sword ? 10 : 2 === _sword ? 25 : 3 === _sword ? 40 : 4 === _sword ? 60 : "";
    (args[0] || "").toLowerCase();
    let type = (args[0] || "").toLowerCase(),
      _type = (args[1] || "").toLowerCase(),
      jualbeli = (args[0] || "").toLowerCase();
    const Kchat = `\n*🎒 S H O P*\n*🧪 Penggunaan :*\n_${usedPrefix}toko <Buy|sell> <item> <jumlah>_\nContoh penggunaan: _*${usedPrefix}toko buy potion 1*_\n*📮 Note :* \nbila sudah tidak ada harganya, berarti sudah tidak bisa dibeli / sudah level max\n🛍️ List Barang:\n⛊━━━┄┄┄┄┄┄┄┄┄━━━⛊\n*♻ Barang   | 💲 Harga beli*\n⛊━━━┄┄┄┄┄┄┄┄┄━━━⛊\n*🥤 Potion:* 500\n*🍶 Aqua:* 50\n*🪙  Gold :* 6000\n*💎 Diamond:* 900\n*🪨 Batu:* 500\n*🪵 Kayu:* 500\n*🕸️ String:* 500\n*⛓️ Iron:* 800\n*🗑️ Sampah:* 10\n*📦 Common:* 200 \n*🛍️ Uncommon:* 600\n*🎁 Mythic:* 2500\n*🧰 Legendary:* 7500\n*📫 Pet:* 1500\n*🥼 Armor:* ${armor}\n*🎣 Fishingrod:* ${pancing}\n*🪱 Umpan:* 150\n*🌾 Bibit mangga:* 20\n*🌾 Bibit apel:* 20\n*🌾 Bibit jeruk:* 20\n*🌾 Bibit pisang:* 20\n*🌾 Bibit anggur:* 20\n⛊━━━┄┄┄┄┄┄┄┄┄━━━⛊\n*♻ Barang   | 💲 Harga Jual*\n⛊━━━┄┄┄┄┄┄┄┄┄━━━⛊\n*🥤 Potion:* 150\n*🪙 Gold:* 3000\n*🧭 Arloji:* 9000000\n*🪨 Batu:* 200\n*🪵 Kayu:* 200\n*🕸️ String:* 200\n*⛓️ Iron:* 700\n*💎 Diamond:* 750\n*🗑️ Sampah:* 2\n*📦 Common:* 20\n*🛍️ Uncommon:* 100\n*🎁 Mythic:* 900\n*🧰 Legendary:* 3000\n*📫 Pet:* 750\n*🥭 Mangga:* 100\n*🍎 Apel:* 100\n*🍊 Jeruk:* 100\n*🍌 Pisang:* 100\n*🍇 Anggur:* 100\n⛊━━━┄┄┄┄┄┄┄┄┄━━━⛊\n*🦊 Pet.      | 💲 Harga Beli*\n⛊━━━┄┄┄┄┄┄┄┄┄━━━⛊\n*🐱 Kucing:* 5 🪙\n*🐶 Anjing:* 5 🪙\n*🦊 Fox:* 10 🪙 \n*🐴 Kuda:* 7 🪙 \n*🐺 Serigala:* 10 🪙\n*🦜 Phonix:* 20 🪙\n*🐎 Centaur:* 35 🪙\n*🦅 Griffin:* 35 🪙\n*🐉 Naga:* 1000 🪙\n*🥩 Foodpet:* 500 💲\n⛊━━━┄┄┄┄┄┄┄┄┄━━━⛊\n*🔨 Upgrade & Repair | 💲 Harga*\n⛊━━━┄┄┄┄┄┄┄┄┄━━━⛊\n*◪ Upgrade ⏫*\n*🥼 Armor:* ${uparmor} 💎 ${0 === _armor ? "(Belum memiliki)" : 5 === _armor ? "( *Level max* )" : ""}\n*🎣 Fishingrod:* ${uppancing} 💎\n╰▸ *Durability:* ${durfishingrod} ${0 === _pancing ? "(Belum memiliki)" : 5 === _pancing ? "( *Level max* )" : ""}\n*⛏️ Pickaxe:* ${uppickaxe} 💎\n╰▸ *Durability:* ${durpickaxe} ${0 === _pickaxe ? "(Belum memiliki)" : 5 === _pickaxe ? "( *Level max* )" : ""}\n*🗡️ Sword:* ${upsword} 💎\n╰▸ *Durability:* ${dursword} ${0 === _sword ? "(Belum memiliki)" : 5 === _sword ? "( *Level max* )" : ""}\n⛊━━━┄┄┄┄┄┄┄┄┄━━━⛊\n*◪ Repair 🔨*\n*🎣 Fishingrod:* ${refishingrod} 💎 ${0 === _pancing ? "(Belum memiliki)" : 5 === _pancing ? "( *Level max* )" : ""}\n + ${drefishingrod} Durability \n*⛏️ Pickaxe:* ${repickaxe} 💎 ${0 === _pickaxe ? "(Belum memiliki)" : 5 === _pickaxe ? "( *Level max* )" : ""}\n + ${drepickaxe} Durability\n*🗡️ Sword:* ${resword} 💎 ${0 === _sword ? "(Belum memiliki)" : 5 === _sword ? "( *Level max* )" : ""}\n + ${dresword} Durability\n⛊━━━┄┄┄┄┄┄┄┄┄━━━⛊\n`.trim();
    try {
      if (/toko|buy/i.test(command)) {
        const count = args[2] && args[2].length > 0 ? Math.min(1e23, Math.max(parseInt(args[2]), 1)) : !args[2] || args.length < 4 ? 1 : Math.min(1, count);
        db.data.users[m.sender].sampah;
        switch (jualbeli) {
          case "buy":
            switch (_type) {
              case "kucing":
                if (1 === db.data.users[m.sender].kucing) return await conn.reply(m.chat, "Kamu sudah memiliki pet ini", m);
                db.data.users[m.sender].emas >= 5 * count ? (db.data.users[m.sender].kucing += 1 * count, db.data.users[m.sender].emas -= 5 * count, await conn.reply(m.chat, `✔️ Sukses Membeli Pet Kucing 🐱 Dengan Harga ${5 * count} Gold 🪙`, m)) : await conn.reply(m.chat, "Gold Anda Tidak Cukup", m);
                break;
              case "anjing":
                if (1 === db.data.users[m.sender].anjing) return await conn.reply(m.chat, "Kamu sudah memiliki pet ini", m);
                db.data.users[m.sender].emas >= 5 * count ? (db.data.users[m.sender].anjing += 1 * count, db.data.users[m.sender].emas -= 5 * count, await conn.reply(m.chat, `✔️ Sukses Membeli Pet Anjing 🐶 Dengan Harga ${5 * count} Gold 🪙`, m)) : await conn.reply(m.chat, "Gold Anda Tidak Cukup", m);
                break;
              case "kuda":
                if (1 === db.data.users[m.sender].kuda) return await conn.reply(m.chat, "Kamu sudah memiliki pet ini", m);
                db.data.users[m.sender].emas >= 7 * count ? (db.data.users[m.sender].kuda += 1 * count, db.data.users[m.sender].emas -= 7 * count, await conn.reply(m.chat, `✔️ Sukses Membeli Pet Kuda 🐴 Dengan Harga ${7 * count} Gold 🪙`, m)) : await conn.reply(m.chat, "Gold Anda Tidak Cukup", m);
                break;
              case "fox":
                if (1 === db.data.users[m.sender].rubah) return await conn.reply(m.chat, "Kamu sudah memiliki pet ini", m);
                db.data.users[m.sender].emas >= 10 * count ? (db.data.users[m.sender].rubah += 1 * count, db.data.users[m.sender].emas -= 10 * count, await conn.reply(m.chat, `✔️ Sukses Membeli Pet Rubah 🦊 Dengan Harga ${10 * count} Gold 🪙`, m)) : await conn.reply(m.chat, "Gold Anda Tidak Cukup", m);
                break;
              case "serigala":
                if (1 === db.data.users[m.sender].serigala) return await conn.reply(m.chat, "Kamu sudah memiliki pet ini", m);
                db.data.users[m.sender].emas >= 10 * count ? (db.data.users[m.sender].serigala += 1 * count, db.data.users[m.sender].emas -= 10 * count, await conn.reply(m.chat, `✔️ Sukses Membeli Pet Serigala 🐺 Dengan Harga ${10 * count} Gold 🪙`, m)) : await conn.reply(m.chat, "Gold Anda Tidak Cukup", m);
                break;
              case "phonix":
                if (1 === db.data.users[m.sender].phonix) return await conn.reply(m.chat, "Kamu sudah memiliki pet ini", m);
                db.data.users[m.sender].emas >= 20 * count ? (db.data.users[m.sender].phonix += 1 * count, db.data.users[m.sender].emas -= 20 * count, await conn.reply(m.chat, `✔️ Sukses Membeli Pet Phonix 🦜 Dengan Harga ${20 * count} Gold 🪙`, m)) : await conn.reply(m.chat, "Gold Anda Tidak Cukup", m);
                break;
              case "centaur":
                if (1 === db.data.users[m.sender].centaur) return await conn.reply(m.chat, "Kamu sudah memiliki pet ini", m);
                db.data.users[m.sender].emas >= 35 * count ? (db.data.users[m.sender].centaur += 1 * count, db.data.users[m.sender].emas -= 35 * count, await conn.reply(m.chat, `✔️ Sukses Membeli Pet Centaur 🐎 Dengan Harga ${35 * count} Gold 🪙`, m)) : await conn.reply(m.chat, "Gold Anda Tidak Cukup", m);
                break;
              case "griffin":
                if (1 === db.data.users[m.sender].griffin) return await conn.reply(m.chat, "Kamu sudah memiliki pet ini", m);
                db.data.users[m.sender].emas >= 35 * count ? (db.data.users[m.sender].griffin += 1 * count, db.data.users[m.sender].emas -= 35 * count, await conn.reply(m.chat, `✔️ Sukses Membeli Pet Griffin 🦅 Dengan Harga ${35 * count} Gold 🪙`, m)) : await conn.reply(m.chat, "Gold Anda Tidak Cukup", m);
                break;
              case "naga":
                if (1 === db.data.users[m.sender].naga) return await conn.reply(m.chat, "Kamu sudah memiliki pet ini", m);
                db.data.users[m.sender].emas >= 1e3 * count ? (db.data.users[m.sender].naga += 1 * count, db.data.users[m.sender].emas -= 1e3 * count, await conn.reply(m.chat, `✔️ Sukses Membeli Pet Naga 🐉 Dengan Harga ${1e3 * count} Gold 🪙`, m)) : await conn.reply(m.chat, "Gold Anda Tidak Cukup", m);
                break;
              case "foodpet":
                db.data.users[m.sender].money >= 500 * count ? (db.data.users[m.sender].makananpet += 1 * count, db.data.users[m.sender].money -= 500 * count, await conn.reply(m.chat, `✔️ Sukses Membeli FoodPet 🥩 Dengan Harga ${500 * count} Money 💹`, m)) : await conn.reply(m.chat, "Uang Anda Tidak Cukup", m);
                break;
              case "potion":
                db.data.users[m.sender].money >= 500 * count ? (db.data.users[m.sender].money -= 500 * count, db.data.users[m.sender].potion += 1 * count, await conn.reply(m.chat, `✔️ Sukses Membeli ${count} Potion 🥤 Dengan Harga ${500 * count} money 💹\n\n📍 Gunakan Potion Dengan Ketik: *${usedPrefix}use potion <jumlah>*`, m)) : await conn.reply(m.chat, `Uang Anda Tidak Cukup Untuk Membeli ${count} Potion Dengan Harga ${500 * count} Money `);
                break;
              case "gold":
                db.data.users[m.sender].money >= 6e3 * count ? (db.data.users[m.sender].money -= 6e3 * count, db.data.users[m.sender].emas += 1 * count, await conn.reply(m.chat, `Sukses Membeli ${count} Gold 🪙 Dengan Harga ${6e3 * count} money`, m)) : await conn.reply(m.chat, `Uang Anda Tidak Cukup Untuk Membeli ${count} Gold Dengan Harga ${6e3 * count} Money `);
                break;
              case "bibitmangga":
                db.data.users[m.sender].money >= 20 * count ? (db.data.users[m.sender].money -= 20 * count, db.data.users[m.sender].bibitmangga += 1 * count, await conn.reply(m.chat, `✔️ Sukses Membeli ${count} Bibit Mangga 🌾\nDengan Harga ${20 * count} money 💹`, m)) : await conn.reply(m.chat, `Uang Anda Tidak Cukup Untuk Membeli ${count} Bibit Mangga 🌾\nDengan Harga ${20 * count} Money 💹`);
                break;
              case "bibitapel":
                db.data.users[m.sender].money >= 20 * count ? (db.data.users[m.sender].money -= 20 * count, db.data.users[m.sender].bibitapel += 1 * count, await conn.reply(m.chat, `✔️ Sukses Membeli ${count} Bibit Apel🌾\nDengan Harga ${20 * count} money 💹`, m)) : await conn.reply(m.chat, `Uang Anda Tidak Cukup Untuk Membeli ${count} Bibit Apel 🌾\nDengan Harga ${20 * count} Money 💹`);
                break;
              case "bibitjeruk":
                db.data.users[m.sender].money >= 20 * count ? (db.data.users[m.sender].money -= 20 * count, db.data.users[m.sender].bibitjeruk += 1 * count, await conn.reply(m.chat, `✔️ Sukses Membeli ${count} Bibit Jeruk🌾\nDengan Harga ${20 * count} money 💹`, m)) : await conn.reply(m.chat, `Uang Anda Tidak Cukup Untuk Membeli ${count} Bibit Jeruk 🌾\nDengan Harga ${20 * count} Money 💹`);
                break;
              case "bibitpisang":
                db.data.users[m.sender].money >= 20 * count ? (db.data.users[m.sender].money -= 20 * count, db.data.users[m.sender].bibitpisang += 1 * count, await conn.reply(m.chat, `✔️ Sukses Membeli ${count} Bibit Pisang🌾\nDengan Harga ${20 * count} money 💹`, m)) : await conn.reply(m.chat, `Uang Anda Tidak Cukup Untuk Membeli ${count} Bibit Pisang 🌾\nDengan Harga ${20 * count} Money 💹`);
                break;
              case "bibitanggur":
                db.data.users[m.sender].money >= 20 * count ? (db.data.users[m.sender].money -= 20 * count, db.data.users[m.sender].bibitanggur += 1 * count, await conn.reply(m.chat, `✔️ Sukses Membeli ${count} Bibit Anggur🌾\nDengan Harga ${20 * count} money 💹`, m)) : await conn.reply(m.chat, `Uang Anda Tidak Cukup Untuk Membeli ${count} Bibit Anggur 🌾\nDengan Harga ${20 * count} Money 💹`);
                break;
              case "diamond":
                db.data.users[m.sender].money >= 900 * count ? (db.data.users[m.sender].diamond += 1 * count, db.data.users[m.sender].money -= 900 * count, await conn.reply(m.chat, `✔️ Sukses Membeli ${count} Diamond 💎 Dengan Harga ${900 * count} Money 💹`, m)) : await conn.reply(m.chat, "Uang Anda Tidak Cukup", m);
                break;
              case "batu":
                db.data.users[m.sender].money >= 500 * count ? (db.data.users[m.sender].batu += 1 * count, db.data.users[m.sender].money -= 500 * count, await conn.reply(m.chat, `✔️ Sukses Membeli ${count} Batu 🪨 Dengan Harga ${500 * count} Money 💹`, m)) : await conn.reply(m.chat, "Uang Anda Tidak Cukup", m);
                break;
              case "umpan":
                db.data.users[m.sender].money >= 150 * count ? (db.data.users[m.sender].umpan += 1 * count, db.data.users[m.sender].money -= 150 * count, await conn.reply(m.chat, `✔️ Sukses Membeli ${count} Umpan 🪱 Dengan Harga ${150 * count} Money 💹`, m)) : await conn.reply(m.chat, "Uang Anda Tidak Cukup", m);
                break;
              case "kayu":
                db.data.users[m.sender].money >= 500 * count ? (db.data.users[m.sender].kayu += 1 * count, db.data.users[m.sender].money -= 500 * count, await conn.reply(m.chat, `✔️ Sukses Membeli ${count} Kayu 🪵 Dengan Harga ${500 * count} Money 💹`, m)) : await conn.reply(m.chat, "Uang Anda Tidak Cukup", m);
                break;
              case "aqua":
                db.data.users[m.sender].money >= 50 * count ? (db.data.users[m.sender].aqua += 1 * count, db.data.users[m.sender].money -= 500 * count, await conn.reply(m.chat, `✔️ Sukses Membeli ${count} Aqua 🍶 Dengan Harga ${50 * count} Money 💹`, m)) : await conn.reply(m.chat, "Uang Anda Tidak Cukup", m);
                break;
              case "string":
                db.data.users[m.sender].money >= 500 * count ? (db.data.users[m.sender].string += 1 * count, db.data.users[m.sender].money -= 500 * count, await conn.reply(m.chat, `✔️ Sukses Membeli ${count} String 🕸️ Dengan Harga ${500 * count} Money 💹`, m)) : await conn.reply(m.chat, "Uang Anda Tidak Cukup", m);
                break;
              case "iron":
                db.data.users[m.sender].money >= 800 * count ? (db.data.users[m.sender].iron += 1 * count, db.data.users[m.sender].money -= 800 * count, await conn.reply(m.chat, `✔️ Sukses Membeli ${count} Iron ⛓️ Dengan Harga ${800 * count} Money 💹`, m)) : await conn.reply(m.chat, "Uang Anda Tidak Cukup", m);
                break;
              case "common":
                db.data.users[m.sender].money >= 200 * count ? (db.data.users[m.sender].common += 1 * count, db.data.users[m.sender].money -= 200 * count, await conn.reply(m.chat, `✔️ Sukses Membeli ${count} Common Crate 📦 Dengan Harga ${200 * count} Money 💹`, m)) : await conn.reply(m.chat, `Uang Anda Tidak Cukup Untuk Membeli ${count} Common Crate 📦 Dengan Harga ${200 * count} Money 💹 \n\n📍 Buka Crate Dengan Ketik: *${usedPrefix}open common*`, m);
                break;
              case "uncommon":
                db.data.users[m.sender].money >= 600 * count ? (db.data.users[m.sender].uncommon += 1 * count, db.data.users[m.sender].money -= 600 * count, await conn.reply(m.chat, `✔️ Sukses Membeli ${count} Uncommon Crate Dengan Harga ${600 * count} Money 💹`, m)) : await conn.reply(m.chat, `Uang Anda Tidak Cukup Untuk Membeli ${count} Uncommon Crate 🛍️ Dengan Harga ${600 * count} Money 💹\n\n📍 Buka Crate Dengan Ketik: *${usedPrefix}open uncommon*`, m);
                break;
              case "mythic":
                db.data.users[m.sender].money >= 2500 * count ? (db.data.users[m.sender].mythic += 1 * count, db.data.users[m.sender].money -= 2500 * count, await conn.reply(m.chat, `✔️ Sukses Membeli ${count} Mythic Crate 🎁 Dengan Harga ${2500 * count} Money 💹`, m)) : await conn.reply(m.chat, `Uang Anda Tidak Cukup Untuk Membeli ${count} Mythic Crate 🎁 Dengan Harga ${2500 * count} Money\n\n📍 Buka Crate Dengan Ketik:*${usedPrefix}open mythic*`, m);
                break;
              case "legendary":
                db.data.users[m.sender].money >= 7500 * count ? (db.data.users[m.sender].legendary += 1 * count, db.data.users[m.sender].money -= 7500 * count, await conn.reply(m.chat, `✔️ Sukses Membeli ${count} Legendary Crate 🧰 Dengan Harga ${7500 * count} Money 💹`, m)) : await conn.reply(m.chat, `Uang Anda Tidak Cukup Untuk Membeli ${count} Legendary Crate 🧰 Dengan Harga ${7500 * count} Money  💹\n\n📍 Buka Crate Dengan Ketik: *${usedPrefix}open legendary*`, m);
                break;
              case "pet":
                db.data.users[m.sender].money >= 1500 * count ? (db.data.users[m.sender].pet += 1 * count, db.data.users[m.sender].money -= 1500 * count, await conn.reply(m.chat, `✔️ Sukses Membeli ${count} Pet Crate 📫 Dengan Harga ${1500 * count} Money 💹`, m)) : await conn.reply(m.chat, `Uang Anda Tidak Cukup Untuk Membeli ${count} Pet Crate 📫 Dengan Harga ${1500 * count} Money  💹\n\n📍 Buka Crate Dengan Ketik: *${usedPrefix}open legendary*`, m);
                break;
              case "sampah":
                db.data.users[m.sender].money >= 10 * count ? (db.data.users[m.sender].sampah += 1 * count, db.data.users[m.sender].money -= 10 * count, await conn.reply(m.chat, `✔️ Sukses Membeli ${count} Sampah 🗑️ Dengan Harga ${10 * count} Money 💹 `, m)) : await conn.reply(m.chat, `Uang Anda Tidak Cukup Untuk Membeli ${count} Sampah 🗑️ Dengan Harga ${10 * count} Money 💹`.trim(), m);
                break;
              case "armor":
                if (1 === db.data.users[m.sender].armor) return await conn.reply(m.chat, "Kamu sudah memiliki Armor", m);
                db.data.users[m.sender].money > armor ? (db.data.users[m.sender].armor += 1, db.data.users[m.sender].money -= 1 * armor, await conn.reply(m.chat, `✔️ Sukses Membeli Armor 🥼 Seharga ${armor} Money`, m)) : await conn.reply(m.chat, `Uang Mu Tidak Cukup Untuk Membeli Armor 🥼 Seharga ${armor} Money 💹`, m);
                break;
              case "fishingrod":
                if (1 === db.data.users[m.sender].pancing) return await conn.reply(m.chat, "Kamu sudah memiliki pancingan", m);
                db.data.users[m.sender].money > armor ? (db.data.users[m.sender].pancing += 1, db.data.users[m.sender].money -= 1 * armor, db.data.users[m.sender].fishingroddurability = durfishingrod, await conn.reply(m.chat, `✔️ Sukses Membeli Pancingan 🎣 Seharga ${pancing} Money`, m)) : await conn.reply(m.chat, `Uang Mu Tidak Cukup Untuk Membeli Pancingan 🎣 Seharga ${pancing} Money 💹`, m);
                break;
              default:
                return await conn.reply(m.chat, Kchat, m, {
                  contextInfo: {
                    externalAdReply: {
                      showAdAttribution: !0,
                      mediaUrl: sig,
                      mediaType: "VIDEO",
                      description: ucapan,
                      title: wm,
                      body: bottime,
                      thumbnail: thumb,
                      sourceUrl: sgc
                    }
                  }
                });
            }
            break;
          case "sell":
            switch (_type) {
              case "potion":
                db.data.users[m.sender].potion >= 1 * count ? (db.data.users[m.sender].money += 150 * count, db.data.users[m.sender].potion -= 1 * count, await conn.reply(m.chat, `✔️ Sukses Menjual ${count} Potion 🥤 Dengan Harga ${150 * count} Money 💹 `.trim(), m)) : await conn.reply(m.chat, "🥤 Potion Kamu Tidak Cukup".trim(), m);
                break;
              case "gold":
                db.data.users[m.sender].gold >= 1 * count ? (db.data.users[m.sender].money += 3e3 * count, db.data.users[m.sender].gold -= 1 * count, await conn.reply(m.chat, `✔️ Sukses Menjual ${count} Gold 🪙 Dengan Harga ${3e3 * count} Money 💹`.trim(), m)) : await conn.reply(m.chat, "Gold Kamu Tidak Cukup".trim(), m);
                break;
              case "arloji":
                db.data.users[m.sender].arlok >= 1 * count ? (db.data.users[m.sender].money += 9e6 * count, db.data.users[m.sender].arlok -= 1 * count, await conn.reply(m.chat, `✔️ Sukses Menjual ${count} Arloji 🧭 Dengan Harga ${9e6 * count} Money 💹`.trim(), m)) : await conn.reply(m.chat, "🧭 Arloji Kamu Tidak Cukup".trim(), m);
                break;
              case "batu":
                db.data.users[m.sender].batu >= 1 * count ? (db.data.users[m.sender].money += 200 * count, db.data.users[m.sender].batu -= 1 * count, await conn.reply(m.chat, `✔️ Sukses Menjual ${count} Batu 🪨 Dengan Harga ${200 * count} Money 💹`.trim(), m)) : await conn.reply(m.chat, "🪨 Batu Kamu Tidak Cukup".trim(), m);
                break;
              case "kayu":
                db.data.users[m.sender].kayu >= 1 * count ? (db.data.users[m.sender].money += 200 * count, db.data.users[m.sender].kayu -= 1 * count, await conn.reply(m.chat, `✔️ Sukses Menjual ${count} Kayu 🪵 Dengan Harga ${200 * count} Money 💹`.trim(), m)) : await conn.reply(m.chat, "🪵 Kayu Kamu Tidak Cukup".trim(), m);
                break;
              case "string":
                db.data.users[m.sender].string >= 1 * count ? (db.data.users[m.sender].money += 200 * count, db.data.users[m.sender].string -= 1 * count, await conn.reply(m.chat, `✔️ Sukses Menjual ${count} String 🕸️ Dengan Harga ${200 * count} Money 💹`.trim(), m)) : await conn.reply(m.chat, "🕸️ String Kamu Tidak Cukup".trim(), m);
                break;
              case "iron":
                db.data.users[m.sender].iron >= 1 * count ? (db.data.users[m.sender].money += 700 * count, db.data.users[m.sender].iron -= 1 * count, await conn.reply(m.chat, `✔️ Sukses Menjual ${count} Iron ⛓️ Dengan Harga ${700 * count} Money 💹`.trim(), m)) : await conn.reply(m.chat, "⛓️ Iron Kamu Tidak Cukup".trim(), m);
                break;
              case "common":
                db.data.users[m.sender].common >= 1 * count ? (db.data.users[m.sender].money += 20 * count, db.data.users[m.sender].common -= 1 * count, await conn.reply(m.chat, `✔️ Sukses Menjual ${count} Common Crate 📦 Dengan Harga ${20 * count} Money 💹`.trim(), m)) : await conn.reply(m.chat, "📦 Common Crate Kamu Tidak Cukup".trim(), m);
                break;
              case "uncommon":
                db.data.users[m.sender].uncommon >= 1 * count ? (db.data.users[m.sender].money += 100 * count, db.data.users[m.sender].uncommon -= 1 * count, await conn.reply(m.chat, `✔️ Sukses Menjual ${count} Uncommon Crate 🛍️ Dengan Harga ${100 * count} Money 💹`.trim(), m)) : await conn.reply(m.chat, "🛍️ Uncommon Crate Kamu Tidak Cukup".trim(), m);
                break;
              case "mythic":
                db.data.users[m.sender].mythic >= 1 * count ? (db.data.users[m.sender].money += 900 * count, db.data.users[m.sender].mythic -= 1 * count, await conn.reply(m.chat, `✔️ Sukses Menjual ${count} Mythic Crate 🎁 Dengan Harga ${900 * count} Money 💹`.trim(), m)) : await conn.reply(m.chat, "🎁 Mythic Crate Kamu Tidak Cukup ".trim(), m);
                break;
              case "legendary":
                db.data.users[m.sender].legendary >= 1 * count ? (db.data.users[m.sender].money += 3e3 * count, db.data.users[m.sender].legendary -= 1 * count, await conn.reply(m.chat, `✔️ Sukses Menjual ${count} Legendary Crate 🧰 Dengan Harga ${3e3 * count} Money 💹`.trim(), m)) : await conn.reply(m.chat, "🧰 Legendary Crate Kamu Tidak Cukup ".trim(), m);
                break;
              case "pet":
                db.data.users[m.sender].pet >= 1 * count ? (db.data.users[m.sender].money += 750 * count, db.data.users[m.sender].pet -= 1 * count, await conn.reply(m.chat, `✔️ Sukses Menjual ${count} Pet Crate 📫 Dengan Harga ${750 * count} Money 💹`.trim(), m)) : await conn.reply(m.chat, "📫 Pet Crate Kamu Tidak Cukup ".trim(), m);
                break;
              case "sampah":
                db.data.users[m.sender].sampah >= 1 * count ? (db.data.users[m.sender].sampah -= 1 * count, db.data.users[m.sender].money += 2 * count, await conn.reply(m.chat, `✔️ Sukses Menjual ${count} Sampah 🗑️ Dengan Harga ${2 * count} Money 💹`, m)) : await conn.reply(m.chat, "🗑️ Sampah Anda Tidak Cukup ", m);
                break;
              case "diamond":
                db.data.users[m.sender].diamond >= 1 * count ? (db.data.users[m.sender].diamond -= 1 * count, db.data.users[m.sender].money += 750 * count, await conn.reply(m.chat, `✔️ Sukses Menjual ${count} Diamond 💎 Dengan Harga ${750 * count} Money 💹`, m)) : await conn.reply(m.chat, "💎 Diamond Anda Tidak Cukup ", m);
                break;
              case "mangga":
                db.data.users[m.sender].mangga >= 1 * count ? (db.data.users[m.sender].mangga -= 1 * count, db.data.users[m.sender].money += 100 * count, await conn.reply(m.chat, `✔️ Sukses Menjual ${count} Mangga 🥭 Dengan Harga ${100 * count} Money 💹`, m)) : await conn.reply(m.chat, "🥭 Mangga Anda Tidak Cukup ", m);
                break;
              case "apel":
                db.data.users[m.sender].apel >= 1 * count ? (db.data.users[m.sender].apel -= 1 * count, db.data.users[m.sender].money += 100 * count, await conn.reply(m.chat, `✔️ Sukses Menjual ${count} Apel 🍎 Dengan Harga ${100 * count} Money 💹`, m)) : await conn.reply(m.chat, "🍎 Apel Anda Tidak Cukup ", m);
                break;
              case "jeruk":
                db.data.users[m.sender].jeruk >= 1 * count ? (db.data.users[m.sender].jeruk -= 1 * count, db.data.users[m.sender].money += 100 * count, await conn.reply(m.chat, `✔️ Sukses Menjual ${count} Jeruk 🍊 Dengan Harga ${100 * count} Money 💹`, m)) : await conn.reply(m.chat, "🍊 Jeruk Anda Tidak Cukup ", m);
                break;
              case "anggur":
                db.data.users[m.sender].anggur >= 1 * count ? (db.data.users[m.sender].anggur -= 1 * count, db.data.users[m.sender].money += 100 * count, await conn.reply(m.chat, `✔️ Sukses Menjual ${count} Anggur 🍇 Dengan Harga ${100 * count} Money 💹`, m)) : await conn.reply(m.chat, "🍇 Anggur Anda Tidak Cukup ", m);
                break;
              case "pisang":
                db.data.users[m.sender].pisang >= 1 * count ? (db.data.users[m.sender].pisang -= 1 * count, db.data.users[m.sender].money += 100 * count, await conn.reply(m.chat, `✔️ Sukses Menjual ${count} Pisang 🍌 Dengan Harga ${100 * count} Money 💹`, m)) : await conn.reply(m.chat, "🍌 Pisang Anda Tidak Cukup ", m);
                break;
              default:
                return await conn.reply(m.chat, Kchat, m, {
                  contextInfo: {
                    externalAdReply: {
                      showAdAttribution: !0,
                      mediaUrl: sig,
                      mediaType: "VIDEO",
                      description: ucapan,
                      title: wm,
                      body: bottime,
                      thumbnail: thumb,
                      sourceUrl: sgc
                    }
                  }
                });
            }
            break;
          case "upgrade":
            switch (_type) {
              case "armor":
                if (5 === db.data.users[m.sender].armor) return await conn.reply(m.chat, "Armormu sudah *Level Max*", m);
                if (0 === db.data.users[m.sender].armor) return await conn.reply(m.chat, "Kamu belum mempunyai Armor", m);
                db.data.users[m.sender].diamond > uparmor ? (db.data.users[m.sender].armor += 1, db.data.users[m.sender].diamond -= 1 * uparmor, await conn.reply(m.chat, `✔️ Sukses Mengupgrade Armor 🥼 Seharga ${uparmor} Diamond 💎`, m)) : await conn.reply(m.chat, `Diamond Mu Tidak Cukup Untuk Mengupgrade Armor 🥼 Seharga ${uparmor} Diamond 💎`, m);
                break;
              case "fishingrod":
                if (4 === db.data.users[m.sender].fishingrod) return await conn.reply(m.chat, "Pancingan mu udah *Level Max*", m);
                if (0 === db.data.users[m.sender].fishingrod) return await conn.reply(m.chat, "Kamu belum mempunyai Pancingan", m);
                db.data.users[m.sender].diamond > uppancing ? (db.data.users[m.sender].pancing += 1, db.data.users[m.sender].diamond -= 1 * uppancing, db.data.users[m.sender].fishingroddurability = durpancing, await conn.reply(m.chat, `✔️ Sukses Mengupgrade Fishingrod 🎣  Seharga ${uppancing} Diamond 💎`, m)) : await conn.reply(m.chat, `Diamond Mu Tidak Cukup Untuk Mengupgrade Fishingrod 🎣  Seharga ${uppancing} Diamond 💎`, m);
                break;
              case "sword":
                if (5 === db.data.users[m.sender].sword) return await conn.reply(m.chat, "Sword mu udah *Level Max*", m);
                if (0 === db.data.users[m.sender].sword) return await conn.reply(m.chat, "Kamu belum mempunyai Sword", m);
                db.data.users[m.sender].diamond > upsword ? (db.data.users[m.sender].sword += 1, db.data.users[m.sender].diamond -= 1 * upsword, db.data.users[m.sender].sworddurability = dursword, await conn.reply(m.chat, `✔️ Sukses Mengupgrade Sword 🗡️ Seharga ${upsword} Diamond 💎`, m)) : await conn.reply(m.chat, `Diamond Mu Tidak Cukup Untuk Mengupgrade Sword 🗡️ Seharga ${upsword} Diamond 💎`, m);
                break;
              case "pickaxe":
                if (5 === db.data.users[m.sender].pickaxe) return await conn.reply(m.chat, "Pickaxe mu udah *Level Max*", m);
                if (0 === db.data.users[m.sender].pickaxe) return await conn.reply(m.chat, "Kamu belum mempunyai Pickaxe", m);
                db.data.users[m.sender].diamond > uppickaxe ? (db.data.users[m.sender].pickaxe += 1, db.data.users[m.sender].diamond -= 1 * uppickaxe, db.data.users[m.sender].pickaxedurability = durpickaxe, await conn.reply(m.chat, `✔️ Sukses Mengupgrade Pickaxe ⛏️ Seharga ${uppickaxe} Diamond 💎`, m)) : await conn.reply(m.chat, `Diamond Mu Tidak Cukup Untuk Mengupgrade Pickaxe ⛏️  Seharga ${uppickaxe} Diamond 💎`, m);
                break;
              default:
                return await conn.reply(m.chat, Kchat, m, {
                  contextInfo: {
                    externalAdReply: {
                      showAdAttribution: !0,
                      mediaUrl: sig,
                      mediaType: "VIDEO",
                      description: ucapan,
                      title: wm,
                      body: bottime,
                      thumbnail: thumb,
                      sourceUrl: sgc
                    }
                  }
                });
            }
            break;
          case "repair":
            switch (_type) {
              case "fishingrod":
                if (80 === db.data.users[m.sender].fishingroddurability) return await conn.reply(m.chat, "Pancingan mu belum ada kerusakan", m);
                if (0 === db.data.users[m.sender].fishingrod) return await conn.reply(m.chat, "Kamu belum mempunyai Pancingan", m);
                db.data.users[m.sender].diamond > refishingrod ? (db.data.users[m.sender].pancing += 1, db.data.users[m.sender].diamond -= 1 * refishingrod, db.data.users[m.sender].fishingroddurability += drefishingrod, await conn.reply(m.chat, `✔️ Sukses Mengrepair Fishingrod 🎣  Seharga ${refishingrod} Diamond 💎\n➕ ${drefishingrod} Durability`, m)) : await conn.reply(m.chat, `Diamond Mu Tidak Cukup Untuk Merepair Fishingrod 🎣  Seharga ${refishingrod} Diamond 💎`, m);
                break;
              case "pickaxe":
                if (80 === db.data.users[m.sender].pickaxedurability) return await conn.reply(m.chat, "Pickaxe mu belum ada kerusakan", m);
                if (0 === db.data.users[m.sender].pickaxe) return await conn.reply(m.chat, "Kamu belum mempunyai Pickaxe", m);
                db.data.users[m.sender].diamond > repickaxe ? (db.data.users[m.sender].pickaxe += 1, db.data.users[m.sender].diamond -= 1 * repickaxe, db.data.users[m.sender].pickaxedurability += drepickaxe, await conn.reply(m.chat, `✔️ Sukses Mengrepair Pickaxe ⛏️ Seharga ${repickaxe} Diamond 💎\n➕ ${drepickaxe} Durability`, m)) : await conn.reply(m.chat, `Diamond Mu Tidak Cukup Untuk Merepair Pickaxe ⛏️  Seharga ${repickaxe} Diamond 💎`, m);
                break;
              case "sword":
                if (80 === db.data.users[m.sender].sworddurability) return await conn.reply(m.chat, "Sword mu belum ada kerusakan", m);
                if (0 === db.data.users[m.sender].sword) return await conn.reply(m.chat, "Kamu belum mempunyai Sword", m);
                db.data.users[m.sender].diamond > resword ? (db.data.users[m.sender].sword += 1, db.data.users[m.sender].diamond -= 1 * resword, db.data.users[m.sender].sworddurability += dresword, await conn.reply(m.chat, `✔️ Sukses Mengrepair Sword 🗡️ Seharga ${resword} Diamond 💎\n➕ ${dresword} Durability`, m)) : await conn.reply(m.chat, `Diamond Mu Tidak Cukup Untuk Merepair Sword 🗡️  Seharga ${resword} Diamond 💎`, m);
                break;
              default:
                return await conn.reply(m.chat, Kchat, m, {
                  contextInfo: {
                    externalAdReply: {
                      showAdAttribution: !0,
                      mediaUrl: sig,
                      mediaType: "VIDEO",
                      description: ucapan,
                      title: wm,
                      body: bottime,
                      thumbnail: thumb,
                      sourceUrl: sgc
                    }
                  }
                });
            }
            break;
          default:
            return await conn.reply(m.chat, Kchat, m, {
              contextInfo: {
                externalAdReply: {
                  showAdAttribution: !0,
                  mediaUrl: sig,
                  mediaType: "VIDEO",
                  description: ucapan,
                  title: wm,
                  body: bottime,
                  thumbnail: thumb,
                  sourceUrl: sgc
                }
              }
            });
        }
      } else if (/beli|buy/i.test(command)) {
        const count = args[1] && args[1].length > 0 ? Math.min(99999999, Math.max(parseInt(args[1]), 1)) : !args[1] || args.length < 3 ? 1 : Math.min(1, count);
        switch (type) {
          case "potion":
            db.data.users[m.sender].money >= 500 * count ? (db.data.users[m.sender].money -= 500 * count, db.data.users[m.sender].potion += 1 * count, await conn.reply(m.chat, `Sukses membeli ${count} Potion Dengan Harga ${500 * count} Money \n\nGunakan Potion Dengan Ketik: *${usedPrefix}use potion <jumlah>*`, m)) : await conn.reply(m.chat, `Uang Anda Tidak Cukup Untuk Membeli ${count} Potion Dengan Harga ${500 * count} Money`, m);
            break;
          case "tprem":
            db.data.users[m.sender].money >= Btprem * count ? (db.data.users[m.sender].tprem += 1 * count, db.data.users[m.sender].money -= Btprem * count, await conn.reply(m.chat, `Sukses Membeli ${count} Tiket Premium Dengan Harga ${Btprem * count} Money`, m)) : await conn.reply(m.chat, "Uang Anda Tidak Cukup", m);
            break;
          case "diamond":
            db.data.users[m.sender].money >= 900 * count ? (db.data.users[m.sender].diamond += 1 * count, db.data.users[m.sender].money -= 900 * count, await conn.reply(m.chat, `Sukses Membeli ${count} Diamond Dengan Harga ${900 * count} Money `, m)) : await conn.reply(m.chat, "Money Anda Tidak Cukup ", m);
            break;
          case "common":
            db.data.users[m.sender].money >= 200 * count ? (db.data.users[m.sender].common += 1 * count, db.data.users[m.sender].money -= 200 * count, await conn.reply(m.chat, `Sukses Membeli ${count} Common Crate Dengan Harga ${200 * count} Money `, m)) : await conn.reply(m.chat, `Uang Anda Tidak Cukup Untuk Membeli ${count} Common Crate Dengan Harga ${200 * count} Money \n\nBuka Crate Dengan Ketik : *${usedPrefix}open common*`, m);
            break;
          case "uncommon":
            db.data.users[m.sender].money >= 600 * count ? (db.data.users[m.sender].uncommon += 1 * count, db.data.users[m.sender].money -= 600 * count, await conn.reply(m.chat, `Sukses Membeli ${count} Uncommon Crate Dengan Harga ${600 * count} Money `, m)) : await conn.reply(m.chat, `Uang Anda Tidak Cukup Untuk Membeli ${count} Uncommon Crate Dengan Harga ${600 * count} Money \n\nBuka Crate Dengan Ketik: *${usedPrefix}open uncommon*`, m);
            break;
          case "mythic":
            db.data.users[m.sender].money >= 2500 * count ? (db.data.users[m.sender].mythic += 1 * count, db.data.users[m.sender].money -= 2500 * count, await conn.reply(m.chat, `Sukses Membeli ${count} Mythic Crate Dengan Harga ${2500 * count} Money `, m)) : await conn.reply(m.chat, `Uang Anda Tidak Cukup Untuk Membeli ${count} Mythic Crate Dengan Harga ${2500 * count} money\n\nBuka Crate Dengan Ketik: *${usedPrefix}open mythic*`, m);
            break;
          case "legendary":
            db.data.users[m.sender].money >= 7500 * count ? (db.data.users[m.sender].legendary += 1 * count, db.data.users[m.sender].money -= 7500 * count, await conn.reply(m.chat, `Sukses Membeli ${count} Legendary Crate Dengan Harga ${7500 * count} Money`, m)) : await conn.reply(m.chat, `Uang Anda Tidak Cukup Untuk Membeli ${count} Legendary Crate Dengan Harga ${7500 * count} Money \n\nBuka Crate Dengan Ketik: *${usedPrefix}open legendary*`, m);
            break;
          case "sampah":
            db.data.users[m.sender].money >= 10 * count ? (db.data.users[m.sender].sampah += 1 * count, db.data.users[m.sender].money -= 10 * count, await conn.reply(m.chat, `Sukses Membeli ${count} Sampah Dengan Harga ${10 * count} money`, m)) : await conn.reply(m.chat, `Uang Anda Tidak Cukup Untuk Membeli ${count} Sampah Dengan Harga ${10 * count} Money `.trim(), m);
            break;
          case "armor":
            if (5 === db.data.users[m.sender].armor) return await conn.reply(m.chat, "Armormu Telah *Level Max*", m);
            db.data.users[m.sender].money > 1 * armor ? (db.data.users[m.sender].armor += 1, db.data.users[m.sender].money -= 1 * armor, await conn.reply(m.chat, `Sukses Membeli Armor Seharga ${armor} Money`, m)) : await conn.reply(m.chat, `Uang Mu Tidak Cukup Untuk Membeli Armor Seharga ${armor} Money`, m);
            break;
          default:
            return await conn.reply(m.chat, Kchat, m, {
              contextInfo: {
                externalAdReply: {
                  showAdAttribution: !0,
                  mediaUrl: sig,
                  mediaType: "VIDEO",
                  description: ucapan,
                  title: wm,
                  body: bottime,
                  thumbnail: thumb,
                  sourceUrl: sgc
                }
              }
            });
        }
      } else if (/sell|jual|/i.test(command)) {
        const count = args[1] && args[1].length > 0 ? Math.min(99999999, Math.max(parseInt(args[1]), 1)) : !args[1] || args.length < 3 ? 1 : Math.min(1, count);
        switch (type) {
          case "potion":
            db.data.users[m.sender].potion >= 1 * count ? (db.data.users[m.sender].money += 150 * count, db.data.users[m.sender].potion -= 1 * count, await conn.reply(m.chat, `Sukses Menjual ${count} Potion Dengan Harga ${150 * count} Money`.trim(), m)) : await conn.reply(m.chat, "Potion Kamu Tidak Cukup ".trim(), m);
            break;
          case "common":
            db.data.users[m.sender].common >= 1 * count ? (db.data.users[m.sender].money += 20 * count, db.data.users[m.sender].common -= 1 * count, await conn.reply(m.chat, `Sukses Menjual ${count} Common Crate Dengan Harga ${20 * count} Money`.trim(), m)) : await conn.reply(m.chat, "Common Crate Kamu Tidak Cukup ".trim(), m);
            break;
          case "uncommon":
            db.data.users[m.sender].uncommon >= 1 * count ? (db.data.users[m.sender].money += 100 * count, db.data.users[m.sender].uncommon -= 1 * count, await conn.reply(m.chat, `Sukses Menjual ${count} Uncommon Crate Dengan Harga ${100 * count} Money`.trim(), m)) : await conn.reply(m.chat, "Uncommon Crate Kamu Tidak Cukup".trim(), m);
            break;
          case "mythic":
            db.data.users[m.sender].mythic >= 1 * count ? (db.data.users[m.sender].money += 900 * count, db.data.users[m.sender].mythic -= 1 * count, await conn.reply(m.chat, `Sukses Menjual ${count} Mythic Crate Dengan Harga ${900 * count} Money`.trim(), m)) : await conn.reply(m.chat, "Mythic Crate Kamu Tidak Cukup ".trim(), m);
            break;
          case "legendary":
            db.data.users[m.sender].legendary >= 1 * count ? (db.data.users[m.sender].money += 3e3 * count, db.data.users[m.sender].legendary -= 1 * count, await conn.reply(m.chat, `Sukses Menjual ${count} Legendary Crate Dengan Harga ${3e3 * count} Money`.trim(), m)) : await conn.reply(m.chat, "Legendary Crate Kamu Tidak Cukup".trim(), m);
            break;
          case "sampah":
            db.data.users[m.sender].sampah >= 1 * count ? (db.data.users[m.sender].sampah -= 1 * count, db.data.users[m.sender].money += 2 * count, await conn.reply(m.chat, `Sukses Menjual ${count} Sampah, Dan Anda Mendapatkan ${2 * count} Money`.trim(), m)) : await conn.reply(m.chat, "Sampah Anda Tidak Cukup".trim(), m);
            break;
          case "diamond":
            db.data.users[m.sender].diamond >= 1 * count ? (db.data.users[m.sender].diamond -= 1 * count, db.data.users[m.sender].money += 750 * count, await conn.reply(m.chat, `Sukses Menjual ${count} Diamond, Dan Anda Mendapatkan ${750 * count} Money`, m)) : await conn.reply(m.chat, "Diamond Anda Tidak Cukup ", m);
            break;
          default:
            return await conn.reply(m.chat, Kchat, m, {
              contextInfo: {
                externalAdReply: {
                  showAdAttribution: !0,
                  mediaUrl: sig,
                  mediaType: "VIDEO",
                  description: ucapan,
                  title: wm,
                  body: bottime,
                  thumbnail: thumb,
                  sourceUrl: sgc
                }
              }
            });
        }
      } else if (/up|upgrade/i.test(command)) {
        const count = args[1] && args[1].length > 0 ? Math.min(99999999, Math.max(parseInt(args[1]), 1)) : !args[1] || args.length < 3 ? 1 : Math.min(1, count);
        if ("armor" !== type) return await conn.reply(m.chat, Kchat, m, {
          contextInfo: {
            externalAdReply: {
              showAdAttribution: !0,
              mediaUrl: sig,
              mediaType: "VIDEO",
              description: ucapan,
              title: wm,
              body: bottime,
              thumbnail: thumb,
              sourceUrl: sgc
            }
          }
        });
        if (5 === db.data.users[m.sender].armor) return await conn.reply(m.chat, "Armormu sudah *Level Max*", m);
        if (0 === db.data.users[m.sender].armor) return await conn.reply(m.chat, "Kamu belum mempunyai Armor", m);
        db.data.users[m.sender].diamond > uparmor ? (db.data.users[m.sender].armor += 1, db.data.users[m.sender].diamond -= 1 * uparmor, await conn.reply(m.chat, `✔️ Sukses Mengupgrade Armor 🥼 Seharga ${uparmor} Money`, m)) : await conn.reply(m.chat, `Uang Mu Tidak Cukup Untuk Mengupgrade Armor 🥼 Seharga ${uparmor} Money 💹`, m);
      } else if (/repair/i.test(command)) {
        const count = args[1] && args[1].length > 0 ? Math.min(99999999, Math.max(parseInt(args[1]), 1)) : !args[1] || args.length < 3 ? 1 : Math.min(1, count);
        if ("armor" !== type) return await conn.reply(m.chat, Kchat, m, {
          contextInfo: {
            externalAdReply: {
              showAdAttribution: !0,
              mediaUrl: sig,
              mediaType: "VIDEO",
              description: ucapan,
              title: wm,
              body: bottime,
              thumbnail: thumb,
              sourceUrl: sgc
            }
          }
        });
        if (5 === db.data.users[m.sender].armor) return await conn.reply(m.chat, "Armormu sudah *Level Max*", m);
        if (0 === db.data.users[m.sender].armor) return await conn.reply(m.chat, "Kamu belum mempunyai Armor", m);
        db.data.users[m.sender].diamond > uparmor ? (db.data.users[m.sender].armor += 1, db.data.users[m.sender].diamond -= 1 * uparmor, await conn.reply(m.chat, `✔️ Sukses Mengupgrade Armor 🥼 Seharga ${uparmor} Money`, m)) : await conn.reply(m.chat, `Uang Mu Tidak Cukup Untuk Mengupgrade Armor 🥼 Seharga ${uparmor} Money 💹`, m);
      }
    } catch (e) {
      if (await conn.reply(m.chat, Kchat, m, {
          contextInfo: {
            externalAdReply: {
              showAdAttribution: !0,
              mediaUrl: sig,
              mediaType: "VIDEO",
              description: ucapan,
              title: wm,
              body: bottime,
              thumbnail: thumb,
              sourceUrl: sgc
            }
          }
        }), console.log(e), DevMode)
        for (let jid of owner.map(v => v.replace(/[^0-9]/g, "") + "@s.whatsapp.net").filter(v => v != conn.user.jid)) await conn.reply(jid, "toko.js error\nNo: *" + m.sender.split("@")[0] + "*\nCommand: *" + m.text + "*\n\n*" + e + "*", m);
    }
  };
handler.help = ["toko <sell | buy | upgrade | repair> <args>", "toko <sell | buy | upgrade | repair> <args>"],
  handler.tags = ["rpg"], handler.command = /^(toko)$/i;
export default handler;