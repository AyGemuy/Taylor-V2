import {
  OTP
} from "../../lib/welcome.js";
import {
  generate,
  generateV1,
  generateV2
} from "../../lib/tools/captcha.js";
import {
  promises as fsPromises
} from "fs";
import {
  createHash,
  randomBytes
} from "crypto";
import fetch from "node-fetch";
import _ from "lodash";
const Reg = /\|?(.*)([^\w\s])([0-9]*)$/i;
const handler = async (m, {
  conn,
  usedPrefix,
  command,
  text
}) => {
  conn.registrasi = conn.registrasi || {};
  if (conn.registrasi[m.sender]) {
    return await conn.reply(m.sender, "Anda masih berada dalam sesi Registrasi", conn.registrasi[m.sender].msg);
  }
  let user = db.data.users[m.sender];
  if (user.banned) throw `[💬] Kamu sudah dibanned\nMau unbanned? *${usedPrefix}unban <NUMBER>*`;
  if (user.registered) throw `[💬] Kamu sudah terdaftar\nMau daftar ulang? *${usedPrefix}unreg <SERIAL NUMBER>*`;
  const umurRandom = _.random(1, 100);
  const formatSalah = `⚠️ Format salah\n\n✳️ Penggunaan perintah : *${usedPrefix + command} nama.umur*\n📌Contoh : *${usedPrefix + command}* ${m.sender.split("@")[0]}.${umurRandom}`;
  let namae = await conn.getName(m.sender);
  let namamu = namae || "Gapunya Nama";
  const sections = [{
    title: `${htjava} 𝗣𝗶𝗹𝗶𝗵 𝗨𝗺𝘂𝗿 𝗞𝗮𝗺𝘂 ${htjava}`,
    rows: [{
      title: " A C A K ",
      id: `.daftar ${namamu}.${_.sample([ "30", "29", "28", "27", "26", "25", "24", "23", "22", "21", "20", "19", "18", "17", "16", "15", "14", "13", "12", "11", "10", "9" ])}`
    }]
  }, {
    title: `${htki} 𝗦𝗨𝗗𝗔𝗛 𝗧𝗨𝗔 ${htka}`,
    rows: _.map([30, 29, 28, 27, 26, 25, 24, 23, 22, 21], age => ({
      title: `${emojis} ${age} ᴛᴀʜᴜɴ`,
      id: `.daftar ${namamu}.${age} `
    }))
  }, {
    title: `${htki} 𝗠𝗔𝗦𝗜𝗛 𝗠𝗨𝗗𝗔 ${htka}`,
    rows: _.map([20, 19, 18, 17, 16, 15, 14, 13, 12, 11, 10, 9], age => ({
      title: `${emojis} ${age} ᴛᴀʜᴜɴ`,
      id: `.daftar ${namamu}.${age} `
    }))
  }];
  const listMessage = {
    text: "Please select your age at the bottom button...",
    footer: formatSalah,
    title: `${htki} ʀᴇɢɪsᴛᴇʀ ${htka}`,
    buttonText: "Click Here !",
    sections: sections
  };
  if (user.registered) throw `[💬] Kamu sudah terdaftar\nMau daftar ulang? *${usedPrefix}unreg <SERIAL NUMBER>*`;
  await m.reply(`${conn.user.name} mengirim form verifikasi ke nomor anda...`);
  if (!Reg.test(text)) {
    return await conn.sendList(m.sender, listMessage.title, listMessage.text, listMessage.footer, listMessage.buttonText, null, sections, m);
  }
  let [, name, splitter, age] = text.match(Reg);
  if (!name) throw "Nama tidak boleh kosong (Alphanumeric)";
  if (!age) throw "Umur tidak boleh kosong (Angka)";
  age = parseInt(age);
  if (age > 30) throw "*Gak boleh!*,\nTua amat dah 🗿";
  if (age < 5) throw "*Gak boleh!*,\nBanyak pedo 🗿";
  if (user.name && user.name.trim() === name.trim()) throw "Nama sudah dipakai";
  try {
    let sn = createHash("md5").update(m.sender).digest("hex");
    let who = _.get(m, "mentionedJid[0]") || _.get(m, "quoted.sender") || (m.fromMe ? conn.user.jid : m.sender);
    let caption = (await conn.profilePictureUrl(who, "image").catch(_ => logo), `\n*VERIFIKASI BERHASIL*\n\n• *Nama:* ${name}\n• *Umur:* ${age} tahun\n• *Serial Number (SN):* ${sn}\n\nTerima kasih telah melakukan verifikasi. Data pengguna telah disimpan dengan aman di database bot. Data kamu sekarang sudah terverifikasi.\n\n🚀 Sekarang kamu dapat menggunakan fitur-fitur khusus yang hanya tersedia untuk pengguna terverifikasi.\n`);
    const json = await createOtpCanvas(flaaa.getRandom() + "Sukses");
    let confirm = "💡 Reply pesan ini dengan mengetik kode OTP yang ada pada gambar!",
      txt = `📝 *Registrasi* 📝\n\n@${m.sender.split("@")[0]}\n${confirm}\n\n_( Berlaku 1X )_`,
      msg = await conn.sendMessage(m.sender, {
        image: json.image,
        caption: txt,
        mentions: [m.sender]
      }, {
        quoted: m
      });
    conn.registrasi[m.sender] = {
      OTP: json.otp,
      VERIFIED: json.verified,
      CAPTION: caption,
      MSG: msg,
      NAME: name,
      AGE: age,
      timeout: setTimeout(() => {
        conn.sendMessage(m.sender, {
          delete: msg.key
        });
        delete conn.registrasi[m.sender];
      }, 6e4)
    };
  } catch (e) {
    console.error(e);
    m.reply(e);
  }
};
handler.help = ["daftar", "register"].map(v => `${v} <nama>.<umur>`);
handler.tags = ["xp"];
handler.command = /^(register|verify|daftar|reg(is)?|verif)$/i;
export default handler;
async function createOtpCanvas(inSucc) {
  try {
    const captcha = await generateV1(4) || await generateV2(4) || await generate(4);
    const captchaBuffer = captcha.buffer;
    const secur = OTP(inSucc);
    const res2 = await fetch(secur);
    const securityBuffer = Buffer.from(await res2.arrayBuffer());
    return {
      image: captchaBuffer,
      otp: captcha.code,
      verified: securityBuffer
    };
  } catch (e) {
    try {
      const otp = randomBytes(4).toString("hex").slice(0, 4);
      const captcha = OTP(otp);
      const res = await fetch(captcha);
      const captchaBuffer = Buffer.from(await res.arrayBuffer());
      const secur = OTP(inSucc);
      const res2 = await fetch(secur);
      return {
        image: captchaBuffer,
        otp: otp,
        verified: Buffer.from(await res2.arrayBuffer())
      };
    } catch (e) {
      console.error(e);
    }
  }
}