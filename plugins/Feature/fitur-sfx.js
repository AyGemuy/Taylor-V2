import fetch from "node-fetch";
const handler = async (m, {
  conn,
  usedPrefix,
  text,
  args,
  command
}) => {
  if ("sfx" === command) {
    if (!args[0]) return m.reply(`Contoh penggunaan ${usedPrefix}${command} 2`);
    let gas, dapet, list, choice;
    try {
      gas = await fetch(`http://www.myinstants.com/api/v1/instants/?format=json&page=${args[0]}`);
      dapet = (await gas.json()).results;
      list = dapet.map((v, index) => `*\`Hasil ${index + 1}\`*\n\n- *Name:* ${v.name}\n- *Color:* ${v.color}\n- *Slug:* ${v.slug}\n- *Description:* ${v.description}`).join("\n________________________\n");
      choice = args[1] ? parseInt(args[1]) - 1 : -1;
      if (!(choice >= 0 && choice < dapet.length)) {
        const buttons = conn.ctaButton.setBody(`⚠️ Pilihan tidak valid. Silakan pilih nomor urutan yang benar dari daftar berikut:\n\n${list}\nKetik ulang *${usedPrefix + command}* teks anda untuk mengubah teks lagi`).setFooter("Klik tombol di bawah untuk memilih ulang.").addSelection("Pilih Ulang").makeSections("Pilih Ulang", "Tersedia");
        dapet.forEach((v, index) => buttons.makeRow("", v.name, `Pilih ${v.name}`, `${usedPrefix + command} ${args[0]} ${index + 1}`));
        return buttons.run(m.chat, conn, m);
      }
      let v = dapet[choice];
      let teks = `✨ *Name:* ${v.name}\n🌈 *Color:* ${v.color}\n🔗 *Slug:* ${v.slug}\n📜 *Description:* ${v.description}`;
      m.reply(teks);
      await conn.sendMessage(m.chat, {
        audio: {
          url: v.sound
        }
      }, {
        quoted: m
      });
    } catch (e) {
      return m.react(eror);
    }
  }
  if ("sfx2" === command) {
    if (!text) return m.reply(`Contoh penggunaan ${usedPrefix}${command} drum\n*ket:*\ndrum : nama sound\n`);
    let url = `http://freesound.org/apiv2/search/text/?token=I4LLx1YDPjNbkBCuK0zYbQAV9njbRLJ9ZhctDhGP&query=${encodeURIComponent(text)}`;
    let response, dapet, list, choice;
    try {
      response = await fetch(url);
      dapet = (await response.json()).results;
      list = dapet.map((v, index) => `*\`Hasil ${index + 1}\`*\n\n- *Name:* ${v.name}\n- *ID:* ${v.id}\n- *LICENSE:* ${v.license}\n- *USERNAME:* ${v.username}\n- *TAGS:* ${Array.from(v.tags).join(", ")}`).join("\n________________________\n");
      choice = args[1] ? parseInt(args[1]) - 1 : -1;
      if (!(choice >= 0 && choice < dapet.length)) {
        const buttons = conn.ctaButton.setBody(`⚠️ Pilihan tidak valid. Silakan pilih nomor urutan yang benar dari daftar berikut:\n\n${list}\nKetik ulang *${usedPrefix + command}* teks anda untuk mengubah teks lagi`).setFooter("Klik tombol di bawah untuk memilih ulang.").addSelection("Pilih Ulang").makeSections("Pilih Ulang", "Tersedia");
        dapet.forEach((v, index) => buttons.makeRow("", v.name, `Pilih ${v.name}`, `${usedPrefix + command} ${text} ${index + 1}`));
        return buttons.run(m.chat, conn, m);
      }
      let v = dapet[choice];
      let teks = `✨ *Name:* ${v.name}\n🆔 *ID:* ${v.id}\n📜 *LICENSE:* ${v.license}\n👤 *USERNAME:* ${v.username}\n🏷️ *TAGS:* ${Array.from(v.tags).join(", ")}`;
      m.reply(teks);
      await conn.sendMessage(m.chat, {
        audio: {
          url: `http://freesound.org/apiv2/sounds/${v.id}/?token=I4LLx1YDPjNbkBCuK0zYbQAV9njbRLJ9ZhctDhGP`
        }
      }, {
        quoted: m
      });
    } catch (e) {
      return m.react(eror);
    }
  }
  if ("sfx3" === command) {
    let hasil = ["Donasiku", "MenuYuki", "aku-ngakak", "anjay", "ara-ara-cowok", "ara-ara", "ara-ara2", "arigatou", "assalamualaikum", "asu", "ayank", "bacot", "bahagia-aku", "baka", "bansos", "beat-box", "beat-box2", "biasalah", "bidadari", "bot", "buka-pintu", "canda-anjing", "cepetan", "china", "cuekin-terus", "daisuki-dayo", "daisuki", "dengan-mu", "gaboleh-gitu", "gak-lucu", "gamau", "gay", "gelay", "gitar", "gomenasai", "hai-bot", "hampa", "hayo", "hp-iphone", "i-like-you", "ih-wibu", "india", "karna-lo-wibu", "kiss", "kontol", "ku-coba", "maju-wibu", "makasih", "mastah", "menu", "menuasli", "menuku", "nande-nande", "nani", "ngadi-ngadi", "nikah", "nuina", "onichan", "owner-sange", "ownerku", "pak-sapardi", "pale", "pantek", "pasi-pasi", "punten", "sayang", "siapa-sih", "sudah-biasa", "summertime", "tanya-bapak-lu", "to-the-bone", "wajib", "waku", "woi", "yamete", "yowaimo", "yoyowaimo"];
    let list = hasil.map((sound, index) => `*\`Hasil ${index + 1}\`*\n\n- *Sound:* ${sound}\n- *Link:* ${usedPrefix}get https://raw.githubusercontent.com/AyGemuy/HAORI-API/main/audio/${sound}.mp3\n- *By:* ${author}`).join("\n________________________\n");
    let choice = args[0] ? parseInt(args[0]) - 1 : -1;
    if (!(choice >= 0 && choice < hasil.length)) {
      const buttons = conn.ctaButton.setBody(`⚠️ Pilihan tidak valid. Silakan pilih nomor urutan yang benar dari daftar berikut:\n\n${list}\nKetik ulang *${usedPrefix + command}* teks anda untuk mengubah teks lagi`).setFooter("Klik tombol di bawah untuk memilih ulang.").addSelection("Pilih Ulang").makeSections("Pilih Ulang", "Tersedia");
      hasil.forEach((sound, index) => buttons.makeRow("", sound, `Pilih ${sound}`, `${usedPrefix + command} ${index + 1}`));
      return buttons.run(m.chat, conn, m);
    }
    let sound = hasil[choice];
    let teks = `✨ *Sound:* ${sound}\n✍️ *By:* ${author}`;
    await conn.sendMessage(m.chat, {
      audio: {
        url: `https://raw.githubusercontent.com/AyGemuy/HAORI-API/main/audio/${sound}.mp3`
      }
    }, {
      quoted: m
    });
  }
  if ("sfx4" === command) {
    let hasil = Array(74).fill(1).map((n, i) => n + i);
    let list = hasil.map((sound, index) => `*\`Hasil ${index + 1}\`*\n\n- *Sound ke-${sound}*\n- *Link:* ${usedPrefix}get https://raw.githubusercontent.com/AyGemuy/HAORI-API/main/sound/sound${sound}.mp3\n- *By:* ${author}`).join("\n________________________\n");
    let choice = args[0] ? parseInt(args[0]) - 1 : -1;
    if (!(choice >= 0 && choice < hasil.length)) {
      const buttons = conn.ctaButton.setBody(`⚠️ Pilihan tidak valid. Silakan pilih nomor urutan yang benar dari daftar berikut:\n\n${list}\nKetik ulang *${usedPrefix + command}* teks anda untuk mengubah teks lagi`).setFooter("Klik tombol di bawah untuk memilih ulang.").addSelection("Pilih Ulang").makeSections("Pilih Ulang", "Tersedia");
      hasil.forEach((sound, index) => buttons.makeRow("", `Sound ke-${sound}`, `Pilih Sound ke-${sound}`, `${usedPrefix + command} ${index + 1}`));
      return buttons.run(m.chat, conn, m);
    }
    let sound = hasil[choice];
    let teks = `✨ *Sound:* Sound ke-${sound}\n✍️ *By:* ${author}`;
    await conn.sendMessage(m.chat, {
      audio: {
        url: `https://raw.githubusercontent.com/AyGemuy/HAORI-API/main/sound/sound${sound}.mp3`
      }
    }, {
      quoted: m
    });
  }
  if ("sfx5" === command) {
    let hasil = Array(119).fill(1).map((n, i) => n + i);
    let list = hasil.map((sound, index) => `*\`Hasil ${index + 1}\`*\n\n- *Sound ke-${sound}*\n- *Link:* ${usedPrefix}get https://raw.githubusercontent.com/WH-MODS-BOT/Sounds/main/sound${sound}.mp3\n- *By:* ${author}`).join("\n________________________\n");
    let choice = args[0] ? parseInt(args[0]) - 1 : -1;
    if (!(choice >= 0 && choice < hasil.length)) {
      const buttons = conn.ctaButton.setBody(`⚠️ Pilihan tidak valid. Silakan pilih nomor urutan yang benar dari daftar berikut:\n\n${list}\nKetik ulang *${usedPrefix + command}* teks anda untuk mengubah teks lagi`).setFooter("Klik tombol di bawah untuk memilih ulang.").addSelection("Pilih Ulang").makeSections("Pilih Ulang", "Tersedia");
      hasil.forEach((sound, index) => buttons.makeRow("", `Sound ke-${sound}`, `Pilih Sound ke-${sound}`, `${usedPrefix + command} ${index + 1}`));
      return buttons.run(m.chat, conn, m);
    }
    let sound = hasil[choice];
    let teks = `✨ *Sound:* Sound ke-${sound}\n✍️ *By:* ${author}`;
    await conn.sendMessage(m.chat, {
      audio: {
        url: `https://raw.githubusercontent.com/WH-MODS-BOT/Sounds/main/sound${sound}.mp3`
      }
    }, {
      quoted: m
    });
  }
  if ("smap" === command) {
    if (!text) return m.reply(`Contoh:\n${usedPrefix + command} ID`);
    let f, xx, teks;
    try {
      f = await fetch(`https://api.worldbank.org/v2/country/${text}?format=json`);
      xx = await f.json();
      teks = `✨ *Name:* ${xx[1][0]?.name}\n🆔 *ID:* ${xx[1][0]?.id}\n🏙️ *City:* ${xx[1][0]?.capitalCity}\n🌐 *Longitude:* ${xx[1][0]?.longitude}\n🌐 *Latitude:* ${xx[1][0]?.latitude}`;
      await conn.sendMessage(m.chat, {
        audio: {
          url: `https://static-maps.yandex.ru/1.x/?lang=id-ID&ll=${xx[1][0]?.longitude},${xx[1][0]?.latitude}&z=12&l=map&size=600,300`
        }
      }, {
        quoted: m
      });
    } catch (e) {
      return m.react(eror);
    }
  }
};
handler.command = handler.help = ["sfx", "sfx2", "sfx3", "sfx4", "sfx5", "smap"];
handler.tags = ["audio"];
export default handler;