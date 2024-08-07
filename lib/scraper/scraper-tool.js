import axios from "axios";
import cheerio from "cheerio";
import request from "request";
import crypto from "crypto";
async function sifat_usaha_bisnis(tgl, bln, thn) {
  return new Promise((resolve, reject) => {
    axios({
      url: "https://primbon.com/sifat_usaha_bisnis.php",
      method: "POST",
      headers: {
        "content-type": "application/x-www-form-urlencoded"
      },
      data: new URLSearchParams(Object.entries({
        tgl: tgl,
        bln: bln,
        thn: thn,
        submit: " Submit! "
      }))
    }).then(({
      data
    }) => {
      let hasil, fetchText = cheerio.load(data)("#body").text();
      try {
        hasil = {
          status: !0,
          message: {
            hari_lahir: fetchText.split("Hari Lahir Anda: ")[1].split(thn)[0],
            usaha: fetchText.split(thn)[1].split("< Hitung Kembali")[0],
            catatan: "Setiap manusia memiliki sifat atau karakter yang berbeda-beda dalam menjalankan bisnis atau usaha. Dengan memahami sifat bisnis kita, rekan kita, atau bahkan kompetitor kita, akan membantu kita memperbaiki diri atau untuk menjalin hubungan kerjasama yang lebih baik. Para ahli primbon di tanah Jawa sejak jaman dahulu telah merumuskan karakter atau sifat bisnis seseorang berdasarkan weton hari kelahirannya. Hasil perhitungannya bisa dijadikan referensi untuk memilih bidang usaha atau rekan bisnis yang cocok bagi kita."
          }
        };
      } catch {
        hasil = {
          status: !1,
          message: "Error, Mungkin Input Yang Anda Masukkan Salah"
        };
      }
      resolve(hasil);
    });
  });
}
async function rejeki_hoki_weton(tgl, bln, thn) {
  return new Promise((resolve, reject) => {
    axios({
      url: "https://primbon.com/rejeki_hoki_weton.php",
      method: "POST",
      headers: {
        "content-type": "application/x-www-form-urlencoded"
      },
      data: new URLSearchParams(Object.entries({
        tgl: tgl,
        bln: bln,
        thn: thn,
        submit: " Submit! "
      }))
    }).then(({
      data
    }) => {
      let hasil, fetchText = cheerio.load(data)("#body").text();
      try {
        hasil = {
          status: !0,
          message: {
            hari_lahir: fetchText.split("Hari Lahir: ")[1].split(thn)[0],
            rejeki: fetchText.split(thn)[1].split("< Hitung Kembali")[0],
            catatan: "Rejeki itu bukan lah tentang ramalan tetapi tentang usaha dan ikhtiar seseorang. From Admin"
          }
        };
      } catch {
        hasil = {
          status: !1,
          message: "Error, Mungkin Input Yang Anda Masukkan Salah"
        };
      }
      resolve(hasil);
    });
  });
}
async function tanggal_pernikahan(tgl, bln, thn) {
  return new Promise((resolve, reject) => {
    axios.get("https://primbon.com/tanggal_jadian_pernikahan.php?tgl=" + tgl + "&bln=" + bln + "&thn=" + thn + "&proses=+Submit%21+").then(({
      data
    }) => {
      let hasil, fetchText = cheerio.load(data)("#body").text();
      try {
        hasil = {
          status: !0,
          message: {
            tanggal: fetchText.split("Tanggal: ")[1].split("Karakteristik: ")[0],
            karakteristik: fetchText.split("Karakteristik: ")[1].split("< Hitung Kembali")[0],
            catatan: "Untuk melihat kecocokan jodoh dengan pasangan, dapat dikombinasikan dengan primbon Ramalan Jodoh (Jawa), Ramalan Jodoh (Bali), numerologi Kecocokan Cinta, tingkat keserasian Nama Pasangan, dan Ramalan Perjalanan Hidup Suami Istri."
          }
        };
      } catch {
        hasil = {
          status: !1,
          message: "Error, Mungkin Input Yang Anda Masukkan Salah"
        };
      }
      resolve(hasil);
    });
  });
}
async function kecocokan(nama1, nama2) {
  return new Promise((resolve, reject) => {
    axios.get("https://primbon.com/kecocokan_nama_pasangan.php?nama1=" + nama1 + "&nama2=" + nama2 + "&proses=+Submit%21+").then(({
      data
    }) => {
      let hasil, fetchText = cheerio.load(data)("#body").text();
      try {
        hasil = {
          status: !0,
          message: {
            nama_anda: nama1,
            nama_pasangan: nama2,
            sisi_positif: fetchText.split("Sisi Positif Anda: ")[1].split("Sisi Negatif Anda: ")[0],
            sisi_negatif: fetchText.split("Sisi Negatif Anda: ")[1].split("< Hitung Kembali")[0],
            gambar: "https://primbon.com/ramalan_kecocokan_cinta2.png",
            catatan: "Untuk melihat kecocokan jodoh dengan pasangan, dapat dikombinasikan dengan primbon Ramalan Jodoh (Jawa), Ramalan Jodoh (Bali), numerologi Kecocokan Cinta, Ramalan Perjalanan Hidup Suami Istri, dan makna dari Tanggal Jadian/Pernikahan."
          }
        };
      } catch {
        hasil = {
          status: !1,
          message: "Error, Mungkin Input Yang Anda Masukkan Salah"
        };
      }
      resolve(hasil);
    });
  });
}
async function tafsir_mimpi(value) {
  return new Promise((resolve, reject) => {
    axios.get("https://primbon.com/tafsir_mimpi.php?mimpi=" + value + "&submit=+Submit+").then(({
      data
    }) => {
      let hasil, fetchText = cheerio.load(data)("#body").text();
      try {
        hasil = {
          status: !0,
          message: {
            mimpi: value,
            arti: fetchText.split(`Hasil pencarian untuk kata kunci: ${value}`)[1].split("\n")[0],
            solusi: fetchText.split("Solusi -")[1].trim()
          }
        };
      } catch {
        hasil = {
          status: !1,
          message: `Tidak ditemukan tafsir mimpi "${value}" Cari dengan kata kunci yang lain.`
        };
      }
      resolve(hasil);
    });
  });
}
async function remini(url, apikey) {
  const content = (await conn.getFile(url)).data,
    md5Hash = crypto.createHash("md5").update(content).digest("base64"),
    client = axios.create({
      baseURL: "https://developer.remini.ai/api",
      headers: {
        Authorization: `Bearer ${apikey}`
      },
      timeout: 6e4
    }),
    submitTaskResponse = await client.post("/tasks", {
      tools: [{
        type: "face_enhance",
        mode: "beautify"
      }, {
        type: "background_enhance",
        mode: "base"
      }],
      image_md5: md5Hash,
      image_content_type: "image/jpeg"
    }),
    taskID = submitTaskResponse.data.task_id,
    uploadURL = submitTaskResponse.data.upload_url,
    uploadHeaders = submitTaskResponse.data.upload_headers;
  await axios.put(uploadURL, content, {
    headers: uploadHeaders
  }), await client.post(`/tasks/${taskID}/process`);
  for (let i = 0; i < 50; i++) {
    const getTaskResponse = await client.get(`/tasks/${taskID}`);
    if ("completed" === getTaskResponse.data.status) return getTaskResponse.data.result.output_url;
    if ("processing" !== getTaskResponse.data.status) return "Found illegal status: " + getTaskResponse.data.status;
    await new Promise(resolve => setTimeout(resolve, 2e3));
  }
}
async function nhentai(url) {
  try {
    const response = await axios.get(`https://nhentai.to/g/${url}`),
      $ = cheerio.load(response.data),
      Result = [],
      id = $("#gallery_id > span").text(),
      title = $("#info > h1").text(),
      alternative_title = $("#info > h2").text(),
      language = $("#tags > div:nth-child(5) > span > a > span.name").text(),
      Categories = $("#tags > div:nth-child(6) > span > a > span.name").text(),
      total_page = $("#tags > div:nth-child(7) > span > a > span").text(),
      upload = $("#tags > div:nth-child(8) > span > time").text();
    return $("#thumbnail-container > div").each((i, e) => {
      const Link = $(e).find("a > img").attr("data-src");
      Result.push(Link);
    }), {
      id: id + url,
      title: title,
      alternative_title: alternative_title,
      language: language,
      Categories: Categories,
      total_page: total_page,
      upload: upload,
      Link: Result
    };
  } catch (error) {
    return console.log(error), "ERROR";
  }
}
async function soundcloud(link) {
  return new Promise((resolve, reject) => {
    request({
      method: "POST",
      url: "https://www.klickaud.co/download.php",
      headers: {
        "content-type": "application/x-www-form-urlencoded"
      },
      formData: {
        value: link,
        "2311a6d881b099dc3820600739d52e64a1e6dcfe55097b5c7c649088c4e50c37": "710c08f2ba36bd969d1cbc68f59797421fcf90ca7cd398f78d67dfd8c3e554e3"
      }
    }, async function(error, response, body) {
      if (error) throw new Error(error);
      const $ = cheerio.load(body);
      resolve({
        judul: $("#header > div > div > div.col-lg-8 > div > table > tbody > tr > td:nth-child(2)").text(),
        download_count: $("#header > div > div > div.col-lg-8 > div > table > tbody > tr > td:nth-child(3)").text(),
        thumb: $("#header > div > div > div.col-lg-8 > div > table > tbody > tr > td:nth-child(1) > img").attr("src"),
        link: $("#dlMP3").attr("onclick").split("downloadFile('")[1].split("',")[0]
      });
    });
  });
}
async function stalkff(text) {
  var datap = {
    "voucherPricePoint.id": 8050,
    "voucherPricePoint.price": "",
    "voucherPricePoint.variablePrice": "",
    email: "",
    n: "",
    userVariablePrice: "",
    "order.data.profile": "",
    "user.userId": text,
    voucherTypeName: "FREEFIRE",
    affiliateTrackingId: "",
    impactClickId: "",
    checkoutId: "",
    tmwAccessToken: "",
    shopLang: "in_ID"
  };
  return {
    id: text,
    nickname: (await axios({
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      },
      method: "POST",
      url: "https://order.codashop.com/id/initPayment.action",
      data: datap
    })).data.confirmationFields.roles[0].role
  };
}
async function stalkml(id, zoneId) {
  return new Promise(async (resolve, reject) => {
    axios.post("https://api.duniagames.co.id/api/transaction/v1/top-up/inquiry/store", new URLSearchParams(Object.entries({
      productId: "1",
      itemId: "2",
      catalogId: "57",
      paymentId: "352",
      gameId: id,
      zoneId: zoneId,
      product_ref: "REG",
      product_ref_denom: "AE"
    })), {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Referer: "https://www.duniagames.co.id/",
        Accept: "application/json"
      }
    }).then(response => {
      resolve({
        status: 200,
        id: id,
        zoneId: zoneId,
        nickname: response.data.data.gameDetail.userName
      });
    }).catch(err => {
      resolve({
        status: 404,
        msg: "User Id or ZoneId Not Found"
      });
    });
  });
}
async function cerpen(category) {
  return new Promise((resolve, reject) => {
    let judul = category.toLowerCase().replace(/[()*]/g, "").replace(/\s/g, "-"),
      page = Math.floor(5 * Math.random());
    axios.get("http://cerpenmu.com/category/cerpen-" + judul + "/page/" + page).then(get => {
      let $ = cheerio.load(get.data),
        link = [];
      $("article.post").each(function(a, b) {
        link.push($(b).find("a").attr("href"));
      });
      let random = link[Math.floor(Math.random() * link.length)];
      axios.get(random).then(res => {
        let $$ = cheerio.load(res.data),
          hasil = {
            title: $$("#content > article > h1").text(),
            author: $$("#content > article").text().split("Cerpen Karangan: ")[1].split("Kategori: ")[0],
            kategori: $$("#content > article").text().split("Kategori: ")[1].split("\n")[0],
            lolos: $$("#content > article").text().split("Lolos moderasi pada: ")[1].split("\n")[0],
            cerita: $$("#content > article > p").text()
          };
        resolve(hasil);
      });
    });
  });
}
async function wiki(query) {
  const res = await axios.get(`https://id.m.wikipedia.org/wiki/${query}`),
    $ = cheerio.load(res.data),
    hasil = [];
  let wiki = $("#mf-section-0").find("p").text(),
    thumb = $('meta[property="og:image"]').attr("content");
  return hasil.push({
    wiki: wiki,
    thumb: thumb
  }), hasil;
}
async function cariresep(query) {
  return new Promise(async (resolve, reject) => {
    axios.get("https://resepkoki.id/?s=" + query).then(({
      data
    }) => {
      const $ = cheerio.load(data),
        link = [],
        judul = [],
        format = [];
      $("body > div.all-wrapper.with-animations > div:nth-child(5) > div > div.archive-posts.masonry-grid-w.per-row-2 > div.masonry-grid > div > article > div > div.archive-item-media > a").each(function(a, b) {
        link.push($(b).attr("href"));
      }), $("body > div.all-wrapper.with-animations > div:nth-child(5) > div > div.archive-posts.masonry-grid-w.per-row-2 > div.masonry-grid > div > article > div > div.archive-item-content > header > h3 > a").each(function(c, d) {
        let jud = $(d).text();
        judul.push(jud);
      });
      for (let i = 0; i < link.length; i++) format.push({
        judul: judul[i],
        link: link[i]
      });
      const result = {
        creator: "Fajar Ihsana",
        data: format.filter(v => v.link.startsWith("https://resepkoki.id/resep"))
      };
      resolve(result);
    }).catch(reject);
  });
}
async function detailresep(query) {
  return new Promise(async (resolve, reject) => {
    axios.get(query).then(({
      data
    }) => {
      const $ = cheerio.load(data),
        abahan = [],
        atakaran = [],
        atahap = [];
      $("body > div.all-wrapper.with-animations > div.single-panel.os-container > div.single-panel-details > div > div.single-recipe-ingredients-nutritions > div > table > tbody > tr > td:nth-child(2) > span.ingredient-name").each(function(a, b) {
        let bh = $(b).text();
        abahan.push(bh);
      }), $("body > div.all-wrapper.with-animations > div.single-panel.os-container > div.single-panel-details > div > div.single-recipe-ingredients-nutritions > div > table > tbody > tr > td:nth-child(2) > span.ingredient-amount").each(function(c, d) {
        let uk = $(d).text();
        atakaran.push(uk);
      }), $("body > div.all-wrapper.with-animations > div.single-panel.os-container > div.single-panel-main > div.single-content > div.single-steps > table > tbody > tr > td.single-step-description > div > p").each(function(e, f) {
        let th = $(f).text();
        atahap.push(th);
      });
      const judul = $("body > div.all-wrapper.with-animations > div.single-panel.os-container > div.single-title.title-hide-in-desktop > h1").text(),
        waktu = $("body > div.all-wrapper.with-animations > div.single-panel.os-container > div.single-panel-main > div.single-meta > ul > li.single-meta-cooking-time > span").text(),
        hasil = $("body > div.all-wrapper.with-animations > div.single-panel.os-container > div.single-panel-main > div.single-meta > ul > li.single-meta-serves > span").text().split(": ")[1],
        level = $("body > div.all-wrapper.with-animations > div.single-panel.os-container > div.single-panel-main > div.single-meta > ul > li.single-meta-difficulty > span").text().split(": ")[1],
        thumb = $("body > div.all-wrapper.with-animations > div.single-panel.os-container > div.single-panel-details > div > div.single-main-media > img").attr("src");
      let tbahan = "bahan\n";
      for (let i = 0; i < abahan.length; i++) tbahan += abahan[i] + " " + atakaran[i] + "\n";
      let ttahap = "tahap\n";
      for (let i = 0; i < atahap.length; i++) ttahap += atahap[i] + "\n\n";
      const tahap = ttahap,
        result = {
          creator: "Fajar Ihsana",
          data: {
            judul: judul,
            waktu_masak: waktu,
            hasil: hasil,
            tingkat_kesulitan: level,
            thumb: thumb,
            bahan: tbahan.split("bahan\n")[1],
            langkah_langkah: tahap.split("tahap\n")[1]
          }
        };
      resolve(result);
    }).catch(reject);
  });
}
async function ttslide(text) {
  const html = (await axios.get(`https://dlpanda.com/id?url=${text}&token=G7eRpMaa`)).data,
    $ = cheerio.load(html);
  let asd = [],
    imgSrc = [];
  $("div.col-md-12 > img").each((index, element) => {
    imgSrc.push($(element).attr("src"));
  }), asd.push({
    creator: "Jikarinka",
    imgSrc: imgSrc
  });
  imgSrc.map((e, i) => ({
    img: e,
    creator: "Jikarinka" [i]
  }));
  for (let i of asd) return i;
}
async function tiktok(URL) {
  return new Promise((resolve, rejecet) => {
    axios.get("https://musicaldown.com/id", {
      headers: {
        "user-agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36"
      }
    }).then(res => {
      const $ = cheerio.load(res.data),
        url_name = $("#link_url").attr("name"),
        token_name = $("#submit-form > div").find("div:nth-child(1) > input[type=hidden]:nth-child(2)").attr("name"),
        token_ = $("#submit-form > div").find("div:nth-child(1) > input[type=hidden]:nth-child(2)").attr("value"),
        verify = $("#submit-form > div").find("div:nth-child(1) > input[type=hidden]:nth-child(3)").attr("value");
      let data = {
        [`${url_name}`]: URL,
        [`${token_name}`]: token_,
        verify: verify
      };
      axios.request({
        url: "https://musicaldown.com/id/download",
        method: "post",
        data: new URLSearchParams(Object.entries(data)),
        headers: {
          "user-agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36",
          cookie: res.headers["set-cookie"]
        }
      }).then(respon => {
        const ch = cheerio.load(respon.data);
        axios.request({
          url: "https://musicaldown.com/id/mp3",
          method: "post",
          headers: {
            "user-agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36",
            cookie: res.headers["set-cookie"]
          }
        }).then(resaudio => {
          const hc = cheerio.load(resaudio.data),
            result = {
              pp: ch("body > div.welcome.section > div > div:nth-child(2) > div.col.s12.l4.center-align > div > div > img").attr("src"),
              username: ch("body > div.welcome.section > div > div:nth-child(2) > div.col.s12.l4.center-align > div > h2:nth-child(2)").text(),
              description: ch("body > div.welcome.section > div > div:nth-child(2) > div.col.s12.l4.center-align > div > h2:nth-child(3)").text(),
              video: ch("body > div.welcome.section > div > div:nth-child(2) > div.col.s12.l8 > a:nth-child(5)").attr("href"),
              audio: hc("body > div.welcome.section > div > div:nth-child(2) > div.col.s12.l8 > a:nth-child(6)").attr("href"),
              video_original: ch("body > div.welcome.section > div > div:nth-child(2) > div.col.s12.l8 > a:nth-child(9)").attr("href")
            };
          resolve(result);
        });
      });
    });
  });
}
async function artinama(value) {
  return new Promise((resolve, reject) => {
    axios.get("https://primbon.com/arti_nama.php?nama1=" + value + "&proses=+Submit%21+").then(({
      data
    }) => {
      let hasil, fetchText = cheerio.load(data)("#body").text();
      try {
        hasil = {
          status: !0,
          message: {
            nama: value,
            arti: fetchText.split("memiliki arti: ")[1].split("Nama:")[0]?.trim(),
            catatan: "Gunakan juga aplikasi numerologi Kecocokan Nama, untuk melihat sejauh mana keselarasan nama anda dengan diri anda."
          }
        };
      } catch {
        hasil = {
          status: !1,
          message: `Tidak ditemukan arti nama "${value}" Cari dengan kata kunci yang lain.`
        };
      }
      resolve(hasil);
    });
  });
}
export {
  artinama,
  tiktok,
  cariresep,
  detailresep,
  ttslide,
  wiki,
  cerpen,
  stalkff,
  stalkml,
  soundcloud,
  nhentai,
  remini,
  tafsir_mimpi,
  kecocokan,
  tanggal_pernikahan,
  rejeki_hoki_weton,
  sifat_usaha_bisnis
};