const handler = async (m, {
  conn,
  command,
  args,
  usedPrefix
}) => {
  try {
    let user = db.data.users[m.sender],
      fishingrod = 1 * user.fishingrod,
      pickaxe = 1 * user.pickaxe,
      sword = 1 * user.sword,
      atm = 1 * user.atm,
      robo = 1 * user.robo,
      type = (args[0] || "").toLowerCase(),
      lmao1 = `Gunakan Format *${usedPrefix}${command} [type]*\ncontoh *${usedPrefix}${command} fishingrod*\n*📌List yang Bisa Di Upgrade*\n${rpg.emoticon("fishingrod")} FishingRod\n${rpg.emoticon("pickaxe")} Pickaxe\n${rpg.emoticon("sword")} Sword\n${rpg.emoticon("bank")} ATM\n${rpg.emoticon("robo")} Robo\n`.trim();
    switch (type) {
      case "fishingrod":
        if (0 === fishingrod) m.reply(`anda belum memiliki *🎣FishingRod*\nuntuk mendapatkannya ketik *${usedPrefix}craft fishingrod*`);
        else if (fishingrod > 9) m.reply(`*${rpg.emoticon("fishingrod")}FishingRod* kamu sudah level max`);
        else {
          let _kayu = 25 * fishingrod,
            _string = 15 * fishingrod,
            _money = 1e4 * fishingrod;
          user.kayu < _kayu || user.string < _string || user.money < _money ? m.reply(`Material kamu kurang!!${user.kayu < _kayu ? `\n${rpg.emoticon("kayu")}Kayu Kamu Kurang *${_kayu - user.kayu}*` : ""}${user.string < _string ? `\n${rpg.emoticon("string")}String Kamu Kurang *${_string - user.string}*` : ""}${user.money < _money ? `\n${rpg.emoticon("money")}Uang Kamu Kurang *${_money - user.money}*` : ""}`) : (user.fishingrod += 1, user.kayu -= _kayu, user.string -= _string, user.money -= _money, user.fishingroddurability = 0, user.fishingroddurability += 50 * fishingrod, m.reply(`Succes mengupgrade *${rpg.emoticon("fishingrod")}FishingRod*`));
        }
        break;
      case "pickaxe":
        if (0 === pickaxe) m.reply(`anda belum memiliki *${rpg.emoticon("pickaxe")}Pickaxe*\nuntuk memilikinya ketik *${usedPrefix}craft pickaxe*`);
        else if (pickaxe > 9) m.reply(`*${rpg.emoticon("pickaxe")}Pickaxe* kamu sudah level max`);
        else {
          let __batu = 25 * pickaxe,
            __kayu = 15 * pickaxe,
            __money = 15e3 * pickaxe;
          user.batu < __batu || user.kayu < __kayu || user.money < __money ? m.reply(`Material Anda Kurang!!${user.batu < __batu ? `\n${rpg.emoticon("batu")}Batu kamu kurang *${__batu - user.batu}*` : ""}${user.kayu < __kayu ? `\n${rpg.emoticon("kayu")}Kayu kamu kurang *${__kayu - user.kayu}*` : ""}${user.money < __money ? `\n${rpg.emoticon("money")}Uang kamu kurang *${__money - user.money}*` : ""}`) : (user.pickaxe += 1, user.kayu -= __kayu, user.batu -= __batu, user.money -= __money, user.pickaxedurability = 0, user.pickaxedurability += 50 * pickaxe, m.reply(`Succes mengupgrade *${rpg.emoticon("pickaxe")}Pickaxe*`));
        }
        break;
      case "sword":
        if (0 === sword) m.reply(`anda belum memiliki *${rpg.emoticon("sword")}Sword*\nuntuk memilikinya ketik *${usedPrefix}craft sword*`);
        else if (sword > 9) m.reply(`*${rpg.emoticon("sword")}Sword* kamu sudah level max`);
        else {
          let _iron = 25 * sword,
            ___kayu = 15 * sword,
            ___money = 1e4 * sword;
          user.iron < _iron || user.kayu < ___kayu || user.money < ___money ? m.reply(`Material Anda Kurang!!${user.iron < _iron ? `\n${rpg.emoticon("iron")}Iron kamu kurang *${_iron - user.iron}*` : ""}${user.kayu < ___kayu ? `\n${rpg.emoticon("kayu")}Kayu kamu kurang *${___kayu - user.kayu}*` : ""}${user.money < ___money ? `\n${rpg.emoticon("money")}Uang kamu kurang *${___money - user.money}*` : ""}`) : (user.sword += 1, user.iron -= _iron, user.kayu -= ___kayu, user.money -= ___money, user.sworddurability = 0, user.sworddurability += 50 * sword, m.reply(`Succes mengupgrade *${rpg.emoticon("sword")}Sword*`));
        }
        break;
      case "atm":
        if (0 === atm) m.reply(`anda belum memiliki *${rpg.emoticon("atm")}atm*\nuntuk memilikinya ketik *${usedPrefix}craft atm*`);
        else if (atm > 9) m.reply(`*${rpg.emoticon("bank")} Atm* kamu sudah level max`);
        else {
          let __emerald = 3 * atm,
            ___diamond = 6 * atm,
            ___money = 1e4 * atm;
          user.emerald < __emerald || user.diamond < ___diamond || user.money < ___money ? m.reply(`Material Anda Kurang!!${user.emerald < __emerald ? `\n${rpg.emoticon("emerald")} emerald kamu kurang *${__emerald - user.emerald}*` : ""}${user.diamond < ___diamond ? `\n${rpg.emoticon("diamond")} Diamond kamu kurang *${___diamond - user.diamond}*` : ""}${user.money < ___money ? `\n${rpg.emoticon("money")}Uang kamu kurang *${___money - user.money}*` : ""}`) : (user.fullatm += 5e4, user.level += 1, user.atm += 1, user.emerald -= __emerald, user.diamond -= ___diamond, user.money -= ___money, m.reply(`Succes mengupgrade *${rpg.emoticon("bank")} Atm*`));
        }
        break;
      case "robo":
        if (0 === robo) m.reply(`anda belum memiliki *${rpg.emoticon("robo")}robo*\nuntuk memilikinya ketik *${usedPrefix}craft robo*`);
        else if (robo > 9) m.reply(`*${rpg.emoticon("robo")} robo* kamu sudah level max`);
        else {
          let __emerald = 12 * robo,
            ___diamond = 50 * robo,
            ___money = 1e5 * robo;
          user.emerald < __emerald || user.diamond < ___diamond || user.money < ___money ? m.reply(`Material Anda Kurang!!${user.emerald < __emerald ? `\n${rpg.emoticon("emerald")} emerald kamu kurang *${__emerald - user.emerald}*` : ""}${user.diamond < ___diamond ? `\n${rpg.emoticon("diamond")} Diamond kamu kurang *${___diamond - user.diamond}*` : ""}${user.money < ___money ? `\n${rpg.emoticon("money")}Uang kamu kurang *${___money - user.money}*` : ""}`) : (user.roboxp += 5, user.level += 1, user.robo += 1, user.emerald -= __emerald, user.diamond -= ___diamond, user.money -= ___money, m.reply(`Succes mengupgrade *${rpg.emoticon("robo")} robo*`));
        }
        break;
      default:
        m.reply(lmao1);
    }
  } catch (e) {
    throw console.log(e), e;
  }
};
handler.help = ["upgrade"], handler.tags = ["rpg"], handler.command = /^(up(grade)?)$/i,
  handler.fail = null;
export default handler;