const handler = async (m, {
  conn,
  text,
  args,
  command
}) => {
  conn.duel = conn.duel ? conn.duel : [], 0 != args.length && conn.duel.push(m.mentionedJid ? m.mentionedJid[0] : args[0]?.replace(/[@ .+-]/g, "").replace(" ", "") + "@s.whatsapp.net");
  let who = conn.duel[0],
    enemy = db.data.users[who],
    user = db.data.users[m.sender],
    Aku = (args[1] && args[1].length > 0 ? Math.min(100, Math.max(parseInt(args[1]), 1)) : Math.min(1), conn.getName(m.sender), 1 * `${Math.floor(101 * Math.random())}`.trim()),
    Kamu = 1 * `${Math.floor(81 * Math.random())}`.trim(),
    timers = clockString(3e5 - (new Date() - user.lastduel));
  try {
    if (/duel/.test(command)) {
      if (!who) return m.reply("tag yg ingin di ajak duel!");
      let pler = `@${m.sender.replace(/@.+/, "")} Mengajak duel ${args[0]}\n\nPilih Y Atau No`,
        mentionedJid = [m.sender];
      new Date() - user.lastduel > 3e5 ? await conn.reply(m.chat, pler, m, {
        mentions: conn.parseMention(mentionedJid)
      }) : await conn.reply(m.chat, `Kamu Sudah Berduel Tunggu hingga ${timers}`, m);
    }
    if (/dya/.test(command)) {
      if (!who.includes(m.sender)) throw "Lu siapa?\nkok ikut kut mau duel";
      user.lastduel = 1 * new Date(), Aku > Kamu ? (user.money -= 900, enemy.money += 900, delete conn.duel[m.sender], await conn.reply(m.chat, `@${who.split("@")[0]} Menang Gelud🤼\n*Hadiah:*\n900 Money buat beli gorengan`.trim(), m)) : Aku < Kamu ? (user.money += 450, enemy.money -= 450, delete conn.duel[m.sender], await conn.reply(m.chat, `@${who.split("@")[0]} Kalah Gelud🤼\n*Hadiah:*\n 450 money Mayan buat beli Limit`.trim(), m)) : (user.money += 250, enemy.money += 250, delete conn.duel[m.sender], await conn.reply(m.chat, `@${who.split("@")[0]}\n *Seri*\n masing masing 250 Money`.trim(), m));
    }
    if (/dno/.test(command)) {
      if (!who.includes(m.sender)) return await conn.reply(m.chat, "Lu siapa?\nkok ikut kut mau duel", m);
      await conn.reply(m.chat, `@${who.split("@")[0]} Membatalkan Ajakan Duel`, m), delete conn.duel[m.sender];
    }
  } catch (e) {
    return m.reply(`${e}`);
  }
};
handler.help = ["duel @tag"], handler.tags = ["rpg"], handler.command = /^(duel|dya|dno)/i,
  handler.group = !0;
export default handler;

function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)];
}

function clockString(ms) {
  return ["\n" + (isNaN(ms) ? "--" : Math.floor(ms / 864e5)), " *Days ☀️*\n ", isNaN(ms) ? "--" : Math.floor(ms / 36e5) % 24, " *Hours 🕐*\n ", isNaN(ms) ? "--" : Math.floor(ms / 6e4) % 60, " *Minute ⏰*\n ", isNaN(ms) ? "--" : Math.floor(ms / 1e3) % 60, " *Second ⏱️* "].map(v => v.toString().padStart(2, 0)).join("");
}