const handler = async (m, {
  conn,
  command,
  args,
  usedPrefix
}) => {
  let pengguna = db.data.users[m.sender],
    pancingan = pengguna.pancingan,
    pemancing = conn.getName(m.sender),
    umpan = pengguna.umpan,
    type = (args[0] || "").toLowerCase();
  const list = `\n╭──『 Fishing 』\n│⬡ typing command↓\n│   ${usedPrefix + command} easy\n│\n│⬡ 🎣 *Mancing Emosi*\n│⬡ 🎣 *Mancing Easy*\n│⬡ 🎣 *Mancing Normal*\n│⬡ 🎣 *Mancing Hard*\n│⬡ 🎣 *Mancing Extreme*\n╰───────────────\n`.trim();
  try {
    if (/fishing|mancing/i.test(command)) switch (type) {
      case "emosi":
        let timers = clockString(24e4 - (new Date() - pengguna.lastfishing));
        conn.getName(m.sender);
        if (pengguna.stamina < 20) return m.reply(`Stamina anda tidak cukup\nharap isi stamina anda dengan *${usedPrefix}eat8`);
        if (pengguna.lastfishing > 108e5) throw m.reply(`Kamu masih kelelahan\nHarap tunggu *${timers}* lagi`);
        if (!(pengguna.fishingrod > 0)) return await conn.reply(m.chat, "*[❗] kamu tidak punya kail pancingan dan umpan 100 🎣*", m);
        if (new Date() - pengguna.lastfishing > 24e4) {
          let ikan = `${Math.floor(30 * Math.random())}`.trim(),
            lele = `${Math.floor(15 * Math.random())}`.trim(),
            nila = `${Math.floor(10 * Math.random())}`.trim(),
            bawal = `${Math.floor(10 * Math.random())}`.trim(),
            udang = `${Math.floor(39 * Math.random())}`.trim(),
            paus = `${Math.floor(2 * Math.random())}`.trim(),
            kepiting = `${Math.floor(27 * Math.random())}`.trim(),
            psepick = 1 * `${pickRandom([ "1", "0", "0", "1" ])}`,
            psenjata = 1 * `${pickRandom([ "1", "0", "0", "0" ])}`,
            mcng = `\n*Hasil 🎣Fishing ${pemancing}!*\n        \n🐟 nila : ${nila}\n🐡 bawal : ${bawal}\n🐟 lele : ${lele}\n🐟 ikan : ${ikan}\n🦐 udang : ${udang}\n🐋 paus: ${paus}\n🦀 kepiting: ${kepiting}\n\nKamu bisa memasak ini, dan memakannya💉\n_example:_\n${usedPrefix}cook`;
          setTimeout(async () => {
              await conn.reply(m.chat, mcng, null), psepick > 0 && (pengguna.psepick += 1 * psepick, await conn.reply(m.chat, `You Get 🎁chest weapons epic ${psepick} item`, m)), psenjata > 0 && (pengguna.psenjata += 1 * psenjata, await conn.reply(m.chat, `You Get 🎁chest weapons ${psenjata} item`, m));
            }, 38e3), setTimeout(async () => {
              await conn.reply(m.chat, `${pemancing} Sepertinya dapat sesuatu..`, null);
            }, 28e3), setTimeout(async () => {
              await conn.reply(m.chat, `${pemancing} Menunggu`, null);
            }, 8e3), setTimeout(async () => {
              await conn.reply(m.chat, `${pemancing} Sedang Memancing...`, null);
            }, 0), pengguna.nila += 1 * nila, pengguna.ikan += 1 * ikan, pengguna.lele += 1 * lele,
            pengguna.bawal += 1 * bawal, pengguna.udang += 1 * udang, pengguna.lastfishing += 1 * new Date(),
            pengguna.paus += 1 * paus, pengguna.kepiting += 1 * kepiting;
        } else m.reply(`You're already fishing, wait until ${timers}`);
        break;
      case "easy":
        let timersa = clockString(288e5 - (new Date() - pengguna.lastmancingeasy));
        if (0 === pancingan || 0 === umpan) return await conn.reply(m.chat, "*[❗] kamu tidak punya kail pancingan dan umpan 100 🎣*", m);
        if (new Date() - pengguna.lastmancingeasy > 288e5)
          if (pengguna.pancingan > 1)
            if (pengguna.umpan > 99) {
              let mcing1 = `${Math.floor(10 * Math.random())}`,
                mcing2 = `${Math.floor(10 * Math.random())}`,
                mcing3 = `${Math.floor(10 * Math.random())}`,
                mcing4 = `${Math.floor(10 * Math.random())}`,
                mcing5 = `${Math.floor(10 * Math.random())}`,
                mcing6 = `${Math.floor(10 * Math.random())}`,
                mcing7 = `${Math.floor(10 * Math.random())}`,
                mcing8 = `${Math.floor(10 * Math.random())}`,
                mcing9 = `${Math.floor(10 * Math.random())}`,
                mcing10 = `${Math.floor(10 * Math.random())}`,
                mcing11 = `${Math.floor(10 * Math.random())}`,
                mcing12 = `${Math.floor(10 * Math.random())}`,
                mcing13 = `${Math.floor(50 * Math.random())}`,
                rbrb1 = 1 * mcing1,
                rbrb2 = 1 * mcing2,
                rbrb3 = 1 * mcing3,
                rbrb4 = 1 * mcing4,
                rbrb5 = 1 * mcing5,
                rbrb6 = 1 * mcing6,
                rbrb7 = 1 * mcing7,
                rbrb8 = 1 * mcing8,
                rbrb9 = 1 * mcing9,
                rbrb10 = 1 * mcing10,
                rbrb11 = 1 * mcing11,
                rbrb12 = 1 * mcing12,
                rbrb13 = 1 * mcing13,
                zero1 = `${rbrb1}`,
                zero2 = `${rbrb2}`,
                zero3 = `${rbrb3}`,
                zero4 = `${rbrb4}`,
                zero5 = `${rbrb5}`,
                zero6 = `${rbrb6}`,
                zero7 = `${rbrb7}`,
                zero8 = `${rbrb8}`,
                zero9 = `${rbrb9}`,
                zero10 = `${rbrb10}`,
                zero11 = `${rbrb11}`,
                zero12 = `${rbrb12}`,
                hsl = `\n*${htjava} Hasil Memancing ${pemancing} ${htjava}*\n *🦀 = [ ${zero2} ]*\t\t\t*🐠 = [ ${zero6} ]*\n *🦞 = [ ${zero8} ]*\t\t\t *🐟 = [ ${zero11} ]*\n *🦐 = [ ${zero10} ]*\t\t\t *🐬 = [ ${zero7} ]*\n *🦑 = [ ${zero4} ]*\t\t\t *🐳 = [ ${zero12} ]*\n *🐙 = [ ${zero3} ]*\t\t\t *🦈 = [ ${zero9} ]*\n  *🐡 = [ ${zero5} ]*\t\t\t*🐋 = [ ${zero1} ]*\n  \n+1 Tiketcoin\n`.trim();
              pengguna.paus += rbrb1, pengguna.kepiting += rbrb2, pengguna.gurita += rbrb3, pengguna.cumi += rbrb4,
                pengguna.buntal += rbrb5, pengguna.dory += rbrb6, pengguna.lumba += rbrb7, pengguna.lobster += rbrb8,
                pengguna.hiu += rbrb9, pengguna.udang += rbrb10, pengguna.ikan += rbrb11, pengguna.orca += rbrb12,
                pengguna.tiketcoin += 1, pengguna.umpan -= rbrb13, setTimeout(async () => {
                  await conn.reply(m.chat, `${pemancing} Yuk mancing mania level easy lagi`, null);
                }, 288e5), setTimeout(async () => {
                  await conn.reply(m.chat, hsl, null);
                }, 12e3), setTimeout(async () => {
                  await conn.reply(m.chat, `${pemancing} Menunggu`, null);
                }, 6e3), setTimeout(async () => {
                  await conn.reply(m.chat, `${pemancing} Sedang Memancing...`, null);
                }, 0), pengguna.lastmancingeasy = 1 * new Date();
            } else await conn.reply(m.chat, "Minimal umpan kamu *100* untuk memancing level mudah", m);
        else await conn.reply(m.chat, "Minimal pancingan kamu *Level 2* untuk memancing level mudah", m);
        else await conn.reply(m.chat, `*Sepertinya Anda Sudah Lelah*\n*Silahkan Istirahat Sejenak Sekitar* ${timersa}\n*Untuk Bisa Melanjutkan Memancing Lagi*`, m);
        break;
      case "normal":
        let timerl = clockString(288e5 - (new Date() - pengguna.lastmancingeasy));
        if (0 === pancingan || 0 === umpan) return await conn.reply(m.chat, "*[❗] kamu tidak punya kail pancingan dan umpan 100 🎣*", m);
        if (new Date() - pengguna.lastmancingeasy > 288e5)
          if (pengguna.pancingan > 2)
            if (pengguna.umpan > 149) {
              let mcingd1 = `${Math.floor(50 * Math.random())}`,
                mcingd2 = `${Math.floor(50 * Math.random())}`,
                mcingd3 = `${Math.floor(50 * Math.random())}`,
                mcingd4 = `${Math.floor(50 * Math.random())}`,
                mcingd5 = `${Math.floor(50 * Math.random())}`,
                mcingd6 = `${Math.floor(50 * Math.random())}`,
                mcingd7 = `${Math.floor(50 * Math.random())}`,
                mcingd8 = `${Math.floor(50 * Math.random())}`,
                mcingd9 = `${Math.floor(50 * Math.random())}`,
                mcingd10 = `${Math.floor(50 * Math.random())}`,
                mcingd11 = `${Math.floor(50 * Math.random())}`,
                mcingd12 = `${Math.floor(50 * Math.random())}`,
                mcingd13 = `${Math.floor(100 * Math.random())}`,
                mcg1 = 1 * mcingd1,
                mcg2 = 1 * mcingd2,
                mcg3 = 1 * mcingd3,
                mcg4 = 1 * mcingd4,
                mcg5 = 1 * mcingd5,
                mcg6 = 1 * mcingd6,
                mcg7 = 1 * mcingd7,
                mcg8 = 1 * mcingd8,
                mcg9 = 1 * mcingd9,
                mcg10 = 1 * mcingd10,
                mcg11 = 1 * mcingd11,
                mcg12 = 1 * mcingd12,
                mcg13 = 1 * mcingd13,
                aine1 = `${mcg1}`,
                aine2 = `${mcg2}`,
                aine3 = `${mcg3}`,
                aine4 = `${mcg4}`,
                aine5 = `${mcg5}`,
                aine6 = `${mcg6}`,
                aine7 = `${mcg7}`,
                aine8 = `${mcg8}`,
                aine9 = `${mcg9}`,
                aine10 = `${mcg10}`,
                aine11 = `${mcg11}`,
                aine12 = `${mcg12}`,
                hsls = `\n*${htjava} Hasil Memancing ${pemancing} ${htjava}*\n *🦀 = [ ${aine2} ]*\t\t\t*🐠 = [ ${aine6} ]*\n *🦞 = [ ${aine8} ]*\t\t\t *🐟 = [ ${aine11} ]*\n *🦐 = [ ${aine10} ]*\t\t\t *🐬 = [ ${aine7} ]*\n *🦑 = [ ${aine4} ]*\t\t\t *🐳 = [ ${aine12} ]*\n *🐙 = [ ${aine3} ]*\t\t\t *🦈 = [ ${aine9} ]*\n  *🐡 = [ ${aine5} ]*\t\t\t*🐋 = [ ${aine1} ]*\n  \n+1 Tiketcoin\n`.trim();
              pengguna.paus += mcg1, pengguna.kepiting += mcg2, pengguna.gurita += mcg3, pengguna.cumi += mcg4,
                pengguna.buntal += mcg5, pengguna.dory += mcg6, pengguna.lumba += mcg7, pengguna.lobster += mcg8,
                pengguna.hiu += mcg9, pengguna.udang += mcg10, pengguna.ikan += mcg11, pengguna.orca += mcg12,
                pengguna.tiketcoin += 1, pengguna.umpan -= mcg13, setTimeout(async () => {
                  await conn.reply(m.chat, `${pemancing} Yuk mancing mania level normal lagi`, null);
                }, 288e5), setTimeout(async () => {
                  await conn.reply(m.chat, hsls, null);
                }, 12e3), setTimeout(async () => {
                  await conn.reply(m.chat, `${pemancing} Menunggu`, null);
                }, 6e3), setTimeout(async () => {
                  await conn.reply(m.chat, `${pemancing} Sedang Memancing...`, null);
                }, 0), pengguna.lastmancingeasy = 1 * new Date();
            } else await conn.reply(m.chat, "Minimal umpan kamu *150* untuk memancing level normal", m);
        else await conn.reply(m.chat, "Minimal pancingan kamu *Level 3* untuk memancing level normal", m);
        else await conn.reply(m.chat, `*Sepertinya Anda Sudah Lelah*\n*Silahkan Istirahat Sejenak Sekitar* ${timerl}\n*Untuk Bisa Melanjutkan Memancing Lagi*`, m);
        break;
      case "hard":
        let timerh = clockString(288e5 - (new Date() - pengguna.lastmancingeasy));
        if (0 === pancingan || 0 === umpan) return await conn.reply(m.chat, "*[❗] kamu tidak punya kail pancingan dan umpan 100 🎣*", m);
        if (new Date() - pengguna.lastmancingeasy > 288e5)
          if (pengguna.pancingan > 3)
            if (pengguna.umpan > 199) {
              let mcingr1 = `${Math.floor(100 * Math.random())}`,
                mcingr2 = `${Math.floor(100 * Math.random())}`,
                mcingr3 = `${Math.floor(100 * Math.random())}`,
                mcingr4 = `${Math.floor(100 * Math.random())}`,
                mcingr5 = `${Math.floor(100 * Math.random())}`,
                mcingr6 = `${Math.floor(100 * Math.random())}`,
                mcingr7 = `${Math.floor(100 * Math.random())}`,
                mcingr8 = `${Math.floor(100 * Math.random())}`,
                mcingr9 = `${Math.floor(100 * Math.random())}`,
                mcingr10 = `${Math.floor(100 * Math.random())}`,
                mcingr11 = `${Math.floor(100 * Math.random())}`,
                mcingr12 = `${Math.floor(100 * Math.random())}`,
                mcingr13 = `${Math.floor(150 * Math.random())}`,
                mcgh1 = 1 * mcingr1,
                mcgh2 = 1 * mcingr2,
                mcgh3 = 1 * mcingr3,
                mcgh4 = 1 * mcingr4,
                mcgh5 = 1 * mcingr5,
                mcgh6 = 1 * mcingr6,
                mcgh7 = 1 * mcingr7,
                mcgh8 = 1 * mcingr8,
                mcgh9 = 1 * mcingr9,
                mcgh10 = 1 * mcingr10,
                mcgh11 = 1 * mcingr11,
                mcgh12 = 1 * mcingr12,
                mcgh13 = 1 * mcingr13,
                aines1 = `${mcgh1}`,
                aines2 = `${mcgh2}`,
                aines3 = `${mcgh3}`,
                aines4 = `${mcgh4}`,
                aines5 = `${mcgh5}`,
                aines6 = `${mcgh6}`,
                aines7 = `${mcgh7}`,
                aines8 = `${mcgh8}`,
                aines9 = `${mcgh9}`,
                aines10 = `${mcgh10}`,
                aines11 = `${mcgh11}`,
                aines12 = `${mcgh12}`,
                hslsh = `\n*${htjava} Hasil Memancing ${pemancing} ${htjava}*\n *🦀 = [ ${aines2} ]*\t\t\t*🐠 = [ ${aines6} ]*\n *🦞 = [ ${aines8} ]*\t\t\t *🐟 = [ ${aines11} ]*\n *🦐 = [ ${aines10} ]*\t\t\t *🐬 = [ ${aines7} ]*\n *🦑 = [ ${aines4} ]*\t\t\t *🐳 = [ ${aines12} ]*\n *🐙 = [ ${aines3} ]*\t\t\t *🦈 = [ ${aines9} ]*\n  *🐡 = [ ${aines5} ]*\t\t\t*🐋 = [ ${aines1} ]*\n  \n+1 Tiketcoin\n`.trim();
              pengguna.paus += mcgh1, pengguna.kepiting += mcgh2, pengguna.gurita += mcgh3, pengguna.cumi += mcgh4,
                pengguna.buntal += mcgh5, pengguna.dory += mcgh6, pengguna.lumba += mcgh7, pengguna.lobster += mcgh8,
                pengguna.hiu += mcgh9, pengguna.udang += mcgh10, pengguna.ikan += mcgh11, pengguna.orca += mcgh12,
                pengguna.tiketcoin += 1, pengguna.umpan -= mcgh13, setTimeout(async () => {
                  await conn.reply(m.chat, `${pemancing} Yuk mancing mania level hard lagi`, null);
                }, 288e5), setTimeout(async () => {
                  await conn.reply(m.chat, hslsh, null);
                }, 12e3), setTimeout(async () => {
                  await conn.reply(m.chat, `${pemancing} Menunggu`, null);
                }, 6e3), setTimeout(async () => {
                  await conn.reply(m.chat, `${pemancing} Sedang Memancing...`, null);
                }, 0), pengguna.lastmancingeasy = 1 * new Date();
            } else await conn.reply(m.chat, "Minimal umpan kamu *200* untuk memancing level hard", m);
        else await conn.reply(m.chat, "Minimal pancingan kamu *Level 4* untuk memancing level hard", m);
        else await conn.reply(m.chat, `*Sepertinya Anda Sudah Lelah*\n*Silahkan Istirahat Sejenak Sekitar* ${timerh}\n*Untuk Bisa Melanjutkan Memancing Lagi*`, m);
        break;
      case "extreme":
        let timere = clockString(288e5 - (new Date() - pengguna.lastmancingeasy));
        if (0 === pancingan || 0 === umpan) return await conn.reply(m.chat, "*[❗] kamu tidak punya kail pancingan dan umpan 100 🎣*", m);
        if (new Date() - pengguna.lastmancingeasy > 288e5)
          if (pengguna.pancingan > 4)
            if (pengguna.umpan > 249) {
              let mcinge1 = `${Math.floor(500 * Math.random())}`,
                mcinge2 = `${Math.floor(500 * Math.random())}`,
                mcinge3 = `${Math.floor(500 * Math.random())}`,
                mcinge4 = `${Math.floor(500 * Math.random())}`,
                mcinge5 = `${Math.floor(500 * Math.random())}`,
                mcinge6 = `${Math.floor(500 * Math.random())}`,
                mcinge7 = `${Math.floor(500 * Math.random())}`,
                mcinge8 = `${Math.floor(500 * Math.random())}`,
                mcinge9 = `${Math.floor(500 * Math.random())}`,
                mcinge10 = `${Math.floor(500 * Math.random())}`,
                mcinge11 = `${Math.floor(500 * Math.random())}`,
                mcinge12 = `${Math.floor(500 * Math.random())}`,
                mcinge13 = `${Math.floor(200 * Math.random())}`,
                mcghe1 = 1 * mcinge1,
                mcghe2 = 1 * mcinge2,
                mcghe3 = 1 * mcinge3,
                mcghe4 = 1 * mcinge4,
                mcghe5 = 1 * mcinge5,
                mcghe6 = 1 * mcinge6,
                mcghe7 = 1 * mcinge7,
                mcghe8 = 1 * mcinge8,
                mcghe9 = 1 * mcinge9,
                mcghe10 = 1 * mcinge10,
                mcghe11 = 1 * mcinge11,
                mcghe12 = 1 * mcinge12,
                mcghe13 = 1 * mcinge13,
                ainese1 = `${mcghe1}`,
                ainese2 = `${mcghe2}`,
                ainese3 = `${mcghe3}`,
                ainese4 = `${mcghe4}`,
                ainese5 = `${mcghe5}`,
                ainese6 = `${mcghe6}`,
                ainese7 = `${mcghe7}`,
                ainese8 = `${mcghe8}`,
                ainese9 = `${mcghe9}`,
                ainese10 = `${mcghe10}`,
                ainese11 = `${mcghe11}`,
                ainese12 = `${mcghe12}`,
                hslse = `\n*${htjava} Hasil Memancing ${pemancing} ${htjava}*\n *🦀 = [ ${ainese2} ]*\t\t\t*🐠 = [ ${ainese6} ]*\n *🦞 = [ ${ainese8} ]*\t\t\t *🐟 = [ ${ainese11} ]*\n *🦐 = [ ${ainese10} ]*\t\t\t *🐬 = [ ${ainese7} ]*\n *🦑 = [ ${ainese4} ]*\t\t\t *🐳 = [ ${ainese12} ]*\n *🐙 = [ ${ainese3} ]*\t\t\t *🦈 = [ ${ainese9} ]*\n  *🐡 = [ ${ainese5} ]*\t\t\t*🐋 = [ ${ainese1} ]*\n  \n+1 Tiketcoin\n`.trim();
              pengguna.paus += mcghe1, pengguna.kepiting += mcghe2, pengguna.gurita += mcghe3,
                pengguna.cumi += mcghe4, pengguna.buntal += mcghe5, pengguna.dory += mcghe6, pengguna.lumba += mcghe7,
                pengguna.lobster += mcghe8, pengguna.hiu += mcghe9, pengguna.udang += mcghe10, pengguna.ikan += mcghe11,
                pengguna.orca += mcghe12, pengguna.tiketcoin += 1, pengguna.umpan -= mcghe13, setTimeout(async () => {
                  await conn.reply(m.chat, `${pemancing} Yuk mancing mania level extreme lagi`, null);
                }, 288e5), setTimeout(async () => {
                  await conn.reply(m.chat, hslse, null);
                }, 12e3), setTimeout(async () => {
                  await conn.reply(m.chat, `${pemancing} Menunggu`, null);
                }, 6e3), setTimeout(async () => {
                  await conn.reply(m.chat, `${pemancing} Sedang Memancing...`, null);
                }, 0), pengguna.lastmancingeasy = 1 * new Date();
            } else await conn.reply(m.chat, "Minimal umpan kamu *250* untuk memancing level extreme", m);
        else await conn.reply(m.chat, "Minimal pancingan kamu *Level 5* untuk memancing level extreme", m);
        else await conn.reply(m.chat, `*Sepertinya Anda Sudah Lelah*\n*Silahkan Istirahat Sejenak Sekitar* ${timere}\n*Untuk Bisa Melanjutkan Memancing Lagi*`, m);
        break;
      default:
        return await conn.reply(m.chat, list, m);
    }
  } catch (e) {
    await conn.reply(m.chat, "Error", m), console.log(e);
  }
};
handler.help = ["fishing <args>"], handler.tags = ["rpg"], handler.command = /^(fishing|mancing)$/i;
export default handler;

function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)];
}

function clockString(ms) {
  return ["\n" + (isNaN(ms) ? "--" : Math.floor(ms / 864e5)), " *Days ☀️*\n ", isNaN(ms) ? "--" : Math.floor(ms / 36e5) % 24, " *Hours 🕐*\n ", isNaN(ms) ? "--" : Math.floor(ms / 6e4) % 60, " *Minute ⏰*\n ", isNaN(ms) ? "--" : Math.floor(ms / 1e3) % 60, " *Second ⏱️* "].map(v => v.toString().padStart(2, 0)).join("");
}