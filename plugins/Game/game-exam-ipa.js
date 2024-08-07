const handler = async (m, {
  conn
}) => {
  let from = m.chat;
  if (conn.exam = conn.exam ? conn.exam : {}, from in conn.exam) return conn.sendMessage(m.chat, {
    text: "Silahkan selesaikan permainan terlebih dahulu"
  }, {
    quoted: conn.exam[from][0]
  }), !1;
  let list = [{
      soal: "Hewan yang mengalami metamorfosis sempurna adalah ….",
      jawaban: "Nyamuk dan lebah",
      a: "Nyamuk dan lebah",
      b: "Lebah dan belalang",
      c: "Jangkrik dan kecoa",
      tingkat: "Sekolah Dasar",
      type: "Text",
      link: ""
    }, {
      soal: "Perhatikan tabel berikut!\n\n1. Cumi-cumi > Memancarkan cahaya\n2. Trenggiling > Mengeluarkan bau menyengat\n3. Ikan Lele > Memiliki misai\n4. Burung Pelatuk > Paruh runcing dan melengkung\n\nPasangan nama hewan dan cara adaptasi yang benar ditunjukkan nomor ….",
      jawaban: "1 dan 3",
      a: "1 dan 4",
      b: "1 dan 3",
      c: "2 dan 3",
      tingkat: "Sekolah Dasar",
      type: "Text",
      link: ""
    }, {
      soal: "Perhatikan daftar berikut!\n\nI: Hyena\nII: Ular Kobra\nIII: Serigala\nIV: Tupai\n\nHewan yang memiliki bentuk adaptasi yang sama dengan berpura-pura mati ditunjukkan nomor …",
      jawaban: "1 dan 4",
      a: "1 dan 4",
      b: "1 dan 3",
      c: "2 dan 3",
      tingkat: "Sekolah Dasar",
      type: "Text",
      link: ""
    }, {
      soal: "Pelestarian gajah di Taman Nasional Way Kambas bertujuan untuk ….",
      jawaban: "Mempertahankan populasinya",
      a: "Menjaga habitat alami gajah",
      b: "Melestarikan flora",
      c: "Mempertahankan populasinya",
      tingkat: "Sekolah Dasar",
      type: "Text",
      link: ""
    }, {
      soal: "Curah hujan yang tinggi di wilayah perbukitan membuat lahan pertanian berkurang kesuburannya karena erosi. Cara yang dapat kita lakukan untuk mengatasi hal tersebut adalah ….",
      jawaban: "Membuat teras bertingkat",
      a: "Melakukan rotasi tanaman",
      b: "Membuat teras bertingkat",
      c: "Melakukan sistem tumpang sari",
      tingkat: "Sekolah Dasar",
      type: "Text",
      link: ""
    }, {
      soal: "Fungsi utama batang pada tumbuhan adalah untuk ….",
      jawaban: "Menopang berdirinya tanaman dan transportasi",
      a: "Fotosintesis dan perkembangbiakan generative",
      b: "Pernapasan dan menyerap unsur hara",
      c: "Menopang berdirinya tanaman dan transportasi",
      tingkat: "Sekolah Dasar",
      type: "Text",
      link: ""
    }, {
      soal: "Simbiosis mutualisme ditunjukkan oleh ….",
      jawaban: "Kerbau dengan burung jalak",
      a: "Kerbau dengan burung jalak",
      b: "Gulma dengan tanaman padi",
      c: "Tali putri dengan teh-tehan",
      tingkat: "Sekolah Dasar",
      type: "Text",
      link: ""
    }, {
      soal: "Petani mengalami gagal panen karena serangan hama wereng. Tahapan daur hidup wereng yang merugikan petani adalah ….",
      jawaban: "Dewasa",
      a: "Nimfa",
      b: "Dewasa",
      c: "Pupa",
      tingkat: "Sekolah Dasar",
      type: "Text",
      link: ""
    }, {
      soal: "Arah gerak sendi pada lutut adalah ….",
      jawaban: "Satu arah",
      a: "Satu arah",
      b: "Dua arah",
      c: "Segala arah",
      tingkat: "Sekolah Dasar",
      type: "Text",
      link: ""
    }, {
      soal: "Alat pernapasan hewan kelabang adalah ….",
      jawaban: "Trakea",
      a: "Paru-paru",
      b: "Stikma",
      c: "Trakea",
      tingkat: "Sekolah Dasar",
      type: "Text",
      link: ""
    }, {
      soal: "Bagian organ pernapasan yang berfungsi sebagai tempat pertukaran udara yang kaya oksigen dengan udara miskin oksigen adalah ....",
      jawaban: "Alveolus",
      a: "Alveolus",
      b: "Bronkiolus",
      c: "Tenggorokan",
      tingkat: "Sekolah Dasar",
      type: "Text",
      link: ""
    }, {
      soal: "Akibat yang ditimbulkan karena tersumbatnya pembuluh darah arteri oleh gumpalan lemak adalah ….",
      jawaban: "Meningkatnya tekanan darah",
      a: "Berkurangnya jumlah darah merah",
      b: "Meningkatnya tekanan darah",
      c: "Menurunnya tekanan darah",
      tingkat: "Sekolah Dasar",
      type: "Text",
      link: ""
    }, {
      soal: "Menu makanan seimbang yang dapat kita konsumsi untuk menjaga kesehatan adalah ….",
      jawaban: "Nasi, telur dadar, sup brokoli, jus jeruk, dan susu",
      a: "Jagung, telur mata sapi, oseng tahu, jus alpukat, dan susu",
      b: "Nasi goreng, sosis ayam, telur dadar, jus melon, dan susu",
      c: "Nasi, telur dadar, sup brokoli, jus jeruk, dan susu",
      tingkat: "Sekolah Dasar",
      type: "Text",
      link: ""
    }, {
      soal: "Meletusnya gunung berapi akan membuat beberapa wilayah disekitarnya tertutup debu vulkanik.\nUpaya yang dapat kita lakukan untuk menjaga kesehatan paru-paru ketika terjadi hujan abu vulkanik adalah …",
      jawaban: "Menggunakan kain basah sebagai masker",
      a: "Menggunakan kain basah sebagai masker",
      b: "Pintu dan jendela rumah dibuka agar udara berganti",
      c: "Memperbanyak minum air putih yang dingin",
      tingkat: "Sekolah Dasar",
      type: "Text",
      link: ""
    }, {
      soal: "Pasangan hewan dan cara perkembangbiakan yang tepat adalah ….",
      jawaban: "Anemon laut dengan tunas",
      a: "Cacing pita dengan fragmentasi",
      b: "Anemon laut dengan tunas",
      c: "Bintang laut dengan membelah diri",
      tingkat: "Sekolah Dasar",
      type: "Text",
      link: ""
    }, {
      soal: "Ciri-ciri fisik laki-laki pada masa pubertas adalah ….",
      jawaban: "Dada membidang, tumbuh jakun, dan suara membesar",
      a: "Tumbuh jakun, dada membidang, dan pinggul membesar",
      b: "Dada membidang, pinggul membesar, dan suara membesar",
      c: "Dada membidang, tumbuh jakun, dan suara membesar",
      tingkat: "Sekolah Dasar",
      type: "Text",
      link: ""
    }, {
      soal: "Sifat benda gas adalah ....",
      jawaban: "Bentuk sesuai wadahnya, mengisi seluruh ruang, dan menekan ke segala arah",
      a: "Bentuk sesuai wadahnya, mengisi seluruh ruang, dan menekan ke segala arah",
      b: "Menekan ke segala arah, mengisi seluruh ruang dan bentuk tetap",
      c: "Mengisi seluruh ruang, bentuk mengikuti wadahnya, dan keras",
      tingkat: "Sekolah Dasar",
      type: "Text",
      link: ""
    }, {
      soal: "Perhatikan daftar kegiatan dan perubahan wujud yang dihasilkan berikut ini!\n\nI: Es batu di ruang terbuka >> Membeku\nII: Membuat es lilin/es mambo >> Menyublim\nIII: Air dipanaskan hingga mendidih >> Menguap\nIV: Awan menjadi hujan >> Mengembun\n\nBerdasarkan tabel tersebut, pasangan yang tepat antara benda dan sifatnya, ditunjukkan oleh nomor ....",
      jawaban: "II dan III",
      a: "I dan II",
      b: "II dan III",
      c: "III dan IV",
      tingkat: "Sekolah Dasar",
      type: "Text",
      link: ""
    }, {
      soal: "LPG yang digunakan untuk memasak, memanfaatkan perubahan wujud ...",
      jawaban: "Menguap",
      a: "Mencair",
      b: "Menyublim",
      c: "Menguap",
      tingkat: "Sekolah Dasar",
      type: "Text",
      link: ""
    }, {
      soal: "Perhatikan daftar kegiatan dan perubahan wujud yang dihasilkan berikut ini!\n\nI: Es batu di ruang terbuka >> Membeku\nII: Membuat es lilin/es mambo >> Menyublim\nIII: Air dipanaskan hingga mendidih >> Menguap\nIV: Awan menjadi hujan >> Mengembun\n\nBerdasarkan tabel tersebut, pasangan yang tepat antara kegiatan dan perubahan wujud ditunjukkan oleh ....",
      jawaban: "III dan IV",
      a: "I dan II",
      b: "II dan III",
      c: "III dan IV",
      tingkat: "Sekolah Dasar",
      type: "Text",
      link: ""
    }, {
      soal: "Kegiatan yang menunjukkan gaya dapat mengubah bentuk benda adalah ....",
      jawaban: "Memotong kertas dengan cuter",
      a: "Menangkis bola yang ditendang",
      b: "Memotong kertas dengan cuter",
      c: "Mendorong mobil yang mogok",
      tingkat: "Sekolah Dasar",
      type: "Text",
      link: ""
    }, {
      soal: "Bentuk energi yang dihasilkan pada alat mixer ketika digunakan adalah ....",
      jawaban: "Energi gerak",
      a: "Energi gerak",
      b: "Energi kimia",
      c: "Energi listrik",
      tingkat: "Sekolah Dasar",
      type: "Text",
      link: ""
    }, {
      soal: "Perhatikan daftar berikut!\n\nI: Mesin cuci\nII: Blender\nIII: Setrika listrik\nIV: Bor Listrik\n\nAlat yang mempunyai bentuk perubahan energi yang sama pada gambar tersebut ditunjukkan oleh nomor ....",
      jawaban: "I dan II",
      a: "I dan II",
      b: "II dan III",
      c: "II dan IV",
      tingkat: "Sekolah Dasar",
      type: "Text",
      link: ""
    }, {
      soal: "Gambar benda atau kegiatan yang menunjukkan pemanfaatan energi alternatif berupa air adalah ....",
      jawaban: "Arum Jeram",
      a: "Panel Surya",
      b: "Arum Jeram",
      c: "Kincir Angin",
      tingkat: "Sekolah Dasar",
      type: "Text",
      link: ""
    }, {
      soal: "Perhatikan daftar berikut ini!\n(1) perunggu\n(2) plastik\n(3) timbal\n(4) stainless\n(5) ebonit\n(6) mutiara\n\nBenda yang termasuk konduktor panas ditunjukkan nomor ....",
      jawaban: "1, 3, dan 4",
      a: "2, 4, dan 6",
      b: "1, 2, dan 5",
      c: "1, 3, dan 4",
      tingkat: "Sekolah Dasar",
      type: "Text",
      link: ""
    }, {
      soal: "Kegiatan yang menunjukkan perpindahan panas secara radiasi adalah ....",
      jawaban: "Menetaskan telur dengan lampu",
      a: "Gerakan memutar air yang direbus",
      b: "Menetaskan telur dengan lampu",
      c: "Mentega meleleh di atas penggorengan",
      tingkat: "Sekolah Dasar",
      type: "Text",
      link: ""
    }, {
      soal: "Benda berikut yang dapat menyerap bunyi adalah ....",
      jawaban: "Kertas, goni, dan karpet",
      a: "Kertas, goni, dan karpet",
      b: "Karet, busa, dan besi",
      c: "Busa, wool, dan alumunium",
      tingkat: "Sekolah Dasar",
      type: "Text",
      link: ""
    }, {
      soal: "Perhatikan daftar berikut!\n1. Air\n2. Intan\n3. Nikel\n4. Kopra\n5. Tembaga\n6. Tumbuhan\n\nSumbar daya alam yang dapat diperbarui ditunjukkan oleh nomor ....",
      jawaban: "1, 4, dan 6",
      a: "1, 4, dan 6",
      b: "2, 3, dan 5",
      c: "2, 4, dan 6",
      tingkat: "Sekolah Dasar",
      type: "Text",
      link: ""
    }, {
      soal: "Proses penyesuaian makhluk hidup terhadap lingkungannya disebut …",
      jawaban: "Adaptasi",
      a: "Habitat",
      b: "Autotomi",
      c: "Adaptasi",
      tingkat: "Sekolah Dasar",
      type: "Text",
      link: ""
    }, {
      soal: "Yang bukan merupakan ciri khusus tanaman kaktus adalah …",
      jawaban: "Memiliki daun yang tipis dan lebar",
      a: "Memiliki daun yang tipis dan lebar",
      b: "Memiliki daun berbentuk duri",
      c: "Memiliki batang yang menggembung",
      tingkat: "Sekolah Dasar",
      type: "Text",
      link: ""
    }, {
      soal: "Unta memiliki kulit yang tebal, berfungsi untuk…",
      jawaban: "Melindungi dari panas matahari",
      a: "Melindungi dari panas matahari",
      b: "Agar nyaman ketika ditunggangi",
      c: "Mempersulit keluarnya keringat",
      tingkat: "Sekolah Dasar",
      type: "Text",
      link: ""
    }, {
      soal: "Di bawah ini hewan yang dapat melakukan adaptasi dengan mimikri adalah …",
      jawaban: "Bunglon",
      a: "Kadal",
      b: "Kelelawar",
      c: "Bunglon",
      tingkat: "Sekolah Dasar",
      type: "Text",
      link: ""
    }, {
      soal: "Burung pelatuk memiliki paruh yang keras yang berfungsi untuk …",
      jawaban: "Melubangi batang pohon",
      a: "Melubangi batang pohon",
      b: "Meredam hentakan",
      c: "Memotong berbagai dedaunan",
      tingkat: "Sekolah Dasar",
      type: "Text",
      link: ""
    }, {
      soal: "Cara yang dilakukan Kerbau untuk menghindari lingkungan yang panas adalah …",
      jawaban: "Berkubang di lumpurn",
      a: "Menggulung tubuhnya seperti bola",
      b: "Mengubah warna kulit",
      c: "Berkubang di lumpur",
      tingkat: "Sekolah Dasar",
      type: "Text",
      link: ""
    }, {
      soal: "Kuda Laut dapat bergerak turun naik ke dalam air karena memiliki …",
      jawaban: "Kantong renang",
      a: "Tubuh yang licin",
      b: "Kantong renang",
      c: "Kulit yang tebal",
      tingkat: "Sekolah Dasar",
      type: "Text",
      link: ""
    }, {
      soal: "Tumbuhan yang menyimpan cadangan makanan di akar yaitu ....",
      jawaban: "Singkong",
      a: "Tebu",
      b: "Padi",
      c: "Singkong",
      tingkat: "SMP",
      type: "Text",
      link: ""
    }, {
      soal: "Bagian paru-paru yang menjadi tempat terjadinya pertukaran O2 dan CO2 yaitu ...",
      jawaban: "Alveolus",
      a: "Trakea",
      b: "Alveolus",
      c: "Bronkiolus",
      tingkat: "SMP",
      type: "Text",
      link: ""
    }, {
      soal: "Makanan yang kita makan, secara berturut-turut melalui ....",
      jawaban: "mulut – kerongkongan – lambung – usus halus – usus besar – anus",
      a: "mulut – usus halus – usus besar – kerongkongan – lambung – anus",
      b: "mulut – kerongkongan – usus besar – usus halus – lambung – anus",
      c: "mulut – kerongkongan – lambung – usus halus – usus besar – anus",
      tingkat: "SMP",
      type: "Text",
      link: ""
    }, {
      soal: "Jika tubuh kita kekurangan kalsium bisa mengakibatkan ....",
      jawaban: "keropos tulang",
      a: "keropos tulang",
      b: "anemia",
      c: "sariawan",
      tingkat: "SMP",
      type: "Text",
      link: ""
    }, {
      soal: "Benda akan menimbulkan gaya gesek yang besar bila memiliki permukaan ....",
      jawaban: "kasar",
      a: "rata",
      b: "kasar",
      c: "halus",
      tingkat: "SMP",
      type: "Text",
      link: ""
    }, {
      soal: "Contoh penerapan konsep memperkecil gaya gesek terdapat pada ....",
      jawaban: "pemberian oli pada rantai sepeda",
      a: "pemberian oli pada rantai sepeda",
      b: "pembuatan alur pada ban kendaraan",
      c: "pemasangan karet kampas pada rem",
      tingkat: "SMP",
      type: "Text",
      link: ""
    }, {
      soal: "Melindungi diri dengan cara memutuskan ekornya dilakukan hewan ....",
      jawaban: "kadal dan cecak",
      a: "komodo dan buaya",
      b: "ular dan katak",
      c: "kadal dan cecak",
      tingkat: "SMP",
      type: "Text",
      link: ""
    }, {
      soal: "Tanaman pada kaktus di atas melindungi diri dari musuh dengan cara ....",
      jawaban: "tubuh ditutup duri",
      a: "mengeluarkan getah",
      b: "tubuh ditutup duri",
      c: "mengeluarkan bau menyengat",
      tingkat: "SMP",
      type: "Text",
      link: ""
    }, {
      soal: "Katun merupakan jenis kain yang terbuat dari ....",
      jawaban: "kapas",
      a: "kapas",
      b: "bulu domba",
      c: "rami",
      tingkat: "SMP",
      type: "Text",
      link: ""
    }, {
      soal: "Peristiwa yang menunjukkan perubahan sifat benda yang bersifat tetap yaitu ....",
      jawaban: "pencampuran dengan air",
      a: "pembakaran",
      b: "pemanasan",
      c: "pencampuran dengan air",
      tingkat: "SMP",
      type: "Text",
      link: ""
    }, {
      soal: "Di antara benda-benda berikut yang dapat ditarik magnet yaitu ....",
      jawaban: "peniti",
      a: "uang koin",
      b: "peniti",
      c: "kertas",
      tingkat: "SMP",
      type: "Text",
      link: ""
    }, {
      soal: "Bagian tubuh tumbuhan yang dapat melakukan proses fotosintesis yaitu ....",
      jawaban: "daun",
      a: "bunga",
      b: "akar",
      c: "daun",
      tingkat: "SMP",
      type: "Text",
      link: ""
    }, {
      soal: "Sifat magnet akan hilang apabila magnet ....",
      jawaban: "didinginkan",
      a: "dipukul",
      b: "didinginkan",
      c: "digosok",
      tingkat: "SMP",
      type: "Text",
      link: ""
    }, {
      soal: "Keadaan tanpa gravitasi mengakibatkan benda ....",
      jawaban: "melayang-layang di udara",
      a: "melayang-layang di udara",
      b: "akan jatuh bila dilepaskan dari ketinggian tertentu",
      c: "menempel di tanah",
      tingkat: "SMP",
      type: "Text",
      link: ""
    }, {
      soal: "Percabangan trakea disebut ....",
      jawaban: "bronkiolus",
      a: "bronkiolus",
      b: "alveolus",
      c: "bronkus",
      tingkat: "SMP",
      type: "Text",
      link: ""
    }, {
      soal: "Pada saat bernapas, kita mengeluarkan udara yang mengandung banyak ....",
      jawaban: "karbon dioksida",
      a: "zat makanan",
      b: "oksigen",
      c: "karbon dioksida",
      tingkat: "SMP",
      type: "Text",
      link: ""
    }, {
      soal: "Pembuatan alur pada sol sepatu dapat mencegah pemakainya terpeleset karena ....",
      jawaban: "gaya gesek besar",
      a: "gaya gravitasi bertambah",
      b: "gaya gesek besar",
      c: "gaya dorong berkurang",
      tingkat: "SMP",
      type: "Text",
      link: ""
    }, {
      soal: "Gaya yang bekerja pada ban sepeda yang sedang direm adalah ....",
      jawaban: "gesek",
      a: "gesek",
      b: "pegas",
      c: "gravitasi",
      tingkat: "SMP",
      type: "Text",
      link: ""
    }],
    json = list[Math.floor(Math.random() * list.length)];
  conn.exam[from] = [await conn.sendMessage(m.chat, {
    text: json.soal + "\nA. " + json.a + "\nB. " + json.b + "\nC. " + json.c + "\n\nWaktumu 1 menit untuk menjawab\nSoal tingkat " + json.tingkat
  }, {
    quoted: m
  }), json.jawaban, setTimeout(() => {
    conn.sendMessage(m.chat, {
      text: "Waktu habis"
    }, {
      quoted: conn.exam[from][0]
    }), delete conn.exam[from];
  }, 8e4), json.a, json.b, json.c];
};
handler.tags = ["game"], handler.command = /^examipa$/i, handler.help = ["examIpa"];
export default handler;