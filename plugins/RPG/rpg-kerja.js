const jobs = {
    ojek: [{
      name: "Ojek",
      task: "🛵 Mengantarkan penumpang",
      difficulty: pickRandom(["Noob", "Easy", "Normal"]),
      money: randomMoney(5e5, 1),
      exp: 15
    }],
    pedagang: [{
      name: "Pedagang",
      task: "🛒 Mencari pembeli",
      difficulty: pickRandom(["Noob", "Easy", "Normal"]),
      money: randomMoney(5e5, 1),
      exp: 25
    }],
    dokter: [{
      name: "Dokter",
      task: "💉 Merawat pasien",
      difficulty: pickRandom(["Easy", "Normal", "Hard"]),
      money: randomMoney(5e5, 1),
      exp: 40
    }],
    petani: [{
      name: "Petani",
      task: "🌾 Menanam dan memanen tanaman",
      difficulty: pickRandom(["Noob", "Easy", "Normal"]),
      money: randomMoney(5e5, 1),
      exp: 30
    }],
    montir: [{
      name: "Montir",
      task: "🔧 Memperbaiki kendaraan",
      difficulty: pickRandom(["Easy", "Normal", "Hard"]),
      money: randomMoney(5e5, 1),
      exp: 20
    }],
    kuli: [{
      name: "Kuli",
      task: "🏋️ Membantu proyek konstruksi",
      difficulty: "Extreme",
      money: randomMoney(5e5, 1),
      exp: 50
    }],
    gamer: [{
      name: "Gamer",
      task: "🎮 Main game dan streaming",
      difficulty: pickRandom(["Noob", "Easy", "Normal", "Hard"]),
      money: randomMoney(5e5, 1),
      exp: 10
    }],
    teacher: [{
      name: "Teacher",
      task: "👩‍🏫 Mengajar dan memberi pembelajaran",
      difficulty: pickRandom(["Noob", "Easy", "Normal", "Hard"]),
      money: randomMoney(5e5, 1),
      exp: 35
    }],
    designer: [{
      name: "Graphic Designer",
      task: "🎨 Membuat desain grafis",
      difficulty: pickRandom(["Easy", "Normal", "Hard"]),
      money: randomMoney(5e5, 1),
      exp: 28
    }]
  },
  taskInformation = {
    "🌾 Menanam dan memanen tanaman": ["Telah menanam jagung sebanyak 100 batang.", "Berhasil memanen 50 kg tomat dengan hasil bagus.", "Menanggulangi hama dan penyakit pada tanaman dengan sukses.", "Menciptakan varietas baru tanaman yang unggul.", "Mengikuti pelatihan pertanian terkemuka untuk meningkatkan keterampilan."],
    "🛒 Mencari pembeli": ["Mendapatkan pelanggan setia yang selalu membeli produk.", "Mengadakan diskon besar-besaran untuk menarik pembeli.", "Mendapat penawaran untuk bekerja sama dengan toko besar.", "Mengembangkan strategi pemasaran yang efektif untuk meningkatkan penjualan.", "Mendapatkan testimoni positif dari banyak pelanggan."],
    "💉 Merawat pasien": ["Menyembuhkan penyakit langka yang tidak bisa disembuhkan sebelumnya.", "Menyelamatkan nyawa seorang pasien dalam kondisi kritis.", "Dapat diagnosis yang tepat dan memberikan terapi yang efektif.", "Menjadi bagian dari tim medis yang berhasil melakukan operasi sulit.", "Menjadi pembicara utama dalam konferensi medis internasional."],
    "🔧 Memperbaiki kendaraan": ["Berhasil memperbaiki mobil mewah milik selebriti terkenal.", "Menyelesaikan perbaikan motor dalam waktu singkat.", "Dapat menemukan dan mengatasi masalah yang rumit pada kendaraan.", "Mengembangkan prototipe baru untuk kendaraan yang lebih efisien.", "Memperoleh sertifikat dari produsen kendaraan terkemuka untuk keahliannya."],
    "🛵 Mengantarkan penumpang": ["Menyelesaikan banyak perjalanan dalam waktu singkat.", "Membawa penumpang ke tujuan dengan aman dan tepat waktu.", "Mendapat review positif dari banyak penumpang.", "Menghadapi situasi darurat dengan tenang dan penuh tanggung jawab.", "Memiliki rute pilihan yang efisien untuk menghindari kemacetan."],
    "🏋️ Membantu proyek konstruksi": ["Berpartisipasi dalam proyek konstruksi terbesar di kota.", "Menyelesaikan pekerjaan berat dengan kecepatan tinggi.", "Bekerja dengan tim yang solid untuk mencapai target proyek.", "Menghadapi tantangan fisik dalam kondisi cuaca ekstrem.", "Menemukan solusi inovatif untuk efisiensi konstruksi."],
    "🎮 Main game dan streaming": ["Mencapai prestasi tertinggi di dalam game populer.", "Mendapatkan banyak penonton dan donasi saat streaming.", "Menjadi pemain profesional dan berkompetisi di turnamen besar.", "Menciptakan komunitas gamer yang aktif dan positif.", "Mengumpulkan sponsor untuk mendukung karier sebagai gamer."],
    "👩‍🏫 Mengajar dan memberi pembelajaran": ["Meningkatkan hasil belajar siswa secara signifikan.", "Mendapatkan penghargaan sebagai guru terbaik di sekolah.", "Menjadi sumber inspirasi bagi murid-muridnya dan memotivasi mereka untuk sukses.", "Mengembangkan program pembelajaran inovatif yang disukai siswa.", "Mengadakan seminar edukatif untuk meningkatkan kualitas pendidikan."],
    "🎨 Membuat desain grafis": ["Menghasilkan desain logo yang menarik untuk perusahaan ternama.", "Membuat ilustrasi digital untuk buku anak-anak yang mendapat banyak pujian.", "Mendesain kampanye iklan yang sukses dan mendapat banyak perhatian.", "Berpartisipasi dalam proyek animasi yang mendapatkan penghargaan.", "Menjalin kerja sama dengan selebriti untuk menciptakan konten visual."]
  },
  handler = async (m, {
    conn,
    command,
    args,
    usedPrefix
  }) => {
    let type = (args[0] || "").toLowerCase(),
      user = db.data.users[m.sender],
      timeNow = Date.now();
    if (conn.lastWorkTime = conn.lastWorkTime ? conn.lastWorkTime : {}, /kerja|work/i.test(command)) {
      const jobFields = Object.keys(jobs).map((field, index) => `*${index + 1}.* ${field}`).join("\n");
      if (!Object.keys(jobs).includes(type)) throw `ℹ️ Pilih bidang pekerjaan yang sesuai:\n${jobFields}\n\nContoh: ketik *${usedPrefix + command} petani* untuk bekerja pertanian`;
      let jobData = jobs[type][Math.floor(Math.random() * jobs[type].length)];
      if (!jobData) throw "😅 Pekerjaan tidak ditemukan. Silakan pilih bidang pekerjaan yang sesuai dari daftar berikut:\n" + jobFields + `\nKetik: *${usedPrefix + command}petani*`;
      const penaltyChance = Math.random() < .5;
      if (timeNow - conn.lastWorkTime[m.sender] < 864e5) {
        throw `😴 Kamu sudah bekerja, saatnya istirahat selama\n${clockString(864e5 - (timeNow - conn.lastWorkTime[m.sender]))}`;
      }
      const earnedMoney = jobData.money * ("Extreme" === jobData.difficulty ? 3 : "Hard" === jobData.difficulty ? 2 : 1) * 10,
        earnedExp = 10 * jobData.exp;
      user.money = (user.money || 0) + earnedMoney, user.exp = (user.exp || 0) + earnedExp,
        conn.lastWorkTime[m.sender] = timeNow;
      const taskInfo = pickRandom(taskInformation[jobData.task]),
        randomMessage = pickRandom([`👷 Kamu ${jobData.name} dan sedang ${jobData.task}\nTingkat Kesulitan: ${jobData.difficulty}\n\n💰 Mendapatkan uang senilai ${formatRupiah(earnedMoney)}\n🔼 Dapatkan *${earnedExp}* EXP\nℹ️ Info Tambahan: ${taskInfo}`, `🔧 Sebagai ${jobData.name}, tugasmu adalah ${jobData.task}\nTingkat Kesulitan: ${jobData.difficulty}\n\n💰 Mendapatkan uang senilai ${formatRupiah(earnedMoney)}\n🔼 Dapatkan *${earnedExp}* EXP\nℹ️ Info Tambahan: ${taskInfo}`, `🚜 Sebagai seorang ${jobData.name}, tugasmu adalah ${jobData.task}\nTingkat Kesulitan: ${jobData.difficulty}\n\n💰 Mendapatkan uang senilai ${formatRupiah(earnedMoney)}\n🔼 Dapatkan *${earnedExp}* EXP\nℹ️ Info Tambahan: ${taskInfo}`]);
      m.reply(randomMessage), penaltyChance && jobData.penalty && (user[type] -= 1, m.reply(jobData.penalty)),
        setTimeout(() => {
          m.reply("Waktumu untuk bekerja sudah tiba! Kamu bisa bekerja lagi sekarang.");
        }, 864e5);
    }
  };
handler.help = ["kerja", "work"], handler.tags = ["rpg"], handler.command = /^kerja$/i;
export default handler;

function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)];
}

function randomMoney(max, min) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function clockString(ms) {
  return ["\n" + (isNaN(ms) ? "--" : Math.floor(ms / 864e5)), " *Days ☀️*\n ", isNaN(ms) ? "--" : Math.floor(ms / 36e5) % 24, " *Hours 🕐*\n ", isNaN(ms) ? "--" : Math.floor(ms / 6e4) % 60, " *Minute ⏰*\n ", isNaN(ms) ? "--" : Math.floor(ms / 1e3) % 60, " *Second ⏱️* "].map(v => v.toString().padStart(2, 0)).join("");
}

function formatRupiah(number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0
  }).format(number);
}