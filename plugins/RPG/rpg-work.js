const handler = async (m, {
  conn,
  usedPrefix
}) => {
  try {
    const user = db.data.users[m.sender],
      currentTime = new Date(),
      timeToWait = 3e5,
      timeSinceLastAdventure = currentTime - user.lastadventure,
      timers = clockString(timeToWait - timeSinceLastAdventure);
    if (user.healt <= 79) return await conn.reply(m.chat, `⚠️ *Minimal health harus 80* untuk berpetualang. Beli obat dengan ${usedPrefix}shop buy potion <jumlah> dan gunakan dengan ${usedPrefix}use potion <jumlah>. Untuk mendapatkan money dan potion gratis ketik *${usedPrefix}claim*`, m);
    if (timeSinceLastAdventure <= timeToWait) return await conn.reply(m.chat, `⌛ *Anda sudah berpetualang*, silahkan menunggu sampai *${timers}* lagi`, m);
    const health = Math.floor(101 * Math.random()),
      exp = (user.kucing, user.armor, Math.floor(400 * Math.random()) + 70 * user.kuda),
      money = Math.floor(400 * Math.random()) + 70 * user.anjing,
      potion = Math.floor(5 * Math.random()) + 1,
      diamond = pickRandom(["0", "1", "1", "1", "2", "1", "0"]),
      common = Math.floor(5 * Math.random()) + 1,
      uncommon = Math.floor(3 * Math.random()) + 1,
      mythic = pickRandom(["1", "0", "0", "1"]),
      legendary = pickRandom(["1", "0", "0", "0"]),
      sampah = Math.floor(300 * Math.random()) + 100,
      kayu = Math.floor(3 * Math.random()) + 1,
      batu = Math.floor(2 * Math.random()) + 1,
      string = Math.floor(2 * Math.random()) + 1,
      iron = Math.floor(2 * Math.random()) + 1;
    user.healt -= health, user.exp += exp, user.money += money, user.potion += potion,
      user.diamond += diamond, user.common += common, user.uncommon += uncommon, user.sampah += sampah,
      user.iron += iron, user.batu += batu, user.kayu += kayu, user.string += string,
      user.lastadventure = currentTime;
    const str = `\n*${rpg.emoticon("healt")} Nyawa berkurang -${health}* karena Kamu berpetualang sampai *${pickRandom([ "🌏 Ujung dunia", "🌌 Luar angkasa", "🗺️ Dunia mimpi", "🚀 Mars", "🌚 Bulan", "🪐 Pluto", "🌞 Matahari", "❤️ Hatinya dia", "..." ])}* dan mendapatkan\n*${rpg.emoticon("exp")} Exp:* ${exp}\n*${rpg.emoticon("money")} Uang:* ${money}\n*${rpg.emoticon("sampah")} Sampah:* ${sampah}${0 === potion ? "" : `\n*${rpg.emoticon("potion")} Potion:* ${potion}`}${0 === iron ? "" : `\n*${rpg.emoticon("iron")} Iron:* ${iron}`}${0 === kayu ? "" : `\n*${rpg.emoticon("kayu")} Kayu:* ${kayu}`}${0 === batu ? "" : `\n*${rpg.emoticon("batu")} Batu:* ${batu}`}${0 === string ? "" : `\n*${rpg.emoticon("string")} Tali:* ${string}`}${0 === diamond ? "" : `\n*${rpg.emoticon("diamond")} Diamond:* ${diamond}`}${0 === common ? "" : `\n*${rpg.emoticon("common")} Common Crate:* ${common}`}${0 === uncommon ? "" : `\n*${rpg.emoticon("uncommon")} Uncommon Crate:* ${uncommon}`}`;
    await conn.reply(m.chat, str, m), mythic > 0 && (user.mythic += mythic, await conn.reply(m.chat, `🎉 *Selamat!*\nAnda mendapatkan item *Rare* yaitu *${mythic}* ${rpg.emoticon("mythic")} Mythic Crate`, m)),
      legendary > 0 && (user.legendary += legendary, await conn.reply(m.chat, `🎉 *Selamat!*\nAnda mendapatkan item *Epic* yaitu *${legendary}* ${rpg.emoticon("legendary")} Legendary Crate`, m));
  } catch (e) {
    throw console.log(e), e;
  }
};
handler.help = ["petualang", "work"], handler.tags = ["rpg"], handler.command = /^(petualang|work)$/i,
  handler.fail = null, handler.register = !1, handler.group = !0;
export default handler;

function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)];
}

function clockString(ms) {
  return ["\n" + (isNaN(ms) ? "--" : Math.floor(ms / 864e5)), " *Days ☀️*\n ", isNaN(ms) ? "--" : Math.floor(ms / 36e5) % 24, " *Hours 🕐*\n ", isNaN(ms) ? "--" : Math.floor(ms / 6e4) % 60, " *Minute ⏰*\n ", isNaN(ms) ? "--" : Math.floor(ms / 1e3) % 60, " *Second ⏱️* "].map(v => v.toString().padStart(2, 0)).join("");
}