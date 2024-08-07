const handler = async (m, {
  command,
  usedPrefix,
  args
}) => {
  let user = db.data.users[m.sender],
    type = ((args[0] || "").toLowerCase(), (args[0] || "").toLowerCase()),
    _type = (args[1] || "").toLowerCase();
  (args[0] || "").toLowerCase();
  const list = `\n╭──『 ғᴏᴏᴅ 』\n│⬡ typing command↓\n│   ${usedPrefix + command} rendang\n│\n│⬡ 🍖 *Ayam Bakar*\n│⬡ 🍗 *Ayam Goreng*\n│⬡ 🥘 *Rendang*\n│⬡ 🥩 *Steak*\n│⬡ 🥠 *Babi Panggang*\n│⬡ 🍲 *Gulai Ayam*\n│⬡ 🍜 *Opor Ayam*\n│⬡ 🍷 *Vodka*\n│⬡ 🍣 *Sushi*\n│⬡ 💉 *Bandage*\n│⬡ ☘️ *Ganja*\n│⬡ 🍺 *Soda*\n│⬡ 🍞 *Roti*\n│⬡ 🍖 *Ikan Bakar*\n│⬡ 🍖 *Lele Bakar*\n│⬡ 🍖 *Nila Bakar*\n│⬡ 🍖 *Bawal Bakar*\n│⬡ 🍖 *Udang Bakar*\n│⬡ 🍖 *Paus Bakar*\n╰───────────────\n`.trim();
  if (/makan|eat/i.test(command)) {
    const count = args[1] && args[1].length > 0 ? Math.min(99999999, Math.max(parseInt(args[1]), 1)) : !args[1] || args.length < 3 ? 1 : Math.min(1, count);
    switch (type) {
      case "ayamgoreng":
        user.stamina < 100 ? user.ayamgoreng >= 1 * count ? (user.ayamgoreng -= 1 * count, user.stamina += 20 * count, await conn.reply(m.chat, "Nyam nyam", m)) : await conn.reply(m.chat, " Ayam goreng kamu kurang", m) : await conn.reply(m.chat, "Stamina kamu sudah penuh", m);
        break;
      case "ayambakar":
        user.stamina < 100 ? user.ayambakar >= 1 * count ? (user.ayambakar -= 1 * count, user.stamina += 20 * count, await conn.reply(m.chat, "Nyam nyam", m)) : await conn.reply(m.chat, " Ayam bakar kamu kurang", m) : await conn.reply(m.chat, "Stamina kamu sudah penuh", m);
        break;
      case "oporayam":
        user.stamina < 100 ? user.oporayam >= 1 * count ? (user.oporayam -= 1 * count, user.stamina += 20 * count, await conn.reply(m.chat, "Nyam nyam", m)) : await conn.reply(m.chat, " Opor ayam kamu kurang", m) : await conn.reply(m.chat, "Stamina kamu sudah penuh", m);
        break;
      case "rendang":
        user.stamina < 100 ? user.rendang >= 1 * count ? (user.rendang -= 1 * count, user.stamina += 20 * count, await conn.reply(m.chat, "Nyam nyam", m)) : await conn.reply(m.chat, " Rendang kamu kurang", m) : await conn.reply(m.chat, "Stamina kamu sudah penuh", m);
        break;
      case "steak":
        user.stamina < 100 ? user.steak >= 1 * count ? (user.steak -= 1 * count, user.stamina += 20 * count, await conn.reply(m.chat, "Nyam nyam", m)) : await conn.reply(m.chat, " Steak kamu kurang", m) : await conn.reply(m.chat, "Stamina kamu sudah penuh", m);
        break;
      case "gulaiayam":
        user.stamina < 100 ? user.gulaiayam >= 1 * count ? (user.gulaiayam -= 1 * count, user.stamina += 20 * count, await conn.reply(m.chat, "Nyam nyam", m)) : await conn.reply(m.chat, " Gulai ayam kamu kurang", m) : await conn.reply(m.chat, "Stamina kamu sudah penuh", m);
        break;
      case "babipanggang":
        user.stamina < 100 ? user.babipanggang >= 1 * count ? (user.babipanggang -= 1 * count, user.stamina += 20 * count, await conn.reply(m.chat, "Nyam nyam", m)) : await conn.reply(m.chat, " Babi panggang kamu kurang", m) : await conn.reply(m.chat, "Stamina kamu sudah penuh", m);
        break;
      case "soda":
        user.stamina < 100 ? user.soda >= 1 * count ? (user.soda -= 1 * count, user.stamina += 20 * count, await conn.reply(m.chat, "Glek glek glek", m)) : await conn.reply(m.chat, " Soda kamu kurang", m) : await conn.reply(m.chat, "Stamina kamu sudah penuh", m);
        break;
      case "vodka":
        user.stamina < 100 ? user.vodka >= 1 * count ? (user.vodka -= 1 * count, user.stamina += 25 * count, await conn.reply(m.chat, "Glek Glek Glek", m)) : await conn.reply(m.chat, " Vodka kamu kurang", m) : await conn.reply(m.chat, "Stamina kamu sudah penuh", m);
        break;
      case "ganja":
        user.stamina < 100 ? user.ganja >= 1 * count ? (user.ganja -= 1 * count, user.healt += 90 * count, await conn.reply(m.chat, "ngefly", m)) : await conn.reply(m.chat, " Ganja kamu kurang", m) : await conn.reply(m.chat, "Stamina kamu sudah penuh", m);
        break;
      case "bandage":
        user.stamina < 100 ? user.bandage >= 1 * count ? (user.bandage -= 1 * count, user.healt += 25 * count, await conn.reply(m.chat, "Sretset", m)) : await conn.reply(m.chat, " Bandage kamu kurang", m) : await conn.reply(m.chat, "Healt kamu sudah penuh", m);
        break;
      case "sushi":
        user.stamina < 100 ? user.sushi >= 1 * count ? (user.sushi -= 1 * count, user.stamina += 20 * count, await conn.reply(m.chat, "Nyam nyam", m)) : await conn.reply(m.chat, " Sushi kamu kurang", m) : await conn.reply(m.chat, "Stamina kamu sudah penuh", m);
        break;
      case "roti":
        user.stamina < 100 ? user.roti >= 1 * count ? (user.roti -= 1 * count, user.stamina += 20 * count, await conn.reply(m.chat, "Nyam nyam", m)) : await conn.reply(m.chat, " Roti kamu kurang", m) : await conn.reply(m.chat, "Stamina kamu sudah penuh", m);
        break;
      case "ikanbakar":
        user.stamina < 100 ? user.ikanbakar >= 1 * count ? (user.ikanbakar -= 1 * count, user.stamina += 20 * count, await conn.reply(m.chat, "Nyam nyam", m)) : await conn.reply(m.chat, " ikan bakar kamu kurang", m) : await conn.reply(m.chat, "Stamina kamu sudah penuh", m);
        break;
      case "lelebakar":
        user.stamina < 100 ? user.lelebakar >= 1 * count ? (user.lelebakar -= 1 * count, user.stamina += 20 * count, await conn.reply(m.chat, "Nyam nyam", m)) : await conn.reply(m.chat, " lele bakar kamu kurang", m) : await conn.reply(m.chat, "Stamina kamu sudah penuh", m);
        break;
      case "nilabakar":
        user.stamina < 100 ? user.nilabakar >= 1 * count ? (user.nilabakar -= 1 * count, user.stamina += 20 * count, await conn.reply(m.chat, "Nyam nyam", m)) : await conn.reply(m.chat, " nila bakar kamu kurang", m) : await conn.reply(m.chat, "Stamina kamu sudah penuh", m);
        break;
      case "bawalbakar":
        user.stamina < 100 ? user.bawalbakar >= 1 * count ? (user.bawalbakar -= 1 * count, user.stamina += 20 * count, await conn.reply(m.chat, "Nyam nyam", m)) : await conn.reply(m.chat, " bawal bakar kamu kurang", m) : await conn.reply(m.chat, "Stamina kamu sudah penuh", m);
        break;
      case "udangbakar":
        user.stamina < 100 ? user.udangbakar >= 1 * count ? (user.udangbakar -= 1 * count, user.stamina += 20 * count, await conn.reply(m.chat, "Nyam nyam", m)) : await conn.reply(m.chat, " udang bakar kamu kurang", m) : await conn.reply(m.chat, "Stamina kamu sudah penuh", m);
        break;
      case "pausbakar":
        user.stamina < 100 ? user.pausbakar >= 1 * count ? (user.pausbakar -= 1 * count, user.stamina += 20 * count, await conn.reply(m.chat, "Nyam nyam", m)) : await conn.reply(m.chat, " paus bakar kamu kurang", m) : await conn.reply(m.chat, "Stamina kamu sudah penuh", m);
        break;
      case "kepitingbakar":
        user.stamina < 100 ? user.kepitingbakar >= 1 * count ? (user.kepitingbakar -= 1 * count, user.stamina += 20 * count, await conn.reply(m.chat, "Nyam nyam", m)) : await conn.reply(m.chat, " kepiting bakar kamu kurang", m) : await conn.reply(m.chat, "Stamina kamu sudah penuh", m);
        break;
      default:
        return await conn.reply(m.chat, list, m);
    }
  } else if (/p/i.test(command)) {
    const count = args[2] && args[2].length > 0 ? Math.min(99999999, Math.max(parseInt(args[2]), 1)) : !args[2] || args.length < 4 ? 1 : Math.min(1, count);
    if ("p" !== _type) return await conn.reply(m.chat, list, m);
    if (console.log(e), DevMode)
      for (let jid of owner.map(v => v.replace(/[^0-9]/g, "") + "@s.whatsapp.net").filter(v => v != conn.user.jid)) await conn.reply(jid, "shop.js error\nNo: *" + m.sender.split("@")[0] + "*\nCommand: *" + m.text + "*\n\n*" + e + "*", m);
  }
};
handler.help = ["eat", "makan"], handler.tags = ["rpg"], handler.register = !0,
  handler.command = /^(eat|makan)$/i;
export default handler;