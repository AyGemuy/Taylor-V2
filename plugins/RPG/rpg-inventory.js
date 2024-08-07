import daily from "../RPG/rpg-daily.js";
import weekly from "../RPG/rpg-weekly.js";
import monthly from "../RPG/rpg-monthly.js";
import adventure from "../RPG/rpg-adventure.js";
import {
  xpRange
} from "../../lib/levelling.js";
import PhoneNumber from "awesome-phonenumber";
import fetch from "node-fetch";
import {
  BannerBot
} from "../../lib/welcome.js";
const inventory = {
    others: {
      level: !0,
      limit: !0,
      health: !0,
      money: !0,
      exp: !0
    },
    items: {
      bibitanggur: !0,
      bibitmangga: !0,
      bibitpisang: !0,
      bibitapel: !0,
      bibitjeruk: !0,
      potion: !0,
      trash: !0,
      wood: !0,
      rock: !0,
      string: !0,
      emerald: !0,
      diamond: !0,
      gold: !0,
      iron: !0,
      upgrader: !0,
      pet: !0
    },
    durabi: {
      sworddurability: !0,
      pickaxedurability: !0,
      fishingroddurability: !0,
      armordurability: !0
    },
    tools: {
      armor: {
        0: "❌",
        1: "Leather Armor",
        2: "Iron Armor",
        3: "Gold Armor",
        4: "Diamond Armor",
        5: "Emerald Armor",
        6: "Crystal Armor",
        7: "Obsidian Armor",
        8: "Netherite Armor",
        9: "Wither Armor",
        10: "Dragon Armor",
        11: "Hacker Armor"
      },
      sword: {
        0: "❌",
        1: "Wooden Sword",
        2: "Stone Sword",
        3: "Iron Sword",
        4: "Gold Sword",
        5: "Copper Sword",
        6: "Diamond Sword",
        7: "Emerald Sword",
        8: "Obsidian Sword",
        9: "Netherite Sword",
        10: "Samurai Slayer Green Sword",
        11: "Hacker Sword"
      },
      pickaxe: {
        0: "❌",
        1: "Wooden Pickaxe",
        2: "Stone Pickaxe",
        3: "Iron Pickaxe",
        4: "Gold Pickaxe",
        5: "Copper Pickaxe",
        6: "Diamond Pickaxe",
        7: "Emerlad Pickaxe",
        8: "Crystal Pickaxe",
        9: "Obsidian Pickaxe",
        10: "Netherite Pickaxe",
        11: "Hacker Pickaxe"
      },
      fishingrod: !0
    },
    crates: {
      common: !0,
      uncommon: !0,
      mythic: !0,
      legendary: !0
    },
    pets: {
      horse: 10,
      cat: 10,
      fox: 10,
      dog: 10,
      robo: 10,
      lion: 10,
      rhinoceros: 10,
      dragon: 10,
      centaur: 10,
      kyubi: 10,
      griffin: 10,
      phonix: 10,
      wolf: 10
    },
    cooldowns: {
      lastclaim: {
        name: "claim",
        time: daily.cooldown
      },
      lastweekly: {
        name: "weekly",
        time: weekly.cooldown
      },
      lastmonthly: {
        name: "monthly",
        time: monthly.cooldown
      },
      lastadventure: {
        name: "adventure",
        time: adventure.cooldown
      }
    }
  },
  handler = async (m, {
    conn,
    args,
    command,
    text,
    usedPrefix
  }) => {
    const listData = [{
        id: 1,
        name: "Item 1"
      }, {
        id: 2,
        name: "Item 2"
      }, {
        id: 3,
        name: "Item 3"
      }, {
        id: 4,
        name: "Item 4"
      }, {
        id: 5,
        name: "Item 5"
      }],
      listMessage = ["*Inventory Yang tersedia*"];
    listData.forEach(({
      id,
      name
    }) => listMessage.push(`*${id}.* Untuk menampilkan Inventory ${name}`)), listMessage.push(`*Contoh:* ${usedPrefix + command} 1 ( Untuk menampilkan inventory pada item 1 )`);
    const input = args[0],
      num = parseInt(input);
    if (!input) {
      const pesan = "Pesan: Input tidak boleh kosong!\n" + listMessage.join("\n");
      return m.reply(pesan);
    }
    if (isNaN(num)) {
      const pesan = "Pesan: Input harus berupa angka!\n" + listMessage.join("\n");
      return m.reply(pesan);
    }
    if (num > 5) {
      const pesan = "Pesan: Angka tidak boleh lebih dari 5!\n" + listMessage.join("\n");
      return m.reply(pesan);
    } {
      const pesan = `Menampilkan item ( ${listData[num - 1].name} )...`;
      m.reply(pesan);
      let imgr = flaaa.getRandom(),
        who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender,
        name = conn.getName(who);
      await conn.profilePictureUrl(who, "image").catch(_ => logo);
      const transformedData = Object.entries(db.data.users).sort((a, b) => b[1].money - a[1].money).slice(0, 10).map(([jid, {
          money,
          name
        }], index) => ({
          top: index + 1,
          tag: name,
          score: money
        })),
        topImg = BannerBot(transformedData[0]?.tag);
      if (void 0 === db.data.users[who] && (db.data.users[who] = {
          exp: 0,
          limit: 10,
          lastclaim: 0,
          registered: !1,
          name: conn.getName(m.sender),
          age: -1,
          regTime: -1,
          afk: -1,
          afkReason: "",
          banned: !1,
          level: 0,
          lastweekly: 0,
          role: "Warrior V",
          autolevelup: !1,
          money: 0,
          pasangan: ""
        }), "1" === args[0]) {
        let member = db.data.users[m.sender],
          healt = member.healt,
          pickaxe = member.pickaxe,
          sword = member.sword,
          armor = member.armor,
          fishingrod = member.fishingrod,
          warn = member.warn,
          pet = member.pet,
          kucing = member.kucing,
          _kucing = member.anakkucing,
          rubah = member.rubah,
          _rubah = member.anakrubah,
          kuda = member.kuda,
          _kuda = member.anakkuda,
          anjing = member.anjing,
          _anjing = member.anakanjing,
          diamond = member.diamond,
          potion = member.potion,
          common = member.common,
          makananpet = member.makananpet,
          iron = member.iron,
          batu = member.batu,
          kayu = member.kayu,
          string = member.string,
          uncommon = member.uncommon,
          mythic = member.mythic,
          legendary = member.legendary,
          level = member.level,
          money = member.money,
          exp = member.exp,
          sampah = member.sampah,
          sortedmoney = Object.entries(db.data.users).sort((a, b) => b[1].money - a[1].money),
          sortedlevel = Object.entries(db.data.users).sort((a, b) => b[1].level - a[1].level),
          sorteddiamond = Object.entries(db.data.users).sort((a, b) => b[1].diamond - a[1].diamond),
          sortedpotion = Object.entries(db.data.users).sort((a, b) => b[1].potion - a[1].potion),
          sortedsampah = Object.entries(db.data.users).sort((a, b) => b[1].sampah - a[1].sampah),
          sortedmakananpet = Object.entries(db.data.users).sort((a, b) => b[1].makananpet - a[1].makananpet),
          sortedbatu = Object.entries(db.data.users).sort((a, b) => b[1].batu - a[1].batu),
          sortediron = Object.entries(db.data.users).sort((a, b) => b[1].iron - a[1].iron),
          sortedkayu = Object.entries(db.data.users).sort((a, b) => b[1].kayu - a[1].kayu),
          sortedstring = Object.entries(db.data.users).sort((a, b) => b[1].string - a[1].string),
          sortedcommon = Object.entries(db.data.users).sort((a, b) => b[1].common - a[1].common),
          sorteduncommon = Object.entries(db.data.users).sort((a, b) => b[1].uncommon - a[1].uncommon),
          sortedmythic = Object.entries(db.data.users).sort((a, b) => b[1].mythic - a[1].mythic),
          sortedlegendary = Object.entries(db.data.users).sort((a, b) => b[1].legendary - a[1].legendary),
          sortedpet = Object.entries(db.data.users).sort((a, b) => b[1].pet - a[1].pet),
          usersmoney = sortedmoney.map(v => v[0]),
          userslevel = sortedlevel.map(v => v[0]),
          usersdiamond = sorteddiamond.map(v => v[0]),
          userspotion = sortedpotion.map(v => v[0]),
          userssampah = sortedsampah.map(v => v[0]),
          usersmakananpet = sortedmakananpet.map(v => v[0]),
          usersbatu = sortedbatu.map(v => v[0]),
          usersiron = sortediron.map(v => v[0]),
          userskayu = sortedkayu.map(v => v[0]),
          usersstring = sortedstring.map(v => v[0]),
          userscommon = sortedcommon.map(v => v[0]),
          usersuncommon = sorteduncommon.map(v => v[0]),
          usersmythic = sortedmythic.map(v => v[0]),
          userslegendary = sortedlegendary.map(v => v[0]),
          userspet = sortedpet.map(v => v[0]),
          str = `\nInventory *🏷️ Nama:* *(${name})* ( @${who.split("@")[0]} )\n\n❤️Nyawa: *${healt}*\n⛏️Pickaxe: *${0 === pickaxe ? "Tidak Punya" : 1 === pickaxe ? "Level 1" : 2 === pickaxe ? "Level 2" : 3 === pickaxe ? "Level 3" : 4 === pickaxe ? "Level 4" : 5 === pickaxe ? "Level 5 (MAX)" : ""}*\n⚔️Sword: *${0 === sword ? "Tidak Punya" : 1 === sword ? "Leather Sword" : 2 === sword ? "Iron Sword" : 3 === sword ? "Gold Sword" : 4 === sword ? "Diamond Sword" : 5 === sword ? "Netherite Sword (MAX)" : ""}*\n👚Armor: *${0 === armor ? "Tidak Punya" : 1 === armor ? "Leather Armor" : 2 === armor ? "Iron Armor" : 3 === armor ? "Gold Armor" : 4 === armor ? "Diamond Armor" : 5 === armor ? "Netherite Armor (MAX)" : ""}*\n🎣FishingRod: ${fishingrod}\n\n💵Uang: *${money}*\n🔱Level: *${level}*\n✉️Exp: *${exp}*\n\n*Inventory*\n💎Diamond: *${diamond}*\n🥤Potion: *${potion}*\n🗑️Sampah: *${sampah}*\n🍖Makanan Pet: *${makananpet}*\n⛓️Iron: *${iron}*\n🪨Batu: *${batu}*\n🪵Kayu: *${kayu}*\n🕸️String: *${string}*\nTotal inv: *${diamond + potion + sampah + makananpet}* item\n\n*Crate*\n📦Common: *${common}*\n📦Uncommon: *${uncommon}*\n📦Mythic: *${mythic}*\n🎁Legendary: *${legendary}*\n📦Pet: *${pet}*\n\n*Pet*\n🐎Kuda: *${0 === kuda ? "Tidak Punya" : 1 === kuda ? "Level 1" : 2 === kuda ? "Level 2" : 3 === kuda ? "Level 3" : 4 === kuda ? "Level 4" : 5 === kuda ? "Level MAX" : ""}*\n🦊Rubah: *${0 === rubah ? "Tidak Punya" : 1 === rubah ? "Level 1" : 2 === rubah ? "Level 2" : 3 === rubah ? "Level 3" : 4 === rubah ? "Level 4" : 5 === rubah ? "Level MAX" : ""}*\n🐈Kucing: *${0 === kucing ? "Tidak Punya" : 1 === kucing ? "Level 1" : 2 === kucing ? "Level 2" : 3 === kucing ? "Level 3" : 4 === kucing ? "Level 4" : 5 === kucing ? "Level MAX" : ""}*\n🐶Anjing: *${0 === anjing ? "Tidak Punya" : 1 === anjing ? "Level 1" : 2 === anjing ? "Level 2" : 3 === anjing ? "Level 3" : 4 === anjing ? "Level 4" : 5 === anjing ? "Level MAX" : ""}*\n\n\n*Proges*\n\n╭────────────┄⸙\n│🔱Level *${level}* To Level *${level}*\n│⚜️Exp *${exp}* -> *${100 * level}*\n╰──┬─┄\n╭──┴─────────┄⸙\n╰┫🦊Rubah ${0 === rubah ? "Tidak Punya" : rubah > 0 && rubah < 5 ? `Level *${rubah}* To level *${rubah + 1}*\n╭┫Exp *${_rubah}* -> *${100 * rubah}*` : 5 === rubah ? "*Max Level*" : ""}\n╰──┬─┄\n╭──┴─────────┄⸙\n╰┫🐈Kucing ${0 === kucing ? "Tidak Punya" : kucing > 0 && kucing < 5 ? `Level *${kucing}* To level *${kucing + 1}*\n╭┫Exp *${_kucing}* -> *${100 * kucing}*` : 5 === kucing ? "*Max Level*" : ""}\n╰──┬─┄\n╭──┴─────────┄⸙\n╰┫🐎Kuda ${0 === kuda ? "Tidak Punya" : kuda > 0 && kuda < 5 ? `Level *${kuda}* To level *${kuda + 1}*\n╭┫Exp *${_kuda}* -> *${100 * kuda}*` : 5 === kuda ? "*Max Level*" : ""}\n╰──┬─┄\n╭──┴─────────┄⸙\n╰┫🐶Anjing ${0 === anjing ? "Tidak Punya" : anjing > 0 && anjing < 5 ? `Level *${anjing}* To level *${anjing + 1}*\n╭┫Exp *${_anjing}* -> *${100 * anjing}*` : 5 === anjing ? "*Max Level*" : ""}\n╰────┄⸙\n\n\n*achievement*\n1.Top level *${userslevel.indexOf(m.sender) + 1}* dari *${userslevel.length}*\n2.Top Money *${usersmoney.indexOf(m.sender) + 1}* dari *${usersmoney.length}*\n3.Top Diamond *${usersdiamond.indexOf(m.sender) + 1}* dari *${usersdiamond.length}*\n4.Top Potion *${userspotion.indexOf(m.sender) + 1}* dari *${userspotion.length}*\n5.Top Sampah *${userssampah.indexOf(m.sender) + 1}* dari *${userssampah.length}*\n6.Top Makanan Pet *${usersmakananpet.indexOf(m.sender) + 1}* dari *${usersmakananpet.length}*\n7.Top Batu *${usersbatu.indexOf(m.sender) + 1}* dari *${usersbatu.length}*\n8.Top Iron *${usersiron.indexOf(m.sender) + 1}* dari *${usersiron.length}*\n9.Top Kayu *${userskayu.indexOf(m.sender) + 1}* dari *${userskayu.length}*\n10.Top String *${usersstring.indexOf(m.sender) + 1}* dari *${usersstring.length}*\n11.Top Common *${userscommon.indexOf(m.sender) + 1}* dari *${userscommon.length}*\n13.Top Uncommon *${usersuncommon.indexOf(m.sender) + 1}* dari *${usersuncommon.length}*\n14.Top Mythic *${usersmythic.indexOf(m.sender) + 1}* dari *${usersmythic.length}*\n15.Top Legendary *${userslegendary.indexOf(m.sender) + 1}* dari *${userslegendary.length}*\n16.Top Pet Crate *${userspet.indexOf(m.sender) + 1}* dari *${userspet.length}*\n\n\n\nWarn: *${warn}*\nBanned: *No*\n`.trim();
        try {
          await conn.sendFile(m.chat, topImg || imgr + "INVENTORY", "", str, m, null, {
            mentions: conn.parseMention(str)
          });
        } catch (error) {
          m.reply(str);
        }
      } else if ("2" === args[0]) {
        let user = db.data.users[m.sender];
        const tools = Object.keys(inventory.tools).map(v => user[v] && `*${rpg.emoticon(v)}${v}:* ${"object" == typeof inventory.tools[v] ? inventory.tools[v][user[v].toString()] : `Level(s) ${user[v]}`}`).filter(v => v).join("\n").trim(),
          items = Object.keys(inventory.items).map(v => user[v] && `*${rpg.emoticon(v)}${v}:* ${user[v]}`).filter(v => v).join("\n").trim(),
          crates = (Object.keys(inventory.durabi).map(v => user[v] && `*${rpg.emoticon(v)}${v}:* ${user[v]}`).filter(v => v).join("\n").trim(), Object.keys(inventory.crates).map(v => user[v] && `*${rpg.emoticon(v)}${v}:* ${user[v]}`).filter(v => v).join("\n").trim()),
          pets = Object.keys(inventory.pets).map(v => user[v] && `*${rpg.emoticon(v)}${v}:* ${user[v] >= inventory.pets[v] ? "Max Levels" : `Level(s) ${user[v]}`}`).filter(v => v).join("\n").trim(),
          cooldowns = Object.entries(inventory.cooldowns).map(([cd, {
            name,
            time
          }]) => cd in user && `*✧ ${name}*: ${new Date() - user[cd] >= time ? "✅" : "❌"}`).filter(v => v).join("\n").trim(),
          caption = `\n🧑🏻‍🏫 ᴜsᴇʀ: *${conn.getName(m.sender)}*\n${Object.keys(inventory.others).map(v => user[v] && `⮕ ${rpg.emoticon(v)} ${v}: ${user[v]}`).filter(v => v).join("\n")}${tools ? `\n🔖 ᴛᴏᴏʟs :\n${tools}` : ""}${items ? `\n\n🔖 ɪᴛᴇᴍs :\n${items}` : ""}${crates ? `\n\n🔖 ᴄʀᴀᴛᴇs :\n${crates}` : ""}${pets ? `\n\n🔖 ᴩᴇᴛs :\n${pets}` : ""}${cooldowns ? `\n\n♻️ ᴄᴏʟʟᴇᴄᴛ ʀᴇᴡᴀʀᴅs:\n${cooldowns}` : ""}\n*✧ dungeon: ${0 === user.lastdungeon ? "✅" : "❌"}*\n*✧ mining: ${0 === user.lastmining ? "✅" : "❌"}*\n*✧ roket: ${0 === user.lastroket ? "✅" : "❌"}*\n*✧ mancing: ${0 === user.lastfishing ? "✅" : "❌"}*\n*✧ ngojek: ${0 === user.lastngojek ? "✅" : "❌"}*\n*✧ taxy: ${0 === user.lastgrab ? "✅" : "❌"}*\n*✧ nebang: ${0 === user.lastlumber ? "✅" : "❌"}*\n*✧ ngocok: ${0 === user.lastngocok ? "✅" : "❌"}*\n`.trim();
        try {
          await conn.sendFile(m.chat, topImg || imgr + "INVENTORY", "", caption, m, null, {
            mentions: conn.parseMention(caption)
          });
        } catch (error) {
          m.reply(caption);
        }
      } else if ("3" === args[0]) {
        botdate;
        let {
          registered,
          age,
          lastrampok,
          lastdagang,
          lastcodereg,
          lastberkebon,
          lasthourly,
          lastberburu,
          lastbansos,
          lastadventure,
          lastfishing,
          lastwar,
          lastduel,
          lastmining,
          lastdungeon,
          lastclaim,
          lastweekly,
          lastmonthly
        } = db.data.users[m.sender], healt = db.data.users[m.sender].healt, usrname = (db.data.users[m.sender].laper, db.data.users[m.sender].haus, db.data.users[m.sender].name), stamina = db.data.users[m.sender].stamina, armor = db.data.users[m.sender].armor, sword = db.data.users[m.sender].sword, sdurability = db.data.users[m.sender].sworddurability, warn = db.data.users[m.sender].warn, premium = db.data.users[m.sender].premium, pancing = (db.data.users[m.sender].tprem, db.data.users[m.sender].pancing), fdurability = db.data.users[m.sender].fishingroddurability, role = db.data.users[m.sender].role, pickaxe = db.data.users[m.sender].pickaxe, pdurability = db.data.users[m.sender].pickaxedurability, psepick = db.data.users[m.sender].psepick, psenjata = db.data.users[m.sender].psenjata, ikan = db.data.users[m.sender].ikan, nila = db.data.users[m.sender].nila, bawal = db.data.users[m.sender].bawal, lele = db.data.users[m.sender].lele, apel = (db.data.users[m.sender].udang, db.data.users[m.sender].apel), ayamg = db.data.users[m.sender].ayamg, ayamb = db.data.users[m.sender].ayamb, sapir = db.data.users[m.sender].sapir, ssapi = db.data.users[m.sender].ssapi, kayu = db.data.users[m.sender].kayu, string = db.data.users[m.sender].string, emas = db.data.users[m.sender].emas, besi = db.data.users[m.sender].iron, batu = db.data.users[m.sender].batu, sapi = db.data.users[m.sender].sapi, ayam = db.data.users[m.sender].ayam, babi = db.data.users[m.sender].babi, banteng = db.data.users[m.sender].banteng, pet = db.data.users[m.sender].pet, kucing = db.data.users[m.sender].kucing, _kucing = db.data.users[m.sender].anakkucing, rubah = db.data.users[m.sender].rubah, _rubah = db.data.users[m.sender].anakrubah, kuda = db.data.users[m.sender].kuda, _kuda = db.data.users[m.sender].anakkuda, serigala = db.data.users[m.sender].serigala, _serigala = db.data.users[m.sender].anakserigala, phonix = db.data.users[m.sender].phonix, _phonix = db.data.users[m.sender].anakphonix, griffin = db.data.users[m.sender].griffin, _griffin = db.data.users[m.sender].anakgriffin, centaur = (db.data.users[m.sender].kyubi, db.data.users[m.sender].anakkyubi, db.data.users[m.sender].centaur), _centaur = db.data.users[m.sender].anakcentaur, naga = db.data.users[m.sender].naga, _naga = db.data.users[m.sender].anaknaga, diamond = db.data.users[m.sender].diamond, potion = db.data.users[m.sender].potion, common = db.data.users[m.sender].common, makananpet = db.data.users[m.sender].makananpet, uncommon = (db.data.users[m.sender].makanannaga, db.data.users[m.sender].makananphonix, db.data.users[m.sender].makanangriffin, db.data.users[m.sender].makanankyubi, db.data.users[m.sender].makanancentaur, db.data.users[m.sender].uncommon), mythic = db.data.users[m.sender].mythic, legendary = db.data.users[m.sender].legendary, level = db.data.users[m.sender].level, money = db.data.users[m.sender].money, exp = db.data.users[m.sender].exp, atm = db.data.users[m.sender].atm, aqua = db.data.users[m.sender].aqua, pasangan = db.data.users[m.sender].pasangan, ramuan = db.data.users[m.sender].ramuan, kaleng = db.data.users[m.sender].kaleng, kardus = db.data.users[m.sender].kardus, arlok = (db.data.users[m.sender].botol, db.data.users[m.sender].arlok), limit = db.data.users[m.sender].limit, sampah = (db.data.users[m.sender].glimit, db.data.users[m.sender].sampah), anggur = db.data.users[m.sender].anggur, jeruk = db.data.users[m.sender].jeruk, mangga = db.data.users[m.sender].mangga, pisang = db.data.users[m.sender].pisang, bibitanggur = db.data.users[m.sender].bibitanggur, bibitjeruk = db.data.users[m.sender].bibitjeruk, bibitapel = db.data.users[m.sender].bibitapel, bibitmangga = db.data.users[m.sender].bibitmangga, bibitpisang = db.data.users[m.sender].bibitpisang, {
          max
        } = xpRange(level, exp, multiplier), sortedmoney = Object.entries(db.data.users).sort((a, b) => b[1].money - a[1].money), sortedgold = Object.entries(db.data.users).sort((a, b) => b[1].gold - a[1].gold), sortedarlok = Object.entries(db.data.users).sort((a, b) => b[1].arlok - a[1].arlok), sortedlevel = Object.entries(db.data.users).sort((a, b) => b[1].level - a[1].level), sorteddiamond = Object.entries(db.data.users).sort((a, b) => b[1].diamond - a[1].diamond), sortedpotion = Object.entries(db.data.users).sort((a, b) => b[1].potion - a[1].potion), sortedsampah = Object.entries(db.data.users).sort((a, b) => b[1].sampah - a[1].sampah), sortedcommon = Object.entries(db.data.users).sort((a, b) => b[1].common - a[1].common), sorteduncommon = Object.entries(db.data.users).sort((a, b) => b[1].uncommon - a[1].uncommon), sortedmythic = Object.entries(db.data.users).sort((a, b) => b[1].mythic - a[1].mythic), sortedlegendary = Object.entries(db.data.users).sort((a, b) => b[1].legendary - a[1].legendary), usersmoney = sortedmoney.map(v => v[0]), usersgold = sortedgold.map(v => v[0]), usersarlok = sortedarlok.map(v => v[0]), usersdiamond = sorteddiamond.map(v => v[0]), userspotion = sortedpotion.map(v => v[0]), userssampah = sortedsampah.map(v => v[0]), userslevel = sortedlevel.map(v => v[0]), userscommon = sortedcommon.map(v => v[0]), usersuncommon = sorteduncommon.map(v => v[0]), usersmythic = sortedmythic.map(v => v[0]), userslegendary = sortedlegendary.map(v => v[0]), kambing = db.data.users[m.sender].kambing, kerbau = db.data.users[m.sender].kerbau, harimau = db.data.users[m.sender].harimau, monyet = db.data.users[m.sender].monyet, babihutan = db.data.users[m.sender].babihutan, panda = db.data.users[m.sender].panda, gajah = db.data.users[m.sender].gajah, buaya = db.data.users[m.sender].buaya, paus = db.data.users[m.sender].paus, kepiting = db.data.users[m.sender].kepiting, gurita = db.data.users[m.sender].gurita, cumi = db.data.users[m.sender].cumi, lumba = db.data.users[m.sender].lumba, lobster = db.data.users[m.sender].lobster, hiu = db.data.users[m.sender].hiu, udang = db.data.users[m.sender].udang, orca = db.data.users[m.sender].orca, str = (PhoneNumber("+" + pasangan.replace("@s.whatsapp.net", "")).getNumber("international"), `╭──────━• *STATUS*\n│📡 *Status:* ${premium ? "Premium" : "Free"} User\n│📇 *Name:* ${usrname} \n│💌 *Pasangan:* ${pasangan ? `@${pasangan.split("@")[0]}` : "❌"}\n│❗ *Warn:* ${warn}\n│⛔ *Banned:* No\n│\n│❤️️ *Health:* ${healt}\n│⚡ *Stamina:* ${stamina}\n│💹 *Money:* $${money}\n│💳 *Bank:* $${atm}\n│📊 *Level:* ${level}\n│✨ *Exp:* ${exp}\n│📍 *Role:* ${role}\n│🎫 *Limit:* ${limit}\n│${registered ? "🎨 *Age:* " + age : ""}\n╰──────────━⃝┅⃝━━────────┄⸙\n${readMore}\n╭──────━• *TOOLS*\n│🥼 *Armor:* ${0 === armor ? "❌" : 1 === armor ? "Leather Armor" : 2 === armor ? "Iron Armor" : 3 === armor ? "Gold Armor" : 4 === armor ? "Diamond Armor" : 5 === armor ? "Netherite Armor" : ""}\n│⚔️ *Sword:* ${0 === sword ? "❌" : 1 === sword ? "wooden sword" : 2 === sword ? "Stone sword" : 3 === sword ? "Iron sword" : 4 === sword ? "Diamond sword" : sword > 0 && sword < 5 ? `Ketahanan (*${_sword}* / *${100 * sword}*)` : 5 === sword ? "*Netherite Sword*" : ""}\n│╰ *Durability:* ${sdurability}\n│⛏️ *Pickaxe:* ${0 === pickaxe ? "❌" : 1 === pickaxe ? "wooden pickaxe" : 2 === pickaxe ? "stone pickaxe" : 3 === pickaxe ? "Iron pickaxe" : 4 === pickaxe ? "Diamond pickaxe" : 5 === pickaxe ? "Netherite pickaxe" : ""}\n│╰ *Durability:* ${pdurability}\n│🎣 *Fishingrod:* ${0 === pancing ? "❌" : 1 === pancing ? "Wooden Fishingrod" : 2 === pancing ? "Iron Fishingrod" : 1 === pancing ? "Diamond Fishingrod" : 1 === pancing ? "Netherite Fishingrod" : ""}\n│╰ *Durability:* ${fdurability}\n│🏹 *Bow:* Cooming Soon!\n╰──────────━⃝┅⃝━━────────┄⸙\n\n╭──────━• *KANDANG*\n│🐔 *Ayam:* ${ayam}    \n│🐐 *Kambing:* ${kambing}\n│🐄 *Sapi:* ${sapi} \n│🐃 *Kerbau:* ${kerbau}\n│🐖 *Babi:* ${babi}    \n│🐅 *Harimau:* ${harimau}\n│🐂 *Banteng:* ${banteng} \n│🐒 *Monyet:* ${monyet}\n│🐗 *Babi Hutan:* ${babihutan}\n│🐼 *Panda:* ${panda}\n│🐘 *Gajah:* ${gajah}\n│🐊 *Buaya:* ${buaya}\n│\n│🥢 Bisa kamu masak */masak ayamb*\n│💬 *Total Hewan:* ${buaya + gajah + panda + babihutan + monyet + harimau + kerbau + kambing + ayam + sapi + babi + banteng} tangkapan\n╰──────────━⃝┅⃝━━────────┄⸙\n\n╭──────━• *KOLAM*\n│🐋 *Orca:* ${orca}\n│🐳 *Paus:* ${paus}\n│🐬 *Lumba:* ${lumba}\n│🦈 *Hiu:* ${hiu}\n│🐟 *Ikan:* ${ikan}\n│🐟 *Lele:* ${lele}\n│🐡 *Bawal:* ${bawal}\n│🐠 *Nila:* ${nila}\n│🦀 *Kepiting:* ${kepiting}\n│🦞 *Lobster:* ${lobster}\n│🐙 *Gurita:* ${gurita}\n│🦑 *Cumi:* ${cumi}\n│🦐 *Udang:* ${udang}\n│\n│💬 *Total Ikan:* ${orca + udang + hiu + lobster + lumba + cumi + gurita + kepiting + paus + nila + bawal + ikan + lele + psepick + psenjata}\n╰──────────━⃝┅⃝━━────────┄⸙\n\n╭──────━• *INVENTORY*\n│💎 *Diamond:* ${diamond}\n│🧪 *Ramuan:* ${ramuan}\n│🥤 *Potion:* ${potion}\n│🗑️ *Sampah:* ${sampah}\n│🥫 *Kaleng:* ${kaleng}\n│📦 *Kardus:* ${kardus}\n│🪵  *Kayu:* ${kayu}\n│🕸️ *String:* ${string}\n│🪙  *Gold:* ${emas}\n│⛓  *Iron:* ${besi}\n│🪨  *Batu:* ${batu}\n│🧭 *Arloji:* ${arlok}\n╰──────────━⃝┅⃝━━────────┄⸙\n\n╭──────━• *FOOD*\n│🥓 *FoodPet :* ${makananpet}\n│🍖 *ayam bakar:* ${ayamb}\n│🍗 *ayam goreng:* ${ayamg}\n│🥘 *Rendang Sapi :* ${sapir}\n│🥩 *steak sapi:* ${ssapi}\n│\n│🎒 *Total inv:* ${aqua + ramuan + kardus + kaleng + arlok + psepick + psenjata + common + uncommon + mythic + legendary + pet + diamond + potion + besi + emas + string + sampah + kayu + batu + potion + sampah + makananpet + apel + ayamb + ayamg + sapir + ssapi} item\n╰──────────━⃝┅⃝━━────────┄⸙\n\n╭──────━• *FRUIT & SEED*\n│🥭 *Mangga:* ${mangga}\n│🍇 *Anggur:* ${anggur}\n│🍌 *Pisang:* ${pisang}\n│🍊 *Jeruk:* ${jeruk}\n│🍎 *Apel:* ${apel}\n│\n│🌾 *Bibit Mangga:* ${bibitmangga}\n│🌾 *Bibit Anggur:* ${bibitanggur}                                    \n│🌾 *Bibit Pisang:* ${bibitpisang}\n│🌾 *Bibit Jeruk:* ${bibitjeruk}\n│🌾 *Bibit Apel:* ${bibitapel}\n╰──────────━⃝┅⃝━━────────┄⸙\n\n╭──────━• *CRATE*\n│📦 *Common:* ${common}\n│🛍️ *Uncommon:* ${uncommon}\n│🎁 *Mythic:* ${mythic}\n│🧰 *Legendary:* ${legendary}\n│📫 *Pet:* ${pet}\n╰──────────━⃝┅⃝━━────────┄⸙\n\n╭──────━• *PET*\n│🐴 *Kuda:* ${0 === kuda ? "❌" : 1 === kuda ? "Level 1" : 2 === kuda ? "Level 2" : 3 === kuda ? "Level 3" : 4 === kuda ? "Level 4" : 5 === kuda ? "Level MAX" : ""}\n│🦊 *Rubah:* ${0 === rubah ? "❌" : 1 === rubah ? "Level 1" : 2 === rubah ? "Level 2" : 3 === rubah ? "Level 3" : 4 === rubah ? "Level 4" : 5 === rubah ? "Level MAX" : ""}\n│🐱 *Kucing:* ${0 === kucing ? "❌" : 1 === kucing ? "Level 1" : 2 === kucing ? "Level 2" : 3 === kucing ? "Level 3" : 4 === kucing ? "Level 4" : 5 === kucing ? "Level MAX" : ""}\n│🐉 *Naga:* ${0 === naga ? "❌" : 1 === naga ? "Level 1" : 2 === naga ? "Level 2" : 3 === naga ? "Level 3" : 4 === naga ? "Level 4" : 5 === naga ? "Level MAX" : ""}\n│🦜 *Phonix:* ${0 === phonix ? "❌" : 1 === phonix ? "Level 1" : 2 === phonix ? "Level 2" : 3 === phonix ? "Level 3" : 4 === phonix ? "Level 4" : 5 === phonix ? "Level MAX" : ""}\n│🐎 *Centaur:* ${0 === centaur ? "❌" : 1 === centaur ? "Level 1" : 2 === centaur ? "Level 2" : 3 === centaur ? "Level 3" : 4 === centaur ? "Level 4" : 5 === centaur ? "Level MAX" : ""}\n│🦅 *Griffin:* ${0 === griffin ? "❌" : 1 === griffin ? "Level 1" : 2 === griffin ? "Level 2" : 3 === griffin ? "Level 3" : 4 === griffin ? "Level 4" : 5 === griffin ? "Level MAX" : ""}\n│🐺 *Serigala:* ${0 === serigala ? "❌" : 1 === serigala ? "Level 1" : 2 === serigala ? "Level 2" : 3 === serigala ? "Level 3" : 4 === naga ? "Level 4" : 5 === serigala ? "Level MAX" : ""}\n╰──────────━⃝┅⃝━━────────┄⸙\n\n╭ ${htki} *PROGSES* ${htka}\n╰──┬─┄\n╭──┴─────────┄⸙\n╰┫ 📊 *Level:* ${level} ➠  ${level + 1}\n╭┫ ✨ *Exp:* ${exp} ➠ ${max}\n╰──┬─┄\n╭──┴─────────┄⸙\n╰┫🦊 *Rubah :* ${0 === rubah ? "❌" : rubah > 0 && rubah < 5 ? `Level *${rubah}* ➠ *${rubah + 1}*\n╭┫Exp *${_rubah}* -> *${100 * rubah}*` : 5 === rubah ? "*Max Level*" : ""}\n╰──┬─┄\n╭──┴─────────┄⸙\n╰┫🐱 *Kucing :* ${0 === kucing ? "❌" : kucing > 0 && kucing < 5 ? `Level *${kucing}* ➠ *${kucing + 1}*\n╭┫Exp *${_kucing}* -> *${100 * kucing}*` : 5 === kucing ? "*Max Level*" : ""}\n╰──┬─┄\n╭──┴─────────┄⸙\n╰┫🐴 *Kuda :* ${0 === kuda ? "❌" : kuda > 0 && kuda < 5 ? `Level *${kuda}* ➠ *${kuda + 1}*\n╭┫Exp *${_kuda}* -> *${100 * kuda}*` : 5 === kuda ? "*Max Level*" : ""}\n╰──┬─┄\n╭──┴─────────┄⸙\n╰┫🐉 *Naga :* ${0 === naga ? "❌" : naga > 0 && naga < 5 ? `Level *${naga}* ➠ *${naga + 1}*\n╭┫Exp *${_naga}* -> *${100 * naga}*` : 5 === naga ? "*Max Level*" : ""}\n╰──┬─┄\n╭──┴─────────┄⸙\n╰┫🦜 *Phonix :* ${0 === phonix ? "❌" : phonix > 0 && phonix < 5 ? `Level *${phonix}* ➠ *${phonix + 1}*\n╭┫Exp *${_phonix}* -> *${100 * phonix}*` : 5 === phonix ? "*Max Level*" : ""}\n╰──┬─┄\n╭──┴─────────┄⸙\n╰┫🐎 *Centaur :* ${0 === centaur ? "❌" : centaur > 0 && centaur < 5 ? `Level *${centaur}* ➠ *${centaur + 1}*\n╭┫Exp *${_centaur}* -> *${100 * centaur}*` : 5 === centaur ? "*Max Level*" : ""}\n╰──┬─┄\n╭──┴─────────┄⸙\n╰┫🦅 *Griffin :* ${0 === griffin ? "❌" : griffin > 0 && griffin < 5 ? `Level *${griffin}* ➠ *${griffin + 1}*\n╭┫Exp *${_griffin}* -> *${100 * griffin}*` : 5 === griffin ? "*Max Level*" : ""}\n╰──┬─┄\n╭──┴─────────┄⸙\n╰┫🐺 *Serigala :* ${0 === serigala ? "❌" : serigala > 0 && serigala < 5 ? `Level *${serigala}* ➠ *${serigala + 1}*\n╭┫Exp *${_serigala}* -> *${100 * serigala}*` : 5 === serigala ? "*Max Level*" : ""}\n╰────────────┄⸙\n\n╭──────━• *COOLDOWN*\n│ *🏹 Berburu :* ${lastberburu > 0 ? "❌" : "✅"}\n│ *⛰️ Adventure :* ${lastadventure > 0 ? "❌" : "✅"}\n│ *⚔️ Duel :* ${lastduel > 0 ? "❌" : "✅"}\n│ *🛡️ War :* ${lastwar > 0 ? "❌" : "✅"}\n│ *🎃 Dungeon :* ${lastdungeon > 0 ? "❌" : "✅"}\n│ *💱 Berdagang :* ${lastdagang > 0 ? "❌" : "✅"}\n│ *🧺 Berkebun :* ${lastberkebon > 0 ? "❌" : "✅"}\n│ *⛏️ Mining :* ${lastmining > 0 ? "❌" : "✅"}\n│ *🎣 Fishing :* ${lastfishing > 0 ? "❌" : "✅"}\n│ *💰 Bansos :* ${lastbansos > 0 ? "❌" : "✅"}\n│\n│ *🕐 Hourly :* ${lasthourly > 0 ? "❌" : "✅"}\n│ *📦 Claim :* ${lastclaim > 0 ? "❌" : "✅"}\n│ *🎁 Weekly :* ${lastweekly > 0 ? "❌" : "✅"}\n│ *📮 Monthly :* ${lastmonthly > 0 ? "❌" : "✅"}\n╰──────────━⃝┅⃝━━────────┄⸙\n\n╭──────━• *ACHIEVEMENT*\n│📊 *Top level:* ${userslevel.indexOf(m.sender) + 1} / ${userslevel.length}\n│💹 *Top Money:* ${usersmoney.indexOf(m.sender) + 1} / ${usersmoney.length}\n│🪙  *Top Gold:* ${usersgold.indexOf(m.sender) + 1} / ${usersgold.length}\n│💎 *Top Diamond:* ${usersdiamond.indexOf(m.sender) + 1} / ${usersdiamond.length}\n│🧭 *Top Arloji:* ${usersarlok.indexOf(m.sender) + 1} / ${usersarlok.length}\n│🥤 *Top Potion:* ${userspotion.indexOf(m.sender) + 1} / ${userspotion.length}\n│📦 *Top Common:* ${userscommon.indexOf(m.sender) + 1} / ${userscommon.length}\n│🛍️ *Top Uncommon:* ${usersuncommon.indexOf(m.sender) + 1} / ${usersuncommon.length}\n│🎁 *Top Mythic:* ${usersmythic.indexOf(m.sender) + 1} / ${usersmythic.length}\n│🧰 *Top Legendary:* ${userslegendary.indexOf(m.sender) + 1} / ${userslegendary.length}\n│🗑️ *Top Sampah:* ${userssampah.indexOf(m.sender) + 1} / ${userssampah.length}\n╰──────────━⃝┅⃝━━────────┄⸙\n`);
        try {
          await conn.sendFile(m.chat, topImg || imgr + "INVENTORY", "", str, m, null, {
            mentions: conn.parseMention(str)
          });
        } catch (error) {
          m.reply(str);
        }
      } else if ("4" === args[0]) {
        let health = db.data.users[m.sender].health,
          armor = db.data.users[m.sender].armor,
          pet = db.data.users[m.sender].pet,
          kucing = db.data.users[m.sender].kucing,
          _kucing = db.data.users[m.sender].anakkucing,
          rubah = db.data.users[m.sender].rubah,
          _rubah = db.data.users[m.sender].anakrubah,
          serigala = db.data.users[m.sender].serigala,
          _serigala = db.data.users[m.sender].anakserigala,
          naga = db.data.users[m.sender].naga,
          _naga = db.data.users[m.sender].anaknaga,
          kuda = db.data.users[m.sender].kuda,
          _kuda = db.data.users[m.sender].anakkuda,
          phonix = db.data.users[m.sender].phonix,
          _phonix = db.data.users[m.sender].anakphonix,
          griffin = db.data.users[m.sender].griffin,
          _griffin = db.data.users[m.sender].anakgriffin,
          kyubi = db.data.users[m.sender].kyubi,
          _kyubi = db.data.users[m.sender].anakkyubi,
          centaur = db.data.users[m.sender].centaur,
          _centaur = db.data.users[m.sender].anakcentaur,
          diamond = db.data.users[m.sender].diamond,
          potion = db.data.users[m.sender].potion,
          ramuan = db.data.users[m.sender].ramuan,
          common = db.data.users[m.sender].common,
          makananpet = db.data.users[m.sender].makananpet,
          makanannaga = db.data.users[m.sender].makanannaga,
          makananphonix = db.data.users[m.sender].makananphonix,
          makanangriffin = db.data.users[m.sender].makanangriffin,
          makanankyubi = db.data.users[m.sender].makanankyubi,
          makanancentaur = db.data.users[m.sender].makanancentaur,
          uncommon = db.data.users[m.sender].uncommon,
          mythic = db.data.users[m.sender].mythic,
          legendary = db.data.users[m.sender].legendary,
          level = db.data.users[m.sender].level,
          money = db.data.users[m.sender].money,
          exp = db.data.users[m.sender].exp,
          sampah = db.data.users[m.sender].sampah,
          anggur = db.data.users[m.sender].anggur,
          jeruk = db.data.users[m.sender].jeruk,
          apel = db.data.users[m.sender].apel,
          mangga = db.data.users[m.sender].mangga,
          pisang = db.data.users[m.sender].pisang,
          bibitanggur = db.data.users[m.sender].bibitanggur,
          bibitjeruk = db.data.users[m.sender].bibitjeruk,
          bibitapel = db.data.users[m.sender].bibitapel,
          bibitmangga = db.data.users[m.sender].bibitmangga,
          bibitpisang = db.data.users[m.sender].bibitpisang,
          gardenboxs = db.data.users[m.sender].gardenboxs,
          bank = (db.data.users[m.sender].nabung, db.data.users[m.sender].bank),
          limit = db.data.users[m.sender].limit,
          cupon = db.data.users[m.sender].cupon,
          tiketcoin = db.data.users[m.sender].tiketcoin,
          tiketm = db.data.users[m.sender].healtmonster,
          aqua = db.data.users[m.sender].aqua,
          expg = db.data.users[m.sender].expg,
          boxs = db.data.users[m.sender].boxs,
          botol = db.data.users[m.sender].botol,
          kayu = db.data.users[m.sender].kayu,
          batu = db.data.users[m.sender].batu,
          iron = db.data.users[m.sender].iron,
          sword = db.data.users[m.sender].sword,
          string = db.data.users[m.sender].string,
          kaleng = db.data.users[m.sender].kaleng,
          kardus = db.data.users[m.sender].kardus,
          berlian = db.data.users[m.sender].berlian,
          emas = db.data.users[m.sender].emas,
          hero = (db.data.users[m.sender].emasbatang, db.data.users[m.sender].hero),
          exphero = db.data.users[m.sender].exphero,
          {
            max
          } = xpRange(level, exp, multiplier),
          name = m.sender,
          sortedmoney = Object.entries(db.data.users).sort((a, b) => b[1].money - a[1].money),
          sortedlevel = Object.entries(db.data.users).sort((a, b) => b[1].level - a[1].level),
          sorteddiamond = Object.entries(db.data.users).sort((a, b) => b[1].diamond - a[1].diamond),
          sortedpotion = Object.entries(db.data.users).sort((a, b) => b[1].potion - a[1].potion),
          sortedsampah = Object.entries(db.data.users).sort((a, b) => b[1].sampah - a[1].sampah),
          sortedcommon = Object.entries(db.data.users).sort((a, b) => b[1].common - a[1].common),
          sorteduncommon = Object.entries(db.data.users).sort((a, b) => b[1].uncommon - a[1].uncommon),
          sortedmythic = Object.entries(db.data.users).sort((a, b) => b[1].mythic - a[1].mythic),
          sortedlegendary = Object.entries(db.data.users).sort((a, b) => b[1].legendary - a[1].legendary),
          usersmoney = sortedmoney.map(v => v[0]),
          usersdiamond = sorteddiamond.map(v => v[0]),
          userspotion = sortedpotion.map(v => v[0]),
          userssampah = sortedsampah.map(v => v[0]),
          userslevel = sortedlevel.map(v => v[0]),
          userscommon = sortedcommon.map(v => v[0]),
          usersuncommon = sorteduncommon.map(v => v[0]),
          usersmythic = sortedmythic.map(v => v[0]),
          userslegendary = sortedlegendary.map(v => v[0]),
          str = `\nInventory *${conn.getName(name)}*\n\nHealth: *${health}*\nArmor: *${0 === armor ? "Tidak Punya" : 1 === armor ? "Leather Armor" : 2 === armor ? "Iron Armor" : 3 === armor ? "Gold Armor" : 4 === armor ? "Diamond Armor" : 5 === armor ? "Netherite Armor" : ""}*\nMoney: *${money}*\nLimit: *${limit}*\nLevel: *${level}*\nExp: *${exp}*\nAtm: *${bank}*\nCupon: *${cupon}*\nExpg: *${expg}*\nTiketm: *${tiketm}*\nTiketcoin: *${tiketcoin}*\n\n*Inventory*\nPotion: *${potion}*\nRamuan: *${ramuan}*\nIron: *${iron}*\nString: *${string}*\nSword: *${sword}*\nSampah: *${sampah}*\nKayu: *${kayu}*\nBatu: *${batu}*\nAqua: *${aqua}*\nMakanan Pet: *${makananpet}*\nMakanan Phonix: *${makananphonix}*\nMakanan Naga: *${makanannaga}*\nMakanan Griffin: *${makanangriffin}*\nMakanan Kyubi: *${makanankyubi}*\nMakanan Centaur: *${makanancentaur}*\nTotal inv: *${diamond + potion + ramuan + sampah + kayu + sword + iron + string + makananpet + makananphonix + makanannaga + makanangriffin + makanankyubi + makanancentaur}* item\n\n*Crate*\nBoxs: *${boxs}*\nCommon: *${common}*\nUncommon: *${uncommon}*\nMythic: *${mythic}*\nLegendary: *${legendary}*.\nPet: *${pet}*\nGardenboxs: *${gardenboxs}*\n\n*Fruits*\nMangga: ${mangga}\nAnggur: ${anggur}\nPisang: ${pisang}\nJeruk: ${jeruk}\nApel: ${apel}\n\n*Seeds*\nBibit Mangga: ${bibitmangga}\nBibit Anggur: ${bibitanggur}\nBibit Pisang: ${bibitpisang}\nBibit Jeruk: ${bibitjeruk}\nBibit Apel: ${bibitapel}\n\n*Trash Man*\nKardus: ${kardus}\nKaleng: ${kaleng}\nBotol: ${botol}\n\n*Mining*\nBerlian: ${berlian}\nEmas: ${emas}\nDiamond: ${diamond}\n\n*Hero*\nMy Hero: *${0 === hero ? "Tidak Punya" : 1 === hero ? "Level 1" : 2 === hero ? "Level 2" : 3 === hero ? "Level 3" : 4 === hero ? "Level 4" : 5 === hero ? "Level 5" : 6 === hero ? "Level 6" : 7 === hero ? "Level 7" : 8 === hero ? "Level 8" : 9 === hero ? "Level 9" : 10 === hero ? "Level 10" : 11 === hero ? "Level 11" : 12 === hero ? "Level 12" : 13 === hero ? "Level 13" : 14 === hero ? "Level 14" : 15 === hero ? "Level 15" : 16 === hero ? "Level 16" : 17 === hero ? "Level 17" : 18 === hero ? "Level 18" : 19 === hero ? "Level 19" : 20 === hero ? "Level 20" : 21 === hero ? "Level 21" : 22 === hero ? "Level 22" : 23 === hero ? "Level 23" : 24 === hero ? "Level 24" : 25 === hero ? "Level 25" : 26 === hero ? "Level 26" : 27 === hero ? "Level 27" : 28 === hero ? "Level 28" : 29 === hero ? "Level 29" : 30 === hero ? "Level 30" : 31 === hero ? "Level 31" : 32 === hero ? "Level 32" : 33 === hero ? "Level 33" : 34 === hero ? "Level 34" : 35 === hero ? "Level 35" : 36 === hero ? "Level 36" : 37 === hero ? "Level 37" : 38 === hero ? "Level 38" : 39 === hero ? "Level 39" : 40 === hero ? "Level MAX" : ""}*\n\n*Pet*\nKucing: *${0 === kucing ? "Tidak Punya" : 1 === kucing ? "Level 1" : 2 === kucing ? "Level 2" : 3 === kucing ? "Level 3" : 4 === kucing ? "Level 4" : 5 === kucing ? "Level MAX" : ""}*\nKuda: *${0 === kuda ? "Tidak Punya" : 1 === kuda ? "Level 1" : 2 === kuda ? "Level 2" : 3 === kuda ? "Level 3" : 4 === kuda ? "Level 4" : 5 === kuda ? "Level MAX" : ""}*\nNaga: *${0 === naga ? "Tidak Punya" : 1 === naga ? "Level 1" : 2 === naga ? "Level 2" : 3 === naga ? "Level 3" : 4 === naga ? "Level 4" : 5 === naga ? "Level 5" : 6 === naga ? "Level 6" : 7 === naga ? "Level 7" : 8 === naga ? "Level 8" : 9 === naga ? "Level 9" : 10 === naga ? "Level 10" : 11 === naga ? "Level 11" : 12 === naga ? "Level 12" : 13 === naga ? "Level 13" : 14 === naga ? "Level 14" : 15 === naga ? "Level 15" : 16 === naga ? "Level 16" : 17 === naga ? "Level 17" : 18 === naga ? "Level 18" : 19 === naga ? "Level 19" : 20 === naga ? "Level MAX" : ""}*\nKyubi: *${0 === kyubi ? "Tidak Punya" : 1 === kyubi ? "Level 1" : 2 === kyubi ? "Level 2" : 3 === kyubi ? "Level 3" : 4 === kyubi ? "Level 4" : 5 === kyubi ? "Level 5" : 6 === kyubi ? "Level 6" : 7 === kyubi ? "Level 7" : 8 === kyubi ? "Level 8" : 9 === kyubi ? "Level 9" : 10 === kyubi ? "Level 10" : 11 === kyubi ? "Level 11" : 12 === kyubi ? "Level 12" : 13 === kyubi ? "Level 13" : 14 === kyubi ? "Level 14" : 15 === kyubi ? "Level 15" : 16 === kyubi ? "Level 16" : 17 === kyubi ? "Level 17" : 18 === kyubi ? "Level 18" : 19 === kyubi ? "Level 19" : 20 === kyubi ? "Level MAX" : ""}*\nCentaur: *${0 === centaur ? "Tidak Punya" : 1 === centaur ? "Level 1" : 2 === centaur ? "Level 2" : 3 === centaur ? "Level 3" : 4 === centaur ? "Level 4" : 5 === centaur ? "Level 5" : 6 === centaur ? "Level 6" : 7 === centaur ? "Level 7" : 8 === centaur ? "Level 8" : 9 === centaur ? "Level 9" : 10 === centaur ? "Level 10" : 11 === centaur ? "Level 11" : 12 === centaur ? "Level 12" : 13 === centaur ? "Level 13" : 14 === centaur ? "Level 14" : 15 === centaur ? "Level 15" : 16 === centaur ? "Level 16" : 17 === centaur ? "Level 17" : 18 === centaur ? "Level 18" : 19 === centaur ? "Level 19" : 20 === centaur ? "Level MAX" : ""}*\nRubah: *${0 === rubah ? "Tidak Punya" : 1 === rubah ? "Level 1" : 2 === rubah ? "Level 2" : 3 === rubah ? "Level 3" : 4 === rubah ? "Level 4" : 5 === rubah ? "Level MAX" : ""}*  \nPhonix: *${0 === phonix ? "Tidak Punya" : 1 === phonix ? "Level 1" : 2 === phonix ? "Level 2" : 3 === phonix ? "Level 3" : 4 === phonix ? "Level 4" : 5 === phonix ? "Level 5" : 6 === phonix ? "Level 6" : 7 === phonix ? "Level 7" : 8 === phonix ? "Level 8" : 9 === phonix ? "Level 9" : 10 === phonix ? "Level 10" : 11 === phonix ? "Level 11" : 12 === phonix ? "Level 12" : 13 === phonix ? "Level 13" : 14 === phonix ? "Level 14" : 15 === phonix ? "Level MAX" : ""}*\nGriffin: *${0 === griffin ? "Tidak Punya" : 1 === griffin ? "Level 1" : 2 === griffin ? "Level 2" : 3 === griffin ? "Level 3" : 4 === griffin ? "Level 4" : 5 === griffin ? "Level 5" : 6 === griffin ? "Level 6" : 7 === griffin ? "Level 7" : 8 === griffin ? "Level 8" : 9 === griffin ? "Level 9" : 10 === griffin ? "Level 10" : 11 === griffin ? "Level 11" : 12 === griffin ? "Level 12" : 13 === griffin ? "Level 13" : 14 === griffin ? "Level 14" : 15 === griffin ? "Level MAX" : ""}*\nSerigala: *${0 === serigala ? "Tidak Punya" : 1 === serigala ? "Level 1" : 2 === serigala ? "Level 2" : 3 === serigala ? "Level 3" : 4 === serigala ? "Level 4" : 5 === serigala ? "Level 5" : 6 === serigala ? "Level 6" : 7 === serigala ? "Level 7" : 8 === serigala ? "Level 8" : 9 === serigala ? "Level 9" : 10 === serigala ? "Level 10" : 11 === serigala ? "Level 11" : 12 === serigala ? "Level 12" : 13 === serigala ? "Level 13" : 14 === serigala ? "Level 14" : 15 === serigala ? "Level MAX" : ""}*\n\n\n╭ ${htki} *PROGSES* ${htka}\n╰──┬─┄\n╭──┴─────────┄⸙\n╰┫ Level *${level}* To Level *${level}*\n││ Exp *${exp}* -> *${max}*\n╭┫ ✨ *Exp:* ${exp} ➠ ${max}\n╰──┬─┄\n╭──┴─────────┄⸙\n╰┫Hero ${0 === hero ? "Tidak Punya" : hero > 0 && hero < 40 ? `Level *${hero}* To level *${hero + 1}*\n╭┫Exp *${exphero}* -> *${500 * hero}*` : 40 === hero ? "*Max Level*" : ""}\n╰──┬─┄\n╭──┴─────────┄⸙\n╰┫Rubah ${0 === rubah ? "Tidak Punya" : rubah > 0 && rubah < 5 ? `Level *${rubah}* To level *${rubah + 1}*\n╭┫Exp *${_rubah}* -> *${1e3 * rubah}*` : 5 === rubah ? "*Max Level*" : ""}\n╰──┬─┄\n╭──┴─────────┄⸙\n╰┫Kucing ${0 === kucing ? "Tidak Punya" : kucing > 0 && kucing < 5 ? `Level *${kucing}* To level *${kucing + 1}*\n╭┫Exp *${_kucing}* -> *${1e3 * kucing}*` : 5 === kucing ? "*Max Level*" : ""}\n╰──┬─┄\n╭──┴─────────┄⸙\n╰┫Kuda ${0 === kuda ? "Tidak Punya" : kuda > 0 && kuda < 5 ? `Level *${kuda}* To level *${kuda + 1}*\n╭┫Exp *${_kuda}* -> *${1e3 * kuda}*` : 5 === kuda ? "*Max Level*" : ""}\n╰──┬─┄\n╭──┴─────────┄⸙\n╰┫Naga ${0 === naga ? "Tidak Punya" : naga > 0 && naga < 20 ? `Level *${naga}* To level *${naga + 1}*\n╭┫Exp *${_naga}* -> *${1e4 * naga}*` : 20 === naga ? "*Max Level*" : ""}\n╰──┬─┄\n╭──┴─────────┄⸙\n╰┫Phonix ${0 === phonix ? "Tidak Punya" : phonix > 0 && phonix < 15 ? `Level *${phonix}* To level *${phonix + 1}*\n╭┫Exp *${_phonix}* -> *${1e4 * phonix}*` : 15 === phonix ? "*Max Level*" : ""}\n╰──┬─┄\n╭──┴─────────┄⸙\n╰┫Kyubi ${0 === kyubi ? "Tidak Punya" : kyubi > 0 && kyubi < 20 ? `Level *${kyubi}* To level *${kyubi + 1}*\n╭┫Exp *${_kyubi}* -> *${1e4 * kyubi}*` : 20 === kyubi ? "*Max Level*" : ""}\n╰──┬─┄\n╭──┴─────────┄⸙\n╰┫Centaur ${0 === centaur ? "Tidak Punya" : centaur > 0 && centaur < 20 ? `Level *${centaur}* To level *${centaur + 1}*\n╭┫Exp *${_centaur}* -> *${1e4 * centaur}*` : 20 === centaur ? "*Max Level*" : ""}\n╰──┬─┄\n╭──┴─────────┄⸙\n╰┫Griffin ${0 === griffin ? "Tidak Punya" : griffin > 0 && griffin < 15 ? `Level *${griffin}* To level *${griffin + 1}*\n╭┫Exp *${_griffin}* -> *${1e4 * griffin}*` : 15 === griffin ? "*Max Level*" : ""}\n╰──┬─┄\n╭──┴─────────┄⸙\n╰┫Serigala ${0 === serigala ? "Tidak Punya" : serigala > 0 && serigala < 15 ? `Level *${serigala}* To level *${serigala + 1}*\n╭┫Exp *${_serigala}* -> *${1e4 * serigala}*` : 15 === serigala ? "*Max Level*" : ""}\n╰────────────────\n\n\n*Achievement*\n1.Top level *${userslevel.indexOf(m.sender) + 1}* dari *${userslevel.length}*\n2.Top Money *${usersmoney.indexOf(m.sender) + 1}* dari *${usersmoney.length}*\n3.Top Diamond *${usersdiamond.indexOf(m.sender) + 1}* dari *${usersdiamond.length}*\n4.Top Potion *${userspotion.indexOf(m.sender) + 1}* dari *${userspotion.length}*\n5.Top Common *${userscommon.indexOf(m.sender) + 1}* dari *${userscommon.length}*\n6.Top Uncommon *${usersuncommon.indexOf(m.sender) + 1}* dari *${usersuncommon.length}*\n7.Top Mythic *${usersmythic.indexOf(m.sender) + 1}* dari *${usersmythic.length}*\n8.Top Legendary *${userslegendary.indexOf(m.sender) + 1}* dari *${userslegendary.length}*\n9.Top Sampah *${userssampah.indexOf(m.sender) + 1}* dari *${userssampah.length}*\n\n${readMore}\n`.trim();
        try {
          await conn.sendFile(m.chat, topImg || imgr + "INVENTORY", "", str, m, null, {
            mentions: conn.parseMention(str)
          });
        } catch (error) {
          m.reply(str);
        }
      } else if ("5" === args[0]) {
        let paus = db.data.users[m.sender].paus,
          kepiting = db.data.users[m.sender].kepiting,
          gurita = db.data.users[m.sender].gurita,
          cumi = db.data.users[m.sender].cumi,
          buntal = db.data.users[m.sender].buntal,
          dory = db.data.users[m.sender].dory,
          lumba = db.data.users[m.sender].lumba,
          lobster = db.data.users[m.sender].lobster,
          hiu = db.data.users[m.sender].hiu,
          udang = db.data.users[m.sender].udang,
          ikan = db.data.users[m.sender].ikan,
          orca = db.data.users[m.sender].orca,
          pancingan = db.data.users[m.sender].pancingan,
          _pancingan = db.data.users[m.sender].anakpancingan,
          aineh = `\n*Fish Pond*\nHiu: ${hiu}\nIkan: ${ikan}\nDory: ${dory}\nOrca: ${orca}\nPaus: ${paus}\nCumi: ${cumi}\nGurita: ${gurita}\nBuntal: ${buntal}\nUdang: ${udang}\nLumba²: ${lumba}\nLobster: ${lobster}\nKepiting: ${kepiting}\n\n*Level Pancingan:*\nPancingan: *${0 === pancingan ? "Tidak Punya" : 1 === pancingan ? "Level 1" : 2 === pancingan ? "Level 2" : 3 === pancingan ? "Level 3" : 4 === pancingan ? "Level 4" : 5 === pancingan ? "Level MAX" : ""}*\n\n╭────────────────\n╰┫pancingan ${0 === pancingan ? "Tidak Punya" : pancingan > 0 && pancingan < 5 ? `Level *${pancingan}* To level *${pancingan + 1}*\n╭┫Exp *${_pancingan}* -> *${1e4 * pancingan}*` : 5 === pancingan ? "*Max Level*" : ""}\n╰────────────────\n`.trim();
        try {
          await conn.sendFile(m.chat, topImg || imgr + "INVENTORY", "", aineh, m, null, {
            mentions: conn.parseMention(aineh)
          });
        } catch (error) {
          m.reply(aineh);
        }
      }
    }
  };
handler.help = ["inventory", "inv"], handler.tags = ["rpg"], handler.command = /^(inv(entory)?|bal(ance)?|money|e?xp)$/i;
export default handler;
const more = String.fromCharCode(8206),
  readMore = more.repeat(4201);