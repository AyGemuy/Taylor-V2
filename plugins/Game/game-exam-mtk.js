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
      soal: "Hasil dari -37 x (-78) x 25 adalah ....",
      jawaban: "72.150",
      a: "-72.150",
      b: "72.150",
      c: "72.140",
      tingkat: "Sekolah Dasar",
      type: "Text",
      link: ""
    }, {
      soal: "875 : (-25) : (-7) = n. n adalah ....",
      jawaban: "5",
      a: "5",
      b: "-5",
      c: "-25",
      tingkat: "Sekolah Dasar",
      type: "Text",
      link: ""
    }, {
      soal: "-173 – (-77) + 84 x (-75) : 25 = n. n adalah ....",
      jawaban: "341",
      a: "351",
      b: "-351",
      c: "341",
      tingkat: "Sekolah Dasar",
      type: "Text",
      link: ""
    }, {
      soal: "-183 + (-213) + 396 = n. n adalah ....",
      jawaban: "0",
      a: "0",
      b: "426",
      c: "366",
      tingkat: "Sekolah Dasar",
      type: "Text",
      link: ""
    }, {
      soal: "Bilangan yang terletak antara -25 dan -47 ....",
      jawaban: "-36",
      a: "-35",
      b: "-36",
      c: "-37",
      tingkat: "Sekolah Dasar",
      type: "Text",
      link: ""
    }, {
      soal: "Suhu udara di kota Amsterdam pada pukul 01.00 adalah -10°C. Namun pada pukul 08.00 berubah menjadi -6°C. Berapa °C perubahan yang terjadi di kota Amsterdam ?",
      jawaban: "4",
      a: "4",
      b: "-16",
      c: "16",
      tingkat: "Sekolah Dasar",
      type: "Text",
      link: ""
    }, {
      soal: "(20 – 15) – 5 .... 20 – (15 – 5)\nTanda yang tepat untuk melengkapi kalimat matematika di atas adalah ....",
      jawaban: "?",
      a: "=",
      b: "?",
      c: ">",
      tingkat: "Sekolah Dasar",
      type: "Text",
      link: ""
    }, {
      soal: "-20, -15, -10, -14, -17, -12\nUrutan yang sesuai bilangan-bilangan tersebut dari yang terbesar adalah ....",
      jawaban: "-10, -12, -14, -15, -17, -20",
      a: "-10, -12, -14, -17, -15, -20",
      b: "-10, -12, -14, -15, -17, -20",
      c: "-20, -17, -15, -14, -12, -10",
      tingkat: "Sekolah Dasar",
      type: "Text",
      link: ""
    }, {
      soal: "Bilangan bulat antara -12 dan -2 adalah ....",
      jawaban: "-11, -10, -9, -8,-7, -6, -5, -4, -3",
      a: "-11, -10, -9, -8,-7, -6, -5, -4, -3",
      b: "-12, -11. -10, -9, -8, -7, -6, -5, -4, -3, -2",
      c: "-13,- 12-, -11, -10, -9, -8, -7, -6, -5, -4, -3, -2, -1",
      tingkat: "Sekolah Dasar",
      type: "Text",
      link: ""
    }, {
      soal: "Yang merupakan bilangan negatif loncat 7 di bawah ini adalah...",
      jawaban: "-28, -21, -14, -7. ..",
      a: "-3, -10, -17, -24, ....",
      b: "-28, -21, -14, -7. ..",
      c: "0, -7, -14, -21, -28, ....",
      tingkat: "Sekolah Dasar",
      type: "Text",
      link: ""
    }, {
      soal: "Suhu udara di sebuah kota pada pukul 10.00 adalah -2°C. Karena musim dingin suhu di kota tersebut turun -1°C setiap 30 menit. Berapa suhu di kota tersebut pada pukul 01.00 ?",
      jawaban: "-8",
      a: "-6",
      b: "-7",
      c: "-8",
      tingkat: "Sekolah Dasar",
      type: "Text",
      link: ""
    }, {
      soal: "-11, -7, -4, -9, -5, -10. Urutan yang sesuai bilangan-bilangan tersebut dari yang terkecil adalah ....",
      jawaban: "-11, -10, -9, -7, -5, -4",
      a: "-11, -10, -9, -7, -5, -4",
      b: "-10, -11, -9, -7, -5, -4",
      c: "-9, -10, -11, -7, 05, -4",
      tingkat: "Sekolah Dasar",
      type: "Text",
      link: ""
    }, {
      soal: "Letak bilangan negarif pada garis bilangan adalah ....",
      jawaban: "Berada di sebelah kiri bilangan nol",
      a: "Berada di sebelah kanan atas bilangan nol",
      b: "Berada di sebelah kiri bilangan nol",
      c: "Berada di sebelah kanan bilangan satu",
      tingkat: "Sekolah Dasar",
      type: "Text",
      link: ""
    }, {
      soal: "Berikut ini merupakan bilangan bulat yang benar, adalah ....",
      jawaban: "1,2, 1,5, 2,7, 2,5, 3,5, 7,1, 8,5",
      a: "0,5, 1, 1,5, 2, 2,5, 3, 3,5",
      b: "1 , 2 , 1 , 2 , 2 , 3 , 3",
      c: "1,2, 1,5, 2,7, 2,5, 3,5, 7,1, 8,5",
      tingkat: "Sekolah Dasar",
      type: "Text",
      link: ""
    }, {
      soal: "Di bawah ini merupakan bilangan bulat negatif dengan pola loncat....",
      jawaban: "-1, -3, -5, -7, -9",
      a: "-1, -3, -5, -7, -9",
      b: "-1, -2, -3, -4, -5",
      c: "0, -2, -4, -6, -8",
      tingkat: "Sekolah Dasar",
      type: "Text",
      link: ""
    }, {
      soal: "Pernyataan bilangan bulat negatif yang benar adalah ....",
      jawaban: "-1, -3, -5, -7, -9",
      a: "-1, -3, -5, -7, -9",
      b: "-1, -2, -3, -4, -5",
      c: "0, -2, -4, -6, -8",
      tingkat: "Sekolah Dasar",
      type: "Text",
      link: ""
    }, {
      soal: "Tanda yang tepat untuk menyatakan hubungan -5 dengan -11 adalah....",
      jawaban: ">",
      a: "<",
      b: ">",
      c: "?",
      tingkat: "Sekolah Dasar",
      type: "Text",
      link: ""
    }, {
      soal: "Suhu di kota Seoul pada pukul 06.00 -8°C, sedangkan pada pukul 13.00 suhu di kota Seoul 2°C dan pada pukul 19.00 bersuhu -7°C. Berapa perubahan suhu keseluruhan yang terjadi di kota Seoul ?",
      jawaban: "1",
      a: "-2",
      b: "-1",
      c: "1",
      tingkat: "Sekolah Dasar",
      type: "Text",
      link: ""
    }, {
      soal: "-173 – (-87) + 84 x (-75) : 25 = n. n adalah ....",
      jawaban: "351",
      a: "351",
      b: "341",
      c: "-341",
      tingkat: "Sekolah Dasar",
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
handler.tags = ["game"], handler.command = /^exammtk$/i, handler.help = ["exammtk"];
export default handler;