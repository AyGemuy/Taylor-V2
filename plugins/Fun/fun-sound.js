import fetch from "node-fetch";
import {
  search
} from "../../lib/scraper/all/search.js";
import {
  RingTone
} from "../../lib/scraper/scraper-search.js";
import fs from "fs";
const toM = a => "@" + a.split("@")[0],
  soundAlphabets = ["anjay", "ara-ara", "ara-ara-cowok", "ara-ara2", "arigatou", "assalamualaikum", "asu", "ayank", "aku-ngakak", "bacot", "bahagia-aku", "baka", "bansos", "beat-box", "beat-box2", "biasalah", "bidadari", "bot", "buka-pintu", "canda-anjing", "cepetan", "cuekin-terus", "daisuki-dayo", "daisuki", "dengan-mu", "gaboleh-gitu", "gak-lucu", "gamau", "gay", "gelay", "gitar", "gomenasai", "hai-bot", "hampa", "hayo", "hp-iphone", "i-like-you", "ih-wibu", "india", "karna-lo-wibu", "kiss", "kontol", "ku-coba", "maju-wibu", "makasih", "mastah", "nande-nande", "nani", "ngadi-ngadi", "nikah", "nuina", "onichan", "owner-sange", "ownerku", "pak-sapardi", "pale", "pantek", "pasi-pasi", "punten", "sayang", "siapa-sih", "sudah-biasa", "summertime", "tanya-bapak-lu", "to-the-bone", "wajib", "waku", "woi", "yamete", "yowaimo", "yoyowaimo"],
  isNumber = x => !isNaN(x),
  handler = async (m, {
    conn,
    usedPrefix,
    text,
    command
  }) => {
    const who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender;
    await conn.profilePictureUrl(who).catch(_ => hwaifu.getRandom()), conn.getName(who);
    if (!text) {
      let exampleUsage = `🎶 Contoh Penggunaan:\n${usedPrefix + command} 2\n\n🔢 List Nomor\nMaksimal Angka 70\n\nContoh:\n${usedPrefix + command} arigatou\n\n🔠 List Alphabet\n${soundAlphabets.map(item => `• ${item}`).join("\n")}`;
      throw "mangkane" === command && (exampleUsage = `🎵 Contoh Penggunaan:\n${usedPrefix + command} 1`), "ringtone" === command && (exampleUsage = `🎵 Contoh Penggunaan:\n${usedPrefix + command} black cover`),
        exampleUsage;
    }
    try {
      let vn;
      if ("sound" === command) vn = isNumber(text) ? `https://raw.githubusercontent.com/AyGemuy/Sound/main/sound${text}.mp3` : `https://raw.githubusercontent.com/AyGemuy/HAORI-API/main/audio/${text}.mp3`,
        await conn.sendMessage(m.chat, {
          audio: {
            url: vn
          },
          ptt: !0,
          mimetype: "audio/mpeg",
          fileName: "vn.mp3"
        }, {
          quoted: m
        });
      else if ("mangkane" === command) vn = `https://raw.githubusercontent.com/AyGemuy/Rest-Sound/main/HyuuraKane/mangkane${text}.mp3`,
        await conn.sendMessage(m.chat, {
          audio: {
            url: vn
          },
          ptt: !0,
          mimetype: "audio/mpeg",
          fileName: "mangkane.mp3"
        }, {
          quoted: m
        });
      else if ("ringtone" === command) {
        const result = await RingTone(text) || await search.ringTone(text),
          formattedData = {
            title: "                *[ Sound Search ]*\n                 BEST MATCH\n\n",
            rows: [{
              title: "Best",
              highlight_label: "Best match",
              rows: Object.values(result).map((v, index) => ({
                title: v.title,
                id: `${usedPrefix + command}get ${v.audio}`,
                description: `Audio 🎧\n*Source:* ${v.source}`
              }))
            }]
          };
        await conn.sendButtonCta(m.chat, [
          [`📺 Ringtone Search 🔎\n⚡ Silakan pilih Ringtone Search di bawah ini...\n\n*Teks yang anda kirim:* ${text}\n\nKetik ulang *${usedPrefix + command}* teks anda untuk mengubah teks lagi`, wm, null, [], null, null, [
            ["Result Here", formattedData.rows]
          ]]
        ], m);
      } else "ringtoneget" === command && await conn.sendFile(m.chat, text, "ringtone.mp3", "", m);
    } catch (error) {
      m.reply(`Maaf, terjadi kesalahan: ${error.message}`);
    }
  };
handler.help = ["sound", "mangkane", "ringtone"], handler.command = ["sound", "mangkane", "ringtone", "ringtoneget"],
  handler.tags = ["random"];
export default handler;