const Skepiting = 7e3,
  Slobster = 7e3,
  Sudang = 7e3,
  Scumi = 7e3,
  Sgurita = 7e3,
  Sbuntal = 7e3,
  Sdory = 7e3,
  Sorca = 7e3,
  Slumba = 7e3,
  Spaus = 7e3,
  Sikan = 7e3,
  Shiu = 7e3,
  Sbanteng = 9e3,
  Sharimau = 9e3,
  Sgajah = 9e3,
  Skambing = 9e3,
  Spanda = 9e3,
  Sbuaya = 9e3,
  Skerbau = 9e3,
  Ssapi = 9e3,
  Smonyet = 9e3,
  Sbabihutan = 9e3,
  Sbabi = 9e3,
  Sayam = 9e3,
  handler = async (m, {
    conn,
    command,
    args,
    usedPrefix,
    DevMode
  }) => {
    db.data.users[m.sender].armor;
    let type = (args[0] || "").toLowerCase(),
      _type = (args[1] || "").toLowerCase(),
      jualbeli = (args[0] || "").toLowerCase();
    const Kchat = "⛊━─┈────────┈─━⛊\n*🌱 Hewan   | 💲 Harga Jual*\n⛊━─┈────────┈─━⛊\n\n🦀 Kepiting:      7000\n🦞 Lobster:       7000\n🦐 Udang:         7000\n🦑 Cumi:           7000\n🐙 Gurita:         7000\n🐡 Buntal:         7000\n🐠 Dory:            7000\n🐳 Orca:            7000\n🐬 Lumba:        7000\n🐋 Paus:           7000\n🦈 Hiu:              7000\n⛊━─┈────────┈─━⛊\n🐃 Banteng:      9000\n🐅 Harimau:      9000\n🐘 Gajah:           9000\n🐐 Kambing:     9000\n🐼 Panda:         9000\n🐃 Kerbau:        9000\n🐊 Buaya:         9000\n🐂 Sapi:            9000\n🐒 Monyet:       9000\n🐗 Babi Hutan: 9000\n🐖 Babi:             9000\n🐔 Ayam:           9000\n⛊━─┈────────┈─━⛊\n⛊━─┈────────┈─━⛊\n🧪 *Contoh penggunaan :*\n#pasar jual ayam\n".trim();
    try {
      if (/pasar|toko/i.test(command)) {
        const count = args[2] && args[2].length > 0 ? Math.min(99999999, Math.max(parseInt(args[2]), 1)) : !args[2] || args.length < 4 ? 1 : Math.min(1, count);
        db.data.users[m.sender].sampah;
        if ("jual" !== jualbeli) return await conn.reply(m.chat, Kchat, m);
        switch (_type) {
          case "banteng":
            db.data.users[m.sender].banteng >= 1 * count ? (db.data.users[m.sender].money += 7e3 * count, db.data.users[m.sender].banteng -= 1 * count, await conn.reply(m.chat, `Sukses Menjual ${count} Banteng Dengan Harga ${9e3 * count} Money `.trim(), m)) : await conn.reply(m.chat, "Banteng Kamu Tidak Cukup".trim(), m);
            break;
          case "harimau":
            db.data.users[m.sender].harimau >= 1 * count ? (db.data.users[m.sender].money += 9e3 * count, db.data.users[m.sender].harimau -= 1 * count, await conn.reply(m.chat, `Sukses Menjual ${count} Harimau Dengan Harga ${9e3 * count} Money `.trim(), m)) : await conn.reply(m.chat, "Harimau Kamu Tidak Cukup".trim(), m);
            break;
          case "gajah":
            db.data.users[m.sender].gajah >= 1 * count ? (db.data.users[m.sender].money += 9e3 * count, db.data.users[m.sender].gajah -= 1 * count, await conn.reply(m.chat, `Sukses Menjual ${count} Gajah Dengan Harga ${9e3 * count} Money `.trim(), m)) : await conn.reply(m.chat, "Gajah Kamu Tidak Cukup".trim(), m);
            break;
          case "kambing":
            db.data.users[m.sender].kambing >= 1 * count ? (db.data.users[m.sender].money += 9e3 * count, db.data.users[m.sender].kambing -= 1 * count, await conn.reply(m.chat, `Sukses Menjual ${count} Kambing Dengan Harga ${9e3 * count} Money `.trim(), m)) : await conn.reply(m.chat, "Kambing Kamu Tidak Cukup".trim(), m);
            break;
          case "panda":
            db.data.users[m.sender].panda >= 1 * count ? (db.data.users[m.sender].money += 9e3 * count, db.data.users[m.sender].panda -= 1 * count, await conn.reply(m.chat, `Sukses Menjual ${count} Panda Dengan Harga ${9e3 * count} Money `.trim(), m)) : await conn.reply(m.chat, "Panda Kamu Tidak Cukup".trim(), m);
            break;
          case "buaya":
            db.data.users[m.sender].buaya >= 1 * count ? (db.data.users[m.sender].money += 9e3 * count, db.data.users[m.sender].buaya -= 1 * count, await conn.reply(m.chat, `Sukses Menjual ${count} Buaya Dengan Harga ${9e3 * count} Money `.trim(), m)) : await conn.reply(m.chat, "Buaya Kamu Tidak Cukup".trim(), m);
            break;
          case "kerbau":
            db.data.users[m.sender].kerbau >= 1 * count ? (db.data.users[m.sender].money += 9e3 * count, db.data.users[m.sender].kerbau -= 1 * count, await conn.reply(m.chat, `Sukses Menjual ${count} Kerbau Dengan Harga ${9e3 * count} Money `.trim(), m)) : await conn.reply(m.chat, "Kerbau Kamu Tidak Cukup".trim(), m);
            break;
          case "sapi":
            db.data.users[m.sender].sapi >= 1 * count ? (db.data.users[m.sender].money += 9e3 * count, db.data.users[m.sender].sapi -= 1 * count, await conn.reply(m.chat, `Sukses Menjual ${count} Sapi Dengan Harga ${9e3 * count} Money `.trim(), m)) : await conn.reply(m.chat, "Sapi Kamu Tidak Cukup".trim(), m);
            break;
          case "monyet":
            db.data.users[m.sender].monyet >= 1 * count ? (db.data.users[m.sender].money += 9e3 * count, db.data.users[m.sender].monyet -= 1 * count, await conn.reply(m.chat, `Sukses Menjual ${count} Monyet Dengan Harga ${9e3 * count} Money `.trim(), m)) : await conn.reply(m.chat, "Monyet Kamu Tidak Cukup".trim(), m);
            break;
          case "babi":
            db.data.users[m.sender].babi >= 1 * count ? (db.data.users[m.sender].money += 7e3 * count, db.data.users[m.sender].babi -= 1 * count, await conn.reply(m.chat, `Sukses Menjual ${count} Babi Dengan Harga ${9e3 * count} Money `.trim(), m)) : await conn.reply(m.chat, "Babi Kamu Tidak Cukup".trim(), m);
            break;
          case "babihutan":
            db.data.users[m.sender].babihutan >= 1 * count ? (db.data.users[m.sender].money += 9e3 * count, db.data.users[m.sender].babihutan -= 1 * count, await conn.reply(m.chat, `Sukses Menjual ${count} Babi Hutan Dengan Harga ${9e3 * count} Money `.trim(), m)) : await conn.reply(m.chat, "Babi Hutan Kamu Tidak Cukup".trim(), m);
            break;
          case "ayam":
            db.data.users[m.sender].ayam >= 1 * count ? (db.data.users[m.sender].money += 9e3 * count, db.data.users[m.sender].ayam -= 1 * count, await conn.reply(m.chat, `Sukses Menjual ${count} Ayam Dengan Harga ${9e3 * count} Money `.trim(), m)) : await conn.reply(m.chat, "Ayam Kamu Tidak Cukup".trim(), m);
            break;
          case "kepiting":
            db.data.users[m.sender].kepiting >= 1 * count ? (db.data.users[m.sender].money += 7e3 * count, db.data.users[m.sender].kepiting -= 1 * count, await conn.reply(m.chat, `Sukses Menjual ${count} Kepiting Dengan Harga ${7e3 * count} Money `.trim(), m)) : await conn.reply(m.chat, "Kepiting Kamu Tidak Cukup".trim(), m);
            break;
          case "ikan":
            db.data.users[m.sender].ikan >= 1 * count ? (db.data.users[m.sender].money += 7e3 * count, db.data.users[m.sender].ikan -= 1 * count, await conn.reply(m.chat, `Sukses Menjual ${count} Ikan Dengan Harga ${7e3 * count} Money `.trim(), m)) : await conn.reply(m.chat, "Ikan Kamu Tidak Cukup".trim(), m);
            break;
          case "dory":
            db.data.users[m.sender].dory >= 1 * count ? (db.data.users[m.sender].money += 7e3 * count, db.data.users[m.sender].dory -= 1 * count, await conn.reply(m.chat, `Sukses Menjual ${count} Ikan Dory Dengan Harga ${7e3 * count} Money `.trim(), m)) : await conn.reply(m.chat, "Ikan Dory Kamu Tidak Cukup".trim(), m);
            break;
          case "gurita":
            db.data.users[m.sender].gurita >= 1 * count ? (db.data.users[m.sender].money += 7e3 * count, db.data.users[m.sender].gurita -= 1 * count, await conn.reply(m.chat, `Sukses Menjual ${count} Gurita Dengan Harga ${7e3 * count} Money `.trim(), m)) : await conn.reply(m.chat, "Gurita Kamu Tidak Cukup".trim(), m);
            break;
          case "buntal":
            db.data.users[m.sender].buntal >= 1 * count ? (db.data.users[m.sender].money += 7e3 * count, db.data.users[m.sender].buntal -= 1 * count, await conn.reply(m.chat, `Sukses Menjual ${count} Ikan Buntal Dengan Harga ${7e3 * count} Money `.trim(), m)) : await conn.reply(m.chat, "Ikan Buntal Kamu Tidak Cukup".trim(), m);
            break;
          case "hiu":
            db.data.users[m.sender].hiu >= 1 * count ? (db.data.users[m.sender].money += 7e3 * count, db.data.users[m.sender].hiu -= 1 * count, await conn.reply(m.chat, `Sukses Menjual ${count} Hiu Dengan Harga ${7e3 * count} Money `.trim(), m)) : await conn.reply(m.chat, "Hiu Kamu Tidak Cukup".trim(), m);
            break;
          case "orca":
            db.data.users[m.sender].orca >= 1 * count ? (db.data.users[m.sender].money += 7e3 * count, db.data.users[m.sender].orca -= 1 * count, await conn.reply(m.chat, `Sukses Menjual ${count} Paus Orca Dengan Harga ${7e3 * count} Money `.trim(), m)) : await conn.reply(m.chat, "Paus Orca Kamu Tidak Cukup".trim(), m);
            break;
          case "lumba":
            db.data.users[m.sender].lumba >= 1 * count ? (db.data.users[m.sender].money += 7e3 * count, db.data.users[m.sender].lumba -= 1 * count, await conn.reply(m.chat, `Sukses Menjual ${count} Lumba Lumba Dengan Harga ${7e3 * count} Money `.trim(), m)) : await conn.reply(m.chat, "Lumba Lumba Kamu Tidak Cukup".trim(), m);
            break;
          case "paus":
            db.data.users[m.sender].paus >= 1 * count ? (db.data.users[m.sender].money += 7e3 * count, db.data.users[m.sender].paus -= 1 * count, await conn.reply(m.chat, `Sukses Menjual ${count} Paus Dengan Harga ${7e3 * count} Money `.trim(), m)) : await conn.reply(m.chat, "Paus Kamu Tidak Cukup".trim(), m);
            break;
          case "lobster":
            db.data.users[m.sender].lobster >= 1 * count ? (db.data.users[m.sender].money += 7e3 * count, db.data.users[m.sender].lobster -= 1 * count, await conn.reply(m.chat, `Sukses Menjual ${count} Lobster Dengan Harga ${7e3 * count} Money `.trim(), m)) : await conn.reply(m.chat, "Lobster Kamu Tidak Cukup".trim(), m);
            break;
          case "udang":
            db.data.users[m.sender].udang >= 1 * count ? (db.data.users[m.sender].money += 7e3 * count, db.data.users[m.sender].udang -= 1 * count, await conn.reply(m.chat, `Sukses Menjual ${count} Udang Dengan Harga ${7e3 * count} Money `.trim(), m)) : await conn.reply(m.chat, "Udang Kamu Tidak Cukup".trim(), m);
            break;
          case "cumi":
            db.data.users[m.sender].cumi >= 1 * count ? (db.data.users[m.sender].money += 7e3 * count, db.data.users[m.sender].cumi -= 1 * count, await conn.reply(m.chat, `Sukses Menjual ${count} Cumi Dengan Harga ${7e3 * count} Money `.trim(), m)) : await conn.reply(m.chat, "Cumi Kamu Tidak Cukup".trim(), m);
            break;
          default:
            return await conn.reply(m.chat, Kchat, m);
        }
      } else if (/sell|jual|/i.test(command)) {
        const count = args[1] && args[1].length > 0 ? Math.min(99999999, Math.max(parseInt(args[1]), 1)) : !args[1] || args.length < 3 ? 1 : Math.min(1, count);
        switch (type) {
          case "banteng":
            db.data.users[m.sender].banteng >= 1 * count ? (db.data.users[m.sender].money += 7e3 * count, db.data.users[m.sender].banteng -= 1 * count, await conn.reply(m.chat, `Sukses Menjual ${count} Banteng Dengan Harga ${9e3 * count} Money `.trim(), m)) : await conn.reply(m.chat, "Banteng Kamu Tidak Cukup".trim(), m);
            break;
          case "harimau":
            db.data.users[m.sender].harimau >= 1 * count ? (db.data.users[m.sender].money += 9e3 * count, db.data.users[m.sender].harimau -= 1 * count, await conn.reply(m.chat, `Sukses Menjual ${count} Harimau Dengan Harga ${9e3 * count} Money `.trim(), m)) : await conn.reply(m.chat, "Harimau Kamu Tidak Cukup".trim(), m);
            break;
          case "gajah":
            db.data.users[m.sender].gajah >= 1 * count ? (db.data.users[m.sender].money += 9e3 * count, db.data.users[m.sender].gajah -= 1 * count, await conn.reply(m.chat, `Sukses Menjual ${count} Gajah Dengan Harga ${9e3 * count} Money `.trim(), m)) : await conn.reply(m.chat, "Gajah Kamu Tidak Cukup".trim(), m);
            break;
          case "kambing":
            db.data.users[m.sender].kambing >= 1 * count ? (db.data.users[m.sender].money += 9e3 * count, db.data.users[m.sender].kambing -= 1 * count, await conn.reply(m.chat, `Sukses Menjual ${count} Kambing Dengan Harga ${9e3 * count} Money `.trim(), m)) : await conn.reply(m.chat, "Kambing Kamu Tidak Cukup".trim(), m);
            break;
          case "panda":
            db.data.users[m.sender].panda >= 1 * count ? (db.data.users[m.sender].money += 9e3 * count, db.data.users[m.sender].panda -= 1 * count, await conn.reply(m.chat, `Sukses Menjual ${count} Panda Dengan Harga ${9e3 * count} Money `.trim(), m)) : await conn.reply(m.chat, "Panda Kamu Tidak Cukup".trim(), m);
            break;
          case "buaya":
            db.data.users[m.sender].buaya >= 1 * count ? (db.data.users[m.sender].money += 9e3 * count, db.data.users[m.sender].buaya -= 1 * count, await conn.reply(m.chat, `Sukses Menjual ${count} Buaya Dengan Harga ${9e3 * count} Money `.trim(), m)) : await conn.reply(m.chat, "Buaya Kamu Tidak Cukup".trim(), m);
            break;
          case "kerbau":
            db.data.users[m.sender].kerbau >= 1 * count ? (db.data.users[m.sender].money += 9e3 * count, db.data.users[m.sender].kerbau -= 1 * count, await conn.reply(m.chat, `Sukses Menjual ${count} Kerbau Dengan Harga ${9e3 * count} Money `.trim(), m)) : await conn.reply(m.chat, "Kerbau Kamu Tidak Cukup".trim(), m);
            break;
          case "sapi":
            db.data.users[m.sender].sapi >= 1 * count ? (db.data.users[m.sender].money += 9e3 * count, db.data.users[m.sender].sapi -= 1 * count, await conn.reply(m.chat, `Sukses Menjual ${count} Sapi Dengan Harga ${9e3 * count} Money `.trim(), m)) : await conn.reply(m.chat, "Sapi Kamu Tidak Cukup".trim(), m);
            break;
          case "monyet":
            db.data.users[m.sender].monyet >= 1 * count ? (db.data.users[m.sender].money += 9e3 * count, db.data.users[m.sender].monyet -= 1 * count, await conn.reply(m.chat, `Sukses Menjual ${count} Monyet Dengan Harga ${9e3 * count} Money `.trim(), m)) : await conn.reply(m.chat, "Monyet Kamu Tidak Cukup".trim(), m);
            break;
          case "babi":
            db.data.users[m.sender].babi >= 1 * count ? (db.data.users[m.sender].money += 9e3 * count, db.data.users[m.sender].babi -= 1 * count, await conn.reply(m.chat, `Sukses Menjual ${count} Babi Dengan Harga ${9e3 * count} Money `.trim(), m)) : await conn.reply(m.chat, "Babi Kamu Tidak Cukup".trim(), m);
            break;
          case "babihutan":
            db.data.users[m.sender].babihutan >= 1 * count ? (db.data.users[m.sender].money += 9e3 * count, db.data.users[m.sender].babihutan -= 1 * count, await conn.reply(m.chat, `Sukses Menjual ${count} Babi Hutan Dengan Harga ${9e3 * count} Money `.trim(), m)) : await conn.reply(m.chat, "Babi Hutan Kamu Tidak Cukup".trim(), m);
            break;
          case "ayam":
            db.data.users[m.sender].ayam >= 1 * count ? (db.data.users[m.sender].money += 9e3 * count, db.data.users[m.sender].ayam -= 1 * count, await conn.reply(m.chat, `Sukses Menjual ${count} Ayam Dengan Harga ${9e3 * count} Money `.trim(), m)) : await conn.reply(m.chat, "Ayam Kamu Tidak Cukup".trim(), m);
            break;
          case "kepiting":
            db.data.users[m.sender].kepiting >= 1 * count ? (db.data.users[m.sender].money += 7e3 * count, db.data.users[m.sender].kepiting -= 1 * count, await conn.reply(m.chat, `Sukses Menjual ${count} Kepiting Dengan Harga ${7e3 * count} Money `.trim(), m)) : await conn.reply(m.chat, "Kepiting Kamu Tidak Cukup".trim(), m);
            break;
          case "ikan":
            db.data.users[m.sender].ikan >= 1 * count ? (db.data.users[m.sender].money += 7e3 * count, db.data.users[m.sender].ikan -= 1 * count, await conn.reply(m.chat, `Sukses Menjual ${count} Ikan Dengan Harga ${7e3 * count} Money `.trim(), m)) : await conn.reply(m.chat, "Ikan Kamu Tidak Cukup".trim(), m);
            break;
          case "dory":
            db.data.users[m.sender].dory >= 1 * count ? (db.data.users[m.sender].money += 7e3 * count, db.data.users[m.sender].dory -= 1 * count, await conn.reply(m.chat, `Sukses Menjual ${count} Ikan Dory Dengan Harga ${7e3 * count} Money `.trim(), m)) : await conn.reply(m.chat, "Ikan Dory Kamu Tidak Cukup".trim(), m);
            break;
          case "gurita":
            db.data.users[m.sender].gurita >= 1 * count ? (db.data.users[m.sender].money += 7e3 * count, db.data.users[m.sender].gurita -= 1 * count, await conn.reply(m.chat, `Sukses Menjual ${count} Gurita Dengan Harga ${7e3 * count} Money `.trim(), m)) : await conn.reply(m.chat, "Gurita Kamu Tidak Cukup".trim(), m);
            break;
          case "buntal":
            db.data.users[m.sender].buntal >= 1 * count ? (db.data.users[m.sender].money += 7e3 * count, db.data.users[m.sender].buntal -= 1 * count, await conn.reply(m.chat, `Sukses Menjual ${count} Ikan Buntal Dengan Harga ${7e3 * count} Money `.trim(), m)) : await conn.reply(m.chat, "Ikan Buntal Kamu Tidak Cukup".trim(), m);
            break;
          case "hiu":
            db.data.users[m.sender].hiu >= 1 * count ? (db.data.users[m.sender].money += 7e3 * count, db.data.users[m.sender].hiu -= 1 * count, await conn.reply(m.chat, `Sukses Menjual ${count} Hiu Dengan Harga ${7e3 * count} Money `.trim(), m)) : await conn.reply(m.chat, "Hiu Kamu Tidak Cukup".trim(), m);
            break;
          case "orca":
            db.data.users[m.sender].orca >= 1 * count ? (db.data.users[m.sender].money += 7e3 * count, db.data.users[m.sender].orca -= 1 * count, await conn.reply(m.chat, `Sukses Menjual ${count} Paus Orca Dengan Harga ${7e3 * count} Money `.trim(), m)) : await conn.reply(m.chat, "Paus Orca Kamu Tidak Cukup".trim(), m);
            break;
          case "lumba":
            db.data.users[m.sender].lumba >= 1 * count ? (db.data.users[m.sender].money += 7e3 * count, db.data.users[m.sender].lumba -= 1 * count, await conn.reply(m.chat, `Sukses Menjual ${count} Lumba Lumba Dengan Harga ${7e3 * count} Money `.trim(), m)) : await conn.reply(m.chat, "Lumba Lumba Kamu Tidak Cukup".trim(), m);
            break;
          case "paus":
            db.data.users[m.sender].paus >= 1 * count ? (db.data.users[m.sender].money += 7e3 * count, db.data.users[m.sender].paus -= 1 * count, await conn.reply(m.chat, `Sukses Menjual ${count} Paus Dengan Harga ${7e3 * count} Money `.trim(), m)) : await conn.reply(m.chat, "Paus Kamu Tidak Cukup".trim(), m);
            break;
          case "lobster":
            db.data.users[m.sender].lobster >= 1 * count ? (db.data.users[m.sender].money += 7e3 * count, db.data.users[m.sender].lobster -= 1 * count, await conn.reply(m.chat, `Sukses Menjual ${count} Lobster Dengan Harga ${7e3 * count} Money `.trim(), m)) : await conn.reply(m.chat, "Lobster Kamu Tidak Cukup".trim(), m);
            break;
          case "udang":
            db.data.users[m.sender].udang >= 1 * count ? (db.data.users[m.sender].money += 7e3 * count, db.data.users[m.sender].udang -= 1 * count, await conn.reply(m.chat, `Sukses Menjual ${count} Udang Dengan Harga ${7e3 * count} Money `.trim(), m)) : await conn.reply(m.chat, "Udang Kamu Tidak Cukup".trim(), m);
            break;
          case "cumi":
            db.data.users[m.sender].cumi >= 1 * count ? (db.data.users[m.sender].money += 7e3 * count, db.data.users[m.sender].cumi -= 1 * count, await conn.reply(m.chat, `Sukses Menjual ${count} Cumi Dengan Harga ${7e3 * count} Money `.trim(), m)) : await conn.reply(m.chat, "Cumi Kamu Tidak Cukup".trim(), m);
            break;
          default:
            return await conn.reply(m.chat, Kchat, m);
        }
      }
    } catch (e) {
      if (await conn.reply(m.chat, Kchat, m), console.log(e), DevMode)
        for (let jid of owner.map(v => v.replace(/[^0-9]/g, "") + "@s.whatsapp.net").filter(v => v != conn.user.jid)) await conn.reply(jid, "shop.js error\nNo: *" + m.sender.split("@")[0] + "*\nCommand: *" + m.text + "*\n\n*" + e + "*", m);
    }
  };
handler.help = ["pasar <jual> <args>"], handler.tags = ["rpg"], handler.command = /^(pasar|jual)$/i;
export default handler;