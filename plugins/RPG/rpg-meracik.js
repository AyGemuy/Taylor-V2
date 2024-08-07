import fetch from "node-fetch";
const handler = async (m, {
  conn,
  args,
  usedPrefix,
  command,
  text
}) => {
  switch ((args[0] || "").toLowerCase()) {
    case "ramuan":
      let apelu = db.data.users[m.sender].apel,
        angguru = db.data.users[m.sender].anggur,
        manggau = db.data.users[m.sender].mangga,
        pisangu = db.data.users[m.sender].pisang,
        jeruku = db.data.users[m.sender].jeruk,
        waktuga = clockString(6e5 - (new Date() - db.data.users[m.sender].lastramuanclaim));
      if (0 === apelu || 0 === angguru || 0 === manggau || 0 === pisangu || 0 === jeruku) return m.reply("*Pastikan kamu memiliki semua buah buahan*\n*Seperti Apel, Mangga, Jeruk, Pisang, Anggur*");
      if (new Date() - db.data.users[m.sender].lastramuanclaim > 6e5)
        if (db.data.users[m.sender].mangga > 499)
          if (db.data.users[m.sender].apel > 499)
            if (db.data.users[m.sender].pisang > 499)
              if (db.data.users[m.sender].jeruk > 499)
                if (db.data.users[m.sender].anggur > 499) {
                  let _manggas = `${Math.floor(500 * Math.random())}`.trim(),
                    _anggurs = `${Math.floor(500 * Math.random())}`.trim(),
                    _jeruks = `${Math.floor(500 * Math.random())}`.trim(),
                    _apels = `${Math.floor(500 * Math.random())}`.trim(),
                    _pisangs = `${Math.floor(500 * Math.random())}`.trim(),
                    ramuans = 1 * `${pickRandom([ "1", "2", "3", "4", "5" ])}`.trim(),
                    manggas = 1 * _manggas,
                    anggurs = 1 * _anggurs,
                    jeruks = 1 * _jeruks,
                    apels = 1 * _apels,
                    pisangs = 1 * _pisangs;
                  db.data.users[m.sender].mangga -= 1 * manggas, db.data.users[m.sender].anggur -= 1 * anggurs,
                    db.data.users[m.sender].jeruk -= 1 * jeruks, db.data.users[m.sender].apel -= 1 * apels,
                    db.data.users[m.sender].pisang -= 1 * pisangs, db.data.users[m.sender].ramuan += 1 * ramuans,
                    db.data.users[m.sender].lastramuanclaim = 1 * new Date();
                  let srcs = `\nBerhasil meracik ramuan:\n-${apels} Apel\n-${manggas} Mangga\n-${anggurs} Anggur\n-${jeruks} Jeruk\n-${pisangs} Pisang\n\nSelamat kamu mendapatkan ramuan: \n+${ramuans}\n`.trim();
                  setTimeout(async () => {
                    await conn.reply(m.chat, "Yuk meracik lagi..", m);
                  }, 6e5), setTimeout(async () => {
                    await conn.reply(m.chat, srcs, m);
                  }, 6e4), setTimeout(async () => {
                    await conn.reply(m.chat, "Mohon tunggu sedang mengaduk ramuan", m);
                  }, 1e3);
                } else m.reply("Pastikan anggur kamu *500* untuk bisa meracik ramuan");
      else m.reply("Pastikan jeruk kamu *500* untuk bisa meracik ramuan");
      else m.reply("Pastikan pisang kamu *500* untuk bisa meracik ramuan");
      else m.reply("Pastikan apel kamu *500* untuk bisa meracik ramuan");
      else m.reply("Pastikan mangga kamu *500* untuk bisa meracik ramuan");
      else m.reply(`Kamu sudah meracik, tidak bisa meracik kembali..\nMohon tunggu ${waktuga} lagi untuk meracik kembali `);
      break;
    case "potion":
      let apele = db.data.users[m.sender].apel,
        anggure = db.data.users[m.sender].anggur,
        manggae = db.data.users[m.sender].mangga,
        pisange = db.data.users[m.sender].pisang,
        jeruke = db.data.users[m.sender].jeruk,
        waktution = clockString(6e5 - (new Date() - db.data.users[m.sender].lastpotionclaim));
      if (0 === apele || 0 === anggure || 0 === manggae || 0 === pisange || 0 === jeruke) return m.reply("*Pastikan kamu memiliki semua buah buahan*\n*Seperti Apel, Mangga, Jeruk, Pisang, Anggur*");
      if (new Date() - db.data.users[m.sender].lastpotionclaim > 6e5)
        if (db.data.users[m.sender].mangga > 499)
          if (db.data.users[m.sender].apel > 499)
            if (db.data.users[m.sender].pisang > 499)
              if (db.data.users[m.sender].jeruk > 499)
                if (db.data.users[m.sender].anggur > 499) {
                  let _manggan = `${Math.floor(500 * Math.random())}`.trim(),
                    _anggurn = `${Math.floor(500 * Math.random())}`.trim(),
                    _jerukn = `${Math.floor(500 * Math.random())}`.trim(),
                    _apeln = `${Math.floor(500 * Math.random())}`.trim(),
                    _pisangn = `${Math.floor(500 * Math.random())}`.trim(),
                    potionn = 1 * `${pickRandom([ "1", "2", "3", "4", "5", "6", "7", "8", "9", "10" ])}`.trim(),
                    manggan = 1 * _manggan,
                    anggurn = 1 * _anggurn,
                    jerukn = 1 * _jerukn,
                    apeln = 1 * _apeln,
                    pisangn = 1 * _pisangn;
                  db.data.users[m.sender].mangga -= 1 * manggan, db.data.users[m.sender].anggur -= 1 * anggurn,
                    db.data.users[m.sender].jeruk -= 1 * jerukn, db.data.users[m.sender].apel -= 1 * apeln,
                    db.data.users[m.sender].pisang -= 1 * pisangn, db.data.users[m.sender].potion += 1 * potionn,
                    db.data.users[m.sender].lastpotionclaim = 1 * new Date();
                  let srcn = `\nBerhasil meracik potion:\n-${apeln} Apel\n-${manggan} Mangga\n-${anggurn} Anggur\n-${jerukn} Jeruk\n-${pisangn} Pisang\n\nSelamat kamu mendapatkan potion: \n+${potionn}\n`.trim();
                  setTimeout(async () => {
                    await conn.reply(m.chat, "Yuk meracik lagi..", m);
                  }, 6e5), setTimeout(async () => {
                    await conn.reply(m.chat, srcn, m);
                  }, 6e4), setTimeout(async () => {
                    await conn.reply(m.chat, "Mohon tunggu sedang mengaduk potion", m);
                  }, 1e3);
                } else m.reply("Pastikan anggur kamu *500* untuk bisa meracik potion");
      else m.reply("Pastikan jeruk kamu *500* untuk bisa meracik potion");
      else m.reply("Pastikan pisang kamu *500* untuk bisa meracik potion");
      else m.reply("Pastikan apel kamu *500* untuk bisa meracik potion");
      else m.reply("Pastikan mangga kamu *500* untuk bisa meracik potion");
      else m.reply(`Kamu sudah meracik, tidak bisa meracik kembali..\nMohon tunggu ${waktution} lagi untuk meracik kembali `);
      break;
    case "string":
      let apelg = db.data.users[m.sender].apel,
        anggurg = db.data.users[m.sender].anggur,
        manggag = db.data.users[m.sender].mangga,
        pisangg = db.data.users[m.sender].pisang,
        jerukg = db.data.users[m.sender].jeruk,
        waktutiong = clockString(6e5 - (new Date() - db.data.users[m.sender].laststringclaim));
      if (0 === apelg || 0 === anggurg || 0 === manggag || 0 === pisangg || 0 === jerukg) return m.reply("*Pastikan kamu memiliki semua buah buahan*\n*Seperti Apel, Mangga, Jeruk, Pisang, Anggur*");
      if (new Date() - db.data.users[m.sender].laststringclaim > 6e5)
        if (db.data.users[m.sender].mangga > 499)
          if (db.data.users[m.sender].apel > 499)
            if (db.data.users[m.sender].pisang > 499)
              if (db.data.users[m.sender].jeruk > 499)
                if (db.data.users[m.sender].anggur > 499) {
                  let _manggang = `${Math.floor(500 * Math.random())}`.trim(),
                    _anggurng = `${Math.floor(500 * Math.random())}`.trim(),
                    _jerukng = `${Math.floor(500 * Math.random())}`.trim(),
                    _apelng = `${Math.floor(500 * Math.random())}`.trim(),
                    _pisangng = `${Math.floor(500 * Math.random())}`.trim(),
                    strings = 1 * `${pickRandom([ "1", "2", "3", "4" ])}`.trim(),
                    manggang = 1 * _manggang,
                    anggurng = 1 * _anggurng,
                    jerukng = 1 * _jerukng,
                    apelng = 1 * _apelng,
                    pisangng = 1 * _pisangng;
                  db.data.users[m.sender].mangga -= 1 * manggang, db.data.users[m.sender].anggur -= 1 * anggurng,
                    db.data.users[m.sender].jeruk -= 1 * jerukng, db.data.users[m.sender].apel -= 1 * apelng,
                    db.data.users[m.sender].pisang -= 1 * pisangng, db.data.users[m.sender].string += 1 * strings,
                    db.data.users[m.sender].laststringclaim = 1 * new Date();
                  let srcng = `\nBerhasil meracik string:\n-${apelng} Apel\n-${manggang} Mangga\n-${anggurng} Anggur\n-${jerukng} Jeruk\n-${pisangng} Pisang\n\nSelamat kamu mendapatkan string: \n+${strings}\n`.trim();
                  setTimeout(async () => {
                    await conn.reply(m.chat, "Yuk meracik lagi..", m);
                  }, 6e5), setTimeout(async () => {
                    await conn.reply(m.chat, srcng, m);
                  }, 6e4), setTimeout(async () => {
                    await conn.reply(m.chat, "Mohon tunggu sedang mengaduk string", m);
                  }, 1e3);
                } else m.reply("Pastikan anggur kamu *500* untuk bisa meracik string");
      else m.reply("Pastikan jeruk kamu *500* untuk bisa meracik string");
      else m.reply("Pastikan pisang kamu *500* untuk bisa meracik string");
      else m.reply("Pastikan apel kamu *500* untuk bisa meracik string");
      else m.reply("Pastikan mangga kamu *500* untuk bisa meracik string");
      else m.reply(`Kamu sudah meracik, tidak bisa meracik kembali..\nMohon tunggu ${waktutiong} lagi untuk meracik kembali `);
      break;
    case "sword":
      let iron = db.data.users[m.sender].iron,
        kayu = db.data.users[m.sender].kayu,
        string = db.data.users[m.sender].string,
        waktutions = clockString(6e5 - (new Date() - db.data.users[m.sender].lastswordclaim));
      if (0 === iron || 0 === kayu || 0 === string) return m.reply("*Pastikan kamu memiliki semua*\n*Seperti Iron, Kayu, String*");
      if (new Date() - db.data.users[m.sender].lastswordclaim > 6e5)
        if (db.data.users[m.sender].iron > 4)
          if (db.data.users[m.sender].kayu > 499)
            if (db.data.users[m.sender].string > 9) {
              let _ironn = `${pickRandom([ "1", "2", "3", "4" ])}`.trim(),
                _kayunn = `${Math.floor(500 * Math.random())}`.trim(),
                _stringn = `${pickRandom([ "1", "2", "3", "4", "5", "6", "7", "8", "9" ])}`.trim(),
                swordn = 1 * `${pickRandom([ "1", "2" ])}`.trim(),
                ironn = 1 * _ironn,
                kayun = 1 * _kayunn,
                stringn = 1 * _stringn;
              db.data.users[m.sender].iron -= 1 * ironn, db.data.users[m.sender].kayu -= 1 * kayun,
                db.data.users[m.sender].string -= 1 * stringn, db.data.users[m.sender].sword += 1 * swordn,
                db.data.users[m.sender].lastswordclaim = 1 * new Date();
              let srcngs = `\nBerhasil meracik sword:\n-${ironn} Iron\n-${kayun} Kayu\n-${stringn} String\n\nSelamat kamu mendapatkan sword: \n+${swordn}\n`.trim();
              setTimeout(async () => {
                await conn.reply(m.chat, "Yuk meracik lagi..", m);
              }, 6e5), setTimeout(async () => {
                await conn.reply(m.chat, srcngs, m);
              }, 6e4), setTimeout(async () => {
                await conn.reply(m.chat, "Mohon tunggu sedang mengaduk sword", m);
              }, 1e3);
            } else m.reply("Pastikan string kamu *10* untuk bisa meracik sword");
      else m.reply("Pastikan kayu kamu *500* untuk bisa meracik sword");
      else m.reply("Pastikan iron kamu *5* untuk bisa meracik sword");
      else m.reply(`Kamu sudah meracik, tidak bisa meracik kembali..\nMohon tunggu ${waktutions} lagi untuk meracik kembali `);
      break;
    case "weapon":
      let ironw = db.data.users[m.sender].iron,
        kayuw = db.data.users[m.sender].kayu,
        stringw = db.data.users[m.sender].string,
        swordw = db.data.users[m.sender].sword,
        waktutionsw = clockString(6e5 - (new Date() - db.data.users[m.sender].lastweaponclaim));
      if (0 === ironw || 0 === kayuw || 0 === stringw || 0 === swordw) return m.reply("*Pastikan kamu memiliki semua*\n*Seperti Iron, Kayu, String, Sword*");
      if (new Date() - db.data.users[m.sender].lastweaponclaim > 6e5)
        if (db.data.users[m.sender].iron > 9)
          if (db.data.users[m.sender].kayu > 999)
            if (db.data.users[m.sender].string > 9)
              if (db.data.users[m.sender].sword > 9) {
                let _ironnw = `${pickRandom([ "1", "2", "3", "4", "5", "6", "7", "8", "9", "10" ])}`.trim(),
                  _kayunnw = `${Math.floor(1001 * Math.random())}`.trim(),
                  _stringnnw = `${pickRandom([ "1", "2", "3", "4", "5", "6", "7", "8", "9", "10" ])}`.trim(),
                  swordnnw = 1 * `${pickRandom([ "1", "2", "3", "4", "5", "6", "7", "8", "9", "10" ])}`.trim(),
                  ironnw = 1 * _ironnw,
                  kayunnw = 1 * _kayunnw,
                  stringnnw = 1 * _stringnnw;
                db.data.users[m.sender].iron -= 1 * ironnw, db.data.users[m.sender].kayu -= 1 * kayunnw,
                  db.data.users[m.sender].string -= 1 * stringnnw, db.data.users[m.sender].sword -= 1 * swordnnw,
                  db.data.users[m.sender].weapon += 1, db.data.users[m.sender].lastweaponclaim = 1 * new Date();
                let srcngsw = `\nBerhasil meracik weapon:\n-${ironnw} Iron\n-${kayunnw} Kayu\n-${stringnnw} String\n-${swordnnw} Sword\n\nSelamat kamu mendapatkan weapon: \n+1\n`.trim();
                setTimeout(async () => {
                  await conn.reply(m.chat, "Yuk meracik lagi..", m);
                }, 6e5), setTimeout(async () => {
                  await conn.reply(m.chat, srcngsw, m);
                }, 6e4), setTimeout(async () => {
                  await conn.reply(m.chat, "Mohon tunggu sedang mengaduk weapon", m);
                }, 1e3);
              } else m.reply("Pastikan sword kamu *10* untuk bisa meracik weapon");
      else m.reply("Pastikan string kamu *10* untuk bisa meracik weapon");
      else m.reply("Pastikan kayu kamu *1000* untuk bisa meracik weapon");
      else m.reply("Pastikan iron kamu *10* untuk bisa meracik weapon");
      else m.reply(`Kamu sudah meracik, tidak bisa meracik kembali..\nMohon tunggu ${waktutionsw} lagi untuk meracik kembali `);
      break;
    case "iron":
      let emasbiasa = db.data.users[m.sender].emas,
        stringk = db.data.users[m.sender].string,
        waktutionsk = clockString(6e5 - (new Date() - db.data.users[m.sender].lastsironclaim));
      if (0 === emasbiasa || 0 === stringk) return m.reply("*Pastikan kamu memiliki semua*\n*Seperti Emas, String*");
      if (new Date() - db.data.users[m.sender].lastsironclaim > 6e5)
        if (db.data.users[m.sender].emas > 4)
          if (db.data.users[m.sender].string > 4) {
            let _emasbiasak = `${pickRandom([ "1", "2", "3", "4" ])}`.trim(),
              _stringk = `${pickRandom([ "1", "2", "3", "4" ])}`.trim(),
              ironk = 1 * `${pickRandom([ "1", "2" ])}`.trim(),
              emasbiasak = 1 * _emasbiasak,
              stringk = 1 * _stringk;
            db.data.users[m.sender].emas -= 1 * emasbiasak, db.data.users[m.sender].string -= 1 * stringk,
              db.data.users[m.sender].iron += 1 * ironk, db.data.users[m.sender].lastsironclaim = 1 * new Date();
            let srcngsk = `\nBerhasil meracik iron:\n-${emasbiasak} Emas\n-${stringk} String\n\nSelamat kamu mendapatkan iron: \n+${ironk}\n`.trim();
            setTimeout(async () => {
              await conn.reply(m.chat, "Yuk meracik lagi..", m);
            }, 6e5), setTimeout(async () => {
              await conn.reply(m.chat, srcngsk, m);
            }, 6e4), setTimeout(async () => {
              await conn.reply(m.chat, "Mohon tunggu sedang mengaduk iron", m);
            }, 1e3);
          } else m.reply("Pastikan string kamu *5* untuk bisa meracik iron");
      else m.reply("Pastikan emas kamu *5* untuk bisa meracik iron");
      else m.reply(`Kamu sudah meracik, tidak bisa meracik kembali..\nMohon tunggu ${waktutionsk} lagi untuk meracik kembali `);
      break;
    case "pancingan":
      let kayuh = db.data.users[m.sender].kayu,
        stringh = db.data.users[m.sender].string,
        batuh = db.data.users[m.sender].batu,
        pancingan = db.data.users[m.sender].pancingan,
        waktutionskh = clockString(6e5 - (new Date() - db.data.users[m.sender].lastsmancingclaim));
      if (0 === kayuh || 0 === stringh || 0 === batuh) return m.reply("*Pastikan kamu memiliki semua*\n*Seperti Kayu, Batu, String*");
      if (5 === pancingan) return m.reply("*Pancingan kamu dah lvl max*");
      if (new Date() - db.data.users[m.sender].lastsmancingclaim > 6e5)
        if (db.data.users[m.sender].kayu > 499)
          if (db.data.users[m.sender].string > 4)
            if (db.data.users[m.sender].batu > 9) {
              db.data.users[m.sender].kayu -= 500, db.data.users[m.sender].string -= 5, db.data.users[m.sender].batu -= 10,
                db.data.users[m.sender].anakpancingan += 150, db.data.users[m.sender].lastsmancingclaim = 1 * new Date();
              let srcngsk = "\nBerhasil meracik pancingan:\n-10 Batu\n-5 String\n-500 Kayu\n\nSelamat kamu mendapatkan Exp: \n+150 Exp Pancingan\n".trim();
              if (setTimeout(async () => {
                  await conn.reply(m.chat, "Yuk meracik lagi..", m);
                }, 6e5), setTimeout(async () => {
                  await conn.reply(m.chat, srcngsk, m);
                }, 6e4), setTimeout(async () => {
                  await conn.reply(m.chat, "Mohon tunggu sedang mengaduk pancingan", m);
                }, 1e3), pancingan > 0) {
                let naiklvl = 1e4 * pancingan - 1;
                db.data.users[m.sender].anakpancingan > naiklvl && (db.data.users[m.sender].pancingan += 1, db.data.users[m.sender].anakpancingan -= 1e4 * pancingan, await conn.reply(m.chat, "*Selamat pancingan kamu naik level*", m));
              }
            } else m.reply("Pastikan batu kamu *10* untuk bisa meracik pancingan");
      else m.reply("Pastikan string kamu *5* untuk bisa meracik pancingan");
      else m.reply("Pastikan kayu kamu *500* untuk bisa meracik pancingan");
      else m.reply(`Kamu sudah meracik, tidak bisa meracik kembali..\nMohon tunggu ${waktutionskh} lagi untuk meracik kembali `);
      break;
    default:
      return await conn.reply(m.chat, `${usedPrefix + command} [ramuan | potion | string | iron | sword | weapon | pancingan]\nContoh penggunaan: *${usedPrefix + command} ramuan*`, m);
  }
};
handler.help = ["meracik [type]"], handler.tags = ["rpg"], handler.command = /^(meracik|racik)$/i,
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