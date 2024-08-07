import {
  ShortLink
} from "../../lib/tools/shortlink.js";
const short = new ShortLink(),
  asyncFunctions = {
    adfoc: {
      func: short.adfoc,
      desc: "AdFoc.us"
    },
    bitly: {
      func: short.bitly,
      desc: "Bitly"
    },
    cleanuri: {
      func: short.cleanuri,
      desc: "CleanURI"
    },
    cuttly: {
      func: short.cuttly,
      desc: "Cutt.ly"
    },
    dxyz: {
      func: short.dxyz,
      desc: "Dxyz"
    },
    gotiny: {
      func: short.gotiny,
      desc: "GoTiny.cc"
    },
    isgd: {
      func: short.isgd,
      desc: "Is.gd"
    },
    kutt: {
      func: short.kutt,
      desc: "Kutt.it"
    },
    linkpoi: {
      func: short.linkpoi,
      desc: "Linkpoi.in"
    },
    multishort: {
      func: short.multishort,
      desc: "MultiShort.net"
    },
    onept: {
      func: short.onept,
      desc: "1pt.co"
    },
    ouo: {
      func: short.ouo,
      desc: "Ouo.io"
    },
    rebrandly: {
      func: short.rebrandly,
      desc: "Rebrandly"
    },
    shorte: {
      func: short.shorte,
      desc: "Shorte.st"
    },
    shorturl: {
      func: short.shorturl,
      desc: "ShortURL.at"
    },
    shrtco: {
      func: short.shrtco,
      desc: "Shrtco.de"
    },
    tinyurl: {
      func: short.tinyurl,
      desc: "TinyURL"
    },
    tnyim: {
      func: short.tnyim,
      desc: "Tny.im"
    },
    vgd: {
      func: short.vgd,
      desc: "V.gd"
    },
    vurl: {
      func: short.vurl,
      desc: "Vurl.com"
    },
    ssur: {
      func: short.ssur,
      desc: "Ssurls.com"
    },
    adfly: {
      func: short.adfly,
      desc: "AdFly"
    }
  },
  isValidLink = link => /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/.test(link),
  handler = async (m, {
    text
  }) => {
    const asyncFunctionsList = Object.keys(asyncFunctions).sort().map((func, index) => ` *${index + 1}.* ${func}: ${asyncFunctions[func].desc}`).join("\n"),
      [url, order] = text?.split(" ") ?? [];
    try {
      if (!order || !url) throw new Error(`Input tidak valid. Gunakan format:\n\n.short <URL> <index>\n\nContoh Penggunaan:\n\n.short https://example.com 5\n\nDaftar Fungsi Short Link:\n\n${asyncFunctionsList}`);
      const numericOrder = parseInt(order);
      if (isNaN(numericOrder) || numericOrder <= 0 || numericOrder > Object.keys(asyncFunctions).length) throw new Error("Urutan fungsi tidak valid. Gunakan nomor fungsi yang benar.");
      m.reply("*ᴄᴏɴᴠᴇʀᴛɪɴɢ...*");
      const funcName = Object.keys(asyncFunctions)[numericOrder - 1];
      if (!funcName) throw new Error(`Async function dengan urutan ${order} tidak ditemukan.`);
      const output = await asyncFunctions[funcName].func(url),
        reslink = output ? `🚀 *ʟɪɴᴋ:*\n${output}\n\n*ʟɪɴᴋ ᴅᴇsᴄʀɪᴘᴛɪᴏɴ:* ${asyncFunctions[funcName].desc}` : "Not Found";
      m.reply(reslink);
    } catch (error) {
      m.reply(`Terjadi kesalahan: ${error.message}`);
    }
  };
handler.help = ["short type|type"], handler.tags = ["internet"], handler.command = /^short(url)?$/i;
export default handler;