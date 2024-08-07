let rumahsakit = 500,
  benteng = 700,
  camptroops = 900,
  pertanian = 700,
  pertambangan = 600;
const handler = async (m, {
  conn,
  command,
  args,
  usedPrefix,
  DevMode
}) => {
  let type = (args[0] || "").toLowerCase(),
    user = ((args[0] || "").toLowerCase(), db.data.users[m.sender]);
  const list = `\n╭──『 Facility 』\n│⬡ typing command↓\n│   ${usedPrefix + command} benteng\n│\n│⬡ 🏯 *Benteng*\n│⬡ 🌾 *Pertanian*\n│⬡ 🏕️ *Camptroop*\n│⬡ ⚒️ *Pertambangan*\n│⬡ 🏥 *Rumah Sakit*\n╰───────────────\n`.trim();
  try {
    if (/build|bangun/i.test(command)) {
      const count = args[1] && args[1].length > 0 ? Math.min(99999999, Math.max(parseInt(args[1]), 1)) : !args[1] || args.length < 3 ? 1 : Math.min(1, count);
      switch (type) {
        case "benteng":
        case "fortress":
          db.data.users[m.sender].batu > benteng * count ? (db.data.users[m.sender].batu, db.data.users[m.sender].fortress += 1 * count, db.data.users[m.sender].kayu -= benteng * count, db.data.users[m.sender].batu -= benteng * count, m.reply("berhasil membangun benteng")) : m.reply(`Sda Kamu tidak cukup untuk membangun benteng yg senilai ${benteng * count}Kayu ${benteng * count}batu`);
          break;
        case "pertanian":
          user.batu > pertanian * count ? (user.batu, user.pertanian += 1 * count, user.kayu -= pertanian * count, user.batu -= pertanian * count) : m.reply(`Sda Kamu tidak cukup untuk membangun pertanian yg senilai ${pertanian * count}Kayu ${pertanian * count}batu`);
          break;
        case "camptroops":
        case "camptroop":
          user.batu > camptroops * count ? (user.batu, user.camptroops += 1 * count, user.kayu -= camptroops * count, user.batu -= camptroops * count) : m.reply(`Sda Kamu tidak cukup untuk membangun kamp pasukan yg senilai ${camptroops * count}Kayu ${camptroops * count}batu`);
          break;
        case "pertambangan":
          user.tambang > pertambangan * count ? (user.batu, user.tambang += 1 * count, user.kayu -= pertambangan * count, user.batu -= pertambangan * count) : m.reply(`Sda Kamu tidak cukup untuk membangun pertanian yg senilai ${pertambangan * count}Kayu ${pertambangan * count}batu`);
          break;
        case "rumahsakit":
        case "hospital":
          user.rumahsakit > rumahsakit * count ? (user.rumahsakit += 1 * count, user.kayu -= rumahsakit * count, user.batu -= rumahsakit * count) : m.reply(`Sda Kamu tidak cukup untuk membangun pertanian yg senilai ${rumahsakit * count}Kayu ${rumahsakit * count}batu`);
          break;
        default:
          return await conn.reply(m.chat, list, m);
      }
    }
  } catch (e) {
    if (await conn.reply(m.chat, "Error", m), console.log(e), DevMode)
      for (let jid of owner.map(v => v.replace(/[^0-9]/g, "") + "@s.whatsapp.net").filter(v => v != conn.user.jid)) await conn.reply(jid, "shop.js error\nNo: *" + m.sender.split("@")[0] + "*\nCommand: *" + m.text + "*\n\n*" + e + "*", m);
  }
};
handler.help = ["build <args>", "upgrade <sell|buy> <args>"], handler.tags = ["rpg"],
  handler.owner = !1, handler.command = /^(build|bangun|upgrade|upgd)$/i;
export default handler;