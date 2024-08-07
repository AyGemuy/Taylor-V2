import axios from "axios";
import FormData from "form-data";
import fetch from "node-fetch";
import {
  readFileSync
} from "fs";
const handler = async (m, {
  conn,
  args,
  text,
  usedPrefix,
  command
}) => {
  let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender,
    urut = (await conn.getName(who), flaaa.getRandom(), text.split("|")),
    one = urut[1],
    two = urut[2],
    template = (urut[3],
      (args[0] || "").toLowerCase());
  if (!args[0]) {
    let caption = `*Contoh Penggunaan*\n\n${usedPrefix + command} advanceglow\n${usedPrefix + command} ahegao\n${usedPrefix + command} alquran\n${usedPrefix + command} alquranaudio\n${usedPrefix + command} anal\n${usedPrefix + command} anime\n${usedPrefix + command} animearmpits\n${usedPrefix + command} animebellybutton\n${usedPrefix + command} animebooty\n${usedPrefix + command} animefeets\n${usedPrefix + command} animethighss\n${usedPrefix + command} arcade8bit\n${usedPrefix + command} art\n${usedPrefix + command} artinama\n${usedPrefix + command} asmaulhusna\n${usedPrefix + command} asupan\n${usedPrefix + command} avenger\n${usedPrefix + command} baka\n${usedPrefix + command} battlefield4\n${usedPrefix + command} beautifulflower\n${usedPrefix + command} biganimetiddies\n${usedPrefix + command} birthdaycake\n${usedPrefix + command} birthdayday\n${usedPrefix + command} bj\n${usedPrefix + command} blackpink\n${usedPrefix + command} bloodfrosted\n${usedPrefix + command} blowjob\n${usedPrefix + command} bokeh\n${usedPrefix + command} box3d\n${usedPrefix + command} brainly\n${usedPrefix + command} breakwall\n${usedPrefix + command} bts\n${usedPrefix + command} bucin\n${usedPrefix + command} burnpaper\n${usedPrefix + command} carvedwood\n${usedPrefix + command} ceritahoror\n${usedPrefix + command} cerpen\n${usedPrefix + command} character\n${usedPrefix + command} chiisaihentai\n${usedPrefix + command} chord\n${usedPrefix + command} classic\n${usedPrefix + command} cloud\n${usedPrefix + command} cnnindonesia\n${usedPrefix + command} cnninternasional\n${usedPrefix + command} cnnnasional\n${usedPrefix + command} coffe\n${usedPrefix + command} covidglobal\n${usedPrefix + command} covidindo\n${usedPrefix + command} cuaca\n${usedPrefix + command} cuddle\n${usedPrefix + command} cum\n${usedPrefix + command} cum_jpg\n${usedPrefix + command} cup\n${usedPrefix + command} cup1\n${usedPrefix + command} deluxesilver\n${usedPrefix + command} drakorongoing\n${usedPrefix + command} ecchi\n${usedPrefix + command} elf\n${usedPrefix + command} ero\n${usedPrefix + command} erofeet\n${usedPrefix + command} erok\n${usedPrefix + command} erokemo\n${usedPrefix + command} eron\n${usedPrefix + command} eroyuri\n${usedPrefix + command} exo\n${usedPrefix + command} faktaunik\n${usedPrefix + command} fallleaves\n${usedPrefix + command} fbdl\n${usedPrefix + command} feed\n${usedPrefix + command} feet\n${usedPrefix + command} feetg\n${usedPrefix + command} femdom\n${usedPrefix + command} fireworksparkle\n${usedPrefix + command} flamming\n${usedPrefix + command} fox_girl\n${usedPrefix + command} freefire\n${usedPrefix + command} futanari\n${usedPrefix + command} futureneon\n${usedPrefix + command} galaxybat\n${usedPrefix + command} galaxystyle\n${usedPrefix + command} galaxywallpaper\n${usedPrefix + command} gasm\n${usedPrefix + command} genshin\n${usedPrefix + command} gimage\n${usedPrefix + command} gimage2\n${usedPrefix + command} glitch\n${usedPrefix + command} glittergold\n${usedPrefix + command} glossychrome\n${usedPrefix + command} glowingneon\n${usedPrefix + command} golderrose\n${usedPrefix + command} goldplaybutton\n${usedPrefix + command} google\n${usedPrefix + command} greenbush\n${usedPrefix + command} greenneon\n${usedPrefix + command} halloween\n${usedPrefix + command} harrypotter\n${usedPrefix + command} heartshaped\n${usedPrefix + command} hentai\n${usedPrefix + command} hentai4everyone\n${usedPrefix + command} hentaifemdom\n${usedPrefix + command} hentaiparadise\n${usedPrefix + command} heroml\n${usedPrefix + command} hoax\n${usedPrefix + command} holo\n${usedPrefix + command} holoero\n${usedPrefix + command} hologram3d\n${usedPrefix + command} holographic\n${usedPrefix + command} hololewd\n${usedPrefix + command} horrorblood\n${usedPrefix + command} husbu\n${usedPrefix + command} icecold\n${usedPrefix + command} igdl\n${usedPrefix + command} igdl2\n${usedPrefix + command} indbeasiswa\n${usedPrefix + command} infogempa\n${usedPrefix + command} jadian\n${usedPrefix + command} jadwalbola\n${usedPrefix + command} jadwalsholat\n${usedPrefix + command} jadwaltv\n${usedPrefix + command} jadwaltvnow\n${usedPrefix + command} jarak\n${usedPrefix + command} jodoh\n${usedPrefix + command} jokerlogo\n${usedPrefix + command} jooxplay\n${usedPrefix + command} katabijak\n${usedPrefix + command} kbbi\n${usedPrefix + command} kemonomimi\n${usedPrefix + command} kisahnabi\n${usedPrefix + command} kiss\n${usedPrefix + command} kodepos\n${usedPrefix + command} konachan\n${usedPrefix + command} kuni\n${usedPrefix + command} kusonime\n${usedPrefix + command} kusonimesearch\n${usedPrefix + command} letterleaves\n${usedPrefix + command} lewd\n${usedPrefix + command} lewdanimegirls\n${usedPrefix + command} lewdk\n${usedPrefix + command} lewdkemo\n${usedPrefix + command} lighttext\n${usedPrefix + command} lionlogo\n${usedPrefix + command} lirik\n${usedPrefix + command} listsurah\n${usedPrefix + command} lk21\n${usedPrefix + command} loli\n${usedPrefix + command} love\n${usedPrefix + command} lovemessage\n${usedPrefix + command} luxury\n${usedPrefix + command} luxurygold\n${usedPrefix + command} manga\n${usedPrefix + command} marvelstudio\n${usedPrefix + command} megumin\n${usedPrefix + command} metaldark\n${usedPrefix + command} metallogo\n${usedPrefix + command} minion\n${usedPrefix + command} mlstalk\n${usedPrefix + command} multicolor3d\n${usedPrefix + command} nature3d\n${usedPrefix + command} natureleaves\n${usedPrefix + command} neko\n${usedPrefix + command} neon\n${usedPrefix + command} neonlight\n${usedPrefix + command} newsinfo\n${usedPrefix + command} newyearcard\n${usedPrefix + command} ninjalogo\n${usedPrefix + command} noeltext\n${usedPrefix + command} nsfw_avatar\n${usedPrefix + command} otakudesu\n${usedPrefix + command} otakudesusearch\n${usedPrefix + command} pantun\n${usedPrefix + command} pinterest\n${usedPrefix + command} pinterest2\n${usedPrefix + command} pinterestdl\n${usedPrefix + command} pixiv\n${usedPrefix + command} pixivdl\n${usedPrefix + command} playstore\n${usedPrefix + command} poke\n${usedPrefix + command} pornhub\n${usedPrefix + command} pubg\n${usedPrefix + command} puppycute\n${usedPrefix + command} pussy\n${usedPrefix + command} pussy_jpg\n${usedPrefix + command} quotes\n${usedPrefix + command} quotesanime\n${usedPrefix + command} quotesdilan\n${usedPrefix + command} quotesimage\n${usedPrefix + command} randomnama\n${usedPrefix + command} roadwarning\n${usedPrefix + command} romance\n${usedPrefix + command} royaltext\n${usedPrefix + command} sagiri\n${usedPrefix + command} sandengraved\n${usedPrefix + command} sandsummer\n${usedPrefix + command} sandwriting\n${usedPrefix + command} shadow\n${usedPrefix + command} shinobu\n${usedPrefix + command} shopee\n${usedPrefix + command} shortlink\n${usedPrefix + command} shota\n${usedPrefix + command} sideoppai\n${usedPrefix + command} silverplaybutton\n${usedPrefix + command} smoke\n${usedPrefix + command} smug\n${usedPrefix + command} snow3d\n${usedPrefix + command} solo\n${usedPrefix + command} solog\n${usedPrefix + command} space\n${usedPrefix + command} spotify\n${usedPrefix + command} spotifysearch\n${usedPrefix + command} ssweb\n${usedPrefix + command} ssweb2\n${usedPrefix + command} stalkgithub\n${usedPrefix + command} stalkig\n${usedPrefix + command} stalktiktok\n${usedPrefix + command} stalktwitter\n${usedPrefix + command} starsnight\n${usedPrefix + command} steel3d\n${usedPrefix + command} strawberry\n${usedPrefix + command} summer3d\n${usedPrefix + command} summernature\n${usedPrefix + command} summersand\n${usedPrefix + command} tebakumur\n${usedPrefix + command} telesticker\n${usedPrefix + command} text1917\n${usedPrefix + command} textbyname\n${usedPrefix + command} textcake\n${usedPrefix + command} thunder\n${usedPrefix + command} tiktok\n${usedPrefix + command} tiktokmusic\n${usedPrefix + command} tiktoknowm\n${usedPrefix + command} tits\n${usedPrefix + command} toxic\n${usedPrefix + command} translate\n${usedPrefix + command} trap\n${usedPrefix + command} twtdl\n${usedPrefix + command} undergrass\n${usedPrefix + command} underwater\n${usedPrefix + command} urbandictionary\n${usedPrefix + command} waifu\n${usedPrefix + command} wallgravity\n${usedPrefix + command} wallnime\n${usedPrefix + command} wallpaper\n${usedPrefix + command} wallpapersearch\n${usedPrefix + command} wallpapersearch2\n${usedPrefix + command} wancak\n${usedPrefix + command} watercolor\n${usedPrefix + command} wattpad\n${usedPrefix + command} wattpadsearch\n${usedPrefix + command} wetglass\n${usedPrefix + command} weton\n${usedPrefix + command} wikipedia\n${usedPrefix + command} wolflogo\n${usedPrefix + command} wolfmetal\n${usedPrefix + command} wooden3d\n${usedPrefix + command} woodenboard\n${usedPrefix + command} woodheart\n${usedPrefix + command} writegalacy\n${usedPrefix + command} yaoi\n${usedPrefix + command} ytmp3\n${usedPrefix + command} ytmp4\n${usedPrefix + command} ytplay\n${usedPrefix + command} ytsearch\n${usedPrefix + command} yuri\n${usedPrefix + command} zippyshare`;
    await conn.reply(m.chat, caption, m);
  }
  try {
    if (command) switch (template) {
      case "listsurah":
        axios.get(`https://api.lolhuman.xyz/api/quran?apikey=${Object.entries(APIKeys).find(([ key ]) => key.includes("lolhuman"))?.[1]}`).then(async ({
          data
        }) => {
          var teks = "List Surah:\n";
          for (var x in data.result) teks += `${x}. ${data.result[x]}\n`;
          await conn.reply(m.chat, teks, m);
        }).catch(console.error);
        break;
      case "alquran":
        if (!one) return m.reply(`Example: ${usedPrefix + command} ${template} |18 or ${usedPrefix + command} ${template} |18/10 or ${usedPrefix + command} ${template} |18/1-10`);
        axios.get(`https://api.lolhuman.xyz/api/quran/${one}?apikey=${Object.entries(APIKeys).find(([ key ]) => key.includes("lolhuman"))?.[1]}`).then(async ({
          data
        }) => {
          var ayat = data.result.ayat,
            teks = `QS. ${data.result.surah} : 1-${ayat.length}\n\n`;
          for (var x of ayat) teks += `${x.arab}\n${x.ayat}. ${x.latin}\n${x.indonesia}\n\n`;
          teks = (teks = teks.replace(/<u>/g, "_").replace(/<\/u>/g, "_")).replace(/<strong>/g, "*").replace(/<\/strong>/g, "*"),
            await conn.reply(m.chat, teks, m);
        }).catch(console.error);
        break;
      case "alquranaudio":
        if (!one) return m.reply(`Example: ${usedPrefix + command} ${template} |18 or ${usedPrefix + command} ${template} |18/10`);
        conn.sendMessage(m.chat, {
          audio: {
            url: `https://api.lolhuman.xyz/api/quran/audio/${one}?apikey=${Object.entries(APIKeys).find(([ key ]) => key.includes("lolhuman"))?.[1]}`
          },
          mimetype: "audio/mp4"
        });
        break;
      case "asmaulhusna":
        axios.get(`https://api.lolhuman.xyz/api/asmaulhusna?apikey=${Object.entries(APIKeys).find(([ key ]) => key.includes("lolhuman"))?.[1]}`).then(async ({
          data
        }) => {
          var teks = `No : ${data.result.index}\n`;
          teks += `Latin: ${data.result.latin}\n`, teks += `Arab : ${data.result.ar}\n`, teks += `Indonesia : ${data.result.id}\n`,
            teks += `English : ${data.result.en}`, await conn.reply(m.chat, teks, m);
        }).catch(console.error);
        break;
      case "kisahnabi":
        if (!one) return m.reply(`Example: ${usedPrefix + command} ${template} |Muhammad`);
        axios.get(`https://api.lolhuman.xyz/api/kisahnabi/${one}?apikey=${Object.entries(APIKeys).find(([ key ]) => key.includes("lolhuman"))?.[1]}`).then(async ({
          data
        }) => {
          var teks = `Name : ${data.result.name}\n`;
          teks += `Lahir : ${data.result.thn_kelahiran}\n`, teks += `Umur : ${data.result.age}\n`,
            teks += `Tempat : ${data.result.place}\n`, teks += `Story : \n${data.result.story}`,
            await conn.reply(m.chat, teks, m);
        }).catch(console.error);
        break;
      case "jadwalsholat":
        if (!one) return m.reply(`Example: ${usedPrefix + command} ${template} |Yogyakarta`);
        axios.get(`https://api.lolhuman.xyz/api/sholat/${one}?apikey=${Object.entries(APIKeys).find(([ key ]) => key.includes("lolhuman"))?.[1]}`).then(async ({
          data
        }) => {
          var teks = `Wilayah : ${data.result.wilayah}\n`;
          teks += `Tanggal : ${data.result.tanggal}\n`, teks += `Sahur : ${data.result.sahur}\n`,
            teks += `Imsak : ${data.result.imsak}\n`, teks += `Subuh : ${data.result.subuh}\n`,
            teks += `Terbit : ${data.result.terbit}\n`, teks += `Dhuha : ${data.result.dhuha}\n`,
            teks += `Dzuhur : ${data.result.dzuhur}\n`, teks += `Ashar : ${data.result.ashar}\n`,
            teks += `Maghrib : ${data.result.imsak}\n`, teks += `Isya : ${data.result.isya}`,
            await conn.reply(m.chat, teks, m);
        }).catch(console.error);
        break;
      case "ytplay":
        if (!one) return await m.reply(`Example: ${usedPrefix + command} ${template} |melukis senja`);
        axios.get(`https://api.lolhuman.xyz/api/ytsearch?apikey=${Object.entries(APIKeys).find(([ key ]) => key.includes("lolhuman"))?.[1]}&query=${one}`).then(async ({
          data
        }) => {
          axios.get(`https://api.lolhuman.xyz/api/ytaudio2?apikey=${Object.entries(APIKeys).find(([ key ]) => key.includes("lolhuman"))?.[1]}&url=https://www.youtube.com/watch?v=${data.result[0]?.videoId}`).then(async ({
            data
          }) => {
            var caption = `❖ Title    : *${data.result.title}*\n`;
            caption += `❖ Size     : *${data.result.size}*`, conn.sendMessage(m.chat, {
              image: {
                url: data.result.thumbnail
              },
              caption: caption
            }).then(() => {
              conn.sendMessage(m.chat, {
                audio: {
                  url: data.result.link
                },
                mimetype: "audio/mp4",
                fileName: `${data.result.title}.mp3`,
                ptt: !0
              });
            });
          });
        }).catch(console.error);
        break;
      case "ytsearch":
        if (!one) return m.reply(`Example: ${usedPrefix + command} ${template} |Melukis Senja`);
        axios.get(`https://api.lolhuman.xyz/api/ytsearch?apikey=${Object.entries(APIKeys).find(([ key ]) => key.includes("lolhuman"))?.[1]}&query=${one}`).then(async ({
          data
        }) => {
          var teks = "";
          for (var x of data.result) teks += `Title : ${x.title}\n`, teks += `Views : ${x.views}\n`,
            teks += `Published : ${x.published}\n`, teks += `Thumbnail : ${x.thumbnail}\n`,
            teks += `Link : https://www.youtube.com/watch?v=${x.videoId}\n\n`;
          await conn.reply(m.chat, teks, m);
        }).catch(console.error);
        break;
      case "ytmp3":
        if (!one) return m.reply(`Example: ${usedPrefix + command} ${template} |https://www.youtube.com/watch?v=qZIQAk-BUEc`);
        axios.get(`https://api.lolhuman.xyz/api/ytaudio2?apikey=${Object.entries(APIKeys).find(([ key ]) => key.includes("lolhuman"))?.[1]}&url=${one}`).then(async ({
          data
        }) => {
          var caption = `❖ Title    : *${data.result.title}*\n`;
          caption += `❖ Size     : *${data.result.size}*`, conn.sendMessage(m.chat, {
            image: {
              url: data.result.thumbnail
            },
            caption: caption
          }).then(() => {
            conn.sendMessage(m.chat, {
              audio: {
                url: data.result.link
              },
              mimetype: "audio/mp4",
              fileName: `${data.result.title}.mp3`,
              ptt: !0
            });
          });
        }).catch(console.error);
        break;
      case "ytmp4":
        if (!one) return m.reply(`Example: ${usedPrefix + command} ${template} |https://www.youtube.com/watch?v=qZIQAk-BUEc`);
        axios.get(`https://api.lolhuman.xyz/api/ytmp4?apikey=${Object.entries(APIKeys).find(([ key ]) => key.includes("lolhuman"))?.[1]}&url=${one}`).then(async ({
          data
        }) => {
          var caption = `❖ Title    : *${data.result.title}*\n`;
          caption += `❖ Size     : *${data.result.size}*`, conn.sendMessage(m.chat, {
            image: {
              url: data.result.thumbnail
            },
            caption: caption
          }).then(() => {
            conn.sendMessage(m.chat, {
              audio: {
                url: data.result.link
              },
              mimetype: "video/mp4",
              fileName: `${data.result.title}.mp4`
            });
          });
        }).catch(console.error);
        break;
      case "telesticker":
        if (!one) return m.reply(`Example: ${usedPrefix + command} ${template} |https://t.me/addstickers/LINE_Menhera_chan_ENG`);
        axios.get(`https://api.lolhuman.xyz/api/telestick?apikey=${Object.entries(APIKeys).find(([ key ]) => key.includes("lolhuman"))?.[1]}&url=${one}`).then(async ({
          data
        }) => {
          conn.sendMessage(m.chat, {
            sticker: {
              url: data.result.sticker.getRandom()
            }
          });
        });
        break;
      case "tiktoknowm":
        if (!one) return m.reply(`Example: ${usedPrefix + command} ${template} |https://vt.tiktok.com/ZSwWCk5o/`);
        axios.get(`https://api.lolhuman.xyz/api/tiktok?apikey=${Object.entries(APIKeys).find(([ key ]) => key.includes("lolhuman"))?.[1]}&url=${one}`).then(async ({
          data
        }) => {
          conn.sendMessage(m.chat, {
            video: {
              url: data.result.link
            },
            mimetype: "video/mp4"
          });
        });
        break;
      case "tiktokmusic":
        if (!one) return m.reply(`Example: ${usedPrefix + command} ${template} |https://vt.tiktok.com/ZSwWCk5o/`);
        conn.sendMessage(m.chat, {
          audio: {
            url: `https://api.lolhuman.xyz/api/tiktokmusic?apikey=${Object.entries(APIKeys).find(([ key ]) => key.includes("lolhuman"))?.[1]}&url=${one}`
          },
          mimetype: "audio/mp4",
          fileName: `${data.result.title}.mp3`,
          ptt: !0
        });
        break;
      case "spotify":
        if (!one) return m.reply(`Example: ${usedPrefix + command} ${template} |https://open.spotify.com/track/0ZEYRVISCaqz5yamWZWzaA`);
        axios.get(`https://api.lolhuman.xyz/api/spotify?apikey=${Object.entries(APIKeys).find(([ key ]) => key.includes("lolhuman"))?.[1]}&url=${one}`).then(async ({
          data
        }) => {
          var caption = `Title : ${data.result.title}\n`;
          caption += `Artists : ${data.result.artists}\n`, caption += `Duration : ${data.result.duration}\n`,
            caption += `Popularity : ${data.result.popularity}\n`, caption += `Preview : ${data.result.preview_url}\n`,
            conn.sendMessage(m.chat, {
              image: {
                url: data.result.thumbnail
              },
              caption: caption
            }).then(() => {
              conn.sendMessage(m.chat, {
                audio: {
                  url: data.result.link
                },
                mimetype: "audio/mp4",
                fileName: `${data.result.title}.mp3`,
                ptt: !0
              });
            });
        });
        break;
      case "spotifysearch":
        if (!one) return m.reply(`Example: ${usedPrefix + command} ${template} |Melukis Senja`);
        axios.get(`https://api.lolhuman.xyz/api/spotifysearch?apikey=${Object.entries(APIKeys).find(([ key ]) => key.includes("lolhuman"))?.[1]}&query=${one}`).then(async ({
          data
        }) => {
          var teks = "";
          for (var x of data.result) teks += `Title : ${x.title}\n`, teks += `Artists : ${x.artists}\n`,
            teks += `Duration : ${x.duration}\n`, teks += `Link : ${x.link}\n`, teks += `Preview : ${x.preview_url}\n\n\n`;
          await conn.reply(m.chat, teks, m);
        });
        break;
      case "jooxplay":
        if (!one) return m.reply(`Example: ${usedPrefix + command} ${template} |Melukis Senja`);
        axios.get(`https://api.lolhuman.xyz/api/jooxplay?apikey=${Object.entries(APIKeys).find(([ key ]) => key.includes("lolhuman"))?.[1]}&query=${one}`).then(async ({
          data
        }) => {
          var caption = `Title : ${data.result.info.song}\n`;
          caption += `Artists : ${data.result.info.singer}\n`, caption += `Duration : ${data.result.info.duration}\n`,
            caption += `Album : ${data.result.info.album}\n`, caption += `Uploaded : ${data.result.info.date}\n`,
            caption += `Lirik :\n ${data.result.lirik}\n`, conn.sendMessage(m.chat, {
              image: {
                url: data.result.image
              },
              caption: caption
            }).then(() => {
              conn.sendMessage(m.chat, {
                audio: {
                  url: data.result.audio[0]?.link
                },
                mimetype: "audio/mp4",
                fileName: `${data.result.title}.mp3`,
                ptt: !0
              });
            });
        });
        break;
      case "igdl":
        if (!one) return m.reply(`Example: ${usedPrefix + command} ${template} |https://www.instagram.com/p/CJ8XKFmJ4al/?igshid=1acpcqo44kgkn`);
        axios.get(`https://api.lolhuman.xyz/api/instagram?apikey=${Object.entries(APIKeys).find(([ key ]) => key.includes("lolhuman"))?.[1]}&url=${one}`).then(async ({
          data
        }) => {
          var url = data.result;
          url.includes(".mp4") ? conn.sendMessage(m.chat, {
            video: {
              url: url
            },
            mimetype: "video/mp4"
          }) : conn.sendMessage(m.chat, {
            image: {
              url: url
            }
          });
        });
        break;
      case "igdl2":
        if (!one) return m.reply(`Example: ${usedPrefix + command} ${template} |https://www.instagram.com/p/CJ8XKFmJ4al/?igshid=1acpcqo44kgkn`);
        axios.get(`https://api.lolhuman.xyz/api/instagram2?apikey=${Object.entries(APIKeys).find(([ key ]) => key.includes("lolhuman"))?.[1]}&url=${one}`).then(async ({
          data
        }) => {
          for (var x of data.result) x.includes(".mp4") ? conn.sendMessage(m.chat, {
            video: {
              url: x
            },
            mimetype: "video/mp4"
          }) : conn.sendMessage(m.chat, {
            image: {
              url: x
            }
          });
        });
        break;
      case "twtdl":
        if (!one) return m.reply(`Example: ${usedPrefix + command} ${template} |https://twitter.com/gofoodindonesia/status/1229369819511709697`);
        axios.get(`https://api.lolhuman.xyz/api/twitter?apikey=${Object.entries(APIKeys).find(([ key ]) => key.includes("lolhuman"))?.[1]}&url=${one}`).then(async ({
          data
        }) => {
          conn.sendMessage(m.chat, {
            video: {
              url: data.result.link[data.result.link.length - 1].link
            },
            mimetype: "video/mp4"
          });
        });
        break;
      case "fbdl":
        if (!one) return m.reply(`Example: ${usedPrefix + command} ${template} |https://id-id.facebook.com/SamsungGulf/videos/video-bokeh/561108457758458/`);
        axios.get(`https://api.lolhuman.xyz/api/facebook?apikey=${Object.entries(APIKeys).find(([ key ]) => key.includes("lolhuman"))?.[1]}&url=${one}`).then(async ({
          data
        }) => {
          conn.sendMessage(m.chat, {
            video: {
              url: data.result
            },
            mimetype: "video/mp4"
          });
        });
        break;
      case "zippyshare":
        if (!one) return m.reply(`Example: ${usedPrefix + command} ${template} |https://www51.zippyshare.com/v/5W0TOBz1/file.html`);
        axios.get(`https://api.lolhuman.xyz/api/zippyshare?apikey=${Object.entries(APIKeys).find(([ key ]) => key.includes("lolhuman"))?.[1]}&url=${one}`).then(async ({
          data
        }) => {
          var teks = `File Name : ${data.result.name_file}\n`;
          teks += `Size : ${data.result.size}\n`, teks += `Date Upload : ${data.result.date_upload}\n`,
            teks += `Download Url : ${data.result.download_url}`, await conn.reply(m.chat, teks, m);
        });
        break;
      case "pinterest":
        if (!one) return m.reply(`Example: ${usedPrefix + command} ${template} |loli kawaii`);
        axios.get(`https://api.lolhuman.xyz/api/pinterest?apikey=${Object.entries(APIKeys).find(([ key ]) => key.includes("lolhuman"))?.[1]}&query=${one}`).then(async ({
          data
        }) => {
          conn.sendMessage(m.chat, {
            image: {
              url: data.result
            }
          });
        });
        break;
      case "pinterest2":
        if (!one) return m.reply(`Example: ${usedPrefix + command} ${template} |loli kawaii`);
        axios.get(`https://api.lolhuman.xyz/api/pinterest2?apikey=${Object.entries(APIKeys).find(([ key ]) => key.includes("lolhuman"))?.[1]}&query=${one}`).then(async ({
          data
        }) => {
          for (var x of data.result.slice(0, 5)) conn.sendMessage(m.chat, {
            image: {
              url: x
            }
          });
        });
        break;
      case "pinterestdl":
        if (!one) return m.reply(`Example: ${usedPrefix + command} ${template} |https://id.pinterest.com/pin/696580267364426905/`);
        axios.get(`https://api.lolhuman.xyz/api/pinterestdl?apikey=${Object.entries(APIKeys).find(([ key ]) => key.includes("lolhuman"))?.[1]}&url=${one}`).then(async ({
          data
        }) => {
          conn.sendMessage(m.chat, {
            image: {
              url: data.result[0]
            }
          });
        });
        break;
      case "pixiv":
        if (!one) return m.reply(`Example: ${usedPrefix + command} ${template} |loli kawaii`);
        conn.sendMessage(m.chat, {
          image: {
            url: `https://api.lolhuman.xyz/api/pixiv?apikey=${Object.entries(APIKeys).find(([ key ]) => key.includes("lolhuman"))?.[1]}&query=${one}`
          }
        });
        break;
      case "pixivdl":
        if (!one) return m.reply(`Example: ${usedPrefix + command} ${template} |63456028`);
        conn.sendMessage(m.chat, {
          image: {
            url: `https://api.lolhuman.xyz/api/pixivdl/${one}?apikey=${Object.entries(APIKeys).find(([ key ]) => key.includes("lolhuman"))?.[1]}`
          }
        });
        break;
      case "character":
        if (!one) return m.reply(`Example: ${usedPrefix + command} ${template} |Miku Nakano`);
        axios.get(`https://api.lolhuman.xyz/api/character?apikey=${Object.entries(APIKeys).find(([ key ]) => key.includes("lolhuman"))?.[1]}&query=${one}`).then(async ({
          data
        }) => {
          var caption = `Id : ${data.result.id}\n`;
          for (var x of (caption += `Name : ${data.result.name.full}\n`, caption += `Native : ${data.result.name.native}\n`, caption += `Favorites : ${data.result.favourites}\n`, caption += "Media : \n", data.result.media.nodes)) caption += `- ${x.title.romaji} (${x.title.native})\n`;
          caption += `\nDescription : \n${data.result.description.replace(/__/g, "_")}`, conn.sendMessage(m.chat, {
            image: {
              url: data.result.image.large
            },
            caption: caption
          });
        });
        break;
      case "manga":
        if (!one) return m.reply(`Example: ${usedPrefix + command} ${template} |Gotoubun No Hanayome`);
        axios.get(`https://api.lolhuman.xyz/api/manga?apikey=${Object.entries(APIKeys).find(([ key ]) => key.includes("lolhuman"))?.[1]}&query=${one}`).then(async ({
          data
        }) => {
          var caption = `Id : ${data.result.id}\n`;
          for (var x of (caption += `Id MAL : ${data.result.idMal}\n`, caption += `Title : ${data.result.title.romaji}\n`, caption += `English : ${data.result.title.english}\n`, caption += `Native : ${data.result.title.native}\n`, caption += `Format : ${data.result.format}\n`, caption += `Chapters : ${data.result.chapters}\n`, caption += `Volume : ${data.result.volumes}\n`, caption += `Status : ${data.result.status}\n`, caption += `Source : ${data.result.source}\n`, caption += `Start Date : ${data.result.startDate.day} - ${data.result.startDate.month} - ${data.result.startDate.year}\n`, caption += `End Date : ${data.result.endDate.day} - ${data.result.endDate.month} - ${data.result.endDate.year}\n`, caption += `Genre : ${data.result.genres.join(", ")}\n`, caption += `Synonyms : ${data.result.synonyms.join(", ")}\n`, caption += `Score : ${data.result.averageScore}%\n`, caption += "Characters : \n", data.result.characters.nodes)) caption += `- ${x.name.full} (${x.name.native})\n`;
          caption += `\nDescription : ${data.result.description}`, conn.sendMessage(m.chat, {
            image: {
              url: data.result.coverImage.large
            },
            caption: caption
          });
        });
        break;
      case "anime":
        if (!one) return m.reply(`Example: ${usedPrefix + command} ${template} |Gotoubun No Hanayome`);
        axios.get(`https://api.lolhuman.xyz/api/anime?apikey=${Object.entries(APIKeys).find(([ key ]) => key.includes("lolhuman"))?.[1]}&query=${one}`).then(async ({
          data
        }) => {
          var caption = `Id : ${data.result.id}\n`;
          for (var x of (caption += `Id MAL : ${data.result.idMal}\n`, caption += `Title : ${data.result.title.romaji}\n`, caption += `English : ${data.result.title.english}\n`, caption += `Native : ${data.result.title.native}\n`, caption += `Format : ${data.result.format}\n`, caption += `Episodes : ${data.result.episodes}\n`, caption += `Duration : ${data.result.duration} mins.\n`, caption += `Status : ${data.result.status}\n`, caption += `Season : ${data.result.season}\n`, caption += `Season Year : ${data.result.seasonYear}\n`, caption += `Source : ${data.result.source}\n`, caption += `Start Date : ${data.result.startDate.day} - ${data.result.startDate.month} - ${data.result.startDate.year}\n`, caption += `End Date : ${data.result.endDate.day} - ${data.result.endDate.month} - ${data.result.endDate.year}\n`, caption += `Genre : ${data.result.genres.join(", ")}\n`, caption += `Synonyms : ${data.result.synonyms.join(", ")}\n`, caption += `Score : ${data.result.averageScore}%\n`, caption += "Characters : \n", data.result.characters.nodes)) caption += `- ${x.name.full} (${x.name.native})\n`;
          caption += `\nDescription : ${data.result.description}`, conn.sendMessage(m.chat, {
            image: {
              url: data.result.coverImage.large
            },
            caption: caption
          });
        });
        break;
      case "kusonime":
        if (!one) return m.reply(`Example: ${usedPrefix + command} ${template} |https://kusonime.com/nanatsu-no-taizai-bd-batch-subtitle-indonesia/`);
        axios.get(`https://api.lolhuman.xyz/api/kusonime?apikey=${Object.entries(APIKeys).find(([ key ]) => key.includes("lolhuman"))?.[1]}&url=${one}`).then(async ({
          data
        }) => {
          var caption = `Title : ${data.result.title}\n`;
          for (var x in caption += `Japanese : ${data.result.japanese}\n`, caption += `Genre : ${data.result.genre}\n`,
              caption += `Seasons : ${data.result.seasons}\n`, caption += `Producers : ${data.result.producers}\n`,
              caption += `Type : ${data.result.type}\n`, caption += `Status : ${data.result.status}\n`,
              caption += `Total Episode : ${data.result.total_episode}\n`, caption += `Score : ${data.result.score}\n`,
              caption += `Duration : ${data.result.duration}\n`, caption += `Released On : ${data.result.released_on}\n`,
              caption += `Desc : ${data.result.desc}\n`, data.result.link_dl)
            for (var y in caption += `\n${x}\n`,
                link_dl[x]) caption += `${y} - ${link_dl[x][y]}\n`;
          conn.sendMessage(m.chat, {
            image: {
              url: data.result.thumbnail
            },
            caption: caption
          });
        });
        break;
      case "kusonimesearch":
        if (!one) return m.reply(`Example: ${usedPrefix + command} ${template} |Gotoubun No Hanayome`);
        axios.get(`https://api.lolhuman.xyz/api/kusonimesearch?apikey=${Object.entries(APIKeys).find(([ key ]) => key.includes("lolhuman"))?.[1]}&query=${one}`).then(async ({
          data
        }) => {
          var caption = `Title : ${data.result.title}\n`;
          for (var x in caption += `Japanese : ${data.result.japanese}\n`, caption += `Genre : ${data.result.genre}\n`,
              caption += `Seasons : ${data.result.seasons}\n`, caption += `Producers : ${data.result.producers}\n`,
              caption += `Type : ${data.result.type}\n`, caption += `Status : ${data.result.status}\n`,
              caption += `Total Episode : ${data.result.total_episode}\n`, caption += `Score : ${data.result.score}\n`,
              caption += `Duration : ${data.result.duration}\n`, caption += `Released On : ${data.result.released_on}\n`,
              caption += `Desc : ${data.result.desc}\n`, data.result.link_dl)
            for (var y in caption += `\n${x}\n`,
                link_dl[x]) caption += `${y} - ${link_dl[x][y]}\n`;
          conn.sendMessage(m.chat, {
            image: {
              url: data.result.thumbnail
            },
            caption: caption
          });
        });
        break;
      case "otakudesu":
        if (!one) return m.reply(`Example: ${usedPrefix + command} ${template} |https://otakudesu.tv/lengkap/pslcns-sub-indo/`);
        axios.get(`https://api.lolhuman.xyz/api/otakudesu?apikey=${Object.entries(APIKeys).find(([ key ]) => key.includes("lolhuman"))?.[1]}&url=${one}`).then(async ({
          data
        }) => {
          var teks = `Title : ${data.result.title}\n`;
          for (var x in teks += `Japanese : ${data.result.japanese}\n`, teks += `Judul : ${data.result.judul}\n`,
              teks += `Type : ${data.result.type}\n`, teks += `Episode : ${data.result.episodes}\n`,
              teks += `Aired : ${data.result.aired}\n`, teks += `Producers : ${data.result.producers}\n`,
              teks += `Genre : ${data.result.genres}\n`, teks += `Duration : ${data.result.duration}\n`,
              teks += `Studios : ${data.result.status}\n`, teks += `Rating : ${data.result.rating}\n`,
              teks += `Credit : ${data.result.credit}\n`, data.result.link_dl)
            for (var y in teks += `\n\n*${data.result.link_dl[x].title}*\n`,
                data.result.link_dl[x].link_dl)
              for (var z in ini_info = data.result.link_dl[x].link_dl[y],
                  teks += `\n\`\`\`Reso : \`\`\`${ini_info.reso}\n`, teks += `\`\`\`Size : \`\`\`${ini_info.size}\n`,
                  teks += "```Link : ```\n", down_link = ini_info.link_dl, down_link) teks += `${z} - ${down_link[z]}\n`;
          await conn.reply(m.chat, teks, m);
        });
        break;
      case "otakudesusearch":
        if (!one) return m.reply(`Example: ${usedPrefix + command} ${template} |Gotoubun No Hanayome`);
        axios.get(`https://api.lolhuman.xyz/api/otakudesusearch?apikey=${Object.entries(APIKeys).find(([ key ]) => key.includes("lolhuman"))?.[1]}&query=${one}`).then(async ({
          data
        }) => {
          var teks = `Title : ${data.result.title}\n`;
          for (var x in teks += `Japanese : ${data.result.japanese}\n`, teks += `Judul : ${data.result.judul}\n`,
              teks += `Type : ${data.result.type}\n`, teks += `Episode : ${data.result.episodes}\n`,
              teks += `Aired : ${data.result.aired}\n`, teks += `Producers : ${data.result.producers}\n`,
              teks += `Genre : ${data.result.genres}\n`, teks += `Duration : ${data.result.duration}\n`,
              teks += `Studios : ${data.result.status}\n`, teks += `Rating : ${data.result.rating}\n`,
              teks += `Credit : ${data.result.credit}\n`, data.result.link_dl)
            for (var y in teks += `\n\n*${data.result.link_dl[x].title}*\n`,
                data.result.link_dl[x].link_dl) {
              var info = data.result.link_dl[x].link_dl[y];
              teks += `\n\`\`\`Reso : \`\`\`${info.reso}\n`, teks += `\`\`\`Size : \`\`\`${info.size}\n`,
                teks += "```Link : ```\n";
              var link = info.link_dl;
              for (var z in link) teks += `${z} - ${link[z]}\n`;
            }
          await conn.reply(m.chat, teks, m);
        });
        break;
      case "kbbi":
        if (!one) return m.reply(`Example: ${usedPrefix + command} ${template} |kursi`);
        var {
          data
        } = await axios.get(`https://api.lolhuman.xyz/api/kbbi?apikey=${Object.entries(APIKeys).find(([ key ]) => key.includes("lolhuman"))?.[1]}&query=${one}`), teks = `\`\`\`Kata : ${data.result[0]?.nama}\`\`\`\n`;
        for (var x of (teks += `\`\`\`Kata Dasar : ${data.result[0]?.kata_dasar}\`\`\`\n`, teks += `\`\`\`Pelafalan : ${data.result[0]?.pelafalan}\`\`\`\n`, teks += `\`\`\`Bentuk Tidak Baku : ${data.result[0]?.bentuk_tidak_baku}\`\`\`\n\n`, data.result)) teks += `\`\`\`Kode : ${x.makna[0]?.kelas[0]?.kode}\`\`\`\n`, teks += `\`\`\`Kelas : ${x.makna[0]?.kelas[0]?.nama}\`\`\`\n`,
          teks += `\`\`\`Artinya : \n${x.makna[0]?.kelas[0]?.deskripsi}\`\`\`\n\n`, teks += `\`\`\`Makna Lain : \n${x.makna[0]?.submakna}\`\`\`\n `,
          teks += `\`\`\`Contoh Kalimat : \n${x.makna[0]?.contoh}\`\`\`\n`;
        await conn.reply(m.chat, teks, m);
        break;
      case "brainly":
        if (!one) return m.reply(`Example: ${usedPrefix + command} ${template} |siapakah sukarno`);
        var {
          data
        } = await axios.get(`https://api.lolhuman.xyz/api/brainly?apikey=${Object.entries(APIKeys).find(([ key ]) => key.includes("lolhuman"))?.[1]}&query=${one}`);
        teks = "Beberapa Pembahasan Dari Brainly :\n\n";
        for (var x of data.result) teks += "==============================\n", teks += `\`\`\`Pertanyaan :\`\`\`\n${x.question.content}\n\n`,
          teks += `\`\`\`Jawaban :\`\`\`\n${x.answer[0]?.content}\n`, teks += "==============================\n\n";
        await conn.reply(m.chat, teks, m);
        break;
      case "jarak":
        if (!one) return m.reply(`Example: ${usedPrefix + command} ${template} |jakarta|yogyakarta`);
        var {
          data
        } = await axios.get(`https://api.lolhuman.xyz/api/jaraktempuh?apikey=${Object.entries(APIKeys).find(([ key ]) => key.includes("lolhuman"))?.[1]}&kota1=${one}&kota2=${two}`);
        teks = `Informasi Jarak dari ${one} ke ${two} :\n\n`;
        teks += `\`\`\`◪ Asal :\`\`\` ${data.result.from.name}\n`, teks += `\`\`\`◪ Garis Lintang :\`\`\` ${data.result.from.latitude}\n`,
          teks += `\`\`\`◪ Garis Bujur :\`\`\` ${data.result.from.longitude}\n\n`, teks += `\`\`\`◪ Tujuan :\`\`\` ${data.result.to.name}\n`,
          teks += `\`\`\`◪ Garis Lintang :\`\`\` ${data.result.to.latitude}\n`, teks += `\`\`\`◪ Garis Bujur :\`\`\` ${data.result.to.longitude}\n\n`,
          teks += `\`\`\`◪ Jarak Tempuh :\`\`\` ${data.result.jarak}\n`, teks += "```◪ Waktu Tempuh :```\n",
          teks += "   ╭───────────────❏\n", teks += `❍┤ Kereta Api : ${data.result.kereta_api}\n`,
          teks += `❍┤ Pesawat : ${data.result.pesawat}\n`, teks += `❍┤ Mobil : ${data.result.mobil}\n`,
          teks += `❍┤ Motor : ${data.result.motor}\n`, teks += `❍┤ Jalan Kaki : ${data.result.jalan_kaki}\n`,
          teks += "   ╰───────────────❏\n", await conn.reply(m.chat, teks, m);
        break;
      case "urbandictionary":
        var {
          data
        } = await axios.get(`http://api.lolhuman.xyz/api/urdict?apikey=${Object.entries(APIKeys).find(([ key ]) => key.includes("lolhuman"))?.[1]}&query=${one}`);
        for (var x of data.result) {
          teks = `\`\`\`Meaning :\n${x.definition}\`\`\`\n\n`;
          teks += `\`\`\`Link : ${x.permalink}\`\`\`\n\n`, teks += `\`\`\`Sounds Url : ${x.sound_urls[0]}\`\`\`\n\n`,
            teks += `\`\`\`Like : ${x.thumbs_up}\`\`\`\n\n`, teks += `\`\`\`Dislike : ${x.thumbs_down}\`\`\`\n\n`,
            teks += `\`\`\`Created On : \n${x.written_on}\`\`\`\n\n`, teks += `\`\`\`Author : ${x.author}\`\`\`\n\n`,
            teks += `\`\`\`Word : ${x.word}\`\`\`\n\n`, teks += `\`\`\`Defined Id : ${x.defid}\`\`\`\n\n`,
            teks += `\`\`\`Example : ${x.example}\`\`\`\n\n`;
        }
        await conn.reply(m.chat, teks, m);
        break;
      case "chord":
        if (!one) return m.reply(`Example: ${usedPrefix + command} ${template} |Melukis senja`);
        var {
          data
        } = await axios.get(`https://api.lolhuman.xyz/api/chord?apikey=${Object.entries(APIKeys).find(([ key ]) => key.includes("lolhuman"))?.[1]}&query=${one}`);
        teks = `Title : ${data.result.title}\n`;
        teks += `Chord : \n${data.result.chord}`, await conn.reply(m.chat, teks, m);
        break;
      case "heroml":
        if (!one) return m.reply(`Example: ${usedPrefix + command} ${template} |Fanny`);
        var {
          data
        } = await axios.get(`https://api.lolhuman.xyz/api/heroml/${one}?apikey=${Object.entries(APIKeys).find(([ key ]) => key.includes("lolhuman"))?.[1]}`), caption = `Name : ${data.result.hero_name}\n`;
        caption += `Entrance Quotes : ${data.result.ent_quotes}\n`, caption += `Role : ${data.result.detail.role}\n`,
          caption += `Specialty : ${data.result.detail.specialty}\n`, caption += `Laning : ${data.result.detail.laning_recommendation}\n`,
          caption += `Release : ${data.result.detail.release_date}\n`, caption += `Movement speed : ${data.result.attr.movement_speed}\n`,
          caption += `Physical attack : ${data.result.attr.physical_attack}\n`, caption += `Magic power : ${data.result.attr.magic_power}\n`,
          caption += `Physical defense : ${data.result.attr.physical_defense}\n`, caption += `Magic defense : ${data.result.attr.magic_defense}\n`,
          caption += `Critical rate : ${data.result.attr.basic_atk_crit_rate}\n`, caption += `Hp : ${data.result.attr.hp}\n`,
          caption += `Mana : ${data.result.attr.mana}\n`, caption += `Mana regen : ${data.result.attr.mana_regen}\n`,
          conn.sendMessage(m.chat, {
            image: {
              url: data.result.icon
            },
            caption: caption
          });
        break;
      case "mlstalk":
        if (!one) return m.reply(`Example: ${usedPrefix + command} ${template} |84830127/2169`);
        var {
          data
        } = await axios.get(`https://api.lolhuman.xyz/api/mobilelegend/${one}?apikey=${Object.entries(APIKeys).find(([ key ]) => key.includes("lolhuman"))?.[1]}`);
        m.reply(data.result);
        break;
      case "genshin":
        if (!one) return m.reply(`Example: ${usedPrefix + command} ${template} |jean`);
        var {
          data
        } = await axios.get(`https://api.lolhuman.xyz/api/genshin/${one}?apikey=${Object.entries(APIKeys).find(([ key ]) => key.includes("lolhuman"))?.[1]}`);
        caption = `Name : ${data.result.title}\n`;
        caption += `Intro : ${data.result.intro}\n`, caption += `Icon : ${data.result.icon}\n`,
          await conn.sendMessage(m.chat, {
            image: {
              url: data.result.cover1
            },
            caption: caption
          }), await conn.sendMessage(m.chat, {
            audio: {
              url: data.result.cv[0]?.audio[0]
            },
            mimetype: "audio/mp4"
          });
        break;
      case "wikipedia":
        if (!one) return m.reply(`Example: ${usedPrefix + command} ${template} |Tahu`);
        var {
          data
        } = await axios.get(`https://api.lolhuman.xyz/api/wiki?apikey=${Object.entries(APIKeys).find(([ key ]) => key.includes("lolhuman"))?.[1]}&query=${one}`);
        m.reply(data.result);
        break;
      case "translate":
        if (!one) return m.reply(`Example: ${usedPrefix + command} ${template} |en|Tahu Bacem`);
        var {
          data
        } = await axios.get(`https://api.lolhuman.xyz/api/translate/auto/${one}?apikey=${Object.entries(APIKeys).find(([ key ]) => key.includes("lolhuman"))?.[1]}&text=${two}`);
        init_txt = `From : ${data.result.from}\n`, init_txt += `To : ${data.result.to}\n`,
          init_txt += `Original : ${data.result.original}\n`, init_txt += `Translated : ${data.result.translated}\n`,
          init_txt += `Pronunciation : ${data.result.pronunciation}\n`, m.reply(init_txt);
        break;
      case "brainly":
        if (!one) return m.reply(`Example: ${usedPrefix + command} ${template} |Soekarno adalah`);
        var {
          data
        } = await axios.get(`https://api.lolhuman.xyz/api/brainly?apikey=${Object.entries(APIKeys).find(([ key ]) => key.includes("lolhuman"))?.[1]}&query=${one}`);
        teks = "Result : \n";
        for (var x of data.result) teks += `${x.title}\n`, teks += `${x.url}\n\n`;
        await conn.reply(m.chat, teks, m);
        break;
      case "jadwaltv":
        if (!one) return m.reply(`Example: ${usedPrefix + command} ${template} |RCTI`);
        var {
          data
        } = await axios.get(`https://api.lolhuman.xyz/api/jadwaltv/${one}?apikey=${Object.entries(APIKeys).find(([ key ]) => key.includes("lolhuman"))?.[1]}`);
        teks = `Jadwal TV ${args[0]?.toUpperCase()}\n`;
        for (var x in data.result) teks += `${x} - ${data.result[x]}\n`;
        await conn.reply(m.chat, teks, m);
        break;
      case "jadwaltvnow":
        var {
          data
        } = await axios.get(`https://api.lolhuman.xyz/api/jadwaltv/now?apikey=${Object.entries(APIKeys).find(([ key ]) => key.includes("lolhuman"))?.[1]}`);
        teks = "Jadwal TV Now :\n";
        for (var x in data.result) teks += `${x.toUpperCase()}${data.result[x]}\n\n`;
        await conn.reply(m.chat, teks, m);
        break;
      case "newsinfo":
        var {
          data
        } = await axios.get(`https://api.lolhuman.xyz/api/newsinfo?apikey=${Object.entries(APIKeys).find(([ key ]) => key.includes("lolhuman"))?.[1]}`);
        teks = "Result :\n";
        for (var x of data.result) teks += `Title : ${x.title}\n`, teks += `Author : ${x.author}\n`,
          teks += `Source : ${x.source.name}\n`, teks += `Url : ${x.url}\n`, teks += `Published : ${x.publishedAt}\n`,
          teks += `Description : ${x.description}\n\n`;
        await conn.reply(m.chat, teks, m);
        break;
      case "cnnindonesia":
        var {
          data
        } = await axios.get(`https://api.lolhuman.xyz/api/cnnindonesia?apikey=${Object.entries(APIKeys).find(([ key ]) => key.includes("lolhuman"))?.[1]}`);
        teks = "Result :\n";
        for (var x of data.result) teks += `Judul : ${x.judul}\n`, teks += `Link : ${x.link}\n`,
          teks += `Tipe : ${x.tipe}\n`, teks += `Published : ${x.waktu}\n\n`;
        await conn.reply(m.chat, teks, m);
        break;
      case "cnnnasional":
        var {
          data
        } = await axios.get(`https://api.lolhuman.xyz/api/cnnindonesia/nasional?apikey=${Object.entries(APIKeys).find(([ key ]) => key.includes("lolhuman"))?.[1]}`);
        teks = "Result :\n";
        for (var x of data.result) teks += `Judul : ${x.judul}\n`, teks += `Link : ${x.link}\n`,
          teks += `Tipe : ${x.tipe}\n`, teks += `Published : ${x.waktu}\n\n`;
        await conn.reply(m.chat, teks, m);
        break;
      case "cnninternasional":
        var {
          data
        } = await axios.get(`https://api.lolhuman.xyz/api/cnnindonesia/internasional?apikey=${Object.entries(APIKeys).find(([ key ]) => key.includes("lolhuman"))?.[1]}`);
        teks = "Result :\n";
        for (var x of data.result) teks += `Judul : ${x.judul}\n`, teks += `Link : ${x.link}\n`,
          teks += `Tipe : ${x.tipe}\n`, teks += `Published : ${x.waktu}\n\n`;
        await conn.reply(m.chat, teks, m);
        break;
      case "infogempa":
        var {
          data
        } = await axios.get(`https://api.lolhuman.xyz/api/infogempa?apikey=${Object.entries(APIKeys).find(([ key ]) => key.includes("lolhuman"))?.[1]}`);
        caption = `Lokasi : ${data.result.lokasi}\n`;
        caption += `Waktu : ${data.result.waktu}\n`, caption += `Potensi : ${data.result.potensi}\n`,
          caption += `Magnitude : ${data.result.magnitude}\n`, caption += `Kedalaman : ${data.result.kedalaman}\n`,
          caption += `Koordinat : ${data.result.koordinat}`, conn.sendMessage(m.chat, {
            image: {
              url: data.result.map
            },
            caption: caption
          });
        break;
      case "lirik":
        if (!one) return m.reply(`Example: ${usedPrefix + command} ${template} |Melukis Senja`);
        var {
          data
        } = await axios.get(`https://api.lolhuman.xyz/api/lirik?apikey=${Object.entries(APIKeys).find(([ key ]) => key.includes("lolhuman"))?.[1]}&query=${one}`);
        m.reply(data.result);
        break;
      case "cuaca":
        if (!one) return m.reply(`Example: ${usedPrefix + command} ${template} |Yogyakarta`);
        var {
          data
        } = await axios.get(`https://api.lolhuman.xyz/api/cuaca/${one}?apikey=${Object.entries(APIKeys).find(([ key ]) => key.includes("lolhuman"))?.[1]}`);
        teks = `Tempat : ${data.result.tempat}\n`;
        teks += `Cuaca : ${data.result.cuaca}\n`, teks += `Angin : ${data.result.angin}\n`,
          teks += `Description : ${data.result.description}\n`, teks += `Kelembapan : ${data.result.kelembapan}\n`,
          teks += `Suhu : ${data.result.suhu}\n`, teks += `Udara : ${data.result.udara}\n`,
          teks += `Permukaan laut : ${data.result.permukaan_laut}\n`, conn.sendMessage(m.chat, {
            location: {
              degreesLatitude: data.result.latitude,
              degreesLongitude: data.result.longitude
            }
          }), await conn.reply(m.chat, teks, m);
        break;
      case "covidindo":
        var {
          data
        } = await axios.get(`https://api.lolhuman.xyz/api/corona/indonesia?apikey=${Object.entries(APIKeys).find(([ key ]) => key.includes("lolhuman"))?.[1]}`);
        teks = `Positif : ${data.result.positif}\n`;
        teks += `Sembuh : ${data.result.sembuh}\n`, teks += `Dirawat : ${data.result.dirawat}\n`,
          teks += `Meninggal : ${data.result.meninggal}`, await conn.reply(m.chat, teks, m);
        break;
      case "covidglobal":
        var {
          data
        } = await axios.get(`https://api.lolhuman.xyz/api/corona/global?apikey=${Object.entries(APIKeys).find(([ key ]) => key.includes("lolhuman"))?.[1]}`);
        teks = `Positif : ${data.result.positif}\n`;
        teks += `Sembuh : ${data.result.sembuh}\n`, teks += `Dirawat : ${data.result.dirawat}\n`,
          teks += `Meninggal : ${data.result.meninggal}`, await conn.reply(m.chat, teks, m);
        break;
      case "kodepos":
        if (!one) return m.reply(`Example: ${usedPrefix + command} ${template} |Slemanan or ${usedPrefix + command} ${template} |66154`);
        var {
          data
        } = await axios.get(`https://api.lolhuman.xyz/api/kodepos?apikey=${Object.entries(APIKeys).find(([ key ]) => key.includes("lolhuman"))?.[1]}&query=${one}`);
        teks = `Provinsi : ${data.result[0]?.province}\n`;
        teks += `Kabupaten : ${data.result[0]?.city}\n`, teks += `Kecamatan : ${data.result[0]?.subdistrict}\n`,
          teks += `Kelurahan : ${data.result[0]?.urban}\n`, teks += `Kode Pos : ${data.result[0]?.postalcode}`,
          await conn.reply(m.chat, teks, m);
        break;
      case "jadwalbola":
        var {
          data
        } = await axios.get(`https://api.lolhuman.xyz/api/jadwalbola?apikey=${Object.entries(APIKeys).find(([ key ]) => key.includes("lolhuman"))?.[1]}`);
        teks = "Jadwal Bola :\n";
        for (var x of data.result) teks += `Hari : ${x.hari}\n`, teks += `Jam : ${x.jam}\n`,
          teks += `Event : ${x.event}\n`, teks += `Match : ${x.match}\n`, teks += `TV : ${x.tv}\n\n`;
        await conn.reply(m.chat, teks, m);
        break;
      case "indbeasiswa":
        var {
          data
        } = await axios.get(`https://api.lolhuman.xyz/api/indbeasiswa?apikey=${Object.entries(APIKeys).find(([ key ]) => key.includes("lolhuman"))?.[1]}`);
        teks = "Info Beasiswa :\n";
        for (var x of data.result) teks += `Title : ${x.title}\n`, teks += `Link : ${x.link}\n\n`;
        await conn.reply(m.chat, teks, m);
        break;
      case "hoax":
        var {
          data
        } = await axios.get(`https://api.lolhuman.xyz/api/turnbackhoax?apikey=${Object.entries(APIKeys).find(([ key ]) => key.includes("lolhuman"))?.[1]}`);
        teks = "Info Hoax :\n";
        for (var x of data.result) teks += `Title : ${x.title}\n`, teks += `Link : ${x.link}\n`,
          teks += `Posted : ${x.posted}\n`, teks += `Description : ${x.desc}\n\n`;
        await conn.reply(m.chat, teks, m);
        break;
      case "lk21":
        if (!one) return m.reply(`Example: ${usedPrefix + command} ${template} |Transformer`);
        var {
          data
        } = await axios.get(`https://api.lolhuman.xyz/api/lk21?apikey=${Object.entries(APIKeys).find(([ key ]) => key.includes("lolhuman"))?.[1]}&query=${one}`);
        caption = `Title : ${data.result.title}\n`;
        caption += `Link : ${data.result.link}\n`, caption += `Genre : ${data.result.genre}\n`,
          caption += `Views : ${data.result.views}\n`, caption += `Duration : ${data.result.duration}\n`,
          caption += `Tahun : ${data.result.tahun}\n`, caption += `Rating : ${data.result.rating}\n`,
          caption += `Desc : ${data.result.desc}\n`, caption += `Actors : ${data.result.actors.join(", ")}\n`,
          caption += `Location : ${data.result.location}\n`, caption += `Date Release : ${data.result.date_release}\n`,
          caption += `Language : ${data.result.language}\n`, caption += `Link Download : ${data.result.link_dl}`,
          conn.sendMessage(m.chat, {
            image: {
              url: data.result.thumbnail
            },
            caption: caption
          });
        break;
      case "drakorongoing":
        var {
          data
        } = await axios.get(`https://api.lolhuman.xyz/api/drakorongoing?apikey=${Object.entries(APIKeys).find(([ key ]) => key.includes("lolhuman"))?.[1]}`);
        teks = "Ongoing Drakor\n\n";
        for (var x of data.result) teks += `Title : ${x.title}\n`, teks += `Link : ${x.link}\n`,
          teks += `Thumbnail : ${x.thumbnail}\n`, teks += `Year : ${x.category}\n`, teks += `Total Episode : ${x.total_episode}\n`,
          teks += `Genre : ${x.genre.join(", ")}\n\n`;
        await conn.reply(m.chat, teks, m);
        break;
      case "wattpad":
        if (!one) return m.reply(`Example: ${usedPrefix + command} ${template} |https://www.wattpad.com/707367860-kumpulan-quote-tere-liye-tere-liye-quote-quote`);
        var {
          data
        } = await axios.get(`https://api.lolhuman.xyz/api/wattpad?apikey=${Object.entries(APIKeys).find(([ key ]) => key.includes("lolhuman"))?.[1]}&url=${one}`);
        caption = `Title : ${data.result.title}\n`;
        caption += `Rating : ${data.result.rating}\n`, caption += `Motify date : ${data.result.modifyDate}\n`,
          caption += `Create date: ${data.result.createDate}\n`, caption += `Word : ${data.result.word}\n`,
          caption += `Comment : ${data.result.comment}\n`, caption += `Vote : ${data.result.vote}\n`,
          caption += `Reader : ${data.result.reader}\n`, caption += `Pages : ${data.result.pages}\n`,
          caption += `Description : ${data.result.desc}\n\n`, caption += `Story : \n${data.result.story}`,
          conn.sendMessage(m.chat, {
            image: {
              url: data.result.photo
            },
            caption: caption
          });
        break;
      case "wattpadsearch":
        if (!one) return m.reply(`Example: ${usedPrefix + command} ${template} |Tere Liye`);
        var {
          data
        } = await axios.get(`https://api.lolhuman.xyz/api/wattpadsearch?apikey=${Object.entries(APIKeys).find(([ key ]) => key.includes("lolhuman"))?.[1]}&query=${one}`);
        teks = "Wattpad Seach : \n";
        for (var x of data.result) teks += `Title : ${x.title}\n`, teks += `Url : ${x.url}\n`,
          teks += `Part : ${x.parts}\n`, teks += `Motify date : ${x.modifyDate}\n`, teks += `Create date: ${x.createDate}\n`,
          teks += `Coment count: ${x.commentCount}\n\n`;
        await conn.reply(m.chat, teks, m);
        break;
      case "cerpen":
        var {
          data
        } = await axios.get(`https://api.lolhuman.xyz/api/cerpen?apikey=${Object.entries(APIKeys).find(([ key ]) => key.includes("lolhuman"))?.[1]}`);
        teks = `Title : ${data.result.title}\n`;
        teks += `Creator : ${data.result.creator}\n`, teks += `Story :\n${data.result.cerpen}`,
          await conn.reply(m.chat, teks, m);
        break;
      case "ceritahoror":
        var {
          data
        } = await axios.get(`https://api.lolhuman.xyz/api/ceritahoror?apikey=${Object.entries(APIKeys).find(([ key ]) => key.includes("lolhuman"))?.[1]}`);
        caption = `Title : ${data.result.title}\n`;
        caption += `Desc : ${data.result.desc}\n`, caption += `Story :\n${data.result.story}\n`,
          conn.sendMessage(m.chat, {
            image: {
              url: data.result.thumbnail
            },
            caption: caption
          });
        break;
      case "gimage":
      case "konachan":
      case "wallpapersearch":
        if (!one) return m.reply(`Example: ${usedPrefix + command} ${template} |loli kawaii`);
        "wallpapersearch" === command && (command = "wallpaper"), conn.sendMessage(m.chat, {
          image: {
            url: `https://api.lolhuman.xyz/api/${args[0]}?apikey=${Object.entries(APIKeys).find(([ key ]) => key.includes("lolhuman"))?.[1]}&query=${one}`
          }
        });
        break;
      case "gimage2":
        if (!one) return m.reply(`Example: ${usedPrefix + command} ${template} |loli kawaii`);
        axios.get(`https://api.lolhuman.xyz/api/gimage2?apikey=${Object.entries(APIKeys).find(([ key ]) => key.includes("lolhuman"))?.[1]}&query=${one}`).then(async ({
          data
        }) => {
          for (var x of data.result.slice(0, 5)) conn.sendMessage(m.chat, {
            image: {
              url: x
            }
          });
        });
        break;
      case "wallpapersearch2":
        if (!one) return m.reply(`Example: ${usedPrefix + command} ${template} |loli kawaii`);
        axios.get(`https://api.lolhuman.xyz/api/wallpaper2?apikey=${Object.entries(APIKeys).find(([ key ]) => key.includes("lolhuman"))?.[1]}&query=${one}`).then(async ({
          data
        }) => {
          conn.sendMessage(m.chat, {
            image: {
              url: data.result
            }
          });
        });
        break;
      case "playstore":
        if (!one) return m.reply(`Example: ${usedPrefix + command} ${template} |telegram`);
        var {
          data
        } = await axios.get(`https://api.lolhuman.xyz/api/playstore?apikey=${Object.entries(APIKeys).find(([ key ]) => key.includes("lolhuman"))?.[1]}&query=${one}`);
        teks = "Play Store Search : \n";
        for (var x of data.result) teks += `Name : ${x.title}\n`, teks += `ID : ${x.appId}\n`,
          teks += `Developer : ${x.developer}\n`, teks += `Link : ${x.url}\n`, teks += `Price : ${x.priceText}\n`,
          teks += `Price : ${x.price}\n\n`;
        await conn.reply(m.chat, teks, m);
        break;
      case "shopee":
        if (!one) return m.reply(`Example: ${usedPrefix + command} ${template} |tas gendong`);
        var {
          data
        } = await axios.get(`https://api.lolhuman.xyz/api/shopee?apikey=${Object.entries(APIKeys).find(([ key ]) => key.includes("lolhuman"))?.[1]}&query=${one}`);
        teks = "Shopee Search : \n";
        for (var x of data.result) teks += `Name : ${x.name}\n`, teks += `Terjual : ${x.sold}\n`,
          teks += `Stock : ${x.stock}\n`, teks += `Lokasi : ${x.shop_loc}\n`, teks += `Link : ${x.link_produk}\n\n`;
        await conn.reply(m.chat, teks, m);
        break;
      case "google":
        if (!one) return m.reply(`Example: ${usedPrefix + command} ${template} |loli kawaii`);
        var {
          data
        } = await axios.get(`https://api.lolhuman.xyz/api/gsearch?apikey=${Object.entries(APIKeys).find(([ key ]) => key.includes("lolhuman"))?.[1]}&query=${one}`);
        teks = "Google Search : \n";
        for (var x of data.result) teks += `Title : ${x.title}\n`, teks += `Link : ${x.link}\n`,
          teks += `Desc : ${x.desc}\n\n`;
        await conn.reply(m.chat, teks, m);
        break;
      case "quotes":
        var {
          data
        } = await axios.get(`https://api.lolhuman.xyz/api/random/quotes?apikey=${Object.entries(APIKeys).find(([ key ]) => key.includes("lolhuman"))?.[1]}`);
        m.reply(`_${data.result.quote}_\n\n*― ${data.result.by}*`);
        break;
      case "quotesanime":
        var {
          data
        } = await axios.get(`https://api.lolhuman.xyz/api/random/quotesnime?apikey=${Object.entries(APIKeys).find(([ key ]) => key.includes("lolhuman"))?.[1]}`);
        m.reply(`_${data.result.quote}_\n\n*― ${data.result.character}*\n*― ${data.result.anime} ${data.result.episode}*`);
        break;
      case "quotesdilan":
        quotedilan = await axios.get(`https://api.lolhuman.xyz/api/quotes/dilan?apikey=${Object.entries(APIKeys).find(([ key ]) => key.includes("lolhuman"))?.[1]}`),
          m.reply(quotedilan.result);
        break;
      case "faktaunik":
      case "katabijak":
      case "pantun":
      case "bucin":
        var {
          data
        } = await axios.get(`https://api.lolhuman.xyz/api/random/${teks}?apikey=${Object.entries(APIKeys).find(([ key ]) => key.includes("lolhuman"))?.[1]}`);
        m.reply(data.result);
        break;
      case "randomnama":
        var {
          data
        } = await axios.get(`https://api.lolhuman.xyz/api/random/nama?apikey=${Object.entries(APIKeys).find(([ key ]) => key.includes("lolhuman"))?.[1]}`);
        m.reply(data.result);
        break;
      case "asupan":
        axios.get(`https://api.lolhuman.xyz/api/asupan?apikey=${Object.entries(APIKeys).find(([ key ]) => key.includes("lolhuman"))?.[1]}`).then(async ({
          data
        }) => {
          conn.sendMessage(m.chat, {
            video: {
              url: data.result
            },
            mimetype: "video/mp4"
          });
        });
        break;
      case "wancak":
        conn.sendMessage(m.chat, {
          image: {
            url: `https://api.lolhuman.xyz/api/onecak?apikey=${Object.entries(APIKeys).find(([ key ]) => key.includes("lolhuman"))?.[1]}`
          }
        });
        break;
      case "artinama":
        if (!one) return m.reply(`Example: ${usedPrefix + command} ${template} |Taylor MD`);
        axios.get(`https://api.lolhuman.xyz/api/artinama?apikey=${Object.entries(APIKeys).find(([ key ]) => key.includes("lolhuman"))?.[1]}&nama=${one}`).then(async ({
          data
        }) => {
          m.reply(data.result);
        });
        break;
      case "jodoh":
        if (!one) return m.reply(`Example: ${usedPrefix + command} ${template} |Tahu|Bacem`);
        axios.get(`https://api.lolhuman.xyz/api/jodoh/${one}/${two}?apikey=${Object.entries(APIKeys).find(([ key ]) => key.includes("lolhuman"))?.[1]}`).then(async ({
          data
        }) => {
          var teks = `Positif : ${data.result.positif}\n`;
          teks += `Negative : ${data.result.negatif}\n`, teks += `Deskripsi : ${data.result.deskripsi}`,
            await conn.reply(m.chat, teks, m);
        });
        break;
      case "weton":
        if (!args[1]) return m.reply(`Example: ${usedPrefix + command} ${template} |12 12 2020`);
        axios.get(`https://api.lolhuman.xyz/api/weton/${args[1]}/${args[2]}/${args[3]}?apikey=${Object.entries(APIKeys).find(([ key ]) => key.includes("lolhuman"))?.[1]}`).then(async ({
          data
        }) => {
          var teks = `Weton : ${data.result.weton}\n`;
          teks += `Pekerjaan : ${data.result.pekerjaan}\n`, teks += `Rejeki : ${data.result.rejeki}\n`,
            teks += `Jodoh : ${data.result.jodoh}`, await conn.reply(m.chat, teks, m);
        });
        break;
      case "jadian":
        if (!args[1]) return m.reply(`Example: ${usedPrefix + command} ${template} |12 12 2020`);
        axios.get(`https://api.lolhuman.xyz/api/jadian/${args[1]}/${args[2]}/${args[3]}?apikey=${Object.entries(APIKeys).find(([ key ]) => key.includes("lolhuman"))?.[1]}`).then(async ({
          data
        }) => {
          var teks = `Karakteristik : ${data.result.karakteristik}\n`;
          teks += `Deskripsi : ${data.result.deskripsi}`, await conn.reply(m.chat, teks, m);
        });
        break;
      case "tebakumur":
        if (!one) return m.reply(`Example: ${usedPrefix + command} ${template} |Taylor MD`);
        axios.get(`https://api.lolhuman.xyz/api/tebakumur?apikey=${Object.entries(APIKeys).find(([ key ]) => key.includes("lolhuman"))?.[1]}&name=${one}`).then(async ({
          data
        }) => {
          var teks = `Nama : ${data.result.name}\n`;
          teks += `Umur : ${data.result.age}`, await conn.reply(m.chat, teks, m);
        });
        break;
      case "stalkig":
        if (!one) return m.reply(`Example: ${usedPrefix + command} ${template} |jessnolimit`);
        axios.get(`https://api.lolhuman.xyz/api/stalkig/${one}?apikey=${Object.entries(APIKeys).find(([ key ]) => key.includes("lolhuman"))?.[1]}`).then(async ({
          data
        }) => {
          var caption = `Username : ${data.result.username}\n`;
          caption += `Full Name : ${data.result.fullname}\n`, caption += `Posts : ${data.result.posts}\n`,
            caption += `Followers : ${data.result.followers}\n`, caption += `Following : ${data.result.following}\n`,
            caption += `Bio : ${data.result.bio}`, conn.sendMessage(m.chat, {
              image: {
                url: data.result.photo_profile
              },
              caption: caption
            });
        });
        break;
      case "stalkgithub":
        if (!one) return m.reply(`Example: ${usedPrefix + command} ${template} |LoL-Human`);
        axios.get(`https://api.lolhuman.xyz/api/github/${one}?apikey=${Object.entries(APIKeys).find(([ key ]) => key.includes("lolhuman"))?.[1]}`).then(async ({
          data
        }) => {
          var caption = `Name : ${data.result.name}\n`;
          caption += `Link : ${data.result.url}\n`, caption += `Public Repo : ${data.result.public_repos}\n`,
            caption += `Public Gists : ${data.result.public_gists}\n`, caption += `Followers : ${data.result.followers}\n`,
            caption += `Following : ${data.result.following}\n`, caption += `Bio : ${data.result.bio}`,
            conn.sendMessage(m.chat, {
              image: {
                url: data.result.avatar
              },
              caption: caption
            });
        });
        break;
      case "stalktwitter":
        if (!one) return m.reply(`Example: ${usedPrefix + command} ${template} |jokowi`);
        axios.get(`https://api.lolhuman.xyz/api/twitter/${one}?apikey=${Object.entries(APIKeys).find(([ key ]) => key.includes("lolhuman"))?.[1]}`).then(async ({
          data
        }) => {
          var caption = `Username : ${data.result.screen_name}\n`;
          caption += `Name : ${data.result.name}\n`, caption += `Tweet : ${data.result.tweet}\n`,
            caption += `Joined : ${data.result.joined}\n`, caption += `Followers : ${data.result.followers}\n`,
            caption += `Following : ${data.result.following}\n`, caption += `Like : ${data.result.like}\n`,
            caption += `Description : ${data.result.description}`, conn.sendMessage(m.chat, {
              image: {
                url: data.result.profile_picture
              },
              caption: caption
            });
        });
        break;
      case "stalktiktok":
        if (!one) return m.reply(`Example: ${usedPrefix + command} ${template} |bulansutena`);
        axios.get(`https://api.lolhuman.xyz/api/stalktiktok/${one}?apikey=${Object.entries(APIKeys).find(([ key ]) => key.includes("lolhuman"))?.[1]}`).then(async ({
          data
        }) => {
          var caption = `Username : ${data.result.username}\n`;
          caption += `Nickname : ${data.result.nickname}\n`, caption += `Followers : ${data.result.followers}\n`,
            caption += `Followings : ${data.result.followings}\n`, caption += `Likes : ${data.result.likes}\n`,
            caption += `Video : ${data.result.video}\n`, caption += `Bio : ${data.result.bio}\n`,
            conn.sendMessage(m.chat, {
              image: {
                url: data.result.user_picture
              },
              caption: caption
            });
        });
        break;
      case "ssweb":
        if (!one) return m.reply(`Example: ${usedPrefix + command} ${template} |https://api.lolhuman.xyz`);
        conn.sendMessage(m.chat, {
          image: {
            url: `https://api.lolhuman.xyz/api/ssweb?apikey=${Object.entries(APIKeys).find(([ key ]) => key.includes("lolhuman"))?.[1]}&url=${one}`
          }
        });
        break;
      case "ssweb2":
        if (!one) return m.reply(`Example: ${usedPrefix + command} ${template} |https://api.lolhuman.xyz`);
        conn.sendMessage(m.chat, {
          image: {
            url: `https://api.lolhuman.xyz/api/sswebfull?apikey=${Object.entries(APIKeys).find(([ key ]) => key.includes("lolhuman"))?.[1]}&url=${one}`
          }
        });
        break;
      case "shortlink":
        if (!one) return m.reply(`Example: ${usedPrefix + command} ${template} |https://api.lolhuman.xyz`);
        axios.get(`https://api.lolhuman.xyz/api/ouoshortlink?apikey=${Object.entries(APIKeys).find(([ key ]) => key.includes("lolhuman"))?.[1]}&url=${one}`).then(async ({
          data
        }) => {
          m.reply(data.result);
        });
        break;
      case "art":
      case "bts":
      case "exo":
      case "elf":
      case "loli":
      case "neko":
      case "waifu":
      case "shota":
      case "husbu":
      case "sagiri":
      case "shinobu":
      case "megumin":
      case "wallnime":
      case "quotesimage":
        conn.sendMessage(m.chat, {
          image: {
            url: `https://api.lolhuman.xyz/api/random/${args[0]}?apikey=${Object.entries(APIKeys).find(([ key ]) => key.includes("lolhuman"))?.[1]}`
          }
        });
        break;
      case "chiisaihentai":
      case "trap":
      case "blowjob":
      case "yaoi":
      case "ecchi":
      case "hentai":
      case "ahegao":
      case "hololewd":
      case "sideoppai":
      case "animefeets":
      case "animebooty":
      case "animethighss":
      case "hentaiparadise":
      case "animearmpits":
      case "hentaifemdom":
      case "lewdanimegirls":
      case "biganimetiddies":
      case "animebellybutton":
      case "hentai4everyone":
        conn.sendMessage(m.chat, {
          image: {
            url: `https://api.lolhuman.xyz/api/random/nsfw/${args[0]}?apikey=${Object.entries(APIKeys).find(([ key ]) => key.includes("lolhuman"))?.[1]}`
          }
        });
        break;
      case "bj":
      case "ero":
      case "cum":
      case "feet":
      case "yuri":
      case "trap":
      case "lewd":
      case "feed":
      case "eron":
      case "solo":
      case "gasm":
      case "poke":
      case "anal":
      case "holo":
      case "tits":
      case "kuni":
      case "kiss":
      case "erok":
      case "smug":
      case "baka":
      case "solog":
      case "feetg":
      case "lewdk":
      case "waifu":
      case "pussy":
      case "femdom":
      case "cuddle":
      case "hentai":
      case "eroyuri":
      case "cum_jpg":
      case "blowjob":
      case "erofeet":
      case "holoero":
      case "classic":
      case "erokemo":
      case "fox_girl":
      case "futanari":
      case "lewdkemo":
      case "wallpaper":
      case "pussy_jpg":
      case "kemonomimi":
      case "nsfw_avatar":
        conn.sendMessage(m.chat, {
          image: {
            url: `https://api.lolhuman.xyz/api/random2/${args[0]}?apikey=${Object.entries(APIKeys).find(([ key ]) => key.includes("lolhuman"))?.[1]}`
          }
        });
        break;
      case "blackpink":
      case "neon":
      case "greenneon":
      case "advanceglow":
      case "futureneon":
      case "sandwriting":
      case "sandsummer":
      case "sandengraved":
      case "metaldark":
      case "neonlight":
      case "holographic":
      case "text1917":
      case "minion":
      case "deluxesilver":
      case "newyearcard":
      case "bloodfrosted":
      case "halloween":
      case "jokerlogo":
      case "fireworksparkle":
      case "natureleaves":
      case "bokeh":
      case "toxic":
      case "strawberry":
      case "box3d":
      case "roadwarning":
      case "breakwall":
      case "icecold":
      case "luxury":
      case "cloud":
      case "summersand":
      case "horrorblood":
      case "thunder":
        if (!one) return m.reply(`Example: ${usedPrefix + command} ${template} |Taylor MD`);
        conn.sendMessage(m.chat, {
          image: {
            url: `https://api.lolhuman.xyz/api/textprome/${args[0]}?apikey=${Object.entries(APIKeys).find(([ key ]) => key.includes("lolhuman"))?.[1]}&text=${one}`
          }
        });
        break;
      case "pornhub":
      case "glitch":
      case "avenger":
      case "space":
      case "ninjalogo":
      case "marvelstudio":
      case "lionlogo":
      case "wolflogo":
      case "steel3d":
      case "wallgravity":
        if (!one) return m.reply(`Example: ${usedPrefix + command} ${template} |Taylor MD`);
        conn.sendMessage(m.chat, {
          image: {
            url: `https://api.lolhuman.xyz/api/textprome2/${args[0]}?apikey=${Object.entries(APIKeys).find(([ key ]) => key.includes("lolhuman"))?.[1]}&text1=${one}&text2=${two}`
          }
        });
        break;
      case "shadow":
      case "cup":
      case "cup1":
      case "romance":
      case "smoke":
      case "burnpaper":
      case "lovemessage":
      case "undergrass":
      case "love":
      case "coffe":
      case "woodheart":
      case "woodenboard":
      case "summer3d":
      case "wolfmetal":
      case "nature3d":
      case "underwater":
      case "golderrose":
      case "summernature":
      case "letterleaves":
      case "glowingneon":
      case "fallleaves":
      case "flamming":
      case "harrypotter":
      case "carvedwood":
        if (!one) return m.reply(`Example: ${usedPrefix + command} ${template} |Taylor MD`);
        conn.sendMessage(m.chat, {
          image: {
            url: `https://api.lolhuman.xyz/api/photooxy1/${args[0]}?apikey=${Object.entries(APIKeys).find(([ key ]) => key.includes("lolhuman"))?.[1]}&text=${one}`
          }
        });
        break;
      case "tiktok":
      case "arcade8bit":
      case "battlefield4":
      case "pubg":
        if (!one) return m.reply(`Example: ${usedPrefix + command} ${template} |Taylor MD`);
        conn.sendMessage(m.chat, {
          image: {
            url: `https://api.lolhuman.xyz/api/photooxy2/${args[0]}?apikey=${Object.entries(APIKeys).find(([ key ]) => key.includes("lolhuman"))?.[1]}&text1=${one}&text2=${two}`
          }
        });
        break;
      case "wetglass":
      case "multicolor3d":
      case "watercolor":
      case "luxurygold":
      case "galaxywallpaper":
      case "lighttext":
      case "beautifulflower":
      case "puppycute":
      case "royaltext":
      case "heartshaped":
      case "birthdaycake":
      case "galaxystyle":
      case "hologram3d":
      case "greenneon":
      case "glossychrome":
      case "greenbush":
      case "metallogo":
      case "noeltext":
      case "glittergold":
      case "textcake":
      case "starsnight":
      case "wooden3d":
      case "textbyname":
      case "writegalacy":
      case "galaxybat":
      case "snow3d":
      case "birthdayday":
      case "goldplaybutton":
      case "silverplaybutton":
      case "freefire":
        if (!one) return m.reply(`Example: ${usedPrefix + command} ${template} |Taylor MD`);
        conn.sendMessage(m.chat, {
          image: {
            url: `https://api.lolhuman.xyz/api/ephoto1/${args[0]}?apikey=${Object.entries(APIKeys).find(([ key ]) => key.includes("lolhuman"))?.[1]}&text=${one}`
          }
        });
    }
  } catch (e) {
    m.react(eror);
  }
};
handler.help = ["lolmenu <command> <teks>"], handler.tags = ["tools"], handler.command = /^lol|lolmenu$/i;
export default handler;