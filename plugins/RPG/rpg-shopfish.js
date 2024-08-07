const Bhiu = 1500,
  Shiu = 400,
  Bikan = 500,
  Sikan = 50,
  Bdory = 800,
  Sdory = 200,
  Borca = 1500,
  Sorca = 400,
  Bpaus = 2e3,
  Spaus = 900,
  Bcumi = 1400,
  Scumi = 300,
  Bgurita = 1600,
  Sgurita = 500,
  Bbuntal = 700,
  Sbuntal = 100,
  Budang = 500,
  Sudang = 50,
  Blumba = 1500,
  Slumba = 400,
  Blobster = 800,
  Slobster = 200,
  Bkepiting = 700,
  Skepiting = 150,
  handler = async (m, {
    conn,
    command,
    args,
    usedPrefix,
    DevMode
  }) => {
    (args[0] || "").toLowerCase();
    let _type = (args[1] || "").toLowerCase(),
      jualbeli = (args[0] || "").toLowerCase();
    const Kaine = `\n${usedPrefix}shopfish <buy|sell> <item> <jumlah>\n\nContoh penggunaan: *${usedPrefix}shopfish buy hiu 1*\n\n============================\n\n*Fishing | Harga Beli*\nHiu: 1500\nIkan: 500\nDory: 800\nOrca: 1500\nPaus: 2000\nCumi: 1400\nGurita: 1600\nBuntal: 700\nUdang: 500\nLumba²: 1500\nLobster: 800\nKepiting: 700\n\n\n*Fishing | Harga Jual*\nHiu: 400\nIkan: 50\nDory: 200\nOrca: 400\nPaus: 900\nCumi: 300\nGurita: 500\nBuntal: 100\nUdang: 50\nLumba²: 400\nLobster: 200\nKepiting: 150\n`.trim();
    try {
      if (/shopfish/i.test(command)) {
        const count = args[2] && args[2].length > 0 ? Math.min(99999999, Math.max(parseInt(args[2]), 1)) : !args[2] || args.length < 4 ? 1 : Math.min(1, count);
        switch (jualbeli) {
          case "buy":
            switch (_type) {
              case "hiu":
                db.data.users[m.sender].money >= 1500 * count ? (db.data.users[m.sender].hiu += 1 * count, db.data.users[m.sender].money -= 1500 * count, await conn.reply(m.chat, `Succes membeli ${count} Hiu dengan harga ${1500 * count} money`, m)) : await conn.reply(m.chat, `Uang anda tidak cukup untuk membeli ${count} Hiu dengan harga ${1500 * count} money`.trim(), m);
                break;
              case "ikan":
                db.data.users[m.sender].money >= 500 * count ? (db.data.users[m.sender].ikan += 1 * count, db.data.users[m.sender].money -= 500 * count, await conn.reply(m.chat, `Succes membeli ${count} Ikan dengan harga ${500 * count} money`, m)) : await conn.reply(m.chat, `Uang anda tidak cukup untuk membeli ${count} ikan dengan harga ${500 * count} money`.trim(), m);
                break;
              case "dory":
                db.data.users[m.sender].money >= 800 * count ? (db.data.users[m.sender].dory += 1 * count, db.data.users[m.sender].money -= 800 * count, await conn.reply(m.chat, `Succes membeli ${count} Dory dengan harga ${800 * count} money`, m)) : await conn.reply(m.chat, `Uang anda tidak cukup untuk membeli ${count} Dory dengan harga ${800 * count} money`.trim(), m);
                break;
              case "orca":
                db.data.users[m.sender].money >= 1500 * count ? (db.data.users[m.sender].orca += 1 * count, db.data.users[m.sender].money -= 1500 * count, await conn.reply(m.chat, `Succes membeli ${count} Orca dengan harga ${1500 * count} money`, m)) : await conn.reply(m.chat, `Uang anda tidak cukup untuk membeli ${count} orca dengan harga ${1500 * count} money`.trim(), m);
                break;
              case "paus":
                db.data.users[m.sender].money >= 2e3 * count ? (db.data.users[m.sender].paus += 1 * count, db.data.users[m.sender].money -= 2e3 * count, await conn.reply(m.chat, `Succes membeli ${count} Paus dengan harga ${2e3 * count} money`, m)) : await conn.reply(m.chat, `Uang anda tidak cukup untuk membeli ${count} Paus dengan harga ${2e3 * count} money`.trim(), m);
                break;
              case "cumi":
                db.data.users[m.sender].money >= 1400 * count ? (db.data.users[m.sender].cumi += 1 * count, db.data.users[m.sender].money -= 1400 * count, await conn.reply(m.chat, `Succes membeli ${count} Cumi dengan harga ${1400 * count} money`, m)) : await conn.reply(m.chat, `Uang anda tidak cukup untuk membeli ${count} Cumi dengan harga ${1400 * count} money`.trim(), m);
                break;
              case "gurita":
                db.data.users[m.sender].money >= 1600 * count ? (db.data.users[m.sender].gurita += 1 * count, db.data.users[m.sender].money -= 1600 * count, await conn.reply(m.chat, `Succes membeli ${count} Gurita dengan harga ${1600 * count} money`, m)) : await conn.reply(m.chat, `Uang anda tidak cukup untuk membeli ${count} Gurita dengan harga ${1600 * count} money`.trim(), m);
                break;
              case "buntal":
                db.data.users[m.sender].money >= 700 * count ? (db.data.users[m.sender].buntal += 1 * count, db.data.users[m.sender].money -= 700 * count, await conn.reply(m.chat, `Succes membeli ${count} Buntal dengan harga ${700 * count} money`, m)) : await conn.reply(m.chat, `Uang anda tidak cukup untuk membeli ${count} Buntal dengan harga ${700 * count} money`.trim(), m);
                break;
              case "udang":
                db.data.users[m.sender].money >= 500 * count ? (db.data.users[m.sender].udang += 1 * count, db.data.users[m.sender].money -= 500 * count, await conn.reply(m.chat, `Succes membeli ${count} Udang dengan harga ${500 * count} money`, m)) : await conn.reply(m.chat, `Uang anda tidak cukup untuk membeli ${count} Udang dengan harga ${500 * count} money`.trim(), m);
                break;
              case "lumba":
                db.data.users[m.sender].money >= 1500 * count ? (db.data.users[m.sender].lumba += 1 * count, db.data.users[m.sender].money -= 1500 * count, await conn.reply(m.chat, `Succes membeli ${count} Lumba² dengan harga ${1500 * count} money`, m)) : await conn.reply(m.chat, `Uang anda tidak cukup untuk membeli ${count} Lumba² dengan harga ${1500 * count} money`.trim(), m);
                break;
              case "lobster":
                db.data.users[m.sender].money >= 800 * count ? (db.data.users[m.sender].lobster += 1 * count, db.data.users[m.sender].money -= 800 * count, await conn.reply(m.chat, `Succes membeli ${count} Lobster dengan harga ${800 * count} money`, m)) : await conn.reply(m.chat, `Uang anda tidak cukup untuk membeli ${count} Lobster dengan harga ${800 * count} money`.trim(), m);
                break;
              case "kepiting":
                db.data.users[m.sender].money >= 700 * count ? (db.data.users[m.sender].kepiting += 1 * count, db.data.users[m.sender].money -= 700 * count, await conn.reply(m.chat, `Succes membeli ${count} Kepiting dengan harga ${700 * count} money`, m)) : await conn.reply(m.chat, `Uang anda tidak cukup untuk membeli ${count} Kepiting dengan harga ${700 * count} money`.trim(), m);
                break;
              default:
                return await conn.reply(m.chat, Kaine, m);
            }
            break;
          case "sell":
            switch (_type) {
              case "hiu":
                db.data.users[m.sender].hiu >= 1 * count ? (db.data.users[m.sender].hiu -= 1 * count, db.data.users[m.sender].money += 400 * count, await conn.reply(m.chat, `Succes menjual ${count} hiu, dan anda mendapatkan ${400 * count} money`, m)) : await conn.reply(m.chat, "Hiu anda tidak cukup", m);
                break;
              case "ikan":
                db.data.users[m.sender].ikan >= 1 * count ? (db.data.users[m.sender].ikan -= 1 * count, db.data.users[m.sender].money += 50 * count, await conn.reply(m.chat, `Succes menjual ${count} ikan, dan anda mendapatkan ${50 * count} money`, m)) : await conn.reply(m.chat, "Ikan anda tidak cukup", m);
                break;
              case "dory":
                db.data.users[m.sender].dory >= 1 * count ? (db.data.users[m.sender].dory -= 1 * count, db.data.users[m.sender].money += 200 * count, await conn.reply(m.chat, `Succes menjual ${count} dory, dan anda mendapatkan ${200 * count} money`, m)) : await conn.reply(m.chat, "Dory anda tidak cukup", m);
                break;
              case "orca":
                db.data.users[m.sender].orca >= 1 * count ? (db.data.users[m.sender].orca -= 1 * count, db.data.users[m.sender].money += 400 * count, await conn.reply(m.chat, `Succes menjual ${count} orca, dan anda mendapatkan ${400 * count} money`, m)) : await conn.reply(m.chat, "Orca anda tidak cukup", m);
                break;
              case "paus":
                db.data.users[m.sender].paus >= 1 * count ? (db.data.users[m.sender].paus -= 1 * count, db.data.users[m.sender].money += 900 * count, await conn.reply(m.chat, `Succes menjual ${count} paus, dan anda mendapatkan ${900 * count} money`, m)) : await conn.reply(m.chat, "Paus anda tidak cukup", m);
                break;
              case "cumi":
                db.data.users[m.sender].cumi >= 1 * count ? (db.data.users[m.sender].cumi -= 1 * count, db.data.users[m.sender].money += 300 * count, await conn.reply(m.chat, `Succes menjual ${count} Cumi, dan anda mendapatkan ${300 * count} money`, m)) : await conn.reply(m.chat, "Cumi anda tidak cukup", m);
                break;
              case "gurita":
                db.data.users[m.sender].gurita >= 1 * count ? (db.data.users[m.sender].gurita -= 1 * count, db.data.users[m.sender].money += 500 * count, await conn.reply(m.chat, `Succes menjual ${count} Gurita, dan anda mendapatkan ${500 * count} money`, m)) : await conn.reply(m.chat, "Hiu anda tidak cukup", m);
                break;
              case "buntal":
                db.data.users[m.sender].buntal >= 1 * count ? (db.data.users[m.sender].buntal -= 1 * count, db.data.users[m.sender].money += 100 * count, await conn.reply(m.chat, `Succes menjual ${count} Buntal, dan anda mendapatkan ${100 * count} money`, m)) : await conn.reply(m.chat, "Buntal anda tidak cukup", m);
                break;
              case "udang":
                db.data.users[m.sender].udang >= 1 * count ? (db.data.users[m.sender].udang -= 1 * count, db.data.users[m.sender].money += 50 * count, await conn.reply(m.chat, `Succes menjual ${count} Udang, dan anda mendapatkan ${50 * count} money`, m)) : await conn.reply(m.chat, "Udang anda tidak cukup", m);
                break;
              case "lumba":
                db.data.users[m.sender].lumba >= 1 * count ? (db.data.users[m.sender].lumba -= 1 * count, db.data.users[m.sender].money += 400 * count, await conn.reply(m.chat, `Succes menjual ${count} Lumba², dan anda mendapatkan ${400 * count} money`, m)) : await conn.reply(m.chat, "Lumba² anda tidak cukup", m);
                break;
              case "lobster":
                db.data.users[m.sender].lobster >= 1 * count ? (db.data.users[m.sender].lobster -= 1 * count, db.data.users[m.sender].money += 200 * count, await conn.reply(m.chat, `Succes menjual ${count} Lobster, dan anda mendapatkan ${200 * count} money`, m)) : await conn.reply(m.chat, "Lobster anda tidak cukup", m);
                break;
              case "kepiting":
                db.data.users[m.sender].kepiting >= 1 * count ? (db.data.users[m.sender].kepiting -= 1 * count, db.data.users[m.sender].money += 150 * count, await conn.reply(m.chat, `Succes menjual ${count} Kepiting, dan anda mendapatkan ${150 * count} money`, m)) : await conn.reply(m.chat, "Kepiting anda tidak cukup", m);
                break;
              default:
                return await conn.reply(m.chat, Kaine, m);
            }
            break;
          default:
            return await conn.reply(m.chat, Kaine, m);
        }
      }
    } catch (e) {
      await conn.reply(m.chat, Kaine, m), console.log(e);
    }
  };
handler.help = ["shopfish <sell|buy> <args>"], handler.tags = ["rpg"], handler.command = /^(shopfish)$/i,
  handler.limit = !0, handler.group = !0;
export default handler;