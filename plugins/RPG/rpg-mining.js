const cooldown = 3e5,
  handler = async (m, {
    usedPrefix
  }) => {
    let user = db.data.users[m.sender],
      timers = 3e5 - (new Date() - user.lastmining);
    if (user.health < 80) return m.reply(`\n⚠️ Butuh setidaknya 80 ❤️Healths untuk menambang!! ⚠️\nSilakan beli ❤️Healths terlebih dahulu dengan mengetik *${usedPrefix}buy potion <jumlah>*,\ndan ketik *${usedPrefix}heal <jumlah>* untuk menggunakan potion.\n`.trim());
    if (0 === user.pickaxe) return m.reply("⛏️ Kamu tidak bisa menambang tanpa alat penambang (pickaxe)! ⛏️");
    if (new Date() - user.lastmining <= 3e5) return m.reply(`\n⏳ Kamu sudah menambang sebelumnya! Silakan tunggu *${(timers / 1e3).toFixed(2)} detik* sebelum menambang lagi.\n`.trim());
    const rewards = reward(user);
    let text = "Kamu telah menambang dan kehilangan";
    for (const lost in rewards.lost)
      if (user[lost]) {
        const total = rewards.lost[lost].getRandom();
        user[lost] -= 1 * total, total && (text += `\n*${rpg.emoticon(lost)}${lost}:* ${total}`);
      }
    text += "\n\nNamun kamu mendapatkan";
    for (const rewardItem in rewards.reward)
      if (rewardItem in user) {
        const total = rewards.reward[rewardItem].getRandom();
        user[rewardItem] += 1 * total, total && (text += `\n*${rpg.emoticon(rewardItem)}${rewardItem}:* ${total}`);
      }
    m.reply(text.trim()), user.lastmining = 1 * new Date();
  };
handler.help = ["mining"], handler.tags = ["rpg"], handler.command = /^(mining)$/i,
  handler.cooldown = 3e5, handler.disabled = !1, handler.group = !0;
export default handler;

function reward(user = {}) {
  return {
    reward: {
      exp: 1e3,
      trash: 101,
      string: 25,
      rock: 30,
      iron: 25,
      diamond: 10,
      emerald: 4,
      common: 2 * (user.dog && 1.2 * (user.dog > 2 ? 2 : user.dog) || 1),
      uncommon: [0, 0, 0, 1, 0].concat(new Array(5 - (user.dog > 2 && user.dog < 6 && user.dog || user.dog > 5 && 5 || 2)).fill(0)),
      mythic: [0, 0, 0, 0, 0, 1, 0, 0, 0].concat(new Array(8 - (user.dog > 5 && user.dog < 8 && user.dog || user.dog > 7 && 8 || 3)).fill(0)),
      legendary: [0, 0, 0, 0, 0, 0, 0, 1, 0, 0].concat(new Array(10 - (user.dog > 8 && user.dog || 4)).fill(0)),
      iron: [0, 0, 0, 1, 0, 0],
      gold: [0, 0, 0, 0, 0, 1, 0],
      diamond: [0, 0, 0, 0, 0, 0, 1, 0].concat(new Array(5 - (user.fox < 6 && user.fox || user.fox > 5 && 5 || 0)).fill(0))
    },
    lost: {
      health: 40 - 4 * user.cat,
      pickaxedurability: 10
    }
  };
}