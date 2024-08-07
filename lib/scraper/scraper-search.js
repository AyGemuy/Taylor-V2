import axios from "axios";
import fetch from "node-fetch";
import cheerio from "cheerio";
import {
  URL
} from "url";

function XPanas(search = "indonesia") {
  return new Promise(async (resolve, reject) => {
    try {
      const {
        data
      } = await axios.get("http://164.68.127.15/?id=" + search), $ = cheerio.load(data), ajg = [];
      if ($("#content > .mozaique.thumbs-5 > center > .thumb-block > .thumb-inside > .thumb > a").each((i, u) => {
          ajg.push({
            nonton: "https://164.68.127.15" + $(u).attr("href"),
            img: $(u).find("img").attr("data-src"),
            title: $(u).find("img").attr("title")
          });
        }), ajg.every(x => void 0 === x)) return resolve({
        developer: "@xorizn",
        mess: "no result found"
      });
      resolve(ajg);
    } catch (err) {
      console.error(err);
    }
  });
}

function WikiMedia(search) {
  return new Promise(async (resolve, reject) => {
    try {
      const {
        data
      } = await axios.get(`https://commons.wikimedia.org/w/index.php?search=${search}&title=Special:MediaSearch&go=Go&type=image`), $ = cheerio.load(data), hasil = [];
      if ($(".sdms-search-results__list-wrapper > div > a").each(function(a, b) {
          hasil.push({
            title: $(b).find("img").attr("alt"),
            source: $(b).attr("href"),
            image: $(b).find("img").attr("data-src") || $(b).find("img").attr("src")
          });
        }), hasil.every(x => void 0 === x)) return resolve({
        developer: "@xorizn",
        mess: "no result found"
      });
      resolve(hasil);
    } catch (err) {
      console.error(err);
    }
  });
}

function SoundCloudeS(search) {
  return new Promise(async (resolve, reject) => {
    try {
      const {
        data,
        status
      } = await axios.get(`https://soundcloud.com/search?q=${search}`), $ = cheerio.load(data), ajg = [];
      $("#app > noscript").each((u, i) => {
        ajg.push($(i).html());
      });
      const _$ = cheerio.load(ajg[1]),
        hasil = [];
      if (_$("ul > li > h2 > a").each((i, u) => {
          if (3 === $(u).attr("href").split("/").length) {
            const linkk = $(u).attr("href"),
              judul = $(u).text(),
              jdi = `https://soundcloud.com${linkk || "Tidak ditemukan"}`,
              jadu = judul || "Tidak ada judul";
            hasil.push({
              link: jdi,
              judul: jadu
            });
          }
        }), hasil.every(x => void 0 === x)) return {
        developer: "@xorizn",
        mess: "no result found"
      };
      resolve(hasil);
    } catch (err) {
      console.error(err);
    }
  });
}

function RingTone(search) {
  return new Promise(async (resolve, reject) => {
    try {
      const {
        data
      } = await axios.get("https://meloboom.com/en/search/" + search);
      let $ = cheerio.load(data),
        hasil = [];
      $("#__next > main > section > div.jsx-2244708474.container > div > div > div > div:nth-child(4) > div > div > div > ul > li").each(function(a, b) {
        hasil.push({
          title: $(b).find("h4").text(),
          source: "https://meloboom.com/" + $(b).find("a").attr("href"),
          audio: $(b).find("audio").attr("src")
        });
      }), resolve(hasil);
    } catch (err) {
      console.error(err);
    }
  });
}

function PlayStore(search) {
  return new Promise(async (resolve, reject) => {
    try {
      const {
        data,
        status
      } = await axios.get(`https://play.google.com/store/search?q=${search}&c=apps`), hasil = [], $ = cheerio.load(data);
      if ($(".ULeU3b > .VfPpkd-WsjYwc.VfPpkd-WsjYwc-OWXEXe-INsAgc.KC1dQ.Usd1Ac.AaN0Dd.Y8RQXd > .VfPpkd-aGsRMb > .VfPpkd-EScbFb-JIbuQc.TAQqTe > a").each((i, u) => {
          const linkk = $(u).attr("href"),
            nama = $(u).find(".j2FCNc > .cXFu1 > .ubGTjb > .DdYX5").text(),
            developer = $(u).find(".j2FCNc > .cXFu1 > .ubGTjb > .wMUdtb").text(),
            img = $(u).find(".j2FCNc > img").attr("src"),
            rate = $(u).find(".j2FCNc > .cXFu1 > .ubGTjb > div").attr("aria-label"),
            rate2 = $(u).find(".j2FCNc > .cXFu1 > .ubGTjb > div > span.w2kbF").text(),
            link = `https://play.google.com${linkk}`;
          hasil.push({
            link: link,
            nama: nama || "No name",
            developer: developer || "No Developer",
            img: img || "https://i.ibb.co/G7CrCwN/404.png",
            rate: rate || "No Rate",
            rate2: rate2 || "No Rate",
            link_dev: `https://play.google.com/store/apps/developer?id=${developer.split(" ").join("+")}`
          });
        }), hasil.every(x => void 0 === x)) return resolve({
        developer: "@xorizn",
        mess: "no result found"
      });
      resolve(hasil);
    } catch (err) {
      console.error(err);
    }
  });
}

function TixID() {
  return new Promise(async (resolve, reject) => {
    try {
      const {
        data
      } = await axios.get("https://www.tix.id/tix-now/"), $ = cheerio.load(data), hasil = [];
      $("div.gt-blog-list > .gt-item").each((i, u) => {
        hasil.push({
          link: $(u).find(".gt-image > a").attr("href"),
          image: $(u).find(".gt-image > a > img").attr("data-src"),
          judul: $(u).find(".gt-title > a").text(),
          tanggal: $(u).find(".gt-details > ul > .gt-date > span").text(),
          deskripsi: $(u).find(".gt-excerpt > p").text()
        });
      }), resolve(hasil);
    } catch (err) {
      console.error(err);
    }
  });
}

function BukaLapak(search) {
  return new Promise(async (resolve, reject) => {
    try {
      const {
        data
      } = await axios.get(`https://www.bukalapak.com/products?from=omnisearch&from_keyword_history=false&search[keywords]=${search}&search_source=omnisearch_keyword&source=navbar`, {
        headers: {
          "user-agent": "Mozilla/ 5.0(Windows NT 10.0; Win64; x64; rv: 108.0) Gecko / 20100101 Firefox / 108.0"
        }
      }), $ = cheerio.load(data), dat = [];
      $("a.slide > img").attr("src");
      if ($("div.bl-flex-item.mb-8").each((i, u) => {
          const a = $(u).find("observer-tracker > div > div"),
            img = $(a).find("div > a > img").attr("src");
          if (void 0 === img) return;
          const link = $(a).find(".bl-thumbnail--slider > div > a").attr("href"),
            title = $(a).find(".bl-product-card__description-name > p > a").text().trim(),
            harga = $(a).find("div.bl-product-card__description-price > p").text().trim(),
            rating = $(a).find("div.bl-product-card__description-rating > p").text().trim(),
            terjual = $(a).find("div.bl-product-card__description-rating-and-sold > p").text().trim(),
            res_ = {
              title: title,
              rating: rating || "No rating yet",
              terjual: terjual || "Not yet bought",
              harga: harga,
              image: img,
              link: link,
              store: {
                lokasi: $(a).find("div.bl-product-card__description-store > span:nth-child(1)").text().trim(),
                nama: $(a).find("div.bl-product-card__description-store > span > a").text().trim(),
                link: $(a).find("div.bl-product-card__description-store > span > a").attr("href")
              }
            };
          dat.push(res_);
        }), dat.every(x => void 0 === x)) return resolve({
        developer: "@xorizn",
        mess: "no result found"
      });
      resolve(dat);
    } catch (err) {
      console.error(err);
    }
  });
}

function AcaraNow() {
  return new Promise(async (resolve, reject) => {
    try {
      const {
        data
      } = await axios.get("https://www.jadwaltv.net/channel/acara-tv-nasional-saat-ini"), $ = cheerio.load(data);
      let tv = [];
      if ($("table.table.table-bordered > tbody > tr").each((u, i) => {
          let an = $(i).text().split("WIB");
          if ("JamAcara" !== an[0]) return void 0 === an[1] ? tv.push("\n*" + an[0] + "*") : void tv.push(`${an[0]} - ${an[1]}`);
        }), tv.every(x => void 0 === x)) return resolve({
        developer: "@xorizn",
        mess: "no result found"
      });
      resolve(tv);
    } catch (err) {
      console.error(err);
    }
  });
}

function Jadwal_Sepakbola() {
  return new Promise(async (resolve, reject) => {
    try {
      const {
        data
      } = await axios.get("https://www.jadwaltv.net/jadwal-sepakbola"), $ = cheerio.load(data);
      let tv = [];
      if ($("table.table.table-bordered > tbody > tr.jklIv").each((u, i) => {
          let an = $(i).html().replace(/<td>/g, "").replace(/<\/td>/g, " - ");
          tv.push(`${an.substring(0, an.length - 3)}`);
        }), tv.every(x => void 0 === x)) return resolve({
        developer: "@xorizn",
        mess: "no result found"
      });
      resolve(tv);
    } catch (err) {
      console.error(err);
    }
  });
}

function JadwalTV(query) {
  return new Promise(async (resolve, reject) => {
    try {
      const {
        data
      } = await axios.get("https://www.jadwaltv.net/channel/" + query), $ = cheerio.load(data), tv = [];
      if ($("table.table.table-bordered > tbody > tr.jklIv").each((u, i) => {
          let an = $(i).text().split("WIB");
          tv.push(`${an[0]} - ${an[1]}`);
        }), tv.every(x => void 0 === x)) return resolve({
        developer: "@xorizn",
        mess: "no result found"
      });
      resolve(tv.join("\n"));
    } catch (err) {
      console.error(err);
    }
  });
}

function Steam(search) {
  return new Promise(async (resolve, reject) => {
    try {
      const {
        data,
        status
      } = await axios.get("https://store.steampowered.com/search/?term=" + search), $ = cheerio.load(data), hasil = [];
      if ($("#search_resultsRows > a").each((a, b) => {
          const link = $(b).attr("href"),
            judul = $(b).find("div.responsive_search_name_combined > div.col.search_name.ellipsis > span").text(),
            harga = $(b).find("div.responsive_search_name_combined > div.col.search_price_discount_combined.responsive_secondrow > div.col.search_price.responsive_secondrow ").text().replace(/ /g, "").replace(/\n/g, "");
          var rating = $(b).find("div.responsive_search_name_combined > div.col.search_reviewscore.responsive_secondrow > span").attr("data-tooltip-html");
          const img = $(b).find("div.col.search_capsule > img").attr("src"),
            rilis = $(b).find("div.responsive_search_name_combined > div.col.search_released.responsive_secondrow").text();
          if (void 0 === rating) rating = "no ratings";
          if (rating.split("<br>")) {
            let hhh = rating.split("<br>");
            rating = `${hhh[0]} ${hhh[1]}`;
          }
          hasil.push({
            judul: judul,
            img: img,
            link: link,
            rilis: rilis,
            harga: harga || "no price",
            rating: rating
          });
        }), hasil.every(x => void 0 === x)) return resolve({
        developer: "@xorizn",
        mess: "no result found"
      });
      resolve(hasil);
    } catch (err) {
      console.error(err);
    }
  });
}

function Steam_Detail(url) {
  return new Promise(async (resolve, reject) => {
    try {
      const {
        data,
        status
      } = await axios.get(url), $ = cheerio.load(data), xorizn = [], img = $("#gameHeaderImageCtn > img").attr("src");
      $("div.game_area_sys_req.sysreq_content.active > div > ul > ul > li").each((u, i) => {
        xorizn.push($(i).text());
      });
      const hasil = $("#genresAndManufacturer").html().replace(/\n/g, "").replace(/<br>/g, "\n").replace(/\t/g, "").replace(/<b>/g, "").replace(/<\/div>/g, "\n").replace(/ /g, "").replace(/<\/b>/g, " ").replace(/<[^>]*>/g, ""),
        desc = $("div.game_description_snippet").text().replace(/\t/g, "").replace(/\n/g, "");
      resolve({
        desc: desc || "Error",
        img: img || "https://i.ibb.co/G7CrCwN/404.png",
        system: xorizn.join("\n") ? xorizn.join("\n") : "Error",
        info: hasil
      });
    } catch (err) {
      console.error(err);
    }
  });
}

function WattPad(judul) {
  return new Promise(async (resolve, reject) => {
    try {
      const {
        data
      } = await axios.get("https://www.wattpad.com/search/" + judul, {
        headers: {
          cookie: 'wp_id=d92aecaa-7822-4f56-b189-f8c4cc32825c; sn__time=j%3Anull; fs__exp=1; adMetrics=0; _pbkvid05_=0; _pbeb_=0; _nrta50_=0; lang=20; locale=id_ID; ff=1; dpr=1; tz=-8; te_session_id=1681636962513; _ga_FNDTZ0MZDQ=GS1.1.1681636962.1.1.1681637905.0.0.0; _ga=GA1.1.1642362362.1681636963; signupFrom=search; g_state={"i_p":1681644176441,"i_l":1}; RT=r=https%3A%2F%2Fwww.wattpad.com%2Fsearch%2Fanime&ul=1681637915624',
          "suer-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/111.0"
        }
      }), $ = cheerio.load(data), limk = "https://www.wattpad.com", _data = [];
      $(".story-card-container > ul.list-group.new-list-group > li.list-group-item").each(function(i, u) {
        let link = limk + $(u).find("a").attr("href"),
          judul = $(u).find("a > div > div.story-info > div.title").text().trim(),
          img = $(u).find("a > div > div.cover > img").attr("src"),
          desc = $(u).find("a > div > div.story-info > .description").text().replace(/\s+/g, " "),
          _doto = [];
        $(u).find("a > div > div.story-info > .new-story-stats > .stats-item").each((u, i) => {
          _doto.push($(i).find(".icon-container > .tool-tip > .sr-only").text());
        }), _data.push({
          title: judul,
          thumb: img,
          desc: desc,
          reads: _doto[0],
          vote: _doto[1],
          chapter: _doto[2],
          link: link
        });
      }), resolve(_data);
    } catch (err) {
      console.error(err);
    }
  });
}

function LinkWa(query) {
  return new Promise(async (resolve, reject) => {
    try {
      const {
        data
      } = await axios.get("http://ngarang.com/link-grup-wa/daftar-link-grup-wa.php?search=" + query + "&searchby=name"), $ = cheerio.load(data), _title = [], _link = [], result = [];
      $(".wa-chat-title > .wa-chat-title-text").each((u, i) => {
        $('span[style="display:none;"]').remove(), _title.push($(i).html().replace(/<\/?[^>]+(>|$)/g, ""));
      }), $(".wa-chat-message > a").each((u, i) => {
        _link.push($(i).text().trim());
      });
      for (let i = 0; i < _link.length; i++) result.push({
        title: _title[i],
        link: _link[i]
      });
      resolve(result);
    } catch (err) {
      console.error(err);
    }
  });
}

function Lirik2(judul) {
  return new Promise(async (resolve, reject) => {
    try {
      const {
        data
      } = await axios.get("https://www.musixmatch.com/search/" + judul), $ = cheerio.load(data), hasil = {}, link = "https://www.musixmatch.com" + $("div.media-card-body > div > h2").find("a").attr("href");
      await axios.get(link).then(({
        data
      }) => {
        const $$ = cheerio.load(data);
        hasil.thumb = "https:" + $$("div.col-sm-1.col-md-2.col-ml-3.col-lg-3.static-position > div > div > div").find("img").attr("src"),
          $$("div.col-sm-10.col-md-8.col-ml-6.col-lg-6 > div.mxm-lyrics").each(function(a, b) {
            hasil.lirik = $$(b).find("span > p > span").text() + "\n" + $$(b).find("span > div > p > span").text();
          });
      }), resolve(hasil);
    } catch (err) {
      console.error(err);
    }
  });
}

function KBBI(query) {
  return new Promise(async (resolve, reject) => {
    try {
      const {
        data
      } = await axios.get("https://kbbi.kemdikbud.go.id/entri/" + query), $ = cheerio.load(data);
      let _kata = [],
        _arti = [],
        _ol = [];
      $('h2[style="margin-bottom:3px"]').each((i, u) => {
        _kata.push($(u).text().trim());
      }), $("div.container.body-content").find("li").each((i, u) => {
        let hasil = $(u).html().replace(/<[^>]+>/g, " ").replace(/ {2,}/g, " ").trim();
        _arti.push(hasil);
      }), $("ol > li").each(function(i, u) {
        _ol.push($(u).html().replace(/<[^>]+>/g, " ").replace(/ {2,}/g, " ").trim());
      }), _arti.splice(_arti.length - 3, 3), 0 !== _ol.length ? resolve({
        lema: _kata[0],
        arti: _ol
      }) : resolve({
        lema: _kata[0],
        arti: _arti
      });
    } catch (err) {
      console.error(err);
    }
  });
}

function Nomina(query) {
  return new Promise(async (resolve, reject) => {
    try {
      const {
        data
      } = await axios.get("https://tesaurus.kemdikbud.go.id/tematis/lema/" + query + "/nomina"), $ = cheerio.load(data);
      let _arti = [];
      $(".search-result-area > .result-par > .contain > .result-set").each((i, u) => {
        _arti.push($(u).text().trim());
      }), resolve({
        lema: query,
        nomina: _arti,
        length: _arti.length
      });
    } catch (err) {
      console.error(err);
    }
  });
}

function KodePos(query) {
  return new Promise(async (resolve, reject) => {
    try {
      const {
        data
      } = await axios.get("https://nomorkodepos.com/?s=" + query), $ = cheerio.load(data);
      let _data = [];
      $("table.pure-table.pure-table-horizontal > tbody > tr").each((i, u) => {
        let _doto = [];
        $(u).find("td").each((l, p) => {
          _doto.push($(p).text().trim());
        }), _data.push({
          province: _doto[0],
          city: _doto[1],
          subdistrict: _doto[2],
          village: _doto[3],
          postalcode: _doto[4]
        });
      }), resolve(_data);
    } catch (err) {
      console.error(err);
    }
  });
}

function ListHero() {
  return new Promise(async (resolve, reject) => {
    try {
      const {
        data
      } = await axios.get("https://mobile-legends.fandom.com/wiki/List_of_heroes"), $ = cheerio.load(data);
      let _data = [];
      $("table.wikitable.sortable > tbody > tr").each((i, u) => {
        let hero_icon = $(u).find("td:nth-child(1) > center > a > img").attr("data-src");
        if (void 0 === hero_icon) return;
        let name = $(u).find("td:nth-child(2)").text().trim(),
          hero_code = $(u).find("td:nth-child(3)").text().trim(),
          role = $(u).find("td:nth-child(4)").text().trim(),
          specialties = $(u).find("td:nth-child(5)").text().trim(),
          laning = $(u).find("td:nth-child(6)").text().trim(),
          release = $(u).find("td:nth-child(7)").text().trim(),
          price = $(u).find("td:nth-child(8)").text().trim();
        _data.push({
          hero_icon: hero_icon,
          name: name,
          hero_code: hero_code,
          role: role,
          specialties: specialties,
          laning: laning,
          release: release,
          price: price
        });
      }), resolve(_data);
    } catch (err) {
      console.error(err);
    }
  });
}

function Hero(querry) {
  return new Promise(async (resolve, reject) => {
    try {
      let upper = querry.charAt(0).toUpperCase() + querry.slice(1).toLowerCase();
      const {
        data,
        status
      } = await axios.get("https://mobile-legends.fandom.com/wiki/" + upper);
      if (200 === status) {
        const $ = cheerio.load(data);
        let atributes = [],
          rill = [],
          rull = [],
          rell = [],
          hero_img = $("figure.pi-item.pi-image > a > img").attr("src"),
          desc = $("div.mw-parser-output > p:nth-child(6)").text();
        $(".mw-parser-output > table:nth-child(9) > tbody > tr").each((u, i) => {
          let _doto = [];
          $(i).find("td").each((o, p) => {
            _doto.push($(p).text().trim());
          }), 0 !== _doto.length && atributes.push({
            attribute: _doto[0],
            level_1: _doto[1],
            level_15: _doto[2],
            growth: _doto.pop()
          });
        }), $("div.pi-item.pi-data.pi-item-spacing.pi-border-color > div.pi-data-value.pi-font").each((i, u) => {
          rill.push($(u).text().trim());
        }), $("aside.portable-infobox.pi-background.pi-border-color.pi-theme-wikia.pi-layout-default").each((i, u) => {
          rull.push($(u).html());
        });
        const _$ = cheerio.load(rull[1]);
        _$(".pi-item.pi-data.pi-item-spacing.pi-border-color").each((l, m) => {
          rell.push(_$(m).text().trim().replace(/\n/g, ":").replace(/\t/g, ""));
        });
        const result = rell.reduce((acc, curr) => {
          const [key, value] = curr.split("::");
          return acc[key] = value, acc;
        }, {});
        resolve({
          hero_img: hero_img,
          desc: desc,
          release: rill[0],
          role: rill[1],
          specialty: rill[2],
          lane: rill[3],
          price: rill[4],
          gameplay_info: {
            durability: rill[5],
            offense: rill[6],
            control_effect: rill[7],
            difficulty: rill[8]
          },
          story_info_list: result,
          story_info_array: rell,
          attributes: atributes
        });
      } else 400 === status && resolve({
        mess: "hh"
      });
      console.log(status);
    } catch (err) {
      resolve({
        mess: "asu"
      });
    }
  });
}
const emojiGraph = async url => {
  try {
    const response = await fetch(url),
      html = await response.text(),
      $ = cheerio.load(html);
    return $(".emoji__title").get().map(element => {
      const elm = $(element);
      return {
        name: elm.find(".emoji").text(),
        link: elm.siblings(".emoji__copy").find(".emoji").text(),
        description: elm.siblings("p").text(),
        vendors: elm.siblings(".emoji__div__tablet").find(".block__emoji").get().map(vendorElement => {
          const em = $(vendorElement),
            vendorName = em.find("a").text(),
            vendorLink = em.find("a")?.attr("href"),
            vendorImage = em.find("img")?.attr("data-src");
          return {
            name: vendorName,
            link: vendorLink ? "https://emojigraph.org" + vendorLink : null,
            image: vendorImage ? "https://emojigraph.org" + vendorImage : null
          };
        })
      };
    });
  } catch (error) {
    throw console.error("Error in emojiGraph:", error), error;
  }
}, searchEmoji = async q => {
  try {
    const response = await fetch(`https://emojigraph.org/id/search/?q=${q}&searchLang=id`),
      html = await response.text(),
      $ = cheerio.load(html);
    return $("#search__first .s__first__ul a").map((index, element) => "https://emojigraph.org" + $(element)?.attr("href")).get();
  } catch (error) {
    throw console.error("Error in searchEmoji:", error), error;
  }
}, emojiPedia = async emoji => {
  try {
    const getSlug = await fetch(`https://emojipedia.org/${encodeURIComponent(emoji)}`, {
        redirect: "follow"
      }),
      outSlug = new URL(getSlug.url).pathname.startsWith("/") ? new URL(getSlug.url).pathname.substring(1) : new URL(getSlug.url).pathname,
      fragments = "\n      fragment vendorAndPlatformResource on VendorAndPlatform {\n        slug\n        title\n        description\n        items {\n          date\n          slug\n          title\n          image {\n            source\n            description\n            useOriginalImage\n          }\n        }\n      }\n\n      fragment shortCodeResource on Shortcode {\n        code\n        vendor {\n          slug\n          title\n        }\n      }\n\n      fragment emojiResource on Emoji {\n        id\n        title\n        code\n        slug\n        currentCldrName\n        codepointsHex\n        description\n        modifiers\n        appleName\n        alsoKnownAs\n        shortcodes {\n          ...shortCodeResource\n        }\n        proposals {\n          name\n          url\n        }\n      }\n\n      fragment emojiDetailsResource on Emoji {\n        ...emojiResource\n        type\n        socialImage {\n          source\n        }\n        emojiVersion {\n          name\n          date\n          slug\n          status\n        }\n        version {\n          name\n          slug\n          date\n          description\n          status\n        }\n        components {\n          ...emojiResource\n        }\n        goesGreatWith {\n          ... on Emoji {\n            title\n            slug\n            code\n            currentCldrName\n            description\n          }\n          ... on StaticContent {\n            title\n            slug\n            titleEmoji {\n              code\n              title\n              currentCldrName\n              description\n              slug\n            }\n          }\n        }\n        genderVariants {\n          slug\n          title\n          currentCldrName\n        }\n        skinTone\n        skinToneVariants {\n          slug\n          skinTone\n          code\n          title\n          currentCldrName\n        }\n        vendorsAndPlatforms {\n          ...vendorAndPlatformResource\n        }\n        alerts {\n          name\n          content\n          notes\n          link\n          representingEmoji {\n            code\n          }\n        }\n        alert {\n          content\n          link\n          representingEmoji {\n            code\n            slug\n          }\n        }\n        shortcodes {\n          code\n          source\n          vendor {\n            slug\n            title\n          }\n        }\n        shopInfo {\n          ... on ShopInfo {\n            url\n            image\n          }\n        }\n      }\n    ",
      query = "\n      query emojiV1($slug: Slug!, $lang: Language) {\n        emoji_v1(slug: $slug, lang: $lang) {\n          ...emojiDetailsResource\n        }\n      }\n    ",
      response = await fetch("https://emojipedia.org/api/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          query: fragments + query,
          variables: {
            slug: outSlug,
            lang: "EN"
          }
        })
      }),
      data = await response.json(),
      result = data?.data?.emoji_v1?.vendorsAndPlatforms;
    return result.map(v => ({
      name: v.title || v.slug || null,
      description: v.description || v.items?.[0]?.title || null,
      image: "https://em-content.zobj.net/" + v.items?.[0]?.image?.source || null
    })) ?? [];
  } catch (error) {
    return console.error("Error fetching data:", error), [];
  }
}, NotoEmoji = async query => {
  try {
    const key = Array.from(query)[0]?.codePointAt(0)?.toString(16),
      svg = false,
      noto_key = key.toLowerCase().replace(/^([^-]+)-fe0f\b/i, (_, v) => v).replace(/-fe0f$/i, "").replace(/-/g, "_");
    const codePoint = `https://fonts.gstatic.com/s/e/notoemoji/latest/${noto_key}/${svg ? "emoji.svg" : "512.png"}`;
    return codePoint || null;
  } catch (error) {
    return console.error("Error getting NotoEmoji:", error), null;
  }
}, EmojiGG = async query => {
  const q = query?.toLowerCase()?.trim()?.split(" ")?.join("_");
  try {
    const response = await fetch("https://emoji.gg/api/"),
      data = await response.json();
    return data.filter(s => s.title === q || s.title?.includes(q))?.length ? data.filter(s => s.title === q || s.title?.includes(q)) : null;
  } catch (error) {
    return console.error("Error getting EmojiGG:", error), null;
  }
}, emojiAll = async q => {
  try {
    const response = await fetch("https://www.emojiall.com/id/emoji/" + q);
    const html = await response.text();
    const $ = cheerio.load(html);
    return {
      emoji: $(".emoji_card_list.pages").eq(0).find(".emoji_font.line").first().text().trim() || null,
      description: $(".emoji_card_list.pages").eq(0).find(".emoji_card_content").first().text().trim() || null,
      vendors: $(".emoji_card_list.pages").eq(3).find("ul.row.no-gutters li").toArray().map(el => {
        const $el = $(el);
        const imgSrc = $el.find("img").attr("data-src");
        return {
          name: $el.find("figcaption").text().trim() || null,
          image: imgSrc ? "https://emojiall.com" + imgSrc.replace(/\/60\//, "/240/") : null
        };
      }).filter(item => item.name && item.image)
    };
  } catch (error) {
    console.error("Error in emojiGraph:", error);
    throw error;
  }
};
export {
  XPanas,
  WikiMedia,
  SoundCloudeS,
  RingTone,
  PlayStore,
  BukaLapak,
  TixID,
  AcaraNow,
  Jadwal_Sepakbola,
  JadwalTV,
  Steam,
  Steam_Detail,
  WattPad,
  LinkWa,
  Lirik2,
  KBBI,
  Nomina,
  KodePos,
  ListHero,
  Hero,
  emojiGraph,
  searchEmoji,
  emojiPedia,
  NotoEmoji,
  EmojiGG,
  emojiAll
};