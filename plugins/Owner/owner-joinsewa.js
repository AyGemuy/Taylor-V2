const handler = async (m, {
  conn,
  text,
  usedPrefix,
  args,
  participants
}) => {
  db.data.users[m.sender].lastjoin;
  let delay = time => new Promise(res => setTimeout(res, time)),
    name = m.sender,
    fkonn = {
      key: {
        fromMe: !1,
        participant: "0@s.whatsapp.net",
        ...m.chat ? {
          remoteJid: "6285346545126@s.whatsapp.net"
        } : {}
      },
      message: {
        contactMessage: {
          displayName: `${conn.getName(name)}`,
          vcard: `BEGIN:VCARD\nVERSION:3.0\nN:;a,;;;\nFN:${name}\nitem1.TEL;waid=${m.sender.split("@")[0]}:${m.sender.split("@")[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`
        }
      }
    },
    [_, code] = text.match(/chat.whatsapp.com\/([0-9A-Za-z]{20,24})/i) || [];
  if (!args[0]) throw "Link nya mana?";
  if (!code) throw "Link tidak valid!";
  if (!args[1]) throw "Angakanya mana?";
  if (isNaN(args[1])) throw "Hanya angka, mewakili hari!";
  let anubot = nomorown;
  m.reply("Tunggu 3 detik bot akan join"), await delay(3e3);
  try {
    let res = await conn.groupAcceptInvite(code),
      d = (await conn.groupMetadata(res)).participants.map(v => v.id),
      e = (d.toString(), await d.filter(v => v.endsWith(anubot + "@s.whatsapp.net"))),
      jumlahHari = 864e5 * args[1],
      now = 1 * new Date();
    now < db.data.chats[res].expired ? db.data.chats[res].expired += jumlahHari : db.data.chats[res].expired = now + jumlahHari,
      e.length && m.reply(`Sukses invite bot ke group\n\n${conn.getName(res)}\n\nBot akan keluar secara otomatis setelah *${msToDate(db.data.chats[res].expired - now)}*`),
      e.length && await conn.reply(res, `Ada @${anubot} Owner-ku Di Sini, Aku Mau Keluar Aja Dah, Takut Kena Marah.\n@${conn.user.jid.split("@")[0]} akan keluar 5 detik lagi\nBye😑\nThanks dah invite Gua *${m.name}*`, fkonn, {
        mentions: d
      }).then(async () => {
        await delay(7e3);
      }).then(async () => {
        await conn.reply(res, "Tapi Boong 🤭", 0), await conn.reply(nomorown + "@s.whatsapp.net", `*INVITING!*\n\n@${m.sender.split("@")[0]} telah mengundang ${conn.user.name} ke grup\n\n${conn.getName(res)}\n\n${res}\n\nPesan : ${args[0]}\n\nBot akan keluar otomatis setelah *${msToDate(db.data.chats[res].expired - now)}*`, null, {
          mentions: [m.sender]
        });
      }), e.length || await conn.reply(nomorown + "@s.whatsapp.net", `*INVITING!*\n\n@${m.sender.split("@")[0]} telah mengundang ${conn.user.name} ke grup\n\n${conn.getName(res)}\n\n${res}\n\nPesan : ${args[0]}\n\nBot akan keluar otomatis setelah *${msToDate(db.data.chats[res].expired - now)}*`, null, {
        mentions: [m.sender]
      }), e.length || m.reply(`Sukses invite bot ke group\n\n${conn.getName(res)}\n\nBot akan keluar secara otomatis setelah *${msToDate(db.data.chats[res].expired - now)}*`).then(async () => {
        let mes = `Hello Everyone👋🏻\n*${conn.user.name}* adalah salah satu Bot WhatsApp Multi-Device yang di bangun dengan Node.js, *${conn.user.name}* Baru aja di invite oleh *${m.name}*\nUntuk menggunakan *${conn.user.name}* silahkan ketik\n#menu\n@${conn.user.jid.split("@")[0]} akan keluar secara otomatis setelah *${msToDate(db.data.chats[res].expired - now)}*`;
        await conn.reply(res, mes, fkonn, {
          mentions: d
        });
      });
  } catch (e) {
    return await conn.reply(nomorown + "@s.whatsapp.net", e), "Maaf bot tidak bisa bergabung ke grup!\n *NOT AUTHORIJET (tidak diizinkan) BG :V";
  }
};
handler.help = ["joins <chat.whatsapp.com> <day>"], handler.tags = ["owner"],
  handler.command = /^joins(ewa)?$/i, handler.owner = !0;
export default handler;

function msToDate(ms) {
  return [isNaN(ms) ? "--" : Math.floor(ms / 864e5), " *Days ☀️*\n ", isNaN(ms) ? "--" : Math.floor(ms / 36e5) % 24, " *Hours 🕐*\n ", isNaN(ms) ? "--" : Math.floor(ms / 6e4) % 60, " *Minute ⏰*\n ", isNaN(ms) ? "--" : Math.floor(ms / 1e3) % 60, " *Second ⏱️* "].map(v => v.toString().padStart(2, 0)).join("");
}