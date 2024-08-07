const tfinventory = {
    others: {
      money: !0,
      exp: !0
    },
    tfitems: {
      potion: !0,
      trash: !0,
      wood: !0,
      rock: !0,
      string: !0,
      emerald: !0,
      diamond: !0,
      gold: !0,
      iron: !0
    },
    tfcrates: {
      common: !0,
      uncommon: !0,
      mythic: !0,
      legendary: !0,
      pet: !0
    },
    tfpets: {
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
    }
  },
  rewards = {
    common: {
      money: 101,
      exp: 201,
      trash: 11,
      potion: [0, 1, 0, 1, 0, 0, 0, 0, 0],
      common: [0, 1, 0, 1, 0, 0, 0, 0, 0, 0],
      uncommon: [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    },
    uncommon: {
      money: 201,
      exp: 401,
      trash: 31,
      potion: [0, 1, 0, 0, 0, 0, 0],
      diamond: [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      common: [0, 1, 0, 0, 0, 0, 0, 0],
      uncommon: [0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
      mythic: [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      wood: [0, 1, 0, 0, 0, 0],
      rock: [0, 1, 0, 0, 0, 0],
      string: [0, 1, 0, 0, 0, 0]
    },
    mythic: {
      money: 301,
      exp: 551,
      trash: 61,
      potion: [0, 1, 0, 0, 0, 0],
      emerald: [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      diamond: [0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
      gold: [0, 1, 0, 0, 0, 0, 0, 0, 0],
      iron: [0, 1, 0, 0, 0, 0, 0, 0],
      common: [0, 1, 0, 0, 0, 0],
      uncommon: [0, 1, 0, 0, 0, 0, 0, 0],
      mythic: [0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
      legendary: [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      pet: [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      wood: [0, 1, 0, 0, 0],
      rock: [0, 1, 0, 0, 0],
      string: [0, 1, 0, 0, 0]
    },
    legendary: {
      money: 401,
      exp: 601,
      trash: 101,
      potion: [0, 1, 0, 0, 0],
      emerald: [0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
      diamond: [0, 1, 0, 0, 0, 0, 0, 0, 0],
      gold: [0, 1, 0, 0, 0, 0, 0, 0],
      iron: [0, 1, 0, 0, 0, 0, 0],
      common: [0, 1, 0, 0],
      uncommon: [0, 1, 0, 0, 0, 0],
      mythic: [0, 1, 0, 0, 0, 0, 0, 0, 0],
      legendary: [0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
      pet: [0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
      wood: [0, 1, 0, 0],
      rock: [0, 1, 0, 0],
      string: [0, 1, 0, 0]
    },
    pet: {
      horse: [0, 1, 0, 0, 0, 0],
      cat: [0, 1, 0, 0],
      fox: [0, 1, 0, 0, 0, 0],
      dog: [0, 1, 0, 0, 0, 0, 0],
      robo: [0, 1, 0, 0],
      lion: [0, 1, 0, 0, 0, 0],
      rhinoceros: [0, 1, 0, 0, 0, 0, 0, 0, 0],
      dragon: [0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
      centaur: [0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
      kyubi: [0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
      griffin: [0, 1, 0, 0, 0, 0, 0],
      wolf: [0, 1, 0, 0, 0, 0, 0],
      phonix: [0, 1, 0, 0, 0, 0, 0]
    }
  },
  handler = async (m, {
    command,
    args,
    usedPrefix
  }) => {
    let imgr = flaaa.getRandom(),
      user = db.data.users[m.sender];
    Object.keys(tfinventory.tfcrates).map(v => user[v] && `⮕ ${rpg.emoticon(v)} ${v}: ${user[v]}`).filter(v => v).join("\n").trim();
    let listCrate = Object.fromEntries(Object.entries(rewards).filter(([v]) => v && v in user)),
      info = `🧑🏻‍🏫 ᴜsᴇʀ: *${conn.getName(m.sender)}*\n\n🔖 ᴄʀᴀᴛᴇ ʟɪsᴛ :\n${Object.keys(tfinventory.tfcrates).map(v => user[v] && `⮕ ${rpg.emoticon(v)} ${v}: ${user[v]}`).filter(v => v).join("\n")}\n–––––––––––––––––––––––––\n💁🏻‍♂ ᴛɪᴩ :\n⮕ ᴏᴩᴇɴ ᴄʀᴀᴛᴇ:\n${usedPrefix}open [crate] [quantity]\n★ ᴇxᴀᴍᴩʟᴇ:\n${usedPrefix}open mythic 3\n`.trim(),
      type = (args[0] || "").toLowerCase(),
      count = 1 * Math.floor(isNumber(args[1]) ? Math.min(Math.max(parseInt(args[1]), 1), Number.MAX_SAFE_INTEGER) : 1);
    if (!(type in listCrate)) return await conn.sendFile(m.chat, imgr + "open", "", `*${htki} OPEN CRATES ${htka}*\n` + info, m);
    if (user[type] < count) return m.reply(`\nYour *${rpg.emoticon(type)}${type} crate* is not enough!, you only have ${user[type]} *${rpg.emoticon(type)}${type} crate*\ntype *${usedPrefix}buy ${type} ${count - user[type]}* to buy\n`.trim());
    let crateReward = {};
    for (let i = 0; i < count; i++)
      for (let [reward, value] of Object.entries(listCrate[type]))
        if (reward in user) {
          const total = value.getRandom();
          total && (user[reward] += 1 * total, crateReward[reward] = (crateReward[reward] || 0) + 1 * total);
        }
    user[type] -= 1 * count, m.reply(`\nYou have opened *${count}* ${rpg.emoticon(type)}${type} crate and got:\n${Object.keys(crateReward).filter(v => v && crateReward[v] && !/legendary|pet|mythic|diamond|emerald/i.test(v)).map(reward => `\n*${rpg.emoticon(reward)}${reward}:* ${crateReward[reward]}\n`.trim()).join("\n")}\n`.trim());
    let diamond = crateReward.diamond,
      mythic = crateReward.mythic,
      pet = crateReward.pet,
      legendary = crateReward.legendary,
      emerald = crateReward.emerald;
    (mythic || diamond) && m.reply(`\nCongrats you got a rare item, which is ${diamond ? `*${diamond}* ${rpg.emoticon("diamond")}diamond` : ""}${diamond && mythic ? "and " : ""}${mythic ? `*${mythic}* ${rpg.emoticon("mythic")}mythic` : ""}\n`.trim()),
      (pet || legendary || emerald) && m.reply(`\nCongrats you got a epic item, which is ${pet ? `*${pet}* ${rpg.emoticon("pet")}pet` : ""}${pet && legendary && emerald ? ", " : pet && legendary || legendary && emerald || emerald && pet ? "and " : ""}${legendary ? `*${legendary}* ${rpg.emoticon("legendary")}legendary` : ""}${pet && legendary && emerald ? "and " : ""}${emerald ? `*${emerald}* ${rpg.emoticon("emerald")}emerald` : ""}\n`.trim());
  };
handler.help = ["open"].map(v => v + " [crate] [count]"), handler.tags = ["rpg"],
  handler.command = /^(open|buka|gacha)$/i;
export default handler;

function isNumber(number) {
  return number ? "number" == typeof(number = parseInt(number)) && !isNaN(number) : number;
}