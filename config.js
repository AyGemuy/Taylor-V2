import {
  readFileSync,
  watchFile,
  unwatchFile
} from "fs";
import chalk from "chalk";
import {
  fileURLToPath
} from "url";
import moment from "moment-timezone";
moment.locale("id");
import colors from "colors";
import {
  WA_DEFAULT_EPHEMERAL
} from "@whiskeysockets/baileys";
const {
  cosplay,
  mountain,
  dynamic,
  flamming,
  galau,
  estetik,
  waifu,
  boneka
} = JSON.parse(readFileSync("./json/image/image.json"));
const imgSource = ["https://api.btstu.cn/sjbz/api.php?lx=1920x1080", "https://img.xjh.me/random_img.php?type=bg&ctype=acg&return=302&device=web", "https://minimalistic-wallpaper.demolab.com/?random", "https://www.loremflickr.com/1920/1080", "https://www.picsum.photos/1920/1080", "https://www.placebear.com/1920/1080", "https://www.placebeard.it/1920/1080"];
async function loadConfig() {
  try {
    colors.setTheme({
        main: ["brightBlue", "bold"],
        silly: "rainbow",
        input: "grey",
        verbose: "cyan",
        prompt: "grey",
        info: "green",
        data: "grey",
        help: "cyan",
        warn: "yellow",
        debug: "blue",
        error: "brightRed"
      }), global.owner = [
        ["6282195322106", "️𝑾𝒖𝒅𝒚𝒔𝒐𝒇𝒕 - 𝑶𝒘𝒏𝒆𝒓", !0]
      ],
      global.mods = ["6282195322106"], global.prems = ["6282195322106"], global.APIs = {
        amel: "https://melcanz.com",
        bg: "http://bochil.ddns.net",
        dhnjing: "https://dhnjing.xyz",
        fdci: "https://api.fdci.se",
        hardianto: "https://hardianto.xyz",
        lolhuman: "https://api.lolhuman.xyz",
        neoxr: "https://api.neoxr.eu",
        pencarikode: "https://pencarikode.xyz",
        zeks: "https://api.zeks.xyz",
        zenz: "https://api.zahwazein.xyz",
        btchx: "https://api.botcahx.eu.org",
        proxy: pickRandom(["https://cors-flame.vercel.app/api/cors?url=", "https://cors.newfrontdoor.org/api/cors?url=", "https://cors-anywhere-oragne.vercel.app/api/cors?url="])
      }, global.APIKeys = {
        "https://api.neoxr.eu": pickRandom(["5VC9rvNx", "lucycat"]),
        "https://api.lolhuman.xyz": pickRandom(["043c5de3b7cd6b1b8f2a0f90", "e1a815979e6adfc071b7eafc", "ed78c137a46873c5b8e5fe3b", "IchanZX", "GataDios", "elainaai"]),
        "https://api.zeks.xyz": "apivinz",
        "https://hardianto.xyz": "hardianto",
        "https://melcanz.com": "manHkmst",
        "https://pencarikode.xyz": "pais",
        "https://api.zahwazein.xyz": "zenzkey_1ec92f71d3bb",
        "https://api.botcahx.eu.org": "ngGdhzHk",
        "https://prodia.com": ["7e33be3f-5af6-42b2-854b-6439b3732050", "48847940-aded-4214-9400-333c518105f0", "69dc2e5b-24b3-426e-952f-6a36fbd69722", "5f4179ac-0d29-467c-bfbc-32db97afa1d4", "dc80a8a4-0b98-4d54-b3e4-b7c797bc2527"]
      }, global.nomorbot = "6285198276345", global.nomorown = "6282195322106", global.namebot = " ᴛᴀyʟᴏʀ-ʙᴏᴛ あ⁩ ",
      global.nameown = "「 𝑾𝒖𝒅𝒚𝒔𝒐𝒇𝒕 」", global.pmenus = pickRandom(["乂", "◈", "➭", "ଓ", "⟆•", "⳻", "•", "↬", "◈", "⭑", "ᯬ", "◉", "᭻", "»", "〆", "々", "⛥", "✗", "⚜", "⚚", "♪"]),
      global.htjava = pickRandom(["乂", "⛶", "❏", "⫹⫺", "☰", "⎔", "✦", "⭔", "⬟", "⛊", "⚝"]),
      global.wm = "                「 ᴛᴀyʟᴏʀ-ʙᴏᴛ あ⁩ 」", global.wm2 = "꒷︶꒷꒥꒷ ‧₊˚ ꒰ฅ˘օառɛʀ˘ฅ ꒱ ‧₊˚꒷︶꒷꒥꒷",
      global.wm3 = htjava + " ᴛᴀyʟᴏʀ-ʙᴏᴛ", global.giflogo = VideoGalau(), global.fla = pickRandom(ImgLogoFlam()),
      global.flaaa = ImgLogoFlam(), global.brandc = ImgLogoDynamic(), global.sig = "https://www.instagram.com/wudysoft",
      global.sgh = "https://www.github.com/AyGemuy", global.sgc = "https://s.id/Taylor-V2",
      global.sdc = "https://www.discord.com/wudysoft", global.snh = "https://www.tiktok.com/@upload_file",
      global.sfb = "https://www.facebook.com/", global.syt = "https://www.youtube.com/",
      global.premnsfw = !0, global.dpptx = "application/vnd.openxmlformats-officedocument.presentationml.presentation",
      global.ddocx = "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      global.dxlsx = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      global.dpdf = "application/pdf", global.drtf = "text/rtf", global.fsizedoc = SizeDoc(),
      global.fpagedoc = PageDoc(), global.dmenut = htjava + "───『", global.dmenub = "│" + pmenus,
      global.dmenub2 = "│" + pmenus, global.dmenuf = "╰──────────⳹", global.dashmenu = "☰ *D A S B O A R D* ☰",
      global.htki = htjava + "───『", global.htka = "』───" + htjava, global.hwaifu = ImgWaifu(),
      global.hbeach = ImgCosplay(), global.thumbnailUrl = ImgBoneka(), global.hoppai = ImgCosplay(),
      global.hloli = ImgCosplay(), global.hyuri = ImgCosplay(), global.hneko = ImgCosplay(),
      global.hLokun = ImgCosplay(), global.hbunny = ImgCosplay(), global.thumbs = ImgBoneka(),
      global.thumb = pickRandom([...imgSource, ImgEstetik()]), global.imagebot = pickRandom([...imgSource, ImgMountain()]),
      global.thumbdoc = pickRandom([...imgSource, ImgEstetik()]), global.logo = pickRandom([...imgSource, ImgMountain()]),
      global.ucapan = Pagi(), global.ephemeral = WA_DEFAULT_EPHEMERAL, global.doc = pickRandom(["application/vnd.openxmlformats-officedocument.presentationml.presentation", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "application/vnd.openxmlformats-officedocument.wordprocessingml.document", "application/vnd.ms-excel", "application/msword", "application/pdf", "text/rtf"]),
      global.knimg = pickRandom([...imgSource, ImgMountain()]), global.lopr = "🅟",
      global.lolm = "Ⓛ", global.cmenut = htjava + "───『", global.cmenuh = "』───" + htjava,
      global.cmenub = "│" + pmenus, global.cmenuf = "╰──────────⳹", global.cmenua = "\n⌕ ❙❘❙❙❘❙❚❙❘❙❙❚❙❘❙❘❙❚❙❘❙❙❚❙❘❙❙❘❙❚❙❘ ⌕\n     ",
      global.emojis = pickRandom(["👑", "🎗", "️🗿", "🕹", "️💡", "🪄", "🎈", "🎊", "🔖", "📍", "❤", "‍🔥", "💤", "💭", "🕚", "💬", "🚩", "🎐", "🍃", "🌿", "🥀", "✨", "⚡", "☂️"]),
      global.packname = "𝑴𝒂𝒅𝒆 𝒃𝒚", global.stickpack = packname, global.author = "𝑻𝒂𝒚𝒍𝒐𝒓 乂 𝑾𝒖𝒅𝒚𝒔𝒐𝒇𝒕",
      global.stickauth = author + "\nwa.me/" + nomorbot, global.multiplier = 69, global.eror = pickRandom(["❌", "🚫", "💥", "❎"]),
      global.wait = pickRandom(["⏳", "⌛", "⏰", "⏱️"]), global.sukses = pickRandom(["✨", "🌟", "🎉", "🥳", "✅", "👍"]),
      global.render = pickRandom(["_*`Rendering 📍`*_", "_*`Processing 📍`*_", "_*`Generating content 📍`*_"]),
      global.webs = "https://s.id/Cerdasin62", global.gcwangsaf = "https://chat.whatsapp.com/LqJoQr4IdBLAXsxd1PkNph",
      global.saweria = "https://saweria.com/wudysoft", global.dana = "0887435373103",
      global.pulsa = "082195322106", global.trakteer = "https://trakteer.id/wudysoft",
      global.paypal = "wudysoft@mail.com", global.gopay = "082195322106", global.pdana = "0887435373103",
      global.povo = "082195322106", global.pgopay = "082195322106", global.ppulsa = "082195322106",
      global.ppulsa2 = "082195322106", global.psaweria = "https://saweria.com/Wudysoft",
      global.rpg = {
        emoticon(string) {
          string = string.toLowerCase();
          const emot = {
              Fox: "🦊",
              agility: "🤸‍♂️",
              anggur: "🍇",
              apel: "🍎",
              aqua: "🥤",
              arc: "🏹",
              armor: "🥼",
              bank: "🏦",
              batu: "🧱",
              berlian: "💎",
              bibitanggur: "🍇",
              bibitapel: "🍎",
              bibitjeruk: "🍊",
              bibitmangga: "🥭",
              bibitpisang: "🍌",
              botol: "🍾",
              bow: "🏹",
              bull: "🐃",
              cat: "🐈",
              centaur: "🎠",
              chicken: "🐓",
              coal: "⚱️",
              common: "📦",
              cow: "🐄",
              crystal: "🔮",
              darkcrystal: "♠️",
              diamond: "💎",
              dog: "🐕",
              dragon: "🐉",
              eleksirb: "🧪",
              elephant: "🐘",
              emasbatang: "🪙",
              emasbiasa: "🥇",
              emerald: "💚",
              exp: "✉️",
              fishingrod: "🎣",
              foodpet: "🍱",
              fox: "🦊",
              gardenboc: "🗳️",
              gardenboxs: "📦",
              gems: "🍀",
              giraffe: "🦒",
              gold: "👑",
              griffin: "🦒",
              health: "❤️",
              healtmonster: "❤‍🔥",
              horse: "🐎",
              intelligence: "🧠",
              iron: "⛓️",
              jeruk: "🍊",
              kaleng: "🥫",
              kardus: "📦",
              kayu: "🪵",
              ketake: "💿",
              keygold: "🔑",
              keyiron: "🗝️",
              knife: "🔪",
              koinexpg: "👛",
              kucing: "🐈",
              kuda: "🐎",
              kyubi: "🦊",
              legendary: "🗃️",
              level: "🧬",
              limit: "🌌",
              lion: "🦁",
              magicwand: "⚕️",
              makanancentaur: "🥗",
              makanangriffin: "🥙",
              makanankyubi: "🍗",
              makanannaga: "🍖",
              makananpet: "🥩",
              makananphonix: "🧀",
              mana: "🪄",
              mangga: "🥭",
              money: "💵",
              mythic: "🗳️",
              mythic: "🪄",
              naga: "🐉",
              pancingan: "🎣",
              pet: "🎁",
              petFood: "🍖",
              phonix: "🦅",
              pickaxe: "⛏️",
              pisang: "🍌",
              pointxp: "📧",
              potion: "🥤",
              rock: "🪨",
              robo: "🤖",
              rubah: "🦊",
              sampah: "🗑️",
              serigala: "🐺",
              snake: "🐍",
              stamina: "⚡",
              strength: "🦹‍♀️",
              string: "🕸️",
              superior: "💼",
              sword: "⚔️",
              tiger: "🐅",
              tiketcoin: "🎟️",
              trash: "🗑",
              umpan: "🪱",
              uncommon: "🎁",
              upgrader: "🧰",
              wood: "🪵"
            },
            results = Object.keys(emot).map(v => [v, new RegExp(v, "gi")]).filter(v => v[1].test(string));
          return results.length ? emot[results[0][0]] : "";
        }
      };
  } catch (err) {
    console.error(`Error in Load Config: ${err.message}`);
  } finally {
    setTimeout(loadConfig, 9e5);
  }
}
export {
  loadConfig
};
const file = fileURLToPath(import.meta.url);

function Pagi() {
  const waktunya = moment.tz("Asia/Makassar").format("HH");
  return waktunya >= 24 ? "Selamat Begadang 🗿" : waktunya >= 18 ? "Selamat malam 🌙" : waktunya >= 15 ? "Selamat sore 🌅" : waktunya > 10 ? "Selamat siang ☀️" : waktunya >= 4 ? "Selamat pagi 🌄" : "Selamat Pagi 🗿";
}

function pickRandom(list) {
  const shuffledList = list.slice().sort(() => Math.random() - .5);
  return shuffledList[Math.floor(Math.random() * shuffledList.length)];
}

function ImgCosplay() {
  return cosplay;
}

function ImgMountain() {
  return pickRandom(mountain);
}

function ImgLogoDynamic() {
  return dynamic.map(id => `https://dynamic.brandcrowd.com/asset/logo/${id}/logo?v=4&text=`);
}

function ImgLogoFlam() {
  return flamming.map(id => `https://flamingtext.com/net-fu/proxy_form.cgi?imageoutput=true&script=${id}&doScale=true&scaleWidth=480&scaleHeight=240&fontsize=120&backgroundColor=%23000300&shadowType=2&text=`);
}

function VideoGalau() {
  return `https://telegra.ph/file/${pickRandom(galau)}.mp4`;
}

function ImgEstetik() {
  return pickRandom(estetik);
}

function ImgWaifu() {
  return waifu;
}

function ImgBoneka() {
  return boneka;
}

function Sapa() {
  return pickRandom(["Apa kabar ", "Halo ", "Hai "]);
}

function SizeDoc() {
  return Math.pow(10, 15);
}

function PageDoc() {
  return Math.pow(10, 10);
}

function businessOwnerJid() {
  return pickRandom([pickRandom([global.nomorown, "0", "628561122343", "6288906250517", "6282195322106", "6281119568305", "6281282722861", "6282112790446"]) + "@s.whatsapp.net"]);
}
watchFile(file, () => {
  unwatchFile(file), console.log(chalk.redBright("Update config.js")), import(`${file}?update=${Date.now()}`);
});