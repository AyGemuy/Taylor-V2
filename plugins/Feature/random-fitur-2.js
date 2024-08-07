import fetch from "node-fetch";
const handler = async (m, {
  conn,
  usedPrefix,
  text,
  args,
  command
}) => {
  if ("ceritahoror" === command) {
    let res = await fetch(`https://api.lolhuman.xyz/api/ceritahoror?apikey=${Object.entries(APIKeys).find(([ key ]) => key.includes("lolhuman"))?.[1]}`),
      has = (await res.json()).result;
    await conn.sendButton(m.chat, `*Judul:* ${has.title}\n  *Desc:* ${has.desc}\n  *Story:* ${has.story}`, author, has.thumbnail, [
      ["Next", `${usedPrefix + command}`]
    ], fakes, adReply);
  }
  if ("growiki" === command) {
    if (!text) throw `Contoh penggunaan ${usedPrefix}${command} magplant`;
    let res = await fetch(`https://api.lolhuman.xyz/api/growiki?apikey=${Object.entries(APIKeys).find(([ key ]) => key.includes("lolhuman"))?.[1]}&query=${text}`),
      has = (await res.json()).result;
    await conn.sendButton(m.chat, `*Name:* ${has.name}\n  *Desc:* ${has.desc}\n  *prop:* ${has.prop}\n  *info:* ${has.info}\n  *Story:* ${has.prop}\n`, author, has.img, [
      ["Next", `${usedPrefix + command}`]
    ], fakes, adReply);
  }
  if ("growstocks" === command) {
    if (!text) throw `Contoh penggunaan ${usedPrefix}${command} magplant`;
    let res = await fetch(`https://api.lolhuman.xyz/api/growstocks?apikey=${Object.entries(APIKeys).find(([ key ]) => key.includes("lolhuman"))?.[1]}&query=${text}`),
      has = (await res.json()).result;
    await conn.sendButton(m.chat, `*Name:* ${has.name}\n  *Desc:* ${has.desc}\n  *price status:* ${has.price_status}\n  *demand status:* ${has.demand_status}\n  *source:* ${has.source}\n  *edited:* ${has.edited}\n`, author, has.img, [
      ["Next", `${usedPrefix + command}`]
    ], fakes, adReply);
  }
  if ("gsearch" === command) {
    if (!text) throw `Contoh penggunaan ${usedPrefix}${command} magplant`;
    let res = await fetch(`https://api.lolhuman.xyz/api/gsearch?apikey=${Object.entries(APIKeys).find(([ key ]) => key.includes("lolhuman"))?.[1]}&query=${text}`),
      has = (await res.json()).result;
    await conn.sendButton(m.chat, `*Name:* ${has.title}\n  *Desc:* ${has.desc}\n  *price status:* ${has.link}\n`, author, null, [
      ["Next", `${usedPrefix + command}`]
    ], fakes, adReply);
  }
  if ("gsmarena" === command) {
    if (!text) throw `Contoh penggunaan ${usedPrefix}${command} oppo`;
    let res = await fetch(`https://api.lolhuman.xyz/api/gsmarena?apikey=${Object.entries(APIKeys).find(([ key ]) => key.includes("lolhuman"))?.[1]}&query=${text}`),
      has = (await res.json()).result;
    await conn.sendButton(m.chat, `*Name:* ${has.phone_name}\n  *Speed:* ${has.specification.network.speed}\n  *Launch:* ${has.specification.launch.status}\n  *Body:* ${has.specification.body.build}\n  *Dis status:* ${has.specification.display.displaytype}\n  *Plat:* ${has.specification.platform.os}\n  ${has.specification.platform.chipset}\n  ${has.specification.platform.cpu}\n  *Mem:* ${has.specification.memory.internalmemory}\n  *Batre:* ${has.specification.battery.batdescription1}\n`, author, has.phone_image, [
      ["Next", `${usedPrefix + command}`]
    ], fakes, adReply);
  }
  if ("jadwalbola" === command) {
    let f = await fetch(`https://api.lolhuman.xyz/api/jadwalbola?apikey=${Object.entries(APIKeys).find(([ key ]) => key.includes("lolhuman"))?.[1]}`),
      teks = (await f.json()).result.map(v => `\n*Hari:* ${v.hari}\n  *Jam:* ${v.jam}\n  *Event:* ${v.event}\n  *Match:* ${v.match}\n  *Tv:* ${v.tv}\n      `.trim()).filter(v => v).join("\n\n▣═━–〈 *SEARCH* 〉–━═▣\n\n");
    await conn.sendButton(m.chat, teks, wm, null, [
      ["Search!", `${usedPrefix + command}`]
    ], fakes, adReply);
  }
  if ("jadwaltv" === command) {
    let json = await fetch(`https://api.lolhuman.xyz/api/jadwaltv/now?apikey=${Object.entries(APIKeys).find(([ key ]) => key.includes("lolhuman"))?.[1]}`),
      has = await json.json();
    await conn.sendButton(m.chat, `\n  *antv:* ${has.result.antv}\n  *gtv:* ${has.result.gtv}\n  *indosiar:* ${has.result.indosiar}\n  *inewstv:* ${has.result.inewstv}\n  *kompastv:* ${has.result.kompastv}\n  *metrotv:* ${has.result.metrotv}\n  *mnctv:* ${has.result.mnctv}\n  *nettv:* ${has.result.nettv}\n  *rcti:* ${has.result.rcti}\n  *rtv:* ${has.result.rtv}\n  *sctv:* ${has.result.sctv}\n  *trans7:* ${has.result.trans7}\n  *tvone:* ${has.result.tvone}\n  *tvri:* ${has.result.tvri}\n  `, author, has.phone_image, [
      ["Next", `${usedPrefix + command}`]
    ], fakes, adReply);
  }
  if ("jalantikus" === command) {
    let f = await fetch(`https://api.lolhuman.xyz/api/jalantikus?apikey=${Object.entries(APIKeys).find(([ key ]) => key.includes("lolhuman"))?.[1]}`),
      teks = (await f.json()).result.map(v => `\n*Name:* ${v.title}\n  *time:* ${v.time}\n  *link:* ${v.link}\n  *category:* ${v.category}\n      `.trim()).filter(v => v).join("\n\n▣═━–〈 *SEARCH* 〉–━═▣\n\n");
    await conn.sendButton(m.chat, teks, wm, null, [
      ["Search!", `${usedPrefix + command}`]
    ], fakes, adReply);
  }
  if ("jaraktempuh" === command) {
    if (!args[0]) throw `Contoh penggunaan ${usedPrefix}${command} aceh banten`;
    let f = await fetch(`https://api.lolhuman.xyz/api/jaraktempuh?apikey=${Object.entries(APIKeys).find(([ key ]) => key.includes("lolhuman"))?.[1]}&kota1=${args[0]}&kota2=${args[1]}`),
      teks = (await f.json()).result.map(v => `\n*Dari:* ${v.from.name}\n*Ke:* ${v.to.name}\n\n*Jarak:* ${v.jarak}\n*kereta api:* ${v.kereta_api}\n*pesawat:* ${v.pesawat}\n*mobil:* ${v.mobil}\n*motor:* ${v.motor}\n*jalan kaki:* ${v.jalan_kaki}\n      `.trim()).filter(v => v).join("\n\n▣═━–〈 *SEARCH* 〉–━═▣\n\n");
    await conn.sendButton(m.chat, teks, wm, null, [
      ["Search!", `${usedPrefix + command}`]
    ], fakes, adReply);
  }
  if ("random" === command) {
    const listMessage = {
      text: `⚡ Silakan pilih tema di tombol di bawah...\n\nKetik ulang *${usedPrefix + command}* teks anda untuk mengubah nsfw lagi`,
      footer: wm,
      title: `⎔───「 ${command} 」───⎔`,
      buttonText: "☂️ Random Disini ☂️",
      sections: [{
        title: "Theme",
        rows: [{
          title: "ahegao",
          rowId: usedPrefix + "dlrandom ahegao"
        }, {
          title: "animearmpits",
          rowId: usedPrefix + "dlrandom animearmpits"
        }, {
          title: "animebooty",
          rowId: usedPrefix + "dlrandom animebooty"
        }, {
          title: "animefeets",
          rowId: usedPrefix + "dlrandom animefeets"
        }, {
          title: "animethighss",
          rowId: usedPrefix + "dlrandom animethighss"
        }, {
          title: "biganimetiddies",
          rowId: usedPrefix + "dlrandom biganimetiddies"
        }, {
          title: "blowjob",
          rowId: usedPrefix + "dlrandom blowjob"
        }, {
          title: "chiisaihentai",
          rowId: usedPrefix + "dlrandom chiisaihentai"
        }, {
          title: "ecchi",
          rowId: usedPrefix + "dlrandom ecchi"
        }, {
          title: "hentai4everyone",
          rowId: usedPrefix + "dlrandom hentai4everyone"
        }, {
          title: "hentaifemdom",
          rowId: usedPrefix + "dlrandom hentaifemdom"
        }, {
          title: "hentai",
          rowId: usedPrefix + "dlrandom hentai"
        }, {
          title: "hololewd",
          rowId: usedPrefix + "dlrandom hololewd"
        }, {
          title: "lewdanimegirls",
          rowId: usedPrefix + "dlrandom lewdanimegirls"
        }, {
          title: "loli",
          rowId: usedPrefix + "dlrandom loli"
        }, {
          title: "milf",
          rowId: usedPrefix + "dlrandom milf"
        }, {
          title: "neko",
          rowId: usedPrefix + "dlrandom neko"
        }, {
          title: "sideoppai",
          rowId: usedPrefix + "dlrandom sideoppai"
        }, {
          title: "trap",
          rowId: usedPrefix + "dlrandom trap"
        }, {
          title: "waifu",
          rowId: usedPrefix + "dlrandom waifu"
        }, {
          title: "yaoi",
          rowId: usedPrefix + "dlrandom yaoi"
        }]
      }]
    };
    conn.sendMessage(m.chat, listMessage, {
      quoted: {
        key: {
          participant: "0@s.whatsapp.net"
        },
        message: {
          documentMessage: {
            title: wm,
            jpegThumbnail: Buffer.alloc(0)
          }
        }
      }
    });
  }
  if ("random2" === command) {
    const listMessage = {
      text: `⚡ Silakan pilih tema di tombol di bawah...\n\nKetik ulang *${usedPrefix + command}* teks anda untuk mengubah nsfw lagi`,
      footer: wm,
      title: `⎔───「 ${command} 」───⎔`,
      buttonText: "☂️ Random Disini ☂️",
      sections: [{
        title: "Theme",
        rows: [{
          title: "anal",
          rowId: usedPrefix + "dlrandom2 anal"
        }, {
          title: "baka",
          rowId: usedPrefix + "dlrandom2 baka"
        }, {
          title: "bj",
          rowId: usedPrefix + "dlrandom2 bj"
        }, {
          title: "blowjob",
          rowId: usedPrefix + "dlrandom2 blowjob"
        }, {
          title: "classic",
          rowId: usedPrefix + "dlrandom2 classic"
        }, {
          title: "cuddle",
          rowId: usedPrefix + "dlrandom2 cuddle"
        }, {
          title: "cum",
          rowId: usedPrefix + "dlrandom2 cum"
        }, {
          title: "cum_jpg",
          rowId: usedPrefix + "dlrandom2 cum_jpg"
        }, {
          title: "ero",
          rowId: usedPrefix + "dlrandom2 ero"
        }, {
          title: "erofeet",
          rowId: usedPrefix + "dlrandom2 erofeet"
        }, {
          title: "erok",
          rowId: usedPrefix + "dlrandom2 erok"
        }, {
          title: "erokemo",
          rowId: usedPrefix + "dlrandom2 erokemo"
        }, {
          title: "eron",
          rowId: usedPrefix + "dlrandom2 eron"
        }, {
          title: "eroyuri",
          rowId: usedPrefix + "dlrandom2 eroyuri"
        }, {
          title: "feed",
          rowId: usedPrefix + "dlrandom2 feed"
        }, {
          title: "feet",
          rowId: usedPrefix + "dlrandom2 feet"
        }, {
          title: "feetg",
          rowId: usedPrefix + "dlrandom2 feetg"
        }, {
          title: "femdom",
          rowId: usedPrefix + "dlrandom2 femdom"
        }, {
          title: "fox_girl",
          rowId: usedPrefix + "dlrandom2 fox_girl"
        }, {
          title: "futanari",
          rowId: usedPrefix + "dlrandom2 futanari"
        }, {
          title: "gasm",
          rowId: usedPrefix + "dlrandom2 gasm"
        }, {
          title: "hentai",
          rowId: usedPrefix + "dlrandom2 hentai"
        }, {
          title: "holo",
          rowId: usedPrefix + "dlrandom2 holo"
        }, {
          title: "holoero",
          rowId: usedPrefix + "dlrandom2 holoero"
        }, {
          title: "hololewd",
          rowId: usedPrefix + "dlrandom2 hololewd"
        }, {
          title: "kemonomimi",
          rowId: usedPrefix + "dlrandom2 kemonomimi"
        }, {
          title: "keta",
          rowId: usedPrefix + "dlrandom2 keta"
        }, {
          title: "kiss",
          rowId: usedPrefix + "dlrandom2 kiss"
        }, {
          title: "kuni",
          rowId: usedPrefix + "dlrandom2 kuni"
        }, {
          title: "les",
          rowId: usedPrefix + "dlrandom2 les"
        }, {
          title: "lewd",
          rowId: usedPrefix + "dlrandom2 lewd"
        }, {
          title: "lewdk",
          rowId: usedPrefix + "dlrandom2 lewdk"
        }, {
          title: "lewdkemo",
          rowId: usedPrefix + "dlrandom2 lewdkemo"
        }, {
          title: "neko",
          rowId: usedPrefix + "dlrandom2 neko"
        }, {
          title: "ngif",
          rowId: usedPrefix + "dlrandom2 ngif"
        }, {
          title: "nsfw_avatar",
          rowId: usedPrefix + "dlrandom2 nsfw_avatar"
        }, {
          title: "nsfw_neko_gif",
          rowId: usedPrefix + "dlrandom2 nsfw_neko_gif"
        }, {
          title: "poke",
          rowId: usedPrefix + "dlrandom2 poke"
        }, {
          title: "pussy",
          rowId: usedPrefix + "dlrandom2 pussy"
        }, {
          title: "pussy_jpg",
          rowId: usedPrefix + "dlrandom2 pussy_jpg"
        }, {
          title: "random_hentai_gif",
          rowId: usedPrefix + "dlrandom2 random_hentai_gif"
        }, {
          title: "smug",
          rowId: usedPrefix + "dlrandom2 smug"
        }, {
          title: "solo",
          rowId: usedPrefix + "dlrandom2 solo"
        }, {
          title: "solog",
          rowId: usedPrefix + "dlrandom2 solog"
        }, {
          title: "tickle",
          rowId: usedPrefix + "dlrandom2 tickle"
        }, {
          title: "tits",
          rowId: usedPrefix + "dlrandom2 tits"
        }, {
          title: "trap",
          rowId: usedPrefix + "dlrandom2 trap"
        }, {
          title: "waifu",
          rowId: usedPrefix + "dlrandom2 waifu"
        }, {
          title: "wallpaper",
          rowId: usedPrefix + "dlrandom2 wallpaper"
        }, {
          title: "yuri",
          rowId: usedPrefix + "dlrandom2 yuri"
        }]
      }]
    };
    conn.sendMessage(m.chat, listMessage, {
      quoted: {
        key: {
          participant: "0@s.whatsapp.net"
        },
        message: {
          documentMessage: {
            title: wm,
            jpegThumbnail: Buffer.alloc(0)
          }
        }
      }
    });
  }
};
handler.command = handler.help = ["ceritahoror", "growiki", "growstocks", "gsearch", "gsmarena", "jadwalbola", "jadwaltv", "jalantikus", "jaraktempuh", "random", "random2"],
  handler.tags = ["random"];
export default handler;