const handler = async (m, {
  conn,
  command,
  args,
  usedPrefix,
  DevMode
}) => {
  let type = (args[0] || "").toLowerCase(),
    _type = (args[0] || "").toLowerCase(),
    user = db.data.users[m.sender];
  db.data.users[m.sender].pickaxe = db.data.users[m.sender].pickaxe || 0, db.data.users[m.sender].pedang = db.data.users[m.sender].pedang || 0,
    db.data.users[m.sender].fishingrod = db.data.users[m.sender].fishingrod || 0;
  botwm;
  const sections = [{
    title: "R E P A I R  A  T O O L S",
    rows: [{
      title: "⚔️ Sword",
      rowId: ".repair sword",
      description: "Repair Sword"
    }, {
      title: "🛠️ Pickaxe",
      rowId: ".repair pickaxe",
      description: "Repair Pickaxe"
    }, {
      title: "🥼 Armor",
      rowId: ".repair armor",
      description: "Repair Armor"
    }]
  }];
  try {
    if (/repair/i.test(command)) {
      const count = args[1] && args[1].length > 0 ? Math.min(99999999, Math.max(parseInt(args[1]), 1)) : !args[1] || args.length < 3 ? 1 : Math.min(1, count);
      switch (type) {
        case "pickaxe":
          if (user.pickaxedurability > 99) return m.reply("Tools ini belum memiliki kerusakan");
          if (0 === user.pickaxe) return m.reply("Kamu belum memilik ini");
          if (user.diamond < 1 || user.rock < 3 || user.wood < 5 || user.iron < 3) return m.reply("Barang tidak cukup!");
          user.rock -= 3, user.wood -= 5, user.iron -= 3, user.diamond -= 1, user.pickaxedurability = 100,
            m.reply("Sukses memperbaiki!");
          break;
        case "sword":
          if (user.sworddurability > 99) return m.reply("Tools ini belum memiliki kerusakan");
          if (0 === user.sword) return m.reply("Kamu belum memilik ini");
          if (user.diamond < 1 || user.wood < 5 || user.iron < 9) return m.reply("Barang tidak cukup!");
          user.wood -= 5, user.iron -= 9, user.diamond -= 1, user.sworddurability = 100, m.reply("Sukses memperbaiki!");
          break;
        case "armor":
          if (user.armordurability > 99) return m.reply("Tools ini belum memiliki kerusakan");
          if (0 === user.armor) return m.reply("Kamu belum memilik ini");
          if (user.diamond < 3 || user.iron < 15) return m.reply("Barang tidak cukup!");
          user.iron -= 15, user.diamond -= 3, user.armordurability = 100, m.reply("Sukses memperbaiki!");
          break;
        default:
          let replyMsg = sections[0]?.rows.map(row => `*${row.title}*\n${row.rowId}\n${row.description}`).join("\n\n");
          m.reply(replyMsg);
      }
    } else if (/enchant|enchan/i.test(command)) {
      const count = args[2] && args[2].length > 0 ? Math.min(99999999, Math.max(parseInt(args[2]), 1)) : !args[2] || args.length < 4 ? 1 : Math.min(1, count);
      switch (_type) {
        case "t":
        case "":
          break;
        default:
          m.reply("\n🛠️ Pickaxe ⛏️\n⚔️ Sword 🗡️\n🎣 Fishingrod 🎣\n\n*❏ RECIPE*\n🛠️ Pickaxe ⛏️\n〉 5 Kayu\n〉 3 Batu\n〉 3 Iron\n〉 1 Diamond\n\n⚔️ Sword 🗡️\n〉 5 Kayu\n〉 9 Iron\n〉 1 Diamond\n\n🥼 Armor 🥼\n〉 15 Iron\n〉 3 Diamond\n");
      }
    }
  } catch (err) {
    m.reply("Error\n\n\n" + err.stack);
  }
};
handler.help = ["repair"], handler.tags = ["rpg"], handler.command = /^(repair)/i;
export default handler;