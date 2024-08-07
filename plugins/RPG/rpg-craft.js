const handler = async (m, {
  conn,
  command,
  args,
  usedPrefix
}) => {
  let type = (args[0] || "").toLowerCase(),
    _type = (args[0] || "").toLowerCase(),
    user = db.data.users[m.sender];
  user.pickaxe = user.pickaxe || 0, user.pedang = user.pedang || 0, user.fishingrod = user.fishingrod || 0;
  let caption = "\n⛊ Pickaxe ⛏️\n⛊ Sword ⚔️\n⛊ Fishingrod 🎣\n⛊ Armor 🛡️\n⛊ ATM 💳\n⛊ Robo 🤖\n\n*「 RECIPE 」*\n\n⬡ Pickaxe ⛏️\n│• 10 Kayu\n│• 5 Batu\n│• 5 Iron\n│• 20 String\n╰────┈⭑\n⬡ Sword ⚔️\n│• 10 Kayu\n│• 15 Iron\n╰────┈⭑\n⬡ Fishingrod 🎣\n│• 10 Kayu\n│• 2 Iron\n│• 20 String\n╰────┈⭑\n⬡ Armor 🥼\n│• 30 Iron\n│• 1 Emerald\n│• 5 Diamond\n╰────┈⭑\n⬡ Atm 💳\n│• 3 Emerald\n│• 6 Diamond\n│• 10k Money\n╰────┈⭑\n⬡ Robo 🤖\n│• 6 Emerald\n│• 12 Diamond\n│• 10k Money\n╰────┈⭑\n";
  try {
    if (/craft|Crafting/i.test(command)) {
      const count = args[1] && args[1].length > 0 ? Math.min(99999999, Math.max(parseInt(args[1]), 1)) : !args[1] || args.length < 3 ? 1 : Math.min(1, count);
      switch (type) {
        case "pickaxe":
          if (user.pickaxe > 0) return m.reply("Kamu sudah memilik ini");
          if (user.rock < 5 || user.wood < 10 || user.iron < 5 || user.string < 20) return m.reply("Barang tidak cukup!\nUntuk membuat pickaxe. Kamu memerlukan : \n10 kayu🪵 \n5 iron⛓\n20 String🕸️\n5 Batu 🪨");
          user.wood -= 10, user.iron -= 5, user.rock -= 5, user.string -= 20, user.pickaxe += 1,
            user.pickaxedurability = 40, m.reply("Sukses membuat 1 pickaxe 🔨");
          break;
        case "sword":
          if (user.sword > 0) return m.reply("Kamu sudah memilik ini");
          if (user.wood < 10 || user.iron < 15) return m.reply("Barang tidak cukup!\nUntuk membuat sword. Kamu memerlukan :\n10 kayu🪵\n15 iron⛓️");
          user.wood -= 10, user.iron -= 15, user.sword += 1, user.sworddurability = 40, m.reply("Sukses membuat 1 sword 🗡️");
          break;
        case "fishingrod":
          if (user.fishingrod > 0) return m.reply("Kamu sudah memilik ini");
          if (user.wood < 20 || user.iron < 5 || user.string < 20) return m.reply("Barang tidak cukup!\nUntuk membuat pancingan. Kamu memerlukan :\n10 kayu🪵\n5 iron⛓\n20 String🕸️");
          user.wood -= 10, user.iron -= 2, user.string -= 20, user.fishingrod += 1, user.fishingroddurability = 40,
            m.reply("Sukses membuat 1 Pancingan 🎣");
          break;
        case "armor":
          if (user.armor > 0) return m.reply("Kamu sudah memilik ini");
          if (user.iron < 30 || user.emerald < 1 || user.diamond < 5) return m.reply("Barang tidak cukup!\nUntuk membuat armor. Kamu memerlukan :\n30 Iron ⛓️\n1 Emerald ❇️\n5 Diamond 💎");
          user.emerald -= 1, user.iron -= 30, user.diamond -= 5, user.armor += 1, user.armordurability = 50,
            m.reply("Sukses membuat 1 Armor 🛡️");
          break;
        case "atm":
          if (user.atm > 0) return m.reply("Kamu sudah memilik ini");
          if (user.emerald < 3 || user.money < 1e4 || user.diamond < 6) return m.reply("Barang tidak cukup!\nUntuk membuat atm. Kamu memerlukan :\n10k Money 💹\n3 Emerald ❇️\n6 Diamond 💎");
          user.emerald -= 3, user.money -= 1e4, user.diamond -= 6, user.atm += 1, user.fullatm = 5e6,
            m.reply("Sukses membuat 1 Atm 💳");
          break;
        case "robo":
          if (user.atm > 0) return m.reply("Kamu sudah memilik ini");
          if (user.emerald < 6 || user.money < 1e5 || user.diamond < 12) return m.reply("Barang tidak cukup!\nUntuk membuat atm. Kamu memerlukan :\n100k Money 💹\n6 Emerald ❇️\n12 Diamond 💎");
          user.emerald -= 6, user.money -= 1e5, user.diamond -= 12, user.robo += 1, user.roboxp = 5,
            m.reply("Sukses membuat 1 Robo 🤖");
          break;
        default:
          return await conn.reply(m.chat, caption, m);
      }
    } else if (/enchant|enchan/i.test(command)) {
      const count = args[2] && args[2].length > 0 ? Math.min(99999999, Math.max(parseInt(args[2]), 1)) : !args[2] || args.length < 4 ? 1 : Math.min(1, count);
      switch (_type) {
        case "t":
        case "":
          break;
        default:
          return await conn.reply(m.chat, caption, m);
      }
    }
  } catch (err) {
    m.reply("Error\n\n\n" + err.stack);
  }
};
handler.help = ["craft"], handler.tags = ["rpg"], handler.command = /^(craft|crafting|chant)/i;
export default handler;