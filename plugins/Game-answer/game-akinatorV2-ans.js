import fetch from "node-fetch";
const teks = "0 - Ya\n1 - Tidak\n2 - Saya Tidak Tau\n3 - Mungkin\n4 - Mungkin Tidak\n5 - Kembali ke pertanyaan sebelumnya";
export async function before(m) {
  if (db.data.users[m.sender].banned) return;
  if (!(m.quoted && m.quoted?.fromMe && m.quoted?.isBaileys && m.text)) return !0;
  let aki = db.data.users[m.sender].akinator;
  if (!aki.sesi || m.quoted?.id != aki.soal.key.id) return;
  if (!somematch(["0", "1", "2", "3", "4", "5"], m.text)) return await this.sendMessage(m.chat, {
    text: `[!] Jawab dengan angka 1, 2, 3, 4, atau 5\n\n${teks}`
  }, {
    quoted: aki.soal
  });
  let res, anu, soal, {
    server,
    frontaddr,
    session,
    signature,
    question,
    progression,
    step
  } = aki;
  if ("0" === step && "5" === m.text) return m.reply("Anda telah mencapai pertanyaan pertama");
  try {
    if (res = "5" === m.text ? await fetch(`https://api.lolhuman.xyz/api/akinator/back?apikey=${Object.entries(APIKeys).find(([ key ]) => key.includes("lolhuman"))?.[1]}&server=${server}&session=${session}&signature=${signature}&step=${step}`) : await fetch(`https://api.lolhuman.xyz/api/akinator/answer?apikey=${Object.entries(APIKeys).find(([ key ]) => key.includes("lolhuman"))?.[1]}&server=${server}&frontaddr=${frontaddr}&session=${session}&signature=${signature}&step=${step}&answer=${m.text}`), anu = await res.json(), "200" != anu.status) return aki.sesi = !1, aki.soal = null,
      m.reply("Akinator ( V2 ) session expired.");
    anu = anu.result, anu.name ? (await this.sendMessage(m.chat, {
      image: {
        url: anu.image
      },
      caption: `🎮 *Akinator ( V2 ) Answer* 🎮\n\nDia adalah *${anu.name}*\n_${anu.description}_`,
      mentions: [m.sender]
    }, {
      quoted: m
    }), aki.sesi = !1, aki.soal = null) : (soal = await this.sendMessage(m.chat, {
      text: `🎮 *Akinator ( V2 )* 🎮\n_step ${anu.step} ( ${anu.progression.toFixed(2)} % )_\n\n@${m.sender.split("@")[0]}\n    ${anu.question}\n\n${teks}`,
      mentions: [m.sender]
    }, {
      quoted: m
    }), aki.soal = soal, aki.step = anu.step, aki.progression = anu.progression);
  } catch (e) {
    aki.sesi = !1, aki.soal = null, m.reply("Fitur Error!");
  }
  return !0;
}

function somematch(data, id) {
  return !!data.find(el => el === id);
}