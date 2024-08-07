const items = ["money", "bank", "potion", "trash", "wood", "rock", "string", "petFood", "emerald", "diamond", "gold", "iron", "common", "uncommon", "mythic", "legendary", "pet"];
let confirmation = {};
async function handler(m, {
  conn,
  args,
  usedPrefix,
  command
}) {
  if (confirmation[m.sender]) return m.reply("Kamu sedang melakukan transfer!");
  let user = db.data.users[m.sender];
  const item = items.filter(v => v in user && "number" == typeof user[v]);
  let lol = `Use format ${usedPrefix}${command} [type] [value] [number]\nexample ${usedPrefix}${command} money 9999 @user\n\n📍 Transferable items\n${item.map(v => `${rpg.emoticon(v)}${v}`.trim()).join("\n")}\n`.trim();
  const type = (args[0] || "").toLowerCase();
  if (!item.includes(type)) return m.reply(lol);
  const count = 1 * Math.min(Number.MAX_SAFE_INTEGER, Math.max(1, isNumber(args[1]) ? parseInt(args[1]) : 1));
  let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : args[2] ? args[2].replace(/[@ .+-]/g, "") + "@s.whatsapp.net" : "";
  if (!who) return m.reply("Tag salah satu, atau ketik Nomernya!!");
  if (!(who in db.data.users)) return m.reply(`User ${who} not in database`);
  if (1 * user[type] < count) return m.reply(`Your *${rpg.emoticon(type)}${type}${special(type)}* is less *${count - user[type]}*`);
  let confirm = `\n*––––––『 TRANSFER 』––––––*\n*🗂️ Type:* ${type} ${rpg.emoticon(type)}${special(type)}\n*🧮 Count:* ${count} \n*📨 To:* @${(who || "").replace(/@s\.whatsapp\.net/g, "")}\n\nApakah Anda yakin ingin melakukan transfer\n ✅ (Yes) ❌ (No)\n\n\n⏰ Timeout *60* detik\n`.trim(),
    {
      key
    } = (wm, await conn.reply(m.chat, confirm, m, {
      mentions: [who]
    }));
  confirmation[m.sender] = {
    sender: m.sender,
    to: who,
    message: m,
    type: type,
    count: count,
    key: key,
    pesan: conn,
    timeout: setTimeout(() => (conn.sendMessage(m.chat, {
      delete: key
    }), delete confirmation[m.sender]), 6e4)
  };
}
handler.before = async m => {
    if (m.isBaileys) return;
    if (!(m.sender in confirmation)) return;
    if (!m.text) return;
    let {
      timeout,
      sender,
      message,
      to,
      type,
      count,
      key,
      pesan
    } = confirmation[m.sender];
    if (m.id === message.id) return;
    let user = db.data.users[sender],
      _user = db.data.users[to];
    if (/(✖️|n(o)?)/g.test(m.text.toLowerCase())) return pesan.sendMessage(m.chat, {
      delete: key
    }), clearTimeout(timeout), delete confirmation[sender], m.reply("Reject");
    if (/(✔️|y(es)?)/g.test(m.text.toLowerCase())) {
      let previous = 1 * user[type],
        _previous = 1 * _user[type];
      user[type] -= 1 * count, _user[type] += 1 * count, previous > 1 * user[type] && _previous < 1 * _user[type] ? m.reply(`*––––––『 TRANSFER 』––––––*\n*📊 Status:* Succes\n*🗂️ Type:* ${type}${special(type)} ${rpg.emoticon(type)}\n*🧮 Count:* ${count}\n*📨 To:* @${(to || "").replace(/@s\.whatsapp\.net/g, "")}`, null, {
        mentions: [to]
      }) : (user[type] = previous, _user[type] = _previous, m.reply(`*––––––『 TRANSFER 』––––––*\n*📊 Status:* Failted\n*📍 Item:* ${count} ${rpg.emoticon(type)}${type}${special(type)}\n*📨 To:* @${(to || "").replace(/@s\.whatsapp\.net/g, "")}`, null, {
        mentions: [to]
      })), pesan.sendMessage(m.chat, {
        delete: key
      }), clearTimeout(timeout), delete confirmation[sender];
    }
  }, handler.help = ["transfer", "tf"].map(v => v + " [type] [jumlah] [@tag]"),
  handler.tags = ["rpg"], handler.command = /^(transfer|tf)$/i, handler.disabled = !1;
export default handler;

function special(type) {
  let b = type.toLowerCase();
  return ["common", "uncommon", "mythic", "legendary", "pet"].includes(b) ? " Crate" : "";
}

function isNumber(x) {
  return !isNaN(x);
}