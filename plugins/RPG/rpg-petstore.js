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
  let logo = `${htki} PET STORE ${htka}\n${htka}`,
    caption = `\n\n${htjava} N O R M A L ${htjava}\n🐈 *Cat:* 2 🔖\n🐕 *Dog:* 2 🔖\n🐎 *Horse:* 4 🔖\n🦊 *Fox:* 6 🔖\n🤖 *Robo:* 10 🔖\n\n${htjava} S P E C I A L ${htjava}\n🦁 *lion:* 10 🔖\n🦏 *rhinoceros:* 10 🔖\n🐉 *dragon:* 10 🔖\n🎠 *centaur:* 10 🔖\n🦊 *kyubi:* 10 🔖\n🦅 *griffin:* 10 🔖\n🦤 *phonix:* 10 🔖\n🐺 *wolf:* 10 🔖\n\n${htjava} A B I L I T Y ${htjava}\n➞ 🐈 • ᴄᴀᴛ :\n- ɪɴᴄʀᴇᴀsᴇ ʜᴇᴀʟᴛʜ 5% / ʟᴇᴠᴇʟ ᴡʜᴇɴ ᴜsᴇ *.ʜᴇᴀʟ*\n\n➞ 🐕 • ᴅᴏɢ :\n- ᴄᴏᴍɪɴɢ sᴏᴏɴ...\n\n➞ 🐎 • ʜᴏʀsᴇ :\n- ᴄᴏᴍɪɴɢ sᴏᴏɴ...\n\n➞ 🦊 • ғᴏx :\n- ᴄᴏᴍɪɴɢ sᴏᴏɴ...\n`;
  const listMessage = {
    text: caption,
    footer: wm,
    title: logo,
    buttonText: "ADOPT ME 🐾",
    sections: [{
      title: "Buy A Pet",
      rows: [{
        title: "🐈 Cat",
        rowId: ".petshop cat",
        description: "Adopt A Cat"
      }, {
        title: "🐕 Dog",
        rowId: ".petshop dog",
        description: "Adopt A Dog"
      }, {
        title: "🐎 Horse",
        rowId: ".petshop horse",
        description: "Adopt A Horse"
      }, {
        title: "🦊 Fox",
        rowId: ".petshop fox",
        description: "Adopt A Fox"
      }, {
        title: "🤖 Robo",
        rowId: ".petshop robo",
        description: "Buy A Robo"
      }]
    }, {
      title: "Special Pet",
      rows: [{
        title: "🦁 lion",
        rowId: ".petshop lion",
        description: "Adopt A lion"
      }, {
        title: "🦏 rhinoceros",
        rowId: ".petshop rhinoceros",
        description: "Adopt A rhinoceros"
      }, {
        title: "🐉 dragon",
        rowId: ".petshop dragon",
        description: "Adopt A dragon"
      }, {
        title: "🎠 centaur",
        rowId: ".petshop centaur",
        description: "Adopt A centaur"
      }, {
        title: "🦊 kyubi",
        rowId: ".petshop kyubi",
        description: "Adopt A kyubi"
      }, {
        title: "🦅 griffin",
        rowId: ".petshop griffin",
        description: "Adopt A griffin"
      }, {
        title: "🦤 phonix",
        rowId: ".petshop phonix",
        description: "Adopt A phonix"
      }, {
        title: "🐺 wolf",
        rowId: ".petshop wolf",
        description: "Adopt A wolf"
      }]
    }]
  };
  try {
    if (/petshop/i.test(command)) {
      const count = args[1] && args[1].length > 0 ? Math.min(99999999, Math.max(parseInt(args[1]), 1)) : !args[1] || args.length < 3 ? 1 : Math.min(1, count);
      switch (type) {
        case "cat":
          if (user.cat > 0) return m.reply("Kamu sudah memilik ini");
          if (user.pet < 2) return m.reply("Pet Token anda kurang");
          db.data.users[m.sender].pet -= 2, db.data.users[m.sender].cat += 1, m.reply("Selamat anda mempunyai pet Baru ! 🎉");
          break;
        case "dog":
          if (user.dog > 0) return m.reply("Kamu sudah memilik ini");
          if (user.pet < 2) return m.reply("Pet Token anda kurang");
          db.data.users[m.sender].pet -= 2, db.data.users[m.sender].dog += 1, m.reply("Selamat anda mempunyai pet Baru ! 🎉");
          break;
        case "fox":
          if (user.fox > 0) return m.reply("Kamu sudah memilik ini");
          if (user.pet < 6) return m.reply("Pet Token anda kurang");
          db.data.users[m.sender].pet -= 6, db.data.users[m.sender].fox += 1, m.reply("Selamat anda mempunyai pet Baru ! 🎉");
          break;
        case "horse":
          if (user.horse > 0) return m.reply("Kamu sudah memilik ini");
          if (user.pet < 4) return m.reply("Pet Token anda kurang");
          db.data.users[m.sender].pet -= 4, db.data.users[m.sender].horse += 1, m.reply("Selamat anda mempunyai pet Baru ! 🎉");
          break;
        case "robo":
          if (user.robo > 0) return m.reply("Kamu sudah memilik ini");
          if (user.pet < 10) return m.reply("Pet Token anda kurang");
          db.data.users[m.sender].pet -= 10, db.data.users[m.sender].robo += 1, m.reply("Selamat anda mempunyai pet Baru ! 🎉");
          break;
        case "lion":
          if (user.lion > 0) return m.reply("Kamu sudah memilik ini");
          if (user.pet < 10) return m.reply("Pet Token anda kurang");
          db.data.users[m.sender].pet -= 10, db.data.users[m.sender].lion += 1, m.reply("Selamat anda mempunyai pet Baru ! 🎉");
          break;
        case "rhinoceros":
          if (user.rhinoceros > 0) return m.reply("Kamu sudah memilik ini");
          if (user.pet < 10) return m.reply("Pet Token anda kurang");
          db.data.users[m.sender].pet -= 10, db.data.users[m.sender].rhinoceros += 1, m.reply("Selamat anda mempunyai pet Baru ! 🎉");
          break;
        case "dragon":
          if (user.dragon > 0) return m.reply("Kamu sudah memilik ini");
          if (user.pet < 10) return m.reply("Pet Token anda kurang");
          db.data.users[m.sender].pet -= 10, db.data.users[m.sender].dragon += 1, m.reply("Selamat anda mempunyai pet Baru ! 🎉");
          break;
        case "centaur":
          if (user.centaur > 0) return m.reply("Kamu sudah memilik ini");
          if (user.pet < 10) return m.reply("Pet Token anda kurang");
          db.data.users[m.sender].pet -= 10, db.data.users[m.sender].centaur += 1, m.reply("Selamat anda mempunyai pet Baru ! 🎉");
          break;
        case "kyubi":
          if (user.kyubi > 0) return m.reply("Kamu sudah memilik ini");
          if (user.pet < 10) return m.reply("Pet Token anda kurang");
          db.data.users[m.sender].pet -= 10, db.data.users[m.sender].kyubi += 1, m.reply("Selamat anda mempunyai pet Baru ! 🎉");
          break;
        case "griffin":
          if (user.griffin > 0) return m.reply("Kamu sudah memilik ini");
          if (user.pet < 10) return m.reply("Pet Token anda kurang");
          db.data.users[m.sender].pet -= 10, db.data.users[m.sender].griffin += 1, m.reply("Selamat anda mempunyai pet Baru ! 🎉");
          break;
        case "phonix":
          if (user.phonix > 0) return m.reply("Kamu sudah memilik ini");
          if (user.pet < 10) return m.reply("Pet Token anda kurang");
          db.data.users[m.sender].pet -= 10, db.data.users[m.sender].phonix += 1, m.reply("Selamat anda mempunyai pet Baru ! 🎉");
          break;
        case "wolf":
          if (user.wolf > 0) return m.reply("Kamu sudah memilik ini");
          if (user.pet < 10) return m.reply("Pet Token anda kurang");
          db.data.users[m.sender].pet -= 10, db.data.users[m.sender].wolf += 1, m.reply("Selamat anda mempunyai pet Baru ! 🎉");
          break;
        default:
          return await conn.sendMessage(m.chat, listMessage);
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
handler.help = ["petshop"], handler.tags = ["rpg"], handler.command = /^(petshop)/i;
export default handler;