const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

function createQuests() {
  return [{
    pertanyaan: ["Apa ibukota Indonesia?", "Apa nama planet ketujuh dari matahari?", "Apa bahasa resmi di Jepang?"],
    jawaban: ["jakarta", "uranus", "jepang"],
    reward: {
      exp: 50,
      crystal: 20
    }
  }, {
    pertanyaan: ["Siapa presiden pertama Indonesia?", "Apa simbol kimia untuk air?", "Apa nama ilmuwan yang menemukan hukum gravitasi?"],
    jawaban: ["soekarno", "h2o", "isaac newton"],
    reward: {
      exp: 70,
      crystal: 30
    }
  }, {
    pertanyaan: ["Siapa penemu bola lampu?", "Apa nama hewan tercepat di dunia?", "Berapakah 10 + 10?"],
    jawaban: ["thomas edison", "cheetah", "20"],
    reward: {
      exp: 100,
      crystal: 50
    }
  }, {
    pertanyaan: ["Apa nama mata uang Jepang?", "Berapakah 8 x 8?", "Siapa penemu teori relativitas umum?"],
    jawaban: ["yen", "64", "albert einstein"],
    reward: {
      exp: 120,
      crystal: 60
    }
  }, {
    pertanyaan: ["Apa nama tokoh fiksi paling terkenal dari Jepang?", "Apa simbol kimia untuk emas?", "Apa lambang dari planet Merkurius?"],
    jawaban: ["doraemon", "au", "☿"],
    reward: {
      exp: 150,
      crystal: 80
    }
  }, {
    pertanyaan: ["Apa warna bendera Indonesia?", "Apa nama planet terbesar di tata surya?", "Apa bahasa resmi di Perancis?"],
    jawaban: ["merah putih", "yupiter", "perancis"],
    reward: {
      exp: 80,
      crystal: 40
    }
  }, {
    pertanyaan: ["Apa nama tokoh kartun yang memakai baju bergaris merah putih?", "Apa simbol kimia untuk nitrogen?", "Berapakah 10 + 15?"],
    jawaban: ["captain america", "n", "25"],
    reward: {
      exp: 100,
      crystal: 50
    }
  }, {
    pertanyaan: ["Siapa penulis drama 'Hamlet'?", "Apa bahasa resmi di Vietnam?", "Berapakah 40 ÷ 5?"],
    jawaban: ["william shakespeare", "vietnam", "8"],
    reward: {
      exp: 120,
      crystal: 60
    }
  }, {
    pertanyaan: ["Apa nama alat musik gesek yang memiliki empat senar?", "Apa simbol kimia untuk belerang?", "Berapakah 7 x 7?"],
    jawaban: ["biola", "s", "49"],
    reward: {
      exp: 140,
      crystal: 70
    }
  }, {
    pertanyaan: ["Apa warna daun saat musim semi?", "Apa nama planet terbesar kedelapan di tata surya?", "Apa bahasa resmi di Jerman?"],
    jawaban: ["hijau", "neptunus", "jerman"],
    reward: {
      exp: 160,
      crystal: 80
    }
  }, {
    pertanyaan: ["Siapa tokoh kartun anjing yang berwarna hitam dan putih?", "Apa simbol kimia untuk tembaga?", "Berapakah 16 ÷ 4?"],
    jawaban: ["goofy", "cu", "4"],
    reward: {
      exp: 180,
      crystal: 90
    }
  }, {
    pertanyaan: ["Apa nama binatang yang berbisa dan melata?", "Apa bahasa resmi di Korea Utara?", "Berapakah 36 - 18?"],
    jawaban: ["ular", "korea", "18"],
    reward: {
      exp: 200,
      crystal: 100
    }
  }, {
    pertanyaan: ["Siapa penulis novel 'Pride and Prejudice'?", "Apa simbol kimia untuk kalium?", "Berapakah 80 ÷ 10?"],
    jawaban: ["jane austen", "k", "8"],
    reward: {
      exp: 220,
      crystal: 110
    }
  }, {
    pertanyaan: ["Apa nama tanaman yang menghasilkan teh?", "Apa bahasa resmi di Italia?", "Berapakah 6 x 9?"],
    jawaban: ["teh", "italia", "54"],
    reward: {
      exp: 240,
      crystal: 120
    }
  }, {
    pertanyaan: ["Apa warna langit saat malam hari?", "Apa nama planet terbesar keenam di tata surya?", "Apa bahasa resmi di Korea Selatan?"],
    jawaban: ["hitam", "saturnus", "korea"],
    reward: {
      exp: 260,
      crystal: 130
    }
  }, {
    pertanyaan: ["Siapa penulis novel 'The Great Gatsby'?", "Apa simbol kimia untuk seng?", "Berapakah 125 ÷ 5?"],
    jawaban: ["f. scott fitzgerald", "zn", "25"],
    reward: {
      exp: 280,
      crystal: 140
    }
  }, {
    pertanyaan: ["Siapa presiden Indonesia saat ini?", "Apa bahasa resmi di Sunda?", "Berapakah 12 x 5?"],
    jawaban: ["joko widodo", "sunda", "60"],
    reward: {
      exp: 100,
      crystal: 50
    }
  }, {
    pertanyaan: ["Apa nama film trilogi 'The Lord of the Rings'?", "Apa simbol kimia untuk oksigen?", "Berapakah 100 - 25?"],
    jawaban: ["the lord of the rings", "o", "75"],
    reward: {
      exp: 120,
      crystal: 60
    }
  }, {
    pertanyaan: ["Siapa penulis drama 'Romeo and Juliet'?", "Apa bahasa resmi di Thailand?", "Berapakah 15 + 8?"],
    jawaban: ["william shakespeare", "thai", "23"],
    reward: {
      exp: 140,
      crystal: 70
    }
  }, {
    pertanyaan: ["Apa nama alat musik tiup yang terbuat dari logam?", "Apa simbol kimia untuk air raksa?", "Berapakah 18 x 4?"],
    jawaban: ["terompet", "hg", "72"],
    reward: {
      exp: 160,
      crystal: 80
    }
  }, {
    pertanyaan: ["Apa warna daun saat musim gugur?", "Apa nama planet terdekat dengan Matahari?", "Apa bahasa resmi di Korea Selatan?"],
    jawaban: ["kuning", "merkurius", "korea"],
    reward: {
      exp: 180,
      crystal: 90
    }
  }, {
    pertanyaan: ["Siapa tokoh kartun yang tinggal di rumah nanas di dasar laut?", "Apa simbol kimia untuk perak?", "Berapakah 30 - 12?"],
    jawaban: ["spongebob squarepants", "ag", "18"],
    reward: {
      exp: 200,
      crystal: 100
    }
  }, {
    pertanyaan: ["Apa nama binatang yang bisa terbang?", "Apa bahasa resmi di India?", "Berapakah 24 x 3?"],
    jawaban: ["burung", "hindi", "72"],
    reward: {
      exp: 220,
      crystal: 110
    }
  }, {
    pertanyaan: ["Siapa penulis novel 'To Kill a Mockingbird'?", "Apa simbol kimia untuk karbon?", "Berapakah 50 + 25?"],
    jawaban: ["harper lee", "c", "75"],
    reward: {
      exp: 240,
      crystal: 120
    }
  }, {
    pertanyaan: ["Apa nama tanaman yang menghasilkan kopi?", "Apa bahasa resmi di Inggris?", "Berapakah 16 x 9?"],
    jawaban: ["kopi", "inggris", "144"],
    reward: {
      exp: 260,
      crystal: 130
    }
  }, {
    pertanyaan: ["Apa warna langit saat siang hari?", "Apa nama planet terbesar kelima di tata surya?", "Apa bahasa resmi di China?"],
    jawaban: ["biru", "yupiter", "mandarin"],
    reward: {
      exp: 280,
      crystal: 140
    }
  }, {
    pertanyaan: ["Siapa penulis novel 'Harry Potter'?", "Apa bahasa resmi di Brazil?", "Berapakah 7 x 9?"],
    jawaban: ["j.k. rowling", "portugis", "63"],
    reward: {
      exp: 90,
      crystal: 45
    }
  }, {
    pertanyaan: ["Apa nama tokoh kartun yang menggunakan topi merah dengan kacamata?", "Apa simbol kimia untuk besi?", "Berapakah akar kuadrat dari 144?"],
    jawaban: ["mickey mouse", "fe", "12"],
    reward: {
      exp: 110,
      crystal: 55
    }
  }, {
    pertanyaan: ["Siapa presiden pertama Amerika Serikat?", "Apa nama planet terdekat dengan Bumi?", "Apa bahasa resmi di Rusia?"],
    jawaban: ["george washington", "venus", "rusia"],
    reward: {
      exp: 130,
      crystal: 65
    }
  }, {
    pertanyaan: ["Apa nama binatang karnivora terbesar di dunia?", "Apa simbol kimia untuk kalsium?", "Berapakah 20 + 30?"],
    jawaban: ["singa", "ca", "50"],
    reward: {
      exp: 160,
      crystal: 85
    }
  }, {
    pertanyaan: ["Apa warna matahari saat terbenam?", "Apa nama planet terkecil di tata surya?", "Apa bahasa resmi di Spanyol?"],
    jawaban: ["merah", "merkurius", "spanyol"],
    reward: {
      exp: 180,
      crystal: 90
    }
  }];
}

function formatTime(ms) {
  return ["\n" + (isNaN(ms) ? "--" : Math.floor(ms / 864e5)), " *Hari ☀️*\n", isNaN(ms) ? "--" : Math.floor(ms / 36e5) % 24, " *Jam 🕐*\n", isNaN(ms) ? "--" : Math.floor(ms / 6e4) % 60, " *Menit ⏰*\n", isNaN(ms) ? "--" : Math.floor(ms / 1e3) % 60, " *Detik ⏱️*"].map(v => v.toString().padStart(2, 0)).join("");
}

function getClue(jawaban) {
  return "```" + jawaban.replace(/[aiueoAIUEO]/g, "_") + "```";
}
async function handler(m, {
  conn,
  text
}) {
  conn.quest = conn.quest ? conn.quest : {};
  let user = db.data.users[m.sender];
  if (m.sender in conn.quest) return conn.quest[m.sender].currentQuestion >= conn.quest[m.sender].pertanyaan.length ? m.reply("🏆 Anda telah menyelesaikan semua questgame.") : m.reply("⏳ Anda masih memiliki questgame yang belum selesai. Silakan selesaikan terlebih dahulu.");
  if ("start" === text) {
    let quests = createQuests(),
      quest = quests[Math.floor(Math.random() * quests.length)];
    if (!user) return m.reply("📝 Silakan daftar untuk bermain game.");
    if (0 === user.health || 0 === user.stamina || 0 === user.mana) return m.reply("❗ Stamina/health/mana Anda kurang dari 100.");
    "number" != typeof user.exp && (db.data.users[m.sender].exp = 0), "number" != typeof user.crystal && (db.data.users[m.sender].crystal = 0), "number" != typeof user.lastGameTime && (db.data.users[m.sender].lastGameTime = 0);
    let timers = 3e5 - (Date.now() - (user.lastGameTime || 0));
    if (timers > 0) return m.reply(`Silakan tunggu ${formatTime(timers)} lagi sebelum memulai questgame baru.`);
    let {
      pertanyaan,
      jawaban,
      reward
    } = quest, currentQuestion = 0, jawabanBenar = 0;
    conn.quest[m.sender] = {
      pertanyaan: pertanyaan,
      jawaban: jawaban,
      reward: reward,
      currentQuestion: currentQuestion,
      jawabanBenar: jawabanBenar,
      lastQuestTime: Date.now()
    };
    let caption = `📜 *SEBUAH QUEST TELAH DIBERIKAN PADA ANDA!*\n\n*🎯 PERTANYAAN:* ${pertanyaan[currentQuestion]}\n\nJawab pertanyaan ini untuk melanjutkan ke pertanyaan berikutnya.`;
    return m.reply(caption);
  } {
    let instructions = "🏅 Selamat datang di game quest!\n";
    return instructions += "Ketik *'questgame start'* untuk memulai game.\n", instructions += "Ketik *'stop'* untuk menghentikan game saat sedang bermain.\n",
      instructions += "Ketik *'hint'* untuk mendapatkan petunjuk dari jawaban saat sedang bermain.",
      m.reply(instructions);
  }
}
handler.before = async m => {
  if (conn.quest = conn.quest ? conn.quest : {}, !(m.sender in conn.quest)) return;
  if (m.isBaileys) return;
  let {
    pertanyaan,
    jawaban,
    reward,
    currentQuestion,
    jawabanBenar
  } = conn.quest[m.sender];
  let user = db.data.users[m.sender],
    txt = m.text.toLowerCase();
  if ("stop" === txt) return m.reply("❌ Game quest telah dihentikan. Ketik *'questgame start'* untuk memulai game kembali."),
    delete conn.quest[m.sender], !1;
  if ("hint" === txt) {
    let clue = `🔍 Clue untuk soal ${currentQuestion + 1}: ${getClue(jawaban[currentQuestion])}`;
    return m.reply(clue), !1;
  }
  if (txt === jawaban[currentQuestion].toLowerCase()) {
    if (user.exp += reward.exp, user.crystal += reward.crystal, currentQuestion++, jawabanBenar++, conn.quest[m.sender].currentQuestion = currentQuestion, conn.quest[m.sender].jawabanBenar = jawabanBenar, currentQuestion >= pertanyaan.length) return m.reply(`🎉 Selamat! Anda telah menyelesaikan semua questgame.\nTotal jawaban benar: ${jawabanBenar}\nExp yang didapatkan: ${reward.exp}\nCrystal yang didapatkan: ${reward.crystal}`),
      delete conn.quest[m.sender], !1;
    {
      let caption = `📜 *SEBUAH QUEST TELAH DIBERIKAN PADA ANDA!*\n\n*🎯 PERTANYAAN:* ${pertanyaan[currentQuestion]}\n\nJawab pertanyaan ini untuk melanjutkan ke pertanyaan berikutnya.`;
      return m.reply(caption), !1;
    }
  }
}, handler.help = ["questgame"], handler.tags = ["rpg"], handler.command = /^(questgame)$/i;
export default handler;