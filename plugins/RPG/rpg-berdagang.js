const cooldown = 288e5,
  handler = async (m, {
    conn,
    text,
    usedPrefix,
    command
  }) => {
    let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender;
    void 0 === db.data.users[who] && (db.data.users[who] = {
      exp: 0,
      limit: 10,
      lastclaim: 0,
      lastdagang: 0,
      registered: !1,
      name: conn.getName(m.sender),
      age: -1,
      regTime: -1,
      afk: -1,
      afkReason: "",
      banned: !1,
      level: 0,
      lastweekly: 0,
      role: "Warrior V",
      autolevelup: !1,
      money: 0,
      pasangan: ""
    });
    let user = db.data.users[who],
      dapat = Math.floor(5e3 * Math.random());
    if (!who) throw "Tag salah satu lah, yang kamu ingin berdagang bareng";
    let timers = clockString(288e5 - (new Date() - user.lastdagang));
    if (!(user.lastdagang < 288e5)) return await conn.reply(m.chat, `Anda Sudah Berdagang tunggu\n${timers} lagi..`, botdate, m);
    {
      if (4999 > user.money) throw "Target tidak memiliki modal harap masukkan modal 5000";
      if (4999 > user.money) throw "kamu tidak memiliki modal harap masukkan modal 5000";
      let caption = `${htki} BERDAGANG ${htka}\nMohon tunggu kak..\n@${m.sender.split("@")[0]} dan @${who.split("@")[0]} sedang berdagang.. 😅\n\n@${m.sender.split("@")[0]} dan @${who.split("@")[0]} meletakkan modal -${dapat} 😅`,
        _caption = `Selamat @${m.sender.split("@")[0]} dan @${who.split("@")[0]} mendapatkan money..\n\nPenghasilan dagang @${m.sender.split("@")[0]} didapatkan +5000\n${user.money += 5e3} Money @${m.sender.split("@")[0]}\n\nPenghasilan dagang @${who.split("@")[0]} didapatkan +5000\n${user.money += 5e3} Money @${who.split("@")[0]}`,
        __caption = `${htki} SUKSES ${htka}\nSelamat @${m.sender.split("@")[0]} dan @${who.split("@")[0]} mendapatkan money..\n\nPenghasilan dagang @${m.sender.split("@")[0]} didapatkan +10000\n${user.money += 1e4} Money @${m.sender.split("@")[0]}\n\nPenghasilan dagang @${who.split("@")[0]} didapatkan +10000\n${user.money += 1e4} Money @${who.split("@")[0]}`;
      await conn.reply(m.chat, caption + "\n" + clockString(6e4), m, {
        mentions: conn.parseMention(caption)
      }), setTimeout(async () => {
        await conn.reply(m.chat, __caption + "\nSUKSES", m, {
          mentions: conn.parseMention(__caption)
        });
      }, 108e5), setTimeout(async () => {
        await conn.reply(m.chat, _caption + "\n" + clockString(108e5), m, {
          mentions: conn.parseMention(_caption)
        });
      }, 72e5), setTimeout(async () => {
        await conn.reply(m.chat, _caption + "\n" + clockString(72e5), m, {
          mentions: conn.parseMention(_caption)
        });
      }, 36e5), setTimeout(async () => {
        await conn.reply(m.chat, _caption + "\n" + clockString(36e5), m, {
          mentions: conn.parseMention(_caption)
        });
      }, 6e4), user.lastdagang = 1 * new Date();
    }
  };
handler.help = ["berdagang"].map(v => v + " @[tag]"), handler.tags = ["rpg"],
  handler.command = /^(berdagang|dagang)$/i, handler.limit = !0, handler.cooldown = 288e5;
export default handler;

function clockString(ms) {
  return ["\n" + (isNaN(ms) ? "--" : Math.floor(ms / 864e5)), " *Days ☀️*\n ", isNaN(ms) ? "--" : Math.floor(ms / 36e5) % 24, " *Hours 🕐*\n ", isNaN(ms) ? "--" : Math.floor(ms / 6e4) % 60, " *Minute ⏰*\n ", isNaN(ms) ? "--" : Math.floor(ms / 1e3) % 60, " *Second ⏱️* "].map(v => v.toString().padStart(2, 0)).join("");
}