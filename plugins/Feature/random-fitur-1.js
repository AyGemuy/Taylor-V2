import fetch from "node-fetch";
import {
  asmaulhusna
} from "@bochilteam/scraper";
let toM = a => "@" + a.split("@")[0];
const handler = async (m, {
  conn,
  groupMetadata,
  usedPrefix,
  text,
  args,
  command
}) => {
  let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender,
    name = (await conn.profilePictureUrl(who).catch(_ => hwaifu.getRandom()), conn.getName(who));
  if ("jadian2" === command) {
    let b, ps = groupMetadata.participants.map(v => v.id),
      a = ps.getRandom();
    do {
      b = ps.getRandom();
    } while (b === a);
    m.reply(`${toM(a)} ❤️ ${toM(b)}`, null, {
      mentions: [a, b]
    });
  }
  if ("menikah" === command) {
    let b, ps = groupMetadata.participants.map(v => v.id),
      a = ps.getRandom();
    do {
      b = ps.getRandom();
    } while (b === a);
    m.reply(`*${toM(a)}, KAU HARUS MENIKAH ${toM(b)}, kamu MENJADI PASANGAN YANG BAIK 💓*`, null, {
      mentions: [a, b]
    });
  }
  if ("metercinta" === command) {
    if (!text) throw `Contoh penggunaan ${usedPrefix}${command} terserah`;
    await conn.reply(m.chat, `\n*❤️❤️ METER CINTA ❤️❤️*\n*cinta dari ${text} itu untuk kamu* *${Math.floor(100 * Math.random())}%* *dari 100%*\n*kamu harus memintanya untuk menjadi pacar kamu ?*\n`.trim(), m, m.mentionedJid ? {
      contextInfo: {
        mentionedJid: m.mentionedJid
      }
    } : {});
  }
  if ("bertanya" === command) {
    if (!text) throw `Contoh penggunaan ${usedPrefix}${command} terserah`;
    m.reply(`\n*⁉️ PERTANYAAN ⁉️*\n \n*PERTANYAAN:* ${text}\n*TANGGAPAN:* ${[ "Ya", "Mungkin ya", "Mungkin", "Mungkin tidak", "Tidak", "Tidak mungkin" ].getRandom()}\n`.trim(), null, m.mentionedJid ? {
      mentions: m.mentionedJid
    } : {});
  }
  if ("asmaulhusna" === command) {
    let xf = await asmaulhusna(),
      {
        index,
        latin,
        arabic,
        translation_id,
        translation_en
      } = xf,
      teks = `\n  ${index}\n  ${latin}\n  ${arabic}\n  ${translation_id}\n  ${translation_en}\n`;
    await conn.sendButton(m.chat, teks, wm, null, [
      ["Search!", `${usedPrefix + command}`]
    ], m, {
      quoted: fakes
    });
  }
  if ("memeindo" === command) {
    let caption = `Nihh banh ${command} nya`,
      url = `https://api.lolhuman.xyz/api/meme/memeindo?apikey=${Object.entries(APIKeys).find(([ key ]) => key.includes("lolhuman"))?.[1]}`;
    await conn.sendFile(m.chat, url, "", caption, m);
  }
  if ("randommeme" === command) {
    let caption = `Nihh banh ${command} nya`,
      url = `https://api.lolhuman.xyz/api/random/meme?apikey=${Object.entries(APIKeys).find(([ key ]) => key.includes("lolhuman"))?.[1]}`;
    await conn.sendFile(m.chat, url, "", caption, m);
  }
  if ("memedarkjoke" === command) {
    let caption = `Nihh banh ${command} nya`,
      url = `https://api.lolhuman.xyz/api/meme/darkjoke?apikey=${Object.entries(APIKeys).find(([ key ]) => key.includes("lolhuman"))?.[1]}`;
    await conn.sendFile(m.chat, url, "", caption, m);
  }
  if ("beasiswa" === command) {
    let gas = await fetch(`https://api.lolhuman.xyz/api/indbeasiswa?apikey=${Object.entries(APIKeys).find(([ key ]) => key.includes("lolhuman"))?.[1]}`),
      hasil = (await gas.json()).results,
      row = Object.values(hasil).map((v, index) => ({
        title: "📌 " + v.title,
        description: "\n*Judul:* " + v.title + "\n*Link:* " + v.link,
        rowId: usedPrefix + "ss " + v.link
      })),
      button = {
        buttonText: `☂️ ${command} Disini ☂️`,
        description: `⚡ ${name} Silakan pilih ${command} di tombol di bawah...\n*Teks yang anda kirim:* ${text}\n\nKetik ulang *${usedPrefix + command}* teks anda untuk mengubah teks lagi`,
        footerText: wm
      };
    return await conn.sendListM(m.chat, button, row, m);
  }
  if ("stimker" === command) {
    let apilol = "https://api.lolhuman.xyz/api/sticker/",
      lis = [apilol + "anjing?apikey=" + Object.entries(APIKeys).find(([key]) => key.includes("lolhuman"))?.[1], apilol + "patrick?apikey=" + Object.entries(APIKeys).find(([key]) => key.includes("lolhuman"))?.[1], apilol + "amongus?apikey=" + Object.entries(APIKeys).find(([key]) => key.includes("lolhuman"))?.[1], apilol + "gawrgura?apikey=" + Object.entries(APIKeys).find(([key]) => key.includes("lolhuman"))?.[1], apilol + "bucinstick?apikey=" + Object.entries(APIKeys).find(([key]) => key.includes("lolhuman"))?.[1]],
      lisn = ["🐕‍🦺 anjing", "⭐ patrick", "💩 amongus", "😎 gawrgura", "😘 bucinstick"],
      row = Object.keys(lis, lisn).map((v, index) => ({
        title: htjava + " " + lisn[v] + " Sticker",
        description: "By " + wm,
        rowId: usedPrefix + "get " + lis[v]
      })),
      button = {
        buttonText: "☂️ Tema Disini ☂️",
        description: `⚡ Silakan pilih tema di tombol di bawah...\n*Teks yang anda kirim:* ${text}\n\nKetik ulang *${usedPrefix + command}* teks anda untuk mengubah teks lagi`,
        footerText: wm
      };
    return await conn.sendListM(m.chat, button, row, m);
  }
  if ("apkdown" === command) {
    if (!text) throw `Contoh penggunaan ${usedPrefix}${command} com.whatsapp`;
    let f = await fetch(`https://api.lolhuman.xyz/api/apkdownloader?apikey=${Object.entries(APIKeys).find(([ key ]) => key.includes("lolhuman"))?.[1]}&package=${text}`),
      x = await f.json(),
      caption = `*Apk Name:* ${x.result.apk_name}\n*Version:* ${x.result.apk_version}\n*Author:* ${x.result.apk_author}\n`;
    await conn.sendFile(m.chat, x.result.apk_icon, "", caption, m), m.reply("File dikirim.."),
      await conn.sendFile(m.chat, x.result.apk_link, x.result.apk_link, "", m);
  }
  if ("proxysite" === command) {
    if (!args[0]) throw `Contoh penggunaan ${usedPrefix}${command} https://google.com`;
    let f = await fetch(`https://api.lolhuman.xyz/api/proxysite?apikey=${Object.entries(APIKeys).find(([ key ]) => key.includes("lolhuman"))?.[1]}&url=${text}`),
      caption = `🤠 *Country:* ${(await f.json()).result}`;
    await conn.sendButton(m.chat, caption, author, null, [
      ["Next", `${usedPrefix}${command} ${text}`]
    ], m, {
      quoted: fakes
    });
  }
  if ("mirrorcreator" === command) {
    if (!args[0]) throw `Contoh penggunaan ${usedPrefix}${command} https://www.mirrored.to/files/EB7BOJU3/[NekoPoi]_Isekai_Harem_Monogatari_-_04_[720P][nekopoi.care].mp4_links`;
    let f = await fetch(`https://api.lolhuman.xyz/api/mirrorcreator?apikey=${Object.entries(APIKeys).find(([ key ]) => key.includes("lolhuman"))?.[1]}&url=${text}`),
      x = (await f.json()).result,
      caption = `*zippyshare:* ${x.zippyshare}\n\n*gofileio:* ${x.gofileio}\n\n*userscloud:* ${x.userscloud}\n\n*racaty:* ${x.racaty}\n\n*googledrive:* ${x.googledrive}\n\n*dropapk:* ${x.dropapk}\n\n*videobinco:* ${x.videobinco}\n`;
    await conn.sendButton(m.chat, caption, author, null, [
      ["Next", `${usedPrefix}${command} ${text}`]
    ], m, {
      quoted: fakes
    });
  }
  if ("ouo" === command) {
    if (!args[0]) throw `Contoh penggunaan ${usedPrefix}${command} https://ouo.io/8BgQ1w`;
    let f = await fetch(`https://api.lolhuman.xyz/api/ouo?apikey=${Object.entries(APIKeys).find(([ key ]) => key.includes("lolhuman"))?.[1]}&url=${text}`),
      caption = `*Result:* ${(await f.json()).result}`;
    await conn.sendButton(m.chat, caption, author, null, [
      ["Next", `${usedPrefix}${command} ${text}`]
    ], m, {
      quoted: fakes
    });
  }
  if ("ouoshort" === command) {
    if (!args[0]) throw `Contoh penggunaan ${usedPrefix}${command} https://google.com`;
    let f = await fetch(`https://api.lolhuman.xyz/api/ouoshortlink?apikey=${Object.entries(APIKeys).find(([ key ]) => key.includes("lolhuman"))?.[1]}&url=${text}`),
      caption = `*Result:* ${(await f.json()).result}`;
    await conn.sendButton(m.chat, caption, author, null, [
      ["Next", `${usedPrefix}${command} ${text}`]
    ], m, {
      quoted: fakes
    });
  }
  if ("shortlink" === command) {
    if (!args[0]) throw `Contoh penggunaan ${usedPrefix}${command} https://google.com`;
    let f = await fetch(`https://api.lolhuman.xyz/api/shortlink?apikey=${Object.entries(APIKeys).find(([ key ]) => key.includes("lolhuman"))?.[1]}&url=${text}`),
      caption = `*Result:* ${(await f.json()).result}`;
    await conn.sendButton(m.chat, caption, author, null, [
      ["Next", `${usedPrefix}${command} ${text}`]
    ], m, {
      quoted: fakes
    });
  }
  if ("shortlink2" === command) {
    if (!args[0]) throw `Contoh penggunaan ${usedPrefix}${command} https://google.com`;
    let f = await fetch(`https://api.lolhuman.xyz/api/shortlink2?apikey=${Object.entries(APIKeys).find(([ key ]) => key.includes("lolhuman"))?.[1]}&url=${text}`),
      caption = `*Result:* ${(await f.json()).result}`;
    await conn.sendButton(m.chat, caption, author, null, [
      ["Next", `${usedPrefix}${command} ${text}`]
    ], m, {
      quoted: fakes
    });
  }
  if ("shortlink3" === command) {
    if (!args[0]) throw `Contoh penggunaan ${usedPrefix}${command} https://google.com`;
    let f = await fetch(`https://api.lolhuman.xyz/api/shortlink3?apikey=${Object.entries(APIKeys).find(([ key ]) => key.includes("lolhuman"))?.[1]}&url=${text}`),
      caption = `*Result:* ${(await f.json()).result}`;
    await conn.sendButton(m.chat, caption, author, null, [
      ["Next", `${usedPrefix}${command} ${text}`]
    ], m, {
      quoted: fakes
    });
  }
  if ("shortlink4" === command) {
    if (!args[0]) throw `Contoh penggunaan ${usedPrefix}${command} https://google.com`;
    let f = await fetch(`https://api.lolhuman.xyz/api/shortlink4?apikey=${Object.entries(APIKeys).find(([ key ]) => key.includes("lolhuman"))?.[1]}&url=${text}`),
      caption = `*Result:* ${(await f.json()).result}`;
    await conn.sendButton(m.chat, caption, author, null, [
      ["Next", `${usedPrefix}${command} ${text}`]
    ], m, {
      quoted: fakes
    });
  }
  if ("sl" === command) {
    let res = await fetch("https://api.lolhuman.xyz/api/" + args[0] + "?apikey=" + Object.entries(APIKeys).find(([key]) => key.includes("lolhuman"))?.[1] + "&url=" + args[1]),
      json = await res.json();
    m.reply(json.result);
  }
};
handler.command = handler.help = ["jadian2", "menikah", "metercinta", "bertanya", "asmaulhusna", "", "memeindo", "stimker", "randommeme", "memedarkjoke", "beasiswa", "apkdown", "proxysite", "mirrorcreator", "ouo", "ouoshort", "shortlink", "shortlink2", "shortlink3", "shortlink4", "sl"],
  handler.tags = ["random"];
export default handler;