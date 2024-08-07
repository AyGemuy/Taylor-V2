import cheerio from "cheerio";
import fetch from "node-fetch";
const cooldown = 3e5,
  handler = async (m, {
    usedPrefix
  }) => {
    let imgr = flaaa.getRandom(),
      user = db.data.users[m.sender],
      timers = 3e5 - (new Date() - user.lastadventure);
    if (user.health < 80) return conn.sendButton(m.chat, `${htki} LOW HEALTH ${htka}`, "ʏᴏᴜʀ ʜᴇᴀʟᴛʜ ɪs ʙᴇʟᴏᴡ 80﹗\nᴩʟᴇᴀsᴇ ʜᴇᴀʟ ❤ ғɪʀsᴛ ᴛᴏ ᴀᴅᴠᴇɴᴛᴜʀᴇ ᴀɢᴀɪɴ.".trim(), imgr + "lowhealth", [
      ["HEAL", usedPrefix + "heal"]
    ], m);
    if (new Date() - user.lastadventure <= 3e5) return conn.sendButton(m.chat, `${htki} COOLDOWN ${htka}`, `ʏᴏᴜ'ᴠᴇ ᴀʟʀᴇᴀᴅʏ *ᴀᴅᴠᴇɴᴛᴜʀᴇ*, ᴩʟᴇᴀsᴇ ᴡᴀɪᴛ ᴛɪʟʟ ᴄᴏᴏʟᴅᴏᴡɴ ғɪɴɪsʜ.\n\n⏱️ ${timers.toTimeString()}`.trim(), imgr + "cooldown", [
      ["RPG", usedPrefix + "menulist rpg"]
    ], m);
    const rewards = reward(user),
      info = await getInfoNegaraAcak();
    let teks = `🔖 ᴀᴅᴠᴇɴᴛᴜʀᴇ ᴛᴏ *${info.nama}*\n\n${cmenut}\n${cmenub} *Nama resmi:* ${info.namaResmi}\n${cmenub} *Wilayah:* ${info.wilayah}\n${cmenub} *Subwilayah:* ${info.subwilayah}\n${cmenub} *Zona waktu:* ${info.zonaWaktu.join(", ")}\n${cmenub} *Bendera:* ${info.bendera}\n${cmenub} *Populasi:* ${info.populasi}\n${cmenuf}\n\nᴀᴅᴠᴇɴᴛᴜʀᴇ ғɪɴɪsʜ (. ❛ ᴗ ❛.)\n${cmenua}`;
    for (const lost in rewards.lost)
      if (user[lost]) {
        const total = rewards.lost[lost].getRandom();
        user[lost] -= 1 * total, total && (teks += `\n${rpg.emoticon(lost)}${lost}: ${total}`);
      }
    teks += "\n\n🔖 ᴀᴅᴠᴇɴᴛᴜʀᴇ ʀᴇᴡᴀʀᴅ ʀᴇᴄᴇɪᴠᴇᴅ :";
    for (const rewardItem in rewards.reward)
      if (rewardItem in user) {
        const total = rewards.reward[rewardItem].getRandom();
        user[rewardItem] += 1 * total, total && (teks += `\n⮕ ${rpg.emoticon(rewardItem)}${rewardItem}: ${total}`);
      }
    conn.sendButton(m.chat, `${htki} ADVENTURE ${htka}\n`, teks.trim(), info.urlGambarOg, [
        ["Profile", usedPrefix + "profile"]
      ], m),
      user.lastadventure = 1 * new Date();
  };
handler.help = ["adventure"], handler.tags = ["rpg"], handler.command = /^adv(entur(es?)?)?$/i,
  handler.cooldown = 3e5, handler.disabled = !1;
export default handler;
async function getInfoNegaraAcak() {
  try {
    const response = await fetch("https://restcountries.com/v3.1/all"),
      data = await response.json(),
      negara = data[Math.floor(Math.random() * data.length)],
      html = await (await fetch(negara.maps.googleMaps)).text(),
      ogImageURL = cheerio.load(html)('meta[property="og:image"]').attr("content");
    return {
      nama: negara.name.common || "Tidak diketahui",
      namaResmi: negara.name.official || "Tidak diketahui",
      wilayah: negara.region || "Tidak diketahui",
      subwilayah: negara.subregion || "Tidak diketahui",
      zonaWaktu: negara.timezones || "Tidak diketahui",
      bendera: negara.flag || "Tidak diketahui",
      populasi: negara.population || "Tidak diketahui",
      urlGambarOg: ogImageURL || "https://raw.githubusercontent.com/AyGemuy/Taylors/master/thumbnail.jpg"
    };
  } catch (error) {
    throw console.error("Error:", error), error;
  }
}

function reward(user = {}) {
  return {
    reward: {
      money: 201,
      exp: 301,
      trash: 101,
      potion: 2,
      rock: 2,
      wood: 2,
      string: 2,
      common: 2 * (user.dog && 1.2 * (user.dog > 2 ? 2 : user.dog) || 1),
      uncommon: [0, 0, 0, 1, 0].concat(new Array(5 - (user.dog > 2 && user.dog < 6 && user.dog || user.dog > 5 && 5 || 2)).fill(0)),
      mythic: [0, 0, 0, 0, 0, 1, 0, 0, 0].concat(new Array(8 - (user.dog > 5 && user.dog < 8 && user.dog || user.dog > 7 && 8 || 3)).fill(0)),
      legendary: [0, 0, 0, 0, 0, 0, 0, 1, 0, 0].concat(new Array(10 - (user.dog > 8 && user.dog || 4)).fill(0)),
      cat: [0, 1, 0, 0, 0],
      centaur: [0, 1, 0, 0, 0],
      dog: [0, 1, 0, 0, 0],
      dragon: [0, 1, 0, 0, 0],
      emerald: [0, 1, 0, 0, 0],
      fox: [0, 1, 0, 0, 0],
      griffin: [0, 1, 0, 0, 0],
      horse: [0, 1, 0, 0, 0],
      kyubi: [0, 1, 0, 0, 0],
      lion: [0, 1, 0, 0, 0],
      pet: [0, 1, 0, 0, 0],
      phonix: [0, 1, 0, 0, 0],
      rhinoceros: [0, 1, 0, 0, 0],
      robo: [0, 1, 0, 0, 0],
      wolf: [0, 1, 0, 0, 0],
      iron: [0, 0, 0, 1, 0, 0],
      gold: [0, 0, 0, 0, 0, 1, 0],
      diamond: [0, 0, 0, 0, 0, 0, 1, 0].concat(new Array(5 - (user.fox < 6 && user.fox || user.fox > 5 && 5 || 0)).fill(0))
    },
    lost: {
      health: 101 - 4 * user.cat,
      armordurability: 7 * (15 - user.armor)
    }
  };
}