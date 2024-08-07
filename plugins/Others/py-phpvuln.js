import cp from "child_process";
import {
  promisify
} from "util";
let exec = promisify(cp.exec).bind(cp);
import fs from "fs";
const handler = async (m, {
  usedPrefix,
  command
}) => {
  let q = m.quoted ? m.quoted : m,
    mime = (q.msg || q).mimetype || "";
  if (!mime) throw `Kirim File PHP yang ingin discan dan reply medianya dengan perintah *${usedPrefix}${command}*`;
  if (!/(application\/(octet-stream|php|x-php|x-httpd-php|x-httpd-php-source)|text(php|x-php))/.test(mime)) throw `Mimetype ${mime} Tidak Di dukung`;
  let o, media = await q?.download(),
    filename = md5(999999999999 * Math.random()) + ".php";
  await fs.writeFileSync(`./tmp/${filename}`, media), m.react(wait);
  try {
    o = await exec(`cd py/phpvuln && python phpvuln.py --file ../../tmp/${filename}`);
  } catch (e) {
    o = e;
  } finally {
    let {
      stdout,
      stderr
    } = o;
    stdout.trim() && m.reply(stdout), stderr.trim() && m.reply("File Mengandung Virus/Malware"),
      fs.unlinkSync(`./tmp/${filename}`);
  }
};
handler.help = ["phpvuln <media>", "scanfilephp <media>"], handler.tags = ["php", "python", "sptools"],
  handler.command = /^(phpvuln|scanfilephp)$/i;
export default handler;

function md5(inputString) {
  var hc = "0123456789abcdef";

  function rh(n) {
    var j, s = "";
    for (j = 0; j <= 3; j++) s += hc.charAt(n >> 8 * j + 4 & 15) + hc.charAt(n >> 8 * j & 15);
    return s;
  }

  function ad(x, y) {
    var l = (65535 & x) + (65535 & y);
    return (x >> 16) + (y >> 16) + (l >> 16) << 16 | 65535 & l;
  }

  function cm(q, a, b, x, s, t) {
    return ad(function(n, c) {
      return n << c | n >>> 32 - c;
    }(ad(ad(a, q), ad(x, t)), s), b);
  }

  function ff(a, b, c, d, x, s, t) {
    return cm(b & c | ~b & d, a, b, x, s, t);
  }

  function gg(a, b, c, d, x, s, t) {
    return cm(b & d | c & ~d, a, b, x, s, t);
  }

  function hh(a, b, c, d, x, s, t) {
    return cm(b ^ c ^ d, a, b, x, s, t);
  }

  function ii(a, b, c, d, x, s, t) {
    return cm(c ^ (b | ~d), a, b, x, s, t);
  }
  var i, olda, oldb, oldc, oldd, x = function(x) {
      var i, nblk = 1 + (x.length + 8 >> 6),
        blks = new Array(16 * nblk);
      for (i = 0; i < 16 * nblk; i++) blks[i] = 0;
      for (i = 0; i < x.length; i++) blks[i >> 2] |= x.charCodeAt(i) << i % 4 * 8;
      return blks[i >> 2] |= 128 << i % 4 * 8, blks[16 * nblk - 2] = 8 * x.length, blks;
    }(inputString),
    a = 1732584193,
    b = -271733879,
    c = -1732584194,
    d = 271733878;
  for (i = 0; i < x.length; i += 16) olda = a, oldb = b, oldc = c, oldd = d, a = ff(a, b, c, d, x[i + 0], 7, -680876936),
    d = ff(d, a, b, c, x[i + 1], 12, -389564586), c = ff(c, d, a, b, x[i + 2], 17, 606105819),
    b = ff(b, c, d, a, x[i + 3], 22, -1044525330), a = ff(a, b, c, d, x[i + 4], 7, -176418897),
    d = ff(d, a, b, c, x[i + 5], 12, 1200080426), c = ff(c, d, a, b, x[i + 6], 17, -1473231341),
    b = ff(b, c, d, a, x[i + 7], 22, -45705983), a = ff(a, b, c, d, x[i + 8], 7, 1770035416),
    d = ff(d, a, b, c, x[i + 9], 12, -1958414417), c = ff(c, d, a, b, x[i + 10], 17, -42063),
    b = ff(b, c, d, a, x[i + 11], 22, -1990404162), a = ff(a, b, c, d, x[i + 12], 7, 1804603682),
    d = ff(d, a, b, c, x[i + 13], 12, -40341101), c = ff(c, d, a, b, x[i + 14], 17, -1502002290),
    a = gg(a, b = ff(b, c, d, a, x[i + 15], 22, 1236535329), c, d, x[i + 1], 5, -165796510),
    d = gg(d, a, b, c, x[i + 6], 9, -1069501632), c = gg(c, d, a, b, x[i + 11], 14, 643717713),
    b = gg(b, c, d, a, x[i + 0], 20, -373897302), a = gg(a, b, c, d, x[i + 5], 5, -701558691),
    d = gg(d, a, b, c, x[i + 10], 9, 38016083), c = gg(c, d, a, b, x[i + 15], 14, -660478335),
    b = gg(b, c, d, a, x[i + 4], 20, -405537848), a = gg(a, b, c, d, x[i + 9], 5, 568446438),
    d = gg(d, a, b, c, x[i + 14], 9, -1019803690), c = gg(c, d, a, b, x[i + 3], 14, -187363961),
    b = gg(b, c, d, a, x[i + 8], 20, 1163531501), a = gg(a, b, c, d, x[i + 13], 5, -1444681467),
    d = gg(d, a, b, c, x[i + 2], 9, -51403784), c = gg(c, d, a, b, x[i + 7], 14, 1735328473),
    a = hh(a, b = gg(b, c, d, a, x[i + 12], 20, -1926607734), c, d, x[i + 5], 4, -378558),
    d = hh(d, a, b, c, x[i + 8], 11, -2022574463), c = hh(c, d, a, b, x[i + 11], 16, 1839030562),
    b = hh(b, c, d, a, x[i + 14], 23, -35309556), a = hh(a, b, c, d, x[i + 1], 4, -1530992060),
    d = hh(d, a, b, c, x[i + 4], 11, 1272893353), c = hh(c, d, a, b, x[i + 7], 16, -155497632),
    b = hh(b, c, d, a, x[i + 10], 23, -1094730640), a = hh(a, b, c, d, x[i + 13], 4, 681279174),
    d = hh(d, a, b, c, x[i + 0], 11, -358537222), c = hh(c, d, a, b, x[i + 3], 16, -722521979),
    b = hh(b, c, d, a, x[i + 6], 23, 76029189), a = hh(a, b, c, d, x[i + 9], 4, -640364487),
    d = hh(d, a, b, c, x[i + 12], 11, -421815835), c = hh(c, d, a, b, x[i + 15], 16, 530742520),
    a = ii(a, b = hh(b, c, d, a, x[i + 2], 23, -995338651), c, d, x[i + 0], 6, -198630844),
    d = ii(d, a, b, c, x[i + 7], 10, 1126891415), c = ii(c, d, a, b, x[i + 14], 15, -1416354905),
    b = ii(b, c, d, a, x[i + 5], 21, -57434055), a = ii(a, b, c, d, x[i + 12], 6, 1700485571),
    d = ii(d, a, b, c, x[i + 3], 10, -1894986606), c = ii(c, d, a, b, x[i + 10], 15, -1051523),
    b = ii(b, c, d, a, x[i + 1], 21, -2054922799), a = ii(a, b, c, d, x[i + 8], 6, 1873313359),
    d = ii(d, a, b, c, x[i + 15], 10, -30611744), c = ii(c, d, a, b, x[i + 6], 15, -1560198380),
    b = ii(b, c, d, a, x[i + 13], 21, 1309151649), a = ii(a, b, c, d, x[i + 4], 6, -145523070),
    d = ii(d, a, b, c, x[i + 11], 10, -1120210379), c = ii(c, d, a, b, x[i + 2], 15, 718787259),
    b = ii(b, c, d, a, x[i + 9], 21, -343485551), a = ad(a, olda), b = ad(b, oldb),
    c = ad(c, oldc), d = ad(d, oldd);
  return rh(a) + rh(b) + rh(c) + rh(d);
}