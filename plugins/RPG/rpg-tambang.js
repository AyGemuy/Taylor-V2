const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

function createTambangs() {
  return ["Emas", "Perak", "Berlian", "Batu Permata", "Uranium", "Emas Hitam", "Kristal", "Rubi", "Safir", "Topaz", "Ametis", "Zamrud", "Opal", "Kuarsa", "Safir Merah", "Topaz Biru", "Ametis Ungu", "Rubi Merah", "Emas Putih", "Berlian Biru", "Batu Permata Hitam", "Uranium Radioaktif", "Kristal Langka", "Diam", "Pirus", "Garnet", "Kalimaya", "Kuarsit", "Lapis Lazuli", "Rodokrosit", "Yaspis", "Malakit", "Hessonit", "Peridot", "Amber", "Kornerupin", "Morganit", "Labradorit", "Akuamarin", "Tanzanite", "Batu Delima", "Akuamarin", "Kunzit", "Maw-sit-sit", "Sphene", "Kyanite", "Alexandrite", "Variscite", "Tambang Baru 1", "Tambang Baru 2", "Tambang Baru 3"].map((areaName, i) => ({
    area: `Tambang ${areaName}`,
    txt: areaName.toLowerCase().replace(/ /g, "_"),
    reward: {
      exp: 50 + 50 * i,
      crystal: 20 + 25 * i
    }
  }));
}

function formatTime(ms) {
  return ["\n" + (isNaN(ms) ? "--" : Math.floor(ms / 864e5)), " *Hari ☀️*\n", isNaN(ms) ? "--" : Math.floor(ms / 36e5) % 24, " *Jam 🕐*\n", isNaN(ms) ? "--" : Math.floor(ms / 6e4) % 60, " *Menit ⏰*\n", isNaN(ms) ? "--" : Math.floor(ms / 1e3) % 60, " *Detik ⏱️*"].map(v => v.toString().padStart(2, 0)).join("");
}
async function handler(m, {
  conn,
  text
}) {
  conn.tambang = conn.tambang || {};
  let user = db.data.users[m.sender];
  if (m.sender in conn.tambang) return conn.tambang[m.sender].currentArea >= conn.tambang[m.sender].areas.length ? m.reply("🏆 Anda telah menyelesaikan semua area pertambangan.") : m.reply("⏳ Anda masih memiliki area pertambangan yang belum selesai. Silakan selesaikan terlebih dahulu.");
  if ("start" === text) {
    let tambangs = createTambangs();
    if (!user) return m.reply("📝 Silakan daftar untuk bermain game.");
    if (0 === user.health || 0 === user.stamina || 0 === user.mana) return m.reply("❗ Stamina/health/mana Anda kurang dari 100.");
    "number" != typeof user.exp && (db.data.users[m.sender].exp = 0), "number" != typeof user.crystal && (db.data.users[m.sender].crystal = 0), "number" != typeof user.lastGameTime && (db.data.users[m.sender].lastGameTime = 0);
    let timers = 3e5 - (Date.now() - (user.lastGameTime || 0));
    if (timers > 0) return m.reply(`Silakan tunggu ${formatTime(timers)} lagi sebelum memulai pertambangan baru.`);
    let {
      area,
      txt,
      reward
    } = tambangs[0], currentArea = 0, hasilTambang = 0, totalReward = 0;
    conn.tambang[m.sender] = {
      areas: tambangs,
      currentArea: currentArea,
      hasilTambang: hasilTambang,
      lastTambangTime: Date.now(),
      totalReward: totalReward
    };
    let caption = `🏞️ *AREA PERTAMBANGAN:* ${area}\n\n🪨 Ketik *'${txt}'* untuk memulai pertambangan di area ini.\n🔍 Jumlah hasil tambang yang didapatkan: ${hasilTambang}\n💰 Exp yang didapatkan: ${reward.exp}\n💎 Crystal yang didapatkan: ${reward.crystal}`;
    return m.reply(caption);
  } {
    let instructions = "🏅 Selamat datang di game pertambangan!\n";
    return instructions += "Ketik *'tambang start'* untuk memulai pertambangan.\n",
      instructions += "Ketik *'stop'* untuk menghentikan pertambangan saat sedang bermain.",
      m.reply(instructions);
  }
}
handler.before = async m => {
  if (conn.tambang = conn.tambang || {}, !(m.sender in conn.tambang)) return;
  if (m.isBaileys) return;
  let {
    areas,
    currentArea,
    hasilTambang,
    lastTambangTime,
    totalReward
  } = conn.tambang[m.sender];
  let user = db.data.users[m.sender],
    msg = m.text.toLowerCase();
  if ("stop" === msg) return m.reply("❌ Pertambangan telah dihentikan. Ketik *'tambang start'* untuk memulai pertambangan kembali."),
    delete conn.tambang[m.sender], !1;
  if (currentArea < areas.length && areas[currentArea].txt === msg) {
    let {
      area,
      reward
    } = areas[currentArea];
    if (user.exp += reward.exp, user.crystal += reward.crystal, hasilTambang++, totalReward += reward.exp + reward.crystal, currentArea++, conn.tambang[m.sender].currentArea = currentArea, conn.tambang[m.sender].hasilTambang = hasilTambang, conn.tambang[m.sender].totalReward = totalReward, conn.tambang[m.sender].lastTambangTime = Date.now(), currentArea >= areas.length) return m.reply(`🎉 Selamat! Anda telah menyelesaikan semua area pertambangan.\nTotal hasil tambang: ${hasilTambang}\nExp yang didapatkan: ${totalReward}\nTotal crystal yang didapatkan: ${totalReward}`),
      delete conn.tambang[m.sender], !1;
    {
      let caption = `🏞️ *AREA PERTAMBANGAN:* ${areas[currentArea].area}\n\n🪨 Ketik *'${areas[currentArea].txt}'* untuk memulai pertambangan di area ini.\n🔍 Jumlah hasil tambang yang didapatkan: ${hasilTambang}\n💰 Exp yang didapatkan: ${reward.exp}\n💎 Crystal yang didapatkan: ${reward.crystal}`;
      return m.reply(caption), !1;
    }
  }
}, handler.help = ["tambang"], handler.tags = ["rpg"], handler.command = /^(tambang)$/i;
export default handler;