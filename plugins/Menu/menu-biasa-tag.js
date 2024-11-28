import { promises, readFileSync } from "fs";
import { join } from "path";
import { xpRange } from "../../lib/levelling.js";
import { clockString, pickRandom } from "../../lib/other-function.js";
import moment from "moment-timezone";
import os from "os";
import fs from "fs";
import fetch from "node-fetch";
const { fetchLatestBaileysVersion, fetchLatestWaWebVersion } = await (
  await import("@whiskeysockets/baileys")
).default;
const defaultMenu = {
  before: `\`.\`         %dash

%m1 *\`U S E R\`*
%m2 *Name:* %name
%m2 *Tag:* %tag
%m2 *Status:* %prems
%m2 *Limit:* %limit
%m2 *Money:* %money
%m2 *Role:* %role
%m2 *Level:* %level [ %xp4levelup Xp For Levelup]
%m2 *Xp:* %exp / %maxexp
%m2 *Total Xp:* %totalexp
%m3

%m1 *\`T O D A Y\`*
%m2 *%ucpn*
%m2 *Days:* %week %weton
%m2 *Date:* %date
%m2 *Islamic Date:* %dateIslamic
%m2 *Time:* %wita
%m3

%m1 *\`I N F O\`*
%m2 *Bot Name:* %me
%m2 *Mode:* %mode
%m2 *Platform:* %platform
%m2 *Type:* %processName
%m2 *Baileys:* %bailVer
%m2 *Prefix:* %_p [ %isPrefix ]
%m2 *Uptime:* %muptime
%m2 *Database:* %rtotalreg dari %totalreg
%m3

%m1 *\`I N F O  C M D\`*
%m4 *%totalfeatures* Command
%m4 *Ⓖ* = Group
%m4 *Ⓟ* = Private
%m4 *Ⓞ* = Owner
%m4 *🅟* = Premium
%m4 *Ⓛ* = Limit
%m4 *❌* = Error
%m3
%readmore
`.trimStart(),
  header: "%cc *`%category`* %c1",
  body: "%c2 _%cmd_ %isGroup%isPrivate%isOwner%isPremium%isLimit%isError",
  footer: "%c3",
  after: "%c4         `%me`",
};
const handler = async (m, { conn, usedPrefix: _p, __dirname, args }) => {
  let isPrefix = opts.multiprefix
    ? "Multi"
    : opts.singleprefix
      ? "Single"
      : opts.noprefix
        ? "No"
        : m.prefix
          ? "Multi"
          : "No";
  const { version } = await fetchLatestWaWebVersion().catch(() =>
    fetchLatestBaileysVersion(),
  );
  const bailVer = `V${version.join(".")}`;
  const processName = `${process.title.split("/").pop().toUpperCase()}, ${process.version.toUpperCase()}`;
  let soun = [
    "aku-ngakak",
    "anjay",
    "ara-ara2",
    "ara-ara-cowok",
    "ara-ara",
    "arigatou",
    "assalamualaikum",
    "asu",
    "ayank",
    "bacot",
    "bahagia-aku",
    "baka",
    "bansos",
    "beat-box2",
    "beat-box",
    "biasalah",
    "bidadari",
    "bot",
    "buka-pintu",
    "canda-anjing",
    "cepetan",
    "china",
    "cuekin-terus",
    "daisuki-dayo",
    "daisuki",
    "dengan-mu",
    "Donasiku",
    "gaboleh-gitu",
    "gak-lucu",
    "gamau",
    "gay",
    "gelay",
    "gitar",
    "gomenasai",
    "hai-bot",
    "hampa",
    "hayo",
    "hp-iphone",
    "ih-wibu",
    "i-like-you",
    "india",
    "karna-lo-wibu",
    "kiss",
    "kontol",
    "ku-coba",
    "maju-wibu",
    "makasih",
    "mastah",
    "menuasli",
    "menuku",
    "menu",
    "MenuYuki",
    "nande-nande",
    "nani",
    "ngadi-ngadi",
    "nikah",
    "nuina",
    "onichan",
    "ownerku",
    "owner-sange",
    "pak-sapardi",
    "pale",
    "pantek",
    "pasi-pasi",
    "punten",
    "sayang",
    "siapa-sih",
    "sudah-biasa",
    "summertime",
    "tanya-bapak-lu",
    "to-the-bone",
    "wajib",
    "waku",
    "woi",
    "yamete",
    "yowaimo",
    "yoyowaimo",
  ].getRandom();
  let vn =
    "https://raw.githubusercontent.com/AyGemuy/HAORI-API/main/audio/" +
    soun +
    ".mp3";
  m.react(wait);
  let tags;
  let teks = `${args[0]}`.toLowerCase();
  let pp = [thumbdoc, thumb].getRandom() || fla + "menu " + teks;
  let arrayMenu = [
    "all",
    "absen",
    "admin",
    "advanced",
    "anonymous",
    "audio",
    "ai",
    "gpt",
    "Baileys",
    "database",
    "downloader",
    "edukasi",
    "fun",
    "game",
    "genshin",
    "group",
    "host",
    "info",
    "internet",
    "jadian",
    "jadibot",
    "kerang",
    "main",
    "maker",
    "misc",
    "music",
    "nocategory",
    "nsfw",
    "nulis",
    "owner",
    "premium",
    "primbon",
    "quotes",
    "quran",
    "random",
    "rpg",
    "sticker",
    "tools",
    "vote",
    "xp",
    "store",
    "virus",
    "thnks",
  ];
  if (!arrayMenu.includes(teks)) teks = "404";
  if (teks === "all")
    tags = {
      main: "Main",
      rpg: "RolePlay Games",
      xp: "Exp & Limit",
      jadian: "Jadian",
      sticker: "Sticker",
      edukasi: "Edukasi",
      quran: "Al Quran",
      ai: "Ai",
      gpt: "Gpt",
      tools: "Tools",
      kerang: "Kerang Ajaib",
      primbon: "Primbon",
      fun: "Fun",
      game: "Game",
      genshin: "Genshin Impact",
      quotes: "Quotes",
      audio: "Audio",
      maker: "Maker",
      misc: "Misc",
      music: "Music",
      downloader: "Downloader",
      internet: "Internet",
      random: "Random",
      nsfw: "Nsfw",
      nulis: "MagerNulis & Logo",
      anonymous: "Anonymous Chat",
      database: "Database",
      admin: "Admin",
      group: "Group",
      vote: "Voting",
      absen: "Absen",
      premium: "Premium",
      advanced: "Advanced",
      info: "Info",
      owner: "Owner",
      jadibot: "Jadi Bot",
      host: "Host",
      Baileys: "Baileys",
      store: "Store Menu",
      virus: "Virtex",
      thnks: "Thanks",
      nocategory: "No Category",
    };
  if (teks === "absen")
    tags = {
      absen: "Absen",
    };
  if (teks === "admin")
    tags = {
      admin: "Admin",
    };
  if (teks === "advanced")
    tags = {
      advanced: "Advanced",
    };
  if (teks === "anonymous")
    tags = {
      anonymous: "Anonymous Chat",
    };
  if (teks === "audio")
    tags = {
      audio: "Audio",
    };
  if (teks === "Baileys")
    tags = {
      Baileys: "Baileys",
    };
  if (teks === "database")
    tags = {
      database: "Database",
    };
  if (teks === "downloader")
    tags = {
      downloader: "Downloader",
    };
  if (teks === "edukasi")
    tags = {
      edukasi: "Edukasi",
    };
  if (teks === "fun")
    tags = {
      fun: "Fun",
    };
  if (teks === "game")
    tags = {
      game: "Game",
    };
  if (teks === "genshin")
    tags = {
      genshin: "Genshin Impact",
    };
  if (teks === "group")
    tags = {
      group: "Group",
    };
  if (teks === "host")
    tags = {
      host: "Host",
    };
  if (teks === "info")
    tags = {
      info: "Info",
    };
  if (teks === "internet")
    tags = {
      internet: "Internet",
    };
  if (teks === "jadian")
    tags = {
      jadian: "Jadian",
    };
  if (teks === "jadibot")
    tags = {
      jadibot: "Jadi Bot",
    };
  if (teks === "kerang")
    tags = {
      kerang: "Kerang Ajaib",
    };
  if (teks === "main")
    tags = {
      main: "Main",
    };
  if (teks === "maker")
    tags = {
      maker: "Maker",
    };
  if (teks === "misc")
    tags = {
      misc: "Misc",
    };
  if (teks === "music")
    tags = {
      music: "Music",
    };
  if (teks === "nsfw")
    tags = {
      nsfw: "Nsfw",
    };
  if (teks === "nulis")
    tags = {
      nulis: "MagerNulis & Logo",
    };
  if (teks === "owner")
    tags = {
      owner: "Owner",
    };
  if (teks === "premium")
    tags = {
      premium: "Premium",
    };
  if (teks === "primbon")
    tags = {
      primbon: "Primbon",
    };
  if (teks === "quotes")
    tags = {
      quotes: "Quotes",
    };
  if (teks === "quran")
    tags = {
      quran: "Al Quran",
    };
  if (teks === "ai")
    tags = {
      ai: "AI",
    };
  if (teks === "gpt")
    tags = {
      gpt: "GPT",
    };
  if (teks === "random")
    tags = {
      random: "Random",
    };
  if (teks === "rpg")
    tags = {
      rpg: "RolePlay Games",
    };
  if (teks === "sticker")
    tags = {
      sticker: "Sticker",
    };
  if (teks === "tools")
    tags = {
      tools: "Tools",
    };
  if (teks === "vote")
    tags = {
      vote: "Voting",
    };
  if (teks === "xp")
    tags = {
      xp: "Exp & Limit",
    };
  if (teks === "store")
    tags = {
      store: "Store Menu",
    };
  if (teks === "virus")
    tags = {
      virus: "𐐪-〚 Virtex 〛-𐑂",
    };
  if (teks === "thnks")
    tags = {
      thnks: "Thanks To",
    };
  if (teks === "nocategory")
    tags = {
      nocategory: "No Category",
    };
  try {
    let dash = dashmenu;
    let m1 = dmenut;
    let m2 = dmenub;
    let m3 = dmenuf;
    let m4 = dmenub2;
    let cc = cmenut;
    let c1 = cmenuh;
    let c2 = cmenub;
    let c3 = cmenuf;
    let c4 = cmenua;
    let lprem = lopr;
    let llim = lolm;
    let tag = `@${m.sender.split("@")[0]}`;
    let glb = db.data.users;
    let usrs = glb[m.sender];
    let spas = "                ";
    let spas2 = "         ";
    let mojis = " - ";
    let index = 0;
    let ktnya = ["Tampilkan sekarang", "Pilih ini", "Aku pilih yang ini"];
    let ktx = ktnya.getRandom();
    let wib = moment.tz("Asia/Jakarta").format("HH:mm:ss");
    let wibh = moment.tz("Asia/Makassar").format("HH");
    let wibm = moment.tz("Asia/Makassar").format("mm");
    let wibs = moment.tz("Asia/Makassar").format("ss");
    let wita = moment.tz("Asia/Makassar").format("HH:mm:ss");
    let waktuwita = `${wibh} H ${wibm} M ${wibs} S`;
    let mode = opts["self"] ? "Private" : "Publik";
    let _package =
      JSON.parse(
        await promises
          .readFile(join(__dirname, "../package.json"))
          .catch((_) => ({})),
      ) || {};
    let { age, exp, limit, level, role, registered, money } = glb[m.sender];
    let { min, xp, max } = xpRange(level, multiplier);
    let name = conn.getName(m.sender);
    let premium = glb[m.sender].premiumTime;
    let prems = `${premium > 0 ? "Premium" : "Free"}`;
    let platform = os.platform();
    let ucpn = `${ucapan}`;
    let d = new Date(new Date() + 36e5);
    let locale = "id";
    let weton = ["Pahing", "Pon", "Wage", "Kliwon", "Legi"][
      Math.floor(d / 846e5) % 5
    ];
    let week = d.toLocaleDateString(locale, {
      weekday: "long",
    });
    let date = d.toLocaleDateString(locale, {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
    let dateIslamic = Intl.DateTimeFormat(locale + "-TN-u-ca-islamic", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(d);
    let time = d.toLocaleTimeString(locale, {
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    });
    let _uptime = process.uptime() * 1e3;
    let _muptime;
    if (process.send) {
      process.send("uptime");
      _muptime =
        (await new Promise((resolve) => {
          process.once("message", resolve);
          setTimeout(resolve, 1e3);
        })) * 1e3;
    }
    let muptime = clockString(_muptime);
    let uptime = clockString(_uptime);
    const sections = [
      {
        title: spas + htki + " MAIN " + htka,
        rows: [
          {
            header: "⚡ SPEED BOT",
            id: _p + "ping",
            title: "",
            description: "Menampilkan kecepatan respon BOT",
          },
          {
            header: "💌 OWNER BOT",
            id: _p + "owner",
            title: "",
            description: "Menampilkan List owner BOT",
          },
          {
            header: "📔 SCRIPT BOT",
            id: _p + "sc",
            title: "",
            description: `Source Code`,
          },
        ],
      },
      {
        title: spas + htki + " SUPPORT " + htka,
        rows: [
          {
            header: "🔖 SEWA",
            id: _p + "sewa",
            title: "",
            description: "Menampilkan list harga sewa BOT",
          },
          {
            header: "🌟 LIST PREMIUM",
            id: _p + "premlist",
            title: "",
            description: "Menampilkan list harga premium",
          },
          {
            header: "💹 DONASI",
            id: _p + "donasi",
            title: "",
            description: "Support BOT agar lebih fast respon",
          },
        ],
      },
      {
        title: spas + htki + " MENU " + htka,
        rows: [
          {
            header: ++index + "." + spas + "🧧 All Menu".toUpperCase(),
            id: _p + "menulistbiasa all",
            title: "",
            description: spas + spas2 + mojis + ktx,
          },
          {
            header: ++index + "." + spas + "🗒️ Absen Menu".toUpperCase(),
            id: _p + "menulistbiasa absen",
            title: "",
            description: spas + spas2 + mojis + ktx,
          },
          {
            header: ++index + "." + spas + "🤵‍ Admin Menu".toUpperCase(),
            id: _p + "menulistbiasa admin",
            title: "",
            description: spas + spas2 + mojis + ktx,
          },
          {
            header: ++index + "." + spas + "🧰 Advanced Menu".toUpperCase(),
            id: _p + "menulistbiasa advanced",
            title: "",
            description: spas + spas2 + mojis + ktx,
          },
          {
            header: ++index + "." + spas + "🎭 Anonymous Menu".toUpperCase(),
            id: _p + "menulistbiasa anonymous",
            title: "",
            description: spas + spas2 + mojis + ktx,
          },
          {
            header: ++index + "." + spas + "🎙️ Audio Menu".toUpperCase(),
            id: _p + "menulistbiasa audio",
            title: "",
            description: spas + spas2 + mojis + ktx,
          },
          {
            header: ++index + "." + spas + "🤖 Baileys Menu".toUpperCase(),
            id: _p + "menulistbiasa Baileys",
            title: "",
            description: spas + spas2 + mojis + ktx,
          },
          {
            header: ++index + "." + spas + "💾 Database Menu".toUpperCase(),
            id: _p + "menulistbiasa database",
            title: "",
            description: spas + spas2 + mojis + ktx,
          },
          {
            header: ++index + "." + spas + "📥 Downloader Menu".toUpperCase(),
            id: _p + "menulistbiasa downloader",
            title: "",
            description: spas + spas2 + mojis + ktx,
          },
          {
            header: ++index + "." + spas + "📔 Edukasi Menu".toUpperCase(),
            id: _p + "menulistbiasa edukasi",
            title: "",
            description: spas + spas2 + mojis + ktx,
          },
          {
            header: ++index + "." + spas + "🪄 Fun Menu".toUpperCase(),
            id: _p + "menulistbiasa fun",
            title: "",
            description: spas + spas2 + mojis + ktx,
          },
          {
            header: ++index + "." + spas + "🎮 Game Menu".toUpperCase(),
            id: _p + "menulistbiasa game",
            title: "",
            description: spas + spas2 + mojis + ktx,
          },
          {
            header: ++index + "." + spas + "⚡ Genshin Menu".toUpperCase(),
            id: _p + "menulistbiasa genshin",
            title: "",
            description: spas + spas2 + mojis + ktx,
          },
          {
            header: ++index + "." + spas + "👨‍👩‍👦‍👦 Group Menu".toUpperCase(),
            id: _p + "menulistbiasa group",
            title: "",
            description: spas + spas2 + mojis + ktx,
          },
          {
            header: ++index + "." + spas + "🖥️ Host Menu".toUpperCase(),
            id: _p + "menulistbiasa host",
            title: "",
            description: spas + spas2 + mojis + ktx,
          },
          {
            header: ++index + "." + spas + "ℹ️ Info Menu".toUpperCase(),
            id: _p + "menulistbiasa info",
            title: "",
            description: spas + spas2 + mojis + ktx,
          },
          {
            header: ++index + "." + spas + "📡 Internet Menu".toUpperCase(),
            id: _p + "menulistbiasa internet",
            title: "",
            description: spas + spas2 + mojis + ktx,
          },
          {
            header: ++index + "." + spas + "💌 Jadian Menu".toUpperCase(),
            id: _p + "menulistbiasa jadian",
            title: "",
            description: spas + spas2 + mojis + ktx,
          },
          {
            header: ++index + "." + spas + "🗝️ Jadibot Menu".toUpperCase(),
            id: _p + "menulistbiasa jadibot",
            title: "",
            description: spas + spas2 + mojis + ktx,
          },
          {
            header: ++index + "." + spas + "🐚 Kerang Menu".toUpperCase(),
            id: _p + "menulistbiasa kerang",
            title: "",
            description: spas + spas2 + mojis + ktx,
          },
          {
            header: ++index + "." + spas + "📮 Main Menu".toUpperCase(),
            id: _p + "menulistbiasa main",
            title: "",
            description: spas + spas2 + mojis + ktx,
          },
          {
            header: ++index + "." + spas + "🎨 Maker Menu".toUpperCase(),
            id: _p + "menulistbiasa maker",
            title: "",
            description: spas + spas2 + mojis + ktx,
          },
          {
            header: ++index + "." + spas + "🎛 Misc Menu".toUpperCase(),
            id: _p + "menulistbiasa misc",
            title: "",
            description: spas + spas2 + mojis + ktx,
          },
          {
            header: ++index + "." + spas + "🎶 Music Menu".toUpperCase(),
            id: _p + "menulistbiasa music",
            title: "",
            description: spas + spas2 + mojis + ktx,
          },
          {
            header: ++index + "." + spas + "❌ Nocategory Menu".toUpperCase(),
            id: _p + "menulistbiasa nocategory",
            title: "",
            description: spas + spas2 + mojis + ktx,
          },
          {
            header: ++index + "." + spas + "🔞 Nsfw Menu".toUpperCase(),
            id: _p + "menulistbiasa nsfw",
            title: "",
            description: spas + spas2 + mojis + ktx,
          },
          {
            header: ++index + "." + spas + "✏️ Nulis Menu".toUpperCase(),
            id: _p + "menulistbiasa nulis",
            title: "",
            description: spas + spas2 + mojis + ktx,
          },
          {
            header: ++index + "." + spas + "🧑🏻‍💻 Owner Menu".toUpperCase(),
            id: _p + "menulistbiasa owner",
            title: "",
            description: spas + spas2 + mojis + ktx,
          },
          {
            header: ++index + "." + spas + "💎 Premium Menu".toUpperCase(),
            id: _p + "menulistbiasa premium",
            title: "",
            description: spas + spas2 + mojis + ktx,
          },
          {
            header: ++index + "." + spas + "📜 Primbon Menu".toUpperCase(),
            id: _p + "menulistbiasa primbon",
            title: "",
            description: spas + spas2 + mojis + ktx,
          },
          {
            header: ++index + "." + spas + "💬 Quotes Menu".toUpperCase(),
            id: _p + "menulistbiasa quotes",
            title: "",
            description: spas + spas2 + mojis + ktx,
          },
          {
            header: ++index + "." + spas + "🕋 Quran Menu".toUpperCase(),
            id: _p + "menulistbiasa quran",
            title: "",
            description: spas + spas2 + mojis + ktx,
          },
          {
            header: ++index + "." + spas + "🎊 Random Menu".toUpperCase(),
            id: _p + "menulistbiasa random",
            title: "",
            description: spas + spas2 + mojis + ktx,
          },
          {
            header: ++index + "." + spas + "🕹️ RPG Menu".toUpperCase(),
            id: _p + "menulistbiasa rpg",
            title: "",
            description: spas + spas2 + mojis + ktx,
          },
          {
            header: ++index + "." + spas + "🏮 Sticker Menu".toUpperCase(),
            id: _p + "menulistbiasa sticker",
            title: "",
            description: spas + spas2 + mojis + ktx,
          },
          {
            header: ++index + "." + spas + "🛠️ Tools Menu".toUpperCase(),
            id: _p + "menulistbiasa tools",
            title: "",
            description: spas + spas2 + mojis + ktx,
          },
          {
            header: ++index + "." + spas + "📊 Vote Menu".toUpperCase(),
            id: _p + "menulistbiasa vote",
            title: "",
            description: spas + spas2 + mojis + ktx,
          },
          {
            header: ++index + "." + spas + "✉️ XP Menu".toUpperCase(),
            id: _p + "menulistbiasa xp",
            title: "",
            description: spas + spas2 + mojis + ktx,
          },
        ],
      },
      {
        title: spas + htki + " OTHER " + htka,
        rows: [
          {
            header: "🏪 STORE",
            id: _p + "menulistbiasa store",
            title: "",
            description: "Menampilkan list store",
          },
          {
            header: "🦠 VIRUS",
            id: _p + "menulistbiasa virus",
            title: "",
            description: "Menampilkan list virus",
          },
          {
            header: "❌ NO CATEGORY",
            id: _p + "menulistbiasa nocategory",
            title: "",
            description: "Menu tanpa kategori",
          },
        ],
      },
    ];
    let tek = `👋 Hai, ${ucapan} ${conn.getName(m.sender)}

${spas} *[ U S E R  I N F O ]*
👥 *ɴᴀᴍᴇ:* ${usrs.registered ? usrs.name : conn.getName(m.sender)}
📧 *ᴛᴀɢs:* @${m.sender.split("@")[0]}
🔒 *sᴛᴀᴛᴜs:* ${m.sender.split("@")[0] === nomorown ? "Developer" : usrs.premiumTime >= 1 ? "Premium User" : "Free User"}
💎 *ᴘʀᴇᴍɪᴜᴍ:* ${usrs.premiumTime > 1 ? "Yes" : "No"}

${spas} *[ S T A T U S  I N F O ]*
🖥️ *ᴜᴘᴛɪᴍᴇ:* ${muptime}
⏰ *ᴛɪᴍᴇ:* ${waktuwita}
🕵🏻‍♂️ *ᴜsᴇʀs:* ${Object.keys(glb).length}
⚡ *ʟɪᴍɪᴛ:* ${usrs.limit}
📣 *ʟᴇᴠᴇʟ:* ${usrs.level}
🧰 *ʀᴏʟᴇ:* ${usrs.role}${
      usrs.premiumTime > 1
        ? `
🧧 *ᴇxᴘɪʀᴇᴅ ᴘʀᴇᴍɪᴜᴍ:*
${clockString(usrs.premiumTime - new Date())}`
        : ""
    }
`;
    const listMessage = {
      text: tek,
      footer:
        "📮 *Note:* Jika menemukan bug, error atau kesulitan dalam penggunaan silahkan laporkan/tanyakan kepada Owner",
      mentions: conn.parseMention(tek),
      title: htki + " *LIST MENU* " + htka,
      buttonText: " CLICK HERE " + emojis,
      sections: sections,
    };
    if (teks === "404") {
      let sects = sections[2].rows
        .map((v, index) => {
          return `${v.header.slice(16)}\n${v.id}`.trim();
        })
        .filter((v) => v)
        .join("\n\n");
      let caption = tek + "\n\n" + spas + "*[ C O M M A N D ]*\n" + sects;
      caption = caption.trim();
      db.data.dbbot.temamenu = db.data.dbbot.temamenu || {
        id: 0,
      };
      const { id } = db.data.dbbot.temamenu;
      switch (id) {
        case 0:
          return await conn.sendButtonCta(
            m.chat,
            [
              [
                listMessage.text,
                listMessage.footer,
                logo,
                [["Menu List", _p + "menulist"]],
                null,
                [["Official Group", sgc]],
                [[listMessage.buttonText, listMessage.sections]],
              ],
            ],
            m,
            {
              contextInfo: {
                mentionedJid: [m.sender],
              },
            },
          );
          break;
        case 1:
          return await conn.reply(m.chat, caption, m, {
            contextInfo: {
              mentionedJid: [m.sender],
            },
          });
          break;
        case 2:
          return await conn.reply(m.chat, caption, m, {
            contextInfo: {
              mentionedJid: [m.sender],
              thumbnail: await conn.resize(
                [logo, imagebot].getRandom(),
                300,
                150,
              ),
            },
          });
          break;
        case 3:
          return await conn.reply(m.chat, caption, m, {
            contextInfo: {
              mentionedJid: [m.sender],
              body: bottime,
              mediaType: 1,
              previewType: 0,
              renderLargerThumbnail: true,
              thumbnailUrl: [logo, imagebot].getRandom(),
              sourceUrl: "",
            },
          });
          break;
        case 4:
        case 5:
        case 6:
          return await conn.sendFile(
            m.chat,
            Buffer.alloc(0),
            "D A S H B O A R D",
            caption,
            fakes,
            false,
            {
              mimetype: [dpptx, ddocx, dxlsx, dpdf, drtf].getRandom(),
              fileLength: fsizedoc,
              pageCount: fpagedoc,
              jpegThumbnail: await conn.resize(
                [thumbdoc, thumb].getRandom(),
                300,
                150,
              ),
              contextInfo: {
                mentionedJid: [m.sender],
                body: id === 6 ? bottime : undefined,
                mediaType: id === 6 ? 1 : undefined,
                previewType: id === 6 ? 0 : undefined,
                renderLargerThumbnail: id === 6 ? true : undefined,
                thumbnailUrl:
                  id === 6 ? [logo, imagebot].getRandom() : undefined,
                sourceUrl: "",
              },
            },
          );
          break;
        case 7:
          return await conn.relayMessage(
            m.chat,
            {
              requestPaymentMessage: {
                currencyCodeIso4217: "INR",
                amount1000: fsizedoc,
                requestFrom: "0@s.whatsapp.net",
                noteMessage: {
                  extendedTextMessage: {
                    text: caption,
                    contextInfo: {
                      mentionedJid: [m.sender],
                    },
                  },
                },
              },
            },
            {},
          );
          break;
        case 8:
          return await conn.sendMessage(
            m.chat,
            {
              video: {
                url: giflogo,
              },
              caption: caption,
              gifPlayback: true,
              gifAttribution: Math.floor(Math.random() * 2) + 1,
            },
            {
              quoted: m,
            },
          );
          break;
        case 9:
        case 10:
          {
            const btn = conn.ctaButton
              .setBody(caption)
              .setFooter(author)
              .setDocument(Buffer.alloc(0), {
                mimetype: [dpptx, ddocx, dxlsx, dpdf, drtf].getRandom(),
                fileName: ucapan + m.name,
                fileLength: fsizedoc,
                pageCount: fpagedoc,
                ...(id === 9 && {
                  jpegThumbnail: await conn.resize(thumbdoc, 300, 150),
                }),
              })
              .addReply("Menu List", _p + "menulist")
              .addUrl("Official Group", sgc)
              .addSelection(listMessage.buttonText)
              .makeSections(listMessage.text, "")
              .contextInfo({
                ...[adReply.contextInfo, adReplyS.contextInfo].getRandom(),
                mentionedJid: [m.sender],
              });
            for (const v of sections[2].rows) {
              btn.makeRow(v.header, v.title, v.description, v.id);
            }
            return await btn.run(m.chat, conn, m);
          }
          break;
        case 11:
          {
            const btn = conn.ctaButton
              .setBody(caption)
              .setFooter(author)
              .addReply("Menu List", _p + "menulist")
              .addUrl("Official Group", sgc)
              .contextInfo({
                ...[adReply.contextInfo, adReplyS.contextInfo].getRandom(),
                mentionedJid: [m.sender],
              });
            return await btn.run(m.chat, conn, m);
          }
          break;
        case 12:
          {
            const btn = conn.ctaButton
              .setBody(caption)
              .setFooter(author)
              .addReply("Menu List", _p + "menulist")
              .addUrl("Official Group", sgc)
              .contextInfo({
                ...[adReply.contextInfo, adReplyS.contextInfo].getRandom(),
                mentionedJid: [m.sender],
              });
            return await btn.run(m.chat, conn, m);
          }
          break;
        default:
          db.data.dbbot.temamenu.id = 0;
      }
      m.react(sukses);
    }
    let totalfeatures = Object.values(plugins).filter(
      (v) => v.help && v.tags,
    ).length;
    let totalreg = Object.keys(glb).length;
    let rtotalreg = Object.values(glb).filter(
      (user) => user.registered === true,
    ).length;
    let help = Object.values(plugins)
      .filter((plugin) => !plugin.disabled)
      .map((plugin) => {
        return {
          help: Array.isArray(plugin.tags) ? plugin.help : [plugin.help],
          tags: Array.isArray(plugin.tags) ? plugin.tags : [plugin.tags],
          prefix: "customPrefix" in plugin,
          limit: plugin.limit,
          premium: plugin.premium,
          enabled: !plugin.disabled,
        };
      });
    let groups = {};
    for (let tag in tags) {
      groups[tag] = [];
      for (let plugin of help)
        if (plugin.tags && plugin.tags.includes(tag))
          if (plugin.help) groups[tag].push(plugin);
    }
    conn.menu = conn.menu ? conn.menu : {};
    let before = conn.menu.before || defaultMenu.before;
    let header = conn.menu.header || defaultMenu.header;
    let body = conn.menu.body || defaultMenu.body;
    let footer = conn.menu.footer || defaultMenu.footer;
    let after =
      conn.menu.after ||
      (conn.user.jid === conn.user.jid
        ? ""
        : `Powered by https://wa.me/${conn.user.jid.split("@")[0]}`) +
        defaultMenu.after;
    let _text = [
      before,
      ...Object.keys(tags).map((tag) => {
        return (
          header.replace(/%category/g, tags[tag].toUpperCase()) +
          "\n" +
          [
            ...help
              .filter(
                (menu) => menu.tags && menu.tags.includes(tag) && menu.help,
              )
              .map((menu) => {
                return menu.help
                  .map((help) => {
                    return body
                      .replace(/%cmd/g, menu.prefix ? help : "%_p" + help)
                      .replace(/%isGroup/g, menu.group ? "`Ⓖ` " : "")
                      .replace(/%isPrivate/g, menu.private ? "`Ⓟ` " : "")
                      .replace(/%isOwner/g, menu.owner ? "`Ⓞ` " : "")
                      .replace(/%isPremium/g, menu.premium ? "`🅟` " : "")
                      .replace(/%isLimit/g, menu.limit ? "`Ⓛ` " : "")
                      .replace(/%isError/g, menu.error ? "`❌` " : "")
                      .replace(/<([^>]*)>/g, "[$1]")
                      .trim();
                  })
                  .join("\n");
              }),
            footer,
          ].join("\n")
        );
      }),
      after,
    ].join("\n");
    let text =
      typeof conn.menu === "string"
        ? conn.menu
        : typeof conn.menu === "object"
          ? _text
          : "";
    let replace = {
      "%": "%",
      p: _p,
      uptime: uptime,
      muptime: muptime,
      me: conn.getName(conn.user.jid),
      npmname: _package.name,
      npmdesc: _package.description,
      version: _package.version,
      exp: exp - min,
      maxexp: xp,
      totalexp: exp,
      xp4levelup: max - exp,
      github: _package.homepage
        ? _package.homepage.url || _package.homepage
        : "[unknown github url]",
      tag: tag,
      dash: dash,
      m1: m1,
      m2: m2,
      m3: m3,
      m4: m4,
      cc: cc,
      c1: c1,
      c2: c2,
      c3: c3,
      c4: c4,
      lprem: lprem,
      llim: llim,
      ucpn: ucpn,
      platform: platform,
      wita: wita,
      mode: mode,
      _p: _p,
      isPrefix: isPrefix,
      bailVer: bailVer,
      processName: processName,
      money: money,
      age: age,
      tag: tag,
      name: name,
      prems: prems,
      level: level,
      limit: limit,
      name: name,
      weton: weton,
      week: week,
      date: date,
      dateIslamic: dateIslamic,
      time: time,
      totalreg: totalreg,
      totalfeatures: totalfeatures,
      rtotalreg: rtotalreg,
      role: role,
      readmore: readMore,
    };
    text = text.replace(
      new RegExp(
        `%(${Object.keys(replace).sort((a, b) => b.length - a.length).join`|`})`,
        "g",
      ),
      (_, name) => "" + replace[name],
    );
    let caption = text.trim();
    db.data.dbbot.temamenu = db.data.dbbot.temamenu || {
      id: 0,
    };
    const { id } = db.data.dbbot.temamenu;
    switch (id) {
      case 0:
        await conn.sendButtonCta(
          m.chat,
          [
            [
              listMessage.text,
              listMessage.footer,
              logo,
              [["Menu List", _p + "menulist"]],
              null,
              [["Official Group", sgc]],
              [[listMessage.buttonText, listMessage.sections]],
            ],
          ],
          m,
          {
            contextInfo: {
              mentionedJid: [m.sender],
            },
          },
        );
        break;
      case 1:
        await conn.reply(m.chat, caption, m, {
          contextInfo: {
            mentionedJid: [m.sender],
          },
        });
        break;
      case 2:
        await conn.reply(m.chat, caption, m, {
          contextInfo: {
            mentionedJid: [m.sender],
            thumbnail: await conn.resize(
              [logo, imagebot].getRandom(),
              300,
              150,
            ),
          },
        });
        break;
      case 3:
        await conn.reply(m.chat, caption, m, {
          contextInfo: {
            mentionedJid: [m.sender],
            body: bottime,
            mediaType: 1,
            previewType: 0,
            renderLargerThumbnail: true,
            thumbnailUrl: [logo, imagebot].getRandom(),
            sourceUrl: "",
          },
        });
        break;
      case 4:
      case 5:
      case 6:
        await conn.sendFile(
          m.chat,
          Buffer.alloc(0),
          "D A S H B O A R D",
          caption,
          fakes,
          false,
          {
            mimetype: [dpptx, ddocx, dxlsx, dpdf, drtf].getRandom(),
            fileLength: fsizedoc,
            pageCount: fpagedoc,
            jpegThumbnail: await conn.resize(
              [thumbdoc, thumb].getRandom(),
              300,
              150,
            ),
            contextInfo: {
              mentionedJid: [m.sender],
              body: id === 6 ? bottime : undefined,
              mediaType: id === 6 ? 1 : undefined,
              previewType: id === 6 ? 0 : undefined,
              renderLargerThumbnail: id === 6 ? true : undefined,
              thumbnailUrl: id === 6 ? [logo, imagebot].getRandom() : undefined,
              sourceUrl: "",
            },
          },
        );
        break;
      case 7:
        await conn.relayMessage(
          m.chat,
          {
            requestPaymentMessage: {
              currencyCodeIso4217: "INR",
              amount1000: fsizedoc,
              requestFrom: "0@s.whatsapp.net",
              noteMessage: {
                extendedTextMessage: {
                  text: caption,
                  contextInfo: {
                    mentionedJid: [m.sender],
                  },
                },
              },
            },
          },
          {},
        );
        break;
      case 8:
        await conn.sendMessage(
          m.chat,
          {
            video: {
              url: giflogo,
            },
            caption: caption,
            gifPlayback: true,
            gifAttribution: Math.floor(Math.random() * 2) + 1,
          },
          {
            quoted: m,
          },
        );
        break;
      case 9:
      case 10:
        {
          const btn = conn.ctaButton
            .setBody(caption)
            .setFooter(author)
            .setDocument(Buffer.alloc(0), {
              mimetype: [dpptx, ddocx, dxlsx, dpdf, drtf].getRandom(),
              fileName: ucapan + m.name,
              fileLength: fsizedoc,
              pageCount: fpagedoc,
              ...(id === 9 && {
                jpegThumbnail: await conn.resize(thumbdoc, 300, 150),
              }),
            })
            .addReply("Menu List", _p + "menulist")
            .addUrl("Official Group", sgc)
            .addSelection(listMessage.buttonText)
            .makeSections(listMessage.text, "")
            .contextInfo({
              ...[adReply.contextInfo, adReplyS.contextInfo].getRandom(),
              mentionedJid: [m.sender],
            });
          for (const v of sections[2].rows) {
            btn.makeRow(v.header, v.title, v.description, v.id);
          }
          await btn.run(m.chat, conn, m);
        }
        break;
      case 11:
        {
          const btn = conn.ctaButton
            .setBody(caption)
            .setFooter(author)
            .addReply("Menu List", _p + "menulist")
            .addUrl("Official Group", sgc)
            .contextInfo({
              ...[adReply.contextInfo, adReplyS.contextInfo].getRandom(),
              mentionedJid: [m.sender],
            });
          await btn.run(m.chat, conn, m);
        }
        break;
      case 12:
        {
          const btn = conn.ctaButton
            .setBody(caption)
            .setFooter(author)
            .addReply("Menu List", _p + "menulist")
            .addUrl("Official Group", sgc)
            .contextInfo({
              ...[adReply.contextInfo, adReplyS.contextInfo].getRandom(),
              mentionedJid: [m.sender],
            });
          await btn.run(m.chat, conn, m);
        }
        break;
      default:
        db.data.dbbot.temamenu.id = 0;
    }
    m.react(sukses);
  } catch (e) {
    await conn.reply(m.chat, "Maaf, menu sedang error", m);
    throw e;
  }
};
handler.command = /^(menulistbiasa)$/i;
handler.exp = 3;
handler.limit = 3;
handler.register = true;
export default handler;
const more = String.fromCharCode(8206);
const readMore = more.repeat(4001);
