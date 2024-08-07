import cheerio from "cheerio";
import fetch from "node-fetch";
import axios from "axios";
import request from "request";
import fakeUa from "fake-useragent";
class Primbon {
  constructor({
    base_url: a
  } = {}) {
    this.base_url = a || "https://primbon.com/";
  }
  async nomer_hoki(a) {
    return new Promise((t, n) => {
      axios({
        url: this.base_url + "no_hoki_bagua_shuzi.php",
        method: "POST",
        headers: {
          "content-type": "application/x-www-form-urlencoded"
        },
        data: new URLSearchParams(Object.entries({
          nomer: a,
          submit: " Submit! "
        }))
      }).then(({
        data: a
      }) => {
        let n, i = cheerio.load(a)("#body").text().trim();
        try {
          n = {
            status: !0,
            message: {
              nomer_hp: i.split("No. HP : ")[1].split("\n")[0],
              angka_shuzi: i.split("Angka Bagua Shuzi : ")[1].split("\n")[0],
              energi_positif: {
                kekayaan: i.split("Kekayaan = ")[1].split("\n")[0],
                kesehatan: i.split("Kesehatan = ")[1].split("\n")[0],
                cinta: i.split("Cinta/Relasi = ")[1].split("\n")[0],
                kestabilan: i.split("Kestabilan = ")[1].split("\n")[0],
                persentase: i.split("%ENERGI NEGATIF")[0]?.split("% = ")[1] + "%"
              },
              energi_negatif: {
                perselisihan: i.split("Perselisihan = ")[1].split("\n")[0],
                kehilangan: i.split("Kehilangan = ")[1].split("\n")[0],
                malapetaka: i.split("Malapetaka = ")[1].split("\n")[0],
                kehancuran: i.split("Kehancuran = ")[1].split("\n")[0],
                persentase: i.split("Kehancuran = ")[1].split("= ")[1].split("\n")[0]
              },
              catatan: i.split("* ")[1].split("Masukkan Nomor HP Anda")[0]
            }
          };
        } catch {
          n = {
            status: !1,
            message: "ERROR! No. Handphone Tidak Valid!"
          };
        }
        t(n);
      });
    });
  }
  async tafsir_mimpi(a) {
    return new Promise((t, n) => {
      axios.get("https://primbon.com/tafsir_mimpi.php?mimpi=" + a + "&submit=+Submit+").then(({
        data: n
      }) => {
        let i, e = cheerio.load(n)("#body").text();
        try {
          i = {
            status: !0,
            message: {
              mimpi: a,
              arti: e.split(`Hasil pencarian untuk kata kunci: ${a}`)[1].split("\n")[0],
              solusi: e.split("Solusi -")[1].trim()
            }
          };
        } catch {
          i = {
            status: !1,
            message: `Tidak ditemukan tafsir mimpi "${a}" Cari dengan kata kunci yang lain.`
          };
        }
        t(i);
      });
    });
  }
  async ramalan_jodoh(a, t, n, i, e, s, r, l) {
    return new Promise((o, u) => {
      axios({
        url: this.base_url + "ramalan_jodoh.php",
        method: "POST",
        headers: {
          "content-type": "application/x-www-form-urlencoded"
        },
        data: new URLSearchParams(Object.entries({
          nama1: a,
          tgl1: t,
          bln1: n,
          thn1: i,
          nama2: e,
          tgl2: s,
          bln2: r,
          thn2: l,
          submit: "  RAMALAN JODOH »  "
        }))
      }).then(({
        data: t
      }) => {
        let n, i = cheerio.load(t)("#body").text();
        try {
          n = {
            status: !0,
            message: {
              nama_anda: {
                nama: a,
                tgl_lahir: i.split("Tgl. Lahir: ")[1].split(e)[0]
              },
              nama_pasangan: {
                nama: e,
                tgl_lahir: i.split(e)[1].split("Tgl. Lahir: ")[1].split("Dibawah")[0]
              },
              result: i.split("begitu pula sebaliknya.")[1].split("Konsultasi Hari Baik Akad Nikah >>>")[0].trim(),
              catatan: "Untuk melihat kecocokan jodoh dengan pasangan, dapat dikombinasikan dengan Ramalan Jodoh (Jawa), numerologi Kecocokan Cinta, tingkat keserasian Nama Pasangan, Ramalan Perjalanan Hidup Suami Istri, dan makna dari Tanggal Jadian/Pernikahan."
            }
          };
        } catch {
          n = {
            status: !1,
            message: "Error, Mungkin Input Yang Anda Masukkan Salah"
          };
        }
        o(n);
      });
    });
  }
  async ramalan_jodoh_bali(a, t, n, i, e, s, r, l) {
    return new Promise((o, u) => {
      axios({
        url: this.base_url + "ramalan_jodoh_bali.php",
        method: "POST",
        headers: {
          "content-type": "application/x-www-form-urlencoded"
        },
        data: new URLSearchParams(Object.entries({
          nama1: a,
          tgl1: t,
          bln1: n,
          thn1: i,
          nama2: e,
          tgl2: s,
          bln2: r,
          thn2: l,
          submit: " Submit! "
        }))
      }).then(({
        data: t
      }) => {
        let n, i = cheerio.load(t)("#body").text();
        try {
          n = {
            status: !0,
            message: {
              nama_anda: {
                nama: a,
                tgl_lahir: i.split("Hari Lahir: ")[1].split("Nama")[0]
              },
              nama_pasangan: {
                nama: e,
                tgl_lahir: i.split(e + "Hari Lahir: ")[1].split("HASILNYA MENURUT PAL SRI SEDANAI")[0]
              },
              result: i.split("HASILNYA MENURUT PAL SRI SEDANAI. ")[1].split("Konsultasi Hari Baik Akad Nikah >>>")[0],
              catatan: "Untuk melihat kecocokan jodoh dengan pasangan, dapat dikombinasikan dengan Ramalan Jodoh (Jawa), numerologi Kecocokan Cinta, tingkat keserasian Nama Pasangan, Ramalan Perjalanan Hidup Suami Istri, dan makna dari Tanggal Jadian/Pernikahan."
            }
          };
        } catch {
          n = {
            status: !1,
            message: "Error, Mungkin Input Yang Anda Masukkan Salah"
          };
        }
        o(n);
      });
    });
  }
  async suami_istri(a, t, n, i, e, s, r, l) {
    return new Promise((o, u) => {
      axios({
        url: this.base_url + "suami_istri.php",
        method: "POST",
        headers: {
          "content-type": "application/x-www-form-urlencoded"
        },
        data: new URLSearchParams(Object.entries({
          nama1: a,
          tgl1: t,
          bln1: n,
          thn1: i,
          nama2: e,
          tgl2: s,
          bln2: r,
          thn2: l,
          submit: " Submit! "
        }))
      }).then(({
        data: t
      }) => {
        let n, i = cheerio.load(t)("#body").text();
        try {
          n = {
            status: !0,
            message: {
              suami: {
                nama: a,
                tgl_lahir: i.split("Tgl. Lahir: ")[1].split(e)[0]
              },
              istri: {
                nama: e,
                tgl_lahir: i.split(e + "Tgl. Lahir: ")[1].split("HASIL RAMALAN MENURUT USIA PERNIKAHAN")[0]
              },
              result: i.split("HASIL RAMALAN MENURUT USIA PERNIKAHAN")[1].split("Konsultasi Hari Baik Akad Nikah >>>")[0],
              catatan: "Untuk melihat kecocokan jodoh dengan pasangan, dapat dikombinasikan dengan Ramalan Jodoh (Jawa), Ramalan Jodoh (Bali), numerologi Kecocokan Cinta, tingkat keserasian Nama Pasangan, dan makna dari Tanggal Jadian/Pernikahan."
            }
          };
        } catch {
          n = {
            status: !1,
            message: "Error, Mungkin Input Yang Anda Masukkan Salah"
          };
        }
        o(n);
      });
    });
  }
  async ramalan_cinta(a, t, n, i, e, s, r, l) {
    return new Promise((o, u) => {
      axios({
        url: this.base_url + "ramalan_cinta.php",
        method: "POST",
        headers: {
          "content-type": "application/x-www-form-urlencoded"
        },
        data: new URLSearchParams(Object.entries({
          nama1: a,
          tanggal1: t,
          bulan1: n,
          tahun1: i,
          nama2: e,
          tanggal2: s,
          bulan2: r,
          tahun2: l,
          submit: " Submit! "
        }))
      }).then(({
        data: t
      }) => {
        let n, i = cheerio.load(t)("#body").text();
        try {
          n = {
            status: !0,
            message: {
              nama_anda: {
                nama: a,
                tgl_lahir: i.split("Tgl. Lahir : ")[1].split(e)[0]
              },
              nama_pasangan: {
                nama: e,
                tgl_lahir: i.split(e + "Tgl. Lahir : ")[1].split("Sisi Positif")[0]
              },
              sisi_positif: i.split("Sisi Positif Anda: ")[1].split("Sisi Negatif Anda:")[0],
              sisi_negatif: i.split("Sisi Negatif Anda: ")[1].split("< Hitung Kembali")[0].trim(),
              catatan: "Untuk melihat kecocokan jodoh dengan pasangan, dapat dikombinasikan dengan primbon Ramalan Jodoh (Jawa), Ramalan Jodoh (Bali), tingkat keserasian Nama Pasangan, Ramalan Perjalanan Hidup Suami Istri, dan makna dari Tanggal Jadian/Pernikahan."
            }
          };
        } catch {
          n = {
            status: !1,
            message: "Error, Mungkin Input Yang Anda Masukkan Salah"
          };
        }
        o(n);
      });
    });
  }
  async arti_nama(a) {
    return new Promise((t, n) => {
      axios.get("https://primbon.com/arti_nama.php?nama1=" + a + "&proses=+Submit%21+").then(({
        data: n
      }) => {
        let i, e = cheerio.load(n)("#body").text();
        try {
          i = {
            status: !0,
            message: {
              nama: a,
              arti: e.split("memiliki arti: ")[1].split("Nama:")[0]?.trim(),
              catatan: "Gunakan juga aplikasi numerologi Kecocokan Nama, untuk melihat sejauh mana keselarasan nama anda dengan diri anda."
            }
          };
        } catch {
          i = {
            status: !1,
            message: `Tidak ditemukan arti nama "${a}" Cari dengan kata kunci yang lain.`
          };
        }
        t(i);
      });
    });
  }
  async kecocokan_nama(a, t, n, i) {
    return new Promise((e, s) => {
      axios({
        url: this.base_url + "kecocokan_nama.php",
        method: "POST",
        headers: {
          "content-type": "application/x-www-form-urlencoded"
        },
        data: new URLSearchParams(Object.entries({
          nama: a,
          tgl: t,
          bln: n,
          thn: i,
          kirim: " Submit! "
        }))
      }).then(({
        data: t
      }) => {
        let n, i = cheerio.load(t)("#body").text();
        try {
          n = {
            status: !0,
            message: {
              nama: a,
              tgl_lahir: i.split("Tgl. Lahir: ")[1].split("\n")[0],
              life_path: i.split("Life Path Number : ")[1].split("\n")[0],
              destiny: i.split("Destiny Number : ")[1].split("\n")[0],
              destiny_desire: i.split("Heart's Desire Number : ")[1].split("\n")[0],
              personality: i.split("Personality Number : ")[1].split("\n")[0],
              persentase_kecocokan: i.split("PERSENTASE KECOCOKAN")[1].split("< Hitung Kembali")[0].trim(),
              catatan: "Gunakan juga aplikasi numerologi Arti Nama, untuk melihat arti dan karakter dari nama anda."
            }
          };
        } catch {
          n = {
            status: !1,
            message: "Error, Mungkin Input Yang Anda Masukkan Salah"
          };
        }
        e(n);
      });
    });
  }
  async kecocokan_nama_pasangan(a, t) {
    return new Promise((n, i) => {
      axios.get("https://primbon.com/kecocokan_nama_pasangan.php?nama1=" + a + "&nama2=" + t + "&proses=+Submit%21+").then(({
        data: i
      }) => {
        let e, s = cheerio.load(i)("#body").text();
        try {
          e = {
            status: !0,
            message: {
              nama_anda: a,
              nama_pasangan: t,
              sisi_positif: s.split("Sisi Positif Anda: ")[1].split("Sisi Negatif Anda: ")[0],
              sisi_negatif: s.split("Sisi Negatif Anda: ")[1].split("< Hitung Kembali")[0],
              gambar: "https://primbon.com/ramalan_kecocokan_cinta2.png",
              catatan: "Untuk melihat kecocokan jodoh dengan pasangan, dapat dikombinasikan dengan primbon Ramalan Jodoh (Jawa), Ramalan Jodoh (Bali), numerologi Kecocokan Cinta, Ramalan Perjalanan Hidup Suami Istri, dan makna dari Tanggal Jadian/Pernikahan."
            }
          };
        } catch {
          e = {
            status: !1,
            message: "Error, Mungkin Input Yang Anda Masukkan Salah"
          };
        }
        n(e);
      });
    });
  }
  async tanggal_jadian_pernikahan(a, t, n) {
    return new Promise((i, e) => {
      axios.get("https://primbon.com/tanggal_jadian_pernikahan.php?tgl=" + a + "&bln=" + t + "&thn=" + n + "&proses=+Submit%21+").then(({
        data: a
      }) => {
        let t, n = cheerio.load(a)("#body").text();
        try {
          t = {
            status: !0,
            message: {
              tanggal: n.split("Tanggal: ")[1].split("Karakteristik: ")[0],
              karakteristik: n.split("Karakteristik: ")[1].split("< Hitung Kembali")[0],
              catatan: "Untuk melihat kecocokan jodoh dengan pasangan, dapat dikombinasikan dengan primbon Ramalan Jodoh (Jawa), Ramalan Jodoh (Bali), numerologi Kecocokan Cinta, tingkat keserasian Nama Pasangan, dan Ramalan Perjalanan Hidup Suami Istri."
            }
          };
        } catch {
          t = {
            status: !1,
            message: "Error, Mungkin Input Yang Anda Masukkan Salah"
          };
        }
        i(t);
      });
    });
  }
  async sifat_usaha_bisnis(a, t, n) {
    return new Promise((i, e) => {
      axios({
        url: this.base_url + "sifat_usaha_bisnis.php",
        method: "POST",
        headers: {
          "content-type": "application/x-www-form-urlencoded"
        },
        data: new URLSearchParams(Object.entries({
          tgl: a,
          bln: t,
          thn: n,
          submit: " Submit! "
        }))
      }).then(({
        data: a
      }) => {
        let t, e = cheerio.load(a)("#body").text();
        try {
          t = {
            status: !0,
            message: {
              hari_lahir: e.split("Hari Lahir Anda: ")[1].split(n)[0],
              usaha: e.split(n)[1].split("< Hitung Kembali")[0],
              catatan: "Setiap manusia memiliki sifat atau karakter yang berbeda-beda dalam menjalankan bisnis atau usaha. Dengan memahami sifat bisnis kita, rekan kita, atau bahkan kompetitor kita, akan membantu kita memperbaiki diri atau untuk menjalin hubungan kerjasama yang lebih baik. Para ahli primbon di tanah Jawa sejak jaman dahulu telah merumuskan karakter atau sifat bisnis seseorang berdasarkan weton hari kelahirannya. Hasil perhitungannya bisa dijadikan referensi untuk memilih bidang usaha atau rekan bisnis yang cocok bagi kita."
            }
          };
        } catch {
          t = {
            status: !1,
            message: "Error, Mungkin Input Yang Anda Masukkan Salah"
          };
        }
        i(t);
      });
    });
  }
  async rejeki_hoki_weton(a, t, n) {
    return new Promise((i, e) => {
      axios({
        url: this.base_url + "rejeki_hoki_weton.php",
        method: "POST",
        headers: {
          "content-type": "application/x-www-form-urlencoded"
        },
        data: new URLSearchParams(Object.entries({
          tgl: a,
          bln: t,
          thn: n,
          submit: " Submit! "
        }))
      }).then(({
        data: a
      }) => {
        let t, e = cheerio.load(a)("#body").text();
        try {
          t = {
            status: !0,
            message: {
              hari_lahir: e.split("Hari Lahir: ")[1].split(n)[0],
              rejeki: e.split(n)[1].split("< Hitung Kembali")[0],
              catatan: "Rejeki itu bukan lah tentang ramalan tetapi tentang usaha dan ikhtiar seseorang. From Admin"
            }
          };
        } catch {
          t = {
            status: !1,
            message: "Error, Mungkin Input Yang Anda Masukkan Salah"
          };
        }
        i(t);
      });
    });
  }
  async pekerjaan_weton_lahir(a, t, n) {
    return new Promise((i, e) => {
      axios({
        url: this.base_url + "pekerjaan_weton_lahir.php",
        method: "POST",
        headers: {
          "content-type": "application/x-www-form-urlencoded"
        },
        data: new URLSearchParams(Object.entries({
          tgl: a,
          bln: t,
          thn: n,
          submit: " Submit! "
        }))
      }).then(({
        data: a
      }) => {
        let t, e = cheerio.load(a)("#body").text();
        try {
          t = {
            status: !0,
            message: {
              hari_lahir: e.split("Hari Lahir: ")[1].split(n)[0],
              pekerjaan: e.split(n)[1].split("< Hitung Kembali")[0],
              catatan: "Setiap manusia membawa potensi bakat dan keberuntungannya sejak lahir, dengan mengetahui potensi tersebut dan menyesuaikannya dengan usaha atau pekerjaan yang dilakukan, diharapkan dapat mempermudah kita meraih kesuksesan. Para ahli primbon di tanah Jawa sejak jaman dahulu telah merumuskan jenis pekerjaan yang cocok berdasarkan weton kelahiran. Hasil perhitungannya bisa kita jadikan referensi untuk memilih pekerjaan atau bidang usaha yang cocok untuk kita."
            }
          };
        } catch {
          t = {
            status: !1,
            message: "Error, Mungkin Input Yang Anda Masukkan Salah"
          };
        }
        i(t);
      });
    });
  }
  async ramalan_nasib(a, t, n) {
    return new Promise((i, e) => {
      axios({
        url: this.base_url + "ramalan_nasib.php",
        method: "POST",
        headers: {
          "content-type": "application/x-www-form-urlencoded"
        },
        data: new URLSearchParams(Object.entries({
          tanggal: a,
          bulan: t,
          tahun: n,
          hitung: " Submit! "
        }))
      }).then(({
        data: a
      }) => {
        let t, n = cheerio.load(a)("#body").text();
        try {
          t = {
            status: !0,
            message: {
              analisa: n.split("RAMALAN NASIB (METODE PITAGORAS)")[1].split("Angka Akar ")[0].trim(),
              angka_akar: n.split("Angka Akar ")[1].split("Anda")[0],
              sifat: "Anda Adalah Orang yang" + n.split("Anda adalah orang yang")[1].split("Dalam numerologi Pitagoras,")[0],
              elemen: "Dalam numerologi Pitagoras" + n.split("Dalam numerologi Pitagoras")[1].split("Angka Kombinasi")[0].trim(),
              angka_keberuntungan: "Angka Kombinasi" + n.split("Angka Kombinasi")[1].split("Tgl. Lahir")[0]?.trim(),
              catatan: "Gunakan juga aplikasi ramalan dengan Kartu Tarot, Tarot Cinta, Kartu Lenormand , ramalan Peruntungan sepanjang tahun. Cari solusi atau nasehat dari masalah anda melalui hexagram I Ching."
            }
          };
        } catch {
          t = {
            status: !1,
            message: "Error, Mungkin Input Yang Anda Masukkan Salah"
          };
        }
        i(t);
      });
    });
  }
  async cek_potensi_penyakit(a, t, n) {
    return new Promise((i, e) => {
      axios({
        url: this.base_url + "cek_potensi_penyakit.php",
        method: "POST",
        headers: {
          "content-type": "application/x-www-form-urlencoded"
        },
        data: new URLSearchParams(Object.entries({
          tanggal: a,
          bulan: t,
          tahun: n,
          hitung: " Submit! "
        }))
      }).then(({
        data: a
      }) => {
        let t, n = cheerio.load(a)("#body").text();
        try {
          t = {
            status: !0,
            message: {
              analisa: n.split("CEK POTENSI PENYAKIT (METODE PITAGORAS)")[1].split("Sektor yg dianalisa:")[0].trim(),
              sektor: n.split("Sektor yg dianalisa:")[1].split("Anda tidak memiliki elemen")[0].trim(),
              elemen: "Anda tidak memiliki elemen " + n.split("Anda tidak memiliki elemen")[1].split("*")[0]?.trim(),
              catatan: "Potensi penyakit harus dipandang secara positif. Sakit pada daftar tidak berarti anda akan mengalami semuanya. Anda mungkin hanya akan mengalami 1 atau 2 macam penyakit. Pencegahan adalah yang terbaik, makanan yang sehat, olahraga teratur, istirahat yang cukup, hidup bahagia, adalah resep paling manjur untuk menghindari segala penyakit."
            }
          };
        } catch {
          t = {
            status: !1,
            message: "Error, Mungkin Input Yang Anda Masukkan Salah"
          };
        }
        i(t);
      });
    });
  }
  async arti_kartu_tarot(a, t, n) {
    return new Promise((i, e) => {
      axios({
        url: this.base_url + "arti_kartu_tarot.php",
        method: "POST",
        headers: {
          "content-type": "application/x-www-form-urlencoded"
        },
        data: new URLSearchParams(Object.entries({
          tgl: a,
          bln: t,
          thn: n,
          kirim: " Submit! "
        }))
      }).then(({
        data: a
      }) => {
        let t, n = cheerio.load(a),
          e = n("#body").text();
        try {
          t = {
            status: !0,
            message: {
              tgl_lahir: e.split("Tgl. Lahir ")[1].split(", memiliki")[0],
              simbol_tarot: e.split("memiliki simbol tarot:")[1].split("Kartu tarot")[0],
              image: "https://primbon.com/" + n("#body").find("img").attr("src"),
              arti: e.split("Kartu tarot")[1].split("< Hitung Kembali")[0],
              catatan: e.split("< Hitung Kembali")[1].trim()
            }
          };
        } catch {
          t = {
            status: !1,
            message: "Error, Mungkin Input Yang Anda Masukkan Salah"
          };
        }
        i(t);
      });
    });
  }
  async perhitungan_feng_shui(a, t, n) {
    return new Promise((i, e) => {
      axios({
        url: this.base_url + "perhitungan_feng_shui.php",
        method: "POST",
        headers: {
          "content-type": "application/x-www-form-urlencoded"
        },
        data: new URLSearchParams(Object.entries({
          nama: a,
          gender: t,
          tahun: n,
          submit: " Submit! "
        }))
      }).then(({
        data: a
      }) => {
        let t, n = cheerio.load(a)("#body").text();
        try {
          t = {
            status: !0,
            message: {
              nama: n.split("Nama: ")[1].split("Thn. Lahir: ")[0],
              tahun_lahir: n.split("Thn. Lahir: ")[1].split("Jns. Kelamin: ")[0],
              jenis_kelamin: n.split("Jns. Kelamin: ")[1].split("Angka Kua Anda: ")[0],
              angka_kua: n.split("Angka Kua Anda: ")[1].split("Anda termasuk kelompok")[0],
              kelompok: n.split("Anda termasuk kelompok")[1].split("Orang dalam kelompok ini mempunyai karakter:")[0],
              karakter: n.split("Orang dalam kelompok ini mempunyai karakter: ")[1].split("SEKTOR/ARAH BAIK")[0].trim(),
              sektor_baik: n.split("SEKTOR/ARAH BAIK")[1].split("SEKTOR/ARAH BURUK")[0],
              sektor_buruk: n.split("SEKTOR/ARAH BURUK")[1].split("< Hitung Kembali")[0]
            }
          };
        } catch {
          t = {
            status: !0,
            message: "Error, Mungkin Input Yang Anda Masukkan Salah"
          };
        }
        i(t);
      });
    });
  }
  async petung_hari_baik(a, t, n) {
    return new Promise((i, e) => {
      axios({
        url: this.base_url + "petung_hari_baik.php",
        method: "POST",
        headers: {
          "content-type": "application/x-www-form-urlencoded"
        },
        data: new URLSearchParams(Object.entries({
          tgl: a,
          bln: t,
          thn: n,
          submit: " Submit! "
        }))
      }).then(({
        data: a
      }) => {
        let t, n = cheerio.load(a)("#body").text();
        try {
          t = {
            status: !0,
            message: {
              tgl_lahir: n.split("Watak Hari Menurut Kamarokam")[1].split("Kala Tinantang:")[0],
              kala_tinantang: n.split("Kala Tinantang: ")[1].split("< Hitung Kembali")[0].trim(),
              info: "Dalam kitab Primbon dituliskan bahwa setiap hari memiliki karakter atau watak yang berbeda-beda. Dengan mengetahui watak hari tersebut, kita dapat menentukan kapan hari atau saat yang tepat untuk melaksanakan suatu hal atau kegiatan sehingga dapat tercapai tujuan yang kita harapkan. Salah satu cara untuk menentukan watak hari baik/buruk adalah berdasarkan Petung Kamarokam. Petung Kamarokam sebenarnya adalah perpaduan Petung Pancasuda Asli dengan Petung Pancasuda Pakuwon yang sudah disaring dan diringkas intisarinya.",
              catatan: "Untuk mencari hari baik berbagai keperluan, dapat dikombinasikan dengan primbon Hari Larangan dan primbon Hari Naas. Sedangkan untuk mencari hari baik Akad Nikah diperlukan perhitungan secara khusus, prosedurnya dapat dilihat disini."
            }
          };
        } catch {
          t = {
            status: !1,
            message: "Error, Mungkin Input Yang Anda Masukkan Salah"
          };
        }
        i(t);
      });
    });
  }
  async hari_sangar_taliwangke(a, t, n) {
    return new Promise((i, e) => {
      axios({
        url: this.base_url + "hari_sangar_taliwangke.php",
        method: "POST",
        headers: {
          "content-type": "application/x-www-form-urlencoded"
        },
        data: new URLSearchParams(Object.entries({
          tgl: a,
          bln: t,
          thn: n,
          kirim: " Submit! "
        }))
      }).then(({
        data: a
      }) => {
        let t, n = cheerio.load(a)("#body").text();
        try {
          t = {
            status: !0,
            message: {
              tgl_lahir: n.split("Primbon Hari Larangan (Tanggal Sangar, Bangas Padewan, Taliwangke)")[1].split("Termasuk hari BIASA")[0],
              result: "Termasuk hari BIASA" + n.split("Termasuk hari BIASA")[1].split("Untuk mengetahui watak hari, masukkan:")[0],
              info: n.split("*")[1].split("Catatan:")[0],
              catatan: "Untuk mencari hari baik berbagai keperluan, dapat dikombinasikan dengan primbon Hari Baik dan primbon Hari Naas. Sedangkan untuk mencari hari baik Akad Nikah diperlukan perhitungan secara khusus, prosedurnya dapat dilihat disini."
            }
          };
        } catch {
          t = {
            status: !1,
            message: "Error, Mungkin Input Yang Anda Masukkan Salah"
          };
        }
        i(t);
      });
    });
  }
  async primbon_hari_naas(a, t, n) {
    return new Promise((i, e) => {
      axios({
        url: this.base_url + "primbon_hari_naas.php",
        method: "POST",
        headers: {
          "content-type": "application/x-www-form-urlencoded"
        },
        data: new URLSearchParams(Object.entries({
          tgl: a,
          bln: t,
          thn: n,
          submit: " Submit! "
        }))
      }).then(({
        data: a
      }) => {
        let t, n = cheerio.load(a)("#body").text();
        try {
          t = {
            status: !0,
            message: {
              hari_lahir: n.split("Hari Lahir Anda: ")[1].split(",")[0],
              tgl_lahir: n.split("Tgl. ")[1].split("Hari Naas Anda:")[0],
              hari_naas: n.split("Hari Naas Anda: ")[1].split("Catatan:")[0],
              catatan: n.split("Catatan: ")[1].split("< Hitung Kembali")[0],
              info: 'Pada dasarnya setiap orang yang dilahirkan selalu membawa takdir positif dan takdir negatif. Takdir positif seperti misalnya sehat, sukses, rejeki, dll. Sedangkan takdir negatif seperti misalnya sakit, musibah, kematian, dll. Primbon Hari Naas itu sendiri adalah "Ilmu Titen" yang diwariskan oleh leluhur kita  dari tanah Jawa secara turun temurun, yang niteni atau mempelajari bahwa ternyata ada hubungan antara weton hari lahir dengan weton hari naas seseorang. Primbon Hari Naas ini tidak dimaksudkan untuk menakut-nakuti kita, tetapi lebih diharapkan supaya kita jadi lebih waspada akan adanya takdir negatif yang dapat menimpa kita. Pada hari itu, sebaiknya kita menghindari perjalanan jauh ataupun mengadakan acara-acara penting, serta memperbanyak doa dan sedekah.'
            }
          };
        } catch {
          t = {
            status: !1,
            message: "Error, Mungkin Input Yang Anda Masukkan Salah"
          };
        }
        i(t);
      });
    });
  }
  async rahasia_naga_hari(a, t, n) {
    return new Promise((i, e) => {
      axios({
        url: this.base_url + "rahasia_naga_hari.php",
        method: "POST",
        headers: {
          "content-type": "application/x-www-form-urlencoded"
        },
        data: new URLSearchParams(Object.entries({
          tgl: a,
          bln: t,
          thn: n,
          submit: " Submit! "
        }))
      }).then(({
        data: a
      }) => {
        let t, n = cheerio.load(a)("#body").text();
        try {
          t = {
            status: !0,
            message: {
              hari_lahir: n.split("RAHASIA NAGA HARI")[1].split(",")[0],
              tgl_lahir: n.split("Tgl. ")[1].split("Naga Hari berada di")[0],
              arah_naga_hari: n.split("Naga Hari berada di ")[1].split("< Hitung Kembali")[0],
              catatan: n.split("< Hitung Kembali")[1].trim()
            }
          };
        } catch {
          t = {
            status: !1,
            message: "Error, Mungkin Input Yang Anda Masukkan Salah"
          };
        }
        i(t);
      });
    });
  }
  async primbon_arah_rejeki(a, t, n) {
    return new Promise((i, e) => {
      axios({
        url: this.base_url + "primbon_arah_rejeki.php",
        method: "POST",
        headers: {
          "content-type": "application/x-www-form-urlencoded"
        },
        data: new URLSearchParams(Object.entries({
          tgl: a,
          bln: t,
          thn: n,
          submit: " Submit! "
        }))
      }).then(({
        data: a
      }) => {
        let t, n = cheerio.load(a)("#body").text();
        try {
          t = {
            status: !0,
            message: {
              hari_lahir: n.split("MENURUT PRIMBON GAYATRI:")[1].split(",")[0],
              tgl_lahir: n.split("Tgl. ")[1].split("Rejeki berada di ")[0],
              arah_rejeki: n.split("Rejeki berada di ")[1].split("< Hitung Kembali")[0],
              catatan: n.split("< Hitung Kembali")[1].trim()
            }
          };
        } catch {
          t = {
            status: !1,
            message: "Error, Mungkin Input Yang Anda Masukkan Salah"
          };
        }
        i(t);
      });
    });
  }
  async ramalan_peruntungan(a, t, n, i, e) {
    return new Promise((s, r) => {
      axios({
        url: this.base_url + "ramalan_peruntungan.php",
        method: "POST",
        headers: {
          "content-type": "application/x-www-form-urlencoded"
        },
        data: new URLSearchParams(Object.entries({
          nama1: a,
          tgl1: t,
          bln1: n,
          thn1: i,
          thn2: e,
          submit: " Submit! "
        }))
      }).then(({
        data: t
      }) => {
        let n, i = cheerio.load(t)("#body").text();
        try {
          n = {
            status: !0,
            message: {
              nama: a,
              tgl_lahir: i.split("Tgl. Lahir : ")[1].split("PERUNTUNGAN ANDA DI TAHUN")[0],
              peruntungan_tahun: e,
              result: i.split(`PERUNTUNGAN ANDA DI TAHUN ${e}`)[1].split("< Hitung Kembali")[0],
              catatan: i.split("Catatan: ")[1].trim()
            }
          };
        } catch {
          n = {
            status: !1,
            message: "Error, Mungkin Input Yang Anda Masukkan Salah"
          };
        }
        s(n);
      });
    });
  }
  async weton_jawa(a, t, n) {
    return new Promise((i, e) => {
      axios({
        url: this.base_url + "weton_jawa.php",
        method: "POST",
        headers: {
          "content-type": "application/x-www-form-urlencoded"
        },
        data: new URLSearchParams(Object.entries({
          tgl: a,
          bln: t,
          thn: n,
          submit: "  WETON JAWA »  "
        }))
      }).then(({
        data: a
      }) => {
        let t, n = cheerio.load(a)("#body").text();
        try {
          t = {
            status: !0,
            message: {
              tanggal: n.split("Tanggal: ")[1].split("Jumlah Neptu")[0],
              jumlah_neptu: n.split("Jumlah Neptu")[1].split("Watak Hari (Kamarokam)")[0],
              watak_hari: n.split("Watak Hari (Kamarokam)")[1].split("Naga Hari")[0],
              naga_hari: n.split(".Naga Hari")[1].split("Jam Baik (Saptawara & Pancawara)")[0],
              jam_baik: n.split("Jam Baik (Saptawara & Pancawara)")[1].split("Watak Kelahiran")[0],
              watak_kelahiran: n.split("Watak Kelahiran")[1].split("< Hitung Kembali")[0]
            }
          };
        } catch {
          t = {
            status: !1,
            message: "Error, Mungkin Input Yang Anda Masukkan Salah"
          };
        }
        i(t);
      });
    });
  }
  async sifat_karakter_tanggal_lahir(a, t, n, i) {
    return new Promise((e, s) => {
      axios({
        url: this.base_url + "sifat_karakter_tanggal_lahir.php",
        method: "POST",
        headers: {
          "content-type": "application/x-www-form-urlencoded"
        },
        data: new URLSearchParams(Object.entries({
          nama: a,
          tanggal: t,
          bulan: n,
          tahun: i,
          submit: " Submit! "
        }))
      }).then(({
        data: t
      }) => {
        let n, i = cheerio.load(t)("#body").text();
        try {
          n = {
            status: !0,
            message: {
              nama: a,
              tgl_lahir: i.split("Tgl. Lahir : ")[1].split("GARIS HIDUP")[0],
              garis_hidup: i.split("GARIS HIDUP")[1].split("< Hitung Kembali")[0]
            }
          };
        } catch {
          n = {
            status: !1,
            message: "Error, Mungkin Input Yang Anda Masukkan Salah"
          };
        }
        e(n);
      });
    });
  }
  async potensi_keberuntungan(a, t, n, i) {
    return new Promise((e, s) => {
      axios({
        url: this.base_url + "potensi_keberuntungan.php",
        method: "POST",
        headers: {
          "content-type": "application/x-www-form-urlencoded"
        },
        data: new URLSearchParams(Object.entries({
          nama: a,
          tanggal: t,
          bulan: n,
          tahun: i,
          submit: " Submit! "
        }))
      }).then(({
        data: t
      }) => {
        let n, i = cheerio.load(t)("#body").text();
        try {
          n = {
            status: !0,
            message: {
              nama: a,
              tgl_lahir: i.split("Tgl. Lahir : ")[1].split("Setiap orang")[0],
              result: "Setiap orang" + i.split("Setiap orang")[1].split("< Hitung Kembali")[0]
            }
          };
        } catch {
          n = {
            status: !1,
            message: "Error, Mungkin Input Yang Anda Masukkan Salah"
          };
        }
        e(n);
      });
    });
  }
  async primbon_memancing_ikan(a, t, n) {
    return new Promise((i, e) => {
      axios({
        url: this.base_url + "primbon_memancing_ikan.php",
        method: "POST",
        headers: {
          "content-type": "application/x-www-form-urlencoded"
        },
        data: new URLSearchParams(Object.entries({
          tgl: a,
          bln: t,
          thn: n,
          submit: " Submit! "
        }))
      }).then(({
        data: a
      }) => {
        let t, n = cheerio.load(a)("#body").text();
        try {
          t = {
            status: !0,
            message: {
              tgl_mancing: n.split("PRIMBON MEMANCING IKAN")[1].split("Maka hasilnya: ")[0].trim(),
              result: n.split("Maka hasilnya: ")[1].split("< Hitung Kembali")[0],
              catatan: n.split("< Hitung Kembali")[1].trim()
            }
          };
        } catch {
          t = {
            status: !1,
            message: "Error, Mungkin Input Yang Anda Masukkan Salah"
          };
        }
        i(t);
      });
    });
  }
  async masa_subur(a, t, n, i = "28") {
    return new Promise((e, s) => {
      axios({
        url: this.base_url + "masa_subur.php",
        method: "POST",
        headers: {
          "content-type": "application/x-www-form-urlencoded"
        },
        data: new URLSearchParams(Object.entries({
          dateday: a,
          datemonth: t,
          dateyear: n,
          days: i,
          calculator_ok: " Submit "
        }))
      }).then(({
        data: a
      }) => {
        let t, n = cheerio.load(a)("#body").text();
        try {
          t = {
            status: !0,
            message: {
              result: n.split("KALKULATOR MASA SUBUR")[1].split("Menentukan Ovulasi & Masa Subur")[0].trim(),
              catatan: "Menentukan Ovulasi & Masa Subur\n" + n.split("Menentukan Ovulasi & Masa Subur")[1].trim()
            }
          };
        } catch {
          t = {
            status: !1,
            message: "Error, Mungkin Input Yang Anda Masukkan Salah"
          };
        }
        e(t);
      });
    });
  }
  async zodiak(a) {
    return new Promise((t, n) => {
      axios.get(`https://primbon.com/zodiak/${a}.htm`).then(({
        data: a
      }) => {
        let n, i = cheerio.load(a)("#body").text();
        try {
          n = {
            status: !0,
            message: {
              zodiak: i.split("Nomor Keberuntungan:")[0]?.trim(),
              nomor_keberuntungan: i.split("Nomor Keberuntungan: ")[1].split("\n")[0],
              aroma_keberuntungan: i.split("Aroma Keberuntungan: ")[1].split("\n")[0],
              planet_yang_mengitari: i.split("Planet Yang Mengitari: ")[1].split("\n")[0],
              bunga_keberuntungan: i.split("Bunga Keberuntungan: ")[1].split("\n")[0],
              warna_keberuntungan: i.split("Warna Keberuntungan: ")[1].split("\n")[0],
              batu_keberuntungan: i.split("Batu Keberuntungan: ")[1].split("\n")[0],
              elemen_keberuntungan: i.split("Elemen Keberuntungan: ")[1].split("\n")[0],
              pasangan_zodiak: i.split("Pasangan Serasi: ")[1].split("\n")[0],
              catatan: i.split("\n\n\n\n\n\n\n\n\n\n\n")[1].split("<<< Kembali")[0].trim()
            }
          };
        } catch {
          n = {
            status: !1,
            message: "Error, Mungkin Input Yang Anda Masukkan Salah"
          };
        }
        t(n);
      });
    });
  }
  async shio(a) {
    return new Promise((t, n) => {
      axios.get(`https://primbon.com/shio/${a}.htm`).then(({
        data: a
      }) => {
        let n, i = cheerio.load(a)("#body").text();
        try {
          n = {
            status: !0,
            message: i.split("<<< Kembali")[0]?.trim()
          };
        } catch {
          n = {
            status: !1,
            message: "Error, Mungkin Input Yang Anda Masukkan Salah"
          };
        }
        t(n);
      });
    });
  }
}
export {
  Primbon
};