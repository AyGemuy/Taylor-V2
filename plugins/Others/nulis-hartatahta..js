import {
  spawn
} from "child_process";
import {
  readdirSync,
  readFileSync,
  unlinkSync
} from "fs";
import {
  join
} from "path";
import Helper from "../../lib/helper.js";
const handler = async (m, {
  conn,
  usedPrefix,
  command,
  args
}) => {
  let text = args.length >= 1 ? args.slice(0).join(" ") : m.quoted && m.quoted?.text || m.quoted?.caption || m.quoted?.description || null;
  if (!text) return m.reply(`Input query text!\n*Example:*\n- *${usedPrefix + command}* hello`);
  if (conn.hartatahta = conn.hartatahta ? conn.hartatahta : {}, m.chat in conn.hartatahta) throw "Masih ada yang sedang membuat\nTeks Harta Tahta\ndi chat ini... tunggu sampai selesai";
  conn.hartatahta[m.chat] = !0, m.reply("_Sedang membuat..._\n*Mohon tunggu sekitar 1 menit*");
  try {
    let img = await ht(text);
    await conn.sendMessage(m.chat, {
      image: img,
      caption: "*© Nurutomo*\nMade with FFmpeg"
    }, {
      quoted: m
    });
  } finally {
    delete conn.hartatahta[m.chat];
  }
};
handler.help = ["tahta <teks>"], handler.tags = ["tools"], handler.command = /^((harta)?tahta)$/i,
  handler.limit = !0;
export default handler;
let __dirname = Helper.__dirname(import.meta.url),
  src = join(__dirname, "../src/"),
  tmp = join(__dirname, "../tmp/"),
  _font = join(src, "font"),
  aesthetic = join(src, "Aesthetic");

function ht(text = "") {
  return new Promise((resolve, reject) => {
    let img = join(aesthetic, pickRandom(readdirSync(aesthetic))),
      font = join(_font, "Roboto-Black.ttf"),
      w = 1024,
      h = w,
      s = w + "x" + h,
      xF = `(${noise("X", 2, w, 1)}+${noise("Y", 1, h, 1)})/2+128`,
      yF = `((${pickRandom([ "", "-" ])}22.5*${pickRandom([ "sin", "cos" ])}(X/1024*4*PI))+${noise("X", 5, w, .8)}+${noise("Y", 2, h, 1)})/1.7+128`,
      layers = [`[v:0]scale=${s}[im]`, textArgs("HARTA", "black", "white", 160, font, "(w-text_w)/2", "(h-text_h)/2-(text_h*1.5)", w, h) + "[top]", textArgs("TAHTA", "black", "white", 160, font, "(w-text_w)/2", "(h-text_h)/2", w, h) + "[mid]", textArgs(text, "black", "white", 160, font, "(w-text_w)/2", "(h-text_h)/2+(text_h*1.5)", w, h) + "[bot]", "[top][mid]blend=all_mode=addition[con]", "[con][bot]blend=all_mode=addition[txt]", `nullsrc=s=${s},geq='r=${xF}:g=${xF}:b=${xF}'[dx]`, `nullsrc=s=${s},geq='r=${yF}:g=${yF}:b=${yF}'[dy]`, "[txt][dx][dy]displace[wa]", "[im][wa]blend=all_mode=multiply:all_opacity=1"],
      o = 1 * new Date() + "_harta_tahta.png";
    o = join(tmp, o);
    let args = ["-y", "-i", img, "-filter_complex", layers.join(";"), "-frames:v", "1", o];
    spawn("ffmpeg", args).on("error", reject).on("close", () => {
      try {
        resolve(readFileSync(o)), unlinkSync(o);
      } catch (e) {
        reject(e);
      }
    });
  });
}

function noise(_var, depth = 4, s = 1024, freq) {
  let forms = [];
  for (let i = 0; i < depth; i++) forms.push(formula(_var, freq * rand(40, 80) * (s / 2048) / s * ((i + 1) / 5), rand(-Math.PI, Math.PI), (i + 1) / depth * 8, 0));
  return forms.join("+");
}

function formula(_var, freq, offset, amp, add) {
  return `(${add.toFixed(3)}+${amp.toFixed(4)}*sin(${offset.toFixed(6)}+2*PI*${_var}*${freq.toFixed(6)}))`;
}

function textArgs(text, background, color, size, fontfile, x = "200", y = "200", w = 1024, h = 1024) {
  return `color=${background}:s=${w}x${h},drawtext=text='${text.replace(/[\\]/g, "\\$&")}':fontfile='${fontfile.replace(/[\\]/g, "\\$&")}':x=${x}:y=${y}:fontsize=${size}:fontcolor=${color}`;
}

function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)];
}

function rand(min, max, q = .001) {
  return Math.floor(Math.random() * (max - min) / q) * q;
}