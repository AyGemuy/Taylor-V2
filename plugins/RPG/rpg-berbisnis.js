const handler = async (m, {
  conn,
  args,
  text,
  usedPrefix,
  command
}) => {
  let who1 = m.mentionedJid[0],
    who2 = m.mentionedJid[1],
    who3 = m.mentionedJid[2];
  if (text.split(" ").length < 3) throw "Minimal tag 3 member!";
  if (!text) return await conn.reply(m.chat, `*❏ GET NUMBER*\n\n• ${usedPrefix + command} @tag @tag @tag`, m);
  if (void 0 === db.data.users[who1] || void 0 === db.data.users[who2] || void 0 === db.data.users[who2] || void 0 === db.data.users[who3]) throw "Di antara target yang kamu tag\nMereka tidak terdeteksi didalam database";
  let timers = clockString(864e5 - (new Date() - db.data.users[m.sender].lastbisnis)),
    users = db.data.users,
    name = m.sender;
  if (9999 > users[who1].money || 9999 > users[who2].money || 9999 > users[who3].money) throw "Di antara target yang kamu tag\nMereka tidak memiliki modal..\nHarap masukkan modal terlebih dahulu 10000";
  if (9999 > users[m.sender].money) throw "kamu tidak memiliki modal harap masukkan modal 10000";
  if (new Date() - db.data.users[m.sender].lastbisnis > 864e5) {
    let dapat = Math.floor(1e4 * Math.random()),
      untung = Math.floor(1e5 * Math.random()),
      rugi = Math.floor(5e4 * Math.random());
    db.data.users[m.sender].money -= 1 * dapat, db.data.users[who1].money -= 1 * dapat,
      db.data.users[who2].money -= 1 * dapat, db.data.users[who3].money -= 1 * dapat;
    let caption = `Mohon tunggu kak..\n\n@${m.sender.split("@")[0]}\n@${who1.split("@")[0]}\n@${who2.split("@")[0]}\n@${who3.split("@")[0]}\nSedang berbisnis.. 😅\n\n*Kalian semua meletakkan modal masing-masing -${dapat} 😅*\n@${name.split("@")[0]}\n@${who1.split("@")[0]}\n@${who2.split("@")[0]}\n@${who3.split("@")[0]}`;
    await conn.reply(m.chat, caption, m, {
      mentions: conn.parseMention(caption)
    }), setTimeout(async () => {
      let bis = `Selamat statistik bisnis kalian meningkat\n\nMasing-masing mendapatkan:\n@${name.split("@")[0]} : *+${users[m.sender].money += 1 * untung} Money*\n@${who1.split("@")[0]} : *+${users[who1].money += 1 * untung} Money*\n@${who2.split("@")[0]} : *+${users[who2].money += 1 * untung} Money*\n@${who3.split("@")[0]} : *+${users[who3].money += 1 * untung} Money*`;
      await conn.reply(m.chat, bis, m, {
        mentions: conn.parseMention(bis)
      });
    }, 6e4), setTimeout(async () => {
      let bis = `Waahhh.. statistik bisnis kalian menurun\n\nMasing-masing minus:\n@${name.split("@")[0]} : *-${users[m.sender].money -= 1 * rugi} Money*\n@${who1.split("@")[0]} : *-${users[who1].money -= 1 * rugi} Money*\n@${who2.split("@")[0]} : *-${users[who2].money -= 1 * rugi} Money*\n@${who3.split("@")[0]} : *-${users[who3].money -= 1 * rugi} Money*`;
      await conn.reply(m.chat, bis, m, {
        mentions: conn.parseMention(bis)
      });
    }, 144e5), setTimeout(async () => {
      let bis = `Selamat statistik bisnis kalian meningkat\n\nMasing-masing mendapatkan:\n@${name.split("@")[0]} : *+${users[m.sender].money += 1 * untung} Money*\n@${who1.split("@")[0]} : *+${users[who1].money += 1 * untung} Money*\n@${who2.split("@")[0]} : *+${users[who2].money += 1 * untung} Money*\n@${who3.split("@")[0]} : *+${users[who3].money += 1 * untung} Money*`;
      await conn.reply(m.chat, bis, m, {
        mentions: conn.parseMention(bis)
      });
    }, 288e5), setTimeout(async () => {
      let bis = `Selamat statistik bisnis kalian meningkat\n\nMasing-masing mendapatkan:\n@${name.split("@")[0]} : *+${users[m.sender].money += 1 * untung} Money*\n@${who1.split("@")[0]} : *+${users[who1].money += 1 * untung} Money*\n@${who2.split("@")[0]} : *+${users[who2].money += 1 * untung} Money*\n@${who3.split("@")[0]} : *+${users[who3].money += 1 * untung} Money*`;
      await conn.reply(m.chat, bis, m, {
        mentions: conn.parseMention(bis)
      });
    }, 432e5), setTimeout(async () => {
      let bis = `Mohon tunggu kak..\n\n@${name.split("@")[0]}\n@${who1.split("@")[0]}\n@${who2.split("@")[0]}\n@${who3.split("@")[0]}\nSedang berbisnis.. 😅\n\n*Kalian semua meletakkan modal masing-masing -${dapat} 😅*\n@${name.split("@")[0]}\n@${who1.split("@")[0]}\n@${who2.split("@")[0]}\n@${who3.split("@")[0]}`;
      await conn.reply(m.chat, bis, m, {
        mentions: conn.parseMention(bis)
      });
    }, 576e5), setTimeout(async () => {
      let bis = `Selamat statistik bisnis kalian meningkat\n\nMasing-masing mendapatkan:\n@${name.split("@")[0]} : *+${users[m.sender].money += 1 * untung} Money*\n@${who1.split("@")[0]} : *+${users[who1].money += 1 * untung} Money*\n@${who2.split("@")[0]} : *+${users[who2].money += 1 * untung} Money*\n@${who3.split("@")[0]} : *+${users[who3].money += 1 * untung} Money*`;
      await conn.reply(m.chat, bis, m, {
        mentions: conn.parseMention(bis)
      });
    }, 72e6);
  } else m.reply(`Anda Sudah Berbisnis , tunggu ${timers} lagi..`);
};
handler.help = ["berbisnis"], handler.tags = ["rpg"], handler.command = /^berbisnis$/i,
  handler.limit = !0, handler.group = !0;
export default handler;

function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)];
}

function clockString(ms) {
  let h = Math.floor(ms / 36e5),
    m = Math.floor(ms / 6e4) % 60,
    s = Math.floor(ms / 1e3) % 60;
  return console.log({
    ms: ms,
    h: h,
    m: m,
    s: s
  }), [h, m, s].map(v => v.toString().padStart(2, 0)).join(":");
}