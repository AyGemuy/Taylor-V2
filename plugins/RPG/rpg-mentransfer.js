const handler = async (m, {
  conn,
  args,
  usedPrefix,
  DevMode
}) => {
  if (args.length < 3) return await conn.reply(m.chat, "Gunakan format .mentransfer <type> <jumlah> <@tag>\n📍contoh penggunaan: *.mentransfer money 100 @tag*\n\n*List yang bisa di transfer :*\n💹Money\n💳 Tabungan\n🥤Potion\n🗑️Sampah\n💎Diamond\n📦Common\n🛍️Uncommon\n🎁Mythic\n🧰Legendary\n🕸️string\n🪵kayu\n🪨batu\n⛓iron".trim(), m);
  try {
    let type = (args[0] || "").toLowerCase(),
      count = args[1] && args[1].length > 0 ? Math.min(9999999, Math.max(parseInt(args[1]), 1)) : Math.min(1),
      who = m.mentionedJid ? m.mentionedJid[0] : args[2].replace(/[@ .+-]/g, "").replace(" ", "") + "@s.whatsapp.net";
    if (!m.mentionedJid || !args[2]) throw "Tag salah satu, atau ketik Nomernya!!";
    db.data.users;
    switch (type) {
      case "money":
        if (db.data.users[m.sender].money >= 1 * count) try {
          db.data.users[m.sender].money -= 1 * count, db.data.users[who].money += 1 * count,
            await conn.reply(m.chat, `Berhasil mentransfer money sebesar ${count}`.trim(), m);
        } catch (e) {
          if (db.data.users[m.sender].money += 1 * count, m.reply("Gagal Menstransfer"), console.log(e), DevMode)
            for (let jid of owner.map(v => v.replace(/[^0-9]/g, "") + "@s.whatsapp.net").filter(v => v != conn.user.jid)) await conn.reply(jid, "Transfer.js error\nNo: *" + m.sender.split("@")[0] + "*\nCommand: *" + m.text + "*\n\n*" + e + "*", m);
        } else await conn.reply(m.chat, `Uang kamu tidak mencukupi untuk mentransfer Money sebesar ${count}`.trim(), m);
        break;
      case "tabungan":
        if (db.data.users[m.sender].atm >= 1 * count) try {
          db.data.users[m.sender].atm -= 1 * count, db.data.users[who].atm += 1 * count, await conn.reply(m.chat, `Berhasil mentransfer Uang dari bank sebesar ${count}`.trim(), m);
        } catch (e) {
          if (db.data.users[m.sender].atm += 1 * count, m.reply("Gagal Menstransfer"), console.log(e), DevMode)
            for (let jid of owner.map(v => v.replace(/[^0-9]/g, "") + "@s.whatsapp.net").filter(v => v != conn.user.jid)) await conn.reply(jid, "Transfer.js error\nNo: *" + m.sender.split("@")[0] + "*\nCommand: *" + m.text + "*\n\n*" + e + "*", m);
        } else await conn.reply(m.chat, `Limit kamu tidak mencukupi untuk mentransfer Uang dari Bank sebesar ${count}`.trim(), m);
        break;
      case "limit":
        if (db.data.users[m.sender].limit >= 1 * count) try {
          db.data.users[m.sender].limit -= 1 * count, db.data.users[who].limit += 1 * count,
            await conn.reply(m.chat, `Berhasil mentransfer limit sebesar ${count}`.trim(), m);
        } catch (e) {
          if (db.data.users[m.sender].limit += 1 * count, m.reply("Gagal Menstransfer"), console.log(e), DevMode)
            for (let jid of owner.map(v => v.replace(/[^0-9]/g, "") + "@s.whatsapp.net").filter(v => v != conn.user.jid)) await conn.reply(jid, "Transfer.js error\nNo: *" + m.sender.split("@")[0] + "*\nCommand: *" + m.text + "*\n\n*" + e + "*", m);
        } else await conn.reply(m.chat, `Limit kamu tidak mencukupi untuk mentransfer Limit sebesar ${count}`.trim(), m);
        break;
      case "potion":
        if (db.data.users[m.sender].potion >= 1 * count) try {
          db.data.users[m.sender].potion -= 1 * count, db.data.users[who].potion += 1 * count,
            await conn.reply(m.chat, `Berhasil mentransfer ${count} Potion`.trim(), m);
        } catch (e) {
          if (db.data.users[m.sender].potion += 1 * count, m.reply("Gagal Menstransfer"), console.log(e), DevMode)
            for (let jid of owner.map(v => v.replace(/[^0-9]/g, "") + "@s.whatsapp.net").filter(v => v != conn.user.jid)) await conn.reply(jid, "Transfer.js error\nNo: *" + m.sender.split("@")[0] + "*\nCommand: *" + m.text + "*\n\n*" + e + "*", m);
        } else await conn.reply(m.chat, "Potion kamu tidak cukup".trim(), m);
        break;
      case "sampah":
        if (db.data.users[m.sender].sampah >= 1 * count) try {
          db.data.users[m.sender].sampah -= 1 * count, db.data.users[who].sampah += 1 * count,
            await conn.reply(m.chat, `Berhasil mentransfer ${count} Sampah`.trim(), m);
        } catch (e) {
          if (db.data.users[m.sender].sampah += 1 * count, m.reply("Gagal Menstransfer"), console.log(e), DevMode)
            for (let jid of owner.map(v => v.replace(/[^0-9]/g, "") + "@s.whatsapp.net").filter(v => v != conn.user.jid)) await conn.reply(jid, "Transfer.js error\nNo: *" + m.sender.split("@")[0] + "*\nCommand: *" + m.text + "*\n\n*" + e + "*", m);
        } else await conn.reply(m.chat, "Sampah kamu tidak cukup".trim(), m);
        break;
      case "diamond":
        if (db.data.users[m.sender].diamond >= 1 * count) try {
          db.data.users[m.sender].diamond -= 1 * count, db.data.users[who].diamond += 1 * count,
            await conn.reply(m.chat, `Berhasil mentransfer ${count} Diamond`.trim(), m);
        } catch (e) {
          if (db.data.users[m.sender].diamond += 1 * count, m.reply("Gagal Menstransfer"), console.log(e), DevMode)
            for (let jid of owner.map(v => v.replace(/[^0-9]/g, "") + "@s.whatsapp.net").filter(v => v != conn.user.jid)) await conn.reply(jid, "Transfer.js error\nNo: *" + m.sender.split("@")[0] + "*\nCommand: *" + m.text + "*\n\n*" + e + "*", m);
        } else await conn.reply(m.chat, "Diamond kamu kamu tidak cukup".trim(), m);
        break;
      case "common":
        if (db.data.users[m.sender].common >= 1 * count) try {
          db.data.users[m.sender].common -= 1 * count, db.data.users[who].common += 1 * count,
            await conn.reply(m.chat, `Berhasil mentransfer ${count} Common Crate`.trim(), m);
        } catch (e) {
          if (db.data.users[m.sender].common += 1 * count, m.reply("Gagal Menstransfer"), console.log(e), DevMode)
            for (let jid of owner.map(v => v.replace(/[^0-9]/g, "") + "@s.whatsapp.net").filter(v => v != conn.user.jid)) await conn.reply(jid, "Transfer.js error\nNo: *" + m.sender.split("@")[0] + "*\nCommand: *" + m.text + "*\n\n*" + e + "*", m);
        } else await conn.reply(m.chat, "Common crate kamu kamu tidak cukup".trim(), m);
        break;
      case "uncommon":
        if (db.data.users[m.sender].uncommon >= 1 * count) try {
          db.data.users[m.sender].uncommon -= 1 * count, db.data.users[who].uncommon += 1 * count,
            await conn.reply(m.chat, `Berhasil mentransfer ${count} Uncommon Crate`.trim(), m);
        } catch (e) {
          if (db.data.users[m.sender].uncommon += 1 * count, m.reply("Gagal Menstransfer"), console.log(e), DevMode)
            for (let jid of owner.map(v => v.replace(/[^0-9]/g, "") + "@s.whatsapp.net").filter(v => v != conn.user.jid)) await conn.reply(jid, "Transfer.js error\nNo: *" + m.sender.split("@")[0] + "*\nCommand: *" + m.text + "*\n\n*" + e + "*", m);
        } else await conn.reply(m.chat, "Uncommon crate kamu kamu tidak cukup".trim(), m);
        break;
      case "mythic":
        if (db.data.users[m.sender].mythic >= 1 * count) try {
          db.data.users[m.sender].mythic -= 1 * count, db.data.users[who].mythic += 1 * count,
            await conn.reply(m.chat, `Berhasil mentransfer ${count} Mythic crate`.trim(), m);
        } catch (e) {
          if (db.data.users[m.sender].mythic += 1 * count, m.reply("Gagal Menstransfer"), console.log(e), DevMode)
            for (let jid of owner.map(v => v.replace(/[^0-9]/g, "") + "@s.whatsapp.net").filter(v => v != conn.user.jid)) await conn.reply(jid, "Transfer.js error\nNo: *" + m.sender.split("@")[0] + "*\nCommand: *" + m.text + "*\n\n*" + e + "*", m);
        } else await conn.reply(m.chat, "Mythic crate kamu kamu tidak cukup".trim(), m);
        break;
      case "legendary":
        if (db.data.users[m.sender].legendary >= 1 * count) try {
          db.data.users[m.sender].legendary -= 1 * count, db.data.users[who].legendary += 1 * count,
            await conn.reply(m.chat, `Berhasil mentransfer ${count} Legendary crate`.trim(), m);
        } catch (e) {
          if (db.data.users[m.sender].legendary += 1 * count, m.reply("Gagal Menstransfer"), console.log(e), DevMode)
            for (let jid of owner.map(v => v.replace(/[^0-9]/g, "") + "@s.whatsapp.net").filter(v => v != conn.user.jid)) await conn.reply(jid, "Transfer.js error\nNo: *" + m.sender.split("@")[0] + "*\nCommand: *" + m.text + "*\n\n*" + e + "*", m);
        } else await conn.reply(m.chat, "Legendary crate kamu kamu tidak cukup".trim(), m);
        break;
      case "string":
        if (db.data.users[m.sender].string >= 1 * count) try {
          db.data.users[m.sender].string -= 1 * count, db.data.users[who].string += 1 * count,
            await conn.reply(m.chat, `Berhasil mentransfer string sebesar ${count}`.trim(), m);
        } catch (e) {
          if (db.data.users[m.sender].string += 1 * count, m.reply("Gagal Menstransfer"), console.log(e), DevMode)
            for (let jid of owner.map(v => v.replace(/[^0-9]/g, "") + "@s.whatsapp.net").filter(v => v != conn.user.jid)) await conn.reply(jid, "Transfer.js error\nNo: *" + m.sender.split("@")[0] + "*\nCommand: *" + m.text + "*\n\n*" + e + "*", m);
        } else await conn.reply(m.chat, `Uang kamu tidak mencukupi untuk mentransfer String sebesar ${count}`.trim(), m);
        break;
      case "batu":
        if (db.data.users[m.sender].batu >= 1 * count) try {
          db.data.users[m.sender].batu -= 1 * count, db.data.users[who].batu += 1 * count,
            await conn.reply(m.chat, `Berhasil mentransfer Batu sebesar ${count}`.trim(), m);
        } catch (e) {
          if (db.data.users[m.sender].batu += 1 * count, m.reply("Gagal Menstransfer"), console.log(e), DevMode)
            for (let jid of owner.map(v => v.replace(/[^0-9]/g, "") + "@s.whatsapp.net").filter(v => v != conn.user.jid)) await conn.reply(jid, "Transfer.js error\nNo: *" + m.sender.split("@")[0] + "*\nCommand: *" + m.text + "*\n\n*" + e + "*", m);
        } else await conn.reply(m.chat, `Uang kamu tidak mencukupi untuk mentransfer Batu sebesar ${count}`.trim(), m);
        break;
      case "kayu":
        if (db.data.users[m.sender].kayu >= 1 * count) try {
          db.data.users[m.sender].kayu -= 1 * count, db.data.users[who].kayu += 1 * count,
            await conn.reply(m.chat, `Berhasil mentransfer kayu sebesar ${count}`.trim(), m);
        } catch (e) {
          if (db.data.users[m.sender].kayu += 1 * count, m.reply("Gagal Menstransfer"), console.log(e), DevMode)
            for (let jid of owner.map(v => v.replace(/[^0-9]/g, "") + "@s.whatsapp.net").filter(v => v != conn.user.jid)) await conn.reply(jid, "Transfer.js error\nNo: *" + m.sender.split("@")[0] + "*\nCommand: *" + m.text + "*\n\n*" + e + "*", m);
        } else await conn.reply(m.chat, `Uang kamu tidak mencukupi untuk mentransfer Kayu sebesar ${count}`.trim(), m);
        break;
      case "iron":
        if (db.data.users[m.sender].iron >= 1 * count) try {
          db.data.users[m.sender].iron -= 1 * count, db.data.users[who].iron += 1 * count,
            await conn.reply(m.chat, `Berhasil mentransfer iron sebesar ${count}`.trim(), m);
        } catch (e) {
          if (db.data.users[m.sender].iron += 1 * count, m.reply("Gagal Menstransfer"), console.log(e), DevMode)
            for (let jid of owner.map(v => v.replace(/[^0-9]/g, "") + "@s.whatsapp.net").filter(v => v != conn.user.jid)) await conn.reply(jid, "Transfer.js error\nNo: *" + m.sender.split("@")[0] + "*\nCommand: *" + m.text + "*\n\n*" + e + "*", m);
        } else await conn.reply(m.chat, `Uang kamu tidak mencukupi untuk mentransfer Iron sebesar ${count}`.trim(), m);
        break;
      default:
        return await conn.reply(m.chat, `Gunakan format ${usedPrefix}transfer <type> <jumlah> <@tag>\n📍 Contoh penggunaan: *${usedPrefix}transfer money 100 @tag*\n\n*List yang bisa di transfer*\n💹 Money\n💳 Tabungan\n🥤 Potion\n🗑️ Sampah\n💎 Diamond\n📦 Common\n🛍️ Uncommon\n🎁 Mythic\n🧰 Legendary\n🕸️ String\n🪵 Kayu\n🪨 Batu\n⛓️ Iron`.trim(), m);
    }
  } catch (e) {
    if (await conn.reply(m.chat, `Gunakan format ${usedPrefix}transfer <type> <jumlah> <@tag>📍 Contoh penggunaan: *${usedPrefix}transfer money 100 @tag*\n\n*List yang bisa di transfer :*\n💹 Money\n💳 Tabungan\n🥤 Potion\n🗑️ Sampah\n💎 Diamond\n📦 Common\n🛍️ Uncommon\n🎁 Mythic\n🧰 Legendary\n🕸️ String\n🪵 Kayu\n🪨 Batu\n⛓ iron`.trim(), m), console.log(e), DevMode)
      for (let jid of owner.map(v => v.replace(/[^0-9]/g, "") + "@s.whatsapp.net").filter(v => v != conn.user.jid)) await conn.reply(jid, "Transfer.js error\nNo: *" + m.sender.split("@")[0] + "*\nCommand: *" + m.text + "*\n\n*" + e + "*", m);
  }
};
handler.help = ["mentransfer <Args>"], handler.tags = ["rpg"], handler.command = /^(mentransfer|mentf)$/i,
  handler.owner = !1, handler.mods = !1, handler.premium = !1, handler.group = !1,
  handler.private = !1, handler.admin = !1, handler.botAdmin = !1, handler.fail = null,
  handler.money = 0;
export default handler;