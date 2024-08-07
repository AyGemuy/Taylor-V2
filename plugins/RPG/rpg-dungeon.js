const handler = async (m, {
  conn,
  usedPrefix,
  command,
  text
}) => {
  let user = db.data.users[m.sender],
    SWORD = user.sword < 1,
    ARMOR = user.armor < 1,
    HEALT = user.healt < 90,
    prefix = usedPrefix;
  if (SWORD || ARMOR || HEALT) {
    console.log({
      SWORD: SWORD,
      ARMOR: ARMOR,
      HEALT: HEALT
    });
    let message = item(1 * user.sword, 1 * user.armor, 1 * user.healt, usedPrefix) + "\n\n";
    return SWORD && (message += `${prefix}craft sword - Craft Sword\n`), ARMOR && (message += `${prefix}shop buy armor - Beli Armor\n`),
      HEALT && (message += `${prefix}heal - Healing\n`), message += "\n", conn.sendMessage(m.chat, {
        text: message
      }, {
        quoted: m
      });
  }
  if (conn.dungeon = conn.dungeon ? conn.dungeon : {}, Object.values(conn.dungeon).find(room => room.id.startsWith("dungeon") && [room.game.player1, room.game.player2, room.game.player3, room.game.player4].includes(m.sender))) return m.reply("Kamu masih di dalam Dungeon");
  let timing = 1 * (new Date() - 1 * user.lastdungeon);
  if (timing < 6e5) return m.reply(`Silahkan tunggu ${clockString(6e5 - timing)} untuk bisa ke Dungeon`);
  let room = Object.values(conn.dungeon).find(room => "WAITING" === room.state && (!text || room.name === text));
  if (room) {
    let p1 = room.game.player1 || "",
      p2 = room.game.player2 || "",
      p3 = room.game.player3 || "",
      p4 = room.game.player4 || "",
      c1 = room.player1 || "",
      c2 = room.player2 || "",
      c3 = room.player3 || "",
      c4 = room.player4 || "";
    p2 ? p3 ? p4 || (room.player4 = m.chat, room.game.player4 = m.sender, room.state = "PLAYING") : (room.player3 = m.chat, room.game.player3 = m.sender) : (room.player2 = m.chat, room.game.player2 = m.sender);
    let cmdText = "\nCommand: " + (room.name ? `*${usedPrefix}${command} ${room.name}*` : ""),
      lmao = "" + (room.game.player4 ? "Semua partner telah lengkap..." : `Menunggu ${room.game.player3 || room.game.player4 ? "1" : "2"} Partner lagi...`) + cmdText;
    if (m.reply(lmao), room.game.player1 && room.game.player2 && room.game.player3 && room.game.player4) {
      room.price.money += 1 * Math.floor(201 * Math.random()), room.price.exp += 1 * Math.floor(401 * Math.random()),
        room.price.iron += 1 * pickRandom([0, 0, 0, 0, 1, 0, 0, 0]), room.game.diamond += 1 * pickRandom([0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0]),
        room.game.sampah += 1 * Math.floor(101 * Math.random()), room.price.string += 1 * Math.floor(2 * Math.random()),
        room.price.kayu += 1 * Math.floor(2 * Math.random()), room.price.batu += 1 * Math.floor(2 * Math.random()),
        room.game.makananPet += 1 * pickRandom([0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0]),
        room.game.common += 1 * pickRandom([0, 0, 0, 1, 0, 0, 0, 0, 0, 0]), room.game.uncommon += 1 * pickRandom([0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0]);
      let str = `\nRoom ID: ${room.id}\n\n${M(p1)}, ${M(p2)}, ${M(p3)} dan ${M(p4)}\n\nSedang berperang di dungeon...\n`;
      m.reply(str, c1, {
        contextInfo: {
          mentionedJid: conn.parseMention(str)
        }
      }), [c1, c3, c4].includes(c2) || m.reply(str, c2, {
        contextInfo: {
          mentionedJid: conn.parseMention(str)
        }
      }), [c1, c2, c4].includes(c3) || m.reply(str, c3, {
        contextInfo: {
          mentionedJid: conn.parseMention(str)
        }
      }), [c1, c2, c3].includes(c4) || m.reply(str, c4, {
        contextInfo: {
          mentionedJid: conn.parseMention(str)
        }
      }), setTimeout(async () => {
        let users = db.data.users[m.sender],
          player = [p1, p2, p3, p4],
          {
            healt,
            sword
          } = room.less,
          {
            exp,
            money,
            sampah,
            potion,
            diamond,
            iron,
            kayu,
            batu,
            string,
            common,
            uncommon,
            mythic,
            legendary,
            pet,
            makananPet
          } = room.price,
          str2 = `\n❤️Nyawa *${M(p1)}*, *${M(p2)}*, *${M(p3)}* dan *${M(p4)}* masing masing berkurang *-${1 * healt}*, dan durability ⚔️Sword kalian masing masing berkurang *-${1 * sword}* karena kalian telah membunuh *${pickRandom([ "Ender Dragon", "Baby Dragon", "Titan", "Cacing dan Semut", "PP Mikey", "Orang", "Kecoa", "Semut", "Siput", "....🗿", "Wither", "Sekeleton", "Ayam Emas", "Temenmu", "Sapi", "Tidak Ada", "Creeper", "Zombie", "Hewan Pelihraanmu", "Diri Sendiri" ])}* dan mendapatkan total\n*✉️exp:* ${4 * exp}\n*💵uang:* ${4 * money}\n*🗑️sampah:* ${4 * sampah}${0 === potion ? "" : "\n*🥤Potion:* " + 4 * potion}${0 === makananPet ? "" : "\n*🍖Makanan Pet* " + 4 * makananPet}${0 === kayu ? "" : "\n*🪵Kayu:* " + 4 * kayu}${0 === batu ? "" : "\n*🪨Batu:* " + 4 * batu}${0 === string ? "" : "\n*🕸️String:* " + 4 * string}${0 === iron ? "" : "\n*⛓️Iron:* " + 4 * iron}${0 === diamond ? "" : "\n*💎diamond:* " + 4 * diamond}${0 === common ? "" : "\n*📦common crate:* " + 4 * common}${0 === uncommon ? "" : "\n*📦uncommon crate:* " + 4 * uncommon}\n             `;
        for (let i = 0; i < player.length; i++) {
          let p = player[i];
          setTimeout(() => {
            users[p].healt -= 1 * healt, users[p].sworddurability -= 1 * sword, users[p].money += 1 * money,
              users[p].exp += 1 * exp, users[p].sampah += 1 * sampah, users[p].potion += 1 * potion,
              users[p].diamond += 1 * diamond, users[p].iron += 1 * iron, users[p].kayu += 1 * kayu,
              users[p].batu += 1 * batu, users[p].string += 1 * string, users[p].common += 1 * common,
              users[p].uncommon += 1 * uncommon, users[p].mythic += 1 * mythic, users[p].legendary += 1 * legendary,
              users[p].pet += 1 * pet, users[p].makananpet += 1 * makananPet, users[p].lastdungeon = 1 * new Date(),
              1 * users[p].healt < 1 && (users[p].healt = 0), 1 * users[p].sworddurability < 1 && (users[p].sword -= 1, users[p].sworddurability = 1 * users[p].sword * 50);
          }, 1 * i * 1500);
        }
        if (m.reply(str2, c1, {
            contextInfo: {
              mentionedJid: conn.parseMention(str2)
            }
          }), [c1, c3, c4].includes(c2) || m.reply(str2, c2, {
            contextInfo: {
              mentionedJid: conn.parseMention(str2)
            }
          }), [c1, c2, c4].includes(c3) || m.reply(str2, c3, {
            contextInfo: {
              mentionedJid: conn.parseMention(str2)
            }
          }), [c1, c2, c3].includes(c4) || m.reply(str2, c4, {
            contextInfo: {
              mentionedJid: conn.parseMention(st2)
            }
          }), mythic > 0) {
          let str3 = "Selamat " + M(p1) + ", " + M(p2) + ", " + M(p3) + " dan " + M(p4) + " kalian mendapatkan item Rare Total *" + 4 * mythic + "* 📦Mythic Crate";
          m.reply(str3, c1, {
            contextInfo: {
              mentionedJid: conn.parseMention(str3)
            }
          }), [c1, c3, c4].includes(c2) || m.reply(str3, c2, {
            contextInfo: {
              mentionedJid: conn.parseMention(str3)
            }
          }), [c1, c2, c4].includes(c3) || m.reply(str3, c3, {
            contextInfo: {
              mentionedJid: conn.parseMention(str3)
            }
          }), [c1, c2, c3].includes(c4) || m.reply(str3, c4, {
            contextInfo: {
              mentionedJid: conn.parseMention(str3)
            }
          });
        }
        if (legendary > 0 || pet > 0) {
          let str3 = (mythic > 0 ? "Dan juga" : "Selamat " + M(p1) + ", " + M(p2) + ", " + M(p3) + " dan " + M(p4) + " kalian") + " mendapatkan item Epic Total " + (pet > 0 && legendary > 0 ? `*${4 * legendary}* 🎁Legendary Crate dan *${4 * pet}* 📦Pet Crate` : pet > 0 && legendary < 1 ? `*${4 * pet}* 📦Pet Crate` : legendary > 0 && pet < 1 ? `*${4 * legendary}* 🎁Legendary Crate` : "");
          m.reply(str3, c1, {
            contextInfo: {
              mentionedJid: conn.parseMention(str3)
            }
          }), [c1, c3, c4].includes(c2) || m.reply(str3, c2, {
            contextInfo: {
              mentionedJid: conn.parseMention(str3)
            }
          }), [c1, c2, c4].includes(c3) || m.reply(str3, c3, {
            contextInfo: {
              mentionedJid: conn.parseMention(str3)
            }
          }), [c1, c2, c3].includes(c4) || m.reply(str3, c4, {
            contextInfo: {
              mentionedJid: conn.parseMention(str3)
            }
          });
        }
        let _1 = users[p1],
          _2 = users[p2],
          _3 = users[p3],
          _4 = users[p4],
          _H1 = 1 * _1.healt,
          _H2 = 1 * _2.healt,
          _H3 = 1 * _3.healt,
          _H4 = 1 * _4.healt,
          _sd1 = 1 * _1.sworddurability,
          _sd2 = 1 * _2.sworddurability,
          _sd3 = 1 * _3.sworddurability,
          _sd4 = 1 * _4.sworddurability;
        if ((_H1 || _H2 || _H3 || _H4 || _sd1 || _sd2 || _sd3 || _sd4) < 1) {
          let HEALT = [],
            SDH = [],
            SDM1L = [];
          for (let siapa in player) 1 * users[siapa].healt < 1 && HEALT.push(siapa), 1 * users[siapa].sworddurability < 1 && 1 * users[siapa].sword == 1 && SDH.push(siapa),
            1 * users[siapa].sworddurability < 1 && 1 * users[siapa].sword != 1 && SDM1L.push(siapa);
          let sI = data(SDH),
            sH = data(SDM1L),
            H = data(HEALT),
            str3 = `${SDH || SDH.length > 0 || SDM1L || SDM1L.length > 0 ? "⚔️Sword " + ((SDH || SDH.length > 0 ? sI + " Hancur, silahkan crafting ⚔️Sword kembali dengan mengetik *" + usedPrefix + "craft sword*" : "") + (SDM1L || SDM1L.length > 0 ? (SDH || SDH.length > 0 ? ", Sedangkan ⚔️Sword " : "") + sH + " Hancur, dan Menurun *1* Level" : "")) : ""}${HEALT || healt.length > 0 ? `❤️Nyawa ${H} habis, silahkan isi ❤️Nyawa dengan mengetik ${usedPrefix}heal` : ""}`;
          m.reply(str3, c1, {
            contextInfo: {
              mentionedJid: conn.parseMention(str3)
            }
          }), [c1, c3, c4].includes(c2) || m.reply(str3, c2, {
            contextInfo: {
              mentionedJid: conn.parseMention(str3)
            }
          }), [c1, c2, c4].includes(c3) || m.reply(str3, c3, {
            contextInfo: {
              mentionedJid: conn.parseMention(str3)
            }
          }), [c1, c2, c3].includes(c4) || m.reply(str3, c4, {
            contextInfo: {
              mentionedJid: conn.parseMention(str3)
            }
          });
        }
        delete conn.dungeon[room.id];
      }, pickRandom([1e3, 2e3, 3e3, 4e3, 5e3, 6e3, 7e3, 8e3, 9e3, 1e4, 11e3])), conn.dungeon && "PLAYING" === room.state && delete conn.dungeon[room.id];
    }
  } else {
    room = {
      id: "dungeon-" + +new Date(),
      player1: m.chat,
      player2: "",
      player3: "",
      player4: "",
      state: "WAITING",
      game: {
        player1: m.sender,
        player2: "",
        player3: "",
        player4: ""
      },
      price: {
        money: 1 * Math.floor(501 * Math.random()),
        exp: 1 * Math.floor(701 * Math.random()),
        sampah: 1 * Math.floor(201 * Math.random()),
        potion: 1 * Math.floor(2 * Math.random()),
        diamond: 1 * pickRandom([0, 0, 0, 0, 1, 0, 0]),
        iron: 1 * Math.floor(2 * Math.random()),
        kayu: 1 * Math.floor(3 * Math.random()),
        batu: 1 * Math.floor(2 * Math.random()),
        string: 1 * Math.floor(2 * Math.random()),
        common: 1 * pickRandom([0, 0, 0, 1, 0, 0]),
        uncommon: 1 * pickRandom([0, 0, 0, 1, 0, 0, 0]),
        mythic: 1 * pickRandom([0, 0, 0, 1, 0, 0, 0, 0, 0]),
        legendary: 1 * pickRandom([0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0]),
        pet: 1 * pickRandom([0, 0, 0, 1, 0, 0, 0, 0, 0, 0]),
        makananPet: 1 * pickRandom([0, 0, 0, 1, 0, 0, 0, 0])
      },
      less: {
        healt: 1 * Math.floor(101 * Math.random()),
        sword: 1 * Math.floor(50 * Math.random())
      }
    }, text && (room.name = text);
    let textMessage = "Menunggu partner " + (text ? `mengetik command dibawah ini\n${usedPrefix}${command} ${text}` : "") + "\natau ketik *sendiri* untuk bermain sendiri";
    m.reply(textMessage), conn.dungeon[room.id] = room;
  }
};
handler.before = async (m, {
    conn
  }) => {
    conn.dungeon = conn.dungeon ? conn.dungeon : {};
    let room = Object.values(conn.dungeon).find(room => room.id.startsWith("dungeon-") && [room.game.player1, room.game.player2, room.game.player3, room.game.player4].includes(m.sender) && "WAITING" === room.state);
    if (room) {
      let p1 = room.game.player1 || "",
        p2 = room.game.player2 || "",
        p3 = room.game.player3 || "",
        p4 = room.game.player4 || "",
        c1 = room.player1 || "",
        c2 = room.player2 || "",
        c3 = room.player3 || "",
        c4 = room.player4 || "",
        PLAYER = [room.game.player1];
      room.game.player2 && PLAYER.push(room.game.player2), room.game.player3 && PLAYER.push(room.game.player3),
        room.game.player4 && PLAYER.push(room.game.player4);
      let P = data(PLAYER);
      if (/^(sendiri|dewean|solo)$/i.test(m.text.toLowerCase())) {
        let textMessage = "Kamu tidak bisa bermain sendiri karena memiliki partner. Silahkan ketik *gass* untuk bermain dengan partner lainnya...";
        if (room.player2 || room.player3 || room.player4) return m.reply(textMessage);
        room.state = "PLAYING";
        let str = `\nRoom ID: ${room.id}\n\n${P}\n\nSedang berperang di dungeon...\n`;
        m.reply(str, room.player1, {
          contextInfo: {
            mentionedJid: conn.parseMention(str)
          }
        }), setTimeout(async () => {
          let users = db.data.users[p1],
            {
              healt,
              sword
            } = room.less,
            {
              exp,
              money,
              sampah,
              potion,
              diamond,
              iron,
              kayu,
              batu,
              string,
              common,
              uncommon,
              mythic,
              legendary,
              pet,
              makananPet
            } = room.price,
            str2 = `\n❤️Nyawa Kamu berkurang -${1 * healt}, dan durability ⚔️Sword Kamu -${1 * sword} karena kamu telah Membunuh ${pickRandom([ "Ender Dragon", "Baby Dragon", "Titan", "Cacing dan Semut", "PP Mikey", "Orang", "Kecoa", "Semut", "Siput", "....🗿", "Wither", "Sekeleton", "Ayam Emas", "Temenmu", "Sapi", "Tidak Ada", "Creeper", "Zombie", "Hewan Pelihraanmu", "Diri Sendiri" ])} dan mendapatkan\n*✉️exp:* ${exp}\n*💵uang:* ${money}\n*🗑️sampah:* ${sampah}${0 === potion ? "" : "\n*🥤Potion:* " + potion}${0 === makananPet ? "" : "\n*🍖Makanan Pet* " + 1 * makananPet}${0 === kayu ? "" : "\n*🪵Kayu:* " + kayu}${0 === batu ? "" : "\n*🪨Batu:* " + batu}${0 === string ? "" : "\n*🕸️String:* " + string}${0 === iron ? "" : "\n*⛓️Iron:* " + iron}${0 === diamond ? "" : "\n*💎diamond:* " + diamond}${0 === common ? "" : "\n*📦common crate:* " + common}${0 === uncommon ? "" : "\n*📦uncommon crate:* " + uncommon}\n`;
          if (users.healt -= 1 * healt, users.sworddurability -= 1 * sword, users.money += 1 * money, users.exp += 1 * exp, users.sampah += 1 * sampah, users.potion += 1 * potion, users.diamond += 1 * diamond, users.iron += 1 * iron, users.kayu += 1 * kayu, users.batu += 1 * batu, users.string += 1 * string, users.common += 1 * common, users.uncommon += 1 * uncommon, users.mythic += 1 * mythic, users.legendary += 1 * legendary, users.pet += 1 * pet, users.makananpet += 1 * makananPet, users.lastdungeon = 1 * new Date(), m.reply(str2, room.player1), mythic > 0) {
            let str3 = "Selamat Kamu Mendapatkan item Rare yaitu *" + mythic + "* 📦Mythic Crate";
            m.reply(str3, room.player1);
          }
          if (legendary > 0 || pet > 0) {
            let str3 = (mythic > 0 ? "Dan juga" : "Selamat Kamu") + " mendapatkan item Epic yaitu " + (pet > 0 && legendary > 0 ? `*${legendary}* 🎁Legendary Crate dan *${pet}* 📦Pet Crate` : pet > 0 && legendary < 1 ? `*${pet}* 📦Pet Crate` : legendary > 0 && pet < 1 ? `*${legendary}* 🎁Legendary Crate` : "");
            m.reply(str3, room.player1);
          }
          if (1 * users.healt < 1 || 1 * users.sworddurability < 1) {
            1 * users.sworddurability < 1 && users.sword;
            let _sword1 = 1 * users.sworddurability < 1 && 1 * users.sword > 1,
              __sword1 = 1 * users.sworddurability < 1 && 1 * users.sword > 0,
              healt1 = 1 * users.healt < 1;
            __sword1 && (users[p1].sword -= 1, users[p1].sworddurability = 0);
            let str3 = `${__sword1 ? `⚔️Sword Kamu ${_sword1 ? " Level nya berkurang 1 karena hancur" : ` Hancur, dan silahkan crafting ⚔️Sword kembali dengan mengetik ${usedPrefix}`}craft sword` : ""} ${healt1 ? `${__sword1 ? "Dan " : ""}❤️Nyawa Kamu habis, silahkan isi kembali dengan ketik ${usedPrefix}heal` : ""}`;
            m.reply(str3, room.player1, {
              contextInfo: {
                mentionedJid: conn.parseMention(str3)
              }
            });
          }
          delete conn.dungeon[room.id];
        }, pickRandom([1e3, 2e3, 3e3, 4e3, 5e3, 6e3, 7e3, 8e3, 9e3, 1e4, 11e3])), conn.dungeon && "PLAYING" === room.state && delete conn.dungeon[room.id];
      } else if (/^(gass?s?s?s?.?.?.?|mulai|los?s?s?.?.?.?)$/i.test(m.text.toLowerCase())) {
        let str = `\nRoom ID: ${room.id}\n\n${P}\n\nSedang berperang di dungeon...\n`;
        m.reply(str, c1, {
          contextInfo: {
            mentionedJid: conn.parseMention(str)
          }
        }), c2 && ![c1, c3, c4].includes(c2) && m.reply(str, c2, {
          contextInfo: {
            mentionedJid: conn.parseMention(str)
          }
        }), c3 && ![c1, c2, c4].includes(c3) && m.reply(str, c3, {
          contextInfo: {
            mentionedJid: conn.parseMention(str)
          }
        }), c4 && ![c1, c2, c3].includes(c4) && m.reply(str, c4, {
          contextInfo: {
            mentionedJid: conn.parseMention(str)
          }
        });
        for (let _p of PLAYER) room.price.money += 1 * Math.floor(41 * Math.random()), room.price.exp += 1 * Math.floor(76 * Math.random()),
          room.game.sampah += 1 * Math.floor(16 * Math.random()), room.price.string += 1 * pickRandom([0, 0, 0, 1, 0, 0, 0, 0, 0, 0]),
          room.price.kayu += 1 * pickRandom([0, 0, 0, 1, 0, 0, 0, 0, 0, 0]), room.price.batu += 1 * pickRandom([0, 0, 0, 1, 0, 0, 0, 0, 0, 0]),
          room.game.common += 1 * pickRandom([0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0]);
        let users = db.data.users[m.sender],
          orang = PLAYER.length,
          {
            healt,
            sword
          } = room.less,
          {
            exp,
            money,
            sampah,
            potion,
            diamond,
            iron,
            kayu,
            batu,
            string,
            common,
            uncommon,
            mythic,
            legendary,
            pet,
            makananPet
          } = room.price;
        setTimeout(async () => {
          let str2 = `\n❤️Nyawa ${P} masing masing berkurang *-${1 * healt}*, dan durability ⚔️Sword kalian masing masing berkurang *-${1 * sword}* karena kalian telah membunuh *${pickRandom([ "Ender Dragon", "Baby Dragon", "Titan", "Cacing dan Semut", "PP Mikey", "Orang", "Kecoa", "Semut", "Siput", "....🗿", "Wither", "Sekeleton", "Ayam Emas", "Temenmu", "Sapi", "Tidak Ada", "Creeper", "Zombie", "Hewan Pelihraanmu", "Diri Sendiri" ])}* dan mendapatkan total\n*✉️exp:* ${exp * orang}\n*💵uang:* ${money * orang}\n*🗑️sampah:* ${sampah * orang}${0 === potion ? "" : "\n*🥤Potion:* " + potion * orang}${0 === makananPet ? "" : "\n*🍖Makanan Pet* " + makananPet * orang}${0 === kayu ? "" : "\n*🪵Kayu:* " + kayu * orang}${0 === batu ? "" : "\n*🪨Batu:* " + batu * orang}${0 === string ? "" : "\n*🕸️String:* " + string * orang}${0 === iron ? "" : "\n*⛓️Iron:* " + iron * orang}${0 === diamond ? "" : "\n*💎diamond:* " + diamond * orang}${0 === common ? "" : "\n*📦common crate:* " + common * orang}${0 === uncommon ? "" : "\n*📦uncommon crate:* " + uncommon * orang}\n`;
          m.reply(str2, c1, {
            contextInfo: {
              mentionedJid: conn.parseMention(str2)
            }
          }), c2 && ![c1, c3, c4].includes(c2) && m.reply(str2, c2, {
            contextInfo: {
              mentionedJid: conn.parseMention(str2)
            }
          }), c3 && ![c1, c2, c4].includes(c3) && m.reply(str2, c3, {
            contextInfo: {
              mentionedJid: conn.parseMention(str2)
            }
          }), c4 && ![c1, c2, c3].includes(c4) && m.reply(str2, c4, {
            contextInfo: {
              mentionedJid: conn.parseMention(str2)
            }
          });
        }, pickRandom([1e3, 2e3, 3e3, 4e3, 5e3, 6e3, 7e3, 8e3, 9e3, 1e4, 11e3]));
        for (let i = 0; i < PLAYER.length; i++) {
          let p = PLAYER[i];
          setTimeout(() => {
            users[p].healt -= 1 * healt, users[p].sworddurability -= 1 * sword, users[p].money += 1 * money,
              users[p].exp += 1 * exp, users[p].sampah += 1 * sampah, users[p].potion += 1 * potion,
              users[p].diamond += 1 * diamond, users[p].iron += 1 * iron, users[p].kayu += 1 * kayu,
              users[p].batu += 1 * batu, users[p].string += 1 * string, users[p].common += 1 * common,
              users[p].uncommon += 1 * uncommon, users[p].mythic += 1 * mythic, users[p].legendary += 1 * legendary,
              users[p].pet += 1 * pet, users[p].makananpet += 1 * makananPet, users[p].lastdungeon = 1 * new Date(),
              1 * users[p].healt < 1 && (users[p].healt = 0), 1 * users[p].sworddurability < 1 && (users[p].sword -= 1, users[p].sworddurability = 1 * users[p].sword * 50);
          }, 1500 * i);
        }
        if (mythic > 0) {
          let str3 = "Selamat " + P + " kalian mendapatkan item Rare Total *" + mythic * orang + "* 📦Mythic Crate";
          m.reply(str3, c1, {
            contextInfo: {
              mentionedJid: conn.parseMention(str3)
            }
          }), c2 && ![c1, c3, c4].includes(c2) && m.reply(str3, c2, {
            contextInfo: {
              mentionedJid: conn.parseMention(str3)
            }
          }), c3 && ![c1, c2, c4].includes(c3) && m.reply(str3, c3, {
            contextInfo: {
              mentionedJid: conn.parseMention(str3)
            }
          }), c4 && ![c1, c2, c3].includes(c4) && m.reply(str3, c4, {
            contextInfo: {
              mentionedJid: conn.parseMention(str3)
            }
          });
        }
        if (legendary > 0 || pet > 0) {
          let str3 = (mythic > 0 ? "Dan juga" : "Selamat " + P + " kalian") + " mendapatkan item Epic Total " + (pet > 0 && legendary > 0 ? `*${legendary * orang}* 🎁Legendary Crate dan *${pet * orang}* 📦Pet Crate` : pet > 0 && legendary < 1 ? `*${pet * orang}* 📦Pet Crate` : legendary > 0 && pet < 1 ? `*${legendary * orang}* 🎁Legendary Crate` : "");
          m.reply(str3, c1, {
            contextInfo: {
              mentionedJid: conn.parseMention(str3)
            }
          }), c2 && ![c1, c3, c4].includes(c2) && m.reply(str3, c2, {
            contextInfo: {
              mentionedJid: conn.parseMention(str3)
            }
          }), c3 && ![c1, c2, c4].includes(c3) && m.reply(str3, c3, {
            contextInfo: {
              mentionedJid: conn.parseMention(str3)
            }
          }), c4 && ![c1, c2, c3].includes(c4) && m.reply(str3, c4, {
            contextInfo: {
              mentionedJid: conn.parseMention(str3)
            }
          });
        }
        let _1 = users && p1 && users[p1] ? users[p1] : {},
          _2 = users && p2 && users[p2] ? users[p2] : {},
          _3 = users && p3 && users[p3] ? users[p3] : {},
          _4 = users && p4 && users[p4] ? users[p4] : {},
          _H1 = _1 && _1.healt ? 1 * _1.healt : 100,
          _H2 = _2 && _2.healt ? 1 * _2.healt : 100,
          _H3 = _3 && _3.healt ? 1 * _3.healt : 100,
          _H4 = _4 && _4.healt ? 1 * _4.healt : 100,
          _sd1 = _1 && _1.sworddurability ? 1 * _1.sworddurability : 100,
          _sd2 = _2 && _2.sworddurability ? 1 * _2.sworddurability : 100,
          _sd3 = _3 && _3.sworddurability ? 1 * _3.sworddurability : 100,
          _sd4 = _4 && _4.sworddurability ? 1 * _4.sworddurability : 100;
        if ((_H1 || _H2 || _H3 || _H4 || _sd1 || _sd2 || _sd3 || _sd4) < 1) {
          let HEALT = [],
            SDH = [],
            SDM1L = [];
          for (let siapa in PLAYER) 1 * users[siapa].healt < 1 && HEALT.push(siapa), 1 * users[siapa].sworddurability < 1 && 1 * users[siapa].sword == 1 && SDH.push(siapa),
            1 * users[siapa].sworddurability < 1 && 1 * users[siapa].sword != 1 && SDM1L.push(siapa);
          let sI = data(SDH),
            sH = data(SDM1L),
            H = data(HEALT),
            str3 = `${SDH || SDH.length > 0 || SDM1L || SDM1L.length > 0 ? "⚔️Sword " + ((SDH || SDH.length > 0 ? sI + " Hancur, silahkan crafting ⚔️Sword kembali dengan mengetik *" + usedPrefix + "craft sword*" : "") + (SDM1L || SDM1L.length > 0 ? (SDH || SDH.length > 0 ? ", Sedangkan ⚔️Sword " : "") + sH + " Hancur, dan Menurun *1* Level" : "")) : ""}${HEALT || HEALT.length > 0 ? `❤️Nyawa ${H} habis, silahkan isi ❤️Nyawa dengan mengetik ${usedPrefix}heal` : ""}`;
          m.reply(str3, c1, {
            contextInfo: {
              mentionedJid: conn.parseMention(str3)
            }
          }), c2 && ![c1, c3, c4].includes(c2) && m.reply(str3, c2, {
            contextInfo: {
              mentionedJid: conn.parseMention(str3)
            }
          }), c3 && ![c1, c2, c4].includes(c3) && m.reply(str3, c3, {
            contextInfo: {
              mentionedJid: conn.parseMention(str3)
            }
          }), c4 && ![c1, c2, c3].includes(c4) && m.reply(str3, c4, {
            contextInfo: {
              mentionedJid: conn.parseMention(str3)
            }
          });
        }
        delete conn.dungeon[room.id];
      }
      conn.dungeon && "PLAYING" === room.state && delete conn.dungeon[room.id];
    }
  }, handler.help = ["dungeon"].map(v => v + " [nama room]"), handler.tags = ["rpg"],
  handler.command = /^(dungeon)$/i, handler.mods = !1;
export default handler;

function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)];
}

function item(sword, armor, healt, usedPrefix) {
  let sw = 1 * sword < 1,
    a = 1 * armor < 1,
    h = 1 * healt < 90;
  return `\n${sw ? "Kamu belum memiliki ⚔️Sword" : ""}${sw && a && h ? "," : sw && a ? " dan " : ""} ${a ? "🥼Armor" : ""}${sw && a && h ? " dan Minimal 90 ❤Healt" : h ? "Minimal 90 ❤Healt" : ""}${sw ? `\nuntuk mendapatkan ⚔Sword ketik *${usedPrefix}craft sword*` : ""}${a ? `\nuntuk mendapatkan 🥼Armor ketik *${usedPrefix}buy armor*` : ""}${h ? `\nuntuk menambah ❤Healt ketik *${usedPrefix}heal*` : ""}\n  `;
}

function M(jid) {
  return "@" + jid.split("@")[0];
}

function clockString(ms) {
  let h = Math.floor(ms / 36e5),
    m = Math.floor(ms / 6e4) % 60,
    s = Math.floor(ms / 1e3) % 60;
  return console.log({
    ms: ms,
    h: h,
    m: m,
    s: s
  }), [h, m, s].map(v => v.toString().padStart(2, 0)).join(":");
}

function data(DATA) {
  let panjang = 1 * DATA.length,
    msg = "";
  return DATA.forEach(player => {
    1 === panjang ? msg += `*${M(player)}*` : DATA.indexOf(player) !== panjang - 1 ? msg += `*${M(player)}*, ` : msg += `dan *${M(player)}*`;
  }), msg;
}