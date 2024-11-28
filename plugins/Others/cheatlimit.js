import fetch from "node-fetch";
const handler = async (m, { conn, text, args, usedPrefix, command }) => {
  try {
    const cheat = {
      1: "money",
      2: "limit",
      3: "level",
      4: "exp",
      5: "potion",
      6: "aqua",
      7: "trash",
      8: "wood",
      9: "rock",
      10: "string",
      11: "iron",
      12: "diamond",
      13: "emerald",
      14: "gold",
      15: "coal",
      16: "common",
      17: "uncommon",
      18: "mythic",
      19: "legendary",
      20: "foodpet",
      21: "Fox",
      22: "naga",
      23: "pet",
      24: "anggur",
      25: "apel",
      26: "batu",
      27: "berlian",
      28: "bibitanggur",
      29: "bibitapel",
      30: "bibitjeruk",
      31: "bibitmangga",
      32: "bibitpisang",
      33: "botol",
      34: "centaur",
      35: "eleksirb",
      36: "emasbatang",
      37: "emasbiasa",
      38: "exp",
      39: "gardenboc",
      40: "gardenboxs",
      41: "griffin",
      42: "healtmonster",
      43: "jeruk",
      44: "kaleng",
      45: "kardus",
      46: "kayu",
      47: "ketake",
      48: "koinexpg",
      49: "kucing",
      50: "kuda",
      51: "kyubi",
      52: "makanancentaur",
      53: "makanangriffin",
      54: "makanankyubi",
      55: "makanannaga",
      56: "makananpet",
      57: "makananphonix",
      58: "mangga",
      59: "pancingan",
      60: "phonix",
      61: "pisang",
      62: "rubah",
      63: "sampah",
      64: "serigala",
      65: "sword",
      66: "tiketcoin",
      67: "umpan",
    };
    const user = db.data.users[m.sender];
    const input = parseInt(args[0]);
    const count = parseInt(args[1]);
    if (user.level < 100) {
      return conn.reply(
        m.chat,
        "Level kamu belum cukup. Level minimal 100 untuk menggunakan cheat.",
        m,
      );
    }
    if (isNaN(input)) {
      const validCodes = Object.keys(cheat);
      const buttons = conn.ctaButton
        .setBody(`🖼️ *Pilih jenis cheat di bawah ini:*`)
        .setFooter(`Pilih jenis cheat.`)
        .addSelection("Klik di sini")
        .makeSections("Cheat", "pilihan");
      validCodes.forEach((c) => {
        buttons.makeRow(
          "",
          `🔹 ${cheat[c]}`,
          `Pilih ${cheat[c]}`,
          `${usedPrefix + command} ${c}`,
        );
      });
      return buttons.run(m.chat, conn, m);
    }
    if (isNaN(count) && cheat[input]) {
      const countOptions = Array.from(
        {
          length: 10,
        },
        () => Math.floor(Math.random() * (1e5 - 1e4 + 1)) + 1e4,
      );
      const buttons = conn.ctaButton
        .setBody(`🖼️ *Pilih jumlah untuk ${cheat[input]}:*`)
        .setFooter(`Pilih jumlah yang ingin ditambahkan.`)
        .addSelection("Klik di sini")
        .makeSections("Jumlah", "pilihan");
      countOptions.forEach((randomCount) => {
        buttons.makeRow(
          "",
          `🔹 Count: ${randomCount}`,
          `Tambahkan ${randomCount}`,
          `${usedPrefix + command} ${input} ${randomCount}`,
        );
      });
      return buttons.run(m.chat, conn, m);
    }
    if (!isNaN(input) && !isNaN(count) && cheat[input]) {
      user[cheat[input]] += count;
      const cheatResults = user[cheat[input]];
      return conn.reply(
        m.chat,
        `Cheat "${cheat[input]}" telah dieksekusi.\n\nJumlah cheat saat ini: ${cheatResults}`,
        m,
      );
    }
    return conn.reply(m.chat, "Input atau jumlah tidak valid.", m);
  } catch (error) {
    await conn.reply(m.chat, `Terjadi kesalahan: ${error.message}`, m);
  }
};
handler.help = ["ngechit"].map((v) => v + " *hehe..*");
handler.tags = ["xp"];
handler.command = /^(ngech(ea|i)t|c(((he(ater|t)|iter)|(hea|i)t)|hit))$/i;
handler.private = true;
export default handler;
